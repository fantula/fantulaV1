-- Migration: add_scheduler_task_functions
-- Synced from cloud Supabase

-- 1. release_preorder_resources (Dependency for cleanup)
CREATE OR REPLACE FUNCTION public.release_preorder_resources(p_preorder_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_preorder RECORD;
    v_sku_type TEXT;
    v_cdk_id UUID;
    v_slot_id UUID;
    v_restore_count INTEGER;
BEGIN
    -- 获取预订单信息
    SELECT * INTO v_preorder FROM pre_orders WHERE id = p_preorder_id;
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    -- 获取 SKU 类型
    v_sku_type := v_preorder.sku_snapshot->>'product_type';
    
    IF v_sku_type IS NULL THEN
        -- 兼容：从 product_snapshot 获取
        v_sku_type := v_preorder.product_snapshot->>'product_type';
    END IF;
    
    -- 根据类型释放资源
    IF v_sku_type = 'virtual' THEN
        -- [修正] 虚拟充值：按数组长度恢复库存
        -- 使用 unnest + GROUP BY 聚合，防止同一 CDK 多次更新
        IF v_preorder.locked_cdk_ids IS NOT NULL THEN
            UPDATE cdks c
            SET stock = c.stock + agg.restore_count
            FROM (
                SELECT unnest_id AS cdk_id, COUNT(*) AS restore_count
                FROM unnest(v_preorder.locked_cdk_ids) AS unnest_id
                GROUP BY unnest_id
            ) AS agg
            WHERE c.id = agg.cdk_id;
        END IF;
        
    ELSIF v_sku_type = 'shared_account' THEN
        -- 账号合租：恢复槽位状态为 idle
        IF v_preorder.locked_slot_ids IS NOT NULL THEN
            FOREACH v_slot_id IN ARRAY v_preorder.locked_slot_ids
            LOOP
                UPDATE slot_occupancies 
                SET status = 'idle', pre_order_id = NULL 
                WHERE id = v_slot_id;
            END LOOP;
        END IF;
        
    ELSIF v_sku_type = 'one_time_cdk' THEN
        -- 一次性CDK：恢复CDK状态为 idle
        IF v_preorder.locked_cdk_ids IS NOT NULL THEN
            FOREACH v_cdk_id IN ARRAY v_preorder.locked_cdk_ids
            LOOP
                UPDATE cdks 
                SET status = 'idle', pre_order_id = NULL 
                WHERE id = v_cdk_id;
            END LOOP;
        END IF;
    END IF;
    
    RETURN TRUE;
END;
$function$;

-- 2. cleanup_expired_preorders
CREATE OR REPLACE FUNCTION public.cleanup_expired_preorders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
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

-- 3. cleanup_expired_order_fulfillments
CREATE OR REPLACE FUNCTION public.cleanup_expired_order_fulfillments()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_count INTEGER := 0;
BEGIN
    -- 删除关联到已过期订单的回执记录
    DELETE FROM order_fulfillments
    WHERE order_id IN (
        SELECT id FROM orders 
        WHERE status = 'expired'
          AND expires_at < NOW() - INTERVAL '7 days'
    );
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES ('cleanup_expired_order_fulfillments', 'success', v_count);
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

-- 4. cleanup_old_expired_preorders
CREATE OR REPLACE FUNCTION public.cleanup_old_expired_preorders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
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

-- 5. expire_active_orders
CREATE OR REPLACE FUNCTION public.expire_active_orders()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_count INTEGER := 0;
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
        VALUES ('expire_active_orders', 'success', v_count);
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

-- 6. release_expired_pre_orders (Legacy but kept for compatibility)
CREATE OR REPLACE FUNCTION public.release_expired_pre_orders()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_count INTEGER := 0;
  v_pre_order RECORD;
  v_item JSONB;
BEGIN
  -- 查找所有过期的 pending 预订单
  FOR v_pre_order IN 
    SELECT * FROM pre_orders 
    WHERE status = 'pending' AND expires_at < NOW()
    FOR UPDATE SKIP LOCKED
  LOOP
    -- 释放一次性激活码的锁定
    UPDATE cdks SET status = 'idle', pre_order_id = NULL
    WHERE pre_order_id = v_pre_order.id;
    
    -- 释放虚拟充值的预扣
    FOR v_item IN SELECT * FROM jsonb_array_elements(v_pre_order.items)
    LOOP
      IF v_item->>'cdk_type' = 'virtual' THEN
        UPDATE cdks c
        SET stock = stock + (v_item->>'quantity')::INTEGER
        FROM cdk_sku_map csm
        WHERE csm.cdk_id = c.id
          AND csm.sku_id = (v_item->>'sku_id')::UUID
          AND c.cdk_type = 'virtual';
      END IF;
    END LOOP;
    
    -- 更新状态
    UPDATE pre_orders SET status = 'expired' WHERE id = v_pre_order.id;
    v_count := v_count + 1;
  END LOOP;
  
  RETURN v_count;
END;
$function$;
