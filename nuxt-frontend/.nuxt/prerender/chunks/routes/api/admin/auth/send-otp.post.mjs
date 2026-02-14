import { defineEventHandler, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { v as validateBody, s as sendOtpSchema, u as useRuntimeConfig, m as mapSupabaseError } from '../../../../nitro/nitro.mjs';
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

const sendOtp_post = defineEventHandler(async (event) => {
  try {
    const body = await validateBody(event, sendOtpSchema);
    const { email } = body;
    const adminClient = getAdminSupabaseClient();
    const config = useRuntimeConfig();
    const { data: adminData, error: fetchError } = await adminClient.from("admin_users").select("id, status, auth_user_id").eq("email", email).single();
    if (fetchError || !adminData) {
      throw createError({ statusCode: 403, statusMessage: "\u90AE\u7BB1\u672A\u6CE8\u518C\u4E3A\u7BA1\u7406\u5458" });
    }
    if (adminData.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u7528" });
    }
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseAnonKey = config.public.supabaseAnonKey;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    const shouldCreateUser = !adminData.auth_user_id;
    const { error } = await authClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser
      }
    });
    if (error) {
      if (error.message.includes("Signups not allowed")) {
        throw createError({ statusCode: 403, statusMessage: "\u8D26\u53F7\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u8054\u7CFB\u8D85\u7EA7\u7BA1\u7406\u5458" });
      }
      throw error;
    }
    return { success: true };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

export { sendOtp_post as default };
//# sourceMappingURL=send-otp.post.mjs.map
