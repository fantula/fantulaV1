import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import { loginBaseSchema, passwordLoginSchema, verifyOtpSchema, validateBody } from '~/server/utils/validation'
import { mapSupabaseError } from '~/server/utils/error-mapper'

export default defineEventHandler(async (event) => {
    try {
        // 1. Initial Validation (determine type)
        const baseBody = await validateBody(event, loginBaseSchema)
        const { type } = baseBody

        const config = useRuntimeConfig()
        const supabaseUrl = config.public.supabaseUrl
        const supabaseAnonKey = config.public.supabaseAnonKey

        // Create Auth Client (Anon)
        const authClient = createClient(supabaseUrl, supabaseAnonKey)
        const adminClient = getAdminSupabaseClient()

        let authResult
        let email = ''

        // 2. Specific Validation & Auth
        if (type === 'password') {
            const { email: e, password } = await validateBody(event, passwordLoginSchema)
            email = e
            authResult = await authClient.auth.signInWithPassword({ email, password })
        } else {
            const { email: e, code } = await validateBody(event, verifyOtpSchema)
            email = e
            authResult = await authClient.auth.verifyOtp({ email, token: code, type: 'email' })
        }

        const { data, error } = authResult

        if (error) {
            throw error // Caught by mapSupabaseError
        }

        if (!data?.session) {
            throw createError({ statusCode: 401, statusMessage: 'Unable to start session' })
        }

        const userId = data.session.user.id
        const userEmail = data.session.user.email

        // 3. Verify Admin Status in admin_users table (using Service Role)
        let { data: adminData, error: adminError } = await adminClient
            .from('admin_users')
            .select(`
        *,
        department:admin_departments(id, name, permissions)
    `)
            .eq('auth_user_id', userId)
            .single()

        // 3.1 OTP First Login logic: Link auth_user_id if missing
        if ((adminError || !adminData) && type === 'otp') {
            const { data: adminByEmail } = await adminClient
                .from('admin_users')
                .select(`*, department:admin_departments(id, name, permissions)`)
                .eq('email', userEmail)
                .single()

            if (adminByEmail) {
                // Link it
                await adminClient
                    .from('admin_users')
                    .update({ auth_user_id: userId })
                    .eq('id', adminByEmail.id)

                adminData = adminByEmail
            }
        }

        if (!adminData) {
            // Not an admin
            await authClient.auth.signOut()
            throw createError({ statusCode: 403, statusMessage: '该账号不是管理员' })
        }

        if (adminData.status !== 'enabled') {
            await authClient.auth.signOut()
            throw createError({ statusCode: 403, statusMessage: '该账号已被禁用' })
        }

        // 4. Return Session & Admin Info
        return {
            success: true,
            session: data.session,
            adminInfo: adminData
        }
    } catch (err) {
        throw mapSupabaseError(err)
    }
})
