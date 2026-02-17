import { _ as _export_sfc, u as useHead, E as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, mergeProps, useSSRContext, ref, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, computed, watch } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { u as useUserStore, a as authApi } from "./user-DLDq0pTF.js";
import { useRouter, useRoute } from "vue-router";
import { E as ElIcon } from "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
import { B as BaseConfirmModal } from "./BaseConfirmModal-DX5ElCqL.js";
import { D as DEFAULT_AVATAR } from "./constants-BRAeDQ6J.js";
import { g as arrow_left_default, B as user_default, C as wallet_default, D as list_default, E as ticket_default, F as star_default, s as service_default, G as bell_default, H as switch_button_default } from "./index-DNnPa_Q9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
import "./objects-Bz74KHmq.js";
import "./BaseModal-nbvk9VuE.js";
import "./BaseButton-BnWAaIRO.js";
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
        title: "退出登录",
        message: "确定要退出当前账号吗？",
        "confirm-text": "确认退出",
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
          { key: "profile", label: "个人中心", icon: user_default, to: "/profile" },
          { key: "wallet", label: "我的额度", icon: wallet_default, to: "/profile/wallet" },
          { key: "orders", label: "我的订单", icon: list_default, to: "/profile/order" },
          { key: "exchange", label: "兑换中心", icon: ticket_default, to: "/profile/exchange" },
          { key: "favorites", label: "我的收藏", icon: star_default, to: "/profile/favorites" },
          { key: "tickets", label: "我的工单", icon: service_default, to: "/profile/tickets" },
          { key: "messages", label: "我的消息", icon: bell_default, to: "/profile/messages" }
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
      _push(`<span data-v-2baa6368>返回首页</span></div><div class="user-hero-card" data-v-2baa6368>`);
      if (unref(userStore).loading) {
        _push(`<div class="user-hero-loading" data-v-2baa6368><div class="avatar-skeleton" data-v-2baa6368></div><div class="info-skeleton" data-v-2baa6368><div class="line-1" data-v-2baa6368></div><div class="line-2" data-v-2baa6368></div></div></div>`);
      } else {
        _push(`<div class="user-hero-content" data-v-2baa6368><div class="avatar-wrapper" data-v-2baa6368><img${ssrRenderAttr("src", unref(userStore).user?.avatar || unref(DEFAULT_AVATAR))} class="user-avatar" data-v-2baa6368><div class="status-dot" data-v-2baa6368></div></div><div class="user-info" data-v-2baa6368><h3 class="user-nickname" data-v-2baa6368>${ssrInterpolate(unref(userStore).user?.nickname || "FANTULA User")}</h3><div class="user-id-badge" data-v-2baa6368><span data-v-2baa6368>UID: ${ssrInterpolate(unref(userStore).user?.uid || "---")}</span></div></div></div>`);
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
          _push(`</div><span class="menu-text" data-v-2baa6368>${ssrInterpolate(item?.label)}</span>`);
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
      _push(` 退出登录 </button></div>`);
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
      if (hour < 6) return { text: "夜深了", icon: "🌙" };
      if (hour < 11) return { text: "早上好", icon: "☀️" };
      if (hour < 14) return { text: "中午好", icon: "🌞" };
      if (hour < 19) return { text: "下午好", icon: "☕" };
      return { text: "晚上好", icon: "✨" };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "horizon-header" }, _attrs))} data-v-39913f39><div class="horizon-glass" data-v-39913f39></div><div class="horizon-content" data-v-39913f39><div class="center-stage" data-v-39913f39><div class="icon-orb" data-v-39913f39><span class="greeting-icon" data-v-39913f39>${ssrInterpolate(greeting.value.icon)}</span></div><h1 class="greeting-main" data-v-39913f39>${ssrInterpolate(greeting.value.text)}</h1><div class="user-identity" data-v-39913f39><span class="user-name" data-v-39913f39>${ssrInterpolate(unref(userStore).user?.nickname || "旅行者")}</span><div class="name-shimmer" data-v-39913f39></div></div></div></div><div class="center-glow" data-v-39913f39></div></div>`);
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
      title: "个人中心 - 凡图拉",
      meta: [
        { name: "description", content: "凡图拉个人中心" }
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
export {
  profile as default
};
//# sourceMappingURL=profile-BJ2WgZlx.js.map
