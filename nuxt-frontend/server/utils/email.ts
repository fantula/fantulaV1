
interface NotificationData {
    [key: string]: any
}

const BASE_WRAPPER = (title: string, content: string) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F5F7FA;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F7FA;padding:60px 20px;">
    <tr>
      <td align="center">
        <table width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;margin:0 auto;background-color:#FFFFFF;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.03);">
          <tr><td style="height:4px;background:linear-gradient(90deg,#178fc6,#F97316);border-top-left-radius:8px;border-top-right-radius:8px;"></td></tr>
          <tr>
            <td align="center" style="padding:45px 40px 30px;border-bottom:1px solid #F1F5F9;">
              <h1 style="margin:0;font-size:34px;font-weight:700;color:#1E293B;letter-spacing:2px;line-height:1.2;">凡图拉</h1>
              <div style="margin-top:6px;font-size:12px;font-weight:600;color:#94A3B8;letter-spacing:6px;text-transform:uppercase;">${title}</div>
            </td>
          </tr>
          ${content}
        </table>
        <table width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;margin:0 auto;">
          <tr>
            <td align="center" style="padding:30px 20px;">
              <p style="margin:0;font-size:12px;color:#CBD5E1;line-height:1.6;">
                &copy; 2019-2026 凡图拉 | 云南凡图拉科技有限公司
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

// 硬编码邮件模板
const EMAIL_TEMPLATES: Record<string, { subject: string; body: string }> = {
    recharge_success: {
        subject: '充值到账通知 - 凡图拉',
        body: BASE_WRAPPER('充值到账通知', `
          <tr>
            <td style="padding:40px 40px 10px;">
              <p style="margin:0 0 24px;font-size:15px;color:#64748B;line-height:1.6;">尊敬的用户，您好！</p>
              <p style="margin:0 0 20px;font-size:16px;font-weight:600;color:#334155;">您的充值已成功到账：</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F7FF;border-radius:8px;padding:4px;">
                <tr>
                  <td style="padding:14px 20px;font-size:14px;color:#64748B;">充值金额：</td>
                  <td style="padding:14px 20px;font-size:16px;font-weight:700;color:#DC2626;text-align:right;">¥{{amount}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:14px;color:#64748B;">赠送金额：</td>
                  <td style="padding:14px 20px;font-size:16px;font-weight:700;color:#16A34A;text-align:right;">¥{{bonus}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:14px;color:#64748B;">当前余额：</td>
                  <td style="padding:14px 20px;font-size:16px;font-weight:700;color:#1E293B;text-align:right;">¥{{balance}}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 45px;">
              <p style="margin:0;font-size:13px;color:#94A3B8;line-height:1.6;">如有疑问，请联系客服。</p>
            </td>
          </tr>`)
    },

    account_welcome: {
        subject: '欢迎加入凡图拉！',
        body: BASE_WRAPPER('欢迎加入', `
          <tr>
            <td style="padding:40px 40px 45px;">
              <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#334155;">Hi {{nickname}}，</p>
              <p style="margin:0 0 16px;font-size:15px;color:#64748B;line-height:1.8;">
                欢迎加入凡图拉！您的账户已注册成功。<br>
                我们为您提供 Netflix、Spotify、YouTube Premium 等海外流媒体会员充值服务。
              </p>
              <p style="margin:0;font-size:13px;color:#94A3B8;line-height:1.6;">如有任何问题，欢迎联系客服团队。</p>
            </td>
          </tr>`)
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

        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
            console.error('[Email] Missing RESEND_API_KEY')
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
