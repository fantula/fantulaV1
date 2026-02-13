/* empty css              */
/* empty css                    */
import { defineComponent, ref, watch, unref, useSSRContext, reactive, computed } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import { f as close_default, M as check_default } from "./index-DuV_oMrC.js";
import { u as useUserStore } from "./user-C1i1UnhA.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useSendCode } from "./useSendCode-BPjllPca.js";
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
    watch(() => props.visible, (val) => {
      if (val) {
        newValue.value = props.currentNickname || "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-fe3b8411><div class="modal-content aurora-modal-panel" data-v-fe3b8411><div class="modal-header" data-v-fe3b8411><h3 class="modal-title" data-v-fe3b8411>修改昵称</h3><button class="close-btn" data-v-fe3b8411>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-fe3b8411><div class="form-item" data-v-fe3b8411><label data-v-fe3b8411>新昵称</label><input${ssrRenderAttr("value", newValue.value)} type="text" class="aurora-input" placeholder="请输入新昵称" maxlength="20" data-v-fe3b8411></div></div><div class="modal-footer" data-v-fe3b8411><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !newValue.value.trim()) ? " disabled" : ""} data-v-fe3b8411>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-fe3b8411></span>`);
          } else {
            _push2(`<span data-v-fe3b8411>保存</span>`);
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
const EditNicknameModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-fe3b8411"]]);
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
          _push2(`<div class="modal-overlay" data-v-19779d2a><div class="modal-content aurora-modal-panel" data-v-19779d2a><div class="modal-header" data-v-19779d2a><h3 class="modal-title" data-v-19779d2a>修改登录密码</h3><button class="close-btn" data-v-19779d2a>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-19779d2a>`);
          if (!unref(userStore).user?.email) {
            _push2(`<div class="alert-box" data-v-19779d2a> 请先绑定邮箱，修改密码需要邮箱验证。 </div>`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-19779d2a><label data-v-19779d2a>邮箱验证码</label><div class="input-row" data-v-19779d2a><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-19779d2a><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-19779d2a>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "发送验证码")}</button></div></div><div class="form-item" data-v-19779d2a><label data-v-19779d2a>新密码</label><input${ssrRenderAttr("value", form.newPassword)} type="password" class="aurora-input" placeholder="请输入新密码 (6-20位)" data-v-19779d2a></div><div class="form-item" data-v-19779d2a><label data-v-19779d2a>确认密码</label><input${ssrRenderAttr("value", form.confirmPassword)} type="password" class="aurora-input" placeholder="再次输入新密码" data-v-19779d2a></div><!--]-->`);
          }
          _push2(`</div><div class="modal-footer" data-v-19779d2a><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || loading.value) ? " disabled" : ""} data-v-19779d2a>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-19779d2a></div>`);
          } else {
            _push2(`<span data-v-19779d2a>确认修改</span>`);
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
const ChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-19779d2a"]]);
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
          _push2(`<div class="modal-overlay" data-v-c25ccc01><div class="modal-content aurora-modal-panel" data-v-c25ccc01><div class="modal-header" data-v-c25ccc01><h3 class="modal-title" data-v-c25ccc01>${ssrInterpolate(step.value === 1 && currentEmail.value ? "验证原邮箱" : "绑定新邮箱")}</h3><button class="close-btn" data-v-c25ccc01>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-c25ccc01>`);
          if (currentEmail.value && step.value === 1) {
            _push2(`<!--[--><div class="alert-box" data-v-c25ccc01> 为了您的账号安全，请先验证当前邮箱。 </div><div class="form-item" data-v-c25ccc01><label data-v-c25ccc01>当前邮箱</label><input${ssrRenderAttr("value", currentEmail.value)} disabled class="aurora-input disabled-input" style="${ssrRenderStyle({ "color": "#94A3B8" })}" data-v-c25ccc01></div><div class="form-item" data-v-c25ccc01><label data-v-c25ccc01>验证码</label><div class="input-row" data-v-c25ccc01><input${ssrRenderAttr("value", oldCode.value)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-c25ccc01><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-c25ccc01>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || oldCode.value.length < 4) ? " disabled" : ""} data-v-c25ccc01>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-c25ccc01></div>`);
            } else {
              _push2(`<span data-v-c25ccc01>下一步</span>`);
            }
            _push2(`</button><!--]-->`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-c25ccc01><label data-v-c25ccc01>新邮箱地址</label><input${ssrRenderAttr("value", form.email)} type="email" class="aurora-input" placeholder="请输入新邮箱" data-v-c25ccc01></div><div class="form-item" data-v-c25ccc01><label data-v-c25ccc01>验证码</label><div class="input-row" data-v-c25ccc01><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="新邮箱验证码" maxlength="6" data-v-c25ccc01><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value || !isEmailValid.value) ? " disabled" : ""} data-v-c25ccc01>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-c25ccc01>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-c25ccc01></div>`);
            } else {
              _push2(`<span data-v-c25ccc01>确认绑定</span>`);
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
const ChangeEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c25ccc01"]]);
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
          _push2(`<div class="modal-overlay" data-v-18407a9d><div class="modal-content aurora-modal-panel" data-v-18407a9d><div class="modal-header" data-v-18407a9d><h3 class="modal-title text-danger" data-v-18407a9d>注销账号</h3><button class="close-btn" data-v-18407a9d>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-18407a9d><div class="warning-box" data-v-18407a9d><div class="warning-icon" data-v-18407a9d>!</div><p data-v-18407a9d>警告：账号注销是不可恢复的操作。所有个人数据将被永久删除。</p></div><div class="form-item" data-v-18407a9d><label data-v-18407a9d>邮箱验证 (${ssrInterpolate(unref(userStore).user?.email)})</label><div class="input-row" data-v-18407a9d><input${ssrRenderAttr("value", otpCode.value)} type="text" class="aurora-input" placeholder="请输入验证码" maxlength="6" data-v-18407a9d><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-18407a9d>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "发送验证码")}</button></div></div><div class="checkbox-row" data-v-18407a9d><div class="${ssrRenderClass([{ checked: isConfirmed.value }, "checkbox"])}" data-v-18407a9d>`);
          if (isConfirmed.value) {
            _push2(ssrRenderComponent(unref(check_default), { class: "check-icon" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-18407a9d>我已了解风险，确认注销当前账号</span></div></div><div class="modal-footer" data-v-18407a9d><button class="aurora-btn-danger"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-18407a9d>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-18407a9d></span>`);
          } else {
            _push2(`<span data-v-18407a9d>确认注销</span>`);
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
const DeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18407a9d"]]);
export {
  ChangePasswordModal as C,
  DeleteAccountModal as D,
  EditNicknameModal as E,
  ChangeEmailModal as a
};
//# sourceMappingURL=DeleteAccountModal-D7knrCNj.js.map
