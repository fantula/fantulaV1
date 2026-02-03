import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { useRouter } from 'vue-router';
import { c as couponApi } from './coupon-D1so52Ot.mjs';
import { u as useInfiniteScroll, B as BaseInfiniteList } from './BaseInfiniteList-pSsymcej.mjs';
import { V as ticket_default } from './index-4qszPKX4.mjs';
import { B as BaseConfirmModal } from './BaseConfirmModal-Dt3jVj8H.mjs';
import { B as BaseModal } from './BaseModal-HTOTXfQj.mjs';
import { _ as _export_sfc } from './server.mjs';
import { B as BaseCouponTicket } from './BaseCouponTicket-CKW8RMPT.mjs';
import { E as ElMessage } from './index-CJUZrfXE.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './auth-BCuS92ob.mjs';
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
import './cart-D8FaBhjU.mjs';
import './BaseButton-B3srPw2H.mjs';
import './typescript-D6L75muK.mjs';
import './icon-BcxG_YvU.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './index-CO6H4Lsj.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BaseResultModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    type: { default: "success" },
    title: { default: "\u64CD\u4F5C\u6210\u529F" },
    message: {},
    primaryText: { default: "\u786E\u5B9A" },
    secondaryText: { default: "\u8FD4\u56DE" },
    showSecondary: { type: Boolean, default: false },
    showMascot: { type: Boolean, default: false },
    mascotPosition: { default: "bottom" }
  },
  emits: ["close", "primary", "secondary", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const iconClass = computed(() => `icon-${props.type}`);
    const primaryBtnClass = computed(() => ({
      "btn-success": props.type === "success",
      "btn-danger": props.type === "error",
      "btn-warning": props.type === "warning",
      "btn-primary": props.type === "info"
    }));
    const handleClose = () => {
      emit("close");
      emit("update:visible", false);
    };
    const handlePrimary = () => {
      emit("primary");
      handleClose();
    };
    const handleSecondary = () => {
      emit("secondary");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseModal, mergeProps({
        visible: __props.visible,
        title: __props.title,
        width: "500px",
        "show-footer": false,
        "show-mascot": __props.showMascot,
        "mascot-position": __props.mascotPosition,
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="result-body" data-v-43a6f06d${_scopeId}><div class="${ssrRenderClass([iconClass.value, "result-icon"])}" data-v-43a6f06d${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
              if (__props.type === "success") {
                _push2(`<span data-v-43a6f06d${_scopeId}>\u2713</span>`);
              } else if (__props.type === "error") {
                _push2(`<span data-v-43a6f06d${_scopeId}>\u2715</span>`);
              } else if (__props.type === "warning") {
                _push2(`<span data-v-43a6f06d${_scopeId}>!</span>`);
              } else {
                _push2(`<span data-v-43a6f06d${_scopeId}>i</span>`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (__props.message) {
              _push2(`<div class="result-message" data-v-43a6f06d${_scopeId}>${ssrInterpolate(__props.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$slots.default) {
              _push2(`<div class="result-content" data-v-43a6f06d${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="result-actions" data-v-43a6f06d${_scopeId}>`);
            if (__props.showSecondary) {
              _push2(`<button class="btn btn-secondary" data-v-43a6f06d${_scopeId}>${ssrInterpolate(__props.secondaryText)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="${ssrRenderClass([primaryBtnClass.value, "btn"])}" data-v-43a6f06d${_scopeId}>${ssrInterpolate(__props.primaryText)}</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "result-body" }, [
                createVNode("div", {
                  class: ["result-icon", iconClass.value]
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    __props.type === "success" ? (openBlock(), createBlock("span", { key: 0 }, "\u2713")) : __props.type === "error" ? (openBlock(), createBlock("span", { key: 1 }, "\u2715")) : __props.type === "warning" ? (openBlock(), createBlock("span", { key: 2 }, "!")) : (openBlock(), createBlock("span", { key: 3 }, "i"))
                  ], true)
                ], 2),
                __props.message ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "result-message"
                }, toDisplayString(__props.message), 1)) : createCommentVNode("", true),
                _ctx.$slots.default ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "result-content"
                }, [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "result-actions" }, [
                  __props.showSecondary ? (openBlock(), createBlock("button", {
                    key: 0,
                    class: "btn btn-secondary",
                    onClick: handleSecondary
                  }, toDisplayString(__props.secondaryText), 1)) : createCommentVNode("", true),
                  createVNode("button", {
                    class: ["btn", primaryBtnClass.value],
                    onClick: handlePrimary
                  }, toDisplayString(__props.primaryText), 3)
                ])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/base/BaseResultModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BaseResultModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-43a6f06d"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CouponBalance",
  __ssrInlineRender: true,
  props: {
    couponData: {},
    isExpired: { type: Boolean }
  },
  emits: ["use", "click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const status = computed(() => {
      if (props.couponData.status === "used") return "used";
      if (props.isExpired || props.couponData.status === "expired") return "expired";
      return "unused";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(props.couponData.coupon.end_date);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const handleAction = () => {
      emit("use", props.couponData);
    };
    const handleClick = () => {
      emit("click", props.couponData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCouponTicket, mergeProps({
        color: "gold",
        value: __props.couponData.coupon.value,
        unit: "\u70B9",
        title: __props.couponData.coupon.name,
        desc: "\u76F4\u63A5\u5B58\u5165\u4F59\u989D\uFF0C\u53EF\u8D2D\u4E70\u4EFB\u610F\u670D\u52A1",
        "type-label": "\u989D\u5EA6\u5238",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "\u7ACB\u5373\u5145\u503C",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/CouponBalance.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CouponFlat",
  __ssrInlineRender: true,
  props: {
    couponData: {},
    isExpired: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    const status = computed(() => {
      if (props.couponData.status === "used") return "used";
      if (props.isExpired || props.couponData.status === "expired") return "expired";
      return "unused";
    });
    const conditionText = computed(() => {
      const min = props.couponData.coupon.min_usage;
      return min && min > 0 ? `\u6EE1 ${min} \u70B9\u53EF\u7528` : "\u65E0\u95E8\u69DB\u4F7F\u7528";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(props.couponData.coupon.end_date);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const handleAction = () => {
      router.push("/");
    };
    const handleClick = () => {
      emit("click", props.couponData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCouponTicket, mergeProps({
        color: "purple",
        value: __props.couponData.coupon.value,
        unit: "\u70B9",
        title: __props.couponData.coupon.name,
        desc: conditionText.value,
        "type-label": "\u7ACB\u51CF\u5238",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "\u53BB\u4F7F\u7528",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/CouponFlat.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CouponProduct",
  __ssrInlineRender: true,
  props: {
    couponData: {},
    isExpired: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    const status = computed(() => {
      if (props.couponData.status === "used") return "used";
      if (props.isExpired || props.couponData.status === "expired") return "expired";
      return "unused";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "\u6C38\u4E45\u6709\u6548";
      const date = new Date(props.couponData.coupon.end_date);
      return `\u6709\u6548\u671F\u81F3 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const displayValue = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "\u5151\u6362";
      return val;
    });
    const displayUnit = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "";
      return "\u70B9";
    });
    const displayDesc = computed(() => {
      const extra = props.couponData.coupon.extra;
      if (extra && extra.product_name) {
        return `${extra.product_name} \u4E13\u7528`;
      }
      return "\u6307\u5B9A\u5546\u54C1\u4E13\u7528\u4F18\u60E0";
    });
    const handleAction = () => {
      const extra = props.couponData.coupon.extra;
      if (extra && extra.product_id) {
        router.push(`/product/${extra.product_id}`);
      } else {
        router.push("/");
      }
    };
    const handleClick = () => {
      emit("click", props.couponData);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseCouponTicket, mergeProps({
        color: "cyan",
        value: displayValue.value,
        unit: displayUnit.value,
        title: __props.couponData.coupon.name,
        desc: displayDesc.value,
        "type-label": "\u5546\u54C1\u5238",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "\u53BB\u8D2D\u4E70",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/CouponProduct.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "exchange",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    useRouter();
    const couponList = ref([]);
    const redeemCode = ref("");
    const redeeming = ref(false);
    const activeTab = ref("all");
    const tabs = [
      { key: "all", label: "\u5168\u90E8" },
      { key: "unused", label: "\u672A\u4F7F\u7528" },
      { key: "used", label: "\u5DF2\u4F7F\u7528" },
      { key: "expired", label: "\u5DF2\u8FC7\u671F" }
    ];
    const filteredSource = computed(() => {
      const now = /* @__PURE__ */ new Date();
      let list = couponList.value;
      if (activeTab.value === "used") {
        return list.filter((c) => c.status === "used");
      }
      if (activeTab.value === "expired") {
        return list.filter((c) => c.status === "expired" || c.coupon.end_date && new Date(c.coupon.end_date) < now);
      }
      if (activeTab.value === "unused") {
        return list.filter((c) => c.status === "unused" && (!c.coupon.end_date || new Date(c.coupon.end_date) >= now));
      }
      return list;
    });
    const { displayList, loading, finished, error, loadMore } = useInfiniteScroll({
      data: filteredSource,
      pageSize: 10
    });
    const fetchCoupons = async () => {
      loading.value = true;
      try {
        const res = await couponApi.getUserCoupons();
        if (res.success && res.data) {
          couponList.value = res.data;
        }
      } finally {
        loading.value = false;
      }
    };
    const getCouponComponent = (type) => {
      switch (type) {
        case "balance":
          return _sfc_main$3;
        case "product":
          return _sfc_main$1;
        case "flat":
          return _sfc_main$2;
        default:
          return _sfc_main$2;
      }
    };
    const processing = ref(false);
    const currentCoupon = ref(null);
    const showSuccessModal = ref(false);
    const redeemedCouponRaw = ref(null);
    const successMessage = computed(() => {
      const c = redeemedCouponRaw.value;
      if (!c) return "\u606D\u559C\u60A8\u83B7\u5F97\u4E00\u5F20\u4F18\u60E0\u5238\uFF01";
      return `\u606D\u559C\u60A8\u83B7\u5F97 ${c.name}\uFF0C\u5305\u542B ${c.value}\u70B9 \u6743\u76CA`;
    });
    const showBalanceModal = ref(false);
    const handleUseBalance = (coupon) => {
      currentCoupon.value = coupon;
      showBalanceModal.value = true;
    };
    const confirmUseBalance = async () => {
      if (!currentCoupon.value || processing.value) return;
      processing.value = true;
      try {
        const res = await couponApi.useBalanceCoupon(currentCoupon.value.id);
        if (res.success) {
          ElMessage.success("\u91D1\u989D\u5DF2\u6210\u529F\u5B58\u5165\u60A8\u7684\u94B1\u5305");
          showBalanceModal.value = false;
          fetchCoupons();
          userStore.fetchUserInfo();
        } else {
          ElMessage.error(res.msg || "\u64CD\u4F5C\u5931\u8D25");
        }
      } finally {
        processing.value = false;
      }
    };
    const showDeleteModal = ref(false);
    const handleCouponClick = (coupon) => {
      if (coupon.status === "used" || coupon.status === "expired" || isExpired(coupon)) {
        currentCoupon.value = coupon;
        showDeleteModal.value = true;
      }
    };
    const confirmDelete = async () => {
      if (!currentCoupon.value || processing.value) return;
      processing.value = true;
      try {
        const res = await couponApi.deleteUserCoupon(currentCoupon.value.id);
        if (res.success) {
          ElMessage.success("\u5220\u9664\u6210\u529F");
          showDeleteModal.value = false;
          couponList.value = couponList.value.filter((c) => {
            var _a;
            return c.id !== ((_a = currentCoupon.value) == null ? void 0 : _a.id);
          });
        } else {
          ElMessage.error(res.msg || "\u5220\u9664\u5931\u8D25");
        }
      } finally {
        processing.value = false;
      }
    };
    const isExpired = (coupon) => {
      if (!coupon.coupon.end_date) return false;
      return new Date(coupon.coupon.end_date) < /* @__PURE__ */ new Date();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exchange-section" }, _attrs))} data-v-aadf409b><div class="section-header" data-v-aadf409b><h2 class="section-title" data-v-aadf409b>\u5151\u6362\u4E2D\u5FC3</h2><div class="section-subtitle" data-v-aadf409b>Digital Vault</div></div><div class="redemption-card" data-v-aadf409b><div class="redemption-header" data-v-aadf409b>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "redemption-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ticket_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ticket_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="redemption-title" data-v-aadf409b>\u5151\u6362\u4F18\u60E0\u5238</div></div><div class="redemption-body" data-v-aadf409b><div class="input-group" data-v-aadf409b><input type="text" class="redemption-input" placeholder="\u8BF7\u8F93\u5165\u5151\u6362\u7801"${ssrRenderAttr("value", redeemCode.value)} data-v-aadf409b><button class="redemption-btn"${ssrIncludeBooleanAttr(!redeemCode.value || redeeming.value) ? " disabled" : ""} data-v-aadf409b>`);
      if (redeeming.value) {
        _push(`<span data-v-aadf409b>\u5151\u6362\u4E2D...</span>`);
      } else {
        _push(`<span data-v-aadf409b>\u7ACB\u5373\u5151\u6362</span>`);
      }
      _push(`</button></div><p class="redemption-tips" data-v-aadf409b>\u5151\u6362\u7801\u901A\u5E38\u753116\u4F4D\u5B57\u6BCD\u548C\u6570\u5B57\u7EC4\u6210\uFF0C\u533A\u5206\u5927\u5C0F\u5199</p></div></div><div class="coupon-tabs" data-v-aadf409b><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: activeTab.value === tab.key }])}" data-v-aadf409b>${ssrInterpolate(tab.label)} `);
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-aadf409b></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="coupon-list-container" data-v-aadf409b>`);
      _push(ssrRenderComponent(BaseInfiniteList, {
        loading: unref(loading),
        finished: unref(finished),
        error: unref(error),
        onLoad: unref(loadMore),
        offset: 150
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(displayList).length === 0 && !unref(loading)) {
              _push2(`<div class="empty-state" data-v-aadf409b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(ticket_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ticket_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="empty-text" data-v-aadf409b${_scopeId}>\u6682\u65E0\u4F18\u60E0\u5238</div><div class="empty-desc" data-v-aadf409b${_scopeId}>\u5FEB\u53BB\u5151\u6362\u6216\u53C2\u4E0E\u6D3B\u52A8\u83B7\u53D6\u5427~</div></div>`);
            } else {
              _push2(`<div class="coupon-list" data-v-aadf409b${_scopeId}><!--[-->`);
              ssrRenderList(unref(displayList), (coupon) => {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getCouponComponent(coupon.coupon.type)), {
                  key: coupon.id,
                  "coupon-data": coupon,
                  "is-expired": isExpired(coupon) || coupon.status === "expired",
                  onClick: handleCouponClick,
                  onUse: handleUseBalance
                }, null), _parent2, _scopeId);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              unref(displayList).length === 0 && !unref(loading) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "empty-state"
              }, [
                createVNode(_component_el_icon, { class: "empty-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(ticket_default))
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "empty-text" }, "\u6682\u65E0\u4F18\u60E0\u5238"),
                createVNode("div", { class: "empty-desc" }, "\u5FEB\u53BB\u5151\u6362\u6216\u53C2\u4E0E\u6D3B\u52A8\u83B7\u53D6\u5427~")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "coupon-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(displayList), (coupon) => {
                  return openBlock(), createBlock(resolveDynamicComponent(getCouponComponent(coupon.coupon.type)), {
                    key: coupon.id,
                    "coupon-data": coupon,
                    "is-expired": isExpired(coupon) || coupon.status === "expired",
                    onClick: handleCouponClick,
                    onUse: handleUseBalance
                  }, null, 40, ["coupon-data", "is-expired"]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showBalanceModal.value,
        "onUpdate:visible": ($event) => showBalanceModal.value = $event,
        title: "\u786E\u8BA4\u4F7F\u7528\u989D\u5EA6\u5238",
        "confirm-text": "\u786E\u5B9A\u5151\u6362",
        loading: processing.value,
        onConfirm: confirmUseBalance,
        "show-mascot": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentCoupon.value) {
              _push2(`<div class="modal-text" data-v-aadf409b${_scopeId}> \u786E\u5B9A\u8981\u5C06\u8FD9\u5F20\u9762\u503C\u4E3A <span class="highlight" data-v-aadf409b${_scopeId}>${ssrInterpolate(currentCoupon.value.coupon.value)} \u70B9</span> \u7684\u989D\u5EA6\u5238\u5151\u6362\u5230\u60A8\u7684\u8D26\u6237\u4F59\u989D\u4E2D\u5417\uFF1F <br data-v-aadf409b${_scopeId}><span class="warning" data-v-aadf409b${_scopeId}>\u5151\u6362\u540E\u4F18\u60E0\u5238\u5C06\u81EA\u52A8\u5931\u6548\u3002</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentCoupon.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "modal-text"
              }, [
                createTextVNode(" \u786E\u5B9A\u8981\u5C06\u8FD9\u5F20\u9762\u503C\u4E3A "),
                createVNode("span", { class: "highlight" }, toDisplayString(currentCoupon.value.coupon.value) + " \u70B9", 1),
                createTextVNode(" \u7684\u989D\u5EA6\u5238\u5151\u6362\u5230\u60A8\u7684\u8D26\u6237\u4F59\u989D\u4E2D\u5417\uFF1F "),
                createVNode("br"),
                createVNode("span", { class: "warning" }, "\u5151\u6362\u540E\u4F18\u60E0\u5238\u5C06\u81EA\u52A8\u5931\u6548\u3002")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showDeleteModal.value,
        "onUpdate:visible": ($event) => showDeleteModal.value = $event,
        title: "\u5220\u9664\u4F18\u60E0\u5238",
        "confirm-text": "\u786E\u8BA4\u5220\u9664",
        "confirm-type": "danger",
        loading: processing.value,
        onConfirm: confirmDelete,
        "show-mascot": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-text" data-v-aadf409b${_scopeId}>\u786E\u5B9A\u8981\u6C38\u4E45\u5220\u9664\u8FD9\u5F20\u4F18\u60E0\u5238\u8BB0\u5F55\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002</div>`);
          } else {
            return [
              createVNode("div", { class: "modal-text" }, "\u786E\u5B9A\u8981\u6C38\u4E45\u5220\u9664\u8FD9\u5F20\u4F18\u60E0\u5238\u8BB0\u5F55\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseResultModal, {
        visible: showSuccessModal.value,
        "onUpdate:visible": ($event) => showSuccessModal.value = $event,
        type: "success",
        title: "\u5151\u6362\u6210\u529F",
        message: successMessage.value,
        "primary-text": "\u592A\u68D2\u4E86",
        onPrimary: ($event) => showSuccessModal.value = false,
        "show-mascot": "",
        "mascot-position": "bottom"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/profile/exchange.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const exchange = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aadf409b"]]);

export { exchange as default };
//# sourceMappingURL=exchange-C9qBfJON.mjs.map
