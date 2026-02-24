-- ==========================================
-- 定时任务数据库函数
-- ==========================================

-- 1. 修改清理过期预订单函数：将过期的 pending 预订单改为 deleted（而非 expired）
CREATE OR REPLACE FUNCTION public.cleanup_expired_preorders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_preorder RECORD;
    v_count INTEGER := 0;
    v_error_count INTEGER := 0;
BEGIN
    -- 遍历所有过期的 pending 预订单
    FOR v_preorder IN 
        SELECT * FROM pre_orders 
        WHERE status = 'pending' 
          AND expires_at < NOW()
        FOR UPDATE SKIP LOCKED
    LOOP
        BEGIN
            -- 释放资源
            PERFORM release_preorder_resources(v_preorder.id);
            
            -- 更新状态为 deleted（用户下单后未支付）
            UPDATE pre_orders 
            SET status = 'deleted' 
            WHERE id = v_preorder.id;
            
            v_count := v_count + 1;
        EXCEPTION WHEN OTHERS THEN
            v_error_count := v_error_count + 1;
        END;
    END LOOP;
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES (
            'cleanup_expired_preorders', 
            CASE WHEN v_error_count = 0 THEN 'success' ELSE 'error' END,
            v_count
        );
    EXCEPTION WHEN OTHERS THEN
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'error_count', v_error_count,
        'task_name', 'cleanup_expired_preorders'
    );
END;
$function$;

-- 2. 新增：将过期的主订单状态改为 expired
-- 订单的 expires_at 过期后，将 status 从 active 改为 expired
CREATE OR REPLACE FUNCTION public.expire_active_orders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_count INTEGER := 0;
    v_error_count INTEGER := 0;
BEGIN
    -- 将所有过期的 active 订单改为 expired
    UPDATE orders 
    SET status = 'expired'
    WHERE status = 'active' 
      AND expires_at IS NOT NULL
      AND expires_at < NOW();
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES (
            'expire_active_orders', 
            'success',
            v_count
        );
    EXCEPTION WHEN OTHERS THEN
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'task_name', 'expire_active_orders'
    );
END;
$function$;

-- 3. 新增：清理过期订单的回执信息（order_fulfillments）
-- 删除已过期订单（status = 'expired'）关联的回执记录
CREATE OR REPLACE FUNCTION public.cleanup_expired_order_fulfillments()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_count INTEGER := 0;
    v_error_count INTEGER := 0;
BEGIN
    -- 删除关联到已过期订单的回执记录
    DELETE FROM order_fulfillments
    WHERE order_id IN (
        SELECT id FROM orders 
        WHERE status = 'expired'
          AND expires_at < NOW() - INTERVAL '7 days'  -- 过期超过7天的订单
    );
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES (
            'cleanup_expired_order_fulfillments', 
            'success',
            v_count
        );
    EXCEPTION WHEN OTHERS THEN
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'task_name', 'cleanup_expired_order_fulfillments'
    );
END;
$function$;

-- 4. 新增：清理未验证用户（如果不存在则创建）
-- 清理超过24小时未验证邮箱的 auth 用户（仅删除 auth.users 中未验证的记录）
CREATE OR REPLACE FUNCTION public.cleanup_unverified_users()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_count INTEGER := 0;
    v_error_count INTEGER := 0;
BEGIN
    -- 删除超过24小时且邮箱未验证的用户
    -- 注意：只删除没有关联 profile 的未验证用户（通过 auth.users 的 email_confirmed_at 判断）
    -- 由于 Supabase auth.users 表需要通过 Admin API 操作，这里仅清理 profiles 表中的孤儿记录
    
    -- 清理没有对应 auth 用户的 profile 记录（通常不会发生，但作为安全措施）
    -- 实际的 auth.users 清理需要通过 Supabase Admin API 完成
    
    -- 目前实现：记录需要清理的数量（实际清理需调用 Admin API）
    SELECT COUNT(*) INTO v_count
    FROM auth.users u
    WHERE u.email_confirmed_at IS NULL
      AND u.created_at < NOW() - INTERVAL '24 hours'
      AND NOT EXISTS (
          SELECT 1 FROM profiles p 
          WHERE p.id = u.id 
            AND p.balance > 0  -- 有余额的不清理
      );
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES (
            'cleanup_unverified_users', 
            'success',
            v_count
        );
    EXCEPTION WHEN OTHERS THEN
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'task_name', 'cleanup_unverified_users',
        'note', '仅统计数量，实际删除需通过 Admin API'
    );
END;
$function$;

-- 5. 新增：清理已过期的预订单（已经是 expired 状态的再清理为 deleted）
-- 超过30天的 expired 预订单，彻底删除或标记为 deleted
CREATE OR REPLACE FUNCTION public.cleanup_old_expired_preorders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_count INTEGER := 0;
BEGIN
    -- 将超过30天的 expired 预订单改为 deleted
    UPDATE pre_orders 
    SET status = 'deleted'
    WHERE status = 'expired' 
      AND expires_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES ('cleanup_old_expired_preorders', 'success', v_count);
    EXCEPTION WHEN OTHERS THEN
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'task_name', 'cleanup_old_expired_preorders'
    );
END;
$function$;

-- 添加 scheduled_task_logs 表的 error 字段（如果不存在）
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'scheduled_task_logs' 
          AND column_name = 'error'
    ) THEN
        ALTER TABLE scheduled_task_logs ADD COLUMN error text;
    END IF;
END
$$;
