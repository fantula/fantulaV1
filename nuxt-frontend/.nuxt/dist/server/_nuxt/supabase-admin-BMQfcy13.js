import { createClient } from "@supabase/supabase-js";
import { j as useRuntimeConfig } from "../server.mjs";
let adminSupabaseClient = null;
function getAdminSupabaseClient() {
  if (!adminSupabaseClient) {
    const config = useRuntimeConfig();
    const SUPABASE_SERVICE_ROLE_KEY = config.supabaseServiceKey;
    const SUPABASE_URL = config.public.supabaseUrl;
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      console.error("❌ [Admin Client] Missing SUPABASE_SERVICE_KEY in runtimeConfig");
      throw new Error("Server configuration error: Missing Service Key");
    }
    adminSupabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
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
//# sourceMappingURL=supabase-admin-BMQfcy13.js.map
