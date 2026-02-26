/**
 * GET /api/admin/system/notifications/templates
 * 获取所有邮件通知模板列表
 */
import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { requireAdmin } from '~/server/utils/admin-auth'

export default defineEventHandler(async (event) => {
    await requireAdmin(event)

    const client = getAdminSupabaseClient()

    const { data, error } = await client
        .from('notification_templates')
        .select('id, event_type, name, subject_template, body_template, variables, is_enabled, updated_at')
        .order('event_type')

    if (error) {
        throw createError({ statusCode: 500, statusMessage: '获取模板列表失败: ' + error.message })
    }

    return { data: data || [] }
})
