


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."admin_delete_coupon_codes"("p_ids" "uuid"[]) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_deleted_count INTEGER;
BEGIN
    -- REMOVED: auth.uid() check - service_role key is trusted

    DELETE FROM coupon_codes WHERE id = ANY(p_ids);
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

    RETURN jsonb_build_object(
        'success', true,
        'count', v_deleted_count
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '删除失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."admin_delete_coupon_codes"("p_ids" "uuid"[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_generate_coupon_codes"("p_coupon_id" "uuid", "p_quantity" integer DEFAULT 1, "p_mode" "text" DEFAULT 'random'::"text", "p_custom_code" "text" DEFAULT NULL::"text", "p_usage_limit" integer DEFAULT 1) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_coupon_exists BOOLEAN;
    v_generated_count INTEGER := 0;
    v_new_code TEXT;
    i INTEGER;
    k INTEGER;
    v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    v_rnd_str TEXT;
BEGIN
    -- REMOVED: auth.uid() check - service_role key is trusted
    -- Access control is handled at API level (only admin backend calls this)

    SELECT EXISTS(SELECT 1 FROM coupons WHERE id = p_coupon_id) INTO v_coupon_exists;
    IF NOT v_coupon_exists THEN
         RETURN jsonb_build_object('success', false, 'error', '优惠券规则不存在');
    END IF;

    IF p_mode = 'universal' THEN
        IF p_custom_code IS NULL OR length(p_custom_code) < 3 THEN
             RETURN jsonb_build_object('success', false, 'error', '通用码长度需大于3位');
        END IF;
        
        IF EXISTS(SELECT 1 FROM coupon_codes WHERE code = UPPER(p_custom_code)) THEN
             RETURN jsonb_build_object('success', false, 'error', '该兑换码已存在');
        END IF;

        INSERT INTO coupon_codes (coupon_id, code, max_usage, used_count, status)
        VALUES (p_coupon_id, UPPER(p_custom_code), p_usage_limit, 0, 'available');
        
        v_generated_count := 1;
        
    ELSE
        IF p_quantity <= 0 OR p_quantity > 10000 THEN
             RETURN jsonb_build_object('success', false, 'error', '单次生成数量限制 1-10000');
        END IF;

        FOR i IN 1..p_quantity LOOP
            LOOP
                v_rnd_str := '';
                FOR k IN 1..12 LOOP
                    v_rnd_str := v_rnd_str || substr(v_chars, floor(random() * length(v_chars) + 1)::integer, 1);
                END LOOP;
                
                -- Format: XXX-XXX-XXX-XXX (3-3-3-3)
                v_new_code := substr(v_rnd_str, 1, 3) || '-' || substr(v_rnd_str, 4, 3) || '-' || substr(v_rnd_str, 7, 3) || '-' || substr(v_rnd_str, 10, 3);

                IF NOT EXISTS(SELECT 1 FROM coupon_codes WHERE code = v_new_code) THEN
                    EXIT;
                END IF;
            END LOOP;

            INSERT INTO coupon_codes (coupon_id, code, max_usage, used_count, status)
            VALUES (p_coupon_id, v_new_code, 1, 0, 'available');
            
            v_generated_count := v_generated_count + 1;
        END LOOP;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'count', v_generated_count,
        'mode', p_mode
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '生成失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."admin_generate_coupon_codes"("p_coupon_id" "uuid", "p_quantity" integer, "p_mode" "text", "p_custom_code" "text", "p_usage_limit" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."apply_coupon_to_pre_order"("p_pre_order_id" "uuid", "p_coupon_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_pre_order RECORD;
    v_discount_result JSONB;
    v_sku_id_text TEXT;
    v_sku_id UUID;
    v_sku_ids UUID[];
    v_discount_amount DECIMAL(10, 2) := 0;
    v_final_amount DECIMAL(10, 2);
    v_original_amount DECIMAL(10, 2);
BEGIN
    SELECT * INTO v_pre_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
    IF v_pre_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可修改');
    END IF;

    -- Determine Original Amount
    IF v_pre_order.original_amount IS NOT NULL THEN
        v_original_amount := v_pre_order.original_amount;
    ELSE
        v_original_amount := v_pre_order.total_amount;
        UPDATE pre_orders SET original_amount = v_original_amount WHERE id = p_pre_order_id;
    END IF;

    -- Case A: Remove Coupon
    IF p_coupon_id IS NULL THEN
        UPDATE pre_orders 
        SET coupon_id = NULL, 
            discount_amount = 0, 
            total_amount = v_original_amount 
        WHERE id = p_pre_order_id;
        
        RETURN jsonb_build_object(
            'success', true, 
            'total_amount', v_original_amount,
            'discount_amount', 0
        );
    END IF;

    -- Case B: Apply Coupon
    -- SAFE GUARD: Extract SKU ID safely
    v_sku_id_text := v_pre_order.sku_snapshot->>'sku_id';
    
    IF v_sku_id_text IS NULL OR v_sku_id_text = '' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单数据异常：缺少SKU信息');
    END IF;

    BEGIN
        v_sku_id := v_sku_id_text::UUID;
    EXCEPTION WHEN invalid_text_representation THEN
        RETURN jsonb_build_object('success', false, 'error', '订单数据异常：SKU ID格式错误');
    END;

    v_sku_ids := ARRAY[v_sku_id];

    -- Call Calculate
    -- We assume calculate_coupon_discount is correct (from previous fix)
    v_discount_result := calculate_coupon_discount(
        auth.uid(),
        p_coupon_id,
        v_original_amount, 
        v_sku_ids
    );

    IF (v_discount_result->>'valid')::BOOLEAN = FALSE THEN
        RETURN jsonb_build_object('success', false, 'error', v_discount_result->>'error');
    END IF;

    v_discount_amount := (v_discount_result->>'discount_amount')::DECIMAL;
    v_final_amount := (v_discount_result->>'final_amount')::DECIMAL;

    UPDATE pre_orders 
    SET coupon_id = p_coupon_id,
        discount_amount = v_discount_amount,
        total_amount = v_final_amount
    WHERE id = p_pre_order_id;

    RETURN jsonb_build_object(
        'success', true,
        'total_amount', v_final_amount,
        'discount_amount', v_discount_amount
    );

EXCEPTION WHEN OTHERS THEN
    -- Capture any other SQL error (like missing tables, column mismatch)
    RETURN jsonb_build_object('success', false, 'error', '应用优惠券系统异常: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."apply_coupon_to_pre_order"("p_pre_order_id" "uuid", "p_coupon_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_coupon_discount"("p_user_id" "uuid", "p_coupon_id" "uuid", "p_order_amount" numeric, "p_sku_ids" "uuid"[]) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_coupon_record RECORD;
    v_discount_amount DECIMAL(10,2) := 0;
    v_sku_id UUID;
    v_sku_price DECIMAL(10,2);
    v_has_valid_product BOOLEAN := FALSE;
    v_coupon_sku_ids UUID[];
BEGIN
    -- 1. 从 user_coupons 读取（使用快照）
    SELECT 
        uc.id, 
        uc.status,
        uc.expire_at,
        uc.coupon_snapshot->>'type' AS type,
        (uc.coupon_snapshot->>'value')::DECIMAL AS value,
        (uc.coupon_snapshot->>'min_usage')::DECIMAL AS min_usage,
        uc.coupon_snapshot->'sku_ids' AS sku_ids_json
    INTO v_coupon_record
    FROM user_coupons uc
    WHERE uc.id = p_coupon_id AND uc.user_id = p_user_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券不存在');
    END IF;
    -- 2. 验证状态
    IF v_coupon_record.status != 'unused' THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券已使用或不可用');
    END IF;
    -- 3. 验证过期时间（使用快照中的独立过期时间）
    IF v_coupon_record.expire_at IS NOT NULL AND v_coupon_record.expire_at < NOW() THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券已过期');
    END IF;
    -- 4. 验证最低消费
    IF p_order_amount < COALESCE(v_coupon_record.min_usage, 0) THEN
        RETURN jsonb_build_object('valid', false, 'error', format('订单金额未满 ￥%s', v_coupon_record.min_usage));
    END IF;
    -- 5. 类型逻辑
    IF v_coupon_record.type = 'balance' THEN
        RETURN jsonb_build_object('valid', false, 'error', '余额券不能直接抵扣订单');
        
    ELSIF v_coupon_record.type = 'flat' THEN
        -- 立减券：固定金额
        v_discount_amount := v_coupon_record.value;
        
    ELSIF v_coupon_record.type = 'product' THEN
        -- 指定商品券：从快照读取 sku_ids
        IF p_sku_ids IS NULL OR array_length(p_sku_ids, 1) = 0 THEN
            RETURN jsonb_build_object('valid', false, 'error', '订单中没有商品');
        END IF;
        -- 从 JSONB 数组转为 UUID 数组
        IF v_coupon_record.sku_ids_json IS NOT NULL THEN
            SELECT ARRAY(
                SELECT (elem::text)::uuid 
                FROM jsonb_array_elements_text(v_coupon_record.sku_ids_json) AS elem
                WHERE elem::text != ''
            ) INTO v_coupon_sku_ids;
        ELSE
            v_coupon_sku_ids := '{}';
        END IF;
        -- 遍历订单 SKU
        FOREACH v_sku_id IN ARRAY p_sku_ids
        LOOP
            IF v_sku_id = ANY(v_coupon_sku_ids) THEN
                v_has_valid_product := TRUE;
                
                SELECT price INTO v_sku_price FROM product_skus WHERE id = v_sku_id;
                IF v_sku_price IS NULL THEN v_sku_price := 0; END IF;
                
                -- 指定商品券只折扣一份
                v_discount_amount := v_discount_amount + v_sku_price;
                EXIT; -- 只折扣一份，退出循环
            END IF;
        END LOOP;
        
        IF NOT v_has_valid_product THEN
            RETURN jsonb_build_object('valid', false, 'error', '该优惠券仅限指定商品使用');
        END IF;
    END IF;
    -- 6. 折扣不超过订单金额
    IF v_discount_amount > p_order_amount THEN
        v_discount_amount := p_order_amount;
    END IF;
    RETURN jsonb_build_object(
        'valid', true,
        'discount_amount', v_discount_amount,
        'final_amount', p_order_amount - v_discount_amount
    );
END;
$$;


ALTER FUNCTION "public"."calculate_coupon_discount"("p_user_id" "uuid", "p_coupon_id" "uuid", "p_order_amount" numeric, "p_sku_ids" "uuid"[]) OWNER TO "postgres";


COMMENT ON FUNCTION "public"."calculate_coupon_discount"("p_user_id" "uuid", "p_coupon_id" "uuid", "p_order_amount" numeric, "p_sku_ids" "uuid"[]) IS '计算优惠券折扣（快照模式）- 从 user_coupons.coupon_snapshot 读取规则';



CREATE OR REPLACE FUNCTION "public"."cancel_pre_order"("p_pre_order_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_order RECORD;
BEGIN
    -- 查询预订单
    SELECT * INTO v_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF v_order IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;

    IF v_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可删除');
    END IF;

    -- 调用统一的资源释放函数
    PERFORM release_preorder_resources(p_pre_order_id);

    -- 更新预订单状态为 deleted（软删除）
    UPDATE pre_orders SET status = 'deleted' WHERE id = p_pre_order_id;

    RETURN jsonb_build_object('success', true, 'msg', '订单已删除');
END;
$$;


ALTER FUNCTION "public"."cancel_pre_order"("p_pre_order_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."cancel_pre_order"("p_pre_order_id" "uuid") IS '用户删除预订单（软删除 + 释放资源）';



CREATE OR REPLACE FUNCTION "public"."check_email_available"("email_input" "text") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  -- Returns true if email does NOT exist in auth.users
  return not exists (
    select 1 
    from auth.users 
    where email = email_input
  );
end;
$$;


ALTER FUNCTION "public"."check_email_available"("email_input" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_expired_preorders"() RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
            
            -- 更新状态为 expired
            UPDATE pre_orders 
            SET status = 'expired' 
            WHERE id = v_preorder.id;
            
            v_count := v_count + 1;
        EXCEPTION WHEN OTHERS THEN
            v_error_count := v_error_count + 1;
        END;
    END LOOP;
    
    -- 记录执行日志（如果表存在）
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES (
            'cleanup_expired_preorders', 
            CASE WHEN v_error_count = 0 THEN 'success' ELSE 'error' END,
            v_count
        );
    EXCEPTION WHEN OTHERS THEN
        -- 忽略日志表不存在的错误
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'error_count', v_error_count
    );
END;
$$;


ALTER FUNCTION "public"."cleanup_expired_preorders"() OWNER TO "postgres";


COMMENT ON FUNCTION "public"."cleanup_expired_preorders"() IS '清理过期预订单（定时任务每5分钟调用）';



CREATE OR REPLACE FUNCTION "public"."confirm_pre_order"("p_pre_order_id" "uuid", "p_pay_method" "text", "p_coupon_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_pre_order RECORD;
    v_user_balance DECIMAL(10, 2);
    v_need_amount DECIMAL(10, 2);
    v_original_amount DECIMAL(10, 2);
    v_order_no TEXT;
    v_order_id UUID;
    v_discount_result JSONB;
    v_discount_amount DECIMAL(10, 2) := 0;
    v_sku_id UUID;
    v_sku_ids UUID[];
    v_active_coupon_id UUID;
    v_coupon_snapshot JSONB := NULL;
    v_coupon_code TEXT;
    v_coupon_type TEXT;
    v_coupon_name TEXT;
    
    v_order_status TEXT;
    v_product_type TEXT;
    v_duration INTEGER;
    v_end_time TIMESTAMP WITH TIME ZONE;
    
    -- 用于钱包记录描述
    v_product_name TEXT;
    v_spec_text TEXT;
    v_wallet_desc TEXT;
BEGIN
    -- ============================================
    -- 步骤1：获取并验证预订单
    -- ============================================
    SELECT * INTO v_pre_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    -- 验证订单属于当前用户
    IF v_pre_order.user_id != auth.uid() THEN
        RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
    END IF;
    IF v_pre_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可支付');
    END IF;
    
    IF v_pre_order.expires_at < NOW() THEN
        PERFORM release_preorder_resources(p_pre_order_id);
        UPDATE pre_orders SET status = 'expired' WHERE id = p_pre_order_id;
        RETURN jsonb_build_object('success', false, 'error', '订单已过期');
    END IF;
    -- 提取关键信息
    v_product_type := v_pre_order.sku_snapshot->>'product_type';
    v_duration := COALESCE((v_pre_order.sku_snapshot->>'duration')::INTEGER, 30);
    
    -- 提取商品名称和规格（用于钱包记录）
    v_product_name := COALESCE(v_pre_order.product_snapshot->>'product_name', '商品');
    SELECT string_agg(value::text, '，') INTO v_spec_text
    FROM jsonb_each_text(v_pre_order.sku_snapshot->'spec_combination');
    v_spec_text := COALESCE(v_spec_text, '');
    -- ============================================
    -- 步骤2：处理优惠券
    -- ============================================
    v_active_coupon_id := COALESCE(p_coupon_id, v_pre_order.coupon_id);
    v_original_amount := COALESCE(v_pre_order.original_amount, v_pre_order.total_amount, 0);
    v_need_amount := v_original_amount;
    IF v_active_coupon_id IS NOT NULL THEN
        -- 从快照读取优惠券信息
        SELECT 
            uc.coupon_snapshot->>'type',
            uc.coupon_snapshot->>'name',
            uc.code
        INTO 
            v_coupon_type, v_coupon_name, v_coupon_code
        FROM user_coupons uc
        WHERE uc.id = v_active_coupon_id
          AND uc.user_id = auth.uid();
        IF NOT FOUND THEN
            RETURN jsonb_build_object('success', false, 'error', '优惠券不存在或不可用');
        END IF;
        v_sku_id := (v_pre_order.sku_snapshot->>'sku_id')::UUID;
        v_sku_ids := ARRAY[v_sku_id];
        
        v_discount_result := calculate_coupon_discount(auth.uid(), v_active_coupon_id, v_need_amount, v_sku_ids);
        
        IF (v_discount_result->>'valid')::BOOLEAN = FALSE THEN
            RETURN jsonb_build_object('success', false, 'error', v_discount_result->>'error');
        END IF;
        
        v_discount_amount := (v_discount_result->>'discount_amount')::DECIMAL;
        v_need_amount := (v_discount_result->>'final_amount')::DECIMAL;
        
        v_coupon_snapshot := jsonb_build_object(
            'id', v_active_coupon_id, 
            'code', v_coupon_code,
            'type', v_coupon_type, 
            'name', v_coupon_name,
            'discount_amount', v_discount_amount
        );
    END IF;
    -- ============================================
    -- 步骤3：余额支付
    -- ============================================
    IF p_pay_method = 'balance' THEN
        SELECT balance INTO v_user_balance FROM profiles WHERE id = auth.uid();
        
        IF v_user_balance < v_need_amount THEN
            RETURN jsonb_build_object('success', false, 'error', format('余额不足，需 ￥%s，当前 ￥%s', v_need_amount, v_user_balance));
        END IF;
        
        UPDATE profiles SET balance = balance - v_need_amount WHERE id = auth.uid();
        
        -- 钱包记录描述：商品名称：规格
        IF v_spec_text != '' THEN
            v_wallet_desc := format('%s：%s', v_product_name, v_spec_text);
        ELSE
            v_wallet_desc := v_product_name;
        END IF;
        
        INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
        VALUES (
            auth.uid(), 
            -v_need_amount, 
            'payment', 
            v_user_balance - v_need_amount,
            v_wallet_desc
        );
    ELSE
        RETURN jsonb_build_object('success', false, 'error', '不支持的支付方式');
    END IF;
    -- ============================================
    -- 步骤4：状态判定
    -- ============================================
    IF v_product_type = 'virtual' THEN
        v_order_status := 'pending_delivery';
    ELSE
        v_order_status := 'active';
    END IF;
    -- ============================================
    -- 步骤5：计算到期时间
    -- ============================================
    v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
    -- ============================================
    -- 步骤6：创建主订单
    -- ============================================
    v_order_no := v_pre_order.order_no;
    
    INSERT INTO orders (
        user_id, order_no, total_amount, original_amount,
        start_time, end_time, expires_at, status,           
        product_snapshot, sku_snapshot, cdk_snapshot, 
        quantity, coupon_snapshot, order_type, slot_occupancy_ids
    ) VALUES (
        v_pre_order.user_id, v_order_no, v_need_amount, v_original_amount,
        NOW(), v_end_time, v_end_time, v_order_status,
        v_pre_order.product_snapshot, v_pre_order.sku_snapshot,
        jsonb_build_object('locked_cdk_ids', v_pre_order.locked_cdk_ids),
        v_pre_order.quantity, v_coupon_snapshot, v_product_type,
        v_pre_order.locked_slot_ids
    ) RETURNING id INTO v_order_id;
    -- ============================================
    -- 步骤7：标记优惠券已使用（只更新 user_coupons）
    -- ============================================
    IF v_active_coupon_id IS NOT NULL THEN
        UPDATE user_coupons 
        SET status = 'used', 
            used_at = NOW(),
            order_id = v_order_id
        WHERE id = v_active_coupon_id;
        
        -- 已移除：不再更新 coupon_codes 表
    END IF;
    -- ============================================
    -- 步骤8：更新预订单状态
    -- ============================================
    UPDATE pre_orders 
    SET status = 'converted',
        coupon_id = v_active_coupon_id,
        discount_amount = v_discount_amount,
        total_amount = v_need_amount
    WHERE id = p_pre_order_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'order_no', v_order_no,
        'order_id', v_order_id,
        'total_amount', v_need_amount,
        'expires_at', v_end_time
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '支付失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."confirm_pre_order"("p_pre_order_id" "uuid", "p_pay_method" "text", "p_coupon_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."confirm_pre_order"("p_pre_order_id" "uuid", "p_pay_method" "text", "p_coupon_id" "uuid") IS '确认预订单（优化版）- 钱包记录显示商品名称，从快照读取优惠券';



CREATE OR REPLACE FUNCTION "public"."create_pre_order"("p_sku_id" "uuid", "p_quantity" integer DEFAULT 1, "p_source" "text" DEFAULT 'buy_now'::"text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_user_id UUID;
  v_pending_count INTEGER;
  v_sku RECORD;
  v_product RECORD;
  v_product_id UUID;
  v_pre_order_id UUID;
  v_order_no TEXT;
  v_total_amount DECIMAL;
  v_expires_at TIMESTAMP WITH TIME ZONE;
  v_product_snapshot JSONB;
  v_sku_snapshot JSONB;
  v_locked_cdk_ids UUID[] := '{}';
  v_locked_slot_ids UUID[] := '{}';
  v_cdk_id UUID;
  v_slot_id UUID;
  v_found_count INTEGER := 0;
  v_cdk_record RECORD;
BEGIN
  -- ============================================
  -- 步骤1：验证用户登录
  -- ============================================
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;

  -- ============================================
  -- 步骤2：检查未支付订单数量（限制3个）
  -- ============================================
  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;

  -- ============================================
  -- 步骤3：获取 SKU 和商品信息
  -- ============================================
  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
  -- 通过 product_sku_map 获取商品ID
  SELECT product_id INTO v_product_id 
  FROM product_sku_map 
  WHERE sku_id = p_sku_id 
  LIMIT 1;
  
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU未绑定商品');
  END IF;
  
  SELECT * INTO v_product FROM products WHERE id = v_product_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '商品不存在');
  END IF;

  -- ============================================
  -- 步骤4：根据 SKU 类型锁定资源
  -- ============================================
  IF v_sku.product_type = 'virtual' THEN
    -- Virtual 类型：找 stock >= Q 的 CDK，扣减库存，记录 CDK ID
    SELECT c.id, c.stock INTO v_cdk_record
    FROM cdks c
    JOIN cdk_sku_map m ON m.cdk_id = c.id
    WHERE m.sku_id = p_sku_id
      AND c.stock >= p_quantity
    LIMIT 1
    FOR UPDATE SKIP LOCKED;
    
    IF v_cdk_record.id IS NULL THEN
      RETURN jsonb_build_object('success', false, 'error', '暂无可用库存');
    END IF;
    
    -- 扣减库存
    UPDATE cdks SET stock = stock - p_quantity WHERE id = v_cdk_record.id;
    
    -- [修正] 按 quantity 次数记录 CDK ID
    FOR i IN 1..p_quantity LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
    END LOOP;
    
  ELSIF v_sku.product_type = 'one_time_cdk' THEN
    -- One-time 类型：找 Q 个 idle 状态的 CDK，改为 using
    FOR v_cdk_record IN
      SELECT c.id
      FROM cdks c
      JOIN cdk_sku_map m ON m.cdk_id = c.id
      WHERE m.sku_id = p_sku_id
        AND c.status = 'idle'
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
      UPDATE cdks SET status = 'using' WHERE id = v_cdk_record.id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      -- 回滚已锁定的 CDK
      UPDATE cdks SET status = 'idle' WHERE id = ANY(v_locked_cdk_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用的激活码');
    END IF;
    
  ELSIF v_sku.product_type = 'shared_account' THEN
    -- Shared 类型：找 Q 个 idle 槽位（优先同一 CDK），改为 using
    FOR v_cdk_record IN
      SELECT so.id AS slot_id, so.cdk_id
      FROM slot_occupancies so
      JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
      WHERE m.sku_id = p_sku_id
        AND so.status = 'idle'
      ORDER BY so.cdk_id  -- 优先同一 CDK
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_slot_ids := array_append(v_locked_slot_ids, v_cdk_record.slot_id);
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.cdk_id);
      UPDATE slot_occupancies SET status = 'using' WHERE id = v_cdk_record.slot_id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      -- 回滚已锁定的槽位
      UPDATE slot_occupancies SET status = 'idle' WHERE id = ANY(v_locked_slot_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用位置');
    END IF;
  ELSE
    RETURN jsonb_build_object('success', false, 'error', '不支持的商品类型');
  END IF;

  -- ============================================
  -- 步骤5：构建快照
  -- ============================================
  v_product_snapshot := jsonb_build_object(
    'product_id', v_product.id,
    'product_name', v_product.product_name,
    'image', v_product.image
  );
  
  v_sku_snapshot := jsonb_build_object(
    'sku_id', v_sku.id,
    'spec_combination', v_sku.spec_combination,
    'duration', v_sku.duration,
    'price', v_sku.price,
    'product_type', v_sku.product_type
  );

  -- ============================================
  -- 步骤6：生成订单号 + 过期时间
  -- ============================================
  v_order_no := TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  v_expires_at := NOW() + INTERVAL '15 minutes';
  v_total_amount := v_sku.price * p_quantity;

  -- ============================================
  -- 步骤7：插入预订单 [修正] 添加 original_amount
  -- ============================================
  INSERT INTO pre_orders (
    user_id, order_no, status, source, 
    quantity, unit_price, total_amount,
    original_amount,  -- [新增] 记录原始金额
    product_snapshot, sku_snapshot,
    locked_cdk_ids, locked_slot_ids,
    expires_at, created_at
  )
  VALUES (
    v_user_id, v_order_no, 'pending', p_source,
    p_quantity, v_sku.price, v_total_amount,
    v_total_amount,  -- [新增] original_amount = total_amount
    v_product_snapshot, v_sku_snapshot,
    v_locked_cdk_ids, v_locked_slot_ids,
    v_expires_at, NOW()
  )
  RETURNING id INTO v_pre_order_id;

  RETURN jsonb_build_object(
    'success', true,
    'pre_order_id', v_pre_order_id,
    'order_no', v_order_no,
    'total_amount', v_total_amount,
    'original_amount', v_total_amount,  -- [新增] 返回原始金额
    'expires_at', v_expires_at
  );

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建预订单失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."create_pre_order"("p_sku_id" "uuid", "p_quantity" integer, "p_source" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_own_account"() RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'msg', '未登录');
  END IF;

  -- Delete the user from auth.users
  -- This requires the function to be SECURITY DEFINER to bypass RLS/privileges
  -- Because foreign keys are set to CASCADE (usually), this should remove the public.profile entries too.
  -- If not, we might need to manually delete from public.profiles first, but standard Supabase setup defaults to cascade.
  -- We will attempt to delete from auth.users directly.
  
  -- Check if user exists first? (Optional, delete is idempotent-ish if not found, but we know they exist from auth.uid())

  -- PERFORM deletion
  -- Note: We generally don't have direct access to delete from auth.users even with SECURITY DEFINER 
  -- unless the role 'postgres' (owner) has rights. In Supabase, 'postgres' user usually has rights.
  
  DELETE FROM auth.users WHERE id = v_user_id;

  -- If we got here, it likely succeeded (or silently failed if no permissions, but SECURITY DEFINER should fix that)
  
  RETURN jsonb_build_object('success', true, 'msg', '账户注销成功');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'msg', '注销失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."delete_own_account"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."delete_preorder"("p_preorder_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_preorder RECORD;
BEGIN
    -- 获取预订单（验证是当前用户的）
    SELECT * INTO v_preorder 
    FROM pre_orders 
    WHERE id = p_preorder_id AND user_id = auth.uid();
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
    -- 只有 pending 状态需要释放资源
    IF v_preorder.status = 'pending' THEN
        PERFORM release_preorder_resources(v_preorder.id);
    END IF;
    
    -- 更新状态为 deleted
    UPDATE pre_orders 
    SET status = 'deleted' 
    WHERE id = p_preorder_id;
    
    RETURN jsonb_build_object('success', true, 'msg', '订单已删除');
END;
$$;


ALTER FUNCTION "public"."delete_preorder"("p_preorder_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."delete_preorder"("p_preorder_id" "uuid") IS '用户删除预订单（释放资源）';



CREATE OR REPLACE FUNCTION "public"."generate_unique_uid"() RETURNS character
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
DECLARE
  new_uid CHAR(8);
  done BOOLEAN DEFAULT FALSE;
BEGIN
  WHILE NOT done LOOP
    -- 生成 8 位随机数字 (10000000 - 99999999)
    new_uid := LPAD(FLOOR(10000000 + RANDOM() * 90000000)::TEXT, 8, '0');
    -- 检查是否已存在
    done := NOT EXISTS (SELECT 1 FROM public.profiles WHERE uid = new_uid);
  END LOOP;
  RETURN new_uid;
END;
$$;


ALTER FUNCTION "public"."generate_unique_uid"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_all_skus_with_product_info"() RETURNS TABLE("id" "uuid", "tag" integer, "tag_name" "text", "product_type" character varying, "spec_combination" "jsonb", "price" numeric, "created_at" timestamp with time zone, "product_id" "uuid", "product_name" "text", "link_status" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.tag,
        s.tag_name,
        s.product_type,
        s.spec_combination,
        s.price,
        s.created_at,
        p.id as product_id,
        p.product_name,
        CASE 
            WHEN p.id IS NOT NULL THEN 'linked'
            ELSE 'unlinked'
        END as link_status
    FROM 
        product_skus s
    LEFT JOIN 
        product_sku_map m ON s.id = m.sku_id
    LEFT JOIN 
        products p ON m.product_id = p.id
    ORDER BY 
        s.created_at DESC;
END;
$$;


ALTER FUNCTION "public"."get_all_skus_with_product_info"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_client_order_detail"("p_order_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_user_id uuid;
  v_order record;
  v_cdk_ids uuid[];
  v_cdks jsonb;
  v_slots jsonb;
BEGIN
  v_user_id := auth.uid();
  
  -- 1. Get Order (Verify Ownership)
  SELECT * INTO v_order 
  FROM orders 
  WHERE id = p_order_id AND user_id = v_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在或无权访问');
  END IF;

  -- 2. Extract CDK IDs
  -- Handle both object and array format (legacy compat)
  -- cdk_snapshot could be null
  IF v_order.cdk_snapshot IS NOT NULL THEN
      IF jsonb_typeof(v_order.cdk_snapshot) = 'array' THEN
        SELECT array_agg(x::text::uuid) INTO v_cdk_ids 
        FROM jsonb_array_elements_text(v_order.cdk_snapshot) t(x);
      ELSE
        -- Assume object with locked_cdk_ids
        SELECT array_agg(x::text::uuid) INTO v_cdk_ids 
        FROM jsonb_array_elements_text(v_order.cdk_snapshot->'locked_cdk_ids') t(x);
      END IF;
  END IF;

  -- 3. Fetch CDKs
  IF v_cdk_ids IS NOT NULL AND array_length(v_cdk_ids, 1) > 0 THEN
      SELECT jsonb_agg(jsonb_build_object(
          'id', c.id, 
          'code', c.code, 
          'account_data', c.account_data
      )) INTO v_cdks
      FROM cdks c
      WHERE c.id = ANY(v_cdk_ids);
  END IF;

  -- 4. Fetch Slots (if needed)
  IF v_order.slot_occupancy_ids IS NOT NULL AND array_length(v_order.slot_occupancy_ids, 1) > 0 THEN
    SELECT jsonb_agg(jsonb_build_object(
      'id', s.id,
      'slot_index', s.slot_index,
      'cdk_id', s.cdk_id
    )) INTO v_slots
    FROM slot_occupancies s
    WHERE s.id = ANY(v_order.slot_occupancy_ids);
  END IF;

  -- 5. Return Result
  RETURN jsonb_build_object(
    'success', true,
    'data', to_jsonb(v_order) || jsonb_build_object(
        'cdkList', COALESCE(v_cdks, '[]'::jsonb),
        'slotList', COALESCE(v_slots, '[]'::jsonb)
    )
  );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '获取详情失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."get_client_order_detail"("p_order_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."get_client_order_detail"("p_order_id" "uuid") IS '获取客户端订单详情（包含敏感CDK信息）';



CREATE OR REPLACE FUNCTION "public"."get_pre_order"("p_pre_order_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_order RECORD;
BEGIN
    SELECT * INTO v_order 
    FROM pre_orders 
    WHERE id = p_pre_order_id;
    
    IF v_order IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'pre_order', jsonb_build_object(
            'id', v_order.id,
            'order_no', v_order.order_no,
            'status', v_order.status,
            'quantity', v_order.quantity,
            'unit_price', v_order.unit_price,
            'total_amount', v_order.total_amount,
            'product_snapshot', v_order.product_snapshot,
            'sku_snapshot', v_order.sku_snapshot,
            'source', v_order.source,
            'created_at', v_order.created_at,
            'expires_at', v_order.expires_at
        )
    );
END;
$$;


ALTER FUNCTION "public"."get_pre_order"("p_pre_order_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_sku_stock"("p_sku_id" "uuid") RETURNS TABLE("in_stock" boolean, "stock_count" integer)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_cdk_type TEXT;
  v_stock INT := 0;
BEGIN
  -- 通过 cdk_sku_map 获取 CDK 类型
  SELECT c.cdk_type INTO v_cdk_type
  FROM cdk_sku_map m
  JOIN cdks c ON c.id = m.cdk_id
  WHERE m.sku_id = p_sku_id
  LIMIT 1;

  -- 如果没有关联的 CDK，返回无库存
  IF v_cdk_type IS NULL THEN
    RETURN QUERY SELECT FALSE, 0;
    RETURN;
  END IF;

  -- 根据类型计算库存（只检查 status = 'idle'）
  IF v_cdk_type = 'shared' THEN
    -- 合租类型：统计空闲车位
    SELECT COUNT(*) INTO v_stock
    FROM slot_occupancies so
    JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
    JOIN cdks c ON c.id = so.cdk_id
    WHERE m.sku_id = p_sku_id 
      AND so.status = 'idle'
      AND c.status = 'idle';  -- CDK 本身也必须是 idle
      
  ELSE
    -- 虚拟/一次性类型：统计 idle 状态的 CDK stock 总和
    SELECT COALESCE(SUM(c.stock), 0) INTO v_stock
    FROM cdks c
    JOIN cdk_sku_map m ON m.cdk_id = c.id
    WHERE m.sku_id = p_sku_id 
      AND c.status = 'idle';
  END IF;

  -- 确保不返回负数
  v_stock := GREATEST(v_stock, 0);
  
  RETURN QUERY SELECT (v_stock > 0), v_stock::INTEGER;
END;
$$;


ALTER FUNCTION "public"."get_sku_stock"("p_sku_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_messages"("p_user_uid" character, "p_limit" integer DEFAULT 20, "p_offset" integer DEFAULT 0) RETURNS TABLE("id" "uuid", "title" character varying, "content" "text", "is_read" boolean, "created_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN QUERY
  SELECT m.id, m.title, m.content, m.is_read, m.created_at
  FROM messages m
  WHERE m.user_uid = p_user_uid
  ORDER BY m.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;


ALTER FUNCTION "public"."get_user_messages"("p_user_uid" character, "p_limit" integer, "p_offset" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_uid text;
  v_count int;
BEGIN
  -- Generate a random 8-digit UID that doesn't exist yet
  LOOP
    v_uid := floor(10000000 + random() * 90000000)::text;
    SELECT count(*) INTO v_count FROM public.profiles WHERE uid = v_uid;
    IF v_count = 0 THEN
      EXIT;
    END IF;
  END LOOP;

  -- Insert into public.profiles
  INSERT INTO public.profiles (id, uid, email, nickname, avatar, status, balance, created_at)
  VALUES (
    new.id,
    v_uid,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    'active',
    0.00,
    now()
  );

  RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


COMMENT ON FUNCTION "public"."handle_new_user"() IS '用户注册触发器 - 自动生成8位UID';



CREATE OR REPLACE FUNCTION "public"."increment_article_views"("article_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  update community_articles
  set views = views + 1
  where id = article_id;
end;
$$;


ALTER FUNCTION "public"."increment_article_views"("article_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE auth_user_id = auth.uid()
      AND status = 'enabled'
  );
END;
$$;


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


COMMENT ON FUNCTION "public"."is_admin"() IS '检查当前用户是否为已启用的后台管理员';



CREATE OR REPLACE FUNCTION "public"."mark_message_read"("p_message_id" "uuid", "p_user_uid" character) RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  UPDATE messages
  SET is_read = TRUE
  WHERE id = p_message_id AND user_uid = p_user_uid;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$;


ALTER FUNCTION "public"."mark_message_read"("p_message_id" "uuid", "p_user_uid" character) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_order_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public'
    AS $$
BEGIN
  RAISE EXCEPTION '禁止删除历史订单记录';
END;
$$;


ALTER FUNCTION "public"."prevent_order_delete"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."redeem_coupon"("p_code" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_user_id UUID;
    v_coupon RECORD;
    v_code_record RECORD;
    v_existing_id UUID;
    v_today TIMESTAMPTZ := NOW();
    v_expire_at TIMESTAMPTZ;
    v_coupon_snapshot JSONB;
BEGIN
    -- A. 验证登录
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '请先登录');
    END IF;
    -- B. 查找有效兑换码
    SELECT 
        cc.id as code_id,
        cc.code as redeem_code,
        cc.max_usage,
        cc.used_count,
        cc.status as code_status,
        c.id as coupon_id,
        c.status as rule_status,
        c.start_date,
        c.end_date,
        c.name,
        c.type,
        c.value,
        c.min_usage,
        c.sku_ids,
        c.code as coupon_code
    INTO v_coupon
    FROM coupon_codes cc
    JOIN coupons c ON cc.coupon_id = c.id
    WHERE cc.code = p_code;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '无效的兑换码');
    END IF;
    -- C. 验证兑换码状态
    IF v_coupon.code_status != 'available' THEN
        RETURN jsonb_build_object('success', false, 'error', '该兑换码已失效');
    END IF;
    IF v_coupon.used_count >= v_coupon.max_usage THEN
        RETURN jsonb_build_object('success', false, 'error', '该兑换码已被领完');
    END IF;
    -- D. 验证规则状态
    IF v_coupon.rule_status IS FALSE THEN
        RETURN jsonb_build_object('success', false, 'error', '该活动已结束');
    END IF;
    IF v_coupon.start_date IS NOT NULL AND v_today < v_coupon.start_date THEN
        RETURN jsonb_build_object('success', false, 'error', '活动尚未开始');
    END IF;
    IF v_coupon.end_date IS NOT NULL AND v_today > v_coupon.end_date THEN
        RETURN jsonb_build_object('success', false, 'error', '优惠券已过期');
    END IF;
    -- E. 检查该用户是否已使用过这个兑换码（防止重复领取）
    SELECT id INTO v_existing_id
    FROM user_coupons
    WHERE user_id = v_user_id AND redeemed_code = p_code
    LIMIT 1;
    IF v_existing_id IS NOT NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '您已使用过该兑换码');
    END IF;
    -- F. 锁定并更新兑换码
    SELECT used_count INTO v_code_record 
    FROM coupon_codes WHERE id = v_coupon.code_id FOR UPDATE;
    
    IF v_code_record.used_count >= v_coupon.max_usage THEN
        RETURN jsonb_build_object('success', false, 'error', '手慢了，已被领完');
    END IF;
    UPDATE coupon_codes 
    SET used_count = used_count + 1,
        status = CASE WHEN (used_count + 1) >= max_usage THEN 'exhausted' ELSE status END,
        user_uid = CASE WHEN max_usage = 1 THEN v_user_id ELSE user_uid END,
        used_at = NOW()
    WHERE id = v_coupon.code_id;
    -- G. 更新规则统计
    UPDATE coupons SET used_quantity = COALESCE(used_quantity, 0) + 1 
    WHERE id = v_coupon.coupon_id;
    -- H. 构建快照
    v_coupon_snapshot := jsonb_build_object(
        'name', v_coupon.name,
        'type', v_coupon.type,
        'value', v_coupon.value,
        'min_usage', v_coupon.min_usage,
        'sku_ids', v_coupon.sku_ids
    );
    -- I. 计算过期时间
    v_expire_at := COALESCE(
        v_coupon.end_date::timestamp with time zone, 
        NOW() + INTERVAL '30 days'
    );
    -- J. 写入用户优惠券（包含 redeemed_code）
    INSERT INTO user_coupons (
        user_id, coupon_id, status, redeemed_at, 
        code, redeemed_code, coupon_snapshot, expire_at
    )
    VALUES (
        v_user_id, v_coupon.coupon_id, 'unused', NOW(),
        v_coupon.coupon_code,  -- 规则说明
        p_code,                 -- 实际使用的兑换码
        v_coupon_snapshot, v_expire_at
    );
    RETURN jsonb_build_object(
        'success', true,
        'msg', '兑换成功',
        'coupon', jsonb_build_object(
            'name', v_coupon.name,
            'type', v_coupon.type,
            'value', v_coupon.value,
            'expire_at', v_expire_at
        )
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '兑换失败: ' || SQLERRM);
END;
$$;


ALTER FUNCTION "public"."redeem_coupon"("p_code" "text") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."redeem_coupon"("p_code" "text") IS '优惠券兑换 - 支持同规则多张券，检查同一兑换码不重复使用';



CREATE OR REPLACE FUNCTION "public"."release_expired_pre_orders"() RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."release_expired_pre_orders"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."release_preorder_resources"("p_preorder_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."release_preorder_resources"("p_preorder_id" "uuid") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."release_preorder_resources"("p_preorder_id" "uuid") IS '释放预订单锁定的资源（支持虚拟充值聚合回滚）';



CREATE OR REPLACE FUNCTION "public"."renew_order"("p_original_order_id" "uuid", "p_duration_days" integer) RETURNS TABLE("new_order_id" "uuid", "original_order_id" "uuid", "original_new_end_time" timestamp with time zone, "renew_start_time" timestamp with time zone, "renew_end_time" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_original_order RECORD;
  v_renew_start TIMESTAMP WITH TIME ZONE;
  v_renew_end TIMESTAMP WITH TIME ZONE;
  v_original_new_end TIMESTAMP WITH TIME ZONE;
  v_new_order_id UUID;
BEGIN
  SELECT * INTO v_original_order 
  FROM orders 
  WHERE id = p_original_order_id AND user_id = auth.uid()
  FOR UPDATE;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '原订单不存在';
  END IF;
  
  v_renew_start := GREATEST(v_original_order.end_time, NOW());
  v_renew_end := v_renew_start + (p_duration_days || ' days')::INTERVAL;
  v_original_new_end := v_renew_end;
  
  INSERT INTO orders (
    user_id,
    product_snapshot,
    sku_snapshot,
    cdk_snapshot,
    order_type,
    slot_occupancy_ids,  -- [修正] 继承车位ID数组
    related_order_id, 
    start_time,
    end_time,
    expires_at,
    status,
    order_no,
    original_amount,
    total_amount
  ) VALUES (
    v_original_order.user_id,
    v_original_order.product_snapshot,
    v_original_order.sku_snapshot,
    v_original_order.cdk_snapshot,
    v_original_order.order_type,
    v_original_order.slot_occupancy_ids,
    p_original_order_id,
    v_renew_start,
    v_renew_end,
    v_renew_end,
    'active',
    TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0'),
    0, 
    0  
  )
  RETURNING id INTO v_new_order_id;
  
  UPDATE orders SET end_time = v_original_new_end WHERE id = p_original_order_id;
  
  RETURN QUERY SELECT v_new_order_id, p_original_order_id, v_original_new_end, v_renew_start, v_renew_end;
END;
$$;


ALTER FUNCTION "public"."renew_order"("p_original_order_id" "uuid", "p_duration_days" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."send_admin_message"("p_user_uid" character, "p_title" character varying, "p_content" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
DECLARE
  v_message_id UUID;
BEGIN
  -- 验证必填参数
  IF p_title IS NULL OR p_title = '' THEN
    RAISE EXCEPTION '消息标题不能为空';
  END IF;
  
  IF p_content IS NULL OR p_content = '' THEN
    RAISE EXCEPTION '消息内容不能为空';
  END IF;
  
  -- 【关键规则】检查用户是否存在
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE uid = p_user_uid) THEN
    RAISE EXCEPTION '用户不存在，禁止发送消息';
  END IF;
  
  -- 发送消息
  INSERT INTO messages (user_uid, title, content)
  VALUES (p_user_uid, p_title, p_content)
  RETURNING id INTO v_message_id;
  
  RETURN v_message_id;
END;
$$;


ALTER FUNCTION "public"."send_admin_message"("p_user_uid" character, "p_title" character varying, "p_content" "text") OWNER TO "postgres";


COMMENT ON FUNCTION "public"."send_admin_message"("p_user_uid" character, "p_title" character varying, "p_content" "text") IS '后台消息发送函数 - 用户不存在则禁止发送';



CREATE OR REPLACE FUNCTION "public"."sync_email_to_profile"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  -- When auth.users.email is updated, sync to profiles.email
  UPDATE public.profiles 
  SET email = NEW.email 
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."sync_email_to_profile"() OWNER TO "postgres";


COMMENT ON FUNCTION "public"."sync_email_to_profile"() IS 'Automatically syncs email changes from auth.users to profiles table';



CREATE OR REPLACE FUNCTION "public"."use_balance_coupon"("p_user_coupon_id" "uuid", "p_user_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_coupon_record RECORD;
    v_coupon_val DECIMAL(10,2);
    v_new_balance DECIMAL(10,2);
BEGIN
    -- 1. 检查并锁定记录
    SELECT uc.*, c.value, c.type INTO v_coupon_record
    FROM user_coupons uc
    JOIN coupons c ON uc.coupon_id = c.id
    WHERE uc.id = p_user_coupon_id AND uc.user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION '优惠券记录不存在';
    END IF;

    IF v_coupon_record.status != 'unused' THEN
        RAISE EXCEPTION '优惠券不可用或已使用';
    END IF;

    IF v_coupon_record.type != 'balance' THEN
        RAISE EXCEPTION '该优惠券不是余额券';
    END IF;

    v_coupon_val := v_coupon_record.value;

    -- 2. 更新优惠券状态
    UPDATE user_coupons
    SET status = 'used', used_at = NOW()
    WHERE id = p_user_coupon_id;

    -- 3. 更新用户余额
    UPDATE profiles
    SET balance = balance + v_coupon_val
    WHERE id = p_user_id
    RETURNING balance INTO v_new_balance;

    -- 4. 插入钱包流水
    INSERT INTO wallet_transactions (user_id, amount, type, balance_after)
    VALUES (p_user_id, v_coupon_val, '优惠券兑换', v_new_balance);

    RETURN jsonb_build_object(
        'success', true,
        'new_balance', v_new_balance,
        'added_amount', v_coupon_val
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;


ALTER FUNCTION "public"."use_balance_coupon"("p_user_coupon_id" "uuid", "p_user_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."admin_departments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "permissions" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."admin_departments" OWNER TO "postgres";


COMMENT ON TABLE "public"."admin_departments" IS '后台部门表，用于权限管理';



COMMENT ON COLUMN "public"."admin_departments"."name" IS '部门名称';



COMMENT ON COLUMN "public"."admin_departments"."permissions" IS '可访问的页面路径数组';



CREATE TABLE IF NOT EXISTS "public"."admin_users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password_hash" "text" NOT NULL,
    "department_id" "uuid",
    "status" "text" DEFAULT 'enabled'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "auth_user_id" "uuid",
    CONSTRAINT "admin_users_status_check" CHECK (("status" = ANY (ARRAY['enabled'::"text", 'disabled'::"text"])))
);


ALTER TABLE "public"."admin_users" OWNER TO "postgres";


COMMENT ON TABLE "public"."admin_users" IS '后台管理员用户表';



COMMENT ON COLUMN "public"."admin_users"."name" IS '用户名称';



COMMENT ON COLUMN "public"."admin_users"."email" IS '登录邮箱';



COMMENT ON COLUMN "public"."admin_users"."password_hash" IS '密码哈希';



COMMENT ON COLUMN "public"."admin_users"."department_id" IS '所属部门';



COMMENT ON COLUMN "public"."admin_users"."status" IS '状态：enabled=启用，disabled=禁用';



COMMENT ON COLUMN "public"."admin_users"."auth_user_id" IS '关联 Supabase Auth 用户 ID';



CREATE TABLE IF NOT EXISTS "public"."banners" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "image_id" "uuid" NOT NULL,
    "title" "text",
    "link" "text",
    "sort_order" integer DEFAULT 0,
    "status" "text" DEFAULT 'on'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "banners_status_check" CHECK (("status" = ANY (ARRAY['on'::"text", 'off'::"text"])))
);


ALTER TABLE "public"."banners" OWNER TO "postgres";


COMMENT ON TABLE "public"."banners" IS '轮播图配置表 - 仅引用images';



CREATE TABLE IF NOT EXISTS "public"."cart_items" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "sku_id" "uuid" NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "cart_items_quantity_check" CHECK (("quantity" > 0))
);


ALTER TABLE "public"."cart_items" OWNER TO "postgres";


COMMENT ON TABLE "public"."cart_items" IS '购物车表 - 简化版，只存储 user_id + sku_id + quantity';



CREATE TABLE IF NOT EXISTS "public"."cdk_sku_map" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "cdk_id" "uuid" NOT NULL,
    "sku_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."cdk_sku_map" OWNER TO "postgres";


COMMENT ON TABLE "public"."cdk_sku_map" IS 'CDK与SKU的多对多映射表';



CREATE TABLE IF NOT EXISTS "public"."cdks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid",
    "code" character varying NOT NULL,
    "cdk_type" character varying NOT NULL,
    "account_data" "jsonb",
    "status" character varying DEFAULT 'idle'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "used_at" timestamp with time zone,
    "max_slots" integer DEFAULT 1,
    "stock" integer DEFAULT 1 NOT NULL,
    "pre_order_id" "uuid",
    "product_snapshot" "jsonb",
    CONSTRAINT "cdks_cdk_type_check" CHECK ((("cdk_type")::"text" = ANY (ARRAY[('virtual'::character varying)::"text", ('shared'::character varying)::"text", ('one_time'::character varying)::"text"]))),
    CONSTRAINT "cdks_shared_max_slots_check" CHECK (((("cdk_type")::"text" <> 'shared'::"text") OR (("max_slots" IS NOT NULL) AND ("max_slots" >= 1)))),
    CONSTRAINT "cdks_status_check" CHECK ((("status")::"text" = ANY (ARRAY['idle'::"text", 'using'::"text", 'used'::"text", 'disabled'::"text"])))
);


ALTER TABLE "public"."cdks" OWNER TO "postgres";


COMMENT ON TABLE "public"."cdks" IS 'CDK表 - 对应设计文档 9.3';



COMMENT ON COLUMN "public"."cdks"."cdk_type" IS 'CDK类型：virtual(虚拟充值)/shared(账号合租)/one_time(一次性兑换码)';



COMMENT ON COLUMN "public"."cdks"."account_data" IS '账号合租型的账号数据JSON';



COMMENT ON COLUMN "public"."cdks"."status" IS 'CDK状态: idle=可用, using=使用中, used=已用完, disabled=已下架';



COMMENT ON COLUMN "public"."cdks"."max_slots" IS '账号合租类型的最大车位数';



COMMENT ON COLUMN "public"."cdks"."product_snapshot" IS '商品快照：用于列表页快速展示 product_name/image 等信息';



CREATE TABLE IF NOT EXISTS "public"."community_articles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "content" "text",
    "cover_image" "text",
    "video_url" "text",
    "category" "text",
    "is_published" boolean DEFAULT false,
    "views" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."community_articles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."community_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "icon" "text",
    "color" "text",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."community_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."coupon_codes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "coupon_id" "uuid" NOT NULL,
    "code" "text" NOT NULL,
    "status" "text" DEFAULT 'available'::"text" NOT NULL,
    "user_uid" "uuid",
    "used_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "max_usage" integer DEFAULT 1,
    "used_count" integer DEFAULT 0,
    CONSTRAINT "coupon_codes_status_check" CHECK (("status" = ANY (ARRAY['available'::"text", 'exhausted'::"text"])))
);


ALTER TABLE "public"."coupon_codes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."coupons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(100) NOT NULL,
    "type" character varying(20) NOT NULL,
    "value" numeric(10,2) DEFAULT 0 NOT NULL,
    "min_usage" numeric(10,2) DEFAULT 0,
    "sku_ids" "text"[] DEFAULT '{}'::"text"[],
    "total_quantity" integer DEFAULT 0,
    "start_date" "date",
    "end_date" "date",
    "status" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "used_quantity" integer DEFAULT 0,
    "code" "text"
);


ALTER TABLE "public"."coupons" OWNER TO "postgres";


COMMENT ON COLUMN "public"."coupons"."code" IS '优惠券使用说明（后台可编辑）';



CREATE TABLE IF NOT EXISTS "public"."faq_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."faq_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."faqs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "category_id" "uuid",
    "question" "text" NOT NULL,
    "answer" "text" NOT NULL,
    "product_id" "uuid",
    "sort_order" integer DEFAULT 0 NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."faqs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."image_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "sort_order" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."image_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "url" "text" NOT NULL,
    "category_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."images" OWNER TO "postgres";


COMMENT ON TABLE "public"."images" IS '图片库表 - 用于图片管理模块';



CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_uid" character(8) NOT NULL,
    "title" character varying NOT NULL,
    "content" "text" NOT NULL,
    "is_read" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "type" "text" DEFAULT 'system'::"text",
    "link" "text",
    "data" "jsonb",
    CONSTRAINT "messages_type_check" CHECK (("type" = ANY (ARRAY['system'::"text", 'order'::"text", 'activity'::"text", 'security'::"text"])))
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


COMMENT ON TABLE "public"."messages" IS '系统消息表 - 对应设计文档 9.5';



COMMENT ON COLUMN "public"."messages"."user_uid" IS '接收消息的用户UID';



COMMENT ON COLUMN "public"."messages"."user_id" IS 'Auth UUID for RLS (references auth.users)';



COMMENT ON COLUMN "public"."messages"."type" IS 'Message type: system, order, activity, security';



COMMENT ON COLUMN "public"."messages"."link" IS 'Optional internal navigation path';



COMMENT ON COLUMN "public"."messages"."data" IS 'Optional JSON metadata';



CREATE TABLE IF NOT EXISTS "public"."order_fulfillments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "status" "text" DEFAULT 'submitted'::"text" NOT NULL,
    "payload" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "reject_reason" "text",
    "submitted_at" timestamp with time zone DEFAULT "now"(),
    "reviewed_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "order_fulfillments_status_check" CHECK (("status" = ANY (ARRAY['submitted'::"text", 'approved'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."order_fulfillments" OWNER TO "postgres";


COMMENT ON TABLE "public"."order_fulfillments" IS '订单履约信息表 - 存储虚拟充值订单的用户回执';



COMMENT ON COLUMN "public"."order_fulfillments"."status" IS '状态：submitted(待审核)/approved(已通过)/rejected(已驳回)';



COMMENT ON COLUMN "public"."order_fulfillments"."payload" IS '用户填写内容JSON，如 {"账号": "xxx", "密码": "xxx"}';



CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "order_no" "text",
    "order_type" character varying(20) DEFAULT 'new'::character varying NOT NULL,
    "start_time" timestamp with time zone NOT NULL,
    "end_time" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" "text" DEFAULT 'paid'::"text",
    "product_snapshot" "jsonb",
    "sku_snapshot" "jsonb",
    "user_id" "uuid",
    "quantity" integer DEFAULT 1,
    "cdk_snapshot" "jsonb",
    "expires_at" timestamp with time zone,
    "slot_occupancy_ids" "uuid"[],
    "total_amount" numeric(10,2),
    "original_amount" numeric(10,2),
    "coupon_snapshot" "jsonb",
    CONSTRAINT "orders_status_check" CHECK (("status" = ANY (ARRAY['pending_delivery'::"text", 'active'::"text", 'refunding'::"text", 'refunded'::"text", 'expired'::"text"])))
);


ALTER TABLE "public"."orders" OWNER TO "postgres";


COMMENT ON TABLE "public"."orders" IS '订单主表 - 记录用户购买行为';



COMMENT ON COLUMN "public"."orders"."order_type" IS '订单类型：normal(首次购买)/renew(续费)';



COMMENT ON COLUMN "public"."orders"."status" IS '订单状态：pending_delivery=待发货, active=使用中, refunding=退款中, refunded=已退款, expired=已过期';



COMMENT ON COLUMN "public"."orders"."product_snapshot" IS '商品快照（下单时刻）：product_name, image, product_type';



COMMENT ON COLUMN "public"."orders"."sku_snapshot" IS 'SKU快照（下单时刻）：spec_combination, price';



COMMENT ON COLUMN "public"."orders"."slot_occupancy_ids" IS '锁定的车位ID数组（直接复制自 pre_order.locked_slot_ids）';



COMMENT ON COLUMN "public"."orders"."total_amount" IS '订单总金额 (可能与 amount_paid 不同，如含优惠)';



COMMENT ON COLUMN "public"."orders"."original_amount" IS '订单原始金额 (优惠前)';



COMMENT ON COLUMN "public"."orders"."coupon_snapshot" IS '优惠券快照：用于记录当时使用的优惠券详情';



CREATE TABLE IF NOT EXISTS "public"."pre_orders" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "total_amount" numeric(10,2) NOT NULL,
    "source" "text" DEFAULT 'buy_now'::"text",
    "expires_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "order_no" "text",
    "quantity" integer DEFAULT 1 NOT NULL,
    "unit_price" numeric(10,2),
    "product_snapshot" "jsonb",
    "sku_snapshot" "jsonb",
    "locked_cdk_ids" "uuid"[],
    "locked_slot_ids" "uuid"[],
    "coupon_id" "uuid",
    "discount_amount" numeric(10,2) DEFAULT 0,
    "original_amount" numeric(10,2),
    CONSTRAINT "pre_orders_source_check" CHECK (("source" = ANY (ARRAY['buy_now'::"text", 'cart'::"text"]))),
    CONSTRAINT "pre_orders_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'converted'::"text", 'expired'::"text", 'deleted'::"text"])))
);


ALTER TABLE "public"."pre_orders" OWNER TO "postgres";


COMMENT ON COLUMN "public"."pre_orders"."status" IS '预订单状态：pending=待支付, converted=已转换, expired=已过期, deleted=已删除';



COMMENT ON COLUMN "public"."pre_orders"."quantity" IS '购买数量';



COMMENT ON COLUMN "public"."pre_orders"."unit_price" IS '单价（来自 SKU）';



COMMENT ON COLUMN "public"."pre_orders"."product_snapshot" IS '商品快照：{product_id, product_name, image}';



COMMENT ON COLUMN "public"."pre_orders"."sku_snapshot" IS 'SKU快照：{sku_id, spec_combination, duration, price}';



COMMENT ON COLUMN "public"."pre_orders"."locked_cdk_ids" IS '锁定的 CDK ID 数组';



COMMENT ON COLUMN "public"."pre_orders"."locked_slot_ids" IS '锁定的 slot_occupancies ID 数组';



CREATE TABLE IF NOT EXISTS "public"."product_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'on'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "product_categories_status_check" CHECK (("status" = ANY (ARRAY['on'::"text", 'off'::"text"])))
);


ALTER TABLE "public"."product_categories" OWNER TO "postgres";


COMMENT ON TABLE "public"."product_categories" IS '商品分类表';



COMMENT ON COLUMN "public"."product_categories"."name" IS '分类名称';



COMMENT ON COLUMN "public"."product_categories"."sort_order" IS '排序值，越小越靠前';



COMMENT ON COLUMN "public"."product_categories"."status" IS '状态：on=启用，off=停用';



CREATE TABLE IF NOT EXISTS "public"."product_sku_map" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_id" "uuid" NOT NULL,
    "sku_id" "uuid" NOT NULL,
    "sort_order" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."product_sku_map" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."product_skus" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "spec_combination" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "image" "text",
    "intro" "text",
    "price" numeric(10,2) NOT NULL,
    "duration" integer,
    "enabled" boolean DEFAULT true,
    "sort_order" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "product_type" character varying,
    "tag" integer,
    "tag_name" character varying(100)
);


ALTER TABLE "public"."product_skus" OWNER TO "postgres";


COMMENT ON TABLE "public"."product_skus" IS 'SKU组合定义，每个SKU对应一种规格组合';



COMMENT ON COLUMN "public"."product_skus"."spec_combination" IS '规格组合JSON，key为规格名，value为规格值';



COMMENT ON COLUMN "public"."product_skus"."image" IS 'SKU专属图片';



COMMENT ON COLUMN "public"."product_skus"."intro" IS 'SKU简介，展示在价格和规格之间';



COMMENT ON COLUMN "public"."product_skus"."price" IS 'SKU售价';



COMMENT ON COLUMN "public"."product_skus"."duration" IS '服务时长（天数）';



COMMENT ON COLUMN "public"."product_skus"."product_type" IS '商品类型（冗余字段，自动从 products 表继承）';



COMMENT ON COLUMN "public"."product_skus"."tag_name" IS '共享规格组名称（同一tag应具有相同的名称）';



CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "product_name" character varying NOT NULL,
    "status" character varying DEFAULT 'on'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "category_id" "uuid",
    "image" "text",
    "sort_order" integer DEFAULT 0,
    "display_price" numeric(10,2) DEFAULT 0,
    "tags" "text"[] DEFAULT '{}'::"text"[],
    "initial_sales" integer DEFAULT 0,
    "badge_label" "text",
    "rating" integer DEFAULT 100,
    "allow_addon" boolean DEFAULT false,
    "detail_modules" "jsonb" DEFAULT '[]'::"jsonb",
    CONSTRAINT "products_rating_check" CHECK ((("rating" >= 0) AND ("rating" <= 100))),
    CONSTRAINT "products_status_check" CHECK ((("status")::"text" = ANY (ARRAY[('on'::character varying)::"text", ('off'::character varying)::"text"])))
);


ALTER TABLE "public"."products" OWNER TO "postgres";


COMMENT ON TABLE "public"."products" IS '商品表 - 对应设计文档 9.2';



COMMENT ON COLUMN "public"."products"."category_id" IS '所属分类ID';



COMMENT ON COLUMN "public"."products"."image" IS '商品头图URL，展示在首页';



COMMENT ON COLUMN "public"."products"."sort_order" IS '排序值，越小越靠前';



COMMENT ON COLUMN "public"."products"."display_price" IS '展示价格（无实际功能），展示在首页';



COMMENT ON COLUMN "public"."products"."tags" IS '商品标签数组，展示在首页商品卡片';



COMMENT ON COLUMN "public"."products"."initial_sales" IS '初始销量，累计销量=初始+实际';



COMMENT ON COLUMN "public"."products"."badge_label" IS '角标标签：热卖/新品/推荐/限量/优惠';



COMMENT ON COLUMN "public"."products"."rating" IS '好评度百分比(0-100)';



COMMENT ON COLUMN "public"."products"."allow_addon" IS '是否支持加购数量';



COMMENT ON COLUMN "public"."products"."detail_modules" IS '详情页图文模块JSONB数组';



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "uid" character(8) NOT NULL,
    "email" character varying NOT NULL,
    "status" character varying DEFAULT 'active'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "nickname" "text",
    "balance" numeric(12,2) DEFAULT 0.00,
    "avatar" "text",
    CONSTRAINT "profiles_status_check" CHECK ((("status")::"text" = ANY (ARRAY[('active'::character varying)::"text", ('disabled'::character varying)::"text"])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


COMMENT ON TABLE "public"."profiles" IS '用户表 - 对应设计文档 9.1';



COMMENT ON COLUMN "public"."profiles"."uid" IS '8位随机数字UID，唯一且永久不变';



CREATE TABLE IF NOT EXISTS "public"."recharge_tiers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "bonus" numeric(10,2) DEFAULT 0 NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'on'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "recharge_tiers_status_check" CHECK (("status" = ANY (ARRAY['on'::"text", 'off'::"text"])))
);


ALTER TABLE "public"."recharge_tiers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."scheduled_task_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "task_name" "text" NOT NULL,
    "status" "text" NOT NULL,
    "affected_count" integer DEFAULT 0,
    "error_message" "text",
    "executed_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "scheduled_task_logs_status_check" CHECK (("status" = ANY (ARRAY['success'::"text", 'error'::"text"])))
);


ALTER TABLE "public"."scheduled_task_logs" OWNER TO "postgres";


COMMENT ON TABLE "public"."scheduled_task_logs" IS '定时任务执行日志';



CREATE TABLE IF NOT EXISTS "public"."shared_sku_groups" (
    "tag" integer NOT NULL,
    "name" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."shared_sku_groups" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."slot_occupancies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "cdk_id" "uuid" NOT NULL,
    "slot_index" integer NOT NULL,
    "order_id" "uuid",
    "status" character varying DEFAULT 'occupied'::character varying NOT NULL,
    "occupied_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "released_at" timestamp with time zone,
    "pre_order_id" "uuid",
    CONSTRAINT "slot_occupancies_status_check" CHECK ((("status")::"text" = ANY (ARRAY[('idle'::character varying)::"text", ('using'::character varying)::"text"])))
);


ALTER TABLE "public"."slot_occupancies" OWNER TO "postgres";


COMMENT ON TABLE "public"."slot_occupancies" IS '车位占用记录表 - 跟踪账号合租类型的车位分配状态';



COMMENT ON COLUMN "public"."slot_occupancies"."slot_index" IS '车位编号 (1 到 max_slots)';



COMMENT ON COLUMN "public"."slot_occupancies"."status" IS '状态：occupied(占用中)/released(已释放)';



CREATE TABLE IF NOT EXISTS "public"."system_settings" (
    "key" "text" NOT NULL,
    "value" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."system_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."system_settings" IS '系统配置表 - 存储 R2 密钥等敏感配置，仅允许 Edge Function 读取';



CREATE TABLE IF NOT EXISTS "public"."user_coupons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "coupon_id" "uuid",
    "status" character varying(20) DEFAULT 'unused'::character varying,
    "redeemed_at" timestamp with time zone DEFAULT "now"(),
    "used_at" timestamp with time zone,
    "code" "text",
    "order_id" "uuid",
    "coupon_snapshot" "jsonb",
    "expire_at" timestamp with time zone,
    "redeemed_code" "text"
);


ALTER TABLE "public"."user_coupons" OWNER TO "postgres";


COMMENT ON COLUMN "public"."user_coupons"."code" IS '优惠券使用说明（兑换时从规则复制）';



COMMENT ON COLUMN "public"."user_coupons"."order_id" IS '使用该优惠券的订单ID';



COMMENT ON COLUMN "public"."user_coupons"."coupon_snapshot" IS '领取时的优惠券规则快照：{name, type, value, min_usage, sku_ids}';



COMMENT ON COLUMN "public"."user_coupons"."expire_at" IS '该优惠券的独立过期时间（领取时计算）';



COMMENT ON COLUMN "public"."user_coupons"."redeemed_code" IS '用户实际使用的兑换码';



CREATE TABLE IF NOT EXISTS "public"."user_favorites" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "product_id" "uuid" NOT NULL,
    "sku_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_favorites" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_favorites" IS '用户收藏表';



CREATE TABLE IF NOT EXISTS "public"."wallet_transactions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "type" character varying(50) NOT NULL,
    "amount" numeric(12,2) NOT NULL,
    "balance_after" numeric(12,2) NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."wallet_transactions" OWNER TO "postgres";


ALTER TABLE ONLY "public"."admin_departments"
    ADD CONSTRAINT "admin_departments_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."admin_departments"
    ADD CONSTRAINT "admin_departments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_auth_user_id_key" UNIQUE ("auth_user_id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."banners"
    ADD CONSTRAINT "banners_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_user_id_sku_id_key" UNIQUE ("user_id", "sku_id");



ALTER TABLE ONLY "public"."cdk_sku_map"
    ADD CONSTRAINT "cdk_sku_map_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cdks"
    ADD CONSTRAINT "cdks_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."cdks"
    ADD CONSTRAINT "cdks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."community_articles"
    ADD CONSTRAINT "community_articles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."community_categories"
    ADD CONSTRAINT "community_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."coupon_codes"
    ADD CONSTRAINT "coupon_codes_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."coupon_codes"
    ADD CONSTRAINT "coupon_codes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."faq_categories"
    ADD CONSTRAINT "faq_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."image_categories"
    ADD CONSTRAINT "image_categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."image_categories"
    ADD CONSTRAINT "image_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."order_fulfillments"
    ADD CONSTRAINT "order_fulfillments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pre_orders"
    ADD CONSTRAINT "pre_orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_sku_map"
    ADD CONSTRAINT "product_sku_map_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."product_sku_map"
    ADD CONSTRAINT "product_sku_map_product_id_sku_id_key" UNIQUE ("product_id", "sku_id");



ALTER TABLE ONLY "public"."product_skus"
    ADD CONSTRAINT "product_skus_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_uid_key" UNIQUE ("uid");



ALTER TABLE ONLY "public"."recharge_tiers"
    ADD CONSTRAINT "recharge_tiers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."scheduled_task_logs"
    ADD CONSTRAINT "scheduled_task_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."shared_sku_groups"
    ADD CONSTRAINT "shared_sku_groups_pkey" PRIMARY KEY ("tag");



ALTER TABLE ONLY "public"."slot_occupancies"
    ADD CONSTRAINT "slot_occupancies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."system_settings"
    ADD CONSTRAINT "system_settings_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."user_coupons"
    ADD CONSTRAINT "user_coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_favorites"
    ADD CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_favorites"
    ADD CONSTRAINT "user_favorites_user_id_product_id_sku_id_key" UNIQUE ("user_id", "product_id", "sku_id");



ALTER TABLE ONLY "public"."wallet_transactions"
    ADD CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_admin_users_department" ON "public"."admin_users" USING "btree" ("department_id");



CREATE INDEX "idx_admin_users_email" ON "public"."admin_users" USING "btree" ("email");



CREATE INDEX "idx_cart_items_user_id" ON "public"."cart_items" USING "btree" ("user_id");



CREATE INDEX "idx_cdk_sku_map_cdk_id" ON "public"."cdk_sku_map" USING "btree" ("cdk_id");



CREATE INDEX "idx_cdk_sku_map_sku_id" ON "public"."cdk_sku_map" USING "btree" ("sku_id");



CREATE INDEX "idx_cdks_pre_order" ON "public"."cdks" USING "btree" ("pre_order_id") WHERE ("pre_order_id" IS NOT NULL);



CREATE INDEX "idx_cdks_product_status" ON "public"."cdks" USING "btree" ("product_id", "status");



CREATE INDEX "idx_coupon_codes_coupon_id" ON "public"."coupon_codes" USING "btree" ("coupon_id");



CREATE INDEX "idx_coupon_codes_status" ON "public"."coupon_codes" USING "btree" ("status");



CREATE INDEX "idx_coupon_codes_user_uid" ON "public"."coupon_codes" USING "btree" ("user_uid");



CREATE INDEX "idx_faqs_product_id" ON "public"."faqs" USING "btree" ("product_id");



CREATE INDEX "idx_fulfillments_order" ON "public"."order_fulfillments" USING "btree" ("order_id");



CREATE INDEX "idx_fulfillments_status" ON "public"."order_fulfillments" USING "btree" ("status");



CREATE INDEX "idx_messages_is_read" ON "public"."messages" USING "btree" ("is_read");



CREATE INDEX "idx_messages_type" ON "public"."messages" USING "btree" ("type");



CREATE INDEX "idx_messages_unread" ON "public"."messages" USING "btree" ("user_uid", "is_read") WHERE ("is_read" = false);



CREATE INDEX "idx_messages_user_id" ON "public"."messages" USING "btree" ("user_id");



CREATE INDEX "idx_messages_user_uid" ON "public"."messages" USING "btree" ("user_uid");



CREATE INDEX "idx_orders_created_at" ON "public"."orders" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_orders_order_no" ON "public"."orders" USING "btree" ("order_no");



CREATE INDEX "idx_orders_status" ON "public"."orders" USING "btree" ("status");



CREATE INDEX "idx_pre_orders_expires" ON "public"."pre_orders" USING "btree" ("status", "expires_at");



CREATE INDEX "idx_pre_orders_user" ON "public"."pre_orders" USING "btree" ("user_id", "status");



CREATE INDEX "idx_product_categories_sort" ON "public"."product_categories" USING "btree" ("sort_order");



CREATE INDEX "idx_products_category" ON "public"."products" USING "btree" ("category_id");



CREATE INDEX "idx_profiles_uid" ON "public"."profiles" USING "btree" ("uid");



CREATE INDEX "idx_psm_product" ON "public"."product_sku_map" USING "btree" ("product_id");



CREATE INDEX "idx_psm_sku" ON "public"."product_sku_map" USING "btree" ("sku_id");



CREATE INDEX "idx_skus_tag" ON "public"."product_skus" USING "btree" ("tag");



CREATE INDEX "idx_skus_type" ON "public"."product_skus" USING "btree" ("product_type");



CREATE INDEX "idx_slot_occupancies_cdk_status" ON "public"."slot_occupancies" USING "btree" ("cdk_id", "status");



CREATE UNIQUE INDEX "idx_slot_occupancies_unique_occupied" ON "public"."slot_occupancies" USING "btree" ("cdk_id", "slot_index") WHERE (("status")::"text" = 'occupied'::"text");



CREATE INDEX "idx_task_logs_executed" ON "public"."scheduled_task_logs" USING "btree" ("executed_at" DESC);



CREATE INDEX "idx_user_coupons_coupon_id" ON "public"."user_coupons" USING "btree" ("coupon_id");



CREATE INDEX "idx_user_coupons_expire_at" ON "public"."user_coupons" USING "btree" ("expire_at");



CREATE INDEX "idx_user_coupons_order_id" ON "public"."user_coupons" USING "btree" ("order_id");



CREATE INDEX "idx_user_coupons_redeemed_code" ON "public"."user_coupons" USING "btree" ("user_id", "redeemed_code");



CREATE INDEX "idx_user_coupons_user_id" ON "public"."user_coupons" USING "btree" ("user_id");



CREATE INDEX "idx_user_favorites_product_id" ON "public"."user_favorites" USING "btree" ("product_id");



CREATE INDEX "idx_user_favorites_user_id" ON "public"."user_favorites" USING "btree" ("user_id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."admin_departments"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."banners"
    ADD CONSTRAINT "banners_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "public"."product_skus"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."cdk_sku_map"
    ADD CONSTRAINT "cdk_sku_map_cdk_id_fkey" FOREIGN KEY ("cdk_id") REFERENCES "public"."cdks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."cdk_sku_map"
    ADD CONSTRAINT "cdk_sku_map_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "public"."product_skus"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."cdks"
    ADD CONSTRAINT "cdks_pre_order_id_fkey" FOREIGN KEY ("pre_order_id") REFERENCES "public"."pre_orders"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."cdks"
    ADD CONSTRAINT "cdks_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."coupon_codes"
    ADD CONSTRAINT "coupon_codes_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."coupon_codes"
    ADD CONSTRAINT "coupon_codes_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."faq_categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."image_categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."order_fulfillments"
    ADD CONSTRAINT "order_fulfillments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pre_orders"
    ADD CONSTRAINT "pre_orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."user_coupons"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."pre_orders"
    ADD CONSTRAINT "pre_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."product_sku_map"
    ADD CONSTRAINT "product_sku_map_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."product_sku_map"
    ADD CONSTRAINT "product_sku_map_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "public"."product_skus"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."slot_occupancies"
    ADD CONSTRAINT "slot_occupancies_cdk_id_fkey" FOREIGN KEY ("cdk_id") REFERENCES "public"."cdks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."slot_occupancies"
    ADD CONSTRAINT "slot_occupancies_pre_order_id_fkey" FOREIGN KEY ("pre_order_id") REFERENCES "public"."pre_orders"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_coupons"
    ADD CONSTRAINT "user_coupons_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."coupons"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_coupons"
    ADD CONSTRAINT "user_coupons_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_coupons"
    ADD CONSTRAINT "user_coupons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_favorites"
    ADD CONSTRAINT "user_favorites_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_favorites"
    ADD CONSTRAINT "user_favorites_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "public"."product_skus"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_favorites"
    ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."wallet_transactions"
    ADD CONSTRAINT "wallet_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



CREATE POLICY "Admin can view all orders" ON "public"."orders" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users" "au"
  WHERE (("au"."email" = ("auth"."jwt"() ->> 'email'::"text")) AND ("au"."status" = 'enabled'::"text")))));



CREATE POLICY "Admins can delete articles" ON "public"."community_articles" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can delete cdks" ON "public"."cdks" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Admins can insert articles" ON "public"."community_articles" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can insert cdks" ON "public"."cdks" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Admins can manage categories" ON "public"."community_categories" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can read all articles" ON "public"."community_articles" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can read all categories" ON "public"."community_categories" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can update articles" ON "public"."community_articles" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Admins can update cdks" ON "public"."cdks" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"())))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Admins can view all cdks" ON "public"."cdks" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Admins can view all pre_orders" ON "public"."pre_orders" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Admins full access on coupons" ON "public"."coupons" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins have full access to recharge_tiers" ON "public"."recharge_tiers" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Allow admin all" ON "public"."shared_sku_groups" USING (true);



CREATE POLICY "Allow admin full access on faq_categories" ON "public"."faq_categories" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Allow admin full access on faqs" ON "public"."faqs" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE ("admin_users"."auth_user_id" = "auth"."uid"()))));



CREATE POLICY "Allow authenticated users to delete coupons" ON "public"."coupons" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to insert coupons" ON "public"."coupons" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow authenticated users to update coupons" ON "public"."coupons" FOR UPDATE TO "authenticated" USING (true);



CREATE POLICY "Allow authenticated users to view coupons" ON "public"."coupons" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Allow insert via functions" ON "public"."orders" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Allow public read" ON "public"."shared_sku_groups" FOR SELECT USING (true);



CREATE POLICY "Allow public read access on faq_categories" ON "public"."faq_categories" FOR SELECT USING (true);



CREATE POLICY "Allow public read access on faqs" ON "public"."faqs" FOR SELECT USING (true);



CREATE POLICY "Anyone can read active tiers" ON "public"."recharge_tiers" FOR SELECT USING (("status" = 'on'::"text"));



CREATE POLICY "Anyone can view active products" ON "public"."products" FOR SELECT USING ((("status")::"text" = 'on'::"text"));



CREATE POLICY "Authenticated users full access on coupon_codes" ON "public"."coupon_codes" TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Public articles are viewable by everyone" ON "public"."community_articles" FOR SELECT USING (("is_published" = true));



CREATE POLICY "Public categories are viewable by everyone" ON "public"."community_categories" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Service role full access" ON "public"."messages" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Users can add their own favorites" ON "public"."user_favorites" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can add to their own cart" ON "public"."cart_items" FOR INSERT TO "authenticated" WITH CHECK (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can delete from their own cart" ON "public"."cart_items" FOR DELETE TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can delete their own favorites" ON "public"."user_favorites" FOR DELETE TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can insert own pre_orders" ON "public"."pre_orders" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own coupons" ON "public"."user_coupons" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own messages" ON "public"."messages" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own pre_orders" ON "public"."pre_orders" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own cart" ON "public"."cart_items" FOR UPDATE TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can update their own coupons" ON "public"."user_coupons" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own orders" ON "public"."orders" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view assigned cdks" ON "public"."cdks" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."pre_orders"
  WHERE (("pre_orders"."user_id" = "auth"."uid"()) AND ("cdks"."id" = ANY ("pre_orders"."locked_cdk_ids"))))));



CREATE POLICY "Users can view own messages" ON "public"."messages" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own pre_orders" ON "public"."pre_orders" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own cart" ON "public"."cart_items" FOR SELECT TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can view their own coupons" ON "public"."user_coupons" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own favorites" ON "public"."user_favorites" FOR SELECT TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can view their own orders" ON "public"."orders" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own transactions" ON "public"."wallet_transactions" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users view own coupon_codes" ON "public"."coupon_codes" FOR SELECT TO "authenticated" USING (("user_uid" = "auth"."uid"()));



ALTER TABLE "public"."admin_departments" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "admin_departments_admin_only" ON "public"."admin_departments" USING ("public"."is_admin"());



ALTER TABLE "public"."admin_users" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "admin_users_can_delete_products" ON "public"."products" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."auth_user_id" = "auth"."uid"()) AND ("admin_users"."status" = 'enabled'::"text")))));



