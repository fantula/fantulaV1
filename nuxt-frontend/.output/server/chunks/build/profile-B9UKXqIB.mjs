import { _ as _export_sfc, d as useUserStore, E as ElIcon, z as arrow_left_default, a4 as user_default, a5 as wallet_default, a6 as list_default, a7 as ticket_default, a8 as star_default, h as share_default, s as service_default, a9 as bell_default, aa as switch_button_default, ab as __nuxt_component_0, ac as authApi } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, resolveDynamicComponent, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { B as BaseConfirmModal } from './BaseConfirmModal-CwvvkDFj.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LogoutModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseConfirmModal, mergeProps({
        visible: __props.visible,
        title: "\u9000\u51FA\u767B\u5F55",
        message: "\u786E\u5B9A\u8981\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u5417\uFF1F",
        "confirm-text": "\u786E\u8BA4\u9000\u51FA",
        "theme-id": "suit-001",
        onClose: ($event) => _ctx.$emit("close"),
        onConfirm: ($event) => _ctx.$emit("confirm")
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LogoutModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-709700aa"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u4E2A\u4EBA\u4E2D\u5FC3 - \u51E1\u56FE\u62C9",
      meta: [
        { name: "description", content: "\u51E1\u56FE\u62C9\u4E2A\u4EBA\u4E2D\u5FC3" }
      ]
    });
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const menuGroups = [
      {
        key: "main",
        label: "",
        //留空不显示标题
        items: [
          { key: "profile", label: "\u4E2A\u4EBA\u4E2D\u5FC3", icon: user_default, to: "/profile" },
          { key: "wallet", label: "\u6211\u7684\u989D\u5EA6", icon: wallet_default, to: "/profile/wallet" },
          { key: "orders", label: "\u6211\u7684\u8BA2\u5355", icon: list_default, to: "/profile/order" },
          { key: "exchange", label: "\u5151\u6362\u4E2D\u5FC3", icon: ticket_default, to: "/profile/exchange" },
          { key: "favorites", label: "\u6211\u7684\u6536\u85CF", icon: star_default, to: "/profile/favorites" },
          { key: "referral", label: "\u8FD4\u73B0\u63A8\u5E7F", icon: share_default, to: "/profile/referral" },
          { key: "tickets", label: "\u6211\u7684\u5DE5\u5355", icon: service_default, to: "/profile/tickets" },
          { key: "messages", label: "\u6211\u7684\u6D88\u606F", icon: bell_default, to: "/profile/messages" }
        ]
      }
    ];
    const isMenuItemActive = (item) => {
      const path = route.path;
      if (item.key === "profile") {
        return path === "/profile";
      }
      if (item.key === "orders") {
        return path.startsWith("/profile/orders") || path.startsWith("/profile/order/");
      }
      return path.startsWith(item.to);
    };
    const showLogoutModal = ref(false);
    const handleConfirmLogout = async () => {
      showLogoutModal.value = false;
      await authApi.logout();
      userStore.logout();
      router.push("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_el_icon = ElIcon;
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-f8f16d9a><div class="profile-container" data-v-f8f16d9a><h1 class="simple-welcome-text" data-v-f8f16d9a>\u6B22\u8FCE\u56DE\u6765</h1><div class="profile-layout" data-v-f8f16d9a><aside class="profile-sidebar" data-v-f8f16d9a><div class="sidebar-header" data-v-f8f16d9a><div class="back-home-btn" data-v-f8f16d9a>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "arrow-icon-left" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-f8f16d9a>\u8FD4\u56DE\u9996\u9875</span></div><div class="user-hero-card" data-v-f8f16d9a>`);
      if (unref(userStore).loading) {
        _push(`<div class="user-hero-loading" data-v-f8f16d9a><div class="avatar-skeleton" data-v-f8f16d9a></div><div class="info-skeleton" data-v-f8f16d9a><div class="line-1" data-v-f8f16d9a></div><div class="line-2" data-v-f8f16d9a></div></div></div>`);
      } else {
        _push(`<div class="user-hero-content" data-v-f8f16d9a><div class="avatar-wrapper" data-v-f8f16d9a><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || "/images/client/pc/avatars/avatar-cat.png")} class="user-avatar" data-v-f8f16d9a><div class="status-dot" data-v-f8f16d9a></div></div><div class="user-info" data-v-f8f16d9a><h3 class="user-nickname" data-v-f8f16d9a>${ssrInterpolate(((_b = unref(userStore).user) == null ? void 0 : _b.nickname) || "FANTULA User")}</h3><div class="user-id-badge" data-v-f8f16d9a><span data-v-f8f16d9a>UID: ${ssrInterpolate(((_c = unref(userStore).user) == null ? void 0 : _c.uid) || "---")}</span></div></div></div>`);
      }
      _push(`</div></div><nav class="sidebar-menu" data-v-f8f16d9a><!--[-->`);
      ssrRenderList(menuGroups, (group) => {
        _push(`<div class="menu-group" data-v-f8f16d9a>`);
        if (group.label) {
          _push(`<div class="menu-group-label" data-v-f8f16d9a>${ssrInterpolate(group.label)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(`<div class="${ssrRenderClass([{ "active": isMenuItemActive(item) }, "menu-item"])}" data-v-f8f16d9a><div class="icon-wrapper" data-v-f8f16d9a>`);
          _push(ssrRenderComponent(_component_el_icon, { class: "menu-icon" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), null, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><span class="menu-text" data-v-f8f16d9a>${ssrInterpolate(item == null ? void 0 : item.label)}</span>`);
          if (isMenuItemActive(item)) {
            _push(`<div class="active-glow" data-v-f8f16d9a></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></nav><div class="sidebar-footer" data-v-f8f16d9a><button class="logout-btn" data-v-f8f16d9a>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(switch_button_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(switch_button_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u9000\u51FA\u767B\u5F55 </button></div></aside><main class="profile-main" data-v-f8f16d9a><div class="profile-content-frame" data-v-f8f16d9a><div class="phantom-ambassador" data-v-f8f16d9a></div><div class="page-content-wrapper" data-v-f8f16d9a>`);
      _push(ssrRenderComponent(_component_NuxtPage, {
        key: _ctx.$route.fullPath
      }, null, _parent));
      _push(`</div></div></main></div></div>`);
      if (showLogoutModal.value) {
        _push(ssrRenderComponent(LogoutModal, {
          onClose: ($event) => showLogoutModal.value = false,
          onConfirm: handleConfirmLogout
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8f16d9a"]]);

export { profile as default };
//# sourceMappingURL=profile-B9UKXqIB.mjs.map
