/**
 * POST /api/wechat/jsapi-pay
 * JSAPI 支付下单 - 公众号内支付
 */
import { getSupabaseClient, getCurrentUser } from '~/server/utils/supabase'
import {
    getWechatPayConfig,
    wechatPayRequest,
    generateOutTradeNo,
    generateNonceStr,
    getTimestamp,
    generateJsapiPaySign,
} from '~/server/utils/wechat-pay'

interface JsapiPayResponse {
    prepay_id: string
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
        const { amount, openid, description } = body

        if (!amount || amount <= 0) {
            throw createError({
                statusCode: 400,
                message: '充值金额必须大于0',
            })
        }

        if (!openid) {
            throw createError({
                statusCode: 400,
                message: '缺少 OpenID',
            })
        }

        // 获取微信支付配置
        const config = getWechatPayConfig()
        if (!config.mchid || !config.privateKey) {
            throw createError({
                statusCode: 500,
                message: '支付配置错误，请联系管理员',
            })
        }

        // 生成商户订单号
        const outTradeNo = generateOutTradeNo('JSAPI')

        // 金额转换为分
        const amountInCents = Math.round(amount * 100)

        // 获取 Supabase 客户端
        const supabase = getSupabaseClient(event)

        // 创建充值记录
        await supabase
            .from('recharge_orders')
            .insert({
                out_trade_no: outTradeNo,
                user_id: user.id,
                amount: amount,
                amount_cents: amountInCents,
                status: 'pending',
                pay_type: 'wechat_jsapi',
                description: description || `充值${amount}点`,
                payer_openid: openid,
                created_at: new Date().toISOString(),
            })

        // 调用微信支付 JSAPI 下单 API
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
            payer: {
                openid: openid,
            },
            attach: JSON.stringify({ userId: user.id, type: 'recharge' }),
        }

        console.log('[JsapiPay] Request:', JSON.stringify(requestBody, null, 2))

        const result = await wechatPayRequest<JsapiPayResponse>(
            'POST',
            '/v3/pay/transactions/jsapi',
            requestBody,
            config
        )

        // 生成前端调起支付所需的参数
        const timeStamp = String(getTimestamp())
        const nonceStr = generateNonceStr()

        const paySign = generateJsapiPaySign(
            config.appid,
            timeStamp,
            nonceStr,
            result.prepay_id,
            config.privateKey
        )

        return {
            success: true,
            data: {
                appId: config.appid,
                timeStamp: timeStamp,
                nonceStr: nonceStr,
                package: `prepay_id=${result.prepay_id}`,
                signType: 'RSA',
                paySign: paySign,
                out_trade_no: outTradeNo,
                amount: amount,
            },
        }
    } catch (err: any) {
        console.error('[JsapiPay] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '支付下单失败',
        })
    }
})
