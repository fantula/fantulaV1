import { createClient } from "@supabase/supabase-js";
import { b as useRuntimeConfig } from "../server.mjs";
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
export {
  getAdminSupabaseClient as g
};
//# sourceMappingURL=supabase-admin-Yv96kmWU.js.map
