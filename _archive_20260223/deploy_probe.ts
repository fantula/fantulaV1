import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        // Return env check first
        if (!supabaseUrl || !supabaseServiceKey) {
            return new Response(JSON.stringify({ error: "ENV_MISSING", url: supabaseUrl, hasKey: !!supabaseServiceKey }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            })
        }

        console.log("Connecting to Supabase at " + supabaseUrl)

        const supabaseAdmin = createClient(
            supabaseUrl,
            supabaseServiceKey,
            { auth: { persistSession: false } }
        )

        const authHeader = req.headers.get('Authorization')
        const token = authHeader ? authHeader.replace('Bearer ', '') : 'dummy_token'

        // Try a simple operation with a timeout
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase Timeout within 5s")), 5000))
        const authPromise = supabaseAdmin.auth.getUser(token)

        // Use any to avoid type issues in this quick script
        const result = await Promise.race([authPromise, timeoutPromise]) as any

        return new Response(JSON.stringify({
            success: true,
            message: "Supabase connection attempted - Probe",
            authError: result.error,
            data: result.data
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        })

    } catch (err: any) {
        return new Response(JSON.stringify({
            error: err.message,
            stack: err.stack,
            type: "PROBE_FAILURE"
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
        })
    }
})
