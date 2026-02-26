-- ============================================================
-- Migration: 原子充值处理 RPC
-- 解决问题：
--   1. 微信/支付宝两套回调逻辑完全重复 → 统一从此函数处理
--   2. 余额更新竞态条件 → FOR UPDATE 行锁 + 原子 UPDATE
-- ============================================================

CREATE OR REPLACE FUNCTION public.process_recharge_payment(
    p_out_trade_no   TEXT,
    p_transaction_id TEXT,
    p_payer_openid   TEXT    DEFAULT NULL,
    p_paid_at        TEXT    DEFAULT NULL,
    p_pay_source     TEXT    DEFAULT 'wechat'   -- 'wechat' | 'alipay'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_order          recharge_orders%ROWTYPE;
    v_total_amount   NUMERIC(12, 2);
    v_new_balance    NUMERIC(12, 2);
    v_type_label     TEXT;
    v_desc           TEXT;
    v_paid_at        TIMESTAMPTZ;
BEGIN
    -- 1. 锁定订单行，防止并发重复处理
    SELECT * INTO v_order
    FROM public.recharge_orders
    WHERE out_trade_no = p_out_trade_no
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'order_not_found');
    END IF;

    -- 2. 幂等检查：已处理直接返回
    IF v_order.status = 'paid' THEN
        RETURN json_build_object(
            'success',          true,
            'already_processed', true,
            'user_id',          v_order.user_id,
            'amount',           v_order.amount,
            'bonus',            COALESCE(v_order.bonus, 0),
            'new_balance',      NULL
        );
    END IF;

    -- 3. 计算到账总额（充值金额 + 赠送金额）
    v_total_amount := COALESCE(v_order.amount, 0) + COALESCE(v_order.bonus, 0);

    -- 4. 解析支付时间
    BEGIN
        v_paid_at := COALESCE(p_paid_at::TIMESTAMPTZ, NOW());
    EXCEPTION WHEN OTHERS THEN
        v_paid_at := NOW();
    END;

    -- 5. 更新订单状态为已支付
    UPDATE public.recharge_orders SET
        status         = 'paid',
        transaction_id = p_transaction_id,
        payer_openid   = p_payer_openid,
        paid_at        = v_paid_at,
        updated_at     = NOW()
    WHERE out_trade_no = p_out_trade_no;

    -- 6. 原子更新用户余额（直接加法，无竞态条件）
    UPDATE public.profiles SET
        balance    = COALESCE(balance, 0) + v_total_amount,
        updated_at = NOW()
    WHERE id = v_order.user_id
    RETURNING balance INTO v_new_balance;

    IF NOT FOUND THEN
        -- 用户不存在，回滚订单状态
        UPDATE public.recharge_orders SET
            status     = 'pending',
            updated_at = NOW()
        WHERE out_trade_no = p_out_trade_no;
        RETURN json_build_object('success', false, 'error', 'user_not_found');
    END IF;

    -- 7. 记录钱包流水
    v_type_label := CASE WHEN p_pay_source = 'alipay' THEN '支付宝充值' ELSE '微信充值' END;
    v_desc := CASE WHEN p_pay_source = 'alipay' THEN '支付宝' ELSE '微信' END
        || '充值 ' || COALESCE(v_order.amount, 0)::TEXT
        || '点 赠送' || COALESCE(v_order.bonus, 0)::TEXT || '点';

    INSERT INTO public.wallet_transactions (
        user_id, type, amount, balance_after, description, created_at
    ) VALUES (
        v_order.user_id,
        v_type_label,
        v_total_amount,
        v_new_balance,
        v_desc,
        NOW()
    );

    -- 8. 返回处理结果供上层发送通知
    RETURN json_build_object(
        'success',           true,
        'already_processed', false,
        'user_id',           v_order.user_id,
        'amount',            v_order.amount,
        'bonus',             COALESCE(v_order.bonus, 0),
        'total_amount',      v_total_amount,
        'new_balance',       v_new_balance
    );
END;
$$;

-- 授权：仅 service_role 可调用（Server API 使用 service client）
REVOKE ALL ON FUNCTION public.process_recharge_payment FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.process_recharge_payment TO service_role;
