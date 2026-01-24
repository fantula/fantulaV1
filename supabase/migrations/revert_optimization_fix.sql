-- ============================================================================
-- Message System Fix: Revert Smart Merge & Fix Triggers (Final Version)
-- ============================================================================

-- 1. REVERT: Drop the "Smart" Wallet Trigger
DROP TRIGGER IF EXISTS on_wallet_transaction ON public.wallet_transactions;
DROP FUNCTION IF EXISTS public.trigger_notify_wallet_transaction();

-- 2. RESTORE: Simple Balance Trigger on Profiles
-- This ensures we catch ALL balance changes, even if it meant potential duplicates with orders.
CREATE OR REPLACE FUNCTION public.trigger_notify_balance_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    diff numeric;
    v_title text;
    tmpl text;
    content text;
BEGIN
    IF public.is_notification_enabled('quota_changed') THEN
        diff := NEW.balance - OLD.balance;
        
        -- Get Config
        v_title := public.get_notification_field('quota_changed', 'title');
        tmpl := public.get_notification_field('quota_changed', 'template');
        
        -- Variable Substitution
        content := replace(tmpl, '{balance}', NEW.balance::text);
        content := replace(content, '{amount}', abs(diff)::text);

        IF diff != 0 THEN
             PERFORM public.send_auto_message(
                NEW.id,
                v_title,
                content,
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


-- 3. FIX: Order Shipped Logic (User defined: pending_delivery -> active means Shipped)
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
    -- Shipped / Active: When status changes from 'pending_delivery' to 'active'
    -- Or just generic 'active' check if simple transition
    IF OLD.status != 'active' AND NEW.status = 'active' THEN
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

    -- Completed (if separate from active, kept for safety)
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


-- 4. FIX: Virtual/API Order Receipt (Fulfillment Update)
-- Corrected Status: 'approved' / 'rejected' (User confirmed)
CREATE OR REPLACE FUNCTION public.trigger_notify_fulfillment_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order_user_id uuid;
    v_order_no text;
    v_title text;
    tmpl text;
    content text;
BEGIN
    -- If status changed to 'approved' or 'rejected'
    IF (OLD.status != 'approved' AND NEW.status = 'approved') OR 
       (OLD.status != 'rejected' AND NEW.status = 'rejected') THEN
       
        IF public.is_notification_enabled('virtual_order_received') THEN
            -- Find Order info
            SELECT user_id, order_no INTO v_order_user_id, v_order_no
            FROM public.orders WHERE id = NEW.order_id;

            IF v_order_user_id IS NOT NULL THEN
                
                v_title := public.get_notification_field('virtual_order_received', 'title');
                tmpl := public.get_notification_field('virtual_order_received', 'template');
                
                content := replace(tmpl, '{order_no}', COALESCE(v_order_no, ''));

                -- Append specific failure reason if failed, as template might be generic
                IF NEW.status = 'rejected' THEN
                    content := content || ' (结果: 失败/驳回, 原因: ' || COALESCE(NEW.reject_reason, '未知') || ')';
                ELSE
                    content := content || ' (结果: 成功)';
                END IF;

                PERFORM public.send_auto_message(
                    v_order_user_id,
                    v_title,
                    content,
                    'order',
                    '/profile/orders'
                );
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
