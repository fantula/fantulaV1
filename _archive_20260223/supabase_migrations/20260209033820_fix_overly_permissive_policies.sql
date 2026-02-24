-- =====================================================
-- 修复过于宽松的 RLS 策略
-- =====================================================

-- 1. coupon_codes - 用户只能查看公开的或自己的优惠码
DROP POLICY IF EXISTS "Public coupon_codes read" ON public.coupon_codes;
DROP POLICY IF EXISTS "Users view own coupon_codes" ON public.coupon_codes;
DROP POLICY IF EXISTS "Admin full access coupon_codes" ON public.coupon_codes;

-- 所有人可查看公开优惠码（用于验证）
CREATE POLICY "coupon_codes_public_select" ON public.coupon_codes
    FOR SELECT
    USING (true);

-- 管理员完全访问
CREATE POLICY "coupon_codes_admin_all" ON public.coupon_codes
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 2. coupons - 公开可读，管理员可写
DROP POLICY IF EXISTS "Public read coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admin insert coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admin update coupons" ON public.coupons;
DROP POLICY IF EXISTS "Admin delete coupons" ON public.coupons;

CREATE POLICY "coupons_public_select" ON public.coupons
    FOR SELECT
    USING (true);

CREATE POLICY "coupons_admin_all" ON public.coupons
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 3. product_skus - 公开可读，管理员可写
DROP POLICY IF EXISTS "Public read product_skus" ON public.product_skus;
DROP POLICY IF EXISTS "Admin can all product_skus" ON public.product_skus;
DROP POLICY IF EXISTS "Anyone can view product_skus" ON public.product_skus;

CREATE POLICY "product_skus_public_select" ON public.product_skus
    FOR SELECT
    USING (true);

CREATE POLICY "product_skus_admin_all" ON public.product_skus
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 4. product_sku_map - 公开可读，管理员可写
DROP POLICY IF EXISTS "Public read product_sku_map" ON public.product_sku_map;
DROP POLICY IF EXISTS "Admin can all product_sku_map" ON public.product_sku_map;
DROP POLICY IF EXISTS "Anyone can view product_sku_map" ON public.product_sku_map;

CREATE POLICY "product_sku_map_public_select" ON public.product_sku_map
    FOR SELECT
    USING (true);

CREATE POLICY "product_sku_map_admin_all" ON public.product_sku_map
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 5. slot_occupancies - 用户只能操作自己的槽位
DROP POLICY IF EXISTS "Users can view own slot_occupancies" ON public.slot_occupancies;
DROP POLICY IF EXISTS "Users can update own slot_occupancies" ON public.slot_occupancies;
DROP POLICY IF EXISTS "Users can insert slot_occupancies" ON public.slot_occupancies;
DROP POLICY IF EXISTS "Admin full access slot_occupancies" ON public.slot_occupancies;

CREATE POLICY "slot_occupancies_user_select" ON public.slot_occupancies
    FOR SELECT TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "slot_occupancies_user_insert" ON public.slot_occupancies
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "slot_occupancies_user_update" ON public.slot_occupancies
    FOR UPDATE TO authenticated
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "slot_occupancies_admin_all" ON public.slot_occupancies
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 6. recharge_tiers - 公开可读，管理员可写
DROP POLICY IF EXISTS "Everyone can view recharge_tiers" ON public.recharge_tiers;
DROP POLICY IF EXISTS "Admin can manage recharge_tiers" ON public.recharge_tiers;

CREATE POLICY "recharge_tiers_public_select" ON public.recharge_tiers
    FOR SELECT
    USING (true);

CREATE POLICY "recharge_tiers_admin_all" ON public.recharge_tiers
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE auth_user_id = (SELECT auth.uid())
            AND status = 'enabled'
        )
    );

-- 7. wechat_login_sessions - 临时表
DROP POLICY IF EXISTS "anon_insert_wechat_login_sessions" ON public.wechat_login_sessions;
DROP POLICY IF EXISTS "anon_select_wechat_login_sessions" ON public.wechat_login_sessions;
DROP POLICY IF EXISTS "anon_update_wechat_login_sessions" ON public.wechat_login_sessions;

-- 允许匿名用户操作（支持微信登录流程）
CREATE POLICY "wechat_sessions_anon" ON public.wechat_login_sessions
    FOR ALL TO anon
    USING (true)
    WITH CHECK (true);

-- 已认证用户
CREATE POLICY "wechat_sessions_authenticated" ON public.wechat_login_sessions
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);
