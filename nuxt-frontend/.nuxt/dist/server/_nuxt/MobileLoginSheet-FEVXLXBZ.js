import { defineComponent, reactive, ref, computed, watch, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrLooseContain, ssrInterpolate } from "vue/server-renderer";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import { E as EmailInput } from "./EmailInput-BxuFUYqG.js";
import { S as SendCodeButton } from "./SendCodeButton-BHMZfVap.js";
import { b as close_default } from "./index-DNnPa_Q9.js";
import { u as useNotify } from "./useNotify-QNEBBzdZ.js";
import { u as useSendCode } from "./useSendCode-Cwwhl1Ua.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "./base-CEWXqFm3.js";
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-BwQVtIp5.js";
import "./typescript-D6L75muK.js";
import "./icon-Ck0_dGQP.js";
import "./index-_zadwVDN.js";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C5kRDPtv.js";
import "./index-DbvZsXcZ.js";
import "./event-D3FEo2C5.js";
import "./user-DLDq0pTF.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
import "./interval-BnEBQU8I.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPasswordModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = reactive({
      email: "",
      code: "",
      newPassword: ""
    });
    const { warning } = useNotify();
    const {
      loading: codeLoading,
      countdown,
      sendCode: sendOtp
    } = useSendCode({ timerKey: "otp_forgot_timer_end" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value);
    const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email));
    const canSubmit = computed(() => {
      return isValidEmail.value && form.code.length >= 4 && form.newPassword.length >= 6;
    });
    watch(() => props.visible, (val) => {
    });
    const sendCode = async () => {
      if (!isValidEmail.value) {
        warning("请输入有效的邮箱地址");
        return;
      }
      await sendOtp(form.email);
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-f2fa42d9><div class="modal-content aurora-modal-panel" data-v-f2fa42d9><div class="modal-header" data-v-f2fa42d9><h3 class="modal-title" data-v-f2fa42d9>找回密码</h3><button class="close-btn" data-v-f2fa42d9>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-f2fa42d9><form data-v-f2fa42d9><div class="form-item" data-v-f2fa42d9><label data-v-f2fa42d9>邮箱地址</label>`);
          _push2(ssrRenderComponent(EmailInput, {
            modelValue: form.email,
            "onUpdate:modelValue": ($event) => form.email = $event,
            required: true,
            placeholder: "请输入注册邮箱"
          }, null, _parent));
          _push2(`</div><div class="form-item" data-v-f2fa42d9><label data-v-f2fa42d9>验证码</label><div class="input-row" data-v-f2fa42d9><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-f2fa42d9>`);
          _push2(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: unref(countdown),
            onClick: sendCode,
            class: "mobile-send-btn"
          }, null, _parent));
          _push2(`</div></div><div class="form-item" data-v-f2fa42d9><label data-v-f2fa42d9>新密码</label><input${ssrRenderAttr("value", form.newPassword)} type="password" class="aurora-input" placeholder="请输入新密码 (至少6位)" data-v-f2fa42d9></div><button class="aurora-btn-primary" type="submit"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-f2fa42d9>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-f2fa42d9></div>`);
          } else {
            _push2(`<span data-v-f2fa42d9>重置密码</span>`);
          }
          _push2(`</button></form></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/auth/ForgotPasswordModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ForgotPasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f2fa42d9"]]);
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
    const loginForm = ref({ email: "", password: "", remember: false, agree: false });
    const loginCodeForm = ref({ email: "", code: "", remember: false, agree: false });
    const registerForm = ref({ email: "", code: "", password: "", inviteId: "", agree: false });
    const showForgotDialog = ref(false);
    useNotify();
    const {
      loading: loginCodeLoading,
      countdown: codeTimer,
      sendCode: sendLoginCode
    } = useSendCode({ timerKey: "otp_timer_end" });
    const {
      loading: registerCodeLoading,
      countdown: registerCodeTimer,
      sendCode: sendRegisterCode
    } = useSendCode({ timerKey: "otp_register_timer_end" });
    const baseLoading = ref(false);
    const loading = computed(
      () => baseLoading.value || loginCodeLoading.value || registerCodeLoading.value
    );
    const sendCode = async (type) => {
      if (type === "login") {
        await sendLoginCode(loginCodeForm.value.email);
      } else {
        await sendRegisterCode(registerForm.value.email);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="login-sheet-wrapper" data-v-9cf7b317>`);
        if (__props.visible) {
          _push2(`<div class="sheet-overlay" data-v-9cf7b317></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.visible) {
          _push2(`<div class="sheet-panel aurora-sheet-panel" data-v-9cf7b317><div class="sheet-handle-bar" data-v-9cf7b317><div class="sheet-handle" data-v-9cf7b317></div></div><div class="sheet-header" data-v-9cf7b317><div class="h-title" data-v-9cf7b317>欢迎回来</div><div class="h-sub" data-v-9cf7b317>登录您的凡图拉账户</div><div class="auth-tabs" data-v-9cf7b317><div class="${ssrRenderClass([{ active: mode.value === "login" }, "tab-item"])}" data-v-9cf7b317>登录</div><div class="${ssrRenderClass([{ active: mode.value === "register" }, "tab-item"])}" data-v-9cf7b317>注册</div></div></div><div class="sheet-body" data-v-9cf7b317>`);
          if (mode.value === "login") {
            _push2(`<div class="auth-form" data-v-9cf7b317><div class="login-type-switch" data-v-9cf7b317><span class="${ssrRenderClass({ active: loginType.value === "code" })}" data-v-9cf7b317>验证码</span><span class="${ssrRenderClass({ active: loginType.value === "password" })}" data-v-9cf7b317>密码</span></div>`);
            if (loginType.value === "password") {
              _push2(`<form data-v-9cf7b317><div class="input-group" data-v-9cf7b317>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginForm.value.email,
                "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
                required: true,
                placeholder: "请输入邮箱"
              }, null, _parent));
              _push2(`</div><div class="input-group" data-v-9cf7b317><input type="password"${ssrRenderAttr("value", loginForm.value.password)} placeholder="请输入密码" required data-v-9cf7b317></div><div class="form-options" data-v-9cf7b317><label class="checkbox-label" data-v-9cf7b317><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-9cf7b317> 记住我 </label><span class="forgot-btn" data-v-9cf7b317>忘记密码?</span></div><div class="form-agreement" data-v-9cf7b317><label data-v-9cf7b317><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} data-v-9cf7b317><span data-v-9cf7b317>同意 <span class="link" data-v-9cf7b317>用户协议</span> 和 <span class="link" data-v-9cf7b317>隐私政策</span></span></label></div><button class="submit-btn aurora-btn-primary" type="submit"${ssrIncludeBooleanAttr(unref(loading) || !loginForm.value.agree) ? " disabled" : ""} data-v-9cf7b317>${ssrInterpolate(unref(loading) ? "登录中..." : "立即登录")}</button></form>`);
            } else {
              _push2(`<form data-v-9cf7b317><div class="input-group" data-v-9cf7b317>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginCodeForm.value.email,
                "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
                required: true,
                placeholder: "请输入邮箱"
              }, null, _parent));
              _push2(`</div><div class="input-group code-row" data-v-9cf7b317><input type="text"${ssrRenderAttr("value", loginCodeForm.value.code)} placeholder="验证码" required data-v-9cf7b317>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: unref(loading),
                countdown: unref(codeTimer),
                onClick: ($event) => sendCode("login")
              }, null, _parent));
              _push2(`</div><div class="form-agreement" data-v-9cf7b317><label data-v-9cf7b317><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} data-v-9cf7b317><span data-v-9cf7b317>同意 <span class="link" data-v-9cf7b317>用户协议</span> 和 <span class="link" data-v-9cf7b317>隐私政策</span></span></label></div><button class="submit-btn aurora-btn-primary" type="submit"${ssrIncludeBooleanAttr(unref(loading) || !loginCodeForm.value.agree) ? " disabled" : ""} data-v-9cf7b317>${ssrInterpolate(unref(loading) ? "登录中..." : "立即登录")}</button></form>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<div class="auth-form" data-v-9cf7b317><form data-v-9cf7b317><div class="input-group" data-v-9cf7b317>`);
            _push2(ssrRenderComponent(EmailInput, {
              modelValue: registerForm.value.email,
              "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
              required: true,
              placeholder: "请输入邮箱"
            }, null, _parent));
            _push2(`</div><div class="input-group code-row" data-v-9cf7b317><input type="text"${ssrRenderAttr("value", registerForm.value.code)} placeholder="验证码" required data-v-9cf7b317>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: unref(loading),
              countdown: unref(registerCodeTimer),
              onClick: ($event) => sendCode("register")
            }, null, _parent));
            _push2(`</div><div class="input-group" data-v-9cf7b317><input type="password"${ssrRenderAttr("value", registerForm.value.password)} placeholder="设置密码 (至少6位)" required data-v-9cf7b317></div><div class="input-group" data-v-9cf7b317><input type="text"${ssrRenderAttr("value", registerForm.value.inviteId)} placeholder="邀请码 (选填)" data-v-9cf7b317></div><div class="form-agreement" data-v-9cf7b317><label data-v-9cf7b317><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} data-v-9cf7b317><span data-v-9cf7b317>同意 <span class="link" data-v-9cf7b317>用户协议</span> 和 <span class="link" data-v-9cf7b317>隐私政策</span></span></label></div><button class="submit-btn aurora-btn-primary" type="submit"${ssrIncludeBooleanAttr(unref(loading) || !registerForm.value.agree) ? " disabled" : ""} data-v-9cf7b317>${ssrInterpolate(unref(loading) ? "注册中..." : "立即注册")}</button></form></div>`);
          }
          _push2(`<div class="social-login" data-v-9cf7b317><button class="wechat-btn" data-v-9cf7b317><svg class="wechat-icon" viewBox="0 0 24 24" width="22" height="22" data-v-9cf7b317><path fill="#07C160" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.023-.118-.04-.177l-.325-1.233a.49.49 0 0 1 .177-.554c1.525-1.122 2.502-2.779 2.502-4.608-.001-3.248-2.913-5.935-7.061-6.135zm-2.344 3.363c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982zm4.726 0c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982z" data-v-9cf7b317></path></svg><span data-v-9cf7b317>微信</span></button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
        _push2(ssrRenderComponent(ForgotPasswordModal, {
          visible: showForgotDialog.value,
          onClose: ($event) => showForgotDialog.value = false,
          onSuccess: ($event) => showForgotDialog.value = false
        }, null, _parent));
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
const MobileLoginSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9cf7b317"]]);
export {
  MobileLoginSheet as default
};
//# sourceMappingURL=MobileLoginSheet-FEVXLXBZ.js.map
