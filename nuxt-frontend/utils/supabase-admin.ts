import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * 后台管理专用 Supabase 客户端
 * 使用 service_role key 绕过所有 RLS 策略
 * 注意：service_role key 具有完全数据库访问权限，仅限后台使用
 */

let adminSupabaseClient: SupabaseClient | null = null

/**
 * 重置 Admin Supabase 客户端（用于 Key 变更后强制刷新）
 */
export function resetAdminSupabaseClient(): void {
    adminSupabaseClient = null
}

/**
 * 获取后台管理专用 Supabase 客户端实例（单例模式）
 * 使用 service_role key，完全绕过 RLS
 * 注意：启用 session 持久化以避免刷新页面丢失登录状态
 */
export function getAdminSupabaseClient(): SupabaseClient {
    // 严禁在客户端使用此函数
    if (process.client) {
        throw new Error('❌ SECURITY VIOLATION: getAdminSupabaseClient() cannot be used on client side!')
    }

    if (!adminSupabaseClient) {
        const config = useRuntimeConfig()

        // 仅从 Server RuntimeConfig 获取
        // 仅从 Server RuntimeConfig 获取
        const SUPABASE_SERVICE_ROLE_KEY = config.supabaseServiceKey
        const SUPABASE_URL = config.public.supabaseUrl

        if (!SUPABASE_SERVICE_ROLE_KEY) {
            console.error('❌ [Admin Client] Missing SUPABASE_SERVICE_KEY in runtimeConfig')
            throw new Error('Server configuration error: Missing Service Key')
        }

        adminSupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
            global: {
                headers: {
                    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
                }
            }
        })
    }
    return adminSupabaseClient
}

/**
 * 获取后台管理员的 JWT Token
 */
export async function getAdminAuthToken(): Promise<string | null> {
    const client = getAdminSupabaseClient()
    const { data: { session } } = await client.auth.getSession()
    return session?.access_token || null
}

/**
 * 检查后台管理员是否已登录
 */
export async function isAdminLoggedIn(): Promise<boolean> {
    const client = getAdminSupabaseClient()
    const { data: { session } } = await client.auth.getSession()
    return !!session
}

/**
 * 后台管理员登出
 */
export async function adminSignOut(): Promise<void> {
    const client = getAdminSupabaseClient()
    await client.auth.signOut()
}

export default getAdminSupabaseClient
