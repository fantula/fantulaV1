import { d as defineEventHandler, r as readBody, c as createError } from '../../../../../nitro/nitro.mjs';
import { g as getSupabaseServiceClient } from '../../../../../_/supabase.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@supabase/supabase-js';

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
