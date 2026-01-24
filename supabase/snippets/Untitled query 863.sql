-- ============================================================================
-- Customer Notification Automation (Triggers)
-- ============================================================================
-- This script creates the necessary Functions and Triggers to automatically
-- send system messages when specific events occur (Order, Coupon, Ticket, etc.)
-- based on the configuration in 'system_settings'.
-- 1. Helper Function: Get Config
-- Returns true if the specific notification type is enabled in system_settings.
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
    -- Extract value, default to false if key missing
    is_enabled := COALESCE((config ->> config_key)::boolean, false);
    RETURN is_enabled;
END;
$$;
-- 2. Helper Function: Send Message
-- Inserts a message into the messages table.
CREATE OR REPLACE FUNCTION public.send_auto_message(
    p_user_id uuid,
    p_title text,
    p_content text,
    p_type text DEFAULT 'system',
    p_link text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_uid text;
BEGIN
    -- Get User UID (needed 'cos messages table stores both UUID and UID)
    SELECT uid INTO v_user_uid FROM public.profiles WHERE id = p_user_id;
    IF v_user_uid IS NOT NULL THEN
        INSERT INTO public.messages (user_id, user_uid, title, content, type, link, is_read)
        VALUES (p_user_id, v_user_uid, p_title, p_content, p_type, p_link, false);
    END IF;
END;
$$;
-- ============================================================================
-- Trigger 1: Order Created
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trigger_notify_order_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF public.is_notification_enabled('order_created') THEN
        PERFORM public.send_auto_message(
            NEW.user_id,
            '下单成功 (Order Placed)',
            '您的订单 ' || COALESCE(NEW.order_no, '') || ' 已成功提交。我们正在为您准备商品。',
            'order',
            '/profile/orders'
        );
    END IF;
    RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_order_created ON public.orders;
CREATE TRIGGER on_order_created
AFTER INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.trigger_notify_order_created();
-- ============================================================================
-- Trigger 2: Order Shipped / Completed
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trigger_notify_order_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Status changed to 'shipped' (发货)
    IF OLD.status != 'shipped' AND NEW.status = 'shipped' THEN
        IF public.is_notification_enabled('order_shipped') THEN
            PERFORM public.send_auto_message(
                NEW.user_id,
                '订单已发货 (Order Shipped)',
                '您的订单 ' || COALESCE(NEW.order_no, '') || ' 已经发货，请注意查收。',
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;
    -- Status changed to 'completed' (完成 - for virtual orders usually)
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        IF public.is_notification_enabled('virtual_order_received') THEN
             PERFORM public.send_auto_message(
                NEW.user_id,
                '订单已完成 (Order Completed)',
                '您的订单 ' || COALESCE(NEW.order_no, '') || ' 已处理完成。如果是虚拟商品，请查看卡密或充值结果。',
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_order_status_change ON public.orders;
CREATE TRIGGER on_order_status_change
AFTER UPDATE ON public.orders
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION public.trigger_notify_order_status();
-- ============================================================================
-- Trigger 3: Coupon Redeemed
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trigger_notify_coupon_redeemed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Status changed to 'used' (已使用) is NOT what we want for 'Redeemed'.
    -- Usually 'Redeemed' means user claimed/bought it? 
    -- Assuming 'user_coupons' INSERT means user claimed/redeemed a code.
    -- OR update status='unused' (from null?). 
    -- Let's assume INSERT into user_coupons represents "User got a coupon".
    
    RETURN NEW; 
END;
$$;
-- Redefining Logic: Coupon Redeemed (User inputs code -> Gets coupon)
-- This usually happens on INSERT into user_coupons
CREATE OR REPLACE FUNCTION public.trigger_notify_coupon_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF public.is_notification_enabled('coupon_redeemed') THEN
        PERFORM public.send_auto_message(
            NEW.user_id,
            '优惠券到账 (Coupon Received)',
            '恭喜！您获得了一张新的优惠券，快去使用吧。',
            'activity',
            '/profile/coupons'
        );
    END IF;
    RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_coupon_received ON public.user_coupons;
CREATE TRIGGER on_coupon_received
AFTER INSERT ON public.user_coupons
FOR EACH ROW
EXECUTE FUNCTION public.trigger_notify_coupon_insert();
-- ============================================================================
-- Trigger 4: Balance/Quota Changed
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trigger_notify_balance_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    diff numeric;
BEGIN
    IF public.is_notification_enabled('quota_changed') THEN
        diff := NEW.balance - OLD.balance;
        IF diff > 0 THEN
             PERFORM public.send_auto_message(
                NEW.id,
                '余额变动通知 (Balance Updated)',
                '您的账户余额增加了 ' || diff || ' 元。当前余额：' || NEW.balance,
                'system',
                '/profile/wallet'
            );
        ELSIF diff < 0 THEN
             -- Optionally notify deductions? Maybe only significant ones or manual ones?
             -- Let's keep it simple: notify all changes if enabled.
             PERFORM public.send_auto_message(
                NEW.id,
                '余额变动通知 (Balance Updated)',
                '您的账户余额减少了 ' || ABS(diff) || ' 元。当前余额：' || NEW.balance,
                'system',
                '/profile/wallet'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_balance_change ON public.profiles;
CREATE TRIGGER on_balance_change
AFTER UPDATE ON public.profiles
FOR EACH ROW
WHEN (OLD.balance IS DISTINCT FROM NEW.balance)
EXECUTE FUNCTION public.trigger_notify_balance_change();
-- ============================================================================
-- Trigger 5: Ticket Reply (Admin Replied)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trigger_notify_ticket_reply()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order_ticket_user_id uuid;
BEGIN
    -- Only notify if sender is Admin
    IF NEW.is_admin = true THEN
        IF public.is_notification_enabled('ticket_replied') THEN
            -- Get User ID from parent ticket
            SELECT user_id INTO v_order_ticket_user_id
            FROM public.tickets
            WHERE id = NEW.ticket_id;
            IF v_order_ticket_user_id IS NOT NULL THEN
                PERFORM public.send_auto_message(
                    v_order_ticket_user_id,
                    '工单回复 (Ticket Update)',
                    '管理员回复了您的工单，请前往查看。',
                    'system',
                    '/profile/support' -- Adjust link as needed
                );
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_ticket_reply ON public.ticket_messages;
CREATE TRIGGER on_ticket_reply
AFTER INSERT ON public.ticket_messages
FOR EACH ROW
EXECUTE FUNCTION public.trigger_notify_ticket_reply();
-- ============================================================================
-- Trigger 6: Virtual/API Order Receipt (Fulfillment Update)
-- ============================================================================
-- If you use 'order_fulfillments' to track async delivery status
CREATE OR REPLACE FUNCTION public.trigger_notify_fulfillment_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order_user_id uuid;
    v_order_no text;
BEGIN
    -- If status changed to 'success' or specific rejection
    IF (OLD.status != 'success' AND NEW.status = 'success') OR 
       (OLD.status != 'failed' AND NEW.status = 'failed') THEN
       
        IF public.is_notification_enabled('virtual_order_received') THEN
            -- Find Order
            SELECT user_id, order_no INTO v_order_user_id, v_order_no
            FROM public.orders WHERE id = NEW.order_id;
            IF v_order_user_id IS NOT NULL THEN
                IF NEW.status = 'success' THEN
                    PERFORM public.send_auto_message(
                        v_order_user_id,
                        '发货成功 (Delivery Successful)',
                        '您的订单 ' || COALESCE(v_order_no, '') || ' 自动发货处理成功，请查看详情。',
                        'order',
                        '/profile/orders'
                    );
                ELSE
                     PERFORM public.send_auto_message(
                        v_order_user_id,
                        '发货异常 (Delivery Update)',
                        '您的订单 ' || COALESCE(v_order_no, '') || ' 发货处理遇到问题: ' || COALESCE(NEW.reject_reason, '未知原因'),
                        'order',
                        '/profile/orders'
                    );
                END IF;
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS on_fulfillment_update ON public.order_fulfillments;
CREATE TRIGGER on_fulfillment_update
AFTER UPDATE ON public.order_fulfillments
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION public.trigger_notify_fulfillment_update();