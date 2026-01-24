import { ad as BaseModal, _ as _export_sfc, d as useUserStore, E as ElIcon, a7 as ticket_default, ah as ElMessage } from "../server.mjs";
import { defineComponent, computed, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, renderSlot, openBlock, toDisplayString, useSSRContext, ref, unref, resolveDynamicComponent, createTextVNode } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderVNode } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { B as BaseCouponTicket, c as couponApi } from "./BaseCouponTicket-DeNYuNt9.js";
import { B as BaseConfirmModal } from "./BaseConfirmModal-CwvvkDFj.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BaseResultModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    type: { default: "success" },
    title: { default: "操作成功" },
    message: {},
    primaryText: { default: "确定" },
    secondaryText: { default: "返回" },
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
            _push2(`<div class="result-body" data-v-7a5915cb${_scopeId}><div class="${ssrRenderClass([iconClass.value, "result-icon"])}" data-v-7a5915cb${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
              if (__props.type === "success") {
                _push2(`<span data-v-7a5915cb${_scopeId}>✓</span>`);
              } else if (__props.type === "error") {
                _push2(`<span data-v-7a5915cb${_scopeId}>✕</span>`);
              } else if (__props.type === "warning") {
                _push2(`<span data-v-7a5915cb${_scopeId}>!</span>`);
              } else {
                _push2(`<span data-v-7a5915cb${_scopeId}>i</span>`);
              }
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (__props.message) {
              _push2(`<div class="result-message" data-v-7a5915cb${_scopeId}>${ssrInterpolate(__props.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$slots.default) {
              _push2(`<div class="result-content" data-v-7a5915cb${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="result-actions" data-v-7a5915cb${_scopeId}>`);
            if (__props.showSecondary) {
              _push2(`<button class="btn btn-secondary" data-v-7a5915cb${_scopeId}>${ssrInterpolate(__props.secondaryText)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="${ssrRenderClass([primaryBtnClass.value, "btn"])}" data-v-7a5915cb${_scopeId}>${ssrInterpolate(__props.primaryText)}</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "result-body" }, [
                createVNode("div", {
                  class: ["result-icon", iconClass.value]
                }, [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    __props.type === "success" ? (openBlock(), createBlock("span", { key: 0 }, "✓")) : __props.type === "error" ? (openBlock(), createBlock("span", { key: 1 }, "✕")) : __props.type === "warning" ? (openBlock(), createBlock("span", { key: 2 }, "!")) : (openBlock(), createBlock("span", { key: 3 }, "i"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/base/BaseResultModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BaseResultModal = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-7a5915cb"]]);
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
      if (!props.couponData.coupon.end_date) return "永久有效";
      const date = new Date(props.couponData.coupon.end_date);
      return `有效期至 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
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
        unit: "点",
        title: __props.couponData.coupon.name,
        desc: "直接存入余额，可购买任意服务",
        "type-label": "额度券",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "立即充值",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/exchange/coupon/CouponBalance.vue");
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
      return min && min > 0 ? `满 ${min} 点可用` : "无门槛使用";
    });
    const expiryText = computed(() => {
      if (!props.couponData.coupon.end_date) return "永久有效";
      const date = new Date(props.couponData.coupon.end_date);
      return `有效期至 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
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
        unit: "点",
        title: __props.couponData.coupon.name,
        desc: conditionText.value,
        "type-label": "立减券",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "去使用",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/exchange/coupon/CouponFlat.vue");
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
      if (!props.couponData.coupon.end_date) return "永久有效";
      const date = new Date(props.couponData.coupon.end_date);
      return `有效期至 ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    });
    const displayValue = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "兑换";
      return val;
    });
    const displayUnit = computed(() => {
      const val = props.couponData.coupon.value;
      if (!val || Number(val) === 0) return "";
      return "点";
    });
    const displayDesc = computed(() => {
      const extra = props.couponData.coupon.extra;
      if (extra && extra.product_name) {
        return `${extra.product_name} 专用`;
      }
      return "指定商品专用优惠";
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
        "type-label": "商品券",
        "expiry-text": expiryText.value,
        status: status.value,
        disabled: __props.isExpired,
        "action-text": "去购买",
        onClick: handleClick,
        onAction: handleAction
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/exchange/coupon/CouponProduct.vue");
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
      { key: "all", label: "全部" },
      { key: "unused", label: "未使用" },
      { key: "used", label: "已使用" },
      { key: "expired", label: "已过期" }
    ];
    const fetchCoupons = async () => {
      const res = await couponApi.getUserCoupons();
      if (res.success && res.data) {
        couponList.value = res.data;
      }
    };
    const filteredCoupons = computed(() => {
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
      if (!c) return "恭喜您获得一张优惠券！";
      return `恭喜您获得 ${c.name}，包含 ${c.value}点 权益`;
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
          ElMessage.success("金额已成功存入您的钱包");
          showBalanceModal.value = false;
          fetchCoupons();
          userStore.getUserInfo();
        } else {
          ElMessage.error(res.msg || "操作失败");
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
          ElMessage.success("删除成功");
          showDeleteModal.value = false;
          fetchCoupons();
        } else {
          ElMessage.error(res.msg || "删除失败");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exchange-section" }, _attrs))} data-v-c5b0608c><div class="section-header" data-v-c5b0608c><h2 class="section-title" data-v-c5b0608c>兑换中心</h2><div class="section-subtitle" data-v-c5b0608c>Digital Vault</div></div><div class="redemption-card" data-v-c5b0608c><div class="redemption-header" data-v-c5b0608c>`);
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
      _push(`<div class="redemption-title" data-v-c5b0608c>兑换优惠券</div></div><div class="redemption-body" data-v-c5b0608c><div class="input-group" data-v-c5b0608c><input type="text" class="redemption-input" placeholder="请输入兑换码"${ssrRenderAttr("value", redeemCode.value)} data-v-c5b0608c><button class="redemption-btn"${ssrIncludeBooleanAttr(!redeemCode.value || redeeming.value) ? " disabled" : ""} data-v-c5b0608c>`);
      if (redeeming.value) {
        _push(`<span data-v-c5b0608c>兑换中...</span>`);
      } else {
        _push(`<span data-v-c5b0608c>立即兑换</span>`);
      }
      _push(`</button></div><p class="redemption-tips" data-v-c5b0608c>兑换码通常由16位字母和数字组成，区分大小写</p></div></div><div class="coupon-tabs" data-v-c5b0608c><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<div class="${ssrRenderClass(["tab-item", { active: activeTab.value === tab.key }])}" data-v-c5b0608c>${ssrInterpolate(tab.label)} `);
        if (activeTab.value === tab.key) {
          _push(`<div class="active-indicator" data-v-c5b0608c></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="coupon-list-container" data-v-c5b0608c><div class="coupon-list" data-v-c5b0608c>`);
      if (filteredCoupons.value.length === 0) {
        _push(`<div class="empty-state" data-v-c5b0608c>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "empty-icon" }, {
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
        _push(`<div class="empty-text" data-v-c5b0608c>暂无优惠券</div><div class="empty-desc" data-v-c5b0608c>快去兑换或参与活动获取吧~</div></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredCoupons.value, (coupon) => {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(getCouponComponent(coupon.coupon.type)), {
            key: coupon.id,
            "coupon-data": coupon,
            "is-expired": isExpired(coupon) || coupon.status === "expired",
            onClick: handleCouponClick,
            onUse: handleUseBalance
          }, null), _parent);
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showBalanceModal.value,
        "onUpdate:visible": ($event) => showBalanceModal.value = $event,
        title: "确认使用额度券",
        "confirm-text": "确定兑换",
        loading: processing.value,
        onConfirm: confirmUseBalance,
        "show-mascot": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentCoupon.value) {
              _push2(`<div class="modal-text" data-v-c5b0608c${_scopeId}> 确定要将这张面值为 <span class="highlight" data-v-c5b0608c${_scopeId}>${ssrInterpolate(currentCoupon.value.coupon.value)} 点</span> 的额度券兑换到您的账户余额中吗？ <br data-v-c5b0608c${_scopeId}><span class="warning" data-v-c5b0608c${_scopeId}>兑换后优惠券将自动失效。</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentCoupon.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "modal-text"
              }, [
                createTextVNode(" 确定要将这张面值为 "),
                createVNode("span", { class: "highlight" }, toDisplayString(currentCoupon.value.coupon.value) + " 点", 1),
                createTextVNode(" 的额度券兑换到您的账户余额中吗？ "),
                createVNode("br"),
                createVNode("span", { class: "warning" }, "兑换后优惠券将自动失效。")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseConfirmModal, {
        visible: showDeleteModal.value,
        "onUpdate:visible": ($event) => showDeleteModal.value = $event,
        title: "删除优惠券",
        "confirm-text": "确认删除",
        "confirm-type": "danger",
        loading: processing.value,
        onConfirm: confirmDelete,
        "show-mascot": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="modal-text" data-v-c5b0608c${_scopeId}>确定要永久删除这张优惠券记录吗？此操作无法撤销。</div>`);
          } else {
            return [
              createVNode("div", { class: "modal-text" }, "确定要永久删除这张优惠券记录吗？此操作无法撤销。")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(BaseResultModal, {
        visible: showSuccessModal.value,
        "onUpdate:visible": ($event) => showSuccessModal.value = $event,
        type: "success",
        title: "兑换成功",
        message: successMessage.value,
        "primary-text": "太棒了",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/exchange.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const exchange = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5b0608c"]]);
export {
  exchange as default
};
//# sourceMappingURL=exchange-KPAOmvua.js.map
