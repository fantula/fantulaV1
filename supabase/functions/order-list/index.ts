import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('Missing Authorization header')
        }

        // Create Supabase Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        const supabase = createClient(supabaseUrl, serviceRoleKey)

        // Validate Token
        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: userError } = await supabase.auth.getUser(token)

        if (userError || !user) {
            return new Response(JSON.stringify({ error: 'Unauthorized', detail: userError?.message }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        const userId = user.id

        // 1. Get Orders
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('id, order_no, status, total_amount, quantity, created_at, product_snapshot, sku_snapshot')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (ordersError) throw ordersError

        // 2. Get PreOrders (Pending)
        const { data: preOrders, error: preOrdersError } = await supabase
            .from('pre_orders')
            .select('id, order_no, status, total_amount, quantity, created_at, product_snapshot, sku_snapshot')
            .eq('user_id', userId)
            .eq('status', 'pending')
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })

        if (preOrdersError) throw preOrdersError

        // 3. Format Data
        const paidOrders = (orders || []).map((order: any) => ({
            id: order.id,
            order_no: order.order_no,
            status: order.status,
            total_amount: order.total_amount,
            quantity: order.quantity,
            created_at: order.created_at,
            product_name: order.product_snapshot?.product_name || 'Unknown Product',
            product_image: order.product_snapshot?.image || '',
            spec_combination: order.sku_snapshot?.spec_combination || null
        }))

        const pendingOrders = (preOrders || []).map((order: any) => ({
            id: order.id,
            order_no: order.order_no,
            status: 'pending',
            total_amount: order.total_amount,
            quantity: order.quantity,
            created_at: order.created_at,
            product_name: order.product_snapshot?.product_name || 'Unknown Product',
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

    } catch (error: any) {
        console.error('[order-list] Error:', error.message)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
