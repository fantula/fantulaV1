-- ============================================
-- Migration: Cancel Refund RPC
-- Allows users to cancel their own pending refund requests
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

  -- Find the pending request for this user and order
  -- Lock the row to prevent race conditions
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
    AND user_id = v_user_id 
    AND status = 'pending'
  FOR UPDATE;
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '未找到进行中的退款申请');
  END IF;

  -- Restore order status to what it was before the refund request
  UPDATE orders 
  SET status = v_request.original_status 
  WHERE id = p_order_id;
  
  -- Delete the request entry as requested
  -- (Since the user specified "delete pending refund table", we do a hard delete)
  DELETE FROM refund_requests WHERE id = v_request.id;

  RETURN jsonb_build_object('success', true, 'message', '退款申请已取消');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '取消失败: ' || SQLERRM);
END;
$$;

COMMENT ON FUNCTION public.cancel_user_refund_request(UUID) IS '用户取消退款申请并恢复订单状态';
