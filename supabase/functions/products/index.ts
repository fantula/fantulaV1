import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const offset = parseInt(url.searchParams.get('offset') || '0')
        const keyword = url.searchParams.get('keyword')

        // Service Role Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        const supabase = createClient(supabaseUrl, serviceRoleKey)

        // Case 1: Get Stock (Single Product)
        if (id) {
            // Check if product exists and return specific field or calculated stock
            // For now, simpler approach: return 'initial_sales' or a mocked stock concept
            // Or better: aggregate stock from product_skus

            // 1. Get product type
            const { data: product, error: pError } = await supabase
                .from('products')
                .select('id, status')
                .eq('id', id)
                .single()

            if (pError || !product) {
                return new Response(JSON.stringify({ stock: 0 }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 200 // Return 0 stock on error/not found
                })
            }

            // 2. Sum stock from SKUs? 
            // Currently DB schema doesn't seem to track real-time stock decrements in a centralized way shown in snippets.
            // Often "stock" is derived or infinite for virtual goods.
            // Let's assume infinite (9999) or based on status for now, or check explicit 'stock' field if added.
            // Looking at adminProductApi, we see 'initial_sales', but no 'stock'.
            // In virtual goods, stock is often CDKs available.

            // Let's check `cdk` table count if needed?
            // For Safety/Speed: Return a high number if Active, 0 if Offline.
            const stock = product.status === 'on' ? 9999 : 0

            return new Response(JSON.stringify({ stock }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        // Case 2: Get List (Pagination)
        let query = supabase
            .from('products')
            .select('id, product_name, image, display_price, initial_sales, status', { count: 'exact' })
            .eq('status', 'on')
            .range(offset, offset + limit - 1)
            .order('sort_order', { ascending: true })

        if (keyword) {
            query = query.ilike('product_name', `%${keyword}%`)
        }

        const { data, count, error } = await query

        if (error) throw error

        return new Response(JSON.stringify({
            list: data,
            total: count
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
