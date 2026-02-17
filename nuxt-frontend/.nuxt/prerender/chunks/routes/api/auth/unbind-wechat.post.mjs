import { defineEventHandler, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { b as getCurrentUser, g as getSupabaseServiceClient } from '../../../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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

const unbindWechat_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u8BF7\u5148\u767B\u5F55"
      });
    }
    const supabase = getSupabaseServiceClient();
    const { data: profile, error: fetchError } = await supabase.from("profiles").select("wechat_openid").eq("id", user.id).single();
    if (fetchError || !profile) {
      throw createError({
        statusCode: 404,
        message: "\u7528\u6237\u8D44\u6599\u4E0D\u5B58\u5728"
      });
    }
    if (!profile.wechat_openid) {
      return {
        success: true,
        message: "\u5F53\u524D\u672A\u7ED1\u5B9A\u5FAE\u4FE1"
      };
    }
    const { error: updateError } = await supabase.from("profiles").update({
      wechat_openid: null,
      wechat_unionid: null,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
      // Now we can use this!
    }).eq("id", user.id);
    if (updateError) {
      console.error("[UnbindWechat] Failed to unbind:", updateError);
      throw createError({
        statusCode: 500,
        message: "\u89E3\u7ED1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
      });
    }
    console.log("[UnbindWechat] Success for user:", user.id);
    return {
      success: true,
      message: "\u5FAE\u4FE1\u89E3\u7ED1\u6210\u529F"
    };
  } catch (err) {
    console.error("[UnbindWechat] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u89E3\u7ED1\u5931\u8D25"
    });
  }
});

export { unbindWechat_post as default };
//# sourceMappingURL=unbind-wechat.post.mjs.map
