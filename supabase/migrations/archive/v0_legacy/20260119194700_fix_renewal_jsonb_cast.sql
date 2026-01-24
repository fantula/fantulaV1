-- ============================================
-- Migration: Fix JSONB to UUID[] casting in renewal
-- ============================================

-- Fix create_renewal_pre_order: properly convert JSONB array to UUID[]
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
$$;

COMMENT ON FUNCTION public.create_renewal_pre_order(UUID, UUID) IS '创建续费预订单（复用原订单资源，修复JSONB转换）';
