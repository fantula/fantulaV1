-- ============================================================================
-- Message System Optimization v2: Custom Titles, Templates & Smart Triggers
-- ============================================================================

-- 1. Update Config Schema (Boolean -> Object with Title & Template)
DO $$
DECLARE
    v_current_config jsonb;
    v_new_config jsonb := '{}'::jsonb;
    v_key text;
    v_val boolean;
    v_obj jsonb;
    default_config jsonb := '{
        "order_created": { 
            "title": "下单成功", 
            "template": "您的订单 {order_no} 已成功提交，我们正在为您准备商品。" 
        },
        "order_shipped": { 
            "title": "订单已发货", 
            "template": "您的订单 {order_no} 已经发货，请注意查收。" 
        },
        "virtual_order_received": { 
            "title": "订单已完成", 
            "template": "您的订单 {order_no} 已处理完成，请查看卡密或充值结果。" 
        },
        "coupon_redeemed": { 
            "title": "优惠券到账", 
            "template": "恭喜！您获得了一张新的优惠券，快去使用吧。" 
        },
        "quota_changed": { 
            "title": "额度变动通知", 
            "template": "您的账户余额发生变动，当前余额：{balance} 元。" 
        },
        "ticket_replied": { 
            "title": "工单回复", 
            "template": "管理员回复了您的工单，请前往查看。" 
        }
    }'::jsonb;
BEGIN
    SELECT value::jsonb INTO v_current_config
    FROM public.system_settings
    WHERE public.system_settings.key = 'customer_notification_config';

    IF v_current_config IS NOT NULL THEN
        FOR v_key IN SELECT jsonb_object_keys(v_current_config)
        LOOP
            v_obj := v_current_config -> v_key;

            -- Case 1: Old Boolean Format (true/false)
            IF jsonb_typeof(v_obj) = 'boolean' THEN
                v_new_config := jsonb_set(
                    v_new_config, 
                    ARRAY[v_key], 
                    jsonb_build_object(
                        'enable', v_obj, 
                        'title', COALESCE(default_config -> v_key ->> 'title', '新消息'),
                        'template', COALESCE(default_config -> v_key ->> 'template', '')
                    )
                );
            -- Case 2: Object Format (Update missing fields)
            ELSIF jsonb_typeof(v_obj) = 'object' THEN
                v_new_config := jsonb_set(
                    v_new_config,
                    ARRAY[v_key],
                    v_obj || jsonb_build_object(
                         -- Preserve existing title/template if exists, else use default
                        'title', COALESCE(v_obj ->> 'title', default_config -> v_key ->> 'title', '新消息'),
                        'template', COALESCE(v_obj ->> 'template', default_config -> v_key ->> 'template', '')
                    )
                );
            END IF;
        END LOOP;

        -- Update the setting
        UPDATE public.system_settings 
        SET value = v_new_config::text 
        WHERE public.system_settings.key = 'customer_notification_config';
    END IF;
END $$;


