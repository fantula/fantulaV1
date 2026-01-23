-- ============================================
-- Migration: Refund & Renewal Logic Fixes
-- 1. 取消退款改为软删除
-- 2. 退款同意时释放资源
-- 3. 管理员权限验证
-- 4. 获取订单退款状态
-- 5. 续费空SKU友好提示
-- ============================================

-- 1. 更新 refund_requests 状态约束，新增 'cancelled'
ALTER TABLE public.refund_requests DROP CONSTRAINT IF EXISTS refund_requests_status_check;
ALTER TABLE public.refund_requests ADD CONSTRAINT refund_requests_status_check 
  CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled'));

-- ============================================
-- 2. 取消退款 → 软删除
-- ============================================
CREATE OR REPLACE FUNCTION public.cancel_user_refund_request(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_request RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', '请登录');
  END IF;

  -- 查找待审核退款申请
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
    AND user_id = v_user_id 
    AND status = 'pending'
  FOR UPDATE;
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '未找到进行中的退款申请');
  END IF;

  -- 恢复订单状态
  UPDATE orders 
  SET status = v_request.original_status 
  WHERE id = p_order_id;
  
  -- ✅ 软删除：改为 cancelled 状态
  UPDATE refund_requests 
  SET status = 'cancelled', reviewed_at = NOW()
  WHERE id = v_request.id;

  RETURN jsonb_build_object('success', true, 'message', '退款申请已取消');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '取消失败: ' || SQLERRM);
END;
$$;

COMMENT ON FUNCTION public.cancel_user_refund_request(UUID) IS '用户取消退款申请（软删除）';

-- ============================================
-- 3. 管理员审核 → 权限验证 + 释放资源
-- ============================================
CREATE OR REPLACE FUNCTION public.admin_review_refund(
  p_request_id UUID,
  p_approved BOOLEAN,
  p_refund_amount DECIMAL DEFAULT NULL,
  p_admin_note TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_admin_id UUID;
  v_is_admin BOOLEAN;
  v_request RECORD;
  v_order RECORD;
  v_user_balance DECIMAL;
BEGIN
  v_admin_id := auth.uid();
  
  -- ✅ 新增：管理员权限验证
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = v_admin_id AND role = 'admin'
  ) INTO v_is_admin;
  
  IF NOT v_is_admin THEN
    RETURN jsonb_build_object('success', false, 'error', '无管理员权限');
  END IF;

  -- 获取退款申请
  SELECT * INTO v_request FROM refund_requests WHERE id = p_request_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '退款申请不存在');
  END IF;
  
  IF v_request.status != 'pending' THEN
    RETURN jsonb_build_object('success', false, 'error', '该申请已处理');
  END IF;

  -- 获取订单
  SELECT * INTO v_order FROM orders WHERE id = v_request.order_id;

  IF p_approved THEN
    -- 验证退款金额
    IF p_refund_amount IS NULL OR p_refund_amount <= 0 THEN
      RETURN jsonb_build_object('success', false, 'error', '请填写有效的退款金额');
    END IF;
    
    IF p_refund_amount > v_order.total_amount THEN
      RETURN jsonb_build_object('success', false, 'error', '退款金额不能超过订单金额');
    END IF;

    -- 更新退款申请
    UPDATE refund_requests SET
      status = 'approved',
      refund_amount = p_refund_amount,
      admin_id = v_admin_id,
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;

    -- 更新订单状态
    UPDATE orders SET status = 'refunded' WHERE id = v_request.order_id;

    -- 退款到用户余额
    SELECT balance INTO v_user_balance FROM profiles WHERE id = v_request.user_id;
    
    UPDATE profiles SET balance = balance + p_refund_amount WHERE id = v_request.user_id;

    -- 记录钱包流水
    INSERT INTO wallet_transactions (user_id, amount, type, balance_after, description)
    VALUES (
      v_request.user_id,
      p_refund_amount,
      'refund',
      v_user_balance + p_refund_amount,
      '订单退款: ' || v_order.order_no
    );

    -- ✅ 新增：释放资源
    IF v_order.order_type = 'shared_account' AND v_order.slot_occupancy_ids IS NOT NULL THEN
      -- 释放车位：设为 idle
      UPDATE slot_occupancies 
      SET status = 'idle', order_id = NULL, user_id = NULL
      WHERE id = ANY(v_order.slot_occupancy_ids);
    END IF;
    
    -- virtual 类型不需要特殊处理 CDK (库存不受影响)

    RETURN jsonb_build_object('success', true, 'message', '退款审批通过');

  ELSE
    -- 拒绝：恢复原状态
    UPDATE refund_requests SET
      status = 'rejected',
      admin_id = v_admin_id,
      admin_note = p_admin_note,
      reviewed_at = NOW()
    WHERE id = p_request_id;

    -- 恢复订单状态
    UPDATE orders SET status = v_request.original_status WHERE id = v_request.order_id;

    RETURN jsonb_build_object('success', true, 'message', '已拒绝退款申请');
  END IF;

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '审核失败: ' || SQLERRM);
END;
$$;

COMMENT ON FUNCTION public.admin_review_refund(UUID, BOOLEAN, DECIMAL, TEXT) IS '管理员审核退款（含权限验证和资源释放）';

-- ============================================
-- 4. 获取订单退款状态（供前端判断按钮）
-- ============================================
CREATE OR REPLACE FUNCTION public.get_order_refund_info(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_pending_request RECORD;
  v_cancelled_count INTEGER;
BEGIN
  -- 获取待审核退款
  SELECT id, reason, created_at INTO v_pending_request
  FROM refund_requests 
  WHERE order_id = p_order_id AND status = 'pending'
  LIMIT 1;
  
  -- 获取取消次数
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
$$;

COMMENT ON FUNCTION public.get_order_refund_info(UUID) IS '获取订单退款状态（待审核请求和取消次数）';

-- ============================================
-- 5. 续费空SKU列表友好提示
-- ============================================
CREATE OR REPLACE FUNCTION public.get_renewal_skus(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_order RECORD;
  v_cdk_id UUID;
  v_sku_list JSONB := '[]'::JSONB;
  v_product RECORD;
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
  
  -- ✅ 新增：空列表友好提示
  IF v_sku_list IS NULL OR v_sku_list = '[]'::JSONB THEN
    RETURN jsonb_build_object('success', false, 'error', '该商品暂无可续费套餐');
  END IF;
  
  -- 获取商品信息
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
$$;

COMMENT ON FUNCTION public.get_renewal_skus(UUID) IS '获取订单可续费的SKU列表（含空列表检测）';
