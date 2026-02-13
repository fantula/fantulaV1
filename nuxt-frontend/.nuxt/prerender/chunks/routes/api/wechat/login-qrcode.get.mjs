import { defineEventHandler, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { g as getSupabaseServiceClient } from '../../../_/supabase.mjs';
import { b as generateLoginScene, c as createParametricQrCode, d as getQrCodeImageUrl } from '../../../_/wechat-login.mjs';
import '../../../nitro/nitro.mjs';
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
import '../../../_/wechat-pay.mjs';

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