CREATE POLICY "admin_users_can_insert_products" ON "public"."products" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."auth_user_id" = "auth"."uid"()) AND ("admin_users"."status" = 'enabled'::"text")))));



CREATE POLICY "admin_users_can_select_all_products" ON "public"."products" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."auth_user_id" = "auth"."uid"()) AND ("admin_users"."status" = 'enabled'::"text")))));



CREATE POLICY "admin_users_can_update_products" ON "public"."products" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."auth_user_id" = "auth"."uid"()) AND ("admin_users"."status" = 'enabled'::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."auth_user_id" = "auth"."uid"()) AND ("admin_users"."status" = 'enabled'::"text")))));



CREATE POLICY "admin_users_modify" ON "public"."admin_users" TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "admin_users_read_all" ON "public"."admin_users" FOR SELECT TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "admin_users_read_own" ON "public"."admin_users" FOR SELECT TO "authenticated" USING (("auth_user_id" = "auth"."uid"()));



ALTER TABLE "public"."cart_items" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."cdk_sku_map" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "cdk_sku_map_admin_only" ON "public"."cdk_sku_map" USING ("public"."is_admin"());



ALTER TABLE "public"."cdks" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "cdks_admin_only" ON "public"."cdks" USING ("public"."is_admin"());



ALTER TABLE "public"."community_articles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."community_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupon_codes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."faq_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."faqs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."order_fulfillments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."pre_orders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_sku_map" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."product_skus" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "product_skus_admin_delete" ON "public"."product_skus" FOR DELETE USING (true);



