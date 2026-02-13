import { d as defineEventHandler, c as createError } from '../../../../../nitro/nitro.mjs';
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
