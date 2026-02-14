import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import { createUserSchema, validateBody } from '~/server/utils/validation'
import { mapSupabaseError } from '~/server/utils/error-mapper'

export default defineEventHandler(async (event) => {
    try {
        // 1. Verify Caller is Admin
        const authHeader = getHeader(event, 'Authorization')
        if (!authHeader) {
            throw createError({ statusCode: 401, statusMessage: 'No token' })
        }

        const token = authHeader.replace('Bearer ', '')
        const config = useRuntimeConfig()

        // Verify token
        const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
        const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token)

        if (callerError || !caller) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
        }

        // Verify Admin Status
        const adminClient = getAdminSupabaseClient()
        const { data: adminCaller, error: adminError } = await adminClient
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', caller.id)
            .single()

        if (adminError || !adminCaller || adminCaller.status !== 'enabled') {
            throw createError({ statusCode: 403, statusMessage: 'Unauthorized: Admin access required' })
        }

        // 2. Parse & Validate Body
        const body = await validateBody(event, createUserSchema)
        const { email, password, name, department_id, status } = body

        // 3. Create Auth User (Privileged Operation)
        const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name, role: 'admin' }
        })

        if (authError) {
            throw authError // Handled by catch block
        }

        if (!authData.user) {
            throw createError({ statusCode: 500, statusMessage: 'Auth user creation returned no data' })
        }

        // 4. Create Admin Record
        // Calculate password hash for compatibility (optional but recommended if DB constraint exists)
        const encoder = new TextEncoder()
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password))
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        const { data: newUser, error: dbError } = await adminClient
            .from('admin_users')
            .insert({
                name,
                email,
                password_hash,
                auth_user_id: authData.user.id,
                department_id: department_id || null, // Zod handles optional/null
                status: status || 'enabled'
            })
            .select()
            .single()

        if (dbError) {
            // Rollback: Delete Auth User
            await adminClient.auth.admin.deleteUser(authData.user.id)
            throw dbError
        }

        return { success: true, user: newUser }

    } catch (err) {
        throw mapSupabaseError(err)
    }
})
