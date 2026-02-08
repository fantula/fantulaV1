import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { am as clock_default } from './index-DlETah8a.mjs';
import { B as BaseButton } from './BaseButton-BlqmccK6.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseCouponTicket",
  __ssrInlineRender: true,
  props: {
    color: { default: "default" },
    size: { default: "normal" },
    value: {},
    unit: { default: "\u70B9" },
    title: {},
    desc: {},
    typeLabel: {},
    expiryText: {},
    status: { default: "unused" },
    disabled: { type: Boolean, default: false },
    actionText: { default: "\u53BB\u4F7F\u7528" }
  },
  emits: ["click", "action"],
  setup(__props) {
    const props = __props;
    const statusText = computed(() => {
      if (props.status === "used") return "\u5DF2\u4F7F\u7528";
      if (props.status === "expired") return "\u5DF2\u8FC7\u671F";
      return "";
    });
    const buttonTheme = computed(() => {
      switch (props.color) {
        case "purple":
          return "coupon-purple";
        case "gold":
          return "coupon-gold";
        case "cyan":
          return "coupon-cyan";
        default:
          return "coupon-purple";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["coupon-ticket", [
          `color-${__props.color}`,
          `size-${__props.size}`,
          { "is-disabled": __props.disabled || __props.status !== "unused" }
        ]]
      }, _attrs))} data-v-c5f1d826><div class="ticket-left" data-v-c5f1d826><div class="ticket-value" data-v-c5f1d826><span class="value-amount" data-v-c5f1d826>${ssrInterpolate(__props.value)}</span>`);
      if (__props.unit) {
        _push(`<span class="value-unit" data-v-c5f1d826>${ssrInterpolate(__props.unit)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ticket-type-label" data-v-c5f1d826>`);
      ssrRenderSlot(_ctx.$slots, "type-label", {}, () => {
        _push(`${ssrInterpolate(__props.typeLabel)}`);
      }, _push, _parent);
      _push(`</div></div><div class="ticket-right" data-v-c5f1d826><div class="right-main" data-v-c5f1d826><div class="ticket-name" data-v-c5f1d826>${ssrInterpolate(__props.title)}</div><div class="ticket-desc" data-v-c5f1d826>${ssrInterpolate(__props.desc)}</div></div><div class="ticket-footer" data-v-c5f1d826><div class="ticket-expiry" data-v-c5f1d826>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(clock_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(clock_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(__props.expiryText)}</div><div class="ticket-action" data-v-c5f1d826>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, () => {
        if (__props.status === "unused" && !__props.disabled) {
          _push(ssrRenderComponent(BaseButton, {
            themeId: buttonTheme.value,
            size: "small",
            class: "action-btn-wrapper",
            onClick: ($event) => _ctx.$emit("action")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.actionText)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(__props.actionText), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="status-badge" data-v-c5f1d826>${ssrInterpolate(statusText.value)}</div>`);
        }
      }, _push, _parent);
      _push(`</div></div></div><div class="punch-hole top" data-v-c5f1d826></div><div class="punch-hole bottom" data-v-c5f1d826></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/BaseCouponTicket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseCouponTicket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5f1d826"]]);

export { BaseCouponTicket as B };
//# sourceMappingURL=BaseCouponTicket-CbJ8T36H.mjs.map
