import { E as ElAlert } from "./index-DvOrIhmd.js";
import { _ as _export_sfc } from "../server.mjs";
/* empty css                  */
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PageTipHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    type: { default: "info" },
    showIcon: { type: Boolean, default: true },
    closable: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_alert = ElAlert;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-tip-header" }, _attrs))} data-v-b625b47a>`);
      _push(ssrRenderComponent(_component_el_alert, {
        title: __props.title,
        type: __props.type,
        "show-icon": __props.showIcon,
        closable: __props.closable,
        center: ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/PageTipHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PageTipHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b625b47a"]]);
export {
  PageTipHeader as P
};
//# sourceMappingURL=PageTipHeader-DaP_gh5N.js.map
