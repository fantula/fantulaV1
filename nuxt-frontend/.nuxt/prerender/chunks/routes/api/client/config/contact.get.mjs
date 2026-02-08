import { defineEventHandler, setHeader } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
import { createClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';

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
