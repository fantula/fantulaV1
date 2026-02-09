-- Migration: fix_order_functions (Part 2)
-- Synced from cloud Supabase
-- Contains: Order, Ticket, Message, and Trigger functions

CREATE OR REPLACE FUNCTION public.cancel_pre_order(p_pre_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_order RECORD;
BEGIN
    SELECT * INTO v_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF v_order IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;

    IF v_order.status != 'pending' THEN
        RETURN jsonb_build_object('success', false, 'error', '订单状态不可删除');
    END IF;

    PERFORM release_preorder_resources(p_pre_order_id);

    UPDATE pre_orders SET status = 'deleted' WHERE id = p_pre_order_id;

    RETURN jsonb_build_object('success', true, 'msg', '订单已删除');
END;
$function$;

CREATE OR REPLACE FUNCTION public.cancel_user_refund_request(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id UUID;
  v_request RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
    AND user_id = v_user_id 
    AND status = 'pending'
  FOR UPDATE;
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '未找到进行中的退款申请');
  END IF;
  UPDATE orders SET status = v_request.original_status WHERE id = p_order_id;
  
  UPDATE refund_requests 
  SET status = 'cancelled', reviewed_at = NOW()
  WHERE id = v_request.id;
  RETURN jsonb_build_object('success', true, 'message', '退款申请已取消');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '取消失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.confirm_pre_order(p_pre_order_id uuid, p_pay_method text, p_coupon_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
    
    v_product_name TEXT;
    v_spec_text TEXT;
    v_wallet_desc TEXT;
    
    v_is_renewal BOOLEAN := FALSE;
    v_old_order RECORD;
BEGIN
    SELECT * INTO v_pre_order FROM pre_orders WHERE id = p_pre_order_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
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
    
    v_is_renewal := (v_pre_order.source = 'renew' AND v_pre_order.related_order_id IS NOT NULL);
    
    v_product_type := v_pre_order.sku_snapshot->>'product_type';
    v_duration := COALESCE((v_pre_order.sku_snapshot->>'duration')::INTEGER, 30);
    v_product_name := COALESCE(v_pre_order.product_snapshot->>'product_name', '商品');
    SELECT string_agg(value::text, '，') INTO v_spec_text
    FROM jsonb_each_text(v_pre_order.sku_snapshot->'spec_combination');
    v_spec_text := COALESCE(v_spec_text, '');
    
    v_active_coupon_id := COALESCE(p_coupon_id, v_pre_order.coupon_id);
    v_original_amount := COALESCE(v_pre_order.original_amount, v_pre_order.total_amount, 0);
    v_need_amount := v_original_amount;
    
    IF v_active_coupon_id IS NOT NULL THEN
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
    
    IF p_pay_method = 'balance' THEN
        SELECT balance INTO v_user_balance FROM profiles WHERE id = auth.uid();
        
        IF v_user_balance < v_need_amount THEN
            RETURN jsonb_build_object('success', false, 'error', format('余额不足，需 ￥%s，当前 ￥%s', v_need_amount, v_user_balance));
        END IF;
        
        UPDATE profiles SET balance = balance - v_need_amount WHERE id = auth.uid();
        
        IF v_spec_text != '' THEN
            v_wallet_desc := format('%s：%s', v_product_name, v_spec_text);
        ELSE
            v_wallet_desc := v_product_name;
        END IF;
        
        IF v_is_renewal THEN
            v_wallet_desc := format('%s (续费)', v_wallet_desc);
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
    
    IF v_product_type = 'virtual' THEN
        v_order_status := 'pending_delivery';
    ELSE
        v_order_status := 'active';
    END IF;
    
    IF v_is_renewal THEN
        SELECT * INTO v_old_order FROM orders WHERE id = v_pre_order.related_order_id;
        IF FOUND THEN
            v_end_time := v_old_order.end_time + (v_duration || ' days')::INTERVAL;
        ELSE
            v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
        END IF;
    ELSE
        v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
    END IF;
    
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

    IF v_product_type = 'shared_account' AND v_pre_order.locked_slot_ids IS NOT NULL 
       AND array_length(v_pre_order.locked_slot_ids, 1) > 0 THEN
        UPDATE slot_occupancies 
        SET order_id = v_order_id, user_id = v_pre_order.user_id
        WHERE id = ANY(v_pre_order.locked_slot_ids);
    END IF;

    IF v_is_renewal AND v_pre_order.related_order_id IS NOT NULL THEN
        UPDATE orders SET status = 'expired' WHERE id = v_pre_order.related_order_id;
    END IF;

    IF v_active_coupon_id IS NOT NULL THEN
        UPDATE user_coupons 
        SET status = 'used', 
            used_at = NOW(),
            order_id = v_order_id
        WHERE id = v_active_coupon_id;
    END IF;
    
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
        'expires_at', v_end_time,
        'is_renewal', v_is_renewal
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '支付失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_pre_order(p_sku_id uuid, p_quantity integer DEFAULT 1, p_source text DEFAULT 'buy_now'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;

  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;

  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
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

  IF v_sku.product_type = 'virtual' THEN
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
    
    UPDATE cdks SET stock = stock - p_quantity WHERE id = v_cdk_record.id;
    
    FOR i IN 1..p_quantity LOOP
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.id);
    END LOOP;
    
  ELSIF v_sku.product_type = 'one_time_cdk' THEN
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
      UPDATE cdks SET status = 'idle' WHERE id = ANY(v_locked_cdk_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用的激活码');
    END IF;
    
  ELSIF v_sku.product_type = 'shared_account' THEN
    FOR v_cdk_record IN
      SELECT so.id AS slot_id, so.cdk_id
      FROM slot_occupancies so
      JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
      WHERE m.sku_id = p_sku_id
        AND so.status = 'idle'
      ORDER BY so.cdk_id 
      LIMIT p_quantity
      FOR UPDATE SKIP LOCKED
    LOOP
      v_locked_slot_ids := array_append(v_locked_slot_ids, v_cdk_record.slot_id);
      v_locked_cdk_ids := array_append(v_locked_cdk_ids, v_cdk_record.cdk_id);
      UPDATE slot_occupancies SET status = 'using' WHERE id = v_cdk_record.slot_id;
      v_found_count := v_found_count + 1;
    END LOOP;
    
    IF v_found_count < p_quantity THEN
      UPDATE slot_occupancies SET status = 'idle' WHERE id = ANY(v_locked_slot_ids);
      RETURN jsonb_build_object('success', false, 'error', '暂无可用位置');
    END IF;
  ELSE
    RETURN jsonb_build_object('success', false, 'error', '不支持的商品类型');
  END IF;

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

  v_order_no := TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  v_expires_at := NOW() + INTERVAL '15 minutes';
  v_total_amount := v_sku.price * p_quantity;

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
$function$;

CREATE OR REPLACE FUNCTION public.create_refund_request(p_order_id uuid, p_reason text, p_reason_detail text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id UUID;
  v_order RECORD;
  v_existing_request RECORD;
  v_request_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  
  IF v_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  IF v_order.status NOT IN ('pending_delivery', 'active') THEN
    RETURN jsonb_build_object('success', false, 'error', '当前订单状态不可申请退款');
  END IF;
  
  SELECT * INTO v_existing_request 
  FROM refund_requests 
  WHERE order_id = p_order_id AND status = 'pending';
  
  IF FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '已有进行中的退款申请');
  END IF;
  INSERT INTO refund_requests (
    order_id, user_id, reason, reason_detail, original_status, status, created_at
  ) VALUES (
    p_order_id, v_user_id, p_reason, p_reason_detail, v_order.status, 'pending', NOW()
  ) RETURNING id INTO v_request_id;
  UPDATE orders SET status = 'refunding' WHERE id = p_order_id;
  RETURN jsonb_build_object(
    'success', true,
    'request_id', v_request_id,
    'message', '退款申请已提交'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '申请失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_renewal_pre_order(p_sku_id uuid, p_old_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id UUID;
  v_pending_count INTEGER;
  v_old_order RECORD;
  v_sku RECORD;
  v_product RECORD;
  v_product_id UUID;
  v_pre_order_id UUID;
  v_order_no TEXT;
  v_total_amount DECIMAL;
  v_expires_at TIMESTAMP WITH TIME ZONE;
  v_product_snapshot JSONB;
  v_sku_snapshot JSONB;
  v_locked_cdk_ids UUID[];
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;
  SELECT * INTO v_old_order FROM orders WHERE id = p_old_order_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '原订单不存在');
  END IF;
  
  IF v_old_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  IF v_old_order.status != 'active' THEN
    RETURN jsonb_build_object('success', false, 'error', '仅使用中的订单可续费');
  END IF;
  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
  SELECT product_id INTO v_product_id FROM product_sku_map WHERE sku_id = p_sku_id LIMIT 1;
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU未绑定商品');
  END IF;
  
  SELECT * INTO v_product FROM products WHERE id = v_product_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '商品不存在');
  END IF;
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
  SELECT ARRAY(
    SELECT (elem::TEXT)::UUID 
    FROM jsonb_array_elements_text(v_old_order.cdk_snapshot->'locked_cdk_ids') AS elem
  ) INTO v_locked_cdk_ids;
  v_order_no := TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  v_expires_at := NOW() + INTERVAL '15 minutes';
  v_total_amount := v_sku.price;
  INSERT INTO pre_orders (
    user_id, order_no, status, source,
    quantity, unit_price, total_amount, original_amount,
    product_snapshot, sku_snapshot,
    locked_cdk_ids, locked_slot_ids,
    related_order_id,
    expires_at, created_at
  )
  VALUES (
    v_user_id, v_order_no, 'pending', 'renew',
    1, v_sku.price, v_total_amount, v_total_amount,
    v_product_snapshot, v_sku_snapshot,
    v_locked_cdk_ids,
    v_old_order.slot_occupancy_ids,
    p_old_order_id,
    v_expires_at, NOW()
  )
  RETURNING id INTO v_pre_order_id;
  RETURN jsonb_build_object(
    'success', true,
    'pre_order_id', v_pre_order_id,
    'order_no', v_order_no,
    'total_amount', v_total_amount,
    'original_amount', v_total_amount,
    'expires_at', v_expires_at
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建续费订单失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_ticket(p_order_id uuid, p_title text, p_content text, p_priority text, p_attachments text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id UUID;
  v_order RECORD;
  v_ticket_id UUID;
  v_existing_ticket_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;

  SELECT * INTO v_order FROM orders WHERE id = p_order_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  IF v_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;

  SELECT id INTO v_existing_ticket_id FROM tickets WHERE order_id = p_order_id AND status = 'processing';
  IF v_existing_ticket_id IS NOT NULL THEN
     RETURN jsonb_build_object('success', false, 'error', '该订单已有进行中的工单，请前往查看');
  END IF;

  INSERT INTO tickets (user_id, order_id, title, priority, status)
  VALUES (v_user_id, p_order_id, p_title, p_priority, 'processing')
  RETURNING id INTO v_ticket_id;

  INSERT INTO ticket_messages (ticket_id, sender_id, is_admin, content, message_type, attachments)
  VALUES (
    v_ticket_id, 
    v_user_id, 
    FALSE, 
    p_content, 
    CASE WHEN (p_attachments IS NOT NULL AND array_length(p_attachments, 1) > 0) THEN 'image' ELSE 'text' END,
    p_attachments
  );

  RETURN jsonb_build_object('success', true, 'ticket_id', v_ticket_id);
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '创建工单失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_preorder(p_preorder_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_preorder RECORD;
BEGIN
    SELECT * INTO v_preorder 
    FROM pre_orders 
    WHERE id = p_preorder_id AND user_id = auth.uid();
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'error', '订单不存在');
    END IF;
    
    IF v_preorder.status = 'pending' THEN
        PERFORM release_preorder_resources(v_preorder.id);
    END IF;
    
    UPDATE pre_orders 
    SET status = 'deleted' 
    WHERE id = p_preorder_id;
    
    RETURN jsonb_build_object('success', true, 'msg', '订单已删除');
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_client_order_detail(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id uuid;
  v_order record;
  v_cdk_ids uuid[];
  v_cdks jsonb;
  v_slots jsonb;
BEGIN
  v_user_id := auth.uid();
  
  SELECT * INTO v_order 
  FROM orders 
  WHERE id = p_order_id AND user_id = v_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在或无权访问');
  END IF;

  IF v_order.cdk_snapshot IS NOT NULL THEN
      IF jsonb_typeof(v_order.cdk_snapshot) = 'array' THEN
        SELECT array_agg(x::text::uuid) INTO v_cdk_ids 
        FROM jsonb_array_elements_text(v_order.cdk_snapshot) t(x);
      ELSE
        SELECT array_agg(x::text::uuid) INTO v_cdk_ids 
        FROM jsonb_array_elements_text(v_order.cdk_snapshot->'locked_cdk_ids') t(x);
      END IF;
  END IF;

  IF v_cdk_ids IS NOT NULL AND array_length(v_cdk_ids, 1) > 0 THEN
      SELECT jsonb_agg(jsonb_build_object(
          'id', c.id, 
          'code', c.code, 
          'account_data', c.account_data
      )) INTO v_cdks
      FROM cdks c
      WHERE c.id = ANY(v_cdk_ids);
  END IF;

  IF v_order.slot_occupancy_ids IS NOT NULL AND array_length(v_order.slot_occupancy_ids, 1) > 0 THEN
    SELECT jsonb_agg(jsonb_build_object(
      'id', s.id,
      'slot_index', s.slot_index,
      'cdk_id', s.cdk_id
    )) INTO v_slots
    FROM slot_occupancies s
    WHERE s.id = ANY(v_order.slot_occupancy_ids);
  END IF;

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
$function$;

CREATE OR REPLACE FUNCTION public.get_order_refund_info(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_pending_request RECORD;
  v_cancelled_count INTEGER;
BEGIN
  SELECT id, reason, created_at INTO v_pending_request
  FROM refund_requests 
  WHERE order_id = p_order_id AND status = 'pending'
  LIMIT 1;
  
  SELECT COUNT(*) INTO v_cancelled_count
  FROM refund_requests
  WHERE order_id = p_order_id AND status = 'cancelled';
  
  RETURN jsonb_build_object(
    'success', true,
    'pending_request', CASE WHEN v_pending_request.id IS NOT NULL 
      THEN jsonb_build_object('id', v_pending_request.id, 'reason', v_pending_request.reason, 'created_at', v_pending_request.created_at)
      ELSE NULL END,
    'cancelled_count', v_cancelled_count
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_pre_order(p_pre_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_refund_request(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_request RECORD;
BEGIN
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
  ORDER BY created_at DESC 
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', true, 'request', NULL);
  END IF;
  
  RETURN jsonb_build_object(
    'success', true,
    'request', jsonb_build_object(
      'id', v_request.id,
      'reason', v_request.reason,
      'reason_detail', v_request.reason_detail,
      'status', v_request.status,
      'refund_amount', v_request.refund_amount,
      'admin_note', v_request.admin_note,
      'created_at', v_request.created_at,
      'reviewed_at', v_request.reviewed_at
    )
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_renewal_skus(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_order RECORD;
  v_cdk_id UUID;
  v_sku_list JSONB := '[]'::JSONB;
  v_product RECORD;
BEGIN
  SELECT * INTO v_order FROM orders WHERE id = p_order_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  
  IF v_order.user_id != auth.uid() THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  IF v_order.status != 'active' THEN
    RETURN jsonb_build_object('success', false, 'error', '仅使用中的订单可续费');
  END IF;
  
  v_cdk_id := (v_order.cdk_snapshot->'locked_cdk_ids'->>0)::UUID;
  
  IF v_cdk_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '订单无关联CDK');
  END IF;
  
  SELECT jsonb_agg(
    jsonb_build_object(
      'sku_id', ps.id,
      'spec_combination', ps.spec_combination,
      'price', ps.price,
      'duration', ps.duration,
      'product_type', ps.product_type
    )
  ) INTO v_sku_list
  FROM product_skus ps
  JOIN cdk_sku_map csm ON csm.sku_id = ps.id
  WHERE csm.cdk_id = v_cdk_id;
  
  IF v_sku_list IS NULL OR v_sku_list = '[]'::JSONB THEN
    RETURN jsonb_build_object('success', false, 'error', '该商品暂无可续费套餐');
  END IF;
  
  SELECT p.id, p.product_name, p.image INTO v_product
  FROM products p
  JOIN product_sku_map psm ON psm.product_id = p.id
  JOIN cdk_sku_map csm ON csm.sku_id = psm.sku_id
  WHERE csm.cdk_id = v_cdk_id
  LIMIT 1;
  
  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'cdk_id', v_cdk_id,
    'end_time', v_order.end_time,
    'product', jsonb_build_object(
      'id', v_product.id,
      'name', v_product.product_name,
      'image', v_product.image
    ),
    'skus', v_sku_list
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '查询失败: ' || SQLERRM);
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_sku_stock(p_sku_id uuid)
 RETURNS TABLE(in_stock boolean, stock_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_cdk_type TEXT;
  v_stock INT := 0;
BEGIN
  SELECT c.cdk_type INTO v_cdk_type
  FROM cdk_sku_map m
  JOIN cdks c ON c.id = m.cdk_id
  WHERE m.sku_id = p_sku_id
  LIMIT 1;

  IF v_cdk_type IS NULL THEN
    RETURN QUERY SELECT FALSE, 0;
    RETURN;
  END IF;

  IF v_cdk_type = 'shared' THEN
    SELECT COUNT(*) INTO v_stock
    FROM slot_occupancies so
    JOIN cdk_sku_map m ON m.cdk_id = so.cdk_id
    JOIN cdks c ON c.id = so.cdk_id
    WHERE m.sku_id = p_sku_id 
      AND so.status = 'idle'
      AND c.status = 'idle';
      
  ELSE
    SELECT COALESCE(SUM(c.stock), 0) INTO v_stock
    FROM cdks c
    JOIN cdk_sku_map m ON m.cdk_id = c.id
    WHERE m.sku_id = p_sku_id 
      AND c.status = 'idle';
  END IF;

  v_stock := GREATEST(v_stock, 0);
  
  RETURN QUERY SELECT (v_stock > 0), v_stock::INTEGER;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_messages(p_user_uid character, p_limit integer DEFAULT 20, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, title character varying, content text, is_read boolean, created_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  RETURN QUERY
  SELECT m.id, m.title, m.content, m.is_read, m.created_at
  FROM messages m
  WHERE m.user_uid = p_user_uid
  ORDER BY m.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_article_views(article_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
begin
  update community_articles
  set views = views + 1
  where id = article_id;
end;
$function$;

CREATE OR REPLACE FUNCTION public.is_notification_enabled(config_key text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    config jsonb;
    is_enabled boolean;
BEGIN
    SELECT value::jsonb INTO config
    FROM public.system_settings
    WHERE key = 'customer_notification_config';

    IF config IS NULL THEN
        RETURN false;
    END IF;

    is_enabled := COALESCE((config ->> config_key)::boolean, false);
    RETURN is_enabled;
END;
$function$;

CREATE OR REPLACE FUNCTION public.mark_message_read(p_message_id uuid, p_user_uid character)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  UPDATE messages
  SET is_read = TRUE
  WHERE id = p_message_id AND user_uid = p_user_uid;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.prevent_order_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  RAISE EXCEPTION '禁止删除历史订单记录';
END;
$function$;

CREATE OR REPLACE FUNCTION public.renew_order(p_original_order_id uuid, p_duration_days integer)
 RETURNS TABLE(new_order_id uuid, original_order_id uuid, original_new_end_time timestamp with time zone, renew_start_time timestamp with time zone, renew_end_time timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
    slot_occupancy_ids,
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
$function$;

CREATE OR REPLACE FUNCTION public.resolve_ticket(p_ticket_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE 
  v_ticket RECORD;
BEGIN
  SELECT * INTO v_ticket FROM tickets WHERE id = p_ticket_id;
  
  IF v_ticket.user_id != auth.uid() THEN
    NULL; 
  END IF;

  UPDATE tickets SET 
    status = 'resolved', 
    resolved_at = NOW(), 
    updated_at = NOW() 
  WHERE id = p_ticket_id;

  RETURN jsonb_build_object('success', true);
END;
$function$;

CREATE OR REPLACE FUNCTION public.send_admin_message(p_user_uid character, p_title character varying, p_content text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_message_id UUID;
BEGIN
  IF p_title IS NULL OR p_title = '' THEN
    RAISE EXCEPTION '消息标题不能为空';
  END IF;
  
  IF p_content IS NULL OR p_content = '' THEN
    RAISE EXCEPTION '消息内容不能为空';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE uid = p_user_uid) THEN
    RAISE EXCEPTION '用户不存在，禁止发送消息';
  END IF;
  
  INSERT INTO messages (user_uid, title, content)
  VALUES (p_user_uid, p_title, p_content)
  RETURNING id INTO v_message_id;
  
  RETURN v_message_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.send_auto_message(p_user_id uuid, p_title text, p_content text, p_type text DEFAULT 'system'::text, p_link text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_user_uid text;
BEGIN
    SELECT uid INTO v_user_uid FROM public.profiles WHERE id = p_user_id;

    IF v_user_uid IS NOT NULL THEN
        INSERT INTO public.messages (user_id, user_uid, title, content, type, link, is_read)
        VALUES (p_user_id, v_user_uid, p_title, p_content, p_type, p_link, false);
    END IF;
END;
$function$;

CREATE OR REPLACE FUNCTION public.send_ticket_message(p_ticket_id uuid, p_content text, p_attachments text[] DEFAULT NULL::text[])
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_user_id UUID;
  v_ticket RECORD;
  v_is_admin BOOLEAN := FALSE;
  v_sender_id UUID;
BEGIN
  v_user_id := auth.uid();
  
  SELECT * INTO v_ticket FROM tickets WHERE id = p_ticket_id;
  IF NOT FOUND THEN
     RETURN jsonb_build_object('success', false, 'error', '工单不存在');
  END IF;

  IF v_ticket.user_id = v_user_id THEN
     v_is_admin := FALSE;
     v_sender_id := v_user_id;
  ELSE
     RETURN jsonb_build_object('success', false, 'error', '无权回复此工单');
  END IF;

  IF v_ticket.status = 'resolved' THEN
     RETURN jsonb_build_object('success', false, 'error', '工单已结单，无法回复');
  END IF;

  INSERT INTO ticket_messages (ticket_id, sender_id, is_admin, content, message_type, attachments)
  VALUES (
    p_ticket_id,
    v_sender_id,
    v_is_admin,
    p_content,
    CASE WHEN (p_attachments IS NOT NULL AND array_length(p_attachments, 1) > 0) THEN 'image' ELSE 'text' END,
    p_attachments
  );

  UPDATE tickets SET updated_at = NOW() WHERE id = p_ticket_id;

  RETURN jsonb_build_object('success', true);
END;
$function$;

CREATE OR REPLACE FUNCTION public.set_ticket_no()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
    IF NEW.ticket_no IS NULL THEN
        NEW.ticket_no := 'T-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_notify_balance_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    diff numeric;
BEGIN
    IF public.is_notification_enabled('quota_changed') THEN
        diff := NEW.balance - OLD.balance;
        IF diff > 0 THEN
             PERFORM public.send_auto_message(
                NEW.id,
                '余额变动通知 (Balance Updated)',
                '您的账户余额增加了 ' || diff || ' 元。当前余额：' || NEW.balance,
                'system',
                '/profile/wallet'
            );
        ELSIF diff < 0 THEN
             PERFORM public.send_auto_message(
                NEW.id,
                '余额变动通知 (Balance Updated)',
                '您的账户余额减少了 ' || ABS(diff) || ' 元。当前余额：' || NEW.balance,
                'system',
                '/profile/wallet'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_notify_coupon_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
    IF public.is_notification_enabled('coupon_redeemed') THEN
        PERFORM public.send_auto_message(
            NEW.user_id,
            '优惠券到账 (Coupon Received)',
            '恭喜！您获得了一张新的优惠券，快去使用吧。',
            'activity',
            '/profile/coupons'
        );
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_notify_fulfillment_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_order_user_id uuid;
    v_order_no text;
BEGIN
    IF (OLD.status != 'success' AND NEW.status = 'success') OR 
       (OLD.status != 'failed' AND NEW.status = 'failed') THEN
       
        IF public.is_notification_enabled('virtual_order_received') THEN
            SELECT user_id, order_no INTO v_order_user_id, v_order_no
            FROM public.orders WHERE id = NEW.order_id;

            IF v_order_user_id IS NOT NULL THEN
                IF NEW.status = 'success' THEN
                    PERFORM public.send_auto_message(
                        v_order_user_id,
                        '发货成功 (Delivery Successful)',
                        '您的订单 ' || COALESCE(v_order_no, '') || ' 自动发货处理成功，请查看详情。',
                        'order',
                        '/profile/orders'
                    );
                ELSE
                     PERFORM public.send_auto_message(
                        v_order_user_id,
                        '发货异常 (Delivery Update)',
                        '您的订单 ' || COALESCE(v_order_no, '') || ' 发货处理遇到问题: ' || COALESCE(NEW.reject_reason, '未知原因'),
                        'order',
                        '/profile/orders'
                    );
                END IF;
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_notify_order_created()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
    IF public.is_notification_enabled('order_created') THEN
        PERFORM public.send_auto_message(
            NEW.user_id,
            '下单成功 (Order Placed)',
            '您的订单 ' || COALESCE(NEW.order_no, '') || ' 已成功提交。我们正在为您准备商品。',
            'order',
            '/profile/orders'
        );
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_notify_order_status()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
    IF OLD.status != 'shipped' AND NEW.status = 'shipped' THEN
        IF public.is_notification_enabled('order_shipped') THEN
            PERFORM public.send_auto_message(
                NEW.user_id,
                '订单已发货 (Order Shipped)',
                '您的订单 ' || COALESCE(NEW.order_no, '') || ' 已经发货，请注意查收。',
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;

    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        IF public.is_notification_enabled('virtual_order_received') THEN
             PERFORM public.send_auto_message(
                NEW.user_id,
                '订单已完成 (Order Completed)',
                '您的订单 ' || COALESCE(NEW.order_no, '') || ' 已处理完成。如果是虚拟商品，请查看卡密或充值结果。',
                'order',
                '/profile/orders'
            );
        END IF;
    END IF;

    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_notify_ticket_reply()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_order_ticket_user_id uuid;
BEGIN
    IF NEW.is_admin = true THEN
        IF public.is_notification_enabled('ticket_replied') THEN
            SELECT user_id INTO v_order_ticket_user_id
            FROM public.tickets
            WHERE id = NEW.ticket_id;

            IF v_order_ticket_user_id IS NOT NULL THEN
                PERFORM public.send_auto_message(
                    v_order_ticket_user_id,
                    '工单回复 (Ticket Update)',
                    '管理员回复了您的工单，请前往查看。',
                    'system',
                    '/profile/support'
                );
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_all_skus_with_product_info()
 RETURNS TABLE(id uuid, tag integer, tag_name text, product_type character varying, spec_combination jsonb, price numeric, created_at timestamp with time zone, product_id uuid, product_name text, link_status text)
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_temp'
AS $function$
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
$function$;
