/* empty css              */
/* empty css                    */
import { defineComponent, ref, watch, unref, useSSRContext, reactive, computed } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { b as close_default, G as check_default } from "./index-DlETah8a.js";
import { u as useUserStore } from "./user-Cnuc6I82.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
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
          _push2(`<div class="modal-overlay" data-v-8991de00><div class="modal-content" data-v-8991de00><div class="modal-header" data-v-8991de00><h3 class="modal-title" data-v-8991de00>修改昵称</h3><button class="close-btn" data-v-8991de00>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-8991de00><div class="form-item" data-v-8991de00><label data-v-8991de00>新昵称</label><input${ssrRenderAttr("value", newValue.value)} type="text" placeholder="请输入新昵称" maxlength="20" data-v-8991de00></div></div><div class="modal-footer" data-v-8991de00><button class="cancel-btn" data-v-8991de00>取消</button><button class="save-btn"${ssrIncludeBooleanAttr(loading.value || !newValue.value.trim()) ? " disabled" : ""} data-v-8991de00>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-8991de00></span>`);
          } else {
            _push2(`<span data-v-8991de00>保存</span>`);
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
const EditNicknameModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-8991de00"]]);
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
    const loading = ref(false);
    const countdown = ref(0);
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
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-e39125ce><div class="modal-content" data-v-e39125ce><div class="modal-header" data-v-e39125ce><h3 class="modal-title" data-v-e39125ce>修改登录密码</h3><button class="close-btn" data-v-e39125ce>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-e39125ce>`);
          if (!unref(userStore).user?.email) {
            _push2(`<div class="alert-box" data-v-e39125ce> 请先绑定邮箱，修改密码需要邮箱验证。 </div>`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-e39125ce><label data-v-e39125ce>邮箱验证码</label><div class="input-row" data-v-e39125ce><input${ssrRenderAttr("value", form.code)} type="text" placeholder="请输入验证码" maxlength="6" data-v-e39125ce><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-e39125ce>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><div class="form-item" data-v-e39125ce><label data-v-e39125ce>新密码</label><input${ssrRenderAttr("value", form.newPassword)} type="password" placeholder="请输入新密码 (6-20位)" data-v-e39125ce></div><div class="form-item" data-v-e39125ce><label data-v-e39125ce>确认密码</label><input${ssrRenderAttr("value", form.confirmPassword)} type="password" placeholder="再次输入新密码" data-v-e39125ce></div><!--]-->`);
          }
          _push2(`</div><div class="modal-footer" data-v-e39125ce><button class="cancel-btn" data-v-e39125ce>取消</button><button class="submit-btn"${ssrIncludeBooleanAttr(!canSubmit.value || loading.value) ? " disabled" : ""} data-v-e39125ce>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-e39125ce></div>`);
          } else {
            _push2(`<span data-v-e39125ce>确认修改</span>`);
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
const ChangePasswordModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e39125ce"]]);
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
    const loading = ref(false);
    const countdown = ref(0);
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
        countdown.value = 0;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-5e076093><div class="modal-content" data-v-5e076093><div class="modal-header" data-v-5e076093><h3 class="modal-title" data-v-5e076093>${ssrInterpolate(step.value === 1 && currentEmail.value ? "验证原邮箱" : "绑定新邮箱")}</h3><button class="close-btn" data-v-5e076093>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-5e076093>`);
          if (currentEmail.value && step.value === 1) {
            _push2(`<!--[--><div class="alert-box" data-v-5e076093> 为了您的账号安全，请先验证当前邮箱。 </div><div class="form-item" data-v-5e076093><label data-v-5e076093>当前邮箱</label><input${ssrRenderAttr("value", currentEmail.value)} disabled class="disabled-input" data-v-5e076093></div><div class="form-item" data-v-5e076093><label data-v-5e076093>验证码</label><div class="input-row" data-v-5e076093><input${ssrRenderAttr("value", oldCode.value)} type="text" placeholder="请输入验证码" maxlength="6" data-v-5e076093><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-5e076093>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="submit-btn full-width"${ssrIncludeBooleanAttr(loading.value || oldCode.value.length < 4) ? " disabled" : ""} data-v-5e076093>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-5e076093></div>`);
            } else {
              _push2(`<span data-v-5e076093>下一步</span>`);
            }
            _push2(`</button><!--]-->`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-5e076093><label data-v-5e076093>新邮箱地址</label><input${ssrRenderAttr("value", form.email)} type="email" placeholder="请输入新邮箱" data-v-5e076093></div><div class="form-item" data-v-5e076093><label data-v-5e076093>验证码</label><div class="input-row" data-v-5e076093><input${ssrRenderAttr("value", form.code)} type="text" placeholder="新邮箱验证码" maxlength="6" data-v-5e076093><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value || !isEmailValid.value) ? " disabled" : ""} data-v-5e076093>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><button class="submit-btn full-width"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-5e076093>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-5e076093></div>`);
            } else {
              _push2(`<span data-v-5e076093>确认绑定</span>`);
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
const ChangeEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5e076093"]]);
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
    const loading = ref(false);
    const countdown = ref(0);
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
          _push2(`<div class="modal-overlay" data-v-353d20e1><div class="modal-content" data-v-353d20e1><div class="modal-header" data-v-353d20e1><h3 class="modal-title text-danger" data-v-353d20e1>注销账号</h3><button class="close-btn" data-v-353d20e1>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-353d20e1><div class="warning-box" data-v-353d20e1><div class="warning-icon" data-v-353d20e1>!</div><p data-v-353d20e1>警告：账号注销是不可恢复的操作。所有个人数据将被永久删除。</p></div><div class="form-item" data-v-353d20e1><label data-v-353d20e1>邮箱验证 (${ssrInterpolate(unref(userStore).user?.email)})</label><div class="input-row" data-v-353d20e1><input${ssrRenderAttr("value", otpCode.value)} type="text" placeholder="请输入验证码" maxlength="6" data-v-353d20e1><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-353d20e1>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "发送验证码")}</button></div></div><div class="checkbox-row" data-v-353d20e1><div class="${ssrRenderClass([{ checked: isConfirmed.value }, "checkbox"])}" data-v-353d20e1>`);
          if (isConfirmed.value) {
            _push2(ssrRenderComponent(unref(check_default), { class: "check-icon" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-353d20e1>我已了解风险，确认注销当前账号</span></div></div><div class="modal-footer" data-v-353d20e1><button class="cancel-btn" data-v-353d20e1>取消</button><button class="save-btn btn-danger"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-353d20e1>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-353d20e1></span>`);
          } else {
            _push2(`<span data-v-353d20e1>确认注销</span>`);
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
const DeleteAccountModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-353d20e1"]]);
export {
  ChangePasswordModal as C,
  DeleteAccountModal as D,
  EditNicknameModal as E,
  ChangeEmailModal as a
};
//# sourceMappingURL=DeleteAccountModal-B5RDsU7s.js.map
