-- =====================================================
-- 优化管理员相关 RLS 策略
-- =====================================================

-- 1. cdks 表 - 清理重复策略，优化性能
DROP POLICY IF EXISTS "Admins can delete cdks" ON public.cdks;
DROP POLICY IF EXISTS "Admins can insert cdks" ON public.cdks;
DROP POLICY IF EXISTS "Admins can update cdks" ON public.cdks;
DROP POLICY IF EXISTS "Admins can view all cdks" ON public.cdks;
DROP POLICY IF EXISTS "cdks_admin_only" ON public.cdks;
DROP POLICY IF EXISTS "Users can view assigned cdks" ON public.cdks;
DROP POLICY IF EXISTS "users_view_own_order_cdks" ON public.cdks;

-- 管理员完全访问
CREATE POLICY "cdks_admin_all" ON public.cdks
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

-- 用户查看自己订单关联的CDK
CREATE POLICY "cdks_user_view_own" ON public.cdks
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.user_id = (SELECT auth.uid())
            AND (
                (o.cdk_snapshot -> 'locked_cdk_ids') @> to_jsonb(cdks.id)
                OR o.cdk_snapshot @> to_jsonb(cdks.id)
            )
        )
        OR
        EXISTS (
            SELECT 1 FROM public.pre_orders po
            WHERE po.user_id = (SELECT auth.uid())
            AND cdks.id = ANY(po.locked_cdk_ids)
        )
    );

-- 2. faqs 表
DROP POLICY IF EXISTS "Allow admin full access on faqs" ON public.faqs;

CREATE POLICY "faqs_admin_all" ON public.faqs
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

-- 3. faq_categories 表
DROP POLICY IF EXISTS "Allow admin full access on faq_categories" ON public.faq_categories;

CREATE POLICY "faq_categories_admin_all" ON public.faq_categories
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

-- 4. products 表 - 清理重复策略
DROP POLICY IF EXISTS "admin_users_can_delete_products" ON public.products;
DROP POLICY IF EXISTS "admin_users_can_insert_products" ON public.products;
DROP POLICY IF EXISTS "admin_users_can_update_products" ON public.products;
DROP POLICY IF EXISTS "admin_users_can_select_all_products" ON public.products;

CREATE POLICY "products_admin_all" ON public.products
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

-- 5. order_fulfillments 表
DROP POLICY IF EXISTS "用户可管理自己订单的回执" ON public.order_fulfillments;
DROP POLICY IF EXISTS "管理员完全访问回执" ON public.order_fulfillments;

CREATE POLICY "order_fulfillments_user" ON public.order_fulfillments
    FOR ALL TO authenticated
    USING (
        order_id IN (
            SELECT id FROM public.orders 
            WHERE user_id = (SELECT auth.uid())
        )
    )
    WITH CHECK (
        order_id IN (
            SELECT id FROM public.orders 
            WHERE user_id = (SELECT auth.uid())
        )
    );

CREATE POLICY "order_fulfillments_admin" ON public.order_fulfillments
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

-- 6. ticket_messages 表
DROP POLICY IF EXISTS "Users can view messages of own tickets" ON public.ticket_messages;
DROP POLICY IF EXISTS "Users can send messages to own tickets" ON public.ticket_messages;

CREATE POLICY "ticket_messages_user_select" ON public.ticket_messages
    FOR SELECT TO authenticated
    USING (
        ticket_id IN (
            SELECT id FROM public.tickets 
            WHERE user_id = (SELECT auth.uid())
        )
    );

CREATE POLICY "ticket_messages_user_insert" ON public.ticket_messages
    FOR INSERT TO authenticated
    WITH CHECK (
        ticket_id IN (
            SELECT id FROM public.tickets 
            WHERE user_id = (SELECT auth.uid())
        )
    );
