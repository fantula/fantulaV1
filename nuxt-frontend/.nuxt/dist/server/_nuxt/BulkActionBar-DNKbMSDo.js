import { E as ElButton } from "./index-DR2tYDZ3.js";
import { _ as _export_sfc } from "../server.mjs";
/* empty css                   */
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bulk-action-bar" }, _attrs))} data-v-ec10ba1c><span class="selected-text" data-v-ec10ba1c>已选 ${ssrInterpolate(__props.count)} 项</span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(ssrRenderComponent(_component_el_button, {
            type: "danger",
            link: "",
            onClick: ($event) => _ctx.$emit("delete")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`批量删除`);
              } else {
                return [
                  createTextVNode("批量删除")
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
export {
  BulkActionBar as B
};
//# sourceMappingURL=BulkActionBar-DNKbMSDo.js.map
