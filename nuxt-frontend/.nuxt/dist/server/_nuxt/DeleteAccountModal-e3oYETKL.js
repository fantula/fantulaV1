import { defineComponent, ref, watch, unref, useSSRContext, reactive, computed } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { f as close_default, M as check_default } from "./index-CRs4T-Jf.js";
import { u as useUserStore } from "./user-0iCypJz1.js";
import { u as useNotify } from "./useNotify-CME3DTm8.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useSendCode } from "./useSendCode-DUIi8Gb_.js";
import { useRouter } from "vue-router";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/EditNicknameModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const EditNicknameModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7d58658a"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChangePasswordModal",
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
          _push2(`<div class="modal-overlay" data-v-092ab233><div class="modal-content aurora-modal-panel" data-v-092ab233><div class="modal-header" data-v-092ab233><h3 class="modal-title" data-v-092ab233>修改登录密码</h3><button class="close-btn" data-v-092ab233>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-092ab233>`);
          if (!unref(userStore).user?.email) {
            _push2(`<div class="alert-box" data-v-092ab233> 请先绑定邮箱，修改密码需要邮箱验证。 </div>`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-092ab233><label data-v-092ab233>邮箱验证码</label><div class="input-row" data-v-092ab233><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-092ab233><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-092ab233>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "发送验证码")}</button></div></div><div class="form-item" data-v-092ab233><label data-v-092ab233>新密码</label><input${ssrRenderAttr("value", form.newPassword)} type="password" class="aurora-input" placeholder="请输入新密码 (6-20位)" data-v-092ab233></div><div class="form-item" data-v-092ab233><label data-v-092ab233>确认密码</label><input${ssrRenderAttr("value", form.confirmPassword)} type="password" class="aurora-input" placeholder="再次输入新密码" data-v-092ab233></div><!--]-->`);
          }
          _push2(`</div><div class="modal-footer" data-v-092ab233><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || loading.value) ? " disabled" : ""} data-v-092ab233>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-092ab233></div>`);
          } else {
            _push2(`<span data-v-092ab233>确认修改</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/ChangePasswordModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-092ab233"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChangeEmailModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const userStore = useUserStore();
    const step = ref(1);
    useNotify();
    const currentEmail = computed(() => userStore.user?.email);
    const oldCode = ref("");
    const form = reactive({
      email: "",
      code: ""
    });
    const isEmailValid = computed(() => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    });
    const canSubmit = computed(() => {
      return isEmailValid.value && form.code.length >= 4;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        step.value = currentEmail.value ? 1 : 2;
        oldCode.value = "";
        form.email = "";
        form.code = "";
      }
    });
    const {
      loading: oldLoading,
      countdown: oldCountdown
    } = useSendCode({ timerKey: "otp_security_timer" });
    const {
      loading: newLoading,
      countdown: newCountdown
    } = useSendCode({ timerKey: "otp_bind_new_timer_end" });
    watch(() => props.visible, (val) => {
    });
    const baseLoading = ref(false);
    const loading = computed(() => baseLoading.value || oldLoading.value || newLoading.value);
    const countdown = computed(() => step.value === 1 ? oldCountdown.value : newCountdown.value);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-921fe21d><div class="modal-content aurora-modal-panel" data-v-921fe21d><div class="modal-header" data-v-921fe21d><h3 class="modal-title" data-v-921fe21d>${ssrInterpolate(step.value === 1 && currentEmail.value ? "验证原邮箱" : "绑定新邮箱")}</h3><button class="close-btn" data-v-921fe21d>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-921fe21d>`);
          if (currentEmail.value && step.value === 1) {
            _push2(`<!--[--><div class="alert-box" data-v-921fe21d> 为了您的账号安全，请先验证当前邮箱。 </div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>当前邮箱</label><input${ssrRenderAttr("value", currentEmail.value)} disabled class="aurora-input disabled-input" style="${ssrRenderStyle({ "color": "#94A3B8" })}" data-v-921fe21d></div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>验证码</label><div class="input-row" data-v-921fe21d><input${ssrRenderAttr("value", oldCode.value)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-921fe21d><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-921fe21d>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || oldCode.value.length < 4) ? " disabled" : ""} data-v-921fe21d>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-921fe21d></div>`);
            } else {
              _push2(`<span data-v-921fe21d>下一步</span>`);
            }
            _push2(`</button><!--]-->`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-921fe21d><label data-v-921fe21d>新邮箱地址</label><input${ssrRenderAttr("value", form.email)} type="email" class="aurora-input" placeholder="请输入新邮箱" data-v-921fe21d></div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>验证码</label><div class="input-row" data-v-921fe21d><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="新邮箱验证码" maxlength="6" data-v-921fe21d><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value || !isEmailValid.value) ? " disabled" : ""} data-v-921fe21d>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-921fe21d>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-921fe21d></div>`);
            } else {
              _push2(`<span data-v-921fe21d>确认绑定</span>`);
            }
            _push2(`</button><!--]-->`);
          }
          _push2(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/ChangeEmailModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ChangeEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-921fe21d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteAccountModal",
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
          _push2(`<div class="modal-overlay" data-v-3b755255><div class="modal-content aurora-modal-panel" data-v-3b755255><div class="modal-header" data-v-3b755255><h3 class="modal-title text-danger" data-v-3b755255>注销账号</h3><button class="close-btn" data-v-3b755255>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-3b755255><div class="warning-box" data-v-3b755255><div class="warning-icon" data-v-3b755255>!</div><p data-v-3b755255>警告：账号注销是不可恢复的操作。所有个人数据将被永久删除。</p></div><div class="form-item" data-v-3b755255><label data-v-3b755255>邮箱验证 (${ssrInterpolate(unref(userStore).user?.email)})</label><div class="input-row" data-v-3b755255><input${ssrRenderAttr("value", otpCode.value)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-3b755255><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-3b755255>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "发送验证码")}</button></div></div><div class="checkbox-row" data-v-3b755255><div class="${ssrRenderClass([{ checked: isConfirmed.value }, "checkbox"])}" data-v-3b755255>`);
          if (isConfirmed.value) {
            _push2(ssrRenderComponent(unref(check_default), { class: "check-icon" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-3b755255>我已了解风险，确认注销当前账号</span></div></div><div class="modal-footer" data-v-3b755255><button class="aurora-btn-danger"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-3b755255>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-3b755255></span>`);
          } else {
            _push2(`<span data-v-3b755255>确认注销</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/DeleteAccountModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b755255"]]);
export {
  ChangePasswordModal as C,
  DeleteAccountModal as D,
  EditNicknameModal as E,
  ChangeEmailModal as a
};
//# sourceMappingURL=DeleteAccountModal-e3oYETKL.js.map
