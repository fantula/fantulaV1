import { E as ElDivider } from "./index-QnhSR2oe.js";
import { _ as _export_sfc } from "../server.mjs";
/* empty css                    */
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_divider = ElDivider;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-action-bar" }, _attrs))} data-v-40cdf2e6><div class="action-bar-content" data-v-40cdf2e6><div class="filters" data-v-40cdf2e6>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
  if (_ctx.$slots.default && _ctx.$slots.actions) {
    _push(ssrRenderComponent(_component_el_divider, {
      direction: "vertical",
      class: "action-divider"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="actions" data-v-40cdf2e6>`);
  ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminActionCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminActionCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-40cdf2e6"]]);
export {
  AdminActionCard as A
};
//# sourceMappingURL=AdminActionCard-Dlb_VPyP.js.map
