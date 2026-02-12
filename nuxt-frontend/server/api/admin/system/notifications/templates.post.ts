import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const client = getSupabaseServiceClient()

    // 验证必要字段
    if (!body.id || !body.event_type) {
        throw createError({ statusCode: 400, statusMessage: 'Missing ID or Event Type' })
    }

    // 允许更新的字段
    const updates: any = {}
    if (body.subject_template !== undefined) updates.subject_template = body.subject_template
    if (body.body_template !== undefined) updates.body_template = body.body_template
    if (body.is_enabled !== undefined) updates.is_enabled = body.is_enabled

    updates.updated_at = new Date().toISOString()
    // updates.updated_by = ... (如果有当前用户ID)

    const { data, error } = await client
        .from('notification_templates')
        .update(updates)
        .eq('id', body.id)
        .select()
        .single()

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
