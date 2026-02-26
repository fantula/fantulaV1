/**
 * POST /api/alipay/native-pay
 * 支付宝当面付 - 生成支付二维码 (PC扫码支付)
 * 调用: alipay.trade.precreate
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import { getAlipayConfig, alipayRequest, generateAlipayOrderNo } from '~/server/utils/alipay'

export default defineEventHandler(async (event) => {
    try {
        const user = await getCurrentUser(event)
        if (!user) {
            throw createError({ statusCode: 401, message: '未登录' })
        }

        const body = await readBody(event)
        const { amount, bonus = 0, description } = body

        if (!amount || amount <= 0) {
            throw createError({ statusCode: 400, message: '充值金额必须大于0' })
        }

        const config = getAlipayConfig()
        if (!config.appId || !config.privateKey) {
            console.error('[AlipayNative] Missing Alipay config')
            throw createError({ statusCode: 500, message: '支付配置错误，请联系管理员' })
        }

        const outTradeNo = generateAlipayOrderNo('ALIPAY')
        const supabase = getSupabaseClient(event)

        // 创建充值订单记录
        const { error: insertError } = await supabase
            .from('recharge_orders')
            .insert({
                out_trade_no: outTradeNo,
                user_id: user.id,
                amount: amount,
                bonus: bonus,
                amount_cents: Math.round(amount * 100),
                status: 'pending',
                pay_type: 'alipay_native',
                description: description || `充值${amount}点`,
                created_at: new Date().toISOString(),
            })

        if (insertError && !insertError.message.includes('does not exist')) {
            console.error('[AlipayNative] Insert error:', insertError)
            throw insertError
        }

        // 调用 alipay.trade.precreate 获取二维码
        const result = await alipayRequest(
            'alipay.trade.precreate',
            {
                out_trade_no: outTradeNo,
                total_amount: amount.toFixed(2),
                subject: description || `凡图拉-充值${amount}点`,
            },
            config
        )

        console.log('[AlipayNative] QR Code URL:', result.qr_code)

        return {
            success: true,
            data: {
                qr_code: result.qr_code,
                out_trade_no: outTradeNo,
                amount: amount,
            },
        }
    } catch (err: any) {
        console.error('[AlipayNative] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '支付下单失败',
        })
    }
})
