import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
    getWechatPayConfig,
    wechatPayRequest,
    generateOutTradeNo,
} from "../_shared/wechat-pay-utils.ts"

/**
 * POST /wechat-native-pay
 * Native 支付下单 - 生成支付二维码
 * 
 * 请求参数:
 * - amount: number (单位: 元)
 * - description: string (商品描述)
 * - userId: string (用户ID，用于回调时更新余额)
 * 
 * 返回:
 * - code_url: 二维码链接
 * - out_trade_no: 商户订单号
 */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface NativePayRequest {
    amount: number       // 充值金额（元）
    description?: string // 商品描述
}

interface NativePayResponse {
    code_url: string     // 二维码链接
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
        const { amount, description }: NativePayRequest = await req.json()

        if (!amount || amount <= 0) {
            return new Response(
                JSON.stringify({ error: "充值金额必须大于0" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 获取微信支付配置
        const config = getWechatPayConfig()
        if (!config.mchid || !config.privateKey) {
            console.error('[NativePay] Missing WeChat Pay config')
            return new Response(
                JSON.stringify({ error: "支付配置错误，请联系管理员" }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 生成商户订单号
        const outTradeNo = generateOutTradeNo('RECHARGE')

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
                pay_type: 'wechat_native',
                description: description || `充值${amount}点`,
                created_at: new Date().toISOString(),
            })

        if (insertError) {
            console.error('[NativePay] Failed to create order:', insertError)
            // 如果表不存在，继续执行（后面会创建表）
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
            attach: JSON.stringify({ userId: user.id, type: 'recharge' }),
        }

        console.log('[NativePay] Request:', JSON.stringify(requestBody, null, 2))

        const result = await wechatPayRequest<NativePayResponse>(
            'POST',
            '/v3/pay/transactions/native',
            requestBody,
            config
        )

        console.log('[NativePay] Response:', result)

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    code_url: result.code_url,
                    out_trade_no: outTradeNo,
                    amount: amount,
                }
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (err) {
        console.error('[NativePay] Error:', err)
        return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "支付下单失败" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }
})
