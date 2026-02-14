import { d as defineEventHandler, F as generateLoginScene, G as createParametricQrCode, f as getSupabaseServiceClient, c as createError, H as getQrCodeImageUrl } from '../../../nitro/nitro.mjs';
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

const loginQrcode_get = defineEventHandler(async (event) => {
  try {
    const sceneStr = generateLoginScene();
    const qrResult = await createParametricQrCode(sceneStr, 300);
    const supabase = getSupabaseServiceClient();
    const expiresAt = new Date(Date.now() + 300 * 1e3).toISOString();
    const { error: insertError } = await supabase.from("wechat_login_sessions").insert({
      scene_str: sceneStr,
      ticket: qrResult.ticket,
      status: "waiting",
      expires_at: expiresAt
    });
    if (insertError) {
      console.error("[LoginQrCode] Insert session failed:", insertError);
      throw createError({
        statusCode: 500,
        message: "\u521B\u5EFA\u767B\u5F55\u4F1A\u8BDD\u5931\u8D25"
      });
    }
    return {
      success: true,
      data: {
        sceneStr,
        ticket: qrResult.ticket,
        qrcodeUrl: getQrCodeImageUrl(qrResult.ticket),
        expiresIn: qrResult.expireSeconds
      }
    };
  } catch (err) {
    console.error("[LoginQrCode] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u751F\u6210\u4E8C\u7EF4\u7801\u5931\u8D25"
    });
  }
});

export { loginQrcode_get as default };
//# sourceMappingURL=login-qrcode.get.mjs.map
