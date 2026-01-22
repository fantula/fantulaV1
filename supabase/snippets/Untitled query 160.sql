-- 函数: cancel_user_refund_request
-- 作用: 撤销进行中的退款申请，删除 refund_requests 记录，并恢复 orders 原始状态
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
  -- 查找该用户对该订单的 pending 申请
  SELECT * INTO v_request 
  FROM refund_requests 
  WHERE order_id = p_order_id 
    AND user_id = v_user_id 
    AND status = 'pending'
  FOR UPDATE;
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', '未找到进行中的退款申请');
  END IF;
  -- 恢复订单状态至申请前的状态 (original_status)
  UPDATE orders 
  SET status = v_request.original_status 
  WHERE id = p_order_id;
  
  -- 硬删除申请记录 (按您的要求 "删除待审核退款表")
  DELETE FROM refund_requests WHERE id = v_request.id;
  RETURN jsonb_build_object('success', true, 'message', '退款申请已取消');
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', '取消失败: ' || SQLERRM);
END;
$$;