import { defineComponent, ref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { a as authApi } from './user-Cnuc6I82.mjs';
import { _ as _export_sfc } from './server.mjs';
import { E as EmailInput } from './EmailInput-BxuFUYqG.mjs';
import { S as SendCodeButton } from './SendCodeButton-BHMZfVap.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';
import './install-VBSKbHUK.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './index-DlETah8a.mjs';
import './index-jl2vZbkg.mjs';
import './objects-Bz74KHmq.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './event-D3FEo2C5.mjs';

const COOLDOWN = 60;
const TIMER_KEY = "mobile_auth_timer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileLoginSheet",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const mode = ref("login");
    const loginType = ref("code");
    const loading = ref(false);
    const loginForm = ref({ email: "", password: "", remember: false, agree: false });
    const loginCodeForm = ref({ email: "", code: "", remember: false, agree: false });
    const registerForm = ref({ email: "", code: "", password: "", inviteId: "", agree: false });
    const codeTimer = ref(0);
    let codeInterval = null;
    const startTimer = (seconds, fresh = true) => {
      codeTimer.value = seconds;
      if (fresh) localStorage.setItem(TIMER_KEY, (Date.now() + seconds * 1e3).toString());
      if (codeInterval) clearInterval(codeInterval);
      codeInterval = setInterval();
    };
    const sendCode = async (type) => {
      if (codeTimer.value > 0) return;
      const email = type === "register" ? registerForm.value.email : loginCodeForm.value.email;
      if (!email) return ElMessage.warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
      loading.value = true;
      try {
        const res = await authApi.getEmailCode(email);
        if (res.success) {
          ElMessage.success("\u53D1\u9001\u6210\u529F");
          startTimer(COOLDOWN);
        } else ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
      } catch (e) {
        ElMessage.error("\u7F51\u7EDC\u9519\u8BEF");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="login-sheet-wrapper" data-v-8b178d92>`);
        if (__props.visible) {
          _push2(`<div class="sheet-overlay" data-v-8b178d92></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.visible) {
          _push2(`<div class="sheet-panel" data-v-8b178d92><div class="sheet-handle-bar" data-v-8b178d92><div class="sheet-handle" data-v-8b178d92></div></div><div class="sheet-header" data-v-8b178d92><div class="h-title" data-v-8b178d92>\u6B22\u8FCE\u56DE\u6765</div><div class="h-sub" data-v-8b178d92>\u767B\u5F55\u60A8\u7684\u51E1\u56FE\u62C9\u8D26\u6237</div><div class="auth-tabs" data-v-8b178d92><div class="${ssrRenderClass([{ active: mode.value === "login" }, "tab-item"])}" data-v-8b178d92>\u767B\u5F55</div><div class="${ssrRenderClass([{ active: mode.value === "register" }, "tab-item"])}" data-v-8b178d92>\u6CE8\u518C</div></div></div><div class="sheet-body" data-v-8b178d92>`);
          if (mode.value === "login") {
            _push2(`<div class="auth-form" data-v-8b178d92><div class="login-type-switch" data-v-8b178d92><span class="${ssrRenderClass({ active: loginType.value === "code" })}" data-v-8b178d92>\u9A8C\u8BC1\u7801</span><span class="${ssrRenderClass({ active: loginType.value === "password" })}" data-v-8b178d92>\u5BC6\u7801</span></div>`);
            if (loginType.value === "password") {
              _push2(`<form data-v-8b178d92><div class="input-group" data-v-8b178d92>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginForm.value.email,
                "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
                required: true,
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
              }, null, _parent));
              _push2(`</div><div class="input-group" data-v-8b178d92><input type="password"${ssrRenderAttr("value", loginForm.value.password)} placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" required data-v-8b178d92></div><div class="form-options" data-v-8b178d92><label class="checkbox-label" data-v-8b178d92><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-8b178d92> \u8BB0\u4F4F\u6211 </label><span class="forgot-btn" data-v-8b178d92>\u5FD8\u8BB0\u5BC6\u7801?</span></div><div class="form-agreement" data-v-8b178d92><label data-v-8b178d92><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} data-v-8b178d92><span data-v-8b178d92>\u540C\u610F <span class="link" data-v-8b178d92>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-8b178d92>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !loginForm.value.agree) ? " disabled" : ""} data-v-8b178d92>${ssrInterpolate(loading.value ? "\u767B\u5F55\u4E2D..." : "\u7ACB\u5373\u767B\u5F55")}</button></form>`);
            } else {
              _push2(`<form data-v-8b178d92><div class="input-group" data-v-8b178d92>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginCodeForm.value.email,
                "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
                required: true,
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
              }, null, _parent));
              _push2(`</div><div class="input-group code-row" data-v-8b178d92><input type="text"${ssrRenderAttr("value", loginCodeForm.value.code)} placeholder="\u9A8C\u8BC1\u7801" required data-v-8b178d92>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: codeTimer.value,
                onClick: ($event) => sendCode("login")
              }, null, _parent));
              _push2(`</div><div class="form-agreement" data-v-8b178d92><label data-v-8b178d92><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} data-v-8b178d92><span data-v-8b178d92>\u540C\u610F <span class="link" data-v-8b178d92>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-8b178d92>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !loginCodeForm.value.agree) ? " disabled" : ""} data-v-8b178d92>${ssrInterpolate(loading.value ? "\u767B\u5F55\u4E2D..." : "\u7ACB\u5373\u767B\u5F55")}</button></form>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<div class="auth-form" data-v-8b178d92><form data-v-8b178d92><div class="input-group" data-v-8b178d92>`);
            _push2(ssrRenderComponent(EmailInput, {
              modelValue: registerForm.value.email,
              "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
              required: true,
              placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
            }, null, _parent));
            _push2(`</div><div class="input-group code-row" data-v-8b178d92><input type="text"${ssrRenderAttr("value", registerForm.value.code)} placeholder="\u9A8C\u8BC1\u7801" required data-v-8b178d92>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: codeTimer.value,
              onClick: ($event) => sendCode("register")
            }, null, _parent));
            _push2(`</div><div class="input-group" data-v-8b178d92><input type="password"${ssrRenderAttr("value", registerForm.value.password)} placeholder="\u8BBE\u7F6E\u5BC6\u7801 (\u81F3\u5C116\u4F4D)" required data-v-8b178d92></div><div class="input-group" data-v-8b178d92><input type="text"${ssrRenderAttr("value", registerForm.value.inviteId)} placeholder="\u9080\u8BF7\u7801 (\u9009\u586B)" data-v-8b178d92></div><div class="form-agreement" data-v-8b178d92><label data-v-8b178d92><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} data-v-8b178d92><span data-v-8b178d92>\u540C\u610F <span class="link" data-v-8b178d92>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-8b178d92>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !registerForm.value.agree) ? " disabled" : ""} data-v-8b178d92>${ssrInterpolate(loading.value ? "\u6CE8\u518C\u4E2D..." : "\u7ACB\u5373\u6CE8\u518C")}</button></form></div>`);
          }
          _push2(`<div class="social-login" data-v-8b178d92><button class="wechat-btn" data-v-8b178d92><svg class="wechat-icon" viewBox="0 0 24 24" width="22" height="22" data-v-8b178d92><path fill="#07C160" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.023-.118-.04-.177l-.325-1.233a.49.49 0 0 1 .177-.554c1.525-1.122 2.502-2.779 2.502-4.608-.001-3.248-2.913-5.935-7.061-6.135zm-2.344 3.363c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982zm4.726 0c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982z" data-v-8b178d92></path></svg><span data-v-8b178d92>\u5FAE\u4FE1</span></button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/auth/MobileLoginSheet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileLoginSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8b178d92"]]);

export { MobileLoginSheet as default };
//# sourceMappingURL=MobileLoginSheet-DO0eXnQ-.mjs.map
