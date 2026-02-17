import { E as ElImage } from './index-BSYGfCfY.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductThumbCell",
  __ssrInlineRender: true,
  props: {
    image: {},
    name: {},
    id: {},
    truncateId: { type: Boolean, default: true },
    errorText: { default: "\u65E0\u56FE" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-thumb-cell" }, _attrs))} data-v-e504abaa>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: __props.image,
        class: "thumb",
        fit: "cover"
      }, {
        error: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="no-img" data-v-e504abaa${_scopeId}>${ssrInterpolate(__props.errorText)}</div>`);
          } else {
            return [
              createVNode("div", { class: "no-img" }, toDisplayString(__props.errorText), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="info" data-v-e504abaa><div class="name"${ssrRenderAttr("title", __props.name)} data-v-e504abaa>${ssrInterpolate(__props.name)}</div>`);
      if (__props.id) {
        _push(`<div class="id" data-v-e504abaa>ID: ${ssrInterpolate(__props.truncateId ? __props.id.slice(0, 8) + "..." : __props.id)}</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/ProductThumbCell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductThumbCell = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e504abaa"]]);

export { ProductThumbCell as P };
//# sourceMappingURL=ProductThumbCell-DjG8-c-D.mjs.map
