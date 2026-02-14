import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Logger } from "../_shared/error-logger.ts"

const logger = new Logger('edge:system-health')

Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    }

    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Security: Only allow Service Role Key
        const authHeader = req.headers.get('Authorization')
        const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        if (!authHeader || !serviceKey || authHeader.replace('Bearer ', '') !== serviceKey) {
            throw new Error('Unauthorized: Service Role Key required')
        }

        const startTotal = performance.now()
        const results: any = { status: "ok", checks: {} }
        let overallStatus = "ok"

        // Helper for timing with strict timeout
        async function check(name: string, fn: () => Promise<any>, timeoutMs: number = 3000) {
            const start = performance.now()
            // console.log(`[Probe] Starting check: ${name}`)
            try {
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs)
                )
                await Promise.race([fn(), timeoutPromise])

                const duration = (performance.now() - start).toFixed(2) + 'ms'
                // console.log(`[Probe] Finished check: ${name} (${duration})`)
                results.checks[name] = { status: "ok", latency: duration }
            } catch (err: any) {
                const duration = (performance.now() - start).toFixed(2) + 'ms'
                console.error(`[Probe] Failed check: ${name} - ${err.message}`)
                results.checks[name] = { status: "error", error: err.message, latency: duration }
                overallStatus = "error"

                // Log usage warning but not error unless critical
                if (name === 'database') {
                    logger.error(`Database Check Failed`, err, { latency: duration })
                }
            }
        }

        // 1. Env Check
        try {
            const requiredVars = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_ACCOUNT_ID']
            const missing = requiredVars.filter(v => !Deno.env.get(v))
            if (missing.length > 0) throw new Error(`Missing vars: ${missing.join(', ')}`)
            results.checks['env'] = { status: "ok" }
        } catch (e: any) {
            results.checks['env'] = { status: "error", error: e.message }
            overallStatus = "critical"
            logger.error('Environment Configuration Error', e)
        }

        // 2. Database Check (Supabase)
        await check('database', async () => {
            const supabaseUrl = Deno.env.get('SUPABASE_URL')!
            const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
            const adminClient = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
            const { error } = await adminClient.from('profiles').select('count', { count: 'exact', head: true }).limit(1)
            if (error) throw error
        }, 5000)

        // 3. Internal Network (Gateway)
        await check('internal_network', async () => {
            const controller = new AbortController()
            const id = setTimeout(() => controller.abort(), 2000)
            try {
                const res = await fetch('http://kong:8000', { method: 'HEAD', signal: controller.signal })
                if (res.status === 502 || res.status === 504) throw new Error(`Gateway Error: ${res.status}`)
            } finally {
                clearTimeout(id)
            }
        }, 3000)

        // 4. External Internet (Baidu)
        await check('external_internet', async () => {
            const controller = new AbortController()
            const id = setTimeout(() => controller.abort(), 2000)
            try {
                const res = await fetch('https://www.baidu.com', { method: 'HEAD', signal: controller.signal })
                if (!res.ok && res.status !== 200) throw new Error(`External Reachability Error: ${res.status}`)
            } finally {
                clearTimeout(id)
            }
        }, 3000)

        // 5. R2 Configuration
        await check('r2_connectivity', async () => {
            const accountId = Deno.env.get('R2_ACCOUNT_ID')
            if (!accountId) throw new Error("No Account ID")
            const controller = new AbortController()
            const id = setTimeout(() => controller.abort(), 2000)
            try {
                const res = await fetch(`https://${accountId}.r2.cloudflarestorage.com`, { method: 'HEAD', signal: controller.signal })
            } finally {
                clearTimeout(id)
            }
        }, 3000)

        results.status = overallStatus
        results.totalLatency = (performance.now() - startTotal).toFixed(2) + 'ms'
        results.timestamp = new Date().toISOString()
        results.region = Deno.env.get('DENO_REGION') || "local"

        // Log overall failure
        if (overallStatus !== 'ok') {
            // Create summary message
            const failureList = Object.keys(results.checks).filter(k => results.checks[k].status === 'error').join(', ')
            logger.error(`Health Probe Failed: ${failureList}`, null, { results })
        }

        const statusCode = overallStatus === 'critical' ? 503 : 200

        return new Response(JSON.stringify(results, null, 2), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: statusCode
        })

    } catch (err: any) {
        // Critical Logic Failure
        await logger.error('Critical Probe Exception', err)

        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
})
