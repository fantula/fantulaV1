/**
 * POST /api/wechat/query-order
 * 查询微信支付订单状态
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import { getWechatPayConfig, wechatPayRequest } from '~/server/utils/wechat-pay'
import { handleRechargeCallback } from '~/server/utils/recharge-handler'

interface QueryOrderResponse {
    appid: string
    mchid: string
    out_trade_no: string
    transaction_id?: string
    trade_type: string
    trade_state: string
    trade_state_desc: string
    bank_type?: string
    success_time?: string
    payer?: { openid: string }
    amount?: {
        total: number
        payer_total: number
        currency: string
    }
}

export default defineEventHandler(async (event) => {
    try {
        // 验证用户身份
        const user = await getCurrentUser(event)
        if (!user) {
            throw createError({
                statusCode: 401,
                message: '未登录',
            })
        }

        // 解析请求参数
        const body = await readBody(event)
        const { out_trade_no } = body

        if (!out_trade_no) {
            throw createError({
                statusCode: 400,
                message: '缺少订单号',
            })
        }

        // 获取 Supabase 客户端
        const supabase = getSupabaseClient(event)

        // 验证订单是否属于当前用户
        const { data: order, error: orderError } = await supabase
            .from('recharge_orders')
            .select('*')
            .eq('out_trade_no', out_trade_no)
            .eq('user_id', user.id)
            .single()

        if (orderError || !order) {
            throw createError({
                statusCode: 404,
                message: '订单不存在',
            })
        }

        // 如果订单已经支付成功，直接返回
        if (order.status === 'paid') {
            return {
                success: true,
                data: {
                    trade_state: 'SUCCESS',
                    trade_state_desc: '支付成功',
                    out_trade_no: out_trade_no,
                    amount: order.amount,
                    paid: true,
                },
            }
        }

        // 调用微信支付查询订单 API
        const config = getWechatPayConfig()
        const path = `/v3/pay/transactions/out-trade-no/${out_trade_no}?mchid=${config.mchid}`

        console.log('[QueryOrder] Querying:', out_trade_no)

        const result = await wechatPayRequest<QueryOrderResponse>(
            'GET',
            path,
            null,
            config
        )

        console.log('[QueryOrder] Result:', result.trade_state)

        // 如果查询到支付成功，通过统一处理器更新订单（含余额、通知、幂等保护）
        if (result.trade_state === 'SUCCESS' && order.status !== 'paid') {
            await handleRechargeCallback({
                outTradeNo: out_trade_no,
                transactionId: result.transaction_id,
                paySource: 'wechat',
                paidAt: result.success_time,
            })
        }

        return {
            success: true,
            data: {
                trade_state: result.trade_state,
                trade_state_desc: result.trade_state_desc,
                out_trade_no: out_trade_no,
                transaction_id: result.transaction_id,
                amount: order.amount,
                paid: result.trade_state === 'SUCCESS',
            },
        }
    } catch (err: any) {
        console.error('[QueryOrder] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '查询失败',
        })
    }
})
