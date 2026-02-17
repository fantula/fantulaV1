import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    try {
        // 1. Verify Caller is Admin (Security Best Practice)
        const authHeader = getHeader(event, 'Authorization')
        if (!authHeader) {
            throw createError({ statusCode: 401, statusMessage: 'No token' })
        }

        const token = authHeader.replace('Bearer ', '')
        const config = useRuntimeConfig()

        // Verify token against Auth
        const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
        const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token)

        if (callerError) {
            console.error('Auth User Check Failed:', callerError)
        }

        if (callerError || !caller) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
        }

        // Verify Admin Role in DB
        const adminClient = getAdminSupabaseClient()
        const { data: adminCaller, error: adminError } = await adminClient
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', caller.id)
            .single()

        if (adminError || !adminCaller || adminCaller.status !== 'enabled') {
            throw createError({ statusCode: 403, statusMessage: 'Unauthorized' })
        }

        // 2. Call System Health Probe (Edge Function)
        // We prefer internal docker network if possible, but fallback to localhost
        const probeUrl = `${config.public.apiBase}/functions/v1/system-health`

        // Critical: Use Service Key
        const serviceKey = config.supabaseServiceKey

        try {
            const response = await $fetch(probeUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${serviceKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 5000 // 5s timeout
            })

            return { success: true, results: response }
        } catch (probeError: any) {
            console.error('Probe Failed:', probeError)
            // Fallback: If probe fails, return error state
            return {
                success: false,
                error: 'Probe unreachable: ' + probeError.message,
                results: {
                    status: 'critical',
                    checks: {
                        system: { status: 'error', error: probeError.message }
                    }
                }
            }
        }
    } catch (err: any) {
        return {
            success: false,
            error: err.message,
            results: null
        }
    }
})
