import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
    getWechatPayConfig,
    wechatPayRequest,
    generateOutTradeNo,
    generateNonceStr,
    getTimestamp,
} from "../_shared/wechat-pay-utils.ts"

/**
 * POST /wechat-jsapi-pay
 * JSAPI 支付下单 - 公众号内支付
 * 
 * 请求参数:
 * - amount: number (单位: 元)
 * - description: string (商品描述)
 * - openid: string (用户在公众号的 OpenID)
 * 
 * 返回:
 * - 支付参数（用于前端调用 WeixinJSBridge）
 */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface JsapiPayRequest {
    amount: number       // 充值金额（元）
    description?: string // 商品描述
    openid: string       // 用户 OpenID
}

interface JsapiPrepayResponse {
    prepay_id: string    // 预支付ID
}

// 导入私钥用于签名
async function importPrivateKey(pemKey: string): Promise<CryptoKey> {
    const pemBody = pemKey
        .replace(/-----BEGIN PRIVATE KEY-----/, '')
        .replace(/-----END PRIVATE KEY-----/, '')
        .replace(/\s/g, '')

    const binaryString = atob(pemBody)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }

    return await crypto.subtle.importKey(
        'pkcs8',
        bytes.buffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    )
}

// 生成 JSAPI 支付签名
async function generateJsapiPaySign(
    appId: string,
    timeStamp: string,
    nonceStr: string,
    prepayId: string,
    privateKey: string
): Promise<string> {
    const signMessage = `${appId}\n${timeStamp}\n${nonceStr}\nprepay_id=${prepayId}\n`

    const key = await importPrivateKey(privateKey)
    const encoder = new TextEncoder()
    const data = encoder.encode(signMessage)

    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        key,
        data
    )

    const bytes = new Uint8Array(signature)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders })
    }

    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }

    try {
        // 验证用户身份
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "未登录" }),
                { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        const supabaseUrl = Deno.env.get("SUPABASE_URL")!
        const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } }
        })

        // 获取当前用户
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: "用户认证失败" }),
                { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 解析请求参数
        const { amount, description, openid }: JsapiPayRequest = await req.json()

        if (!amount || amount <= 0) {
            return new Response(
                JSON.stringify({ error: "充值金额必须大于0" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        if (!openid) {
            return new Response(
                JSON.stringify({ error: "缺少用户 OpenID" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 获取微信支付配置
        const config = getWechatPayConfig()
        if (!config.mchid || !config.privateKey) {
            console.error('[JsapiPay] Missing WeChat Pay config')
            return new Response(
                JSON.stringify({ error: "支付配置错误，请联系管理员" }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 生成商户订单号
        const outTradeNo = generateOutTradeNo('JSAPI')

        // 金额转换为分
        const amountInCents = Math.round(amount * 100)

        // 创建充值记录（待支付状态）
        const { error: insertError } = await supabase
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

        if (insertError) {
            console.error('[JsapiPay] Failed to create order:', insertError)
            if (!insertError.message.includes('does not exist')) {
                throw insertError
            }
        }

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

        const result = await wechatPayRequest<JsapiPrepayResponse>(
            'POST',
            '/v3/pay/transactions/jsapi',
            requestBody,
            config
        )

        console.log('[JsapiPay] Response:', result)

        // 生成前端调起支付所需的参数
        const timeStamp = String(getTimestamp())
        const nonceStr = generateNonceStr()
        const packageStr = `prepay_id=${result.prepay_id}`

        // 签名
        const paySign = await generateJsapiPaySign(
            config.appid,
            timeStamp,
            nonceStr,
            result.prepay_id,
            config.privateKey
        )

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    // 前端调用 WeixinJSBridge.invoke 所需参数
                    appId: config.appid,
                    timeStamp: timeStamp,
                    nonceStr: nonceStr,
                    package: packageStr,
                    signType: 'RSA',
                    paySign: paySign,
                    // 附加信息
                    out_trade_no: outTradeNo,
                    amount: amount,
                }
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (err) {
        console.error('[JsapiPay] Error:', err)
        return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "支付下单失败" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }
})
