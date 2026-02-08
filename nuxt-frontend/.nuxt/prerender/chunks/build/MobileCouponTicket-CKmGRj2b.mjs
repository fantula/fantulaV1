import { defineComponent, computed, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

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
          return "\u4F59\u989D\u5238";
        case "product":
          return "\u5546\u54C1\u5238";
        case "flat":
          return "\u6EE1\u51CF\u5238";
        default:
          return "\u4F18\u60E0\u5238";
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
        _push(`<span class="symbol" data-v-3723fbbf>\xA5</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="value-amount" data-v-3723fbbf>${ssrInterpolate(__props.value)}</span>`);
      if (__props.unit) {
        _push(`<span class="value-unit" data-v-3723fbbf>${ssrInterpolate(__props.unit)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ticket-type-label" data-v-3723fbbf>${ssrInterpolate(typeLabel.value)}</div></div><div class="ticket-right" data-v-3723fbbf><div class="right-main" data-v-3723fbbf><div class="ticket-name" data-v-3723fbbf>${ssrInterpolate(__props.title)}</div><div class="ticket-desc" data-v-3723fbbf>${ssrInterpolate(__props.type === "product" ? "\u7279\u5B9A\u5546\u54C1\u53EF\u7528" : "\u5168\u573A\u901A\u7528")}</div></div><div class="ticket-footer" data-v-3723fbbf><div class="ticket-expiry" data-v-3723fbbf>${ssrInterpolate(__props.expiryText)}</div><div class="ticket-status" data-v-3723fbbf>`);
      if (__props.status === "used") {
        _push(`<span class="status-tag used" data-v-3723fbbf>\u5DF2\u4F7F\u7528</span>`);
      } else if (__props.status === "expired") {
        _push(`<span class="status-tag expired" data-v-3723fbbf>\u5DF2\u8FC7\u671F</span>`);
      } else {
        _push(`<span class="status-tag unused" data-v-3723fbbf>\u53BB\u4F7F\u7528</span>`);
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

export { MobileCouponTicket as M };
//# sourceMappingURL=MobileCouponTicket-CKmGRj2b.mjs.map
