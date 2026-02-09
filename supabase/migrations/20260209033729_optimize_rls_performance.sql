-- =====================================================
-- 优化 RLS 策略性能
-- 将 auth.uid() 改为 (SELECT auth.uid()) 以避免每行重新计算
-- =====================================================

-- 1. cart_items 表
DROP POLICY IF EXISTS "Users can delete from their own cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their own cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can view their own cart" ON public.cart_items;
DROP POLICY IF EXISTS "Users can add to their own cart" ON public.cart_items;

CREATE POLICY "cart_items_user_select" ON public.cart_items
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "cart_items_user_insert" ON public.cart_items
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "cart_items_user_update" ON public.cart_items
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "cart_items_user_delete" ON public.cart_items
    FOR DELETE TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- 2. messages 表
DROP POLICY IF EXISTS "Users can update own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can view own messages" ON public.messages;

CREATE POLICY "messages_user_select" ON public.messages
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "messages_user_update" ON public.messages
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- 3. orders 表
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders;

CREATE POLICY "orders_user_select" ON public.orders
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "orders_user_update" ON public.orders
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "orders_admin_select" ON public.orders
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 4. pre_orders 表
DROP POLICY IF EXISTS "Users can update own pre_orders" ON public.pre_orders;
DROP POLICY IF EXISTS "Users can view own pre_orders" ON public.pre_orders;
DROP POLICY IF EXISTS "Users can insert own pre_orders" ON public.pre_orders;
DROP POLICY IF EXISTS "Admins can view all pre_orders" ON public.pre_orders;

CREATE POLICY "pre_orders_user_select" ON public.pre_orders
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "pre_orders_user_insert" ON public.pre_orders
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "pre_orders_user_update" ON public.pre_orders
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "pre_orders_admin_select" ON public.pre_orders
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 5. profiles 表
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "profiles_user_select" ON public.profiles
    FOR SELECT TO authenticated
    USING (id = (SELECT auth.uid()));

CREATE POLICY "profiles_user_update" ON public.profiles
    FOR UPDATE TO authenticated
    USING (id = (SELECT auth.uid()));

-- 6. wallet_transactions 表
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.wallet_transactions;

CREATE POLICY "wallet_transactions_user_select" ON public.wallet_transactions
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- 7. user_coupons 表
DROP POLICY IF EXISTS "Users can view their own coupons" ON public.user_coupons;
DROP POLICY IF EXISTS "Users can insert their own coupons" ON public.user_coupons;
DROP POLICY IF EXISTS "Users can update their own coupons" ON public.user_coupons;
DROP POLICY IF EXISTS "Users can delete their own coupons" ON public.user_coupons;

CREATE POLICY "user_coupons_user_select" ON public.user_coupons
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "user_coupons_user_insert" ON public.user_coupons
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "user_coupons_user_update" ON public.user_coupons
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "user_coupons_user_delete" ON public.user_coupons
    FOR DELETE TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- 8. user_favorites 表
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can add their own favorites" ON public.user_favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON public.user_favorites;

CREATE POLICY "user_favorites_user_select" ON public.user_favorites
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "user_favorites_user_insert" ON public.user_favorites
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "user_favorites_user_delete" ON public.user_favorites
    FOR DELETE TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- 9. tickets 表
DROP POLICY IF EXISTS "Users can view own tickets" ON public.tickets;
DROP POLICY IF EXISTS "Users can create tickets" ON public.tickets;
DROP POLICY IF EXISTS "Users can update own tickets" ON public.tickets;

CREATE POLICY "tickets_user_select" ON public.tickets
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "tickets_user_insert" ON public.tickets
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "tickets_user_update" ON public.tickets
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()));

-- 10. refund_requests 表
DROP POLICY IF EXISTS "Users can view own refund requests" ON public.refund_requests;
DROP POLICY IF EXISTS "Users can create refund requests" ON public.refund_requests;

CREATE POLICY "refund_requests_user_select" ON public.refund_requests
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "refund_requests_user_insert" ON public.refund_requests
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

-- 11. recharge_orders 表
DROP POLICY IF EXISTS "Users can view own recharge orders" ON public.recharge_orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.recharge_orders;

CREATE POLICY "recharge_orders_user_select" ON public.recharge_orders
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "recharge_orders_user_insert" ON public.recharge_orders
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));
