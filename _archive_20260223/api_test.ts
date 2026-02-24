/**
 * GET /api/test
 * 测试 API 端点
 */
export default defineEventHandler(async (event) => {
    return { message: 'API is working!', timestamp: new Date().toISOString() }
})
