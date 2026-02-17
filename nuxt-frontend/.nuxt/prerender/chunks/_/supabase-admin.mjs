import { u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { createClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';

let adminSupabaseClient = null;
function getAdminSupabaseClient() {
  if (!adminSupabaseClient) {
    const config = useRuntimeConfig();
    const SUPABASE_SERVICE_ROLE_KEY = config.supabaseServiceKey;
    const SUPABASE_URL = config.public.supabaseUrl;
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      console.error("\u274C [Admin Client] Missing SUPABASE_SERVICE_KEY in runtimeConfig");
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

export { getAdminSupabaseClient as g };
//# sourceMappingURL=supabase-admin.mjs.map
