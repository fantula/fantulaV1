import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc, E as ElIcon, z as arrow_left_default } from './server.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StickyFormHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {},
    cancelText: { default: "\u53D6\u6D88" },
    submitText: { default: "\u4FDD\u5B58" },
    loading: { type: Boolean, default: false }
  },
  emits: ["back", "cancel", "submit"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticky-form-header" }, _attrs))} data-v-bbd080c0><div class="header-left" data-v-bbd080c0>`);
      _push(ssrRenderComponent(_component_el_button, {
        link: "",
        onClick: ($event) => _ctx.$emit("back"),
        class: "back-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "back-icon" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(arrow_left_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(arrow_left_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="header-titles" data-v-bbd080c0${_scopeId}><div class="main-title" data-v-bbd080c0${_scopeId}>${ssrInterpolate(__props.title)}</div>`);
            if (__props.subtitle) {
              _push2(`<div class="sub-title" data-v-bbd080c0${_scopeId}>${ssrInterpolate(__props.subtitle)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_el_icon, { class: "back-icon" }, {
                default: withCtx(() => [
                  createVNode(unref(arrow_left_default))
                ]),
                _: 1
              }),
              createVNode("div", { class: "header-titles" }, [
                createVNode("div", { class: "main-title" }, toDisplayString(__props.title), 1),
                __props.subtitle ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "sub-title"
                }, toDisplayString(__props.subtitle), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="header-right" data-v-bbd080c0>`);
      ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
        _push(ssrRenderComponent(_component_el_button, {
          onClick: ($event) => _ctx.$emit("cancel")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.cancelText)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.cancelText), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_el_button, {
          type: "primary",
          onClick: ($event) => _ctx.$emit("submit"),
          loading: __props.loading
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.submitText)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.submitText), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/StickyFormHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StickyFormHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbd080c0"]]);

export { StickyFormHeader as S };
//# sourceMappingURL=StickyFormHeader-BS1LLrOp.mjs.map
