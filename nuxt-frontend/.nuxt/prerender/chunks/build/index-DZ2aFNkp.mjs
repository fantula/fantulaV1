import { E as ElIcon } from './index-C4aUwruK.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, computed, reactive, watch, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { f as arrow_right_default, ai as document_copy_default, b as close_default, R as check_default, S as chat_dot_round_default } from './index-CbQ9NNm4.mjs';
import { u as useUserStore, a as authApi } from './user-DLDq0pTF.mjs';
import { u as useNotify } from './useNotify-BkAlUoZx.mjs';
import { D as DEFAULT_AVATAR, S as SYSTEM_AVATARS } from './constants-BRAeDQ6J.mjs';
import { E as EditNicknameModal, M as MobileChangePasswordModal, a as MobileDeleteAccountModal } from './MobileDeleteAccountModal-DkYz1MdU.mjs';
import { u as useSendCode } from './useSendCode-BC5HK1oO.mjs';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_0 } from './BaseModal-nbvk9VuE.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-Na2GamiB.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './supabase-Ds8OQlZJ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './useToast-DsT-1f4c.mjs';
import './index-CQnGB6WT.mjs';
import './typescript-D6L75muK.mjs';
import './icon-D-Vgi0cb.mjs';
import './use-global-config-CaR6i8cb.mjs';
import './index-C1njJNPQ.mjs';
import './event-D3FEo2C5.mjs';
import './interval-BnEBQU8I.mjs';
import './BaseButton-BnWAaIRO.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
          _push2(`<div class="modal-overlay" data-v-921fe21d><div class="modal-content aurora-modal-panel" data-v-921fe21d><div class="modal-header" data-v-921fe21d><h3 class="modal-title" data-v-921fe21d>${ssrInterpolate(step.value === 1 && currentEmail.value ? "\u9A8C\u8BC1\u539F\u90AE\u7BB1" : "\u7ED1\u5B9A\u65B0\u90AE\u7BB1")}</h3><button class="close-btn" data-v-921fe21d>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-921fe21d>`);
          if (currentEmail.value && step.value === 1) {
            _push2(`<!--[--><div class="alert-box" data-v-921fe21d> \u4E3A\u4E86\u60A8\u7684\u8D26\u53F7\u5B89\u5168\uFF0C\u8BF7\u5148\u9A8C\u8BC1\u5F53\u524D\u90AE\u7BB1\u3002 </div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>\u5F53\u524D\u90AE\u7BB1</label><input${ssrRenderAttr("value", currentEmail.value)} disabled class="aurora-input disabled-input" style="${ssrRenderStyle({ "color": "#94A3B8" })}" data-v-921fe21d></div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>\u9A8C\u8BC1\u7801</label><div class="input-row" data-v-921fe21d><input${ssrRenderAttr("value", oldCode.value)} type="text" class="aurora-input" placeholder="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" maxlength="6" data-v-921fe21d><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value) ? " disabled" : ""} data-v-921fe21d>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || oldCode.value.length < 4) ? " disabled" : ""} data-v-921fe21d>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-921fe21d></div>`);
            } else {
              _push2(`<span data-v-921fe21d>\u4E0B\u4E00\u6B65</span>`);
            }
            _push2(`</button><!--]-->`);
          } else {
            _push2(`<!--[--><div class="form-item" data-v-921fe21d><label data-v-921fe21d>\u65B0\u90AE\u7BB1\u5730\u5740</label><input${ssrRenderAttr("value", form.email)} type="email" class="aurora-input" placeholder="\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1" data-v-921fe21d></div><div class="form-item" data-v-921fe21d><label data-v-921fe21d>\u9A8C\u8BC1\u7801</label><div class="input-row" data-v-921fe21d><input${ssrRenderAttr("value", form.code)} type="text" class="aurora-input" placeholder="\u65B0\u90AE\u7BB1\u9A8C\u8BC1\u7801" maxlength="6" data-v-921fe21d><button class="code-btn"${ssrIncludeBooleanAttr(countdown.value > 0 || loading.value || !isEmailValid.value) ? " disabled" : ""} data-v-921fe21d>${ssrInterpolate(countdown.value > 0 ? `${countdown.value}s` : "\u53D1\u9001\u9A8C\u8BC1\u7801")}</button></div></div><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !canSubmit.value) ? " disabled" : ""} data-v-921fe21d>`);
            if (loading.value) {
              _push2(`<div class="spinner" data-v-921fe21d></div>`);
            } else {
              _push2(`<span data-v-921fe21d>\u786E\u8BA4\u7ED1\u5B9A</span>`);
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/ChangeEmailModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const ChangeEmailModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-921fe21d"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MobileLogoutModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    loading: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-469dacb3><div class="modal-content aurora-modal-panel" data-v-469dacb3><div class="modal-header" data-v-469dacb3><h3 class="modal-title text-danger" data-v-469dacb3>\u9000\u51FA\u767B\u5F55</h3><button class="close-btn" data-v-469dacb3>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-469dacb3><p class="confirm-text" data-v-469dacb3>\u786E\u5B9A\u8981\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u5417\uFF1F</p></div><div class="modal-footer" data-v-469dacb3><button class="cancel-btn" data-v-469dacb3>\u53D6\u6D88</button><button class="save-btn btn-danger" data-v-469dacb3>`);
          if (__props.loading) {
            _push2(`<span class="spinner" data-v-469dacb3></span>`);
          } else {
            _push2(`<span data-v-469dacb3>\u786E\u8BA4\u9000\u51FA</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/MobileLogoutModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileLogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-469dacb3"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SelectAvatarModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    currentAvatar: {}
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const userStore = useUserStore();
    const { success, error } = useNotify();
    const loading = ref(false);
    const selectedAvatar = ref("");
    const defaultAvatar = DEFAULT_AVATAR;
    const presetAvatars = SYSTEM_AVATARS;
    const hasChange = computed(() => {
      return selectedAvatar.value && selectedAvatar.value !== props.currentAvatar;
    });
    watch(() => props.visible, (val) => {
      if (val) {
        selectedAvatar.value = props.currentAvatar || "";
      }
    });
    const handleClose = () => {
      emit("close");
    };
    const selectAvatar = (url) => {
      selectedAvatar.value = url;
    };
    const handleImageError = (e) => {
      e.target.src = defaultAvatar;
    };
    const handleConfirm = async () => {
      if (!hasChange.value) return;
      loading.value = true;
      try {
        const res = await userStore.updateProfile({ avatar: selectedAvatar.value });
        if (res.success) {
          success("\u5934\u50CF\u4FEE\u6539\u6210\u529F");
          emit("success");
          handleClose();
        } else {
          error(res.message || "\u4FEE\u6539\u5931\u8D25");
        }
      } catch (e) {
        error("\u64CD\u4F5C\u5931\u8D25");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(__nuxt_component_0, mergeProps({
        visible: __props.visible,
        title: "\u4FEE\u6539\u5934\u50CF",
        width: "340px",
        "confirm-text": "\u4FDD\u5B58\u4FEE\u6539",
        loading: loading.value,
        "confirm-disabled": !hasChange.value,
        "onUpdate:visible": handleClose,
        onClose: handleClose,
        onConfirm: handleConfirm
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="current-avatar-section" data-v-5c7b9895${_scopeId}><div class="avatar-wrapper" data-v-5c7b9895${_scopeId}><img${ssrRenderAttr("src", __props.currentAvatar || unref(defaultAvatar))} class="current-img" data-v-5c7b9895${_scopeId}></div><p class="section-label" data-v-5c7b9895${_scopeId}>\u5F53\u524D\u5934\u50CF</p></div><div class="system-avatars-section" data-v-5c7b9895${_scopeId}><p class="section-label align-left" data-v-5c7b9895${_scopeId}>\u7CFB\u7EDF\u63A8\u8350</p><div class="avatar-grid" data-v-5c7b9895${_scopeId}><!--[-->`);
            ssrRenderList(unref(presetAvatars), (url, index2) => {
              _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-5c7b9895${_scopeId}><img${ssrRenderAttr("src", url)} class="grid-img" loading="lazy" data-v-5c7b9895${_scopeId}>`);
              if (selectedAvatar.value === url) {
                _push2(`<div class="active-overlay" data-v-5c7b9895${_scopeId}>`);
                _push2(ssrRenderComponent(unref(check_default), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "current-avatar-section" }, [
                createVNode("div", { class: "avatar-wrapper" }, [
                  createVNode("img", {
                    src: __props.currentAvatar || unref(defaultAvatar),
                    class: "current-img",
                    onError: handleImageError
                  }, null, 40, ["src"])
                ]),
                createVNode("p", { class: "section-label" }, "\u5F53\u524D\u5934\u50CF")
              ]),
              createVNode("div", { class: "system-avatars-section" }, [
                createVNode("p", { class: "section-label align-left" }, "\u7CFB\u7EDF\u63A8\u8350"),
                createVNode("div", { class: "avatar-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(presetAvatars), (url, index2) => {
                    return openBlock(), createBlock("div", {
                      key: index2,
                      class: ["avatar-item", { active: selectedAvatar.value === url }],
                      onClick: ($event) => selectAvatar(url)
                    }, [
                      createVNode("img", {
                        src: url,
                        class: "grid-img",
                        loading: "lazy"
                      }, null, 8, ["src"]),
                      selectedAvatar.value === url ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "active-overlay"
                      }, [
                        createVNode(unref(check_default), { class: "w-4 h-4" })
                      ])) : createCommentVNode("", true)
                    ], 10, ["onClick"]);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/SelectAvatarModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SelectAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5c7b9895"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WechatBindModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const userStore = useUserStore();
    const isBound = computed(() => {
      var _a;
      return !!((_a = userStore.user) == null ? void 0 : _a.openId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-f6e2ed50><div class="modal-content aurora-modal-panel" data-v-f6e2ed50><div class="modal-header" data-v-f6e2ed50><h3 class="modal-title" data-v-f6e2ed50>\u5FAE\u4FE1\u7ED1\u5B9A</h3><button class="close-btn" data-v-f6e2ed50>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-f6e2ed50><div class="${ssrRenderClass([{ bound: isBound.value }, "bind-status-card"])}" data-v-f6e2ed50><div class="icon-wrapper" data-v-f6e2ed50>`);
          _push2(ssrRenderComponent(_component_el_icon, {
            size: 32,
            color: "#fff"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(chat_dot_round_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="status-info" data-v-f6e2ed50><p class="status-title" data-v-f6e2ed50>${ssrInterpolate(isBound.value ? "\u5DF2\u7ED1\u5B9A\u5FAE\u4FE1" : "\u672A\u7ED1\u5B9A\u5FAE\u4FE1")}</p>`);
          if (isBound.value) {
            _push2(`<p class="status-desc" data-v-f6e2ed50> \u5F53\u524D\u8D26\u53F7\u5DF2\u5173\u8054\u5FAE\u4FE1\uFF0C\u53EF\u7528\u4E8E\u5FEB\u901F\u767B\u5F55 </p>`);
          } else {
            _push2(`<p class="status-desc" data-v-f6e2ed50> \u7ED1\u5B9A\u5FAE\u4FE1\u540E\u53EF\u4F7F\u7528\u5FAE\u4FE1\u5FEB\u901F\u767B\u5F55 </p>`);
          }
          _push2(`</div></div>`);
          if (isBound.value) {
            _push2(`<div class="action-section" data-v-f6e2ed50><p class="tip-text" data-v-f6e2ed50>\u5982\u9700\u66F4\u6362\u7ED1\u5B9A\uFF0C\u8BF7\u5728PC\u7AEF\u64CD\u4F5C\u6216\u8054\u7CFB\u5BA2\u670D</p></div>`);
          } else {
            _push2(`<div class="action-section" data-v-f6e2ed50><p class="tip-text" data-v-f6e2ed50>\u8BF7\u5728\u767B\u5F55\u9875\u6216PC\u7AEF\u8FDB\u884C\u5FAE\u4FE1\u7ED1\u5B9A</p></div>`);
          }
          _push2(`</div><div class="modal-footer" data-v-f6e2ed50>`);
          if (isBound.value) {
            _push2(`<button class="submit-btn" data-v-f6e2ed50> \u77E5\u9053\u4E86 </button>`);
          } else {
            _push2(`<button class="submit-btn" data-v-f6e2ed50> \u7ACB\u5373\u7ED1\u5B9A </button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/WechatBindModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const WechatBindModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f6e2ed50"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const loading = ref(false);
    const activeModal = ref(null);
    const { success } = useNotify();
    const handleSuccess = (msg) => {
      success(msg);
      userStore.fetchUserInfo();
    };
    const handleLogoutConfirm = async () => {
      loading.value = true;
      try {
        await authApi.logout();
      } catch (e) {
        console.error("Logout API failed:", e);
      } finally {
        userStore.logout();
        router.replace("/mobile");
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-77cd9905>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u8D26\u53F7\u8BBE\u7F6E" }, null, _parent));
      _push(`<div class="settings-content" data-v-77cd9905><div class="setting-container" data-v-77cd9905><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>\u5934\u50CF</span></div><div class="right" data-v-77cd9905><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR))} class="avatar-img" data-v-77cd9905>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="divider" data-v-77cd9905></div><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>\u6635\u79F0</span></div><div class="right" data-v-77cd9905><span class="value" data-v-77cd9905>${ssrInterpolate(((_b = unref(userStore).user) == null ? void 0 : _b.nickName) || "\u672A\u8BBE\u7F6E")}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="divider" data-v-77cd9905></div><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>UID</span></div><div class="right" data-v-77cd9905><span class="value uid-text" data-v-77cd9905>${ssrInterpolate(((_c = unref(userStore).user) == null ? void 0 : _c.uid) || ((_d = unref(userStore).user) == null ? void 0 : _d.id))}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(document_copy_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(document_copy_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><h3 class="group-title" data-v-77cd9905>\u8D26\u53F7\u5B89\u5168</h3><div class="setting-container" data-v-77cd9905><div class="setting-item" data-v-77cd9905><div class="left" data-v-77cd9905><span class="label" data-v-77cd9905>\u5FAE\u4FE1\u7ED1\u5B9A</span></div><div class="right" data-v-77cd9905><span class="value" data-v-77cd9905>${ssrInterpolate(((_e = unref(userStore).user) == null ? void 0 : _e.openId) ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="setting-item" data-v-77cd9905><span class="label" data-v-77cd9905>\u90AE\u7BB1</span><div class="value-wrap" data-v-77cd9905><span class="text-val" data-v-77cd9905>${ssrInterpolate((_f = unref(userStore).user) == null ? void 0 : _f.email)}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="setting-item" data-v-77cd9905><span class="label" data-v-77cd9905>\u767B\u5F55\u5BC6\u7801</span><div class="value-wrap" data-v-77cd9905><span class="text-val muted" data-v-77cd9905>\u4FEE\u6539</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="setting-container" data-v-77cd9905><div class="setting-item" data-v-77cd9905><span class="label text-danger" data-v-77cd9905>\u6CE8\u9500\u8D26\u53F7</span><div class="value-wrap" data-v-77cd9905>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="action-group" data-v-77cd9905><button class="logout-btn" data-v-77cd9905>\u9000\u51FA\u767B\u5F55</button></div></div>`);
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": (_g = unref(userStore).user) == null ? void 0 : _g.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u6635\u79F0\u5DF2\u66F4\u65B0")
      }, null, _parent));
      _push(ssrRenderComponent(ChangeEmailModal, {
        visible: activeModal.value === "email",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u90AE\u7BB1\u5DF2\u4FEE\u6539")
      }, null, _parent));
      _push(ssrRenderComponent(MobileChangePasswordModal, {
        visible: activeModal.value === "password",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u5BC6\u7801\u5DF2\u4FEE\u6539")
      }, null, _parent));
      _push(ssrRenderComponent(MobileDeleteAccountModal, {
        visible: activeModal.value === "delete",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(ssrRenderComponent(MobileLogoutModal, {
        visible: activeModal.value === "logout",
        loading: loading.value,
        onClose: ($event) => activeModal.value = null,
        onConfirm: handleLogoutConfirm
      }, null, _parent));
      _push(ssrRenderComponent(SelectAvatarModal, {
        visible: activeModal.value === "avatar",
        "current-avatar": (_h = unref(userStore).user) == null ? void 0 : _h.avatar,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u5934\u50CF\u5DF2\u66F4\u65B0")
      }, null, _parent));
      _push(ssrRenderComponent(WechatBindModal, {
        visible: activeModal.value === "wechat",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77cd9905"]]);

export { index as default };
//# sourceMappingURL=index-DZ2aFNkp.mjs.map
