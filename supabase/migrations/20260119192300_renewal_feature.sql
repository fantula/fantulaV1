-- ============================================
-- Migration: Renewal Feature
-- Adds renewal support for virtual/shared orders
-- ============================================

-- 1. Add related_order_id to pre_orders for tracking renewal source
ALTER TABLE public.pre_orders 
ADD COLUMN IF NOT EXISTS related_order_id UUID REFERENCES public.orders(id);

COMMENT ON COLUMN public.pre_orders.related_order_id IS '续费来源订单ID（仅续费订单有值）';

-- 2. Update source check constraint to allow 'renew'
ALTER TABLE public.pre_orders DROP CONSTRAINT IF EXISTS pre_orders_source_check;
ALTER TABLE public.pre_orders ADD CONSTRAINT pre_orders_source_check 
  CHECK (source = ANY (ARRAY['buy_now'::text, 'cart'::text, 'renew'::text]));

-- ============================================
-- 3. Function: get_renewal_skus
-- Returns available SKUs for renewing an order
-- ============================================
CREATE OR REPLACE FUNCTION public.get_renewal_skus(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_order RECORD;
  v_cdk_id UUID;
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
  
  -- Get all SKUs linked to this CDK
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
  
  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'cdk_id', v_cdk_id,
    'end_time', v_order.end_time,
    'skus', COALESCE(v_sku_list, '[]'::JSONB)
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '查询失败: ' || SQLERRM);
END;
$$;

COMMENT ON FUNCTION public.get_renewal_skus(UUID) IS '获取订单可续费的SKU列表';

-- ============================================
-- 4. Function: create_renewal_pre_order
-- Creates a pre-order for renewal (no stock deduction)
-- ============================================
CREATE OR REPLACE FUNCTION public.create_renewal_pre_order(
  p_sku_id UUID,
  p_old_order_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
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

  -- Step 6: Generate order no and create pre-order
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
    -- Reuse resources from old order
    (v_old_order.cdk_snapshot->'locked_cdk_ids')::UUID[],
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
$$;

COMMENT ON FUNCTION public.create_renewal_pre_order(UUID, UUID) IS '创建续费预订单（复用原订单资源）';

-- ============================================
-- 5. Modify confirm_pre_order to handle renewal
-- ============================================
CREATE OR REPLACE FUNCTION public.confirm_pre_order(
  p_pre_order_id UUID, 
  p_pay_method TEXT, 
  p_coupon_id UUID DEFAULT NULL
)
RETURNS JSONB
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
$$;

COMMENT ON FUNCTION public.confirm_pre_order(UUID, TEXT, UUID) IS '确认预订单（支持续费逻辑）';
