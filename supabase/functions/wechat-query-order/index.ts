import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
    getWechatPayConfig,
    wechatPayRequest,
} from "../_shared/wechat-pay-utils.ts"

/**
 * POST /wechat-query-order
 * 查询微信支付订单状态
 * 
 * 请求参数:
 * - out_trade_no: string (商户订单号)
 * 
 * 返回:
 * - trade_state: 订单状态
 * - trade_state_desc: 状态描述
 */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface QueryOrderRequest {
    out_trade_no: string
}

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
        const { out_trade_no }: QueryOrderRequest = await req.json()

        if (!out_trade_no) {
            return new Response(
                JSON.stringify({ error: "缺少订单号" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 验证订单是否属于当前用户
        const { data: order, error: orderError } = await supabase
            .from('recharge_orders')
            .select('*')
            .eq('out_trade_no', out_trade_no)
            .eq('user_id', user.id)
            .single()

        if (orderError || !order) {
            return new Response(
                JSON.stringify({ error: "订单不存在" }),
                { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 如果订单已经支付成功，直接返回
        if (order.status === 'paid') {
            return new Response(
                JSON.stringify({
                    success: true,
                    data: {
                        trade_state: 'SUCCESS',
                        trade_state_desc: '支付成功',
                        out_trade_no: out_trade_no,
                        amount: order.amount,
                        paid: true,
                    }
                }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
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
            const supabaseService = createClient(
                supabaseUrl,
                Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
            )

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
                const newBalance = currentBalance + order.amount

                await supabaseService
                    .from('profiles')
                    .update({
                        balance: newBalance,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', user.id)

                // 记录余额变动（使用现有的 wallet_transactions 表）
                await supabaseService
                    .from('wallet_transactions')
                    .insert({
                        user_id: user.id,
                        type: '微信充值',
                        amount: order.amount,
                        balance_after: newBalance,
                        description: `微信支付充值 ${order.amount} 点 (订单号: ${out_trade_no})`,
                        created_at: new Date().toISOString(),
                    })
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    trade_state: result.trade_state,
                    trade_state_desc: result.trade_state_desc,
                    out_trade_no: out_trade_no,
                    transaction_id: result.transaction_id,
                    amount: order.amount,
                    paid: result.trade_state === 'SUCCESS',
                }
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (err) {
        console.error('[QueryOrder] Error:', err)
        return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "查询失败" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }
})
