import { d as defineEventHandler, q as setHeader } from '../../../../nitro/nitro.mjs';
import { g as getAdminSupabaseClient } from '../../../../_/supabase-admin.mjs';
import '@supabase/supabase-js';
import 'zod';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import 'consola';
import 'node:url';
import 'fast-xml-parser';
import 'ipx';

const contact_get = defineEventHandler(async (event) => {
  const client = getAdminSupabaseClient();
  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
  const { data, error } = await client.from("system_configs").select("value").eq("key", "contact_info").single();
  if (error) {
    return {
      success: true,
      data: {
        wechat_id: "Spotify-cn",
        wechat_qr: "/images/contact/wechat_qr.jpg",
        telegram_id: "@FANTULA_SUPPORT",
        telegram_qr: "/images/contact/telegram_qr.jpg",
        service_time: "10:00 - 23:00"
      }
    };
  }
  return { success: true, data: data.value };
});

export { contact_get as default };
//# sourceMappingURL=contact.get.mjs.map
