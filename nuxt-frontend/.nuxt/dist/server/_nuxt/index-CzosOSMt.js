import { defineComponent, inject, computed, createElementBlock, openBlock, normalizeStyle, normalizeClass, unref, createElementVNode, createCommentVNode, renderSlot, toDisplayString, createVNode, withCtx, createBlock, resolveDynamicComponent, getCurrentInstance, ref, watch, nextTick, useSlots, provide, Transition, mergeProps, withDirectives, createSlots, vShow } from "vue";
import { u as useDraggable, E as ElOverlay, a as useSameTarget } from "./index-Dg8Z-nTr.js";
import { F as FOCUS_TRAP_INJECTION_KEY, t as teleportProps, E as ElTeleport, a as ElFocusTrap } from "./focus-trap-D_6Xxduc.js";
import { q as buildProps, aw as iconPropType, w as _export_sfc, y as useLocale, E as ElIcon, bD as CloseComponents, aD as isBoolean, D as definePropType, I as useZIndex, S as useId, av as useGlobalConfig, bE as defaultNamespace, T as addUnit, v as debugWarn, x as useNamespace, B as withInstall } from "../server.mjs";
import { c as composeRefs } from "./refs-CxYYXu5Q.js";
import { U as UPDATE_MODEL_EVENT } from "./event-BZTOGHfp.js";
import { useTimeoutFn, isClient } from "@vueuse/core";
import { u as useLockscreen } from "./index-B-o0CD59.js";
import { isObject, isArray, isFunction } from "@vue/shared";
import { u as useDeprecated } from "./index-7IYgoTSU.js";
const dialogInjectionKey = /* @__PURE__ */ Symbol("dialogInjectionKey");
const DEFAULT_DIALOG_TRANSITION = "dialog-fade";
const dialogContentProps = buildProps({
  center: Boolean,
  alignCenter: {
    type: Boolean,
    default: void 0
  },
  closeIcon: {
    type: iconPropType
  },
  draggable: {
    type: Boolean,
    default: void 0
  },
  overflow: {
    type: Boolean,
    default: void 0
  },
  fullscreen: Boolean,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const dialogContentEmits = {
  close: () => true
};
const _hoisted_1$1 = ["aria-level"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
const _sfc_main$1 = defineComponent({
  ...{ name: "ElDialogContent" },
  __name: "dialog-content",
  props: dialogContentProps,
  emits: dialogContentEmits,
  setup(__props, { expose: __expose }) {
    const { t } = useLocale();
    const { Close } = CloseComponents;
    const props = __props;
    const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
    const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
    const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
    const draggable = computed(() => !!props.draggable);
    const overflow = computed(() => !!props.overflow);
    const { resetPosition, updatePosition, isDragging } = useDraggable(
      dialogRef,
      headerRef,
      draggable,
      overflow
    );
    const dialogKls = computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("draggable", draggable.value),
      ns.is("dragging", isDragging.value),
      ns.is("align-center", !!props.alignCenter),
      { [ns.m("center")]: props.center }
    ]);
    __expose({
      resetPosition,
      updatePosition
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref: unref(composedDialogRef),
          class: normalizeClass(dialogKls.value),
          style: normalizeStyle(unref(style)),
          tabindex: "-1"
        },
        [
          createElementVNode(
            "header",
            {
              ref_key: "headerRef",
              ref: headerRef,
              class: normalizeClass([unref(ns).e("header"), _ctx.headerClass, { "show-close": _ctx.showClose }])
            },
            [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createElementVNode("span", {
                  role: "heading",
                  "aria-level": _ctx.ariaLevel,
                  class: normalizeClass(unref(ns).e("title"))
                }, toDisplayString(_ctx.title), 11, _hoisted_1$1)
              ]),
              _ctx.showClose ? (openBlock(), createElementBlock("button", {
                key: 0,
                "aria-label": unref(t)("el.dialog.close"),
                class: normalizeClass(unref(ns).e("headerbtn")),
                type: "button",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
              }, [
                createVNode(unref(ElIcon), {
                  class: normalizeClass(unref(ns).e("close"))
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon || unref(Close))))
                  ]),
                  _: 1
                }, 8, ["class"])
              ], 10, _hoisted_2)) : createCommentVNode("v-if", true)
            ],
            2
          ),
          createElementVNode("div", {
            id: unref(bodyId),
            class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_3),
          _ctx.$slots.footer ? (openBlock(), createElementBlock(
            "footer",
            {
              key: 0,
              class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
            },
            [
              renderSlot(_ctx.$slots, "footer")
            ],
            2
          )) : createCommentVNode("v-if", true)
        ],
        6
      );
    };
  }
});
var ElDialogContent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);
const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: Boolean,
  appendTo: {
    type: teleportProps.to.type,
    default: "body"
  },
  beforeClose: {
    type: definePropType(Function)
  },
  destroyOnClose: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  modalPenetrable: Boolean,
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: Boolean,
  modalClass: String,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: Boolean,
  headerAriaLevel: {
    type: String,
    default: "2"
  },
  transition: {
    type: definePropType([String, Object]),
    default: void 0
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
const COMPONENT_NAME = "ElDialog";
const useDialog = (props, targetRef) => {
  var _a;
  const instance = getCurrentInstance();
  const emit = instance.emit;
  const { nextZIndex } = useZIndex();
  let lastPosition = "";
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex = ref((_a = props.zIndex) != null ? _a : nextZIndex());
  const closing = ref(false);
  let openTimer = void 0;
  let closeTimer = void 0;
  const config = useGlobalConfig();
  const namespace = computed(() => {
    var _a2, _b;
    return (_b = (_a2 = config.value) == null ? void 0 : _a2.namespace) != null ? _b : defaultNamespace;
  });
  const globalConfig = computed(() => {
    var _a2;
    return (_a2 = config.value) == null ? void 0 : _a2.dialog;
  });
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      const width = addUnit(props.width);
      if (width) {
        style2[`${varPrefix}-width`] = width;
      }
    }
    return style2;
  });
  const _draggable = computed(
    () => {
      var _a2, _b, _c;
      return ((_c = (_b = props.draggable) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.draggable) != null ? _c : false) && !props.fullscreen;
    }
  );
  const _alignCenter = computed(
    () => {
      var _a2, _b, _c;
      return (_c = (_b = props.alignCenter) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.alignCenter) != null ? _c : false;
    }
  );
  const _overflow = computed(
    () => {
      var _a2, _b, _c;
      return (_c = (_b = props.overflow) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.overflow) != null ? _c : false;
    }
  );
  const overlayDialogStyle = computed(() => {
    if (_alignCenter.value) {
      return { display: "flex" };
    }
    return {};
  });
  const transitionConfig = computed(() => {
    var _a2, _b, _c;
    const transition = (_c = (_b = props.transition) != null ? _b : (_a2 = globalConfig.value) == null ? void 0 : _a2.transition) != null ? _c : DEFAULT_DIALOG_TRANSITION;
    const baseConfig = {
      name: transition,
      onAfterEnter: afterEnter,
      onBeforeLeave: beforeLeave,
      onAfterLeave: afterLeave
    };
    if (isObject(transition)) {
      const config2 = { ...transition };
      const _mergeHook = (userHook, defaultHook) => {
        return (el) => {
          if (isArray(userHook)) {
            userHook.forEach((fn) => {
              if (isFunction(fn))
                fn(el);
            });
          } else if (isFunction(userHook)) {
            userHook(el);
          }
          defaultHook();
        };
      };
      config2.onAfterEnter = _mergeHook(config2.onAfterEnter, afterEnter);
      config2.onBeforeLeave = _mergeHook(config2.onBeforeLeave, beforeLeave);
      config2.onAfterLeave = _mergeHook(config2.onAfterLeave, afterLeave);
      if (!config2.name) {
        config2.name = DEFAULT_DIALOG_TRANSITION;
        debugWarn(
          COMPONENT_NAME,
          `transition.name is missing when using object syntax, fallback to '${DEFAULT_DIALOG_TRANSITION}'`
        );
      }
      return config2;
    }
    return baseConfig;
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
    closing.value = false;
  }
  function beforeLeave() {
    closing.value = true;
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    } else {
      doOpen();
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel)
        return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (!isClient)
      return;
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
      event.preventDefault();
    }
  }
  if (props.lockScroll) {
    useLockscreen(visible);
  }
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  watch(
    () => props.zIndex,
    () => {
      var _a2;
      zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
    }
  );
  watch(
    () => props.modelValue,
    (val) => {
      var _a2;
      if (val) {
        closed.value = false;
        closing.value = false;
        open();
        rendered.value = true;
        zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
        nextTick(() => {
          emit("open");
          if (targetRef.value) {
            targetRef.value.parentElement.scrollTop = 0;
            targetRef.value.parentElement.scrollLeft = 0;
            targetRef.value.scrollTop = 0;
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    }
  );
  watch(
    () => props.fullscreen,
    (val) => {
      if (!targetRef.value)
        return;
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = "";
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    }
  );
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
    transitionConfig,
    _draggable,
    _alignCenter,
    _overflow,
    closing
  };
};
const _hoisted_1 = ["aria-label", "aria-labelledby", "aria-describedby"];
const _sfc_main = defineComponent({
  ...{
    name: "ElDialog",
    inheritAttrs: false
  },
  __name: "dialog",
  props: dialogProps,
  emits: dialogEmits,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated(
      {
        scope: "el-dialog",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#slots"
      },
      computed(() => !!slots.title)
    );
    const ns = useNamespace("dialog");
    const dialogRef = ref();
    const headerRef = ref();
    const dialogContentRef = ref();
    const {
      visible,
      titleId,
      bodyId,
      style,
      overlayDialogStyle,
      rendered,
      transitionConfig,
      zIndex,
      _draggable,
      _alignCenter,
      _overflow,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      closing
    } = useDialog(props, dialogRef);
    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style
    });
    const overlayEvent = useSameTarget(onModalClick);
    const penetrable = computed(
      () => props.modalPenetrable && !props.modal && !props.fullscreen
    );
    const resetPosition = () => {
      var _a;
      (_a = dialogContentRef.value) == null ? void 0 : _a.resetPosition();
    };
    __expose({
      visible,
      dialogContentRef,
      resetPosition,
      handleClose
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        to: _ctx.appendTo,
        disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
      }, {
        default: withCtx(() => [
          createVNode(
            Transition,
            mergeProps(unref(transitionConfig), { persisted: "" }),
            {
              default: withCtx(() => {
                var _a;
                return [
                  withDirectives(createVNode(unref(ElOverlay), {
                    "custom-mask-event": "",
                    mask: _ctx.modal,
                    "overlay-class": [
                      (_a = _ctx.modalClass) != null ? _a : "",
                      `${unref(ns).namespace.value}-modal-dialog`,
                      unref(ns).is("penetrable", penetrable.value)
                    ],
                    "z-index": unref(zIndex)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", {
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": _ctx.title || void 0,
                        "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                        "aria-describedby": unref(bodyId),
                        class: normalizeClass([
                          `${unref(ns).namespace.value}-overlay-dialog`,
                          unref(ns).is("closing", unref(closing))
                        ]),
                        style: normalizeStyle(unref(overlayDialogStyle)),
                        onClick: _cache[0] || (_cache[0] = (...args) => unref(overlayEvent).onClick && unref(overlayEvent).onClick(...args)),
                        onMousedown: _cache[1] || (_cache[1] = (...args) => unref(overlayEvent).onMousedown && unref(overlayEvent).onMousedown(...args)),
                        onMouseup: _cache[2] || (_cache[2] = (...args) => unref(overlayEvent).onMouseup && unref(overlayEvent).onMouseup(...args))
                      }, [
                        createVNode(unref(ElFocusTrap), {
                          loop: "",
                          trapped: unref(visible),
                          "focus-start-el": "container",
                          onFocusAfterTrapped: unref(onOpenAutoFocus),
                          onFocusAfterReleased: unref(onCloseAutoFocus),
                          onFocusoutPrevented: unref(onFocusoutPrevented),
                          onReleaseRequested: unref(onCloseRequested)
                        }, {
                          default: withCtx(() => [
                            unref(rendered) ? (openBlock(), createBlock(ElDialogContent, mergeProps({
                              key: 0,
                              ref_key: "dialogContentRef",
                              ref: dialogContentRef
                            }, _ctx.$attrs, {
                              center: _ctx.center,
                              "align-center": unref(_alignCenter),
                              "close-icon": _ctx.closeIcon,
                              draggable: unref(_draggable),
                              overflow: unref(_overflow),
                              fullscreen: _ctx.fullscreen,
                              "header-class": _ctx.headerClass,
                              "body-class": _ctx.bodyClass,
                              "footer-class": _ctx.footerClass,
                              "show-close": _ctx.showClose,
                              title: _ctx.title,
                              "aria-level": _ctx.headerAriaLevel,
                              onClose: unref(handleClose)
                            }), createSlots({
                              header: withCtx(() => [
                                !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                                  key: 0,
                                  close: unref(handleClose),
                                  titleId: unref(titleId),
                                  titleClass: unref(ns).e("title")
                                }) : renderSlot(_ctx.$slots, "title", { key: 1 })
                              ]),
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "default")
                              ]),
                              _: 2
                            }, [
                              _ctx.$slots.footer ? {
                                name: "footer",
                                fn: withCtx(() => [
                                  renderSlot(_ctx.$slots, "footer")
                                ]),
                                key: "0"
                              } : void 0
                            ]), 1040, ["center", "align-center", "close-icon", "draggable", "overflow", "fullscreen", "header-class", "body-class", "footer-class", "show-close", "title", "aria-level", "onClose"])) : createCommentVNode("v-if", true)
                          ]),
                          _: 3
                        }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                      ], 46, _hoisted_1)
                    ]),
                    _: 3
                  }, 8, ["mask", "overlay-class", "z-index"]), [
                    [vShow, unref(visible)]
                  ])
                ];
              }),
              _: 3
            },
            16
          )
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);
const ElDialog = withInstall(Dialog);
export {
  DEFAULT_DIALOG_TRANSITION as D,
  ElDialog as E,
  dialogProps as a,
  dialogInjectionKey as b,
  dialogEmits as d,
  useDialog as u
};
//# sourceMappingURL=index-CzosOSMt.js.map
