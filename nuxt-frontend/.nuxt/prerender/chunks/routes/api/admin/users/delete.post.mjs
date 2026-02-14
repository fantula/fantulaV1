import { defineEventHandler, getHeader, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig, v as validateBody, d as deleteUserSchema, m as mapSupabaseError } from '../../../../nitro/nitro.mjs';
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

const delete_post = defineEventHandler(async (event) => {
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
    const body = await validateBody(event, deleteUserSchema);
    const { id } = body;
    const { data: targetUser, error: fetchError } = await adminClient.from("admin_users").select("auth_user_id").eq("id", id).single();
    if (fetchError || !targetUser) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }
    const { error: deleteError } = await adminClient.from("admin_users").delete().eq("id", id);
    if (deleteError) {
      throw deleteError;
    }
    if (targetUser.auth_user_id) {
      const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(targetUser.auth_user_id);
      if (authDeleteError) {
        console.error(`Failed to delete auth user ${targetUser.auth_user_id}:`, authDeleteError.message);
      }
    }
    return { success: true };
  } catch (err) {
    throw mapSupabaseError(err);
  }
});

export { delete_post as default };
//# sourceMappingURL=delete.post.mjs.map
