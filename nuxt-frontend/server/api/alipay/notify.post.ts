/**
 * POST /api/alipay/notify
 * 支付宝异步回调通知处理
 * 支付宝服务器调用，无需用户认证
 * 必须返回字符串 "success" 表示处理成功
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import { getAlipayConfig, verifyAlipaySign } from '~/server/utils/alipay'

export default defineEventHandler(async (event) => {
    try {
        // 支付宝回调使用 application/x-www-form-urlencoded
        const body = await readBody(event)

        console.log('[AlipayNotify] Received:', body?.out_trade_no, body?.trade_status)

        if (!body || !body.out_trade_no) {
            console.error('[AlipayNotify] Missing required params')
            return 'fail'
        }

        const config = getAlipayConfig()

        // 验证签名
        const isValid = verifyAlipaySign(body, config.alipayPublicKey)
        if (!isValid) {
            console.error('[AlipayNotify] Signature verification failed for:', body.out_trade_no)
            return 'fail'
        }

        // 只处理 TRADE_SUCCESS（交易成功）
        if (body.trade_status !== 'TRADE_SUCCESS') {
            console.log('[AlipayNotify] Non-success status:', body.trade_status)
            return 'success'
        }

        const outTradeNo = String(body.out_trade_no)
        const supabase = getSupabaseServiceClient()

        // 查询订单
        const { data: order, error: orderError } = await supabase
            .from('recharge_orders')
            .select('*')
            .eq('out_trade_no', outTradeNo)
            .single()

        if (orderError || !order) {
            console.error('[AlipayNotify] Order not found:', outTradeNo)
            return 'fail'
        }

        // 幂等检查
        if (order.status === 'paid') {
            console.log('[AlipayNotify] Already processed:', outTradeNo)
            return 'success'
        }

        // 更新订单状态
        await supabase
            .from('recharge_orders')
            .update({
                status: 'paid',
                transaction_id: body.trade_no,
                paid_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('out_trade_no', outTradeNo)

        // 更新用户余额
        const { data: profile } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', order.user_id)
            .single()

        if (profile) {
            const currentBalance = parseFloat(profile.balance) || 0
            const orderAmount = parseFloat(order.amount) || 0
            const bonus = parseFloat(order.bonus) || 0
            const totalAmount = orderAmount + bonus
            const newBalance = currentBalance + totalAmount

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ balance: newBalance })
                .eq('id', order.user_id)

            if (updateError) {
                console.error('[AlipayNotify] Failed to update balance:', updateError)
            }

            // 记录余额变动
            await supabase
                .from('wallet_transactions')
                .insert({
                    user_id: order.user_id,
                    type: '支付宝充值',
                    amount: totalAmount,
                    balance_after: newBalance,
                    description: `支付宝充值 ${orderAmount.toFixed(2)}点 赠送${bonus.toFixed(2)}点`,
                    created_at: new Date().toISOString(),
                })

            console.log(`[AlipayNotify] Success: User ${order.user_id} recharged ${totalAmount} (amount: ${orderAmount}, bonus: ${bonus})`)

            // 异步发送充值到账邮件（不阻塞回调）
            const { data: userProfile } = await supabase
                .from('profiles')
                .select('email')
                .eq('id', order.user_id)
                .single()

            if (userProfile?.email) {
                sendNotification('recharge_success', userProfile.email, {
                    amount: orderAmount.toFixed(2),
                    bonus: bonus.toFixed(2),
                    balance: newBalance.toFixed(2),
                }).catch(e => console.error('[AlipayNotify] Email error:', e))
            }
        }

        return 'success'
    } catch (err: any) {
        console.error('[AlipayNotify] Error:', err)
        return 'fail'
    }
})
