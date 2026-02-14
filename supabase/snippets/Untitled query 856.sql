-- ==============================================================================
-- ADMIN PANEL SECURITY HARDENING - RLS SETUP SCRIPT (V4 - COMPREHENSIVE)
-- ==============================================================================
-- Description:
-- Set up Row Level Security (RLS) policies for Admin Users.
-- 
-- CHANGELOG V4:
-- - Fixed INSERT policy syntax (USING -> WITH CHECK).
-- - Added ALL tables from DATABASE_SCHEMA.md.
-- - Replaced 'order_deliveries' with 'order_fulfillments'.
-- - Maintains 'Safe Mode' (skips missing tables).
-- ==============================================================================
-- 1. Helper Function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE auth_user_id = auth.uid() 
    AND status = 'enabled'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 2. Apply Policies (Safe Mode)
-- Helper procedure to apply admin policy safely
CREATE OR REPLACE PROCEDURE enable_admin_rls(tbl text)
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = tbl) THEN
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Admins Full Access" ON %I', tbl);
        -- For ALL operations (SELECT, INSERT, UPDATE, DELETE)
        -- Note: Postgres requires WITH CHECK for INSERT, but USING for others.
        -- When using FOR ALL, the USING clause is applied to both cases (as a barrier).
        -- However, explicit syntax is clearer if we want to be safe, but FOR ALL is standard shorthand.
        -- "If a policy command is ALL, then USING clause is used for both USING and WITH CHECK cases."
        -- So this should work. The previous error was because I used FOR INSERT with USING.
        EXECUTE format('CREATE POLICY "Admins Full Access" ON %I FOR ALL TO authenticated USING (is_admin())', tbl);
    END IF;
END;
$$;
-- Apply to ALL tables from Schema Doc
CALL enable_admin_rls('admin_departments');
CALL enable_admin_rls('banners');
CALL enable_admin_rls('cart_items');
CALL enable_admin_rls('cdk_sku_map');
CALL enable_admin_rls('cdks');
CALL enable_admin_rls('channel_recognitions');
CALL enable_admin_rls('community_articles');
CALL enable_admin_rls('community_categories');
CALL enable_admin_rls('coupon_codes');
CALL enable_admin_rls('coupons');
CALL enable_admin_rls('faq_categories');
CALL enable_admin_rls('faqs');
CALL enable_admin_rls('image_categories');
CALL enable_admin_rls('images');
CALL enable_admin_rls('messages');
CALL enable_admin_rls('order_fulfillments'); -- Corrected name
CALL enable_admin_rls('orders');
CALL enable_admin_rls('pre_orders');
CALL enable_admin_rls('product_categories');
CALL enable_admin_rls('product_sku_map');
CALL enable_admin_rls('product_skus');
CALL enable_admin_rls('products');
CALL enable_admin_rls('profiles');
CALL enable_admin_rls('recharge_orders');
CALL enable_admin_rls('recharge_tiers');
CALL enable_admin_rls('refund_requests');
CALL enable_admin_rls('scheduled_task_logs');
CALL enable_admin_rls('shared_sku_groups');
CALL enable_admin_rls('slot_occupancies');
CALL enable_admin_rls('system_settings');
CALL enable_admin_rls('ticket_messages');
CALL enable_admin_rls('tickets');
CALL enable_admin_rls('user_coupons');
CALL enable_admin_rls('user_favorites');
CALL enable_admin_rls('wallet_transactions');
CALL enable_admin_rls('wechat_login_sessions');
-- Special Handling for admin_users (Read All / Read Self)
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'admin_users') THEN
        ALTER TABLE "admin_users" ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Admins Read All Admin Users" ON "admin_users";
        CREATE POLICY "Admins Read All Admin Users" ON "admin_users" FOR SELECT TO authenticated USING (is_admin());
        
        DROP POLICY IF EXISTS "Read Own Admin Record" ON "admin_users";
        CREATE POLICY "Read Own Admin Record" ON "admin_users" FOR SELECT TO authenticated USING (auth_user_id = auth.uid());
        -- Update/Insert for Admins
        DROP POLICY IF EXISTS "Admins Write All" ON "admin_users";
        CREATE POLICY "Admins Write All" ON "admin_users" FOR UPDATE TO authenticated USING (is_admin());
        
        DROP POLICY IF EXISTS "Admins Insert All" ON "admin_users";
        -- FIX: Use WITH CHECK for INSERT
        CREATE POLICY "Admins Insert All" ON "admin_users" FOR INSERT TO authenticated WITH CHECK (is_admin());
    END IF;
END $$;
-- Cleanup helper procedure
DROP PROCEDURE enable_admin_rls;