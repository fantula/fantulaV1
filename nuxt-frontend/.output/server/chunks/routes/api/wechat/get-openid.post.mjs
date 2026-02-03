import { d as defineEventHandler, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { a as getCurrentUser, b as getWechatPayConfig, g as getSupabaseServiceClient } from '../../../_/wechat-pay.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@supabase/supabase-js';
import 'crypto';

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
    await supabase.from("profiles").update({
      wechat_openid: result.openid,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", user.id);
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
