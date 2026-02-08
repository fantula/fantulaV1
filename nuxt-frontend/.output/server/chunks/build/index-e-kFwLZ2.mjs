import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, unref, withCtx, createVNode, computed, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { a as arrow_right_default, j as close_default, G as check_default, a5 as chat_dot_round_default } from './index-DlETah8a.mjs';
import { u as useUserStore, a as authApi } from './user-Cnuc6I82.mjs';
import { E as EditNicknameModal, C as ChangePasswordModal, a as ChangeEmailModal, D as DeleteAccountModal } from './DeleteAccountModal-B5RDsU7s.mjs';
import { _ as _export_sfc } from './server.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-yXUwt-_q.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LogoutModal",
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
          _push2(`<div class="modal-overlay" data-v-c4ba28ef><div class="modal-content" data-v-c4ba28ef><div class="modal-header" data-v-c4ba28ef><h3 class="modal-title text-danger" data-v-c4ba28ef>\u9000\u51FA\u767B\u5F55</h3><button class="close-btn" data-v-c4ba28ef>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-c4ba28ef><p class="confirm-text" data-v-c4ba28ef>\u786E\u5B9A\u8981\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u5417\uFF1F</p></div><div class="modal-footer" data-v-c4ba28ef><button class="cancel-btn" data-v-c4ba28ef>\u53D6\u6D88</button><button class="save-btn btn-danger" data-v-c4ba28ef>`);
          if (__props.loading) {
            _push2(`<span class="spinner" data-v-c4ba28ef></span>`);
          } else {
            _push2(`<span data-v-c4ba28ef>\u786E\u8BA4\u9000\u51FA</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/modals/LogoutModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const LogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c4ba28ef"]]);
const defaultAvatar = "/images/client/pc/avatars/avatar-cat.png";
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
    const loading = ref(false);
    const selectedAvatar = ref("");
    const presetAvatars = [
      "/images/client/pc/avatars/avatar-cat.png",
      "/images/client/pc/avatars/avatar-dog.png",
      "/images/client/pc/avatars/avatar-bear.png",
      "/images/client/pc/avatars/avatar-rabbit.png",
      "/images/client/pc/avatars/avatar-fox.png",
      "/images/client/pc/avatars/avatar-panda.png",
      "/images/client/pc/avatars/avatar-lion.png",
      "/images/client/pc/avatars/avatar-tiger.png"
    ];
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
          _push2(`<div class="modal-overlay" data-v-7299985c><div class="modal-content" data-v-7299985c><div class="modal-header" data-v-7299985c><h3 class="modal-title" data-v-7299985c>\u4FEE\u6539\u5934\u50CF</h3><button class="close-btn" data-v-7299985c>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-7299985c><div class="current-avatar-section" data-v-7299985c><div class="avatar-wrapper" data-v-7299985c><img${ssrRenderAttr("src", __props.currentAvatar || defaultAvatar)} class="current-img" data-v-7299985c></div><p class="section-label" data-v-7299985c>\u5F53\u524D\u5934\u50CF</p></div><div class="system-avatars-section" data-v-7299985c><p class="section-label align-left" data-v-7299985c>\u7CFB\u7EDF\u63A8\u8350</p><div class="avatar-grid" data-v-7299985c><!--[-->`);
          ssrRenderList(presetAvatars, (url, index2) => {
            _push2(`<div class="${ssrRenderClass([{ active: selectedAvatar.value === url }, "avatar-item"])}" data-v-7299985c><img${ssrRenderAttr("src", url)} class="grid-img" loading="lazy" data-v-7299985c>`);
            if (selectedAvatar.value === url) {
              _push2(`<div class="active-overlay" data-v-7299985c>`);
              _push2(ssrRenderComponent(unref(check_default), { class: "w-4 h-4" }, null, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          });
          _push2(`<!--]--></div></div></div><div class="modal-footer" data-v-7299985c><button class="cancel-btn" data-v-7299985c>\u53D6\u6D88</button><button class="submit-btn"${ssrIncludeBooleanAttr(loading.value || !hasChange.value) ? " disabled" : ""} data-v-7299985c>`);
          if (loading.value) {
            _push2(`<span class="spinner" data-v-7299985c></span>`);
          } else {
            _push2(`<span data-v-7299985c>\u4FDD\u5B58\u4FEE\u6539</span>`);
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
const SelectAvatarModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7299985c"]]);
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
          _push2(`<div class="modal-overlay" data-v-c16fa51b><div class="modal-content" data-v-c16fa51b><div class="modal-header" data-v-c16fa51b><h3 class="modal-title" data-v-c16fa51b>\u5FAE\u4FE1\u7ED1\u5B9A</h3><button class="close-btn" data-v-c16fa51b>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "w-5 h-5" }, null, _parent));
          _push2(`</button></div><div class="modal-body" data-v-c16fa51b><div class="${ssrRenderClass([{ bound: isBound.value }, "bind-status-card"])}" data-v-c16fa51b><div class="icon-wrapper" data-v-c16fa51b>`);
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
          _push2(`</div><div class="status-info" data-v-c16fa51b><p class="status-title" data-v-c16fa51b>${ssrInterpolate(isBound.value ? "\u5DF2\u7ED1\u5B9A\u5FAE\u4FE1" : "\u672A\u7ED1\u5B9A\u5FAE\u4FE1")}</p>`);
          if (isBound.value) {
            _push2(`<p class="status-desc" data-v-c16fa51b> \u5F53\u524D\u8D26\u53F7\u5DF2\u5173\u8054\u5FAE\u4FE1\uFF0C\u53EF\u7528\u4E8E\u5FEB\u901F\u767B\u5F55 </p>`);
          } else {
            _push2(`<p class="status-desc" data-v-c16fa51b> \u7ED1\u5B9A\u5FAE\u4FE1\u540E\u53EF\u4F7F\u7528\u5FAE\u4FE1\u5FEB\u901F\u767B\u5F55 </p>`);
          }
          _push2(`</div></div>`);
          if (isBound.value) {
            _push2(`<div class="action-section" data-v-c16fa51b><p class="tip-text" data-v-c16fa51b>\u5982\u9700\u66F4\u6362\u7ED1\u5B9A\uFF0C\u8BF7\u5728PC\u7AEF\u64CD\u4F5C\u6216\u8054\u7CFB\u5BA2\u670D</p></div>`);
          } else {
            _push2(`<div class="action-section" data-v-c16fa51b><p class="tip-text" data-v-c16fa51b>\u8BF7\u5728\u767B\u5F55\u9875\u6216PC\u7AEF\u8FDB\u884C\u5FAE\u4FE1\u7ED1\u5B9A</p></div>`);
          }
          _push2(`</div><div class="modal-footer" data-v-c16fa51b><button class="submit-btn" data-v-c16fa51b> \u77E5\u9053\u4E86 </button></div></div></div>`);
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
const WechatBindModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c16fa51b"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const loading = ref(false);
    const activeModal = ref(null);
    const handleSuccess = (msg) => {
      ElMessage.success({ message: msg, offset: 100, customClass: "mobile-message" });
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
      const _component_DocumentCopy = resolveComponent("DocumentCopy");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-ec5f7303>`);
      _push(ssrRenderComponent(MobileSubPageHeader, { title: "\u8D26\u53F7\u8BBE\u7F6E" }, null, _parent));
      _push(`<div class="settings-content" data-v-ec5f7303><div class="setting-container" data-v-ec5f7303><div class="setting-item" data-v-ec5f7303><div class="left" data-v-ec5f7303><span class="label" data-v-ec5f7303>\u5934\u50CF</span></div><div class="right" data-v-ec5f7303><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || "/images/client/pc/avatars/avatar-cat.png")} class="avatar-img" data-v-ec5f7303>`);
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
      _push(`</div></div><div class="divider" data-v-ec5f7303></div><div class="setting-item" data-v-ec5f7303><div class="left" data-v-ec5f7303><span class="label" data-v-ec5f7303>\u6635\u79F0</span></div><div class="right" data-v-ec5f7303><span class="value" data-v-ec5f7303>${ssrInterpolate(((_b = unref(userStore).user) == null ? void 0 : _b.nickName) || "\u672A\u8BBE\u7F6E")}</span>`);
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
      _push(`</div></div><div class="divider" data-v-ec5f7303></div><div class="setting-item" data-v-ec5f7303><div class="left" data-v-ec5f7303><span class="label" data-v-ec5f7303>UID</span></div><div class="right" data-v-ec5f7303><span class="value uid-text" data-v-ec5f7303>${ssrInterpolate(((_c = unref(userStore).user) == null ? void 0 : _c.uid) || ((_d = unref(userStore).user) == null ? void 0 : _d.id))}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DocumentCopy, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DocumentCopy)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><h3 class="group-title" data-v-ec5f7303>\u8D26\u53F7\u5B89\u5168</h3><div class="setting-container" data-v-ec5f7303><div class="setting-item" data-v-ec5f7303><div class="left" data-v-ec5f7303><span class="label" data-v-ec5f7303>\u5FAE\u4FE1\u7ED1\u5B9A</span></div><div class="right" data-v-ec5f7303><span class="value" data-v-ec5f7303>${ssrInterpolate(((_e = unref(userStore).user) == null ? void 0 : _e.openId) ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</span>`);
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
      _push(`</div></div><div class="setting-item" data-v-ec5f7303><span class="label" data-v-ec5f7303>\u90AE\u7BB1</span><div class="value-wrap" data-v-ec5f7303><span class="text-val" data-v-ec5f7303>${ssrInterpolate((_f = unref(userStore).user) == null ? void 0 : _f.email)}</span>`);
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
      _push(`</div></div><div class="setting-item" data-v-ec5f7303><span class="label" data-v-ec5f7303>\u767B\u5F55\u5BC6\u7801</span><div class="value-wrap" data-v-ec5f7303><span class="text-val muted" data-v-ec5f7303>\u4FEE\u6539</span>`);
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
      _push(`</div></div></div><div class="setting-container" data-v-ec5f7303><div class="setting-item" data-v-ec5f7303><span class="label text-danger" data-v-ec5f7303>\u6CE8\u9500\u8D26\u53F7</span><div class="value-wrap" data-v-ec5f7303>`);
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
      _push(`</div></div></div><div class="action-group" data-v-ec5f7303><button class="logout-btn" data-v-ec5f7303>\u9000\u51FA\u767B\u5F55</button></div></div>`);
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": (_g = unref(userStore).user) == null ? void 0 : _g.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u6635\u79F0\u5DF2\u66F4\u65B0")
      }, null, _parent));
      _push(ssrRenderComponent(ChangePasswordModal, {
        visible: activeModal.value === "password",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u5BC6\u7801\u5DF2\u4FEE\u6539")
      }, null, _parent));
      _push(ssrRenderComponent(ChangeEmailModal, {
        visible: activeModal.value === "email",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess("\u8BF7\u67E5\u6536\u786E\u8BA4\u90AE\u4EF6")
      }, null, _parent));
      _push(ssrRenderComponent(DeleteAccountModal, {
        visible: activeModal.value === "delete",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(ssrRenderComponent(LogoutModal, {
        visible: activeModal.value === "logout",
        loading: loading.value,
        onClose: ($event) => activeModal.value = null,
        onConfirm: handleLogoutConfirm
      }, null, _parent));
      _push(ssrRenderComponent(SelectAvatarModal, {
        visible: activeModal.value === "avatar",
        "current-avatar": (_h = _ctx.user) == null ? void 0 : _h.avatar,
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ec5f7303"]]);

export { index as default };
//# sourceMappingURL=index-e-kFwLZ2.mjs.map
