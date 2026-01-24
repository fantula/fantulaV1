alter table "public"."tickets" add column "ticket_no" text;

CREATE UNIQUE INDEX tickets_ticket_no_key ON public.tickets USING btree (ticket_no);

alter table "public"."tickets" add constraint "tickets_ticket_no_key" UNIQUE using index "tickets_ticket_no_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_ticket_no()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- 如果插入时没有指定 ticket_no，则自动生成
    IF NEW.ticket_no IS NULL THEN
        -- 生成规则: T- + 8位随机大写HEX (既专业又不会像 UUID 那么长)
        -- 使用 md5(random) 确保足够的随机性
        NEW.ticket_no := 'T-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.admin_review_refund(p_request_id uuid, p_approved boolean, p_refund_amount numeric DEFAULT NULL::numeric, p_admin_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
$function$
;

CREATE OR REPLACE FUNCTION public.cancel_user_refund_request(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
$function$
;

CREATE OR REPLACE FUNCTION public.get_order_refund_info(p_order_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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
$function$
;

CREATE TRIGGER trigger_set_ticket_no BEFORE INSERT ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.set_ticket_no();


