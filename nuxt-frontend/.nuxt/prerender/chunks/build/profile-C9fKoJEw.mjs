import { _ as _export_sfc, u as useHead, E as __nuxt_component_0 } from './server.mjs';
import { defineComponent, watch, mergeProps, computed, unref, ref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useUserStore, a as authApi } from './user-DLDq0pTF.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { E as ElIcon } from './index-C4aUwruK.mjs';
import { B as BaseConfirmModal } from './BaseConfirmModal-DX5ElCqL.mjs';
import { D as DEFAULT_AVATAR } from './constants-BRAeDQ6J.mjs';
import { h as arrow_left_default, B as user_default, C as wallet_default, D as list_default, E as ticket_default, F as star_default, s as service_default, G as bell_default, H as switch_button_default } from './index-CbQ9NNm4.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
import './supabase-Ds8OQlZJ.mjs';
import './common-CeIxTI3I.mjs';
import './cart-Lqo8L2Wc.mjs';
import './install-VBSKbHUK.mjs';
import './objects-Bz74KHmq.mjs';
import './BaseModal-nbvk9VuE.mjs';
import './BaseButton-BnWAaIRO.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PcLogoutModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "confirm"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseConfirmModal, mergeProps({
        visible: true,
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/PcLogoutModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const PcLogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-925f11f1"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SideNavigation",
  __ssrInlineRender: true,
  setup(__props) {
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
        return path.startsWith("/profile/order");
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
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "profile-sidebar" }, _attrs))} data-v-2baa6368><div class="sidebar-header" data-v-2baa6368><div class="back-home-btn" data-v-2baa6368>`);
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
      _push(`<span data-v-2baa6368>\u8FD4\u56DE\u9996\u9875</span></div><div class="user-hero-card" data-v-2baa6368>`);
      if (unref(userStore).loading) {
        _push(`<div class="user-hero-loading" data-v-2baa6368><div class="avatar-skeleton" data-v-2baa6368></div><div class="info-skeleton" data-v-2baa6368><div class="line-1" data-v-2baa6368></div><div class="line-2" data-v-2baa6368></div></div></div>`);
      } else {
        _push(`<div class="user-hero-content" data-v-2baa6368><div class="avatar-wrapper" data-v-2baa6368><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || unref(DEFAULT_AVATAR))} class="user-avatar" data-v-2baa6368><div class="status-dot" data-v-2baa6368></div></div><div class="user-info" data-v-2baa6368><h3 class="user-nickname" data-v-2baa6368>${ssrInterpolate(((_b = unref(userStore).user) == null ? void 0 : _b.nickname) || "FANTULA User")}</h3><div class="user-id-badge" data-v-2baa6368><span data-v-2baa6368>UID: ${ssrInterpolate(((_c = unref(userStore).user) == null ? void 0 : _c.uid) || "---")}</span></div></div></div>`);
      }
      _push(`</div></div><nav class="sidebar-menu" data-v-2baa6368><!--[-->`);
      ssrRenderList(menuGroups, (group) => {
        _push(`<div class="menu-group" data-v-2baa6368>`);
        if (group.label) {
          _push(`<div class="menu-group-label" data-v-2baa6368>${ssrInterpolate(group.label)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(`<div class="${ssrRenderClass([{ "active": isMenuItemActive(item) }, "menu-item"])}" data-v-2baa6368><div class="icon-wrapper" data-v-2baa6368>`);
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
          _push(`</div><span class="menu-text" data-v-2baa6368>${ssrInterpolate(item == null ? void 0 : item.label)}</span>`);
          if (item.key === "messages" && unref(userStore).unreadMessageCount > 0) {
            _push(`<div class="unread-indicator" data-v-2baa6368></div>`);
          } else {
            _push(`<!---->`);
          }
          if (isMenuItemActive(item)) {
            _push(`<div class="active-glow" data-v-2baa6368></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></nav><div class="sidebar-footer" data-v-2baa6368><button class="logout-btn" data-v-2baa6368>`);
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
      _push(` \u9000\u51FA\u767B\u5F55 </button></div>`);
      if (showLogoutModal.value) {
        _push(ssrRenderComponent(PcLogoutModal, {
          onClose: ($event) => showLogoutModal.value = false,
          onConfirm: handleConfirmLogout
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/profile/SideNavigation.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const SideNavigation = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2baa6368"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProfileHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const greeting = computed(() => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      if (hour < 6) return { text: "\u591C\u6DF1\u4E86", icon: "\u{1F319}" };
      if (hour < 11) return { text: "\u65E9\u4E0A\u597D", icon: "\u2600\uFE0F" };
      if (hour < 14) return { text: "\u4E2D\u5348\u597D", icon: "\u{1F31E}" };
      if (hour < 19) return { text: "\u4E0B\u5348\u597D", icon: "\u2615" };
      return { text: "\u665A\u4E0A\u597D", icon: "\u2728" };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "horizon-header" }, _attrs))} data-v-39913f39><div class="horizon-glass" data-v-39913f39></div><div class="horizon-content" data-v-39913f39><div class="center-stage" data-v-39913f39><div class="icon-orb" data-v-39913f39><span class="greeting-icon" data-v-39913f39>${ssrInterpolate(greeting.value.icon)}</span></div><h1 class="greeting-main" data-v-39913f39>${ssrInterpolate(greeting.value.text)}</h1><div class="user-identity" data-v-39913f39><span class="user-name" data-v-39913f39>${ssrInterpolate(((_a = unref(userStore).user) == null ? void 0 : _a.nickname) || "\u65C5\u884C\u8005")}</span><div class="name-shimmer" data-v-39913f39></div></div></div></div><div class="center-glow" data-v-39913f39></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/profile/ProfileHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProfileHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-39913f39"]]);
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
    watch(() => userStore.isLoggedIn, (loggedIn) => {
      if (!loggedIn) {
        router.push("/");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-91b66386><div class="profile-container" data-v-91b66386>`);
      _push(ssrRenderComponent(ProfileHeader, null, null, _parent));
      _push(`<div class="profile-layout" data-v-91b66386>`);
      _push(ssrRenderComponent(SideNavigation, null, null, _parent));
      _push(`<main class="profile-main" data-v-91b66386><div class="profile-content-frame" data-v-91b66386><div class="phantom-ambassador" data-v-91b66386></div><div class="page-content-wrapper" data-v-91b66386>`);
      _push(ssrRenderComponent(_component_NuxtPage, {
        key: _ctx.$route.fullPath
      }, null, _parent));
      _push(`</div></div></main></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91b66386"]]);

export { profile as default };
//# sourceMappingURL=profile-C9fKoJEw.mjs.map
