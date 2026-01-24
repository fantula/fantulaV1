import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BulkActionBar",
  __ssrInlineRender: true,
  props: {
    count: {}
  },
  emits: ["delete"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      if (__props.count > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bulk-action-bar" }, _attrs))} data-v-ec10ba1c><span class="selected-text" data-v-ec10ba1c>\u5DF2\u9009 ${ssrInterpolate(__props.count)} \u9879</span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(ssrRenderComponent(_component_el_button, {
            type: "danger",
            link: "",
            onClick: ($event) => _ctx.$emit("delete")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`\u6279\u91CF\u5220\u9664`);
              } else {
                return [
                  createTextVNode("\u6279\u91CF\u5220\u9664")
                ];
              }
            }),
            _: 1
          }, _parent));
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/BulkActionBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BulkActionBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ec10ba1c"]]);

export { BulkActionBar as B };
//# sourceMappingURL=BulkActionBar-DNKbMSDo.mjs.map
