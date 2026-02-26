/**
 * 后台 API 鉴权工具
 *
 * 用法：
 *   const admin = await requireAdmin(event)
 *   // admin = { id, email, role }
 *   // 未通过时自动 throw 401/403
 */
import { createClient } from '@supabase/supabase-js'
import { getAdminSupabaseClient } from '~/utils/supabase-admin'

export interface AdminCaller {
    id: string
    authUserId: string
    status: string
}

/**
 * 验证请求方是已启用的管理员，否则抛出 HTTP 错误
 */
export async function requireAdmin(event: any): Promise<AdminCaller> {
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader) {
        throw createError({ statusCode: 401, statusMessage: '未提供认证令牌' })
    }

    const token = authHeader.replace('Bearer ', '')
    const config = useRuntimeConfig()

    // 验证 token 有效性
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
    const { data: { user }, error: userError } = await authClient.auth.getUser(token)

    if (userError || !user) {
        throw createError({ statusCode: 401, statusMessage: '无效的认证令牌' })
    }

    // 验证是否为已启用的管理员
    const adminClient = getAdminSupabaseClient()
    const { data: adminRecord, error: adminError } = await adminClient
        .from('admin_users')
        .select('id, auth_user_id, status')
        .eq('auth_user_id', user.id)
        .single()

    if (adminError || !adminRecord || adminRecord.status !== 'enabled') {
        throw createError({ statusCode: 403, statusMessage: '无管理员权限' })
    }

    return {
        id:         adminRecord.id,
        authUserId: adminRecord.auth_user_id,
        status:     adminRecord.status,
    }
}
