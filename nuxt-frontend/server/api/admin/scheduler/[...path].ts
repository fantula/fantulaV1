/**
 * Nuxt Server API 代理：将 /api/admin/scheduler/* 转发到 Scheduler 服务（localhost:3001）
 * 
 * 原因：Scheduler 服务（fantula-scheduler）监听 127.0.0.1:3001，仅服务端可访问。
 * 浏览器无法直接连接，通过此代理层中转。
 * 
 * 路由映射：
 *   GET  /api/admin/scheduler/status      → GET  http://localhost:3001/status
 *   POST /api/admin/scheduler/start       → POST http://localhost:3001/start
 *   POST /api/admin/scheduler/stop        → POST http://localhost:3001/stop
 *   POST /api/admin/scheduler/run/:task   → POST http://localhost:3001/run/:task
 *   GET  /api/admin/scheduler/tasks       → GET  http://localhost:3001/tasks
 *   GET  /api/admin/scheduler/logs        → GET  http://localhost:3001/logs
 */

const SCHEDULER_BASE = 'http://127.0.0.1:3001'

export default defineEventHandler(async (event) => {
    // 提取子路径：/api/admin/scheduler/start → /start
    const path = event.path.replace(/^\/api\/admin\/scheduler/, '') || '/'
    const method = event.method
    const targetUrl = `${SCHEDULER_BASE}${path}`

    try {
        // 转发请求体（POST 等有 body 的请求）
        let body: string | undefined
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            const rawBody = await readBody(event).catch(() => null)
            if (rawBody) {
                body = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody)
            }
        }

        const response = await fetch(targetUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body,
        })

        const contentType = response.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
            return await response.json()
        }
        return await response.text()

    } catch (err: any) {
        // Scheduler 服务未启动或不可达
        throw createError({
            statusCode: 503,
            message: `Scheduler 服务不可达（localhost:3001）: ${err.message}`,
        })
    }
})
