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
    if (!adminSupabaseClient) {
        const config = useRuntimeConfig()

        // 从 RuntimeConfig 获取配置，确保环境一致性
        // 优先尝试获取 public 中的配置 (针对客户端 Admin), 降级获取 server 配置 (针对 SSR/Server API)
        const SUPABASE_SERVICE_ROLE_KEY = config.public.supabaseServiceKey || config.supabaseServiceKey
        const SUPABASE_URL = config.public.supabaseUrl

        if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
            console.error('[Admin Client] Missing SUPABASE_SERVICE_KEY or SUPABASE_URL')
        }

        adminSupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: {
                persistSession: false, // 禁止 Admin Client 持久化 Session
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
            global: {
                headers: {
                    // 强制使用 Service Role Key 作为 Authorization Header
                    // 这能防止 Supabase JS 自动使用 LocalStorage 中的用户 Token 覆盖它
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
