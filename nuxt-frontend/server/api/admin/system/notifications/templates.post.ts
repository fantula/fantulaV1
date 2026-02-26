/**
 * POST /api/admin/system/notifications/templates
 * 更新邮件通知模板（通过 id + event_type 定位）
 *
 * 支持两种场景：
 *   1. 仅更新 is_enabled（列表页的 Switch 切换）
 *   2. 更新 subject_template + body_template + is_enabled（编辑页保存）
 */
import { getAdminSupabaseClient } from '~/utils/supabase-admin'
import { requireAdmin } from '~/server/utils/admin-auth'
import { z } from 'zod'

const schema = z.object({
    id:               z.string().uuid(),
    event_type:       z.string().min(1),
    subject_template: z.string().optional(),
    body_template:    z.string().optional(),
    is_enabled:       z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
    const admin = await requireAdmin(event)

    const raw = await readBody(event)
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
        throw createError({ statusCode: 400, statusMessage: '参数错误: ' + parsed.error.issues[0]?.message })
    }

    const { id, event_type, ...fields } = parsed.data

    // 只更新传入的字段，避免意外清空未传字段
    const updates: Record<string, any> = { updated_at: new Date().toISOString() }
    if (fields.subject_template !== undefined) updates.subject_template = fields.subject_template
    if (fields.body_template    !== undefined) updates.body_template    = fields.body_template
    if (fields.is_enabled       !== undefined) updates.is_enabled       = fields.is_enabled

    const client = getAdminSupabaseClient()

    const { error } = await client
        .from('notification_templates')
        .update(updates)
        .eq('id', id)
        .eq('event_type', event_type)  // 双重校验，防止 id 与 event_type 不匹配

    if (error) {
        throw createError({ statusCode: 500, statusMessage: '更新失败: ' + error.message })
    }

    return { success: true }
})
