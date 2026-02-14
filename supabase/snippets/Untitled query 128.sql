-- ==============================================================================
-- ADMIN PANEL SECURITY HARDENING - RLS SETUP SCRIPT (V2)
-- ==============================================================================
-- Description:
-- Set up Row Level Security (RLS) policies to allow "Admin Users"
-- to access database tables directly using the Standard Supabase Client.
--
-- CHANGELOG V2: 
-- - Removed non-existent tables (order_items)
-- - Added DROP POLICY IF EXISTS to allow re-running the script without errors
-- ==============================================================================
-- 1. Helper Function: Check if current user is an Admin
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
-- 2. Apply Policies to Tables
-- Products & Categories
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Products" ON "products";
CREATE POLICY "Admins Full Access Products" ON "products" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "product_categories" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Product Categories" ON "product_categories";
CREATE POLICY "Admins Full Access Product Categories" ON "product_categories" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "product_skus" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Product Skus" ON "product_skus";
CREATE POLICY "Admins Full Access Product Skus" ON "product_skus" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "product_sku_map" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Product Sku Map" ON "product_sku_map";
CREATE POLICY "Admins Full Access Product Sku Map" ON "product_sku_map" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "shared_sku_groups" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Shared Sku Groups" ON "shared_sku_groups";
CREATE POLICY "Admins Full Access Shared Sku Groups" ON "shared_sku_groups" FOR ALL TO authenticated USING (is_admin());
-- Users & Profiles
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Profiles" ON "profiles";
CREATE POLICY "Admins Full Access Profiles" ON "profiles" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "admin_users" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Read All Admin Users" ON "admin_users";
CREATE POLICY "Admins Read All Admin Users" ON "admin_users" FOR SELECT TO authenticated USING (is_admin());
DROP POLICY IF EXISTS "Read Own Admin Record" ON "admin_users";
CREATE POLICY "Read Own Admin Record" ON "admin_users" FOR SELECT TO authenticated USING (auth_user_id = auth.uid());
ALTER TABLE "admin_departments" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Admin Departments" ON "admin_departments";
CREATE POLICY "Admins Full Access Admin Departments" ON "admin_departments" FOR ALL TO authenticated USING (is_admin());
-- Orders
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Orders" ON "orders";
CREATE POLICY "Admins Full Access Orders" ON "orders" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "order_deliveries" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Order Deliveries" ON "order_deliveries";
CREATE POLICY "Admins Full Access Order Deliveries" ON "order_deliveries" FOR ALL TO authenticated USING (is_admin());
-- CDKs
ALTER TABLE "cdks" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Cdks" ON "cdks";
CREATE POLICY "Admins Full Access Cdks" ON "cdks" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "cdk_sku_map" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Cdk Sku Map" ON "cdk_sku_map";
CREATE POLICY "Admins Full Access Cdk Sku Map" ON "cdk_sku_map" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "slot_occupancies" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Slots" ON "slot_occupancies";
CREATE POLICY "Admins Full Access Slots" ON "slot_occupancies" FOR ALL TO authenticated USING (is_admin());
-- Tickets & Support
ALTER TABLE "tickets" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Tickets" ON "tickets";
CREATE POLICY "Admins Full Access Tickets" ON "tickets" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "ticket_messages" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Ticket Messages" ON "ticket_messages";
CREATE POLICY "Admins Full Access Ticket Messages" ON "ticket_messages" FOR ALL TO authenticated USING (is_admin());
-- System & Media
ALTER TABLE "system_settings" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access System Settings" ON "system_settings";
CREATE POLICY "Admins Full Access System Settings" ON "system_settings" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Messages" ON "messages";
CREATE POLICY "Admins Full Access Messages" ON "messages" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "images" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Images" ON "images";
CREATE POLICY "Admins Full Access Images" ON "images" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "image_categories" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Image Categories" ON "image_categories";
CREATE POLICY "Admins Full Access Image Categories" ON "image_categories" FOR ALL TO authenticated USING (is_admin());
ALTER TABLE "banners" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins Full Access Banners" ON "banners";
CREATE POLICY "Admins Full Access Banners" ON "banners" FOR ALL TO authenticated USING (is_admin());