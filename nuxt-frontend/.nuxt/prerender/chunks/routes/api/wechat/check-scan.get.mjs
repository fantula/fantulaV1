import { defineEventHandler, getQuery, createError } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import { g as getSupabaseServiceClient } from '../../../_/supabase.mjs';
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
import '../../../_/wechat-pay.mjs';

const checkScan_get = defineEventHandler(async (event) => {
  var _a;
  try {
    const query = getQuery(event);
    const sceneStr = query.scene;
    if (!sceneStr) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11 scene \u53C2\u6570"
      });
    }
    const supabase = getSupabaseServiceClient();
    const { data: session, error } = await supabase.from("wechat_login_sessions").select("*").eq("scene_str", sceneStr).single();
    if (error || !session) {
      return {
        success: true,
        data: {
          status: "expired",
          message: "\u4F1A\u8BDD\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F"
        }
      };
    }
    if (new Date(session.expires_at) < /* @__PURE__ */ new Date()) {
      return {
        success: true,
        data: {
          status: "expired",
          message: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u5237\u65B0"
        }
      };
    }
    if (session.status === "waiting") {
      return {
        success: true,
        data: {
          status: "waiting",
          message: "\u7B49\u5F85\u626B\u7801"
        }
      };
    }
    if (session.status === "scanned" && session.openid) {
      const { data: profile } = await supabase.from("profiles").select("id, email, nickname").eq("wechat_openid", session.openid).single();
      if (profile) {
        const { createClient } = await import('file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs');
        const config = useRuntimeConfig();
        const supabaseAdmin = createClient(
          config.public.supabaseUrl,
          config.supabaseServiceKey
        );
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: profile.email
        });
        if (linkError || !((_a = linkData.properties) == null ? void 0 : _a.action_link)) {
          console.error("[CheckScan] Generate link failed:", linkError);
          console.error("[CheckScan] Link data:", JSON.stringify(linkData));
          return {
            success: true,
            data: {
              status: "error",
              message: "\u751F\u6210\u767B\u5F55\u94FE\u63A5\u5931\u8D25\uFF0C\u8BF7\u5C1D\u8BD5\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F",
              error_detail: (linkError == null ? void 0 : linkError.message) || "action_link missing"
            }
          };
        }
        let actionLink = linkData.properties.action_link;
        if (actionLink) {
          try {
            const publicSupabaseUrl = config.public.supabaseUrl;
            if (actionLink.startsWith("/")) {
              if (publicSupabaseUrl) {
                const baseUrl = publicSupabaseUrl.replace(/\/$/, "");
                const path = actionLink.replace(/^\//, "");
                actionLink = `${baseUrl}/${path}`;
                console.log("[CheckScan] Fixed relative link to:", actionLink);
              } else {
                console.warn("[CheckScan] Relative link found but publicSupabaseUrl is missing");
              }
            }
            let urlObj = new URL(actionLink);
            if (publicSupabaseUrl && (urlObj.hostname.includes("localhost") || urlObj.hostname.includes("127.0.0.1"))) {
              const supabaseUrlObj = new URL(publicSupabaseUrl);
              urlObj.protocol = supabaseUrlObj.protocol;
              urlObj.host = supabaseUrlObj.host;
              console.log("[CheckScan] Fixed localhost base URL to:", urlObj.toString());
            }
            const siteUrl = config.public.siteUrl || "https://www.fantula.com";
            urlObj.searchParams.set("redirect_to", siteUrl);
            actionLink = urlObj.toString();
            console.log("[CheckScan] Enforced Action Link:", actionLink);
          } catch (e) {
            console.warn("[CheckScan] Failed to fix link:", e);
          }
        }
        return {
          success: true,
          data: {
            status: "logged_in",
            message: "\u767B\u5F55\u6210\u529F",
            userId: profile.id,
            email: profile.email,
            nickname: profile.nickname,
            action_link: actionLink
          }
        };
      } else {
        const bindToken = generateBindToken(session.openid);
        return {
          success: true,
          data: {
            status: "need_bind",
            message: "\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55",
            bindToken
          }
        };
      }
    }
    if (session.status === "bound") {
      return {
        success: true,
        data: {
          status: "bound",
          message: "\u7ED1\u5B9A\u5B8C\u6210"
        }
      };
    }
    return {
      success: true,
      data: {
        status: session.status,
        message: "\u672A\u77E5\u72B6\u6001"
      }
    };
  } catch (err) {
    console.error("[CheckScan] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u67E5\u8BE2\u72B6\u6001\u5931\u8D25"
    });
  }
});

export { checkScan_get as default };
//# sourceMappingURL=check-scan.get.mjs.map
