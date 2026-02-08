import { u as useRuntimeConfig, d as defineEventHandler, s as setHeader } from '../../../../nitro/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

let adminSupabaseClient = null;
function getAdminSupabaseClient() {
  if (!adminSupabaseClient) {
    const config = useRuntimeConfig();
    const SUPABASE_SERVICE_ROLE_KEY = config.public.supabaseServiceKey || config.supabaseServiceKey;
    const SUPABASE_URL = config.public.supabaseUrl;
    if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
      console.error("[Admin Client] Missing SUPABASE_SERVICE_KEY or SUPABASE_URL");
    }
    adminSupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        // 禁止 Admin Client 持久化 Session
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          // 强制使用 Service Role Key 作为 Authorization Header
          // 这能防止 Supabase JS 自动使用 LocalStorage 中的用户 Token 覆盖它
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    });
  }
  return adminSupabaseClient;
}

const contact_get = defineEventHandler(async (event) => {
  const client = getAdminSupabaseClient();
  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
  const { data, error } = await client.from("system_configs").select("value").eq("key", "contact_info").single();
  if (error) {
    return {
      success: true,
      data: {
        wechat_id: "Spotify-cn",
        wechat_qr: "/images/contact/wechat_qr.jpg",
        telegram_id: "@FANTULA_SUPPORT",
        telegram_qr: "/images/contact/telegram_qr.jpg",
        service_time: "10:00 - 23:00"
      }
    };
  }
  return { success: true, data: data.value };
});

export { contact_get as default };
//# sourceMappingURL=contact.get.mjs.map
