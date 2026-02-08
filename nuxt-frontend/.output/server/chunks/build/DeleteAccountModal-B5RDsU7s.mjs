import { defineComponent, ref, watch, unref, reactive, computed, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { j as close_default, G as check_default } from './index-DlETah8a.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
import { _ as _export_sfc } from './server.mjs';
import { useRouter } from 'vue-router';

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
          _push2(`<div class="modal-overlay" data-v-8991de00><div class="modal-content" data-v-8991de00><div class="modal-header" data-v-8991de00><h3 class="modal-title" data-v-8991de00>\u4FEE\u6539\u6635\u79F0</h3><button class="close-btn" data-v-8991de00>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-8991de00><div class="form-item" data-v-8991de00><label data-v-8991de00>\u65B0\u6635\u79F0</label><input${ssrRenderAttr("value", newValue.value)} type="text" placeholder="\u8BF7\u8F93\u5165\u65B0\u6635\u79F0" maxlength="20" data-v-8991de00></div></div><div class="modal-footer" data-v-8991de00><button class="cancel-btn" data-v-8991de00>\u53D6\u6D88</button><button class="save-btn"${ssrIncludeBooleanAttr(loading.value || !newValue.value.trim()) ? " disabled" : ""} data-v-8991de00>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-8991de00></span>`);
          } else {
            _push2(`<span data-v-8991de00>\u4FDD\u5B58</span>`);
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
        var _a;
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-e39125ce><div class="modal-content" data-v-e39125ce><div class="modal-header" data-v-e39125ce><h3 class="modal-title" data-v-e39125ce>\u4FEE\u6539\u767B\u5F55\u5BC6\u7801</h3><button class="close-btn" data-v-e39125ce>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-e39125ce>`);
          if (!((_a = unref(userStore).user) == null ? void 0 : _a.email)) {
            _push2(`<div class="alert-box" data-v-e39125ce> \u8BF7\u5148\u7ED1\u5B9A\u90AE\u7BB1\uFF0C\u4FEE\u6539\u5BC6\u7801\u9700\u8981\u90AE\u7BB1\u9A8C\u8BC1\u3002 </div>`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-e39125ce><label data-v-e39125ce>\u90AE\u7BB1\u9A8C\u8BC1\u7801</label><div class="input-row" data-v-e39125ce><input${ssrRenderAttr("value", form.code)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-e39125ce><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-e39125ce>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><div class="form-item" data-v-e39125ce><label data-v-e39125ce>\u65B0\u5BC6\u7801</label><input${ssrRenderAttr("value", form.newPassword)} type="password" placeholder="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801 (6-20\u4F4D)" data-v-e39125ce></div><div class="form-item" data-v-e39125ce><label data-v-e39125ce>\u786E\u8BA4\u5BC6\u7801</label><input${ssrRenderAttr("value", form.confirmPassword)} type="password" placeholder="\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801" data-v-e39125ce></div><!--]-->`);
          }
          _push2(`</div><div class="modal-footer" data-v-e39125ce><button class="cancel-btn" data-v-e39125ce>\u53D6\u6D88</button><button class="submit-btn"${ssrIncludeBooleanAttr(!canSubmit.value || loading.value) ? " disabled" : ""} data-v-e39125ce>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-e39125ce></div>`);
          } else {
            _push2(`<span data-v-e39125ce>\u786E\u8BA4\u4FEE\u6539</span>`);
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
    const currentEmail = computed(() => {
      var _a;
      return (_a = userStore.user) == null ? void 0 : _a.email;
    });
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
          _push2(`<div class="modal-overlay" data-v-5e076093><div class="modal-content" data-v-5e076093><div class="modal-header" data-v-5e076093><h3 class="modal-title" data-v-5e076093>${ssrInterpolate(step.value === 1 && currentEmail.value ? "\u9A8C\u8BC1\u539F\u90AE\u7BB1" : "\u7ED1\u5B9A\u65B0\u90AE\u7BB1")}</h3><button class="close-btn" data-v-5e076093>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-5e076093>`);
          if (currentEmail.value && step.value === 1) {
            _push2(`<!--[--><div class="alert-box" data-v-5e076093> \u4E3A\u4E86\u60A8\u7684\u8D26\u53F7\u5B89\u5168\uFF0C\u8BF7\u5148\u9A8C\u8BC1\u5F53\u524D\u90AE\u7BB1\u3002 </div><div class="form-item" data-v-5e076093><label data-v-5e076093>\u5F53\u524D\u90AE\u7BB1</label><input${ssrRenderAttr("value", currentEmail.value)} disabled class="disabled-input" data-v-5e076093></div><div class="form-item" data-v-5e076093><label data-v-5e076093>\u9A8C\u8BC1\u7801</label><div class="input-row" data-v-5e076093><input${ssrRenderAttr("value", oldCode.value)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-5e076093><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-5e076093>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><button class="submit-btn full-width"${ssrIncludeBooleanAttr(loading.value || oldCode.value.length < 4) ? " disabled" : ""} data-v-5e076093>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-5e076093></div>`);
            } else {
              _push2(`<span data-v-5e076093>\u4E0B\u4E00\u6B65</span>`);
            }
            _push2(`</button><!--]-->`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-5e076093><label data-v-5e076093>\u65B0\u90AE\u7BB1\u5730\u5740</label><input${ssrRenderAttr("value", form.email)} type="email" placeholder="\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1" data-v-5e076093></div><div class="form-item" data-v-5e076093><label data-v-5e076093>\u9A8C\u8BC1\u7801</label><div class="input-row" data-v-5e076093><input${ssrRenderAttr("value", form.code)} type="text" placeholder="\u65B0\u90AE\u7BB1\u9A8C\u8BC1\u7801" maxlength="6" data-v-5e076093><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value || !isEmailValid.value) ? " disabled" : ""} data-v-5e076093>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><button class="submit-btn full-width"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-5e076093>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-5e076093></div>`);
            } else {
              _push2(`<span data-v-5e076093>\u786E\u8BA4\u7ED1\u5B9A</span>`);
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
        var _a;
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-353d20e1><div class="modal-content" data-v-353d20e1><div class="modal-header" data-v-353d20e1><h3 class="modal-title text-danger" data-v-353d20e1>\u6CE8\u9500\u8D26\u53F7</h3><button class="close-btn" data-v-353d20e1>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-353d20e1><div class="warning-box" data-v-353d20e1><div class="warning-icon" data-v-353d20e1>!</div><p data-v-353d20e1>\u8B66\u544A\uFF1A\u8D26\u53F7\u6CE8\u9500\u662F\u4E0D\u53EF\u6062\u590D\u7684\u64CD\u4F5C\u3002\u6240\u6709\u4E2A\u4EBA\u6570\u636E\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002</p></div><div class="form-item" data-v-353d20e1><label data-v-353d20e1>\u90AE\u7BB1\u9A8C\u8BC1 (${ssrInterpolate((_a = unref(userStore).user) == null ? void 0 : _a.email)})</label><div class="input-row" data-v-353d20e1><input${ssrRenderAttr("value", otpCode.value)} type="text" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-353d20e1><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-353d20e1>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><div class="checkbox-row" data-v-353d20e1><div class="${ssrRenderClass([{ checked: isConfirmed.value }, "checkbox"])}" data-v-353d20e1>`);
          if (isConfirmed.value) {
            _push2(ssrRenderComponent(unref(check_default), { class: "check-icon" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-353d20e1>\u6211\u5DF2\u4E86\u89E3\u98CE\u9669\uFF0C\u786E\u8BA4\u6CE8\u9500\u5F53\u524D\u8D26\u53F7</span></div></div><div class="modal-footer" data-v-353d20e1><button class="cancel-btn" data-v-353d20e1>\u53D6\u6D88</button><button class="save-btn btn-danger"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-353d20e1>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-353d20e1></span>`);
          } else {
            _push2(`<span data-v-353d20e1>\u786E\u8BA4\u6CE8\u9500</span>`);
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

export { ChangePasswordModal as C, DeleteAccountModal as D, EditNicknameModal as E, ChangeEmailModal as a };
//# sourceMappingURL=DeleteAccountModal-B5RDsU7s.mjs.map
