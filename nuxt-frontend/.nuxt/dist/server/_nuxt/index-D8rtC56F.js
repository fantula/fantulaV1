import { defineComponent, createBlock, openBlock, Transition, mergeProps, unref, toHandlers, withCtx, renderSlot, useSlots, computed, createElementBlock, normalizeClass, normalizeStyle, ref, provide, inject, toRef, readonly, watch, nextTick, resolveComponent, createVNode, normalizeProps, guardReactiveProps, createCommentVNode, createSlots, getCurrentInstance, Fragment, createElementVNode, withModifiers, resolveDynamicComponent, reactive, h, withDirectives, vShow, watchEffect, createTextVNode, toDisplayString } from "vue";
import { w as _export_sfc, x as useNamespace, B as withInstall, q as buildProps, C as withNoopInstall, D as definePropType, V as getEventCode, aH as composeEventHandlers, aw as iconPropType, W as EVENT_CODE, aZ as arrow_down_default, E as ElIcon, y as useLocale, T as addUnit, S as useId, bq as whenMouse, Z as addClass, Y as hasClass, aM as removeClass, X as throwError, f as arrow_right_default, A as isUndefined, br as more_default, F as mutable, bs as isPropAbsent, v as debugWarn } from "../server.mjs";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { u as useTooltipContentProps, r as roleTypes, a as useTooltipTriggerProps, O as OnlyChild, E as ElTooltip } from "./index-B9I5bL_Z.js";
import { E as ElScrollbar } from "./index-D_b573Qt.js";
import { useEventListener, useTimeoutFn, useResizeObserver, unrefElement } from "@vueuse/core";
import { castArray, isNil } from "lodash-unified";
import { a as useFormSize } from "./use-form-common-props-DlCG9pC5.js";
import { c as composeRefs } from "./refs-CxYYXu5Q.js";
import { TinyColor } from "@ctrl/tinycolor";
import { isString, isArray, isObject } from "@vue/shared";
import { f as focusElement } from "./aria-B8G3G_75.js";
import { C as ClickOutside } from "./index-DCrMmn3b.js";
import { f as flattedChildren } from "./vnode-D0IHQw_9.js";
const _sfc_main$h = defineComponent({
  ...{
    name: "ElCollapseTransition"
  },
  __name: "collapse-transition",
  setup(__props) {
    const ns = useNamespace("collapse-transition");
    const reset = (el) => {
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    const on = {
      beforeEnter(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height)
          el.dataset.elExistsHeight = el.style.height;
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) {
            el.style.maxHeight = el.dataset.elExistsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        });
      },
      afterEnter(el) {
        el.style.maxHeight = "";
        el.style.overflow = el.dataset.oldOverflow;
      },
      enterCancelled(el) {
        reset(el);
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },
      afterLeave(el) {
        reset(el);
      },
      leaveCancelled(el) {
        reset(el);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({
        name: unref(ns).b()
      }, toHandlers(on)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["name"]);
    };
  }
});
var CollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue"]]);
const ElCollapseTransition = withInstall(CollapseTransition);
const _sfc_main$g = defineComponent({
  ...{
    name: "ElContainer"
  },
  __name: "container",
  props: buildProps({
    direction: {
      type: String,
      values: ["horizontal", "vertical"]
    }
  }),
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "section",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", isVertical.value)])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var Container = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue"]]);
const _sfc_main$f = defineComponent({
  ...{
    name: "ElAside"
  },
  __name: "aside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("aside");
    const style = computed(
      () => props.width ? ns.cssVarBlock({ width: props.width }) : {}
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "aside",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
      );
    };
  }
});
var Aside = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue"]]);
const _sfc_main$e = defineComponent({
  ...{
    name: "ElFooter"
  },
  __name: "footer",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("footer");
    const style = computed(
      () => props.height ? ns.cssVarBlock({ height: props.height }) : {}
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "footer",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
      );
    };
  }
});
var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue"]]);
const _sfc_main$d = defineComponent({
  ...{
    name: "ElHeader"
  },
  __name: "header",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("header");
    const style = computed(() => {
      return props.height ? ns.cssVarBlock({
        height: props.height
      }) : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "header",
        {
          class: normalizeClass(unref(ns).b()),
          style: normalizeStyle(style.value)
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        6
      );
    };
  }
});
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue"]]);
const _sfc_main$c = defineComponent({
  ...{
    name: "ElMain"
  },
  __name: "main",
  setup(__props) {
    const ns = useNamespace("main");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "main",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
      );
    };
  }
});
var Main = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue"]]);
const ElContainer = withInstall(Container, {
  Aside,
  Footer,
  Header,
  Main
});
const ElAside = withNoopInstall(Aside);
withNoopInstall(Footer);
const ElHeader = withNoopInstall(Header);
const ElMain = withNoopInstall(Main);
const _sfc_main$b = defineComponent({
  inheritAttrs: false
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var Collection = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$8], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);
const _sfc_main$a = defineComponent({
  name: "ElCollectionItem",
  inheritAttrs: false
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var CollectionItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$7], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);
const COLLECTION_ITEM_SIGN = `data-el-collection-item`;
const createCollectionWithScope = (name) => {
  const COLLECTION_NAME = `El${name}Collection`;
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`;
  const COLLECTION_INJECTION_KEY2 = Symbol(COLLECTION_NAME);
  const COLLECTION_ITEM_INJECTION_KEY2 = Symbol(COLLECTION_ITEM_NAME);
  const ElCollection2 = Object.assign({}, Collection, {
    name: COLLECTION_NAME,
    setup() {
      const collectionRef = ref();
      const itemMap = /* @__PURE__ */ new Map();
      const getItems = () => {
        const collectionEl = unref(collectionRef);
        if (!collectionEl)
          return [];
        const orderedNodes = Array.from(
          collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`)
        );
        const items = [...itemMap.values()];
        return items.sort(
          (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
        );
      };
      provide(COLLECTION_INJECTION_KEY2, {
        itemMap,
        getItems,
        collectionRef
      });
    }
  });
  const ElCollectionItem2 = Object.assign({}, CollectionItem, {
    name: COLLECTION_ITEM_NAME,
    setup(_, { attrs }) {
      const collectionItemRef = ref();
      inject(COLLECTION_INJECTION_KEY2, void 0);
      provide(COLLECTION_ITEM_INJECTION_KEY2, {
        collectionItemRef
      });
    }
  });
  return {
    COLLECTION_INJECTION_KEY: COLLECTION_INJECTION_KEY2,
    COLLECTION_ITEM_INJECTION_KEY: COLLECTION_ITEM_INJECTION_KEY2,
    ElCollection: ElCollection2,
    ElCollectionItem: ElCollectionItem2
  };
};
const rovingFocusGroupProps = buildProps({
  style: { type: definePropType([String, Array, Object]) },
  currentTabId: {
    type: definePropType(String)
  },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String,
    values: ["ltr", "rtl"],
    default: "ltr"
  },
  orientation: {
    type: definePropType(String)
  },
  onBlur: Function,
  onFocus: Function,
  onMousedown: Function
});
const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY
} = createCollectionWithScope("RovingFocusGroup");
const ROVING_FOCUS_GROUP_INJECTION_KEY = /* @__PURE__ */ Symbol("elRovingFocusGroup");
const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY = /* @__PURE__ */ Symbol("elRovingFocusGroupItem");
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
const getDirectionAwareKey = (key, dir) => {
  return key;
};
const getFocusIntent = (event, orientation, dir) => {
  const code = getEventCode(event);
  const key = getDirectionAwareKey(code);
  return MAP_KEY_TO_FOCUS_INTENT[key];
};
const reorderArray = (array, atIdx) => {
  return array.map((_, idx) => array[(idx + atIdx) % array.length]);
};
const focusFirst = (elements) => {
  const { activeElement: prevActive } = void 0;
  for (const element of elements) {
    if (element === prevActive)
      return;
    element.focus();
    if (prevActive !== (void 0).activeElement)
      return;
  }
};
const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = { bubbles: false, cancelable: true };
const _sfc_main$9 = defineComponent({
  name: "ElRovingFocusGroupImpl",
  inheritAttrs: false,
  props: rovingFocusGroupProps,
  emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
  setup(props, { emit }) {
    var _a;
    const currentTabbedId = ref(
      (_a = props.currentTabId || props.defaultCurrentTabId) != null ? _a : null
    );
    const isBackingOut = ref(false);
    const isClickFocus = ref(false);
    const rovingFocusGroupRef = ref();
    const { getItems } = inject(
      COLLECTION_INJECTION_KEY,
      void 0
    );
    const rovingFocusGroupRootStyle = computed(() => {
      return [
        {
          outline: "none"
        },
        props.style
      ];
    });
    const onItemFocus = (tabbedId) => {
      emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
    };
    const onItemShiftTab = () => {
      isBackingOut.value = true;
    };
    const onMousedown = composeEventHandlers(
      (e) => {
        var _a2;
        (_a2 = props.onMousedown) == null ? void 0 : _a2.call(props, e);
      },
      () => {
        isClickFocus.value = true;
      }
    );
    const onFocus = composeEventHandlers(
      (e) => {
        var _a2;
        (_a2 = props.onFocus) == null ? void 0 : _a2.call(props, e);
      },
      (e) => {
        const isKeyboardFocus = !unref(isClickFocus);
        const { target, currentTarget } = e;
        if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
          const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
          currentTarget == null ? void 0 : currentTarget.dispatchEvent(entryFocusEvt);
          if (!entryFocusEvt.defaultPrevented) {
            const items = getItems().filter((item) => item.focusable);
            const activeItem = items.find((item) => item.active);
            const currentItem = items.find(
              (item) => item.id === unref(currentTabbedId)
            );
            const candidates = [activeItem, currentItem, ...items].filter(
              Boolean
            );
            const candidateNodes = candidates.map((item) => item.ref);
            focusFirst(candidateNodes);
          }
        }
        isClickFocus.value = false;
      }
    );
    const onBlur = composeEventHandlers(
      (e) => {
        var _a2;
        (_a2 = props.onBlur) == null ? void 0 : _a2.call(props, e);
      },
      () => {
        isBackingOut.value = false;
      }
    );
    const handleEntryFocus = (...args) => {
      emit("entryFocus", ...args);
    };
    const onKeydown = (e) => {
      const focusIntent = getFocusIntent(e);
      if (focusIntent) {
        e.preventDefault();
        const items = getItems().filter((item) => item.focusable);
        let elements = items.map((item) => item.ref);
        switch (focusIntent) {
          case "last": {
            elements.reverse();
            break;
          }
          case "prev":
          case "next": {
            if (focusIntent === "prev") {
              elements.reverse();
            }
            const currentIdx = elements.indexOf(e.currentTarget);
            elements = props.loop ? reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
            break;
          }
        }
        nextTick(() => {
          focusFirst(elements);
        });
      }
    };
    provide(ROVING_FOCUS_GROUP_INJECTION_KEY, {
      currentTabbedId: readonly(currentTabbedId),
      loop: toRef(props, "loop"),
      tabIndex: computed(() => {
        return unref(isBackingOut) ? -1 : 0;
      }),
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      orientation: toRef(props, "orientation"),
      dir: toRef(props, "dir"),
      onItemFocus,
      onItemShiftTab,
      onBlur,
      onFocus,
      onMousedown,
      onKeydown
    });
    watch(
      () => props.currentTabId,
      (val) => {
        currentTabbedId.value = val != null ? val : null;
      }
    );
    useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var ElRovingFocusGroupImpl = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$6], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]]);
