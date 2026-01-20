import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// 解析 JWT 获取 user_id (不验证签名，仅本地开发使用)
function parseJwt(token: string): { sub?: string } | null {
    try {
        const parts = token.replace('Bearer ', '').split('.')
        if (parts.length !== 3) return null
        const payload = JSON.parse(new TextDecoder().decode(decode(parts[1])))
        return payload
    } catch {
        return null
    }
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const authHeader = req.headers.get('Authorization')

        // 解析 JWT 获取 user_id
        const jwt = parseJwt(authHeader || '')
        const userId = jwt?.sub

        console.log('[order-list] Parsed user_id from JWT:', userId)

        if (!userId) {
            return new Response(JSON.stringify({
                error: 'Unauthorized',
                detail: 'No user_id in token'
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 401,
            })
        }

        // 使用 Service Role 直接查询数据库
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

        const supabaseClient = createClient(supabaseUrl, serviceRoleKey)

        // 1. 查询 orders (按 user_id 过滤)
        const { data: orders, error: ordersError } = await supabaseClient
            .from('orders')
            .select('id, order_no, status, total_amount, quantity, created_at, product_snapshot, sku_snapshot')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (ordersError) {
            console.log('[order-list] Orders error:', ordersError.message)
            throw ordersError
        }

        console.log('[order-list] Orders found:', orders?.length)

        // 2. 查询 pre_orders (待支付)
        const { data: preOrders, error: preOrdersError } = await supabaseClient
            .from('pre_orders')
            .select('id, order_no, status, total_amount, quantity, created_at, product_snapshot, sku_snapshot')
            .eq('user_id', userId)
            .eq('status', 'pending')
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })

        if (preOrdersError) {
            console.log('[order-list] PreOrders error:', preOrdersError.message)
            throw preOrdersError
        }

        console.log('[order-list] PreOrders found:', preOrders?.length)

        // 3. 格式化 orders
        const paidOrders = (orders || []).map((order: any) => ({
            id: order.id,
            order_no: order.order_no,
            status: order.status,
            total_amount: order.total_amount,
            quantity: order.quantity,
            created_at: order.created_at,
            product_name: order.product_snapshot?.product_name || '',
            product_image: order.product_snapshot?.image || '',
            spec_combination: order.sku_snapshot?.spec_combination || null
        }))

        // 4. 格式化 pre_orders
        const pendingOrders = (preOrders || []).map((order: any) => ({
            id: order.id,
            order_no: order.order_no,
            status: 'pending',
            total_amount: order.total_amount,
            quantity: order.quantity,
            created_at: order.created_at,
            product_name: order.product_snapshot?.product_name || '',
            product_image: order.product_snapshot?.image || '',
            spec_combination: order.sku_snapshot?.spec_combination || null
        }))

        return new Response(
            JSON.stringify({
                paid_orders: paidOrders,
                pending_orders: pendingOrders
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.log('[order-list] Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
