/**
 * Admin HTTP 客户端
 * 用于前端调用服务端 Admin API
 */

export interface ApiResponse<T = any> {
  code: number
  msg: string
  data?: T
  success: boolean
}

/**
 * Admin API 请求配置
 */
interface AdminRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  query?: Record<string, any>
}

/**
 * 获取认证 token
 * 从当前登录的用户会话中获取
 */
async function getAuthToken(): Promise<string | null> {
  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token || null
}

/**
 * Admin API 请求
 */
export async function adminRequest<T = any>(
  endpoint: string,
  options: AdminRequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, query } = options

  // 获取认证 token
  const token = await getAuthToken()
  if (!token) {
    return {
      code: 401,
      msg: '未登录或登录已过期',
      success: false
    }
  }

  // 构建请求 URL
  const baseUrl = '/api/admin'
  let url = `${baseUrl}${endpoint}`

  // 添加查询参数
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value))
      }
    })
    url += `?${params.toString()}`
  }

  try {
    const response = await $fetch<ApiResponse<T>>(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    return response
  } catch (error: any) {
    // 处理网络错误或服务器错误
    if (error?.data) {
      return error.data as ApiResponse<T>
    }

    return {
      code: error?.statusCode || 500,
      msg: error?.message || '网络请求失败',
      success: false
    }
  }
}

/**
 * 便捷方法
 */
export const adminHttp = {
  get: <T = any>(endpoint: string, query?: Record<string, any>) =>
    adminRequest<T>(endpoint, { method: 'GET', query }),

  post: <T = any>(endpoint: string, body?: any) =>
    adminRequest<T>(endpoint, { method: 'POST', body }),

  put: <T = any>(endpoint: string, body?: any) =>
    adminRequest<T>(endpoint, { method: 'PUT', body }),

  delete: <T = any>(endpoint: string) =>
    adminRequest<T>(endpoint, { method: 'DELETE' }),

  patch: <T = any>(endpoint: string, body?: any) =>
    adminRequest<T>(endpoint, { method: 'PATCH', body })
}