const _sfc_main$8 = defineComponent({
  name: "ElRovingFocusGroup",
  components: {
    ElFocusGroupCollection: ElCollection,
    ElRovingFocusGroupImpl
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group_impl = resolveComponent("el-roving-focus-group-impl");
  const _component_el_focus_group_collection = resolveComponent("el-focus-group-collection");
  return openBlock(), createBlock(_component_el_focus_group_collection, null, {
    default: withCtx(() => [
      createVNode(
        _component_el_roving_focus_group_impl,
        normalizeProps(guardReactiveProps(_ctx.$attrs)),
        {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        },
        16
      )
    ]),
    _: 3
  });
}
var ElRovingFocusGroup = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$5], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);
const dropdownProps = buildProps({
  trigger: {
    ...useTooltipTriggerProps.trigger,
    type: definePropType([
      String,
      Array
    ])
  },
  triggerKeys: {
    type: definePropType(Array),
    default: () => [
      EVENT_CODE.enter,
      EVENT_CODE.numpadEnter,
      EVENT_CODE.space,
      EVENT_CODE.down
    ]
  },
  virtualTriggering: useTooltipTriggerProps.virtualTriggering,
  virtualRef: useTooltipTriggerProps.virtualRef,
  effect: {
    ...useTooltipContentProps.effect,
    default: "light"
  },
  type: {
    type: definePropType(String)
  },
  placement: {
    type: definePropType(String),
    default: "bottom"
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: definePropType([Number, String]),
    default: 0
  },
  maxHeight: {
    type: definePropType([Number, String]),
    default: ""
  },
  popperClass: useTooltipContentProps.popperClass,
  popperStyle: useTooltipContentProps.popperStyle,
  disabled: Boolean,
  role: {
    type: String,
    values: roleTypes,
    default: "menu"
  },
  buttonProps: {
    type: definePropType(Object)
  },
  teleported: useTooltipContentProps.teleported,
  appendTo: useTooltipContentProps.appendTo,
  persistent: {
    type: Boolean,
    default: true
  }
});
const dropdownItemProps = buildProps({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: iconPropType
  }
});
const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType(Function) }
});
const DROPDOWN_INJECTION_KEY = /* @__PURE__ */ Symbol("elDropdown");
const DROPDOWN_INSTANCE_INJECTION_KEY = "elDropdown";
const { ButtonGroup: ElButtonGroup } = ElButton;
const _sfc_main$7 = defineComponent({
  name: "ElDropdown",
  components: {
    ElButton,
    ElButtonGroup,
    ElScrollbar,
    ElTooltip,
    ElRovingFocusGroup,
    ElOnlyChild: OnlyChild,
    ElIcon,
    ArrowDown: arrow_down_default
  },
  props: dropdownProps,
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const ns = useNamespace("dropdown");
    const { t } = useLocale();
    const triggeringElementRef = ref();
    const referenceElementRef = ref();
    const popperRef = ref();
    const contentRef = ref();
    const scrollbar = ref(null);
    const currentTabId = ref(null);
    const isUsingKeyboard = ref(false);
    const wrapStyle = computed(() => ({
      maxHeight: addUnit(props.maxHeight)
    }));
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);
    const trigger = computed(() => castArray(props.trigger));
    const defaultTriggerId = useId().value;
    const triggerId = computed(() => props.id || defaultTriggerId);
    function handleClick() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose(void 0, 0);
    }
    function handleClose() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose();
    }
    function handleOpen() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onOpen();
    }
    const dropdownSize = useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = unref(contentRef);
      trigger.value.includes("hover") && (contentEl == null ? void 0 : contentEl.focus({
        preventScroll: true
      }));
      currentTabId.value = null;
    }
    function handleCurrentTabIdChange(id) {
      currentTabId.value = id;
    }
    function handleBeforeShowTooltip() {
      emit("visible-change", true);
    }
    function handleShowTooltip(event) {
      var _a;
      isUsingKeyboard.value = (event == null ? void 0 : event.type) === "keydown";
      (_a = contentRef.value) == null ? void 0 : _a.focus();
    }
    function handleBeforeHideTooltip() {
      emit("visible-change", false);
    }
    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave,
      handleClose
    });
    provide(DROPDOWN_INSTANCE_INJECTION_KEY, {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, "trigger"),
      hideOnClick: toRef(props, "hideOnClick")
    });
    const handlerMainButtonClick = (event) => {
      emit("click", event);
    };
    return {
      t,
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      triggerId,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleClose,
      handleOpen,
      handleBeforeShowTooltip,
      handleShowTooltip,
      handleBeforeHideTooltip,
      popperRef,
      contentRef,
      triggeringElementRef,
      referenceElementRef
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_roving_focus_group = resolveComponent("el-roving-focus-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_only_child = resolveComponent("el-only-child");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_button = resolveComponent("el-button");
  const _component_arrow_down = resolveComponent("arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button_group = resolveComponent("el-button-group");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass([_ctx.ns.b(), _ctx.ns.is("disabled", _ctx.disabled)])
    },
    [
      createVNode(_component_el_tooltip, {
        ref: "popperRef",
        role: _ctx.role,
        effect: _ctx.effect,
        "fallback-placements": ["bottom", "top"],
        "popper-options": _ctx.popperOptions,
        "gpu-acceleration": false,
        placement: _ctx.placement,
        "popper-class": [_ctx.ns.e("popper"), _ctx.popperClass],
        "popper-style": _ctx.popperStyle,
        trigger: _ctx.trigger,
        "trigger-keys": _ctx.triggerKeys,
        "trigger-target-el": _ctx.contentRef,
        "show-arrow": _ctx.showArrow,
        "show-after": _ctx.trigger === "hover" ? _ctx.showTimeout : 0,
        "hide-after": _ctx.trigger === "hover" ? _ctx.hideTimeout : 0,
        "virtual-ref": (_a = _ctx.virtualRef) != null ? _a : _ctx.triggeringElementRef,
        "virtual-triggering": _ctx.virtualTriggering || _ctx.splitButton,
        disabled: _ctx.disabled,
        transition: `${_ctx.ns.namespace.value}-zoom-in-top`,
        teleported: _ctx.teleported,
        "append-to": _ctx.appendTo,
        pure: "",
        "focus-on-target": "",
        persistent: _ctx.persistent,
        onBeforeShow: _ctx.handleBeforeShowTooltip,
        onShow: _ctx.handleShowTooltip,
        onBeforeHide: _ctx.handleBeforeHideTooltip
      }, createSlots({
        content: withCtx(() => [
          createVNode(_component_el_scrollbar, {
            ref: "scrollbar",
            "wrap-style": _ctx.wrapStyle,
            tag: "div",
            "view-class": _ctx.ns.e("list")
          }, {
            default: withCtx(() => [
              createVNode(_component_el_roving_focus_group, {
                loop: _ctx.loop,
                "current-tab-id": _ctx.currentTabId,
                orientation: "horizontal",
                onCurrentTabIdChange: _ctx.handleCurrentTabIdChange
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "dropdown")
                ]),
                _: 3
              }, 8, ["loop", "current-tab-id", "onCurrentTabIdChange"])
            ]),
            _: 3
          }, 8, ["wrap-style", "view-class"])
        ]),
        _: 2
      }, [
        !_ctx.splitButton ? {
          name: "default",
          fn: withCtx(() => [
            createVNode(_component_el_only_child, {
              id: _ctx.triggerId,
              ref: "triggeringElementRef",
              role: "button",
              tabindex: _ctx.tabindex
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["id", "tabindex"])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["role", "effect", "popper-options", "placement", "popper-class", "popper-style", "trigger", "trigger-keys", "trigger-target-el", "show-arrow", "show-after", "hide-after", "virtual-ref", "virtual-triggering", "disabled", "transition", "teleported", "append-to", "persistent", "onBeforeShow", "onShow", "onBeforeHide"]),
      _ctx.splitButton ? (openBlock(), createBlock(_component_el_button_group, { key: 0 }, {
        default: withCtx(() => [
          createVNode(_component_el_button, mergeProps({ ref: "referenceElementRef" }, _ctx.buttonProps, {
            size: _ctx.dropdownSize,
            type: _ctx.type,
            disabled: _ctx.disabled,
            tabindex: _ctx.tabindex,
            onClick: _ctx.handlerMainButtonClick
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["size", "type", "disabled", "tabindex", "onClick"]),
          createVNode(_component_el_button, mergeProps({
            id: _ctx.triggerId,
            ref: "triggeringElementRef"
          }, _ctx.buttonProps, {
            role: "button",
            size: _ctx.dropdownSize,
            type: _ctx.type,
            class: _ctx.ns.e("caret-button"),
            disabled: _ctx.disabled,
            tabindex: _ctx.tabindex,
            "aria-label": _ctx.t("el.dropdown.toggleDropdown")
          }), {
            default: withCtx(() => [
              createVNode(_component_el_icon, {
                class: normalizeClass(_ctx.ns.e("icon"))
              }, {
                default: withCtx(() => [
                  createVNode(_component_arrow_down)
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }, 16, ["id", "size", "type", "class", "disabled", "tabindex", "aria-label"])
        ]),
        _: 3
      })) : createCommentVNode("v-if", true)
    ],
    2
  );
}
var Dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);
const _sfc_main$6 = defineComponent({
  components: {
    ElRovingFocusCollectionItem: ElCollectionItem
  },
  props: {
    focusable: {
      type: Boolean,
      default: true
    },
    active: Boolean
  },
  emits: ["mousedown", "focus", "keydown"],
  setup(props, { emit }) {
    const { currentTabbedId, onItemFocus, onItemShiftTab, onKeydown } = inject(
      ROVING_FOCUS_GROUP_INJECTION_KEY,
      void 0
    );
    const id = useId();
    const rovingFocusGroupItemRef = ref();
    const handleMousedown = composeEventHandlers(
      (e) => {
        emit("mousedown", e);
      },
      (e) => {
        if (!props.focusable) {
          e.preventDefault();
        } else {
          onItemFocus(unref(id));
        }
      }
    );
    const handleFocus = composeEventHandlers(
      (e) => {
        emit("focus", e);
      },
      () => {
        onItemFocus(unref(id));
      }
    );
    const handleKeydown = composeEventHandlers(
      (e) => {
        emit("keydown", e);
      },
      (e) => {
        const { shiftKey, target, currentTarget } = e;
        const code = getEventCode(e);
        if (code === EVENT_CODE.tab && shiftKey) {
          onItemShiftTab();
          return;
        }
        if (target !== currentTarget)
          return;
        onKeydown(e);
      }
    );
    const isCurrentTab = computed(() => currentTabbedId.value === unref(id));
    provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: computed(() => unref(isCurrentTab) ? 0 : -1),
      handleMousedown,
      handleFocus,
      handleKeydown
    });
    return {
      id,
      handleKeydown,
      handleFocus,
      handleMousedown
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_collection_item = resolveComponent("el-roving-focus-collection-item");
  return openBlock(), createBlock(_component_el_roving_focus_collection_item, {
    id: _ctx.id,
    focusable: _ctx.focusable,
    active: _ctx.active
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "focusable", "active"]);
}
var ElRovingFocusItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);
const _sfc_main$5 = defineComponent({
  name: "DropdownItemImpl",
  components: {
    ElIcon
  },
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(_, { emit }) {
    const ns = useNamespace("dropdown");
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(
      COLLECTION_ITEM_INJECTION_KEY,
      void 0
    );
    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = composeRefs(
      rovingFocusCollectionItemRef,
      rovingFocusGroupItemRef
    );
    const role = computed(() => {
      if (menuRole.value === "menu") {
        return "menuitem";
      } else if (menuRole.value === "navigation") {
        return "link";
      }
      return "button";
    });
    const handleKeydown = composeEventHandlers((e) => {
      const code = getEventCode(e);
      if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space].includes(
        code
      )) {
        e.preventDefault();
        e.stopImmediatePropagation();
        emit("clickimpl", e);
        return true;
      }
    }, handleItemKeydown);
    return {
      ns,
      itemRef,
      dataset: {
        [COLLECTION_ITEM_SIGN]: ""
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});
const _hoisted_1$1 = ["aria-disabled", "tabindex", "role"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock(
    Fragment,
    null,
    [
      _ctx.divided ? (openBlock(), createElementBlock(
        "li",
        {
          key: 0,
          role: "separator",
          class: normalizeClass(_ctx.ns.bem("menu", "item", "divided"))
        },
        null,
        2
      )) : createCommentVNode("v-if", true),
      createElementVNode("li", mergeProps({ ref: _ctx.itemRef }, { ..._ctx.dataset, ..._ctx.$attrs }, {
        "aria-disabled": _ctx.disabled,
        class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
        tabindex: _ctx.tabIndex,
        role: _ctx.role,
        onClick: _cache[0] || (_cache[0] = (e) => _ctx.$emit("clickimpl", e)),
        onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
        onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
        onPointermove: _cache[4] || (_cache[4] = (e) => _ctx.$emit("pointermove", e)),
        onPointerleave: _cache[5] || (_cache[5] = (e) => _ctx.$emit("pointerleave", e))
      }), [
        _ctx.icon || _ctx.$slots.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
            ])
          ]),
          _: 3
        })) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 16, _hoisted_1$1)
    ],
    64
  );
}
var ElDropdownItemImpl = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]]);
const useDropdown = () => {
  const elDropdown = inject(
    DROPDOWN_INSTANCE_INJECTION_KEY,
    {}
  );
  const _elDropdownSize = computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    elDropdown,
    _elDropdownSize
  };
};
const _sfc_main$4 = defineComponent({
  name: "ElDropdownItem",
  components: {
    ElRovingFocusItem,
    ElDropdownItemImpl
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click"],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown();
    const _instance = getCurrentInstance();
    const { onItemEnter, onItemLeave } = inject(
      DROPDOWN_INJECTION_KEY,
      void 0
    );
    const handlePointerMove = composeEventHandlers(
      (e) => {
        emit("pointermove", e);
        return e.defaultPrevented;
      },
      whenMouse((e) => {
        if (props.disabled) {
          onItemLeave(e);
          return;
        }
        const target = e.currentTarget;
        if (target === (void 0).activeElement || target.contains((void 0).activeElement)) {
          return;
        }
        onItemEnter(e);
        if (!e.defaultPrevented) {
          target == null ? void 0 : target.focus({
            preventScroll: true
          });
        }
      })
    );
    const handlePointerLeave = composeEventHandlers((e) => {
      emit("pointerleave", e);
      return e.defaultPrevented;
    }, whenMouse(onItemLeave));
    const handleClick = composeEventHandlers(
      (e) => {
        if (props.disabled) {
          return;
        }
        emit("click", e);
        return e.type !== "keydown" && e.defaultPrevented;
      },
      (e) => {
        var _a, _b, _c;
        if (props.disabled) {
          e.stopImmediatePropagation();
          return;
        }
        if ((_a = elDropdown == null ? void 0 : elDropdown.hideOnClick) == null ? void 0 : _a.value) {
          (_b = elDropdown.handleClick) == null ? void 0 : _b.call(elDropdown);
        }
        (_c = elDropdown.commandHandler) == null ? void 0 : _c.call(elDropdown, props.command, _instance, e);
      }
    );
    const propsAndAttrs = computed(() => ({ ...props, ...attrs }));
    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      propsAndAttrs
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_dropdown_item_impl = resolveComponent("el-dropdown-item-impl");
  const _component_el_roving_focus_item = resolveComponent("el-roving-focus-item");
  return openBlock(), createBlock(_component_el_roving_focus_item, {
    focusable: !_ctx.disabled
  }, {
    default: withCtx(() => [
      createVNode(_component_el_dropdown_item_impl, mergeProps(_ctx.propsAndAttrs, {
        onPointerleave: _ctx.handlePointerLeave,
        onPointermove: _ctx.handlePointerMove,
        onClickimpl: _ctx.handleClick
      }), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
      }, [
        _ctx.$slots.icon ? {
          name: "icon",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "icon")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["onPointerleave", "onPointermove", "onClickimpl"])
    ]),
    _: 3
  }, 8, ["focusable"]);
}
var DropdownItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);
const _sfc_main$3 = defineComponent({
  name: "ElDropdownMenu",
  props: dropdownMenuProps,
  setup(props) {
    const ns = useNamespace("dropdown");
    const { _elDropdownSize } = useDropdown();
    const size = _elDropdownSize.value;
    const { contentRef, role, triggerId, isUsingKeyboard, handleClose } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const {
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      onBlur,
      onFocus,
      onKeydown,
      onMousedown
    } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { collectionRef: rovingFocusGroupCollectionRef } = inject(
      COLLECTION_INJECTION_KEY,
      void 0
    );
    const dropdownKls = computed(() => {
      return [ns.b("menu"), ns.bm("menu", size == null ? void 0 : size.value)];
    });
    const dropdownListWrapperRef = composeRefs(
      contentRef,
      rovingFocusGroupRef,
      rovingFocusGroupCollectionRef
    );
    const handleKeydown = composeEventHandlers(
      (e) => {
        var _a;
        (_a = props.onKeydown) == null ? void 0 : _a.call(props, e);
      },
      (e) => {
        const { currentTarget, target } = e;
        const code = getEventCode(e);
        currentTarget.contains(
          target
        );
        if (EVENT_CODE.tab === code) {
          return handleClose();
        }
        onKeydown(e);
      }
    );
    function handleFocus(e) {
      isUsingKeyboard.value && onFocus(e);
    }
    return {
      size,
      rovingFocusGroupRootStyle,
      dropdownKls,
      role,
      triggerId,
      dropdownListWrapperRef,
      handleKeydown,
      onBlur,
      handleFocus,
      onMousedown
    };
  }
});
const _hoisted_1 = ["role", "aria-labelledby"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    ref: _ctx.dropdownListWrapperRef,
    class: normalizeClass(_ctx.dropdownKls),
    style: normalizeStyle(_ctx.rovingFocusGroupRootStyle),
    tabindex: -1,
    role: _ctx.role,
    "aria-labelledby": _ctx.triggerId,
    onFocusin: _cache[0] || (_cache[0] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
    onFocusout: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
    onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
    onMousedown: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.onMousedown && _ctx.onMousedown(...args), ["self"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 46, _hoisted_1);
}
var DropdownMenu = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);
const ElDropdown = withInstall(Dropdown, {
  DropdownItem,
  DropdownMenu
});
const ElDropdownItem = withNoopInstall(DropdownItem);
const ElDropdownMenu = withNoopInstall(DropdownMenu);
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElMenuCollapseTransition"
  },
  __name: "menu-collapse-transition",
  setup(__props) {
    const ns = useNamespace("menu");
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        addClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        removeClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        if (hasClass(el, ns.m("collapse"))) {
          removeClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          addClass(el, ns.m("collapse"));
        } else {
          addClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          removeClass(el, ns.m("collapse"));
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(
        Transition,
        mergeProps({ mode: "out-in" }, listeners),
        {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        },
        16
      );
    };
  }
});
var ElMenuCollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue"]]);
function useMenu(instance, currentIndex) {
  const indexPath = computed(() => {
    let parent = instance.parent;
    const path = [currentIndex.value];
    while (parent.type.name !== "ElMenu") {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }
      parent = parent.parent;
    }
    return path;
  });
  const parentMenu = computed(() => {
    let parent = instance.parent;
    while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) {
      parent = parent.parent;
    }
    return parent;
  });
  return {
    parentMenu,
    indexPath
  };
}
function useMenuColor(props) {
  const menuBarColor = computed(() => {
    const color = props.backgroundColor;
    return color ? new TinyColor(color).shade(20).toString() : "";
  });
  return menuBarColor;
}
const useMenuCssVar = (props, level) => {
  const ns = useNamespace("menu");
  return computed(
    () => ns.cssVarBlock({
      "text-color": props.textColor || "",
      "hover-text-color": props.textColor || "",
      "bg-color": props.backgroundColor || "",
      "hover-bg-color": useMenuColor(props).value || "",
      "active-color": props.activeTextColor || "",
      level: `${level}`
    })
  );
};
const MENU_INJECTION_KEY = "rootMenu";
const SUB_MENU_INJECTION_KEY = "subMenu:";
const subMenuProps = buildProps({
  index: {
    type: String,
    required: true
  },
  showTimeout: Number,
  hideTimeout: Number,
  popperClass: String,
  popperStyle: {
    type: definePropType([String, Object])
  },
  disabled: Boolean,
  teleported: {
    type: Boolean,
    default: void 0
  },
  popperOffset: Number,
  expandCloseIcon: {
    type: iconPropType
  },
  expandOpenIcon: {
    type: iconPropType
  },
  collapseCloseIcon: {
    type: iconPropType
  },
  collapseOpenIcon: {
    type: iconPropType
  }
});
const COMPONENT_NAME$1 = "ElSubMenu";
var SubMenu = defineComponent({
  name: COMPONENT_NAME$1,
  props: subMenuProps,
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance();
    const { indexPath, parentMenu } = useMenu(
      instance,
      computed(() => props.index)
    );
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const rootMenu = inject(MENU_INJECTION_KEY);
    if (!rootMenu)
      throwError(COMPONENT_NAME$1, "can not inject root menu");
    const subMenu = inject(
      `${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`
    );
    if (!subMenu)
      throwError(COMPONENT_NAME$1, "can not inject sub menu");
    const items = ref({});
    const subMenus = ref({});
    let timeout;
    const mouseInChild = ref(false);
    const verticalTitleRef = ref();
    const vPopper = ref();
    const isFirstLevel = computed(() => subMenu.level === 0);
    const currentPlacement = computed(
      () => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start"
    );
    const subMenuTitleIcon = computed(() => {
      const isExpandedMode = mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse;
      if (isExpandedMode) {
        if (props.expandCloseIcon && props.expandOpenIcon) {
          return opened.value ? props.expandOpenIcon : props.expandCloseIcon;
        }
        return arrow_down_default;
      } else {
        if (props.collapseCloseIcon && props.collapseOpenIcon) {
          return opened.value ? props.collapseOpenIcon : props.collapseCloseIcon;
        }
        return arrow_right_default;
      }
    });
    const appendToBody = computed(() => {
      const value = props.teleported;
      return isUndefined(value) ? isFirstLevel.value : value;
    });
    const menuTransitionName = computed(
      () => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`
    );
    const fallbackPlacements = computed(
      () => mode.value === "horizontal" && isFirstLevel.value ? [
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end",
        "right-start",
        "left-start"
      ] : [
        "right-start",
        "right",
        "right-end",
        "left-start",
        "bottom-start",
        "bottom-end",
        "top-start",
        "top-end"
      ]
    );
    const opened = computed(() => rootMenu.openedMenus.includes(props.index));
    const active = computed(
      () => [...Object.values(items.value), ...Object.values(subMenus.value)].some(
        ({ active: active2 }) => active2
      )
    );
    const mode = computed(() => rootMenu.props.mode);
    const persistent = computed(() => rootMenu.props.persistent);
    reactive({
      index: props.index,
      indexPath,
      active
    });
    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
    const subMenuPopperOffset = computed(
      () => {
        var _a;
        return (_a = props.popperOffset) != null ? _a : rootMenu.props.popperOffset;
      }
    );
    const subMenuPopperClass = computed(
      () => {
        var _a;
        return (_a = props.popperClass) != null ? _a : rootMenu.props.popperClass;
      }
    );
    const subMenuPopperStyle = computed(
      () => {
        var _a;
        return (_a = props.popperStyle) != null ? _a : rootMenu.props.popperStyle;
      }
    );
    const subMenuShowTimeout = computed(
      () => {
        var _a;
        return (_a = props.showTimeout) != null ? _a : rootMenu.props.showTimeout;
      }
    );
    const subMenuHideTimeout = computed(
      () => {
        var _a;
        return (_a = props.hideTimeout) != null ? _a : rootMenu.props.hideTimeout;
      }
    );
    const doDestroy = () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = vPopper.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null ? void 0 : _c.destroy();
    };
    const handleCollapseToggle = (value) => {
      if (!value) {
        doDestroy();
      }
    };
    const handleClick = () => {
      if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled)
        return;
      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      });
    };
    const handleMouseenter = (event, showTimeout = subMenuShowTimeout.value) => {
      var _a;
      if (event.type === "focus")
        return;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
        subMenu.mouseInChild.value = true;
        return;
      }
      subMenu.mouseInChild.value = true;
      timeout == null ? void 0 : timeout();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value);
      }, showTimeout));
      if (appendToBody.value) {
        (_a = parentMenu.value.vnode.el) == null ? void 0 : _a.dispatchEvent(new MouseEvent("mouseenter"));
      }
      if (event.type === "mouseenter" && event.target) {
        nextTick(() => {
          focusElement(event.target, { preventScroll: true });
        });
      }
    };
    const handleMouseleave = (deepDispatch = false) => {
      var _a;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
        subMenu.mouseInChild.value = false;
        return;
      }
      timeout == null ? void 0 : timeout();
      subMenu.mouseInChild.value = false;
      ({ stop: timeout } = useTimeoutFn(
        () => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value),
        subMenuHideTimeout.value
      ));
      if (appendToBody.value && deepDispatch) {
        (_a = subMenu.handleMouseleave) == null ? void 0 : _a.call(subMenu, true);
      }
    };
    watch(
      () => rootMenu.props.collapse,
      (value) => handleCollapseToggle(Boolean(value))
    );
    {
      const addSubMenu = (item2) => {
        subMenus.value[item2.index] = item2;
      };
      const removeSubMenu = (item2) => {
        delete subMenus.value[item2.index];
      };
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      });
    }
    expose({
      opened
    });
    return () => {
      var _a;
      const titleTag = [
        (_a = slots.title) == null ? void 0 : _a.call(slots),
        h(
          ElIcon,
          {
            class: nsSubMenu.e("icon-arrow"),
            style: {
              transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none"
            }
          },
          {
            default: () => isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value)
          }
        )
      ];
      const child = rootMenu.isMenuPopup ? h(
        ElTooltip,
        {
          ref: vPopper,
          visible: opened.value,
          effect: "light",
          pure: true,
          offset: subMenuPopperOffset.value,
          showArrow: false,
          persistent: persistent.value,
          popperClass: subMenuPopperClass.value,
          popperStyle: subMenuPopperStyle.value,
          placement: currentPlacement.value,
          teleported: appendToBody.value,
          fallbackPlacements: fallbackPlacements.value,
          transition: menuTransitionName.value,
          gpuAcceleration: false
        },
        {
          content: () => {
            var _a2;
            return h(
              "div",
              {
                class: [
                  nsMenu.m(mode.value),
                  nsMenu.m("popup-container"),
                  subMenuPopperClass.value
                ],
                onMouseenter: (evt) => handleMouseenter(evt, 100),
                onMouseleave: () => handleMouseleave(true),
                onFocus: (evt) => handleMouseenter(evt, 100)
              },
              [
                h(
                  "ul",
                  {
                    class: [
                      nsMenu.b(),
                      nsMenu.m("popup"),
                      nsMenu.m(`popup-${currentPlacement.value}`)
                    ],
                    style: ulStyle.value
                  },
                  [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]
                )
              ]
            );
          },
          default: () => h(
            "div",
            {
              class: nsSubMenu.e("title"),
              onClick: handleClick
            },
            titleTag
          )
        }
      ) : h(Fragment, {}, [
        h(
          "div",
          {
            class: nsSubMenu.e("title"),
            ref: verticalTitleRef,
            onClick: handleClick
          },
          titleTag
        ),
        h(
          ElCollapseTransition,
          {},
          {
            default: () => {
              var _a2;
              return withDirectives(
                h(
                  "ul",
                  {
                    role: "menu",
                    class: [nsMenu.b(), nsMenu.m("inline")],
                    style: ulStyle.value
                  },
                  [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]
                ),
                [[vShow, opened.value]]
              );
            }
          }
        )
      ]);
      return h(
        "li",
        {
          class: [
            nsSubMenu.b(),
            nsSubMenu.is("active", active.value),
            nsSubMenu.is("opened", opened.value),
            nsSubMenu.is("disabled", props.disabled)
          ],
          role: "menuitem",
          ariaHaspopup: true,
          ariaExpanded: opened.value,
          onMouseenter: handleMouseenter,
          onMouseleave: () => handleMouseleave(),
          onFocus: handleMouseenter
        },
        [child]
      );
    };
  }
});
const menuProps = buildProps({
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical"
  },
  defaultActive: {
    type: String,
    default: ""
  },
  defaultOpeneds: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  uniqueOpened: Boolean,
  router: Boolean,
  menuTrigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  collapse: Boolean,
  backgroundColor: String,
  textColor: String,
  activeTextColor: String,
  closeOnClickOutside: Boolean,
  collapseTransition: {
    type: Boolean,
    default: true
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  popperOffset: {
    type: Number,
    default: 6
  },
  ellipsisIcon: {
    type: iconPropType,
    default: () => more_default
  },
  popperEffect: {
    type: definePropType(String),
    default: "dark"
  },
  popperClass: String,
  popperStyle: {
    type: definePropType([String, Object])
  },
  showTimeout: {
    type: Number,
    default: 300
  },
  hideTimeout: {
    type: Number,
    default: 300
  },
  persistent: {
    type: Boolean,
    default: true
  }
});
const checkIndexPath = (indexPath) => isArray(indexPath) && indexPath.every((path) => isString(path));
const menuEmits = {
  close: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
  open: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
  select: (index, indexPath, item, routerResult) => isString(index) && checkIndexPath(indexPath) && isObject(item) && (isUndefined(routerResult) || routerResult instanceof Promise)
};
const DEFAULT_MORE_ITEM_WIDTH = 64;
var Menu = defineComponent({
  name: "ElMenu",
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const menu = ref();
    const subMenu = ref();
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    let moreItemWidth = DEFAULT_MORE_ITEM_WIDTH;
    const sliceIndex = ref(-1);
    const openedMenus = ref(
      props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []
    );
    const activeIndex = ref(props.defaultActive);
    const items = ref({});
    const subMenus = ref({});
    const isMenuPopup = computed(
      () => props.mode === "horizontal" || props.mode === "vertical" && props.collapse
    );
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value];
      if (!activeItem || props.mode === "horizontal" || props.collapse)
        return;
      const indexPath = activeItem.indexPath;
      indexPath.forEach((index) => {
        const subMenu2 = subMenus.value[index];
        subMenu2 && openMenu(index, subMenu2.indexPath);
      });
    };
    const openMenu = (index, indexPath) => {
      if (openedMenus.value.includes(index))
        return;
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter(
          (index2) => indexPath.includes(index2)
        );
      }
      openedMenus.value.push(index);
      emit("open", index, indexPath);
    };
    const close = (index) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const closeMenu = (index, indexPath) => {
      close(index);
      emit("close", index, indexPath);
    };
    const handleSubMenuClick = ({
      index,
      indexPath
    }) => {
      const isOpened = openedMenus.value.includes(index);
      isOpened ? closeMenu(index, indexPath) : openMenu(index, indexPath);
    };
    const handleMenuItemClick = (menuItem) => {
      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
      const { index, indexPath } = menuItem;
      if (isNil(index) || isNil(indexPath))
        return;
      if (props.router && router) {
        const route = menuItem.route || index;
        const routerResult = router.push(route).then((res) => {
          if (!res)
            activeIndex.value = index;
          return res;
        });
        emit(
          "select",
          index,
          indexPath,
          { index, indexPath, route },
          routerResult
        );
      } else {
        activeIndex.value = index;
        emit("select", index, indexPath, { index, indexPath });
      }
    };
    const updateActiveIndex = (val) => {
      var _a;
      const itemsInData = items.value;
      const item = itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive];
      activeIndex.value = (_a = item == null ? void 0 : item.index) != null ? _a : val;
    };
    const calcMenuItemWidth = (menuItem) => {
      const computedStyle = getComputedStyle(menuItem);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return menuItem.offsetWidth + marginLeft + marginRight || 0;
    };
    const calcSliceIndex = () => {
      if (!menu.value)
        return -1;
      const items2 = Array.from(menu.value.childNodes).filter(
        (item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue)
      );
      const computedMenuStyle = getComputedStyle(menu.value);
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let sliceIndex2 = 0;
      items2.forEach((item, index) => {
        calcWidth += calcMenuItemWidth(item);
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex2 = index + 1;
        }
      });
      return sliceIndex2 === items2.length ? -1 : sliceIndex2;
    };
    const getIndexPath = (index) => subMenus.value[index].indexPath;
    const debounce = (fn, wait = 33.34) => {
      let timer;
      return () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, wait);
      };
    };
    let isFirstTimeRender = true;
    const handleResize = () => {
      const el = unrefElement(subMenu);
      if (el)
        moreItemWidth = calcMenuItemWidth(el) || DEFAULT_MORE_ITEM_WIDTH;
      if (sliceIndex.value === calcSliceIndex())
        return;
      const callback = () => {
        sliceIndex.value = -1;
        nextTick(() => {
          sliceIndex.value = calcSliceIndex();
        });
      };
      isFirstTimeRender ? callback() : debounce(callback)();
      isFirstTimeRender = false;
    };
    watch(
      () => props.defaultActive,
      (currentActive) => {
        if (!items.value[currentActive]) {
          activeIndex.value = "";
        }
        updateActiveIndex(currentActive);
      }
    );
    watch(
      () => props.collapse,
      (value) => {
        if (value)
          openedMenus.value = [];
      }
    );
    watch(items.value, initMenu);
    let resizeStopper;
    watchEffect(() => {
      if (props.mode === "horizontal" && props.ellipsis)
        resizeStopper = useResizeObserver(menu, handleResize).stop;
      else
        resizeStopper == null ? void 0 : resizeStopper();
    });
    const mouseInChild = ref(false);
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      const addMenuItem = (item) => {
        items.value[item.index] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.index];
      };
      provide(
        MENU_INJECTION_KEY,
        reactive({
          props,
          openedMenus,
          items,
          subMenus,
          activeIndex,
          isMenuPopup,
          addMenuItem,
          removeMenuItem,
          addSubMenu,
          removeSubMenu,
          openMenu,
          closeMenu,
          handleMenuItemClick,
          handleSubMenuClick
        })
      );
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0
      });
    }
    {
      const open = (index) => {
        const { indexPath } = subMenus.value[index];
        indexPath.forEach((i) => openMenu(i, indexPath));
      };
      expose({
        open,
        close,
        updateActiveIndex,
        handleResize
      });
    }
    const ulStyle = useMenuCssVar(props, 0);
    return () => {
      var _a, _b;
      let slot = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
      const vShowMore = [];
      if (props.mode === "horizontal" && menu.value) {
        const originalSlot = flattedChildren(slot).filter((vnode) => {
          return (vnode == null ? void 0 : vnode.shapeFlag) !== 8;
        });
        const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
        const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
        if ((slotMore == null ? void 0 : slotMore.length) && props.ellipsis) {
          slot = slotDefault;
          vShowMore.push(
            h(
              SubMenu,
              {
                ref: subMenu,
                index: "sub-menu-more",
                class: nsSubMenu.e("hide-arrow"),
                popperOffset: props.popperOffset
              },
              {
                title: () => h(
                  ElIcon,
                  {
                    class: nsSubMenu.e("icon-more")
                  },
                  {
                    default: () => h(props.ellipsisIcon)
                  }
                ),
                default: () => slotMore
              }
            )
          );
        }
      }
      const directives = props.closeOnClickOutside ? [
        [
          ClickOutside,
          () => {
            if (!openedMenus.value.length)
              return;
            if (!mouseInChild.value) {
              openedMenus.value.forEach(
                (openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu))
              );
              openedMenus.value = [];
            }
          }
        ]
      ] : [];
      const vMenu = withDirectives(
        h(
          "ul",
          {
            key: String(props.collapse),
            role: "menubar",
            ref: menu,
            style: ulStyle.value,
            class: {
              [nsMenu.b()]: true,
              [nsMenu.m(props.mode)]: true,
              [nsMenu.m("collapse")]: props.collapse
            }
          },
          [...slot, ...vShowMore]
        ),
        directives
      );
      if (props.collapseTransition && props.mode === "vertical") {
        return h(ElMenuCollapseTransition, () => vMenu);
      }
      return vMenu;
    };
  }
});
const menuItemProps = buildProps({
  index: {
    type: definePropType([String, null]),
    default: null
  },
  route: {
    type: definePropType([String, Object])
  },
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => isString(item.index) && isArray(item.indexPath)
};
const COMPONENT_NAME = "ElMenuItem";
const _sfc_main$1 = defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "menu-item",
  props: menuItemProps,
  emits: menuItemEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    isPropAbsent(props.index) && debugWarn(COMPONENT_NAME, 'Missing required prop: "index"');
    const instance = getCurrentInstance();
    const rootMenu = inject(MENU_INJECTION_KEY);
    const nsMenu = useNamespace("menu");
    const nsMenuItem = useNamespace("menu-item");
    if (!rootMenu)
      throwError(COMPONENT_NAME, "can not inject root menu");
    const { parentMenu, indexPath } = useMenu(instance, toRef(props, "index"));
    const subMenu = inject(
      `${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`
    );
    if (!subMenu)
      throwError(COMPONENT_NAME, "can not inject sub menu");
    const active = computed(() => props.index === rootMenu.activeIndex);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        });
        emit("click", item);
      }
    };
    __expose({
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "li",
        {
          class: normalizeClass([
            unref(nsMenuItem).b(),
            unref(nsMenuItem).is("active", active.value),
            unref(nsMenuItem).is("disabled", _ctx.disabled)
          ]),
          role: "menuitem",
          tabindex: "-1",
          onClick: handleClick
        },
        [
          unref(parentMenu).type.name === "ElMenu" && unref(rootMenu).props.collapse && _ctx.$slots.title ? (openBlock(), createBlock(unref(ElTooltip), {
            key: 0,
            effect: unref(rootMenu).props.popperEffect,
            placement: "right",
            "fallback-placements": ["left"],
            "popper-class": unref(rootMenu).props.popperClass,
            "popper-style": unref(rootMenu).props.popperStyle,
            persistent: unref(rootMenu).props.persistent,
            "focus-on-target": ""
          }, {
            content: withCtx(() => [
              renderSlot(_ctx.$slots, "title")
            ]),
            default: withCtx(() => [
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(nsMenu).be("tooltip", "trigger"))
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
              )
            ]),
            _: 3
          }, 8, ["effect", "popper-class", "popper-style", "persistent"])) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              renderSlot(_ctx.$slots, "default"),
              renderSlot(_ctx.$slots, "title")
            ],
            64
          ))
        ],
        2
      );
    };
  }
});
var MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue"]]);
const menuItemGroupProps = {
  title: String
};
const _sfc_main = defineComponent({
  ...{
    name: "ElMenuItemGroup"
  },
  __name: "menu-item-group",
  props: menuItemGroupProps,
  setup(__props) {
    const ns = useNamespace("menu-item-group");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "li",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("title"))
            },
            [
              !_ctx.$slots.title ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(_ctx.title),
                    1
                  )
                ],
                64
              )) : renderSlot(_ctx.$slots, "title", { key: 1 })
            ],
            2
          ),
          createElementVNode("ul", null, [
            renderSlot(_ctx.$slots, "default")
          ])
        ],
        2
      );
    };
  }
});
var MenuItemGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue"]]);
const ElMenu = withInstall(Menu, {
  MenuItem,
  MenuItemGroup,
  SubMenu
});
const ElMenuItem = withNoopInstall(MenuItem);
withNoopInstall(MenuItemGroup);
const ElSubMenu = withNoopInstall(SubMenu);
export {
  DROPDOWN_INJECTION_KEY as D,
  ElContainer as E,
  MENU_INJECTION_KEY as M,
  SUB_MENU_INJECTION_KEY as S,
  ElAside as a,
  ElMenu as b,
  ElSubMenu as c,
  ElMenuItem as d,
  ElHeader as e,
  ElDropdown as f,
  ElDropdownMenu as g,
  ElDropdownItem as h,
  ElMain as i,
  dropdownProps as j,
  ElCollapseTransition as k,
  dropdownItemProps as l,
  dropdownMenuProps as m,
  DROPDOWN_INSTANCE_INJECTION_KEY as n,
  menuEmits as o,
  menuProps as p,
  menuItemEmits as q,
  menuItemProps as r,
  menuItemGroupProps as s,
  subMenuProps as t
};
//# sourceMappingURL=index-D8rtC56F.js.map
