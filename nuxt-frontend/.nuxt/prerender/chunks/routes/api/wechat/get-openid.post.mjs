import { defineEventHandler, createError, readBody } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { a as getCurrentUser, g as getSupabaseServiceClient } from '../../../_/supabase.mjs';
import { getWechatPayConfig } from '../../../_/wechat-pay.mjs';
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

const getOpenid_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { code } = body;
    if (!code) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u6388\u6743 code"
      });
    }
    const config = getWechatPayConfig();
    if (!config.appid || !config.appSecret) {
      throw createError({
        statusCode: 500,
        message: "\u5FAE\u4FE1\u914D\u7F6E\u9519\u8BEF"
      });
    }
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.errcode) {
      console.error("[GetOpenId] WeChat API error:", result);
      throw createError({
        statusCode: 400,
        message: result.errmsg || "\u83B7\u53D6 OpenID \u5931\u8D25"
      });
    }
    console.log("[GetOpenId] Got openid:", result.openid);
    const supabase = getSupabaseServiceClient();
    const { error: updateError } = await supabase.from("profiles").update({
      wechat_openid: result.openid
    }).eq("id", user.id);
    if (updateError) {
      console.error("[GetOpenId] Failed to update profile openid:", updateError);
    }
    return {
      success: true,
      data: {
        openid: result.openid
      }
    };
  } catch (err) {
    console.error("[GetOpenId] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u83B7\u53D6 OpenID \u5931\u8D25"
    });
  }
});

export { getOpenid_post as default };
//# sourceMappingURL=get-openid.post.mjs.map
