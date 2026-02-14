import { _ as __nuxt_component_1 } from "./nuxt-link-Bz8d0esR.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, computed, watch, withCtx, createTextVNode, unref, toDisplayString, openBlock, createBlock, createVNode, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate, ssrRenderTeleport } from "vue/server-renderer";
import { a as authApi, u as useUserStore } from "./user-0iCypJz1.js";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
import { useRouter, useRoute } from "vue-router";
import { E as EmailInput } from "./EmailInput-BxuFUYqG.js";
import { S as SendCodeButton } from "./SendCodeButton-BHMZfVap.js";
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
import { _ as __nuxt_component_0$1 } from "./BaseModal-nbvk9VuE.js";
import { w as wechatLoginApi } from "./wechat-login-DYkcuR5o.js";
import { u as useSendCode } from "./useSendCode-DUIi8Gb_.js";
import { s as setInterval } from "./interval-BnEBQU8I.js";
import { E as ElMessage } from "./index-CK1iG7c1.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
import "@supabase/supabase-js";
import "./useNotify-CME3DTm8.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "./useToast-DsT-1f4c.js";
import "./index-CRs4T-Jf.js";
import "lodash-unified";
import "@vue/shared";
import "./typescript-D6L75muK.js";
import "./icon-DxnRhcjj.js";
import "@vueuse/core";
import "./index-D6MDXFfa.js";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C00m4e8W.js";
import "./index-C8K_s-bH.js";
import "./event-D3FEo2C5.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoginRegisterModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    const route = useRoute();
    const mode = ref("login");
    const loginType = ref("code");
    const {
      loading: loginCodeLoading,
      countdown: codeTimer,
      sendCode: sendLoginCode
    } = useSendCode({ timerKey: "otp_timer_end" });
    const {
      loading: registerCodeLoading,
      sendCode: sendRegisterCode
    } = useSendCode({ timerKey: "otp_register_timer_end" });
    const {
      loading: forgotCodeLoading,
      countdown: forgotCodeTimer,
      sendCode: sendForgotPasswordCode
    } = useSendCode({ timerKey: "otp_forgot_timer_end" });
    const {
      loading: wechatBindLoading,
      countdown: wechatBindCodeTimer,
      sendCode: sendWechatBindVerificationCode
    } = useSendCode({ timerKey: "wechat_bind_timer" });
    const loading = computed(
      () => baseLoading.value || loginCodeLoading.value || registerCodeLoading.value || forgotCodeLoading.value || wechatBindLoading.value
    );
    const baseLoading = ref(false);
    const wechatState = ref("loading");
    const wechatQrcodeUrl = ref("");
    const wechatSceneStr = ref("");
    const wechatBindToken = ref("");
    const wechatPollingHint = ref("等待扫码...");
    const wechatErrorMsg = ref("");
    let wechatPollTimer = null;
    const wechatBindForm = ref({ email: "", code: "", password: "", agree: false });
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
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (pwd) => pwd.length >= 6;
    function close() {
      emit("close");
    }
    function onForgot() {
      showForgotDialog.value = true;
    }
    async function sendCode(type) {
      if (type === "login") {
        await sendLoginCode(loginCodeForm.value.email);
      } else {
        await sendRegisterCode(registerForm.value.email);
      }
    }
    async function sendForgotCode() {
      await sendForgotPasswordCode(forgotForm.value.email);
    }
    async function onLogin() {
      if (!loginForm.value.email || !loginForm.value.password) {
        ElMessage.warning("请填写完整");
        return;
      }
      if (!isValidEmail(loginForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      if (!loginForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      if (!loginForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      baseLoading.value = true;
      try {
        const res = await authApi.login(loginForm.value);
        if (res.success && res.data) {
          await handleLoginSuccess(res.data);
        } else {
          ElMessage.error(res.msg || "登录失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "登录失败");
      } finally {
        baseLoading.value = false;
      }
    }
    async function onLoginCode() {
      if (!loginCodeForm.value.email || !loginCodeForm.value.code) {
        ElMessage.warning("请填写完整");
        return;
      }
      if (!isValidEmail(loginCodeForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      if (!loginCodeForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      if (!loginCodeForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      baseLoading.value = true;
      try {
        const res = await authApi.loginWithCode({
          email: loginCodeForm.value.email,
          code: loginCodeForm.value.code
        });
        if (res.success && res.data) {
          await handleLoginSuccess(res.data);
        } else {
          ElMessage.error(res.msg || "验证码登录失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "验证码登录失败");
      } finally {
        baseLoading.value = false;
      }
    }
    async function onRegister() {
      if (!registerForm.value.email || !registerForm.value.code || !registerForm.value.password) {
        ElMessage.warning("请填写完整");
        return;
      }
      if (!isValidEmail(registerForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      if (!isValidPassword(registerForm.value.password)) {
        ElMessage.warning("密码至少需要6位");
        return;
      }
      if (!registerForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      if (!registerForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      baseLoading.value = true;
      try {
        const res = await authApi.registerWithCodeAndPassword({
          email: registerForm.value.email,
          code: registerForm.value.code,
          password: registerForm.value.password,
          inviteId: registerForm.value.inviteId
        });
        if (res.success && res.data) {
          await handleLoginSuccess(res.data, "注册成功");
        } else {
          ElMessage.error(res.msg || "注册失败");
        }
      } catch (e) {
        ElMessage.error(e.message || "注册失败");
      } finally {
        baseLoading.value = false;
      }
    }
    async function handleLoginSuccess(data, msg = "登录成功") {
      const accessToken = data.session?.access_token;
      if ((loginForm.value.remember || loginCodeForm.value.remember) && accessToken) {
        localStorage.setItem("token", accessToken);
      }
      const store = useUserStore();
      store.setUser(data.user, accessToken);
      try {
        await Promise.all([
          store.loadFavorites(),
          store.loadOrders()
        ]);
      } catch (e) {
        console.warn(e);
      }
      ElMessage.success(msg);
      ElMessage.success(msg);
      close();
      if (route.path.includes("/login")) {
        router.push("/");
      }
    }
    function oauth(type) {
      const client = getSupabaseClient();
      client.auth.signInWithOAuth({ provider: type });
    }
    async function startWechatLogin() {
      loginType.value = "wechat";
      wechatState.value = "loading";
      stopWechatPolling();
      try {
        const res = await wechatLoginApi.getLoginQrCode();
        if (res.success && res.data) {
          wechatQrcodeUrl.value = res.data.qrcodeUrl;
          wechatSceneStr.value = res.data.sceneStr;
          wechatState.value = "qrcode";
          wechatPollingHint.value = "等待扫码...";
          startWechatPolling();
        } else {
          wechatState.value = "error";
          wechatErrorMsg.value = res.msg || "获取二维码失败";
        }
      } catch (err) {
        wechatState.value = "error";
        wechatErrorMsg.value = err.message || "获取二维码失败";
      }
    }
    function refreshWechatQr() {
      startWechatLogin();
    }
    function startWechatPolling() {
      stopWechatPolling();
      wechatPollTimer = setInterval();
    }
    function stopWechatPolling() {
      if (wechatPollTimer) {
        clearInterval(wechatPollTimer);
        wechatPollTimer = null;
      }
    }
    function sendWechatBindCode() {
      sendWechatBindVerificationCode(wechatBindForm.value.email);
    }
    async function onWechatBind() {
      if (!wechatBindForm.value.email || !wechatBindForm.value.code) {
        ElMessage.warning("请填写完整");
        return;
      }
      if (!isValidEmail(wechatBindForm.value.email)) {
        ElMessage.warning("邮箱格式不正确");
        return;
      }
      if (!wechatBindForm.value.agree) {
        ElMessage.warning("请勾选协议");
        return;
      }
      if (!wechatBindToken.value) {
        ElMessage.error("绑定凭证无效，请重新扫码");
        startWechatLogin();
        return;
      }
      if (!wechatBindToken.value) {
        ElMessage.error("绑定凭证无效，请重新扫码");
        startWechatLogin();
        return;
      }
      baseLoading.value = true;
      try {
        const res = await wechatLoginApi.bindWechatToEmail({
          bindToken: wechatBindToken.value,
          email: wechatBindForm.value.email,
          code: wechatBindForm.value.code,
          password: wechatBindForm.value.password || void 0
        });
        if (res.success && res.data) {
          await handleLoginSuccess(res.data, "绑定成功");
        } else {
          ElMessage.error(res.msg || "绑定失败");
        }
      } catch (err) {
        ElMessage.error(err.message || "绑定失败");
      } finally {
        baseLoading.value = false;
      }
    }
    watch(() => props.visible, (val) => {
      if (!val) {
        stopWechatPolling();
        wechatState.value = "loading";
        wechatQrcodeUrl.value = "";
        wechatSceneStr.value = "";
        wechatBindToken.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(__nuxt_component_0$1, {
        visible: __props.visible,
        width: "420px",
        showHeader: false,
        showFooter: false,
        contentPadding: "0",
        customClass: "login-modal-container",
        themeId: "suit-001",
        "onUpdate:visible": ($event) => _ctx.$emit("close"),
        onClose: ($event) => _ctx.$emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="login-modal-content" data-v-4625df0e${_scopeId}><div class="modal-header" data-v-4625df0e${_scopeId}><div class="modal-header-inner" data-v-4625df0e${_scopeId}><div class="modal-title" data-v-4625df0e${_scopeId}>凡图拉</div><div class="modal-subtitle" data-v-4625df0e${_scopeId}>欢迎回来，请登录您的账户</div><div class="modal-tabs" data-v-4625df0e${_scopeId}>`);
            _push2(ssrRenderComponent(BaseButton, {
              themeId: "tab",
              class: ["tab-btn", { active: mode.value === "login" }],
              onClick: ($event) => mode.value = "login"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`登录`);
                } else {
                  return [
                    createTextVNode("登录")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(BaseButton, {
              themeId: "tab",
              class: ["tab-btn", { active: mode.value === "register" }],
              onClick: ($event) => mode.value = "register"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`注册`);
                } else {
                  return [
                    createTextVNode("注册")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><button class="modal-close" data-v-4625df0e${_scopeId}>×</button></div></div><div class="modal-body" data-v-4625df0e${_scopeId}><div class="modal-form-area" data-v-4625df0e${_scopeId}>`);
            if (mode.value === "login") {
              _push2(`<div class="modal-form-tabs" data-v-4625df0e${_scopeId}><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "code" }])}" data-v-4625df0e${_scopeId}>验证码登录</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "password" }])}" data-v-4625df0e${_scopeId}>密码登录</button><button class="${ssrRenderClass(["form-tab", { active: loginType.value === "wechat" }])}" data-v-4625df0e${_scopeId}>微信登录</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (mode.value === "login" && loginType.value === "password") {
              _push2(`<form data-v-4625df0e${_scopeId}><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>邮箱地址</label>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginForm.value.email,
                "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
                ref_key: "loginEmailInput",
                ref: loginEmailInput,
                required: true
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>密码</label><input${ssrRenderAttr("value", loginForm.value.password)} type="password" placeholder="请输入密码" required data-v-4625df0e${_scopeId}></div><div class="form-row" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-4625df0e${_scopeId}> 记住我</label><a class="forgot-link" data-v-4625df0e${_scopeId}>忘记密码？</a></div><div class="form-row" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} required data-v-4625df0e${_scopeId}> 我已阅读并同意 `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/privacy",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`《隐私协议》`);
                  } else {
                    return [
                      createTextVNode("《隐私协议》")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 和 `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/policy",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`《用户政策》`);
                  } else {
                    return [
                      createTextVNode("《用户政策》")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</label></div>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary",
                block: "",
                class: "submit-action",
                type: "submit",
                loading: unref(loading),
                disabled: unref(loading) || !loginForm.value.agree
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(loading) ? "登录中..." : "登录")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(loading) ? "登录中..." : "登录"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="google-login-wrap" data-v-4625df0e${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "social-google",
                block: "",
                type: "button",
                onClick: ($event) => oauth("google")
              }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-4625df0e${_scopeId2}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-4625df0e${_scopeId2}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-4625df0e${_scopeId2}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-4625df0e${_scopeId2}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-4625df0e${_scopeId2}></path></svg>`);
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
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Google 登录 `);
                  } else {
                    return [
                      createTextVNode(" Google 登录 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else if (mode.value === "login" && loginType.value === "code") {
              _push2(`<form data-v-4625df0e${_scopeId}><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>邮箱地址</label>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginCodeForm.value.email,
                "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
                ref_key: "loginCodeEmailInput",
                ref: loginCodeEmailInput,
                required: true
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-group code-group" data-v-4625df0e${_scopeId}><input${ssrRenderAttr("value", loginCodeForm.value.code)} type="text" placeholder="请输入验证码" required data-v-4625df0e${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: unref(loading),
                countdown: unref(codeTimer),
                onClick: ($event) => sendCode("login")
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-row" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.remember) ? ssrLooseContain(loginCodeForm.value.remember, null) : loginCodeForm.value.remember) ? " checked" : ""} data-v-4625df0e${_scopeId}> 记住我</label></div><div class="form-row" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} required data-v-4625df0e${_scopeId}> 我已阅读并同意 `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/privacy",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`《隐私协议》`);
                  } else {
                    return [
                      createTextVNode("《隐私协议》")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 和 `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/policy",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`《用户政策》`);
                  } else {
                    return [
                      createTextVNode("《用户政策》")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</label></div>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary",
                block: "",
                class: "submit-action",
                type: "submit",
                loading: unref(loading),
                disabled: unref(loading) || !loginCodeForm.value.agree
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(loading) ? "登录中..." : "登录")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(loading) ? "登录中..." : "登录"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="google-login-wrap" data-v-4625df0e${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "social-google",
                block: "",
                type: "button",
                onClick: ($event) => oauth("google")
              }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-4625df0e${_scopeId2}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-4625df0e${_scopeId2}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-4625df0e${_scopeId2}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-4625df0e${_scopeId2}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-4625df0e${_scopeId2}></path></svg>`);
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
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Google 登录 `);
                  } else {
                    return [
                      createTextVNode(" Google 登录 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else if (mode.value === "login" && loginType.value === "wechat") {
              _push2(`<div class="wechat-login-area" data-v-4625df0e${_scopeId}>`);
              if (wechatState.value === "loading") {
                _push2(`<div class="wechat-loading" data-v-4625df0e${_scopeId}><div class="spinner" data-v-4625df0e${_scopeId}></div><p data-v-4625df0e${_scopeId}>正在加载二维码...</p></div>`);
              } else if (wechatState.value === "qrcode") {
                _push2(`<div class="wechat-qrcode" data-v-4625df0e${_scopeId}><p class="qrcode-tip" data-v-4625df0e${_scopeId}>请使用微信扫描二维码登录</p><img${ssrRenderAttr("src", wechatQrcodeUrl.value)} alt="WeChat QR Code" class="qrcode-img" data-v-4625df0e${_scopeId}><p class="qrcode-hint" data-v-4625df0e${_scopeId}>${ssrInterpolate(wechatPollingHint.value)}</p><button class="refresh-btn" data-v-4625df0e${_scopeId}>刷新二维码</button></div>`);
              } else if (wechatState.value === "bind") {
                _push2(`<div class="wechat-bind-form" data-v-4625df0e${_scopeId}><p class="bind-tip" data-v-4625df0e${_scopeId}>🎉 扫码成功！请绑定邮箱以完成登录</p><form data-v-4625df0e${_scopeId}><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>邮箱地址</label>`);
                _push2(ssrRenderComponent(EmailInput, {
                  modelValue: wechatBindForm.value.email,
                  "onUpdate:modelValue": ($event) => wechatBindForm.value.email = $event,
                  required: true
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="form-group code-group" data-v-4625df0e${_scopeId}><input${ssrRenderAttr("value", wechatBindForm.value.code)} type="text" placeholder="请输入验证码" required data-v-4625df0e${_scopeId}>`);
                _push2(ssrRenderComponent(SendCodeButton, {
                  loading: unref(loading),
                  countdown: unref(wechatBindCodeTimer),
                  onClick: sendWechatBindCode
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>设置密码（可选）</label><input${ssrRenderAttr("value", wechatBindForm.value.password)} type="password" placeholder="设置密码后可用密码登录" data-v-4625df0e${_scopeId}></div><div class="form-row" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(wechatBindForm.value.agree) ? ssrLooseContain(wechatBindForm.value.agree, null) : wechatBindForm.value.agree) ? " checked" : ""} required data-v-4625df0e${_scopeId}> 我已阅读并同意 `);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: "/privacy",
                  target: "_blank"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`《隐私协议》`);
                    } else {
                      return [
                        createTextVNode("《隐私协议》")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(` 和 `);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: "/policy",
                  target: "_blank"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`《用户政策》`);
                    } else {
                      return [
                        createTextVNode("《用户政策》")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</label></div>`);
                _push2(ssrRenderComponent(BaseButton, {
                  themeId: "primary",
                  block: "",
                  class: "submit-action",
                  type: "submit",
                  loading: unref(loading),
                  disabled: unref(loading) || !wechatBindForm.value.agree
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(loading) ? "绑定中..." : "绑定并登录")}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(loading) ? "绑定中..." : "绑定并登录"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</form></div>`);
              } else if (wechatState.value === "logged_in") {
                _push2(`<div class="wechat-success" data-v-4625df0e${_scopeId}><p data-v-4625df0e${_scopeId}>✅ 登录成功，正在跳转...</p></div>`);
              } else if (wechatState.value === "error") {
                _push2(`<div class="wechat-error" data-v-4625df0e${_scopeId}><p data-v-4625df0e${_scopeId}>${ssrInterpolate(wechatErrorMsg.value)}</p><button class="refresh-btn" data-v-4625df0e${_scopeId}>重试</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (mode.value === "register") {
              _push2(`<form data-v-4625df0e${_scopeId}><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>邮箱地址</label>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: registerForm.value.email,
                "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                ref_key: "registerEmailInput",
                ref: registerEmailInput,
                required: true
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-group code-group" data-v-4625df0e${_scopeId}><input${ssrRenderAttr("value", registerForm.value.code)} type="text" placeholder="请输入验证码" required data-v-4625df0e${_scopeId}>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: unref(loading),
                countdown: unref(codeTimer),
                onClick: ($event) => sendCode("register")
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>密码</label><input${ssrRenderAttr("value", registerForm.value.password)} type="password" placeholder="请输入密码 (至少6位)" required data-v-4625df0e${_scopeId}></div><div class="form-group" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}>邀请码（选填）</label><input${ssrRenderAttr("value", registerForm.value.inviteId)} type="text" placeholder="请输入邀请码" data-v-4625df0e${_scopeId}></div><div class="form-row" data-v-4625df0e${_scopeId}><label data-v-4625df0e${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} required data-v-4625df0e${_scopeId}> 我已阅读并同意 `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/privacy",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`《隐私协议》`);
                  } else {
                    return [
                      createTextVNode("《隐私协议》")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 和 `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/policy",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`《用户政策》`);
                  } else {
                    return [
                      createTextVNode("《用户政策》")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</label></div>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "primary",
                block: "",
                class: "submit-action",
                type: "submit",
                loading: unref(loading),
                disabled: unref(loading) || !registerForm.value.agree
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(loading) ? "注册中..." : "注册")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(loading) ? "注册中..." : "注册"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="google-login-wrap" data-v-4625df0e${_scopeId}>`);
              _push2(ssrRenderComponent(BaseButton, {
                themeId: "social-google",
                block: "",
                type: "button",
                onClick: ($event) => oauth("google")
              }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-4625df0e${_scopeId2}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" data-v-4625df0e${_scopeId2}></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-4625df0e${_scopeId2}></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" data-v-4625df0e${_scopeId2}></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-4625df0e${_scopeId2}></path></svg>`);
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
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Google 注册 `);
                  } else {
                    return [
                      createTextVNode(" Google 注册 ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "login-modal-content" }, [
                createVNode("div", { class: "modal-header" }, [
                  createVNode("div", { class: "modal-header-inner" }, [
                    createVNode("div", { class: "modal-title" }, "凡图拉"),
                    createVNode("div", { class: "modal-subtitle" }, "欢迎回来，请登录您的账户"),
                    createVNode("div", { class: "modal-tabs" }, [
                      createVNode(BaseButton, {
                        themeId: "tab",
                        class: ["tab-btn", { active: mode.value === "login" }],
                        onClick: ($event) => mode.value = "login"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("登录")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"]),
                      createVNode(BaseButton, {
                        themeId: "tab",
                        class: ["tab-btn", { active: mode.value === "register" }],
                        onClick: ($event) => mode.value = "register"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("注册")
                        ]),
                        _: 1
                      }, 8, ["class", "onClick"])
                    ]),
                    createVNode("button", {
                      class: "modal-close",
                      onClick: close
                    }, "×")
                  ])
                ]),
                createVNode("div", { class: "modal-body" }, [
                  createVNode("div", { class: "modal-form-area" }, [
                    mode.value === "login" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "modal-form-tabs"
                    }, [
                      createVNode("button", {
                        class: ["form-tab", { active: loginType.value === "code" }],
                        onClick: ($event) => loginType.value = "code"
                      }, "验证码登录", 10, ["onClick"]),
                      createVNode("button", {
                        class: ["form-tab", { active: loginType.value === "password" }],
                        onClick: ($event) => loginType.value = "password"
                      }, "密码登录", 10, ["onClick"]),
                      createVNode("button", {
                        class: ["form-tab", { active: loginType.value === "wechat" }],
                        onClick: startWechatLogin
                      }, "微信登录", 2)
                    ])) : createCommentVNode("", true),
                    mode.value === "login" && loginType.value === "password" ? (openBlock(), createBlock("form", {
                      key: 1,
                      onSubmit: withModifiers(onLogin, ["prevent"])
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "邮箱地址"),
                        createVNode(EmailInput, {
                          modelValue: loginForm.value.email,
                          "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
                          ref_key: "loginEmailInput",
                          ref: loginEmailInput,
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "密码"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => loginForm.value.password = $event,
                          type: "password",
                          placeholder: "请输入密码",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, loginForm.value.password]
                        ])
                      ]),
                      createVNode("div", { class: "form-row" }, [
                        createVNode("label", null, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => loginForm.value.remember = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, loginForm.value.remember]
                          ]),
                          createTextVNode(" 记住我")
                        ]),
                        createVNode("a", {
                          class: "forgot-link",
                          onClick: withModifiers(onForgot, ["prevent"])
                        }, "忘记密码？")
                      ]),
                      createVNode("div", { class: "form-row" }, [
                        createVNode("label", null, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => loginForm.value.agree = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, loginForm.value.agree]
                          ]),
                          createTextVNode(" 我已阅读并同意 "),
                          createVNode(_component_NuxtLink, {
                            to: "/privacy",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("《隐私协议》")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 和 "),
                          createVNode(_component_NuxtLink, {
                            to: "/policy",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("《用户政策》")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(BaseButton, {
                        themeId: "primary",
                        block: "",
                        class: "submit-action",
                        type: "submit",
                        loading: unref(loading),
                        disabled: unref(loading) || !loginForm.value.agree
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(loading) ? "登录中..." : "登录"), 1)
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"]),
                      createVNode("div", { class: "google-login-wrap" }, [
                        createVNode(BaseButton, {
                          themeId: "social-google",
                          block: "",
                          type: "button",
                          onClick: ($event) => oauth("google")
                        }, {
                          icon: withCtx(() => [
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
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Google 登录 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ], 32)) : mode.value === "login" && loginType.value === "code" ? (openBlock(), createBlock("form", {
                      key: 2,
                      onSubmit: withModifiers(onLoginCode, ["prevent"])
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "邮箱地址"),
                        createVNode(EmailInput, {
                          modelValue: loginCodeForm.value.email,
                          "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
                          ref_key: "loginCodeEmailInput",
                          ref: loginCodeEmailInput,
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group code-group" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => loginCodeForm.value.code = $event,
                          type: "text",
                          placeholder: "请输入验证码",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, loginCodeForm.value.code]
                        ]),
                        createVNode(SendCodeButton, {
                          loading: unref(loading),
                          countdown: unref(codeTimer),
                          onClick: ($event) => sendCode("login")
                        }, null, 8, ["loading", "countdown", "onClick"])
                      ]),
                      createVNode("div", { class: "form-row" }, [
                        createVNode("label", null, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => loginCodeForm.value.remember = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, loginCodeForm.value.remember]
                          ]),
                          createTextVNode(" 记住我")
                        ])
                      ]),
                      createVNode("div", { class: "form-row" }, [
                        createVNode("label", null, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => loginCodeForm.value.agree = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, loginCodeForm.value.agree]
                          ]),
                          createTextVNode(" 我已阅读并同意 "),
                          createVNode(_component_NuxtLink, {
                            to: "/privacy",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("《隐私协议》")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 和 "),
                          createVNode(_component_NuxtLink, {
                            to: "/policy",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("《用户政策》")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(BaseButton, {
                        themeId: "primary",
                        block: "",
                        class: "submit-action",
                        type: "submit",
                        loading: unref(loading),
                        disabled: unref(loading) || !loginCodeForm.value.agree
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(loading) ? "登录中..." : "登录"), 1)
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"]),
                      createVNode("div", { class: "google-login-wrap" }, [
                        createVNode(BaseButton, {
                          themeId: "social-google",
                          block: "",
                          type: "button",
                          onClick: ($event) => oauth("google")
                        }, {
                          icon: withCtx(() => [
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
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Google 登录 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ], 32)) : mode.value === "login" && loginType.value === "wechat" ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "wechat-login-area"
                    }, [
                      wechatState.value === "loading" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "wechat-loading"
                      }, [
                        createVNode("div", { class: "spinner" }),
                        createVNode("p", null, "正在加载二维码...")
                      ])) : wechatState.value === "qrcode" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "wechat-qrcode"
                      }, [
                        createVNode("p", { class: "qrcode-tip" }, "请使用微信扫描二维码登录"),
                        createVNode("img", {
                          src: wechatQrcodeUrl.value,
                          alt: "WeChat QR Code",
                          class: "qrcode-img"
                        }, null, 8, ["src"]),
                        createVNode("p", { class: "qrcode-hint" }, toDisplayString(wechatPollingHint.value), 1),
                        createVNode("button", {
                          class: "refresh-btn",
                          onClick: refreshWechatQr
                        }, "刷新二维码")
                      ])) : wechatState.value === "bind" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "wechat-bind-form"
                      }, [
                        createVNode("p", { class: "bind-tip" }, "🎉 扫码成功！请绑定邮箱以完成登录"),
                        createVNode("form", {
                          onSubmit: withModifiers(onWechatBind, ["prevent"])
                        }, [
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", null, "邮箱地址"),
                            createVNode(EmailInput, {
                              modelValue: wechatBindForm.value.email,
                              "onUpdate:modelValue": ($event) => wechatBindForm.value.email = $event,
                              required: true
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "form-group code-group" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => wechatBindForm.value.code = $event,
                              type: "text",
                              placeholder: "请输入验证码",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, wechatBindForm.value.code]
                            ]),
                            createVNode(SendCodeButton, {
                              loading: unref(loading),
                              countdown: unref(wechatBindCodeTimer),
                              onClick: sendWechatBindCode
                            }, null, 8, ["loading", "countdown"])
                          ]),
                          createVNode("div", { class: "form-group" }, [
                            createVNode("label", null, "设置密码（可选）"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => wechatBindForm.value.password = $event,
                              type: "password",
                              placeholder: "设置密码后可用密码登录"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, wechatBindForm.value.password]
                            ])
                          ]),
                          createVNode("div", { class: "form-row" }, [
                            createVNode("label", null, [
                              withDirectives(createVNode("input", {
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => wechatBindForm.value.agree = $event,
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, wechatBindForm.value.agree]
                              ]),
                              createTextVNode(" 我已阅读并同意 "),
                              createVNode(_component_NuxtLink, {
                                to: "/privacy",
                                target: "_blank"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("《隐私协议》")
                                ]),
                                _: 1
                              }),
                              createTextVNode(" 和 "),
                              createVNode(_component_NuxtLink, {
                                to: "/policy",
                                target: "_blank"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("《用户政策》")
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(BaseButton, {
                            themeId: "primary",
                            block: "",
                            class: "submit-action",
                            type: "submit",
                            loading: unref(loading),
                            disabled: unref(loading) || !wechatBindForm.value.agree
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(loading) ? "绑定中..." : "绑定并登录"), 1)
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ], 32)
                      ])) : wechatState.value === "logged_in" ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "wechat-success"
                      }, [
                        createVNode("p", null, "✅ 登录成功，正在跳转...")
                      ])) : wechatState.value === "error" ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "wechat-error"
                      }, [
                        createVNode("p", null, toDisplayString(wechatErrorMsg.value), 1),
                        createVNode("button", {
                          class: "refresh-btn",
                          onClick: startWechatLogin
                        }, "重试")
                      ])) : createCommentVNode("", true)
                    ])) : mode.value === "register" ? (openBlock(), createBlock("form", {
                      key: 4,
                      onSubmit: withModifiers(onRegister, ["prevent"])
                    }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "邮箱地址"),
                        createVNode(EmailInput, {
                          modelValue: registerForm.value.email,
                          "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
                          ref_key: "registerEmailInput",
                          ref: registerEmailInput,
                          required: true
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "form-group code-group" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => registerForm.value.code = $event,
                          type: "text",
                          placeholder: "请输入验证码",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, registerForm.value.code]
                        ]),
                        createVNode(SendCodeButton, {
                          loading: unref(loading),
                          countdown: unref(codeTimer),
                          onClick: ($event) => sendCode("register")
                        }, null, 8, ["loading", "countdown", "onClick"])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "密码"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => registerForm.value.password = $event,
                          type: "password",
                          placeholder: "请输入密码 (至少6位)",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, registerForm.value.password]
                        ])
                      ]),
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "邀请码（选填）"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => registerForm.value.inviteId = $event,
                          type: "text",
                          placeholder: "请输入邀请码"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, registerForm.value.inviteId]
                        ])
                      ]),
                      createVNode("div", { class: "form-row" }, [
                        createVNode("label", null, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => registerForm.value.agree = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, registerForm.value.agree]
                          ]),
                          createTextVNode(" 我已阅读并同意 "),
                          createVNode(_component_NuxtLink, {
                            to: "/privacy",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("《隐私协议》")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" 和 "),
                          createVNode(_component_NuxtLink, {
                            to: "/policy",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("《用户政策》")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(BaseButton, {
                        themeId: "primary",
                        block: "",
                        class: "submit-action",
                        type: "submit",
                        loading: unref(loading),
                        disabled: unref(loading) || !registerForm.value.agree
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(loading) ? "注册中..." : "注册"), 1)
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"]),
                      createVNode("div", { class: "google-login-wrap" }, [
                        createVNode(BaseButton, {
                          themeId: "social-google",
                          block: "",
                          type: "button",
                          onClick: ($event) => oauth("google")
                        }, {
                          icon: withCtx(() => [
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
                          ]),
                          default: withCtx(() => [
                            createTextVNode(" Google 注册 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ], 32)) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (showPrivacyDialog.value) {
          _push2(`<div class="dialog-mask" data-v-4625df0e><div class="dialog-box" data-v-4625df0e><div class="dialog-title" data-v-4625df0e>隐私协议</div><div class="dialog-content" data-v-4625df0e>这里是隐私协议内容...</div><button class="dialog-close" data-v-4625df0e>关闭</button></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (showPolicyDialog.value) {
          _push2(`<div class="dialog-mask" data-v-4625df0e><div class="dialog-box" data-v-4625df0e><div class="dialog-title" data-v-4625df0e>用户政策</div><div class="dialog-content" data-v-4625df0e>这里是用户政策内容...</div><button class="dialog-close" data-v-4625df0e>关闭</button></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (showForgotDialog.value) {
          _push2(`<div class="dialog-mask" data-v-4625df0e><div class="dialog-box" data-v-4625df0e><div class="dialog-title" data-v-4625df0e>找回密码</div><form data-v-4625df0e><div class="form-group" data-v-4625df0e><label data-v-4625df0e>邮箱地址</label>`);
          _push2(ssrRenderComponent(EmailInput, {
            modelValue: forgotForm.value.email,
            "onUpdate:modelValue": ($event) => forgotForm.value.email = $event,
            required: true
          }, null, _parent));
          _push2(`</div><div class="form-group code-group" data-v-4625df0e><label data-v-4625df0e>验证码</label><input${ssrRenderAttr("value", forgotForm.value.code)} type="text" placeholder="请输入验证码" required data-v-4625df0e>`);
          _push2(ssrRenderComponent(SendCodeButton, {
            loading: unref(loading),
            countdown: unref(forgotCodeTimer),
            onClick: sendForgotCode
          }, null, _parent));
          _push2(`</div><div class="form-group" data-v-4625df0e><label data-v-4625df0e>新密码</label><input${ssrRenderAttr("value", forgotForm.value.password)} type="password" placeholder="请输入新密码 (至少6位)" required data-v-4625df0e></div>`);
          _push2(ssrRenderComponent(BaseButton, {
            themeId: "primary",
            block: "",
            class: "submit-action",
            type: "submit",
            loading: unref(loading)
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`${ssrInterpolate(unref(loading) ? "重置中..." : "重置密码")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(loading) ? "重置中..." : "重置密码"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</form><button class="dialog-close" data-v-4625df0e>关闭</button></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4625df0e"]]);
export {
  __nuxt_component_0 as default
};
//# sourceMappingURL=LoginRegisterModal-Cb2thB66.js.map
