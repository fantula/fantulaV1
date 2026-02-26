/**
 * POST /api/alipay/h5-pay
 * 支付宝手机网站支付 - 返回跳转链接 (移动端)
 * 调用: alipay.trade.wap.pay
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import { getAlipayConfig, buildH5PayUrl, generateAlipayOrderNo } from '~/server/utils/alipay'

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
            throw createError({ statusCode: 500, message: '支付配置错误，请联系管理员' })
        }

        const outTradeNo = generateAlipayOrderNo('ALIH5')
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
                pay_type: 'alipay_h5',
                description: description || `充值${amount}点`,
                created_at: new Date().toISOString(),
            })

        if (insertError && !insertError.message.includes('does not exist')) {
            console.error('[AlipayH5] Insert error:', insertError)
            throw insertError
        }

        // 支付完成后跳回钱包页，携带订单号用于状态确认
        const returnUrl = `https://www.fantula.com/mobile/profile/wallet?alipay_order=${outTradeNo}`

        const payUrl = buildH5PayUrl(
            {
                out_trade_no: outTradeNo,
                product_code: 'QUICK_WAP_WAY',
                total_amount: amount.toFixed(2),
                subject: description || `凡图拉-充值${amount}点`,
                quit_url: 'https://www.fantula.com/mobile/profile/wallet',
            },
            returnUrl,
            config
        )

        console.log('[AlipayH5] Pay URL generated for order:', outTradeNo)

        return {
            success: true,
            data: {
                pay_url: payUrl,
                out_trade_no: outTradeNo,
                amount: amount,
            },
        }
    } catch (err: any) {
        console.error('[AlipayH5] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '支付下单失败',
        })
    }
})
