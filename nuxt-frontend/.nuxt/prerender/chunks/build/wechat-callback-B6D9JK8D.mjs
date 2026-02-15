import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useUserStore, a as authApi } from './user-DLDq0pTF.mjs';
import { _ as _export_sfc, l as useGlobalLoading } from './server.mjs';
import { u as useNotify } from './useNotify-BkAlUoZx.mjs';
import { E as EmailInput } from './EmailInput-BxuFUYqG.mjs';
import { S as SendCodeButton } from './SendCodeButton-BHMZfVap.mjs';
import { u as useSendCode } from './useSendCode-BC5HK1oO.mjs';
import { E as ElMessageBox } from './index-TRxueLL5.mjs';
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
import './useToast-DsT-1f4c.mjs';
import './index-CQnGB6WT.mjs';
import './install-VBSKbHUK.mjs';
import './typescript-D6L75muK.mjs';
import './icon-D-Vgi0cb.mjs';
import './index-CbQ9NNm4.mjs';
import './index-C4aUwruK.mjs';
import './objects-Bz74KHmq.mjs';
import './use-global-config-CaR6i8cb.mjs';
import './index-C1njJNPQ.mjs';
import './event-D3FEo2C5.mjs';
import './interval-BnEBQU8I.mjs';
import './index-BOdp6qaH.mjs';
import './use-form-item-BJm4fR6K.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-CYgslNeO.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './index-DuyRWKSc.mjs';
import './aria-Rs9hkxop.mjs';
import './index-BxcbCFKt.mjs';
import './vnode-uc6o_sOa.mjs';
import './focus-trap.vue-DI9LAhPg.mjs';
import './validator-BiwSbFK3.mjs';
import './index-COtmEGfB.mjs';
import './scroll-ozMyDWSO.mjs';
import './raf-CQRaPAjg.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wechat-callback",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    useUserStore();
    const { error, warning } = useNotify();
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
      countdown: codeTimer,
      sendCode: sendBindCode
    } = useSendCode({ timerKey: "wechat_bind_timer" });
    const baseLoading = ref(false);
    const uniqueLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value || uniqueLoading.value);
    useGlobalLoading();
    const sendCode = async () => {
      if (loading.value || codeTimer.value > 0) return;
      if (!bindForm.value.email) {
        warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
        return;
      }
      uniqueLoading.value = true;
      try {
        const checkRes = await authApi.checkEmailAvailable(bindForm.value.email);
        if (!checkRes.success) {
          error(checkRes.msg || "\u68C0\u67E5\u90AE\u7BB1\u5931\u8D25");
          return;
        }
        const emailAvailable = checkRes.data;
        if (!emailAvailable) {
          try {
            await ElMessageBox.confirm(
              "\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u5176\u4ED6\u8D26\u53F7\u6CE8\u518C\u3002\u7EE7\u7EED\u7ED1\u5B9A\u5C06\u628A\u6B64\u5FAE\u4FE1\u53F7\u5173\u8054\u5230\u8BE5\u73B0\u6709\u8D26\u53F7\uFF0C\u5E76\u5171\u4EAB\u6743\u76CA\u3002",
              "\u8D26\u53F7\u5408\u5E76\u63D0\u793A",
              {
                confirmButtonText: "\u786E\u8BA4\u5173\u8054",
                cancelButtonText: "\u66F4\u6362\u90AE\u7BB1",
                type: "warning",
                customClass: "mobile-msg-box",
                // Custom Style
                showClose: false,
                center: true
              }
            );
          } catch {
            return;
          }
        }
        await sendBindCode(bindForm.value.email);
      } catch (err) {
        console.error(err);
        error("\u53D1\u9001\u5931\u8D25: " + (err.message || "\u7F51\u7EDC\u9519\u8BEF"));
      } finally {
        uniqueLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wechat-callback-page" }, _attrs))} data-v-6e5bfa26>`);
      if (state.value === "loading") {
        _push(`<div class="callback-loading" data-v-6e5bfa26><div class="spinner" data-v-6e5bfa26></div><p data-v-6e5bfa26>\u6B63\u5728\u5904\u7406\u767B\u5F55...</p></div>`);
      } else if (state.value === "bind") {
        _push(`<div class="callback-bind" data-v-6e5bfa26><div class="bind-header" data-v-6e5bfa26><div class="success-icon" data-v-6e5bfa26>\u{1F389}</div><h2 data-v-6e5bfa26>\u5FAE\u4FE1\u6388\u6743\u6210\u529F</h2><p data-v-6e5bfa26>\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55</p></div><form class="bind-form" data-v-6e5bfa26><div class="input-group" data-v-6e5bfa26>`);
        _push(ssrRenderComponent(EmailInput, {
          modelValue: bindForm.value.email,
          "onUpdate:modelValue": ($event) => bindForm.value.email = $event,
          required: true,
          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
        }, null, _parent));
        _push(`</div><div class="input-group code-row" data-v-6e5bfa26><input${ssrRenderAttr("value", bindForm.value.code)} type="text" placeholder="\u9A8C\u8BC1\u7801" required class="custom-input" data-v-6e5bfa26>`);
        _push(ssrRenderComponent(SendCodeButton, {
          loading: loading.value,
          countdown: unref(codeTimer),
          onClick: sendCode
        }, null, _parent));
        _push(`</div><div class="input-group" data-v-6e5bfa26><input${ssrRenderAttr("value", bindForm.value.password)} type="password" placeholder="\u8BBE\u7F6E\u5BC6\u7801\uFF08\u53EF\u9009\uFF09" class="custom-input" data-v-6e5bfa26></div><div class="form-agreement" data-v-6e5bfa26><label data-v-6e5bfa26><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(bindForm.value.agree) ? ssrLooseContain(bindForm.value.agree, null) : bindForm.value.agree) ? " checked" : ""} data-v-6e5bfa26><span data-v-6e5bfa26>\u540C\u610F <span class="link" data-v-6e5bfa26>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-6e5bfa26>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn aurora-btn-primary" type="submit"${ssrIncludeBooleanAttr(loading.value || !bindForm.value.agree) ? " disabled" : ""} data-v-6e5bfa26>${ssrInterpolate(loading.value ? "\u7ED1\u5B9A\u4E2D..." : "\u7ED1\u5B9A\u5E76\u767B\u5F55")}</button></form></div>`);
      } else if (state.value === "success") {
        _push(`<div class="callback-success" data-v-6e5bfa26><div class="success-icon" data-v-6e5bfa26>\u2705</div><p data-v-6e5bfa26>\u767B\u5F55\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="callback-error" data-v-6e5bfa26><div class="error-icon" data-v-6e5bfa26>\u274C</div><p data-v-6e5bfa26>${ssrInterpolate(errorMsg.value)}</p><button class="retry-btn" data-v-6e5bfa26>\u8FD4\u56DE\u9996\u9875</button></div>`);
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
const wechatCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6e5bfa26"]]);

export { wechatCallback as default };
//# sourceMappingURL=wechat-callback-B6D9JK8D.mjs.map
