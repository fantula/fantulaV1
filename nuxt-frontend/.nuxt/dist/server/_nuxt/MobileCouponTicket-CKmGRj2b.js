import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileCouponTicket",
  __ssrInlineRender: true,
  props: {
    type: { default: "flat" },
    value: {},
    unit: {},
    title: {},
    expiryText: {},
    status: { default: "unused" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const themeColor = computed(() => {
      switch (props.type) {
        case "balance":
          return "gold";
        // Balance
        case "product":
          return "cyan";
        // Product
        case "flat":
          return "purple";
        // Full reduction (default)
        default:
          return "purple";
      }
    });
    const typeLabel = computed(() => {
      switch (props.type) {
        case "balance":
          return "余额券";
        case "product":
          return "商品券";
        case "flat":
          return "满减券";
        default:
          return "优惠券";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["mobile-coupon-ticket", [
          `color-${themeColor.value}`,
          { "is-disabled": __props.disabled || __props.status !== "unused" }
        ]]
      }, _attrs))} data-v-3723fbbf><div class="ticket-left" data-v-3723fbbf><div class="ticket-value" data-v-3723fbbf>`);
      if (themeColor.value === "gold" || themeColor.value === "purple") {
        _push(`<span class="symbol" data-v-3723fbbf>¥</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="value-amount" data-v-3723fbbf>${ssrInterpolate(__props.value)}</span>`);
      if (__props.unit) {
        _push(`<span class="value-unit" data-v-3723fbbf>${ssrInterpolate(__props.unit)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ticket-type-label" data-v-3723fbbf>${ssrInterpolate(typeLabel.value)}</div></div><div class="ticket-right" data-v-3723fbbf><div class="right-main" data-v-3723fbbf><div class="ticket-name" data-v-3723fbbf>${ssrInterpolate(__props.title)}</div><div class="ticket-desc" data-v-3723fbbf>${ssrInterpolate(__props.type === "product" ? "特定商品可用" : "全场通用")}</div></div><div class="ticket-footer" data-v-3723fbbf><div class="ticket-expiry" data-v-3723fbbf>${ssrInterpolate(__props.expiryText)}</div><div class="ticket-status" data-v-3723fbbf>`);
      if (__props.status === "used") {
        _push(`<span class="status-tag used" data-v-3723fbbf>已使用</span>`);
      } else if (__props.status === "expired") {
        _push(`<span class="status-tag expired" data-v-3723fbbf>已过期</span>`);
      } else {
        _push(`<span class="status-tag unused" data-v-3723fbbf>去使用</span>`);
      }
      _push(`</div></div></div><div class="punch-hole top" data-v-3723fbbf></div><div class="punch-hole bottom" data-v-3723fbbf></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/redemption/MobileCouponTicket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileCouponTicket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3723fbbf"]]);
export {
  MobileCouponTicket as M
};
//# sourceMappingURL=MobileCouponTicket-CKmGRj2b.js.map
