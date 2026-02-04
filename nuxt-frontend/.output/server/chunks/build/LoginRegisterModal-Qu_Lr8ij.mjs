import { _ as __nuxt_component_0 } from './nuxt-link-DErVm1dK.mjs';
import { defineComponent, ref, watch, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { a as authApi } from './auth-BCuS92ob.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { useRouter, useRoute } from 'vue-router';
import { E as EmailInput, S as SendCodeButton } from './SendCodeButton-Bt2-2zIY.mjs';
import { B as BaseButton } from './BaseButton-B3srPw2H.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';

const TIMER_KEY_CODE = "otp_timer_end";
const TIMER_KEY_FORGOT = "otp_forgot_timer_end";
const COOLDOWN_SECONDS = 300;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoginRegisterModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRouter();
    useRoute();
    const mode = ref("login");
    const loginType = ref("code");
    const codeTimer = ref(0);
    let codeInterval = null;
    const wechatState = ref("loading");
    const wechatQrcodeUrl = ref("");
    const wechatSceneStr = ref("");
    const wechatBindToken = ref("");
    const wechatPollingHint = ref("\u7B49\u5F85\u626B\u7801...");
    const wechatErrorMsg = ref("");
    const wechatBindForm = ref({ email: "", code: "", password: "", agree: false });
    const wechatBindCodeTimer = ref(0);
    let wechatBindCodeInterval = null;
    const loginForm = ref({ email: "", password: "", remember: false, agree: false });
    const loginCodeForm = ref({ email: "", code: "", password: "", remember: false, agree: false });
    const registerForm = ref({ email: "", code: "", password: "", inviteId: "", agree: false });
    const loginEmailInput = ref(null);
    const loginCodeEmailInput = ref(null);
    const registerEmailInput = ref(null);
    const showPrivacyDialog = ref(false);
    const showPolicyDialog = ref(false);
    const showForgotDialog = ref(false);
    const forgotForm = ref({ email: "", code: "", password: "" });
    const forgotCodeTimer = ref(0);
    let forgotCodeInterval = null;
    const loading = ref(false);
    const focusInput = () => {
      nextTick(() => {
        var _a, _b, _c;
        if (mode.value === "login") {
          if (loginType.value === "password") (_a = loginEmailInput.value) == null ? void 0 : _a.focus();
          else (_b = loginCodeEmailInput.value) == null ? void 0 : _b.focus();
        } else {
          (_c = registerEmailInput.value) == null ? void 0 : _c.focus();
        }
      });
    };
    watch([mode, loginType, () => props.visible], () => {
      if (props.visible) focusInput();
    });
    const startTimer = (timerRef, intervalRef, seconds, storageKey, isNew = true) => {
      timerRef.value = seconds;
      if (isNew) {
        const endTime = Date.now() + seconds * 1e3;
        localStorage.setItem(storageKey, endTime.toString());
      }
      if (intervalRef) clearInterval(intervalRef);
      return setInterval();
    };
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    function sendCode(type) {
      if (codeTimer.value > 0) return;
      const email = type === "register" ? registerForm.value.email : loginCodeForm.value.email;
      if (!email) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
        return;
      }
      if (!isValidEmail(email)) {
        ElMessage.warning("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E");
        return;
      }
      loading.value = true;
      const apiCall = authApi.getEmailCode(email);
      apiCall.then((res) => {
        if (res.success) {
          ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\uFF0C\u8BF7\u6CE8\u610F\u67E5\u6536");
          codeInterval = startTimer(codeTimer, codeInterval, COOLDOWN_SECONDS, TIMER_KEY_CODE);
        } else {
          ElMessage.error(res.msg || "\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25");
      }).finally(() => {
        loading.value = false;
      });
    }
    function sendForgotCode() {
      if (forgotCodeTimer.value > 0) return;
      if (!forgotForm.value.email) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
        return;
      }
      if (!isValidEmail(forgotForm.value.email)) {
        ElMessage.warning("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E");
        return;
      }
      loading.value = true;
      authApi.sendOtp(forgotForm.value.email).then((res) => {
        if (res.success) {
          ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001");
          forgotCodeInterval = startTimer(forgotCodeTimer, forgotCodeInterval, COOLDOWN_SECONDS, TIMER_KEY_FORGOT);
        } else {
          ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25");
      }).finally(() => {
        loading.value = false;
      });
    }
    function oauth(type) {
      const client = getSupabaseClient();
      client.auth.signInWithOAuth({ provider: type });
    }
    function sendWechatBindCode() {
      if (wechatBindCodeTimer.value > 0) return;
      if (!wechatBindForm.value.email) {
        ElMessage.warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
        return;
      }
      if (!isValidEmail(wechatBindForm.value.email)) {
        ElMessage.warning("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E");
        return;
      }
      loading.value = true;
      authApi.getEmailCode(wechatBindForm.value.email).then((res) => {
        if (res.success) {
          ElMessage.success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001");
          wechatBindCodeInterval = startTimer(wechatBindCodeTimer, wechatBindCodeInterval, COOLDOWN_SECONDS, "wechat_bind_timer");
        } else {
          ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "\u53D1\u9001\u5931\u8D25");
      }).finally(() => {
        loading.value = false;
      });
    }
    watch(() => props.visible, (val) => {
      if (!val) {
        wechatState.value = "loading";
        wechatQrcodeUrl.value = "";
        wechatSceneStr.value = "";
        wechatBindToken.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[-->`);
      if (__props.visible) {
        _push(`<div class="modal-mask" data-v-5be3eea5><div class="login-modal" data-v-5be3eea5><div class="modal-header" data-v-5be3eea5><div class="modal-header-inner" data-v-5be3eea5><div class="modal-title" data-v-5be3eea5>\u51E1\u56FE\u62C9</div><div class="modal-subtitle" data-v-5be3eea5>\u6B22\u8FCE\u56DE\u6765\uFF0C\u8BF7\u767B\u5F55\u60A8\u7684\u8D26\u6237</div><div class="modal-tabs" data-v-5be3eea5>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "tab",
          class: ["tab-btn", { active: mode.value === "login" }],
          onClick: ($event) => mode.value = "login"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u767B\u5F55`);
            } else {
              return [
                createTextVNode("\u767B\u5F55")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(BaseButton, {
          themeId: "tab",
          class: ["tab-btn", { active: mode.value === "register" }],
          onClick: ($event) => mode.value = "register"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u6CE8\u518C`);
            } else {
              return [
                createTextVNode("\u6CE8\u518C")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button class="modal-close" data-v-5be3eea5>\xD7</button></div></div><div class="modal-body" data-v-5be3eea5><div class="modal-form-area" data-v-5be3eea5>`);
        if (mode.value === "login") {
          _push(`<div class="modal-form-tabs" data-v-5be3eea5><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "code" }])}" data-v-5be3eea5>\u9A8C\u8BC1\u7801\u767B\u5F55</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "password" }])}" data-v-5be3eea5>\u5BC6\u7801\u767B\u5F55</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "wechat" }])}" data-v-5be3eea5>\u5FAE\u4FE1\u767B\u5F55</button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (mode.value === "login" && loginType.value === "password") {
          _push(`<form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u90AE\u7BB1\u5730\u5740</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: loginForm.value.email,
            "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
            ref_key: "loginEmailInput",
            ref: loginEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u5BC6\u7801</label><input${ssrRenderAttr("value", loginForm.value.password)} type="password" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" required data-v-5be3eea5></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-5be3eea5> \u8BB0\u4F4F\u6211</label><a class="forgot-link" data-v-5be3eea5>\u5FD8\u8BB0\u5BC6\u7801\uFF1F</a></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> \u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u300A\u9690\u79C1\u534F\u8BAE\u300B`);
              } else {
                return [
                  createTextVNode("\u300A\u9690\u79C1\u534F\u8BAE\u300B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` \u548C `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u300A\u7528\u6237\u653F\u7B56\u300B`);
              } else {
                return [
                  createTextVNode("\u300A\u7528\u6237\u653F\u7B56\u300B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</label></div>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "primary",
            block: "",
            class: "submit-action",
            type: "submit",
            loading: loading.value,
            disabled: loading.value || !loginForm.value.agree
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(loading.value ? "\u767B\u5F55\u4E2D..." : "\u767B\u5F55")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(loading.value ? "\u767B\u5F55\u4E2D..." : "\u767B\u5F55"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="google-login-wrap" data-v-5be3eea5>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "social-google",
            block: "",
            type: "button",
            onClick: ($event) => oauth("google")
          }, {
            icon: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5be3eea5${_scopeId}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-5be3eea5${_scopeId}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-5be3eea5${_scopeId}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-5be3eea5${_scopeId}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-5be3eea5${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                      fill: "#4285F4"
                    }),
                    createVNode("path", {
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                      fill: "#34A853"
                    }),
                    createVNode("path", {
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z",
                      fill: "#FBBC05"
                    }),
                    createVNode("path", {
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                      fill: "#EA4335"
                    })
                  ]))
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Google \u767B\u5F55 `);
              } else {
                return [
                  createTextVNode(" Google \u767B\u5F55 ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form>`);
        } else if (mode.value === "login" && loginType.value === "code") {
          _push(`<form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u90AE\u7BB1\u5730\u5740</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: loginCodeForm.value.email,
            "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
            ref_key: "loginCodeEmailInput",
            ref: loginCodeEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group code-group" data-v-5be3eea5><input${ssrRenderAttr("value", loginCodeForm.value.code)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" required data-v-5be3eea5>`);
          _push(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: codeTimer.value,
            onClick: ($event) => sendCode("login")
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.remember) ? ssrLooseContain(loginCodeForm.value.remember, null) : loginCodeForm.value.remember) ? " checked" : ""} data-v-5be3eea5> \u8BB0\u4F4F\u6211</label></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> \u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u300A\u9690\u79C1\u534F\u8BAE\u300B`);
              } else {
                return [
                  createTextVNode("\u300A\u9690\u79C1\u534F\u8BAE\u300B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` \u548C `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u300A\u7528\u6237\u653F\u7B56\u300B`);
              } else {
                return [
                  createTextVNode("\u300A\u7528\u6237\u653F\u7B56\u300B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</label></div>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "primary",
            block: "",
            class: "submit-action",
            type: "submit",
            loading: loading.value,
            disabled: loading.value || !loginCodeForm.value.agree
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(loading.value ? "\u767B\u5F55\u4E2D..." : "\u767B\u5F55")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(loading.value ? "\u767B\u5F55\u4E2D..." : "\u767B\u5F55"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="google-login-wrap" data-v-5be3eea5>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "social-google",
            block: "",
            type: "button",
            onClick: ($event) => oauth("google")
          }, {
            icon: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5be3eea5${_scopeId}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-5be3eea5${_scopeId}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-5be3eea5${_scopeId}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-5be3eea5${_scopeId}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-5be3eea5${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                      fill: "#4285F4"
                    }),
                    createVNode("path", {
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                      fill: "#34A853"
                    }),
                    createVNode("path", {
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z",
                      fill: "#FBBC05"
                    }),
                    createVNode("path", {
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                      fill: "#EA4335"
                    })
                  ]))
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Google \u767B\u5F55 `);
              } else {
                return [
                  createTextVNode(" Google \u767B\u5F55 ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form>`);
        } else if (mode.value === "login" && loginType.value === "wechat") {
          _push(`<div class="wechat-login-area" data-v-5be3eea5>`);
          if (wechatState.value === "loading") {
            _push(`<div class="wechat-loading" data-v-5be3eea5><div class="spinner" data-v-5be3eea5></div><p data-v-5be3eea5>\u6B63\u5728\u52A0\u8F7D\u4E8C\u7EF4\u7801...</p></div>`);
          } else if (wechatState.value === "qrcode") {
            _push(`<div class="wechat-qrcode" data-v-5be3eea5><p class="qrcode-tip" data-v-5be3eea5>\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\u767B\u5F55</p><img${ssrRenderAttr("src", wechatQrcodeUrl.value)} alt="WeChat QR Code" class="qrcode-img" data-v-5be3eea5><p class="qrcode-hint" data-v-5be3eea5>${ssrInterpolate(wechatPollingHint.value)}</p><button class="refresh-btn" data-v-5be3eea5>\u5237\u65B0\u4E8C\u7EF4\u7801</button></div>`);
          } else if (wechatState.value === "bind") {
            _push(`<div class="wechat-bind-form" data-v-5be3eea5><p class="bind-tip" data-v-5be3eea5>\u{1F389} \u626B\u7801\u6210\u529F\uFF01\u8BF7\u7ED1\u5B9A\u90AE\u7BB1\u4EE5\u5B8C\u6210\u767B\u5F55</p><form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u90AE\u7BB1\u5730\u5740</label>`);
            _push(ssrRenderComponent(EmailInput, {
              modelValue: wechatBindForm.value.email,
              "onUpdate:modelValue": ($event) => wechatBindForm.value.email = $event,
              required: true
            }, null, _parent));
            _push(`</div><div class="form-group code-group" data-v-5be3eea5><input${ssrRenderAttr("value", wechatBindForm.value.code)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" required data-v-5be3eea5>`);
            _push(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: wechatBindCodeTimer.value,
              onClick: sendWechatBindCode
            }, null, _parent));
            _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u8BBE\u7F6E\u5BC6\u7801\uFF08\u53EF\u9009\uFF09</label><input${ssrRenderAttr("value", wechatBindForm.value.password)} type="password" placeholder="\u8BBE\u7F6E\u5BC6\u7801\u540E\u53EF\u7528\u5BC6\u7801\u767B\u5F55" data-v-5be3eea5></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(wechatBindForm.value.agree) ? ssrLooseContain(wechatBindForm.value.agree, null) : wechatBindForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> \u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F `);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/privacy",
              target: "_blank"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`\u300A\u9690\u79C1\u534F\u8BAE\u300B`);
                } else {
                  return [
                    createTextVNode("\u300A\u9690\u79C1\u534F\u8BAE\u300B")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(` \u548C `);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/policy",
              target: "_blank"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`\u300A\u7528\u6237\u653F\u7B56\u300B`);
                } else {
                  return [
                    createTextVNode("\u300A\u7528\u6237\u653F\u7B56\u300B")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</label></div>`);
            _push(ssrRenderComponent(BaseButton, {
              themeId: "primary",
              block: "",
              class: "submit-action",
              type: "submit",
              loading: loading.value,
              disabled: loading.value || !wechatBindForm.value.agree
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(loading.value ? "\u7ED1\u5B9A\u4E2D..." : "\u7ED1\u5B9A\u5E76\u767B\u5F55")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(loading.value ? "\u7ED1\u5B9A\u4E2D..." : "\u7ED1\u5B9A\u5E76\u767B\u5F55"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</form></div>`);
          } else if (wechatState.value === "logged_in") {
            _push(`<div class="wechat-success" data-v-5be3eea5><p data-v-5be3eea5>\u2705 \u767B\u5F55\u6210\u529F\uFF0C\u6B63\u5728\u8DF3\u8F6C...</p></div>`);
          } else if (wechatState.value === "error") {
            _push(`<div class="wechat-error" data-v-5be3eea5><p data-v-5be3eea5>${ssrInterpolate(wechatErrorMsg.value)}</p><button class="refresh-btn" data-v-5be3eea5>\u91CD\u8BD5</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (mode.value === "register") {
          _push(`<form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u90AE\u7BB1\u5730\u5740</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: registerForm.value.email,
            "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
            ref_key: "registerEmailInput",
            ref: registerEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group code-group" data-v-5be3eea5><input${ssrRenderAttr("value", registerForm.value.code)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" required data-v-5be3eea5>`);
          _push(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: codeTimer.value,
            onClick: ($event) => sendCode("register")
          }, null, _parent));
          _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u5BC6\u7801</label><input${ssrRenderAttr("value", registerForm.value.password)} type="password" placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801 (\u81F3\u5C116\u4F4D)" required data-v-5be3eea5></div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u9080\u8BF7\u7801\uFF08\u9009\u586B\uFF09</label><input${ssrRenderAttr("value", registerForm.value.inviteId)} type="text" placeholder="\u8BF7\u8F93\u5165\u9080\u8BF7\u7801" data-v-5be3eea5></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> \u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u300A\u9690\u79C1\u534F\u8BAE\u300B`);
              } else {
                return [
                  createTextVNode("\u300A\u9690\u79C1\u534F\u8BAE\u300B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` \u548C `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u300A\u7528\u6237\u653F\u7B56\u300B`);
              } else {
                return [
                  createTextVNode("\u300A\u7528\u6237\u653F\u7B56\u300B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</label></div>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "primary",
            block: "",
            class: "submit-action",
            type: "submit",
            loading: loading.value,
            disabled: loading.value || !registerForm.value.agree
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(loading.value ? "\u6CE8\u518C\u4E2D..." : "\u6CE8\u518C")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(loading.value ? "\u6CE8\u518C\u4E2D..." : "\u6CE8\u518C"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="google-login-wrap" data-v-5be3eea5>`);
          _push(ssrRenderComponent(BaseButton, {
            themeId: "social-google",
            block: "",
            type: "button",
            onClick: ($event) => oauth("google")
          }, {
            icon: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-5be3eea5${_scopeId}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-5be3eea5${_scopeId}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-5be3eea5${_scopeId}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-5be3eea5${_scopeId}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-5be3eea5${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                      fill: "#4285F4"
                    }),
                    createVNode("path", {
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                      fill: "#34A853"
                    }),
                    createVNode("path", {
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z",
                      fill: "#FBBC05"
                    }),
                    createVNode("path", {
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                      fill: "#EA4335"
                    })
                  ]))
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Google \u6CE8\u518C `);
              } else {
                return [
                  createTextVNode(" Google \u6CE8\u518C ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPrivacyDialog.value) {
        _push(`<div class="dialog-mask" data-v-5be3eea5><div class="dialog-box" data-v-5be3eea5><div class="dialog-title" data-v-5be3eea5>\u9690\u79C1\u534F\u8BAE</div><div class="dialog-content" data-v-5be3eea5>\u8FD9\u91CC\u662F\u9690\u79C1\u534F\u8BAE\u5185\u5BB9...</div><button class="dialog-close" data-v-5be3eea5>\u5173\u95ED</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPolicyDialog.value) {
        _push(`<div class="dialog-mask" data-v-5be3eea5><div class="dialog-box" data-v-5be3eea5><div class="dialog-title" data-v-5be3eea5>\u7528\u6237\u653F\u7B56</div><div class="dialog-content" data-v-5be3eea5>\u8FD9\u91CC\u662F\u7528\u6237\u653F\u7B56\u5185\u5BB9...</div><button class="dialog-close" data-v-5be3eea5>\u5173\u95ED</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showForgotDialog.value) {
        _push(`<div class="dialog-mask" data-v-5be3eea5><div class="dialog-box" data-v-5be3eea5><div class="dialog-title" data-v-5be3eea5>\u627E\u56DE\u5BC6\u7801</div><form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u90AE\u7BB1\u5730\u5740</label>`);
        _push(ssrRenderComponent(EmailInput, {
          modelValue: forgotForm.value.email,
          "onUpdate:modelValue": ($event) => forgotForm.value.email = $event,
          required: true
        }, null, _parent));
        _push(`</div><div class="form-group code-group" data-v-5be3eea5><label data-v-5be3eea5>\u9A8C\u8BC1\u7801</label><input${ssrRenderAttr("value", forgotForm.value.code)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" required data-v-5be3eea5>`);
        _push(ssrRenderComponent(SendCodeButton, {
          loading: loading.value,
          countdown: forgotCodeTimer.value,
          onClick: sendForgotCode
        }, null, _parent));
        _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>\u65B0\u5BC6\u7801</label><input${ssrRenderAttr("value", forgotForm.value.password)} type="password" placeholder="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801 (\u81F3\u5C116\u4F4D)" required data-v-5be3eea5></div>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "primary",
          block: "",
          class: "submit-action",
          type: "submit",
          loading: loading.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(loading.value ? "\u91CD\u7F6E\u4E2D..." : "\u91CD\u7F6E\u5BC6\u7801")}`);
            } else {
              return [
                createTextVNode(toDisplayString(loading.value ? "\u91CD\u7F6E\u4E2D..." : "\u91CD\u7F6E\u5BC6\u7801"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form><button class="dialog-close" data-v-5be3eea5>\u5173\u95ED</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/LoginRegisterModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5be3eea5"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=LoginRegisterModal-Qu_Lr8ij.mjs.map
