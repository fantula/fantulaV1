import { d as defineEventHandler, r as readBody, b as getSupabaseServiceClient, j as getCurrentUser, c as createError, y as verifyBindToken, z as getWechatUserInfo, u as useRuntimeConfig, x as sendNotification } from '../../../nitro/nitro.mjs';
import 'crypto';
import '@supabase/supabase-js';
import 'zod';
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

const bindWechat_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    const supabase = getSupabaseServiceClient();
    const currentUser = await getCurrentUser(event);
    if (currentUser) {
      if (body.wechatCode) {
        return await bindWechatToExistingUser(supabase, currentUser.id, body.wechatCode);
      }
      if (body.bindToken) {
        return await bindWechatToExistingUserByToken(supabase, currentUser.id, body.bindToken);
      }
    }
    if (!body.bindToken) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u7ED1\u5B9A\u51ED\u8BC1"
      });
    }
    const tokenResult = verifyBindToken(body.bindToken);
    if (!tokenResult.valid || !tokenResult.openid) {
      throw createError({
        statusCode: 400,
        message: tokenResult.error || "\u7ED1\u5B9A\u51ED\u8BC1\u65E0\u6548\u6216\u5DF2\u8FC7\u671F"
      });
    }
    let openid = tokenResult.openid;
    let unionid;
    try {
      const userInfo = await getWechatUserInfo(openid);
      if (userInfo.unionid) unionid = userInfo.unionid;
    } catch (e) {
      console.warn("[BindWechat] Failed to fetch user info:", e);
    }
    if (!body.email) {
      throw createError({
        statusCode: 400,
        message: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740"
      });
    }
    if (!body.code) {
      throw createError({
        statusCode: 400,
        message: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
      });
    }
    const { data: existingProfile } = await supabase.from("profiles").select("id, email").eq("wechat_openid", openid).single();
    if (existingProfile) {
      throw createError({
        statusCode: 400,
        message: "\u6B64\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7"
      });
    }
    const { createClient } = await import('@supabase/supabase-js');
    const config = useRuntimeConfig();
    const anonClient = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    );
    let authData;
    let verifyError;
    const resEmail = await anonClient.auth.verifyOtp({
      email: body.email,
      token: body.code,
      type: "email"
    });
    if (!resEmail.error) {
      authData = resEmail.data;
      verifyError = null;
    } else {
      console.log("[BindWechat] verifyOtp(type=email) failed:", resEmail.error.message);
      const resSignup = await anonClient.auth.verifyOtp({
        email: body.email,
        token: body.code,
        type: "signup"
      });
      if (!resSignup.error) {
        console.log("[BindWechat] verifyOtp(type=signup) succeeded");
        authData = resSignup.data;
        verifyError = null;
      } else {
        verifyError = resEmail.error;
        if (resSignup.error.message !== resEmail.error.message) {
          console.log("[BindWechat] verifyOtp(type=signup) failed:", resSignup.error.message);
        }
      }
    }
    if (verifyError || !(authData == null ? void 0 : authData.user)) {
      throw createError({
        statusCode: 400,
        message: "\u9A8C\u8BC1\u7801\u9519\u8BEF\u6216\u5DF2\u8FC7\u671F"
      });
    }
    if (!authData.user) {
      throw createError({
        statusCode: 500,
        message: "\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
      });
    }
    if (body.password) {
      await anonClient.auth.updateUser({
        password: body.password
      });
    }
    const { data: userProfile } = await supabase.from("profiles").select("id").eq("id", authData.user.id).single();
    if (!userProfile) {
      console.log("[BindWechat] Profile not found, creating manually for user:", authData.user.id);
      const uid = Math.floor(1e7 + Math.random() * 9e7).toString();
      const { error: insertError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        uid,
        email: authData.user.email,
        nickname: body.nickname || ((_a = authData.user.email) == null ? void 0 : _a.split("@")[0]) || "User",
        avatar: body.avatar || "",
        status: "active",
        balance: 0,
        wechat_openid: openid,
        wechat_unionid: unionid
      });
      if (insertError) {
        if (insertError.message.includes("duplicate")) {
          console.warn("[BindWechat] Profile insert failed (duplicate), falling back to update for user:", authData.user.id);
          const { error: fallbackUpdateError } = await supabase.from("profiles").update({
            wechat_openid: openid,
            wechat_unionid: unionid,
            nickname: body.nickname || void 0,
            avatar: body.avatar || void 0,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("id", authData.user.id);
          if (fallbackUpdateError) {
            console.error("[BindWechat] Fallback update failed:", fallbackUpdateError);
            throw createError({
              statusCode: 500,
              message: "\u7ED1\u5B9A\u5931\u8D25\uFF08\u66F4\u65B0\u8D26\u6237\u65F6\u51FA\u9519\uFF09"
            });
          }
        } else {
          console.error("[BindWechat] Insert profile failed:", insertError);
          throw createError({
            statusCode: 500,
            message: "\u521B\u5EFA\u8D26\u6237\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
          });
        }
      }
    } else {
      const { error: updateError } = await supabase.from("profiles").update({
        wechat_openid: openid,
        wechat_unionid: unionid,
        nickname: body.nickname || void 0,
        avatar: body.avatar || void 0,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", authData.user.id);
      if (updateError) {
        console.error("[BindWechat] Update profile failed:", updateError);
        throw createError({
          statusCode: 500,
          message: "\u7ED1\u5B9A\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
        });
      }
    }
    console.log("[BindWechat] Successfully bound:", { userId: authData.user.id, openid });
    if (authData.user.email) {
      sendNotification("account_welcome", authData.user.email, {
        nickname: body.nickname || authData.user.email.split("@")[0] || "\u65B0\u7528\u6237"
      }).catch((e) => console.error("[BindWechat] Welcome email error:", e));
    }
    return {
      success: true,
      message: "\u7ED1\u5B9A\u6210\u529F",
      data: {
        user: authData.user,
        session: authData.session
      }
    };
  } catch (err) {
    console.error("[BindWechat] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u7ED1\u5B9A\u5931\u8D25"
    });
  }
});
async function bindWechatToExistingUser(supabase, userId, wechatCode) {
  const { getWechatPayConfig } = await import('../../../nitro/nitro.mjs').then(function (n) { return n.aq; });
  const config = getWechatPayConfig();
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${wechatCode}&grant_type=authorization_code`;
  const response = await fetch(url);
  const result = await response.json();
  if (result.errcode || !result.openid) {
    throw createError({
      statusCode: 400,
      message: result.errmsg || "\u5FAE\u4FE1\u6388\u6743\u5931\u8D25"
    });
  }
  return await performBinding(supabase, userId, result.openid, result.unionid);
}
async function bindWechatToExistingUserByToken(supabase, userId, bindToken) {
  const tokenResult = verifyBindToken(bindToken);
  if (!tokenResult.valid || !tokenResult.openid) {
    throw createError({
      statusCode: 400,
      message: tokenResult.error || "\u7ED1\u5B9A\u51ED\u8BC1\u65E0\u6548\u6216\u5DF2\u8FC7\u671F"
    });
  }
  let unionid;
  try {
    const userInfo = await getWechatUserInfo(tokenResult.openid);
    if (userInfo.unionid) unionid = userInfo.unionid;
  } catch (e) {
    console.warn("[BindWechat] Failed to fetch unionid:", e);
  }
  return await performBinding(supabase, userId, tokenResult.openid, unionid);
}
async function performBinding(supabase, userId, openid, unionid) {
  const { data: existingProfile } = await supabase.from("profiles").select("id, wechat_unionid").eq("wechat_openid", openid).single();
  if (existingProfile) {
    if (existingProfile.id === userId) {
      if (unionid && !existingProfile.wechat_unionid) {
        await supabase.from("profiles").update({ wechat_unionid: unionid }).eq("id", userId);
        console.log("[BindWechat] Backfilled missing unionid for user:", userId);
      }
      return {
        success: true,
        message: "\u60A8\u5DF2\u7ED1\u5B9A\u8BE5\u5FAE\u4FE1",
        data: { openid }
      };
    }
    throw createError({
      statusCode: 400,
      message: "\u6B64\u5FAE\u4FE1\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u8D26\u53F7"
    });
  }
  const { error } = await supabase.from("profiles").update({
    wechat_openid: openid,
    wechat_unionid: unionid
  }).eq("id", userId);
  if (error) {
    throw createError({
      statusCode: 500,
      message: "\u7ED1\u5B9A\u5931\u8D25"
    });
  }
  return {
    success: true,
    message: "\u5FAE\u4FE1\u7ED1\u5B9A\u6210\u529F",
    data: {
      openid
    }
  };
}

export { bindWechat_post as default };
//# sourceMappingURL=bind-wechat.post.mjs.map
