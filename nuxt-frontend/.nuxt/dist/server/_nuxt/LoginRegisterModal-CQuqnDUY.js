import { _ as __nuxt_component_0 } from "./nuxt-link-DErVm1dK.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, watch, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import { a as authApi } from "./auth-BCuS92ob.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { useRouter, useRoute } from "vue-router";
import { E as EmailInput, S as SendCodeButton } from "./SendCodeButton-Bt2-2zIY.js";
import { B as BaseButton } from "./BaseButton-B3srPw2H.js";
import { s as setInterval } from "./interval-BHZX8LlC.js";
import { E as ElMessage } from "./index-CJUZrfXE.js";
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
    const wechatPollingHint = ref("等待扫码...");
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
        if (mode.value === "login") {
          if (loginType.value === "password") loginEmailInput.value?.focus();
          else loginCodeEmailInput.value?.focus();
        } else {
          registerEmailInput.value?.focus();
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
        ElMessage.warning("请输入邮箱");
        return;
      }
      if (!isValidEmail(email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      loading.value = true;
      const apiCall = authApi.getEmailCode(email);
      apiCall.then((res) => {
        if (res.success) {
          ElMessage.success("验证码已发送，请注意查收");
          codeInterval = startTimer(codeTimer, codeInterval, COOLDOWN_SECONDS, TIMER_KEY_CODE);
        } else {
          ElMessage.error(res.msg || "验证码发送失败");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "验证码发送失败");
      }).finally(() => {
        loading.value = false;
      });
    }
    function sendForgotCode() {
      if (forgotCodeTimer.value > 0) return;
      if (!forgotForm.value.email) {
        ElMessage.warning("请输入邮箱");
        return;
      }
      if (!isValidEmail(forgotForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      loading.value = true;
      authApi.sendOtp(forgotForm.value.email).then((res) => {
        if (res.success) {
          ElMessage.success("验证码已发送");
          forgotCodeInterval = startTimer(forgotCodeTimer, forgotCodeInterval, COOLDOWN_SECONDS, TIMER_KEY_FORGOT);
        } else {
          ElMessage.error(res.msg || "发送失败");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "验证码发送失败");
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
        ElMessage.warning("请输入邮箱");
        return;
      }
      if (!isValidEmail(wechatBindForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      loading.value = true;
      authApi.getEmailCode(wechatBindForm.value.email).then((res) => {
        if (res.success) {
          ElMessage.success("验证码已发送");
          wechatBindCodeInterval = startTimer(wechatBindCodeTimer, wechatBindCodeInterval, COOLDOWN_SECONDS, "wechat_bind_timer");
        } else {
          ElMessage.error(res.msg || "发送失败");
        }
      }).catch((err) => {
        ElMessage.error(err.message || "发送失败");
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
        _push(`<div class="modal-mask" data-v-5be3eea5><div class="login-modal" data-v-5be3eea5><div class="modal-header" data-v-5be3eea5><div class="modal-header-inner" data-v-5be3eea5><div class="modal-title" data-v-5be3eea5>凡图拉</div><div class="modal-subtitle" data-v-5be3eea5>欢迎回来，请登录您的账户</div><div class="modal-tabs" data-v-5be3eea5>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "tab",
          class: ["tab-btn", { active: mode.value === "login" }],
          onClick: ($event) => mode.value = "login"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`登录`);
            } else {
              return [
                createTextVNode("登录")
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
              _push2(`注册`);
            } else {
              return [
                createTextVNode("注册")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button class="modal-close" data-v-5be3eea5>×</button></div></div><div class="modal-body" data-v-5be3eea5><div class="modal-form-area" data-v-5be3eea5>`);
        if (mode.value === "login") {
          _push(`<div class="modal-form-tabs" data-v-5be3eea5><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "code" }])}" data-v-5be3eea5>验证码登录</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "password" }])}" data-v-5be3eea5>密码登录</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "wechat" }])}" data-v-5be3eea5>微信登录</button></div>`);
        } else {
          _push(`<!---->`);
        }
        if (mode.value === "login" && loginType.value === "password") {
          _push(`<form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>邮箱地址</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: loginForm.value.email,
            "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
            ref_key: "loginEmailInput",
            ref: loginEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>密码</label><input${ssrRenderAttr("value", loginForm.value.password)} type="password" placeholder="请输入密码" required data-v-5be3eea5></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-5be3eea5> 记住我</label><a class="forgot-link" data-v-5be3eea5>忘记密码？</a></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> 我已阅读并同意 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《隐私协议》`);
              } else {
                return [
                  createTextVNode("《隐私协议》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 和 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《用户政策》`);
              } else {
                return [
                  createTextVNode("《用户政策》")
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
                _push2(`${ssrInterpolate(loading.value ? "登录中..." : "登录")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(loading.value ? "登录中..." : "登录"), 1)
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
                _push2(` Google 登录 `);
              } else {
                return [
                  createTextVNode(" Google 登录 ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form>`);
        } else if (mode.value === "login" && loginType.value === "code") {
          _push(`<form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>邮箱地址</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: loginCodeForm.value.email,
            "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
            ref_key: "loginCodeEmailInput",
            ref: loginCodeEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group code-group" data-v-5be3eea5><input${ssrRenderAttr("value", loginCodeForm.value.code)} type="text" placeholder="请输入验证码" required data-v-5be3eea5>`);
          _push(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: codeTimer.value,
            onClick: ($event) => sendCode("login")
          }, null, _parent));
          _push(`</div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.remember) ? ssrLooseContain(loginCodeForm.value.remember, null) : loginCodeForm.value.remember) ? " checked" : ""} data-v-5be3eea5> 记住我</label></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> 我已阅读并同意 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《隐私协议》`);
              } else {
                return [
                  createTextVNode("《隐私协议》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 和 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《用户政策》`);
              } else {
                return [
                  createTextVNode("《用户政策》")
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
                _push2(`${ssrInterpolate(loading.value ? "登录中..." : "登录")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(loading.value ? "登录中..." : "登录"), 1)
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
                _push2(` Google 登录 `);
              } else {
                return [
                  createTextVNode(" Google 登录 ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></form>`);
        } else if (mode.value === "login" && loginType.value === "wechat") {
          _push(`<div class="wechat-login-area" data-v-5be3eea5>`);
          if (wechatState.value === "loading") {
            _push(`<div class="wechat-loading" data-v-5be3eea5><div class="spinner" data-v-5be3eea5></div><p data-v-5be3eea5>正在加载二维码...</p></div>`);
          } else if (wechatState.value === "qrcode") {
            _push(`<div class="wechat-qrcode" data-v-5be3eea5><p class="qrcode-tip" data-v-5be3eea5>请使用微信扫描二维码登录</p><img${ssrRenderAttr("src", wechatQrcodeUrl.value)} alt="WeChat QR Code" class="qrcode-img" data-v-5be3eea5><p class="qrcode-hint" data-v-5be3eea5>${ssrInterpolate(wechatPollingHint.value)}</p><button class="refresh-btn" data-v-5be3eea5>刷新二维码</button></div>`);
          } else if (wechatState.value === "bind") {
            _push(`<div class="wechat-bind-form" data-v-5be3eea5><p class="bind-tip" data-v-5be3eea5>🎉 扫码成功！请绑定邮箱以完成登录</p><form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>邮箱地址</label>`);
            _push(ssrRenderComponent(EmailInput, {
              modelValue: wechatBindForm.value.email,
              "onUpdate:modelValue": ($event) => wechatBindForm.value.email = $event,
              required: true
            }, null, _parent));
            _push(`</div><div class="form-group code-group" data-v-5be3eea5><input${ssrRenderAttr("value", wechatBindForm.value.code)} type="text" placeholder="请输入验证码" required data-v-5be3eea5>`);
            _push(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: wechatBindCodeTimer.value,
              onClick: sendWechatBindCode
            }, null, _parent));
            _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>设置密码（可选）</label><input${ssrRenderAttr("value", wechatBindForm.value.password)} type="password" placeholder="设置密码后可用密码登录" data-v-5be3eea5></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(wechatBindForm.value.agree) ? ssrLooseContain(wechatBindForm.value.agree, null) : wechatBindForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> 我已阅读并同意 `);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/privacy",
              target: "_blank"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`《隐私协议》`);
                } else {
                  return [
                    createTextVNode("《隐私协议》")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(` 和 `);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/policy",
              target: "_blank"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`《用户政策》`);
                } else {
                  return [
                    createTextVNode("《用户政策》")
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
                  _push2(`${ssrInterpolate(loading.value ? "绑定中..." : "绑定并登录")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(loading.value ? "绑定中..." : "绑定并登录"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push(`</form></div>`);
          } else if (wechatState.value === "logged_in") {
            _push(`<div class="wechat-success" data-v-5be3eea5><p data-v-5be3eea5>✅ 登录成功，正在跳转...</p></div>`);
          } else if (wechatState.value === "error") {
            _push(`<div class="wechat-error" data-v-5be3eea5><p data-v-5be3eea5>${ssrInterpolate(wechatErrorMsg.value)}</p><button class="refresh-btn" data-v-5be3eea5>重试</button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (mode.value === "register") {
          _push(`<form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>邮箱地址</label>`);
          _push(ssrRenderComponent(EmailInput, {
            modelValue: registerForm.value.email,
            "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
            ref_key: "registerEmailInput",
            ref: registerEmailInput,
            required: true
          }, null, _parent));
          _push(`</div><div class="form-group code-group" data-v-5be3eea5><input${ssrRenderAttr("value", registerForm.value.code)} type="text" placeholder="请输入验证码" required data-v-5be3eea5>`);
          _push(ssrRenderComponent(SendCodeButton, {
            loading: loading.value,
            countdown: codeTimer.value,
            onClick: ($event) => sendCode("register")
          }, null, _parent));
          _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>密码</label><input${ssrRenderAttr("value", registerForm.value.password)} type="password" placeholder="请输入密码 (至少6位)" required data-v-5be3eea5></div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>邀请码（选填）</label><input${ssrRenderAttr("value", registerForm.value.inviteId)} type="text" placeholder="请输入邀请码" data-v-5be3eea5></div><div class="form-row" data-v-5be3eea5><label data-v-5be3eea5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} required data-v-5be3eea5> 我已阅读并同意 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/privacy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《隐私协议》`);
              } else {
                return [
                  createTextVNode("《隐私协议》")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 和 `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/policy",
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`《用户政策》`);
              } else {
                return [
                  createTextVNode("《用户政策》")
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
                _push2(`${ssrInterpolate(loading.value ? "注册中..." : "注册")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(loading.value ? "注册中..." : "注册"), 1)
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
                _push2(` Google 注册 `);
              } else {
                return [
                  createTextVNode(" Google 注册 ")
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
        _push(`<div class="dialog-mask" data-v-5be3eea5><div class="dialog-box" data-v-5be3eea5><div class="dialog-title" data-v-5be3eea5>隐私协议</div><div class="dialog-content" data-v-5be3eea5>这里是隐私协议内容...</div><button class="dialog-close" data-v-5be3eea5>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPolicyDialog.value) {
        _push(`<div class="dialog-mask" data-v-5be3eea5><div class="dialog-box" data-v-5be3eea5><div class="dialog-title" data-v-5be3eea5>用户政策</div><div class="dialog-content" data-v-5be3eea5>这里是用户政策内容...</div><button class="dialog-close" data-v-5be3eea5>关闭</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showForgotDialog.value) {
        _push(`<div class="dialog-mask" data-v-5be3eea5><div class="dialog-box" data-v-5be3eea5><div class="dialog-title" data-v-5be3eea5>找回密码</div><form data-v-5be3eea5><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>邮箱地址</label>`);
        _push(ssrRenderComponent(EmailInput, {
          modelValue: forgotForm.value.email,
          "onUpdate:modelValue": ($event) => forgotForm.value.email = $event,
          required: true
        }, null, _parent));
        _push(`</div><div class="form-group code-group" data-v-5be3eea5><label data-v-5be3eea5>验证码</label><input${ssrRenderAttr("value", forgotForm.value.code)} type="text" placeholder="请输入验证码" required data-v-5be3eea5>`);
        _push(ssrRenderComponent(SendCodeButton, {
          loading: loading.value,
          countdown: forgotCodeTimer.value,
          onClick: sendForgotCode
        }, null, _parent));
        _push(`</div><div class="form-group" data-v-5be3eea5><label data-v-5be3eea5>新密码</label><input${ssrRenderAttr("value", forgotForm.value.password)} type="password" placeholder="请输入新密码 (至少6位)" required data-v-5be3eea5></div>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "primary",
          block: "",
          class: "submit-action",
          type: "submit",
          loading: loading.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(loading.value ? "重置中..." : "重置密码")}`);
            } else {
              return [
                createTextVNode(toDisplayString(loading.value ? "重置中..." : "重置密码"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form><button class="dialog-close" data-v-5be3eea5>关闭</button></div></div>`);
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
export {
  __nuxt_component_2 as _
};
//# sourceMappingURL=LoginRegisterModal-CQuqnDUY.js.map
