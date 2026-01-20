-- ============================================
-- Migration: Improve Renewal Feature
-- Adds product info to get_renewal_skus response
-- ============================================
-- Update get_renewal_skus to return product info
CREATE OR REPLACE FUNCTION public.get_renewal_skus(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
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
$$;
COMMENT ON FUNCTION public.get_renewal_skus(UUID) IS '获取订单可续费的SKU列表(含商品信息)';
