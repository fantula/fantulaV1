import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const BUTTON_THEMES = {
  "primary": {
    id: "primary",
    variantClass: "btn-primary"
  },
  // [Primary Orange] - Orange Gradient (Recharge, VIP)
  "primary-orange": {
    id: "primary-orange",
    variantClass: "btn-primary-orange"
  },
  // [Coupon Themes]
  "coupon-purple": { id: "coupon-purple", variantClass: "btn-coupon-purple" },
  "coupon-gold": { id: "coupon-gold", variantClass: "btn-coupon-gold" },
  "coupon-cyan": { id: "coupon-cyan", variantClass: "btn-coupon-cyan" },
  // [Suite 001] Classic Phantom - Neon Glass
  "suit-001-primary": {
    id: "suit-001-primary",
    variantClass: "btn-suit-001-primary"
  },
  "suit-001-secondary": {
    id: "suit-001-secondary",
    variantClass: "btn-suit-001-secondary"
  },
  // [Secondary] Ghost/Outline (Cancel, Back)
  "secondary": {
    id: "secondary",
    variantClass: "btn-secondary"
  },
  // [Destructive] Warning/Red (Delete, Logout)
  "destructive": {
    id: "destructive",
    variantClass: "btn-destructive"
  },
  // [Marketing] Product Cards (Buy Cart) - Special Interaction
  "marketing-buy": {
    id: "marketing-buy",
    variantClass: "btn-marketing-buy"
  },
  "marketing-cart": {
    id: "marketing-cart",
    variantClass: "btn-marketing-cart"
  },
  // [Social] OAuth Buttons
  "social-google": {
    id: "social-google",
    variantClass: "btn-social-google"
  },
  // [Tab] Login/Register Toggles
  "tab": {
    id: "tab",
    variantClass: "btn-tab"
  }
};
const DEFAULT_BUTTON_THEME_ID = "primary";
function getButtonTheme(id) {
  return BUTTON_THEMES[id || ""] || BUTTON_THEMES[DEFAULT_BUTTON_THEME_ID];
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseButton",
  __ssrInlineRender: true,
  props: {
    themeId: { default: "primary" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    size: { default: "default" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const theme = computed(() => getButtonTheme(props.themeId));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["base-button", [
          theme.value.variantClass,
          {
            "is-loading": __props.loading,
            "is-disabled": __props.disabled,
            "is-block": __props.block,
            [`is-${__props.size}`]: __props.size
          }
        ]],
        disabled: __props.disabled || __props.loading
      }, _attrs))} data-v-337c9b7d>`);
      if (__props.loading) {
        _push(`<span class="btn-spinner" data-v-337c9b7d><svg viewBox="0 0 24 24" fill="none" class="spinner-icon" data-v-337c9b7d><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25" data-v-337c9b7d></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-337c9b7d></path></svg></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass([{ "is-hidden": __props.loading }, "btn-content"])}" data-v-337c9b7d>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span><div class="hover-effect" data-v-337c9b7d></div></button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BaseButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-337c9b7d"]]);
export {
  BaseButton as B
};
//# sourceMappingURL=BaseButton-BlqmccK6.js.map
