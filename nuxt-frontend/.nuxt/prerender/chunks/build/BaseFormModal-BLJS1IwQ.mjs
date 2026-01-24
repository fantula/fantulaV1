import { defineComponent, mergeProps, createSlots, withCtx, createBlock, createCommentVNode, createVNode, openBlock, toDisplayString, renderSlot, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc, ad as BaseModal } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseFormModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: { default: "\u8868\u5355" },
    subtitle: {},
    width: { default: "500px" },
    cancelText: { default: "\u53D6\u6D88" },
    submitText: { default: "\u63D0\u4EA4" },
    loading: { type: Boolean, default: false },
    submitDisabled: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: true },
    themeId: { default: "suit-001" }
  },
  emits: ["close", "cancel", "submit", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleClose = () => {
      if (!props.loading) {
        emit("close");
        emit("update:visible", false);
      }
    };
    const handleSubmit = () => {
      if (!props.loading && !props.submitDisabled) {
        emit("submit");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(BaseModal, mergeProps({
        visible: __props.visible,
        title: __props.title,
        width: __props.width,
        "show-close": true,
        "show-footer": __props.showFooter,
        "cancel-text": __props.cancelText,
        "confirm-text": __props.submitText,
        loading: __props.loading,
        "confirm-disabled": __props.submitDisabled,
        "theme-id": __props.themeId,
        onClose: handleClose,
        onConfirm: handleSubmit
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.subtitle) {
              _push2(`<div class="form-subtitle" data-v-2036ccf1${_scopeId}>${ssrInterpolate(__props.subtitle)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="form-body-wrapper" data-v-2036ccf1${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              __props.subtitle ? (openBlock(), createBlock("div", {
                key: 0,
                class: "form-subtitle"
              }, toDisplayString(__props.subtitle), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "form-body-wrapper" }, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.footer ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "footer", {}, void 0, true)
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/base/BaseFormModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseFormModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2036ccf1"]]);

export { BaseFormModal as B };
//# sourceMappingURL=BaseFormModal-BLJS1IwQ.mjs.map
