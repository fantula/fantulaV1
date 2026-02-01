import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase 客户端配置
 * 用于连接 Supabase 后端服务
 * 
 * 自动从 runtimeConfig 获取配置，支持开发/生产环境切换
 */

let supabaseClient: SupabaseClient | null = null

/**
 * 获取 Supabase 客户端实例（单例模式）
 */
export function getSupabaseClient(): SupabaseClient {
    if (!supabaseClient) {
        const config = useRuntimeConfig()
        const SUPABASE_URL = config.public.supabaseUrl || 'http://127.0.0.1:54321'
        const SUPABASE_ANON_KEY = config.public.supabaseAnonKey || 'sb_publishable_default_key'

        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
            },
        })
    }
    return supabaseClient
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

// 保持兼容性导出一个静态常量（但在SSR中可能不准确，建议使用 getEdgeFunctionsUrl）
// 这里为了兼容旧代码，暂时保留，但它可能在客户端不可用如果配置为空
// 实际上旧代码引用 EDGE_FUNCTIONS_URL，我们需要确保它能工作
// 由于这只是为了导出字符串，我们可以尝试获取 config，如果不在 nuxt 上下文可能报错
// 更好的做法是重构调用处，或者在这里 try-catch
export const EDGE_FUNCTIONS_URL = '' // Deprecated: Use getEdgeFunctionsUrl()

/**
 * 获取当前用户的 JWT Token
 */
export async function getAuthToken(): Promise<string | null> {
    const client = getSupabaseClient()
    const { data: { session } } = await client.auth.getSession()
    return session?.access_token || null
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

        const data = await response.json()

        if (!response.ok) {
            return { data: null, error: data.error || data.message || `HTTP ${response.status}` }
        }

        return { data, error: null }
    } catch (err: any) {
        return { data: null, error: err.message || '网络请求失败' }
    }
}

export default getSupabaseClient
