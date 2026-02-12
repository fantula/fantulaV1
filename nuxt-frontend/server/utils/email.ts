

interface EmailTemplate {
    subject: string
    body: string
}

interface NotificationData {
    [key: string]: any
}

/**
 * 发送邮件通知
 * @param eventType 通知类型 (如 order_paid)
 * @param to 收件人邮箱
 * @param data 模板变量数据
 */
export async function sendNotification(eventType: string, to: string, data: NotificationData): Promise<{ success: boolean; message?: string }> {
    try {
        const config = useRuntimeConfig()
        const client = getSupabaseServiceClient()

        // 1. 获取模板配置
        const { data: template, error } = await client
            .from('notification_templates')
            .select('*')
            .eq('event_type', eventType)
            .single()

        if (error || !template) {
            console.error(`[Email] Template not found: ${eventType}`)
            // 如果模板不存在，视为不需要发送，或者根据需求报错
            // 这里返回 false 但不抛出异常，避免阻塞主流程
            return { success: false, message: '模板不存在' }
        }

        if (!template.is_enabled) {
            console.log(`[Email] Notification disabled: ${eventType}`)
            return { success: true, message: '通知已禁用' }
        }

        // 2. 渲染模板
        const subject = renderTemplate(template.subject_template, data)
        const html = renderTemplate(template.body_template, data)

        // 3. 发送邮件 (Resend)
        const resendApiKey = process.env.SUPABASE_AUTH_SMTP_PASS
        if (!resendApiKey) {
            console.error('[Email] Missing SUPABASE_AUTH_SMTP_PASS')
            return { success: false, message: '邮件服务未配置' }
        }

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`
            },
            body: JSON.stringify({
                from: 'Fantula <noreply@fantula.com>',
                to: [to],
                subject: subject,
                html: html
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error('[Email] Resend API Error:', errorData)
            return { success: false, message: `发送失败: ${errorData.message}` }
        }

        const result = await response.json()
        console.log(`[Email] Sent ${eventType} to ${to}: ${result.id}`)
        return { success: true }

    } catch (err: any) {
        console.error('[Email] Send Error:', err)
        return { success: false, message: err.message }
    }
}

/**
 * 简单的模板渲染 (Mustache-like syntax {{key}})
 */
function renderTemplate(template: string, data: NotificationData): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] !== undefined ? String(data[key]) : match
    })
}
