import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { a as arrow_right_default, X as wallet_default, ak as box_default, T as monitor_default, A as refresh_right_default, Z as ticket_default, _ as star_default, am as headset_default, ag as shopping_cart_default, $ as bell_default, o as circle_check_filled_default, W as user_default, a5 as message_default, a7 as lock_default, d as delete_default, a0 as switch_button_default } from './index-DuV_oMrC.mjs';
import { u as useUserStore } from './user-C1i1UnhA.mjs';
import { useCartStore } from './cart-B8xez9id.mjs';
import { E as EditNicknameModal, C as ChangePasswordModal, a as ChangeEmailModal, D as DeleteAccountModal } from './DeleteAccountModal-D7knrCNj.mjs';
import { _ as _export_sfc } from './server.mjs';
import RechargeModal from './RechargeModal-CDeMTilj.mjs';
import { M as MobileContactModal } from './MobileContactModal-D2_Mlz7X.mjs';
import '@vueuse/core';
import '@vue/shared';
import './objects-Bz74KHmq.mjs';
import 'lodash-unified';
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
import './common-D9iMPQj0.mjs';
import './useSendCode-BPjllPca.mjs';
import './interval-BHZX8LlC.mjs';
import './index-Ho-fELR6.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CyvpkMdQ.mjs';
import './use-global-config-Dt87SALX.mjs';
import './index-xMedQC9S.mjs';
import './event-D3FEo2C5.mjs';
import './virtual_public-Dz2P0tZ2.mjs';
import './useSystemConfig-Dp_BX2zp.mjs';

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
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-940eb4c3>`);
      if (__props.visible) {
        _push(`<div class="sheet-overlay" data-v-940eb4c3><div class="sheet-content aurora-sheet-panel" data-v-940eb4c3><div class="sheet-handle-bar" data-v-940eb4c3><div class="sheet-handle" data-v-940eb4c3></div></div><div class="sheet-header" data-v-940eb4c3><div class="sheet-title" data-v-940eb4c3>\u8BBE\u7F6E</div></div><div class="sheet-body" data-v-940eb4c3><div class="setting-group" data-v-940eb4c3><div class="group-title" data-v-940eb4c3>\u8D26\u53F7\u4FE1\u606F</div><div class="setting-item" data-v-940eb4c3><div class="item-left" data-v-940eb4c3>`);
        _push(ssrRenderComponent(unref(user_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-940eb4c3>\u4FEE\u6539\u6635\u79F0</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div><div class="setting-item" data-v-940eb4c3><div class="item-left" data-v-940eb4c3>`);
        _push(ssrRenderComponent(unref(message_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-940eb4c3>\u6362\u7ED1\u90AE\u7BB1</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div></div><div class="setting-group" data-v-940eb4c3><div class="group-title" data-v-940eb4c3>\u5B89\u5168\u4E0E\u9690\u79C1</div><div class="setting-item" data-v-940eb4c3><div class="item-left" data-v-940eb4c3>`);
        _push(ssrRenderComponent(unref(lock_default), { class: "w-5 h-5 text-icon" }, null, _parent));
        _push(`<span data-v-940eb4c3>\u4FEE\u6539\u5BC6\u7801</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div><div class="setting-item" data-v-940eb4c3><div class="item-left" data-v-940eb4c3>`);
        _push(ssrRenderComponent(unref(delete_default), { class: "w-5 h-5 text-red-400" }, null, _parent));
        _push(`<span class="text-red-400" data-v-940eb4c3>\u6CE8\u9500\u8D26\u53F7</span></div>`);
        _push(ssrRenderComponent(unref(arrow_right_default), { class: "w-4 h-4 text-arrow" }, null, _parent));
        _push(`</div></div><div class="setting-group" data-v-940eb4c3><div class="setting-item logout-item" data-v-940eb4c3>`);
        _push(ssrRenderComponent(unref(switch_button_default), { class: "w-5 h-5" }, null, _parent));
        _push(`<span data-v-940eb4c3>\u9000\u51FA\u767B\u5F55</span></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(EditNicknameModal, {
        visible: activeModal.value === "nickname",
        "current-nickname": (_a = unref(userStore).user) == null ? void 0 : _a.nickName,
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
const MobileSettingsSheet = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-940eb4c3"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileProfileHeader",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "member-card" }, _attrs))} data-v-000f48de><div class="card-content" data-v-000f48de><div class="avatar-wrap" data-v-000f48de><img${ssrRenderAttr("src", ((_a = __props.user) == null ? void 0 : _a.avatar) || "/images/client/pc/avatars/avatar-cat.png")} class="avatar-img" data-v-000f48de></div><div class="user-details" data-v-000f48de><h1 class="username" data-v-000f48de>${ssrInterpolate(((_b = __props.user) == null ? void 0 : _b.nickname) || "FANTULA User")}</h1><div class="tags-row" data-v-000f48de><div class="tag-pill blue-pill" data-v-000f48de>FANTULA Member</div><div class="tag-pill green-pill" data-v-000f48de>`);
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
      _push(` \u5B89\u5168\u7B49\u7EA7: \u9AD8 </div></div></div>`);
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
      var _a, _b;
      const u = userStore.user;
      if (!u) return { nickname: "\u7528\u6237", avatar: "", uid: "---" };
      return {
        nickname: u.nickName || u.nickname || ((_a = u.email) == null ? void 0 : _a.split("@")[0]) || "\u7528\u6237",
        avatar: u.avatar || "",
        uid: u.uid || ((_b = u.id) == null ? void 0 : _b.toString().slice(0, 8)) || "---"
      };
    });
    const orderCounts = computed(() => {
      const pending = userStore.getOrdersByStatus("pending_payment").length;
      const paid = userStore.getOrdersByStatus("pending_delivery").length;
      const refunding = userStore.getOrdersByStatus("refunding").length;
      return { pending, paid, refunding };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-profile-minimal" }, _attrs))} data-v-a347b6ca><div class="header-container" data-v-a347b6ca>`);
      _push(ssrRenderComponent(MobileProfileHeader, {
        user: userInfo.value,
        onClick: ($event) => unref(router).push("/mobile/profile/account")
      }, null, _parent));
      _push(`</div><div class="section-card wallet-section" data-v-a347b6ca><div class="wallet-background" data-v-a347b6ca></div><div class="wallet-content" data-v-a347b6ca><div class="wallet-left" data-v-a347b6ca><div class="wallet-label" data-v-a347b6ca>\u6211\u7684\u989D\u5EA6</div><div class="wallet-value text-price" data-v-a347b6ca>${ssrInterpolate(Number(((_a = unref(userStore).user) == null ? void 0 : _a.balance) || 0).toFixed(2))}</div></div><div class="wallet-actions" data-v-a347b6ca><button class="action-btn primary-btn pill-btn" data-v-a347b6ca>\u5145\u503C</button></div></div></div><div class="section-card order-card bg-glass-card" data-v-a347b6ca><div class="card-header compact-header" data-v-a347b6ca><span class="card-title" data-v-a347b6ca>\u6211\u7684\u8BA2\u5355</span><div class="card-more" data-v-a347b6ca> \u5168\u90E8 `);
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
      _push(`</div></div><div class="order-grid compact-grid" data-v-a347b6ca><div class="order-item" data-v-a347b6ca><div class="icon-wrap" data-v-a347b6ca>`);
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
        _push(`<div class="badge-dot" data-v-a347b6ca>${ssrInterpolate(orderCounts.value.pending)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-a347b6ca>\u5F85\u652F\u4ED8</span></div><div class="order-item" data-v-a347b6ca><div class="icon-wrap" data-v-a347b6ca>`);
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
        _push(`<div class="badge-dot" data-v-a347b6ca>${ssrInterpolate(orderCounts.value.paid)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-a347b6ca>\u5F85\u53D1\u8D27</span></div><div class="order-item" data-v-a347b6ca><div class="icon-wrap" data-v-a347b6ca>`);
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
      _push(`</div><span class="order-label" data-v-a347b6ca>\u4F7F\u7528\u4E2D</span></div><div class="order-item" data-v-a347b6ca><div class="icon-wrap" data-v-a347b6ca>`);
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
        _push(`<div class="badge-dot" data-v-a347b6ca>${ssrInterpolate(orderCounts.value.refunding)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="order-label" data-v-a347b6ca>\u9000\u6B3E/\u552E\u540E</span></div></div></div><div class="menu-list-group" data-v-a347b6ca>`);
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "\u5151\u6362\u4E2D\u5FC3",
        icon: unref(ticket_default),
        onClick: ($event) => unref(router).push("/mobile/profile/redemption")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "\u6211\u7684\u6536\u85CF",
        icon: unref(star_default),
        onClick: ($event) => unref(router).push("/mobile/profile/favorites")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "\u6211\u7684\u5DE5\u5355",
        icon: unref(headset_default),
        onClick: ($event) => unref(router).push("/mobile/profile/tickets")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "\u6211\u7684\u8D2D\u7269\u8F66",
        icon: unref(shopping_cart_default),
        badge: unref(cartStore).totalCount > 0,
        onClick: ($event) => unref(router).push("/mobile/cart")
      }, null, _parent));
      _push(ssrRenderComponent(MobileMenuLink, {
        label: "\u6211\u7684\u6D88\u606F",
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a347b6ca"]]);

export { index as default };
//# sourceMappingURL=index-CAqGKIFa.mjs.map
