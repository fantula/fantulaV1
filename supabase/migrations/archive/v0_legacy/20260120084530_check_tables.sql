set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.admin_review_refund(p_request_id uuid, p_approved boolean, p_refund_amount numeric DEFAULT NULL::numeric, p_admin_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_request RECORD;
  v_order RECORD;
  v_user_balance DECIMAL;
BEGIN
  -- Get request
  SELECT * INTO v_request FROM refund_requests WHERE id = p_request_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '退款申请不存在');
  END IF;
  
  IF v_request.status != 'pending' THEN
    RETURN jsonb_build_object('success', false, 'error', '该申请已处理');
  END IF;
  -- Get order
  SELECT * INTO v_order FROM orders WHERE id = v_request.order_id;
  IF p_approved THEN
    -- Validate refund amount
    IF p_refund_amount IS NULL OR p_refund_amount <= 0 THEN
      RETURN jsonb_build_object('success', false, 'error', '请填写有效的退款金额');
    END IF;
    
    IF p_refund_amount > v_order.total_amount THEN
      RETURN jsonb_build_object('success', false, 'error', '退款金额不能超过订单金额');
    END IF;
    -- Update request
    UPDATE refund_requests SET
      status = 'approved',
      refund_amount = p_refund_amount,
      admin_id = auth.uid(),
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;
    -- Update order status
    UPDATE orders SET status = 'refunded' WHERE id = v_request.order_id;
    -- Refund to user balance
    SELECT balance INTO v_user_balance FROM profiles WHERE id = v_request.user_id;
    
    UPDATE profiles SET balance = balance + p_refund_amount WHERE id = v_request.user_id;
    -- Record wallet transaction
    INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
    VALUES (
      v_request.user_id,
      p_refund_amount,
      'refund',
      v_user_balance + p_refund_amount,
      '订单退款: ' || v_order.order_no
    );
    RETURN jsonb_build_object('success', true, 'message', '退款审批通过');
  ELSE
    -- Rejected: restore original status
    UPDATE refund_requests SET
      status = 'rejected',
      admin_id = auth.uid(),
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;
    -- Restore order to original status
    UPDATE orders SET status = v_request.original_status WHERE id = v_request.order_id;
    RETURN jsonb_build_object('success', true, 'message', '已拒绝退款申请');
  END IF;
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '审核失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.confirm_pre_order(p_pre_order_id uuid, p_pay_method text, p_coupon_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
    
    -- Renewal specific
    v_is_renewal BOOLEAN := FALSE;
    v_old_order RECORD;
