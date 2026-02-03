import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { ad as clock_default } from './index-4qszPKX4.mjs';
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["coupon-ticket", [
          `color-${__props.color}`,
          `size-${__props.size}`,
          { "is-disabled": __props.disabled || __props.status !== "unused" }
        ]]
      }, _attrs))} data-v-2f454c0f><div class="ticket-left" data-v-2f454c0f><div class="ticket-value" data-v-2f454c0f><span class="value-amount" data-v-2f454c0f>${ssrInterpolate(__props.value)}</span>`);
      if (__props.unit) {
        _push(`<span class="value-unit" data-v-2f454c0f>${ssrInterpolate(__props.unit)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ticket-type-label" data-v-2f454c0f>`);
      ssrRenderSlot(_ctx.$slots, "type-label", {}, () => {
        _push(`${ssrInterpolate(__props.typeLabel)}`);
      }, _push, _parent);
      _push(`</div></div><div class="ticket-right" data-v-2f454c0f><div class="right-main" data-v-2f454c0f><div class="ticket-name" data-v-2f454c0f>${ssrInterpolate(__props.title)}</div><div class="ticket-desc" data-v-2f454c0f>${ssrInterpolate(__props.desc)}</div></div><div class="ticket-footer" data-v-2f454c0f><div class="ticket-expiry" data-v-2f454c0f>`);
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
      _push(` ${ssrInterpolate(__props.expiryText)}</div><div class="ticket-action" data-v-2f454c0f>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, () => {
        if (__props.status === "unused" && !__props.disabled) {
          _push(`<button class="action-btn" data-v-2f454c0f>${ssrInterpolate(__props.actionText)}</button>`);
        } else {
          _push(`<div class="status-badge" data-v-2f454c0f>${ssrInterpolate(statusText.value)}</div>`);
        }
      }, _push, _parent);
      _push(`</div></div></div><div class="punch-hole top" data-v-2f454c0f></div><div class="punch-hole bottom" data-v-2f454c0f></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/exchange/coupon/BaseCouponTicket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseCouponTicket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f454c0f"]]);

export { BaseCouponTicket as B };
//# sourceMappingURL=BaseCouponTicket-CKW8RMPT.mjs.map
