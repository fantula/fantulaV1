import { defineEventHandler, getHeader, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig, v as validateBody, c as createUserSchema, m as mapSupabaseError } from '../../../../nitro/nitro.mjs';
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

const create_post = defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader) {
      throw createError({ statusCode: 401, statusMessage: "No token" });
    }
    const token = authHeader.replace("Bearer ", "");
    const config = useRuntimeConfig();
    const authClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey);
    const { data: { user: caller }, error: callerError } = await authClient.auth.getUser(token);
    if (callerError || !caller) {
      throw createError({ statusCode: 401, statusMessage: "Invalid token" });
    }
    const adminClient = getAdminSupabaseClient();
    const { data: adminCaller, error: adminError } = await adminClient.from("admin_users").select("id, status").eq("auth_user_id", caller.id).single();
    if (adminError || !adminCaller || adminCaller.status !== "enabled") {
      throw createError({ statusCode: 403, statusMessage: "Unauthorized: Admin access required" });
    }
    const body = await validateBody(event, createUserSchema);
    const { email, password, name, department_id, status } = body;
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "admin" }
    });
    if (authError) {
      throw authError;
    }
    if (!authData.user) {
      throw createError({ statusCode: 500, statusMessage: "Auth user creation returned no data" });
    }
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const password_hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    const { data: newUser, error: dbError } = await adminClient.from("admin_users").insert({
      name,
      email,
      password_hash,
      auth_user_id: authData.user.id,
      department_id: department_id || null,
      // Zod handles optional/null
      status: status || "enabled"
    }).select().single();
    if (dbError) {
      await adminClient.auth.admin.deleteUser(authData.user.id);
      throw dbError;
    }
    return { success: true, user: newUser };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
