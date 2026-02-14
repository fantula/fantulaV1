import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    // Get token from header
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader) {
        throw createError({ statusCode: 401, statusMessage: 'No token' })
    }

    const token = authHeader.replace('Bearer ', '')
    const config = useRuntimeConfig()

    // Verify token using Auth Client (Anon is fine for verification -> getUser)
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)

    const { data: { user }, error: authError } = await authClient.auth.getUser(token)

    if (authError || !user) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
    }

    // Get Admin Data using Service Role
    const adminClient = getAdminSupabaseClient()

    const { data: adminData, error: adminError } = await adminClient
        .from('admin_users')
        .select(`
        *,
        department:admin_departments(id, name, permissions)
    `)
        .eq('auth_user_id', user.id)
        .single()

    if (adminError || !adminData) {
        throw createError({ statusCode: 403, statusMessage: 'User is not admin' })
    }

    return { success: true, adminInfo: adminData }
})
