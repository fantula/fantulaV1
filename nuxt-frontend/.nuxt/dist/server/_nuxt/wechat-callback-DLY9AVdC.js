/* empty css              */
/* empty css                    */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { _ as _export_sfc } from "../server.mjs";
import "./auth-BCuS92ob.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wechat-callback",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    useUserStore();
    const state = ref("loading");
    const errorMsg = ref("");
    ref("");
    const loading = ref(false);
    const bindForm = ref({
      email: "",
      code: "",
      password: "",
      agree: false,
      nickname: void 0,
      avatar: void 0
    });
    const codeTimer = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wechat-callback-page" }, _attrs))} data-v-a1de30b0>`);
      if (state.value === "loading") {
        _push(`<div class="callback-loading" data-v-a1de30b0><div class="spinner" data-v-a1de30b0></div><p data-v-a1de30b0>正在处理登录...</p></div>`);
      } else if (state.value === "bind") {
        _push(`<div class="callback-bind" data-v-a1de30b0><div class="bind-header" data-v-a1de30b0><div class="success-icon" data-v-a1de30b0>🎉</div><h2 data-v-a1de30b0>微信授权成功</h2><p data-v-a1de30b0>请绑定邮箱以完成登录</p></div><form class="bind-form" data-v-a1de30b0><div class="input-group" data-v-a1de30b0><input${ssrRenderAttr("value", bindForm.value.email)} type="email" placeholder="请输入邮箱" required data-v-a1de30b0></div><div class="input-group code-row" data-v-a1de30b0><input${ssrRenderAttr("value", bindForm.value.code)} type="text" placeholder="验证码" required data-v-a1de30b0><button type="button" class="send-code-btn"${ssrIncludeBooleanAttr(codeTimer.value > 0) ? " disabled" : ""} data-v-a1de30b0>${ssrInterpolate(codeTimer.value > 0 ? `${codeTimer.value}s` : "发送")}</button></div><div class="input-group" data-v-a1de30b0><input${ssrRenderAttr("value", bindForm.value.password)} type="password" placeholder="设置密码（可选）" data-v-a1de30b0></div><div class="form-agreement" data-v-a1de30b0><label data-v-a1de30b0><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(bindForm.value.agree) ? ssrLooseContain(bindForm.value.agree, null) : bindForm.value.agree) ? " checked" : ""} data-v-a1de30b0><span data-v-a1de30b0>同意 <span class="link" data-v-a1de30b0>用户协议</span> 和 <span class="link" data-v-a1de30b0>隐私政策</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !bindForm.value.agree) ? " disabled" : ""} data-v-a1de30b0>${ssrInterpolate(loading.value ? "绑定中..." : "绑定并登录")}</button></form></div>`);
      } else if (state.value === "success") {
        _push(`<div class="callback-success" data-v-a1de30b0><div class="success-icon" data-v-a1de30b0>✅</div><p data-v-a1de30b0>登录成功，正在跳转...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="callback-error" data-v-a1de30b0><div class="error-icon" data-v-a1de30b0>❌</div><p data-v-a1de30b0>${ssrInterpolate(errorMsg.value)}</p><button class="retry-btn" data-v-a1de30b0>返回首页</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/wechat-callback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wechatCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1de30b0"]]);
export {
  wechatCallback as default
};
//# sourceMappingURL=wechat-callback-DLY9AVdC.js.map
