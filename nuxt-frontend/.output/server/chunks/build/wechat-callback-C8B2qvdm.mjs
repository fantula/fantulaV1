import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useUserStore } from './user-C1i1UnhA.mjs';
import { u as useSendCode } from './useSendCode-BPjllPca.mjs';
import { _ as _export_sfc } from './server.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';
import './common-D9iMPQj0.mjs';
import './cart-B8xez9id.mjs';
import './interval-BHZX8LlC.mjs';
import './index-Ho-fELR6.mjs';
import './index-DuV_oMrC.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CyvpkMdQ.mjs';
import './index-CsSUb8pm.mjs';
import './objects-Bz74KHmq.mjs';
import './use-global-config-Dt87SALX.mjs';
import './index-xMedQC9S.mjs';
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wechat-callback-page" }, _attrs))} data-v-620812a7>`);
      if (state.value === "loading") {
        _push(`<div class="callback-loading" data-v-620812a7><div class="spinner" data-v-620812a7></div><p data-v-620812a7>\u6B63\u5728\u5904\u7406\u767B\u5F55...</p></div>`);
      } else if (state.value === "bind") {
        _push(`<div class="callback-bind" data-v-620812a7><div class="bind-header" data-v-620812a7><div class="success-icon" data-v-620812a7>\u{1F389}</div><h2 data-v-620812a7>\u5FAE\u4FE1\u6388\u6743\u6210\u529F</h2><p data-v-620812a7>\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55</p></div><form class="bind-form" data-v-620812a7><div class="input-group" data-v-620812a7><input${ssrRenderAttr("value", bindForm.value.email)} type="email" placeholder="\u8BF7\u8F93\u5165\u90AE\u7BB1" required data-v-620812a7></div><div class="input-group code-row" data-v-620812a7><input${ssrRenderAttr("value", bindForm.value.code)} type="text" placeholder="\u9A8C\u8BC1\u7801" required data-v-620812a7><button type="button" class="send-code-btn"${ssrIncludeBooleanAttr(unref(codeTimer) > 0) ? " disabled" : ""} data-v-620812a7>${ssrInterpolate(unref(codeTimer) > 0 ? `${unref(codeTimer)}s` : "\u53D1\u9001")}</button></div><div class="input-group" data-v-620812a7><input${ssrRenderAttr("value", bindForm.value.password)} type="password" placeholder="\u8BBE\u7F6E\u5BC6\u7801\uFF08\u53EF\u9009\uFF09" data-v-620812a7></div><div class="form-agreement" data-v-620812a7><label data-v-620812a7><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(bindForm.value.agree) ? ssrLooseContain(bindForm.value.agree, null) : bindForm.value.agree) ? " checked" : ""} data-v-620812a7><span data-v-620812a7>\u540C\u610F <span class="link" data-v-620812a7>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-620812a7>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(unref(loading) || !bindForm.value.agree) ? " disabled" : ""} data-v-620812a7>${ssrInterpolate(unref(loading) ? "\u7ED1\u5B9A\u4E2D..." : "\u7ED1\u5B9A\u5E76\u767B\u5F55")}</button></form></div>`);
      } else if (state.value === "success") {
        _push(`<div class="callback-success" data-v-620812a7><div class="success-icon" data-v-620812a7>\u2705</div><p data-v-620812a7>\u767B\u5F55\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="callback-error" data-v-620812a7><div class="error-icon" data-v-620812a7>\u274C</div><p data-v-620812a7>${ssrInterpolate(errorMsg.value)}</p><button class="retry-btn" data-v-620812a7>\u8FD4\u56DE\u9996\u9875</button></div>`);
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
const wechatCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-620812a7"]]);

export { wechatCallback as default };
//# sourceMappingURL=wechat-callback-C8B2qvdm.mjs.map
