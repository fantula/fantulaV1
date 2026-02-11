import { defineEventHandler, readBody, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import { b as getWechatPayConfig, g as getSupabaseServiceClient } from '../../../_/wechat-pay.mjs';
import { a as generateBindToken } from '../../../_/wechat-login.mjs';
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

const oauthLogin_post = defineEventHandler(async (event) => {
  var _a;
  try {
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
    if (result.errcode || !result.openid) {
      console.error("[OAuthLogin] WeChat API error:", result);
      throw createError({
        statusCode: 400,
        message: result.errmsg || "\u5FAE\u4FE1\u6388\u6743\u5931\u8D25"
      });
    }
    const access_token = result.access_token;
    const openid = result.openid;
    console.log("[OAuthLogin] Got openid:", openid);
    let userInfo = {};
    try {
      const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
      const userRes = await fetch(userInfoUrl);
      userInfo = await userRes.json();
      console.log("[OAuthLogin] Got config:", { nickname: userInfo.nickname });
    } catch (e) {
      console.warn("[OAuthLogin] Failed to fetch user info:", e);
    }
    const supabaseAdmin = getSupabaseServiceClient();
    const { data: profile } = await supabaseAdmin.from("profiles").select("id, email, nickname, avatar").eq("wechat_openid", openid).single();
    if (profile) {
      const updates = {};
      if (userInfo.nickname && !profile.nickname) updates.nickname = userInfo.nickname;
      if (userInfo.headimgurl && !profile.avatar) updates.avatar = userInfo.headimgurl;
      if (Object.keys(updates).length > 0) {
        await supabaseAdmin.from("profiles").update(updates).eq("id", profile.id);
      }
      let actionLink = null;
      if (profile.email) {
        const config2 = useRuntimeConfig();
        const baseUrl = config2.public.siteUrl || "https://www.fantula.com";
        const finalDestination = body.redirectTo || "/mobile";
        const callbackUrl = `${baseUrl}/mobile/wechat-callback?return_to=${encodeURIComponent(finalDestination)}`;
        console.log("[OAuthLogin] Magic Link RedirectTo:", callbackUrl);
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: profile.email,
          options: {
            redirectTo: callbackUrl
          }
        });
        if (!linkError && ((_a = linkData == null ? void 0 : linkData.properties) == null ? void 0 : _a.action_link)) {
          actionLink = linkData.properties.action_link;
        } else {
          console.error("[OAuthLogin] Failed to generate magic link:", linkError);
        }
      }
      return {
        success: true,
        data: {
          status: "logged_in",
          message: "\u767B\u5F55\u6210\u529F",
          userId: profile.id,
          email: profile.email,
          nickname: updates.nickname || profile.nickname,
          avatar: updates.avatar || profile.avatar,
          openid,
          actionLink
          // 返回 Magic Link
        }
      };
    } else {
      const bindToken = generateBindToken(openid);
      return {
        success: true,
        data: {
          status: "need_bind",
          message: "\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55",
          bindToken,
          nickname: userInfo.nickname,
          avatar: userInfo.headimgurl
        }
      };
    }
  } catch (err) {
    console.error("[OAuthLogin] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u767B\u5F55\u5931\u8D25"
    });
  }
});

export { oauthLogin_post as default };
//# sourceMappingURL=oauth-login.post.mjs.map
