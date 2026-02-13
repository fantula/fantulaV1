import { d as defineEventHandler, r as readBody, c as createError } from '../../../../../nitro/nitro.mjs';
import { s as sendNotification } from '../../../../../_/email.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../../../../../_/supabase.mjs';
import '@supabase/supabase-js';

const test_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.event_type || !body.to) {
    throw createError({ statusCode: 400, statusMessage: "Missing event_type or to address" });
  }
  const templateData = body.data || {};
  const result = await sendNotification(body.event_type, body.to, templateData);
  if (!result.success) {
    throw createError({
      statusCode: 500,
      statusMessage: result.message || "Send failed"
    });
  }
  return {
    success: true,
    message: "Test email sent successfully"
  };
});

export { test_post as default };
//# sourceMappingURL=test.post.mjs.map
