import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import { sendOtpSchema, validateBody } from '~/server/utils/validation'
import { mapSupabaseError } from '~/server/utils/error-mapper'

export default defineEventHandler(async (event) => {
    try {
        const body = await validateBody(event, sendOtpSchema)
        const { email } = body

        const adminClient = getAdminSupabaseClient()
        const config = useRuntimeConfig()

        // 1. Verify Admin User
        const { data: adminData, error: fetchError } = await adminClient
            .from('admin_users')
            .select('id, status, auth_user_id')
            .eq('email', email)
            .single()

        if (fetchError || !adminData) {
            throw createError({ statusCode: 403, statusMessage: '邮箱未注册为管理员' })
        }

        if (adminData.status !== 'enabled') {
            throw createError({ statusCode: 403, statusMessage: '该账号已被禁用' })
        }

        // 2. Create a temporary Auth Client (Anon) for sending OTP
        const supabaseUrl = config.public.supabaseUrl
        const supabaseAnonKey = config.public.supabaseAnonKey

        const authClient = createClient(supabaseUrl, supabaseAnonKey)

        const shouldCreateUser = !adminData.auth_user_id

        const { error } = await authClient.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser
            }
        })

        if (error) {
            if (error.message.includes('Signups not allowed')) {
                throw createError({ statusCode: 403, statusMessage: '账号未初始化，请联系超级管理员' })
            }
            throw error
        }

        return { success: true }
    } catch (err) {
        throw mapSupabaseError(err)
    }
})
