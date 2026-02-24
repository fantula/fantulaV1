-- =====================================================
-- 修复 banners, images, image_categories, product_categories 表的 RLS
-- 策略：公开可读，仅管理员可写
-- =====================================================

-- 1. banners 表
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- 公开可读
CREATE POLICY "banners_public_read" ON public.banners
    FOR SELECT USING (true);

-- 管理员可写 (通过检查 admin_users 表)
CREATE POLICY "banners_admin_write" ON public.banners
    FOR ALL 
    TO authenticated
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

-- 2. images 表
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "images_public_read" ON public.images
    FOR SELECT USING (true);

CREATE POLICY "images_admin_write" ON public.images
    FOR ALL 
    TO authenticated
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

-- 3. image_categories 表
ALTER TABLE public.image_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "image_categories_public_read" ON public.image_categories
    FOR SELECT USING (true);

CREATE POLICY "image_categories_admin_write" ON public.image_categories
    FOR ALL 
    TO authenticated
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

-- 4. product_categories 表
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "product_categories_public_read" ON public.product_categories
    FOR SELECT USING (true);

CREATE POLICY "product_categories_admin_write" ON public.product_categories
    FOR ALL 
    TO authenticated
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
