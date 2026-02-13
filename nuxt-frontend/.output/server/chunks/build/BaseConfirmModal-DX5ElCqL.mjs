import { defineComponent, computed, mergeProps, withCtx, createVNode, renderSlot, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './BaseModal-nbvk9VuE.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseConfirmModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    title: { default: "\u786E\u8BA4" },
    message: { default: "\u786E\u5B9A\u8981\u6267\u884C\u6B64\u64CD\u4F5C\u5417\uFF1F" },
    cancelText: { default: "\u53D6\u6D88" },
    confirmText: { default: "\u786E\u5B9A" },
    type: { default: "default" },
    loading: { type: Boolean, default: false },
    themeId: { default: "suit-001" }
  },
  emits: ["close", "cancel", "confirm", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const confirmBtnClass = computed(() => ({
      "btn-primary": props.type === "default",
      "btn-warning": props.type === "warning",
      "btn-danger": props.type === "danger"
    }));
    const handleClose = () => {
      if (!props.loading) {
        emit("close");
        emit("update:visible", false);
      }
    };
    const handleCancel = () => {
      if (!props.loading) {
        emit("cancel");
        handleClose();
      }
    };
    const handleConfirm = () => {
      emit("confirm");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(__nuxt_component_0, mergeProps({
        visible: __props.visible,
        title: __props.title,
        width: "500px",
        "confirm-text": __props.confirmText,
        "cancel-text": __props.cancelText,
        loading: __props.loading,
        "confirm-disabled": __props.loading,
        "theme-id": __props.themeId,
        onClose: handleClose,
        onConfirm: handleConfirm
      }, _attrs), {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="confirm-actions" data-v-d636df0e${_scopeId}><button class="btn btn-secondary"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-d636df0e${_scopeId}>${ssrInterpolate(__props.cancelText)}</button><button class="${ssrRenderClass([confirmBtnClass.value, "btn"])}"${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} data-v-d636df0e${_scopeId}>`);
            if (__props.loading) {
              _push2(`<span class="btn-loading" data-v-d636df0e${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(__props.confirmText)}</button></div>`);
          } else {
            return [
              createVNode("div", { class: "confirm-actions" }, [
                createVNode("button", {
                  class: "btn btn-secondary",
                  onClick: handleCancel,
                  disabled: __props.loading
                }, toDisplayString(__props.cancelText), 9, ["disabled"]),
                createVNode("button", {
                  class: ["btn", confirmBtnClass.value],
                  onClick: handleConfirm,
                  disabled: __props.loading
                }, [
                  __props.loading ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "btn-loading"
                  })) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(__props.confirmText), 1)
                ], 10, ["disabled"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="confirm-content" data-v-d636df0e${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`<p class="confirm-message" data-v-d636df0e${_scopeId}>${ssrInterpolate(__props.message)}</p>`);
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "confirm-content" }, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createVNode("p", { class: "confirm-message" }, toDisplayString(__props.message), 1)
                ], true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/base/BaseConfirmModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseConfirmModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d636df0e"]]);

export { BaseConfirmModal as B };
//# sourceMappingURL=BaseConfirmModal-DX5ElCqL.mjs.map
