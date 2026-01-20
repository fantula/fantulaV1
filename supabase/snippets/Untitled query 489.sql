-- ============================================
-- Migration: Refund Feature
-- Creates refund_requests table and functions
-- ============================================
-- 1. Create refund_requests table
CREATE TABLE IF NOT EXISTS public.refund_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  reason TEXT NOT NULL,
  reason_detail TEXT,
  original_status TEXT NOT NULL,  -- 申请前订单状态（拒绝时恢复）
  images_snapshot JSONB,          -- 预留图片字段
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  refund_amount DECIMAL(10,2),
  admin_id UUID REFERENCES public.profiles(id),
  admin_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);
-- Index for quick lookup
CREATE INDEX IF NOT EXISTS idx_refund_requests_order_id ON public.refund_requests(order_id);
CREATE INDEX IF NOT EXISTS idx_refund_requests_user_id ON public.refund_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_refund_requests_status ON public.refund_requests(status);
-- RLS
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;
-- Users can view their own requests
CREATE POLICY "Users can view own refund requests"
  ON public.refund_requests FOR SELECT
  USING (auth.uid() = user_id);
-- Users can insert their own requests
CREATE POLICY "Users can create refund requests"
  ON public.refund_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);
-- ============================================
-- 2. Function: create_refund_request
-- ============================================
CREATE OR REPLACE FUNCTION public.create_refund_request(
  p_order_id UUID,
  p_reason TEXT,
  p_reason_detail TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
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
$$;
COMMENT ON FUNCTION public.create_refund_request(UUID, TEXT, TEXT) IS '创建退款申请';
-- ============================================
-- 3. Function: admin_review_refund
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
$$;
COMMENT ON FUNCTION public.admin_review_refund(UUID, BOOLEAN, DECIMAL, TEXT) IS '管理员审核退款申请';
-- ============================================
-- 4. Function: get_refund_request
-- ============================================
CREATE OR REPLACE FUNCTION public.get_refund_request(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
AS $$
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
$$;
COMMENT ON FUNCTION public.get_refund_request(UUID) IS '获取订单的退款申请信息';