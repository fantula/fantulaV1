import { u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { g as getSupabaseServiceClient } from './supabase.mjs';

async function sendNotification(eventType, to, data) {
  try {
    const config = useRuntimeConfig();
    const client = getSupabaseServiceClient();
    const { data: template, error } = await client.from("notification_templates").select("*").eq("event_type", eventType).single();
    if (error || !template) {
      console.error(`[Email] Template not found: ${eventType}`);
      return { success: false, message: "\u6A21\u677F\u4E0D\u5B58\u5728" };
    }
    if (!template.is_enabled) {
      console.log(`[Email] Notification disabled: ${eventType}`);
      return { success: true, message: "\u901A\u77E5\u5DF2\u7981\u7528" };
    }
    const subject = renderTemplate(template.subject_template, data);
    const html = renderTemplate(template.body_template, data);
    const resendApiKey = process.env.SUPABASE_AUTH_SMTP_PASS;
    if (!resendApiKey) {
      console.error("[Email] Missing SUPABASE_AUTH_SMTP_PASS");
      return { success: false, message: "\u90AE\u4EF6\u670D\u52A1\u672A\u914D\u7F6E" };
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "Fantula <noreply@fantula.com>",
        to: [to],
        subject,
        html
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Email] Resend API Error:", errorData);
      return { success: false, message: `\u53D1\u9001\u5931\u8D25: ${errorData.message}` };
    }
    const result = await response.json();
    console.log(`[Email] Sent ${eventType} to ${to}: ${result.id}`);
    return { success: true };
  } catch (err) {
    console.error("[Email] Send Error:", err);
    return { success: false, message: err.message };
  }
}
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== void 0 ? String(data[key]) : match;
  });
}

export { sendNotification as s };
//# sourceMappingURL=email.mjs.map
