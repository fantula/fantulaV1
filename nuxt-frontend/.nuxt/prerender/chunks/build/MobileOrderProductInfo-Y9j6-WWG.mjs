import { E as ElIcon } from './index-C4aUwruK.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { L as copy_document_default } from './index-CCIZH4aC.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileOrderProductInfo",
  __ssrInlineRender: true,
  props: {
    order: {},
    compact: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["info-card-glass", { compact: __props.compact }]
      }, _attrs))} data-v-073efecd><div class="card-header-row" data-v-073efecd><div class="order-no-wrap" data-v-073efecd><span class="label" data-v-073efecd>\u8BA2\u5355\u53F7</span><span class="val" data-v-073efecd>${ssrInterpolate(__props.order.order_no)}</span>`);
      _push(ssrRenderComponent(_component_el_icon, { class: "copy-icon" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(copy_document_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(copy_document_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="prod-row" data-v-073efecd><div class="prod-thumb" data-v-073efecd><img${ssrRenderAttr("src", __props.order.productImage || "/images/placeholder.png")} class="prod-img" loading="lazy" data-v-073efecd></div><div class="prod-info" data-v-073efecd><div class="info-main" data-v-073efecd><div class="prod-name" data-v-073efecd>${ssrInterpolate(__props.order.productName)}</div>`);
      if (__props.order.skuSpec) {
        _push(`<div class="spec-row" data-v-073efecd><span class="spec-tag" data-v-073efecd>${ssrInterpolate(__props.order.skuSpec)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="prod-foot" data-v-073efecd><div class="qty-tag" data-v-073efecd>x${ssrInterpolate(__props.order.quantity)}</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/order/MobileOrderProductInfo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileOrderProductInfo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-073efecd"]]);

export { MobileOrderProductInfo as M };
//# sourceMappingURL=MobileOrderProductInfo-Y9j6-WWG.mjs.map
