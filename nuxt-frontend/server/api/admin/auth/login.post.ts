import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import { loginBaseSchema, passwordLoginSchema, verifyOtpSchema, validateBody } from '~/server/utils/validation'
import { mapSupabaseError } from '~/server/utils/error-mapper'

export default defineEventHandler(async (event) => {
    try {
        // 1. Read body once, then validate (避免 readBody 多次调用问题)
        const rawBody = await readBody(event)

        const baseResult = loginBaseSchema.safeParse(rawBody)
        if (!baseResult.success) {
            throw createError({ statusCode: 400, statusMessage: '参数格式错误' })
        }
        const { type } = baseResult.data

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
            const pwResult = passwordLoginSchema.safeParse(rawBody)
            if (!pwResult.success) {
                const errors = pwResult.error.flatten().fieldErrors
                const firstKey = Object.keys(errors)[0]
                const msg = firstKey && errors[firstKey as keyof typeof errors]?.[0] || '参数格式错误'
                throw createError({ statusCode: 400, statusMessage: msg })
            }
            const { email: e, password } = pwResult.data
            email = e.trim().toLowerCase()
            authResult = await authClient.auth.signInWithPassword({ email, password })
        } else {
            const otpResult = verifyOtpSchema.safeParse(rawBody)
            if (!otpResult.success) {
                const errors = otpResult.error.flatten().fieldErrors
                const firstKey = Object.keys(errors)[0]
                const msg = firstKey && errors[firstKey as keyof typeof errors]?.[0] || '参数格式错误'
                throw createError({ statusCode: 400, statusMessage: msg })
            }
            const { email: e, code } = otpResult.data
            email = e.trim().toLowerCase()
            const trimmedCode = code.trim()
            authResult = await authClient.auth.verifyOtp({ email, token: trimmedCode, type: 'email' })
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
