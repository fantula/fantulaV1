-- ============================================================================
-- Message System Optimization: Smart Triggers & Templates
-- ============================================================================
-- 1. Update Config Schema (Boolean -> Object)
-- We need to migrate existing boolean settings to object format { "enable": true, "template": "..." }
DO $$
DECLARE
    v_current_config jsonb;
    v_new_config jsonb := '{}'::jsonb;
    v_key text;
    v_val boolean;
    default_templates jsonb := '{
        "order_created": "您的订单 {order_no} 已成功提交，我们正在为您准备商品。",
        "order_shipped": "您的订单 {order_no} 已经发货，请注意查收。",
        "virtual_order_received": "您的订单 {order_no} 已处理完成，请查看卡密或充值结果。",
        "coupon_redeemed": "恭喜！您获得了一张新的优惠券，快去使用吧。",
        "quota_changed": "您的账户余额发生变动，当前余额：{balance} 元。",
        "ticket_replied": "管理员回复了您的工单，请前往查看。"
    }'::jsonb;
BEGIN
    SELECT value::jsonb INTO v_current_config
    FROM public.system_settings
    WHERE public.system_settings.key = 'customer_notification_config';
    IF v_current_config IS NOT NULL THEN
        FOR v_key, v_val IN SELECT * FROM jsonb_each(v_current_config)
        LOOP
            -- If value is boolean, convert to object
            IF jsonb_typeof(v_current_config -> v_key) = 'boolean' THEN
                v_new_config := jsonb_set(
                    v_new_config, 
                    ARRAY[v_key], 
                    jsonb_build_object(
                        'enable', v_val, 
                        'template', COALESCE(default_templates ->> v_key, '')
                    )
                );
            ELSE
                -- Already object or other, keep as is
                 v_new_config := jsonb_set(v_new_config, ARRAY[v_key], v_current_config -> v_key);
            END IF;
        END LOOP;
        -- Update the setting
        UPDATE public.system_settings 
        SET value = v_new_config::text 
        WHERE public.system_settings.key = 'customer_notification_config';
    END IF;
END $$;
-- 2. Helper: Get Template
CREATE OR REPLACE FUNCTION public.get_notification_template(config_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    config jsonb;
    tmpl text;
BEGIN
    SELECT value::jsonb INTO config
    FROM public.system_settings
    WHERE key = 'customer_notification_config';
    
    tmpl := config -> config_key ->> 'template';
    RETURN COALESCE(tmpl, '');
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
    -- Check if it's new object format
    IF jsonb_typeof(config -> config_key) = 'object' THEN
        is_enabled := COALESCE((config -> config_key ->> 'enable')::boolean, false);
    ELSE
        -- Fallback to old boolean format
        is_enabled := COALESCE((config ->> config_key)::boolean, false);
    END IF;
    
    RETURN is_enabled;
END;
$$;
-- 4. SMART MERGE: Replace Balance Trigger
-- Drop old trigger on profiles
DROP TRIGGER IF EXISTS on_balance_change ON public.profiles;
-- Create new trigger logic on wallet_transactions
CREATE OR REPLACE FUNCTION public.trigger_notify_wallet_transaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    tmpl text;
    content text;
BEGIN
    -- Ignore 'order_payment' to avoid duplicates with "Order Created"
    IF NEW.type IN ('order_payment', 'payment') THEN
        RETURN NEW;
    END IF;
    IF public.is_notification_enabled('quota_changed') THEN
        tmpl := public.get_notification_template('quota_changed');
        
        -- Simple Variable Substitution
        content := replace(tmpl, '{balance}', NEW.balance_after::text);
        content := replace(content, '{amount}', NEW.amount::text);
        
        PERFORM public.send_auto_message(
            NEW.user_id,
            '余额变动通知',
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
-- 5. Update Other Triggers to use Templates
-- A. Order Created
CREATE OR REPLACE FUNCTION public.trigger_notify_order_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    tmpl text;
    content text;
BEGIN
    IF public.is_notification_enabled('order_created') THEN
        tmpl := public.get_notification_template('order_created');
        content := replace(tmpl, '{order_no}', COALESCE(NEW.order_no, ''));
        
        PERFORM public.send_auto_message(
            NEW.user_id,
            '下单成功',
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
    tmpl text;
    content text;
BEGIN
    -- Status changed to 'shipped'
    IF OLD.status != 'shipped' AND NEW.status = 'shipped' THEN
        IF public.is_notification_enabled('order_shipped') THEN
            tmpl := public.get_notification_template('order_shipped');
            content := replace(tmpl, '{order_no}', COALESCE(NEW.order_no, ''));
            
            PERFORM public.send_auto_message(
                NEW.user_id,
                '订单已发货',
                content,
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;
    -- Status changed to 'completed'
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        IF public.is_notification_enabled('virtual_order_received') THEN
            tmpl := public.get_notification_template('virtual_order_received');
            content := replace(tmpl, '{order_no}', COALESCE(NEW.order_no, ''));
            
             PERFORM public.send_auto_message(
                NEW.user_id,
                '订单已完成',
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
    tmpl text;
BEGIN
    IF public.is_notification_enabled('coupon_redeemed') THEN
        tmpl := public.get_notification_template('coupon_redeemed');
        -- No variables currently
        
        PERFORM public.send_auto_message(
            NEW.user_id,
            '优惠券到账',
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
    tmpl text;
BEGIN
    if NEW.is_admin = true THEN
        IF public.is_notification_enabled('ticket_replied') THEN
            SELECT user_id INTO v_order_ticket_user_id FROM public.tickets WHERE id = NEW.ticket_id;
            
            tmpl := public.get_notification_template('ticket_replied');
            IF v_order_ticket_user_id IS NOT NULL THEN
                PERFORM public.send_auto_message(
                    v_order_ticket_user_id,
                    '工单回复',
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