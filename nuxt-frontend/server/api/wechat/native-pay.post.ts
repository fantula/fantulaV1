/**
 * POST /api/wechat/native-pay
 * Native 支付下单 - 生成支付二维码 (PC扫码支付)
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import {
    getWechatPayConfig,
    wechatPayRequest,
    generateOutTradeNo,
} from '~/server/utils/wechat-pay'

interface NativePayResponse {
    code_url: string
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
        const { amount, bonus = 0, description } = body

        if (!amount || amount <= 0) {
            throw createError({
                statusCode: 400,
                message: '充值金额必须大于0',
            })
        }

        // 获取微信支付配置
        const config = getWechatPayConfig()
        if (!config.mchid || !config.privateKey) {
            console.error('[NativePay] Missing WeChat Pay config')
            throw createError({
                statusCode: 500,
                message: '支付配置错误，请联系管理员',
            })
        }

        // 生成商户订单号
        const outTradeNo = generateOutTradeNo('RECHARGE')

        // 金额转换为分
        const amountInCents = Math.round(amount * 100)

        // 获取 Supabase 客户端
        const supabase = getSupabaseClient(event)

        // 创建充值记录（待支付状态）
        const { error: insertError } = await supabase
            .from('recharge_orders')
            .insert({
                out_trade_no: outTradeNo,
                user_id: user.id,
                amount: amount,
                bonus: bonus,  // 赠送金额
                amount_cents: amountInCents,
                status: 'pending',
                pay_type: 'wechat_native',
                description: description || `充值${amount}点`,
                created_at: new Date().toISOString(),
            })

        if (insertError) {
            console.error('[NativePay] Failed to create order:', insertError)
            // 忽略表不存在的错误（开发环境可能还没创建表）
            if (!insertError.message.includes('does not exist')) {
                throw insertError
            }
        }

        // 调用微信支付 Native 下单 API
        const requestBody = {
            appid: config.appid,
            mchid: config.mchid,
            description: description || `凡图拉-充值${amount}点`,
            out_trade_no: outTradeNo,
            notify_url: config.notifyUrl,
            amount: {
                total: amountInCents,
                currency: 'CNY',
            },
            attach: JSON.stringify({ userId: user.id, type: 'recharge', bonus: bonus }),
        }

        console.log('[NativePay] Request:', JSON.stringify(requestBody, null, 2))

        const result = await wechatPayRequest<NativePayResponse>(
            'POST',
            '/v3/pay/transactions/native',
            requestBody,
            config
        )

        console.log('[NativePay] Response:', result)

        return {
            success: true,
            data: {
                code_url: result.code_url,
                out_trade_no: outTradeNo,
                amount: amount,
            },
        }
    } catch (err: any) {
        console.error('[NativePay] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '支付下单失败',
        })
    }
})