BEGIN
    -- ============================================
    -- 步骤1：获取并验证预订单
    -- ============================================
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
    
    -- Check if this is a renewal
    v_is_renewal := (v_pre_order.source = 'renew' AND v_pre_order.related_order_id IS NOT NULL);
    
    -- Extract info
    v_product_type := v_pre_order.sku_snapshot->>'product_type';
    v_duration := COALESCE((v_pre_order.sku_snapshot->>'duration')::INTEGER, 30);
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
        
        IF v_spec_text != '' THEN
            v_wallet_desc := format('%s：%s', v_product_name, v_spec_text);
        ELSE
            v_wallet_desc := v_product_name;
        END IF;
        
        -- Add renewal tag to wallet description
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
    
    -- ============================================
    -- 步骤4：状态判定
    -- ============================================
    IF v_product_type = 'virtual' THEN
        v_order_status := 'pending_delivery';
    ELSE
        v_order_status := 'active';
    END IF;
    
    -- ============================================
    -- 步骤5：计算到期时间 [RENEWAL LOGIC]
    -- ============================================
    IF v_is_renewal THEN
        -- Renewal: extend from old order's end_time
        SELECT * INTO v_old_order FROM orders WHERE id = v_pre_order.related_order_id;
        IF FOUND THEN
            v_end_time := v_old_order.end_time + (v_duration || ' days')::INTERVAL;
        ELSE
            v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
        END IF;
    ELSE
        -- Normal: start from now
        v_end_time := NOW() + (v_duration || ' days')::INTERVAL;
    END IF;
    
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
    -- 步骤6.5：更新 slot_occupancies [RENEWAL + NORMAL]
    -- ============================================
    IF v_product_type = 'shared_account' AND v_pre_order.locked_slot_ids IS NOT NULL 
       AND array_length(v_pre_order.locked_slot_ids, 1) > 0 THEN
        UPDATE slot_occupancies 
        SET order_id = v_order_id, user_id = v_pre_order.user_id
        WHERE id = ANY(v_pre_order.locked_slot_ids);
    END IF;
    -- ============================================
    -- 步骤6.6：[RENEWAL] 将旧订单标记为 expired
    -- ============================================
    IF v_is_renewal AND v_pre_order.related_order_id IS NOT NULL THEN
        UPDATE orders SET status = 'expired' WHERE id = v_pre_order.related_order_id;
    END IF;
    -- ============================================
    -- 步骤7：标记优惠券已使用
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
        'expires_at', v_end_time,
        'is_renewal', v_is_renewal
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', '支付失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_pre_order(p_sku_id uuid, p_quantity integer DEFAULT 1, p_source text DEFAULT 'buy_now'::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
$function$
;

CREATE OR REPLACE FUNCTION public.create_refund_request(p_order_id uuid, p_reason text, p_reason_detail text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
  -- Get order
  SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '订单不存在');
  END IF;
  
  IF v_order.user_id != v_user_id THEN
    RETURN jsonb_build_object('success', false, 'error', '无权操作此订单');
  END IF;
  
  -- Check status
  IF v_order.status NOT IN ('pending_delivery', 'active') THEN
    RETURN jsonb_build_object('success', false, 'error', '当前订单状态不可申请退款');
  END IF;
  
  -- Check if already has pending request
  SELECT * INTO v_existing_request 
  FROM refund_requests 
  WHERE order_id = p_order_id AND status = 'pending';
  
  IF FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '已有进行中的退款申请');
  END IF;
  -- Create request
  INSERT INTO refund_requests (
    order_id, user_id, reason, reason_detail, original_status, status, created_at
  ) VALUES (
    p_order_id, v_user_id, p_reason, p_reason_detail, v_order.status, 'pending', NOW()
  ) RETURNING id INTO v_request_id;
  -- Update order status
  UPDATE orders SET status = 'refunding' WHERE id = p_order_id;
  RETURN jsonb_build_object(
    'success', true,
    'request_id', v_request_id,
    'message', '退款申请已提交'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '申请失败: ' || SQLERRM);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_renewal_pre_order(p_sku_id uuid, p_old_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
  -- Step 1: Validate user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;
  -- Step 2: Check pending order limit
  SELECT COUNT(*) INTO v_pending_count
  FROM pre_orders
  WHERE user_id = v_user_id AND status = 'pending';
  
  IF v_pending_count >= 3 THEN
    RETURN jsonb_build_object('success', false, 'error', '您的未支付订单太多了，请先完成支付');
  END IF;
  -- Step 3: Validate old order
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
  -- Step 4: Get SKU info
  SELECT * INTO v_sku FROM product_skus WHERE id = p_sku_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU不存在');
  END IF;
  
  -- Get product via mapping
  SELECT product_id INTO v_product_id FROM product_sku_map WHERE sku_id = p_sku_id LIMIT 1;
  IF v_product_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'SKU未绑定商品');
  END IF;
  
  SELECT * INTO v_product FROM products WHERE id = v_product_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '商品不存在');
  END IF;
  -- Step 5: Build snapshots
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
  -- Step 6: Convert JSONB array to UUID[] properly
  SELECT ARRAY(
    SELECT (elem::TEXT)::UUID 
    FROM jsonb_array_elements_text(v_old_order.cdk_snapshot->'locked_cdk_ids') AS elem
  ) INTO v_locked_cdk_ids;
  -- Step 7: Generate order no and create pre-order
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
    -- Properly converted UUID array
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_refund_request(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_renewal_skus(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_order RECORD;
  v_cdk_id UUID;
  v_product_id UUID;
  v_product RECORD;
  v_sku_list JSONB := '[]'::JSONB;
BEGIN
  -- Get order and validate
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
  
  -- Extract CDK ID from order
  v_cdk_id := (v_order.cdk_snapshot->'locked_cdk_ids'->>0)::UUID;
  
  IF v_cdk_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '订单无关联CDK');
  END IF;
  
  -- Get product info from order snapshot (most reliable source)
  v_product_id := (v_order.product_snapshot->>'product_id')::UUID;
  
  -- If order snapshot has product info, use it
  IF v_product_id IS NOT NULL THEN
    SELECT * INTO v_product FROM products WHERE id = v_product_id;
  END IF;
  
  -- Get all SKUs linked to this CDK
  SELECT jsonb_agg(
    jsonb_build_object(
      'sku_id', ps.id,
      'spec_combination', ps.spec_combination,
      'price', ps.price,
      'duration', ps.duration,
      'product_type', ps.product_type,
      'image', ps.image
    )
  ) INTO v_sku_list
  FROM product_skus ps
  JOIN cdk_sku_map csm ON csm.sku_id = ps.id
  WHERE csm.cdk_id = v_cdk_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'cdk_id', v_cdk_id,
    'end_time', v_order.end_time,
    -- Product info
    'product', jsonb_build_object(
      'id', COALESCE(v_product.id, v_product_id),
      'name', COALESCE(v_product.product_name, v_order.product_snapshot->>'product_name', '商品'),
      'image', COALESCE(v_product.image, v_order.product_snapshot->>'image', '')
    ),
    'skus', COALESCE(v_sku_list, '[]'::JSONB)
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '查询失败: ' || SQLERRM);
END;
$function$
;

grant delete on table "public"."refund_requests" to "postgres";

grant insert on table "public"."refund_requests" to "postgres";

grant references on table "public"."refund_requests" to "postgres";

grant select on table "public"."refund_requests" to "postgres";

grant trigger on table "public"."refund_requests" to "postgres";

grant truncate on table "public"."refund_requests" to "postgres";

grant update on table "public"."refund_requests" to "postgres";


