-- ==============================================================================
-- ADMIN PANEL SECURITY HARDENING - RLS SETUP SCRIPT (V3 - ROBUST)
-- ==============================================================================
-- Description:
-- Set up Row Level Security (RLS) policies for Admin Users.
-- 
-- CHANGELOG V3:
-- - Uses DO $$ blocks to check if tables exist before applying policies.
-- - Will NOT fail if a table is missing (it simply skips it).
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
        EXECUTE format('CREATE POLICY "Admins Full Access" ON %I FOR ALL TO authenticated USING (is_admin())', tbl);
    END IF;
END;
$$;
-- Apply to all potential tables
CALL enable_admin_rls('products');
CALL enable_admin_rls('product_categories');
CALL enable_admin_rls('product_skus');
CALL enable_admin_rls('product_sku_map');
CALL enable_admin_rls('shared_sku_groups');
CALL enable_admin_rls('profiles');
CALL enable_admin_rls('admin_departments');
CALL enable_admin_rls('orders');
CALL enable_admin_rls('order_items'); -- Will skip if missing
CALL enable_admin_rls('order_deliveries'); -- Will skip if missing
CALL enable_admin_rls('cdks');
CALL enable_admin_rls('cdk_sku_map');
CALL enable_admin_rls('slot_occupancies');
CALL enable_admin_rls('tickets');
CALL enable_admin_rls('ticket_messages');
CALL enable_admin_rls('system_settings');
CALL enable_admin_rls('messages');
CALL enable_admin_rls('images');
CALL enable_admin_rls('image_categories');
CALL enable_admin_rls('banners');
CALL enable_admin_rls('coupons');
CALL enable_admin_rls('recharge_plans');
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
        CREATE POLICY "Admins Insert All" ON "admin_users" FOR INSERT TO authenticated USING (is_admin());
    END IF;
END $$;
-- Cleanup helper procedure
DROP PROCEDURE enable_admin_rls;