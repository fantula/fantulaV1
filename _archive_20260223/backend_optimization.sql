-- ============================================
-- 后端优化 SQL 执行脚本
-- ============================================
-- 用途：在本地 Supabase 数据库上执行后端优化
-- 执行方式：supabase db execute -f scripts/backend_optimization.sql
-- 注意：此脚本基于当前本地数据库状态，不涉及云端同步
-- ============================================

-- ============================================
-- Part 1: 修复函数 search_path 安全问题
-- ============================================
-- 说明：为所有 SECURITY DEFINER 函数设置 search_path
-- 这是一个动态脚本，会查询当前存在的函数并修复

DO $$
DECLARE
    func_record RECORD;
    alter_sql TEXT;
    success_count INT := 0;
    error_count INT := 0;
BEGIN
    RAISE NOTICE '开始修复函数 search_path...';
    
    FOR func_record IN 
        SELECT 
            p.proname as func_name,
            pg_get_function_identity_arguments(p.oid) as func_args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND p.prosecdef = true  -- SECURITY DEFINER 函数
    LOOP
        BEGIN
            -- 构建 ALTER FUNCTION 语句
            alter_sql := format(
                'ALTER FUNCTION public.%I(%s) SET search_path = public, pg_temp',
                func_record.func_name,
                func_record.func_args
            );
            
            EXECUTE alter_sql;
            success_count := success_count + 1;
            RAISE NOTICE '✓ 修复: %(%)', func_record.func_name, func_record.func_args;
            
        EXCEPTION WHEN OTHERS THEN
            error_count := error_count + 1;
            RAISE WARNING '✗ 失败: %(%) - %', func_record.func_name, func_record.func_args, SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '========================================';
    RAISE NOTICE 'search_path 修复完成: 成功 %, 失败 %', success_count, error_count;
    RAISE NOTICE '========================================';
END $$;

-- ============================================
-- Part 2: 添加缺失的外键索引
-- ============================================
-- 说明：为频繁查询的外键添加索引，提升查询性能

-- banners.image_id
CREATE INDEX IF NOT EXISTS idx_banners_image_id 
ON public.banners(image_id);

-- cart_items.sku_id (如果不存在)
CREATE INDEX IF NOT EXISTS idx_cart_items_sku_id 
ON public.cart_items(sku_id);

-- channel_recognitions.product_id (如果表存在)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'channel_recognitions') THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_channel_recognitions_product_id ON public.channel_recognitions(product_id)';
        RAISE NOTICE '✓ 已创建索引: idx_channel_recognitions_product_id';
    ELSE
        RAISE NOTICE '- 跳过: channel_recognitions 表不存在';
    END IF;
END $$;

DO $$ BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '索引创建完成';
    RAISE NOTICE '========================================';
END $$;

-- ============================================
-- Part 3: 修复 RLS 策略缺失问题
-- ============================================
-- 说明：为启用了 RLS 但没有策略的表添加策略

-- channel_recognitions 表 (如果存在且需要策略)
DO $$
BEGIN
    -- 检查表是否存在
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'channel_recognitions') THEN
        RAISE NOTICE '- 跳过 RLS: channel_recognitions 表不存在';
        RETURN;
    END IF;
    
    -- 检查是否已有策略
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'channel_recognitions') THEN
        RAISE NOTICE '- 跳过 RLS: channel_recognitions 已有策略';
        RETURN;
    END IF;
    
    -- 创建公开读取策略
    EXECUTE 'CREATE POLICY "channel_recognitions_public_read" ON public.channel_recognitions FOR SELECT USING (true)';
    RAISE NOTICE '✓ 已创建策略: channel_recognitions_public_read';
    
    -- 创建管理员完全访问策略
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'is_admin') THEN
        EXECUTE 'CREATE POLICY "channel_recognitions_admin_all" ON public.channel_recognitions FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin())';
        RAISE NOTICE '✓ 已创建策略: channel_recognitions_admin_all';
    ELSE
        RAISE NOTICE '- 跳过管理员策略: is_admin 函数不存在';
    END IF;
    
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING '✗ RLS 策略创建失败: %', SQLERRM;
END $$;

-- ============================================
-- Part 4: 验证结果
-- ============================================

DO $$
DECLARE
    func_count INT;
    index_count INT;
BEGIN
    -- 统计已修复的函数
    SELECT COUNT(*) INTO func_count
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.prosecdef = true
    AND p.proconfig IS NOT NULL 
    AND 'search_path=public, pg_temp' = ANY(p.proconfig);
    
    -- 统计新增的索引
    SELECT COUNT(*) INTO index_count
    FROM pg_indexes
    WHERE schemaname = 'public'
    AND indexname IN ('idx_banners_image_id', 'idx_cart_items_sku_id', 'idx_channel_recognitions_product_id');
    
    RAISE NOTICE '========================================';
    RAISE NOTICE '优化结果验证';
    RAISE NOTICE '========================================';
    RAISE NOTICE '已设置 search_path 的 SECURITY DEFINER 函数: %', func_count;
    RAISE NOTICE '新增索引数量: %', index_count;
    RAISE NOTICE '========================================';
END $$;

-- 完成
SELECT '后端优化脚本执行完成' AS status;
