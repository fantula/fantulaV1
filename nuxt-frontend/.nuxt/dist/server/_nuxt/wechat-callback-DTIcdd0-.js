import "./base-CEWXqFm3.js";
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrInterpolate } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useUserStore, a as authApi } from "./user-DLDq0pTF.js";
import { l as useGlobalLoading, _ as _export_sfc } from "../server.mjs";
import { u as useNotify } from "./useNotify-QNEBBzdZ.js";
import { E as EmailInput } from "./EmailInput-BxuFUYqG.js";
import { S as SendCodeButton } from "./SendCodeButton-BHMZfVap.js";
import { u as useSendCode } from "./useSendCode-Cwwhl1Ua.js";
import { E as ElMessageBox } from "./index-VfPbkY7T.js";
import "lodash-unified";
import "@vue/shared";
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
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-BwQVtIp5.js";
import "./typescript-D6L75muK.js";
import "./icon-Ck0_dGQP.js";
import "./index-DNnPa_Q9.js";
import "./index-_zadwVDN.js";
import "./objects-Bz74KHmq.js";
import "./use-global-config-C5kRDPtv.js";
import "./index-DbvZsXcZ.js";
import "./event-D3FEo2C5.js";
import "./interval-BnEBQU8I.js";
import "./index-CXu9YNCC.js";
import "./use-form-item-D2hCqQW8.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-BeH2PDwZ.js";
import "./event-BZTOGHfp.js";
import "./index-Cxdfotkm.js";
import "./index-DuyRWKSc.js";
import "./aria-Rs9hkxop.js";
import "./index-IoXmILvB.js";
import "./vnode-uc6o_sOa.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./validator-BZYOvvAA.js";
import "./index-BrJcxSwt.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
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
        warning("请输入邮箱");
        return;
      }
      uniqueLoading.value = true;
      try {
        const checkRes = await authApi.checkEmailAvailable(bindForm.value.email);
        if (!checkRes.success) {
          error(checkRes.msg || "检查邮箱失败");
          return;
        }
        const emailAvailable = checkRes.data;
        if (!emailAvailable) {
          try {
            await ElMessageBox.confirm(
              "该邮箱已被其他账号注册。继续绑定将把此微信号关联到该现有账号，并共享权益。",
              "账号合并提示",
              {
                confirmButtonText: "确认关联",
                cancelButtonText: "更换邮箱",
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
        error("发送失败: " + (err.message || "网络错误"));
      } finally {
        uniqueLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wechat-callback-page" }, _attrs))} data-v-7ad519d0>`);
      if (state.value === "loading") {
        _push(`<div class="callback-loading" data-v-7ad519d0><div class="spinner" data-v-7ad519d0></div><p data-v-7ad519d0>正在处理登录...</p></div>`);
      } else if (state.value === "bind") {
        _push(`<div class="callback-bind" data-v-7ad519d0><div class="bind-header" data-v-7ad519d0><div class="success-icon" data-v-7ad519d0>🎉</div><h2 data-v-7ad519d0>微信授权成功</h2><p data-v-7ad519d0>请绑定邮箱以完成登录</p></div><form class="bind-form" data-v-7ad519d0><div class="input-group" data-v-7ad519d0>`);
        _push(ssrRenderComponent(EmailInput, {
          modelValue: bindForm.value.email,
          "onUpdate:modelValue": ($event) => bindForm.value.email = $event,
          required: true,
          placeholder: "请输入邮箱"
        }, null, _parent));
        _push(`</div><div class="input-group code-row" data-v-7ad519d0><input${ssrRenderAttr("value", bindForm.value.code)} type="text" placeholder="验证码" required class="custom-input" data-v-7ad519d0>`);
        _push(ssrRenderComponent(SendCodeButton, {
          loading: loading.value,
          countdown: unref(codeTimer),
          onClick: sendCode
        }, null, _parent));
        _push(`</div><div class="input-group" data-v-7ad519d0><input${ssrRenderAttr("value", bindForm.value.password)} type="password" placeholder="设置密码（可选）" class="custom-input" data-v-7ad519d0></div><div class="form-agreement" data-v-7ad519d0><label data-v-7ad519d0><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(bindForm.value.agree) ? ssrLooseContain(bindForm.value.agree, null) : bindForm.value.agree) ? " checked" : ""} data-v-7ad519d0><span data-v-7ad519d0>同意 <span class="link" data-v-7ad519d0>用户协议</span> 和 <span class="link" data-v-7ad519d0>隐私政策</span></span></label></div><button class="submit-btn aurora-btn-primary" type="submit"${ssrIncludeBooleanAttr(loading.value || !bindForm.value.agree) ? " disabled" : ""} data-v-7ad519d0>${ssrInterpolate(loading.value ? "绑定中..." : "绑定并登录")}</button></form></div>`);
      } else if (state.value === "success") {
        _push(`<div class="callback-success" data-v-7ad519d0><div class="success-icon" data-v-7ad519d0>✅</div><p data-v-7ad519d0>登录成功，正在跳转...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="callback-error" data-v-7ad519d0><div class="error-icon" data-v-7ad519d0>❌</div><p data-v-7ad519d0>${ssrInterpolate(errorMsg.value)}</p><button class="retry-btn" data-v-7ad519d0>返回首页</button></div>`);
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
const wechatCallback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ad519d0"]]);
export {
  wechatCallback as default
};
//# sourceMappingURL=wechat-callback-DTIcdd0-.js.map
