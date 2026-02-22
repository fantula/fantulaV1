import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase 客户端配置
 * 用于连接 Supabase 后端服务
 * 
 * SSR 安全：
 * - 客户端：单例模式，persistSession=true（使用 localStorage）
 * - 服务端：每次调用创建新实例，persistSession=false（不访问 localStorage）
 *   避免跨请求状态泄露和 500 错误
 */

let clientSideSupabase: SupabaseClient | null = null

/**
 * 获取 Supabase 客户端实例
 * - 客户端：单例（安全，因为每个浏览器独立）
 * - 服务端：每次新建（避免跨请求污染）
 */
export function getSupabaseClient(): SupabaseClient {
    const config = useRuntimeConfig()
    const SUPABASE_URL = config.public.supabaseUrl || 'http://127.0.0.1:54321'
    const SUPABASE_ANON_KEY = config.public.supabaseAnonKey || 'sb_publishable_default_key'

    // SSR 服务端：每次创建新实例，不访问 localStorage
    if (import.meta.server) {
        return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        })
    }

    // 客户端：安全的单例模式
    if (!clientSideSupabase) {
        clientSideSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
            },
        })
    }
    return clientSideSupabase
}

/**
 * Edge Functions 基础 URL
 * 注意：需要在组件中使用 computed 或在函数内部获取，因为 useRuntimeConfig 只能在 setup 或 Nuxt 上下文中调用
 */
export const getEdgeFunctionsUrl = () => {
    const config = useRuntimeConfig()
    const url = config.public.supabaseUrl || 'http://127.0.0.1:54321'
    return `${url}/functions/v1`
}



/**
 * 获取当前用户的 JWT Token
 * 如果 session 已过期，会自动尝试刷新
 */
export async function getAuthToken(): Promise<string | null> {
    const client = getSupabaseClient()
    const { data: { session } } = await client.auth.getSession()

    if (!session) return null

    // 检查 token 是否即将过期（60 秒内），如果是则刷新
    const expiresAt = session.expires_at
    if (expiresAt && expiresAt - Math.floor(Date.now() / 1000) < 60) {
        const { data: { session: refreshed } } = await client.auth.refreshSession()
        return refreshed?.access_token || session.access_token
    }

    return session.access_token
}

/**
 * 调用 Edge Function 的通用方法
 */
export async function callEdgeFunction<T = any>(
    functionName: string,
    options: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
        body?: any
        params?: Record<string, string>
        requireAuth?: boolean
        token?: string // Allow passing custom token (e.g. Admin Token)
    } = {}
): Promise<{ data: T | null; error: string | null }> {
    const { method = 'POST', body, params, requireAuth = true, token: customToken } = options

    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        // 如果需要认证，添加 Authorization header
        if (requireAuth) {
            // 优先使用传入的 token，否则获取当前客户端 token
            const token = customToken || await getAuthToken()
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
        }

        // 构建 URL
        let url = `${getEdgeFunctionsUrl()}/${functionName}`
        if (params) {
            const searchParams = new URLSearchParams(params)
            url += `?${searchParams.toString()}`
        }

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })

        const contentType = response.headers.get('content-type') || ''

        if (!response.ok) {
            // 避免 Nginx/Gateway 返回 HTML 错误页时 JSON.parse 抛异常
            if (contentType.includes('application/json')) {
                try {
                    const errData = await response.json()
                    return { data: null, error: errData.error || errData.message || `HTTP ${response.status}` }
                } catch {
                    return { data: null, error: `HTTP ${response.status}` }
                }
            } else {
                const text = await response.text()
                const preview = text.replace(/<[^>]*>/g, '').trim().slice(0, 80)
                return { data: null, error: `HTTP ${response.status}${preview ? ': ' + preview : ''}` }
            }
        }

        const data = await response.json()

        return { data, error: null }
    } catch (err: any) {
        return { data: null, error: err.message || '网络请求失败' }
    }
}

export default getSupabaseClient
