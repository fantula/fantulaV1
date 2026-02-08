import { E as ElIcon } from "./index-jl2vZbkg.js";
/* empty css              */
import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { g as arrow_left_default } from "./index-DlETah8a.js";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MobileSubPageHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    backPath: {}
  },
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-sub-page-header-wrapper" }, _attrs))} data-v-691a0585><div class="header-spacer" data-v-691a0585></div><div class="mobile-sub-page-header" data-v-691a0585><div class="back-btn" data-v-691a0585>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><h1 class="page-title" data-v-691a0585>${ssrInterpolate(__props.title)}</h1><div class="header-right" data-v-691a0585>`);
      ssrRenderSlot(_ctx.$slots, "right", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/layout/MobileSubPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MobileSubPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-691a0585"]]);
export {
  MobileSubPageHeader as M
};
//# sourceMappingURL=MobileSubPageHeader-yXUwt-_q.js.map
