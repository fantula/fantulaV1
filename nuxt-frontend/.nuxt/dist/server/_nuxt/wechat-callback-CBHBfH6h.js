/* empty css              */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-0iCypJz1.js";
import { l as useGlobalLoading, _ as _export_sfc } from "../server.mjs";
import { u as useSendCode } from "./useSendCode-DUIi8Gb_.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
import "./interval-BnEBQU8I.js";
import "./useNotify-CME3DTm8.js";
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-CK1iG7c1.js";
import "./index-CRs4T-Jf.js";
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "./index-D6MDXFfa.js";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "./event-D3FEo2C5.js";
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
    const bindForm = ref({
      email: "",
      code: "",
      password: "",
      agree: false,
      nickname: void 0,
      avatar: void 0
    });
    const {
      loading: codeLoading,
      countdown: codeTimer
    } = useSendCode({ timerKey: "wechat_bind_timer" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value);
    useGlobalLoading();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wechat-callback-page" }, _attrs))} data-v-20a80c3a>`);
      if (state.value === "loading") {
        _push(`<div class="callback-loading" data-v-20a80c3a><div class="spinner" data-v-20a80c3a></div><p data-v-20a80c3a>正在处理登录...</p></div>`);
      } else if (state.value === "bind") {
        _push(`<div class="callback-bind" data-v-20a80c3a><div class="bind-header" data-v-20a80c3a><div class="success-icon" data-v-20a80c3a>🎉</div><h2 data-v-20a80c3a>微信授权成功</h2><p data-v-20a80c3a>请绑定邮箱以完成登录</p></div><form class="bind-form" data-v-20a80c3a><div class="input-group" data-v-20a80c3a><input${ssrRenderAttr("value", bindForm.value.email)} type="email" placeholder="请输入邮箱" required data-v-20a80c3a></div><div class="input-group code-row" data-v-20a80c3a><input${ssrRenderAttr("value", bindForm.value.code)} type="text" placeholder="验证码" required data-v-20a80c3a><button type="button" class="send-code-btn"${ssrIncludeBooleanAttr(unref(codeTimer) > 0) ? " disabled" : ""} data-v-20a80c3a>${ssrInterpolate(unref(codeTimer) > 0 ? `${unref(codeTimer)}s` : "发送")}</button></div><div class="input-group" data-v-20a80c3a><input${ssrRenderAttr("value", bindForm.value.password)} type="password" placeholder="设置密码（可选）" data-v-20a80c3a></div><div class="form-agreement" data-v-20a80c3a><label data-v-20a80c3a><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(bindForm.value.agree) ? ssrLooseContain(bindForm.value.agree, null) : bindForm.value.agree) ? " checked" : ""} data-v-20a80c3a><span data-v-20a80c3a>同意 <span class="link" data-v-20a80c3a>用户协议</span> 和 <span class="link" data-v-20a80c3a>隐私政策</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(unref(loading) || !bindForm.value.agree) ? " disabled" : ""} data-v-20a80c3a>${ssrInterpolate(unref(loading) ? "绑定中..." : "绑定并登录")}</button></form></div>`);
      } else if (state.value === "success") {
        _push(`<div class="callback-success" data-v-20a80c3a><div class="success-icon" data-v-20a80c3a>✅</div><p data-v-20a80c3a>登录成功，正在跳转...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="callback-error" data-v-20a80c3a><div class="error-icon" data-v-20a80c3a>❌</div><p data-v-20a80c3a>${ssrInterpolate(errorMsg.value)}</p><button class="retry-btn" data-v-20a80c3a>返回首页</button></div>`);
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
const wechatCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-20a80c3a"]]);
export {
  wechatCallback as default
};
//# sourceMappingURL=wechat-callback-CBHBfH6h.js.map
