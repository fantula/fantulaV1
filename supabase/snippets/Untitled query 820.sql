-- ============================================================================
-- Message System Fix: Revert Smart Merge & Fix Triggers
-- ============================================================================
-- 1. REVERT: Drop the "Smart" Wallet Trigger
DROP TRIGGER IF EXISTS on_wallet_transaction ON public.wallet_transactions;
DROP FUNCTION IF EXISTS public.trigger_notify_wallet_transaction();
-- 2. RESTORE: Simple Balance Trigger on Profiles
-- This ensures we catch ALL balance changes, even if it means potential duplicates with orders.
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
-- 3. FIX: Virtual/API Order Receipt (Fulfillment Update)
-- This was missing in the previous update.
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
    -- If status changed to 'success' or 'failed'
    IF (OLD.status != 'success' AND NEW.status = 'success') OR 
       (OLD.status != 'failed' AND NEW.status = 'failed') THEN
       
        IF public.is_notification_enabled('virtual_order_received') THEN
            -- Find Order info
            SELECT user_id, order_no INTO v_order_user_id, v_order_no
            FROM public.orders WHERE id = NEW.order_id;
            IF v_order_user_id IS NOT NULL THEN
                
                v_title := public.get_notification_field('virtual_order_received', 'title');
                tmpl := public.get_notification_field('virtual_order_received', 'template');
                
                content := replace(tmpl, '{order_no}', COALESCE(v_order_no, ''));
                -- Append specific failure reason if failed, as template might be generic
                IF NEW.status = 'failed' THEN
                    content := content || ' (原因: ' || COALESCE(NEW.reject_reason, '未知') || ')';
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
