/**
 * POST /api/alipay/native-pay
 * 支付宝电脑网站支付 - 生成跳转支付URL
 * 调用: alipay.trade.page.pay
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import { getAlipayConfig, buildPagePayUrl, generateAlipayOrderNo } from '~/server/utils/alipay'

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
            console.error('[AlipayPC] Missing Alipay config')
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
                pay_type: 'alipay_pc',
                description: description || `充值${amount}点`,
                created_at: new Date().toISOString(),
            })

        if (insertError && !insertError.message.includes('does not exist')) {
            console.error('[AlipayPC] Insert error:', insertError)
            throw insertError
        }

        // 构建电脑网站支付跳转 URL
        const returnUrl = `https://www.fantula.com/pc/profile/wallet?alipay_order=${outTradeNo}`
        const payUrl = buildPagePayUrl(
            {
                out_trade_no: outTradeNo,
                product_code: 'FAST_INSTANT_TRADE_PAY',
                total_amount: amount.toFixed(2),
                subject: description || `凡图拉-充值${amount}点`,
            },
            returnUrl,
            config
        )

        console.log('[AlipayPC] Pay URL generated for order:', outTradeNo)

        return {
            success: true,
            data: {
                pay_url: payUrl,
                out_trade_no: outTradeNo,
                amount: amount,
            },
        }
    } catch (err: any) {
        console.error('[AlipayPC] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '支付下单失败',
        })
    }
})
