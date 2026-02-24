-- =====================================================
-- 清理重复的 RLS 策略，只保留优化后的版本
-- =====================================================

-- 1. coupon_codes - 删除旧策略
DROP POLICY IF EXISTS "Authenticated users full access on coupon_codes" ON public.coupon_codes;

-- 2. coupons - 删除旧策略
DROP POLICY IF EXISTS "Admins full access on coupons" ON public.coupons;
DROP POLICY IF EXISTS "Allow authenticated users to delete coupons" ON public.coupons;
DROP POLICY IF EXISTS "Allow authenticated users to insert coupons" ON public.coupons;
DROP POLICY IF EXISTS "Allow authenticated users to update coupons" ON public.coupons;
DROP POLICY IF EXISTS "Allow authenticated users to view coupons" ON public.coupons;

-- 3. product_sku_map - 删除旧策略
DROP POLICY IF EXISTS "psm_admin_all" ON public.product_sku_map;
DROP POLICY IF EXISTS "psm_public_read" ON public.product_sku_map;

-- 4. product_skus - 删除旧策略
DROP POLICY IF EXISTS "product_skus_admin_delete" ON public.product_skus;
DROP POLICY IF EXISTS "product_skus_admin_insert" ON public.product_skus;
DROP POLICY IF EXISTS "product_skus_admin_update" ON public.product_skus;
DROP POLICY IF EXISTS "product_skus_admin_read" ON public.product_skus;
DROP POLICY IF EXISTS "product_skus_public_read" ON public.product_skus;

-- 5. wechat_login_sessions - 删除旧策略
DROP POLICY IF EXISTS "Allow anonymous insert for scan sessions" ON public.wechat_login_sessions;
DROP POLICY IF EXISTS "Allow anonymous select for scan sessions" ON public.wechat_login_sessions;
DROP POLICY IF EXISTS "Allow anonymous update for scan sessions" ON public.wechat_login_sessions;

-- 6. recharge_tiers - 删除旧策略
DROP POLICY IF EXISTS "Admins have full access to recharge_tiers" ON public.recharge_tiers;
DROP POLICY IF EXISTS "Anyone can read active tiers" ON public.recharge_tiers;

-- 7. slot_occupancies - 删除旧策略
DROP POLICY IF EXISTS "slot_occupancies_select" ON public.slot_occupancies;

-- 8. orders - 删除旧策略
DROP POLICY IF EXISTS "Allow insert via functions" ON public.orders;

-- 9. community_categories - 优化策略
DROP POLICY IF EXISTS "Admins can manage categories" ON public.community_categories;
DROP POLICY IF EXISTS "Admins can read all categories" ON public.community_categories;

-- 10. community_articles - 优化策略
DROP POLICY IF EXISTS "Admins can delete articles" ON public.community_articles;
DROP POLICY IF EXISTS "Admins can insert articles" ON public.community_articles;
DROP POLICY IF EXISTS "Admins can read all articles" ON public.community_articles;
DROP POLICY IF EXISTS "Admins can update articles" ON public.community_articles;

-- 为 community_articles 创建优化后的管理员策略
CREATE POLICY "community_articles_admin_all" ON public.community_articles
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

-- 为 community_categories 创建优化后的管理员策略
CREATE POLICY "community_categories_admin_all" ON public.community_categories
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
