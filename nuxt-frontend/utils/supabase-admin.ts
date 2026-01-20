import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// ======== DEBUG: 确认模块已更新 ========
console.log('>>> supabase-admin.ts LOADED - Using SERVICE_ROLE key <<<')

/**
 * 后台管理专用 Supabase 客户端
 * 使用 service_role key 绕过所有 RLS 策略
 * 注意：service_role key 具有完全数据库访问权限，仅限后台使用
 */

// Supabase 项目配置 - 本地开发环境
const SUPABASE_URL = 'http://127.0.0.1:54321'

// 使用 service_role key (绕过 RLS)
// 本地开发环境的默认 service_role key
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

// 后台专用 Storage Key（与客户端隔离）
const ADMIN_STORAGE_KEY = 'sb-admin-auth-token'

// 强制清除可能残留的旧 session
// if (typeof window !== 'undefined') {
//     localStorage.removeItem(ADMIN_STORAGE_KEY)
//     console.log('[Admin Client] Cleared any stale admin session from localStorage')
// }

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
        console.log('[Admin Client] Creating new Supabase client with service_role key')
        adminSupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: {
                persistSession: true,
                storageKey: ADMIN_STORAGE_KEY,
                autoRefreshToken: true,
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
