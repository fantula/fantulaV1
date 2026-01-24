import { defineComponent, ref, computed, unref, createBlock, openBlock, mergeProps, withCtx, renderSlot, createCommentVNode, createElementVNode, normalizeClass, createTextVNode, normalizeStyle, resolveDynamicComponent, toDisplayString, createVNode } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { E as ElButton, b as buttonTypes } from './index-DR2tYDZ3.mjs';
import { B as withInstall, w as _export_sfc$1, q as buildProps, y as useLocale, x as useNamespace, T as addUnit, E as ElIcon, bj as question_filled_default, aw as iconPropType } from './server.mjs';
import { E as ElTooltip, a as useTooltipTriggerProps, u as useTooltipContentProps } from './index-CIoWkt90.mjs';

const popconfirmProps = buildProps({
  title: String,
  confirmButtonText: String,
  cancelButtonText: String,
  confirmButtonType: {
    type: String,
    values: buttonTypes,
    default: "primary"
  },
  cancelButtonType: {
    type: String,
    values: buttonTypes,
    default: "text"
  },
  icon: {
    type: iconPropType,
    default: () => question_filled_default
  },
  iconColor: {
    type: String,
    default: "#f90"
  },
  hideIcon: Boolean,
  hideAfter: {
    type: Number,
    default: 200
  },
  effect: {
    ...useTooltipContentProps.effect,
    default: "light"
  },
  teleported: useTooltipContentProps.teleported,
  persistent: useTooltipContentProps.persistent,
  width: {
    type: [String, Number],
    default: 150
  },
  virtualTriggering: useTooltipTriggerProps.virtualTriggering,
  virtualRef: useTooltipTriggerProps.virtualRef
});
const popconfirmEmits = {
  confirm: (e) => e instanceof MouseEvent,
  cancel: (e) => e instanceof MouseEvent
};
const _sfc_main = defineComponent({
  ...{
    name: "ElPopconfirm"
  },
  __name: "popconfirm",
  props: popconfirmProps,
  emits: popconfirmEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("popconfirm");
    const tooltipRef = ref();
    const rootRef = ref();
    const popperRef = computed(() => {
      var _a;
      return (_a = unref(tooltipRef)) == null ? void 0 : _a.popperRef;
    });
    const showPopper = () => {
      var _a, _b;
      (_b = (_a = rootRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    const hidePopper = () => {
      var _a, _b;
      (_b = (_a = tooltipRef.value) == null ? void 0 : _a.onClose) == null ? void 0 : _b.call(_a);
    };
    const style = computed(() => {
      return {
        width: addUnit(props.width)
      };
    });
    const confirm = (e) => {
      emit("confirm", e);
      hidePopper();
    };
    const cancel = (e) => {
      emit("cancel", e);
      hidePopper();
    };
    const finalConfirmButtonText = computed(
      () => props.confirmButtonText || t("el.popconfirm.confirmButtonText")
    );
    const finalCancelButtonText = computed(
      () => props.cancelButtonText || t("el.popconfirm.cancelButtonText")
    );
    __expose({
      popperRef,
      hide: hidePopper
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTooltip), mergeProps({
        ref_key: "tooltipRef",
        ref: tooltipRef,
        trigger: "click",
        effect: _ctx.effect
      }, _ctx.$attrs, {
        "virtual-triggering": _ctx.virtualTriggering,
        "virtual-ref": _ctx.virtualRef,
        "popper-class": `${unref(ns).namespace.value}-popover`,
        "popper-style": style.value,
        teleported: _ctx.teleported,
        "fallback-placements": ["bottom", "top", "right", "left"],
        "hide-after": _ctx.hideAfter,
        persistent: _ctx.persistent,
        loop: "",
        onShow: showPopper
      }), {
        content: withCtx(() => [
          createElementVNode(
            "div",
            {
              ref_key: "rootRef",
              ref: rootRef,
              tabindex: "-1",
              class: normalizeClass(unref(ns).b())
            },
            [
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("main"))
                },
                [
                  !_ctx.hideIcon && _ctx.icon ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 0,
                    class: normalizeClass(unref(ns).e("icon")),
                    style: normalizeStyle({ color: _ctx.iconColor })
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
                    ]),
                    _: 1
                  }, 8, ["class", "style"])) : createCommentVNode("v-if", true),
                  createTextVNode(
                    " " + toDisplayString(_ctx.title),
                    1
                  )
                ],
                2
              ),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ns).e("action"))
                },
                [
                  renderSlot(_ctx.$slots, "actions", {
                    confirm,
                    cancel
                  }, () => [
                    createVNode(unref(ElButton), {
                      size: "small",
                      type: _ctx.cancelButtonType === "text" ? "" : _ctx.cancelButtonType,
                      text: _ctx.cancelButtonType === "text",
                      onClick: cancel
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(finalCancelButtonText.value),
                          1
                        )
                      ]),
                      _: 1
                    }, 8, ["type", "text"]),
                    createVNode(unref(ElButton), {
                      size: "small",
                      type: _ctx.confirmButtonType === "text" ? "" : _ctx.confirmButtonType,
                      text: _ctx.confirmButtonType === "text",
                      onClick: confirm
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(finalConfirmButtonText.value),
                          1
                        )
                      ]),
                      _: 1
                    }, 8, ["type", "text"])
                  ])
                ],
                2
              )
            ],
            2
          )
        ]),
        default: withCtx(() => [
          _ctx.$slots.reference ? renderSlot(_ctx.$slots, "reference", { key: 0 }) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 16, ["effect", "virtual-triggering", "virtual-ref", "popper-class", "popper-style", "teleported", "hide-after", "persistent"]);
    };
  }
});
var Popconfirm = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popconfirm/src/popconfirm.vue"]]);
const ElPopconfirm = withInstall(Popconfirm);

export { ElPopconfirm as E, popconfirmProps as a, popconfirmEmits as p };
//# sourceMappingURL=index-C6eLVC7y.mjs.map
