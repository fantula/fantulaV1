/**
 * POST /api/wechat/query-order
 * 查询微信支付订单状态
 */
import { getSupabaseClient, getSupabaseServiceClient, getCurrentUser } from '~/server/utils/supabase'
import { getWechatPayConfig, wechatPayRequest } from '~/server/utils/wechat-pay'

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

        // 如果查询到支付成功，更新本地订单状态
        if (result.trade_state === 'SUCCESS' && order.status !== 'paid') {
            const supabaseService = getSupabaseServiceClient()

            await supabaseService
                .from('recharge_orders')
                .update({
                    status: 'paid',
                    transaction_id: result.transaction_id,
                    paid_at: result.success_time,
                    updated_at: new Date().toISOString(),
                })
                .eq('out_trade_no', out_trade_no)

            // 更新用户余额
            const { data: profile } = await supabaseService
                .from('profiles')
                .select('balance')
                .eq('id', user.id)
                .single()

            if (profile) {
                const currentBalance = profile.balance || 0
                const bonus = order.bonus || 0
                const totalAmount = order.amount + bonus
                const newBalance = currentBalance + totalAmount

                await supabaseService
                    .from('profiles')
                    .update({
                        balance: newBalance,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', user.id)

                // 记录余额变动
                await supabaseService
                    .from('wallet_transactions')
                    .insert({
                        user_id: user.id,
                        type: '微信充值',
                        amount: totalAmount,
                        balance_after: newBalance,
                        description: `微信支付充值 ${order.amount.toFixed(2)}点 赠送${bonus.toFixed(2)}点`,
                        created_at: new Date().toISOString(),
                    })
            }
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
