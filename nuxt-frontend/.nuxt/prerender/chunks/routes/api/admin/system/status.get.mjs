import { defineEventHandler, getHeader, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../../nitro/nitro.mjs';
import { g as getAdminSupabaseClient } from '../../../../_/supabase-admin.mjs';
import { createClient } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';

const status_get = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: "No token" });
    }
    const token = authHeader.replace("Bearer ", "");
    const config = useRuntimeConfig();
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
    const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token);
    if (callerError) {
      console.error("Auth User Check Failed:", callerError);
    }
    if (callerError || !caller) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    const adminClient = getAdminSupabaseClient();
    const { data: adminCaller, error: adminError } = await adminClient.from("admin_users").select("id, status").eq("auth_user_id", caller.id).single();
    if (adminError || !adminCaller || adminCaller.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
    }
    const results = {
      db: { status: "success", message: "Connected", latency: 0 },
      storage: { status: "success", message: "Connected" }
    };
    const start = Date.now();
    const { error: dbError } = await adminClient.from("admin_users").select("id").limit(1);
    results.db.latency = Date.now() - start;
    if (dbError) {
      results.db.status = "danger";
      results.db.message = "Error: " + dbError.message;
    } else {
      results.db.message = `Connected (Latency: ${results.db.latency}ms)`;
    }
    const { error: storageError } = await adminClient.storage.listBuckets();
    if (storageError) {
      results.storage.status = "danger";
      results.storage.message = "Error: " + storageError.message;
    }
    return { success: true, results };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      results: {
        db: { status: "danger", message: "Check Failed" },
        storage: { status: "danger", message: "Check Failed" }
      }
    };
  }
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
