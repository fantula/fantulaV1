

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.event_type || !body.to) {
        throw createError({ statusCode: 400, statusMessage: 'Missing event_type or to address' })
    }

    // 使用提供的 data 或空对象
    const templateData = body.data || {}

    // 调用 sendNotification
    const result = await sendNotification(body.event_type, body.to, templateData)

    if (!result.success) {
        throw createError({
            statusCode: 500,
            statusMessage: result.message || 'Send failed'
        })
    }

    return {
        success: true,
        message: 'Test email sent successfully'
    }
})
