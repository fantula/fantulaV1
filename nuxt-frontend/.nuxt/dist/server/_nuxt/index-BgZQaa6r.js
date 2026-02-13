import { b as buildProps, P as question_filled_default, w as withInstall } from "./index-DuV_oMrC.js";
import { b as buttonTypes, E as ElButton } from "./index-DV2Xa1Kj.js";
import { a as useTooltipTriggerProps, u as useTooltipContentProps, E as ElTooltip } from "./index-B8mpCVSS.js";
import { i as iconPropType } from "./icon-CyvpkMdQ.js";
import { defineComponent, ref, computed, unref, openBlock, createBlock, mergeProps, withCtx, renderSlot, createCommentVNode, createElementVNode, normalizeClass, normalizeStyle, resolveDynamicComponent, createTextVNode, toDisplayString, createVNode } from "vue";
import { a as addUnit, E as ElIcon } from "./index-CsSUb8pm.js";
import { b as useLocale } from "./index-xMedQC9S.js";
import { g as useNamespace } from "../server.mjs";
const popconfirmProps = buildProps({
  /**
   * @description Title
   */
  title: String,
  /**
   * @description Confirm button text
   */
  confirmButtonText: String,
  /**
   * @description Cancel button text
   */
  cancelButtonText: String,
  /**
   * @description Confirm button type
   */
  confirmButtonType: {
    type: String,
    values: buttonTypes,
    default: "primary"
  },
  /**
   * @description Cancel button type
   */
  cancelButtonType: {
    type: String,
    values: buttonTypes,
    default: "text"
  },
  /**
   * @description Icon Component
   */
  icon: {
    type: iconPropType,
    default: () => question_filled_default
  },
  /**
   * @description Icon color
   */
  iconColor: {
    type: String,
    default: "#f90"
  },
  /**
   * @description is hide Icon
   */
  hideIcon: Boolean,
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200
  },
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    ...useTooltipContentProps.effect,
    default: "light"
  },
  /**
   * @description whether popconfirm is teleported to the body
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: useTooltipContentProps.persistent,
  /**
   * @description popconfirm width, min width 150px
   */
  width: {
    type: [String, Number],
    default: 150
  },
  virtualTriggering: useTooltipTriggerProps.virtualTriggering,
  virtualRef: useTooltipTriggerProps.virtualRef
});
const popconfirmEmits = {
  /**
   * @description triggers when click confirm button
   */
  confirm: (e) => e instanceof MouseEvent,
  /**
   * @description triggers when click cancel button
   */
  cancel: (e) => e instanceof MouseEvent
};
var _sfc_main = /* @__PURE__ */ defineComponent({
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
        effect: __props.effect
      }, _ctx.$attrs, {
        "virtual-triggering": __props.virtualTriggering,
        "virtual-ref": __props.virtualRef,
        "popper-class": `${unref(ns).namespace.value}-popover`,
        "popper-style": style.value,
        teleported: __props.teleported,
        "fallback-placements": ["bottom", "top", "right", "left"],
        "hide-after": __props.hideAfter,
        persistent: __props.persistent,
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
                  !__props.hideIcon && __props.icon ? (openBlock(), createBlock(unref(ElIcon), {
                    key: 0,
                    class: normalizeClass(unref(ns).e("icon")),
                    style: normalizeStyle({ color: __props.iconColor })
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class", "style"])) : createCommentVNode("v-if", true),
                  createTextVNode(
                    " " + toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
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
                      type: __props.cancelButtonType === "text" ? "" : __props.cancelButtonType,
                      text: __props.cancelButtonType === "text",
                      onClick: cancel
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(finalCancelButtonText.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["type", "text"]),
                    createVNode(unref(ElButton), {
                      size: "small",
                      type: __props.confirmButtonType === "text" ? "" : __props.confirmButtonType,
                      text: __props.confirmButtonType === "text",
                      onClick: confirm
                    }, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(finalConfirmButtonText.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["type", "text"])
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ]),
        default: withCtx(() => [
          _ctx.$slots.reference ? renderSlot(_ctx.$slots, "reference", { key: 0 }) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["effect", "virtual-triggering", "virtual-ref", "popper-class", "popper-style", "teleported", "hide-after", "persistent"]);
    };
  }
});
const ElPopconfirm = withInstall(_sfc_main);
export {
  ElPopconfirm as E,
  popconfirmProps as a,
  popconfirmEmits as p
};
//# sourceMappingURL=index-BgZQaa6r.js.map
