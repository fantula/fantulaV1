import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useUserStore } from './user-0iCypJz1.mjs';
import { _ as _export_sfc, l as useGlobalLoading } from './server.mjs';
import { u as useSendCode } from './useSendCode-DUIi8Gb_.mjs';
import './supabase-Ds8OQlZJ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './interval-BnEBQU8I.mjs';
import './useNotify-CME3DTm8.mjs';
import './useToast-DsT-1f4c.mjs';
import './index-CK1iG7c1.mjs';
import './index-CRs4T-Jf.mjs';
import './typescript-D6L75muK.mjs';
import './icon-DxnRhcjj.mjs';
import './index-D6MDXFfa.mjs';
import './objects-Bz74KHmq.mjs';
import './use-global-config-C00m4e8W.mjs';
import './index-C8K_s-bH.mjs';
import './event-D3FEo2C5.mjs';

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
        _push(`<div class="callback-loading" data-v-20a80c3a><div class="spinner" data-v-20a80c3a></div><p data-v-20a80c3a>\u6B63\u5728\u5904\u7406\u767B\u5F55...</p></div>`);
      } else if (state.value === "bind") {
        _push(`<div class="callback-bind" data-v-20a80c3a><div class="bind-header" data-v-20a80c3a><div class="success-icon" data-v-20a80c3a>\u{1F389}</div><h2 data-v-20a80c3a>\u5FAE\u4FE1\u6388\u6743\u6210\u529F</h2><p data-v-20a80c3a>\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55</p></div><form class="bind-form" data-v-20a80c3a><div class="input-group" data-v-20a80c3a><input${ssrRenderAttr("value", bindForm.value.email)} type="email" placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1" required data-v-20a80c3a></div><div class="input-group code-row" data-v-20a80c3a><input${ssrRenderAttr("value", bindForm.value.code)} type="text" placeholder="\u9A8C\u8BC1\u7801" required data-v-20a80c3a><button type="button" class="send-code-btn"${ssrIncludeBooleanAttr(unref(codeTimer) > 0) ? " disabled" : ""} data-v-20a80c3a>${ssrInterpolate(unref(codeTimer) > 0 ? `${unref(codeTimer)}s` : "\u53D1\u9001")}</button></div><div class="input-group" data-v-20a80c3a><input${ssrRenderAttr("value", bindForm.value.password)} type="password" placeholder="\u8BBE\u7F6E\u5BC6\u7801\uFF08\u53EF\u9009\uFF09" data-v-20a80c3a></div><div class="form-agreement" data-v-20a80c3a><label data-v-20a80c3a><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(bindForm.value.agree) ? ssrLooseContain(bindForm.value.agree, null) : bindForm.value.agree) ? " checked" : ""} data-v-20a80c3a><span data-v-20a80c3a>\u540C\u610F <span class="link" data-v-20a80c3a>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-20a80c3a>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(unref(loading) || !bindForm.value.agree) ? " disabled" : ""} data-v-20a80c3a>${ssrInterpolate(unref(loading) ? "\u7ED1\u5B9A\u4E2D..." : "\u7ED1\u5B9A\u5E76\u767B\u5F55")}</button></form></div>`);
      } else if (state.value === "success") {
        _push(`<div class="callback-success" data-v-20a80c3a><div class="success-icon" data-v-20a80c3a>\u2705</div><p data-v-20a80c3a>\u767B\u5F55\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="callback-error" data-v-20a80c3a><div class="error-icon" data-v-20a80c3a>\u274C</div><p data-v-20a80c3a>${ssrInterpolate(errorMsg.value)}</p><button class="retry-btn" data-v-20a80c3a>\u8FD4\u56DE\u9996\u9875</button></div>`);
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

export { wechatCallback as default };
//# sourceMappingURL=wechat-callback-CBHBfH6h.mjs.map
