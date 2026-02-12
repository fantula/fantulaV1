import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
    // 权限校验 (确保是管理员)
    // 这里的 Admin 校验通常由中间件或 utils 处理，这里简单起见假设 server api 已经在 admin 路径下
    // 但为了安全，最好检查 headers 或 session

    // TODO: 添加 admin 权限检查逻辑 (参考其他 admin api)

    const client = getSupabaseServiceClient()

    const { data, error } = await client
        .from('notification_templates')
        .select('*')
        .order('event_type')

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    return {
        success: true,
        data
    }
})
