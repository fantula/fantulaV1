import { createClient } from "@supabase/supabase-js";
import { j as useRuntimeConfig } from "../server.mjs";
let adminSupabaseClient = null;
function getAdminSupabaseClient() {
  if (!adminSupabaseClient) {
    const config = useRuntimeConfig();
    const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NzA2MTA3NTMsImV4cCI6MzMzMDY2MTA3NTN9.BTj9UDuBTBV_8eQJ6FjJc2XijmtJpvncsekPN-dhiXg";
    const SUPABASE_URL = config.public.supabaseUrl;
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
//# sourceMappingURL=supabase-admin-C2P8hOJs.js.map
