/**
 * GET/POST /api/admin/scheduler/[...path]
 * 服务端代理 Scheduler API 请求
 * 
 * 将前端对 /api/admin/scheduler/* 的请求代理到 scheduler 服务 (127.0.0.1:3001)
 * 这样前端不需要直接访问 scheduler 端口，解决跨域和访问性问题
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  // scheduler 内部地址（服务端可访问，浏览器不可访问）
  const schedulerBaseUrl = config.schedulerInternalUrl || 'http://127.0.0.1:3001'
  
  // 获取子路径: /api/admin/scheduler/status → /status
  const path = event.context.params?.path || ''
  const targetUrl = `${schedulerBaseUrl}/${path}`
  
  const method = event.method
  
  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    
    // POST 请求转发 body
    if (method === 'POST') {
      try {
        const body = await readBody(event)
        if (body) {
          fetchOptions.body = JSON.stringify(body)
        }
      } catch {
        // no body is fine
      }
    }
    
    // 转发 query 参数
    const query = getQuery(event)
    const queryString = new URLSearchParams(query as Record<string, string>).toString()
    const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl

    const response = await fetch(finalUrl, fetchOptions)
    const data = await response.json()
    
    return data
  } catch (error: any) {
    console.error(`[Scheduler Proxy] Failed to reach ${targetUrl}:`, error.message)
    throw createError({
      statusCode: 502,
      message: `定时器服务连接失败: ${error.message}`,
    })
  }
})