-- 2. Helper: Get Notification Config (Returns Title & Template)
-- Returns specific field ('title' or 'template')
CREATE OR REPLACE FUNCTION public.get_notification_field(config_key text, field_name text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    config jsonb;
    val text;
BEGIN
    SELECT value::jsonb INTO config
    FROM public.system_settings
    WHERE key = 'customer_notification_config';
    
    val := config -> config_key ->> field_name;
    RETURN COALESCE(val, '');
END;
$$;


-- 3. Update Is Enabled Helper (Handle Object)
CREATE OR REPLACE FUNCTION public.is_notification_enabled(config_key text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    config jsonb;
    is_enabled boolean;
BEGIN
    SELECT value::jsonb INTO config
    FROM public.system_settings
    WHERE key = 'customer_notification_config';

    IF config IS NULL THEN
        RETURN false;
    END IF;

    IF jsonb_typeof(config -> config_key) = 'object' THEN
        is_enabled := COALESCE((config -> config_key ->> 'enable')::boolean, false);
    ELSE
        is_enabled := COALESCE((config ->> config_key)::boolean, false);
    END IF;
    
    RETURN is_enabled;
END;
$$;


-- 4. SMART MERGE: Replace Balance Trigger
DROP TRIGGER IF EXISTS on_balance_change ON public.profiles;

CREATE OR REPLACE FUNCTION public.trigger_notify_wallet_transaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_title text;
    tmpl text;
    content text;
BEGIN
    -- Ignore 'order_payment' to avoid duplicates
    IF NEW.type IN ('order_payment', 'payment') THEN
        RETURN NEW;
    END IF;

    IF public.is_notification_enabled('quota_changed') THEN
        v_title := public.get_notification_field('quota_changed', 'title');
        tmpl := public.get_notification_field('quota_changed', 'template');
        
        content := replace(tmpl, '{balance}', NEW.balance_after::text);
        content := replace(content, '{amount}', NEW.amount::text);
        
        PERFORM public.send_auto_message(
            NEW.user_id,
            v_title,
            content,
            'system',
            '/profile/wallet'
        );
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_wallet_transaction ON public.wallet_transactions;
CREATE TRIGGER on_wallet_transaction
AFTER INSERT ON public.wallet_transactions
FOR EACH ROW
EXECUTE FUNCTION public.trigger_notify_wallet_transaction();


-- 5. Update Other Triggers to use Custom Titles

-- A. Order Created
CREATE OR REPLACE FUNCTION public.trigger_notify_order_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_title text;
    tmpl text;
    content text;
BEGIN
    IF public.is_notification_enabled('order_created') THEN
        v_title := public.get_notification_field('order_created', 'title');
        tmpl := public.get_notification_field('order_created', 'template');
        
        content := replace(tmpl, '{order_no}', COALESCE(NEW.order_no, ''));
        
        PERFORM public.send_auto_message(
            NEW.user_id,
            v_title,
            content,
            'order',
            '/profile/orders'
        );
    END IF;
    RETURN NEW;
END;
$$;

-- B. Order Shipped / Completed
CREATE OR REPLACE FUNCTION public.trigger_notify_order_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_title text;
    tmpl text;
    content text;
BEGIN
    -- Shipped
    IF OLD.status != 'shipped' AND NEW.status = 'shipped' THEN
        IF public.is_notification_enabled('order_shipped') THEN
            v_title := public.get_notification_field('order_shipped', 'title');
            tmpl := public.get_notification_field('order_shipped', 'template');
            
            content := replace(tmpl, '{order_no}', COALESCE(NEW.order_no, ''));
            
            PERFORM public.send_auto_message(
                NEW.user_id,
                v_title,
                content,
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;

    -- Completed
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        IF public.is_notification_enabled('virtual_order_received') THEN
            v_title := public.get_notification_field('virtual_order_received', 'title');
            tmpl := public.get_notification_field('virtual_order_received', 'template');
            
            content := replace(tmpl, '{order_no}', COALESCE(NEW.order_no, ''));
            
             PERFORM public.send_auto_message(
                NEW.user_id,
                v_title,
                content,
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- C. Coupon Insert
CREATE OR REPLACE FUNCTION public.trigger_notify_coupon_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_title text;
    tmpl text;
BEGIN
    IF public.is_notification_enabled('coupon_redeemed') THEN
        v_title := public.get_notification_field('coupon_redeemed', 'title');
        tmpl := public.get_notification_field('coupon_redeemed', 'template');
        
        PERFORM public.send_auto_message(
            NEW.user_id,
            v_title,
            tmpl,
            'activity',
            '/profile/coupons'
        );
    END IF;
    RETURN NEW;
END;
$$;

-- D. Ticket Reply
CREATE OR REPLACE FUNCTION public.trigger_notify_ticket_reply()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order_ticket_user_id uuid;
    v_title text;
    tmpl text;
BEGIN
    if NEW.is_admin = true THEN
        IF public.is_notification_enabled('ticket_replied') THEN
            SELECT user_id INTO v_order_ticket_user_id FROM public.tickets WHERE id = NEW.ticket_id;
            
            v_title := public.get_notification_field('ticket_replied', 'title');
            tmpl := public.get_notification_field('ticket_replied', 'template');

            IF v_order_ticket_user_id IS NOT NULL THEN
                PERFORM public.send_auto_message(
                    v_order_ticket_user_id,
                    v_title,
                    tmpl,
                    'system',
                    '/profile/support'
                );
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
