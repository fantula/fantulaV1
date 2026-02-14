import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { createClient } from '@supabase/supabase-js'
import { deleteUserSchema, validateBody } from '~/server/utils/validation'
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

        const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
        const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token)

        if (callerError || !caller) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
        }

        const adminClient = getAdminSupabaseClient()
        const { data: adminCaller, error: adminError } = await adminClient
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', caller.id)
            .single()

        if (adminError || !adminCaller || adminCaller.status !== 'enabled') {
            throw createError({ statusCode: 403, statusMessage: 'Unauthorized: Admin access required' })
        }

        // 2. Validate Body
        const body = await validateBody(event, deleteUserSchema)
        const { id } = body

        // 3. Get User to Delete Info
        const { data: targetUser, error: fetchError } = await adminClient
            .from('admin_users')
            .select('auth_user_id')
            .eq('id', id)
            .single()

        if (fetchError || !targetUser) {
            throw createError({ statusCode: 404, statusMessage: 'User not found' })
        }

        // 4. Delete Database Record
        const { error: deleteError } = await adminClient
            .from('admin_users')
            .delete()
            .eq('id', id)

        if (deleteError) {
            throw deleteError
        }

        // 5. Delete Auth User
        if (targetUser.auth_user_id) {
            const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(targetUser.auth_user_id)
            if (authDeleteError) {
                console.error(`Failed to delete auth user ${targetUser.auth_user_id}:`, authDeleteError.message)
                // Non-blocking but logged
            }
        }

        return { success: true }
    } catch (err) {
        throw mapSupabaseError(err)
    }
})
