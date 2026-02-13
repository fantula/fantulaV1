import { defineEventHandler, readBody, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
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

const templates_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = getSupabaseServiceClient();
  if (!body.id || !body.event_type) {
    throw createError({ statusCode: 400, statusMessage: "Missing ID or Event Type" });
  }
  const updates = {};
  if (body.subject_template !== void 0) updates.subject_template = body.subject_template;
  if (body.body_template !== void 0) updates.body_template = body.body_template;
  if (body.is_enabled !== void 0) updates.is_enabled = body.is_enabled;
  updates.updated_at = (/* @__PURE__ */ new Date()).toISOString();
  const { data, error } = await client.from("notification_templates").update(updates).eq("id", body.id).select().single();
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
  return {
    success: true,
    data
  };
});

export { templates_post as default };
//# sourceMappingURL=templates.post.mjs.map
