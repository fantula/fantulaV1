import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
    getWechatPayConfig,
    decryptCallback,
} from "../_shared/wechat-pay-utils.ts"

/**
 * POST /wechat-notify
 * 微信支付回调通知处理
 * 
 * 注意：此接口不需要 JWT 验证
 */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, wechatpay-signature, wechatpay-timestamp, wechatpay-nonce, wechatpay-serial",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface WechatNotifyResource {
    original_type: string
    algorithm: string
    ciphertext: string
    associated_data: string
    nonce: string
}

interface WechatNotifyBody {
    id: string
    create_time: string
    resource_type: string
    event_type: string
    summary: string
    resource: WechatNotifyResource
}

interface DecryptedPaymentResult {
    mchid: string
    appid: string
    out_trade_no: string
    transaction_id: string
    trade_type: string
    trade_state: string
    trade_state_desc: string
    bank_type: string
    attach: string
    success_time: string
    payer: { openid: string }
    amount: {
        total: number
        payer_total: number
        currency: string
        payer_currency: string
    }
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders })
    }

    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ code: "FAIL", message: "Method not allowed" }),
            { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }

    try {
        // 获取回调头信息（用于验签）
        const timestamp = req.headers.get('wechatpay-timestamp') || ''
        const nonce = req.headers.get('wechatpay-nonce') || ''
        const signature = req.headers.get('wechatpay-signature') || ''
        const serial = req.headers.get('wechatpay-serial') || ''

        console.log('[Notify] Received callback, serial:', serial)

        // 解析请求体
        const body = await req.text()
        const notifyData: WechatNotifyBody = JSON.parse(body)

        console.log('[Notify] Event type:', notifyData.event_type)
        console.log('[Notify] Summary:', notifyData.summary)

        // 只处理支付成功事件
        if (notifyData.event_type !== 'TRANSACTION.SUCCESS') {
            console.log('[Notify] Ignoring non-success event')
            return new Response(
                JSON.stringify({ code: "SUCCESS", message: "Received" }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 获取配置并解密回调数据
        const config = getWechatPayConfig()
        const { ciphertext, nonce: resourceNonce, associated_data } = notifyData.resource

        const decryptedData = await decryptCallback(
            ciphertext,
            resourceNonce,
            associated_data,
            config.apiV3Key
        )

        const paymentResult: DecryptedPaymentResult = JSON.parse(decryptedData)

        console.log('[Notify] Decrypted result:', {
            out_trade_no: paymentResult.out_trade_no,
            transaction_id: paymentResult.transaction_id,
            trade_state: paymentResult.trade_state,
            amount: paymentResult.amount,
        })

        // 验证支付状态
        if (paymentResult.trade_state !== 'SUCCESS') {
            console.log('[Notify] Payment not successful:', paymentResult.trade_state)
            return new Response(
                JSON.stringify({ code: "SUCCESS", message: "Received" }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 使用 Service Role 操作数据库
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // 解析附加数据
        let attach: { userId?: string; type?: string } = {}
        try {
            attach = JSON.parse(paymentResult.attach || '{}')
        } catch (e) {
            console.error('[Notify] Failed to parse attach:', e)
        }

        // 查找并更新充值订单
        const { data: order, error: findError } = await supabase
            .from('recharge_orders')
            .select('*')
            .eq('out_trade_no', paymentResult.out_trade_no)
            .single()

        if (findError || !order) {
            console.error('[Notify] Order not found:', paymentResult.out_trade_no, findError)
            // 仍然返回成功，避免微信重复通知
            return new Response(
                JSON.stringify({ code: "SUCCESS", message: "Order not found but acknowledged" }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 检查订单是否已处理（幂等性）
        if (order.status === 'paid') {
            console.log('[Notify] Order already paid:', paymentResult.out_trade_no)
            return new Response(
                JSON.stringify({ code: "SUCCESS", message: "Already processed" }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 更新订单状态
        const { error: updateError } = await supabase
            .from('recharge_orders')
            .update({
                status: 'paid',
                transaction_id: paymentResult.transaction_id,
                paid_at: paymentResult.success_time,
                payer_openid: paymentResult.payer?.openid,
                updated_at: new Date().toISOString(),
            })
            .eq('out_trade_no', paymentResult.out_trade_no)

        if (updateError) {
            console.error('[Notify] Failed to update order:', updateError)
            throw updateError
        }

        // 更新用户余额
        const amountToAdd = order.amount  // 使用订单中记录的金额（元）
        const userId = order.user_id || attach.userId

        if (userId) {
            // 先获取当前余额
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('balance')
                .eq('id', userId)
                .single()

            if (profileError) {
                console.error('[Notify] Failed to get user profile:', profileError)
            } else {
                const currentBalance = profile?.balance || 0
                const newBalance = currentBalance + amountToAdd

                const { error: balanceError } = await supabase
                    .from('profiles')
                    .update({
                        balance: newBalance,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', userId)

                if (balanceError) {
                    console.error('[Notify] Failed to update balance:', balanceError)
                } else {
                    console.log(`[Notify] User ${userId} balance updated: ${currentBalance} -> ${newBalance}`)
                }

                // 记录余额变动（使用现有的 wallet_transactions 表）
                await supabase
                    .from('wallet_transactions')
                    .insert({
                        user_id: userId,
                        type: '微信充值',
                        amount: amountToAdd,
                        balance_after: newBalance,
                        description: `微信支付充值 ${amountToAdd} 点 (订单号: ${paymentResult.out_trade_no})`,
                        created_at: new Date().toISOString(),
                    })
            }
        }

        console.log('[Notify] Payment processed successfully:', paymentResult.out_trade_no)

        return new Response(
            JSON.stringify({ code: "SUCCESS", message: "OK" }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (err) {
        console.error('[Notify] Error:', err)
        // 返回失败，让微信重试
        return new Response(
            JSON.stringify({ code: "FAIL", message: err instanceof Error ? err.message : "Internal error" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }
})
