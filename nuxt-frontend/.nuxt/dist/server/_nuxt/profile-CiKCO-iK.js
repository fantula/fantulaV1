import { E as ElIcon } from "./index-Byc6LUYX.js";
import { _ as _export_sfc, x as __nuxt_component_0 } from "../server.mjs";
/* empty css              */
import { defineComponent, mergeProps, useSSRContext, ref, watch, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderVNode } from "vue/server-renderer";
import { u as useUserStore } from "./user-CzJGyf4T.js";
import { useRouter, useRoute } from "vue-router";
import { a as authApi } from "./auth-BCuS92ob.js";
import { B as BaseConfirmModal } from "./BaseConfirmModal-Dt3jVj8H.js";
import { h as arrow_left_default, S as user_default, T as wallet_default, U as list_default, V as ticket_default, W as star_default, s as service_default, X as bell_default, Y as switch_button_default } from "./index-CmsdIFY8.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "./cart-D8FaBhjU.js";
import "./BaseModal-HTOTXfQj.js";
import "./BaseButton-B3srPw2H.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/LogoutModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LogoutModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-725cd612"]]);
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
    watch(() => userStore.isLoggedIn, (loggedIn) => {
      if (!loggedIn) {
        router.push("/");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_NuxtPage = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-d7ecff90><div class="profile-container" data-v-d7ecff90><h1 class="simple-welcome-text" data-v-d7ecff90>欢迎回来</h1><div class="profile-layout" data-v-d7ecff90><aside class="profile-sidebar" data-v-d7ecff90><div class="sidebar-header" data-v-d7ecff90><div class="back-home-btn" data-v-d7ecff90>`);
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
      _push(`<span data-v-d7ecff90>返回首页</span></div><div class="user-hero-card" data-v-d7ecff90>`);
      if (unref(userStore).loading) {
        _push(`<div class="user-hero-loading" data-v-d7ecff90><div class="avatar-skeleton" data-v-d7ecff90></div><div class="info-skeleton" data-v-d7ecff90><div class="line-1" data-v-d7ecff90></div><div class="line-2" data-v-d7ecff90></div></div></div>`);
      } else {
        _push(`<div class="user-hero-content" data-v-d7ecff90><div class="avatar-wrapper" data-v-d7ecff90><img${ssrRenderAttr("src", unref(userStore).user?.avatar || "/images/client/pc/avatars/avatar-cat.png")} class="user-avatar" data-v-d7ecff90><div class="status-dot" data-v-d7ecff90></div></div><div class="user-info" data-v-d7ecff90><h3 class="user-nickname" data-v-d7ecff90>${ssrInterpolate(unref(userStore).user?.nickname || "FANTULA User")}</h3><div class="user-id-badge" data-v-d7ecff90><span data-v-d7ecff90>UID: ${ssrInterpolate(unref(userStore).user?.uid || "---")}</span></div></div></div>`);
      }
      _push(`</div></div><nav class="sidebar-menu" data-v-d7ecff90><!--[-->`);
      ssrRenderList(menuGroups, (group) => {
        _push(`<div class="menu-group" data-v-d7ecff90>`);
        if (group.label) {
          _push(`<div class="menu-group-label" data-v-d7ecff90>${ssrInterpolate(group.label)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(`<div class="${ssrRenderClass([{ "active": isMenuItemActive(item) }, "menu-item"])}" data-v-d7ecff90><div class="icon-wrapper" data-v-d7ecff90>`);
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
          _push(`</div><span class="menu-text" data-v-d7ecff90>${ssrInterpolate(item?.label)}</span>`);
          if (item.key === "messages" && unref(userStore).unreadMessageCount > 0) {
            _push(`<div class="unread-indicator" data-v-d7ecff90></div>`);
          } else {
            _push(`<!---->`);
          }
          if (isMenuItemActive(item)) {
            _push(`<div class="active-glow" data-v-d7ecff90></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></nav><div class="sidebar-footer" data-v-d7ecff90><button class="logout-btn" data-v-d7ecff90>`);
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
      _push(` 退出登录 </button></div></aside><main class="profile-main" data-v-d7ecff90><div class="profile-content-frame" data-v-d7ecff90><div class="phantom-ambassador" data-v-d7ecff90></div><div class="page-content-wrapper" data-v-d7ecff90>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d7ecff90"]]);
export {
  profile as default
};
//# sourceMappingURL=profile-CiKCO-iK.js.map
