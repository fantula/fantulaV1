import { defineEventHandler, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { v as validateBody, l as loginBaseSchema, u as useRuntimeConfig, p as passwordLoginSchema, a as verifyOtpSchema, m as mapSupabaseError } from '../../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const baseBody = await validateBody(event, loginBaseSchema);
    const { type } = baseBody;
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseAnonKey = config.public.supabaseAnonKey;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    const adminClient = getAdminSupabaseClient();
    let authResult;
    let email = "";
    if (type === "password") {
      const { email: e, password } = await validateBody(event, passwordLoginSchema);
      email = e;
      authResult = await authClient.auth.signInWithPassword({ email, password });
    } else {
      const { email: e, code } = await validateBody(event, verifyOtpSchema);
      email = e;
      authResult = await authClient.auth.verifyOtp({ email, token: code, type: "email" });
    }
    const { data, error } = authResult;
    if (error) {
      throw error;
    }
    if (!(data == null ? void 0 : data.session)) {
      throw createError({ statusCode: 401, statusMessage: "Unable to start session" });
    }
    const userId = data.session.user.id;
    const userEmail = data.session.user.email;
    let { data: adminData, error: adminError } = await adminClient.from("admin_users").select(`
        *,
        department:admin_departments(id, name, permissions)
    `).eq("auth_user_id", userId).single();
    if ((adminError || !adminData) && type === "otp") {
      const { data: adminByEmail } = await adminClient.from("admin_users").select(`*, department:admin_departments(id, name, permissions)`).eq("email", userEmail).single();
      if (adminByEmail) {
        await adminClient.from("admin_users").update({ auth_user_id: userId }).eq("id", adminByEmail.id);
        adminData = adminByEmail;
      }
    }
    if (!adminData) {
      await authClient.auth.signOut();
      throw createError({ statusCode: 403, statusMessage: "\u8BE5\u8D26\u53F7\u4E0D\u662F\u7BA1\u7406\u5458" });
    }
    if (adminData.status !== "enabled") {
      await authClient.auth.signOut();
      throw createError({ statusCode: 403, statusMessage: "\u8BE5\u8D26\u53F7\u5DF2\u88AB\u7981\u7528" });
    }
    return {
      success: true,
      session: data.session,
      adminInfo: adminData
    };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
