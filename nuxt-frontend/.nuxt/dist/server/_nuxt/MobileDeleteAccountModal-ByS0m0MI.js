import { defineComponent, ref, watch, unref, useSSRContext, reactive, computed } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { b as close_default, I as check_default } from "./index-CCIZH4aC.js";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import { u as useNotify } from "./useNotify-Bx9I1ZGd.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useSendCode } from "./useSendCode-CIzwVzrG.js";
import { useRouter } from "vue-router";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "EditNicknameModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentNickname: {}
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useUserStore();
    const newValue = ref("");
    const loading = ref(false);
    useNotify();
    watch(() => props.visible, (val) => {
      if (val) {
        newValue.value = props.currentNickname || "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-7d58658a><div class="modal-content aurora-modal-panel" data-v-7d58658a><div class="modal-header" data-v-7d58658a><h3 class="modal-title" data-v-7d58658a>修改昵称</h3><button class="close-btn" data-v-7d58658a>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-7d58658a><div class="form-item" data-v-7d58658a><label data-v-7d58658a>新昵称</label><input${ssrRenderAttr("value", newValue.value)} type="text" class="aurora-input" placeholder="请输入新昵称" maxlength="20" data-v-7d58658a></div></div><div class="modal-footer" data-v-7d58658a><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !newValue.value.trim()) ? " disabled" : ""} data-v-7d58658a>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-7d58658a></span>`);
          } else {
            _push2(`<span data-v-7d58658a>保存</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/EditNicknameModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const EditNicknameModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7d58658a"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileChangePasswordModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const userStore = useUserStore();
    useNotify();
    const form = reactive({
      code: "",
      newPassword: "",
      confirmPassword: ""
    });
    const canSubmit = computed(() => {
      return form.code.length >= 4 && form.newPassword.length >= 6 && form.newPassword === form.confirmPassword;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        form.code = "";
        form.newPassword = "";
        form.confirmPassword = "";
      }
    });
    const {
      loading: codeLoading,
      countdown
    } = useSendCode({ timerKey: "otp_security_timer" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-107ccbe8><div class="modal-content aurora-modal-panel" data-v-107ccbe8><div class="modal-header" data-v-107ccbe8><h3 class="modal-title" data-v-107ccbe8>修改登录密码</h3><button class="close-btn" data-v-107ccbe8>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-107ccbe8>`);
          if (!unref(userStore).user?.email) {
            _push2(`<div class="alert-box" data-v-107ccbe8> 请先绑定邮箱，修改密码需要邮箱验证。 </div>`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-107ccbe8><label data-v-107ccbe8>邮箱验证码</label><div class="input-row" data-v-107ccbe8><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-107ccbe8><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-107ccbe8>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "发送验证码")}</button></div></div><div class="form-item" data-v-107ccbe8><label data-v-107ccbe8>新密码</label><input${ssrRenderAttr("value", form.newPassword)} type="password" class="aurora-input" placeholder="请输入新密码 (6-20位)" data-v-107ccbe8></div><div class="form-item" data-v-107ccbe8><label data-v-107ccbe8>确认密码</label><input${ssrRenderAttr("value", form.confirmPassword)} type="password" class="aurora-input" placeholder="再次输入新密码" data-v-107ccbe8></div><!--]-->`);
          }
          _push2(`</div><div class="modal-footer" data-v-107ccbe8><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || loading.value) ? " disabled" : ""} data-v-107ccbe8>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-107ccbe8></div>`);
          } else {
            _push2(`<span data-v-107ccbe8>确认修改</span>`);
          }
          _push2(`</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/MobileChangePasswordModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-107ccbe8"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileDeleteAccountModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const userStore = useUserStore();
    useRouter();
    useNotify();
    const isConfirmed = ref(false);
    const otpCode = ref("");
    const {
      loading: codeLoading,
      countdown
    } = useSendCode({ timerKey: "otp_security_timer" });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || codeLoading.value);
    const canSubmit = computed(() => {
      return isConfirmed.value && otpCode.value.length >= 4;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        isConfirmed.value = false;
        otpCode.value = "";
        countdown.value = 0;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-7310f626><div class="modal-content aurora-modal-panel" data-v-7310f626><div class="modal-header" data-v-7310f626><h3 class="modal-title text-danger" data-v-7310f626>注销账号</h3><button class="close-btn" data-v-7310f626>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-7310f626><div class="warning-box" data-v-7310f626><div class="warning-icon" data-v-7310f626>!</div><p data-v-7310f626>警告：账号注销是不可恢复的操作。所有个人数据将被永久删除。</p></div><div class="form-item" data-v-7310f626><label data-v-7310f626>邮箱验证 (${ssrInterpolate(unref(userStore).user?.email)})</label><div class="input-row" data-v-7310f626><input${ssrRenderAttr("value", otpCode.value)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-7310f626><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-7310f626>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "发送验证码")}</button></div></div><div class="checkbox-row" data-v-7310f626><div class="${ssrRenderClass([{ checked: isConfirmed.value }, "checkbox"])}" data-v-7310f626>`);
          if (isConfirmed.value) {
            _push2(ssrRenderComponent(unref(check_default), { class: "check-icon" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-7310f626>我已了解风险，确认注销当前账号</span></div></div><div class="modal-footer" data-v-7310f626><button class="aurora-btn-danger"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-7310f626>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-7310f626></span>`);
          } else {
            _push2(`<span data-v-7310f626>确认注销</span>`);
          }
          _push2(`</button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/MobileDeleteAccountModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileDeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7310f626"]]);
export {
  EditNicknameModal as E,
  MobileChangePasswordModal as M,
  MobileDeleteAccountModal as a
};
//# sourceMappingURL=MobileDeleteAccountModal-ByS0m0MI.js.map
