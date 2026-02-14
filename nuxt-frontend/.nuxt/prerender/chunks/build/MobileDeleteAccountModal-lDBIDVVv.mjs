import { defineComponent, ref, watch, unref, reactive, computed, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { g as close_default, M as check_default } from './index-CRs4T-Jf.mjs';
import { u as useUserStore } from './user-B9FaDvHc.mjs';
import { u as useNotify } from './useNotify-CME3DTm8.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useSendCode } from './useSendCode-_fPnCB3O.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';

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
          _push2(`<div class="modal-overlay" data-v-7d58658a><div class="modal-content aurora-modal-panel" data-v-7d58658a><div class="modal-header" data-v-7d58658a><h3 class="modal-title" data-v-7d58658a>\u4FEE\u6539\u6635\u79F0</h3><button class="close-btn" data-v-7d58658a>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-7d58658a><div class="form-item" data-v-7d58658a><label data-v-7d58658a>\u65B0\u6635\u79F0</label><input${ssrRenderAttr("value", newValue.value)} type="text" class="aurora-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u6635\u79F0" maxlength="20" data-v-7d58658a></div></div><div class="modal-footer" data-v-7d58658a><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !newValue.value.trim()) ? " disabled" : ""} data-v-7d58658a>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-7d58658a></span>`);
          } else {
            _push2(`<span data-v-7d58658a>\u4FDD\u5B58</span>`);
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
        var _a;
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-107ccbe8><div class="modal-content aurora-modal-panel" data-v-107ccbe8><div class="modal-header" data-v-107ccbe8><h3 class="modal-title" data-v-107ccbe8>\u4FEE\u6539\u767B\u5F55\u5BC6\u7801</h3><button class="close-btn" data-v-107ccbe8>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-107ccbe8>`);
          if (!((_a = unref(userStore).user) == null ? void 0 : _a.email)) {
            _push2(`<div class="alert-box" data-v-107ccbe8> \u8BF7\u5148\u7ED1\u5B9A\u90AE\u7BB1\uFF0C\u4FEE\u6539\u5BC6\u7801\u9700\u8981\u90AE\u7BB1\u9A8C\u8BC1\u3002 </div>`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-107ccbe8><label data-v-107ccbe8>\u90AE\u7BB1\u9A8C\u8BC1\u7801</label><div class="input-row" data-v-107ccbe8><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-107ccbe8><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-107ccbe8>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><div class="form-item" data-v-107ccbe8><label data-v-107ccbe8>\u65B0\u5BC6\u7801</label><input${ssrRenderAttr("value", form.newPassword)} type="password" class="aurora-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801 (6-20\u4F4D)" data-v-107ccbe8></div><div class="form-item" data-v-107ccbe8><label data-v-107ccbe8>\u786E\u8BA4\u5BC6\u7801</label><input${ssrRenderAttr("value", form.confirmPassword)} type="password" class="aurora-input" placeholder="\u518D\u6B21\u8F93\u5165\u65B0\u5BC6\u7801" data-v-107ccbe8></div><!--]-->`);
          }
          _push2(`</div><div class="modal-footer" data-v-107ccbe8><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(!canSubmit.value || loading.value) ? " disabled" : ""} data-v-107ccbe8>`);
          if (loading.value) {
            _push2(`<div class="spinner" data-v-107ccbe8></div>`);
          } else {
            _push2(`<span data-v-107ccbe8>\u786E\u8BA4\u4FEE\u6539</span>`);
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
        var _a;
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-7310f626><div class="modal-content aurora-modal-panel" data-v-7310f626><div class="modal-header" data-v-7310f626><h3 class="modal-title text-danger" data-v-7310f626>\u6CE8\u9500\u8D26\u53F7</h3><button class="close-btn" data-v-7310f626>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-7310f626><div class="warning-box" data-v-7310f626><div class="warning-icon" data-v-7310f626>!</div><p data-v-7310f626>\u8B66\u544A\uFF1A\u8D26\u53F7\u6CE8\u9500\u662F\u4E0D\u53EF\u6062\u590D\u7684\u64CD\u4F5C\u3002\u6240\u6709\u4E2A\u4EBA\u6570\u636E\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002</p></div><div class="form-item" data-v-7310f626><label data-v-7310f626>\u90AE\u7BB1\u9A8C\u8BC1 (${ssrInterpolate((_a = unref(userStore).user) == null ? void 0 : _a.email)})</label><div class="input-row" data-v-7310f626><input${ssrRenderAttr("value", otpCode.value)} type="text" class="aurora-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-7310f626><button class="code-btn"${ssrIncludeBooleanAttr(unref(countdown) > 0 || loading.value) ? " disabled" : ""} data-v-7310f626>${ssrInterpolate(unref(countdown) > 0 ? `${unref(countdown)}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><div class="checkbox-row" data-v-7310f626><div class="${ssrRenderClass([{ checked: isConfirmed.value }, "checkbox"])}" data-v-7310f626>`);
          if (isConfirmed.value) {
            _push2(ssrRenderComponent(unref(check_default), { class: "check-icon" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><span data-v-7310f626>\u6211\u5DF2\u4E86\u89E3\u98CE\u9669\uFF0C\u786E\u8BA4\u6CE8\u9500\u5F53\u524D\u8D26\u53F7</span></div></div><div class="modal-footer" data-v-7310f626><button class="aurora-btn-danger"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-7310f626>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-7310f626></span>`);
          } else {
            _push2(`<span data-v-7310f626>\u786E\u8BA4\u6CE8\u9500</span>`);
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

export { EditNicknameModal as E, MobileChangePasswordModal as M, MobileDeleteAccountModal as a };
//# sourceMappingURL=MobileDeleteAccountModal-lDBIDVVv.mjs.map
