import { defineEventHandler, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { g as getSupabaseServiceClient } from '../../../../../_/supabase.mjs';
import '../../../../../nitro/nitro.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';

const templates_get = defineEventHandler(async (event) => {
  console.log("[API] /admin/system/notifications/templates called");
  try {
    const client = getSupabaseServiceClient();
    console.log("[API] Client initialized");
    const { data, error } = await client.from("notification_templates").select("*").order("event_type");
    if (error) {
      console.error("[API] Supabase Error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      });
    }
    console.log(`[API] Found ${data == null ? void 0 : data.length} templates`);
    return {
      success: true,
      data
    };
  } catch (e) {
    console.error("[API] Unexpected Error:", e);
    throw e;
  }
});

export { templates_get as default };
//# sourceMappingURL=templates.get.mjs.map