CREATE POLICY "product_skus_admin_insert" ON "public"."product_skus" FOR INSERT WITH CHECK (true);



CREATE POLICY "product_skus_admin_read" ON "public"."product_skus" FOR SELECT USING (true);



CREATE POLICY "product_skus_admin_update" ON "public"."product_skus" FOR UPDATE USING (true);



CREATE POLICY "product_skus_public_read" ON "public"."product_skus" FOR SELECT USING (("enabled" = true));



ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "psm_admin_all" ON "public"."product_sku_map" USING (true);



CREATE POLICY "psm_public_read" ON "public"."product_sku_map" FOR SELECT USING (true);



ALTER TABLE "public"."recharge_tiers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."shared_sku_groups" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."slot_occupancies" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "slot_occupancies_admin_only" ON "public"."slot_occupancies" USING ("public"."is_admin"());



ALTER TABLE "public"."system_settings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "system_settings_admin_only" ON "public"."system_settings" USING ("public"."is_admin"());



ALTER TABLE "public"."user_coupons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_favorites" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "users_view_own_order_cdks" ON "public"."cdks" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."orders" "o"
  WHERE (("o"."user_id" = "auth"."uid"()) AND ((("o"."cdk_snapshot" -> 'locked_cdk_ids'::"text") @> "to_jsonb"("cdks"."id")) OR ("o"."cdk_snapshot" @> "to_jsonb"("cdks"."id")))))));



