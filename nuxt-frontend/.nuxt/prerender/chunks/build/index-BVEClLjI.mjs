import { E as ElIcon } from './index-D6MDXFfa.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, computed, watch, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { m as arrow_right_default, aB as document_copy_default, g as close_default, M as check_default, aa as chat_dot_round_default } from './index-CRs4T-Jf.mjs';
import { u as useUserStore, a as authApi } from './user-B9FaDvHc.mjs';
import { u as useNotify } from './useNotify-CME3DTm8.mjs';
import { D as DEFAULT_AVATAR, S as SYSTEM_AVATARS } from './constants-BRAeDQ6J.mjs';
import { E as EditNicknameModal, M as MobileChangePasswordModal, a as MobileDeleteAccountModal } from './MobileDeleteAccountModal-lDBIDVVv.mjs';
import { _ as _export_sfc } from './server.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-BBaO6M-A.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
import './index-CK1iG7c1.mjs';
import './typescript-D6L75muK.mjs';
import './icon-DxnRhcjj.mjs';
import './use-global-config-C00m4e8W.mjs';
import './index-C8K_s-bH.mjs';
import './event-D3FEo2C5.mjs';
import './useSendCode-_fPnCB3O.mjs';
import './interval-BnEBQU8I.mjs';

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
    useUserStore();
    useNotify();
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
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="modal-overlay" data-v-1847c0d8><div class="modal-content aurora-modal-panel" data-v-1847c0d8><div class="modal-header" data-v-1847c0d8><h3 class="modal-title" data-v-1847c0d8>\u4FEE\u6539\u5934\u50CF</h3><button class="close-btn" data-v-1847c0d8>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-1847c0d8><div class="current-avatar-section" data-v-1847c0d8><div class="avatar-wrapper" data-v-1847c0d8><img${ssrRenderAttr("src", __props.currentAvatar || unref(defaultAvatar))} class="current-img" data-v-1847c0d8></div><p class="section-label" data-v-1847c0d8>\u5F53\u524D\u5934\u50CF</p></div><div class="system-avatars-section" data-v-1847c0d8><p class="section-label align-left" data-v-1847c0d8>\u7CFB\u7EDF\u63A8\u8350</p><div class="avatar-grid" data-v-1847c0d8><!--[-->`);
          ssrRenderList(unref(presetAvatars), (url, index2) => {
            _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-1847c0d8><img${ssrRenderAttr("src", url)} class="grid-img" loading="lazy" data-v-1847c0d8>`);
            if (selectedAvatar.value === url) {
              _push2(`<div class="active-overlay" data-v-1847c0d8>`);
              _push2(ssrRenderComponent(unref(check_default), { class: "w-4 h-4" }, null, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div></div><div class="modal-footer" data-v-1847c0d8><button class="aurora-btn-primary"${ssrIncludeBooleanAttr(loading.value || !hasChange.value) ? " disabled" : ""} data-v-1847c0d8>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-1847c0d8></span>`);
          } else {
            _push2(`<span data-v-1847c0d8>\u4FDD\u5B58\u4FEE\u6539</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/SelectAvatarModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SelectAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1847c0d8"]]);
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
          _push2(`<div class="modal-overlay" data-v-4a3ba7cb><div class="modal-content aurora-modal-panel" data-v-4a3ba7cb><div class="modal-header" data-v-4a3ba7cb><h3 class="modal-title" data-v-4a3ba7cb>\u5FAE\u4FE1\u7ED1\u5B9A</h3><button class="close-btn" data-v-4a3ba7cb>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-4a3ba7cb><div class="${ssrRenderClass([{ bound: isBound.value }, "bind-status-card"])}" data-v-4a3ba7cb><div class="icon-wrapper" data-v-4a3ba7cb>`);
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
          _push2(`</div><div class="status-info" data-v-4a3ba7cb><p class="status-title" data-v-4a3ba7cb>${ssrInterpolate(isBound.value ? "\u5DF2\u7ED1\u5B9A\u5FAE\u4FE1" : "\u672A\u7ED1\u5B9A\u5FAE\u4FE1")}</p>`);
          if (isBound.value) {
            _push2(`<p class="status-desc" data-v-4a3ba7cb> \u5F53\u524D\u8D26\u53F7\u5DF2\u5173\u8054\u5FAE\u4FE1\uFF0C\u53EF\u7528\u4E8E\u5FEB\u901F\u767B\u5F55 </p>`);
          } else {
            _push2(`<p class="status-desc" data-v-4a3ba7cb> \u7ED1\u5B9A\u5FAE\u4FE1\u540E\u53EF\u4F7F\u7528\u5FAE\u4FE1\u5FEB\u901F\u767B\u5F55 </p>`);
          }
          _push2(`</div></div>`);
          if (isBound.value) {
            _push2(`<div class="action-section" data-v-4a3ba7cb><p class="tip-text" data-v-4a3ba7cb>\u5982\u9700\u66F4\u6362\u7ED1\u5B9A\uFF0C\u8BF7\u5728PC\u7AEF\u64CD\u4F5C\u6216\u8054\u7CFB\u5BA2\u670D</p></div>`);
          } else {
            _push2(`<div class="action-section" data-v-4a3ba7cb><p class="tip-text" data-v-4a3ba7cb>\u8BF7\u5728\u767B\u5F55\u9875\u6216PC\u7AEF\u8FDB\u884C\u5FAE\u4FE1\u7ED1\u5B9A</p></div>`);
          }
          _push2(`</div><div class="modal-footer" data-v-4a3ba7cb><button class="submit-btn" data-v-4a3ba7cb> \u77E5\u9053\u4E86 </button></div></div></div>`);
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
const WechatBindModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4a3ba7cb"]]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-a7d12182>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u8D26\u53F7\u8BBE\u7F6E" }, null, _parent));
      _push(`<div class="settings-content" data-v-a7d12182><div class="setting-container" data-v-a7d12182><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>\u5934\u50CF</span></div><div class="right" data-v-a7d12182><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR))} class="avatar-img" data-v-a7d12182>`);
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
      _push(`</div></div><div class="divider" data-v-a7d12182></div><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>\u6635\u79F0</span></div><div class="right" data-v-a7d12182><span class="value" data-v-a7d12182>${ssrInterpolate(((_b = unref(userStore).user) == null ? void 0 : _b.nickName) || "\u672A\u8BBE\u7F6E")}</span>`);
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
      _push(`</div></div><div class="divider" data-v-a7d12182></div><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>UID</span></div><div class="right" data-v-a7d12182><span class="value uid-text" data-v-a7d12182>${ssrInterpolate(((_c = unref(userStore).user) == null ? void 0 : _c.uid) || ((_d = unref(userStore).user) == null ? void 0 : _d.id))}</span>`);
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
      _push(`</div></div></div><h3 class="group-title" data-v-a7d12182>\u8D26\u53F7\u5B89\u5168</h3><div class="setting-container" data-v-a7d12182><div class="setting-item" data-v-a7d12182><div class="left" data-v-a7d12182><span class="label" data-v-a7d12182>\u5FAE\u4FE1\u7ED1\u5B9A</span></div><div class="right" data-v-a7d12182><span class="value" data-v-a7d12182>${ssrInterpolate(((_e = unref(userStore).user) == null ? void 0 : _e.openId) ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</span>`);
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
      _push(`</div></div><div class="setting-item" data-v-a7d12182><span class="label" data-v-a7d12182>\u90AE\u7BB1</span><div class="value-wrap" data-v-a7d12182><span class="text-val" data-v-a7d12182>${ssrInterpolate((_f = unref(userStore).user) == null ? void 0 : _f.email)}</span>`);
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
      _push(`</div></div><div class="setting-item" data-v-a7d12182><span class="label" data-v-a7d12182>\u767B\u5F55\u5BC6\u7801</span><div class="value-wrap" data-v-a7d12182><span class="text-val muted" data-v-a7d12182>\u4FEE\u6539</span>`);
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
      _push(`</div></div></div><div class="setting-container" data-v-a7d12182><div class="setting-item" data-v-a7d12182><span class="label text-danger" data-v-a7d12182>\u6CE8\u9500\u8D26\u53F7</span><div class="value-wrap" data-v-a7d12182>`);
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
      _push(`</div></div></div><div class="action-group" data-v-a7d12182><button class="logout-btn" data-v-a7d12182>\u9000\u51FA\u767B\u5F55</button></div></div>`);
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": (_g = unref(userStore).user) == null ? void 0 : _g.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u6635\u79F0\u5DF2\u66F4\u65B0")
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7d12182"]]);

export { index as default };
//# sourceMappingURL=index-BVEClLjI.mjs.map
