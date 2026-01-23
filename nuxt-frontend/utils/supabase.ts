import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase 客户端配置
 * 用于连接 Supabase 后端服务
 */

// Supabase 项目配置 - 本地开发环境
const SUPABASE_URL = 'http://127.0.0.1:54321'
const SUPABASE_ANON_KEY = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'



// Edge Functions 基础 URL
export const EDGE_FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`

let supabaseClient: SupabaseClient | null = null

/**
 * 获取 Supabase 客户端实例（单例模式）
 */
export function getSupabaseClient(): SupabaseClient {
    if (!supabaseClient) {
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
        let url = `${EDGE_FUNCTIONS_URL}/${functionName}`
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
