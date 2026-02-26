/**
 * POST /api/alipay/query-order
 * 查询支付宝订单状态
 * PC 端轮询用（Native Pay 扫码后检查是否付款）
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import { getAlipayConfig, alipayRequest } from '~/server/utils/alipay'
import { handleRechargeCallback } from '~/server/utils/recharge-handler'

export default defineEventHandler(async (event) => {
    try {
        const user = await getCurrentUser(event)
        if (!user) {
            throw createError({ statusCode: 401, message: '未登录' })
        }

        const body = await readBody(event)
        const { out_trade_no } = body

        if (!out_trade_no) {
            throw createError({ statusCode: 400, message: '缺少订单号' })
        }

        const supabase = getSupabaseClient(event)

        // 验证订单归属
        const { data: order, error: orderError } = await supabase
            .from('recharge_orders')
            .select('*')
            .eq('out_trade_no', out_trade_no)
            .eq('user_id', user.id)
            .single()

        if (orderError || !order) {
            throw createError({ statusCode: 404, message: '订单不存在' })
        }

        // 已支付直接返回
        if (order.status === 'paid') {
            return {
                success: true,
                data: {
                    trade_status: 'TRADE_SUCCESS',
                    out_trade_no,
                    amount: order.amount,
                    paid: true,
                },
            }
        }

        // 调用支付宝查单 API
        const config = getAlipayConfig()
        console.log('[AlipayQuery] Querying:', out_trade_no)

        const result = await alipayRequest(
            'alipay.trade.query',
            { out_trade_no },
            config
        )

        const tradeStatus = result.trade_status
        const isPaid = tradeStatus === 'TRADE_SUCCESS'

        console.log('[AlipayQuery] Status:', tradeStatus)

        // 查到成功则通过统一处理器完成余额更新+通知（含幂等保护）
        if (isPaid && order.status !== 'paid') {
            await handleRechargeCallback({
                outTradeNo:    out_trade_no,
                transactionId: result.trade_no,
                payerOpenid:   undefined,
                paidAt:        result.send_pay_date || new Date().toISOString(),
                paySource:     'alipay',
            })
        }

        return {
            success: true,
            data: {
                trade_status: tradeStatus,
                out_trade_no,
                amount: order.amount,
                paid: isPaid,
            },
        }
    } catch (err: any) {
        console.error('[AlipayQuery] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '查询失败',
        })
    }
})
