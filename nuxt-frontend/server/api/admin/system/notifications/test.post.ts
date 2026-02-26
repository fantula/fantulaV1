/**
 * POST /api/admin/system/notifications/test
 * 向指定邮箱发送测试邮件（使用当前数据库中保存的模板）
 */
import { requireAdmin } from '~/server/utils/admin-auth'
import { sendNotification } from '~/server/utils/email'
import { z } from 'zod'

const schema = z.object({
    event_type: z.string().min(1),
    to:         z.string().email('请输入有效的收件人邮箱'),
    data:       z.record(z.any()).optional().default({}),
})

export default defineEventHandler(async (event) => {
    await requireAdmin(event)

    const raw = await readBody(event)
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
        throw createError({ statusCode: 400, statusMessage: '参数错误: ' + parsed.error.issues[0]?.message })
    }

    const { event_type, to, data } = parsed.data

    const result = await sendNotification(event_type, to, data)

    if (!result.success) {
        throw createError({ statusCode: 500, statusMessage: result.message || '发送失败' })
    }

    return { success: true, message: `测试邮件已发送至 ${to}` }
})
