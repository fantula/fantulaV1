
interface NotificationData {
    [key: string]: any
}

// 硬编码邮件模板
const EMAIL_TEMPLATES: Record<string, { subject: string; body: string }> = {
    recharge_success: {
        subject: '您的钱包充值成功 - Fantula',
        body: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#409eff">充值成功通知</h2>
  <p>您好，您的钱包已成功充值：</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <tr><td style="padding:8px;background:#f5f7fa;border-radius:4px">充值金额</td><td style="padding:8px;font-weight:bold">¥{{amount}}</td></tr>
    <tr><td style="padding:8px">赠送金额</td><td style="padding:8px;color:#67c23a">+¥{{bonus}}</td></tr>
    <tr><td style="padding:8px;background:#f5f7fa">账户余额</td><td style="padding:8px;font-weight:bold;color:#409eff">¥{{balance}}</td></tr>
  </table>
  <p style="color:#909399;font-size:13px">感谢您使用 Fantula，如有疑问请联系客服。</p>
</body>
</html>`
    },

    account_welcome: {
        subject: '欢迎加入 Fantula！',
        body: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#333">
  <h2 style="color:#409eff">欢迎加入 Fantula 🎉</h2>
  <p>Hi {{nickname}}，</p>
  <p>您的账户已注册成功！Fantula 为您提供 Netflix、Spotify、YouTube Premium 等海外流媒体会员充值服务。</p>
  <p>如有任何问题，欢迎联系我们的客服团队。</p>
  <p style="color:#909399;font-size:13px">— Fantula 团队</p>
</body>
</html>`
    }
}

/**
 * 发送邮件通知
 * @param eventType 通知类型 (recharge_success / account_welcome)
 * @param to 收件人邮箱
 * @param data 模板变量数据
 */
export async function sendNotification(eventType: string, to: string, data: NotificationData): Promise<{ success: boolean; message?: string }> {
    try {
        const template = EMAIL_TEMPLATES[eventType]
        if (!template) {
            console.log(`[Email] No template for event: ${eventType}`)
            return { success: false, message: '模板不存在' }
        }

        const subject = renderTemplate(template.subject, data)
        const html = renderTemplate(template.body, data)

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
                subject,
                html
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
 * 简单模板渲染 {{key}}
 */
function renderTemplate(template: string, data: NotificationData): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] !== undefined ? String(data[key]) : match
    })
}
