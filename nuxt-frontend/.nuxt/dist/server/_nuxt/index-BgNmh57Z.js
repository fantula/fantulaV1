import { E as ElIcon } from "./index-jl2vZbkg.js";
/* empty css              */
import { defineComponent, ref, unref, useSSRContext, mergeProps, withCtx, createVNode, resolveDynamicComponent, computed } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderVNode, ssrRenderSlot } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { Q as user_default, f as arrow_right_default, a3 as message_default, a5 as lock_default, t as delete_default, W as switch_button_default, h as circle_check_filled_default, R as wallet_default, ag as box_default, N as monitor_default, n as refresh_right_default, T as ticket_default, U as star_default, ai as headset_default, aa as shopping_cart_default, V as bell_default } from "./index-DlETah8a.js";
import { u as useUserStore } from "./user-Cnuc6I82.js";
import { useCartStore } from "./cart-C8TGo9ts.js";
import { E as EditNicknameModal, C as ChangePasswordModal, a as ChangeEmailModal, D as DeleteAccountModal } from "./DeleteAccountModal-B5RDsU7s.js";
import { _ as _export_sfc } from "../server.mjs";
import RechargeModal from "./RechargeModal-DyRjlK-h.js";
import { M as MobileContactModal } from "./MobileContactModal-BpYUXIun.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
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
/* empty css                    */
import "./virtual_public-CTq2VprR.js";
import "./virtual_public-FTeKDcap.js";
import "./useSystemConfig-Dp_BX2zp.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MobileSettingsSheet",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const userStore = useUserStore();
    const activeModal = ref(null);
    const handleSuccess = (msg) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-02fdc31b>`);
      if (__props.visible) {
        _push(`<div class="sheet-overlay" data-v-02fdc31b><div class="sheet-content" data-v-02fdc31b><div class="sheet-handle-bar" data-v-02fdc31b><div class="sheet-handle" data-v-02fdc31b></div></div><div class="sheet-header" data-v-02fdc31b><div class="sheet-title" data-v-02fdc31b>设置</div></div><div class="sheet-body" data-v-02fdc31b><div class="setting-group" data-v-02fdc31b><div class="group-title" data-v-02fdc31b>账号信息</div><div class="setting-item" data-v-02fdc31b><div class="item-left" data-v-02fdc31b>`);
        _push(ssrRenderComponent(unref(user_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-02fdc31b>修改昵称</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div><div class="setting-item" data-v-02fdc31b><div class="item-left" data-v-02fdc31b>`);
        _push(ssrRenderComponent(unref(message_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-02fdc31b>换绑邮箱</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div></div><div class="setting-group" data-v-02fdc31b><div class="group-title" data-v-02fdc31b>安全与隐私</div><div class="setting-item" data-v-02fdc31b><div class="item-left" data-v-02fdc31b>`);
        _push(ssrRenderComponent(unref(lock_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-02fdc31b>修改密码</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div><div class="setting-item" data-v-02fdc31b><div class="item-left" data-v-02fdc31b>`);
        _push(ssrRenderComponent(unref(delete_default), { class: "w-5 h-5 text-red-400" }, null, _parent));
        _push(`<span class="text-red-400" data-v-02fdc31b>注销账号</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div></div><div class="setting-group" data-v-02fdc31b><div class="setting-item logout-item" data-v-02fdc31b>`);
        _push(ssrRenderComponent(unref(switch_button_default), { class: "w-5 h-5" }, null, _parent));
        _push(`<span data-v-02fdc31b>退出登录</span></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": unref(userStore).user?.nickName,
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess()
      }, null, _parent));
      _push(ssrRenderComponent(ChangePasswordModal, {
        visible: activeModal.value === "password",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess()
      }, null, _parent));
      _push(ssrRenderComponent(ChangeEmailModal, {
        visible: activeModal.value === "email",
        onClose: ($event) => activeModal.value = null,
        onSuccess: ($event) => handleSuccess()
      }, null, _parent));
      _push(ssrRenderComponent(DeleteAccountModal, {
        visible: activeModal.value === "delete",
        onClose: ($event) => activeModal.value = null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/MobileSettingsSheet.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileSettingsSheet = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-02fdc31b"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileProfileHeader",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "member-card" }, _attrs))} data-v-000f48de><div class="card-content" data-v-000f48de><div class="avatar-wrap" data-v-000f48de><img${ssrRenderAttr("src", __props.user?.avatar || "/images/client/pc/avatars/avatar-cat.png")} class="avatar-img" data-v-000f48de></div><div class="user-details" data-v-000f48de><h1 class="username" data-v-000f48de>${ssrInterpolate(__props.user?.nickname || "FANTULA User")}</h1><div class="tags-row" data-v-000f48de><div class="tag-pill blue-pill" data-v-000f48de>FANTULA Member</div><div class="tag-pill green-pill" data-v-000f48de>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "icon-small" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(circle_check_filled_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` 安全等级: 高 </div></div></div>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "card-arrow" }, {
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
      _push(`</div><div class="card-glow" data-v-000f48de></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/MobileProfileHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileProfileHeader = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-000f48de"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileMenuLink",
  __ssrInlineRender: true,
  props: {
    label: {},
    icon: {},
    badge: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "menu-item" }, _attrs))} data-v-664aed89><div class="menu-left" data-v-664aed89>`);
      if (__props.icon) {
        _push(`<div class="icon-wrap" data-v-664aed89>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-5 h-5 text-icon" }, null), _parent);
        _push(`</div>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
      }
      _push(`<span class="menu-text" data-v-664aed89>${ssrInterpolate(__props.label)}</span>`);
      if (__props.badge) {
        _push(`<div class="list-dot" data-v-664aed89></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "text-arrow" }, {
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/profile/MobileMenuLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-664aed89"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const showSettings = ref(false);
    const showRecharge = ref(false);
    const showContactModal = ref(false);
    const userInfo = computed(() => {
      const u = userStore.user;
      if (!u) return { nickname: "用户", avatar: "", uid: "---" };
      return {
        nickname: u.nickName || u.nickname || u.email?.split("@")[0] || "用户",
        avatar: u.avatar || "",
        uid: u.uid || u.id?.toString().slice(0, 8) || "---"
      };
    });
    const orderCounts = computed(() => {
      const pending = userStore.getOrdersByStatus("pending_payment").length;
      const paid = userStore.getOrdersByStatus("pending_delivery").length;
      const refunding = userStore.getOrdersByStatus("refunding").length;
      return { pending, paid, refunding };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-profile-minimal" }, _attrs))} data-v-f4daa733><div class="header-container" data-v-f4daa733>`);
      _push(ssrRenderComponent(MobileProfileHeader, {
        user: userInfo.value,
        onClick: ($event) => unref(router).push("/mobile/profile/account")
      }, null, _parent));
      _push(`</div><div class="section-card wallet-section" data-v-f4daa733><div class="wallet-background" data-v-f4daa733></div><div class="wallet-content" data-v-f4daa733><div class="wallet-left" data-v-f4daa733><div class="wallet-label" data-v-f4daa733>我的额度</div><div class="wallet-value text-price" data-v-f4daa733>${ssrInterpolate(Number(unref(userStore).user?.balance || 0).toFixed(2))}</div></div><div class="wallet-actions" data-v-f4daa733><button class="action-btn primary-btn pill-btn" data-v-f4daa733>充值</button></div></div></div><div class="section-card order-card bg-glass-card" data-v-f4daa733><div class="card-header compact-header" data-v-f4daa733><span class="card-title" data-v-f4daa733>我的订单</span><div class="card-more" data-v-f4daa733> 全部 `);
      _push(ssrRenderComponent(_component_el_icon, { class: "ml-1" }, {
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
      _push(`</div></div><div class="order-grid compact-grid" data-v-f4daa733><div class="order-item" data-v-f4daa733><div class="icon-wrap" data-v-f4daa733>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "order-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(wallet_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(wallet_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (orderCounts.value.pending > 0) {
        _push(`<div class="badge-dot" data-v-f4daa733>${ssrInterpolate(orderCounts.value.pending)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-f4daa733>待支付</span></div><div class="order-item" data-v-f4daa733><div class="icon-wrap" data-v-f4daa733>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "order-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(box_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(box_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (orderCounts.value.paid > 0) {
        _push(`<div class="badge-dot" data-v-f4daa733>${ssrInterpolate(orderCounts.value.paid)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-f4daa733>待发货</span></div><div class="order-item" data-v-f4daa733><div class="icon-wrap" data-v-f4daa733>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "order-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(monitor_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(monitor_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><span class="order-label" data-v-f4daa733>使用中</span></div><div class="order-item" data-v-f4daa733><div class="icon-wrap" data-v-f4daa733>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "order-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(refresh_right_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(refresh_right_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (orderCounts.value.refunding > 0) {
        _push(`<div class="badge-dot" data-v-f4daa733>${ssrInterpolate(orderCounts.value.refunding)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-f4daa733>退款/售后</span></div></div></div><div class="menu-list-group" data-v-f4daa733>`);
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "兑换中心",
        icon: unref(ticket_default),
        onClick: ($event) => unref(router).push("/mobile/profile/redemption")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "我的收藏",
        icon: unref(star_default),
        onClick: ($event) => unref(router).push("/mobile/profile/favorites")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "我的工单",
        icon: unref(headset_default),
        onClick: ($event) => unref(router).push("/mobile/profile/tickets")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "我的购物车",
        icon: unref(shopping_cart_default),
        badge: unref(cartStore).totalCount > 0,
        onClick: ($event) => unref(router).push("/mobile/cart")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "我的消息",
        icon: unref(bell_default),
        badge: unref(userStore).unreadMessageCount > 0,
        onClick: ($event) => unref(router).push("/mobile/profile/messages")
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(MobileSettingsSheet, {
        visible: showSettings.value,
        onClose: ($event) => showSettings.value = false
      }, null, _parent));
      _push(ssrRenderComponent(RechargeModal, {
        visible: showRecharge.value,
        onClose: ($event) => showRecharge.value = false,
        onSuccess: ($event) => unref(userStore).fetchUserInfo()
      }, null, _parent));
      _push(ssrRenderComponent(MobileContactModal, {
        modelValue: showContactModal.value,
        "onUpdate:modelValue": ($event) => showContactModal.value = $event
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f4daa733"]]);
export {
  index as default
};
//# sourceMappingURL=index-BgNmh57Z.js.map