CREATE POLICY "users_view_own_order_slots" ON "public"."slot_occupancies" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."orders" "o"
  WHERE (("o"."user_id" = "auth"."uid"()) AND ("slot_occupancies"."id" = ANY ("o"."slot_occupancy_ids"))))));



ALTER TABLE "public"."wallet_transactions" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "用户可管理自己订单的回执" ON "public"."order_fulfillments" USING (("order_id" IN ( SELECT "orders"."id"
   FROM "public"."orders"
  WHERE ("orders"."user_id" = "auth"."uid"()))));



CREATE POLICY "管理员完全访问回执" ON "public"."order_fulfillments" USING ("public"."is_admin"());





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";































































































































































GRANT ALL ON FUNCTION "public"."admin_delete_coupon_codes"("p_ids" "uuid"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."admin_delete_coupon_codes"("p_ids" "uuid"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_delete_coupon_codes"("p_ids" "uuid"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."admin_generate_coupon_codes"("p_coupon_id" "uuid", "p_quantity" integer, "p_mode" "text", "p_custom_code" "text", "p_usage_limit" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."admin_generate_coupon_codes"("p_coupon_id" "uuid", "p_quantity" integer, "p_mode" "text", "p_custom_code" "text", "p_usage_limit" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_generate_coupon_codes"("p_coupon_id" "uuid", "p_quantity" integer, "p_mode" "text", "p_custom_code" "text", "p_usage_limit" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."apply_coupon_to_pre_order"("p_pre_order_id" "uuid", "p_coupon_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."apply_coupon_to_pre_order"("p_pre_order_id" "uuid", "p_coupon_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."apply_coupon_to_pre_order"("p_pre_order_id" "uuid", "p_coupon_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."calculate_coupon_discount"("p_user_id" "uuid", "p_coupon_id" "uuid", "p_order_amount" numeric, "p_sku_ids" "uuid"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_coupon_discount"("p_user_id" "uuid", "p_coupon_id" "uuid", "p_order_amount" numeric, "p_sku_ids" "uuid"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_coupon_discount"("p_user_id" "uuid", "p_coupon_id" "uuid", "p_order_amount" numeric, "p_sku_ids" "uuid"[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."cancel_pre_order"("p_pre_order_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."cancel_pre_order"("p_pre_order_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."cancel_pre_order"("p_pre_order_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."check_email_available"("email_input" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."check_email_available"("email_input" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_email_available"("email_input" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."cleanup_expired_preorders"() TO "anon";
GRANT ALL ON FUNCTION "public"."cleanup_expired_preorders"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."cleanup_expired_preorders"() TO "service_role";



GRANT ALL ON FUNCTION "public"."confirm_pre_order"("p_pre_order_id" "uuid", "p_pay_method" "text", "p_coupon_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."confirm_pre_order"("p_pre_order_id" "uuid", "p_pay_method" "text", "p_coupon_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."confirm_pre_order"("p_pre_order_id" "uuid", "p_pay_method" "text", "p_coupon_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."create_pre_order"("p_sku_id" "uuid", "p_quantity" integer, "p_source" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_pre_order"("p_sku_id" "uuid", "p_quantity" integer, "p_source" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_pre_order"("p_sku_id" "uuid", "p_quantity" integer, "p_source" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_own_account"() TO "anon";
GRANT ALL ON FUNCTION "public"."delete_own_account"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_own_account"() TO "service_role";



GRANT ALL ON FUNCTION "public"."delete_preorder"("p_preorder_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."delete_preorder"("p_preorder_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."delete_preorder"("p_preorder_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_unique_uid"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_unique_uid"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_unique_uid"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_all_skus_with_product_info"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_all_skus_with_product_info"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_all_skus_with_product_info"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_client_order_detail"("p_order_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_client_order_detail"("p_order_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_client_order_detail"("p_order_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_pre_order"("p_pre_order_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_pre_order"("p_pre_order_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_pre_order"("p_pre_order_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_sku_stock"("p_sku_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_sku_stock"("p_sku_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_sku_stock"("p_sku_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_messages"("p_user_uid" character, "p_limit" integer, "p_offset" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_messages"("p_user_uid" character, "p_limit" integer, "p_offset" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_messages"("p_user_uid" character, "p_limit" integer, "p_offset" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_article_views"("article_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_article_views"("article_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_article_views"("article_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."mark_message_read"("p_message_id" "uuid", "p_user_uid" character) TO "anon";
GRANT ALL ON FUNCTION "public"."mark_message_read"("p_message_id" "uuid", "p_user_uid" character) TO "authenticated";
GRANT ALL ON FUNCTION "public"."mark_message_read"("p_message_id" "uuid", "p_user_uid" character) TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_order_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_order_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_order_delete"() TO "service_role";



GRANT ALL ON FUNCTION "public"."redeem_coupon"("p_code" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."redeem_coupon"("p_code" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."redeem_coupon"("p_code" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."release_expired_pre_orders"() TO "anon";
GRANT ALL ON FUNCTION "public"."release_expired_pre_orders"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."release_expired_pre_orders"() TO "service_role";



GRANT ALL ON FUNCTION "public"."release_preorder_resources"("p_preorder_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."release_preorder_resources"("p_preorder_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."release_preorder_resources"("p_preorder_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."renew_order"("p_original_order_id" "uuid", "p_duration_days" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."renew_order"("p_original_order_id" "uuid", "p_duration_days" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."renew_order"("p_original_order_id" "uuid", "p_duration_days" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."send_admin_message"("p_user_uid" character, "p_title" character varying, "p_content" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."send_admin_message"("p_user_uid" character, "p_title" character varying, "p_content" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."send_admin_message"("p_user_uid" character, "p_title" character varying, "p_content" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."sync_email_to_profile"() TO "anon";
GRANT ALL ON FUNCTION "public"."sync_email_to_profile"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."sync_email_to_profile"() TO "service_role";



GRANT ALL ON FUNCTION "public"."use_balance_coupon"("p_user_coupon_id" "uuid", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."use_balance_coupon"("p_user_coupon_id" "uuid", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."use_balance_coupon"("p_user_coupon_id" "uuid", "p_user_id" "uuid") TO "service_role";


















GRANT ALL ON TABLE "public"."admin_departments" TO "anon";
GRANT ALL ON TABLE "public"."admin_departments" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_departments" TO "service_role";



GRANT ALL ON TABLE "public"."admin_users" TO "anon";
GRANT ALL ON TABLE "public"."admin_users" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_users" TO "service_role";



GRANT ALL ON TABLE "public"."banners" TO "anon";
GRANT ALL ON TABLE "public"."banners" TO "authenticated";
GRANT ALL ON TABLE "public"."banners" TO "service_role";



GRANT ALL ON TABLE "public"."cart_items" TO "anon";
GRANT ALL ON TABLE "public"."cart_items" TO "authenticated";
GRANT ALL ON TABLE "public"."cart_items" TO "service_role";



GRANT ALL ON TABLE "public"."cdk_sku_map" TO "anon";
GRANT ALL ON TABLE "public"."cdk_sku_map" TO "authenticated";
GRANT ALL ON TABLE "public"."cdk_sku_map" TO "service_role";



GRANT ALL ON TABLE "public"."cdks" TO "anon";
GRANT ALL ON TABLE "public"."cdks" TO "authenticated";
GRANT ALL ON TABLE "public"."cdks" TO "service_role";



GRANT ALL ON TABLE "public"."community_articles" TO "anon";
GRANT ALL ON TABLE "public"."community_articles" TO "authenticated";
GRANT ALL ON TABLE "public"."community_articles" TO "service_role";



GRANT ALL ON TABLE "public"."community_categories" TO "anon";
GRANT ALL ON TABLE "public"."community_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."community_categories" TO "service_role";



GRANT ALL ON TABLE "public"."coupon_codes" TO "anon";
GRANT ALL ON TABLE "public"."coupon_codes" TO "authenticated";
GRANT ALL ON TABLE "public"."coupon_codes" TO "service_role";



GRANT ALL ON TABLE "public"."coupons" TO "anon";
GRANT ALL ON TABLE "public"."coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."coupons" TO "service_role";



GRANT ALL ON TABLE "public"."faq_categories" TO "anon";
GRANT ALL ON TABLE "public"."faq_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."faq_categories" TO "service_role";



GRANT ALL ON TABLE "public"."faqs" TO "anon";
GRANT ALL ON TABLE "public"."faqs" TO "authenticated";
GRANT ALL ON TABLE "public"."faqs" TO "service_role";



GRANT ALL ON TABLE "public"."image_categories" TO "anon";
GRANT ALL ON TABLE "public"."image_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."image_categories" TO "service_role";



GRANT ALL ON TABLE "public"."images" TO "anon";
GRANT ALL ON TABLE "public"."images" TO "authenticated";
GRANT ALL ON TABLE "public"."images" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."order_fulfillments" TO "anon";
GRANT ALL ON TABLE "public"."order_fulfillments" TO "authenticated";
GRANT ALL ON TABLE "public"."order_fulfillments" TO "service_role";



GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";



GRANT ALL ON TABLE "public"."pre_orders" TO "anon";
GRANT ALL ON TABLE "public"."pre_orders" TO "authenticated";
GRANT ALL ON TABLE "public"."pre_orders" TO "service_role";



GRANT ALL ON TABLE "public"."product_categories" TO "anon";
GRANT ALL ON TABLE "public"."product_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."product_categories" TO "service_role";



GRANT ALL ON TABLE "public"."product_sku_map" TO "anon";
GRANT ALL ON TABLE "public"."product_sku_map" TO "authenticated";
GRANT ALL ON TABLE "public"."product_sku_map" TO "service_role";



GRANT ALL ON TABLE "public"."product_skus" TO "anon";
GRANT ALL ON TABLE "public"."product_skus" TO "authenticated";
GRANT ALL ON TABLE "public"."product_skus" TO "service_role";



GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."recharge_tiers" TO "anon";
GRANT ALL ON TABLE "public"."recharge_tiers" TO "authenticated";
GRANT ALL ON TABLE "public"."recharge_tiers" TO "service_role";



GRANT ALL ON TABLE "public"."scheduled_task_logs" TO "anon";
GRANT ALL ON TABLE "public"."scheduled_task_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."scheduled_task_logs" TO "service_role";



GRANT ALL ON TABLE "public"."shared_sku_groups" TO "anon";
GRANT ALL ON TABLE "public"."shared_sku_groups" TO "authenticated";
GRANT ALL ON TABLE "public"."shared_sku_groups" TO "service_role";



GRANT ALL ON TABLE "public"."slot_occupancies" TO "anon";
GRANT ALL ON TABLE "public"."slot_occupancies" TO "authenticated";
GRANT ALL ON TABLE "public"."slot_occupancies" TO "service_role";



GRANT ALL ON TABLE "public"."system_settings" TO "anon";
GRANT ALL ON TABLE "public"."system_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."system_settings" TO "service_role";



GRANT ALL ON TABLE "public"."user_coupons" TO "anon";
GRANT ALL ON TABLE "public"."user_coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."user_coupons" TO "service_role";



GRANT ALL ON TABLE "public"."user_favorites" TO "anon";
GRANT ALL ON TABLE "public"."user_favorites" TO "authenticated";
GRANT ALL ON TABLE "public"."user_favorites" TO "service_role";



GRANT ALL ON TABLE "public"."wallet_transactions" TO "anon";
GRANT ALL ON TABLE "public"."wallet_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."wallet_transactions" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated AFTER UPDATE ON auth.users FOR EACH ROW WHEN (((old.email)::text IS DISTINCT FROM (new.email)::text)) EXECUTE FUNCTION public.sync_email_to_profile();


-- ============================================
-- 统一修复外键：user_id 从 auth.users 改为指向 profiles
-- 目的：让 PostgREST 能自动识别与 profiles 的关联关系
-- ============================================

-- 1. cart_items
ALTER TABLE "public"."cart_items" DROP CONSTRAINT IF EXISTS "cart_items_user_id_fkey";
ALTER TABLE "public"."cart_items" 
    ADD CONSTRAINT "cart_items_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 2. messages
ALTER TABLE "public"."messages" DROP CONSTRAINT IF EXISTS "messages_user_id_fkey";
ALTER TABLE "public"."messages" 
    ADD CONSTRAINT "messages_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 3. orders
ALTER TABLE "public"."orders" DROP CONSTRAINT IF EXISTS "orders_user_id_fkey";
ALTER TABLE "public"."orders" 
    ADD CONSTRAINT "orders_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

-- 4. pre_orders
ALTER TABLE "public"."pre_orders" DROP CONSTRAINT IF EXISTS "pre_orders_user_id_fkey";
ALTER TABLE "public"."pre_orders" 
    ADD CONSTRAINT "pre_orders_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

-- 5. user_coupons
ALTER TABLE "public"."user_coupons" DROP CONSTRAINT IF EXISTS "user_coupons_user_id_fkey";
ALTER TABLE "public"."user_coupons" 
    ADD CONSTRAINT "user_coupons_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 6. user_favorites
ALTER TABLE "public"."user_favorites" DROP CONSTRAINT IF EXISTS "user_favorites_user_id_fkey";
ALTER TABLE "public"."user_favorites" 
    ADD CONSTRAINT "user_favorites_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 7. wallet_transactions
ALTER TABLE "public"."wallet_transactions" DROP CONSTRAINT IF EXISTS "wallet_transactions_user_id_fkey";
ALTER TABLE "public"."wallet_transactions" 
    ADD CONSTRAINT "wallet_transactions_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

-- 8. coupon_codes.user_uid (特殊情况：字段名是 user_uid)
ALTER TABLE "public"."coupon_codes" DROP CONSTRAINT IF EXISTS "coupon_codes_user_uid_fkey";
ALTER TABLE "public"."coupon_codes" 
    ADD CONSTRAINT "coupon_codes_user_uid_fkey" 
    FOREIGN KEY ("user_uid") REFERENCES "public"."profiles"("id");

-- ============================================
-- 注：profiles.id 与 auth.users.id 相同（通过触发器同步）
-- 此修改仅改变外键目标，不影响数据完整性
-- ============================================
-- Migration: Update slot_occupancies for shared_account orders
-- Adds user_id column and updates functions to write pre_order_id, order_id, user_id

-- 1. Add user_id column to slot_occupancies
ALTER TABLE public.slot_occupancies 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id);

COMMENT ON COLUMN public.slot_occupancies.user_id IS '关联用户ID（主订单创建时写入）';

-- 2. Update create_pre_order function to write pre_order_id after INSERT
CREATE OR REPLACE FUNCTION public.create_pre_order(
  p_sku_id UUID, 
  p_quantity INTEGER DEFAULT 1, 
  p_source TEXT DEFAULT 'buy_now'
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_pending_count INTEGER;
  v_sku RECORD;
  v_product RECORD;
  v_product_id UUID;
  v_pre_order_id UUID;
  v_order_no TEXT;
  v_total_amount DECIMAL;
  v_expires_at TIMESTAMP WITH TIME ZONE;
  v_product_snapshot JSONB;
  v_sku_snapshot JSONB;
  v_locked_cdk_ids UUID[] := '{}';
  v_locked_slot_ids UUID[] := '{}';
  v_cdk_id UUID;
  v_slot_id UUID;
  v_found_count INTEGER := 0;
  v_cdk_record RECORD;
BEGIN
  -- ============================================
  -- 步骤1：验证用户登录
  -- ============================================
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;

  -- ============================================
  -- 步骤2：检查未支付订单数量（限制3个）
  -- ============================================
  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;

  -- ============================================
  -- 步骤3：获取 SKU 和商品信息
  -- ============================================
  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
  -- 通过 product_sku_map 获取商品ID
  SELECT product_id INTO v_product_id 
  FROM product_sku_map 
  WHERE sku_id = p_sku_id 
  LIMIT 1;
  
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU未绑定商品');
  END IF;
  
  SELECT * INTO v_product FROM products WHERE id = v_product_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '商品不存在');
  END IF;

  -- ============================================
  -- 步骤4：根据 SKU 类型锁定资源
  -- ============================================
  IF v_sku.product_type = 'virtual' THEN
    -- Virtual 类型：找 stock >= Q 的 CDK，扣减库存，记录 CDK ID
    SELECT c.id, c.stock INTO v_cdk_record
    FROM cdks c
    JOIN cdk_sku_map m ON m.cdk_id = c.id
    WHERE m.sku_id = p_sku_id
      AND c.stock >= p_quantity
    LIMIT 1
    FOR UPDATE SKIP LOCKED;
    
    IF v_cdk_record.id IS NULL THEN
      RETURN jsonb_build_object('success', false, 'error', '暂无可用库存');
    END IF;
    
    -- 扣减库存
    UPDATE cdks SET stock = stock - p_quantity WHERE id = v_cdk_record.id;
    
    -- 按 quantity 次数记录 CDK ID
    FOR i IN 1..p_quantity LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
    END LOOP;
    
  ELSIF v_sku.product_type = 'one_time_cdk' THEN
    -- One-time 类型：找 Q 个 idle 状态的 CDK，改为 using
    FOR v_cdk_record IN
      SELECT c.id
      FROM cdks c
      JOIN cdk_sku_map m ON m.cdk_id = c.id
      WHERE m.sku_id = p_sku_id
        AND c.status = 'idle'
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
      UPDATE cdks SET status = 'using' WHERE id = v_cdk_record.id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      -- 回滚已锁定的 CDK
      UPDATE cdks SET status = 'idle' WHERE id = ANY(v_locked_cdk_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用的激活码');
    END IF;
    
  ELSIF v_sku.product_type = 'shared_account' THEN
    -- Shared 类型：找 Q 个 idle 槽位（优先同一 CDK），改为 using
    -- 注意：pre_order_id 需要在 INSERT 后统一更新
    FOR v_cdk_record IN
      SELECT so.id AS slot_id, so.cdk_id
      FROM slot_occupancies so
      JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
      WHERE m.sku_id = p_sku_id
        AND so.status = 'idle'
      ORDER BY so.cdk_id  -- 优先同一 CDK
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_slot_ids := array_append(v_locked_slot_ids, v_cdk_record.slot_id);
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.cdk_id);
      -- 先只更新 status，pre_order_id 在 INSERT 后统一更新
      UPDATE slot_occupancies SET status = 'using' WHERE id = v_cdk_record.slot_id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      -- 回滚已锁定的槽位
      UPDATE slot_occupancies SET status = 'idle' WHERE id = ANY(v_locked_slot_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用位置');
    END IF;
  ELSE
    RETURN jsonb_build_object('success', false, 'error', '不支持的商品类型');
  END IF;

  -- ============================================
  -- 步骤5：构建快照
  -- ============================================
  v_product_snapshot := jsonb_build_object(
    'product_id', v_product.id,
    'product_name', v_product.product_name,
    'image', v_product.image
  );
  
  v_sku_snapshot := jsonb_build_object(
    'sku_id', v_sku.id,
    'spec_combination', v_sku.spec_combination,
    'duration', v_sku.duration,
    'price', v_sku.price,
    'product_type', v_sku.product_type
  );

  -- ============================================
  -- 步骤6：生成订单号 + 过期时间
  -- ============================================
  v_order_no := TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  v_expires_at := NOW() + INTERVAL '15 minutes';
  v_total_amount := v_sku.price * p_quantity;

  -- ============================================
  -- 步骤7：插入预订单
  -- ============================================
  INSERT INTO pre_orders (
    user_id, order_no, status, source, 
    quantity, unit_price, total_amount,
    original_amount,
    product_snapshot, sku_snapshot,
    locked_cdk_ids, locked_slot_ids,
    expires_at, created_at
  )
  VALUES (
    v_user_id, v_order_no, 'pending', p_source,
    p_quantity, v_sku.price, v_total_amount,
    v_total_amount,
    v_product_snapshot, v_sku_snapshot,
    v_locked_cdk_ids, v_locked_slot_ids,
    v_expires_at, NOW()
  )
  RETURNING id INTO v_pre_order_id;

  -- ============================================
  -- 步骤8：[新增] 更新 slot_occupancies 的 pre_order_id
  -- ============================================
  IF v_sku.product_type = 'shared_account' AND array_length(v_locked_slot_ids, 1) > 0 THEN
    UPDATE slot_occupancies 
    SET pre_order_id = v_pre_order_id
    WHERE id = ANY(v_locked_slot_ids);
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'pre_order_id', v_pre_order_id,
    'order_no', v_order_no,
    'total_amount', v_total_amount,
    'original_amount', v_total_amount,
    'expires_at', v_expires_at
  );

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建预订单失败: ' || SQLERRM);
END;
$$;

-- 3. Update confirm_pre_order function to write order_id and user_id
CREATE OR REPLACE FUNCTION public.confirm_pre_order(
  p_pre_order_id UUID, 
  p_pay_method TEXT, 
  p_coupon_id UUID DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    v_pre_order RECORD;
    v_user_balance DECIMAL(10, 2);
    v_need_amount DECIMAL(10, 2);
    v_original_amount DECIMAL(10, 2);
    v_order_no TEXT;
    v_order_id UUID;
    v_discount_result JSONB;
    v_discount_amount DECIMAL(10, 2) := 0;
    v_sku_id UUID;
    v_sku_ids UUID[];
    v_active_coupon_id UUID;
    v_coupon_snapshot JSONB := NULL;
    v_coupon_code TEXT;
    v_coupon_type TEXT;
    v_coupon_name TEXT;
    
    v_order_status TEXT;
    v_product_type TEXT;
    v_duration INTEGER;
    v_end_time TIMESTAMP WITH TIME ZONE;
    
    -- 用于钱包记录描述
    v_product_name TEXT;
    v_spec_text TEXT;
    v_wallet_desc TEXT;
BEGIN
    -- ============================================
    -- 步骤1：获取并验证预订单
    -- ============================================
    SELECT * INTO v_pre_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    -- 验证订单属于当前用户
    IF v_pre_order.user_id != auth.uid() THEN
        RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
    END IF;
    IF v_pre_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可支付');
    END IF;
    
    IF v_pre_order.expires_at < NOW() THEN
        PERFORM release_preorder_resources(p_pre_order_id);
        UPDATE pre_orders SET status = 'expired' WHERE id = p_pre_order_id;
        RETURN jsonb_build_object('success', false, 'error', '订单已过期');
    END IF;
    -- 提取关键信息
    v_product_type := v_pre_order.sku_snapshot->>'product_type';
    v_duration := COALESCE((v_pre_order.sku_snapshot->>'duration')::INTEGER, 30);
    
    -- 提取商品名称和规格（用于钱包记录）
    v_product_name := COALESCE(v_pre_order.product_snapshot->>'product_name', '商品');
    SELECT string_agg(value::text, '，') INTO v_spec_text
    FROM jsonb_each_text(v_pre_order.sku_snapshot->'spec_combination');
    v_spec_text := COALESCE(v_spec_text, '');
    -- ============================================
    -- 步骤2：处理优惠券
    -- ============================================
    v_active_coupon_id := COALESCE(p_coupon_id, v_pre_order.coupon_id);
    v_original_amount := COALESCE(v_pre_order.original_amount, v_pre_order.total_amount, 0);
    v_need_amount := v_original_amount;
    IF v_active_coupon_id IS NOT NULL THEN
        -- 从快照读取优惠券信息
        SELECT 
            uc.coupon_snapshot->>'type',
            uc.coupon_snapshot->>'name',
            uc.code
        INTO 
            v_coupon_type, v_coupon_name, v_coupon_code
        FROM user_coupons uc
        WHERE uc.id = v_active_coupon_id
          AND uc.user_id = auth.uid();
        IF NOT FOUND THEN
            RETURN jsonb_build_object('success', false, 'error', '优惠券不存在或不可用');
        END IF;
        v_sku_id := (v_pre_order.sku_snapshot->>'sku_id')::UUID;
        v_sku_ids := ARRAY[v_sku_id];
        
        v_discount_result := calculate_coupon_discount(auth.uid(), v_active_coupon_id, v_need_amount, v_sku_ids);
        
        IF (v_discount_result->>'valid')::BOOLEAN = FALSE THEN
            RETURN jsonb_build_object('success', false, 'error', v_discount_result->>'error');
        END IF;
        
        v_discount_amount := (v_discount_result->>'discount_amount')::DECIMAL;
        v_need_amount := (v_discount_result->>'final_amount')::DECIMAL;
        
        v_coupon_snapshot := jsonb_build_object(
            'id', v_active_coupon_id, 
            'code', v_coupon_code,
            'type', v_coupon_type, 
            'name', v_coupon_name,
            'discount_amount', v_discount_amount
        );
    END IF;
    -- ============================================
    -- 步骤3：余额支付
    -- ============================================
    IF p_pay_method = 'balance' THEN
        SELECT balance INTO v_user_balance FROM profiles WHERE id = auth.uid();
        
        IF v_user_balance < v_need_amount THEN
            RETURN jsonb_build_object('success', false, 'error', format('余额不足，需 ￥%s，当前 ￥%s', v_need_amount, v_user_balance));
        END IF;
        
        UPDATE profiles SET balance = balance - v_need_amount WHERE id = auth.uid();
        
        -- 钱包记录描述：商品名称：规格
        IF v_spec_text != '' THEN
            v_wallet_desc := format('%s：%s', v_product_name, v_spec_text);
        ELSE
            v_wallet_desc := v_product_name;
        END IF;
        
        INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
        VALUES (
            auth.uid(), 
            -v_need_amount, 
            'payment', 
            v_user_balance - v_need_amount,
            v_wallet_desc
        );
    ELSE
        RETURN jsonb_build_object('success', false, 'error', '不支持的支付方式');
    END IF;
    -- ============================================
    -- 步骤4：状态判定
    -- ============================================
    IF v_product_type = 'virtual' THEN
        v_order_status := 'pending_delivery';
    ELSE
        v_order_status := 'active';
    END IF;
    -- ============================================
    -- 步骤5：计算到期时间
    -- ============================================
    v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
    -- ============================================
    -- 步骤6：创建主订单
    -- ============================================
    v_order_no := v_pre_order.order_no;
    
    INSERT INTO orders (
        user_id, order_no, total_amount, original_amount,
        start_time, end_time, expires_at, status,           
        product_snapshot, sku_snapshot, cdk_snapshot, 
        quantity, coupon_snapshot, order_type, slot_occupancy_ids
    ) VALUES (
        v_pre_order.user_id, v_order_no, v_need_amount, v_original_amount,
        NOW(), v_end_time, v_end_time, v_order_status,
        v_pre_order.product_snapshot, v_pre_order.sku_snapshot,
        jsonb_build_object('locked_cdk_ids', v_pre_order.locked_cdk_ids),
        v_pre_order.quantity, v_coupon_snapshot, v_product_type,
        v_pre_order.locked_slot_ids
    ) RETURNING id INTO v_order_id;

    -- ============================================
    -- 步骤6.5：[新增] 更新 slot_occupancies 的 order_id 和 user_id
    -- ============================================
    IF v_product_type = 'shared_account' AND v_pre_order.locked_slot_ids IS NOT NULL 
       AND array_length(v_pre_order.locked_slot_ids, 1) > 0 THEN
        UPDATE slot_occupancies 
        SET order_id = v_order_id, user_id = v_pre_order.user_id
        WHERE id = ANY(v_pre_order.locked_slot_ids);
    END IF;

    -- ============================================
    -- 步骤7：标记优惠券已使用（只更新 user_coupons）
    -- ============================================
    IF v_active_coupon_id IS NOT NULL THEN
        UPDATE user_coupons 
        SET status = 'used', 
            used_at = NOW(),
            order_id = v_order_id
        WHERE id = v_active_coupon_id;
    END IF;
    -- ============================================
    -- 步骤8：更新预订单状态
    -- ============================================
    UPDATE pre_orders 
    SET status = 'converted',
        coupon_id = v_active_coupon_id,
        discount_amount = v_discount_amount,
        total_amount = v_need_amount
    WHERE id = p_pre_order_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'order_no', v_order_no,
        'order_id', v_order_id,
        'total_amount', v_need_amount,
        'expires_at', v_end_time
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '支付失败: ' || SQLERRM);
END;
$$;

COMMENT ON FUNCTION public.confirm_pre_order(UUID, TEXT, UUID) IS '确认预订单 - 更新slot_occupancies写入order_id和user_id';
