-- Migration: fix_core_functions (Part 1)
-- Synced from cloud Supabase
-- Contains: Admin, Coupon, User, Auth, and Util functions

CREATE OR REPLACE FUNCTION public.admin_cleanup_ticket_images(p_days_old integer DEFAULT 7)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_deleted_count INT;
    v_updated_msg_count INT;
BEGIN
    RETURN jsonb_build_object(
        'success', true, 
        'message', 'Please use the Admin API endpoint /admin/ticket/cleanup which handles storage deletion'
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_delete_coupon_codes(p_ids uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_deleted_count INTEGER;
BEGIN
    DELETE FROM coupon_codes WHERE id = ANY(p_ids);
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

    RETURN jsonb_build_object(
        'success', true,
        'count', v_deleted_count
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '删除失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_generate_coupon_codes(p_coupon_id uuid, p_quantity integer DEFAULT 1, p_mode text DEFAULT 'random'::text, p_custom_code text DEFAULT NULL::text, p_usage_limit integer DEFAULT 1)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_coupon_exists BOOLEAN;
    v_generated_count INTEGER := 0;
    v_new_code TEXT;
    i INTEGER;
    k INTEGER;
    v_chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    v_rnd_str TEXT;
BEGIN
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
$function$;

CREATE OR REPLACE FUNCTION public.admin_review_refund(p_request_id uuid, p_approved boolean, p_refund_amount numeric DEFAULT NULL::numeric, p_admin_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_admin_id UUID;
  v_is_admin BOOLEAN;
  v_request RECORD;
  v_order RECORD;
  v_user_balance DECIMAL;
BEGIN
  v_admin_id := auth.uid();
  
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = v_admin_id AND role = 'admin'
  ) INTO v_is_admin;
  
  IF NOT v_is_admin THEN
    RETURN jsonb_build_object('success', false, 'error', '无管理员权限');
  END IF;
  SELECT * INTO v_request FROM refund_requests WHERE id = p_request_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '退款申请不存在');
  END IF;
  
  IF v_request.status != 'pending' THEN
    RETURN jsonb_build_object('success', false, 'error', '该申请已处理');
  END IF;
  SELECT * INTO v_order FROM orders WHERE id = v_request.order_id;
  IF p_approved THEN
    IF p_refund_amount IS NULL OR p_refund_amount <= 0 THEN
      RETURN jsonb_build_object('success', false, 'error', '请填写有效的退款金额');
    END IF;
    
    IF p_refund_amount > v_order.total_amount THEN
      RETURN jsonb_build_object('success', false, 'error', '退款金额不能超过订单金额');
    END IF;
    UPDATE refund_requests SET
      status = 'approved',
      refund_amount = p_refund_amount,
      admin_id = v_admin_id,
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;
    UPDATE orders SET status = 'refunded' WHERE id = v_request.order_id;
    SELECT balance INTO v_user_balance FROM profiles WHERE id = v_request.user_id;
    
    UPDATE profiles SET balance = balance + p_refund_amount WHERE id = v_request.user_id;
    INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
    VALUES (
      v_request.user_id,
      p_refund_amount,
      'refund',
      v_user_balance + p_refund_amount,
      '订单退款: ' || v_order.order_no
    );
    IF v_order.order_type = 'shared_account' AND v_order.slot_occupancy_ids IS NOT NULL THEN
      UPDATE slot_occupancies 
      SET status = 'idle', order_id = NULL, user_id = NULL
      WHERE id = ANY(v_order.slot_occupancy_ids);
    END IF;
    RETURN jsonb_build_object('success', true, 'message', '退款审批通过');
  ELSE
    UPDATE refund_requests SET
      status = 'rejected',
      admin_id = v_admin_id,
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;
    UPDATE orders SET status = v_request.original_status WHERE id = v_request.order_id;
    RETURN jsonb_build_object('success', true, 'message', '已拒绝退款申请');
  END IF;
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '审核失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.apply_coupon_to_pre_order(p_pre_order_id uuid, p_coupon_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
    RETURN jsonb_build_object('success', false, 'error', '应用优惠券系统异常: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.calculate_coupon_discount(p_user_id uuid, p_coupon_id uuid, p_order_amount numeric, p_sku_ids uuid[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_coupon_record RECORD;
    v_discount_amount DECIMAL(10,2) := 0;
    v_sku_id UUID;
    v_sku_price DECIMAL(10,2);
    v_has_valid_product BOOLEAN := FALSE;
    v_coupon_sku_ids UUID[];
BEGIN
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
    IF v_coupon_record.status != 'unused' THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券已使用或不可用');
    END IF;
    IF v_coupon_record.expire_at IS NOT NULL AND v_coupon_record.expire_at < NOW() THEN
        RETURN jsonb_build_object('valid', false, 'error', '优惠券已过期');
    END IF;
    IF p_order_amount < COALESCE(v_coupon_record.min_usage, 0) THEN
        RETURN jsonb_build_object('valid', false, 'error', format('订单金额未满 ￥%s', v_coupon_record.min_usage));
    END IF;
    IF v_coupon_record.type = 'balance' THEN
        RETURN jsonb_build_object('valid', false, 'error', '余额券不能直接抵扣订单');
        
    ELSIF v_coupon_record.type = 'flat' THEN
        v_discount_amount := v_coupon_record.value;
        
    ELSIF v_coupon_record.type = 'product' THEN
        IF p_sku_ids IS NULL OR array_length(p_sku_ids, 1) = 0 THEN
            RETURN jsonb_build_object('valid', false, 'error', '订单中没有商品');
        END IF;
        IF v_coupon_record.sku_ids_json IS NOT NULL THEN
            SELECT ARRAY(
                SELECT (elem::text)::uuid 
                FROM jsonb_array_elements_text(v_coupon_record.sku_ids_json) AS elem
                WHERE elem::text != ''
            ) INTO v_coupon_sku_ids;
        ELSE
            v_coupon_sku_ids := '{}';
        END IF;
        FOREACH v_sku_id IN ARRAY p_sku_ids
        LOOP
            IF v_sku_id = ANY(v_coupon_sku_ids) THEN
                v_has_valid_product := TRUE;
                
                SELECT price INTO v_sku_price FROM product_skus WHERE id = v_sku_id;
                IF v_sku_price IS NULL THEN v_sku_price := 0; END IF;
                
                v_discount_amount := v_discount_amount + v_sku_price;
                EXIT;
            END IF;
        END LOOP;
        
        IF NOT v_has_valid_product THEN
            RETURN jsonb_build_object('valid', false, 'error', '该优惠券仅限指定商品使用');
        END IF;
    END IF;
    IF v_discount_amount > p_order_amount THEN
        v_discount_amount := p_order_amount;
    END IF;
    RETURN jsonb_build_object(
        'valid', true,
        'discount_amount', v_discount_amount,
        'final_amount', p_order_amount - v_discount_amount
    );
END;
$function$;

CREATE OR REPLACE FUNCTION public.redeem_coupon(p_code text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_user_id UUID;
    v_coupon RECORD;
    v_code_record RECORD;
    v_existing_id UUID;
    v_today TIMESTAMPTZ := NOW();
    v_expire_at TIMESTAMPTZ;
    v_coupon_snapshot JSONB;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '请先登录');
    END IF;
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
    IF v_coupon.code_status != 'available' THEN
        RETURN jsonb_build_object('success', false, 'error', '该兑换码已失效');
    END IF;
    IF v_coupon.used_count >= v_coupon.max_usage THEN
        RETURN jsonb_build_object('success', false, 'error', '该兑换码已被领完');
    END IF;
    IF v_coupon.rule_status IS FALSE THEN
        RETURN jsonb_build_object('success', false, 'error', '该活动已结束');
    END IF;
    IF v_coupon.start_date IS NOT NULL AND v_today < v_coupon.start_date THEN
        RETURN jsonb_build_object('success', false, 'error', '活动尚未开始');
    END IF;
    IF v_coupon.end_date IS NOT NULL AND v_today > v_coupon.end_date THEN
        RETURN jsonb_build_object('success', false, 'error', '优惠券已过期');
    END IF;
    SELECT id INTO v_existing_id
    FROM user_coupons
    WHERE user_id = v_user_id AND redeemed_code = p_code
    LIMIT 1;
    IF v_existing_id IS NOT NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '您已使用过该兑换码');
    END IF;
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
    UPDATE coupons SET used_quantity = COALESCE(used_quantity, 0) + 1 
    WHERE id = v_coupon.coupon_id;
    v_coupon_snapshot := jsonb_build_object(
        'name', v_coupon.name,
        'type', v_coupon.type,
        'value', v_coupon.value,
        'min_usage', v_coupon.min_usage,
        'sku_ids', v_coupon.sku_ids
    );
    v_expire_at := COALESCE(
        v_coupon.end_date::timestamp with time zone, 
        NOW() + INTERVAL '30 days'
    );
    INSERT INTO user_coupons (
        user_id, coupon_id, status, redeemed_at, 
        code, redeemed_code, coupon_snapshot, expire_at
    )
    VALUES (
        v_user_id, v_coupon.coupon_id, 'unused', NOW(),
        v_coupon.coupon_code, 
        p_code, 
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
$function$;

CREATE OR REPLACE FUNCTION public.use_balance_coupon(p_user_coupon_id uuid, p_user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_coupon_record RECORD;
    v_coupon_val DECIMAL(10,2);
    v_new_balance DECIMAL(10,2);
BEGIN
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

    UPDATE user_coupons
    SET status = 'used', used_at = NOW()
    WHERE id = p_user_coupon_id;

    UPDATE profiles
    SET balance = balance + v_coupon_val
    WHERE id = p_user_id
    RETURNING balance INTO v_new_balance;

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
$function$;

CREATE OR REPLACE FUNCTION public.check_email_available(email_input text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
begin
  return not exists (
    select 1 
    from auth.users 
    where email = email_input
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.delete_own_account()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'msg', '未登录');
  END IF;

  DELETE FROM auth.users WHERE id = v_user_id;
  
  RETURN jsonb_build_object('success', true, 'msg', '账户注销成功');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'msg', '注销失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_unique_uid()
 RETURNS character
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
DECLARE
  new_uid CHAR(8);
  done BOOLEAN DEFAULT FALSE;
BEGIN
  WHILE NOT done LOOP
    new_uid := LPAD(FLOOR(10000000 + RANDOM() * 90000000)::TEXT, 8, '0');
    done := NOT EXISTS (SELECT 1 FROM public.profiles WHERE uid = new_uid);
  END LOOP;
  RETURN new_uid;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_uid text;
  v_count int;
BEGIN
  LOOP
    v_uid := floor(10000000 + random() * 90000000)::text;
    SELECT count(*) INTO v_count FROM public.profiles WHERE uid = v_uid;
    IF v_count = 0 THEN
      EXIT;
    END IF;
  END LOOP;

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
$function$;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE auth_user_id = auth.uid()
      AND status = 'enabled'
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.sync_email_to_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  UPDATE public.profiles 
  SET email = NEW.email 
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.resolve_channel_key(p_channel_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_clean_key text;
    v_record record;
BEGIN
    v_clean_key := lower(trim(p_channel_key));
    
    IF left(v_clean_key, 1) <> '@' THEN
        v_clean_key := '@' || v_clean_key;
    END IF;

    SELECT * INTO v_record FROM public.channel_recognitions WHERE channel_key = v_clean_key;
    
    IF FOUND THEN
        RETURN jsonb_build_object(
            'found', true,
            'bound', (v_record.product_id IS NOT NULL),
            'product_id', v_record.product_id,
            'channel_key', v_record.channel_key
        );
    ELSE
        INSERT INTO public.channel_recognitions (channel_key)
        VALUES (v_clean_key)
        ON CONFLICT (channel_key) DO NOTHING;
        
        RETURN jsonb_build_object(
            'found', true,
            'bound', false,
            'product_id', NULL,
            'channel_key', v_clean_key
        );
    END IF;
END;
$function$;

