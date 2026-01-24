import { E as ElDialog } from './index-CzosOSMt.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc } from './server.mjs';
import { defineComponent, mergeProps, createSlots, withCtx, withDirectives, createBlock, openBlock, renderSlot, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { v as vLoading } from './directive-tOiqatq5.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminDataDialog",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    title: {},
    width: { default: "500px" },
    loading: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: true },
    confirmText: { default: "\u786E\u8BA4" },
    cancelText: { default: "\u53D6\u6D88" }
  },
  emits: ["update:modelValue", "confirm", "cancel", "closed"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleCancel = () => {
      emit("cancel");
      emit("update:modelValue", false);
    };
    const handleConfirm = () => {
      emit("confirm");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_dialog = ElDialog;
      const _component_el_button = ElButton;
      const _directive_loading = vLoading;
      _push(ssrRenderComponent(_component_el_dialog, mergeProps({
        "model-value": __props.modelValue,
        title: __props.title,
        width: __props.width,
        "close-on-click-modal": false,
        "destroy-on-close": "",
        class: "admin-data-dialog",
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:modelValue", $event),
        onClosed: ($event) => _ctx.$emit("closed")
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "dialog-content" }, ssrGetDirectiveProps(_ctx, _directive_loading, __props.loading && !__props.showFooter)))} data-v-5124b87a${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "dialog-content" }, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])), [
                [_directive_loading, __props.loading && !__props.showFooter]
              ])
            ];
          }
        }),
        _: 2
      }, [
        __props.showFooter ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="dialog-footer" data-v-5124b87a${_scopeId}>`);
              _push2(ssrRenderComponent(_component_el_button, { onClick: handleCancel }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.cancelText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.cancelText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: handleConfirm,
                loading: __props.loading
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.confirmText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.confirmText), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              return [
                createVNode("span", { class: "dialog-footer" }, [
                  createVNode(_component_el_button, { onClick: handleCancel }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.cancelText), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: handleConfirm,
                    loading: __props.loading
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.confirmText), 1)
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/AdminDataDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminDataDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5124b87a"]]);

export { AdminDataDialog as A };
//# sourceMappingURL=AdminDataDialog-9iEmWGfo.mjs.map
