import { defineComponent, computed, getCurrentInstance, ref, watch, nextTick, provide, createVNode, renderSlot, useSlots, inject, reactive, withDirectives, createCommentVNode, createElementBlock, openBlock, normalizeClass, unref, vShow, shallowRef, triggerRef, normalizeStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { omit, clamp } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import { B as withInstall, C as withNoopInstall, w as _export_sfc$1, r as isNumber$1, q as buildProps, x as useNamespace, A as isUndefined$1, E as ElIcon, p as plus_default, X as throwError, D as definePropType, V as getEventCode, W as EVENT_CODE, z as arrow_left_default, f as arrow_right_default, J as close_default, F as mutable, a$ as isFirefox } from './server.mjs';
import { useDocumentVisibility, useWindowFocus, useElementSize, useResizeObserver } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { r as rAF, c as cAF } from './raf-CQRaPAjg.mjs';
import { c as capitalize } from './strings-D1uxkXhq.mjs';
import { U as UPDATE_MODEL_EVENT } from './event-BZTOGHfp.mjs';
import { u as useOrderedChildren } from './index-BrFCEoKQ.mjs';
import { isString } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';

const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
const ITEM_RENDER_EVT = "itemRendered";
const SCROLL_EVT = "scroll";
const FORWARD = "forward";
const BACKWARD = "backward";
const AUTO_ALIGNMENT = "auto";
const SMART_ALIGNMENT = "smart";
const START_ALIGNMENT = "start";
const CENTERED_ALIGNMENT = "center";
const END_ALIGNMENT = "end";
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const LTR = "ltr";
const RTL = "rtl";
const RTL_OFFSET_NAG = "negative";
const RTL_OFFSET_POS_ASC = "positive-ascending";
const RTL_OFFSET_POS_DESC = "positive-descending";
const ScrollbarDirKey = {
  [HORIZONTAL]: "left",
  [VERTICAL]: "top"
};
const SCROLLBAR_MIN_SIZE = 20;
const useWheel = ({ atEndEdge, atStartEdge, layout }, onWheelDelta) => {
  let frameHandle;
  let offset = 0;
  const hasReachedEdge = (offset2) => {
    const edgeReached = offset2 < 0 && atStartEdge.value || offset2 > 0 && atEndEdge.value;
    return edgeReached;
  };
  const onWheel = (e) => {
    cAF(frameHandle);
    let { deltaX, deltaY } = e;
    if (e.shiftKey && deltaY !== 0) {
      deltaX = deltaY;
      deltaY = 0;
    }
    const newOffset = layout.value === HORIZONTAL ? deltaX : deltaY;
    if (hasReachedEdge(newOffset))
      return;
    offset += newOffset;
    if (!isFirefox() && newOffset !== 0) {
      e.preventDefault();
    }
    frameHandle = rAF(() => {
      onWheelDelta(offset);
      offset = 0;
    });
  };
  return {
    hasReachedEdge,
    onWheel
  };
};
const tabsRootContextKey = /* @__PURE__ */ Symbol("tabsRootContextKey");
const tabBarProps = buildProps({
  tabs: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  tabRefs: {
    type: definePropType(Object),
    default: () => mutable({})
  }
});
const COMPONENT_NAME$2 = "ElTabBar";
const _sfc_main$1 = defineComponent({
  ...{
    name: COMPONENT_NAME$2
  },
  __name: "tab-bar",
  props: tabBarProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs)
      throwError(COMPONENT_NAME$2, "<el-tabs><el-tab-bar /></el-tabs>");
    const ns = useNamespace("tabs");
    const barRef = ref();
    const barStyle = ref();
    const renderActiveBar = computed(
      () => {
        var _a;
        return isUndefined$1(rootTabs.props.defaultValue) || Boolean((_a = barStyle.value) == null ? void 0 : _a.transform);
      }
    );
    const getBarStyle = () => {
      let offset = 0;
      let tabSize = 0;
      const sizeName = ["top", "bottom"].includes(rootTabs.props.tabPosition) ? "width" : "height";
      const sizeDir = sizeName === "width" ? "x" : "y";
      const position = sizeDir === "x" ? "left" : "top";
      props.tabs.every((tab) => {
        if (isUndefined$1(tab.paneName))
          return false;
        const $el = props.tabRefs[tab.paneName];
        if (!$el)
          return false;
        if (!tab.active) {
          return true;
        }
        offset = $el[`offset${capitalize(position)}`];
        tabSize = $el[`client${capitalize(sizeName)}`];
        const tabStyles = (void 0).getComputedStyle($el);
        if (sizeName === "width") {
          tabSize -= Number.parseFloat(tabStyles.paddingLeft) + Number.parseFloat(tabStyles.paddingRight);
          offset += Number.parseFloat(tabStyles.paddingLeft);
        }
        return false;
      });
      return {
        [sizeName]: `${tabSize}px`,
        transform: `translate${capitalize(sizeDir)}(${offset}px)`
      };
    };
    const update = () => barStyle.value = getBarStyle();
    const tabObservers = [];
    const observerTabs = () => {
      tabObservers.forEach((observer) => observer.stop());
      tabObservers.length = 0;
      Object.values(props.tabRefs).forEach((tab) => {
        tabObservers.push(useResizeObserver(tab, update));
      });
    };
    watch(
      () => props.tabs,
      async () => {
        await nextTick();
        update();
        observerTabs();
      },
      { immediate: true }
    );
    useResizeObserver(barRef, () => update());
    __expose({
      ref: barRef,
      update
    });
    return (_ctx, _cache) => {
      return renderActiveBar.value ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          ref_key: "barRef",
          ref: barRef,
          class: normalizeClass([unref(ns).e("active-bar"), unref(ns).is(unref(rootTabs).props.tabPosition)]),
          style: normalizeStyle(barStyle.value)
        },
        null,
        6
      )) : createCommentVNode("v-if", true);
    };
  }
});
var TabBar = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-bar.vue"]]);
const tabNavProps = buildProps({
  panes: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  currentName: {
    type: [String, Number],
    default: ""
  },
  editable: Boolean,
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  stretch: Boolean,
  tabindex: {
    type: [String, Number],
    default: void 0
  }
});
const tabNavEmits = {
  tabClick: (tab, tabName, ev) => ev instanceof Event,
  tabRemove: (tab, ev) => ev instanceof Event
};
const COMPONENT_NAME$1 = "ElTabNav";
const TabNav = defineComponent({
  name: COMPONENT_NAME$1,
  props: tabNavProps,
  emits: tabNavEmits,
  setup(props, {
    expose,
    emit
  }) {
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs)
      throwError(COMPONENT_NAME$1, `<el-tabs><tab-nav /></el-tabs>`);
    const ns = useNamespace("tabs");
    const visibility = useDocumentVisibility();
    const focused = useWindowFocus();
    const navScroll$ = ref();
    const nav$ = ref();
    const el$ = ref();
    const tabRefsMap = ref({});
    const tabBarRef = ref();
    const scrollable = ref(false);
    const navOffset = ref(0);
    const isFocus = ref(false);
    const focusable = ref(true);
    const tracker = shallowRef();
    const isHorizontal = computed(() => ["top", "bottom"].includes(rootTabs.props.tabPosition));
    const sizeName = computed(() => isHorizontal.value ? "width" : "height");
    const navStyle = computed(() => {
      const dir = sizeName.value === "width" ? "X" : "Y";
      return {
        transform: `translate${dir}(-${navOffset.value}px)`
      };
    });
    const {
      width: navContainerWidth,
      height: navContainerHeight
    } = useElementSize(navScroll$);
    const {
      width: navWidth,
      height: navHeight
    } = useElementSize(nav$, {
      width: 0,
      height: 0
    }, {
      box: "border-box"
    });
    const navContainerSize = computed(() => isHorizontal.value ? navContainerWidth.value : navContainerHeight.value);
    const navSize = computed(() => isHorizontal.value ? navWidth.value : navHeight.value);
    const {
      onWheel
    } = useWheel({
      atStartEdge: computed(() => navOffset.value <= 0),
      atEndEdge: computed(() => navSize.value - navOffset.value <= navContainerSize.value),
      layout: computed(() => isHorizontal.value ? "horizontal" : "vertical")
    }, (offset) => {
      navOffset.value = clamp(navOffset.value + offset, 0, navSize.value - navContainerSize.value);
    });
    const scrollPrev = () => {
      if (!navScroll$.value)
        return;
      const containerSize = navScroll$.value[`offset${capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (!currentOffset)
        return;
      const newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;
      navOffset.value = newOffset;
    };
    const scrollNext = () => {
      if (!navScroll$.value || !nav$.value)
        return;
      const navSize2 = nav$.value[`offset${capitalize(sizeName.value)}`];
      const containerSize = navScroll$.value[`offset${capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (navSize2 - currentOffset <= containerSize)
        return;
      const newOffset = navSize2 - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize2 - containerSize;
      navOffset.value = newOffset;
    };
    const scrollToActiveTab = async () => {
      const nav = nav$.value;
      if (!scrollable.value || !el$.value || !navScroll$.value || !nav)
        return;
      await nextTick();
      const activeTab = tabRefsMap.value[props.currentName];
      if (!activeTab)
        return;
      const navScroll = navScroll$.value;
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll.getBoundingClientRect();
      const maxOffset = isHorizontal.value ? nav.offsetWidth - navScrollBounding.width : nav.offsetHeight - navScrollBounding.height;
      const currentOffset = navOffset.value;
      let newOffset = currentOffset;
      if (isHorizontal.value) {
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
        }
      }
      newOffset = Math.max(newOffset, 0);
      navOffset.value = Math.min(newOffset, maxOffset);
    };
    const update = () => {
      var _a;
      if (!nav$.value || !navScroll$.value)
        return;
      props.stretch && ((_a = tabBarRef.value) == null ? void 0 : _a.update());
      const navSize2 = nav$.value[`offset${capitalize(sizeName.value)}`];
      const containerSize = navScroll$.value[`offset${capitalize(sizeName.value)}`];
      const currentOffset = navOffset.value;
      if (containerSize < navSize2) {
        scrollable.value = scrollable.value || {};
        scrollable.value.prev = currentOffset;
        scrollable.value.next = currentOffset + containerSize < navSize2;
        if (navSize2 - currentOffset < containerSize) {
          navOffset.value = navSize2 - containerSize;
        }
      } else {
        scrollable.value = false;
        if (currentOffset > 0) {
          navOffset.value = 0;
        }
      }
    };
    const changeTab = (event) => {
      const code = getEventCode(event);
      let step = 0;
      switch (code) {
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          step = -1;
          break;
        case EVENT_CODE.right:
        case EVENT_CODE.down:
          step = 1;
          break;
        default:
          return;
      }
      const tabList = Array.from(event.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)"));
      const currentIndex = tabList.indexOf(event.target);
      let nextIndex = currentIndex + step;
      if (nextIndex < 0) {
        nextIndex = tabList.length - 1;
      } else if (nextIndex >= tabList.length) {
        nextIndex = 0;
      }
      tabList[nextIndex].focus({
        preventScroll: true
      });
      tabList[nextIndex].click();
      setFocus();
    };
    const setFocus = () => {
      if (focusable.value)
        isFocus.value = true;
    };
    const removeFocus = () => isFocus.value = false;
    const setRefs = (el, key) => {
      tabRefsMap.value[key] = el;
    };
    const focusActiveTab = async () => {
      await nextTick();
      const activeTab = tabRefsMap.value[props.currentName];
      activeTab == null ? void 0 : activeTab.focus({
        preventScroll: true
      });
    };
    watch(visibility, (visibility2) => {
      if (visibility2 === "hidden") {
        focusable.value = false;
      } else if (visibility2 === "visible") {
        setTimeout(() => focusable.value = true, 50);
      }
    });
    watch(focused, (focused2) => {
      if (focused2) {
        setTimeout(() => focusable.value = true, 50);
      } else {
        focusable.value = false;
      }
    });
    useResizeObserver(el$, () => {
      rAF(update);
    });
    expose({
      scrollToActiveTab,
      removeFocus,
      focusActiveTab,
      tabListRef: nav$,
      tabBarRef,
      scheduleRender: () => triggerRef(tracker)
    });
    return () => {
      const scrollBtn = scrollable.value ? [createVNode("span", {
        "class": [ns.e("nav-prev"), ns.is("disabled", !scrollable.value.prev)],
        "onClick": scrollPrev
      }, [createVNode(ElIcon, null, {
        default: () => [createVNode(arrow_left_default, null, null)]
      })]), createVNode("span", {
        "class": [ns.e("nav-next"), ns.is("disabled", !scrollable.value.next)],
        "onClick": scrollNext
      }, [createVNode(ElIcon, null, {
        default: () => [createVNode(arrow_right_default, null, null)]
      })])] : null;
      const tabs = props.panes.map((pane, index) => {
        var _a, _b, _c, _d, _e;
        const uid = pane.uid;
        const disabled = pane.props.disabled;
        const tabName = (_b = (_a = pane.props.name) != null ? _a : pane.index) != null ? _b : `${index}`;
        const closable = !disabled && (pane.isClosable || pane.props.closable !== false && props.editable);
        pane.index = `${index}`;
        const btnClose = closable ? createVNode(ElIcon, {
          "class": "is-icon-close",
          "onClick": (ev) => emit("tabRemove", pane, ev)
        }, {
          default: () => [createVNode(close_default, null, null)]
        }) : null;
        const tabLabelContent = ((_d = (_c = pane.slots).label) == null ? void 0 : _d.call(_c)) || pane.props.label;
        const tabindex = !disabled && pane.active ? (_e = props.tabindex) != null ? _e : rootTabs.props.tabindex : -1;
        return createVNode("div", {
          "ref": (el) => setRefs(el, tabName),
          "class": [ns.e("item"), ns.is(rootTabs.props.tabPosition), ns.is("active", pane.active), ns.is("disabled", disabled), ns.is("closable", closable), ns.is("focus", isFocus.value)],
          "id": `tab-${tabName}`,
          "key": `tab-${uid}`,
          "aria-controls": `pane-${tabName}`,
          "role": "tab",
          "aria-selected": pane.active,
          "tabindex": tabindex,
          "onFocus": () => setFocus(),
          "onBlur": () => removeFocus(),
          "onClick": (ev) => {
            removeFocus();
            emit("tabClick", pane, tabName, ev);
          },
          "onKeydown": (ev) => {
            const code = getEventCode(ev);
            if (closable && (code === EVENT_CODE.delete || code === EVENT_CODE.backspace)) {
              emit("tabRemove", pane, ev);
            }
          }
        }, [...[tabLabelContent, btnClose]]);
      });
      tracker.value;
      return createVNode("div", {
        "ref": el$,
        "class": [ns.e("nav-wrap"), ns.is("scrollable", !!scrollable.value), ns.is(rootTabs.props.tabPosition)]
      }, [scrollBtn, createVNode("div", {
        "class": ns.e("nav-scroll"),
        "ref": navScroll$
      }, [props.panes.length > 0 ? createVNode("div", {
        "class": [ns.e("nav"), ns.is(rootTabs.props.tabPosition), ns.is("stretch", props.stretch && ["top", "bottom"].includes(rootTabs.props.tabPosition))],
        "ref": nav$,
        "style": navStyle.value,
        "role": "tablist",
        "onKeydown": changeTab,
        "onWheel": onWheel
      }, [...[!props.type ? createVNode(TabBar, {
        "ref": tabBarRef,
        "tabs": [...props.panes],
        "tabRefs": tabRefsMap.value
      }, null) : null, tabs]]) : null])]);
    };
  }
});
const tabsProps = buildProps({
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number]
  },
  defaultValue: {
    type: [String, Number]
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ["top", "right", "bottom", "left"],
    default: "top"
  },
  beforeLeave: {
    type: definePropType(Function),
    default: () => true
  },
  stretch: Boolean,
  tabindex: {
    type: [String, Number],
    default: 0
  }
});
const isPaneName = (value) => isString(value) || isNumber$1(value);
const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name) => isPaneName(name),
  tabClick: (pane, ev) => ev instanceof Event,
  tabChange: (name) => isPaneName(name),
  edit: (paneName, action) => ["remove", "add"].includes(action),
  tabRemove: (name) => isPaneName(name),
  tabAdd: () => true
};
const Tabs = defineComponent({
  name: "ElTabs",
  props: tabsProps,
  emits: tabsEmits,
  setup(props, {
    emit,
    slots,
    expose
  }) {
    var _a;
    const ns = useNamespace("tabs");
    const isVertical = computed(() => ["left", "right"].includes(props.tabPosition));
    const {
      children: panes,
      addChild: registerPane,
      removeChild: unregisterPane,
      ChildrenSorter: PanesSorter
    } = useOrderedChildren(getCurrentInstance(), "ElTabPane");
    const nav$ = ref();
    const currentName = ref((_a = isUndefined$1(props.modelValue) ? props.defaultValue : props.modelValue) != null ? _a : "0");
    const setCurrentName = async (value, trigger = false) => {
      var _a2, _b, _c, _d;
      if (currentName.value === value || isUndefined$1(value))
        return;
      try {
        let canLeave;
        if (props.beforeLeave) {
          const result = props.beforeLeave(value, currentName.value);
          canLeave = result instanceof Promise ? await result : result;
        } else {
          canLeave = true;
        }
        if (canLeave !== false) {
          const isFocusInsidePane = (_a2 = panes.value.find((item) => item.paneName === currentName.value)) == null ? void 0 : _a2.isFocusInsidePane();
          currentName.value = value;
          if (trigger) {
            emit(UPDATE_MODEL_EVENT, value);
            emit("tabChange", value);
          }
          (_c = (_b = nav$.value) == null ? void 0 : _b.removeFocus) == null ? void 0 : _c.call(_b);
          if (isFocusInsidePane) {
            (_d = nav$.value) == null ? void 0 : _d.focusActiveTab();
          }
        }
      } catch (e) {
      }
    };
    const handleTabClick = (tab, tabName, event) => {
      if (tab.props.disabled)
        return;
      emit("tabClick", tab, event);
      setCurrentName(tabName, true);
    };
    const handleTabRemove = (pane, ev) => {
      if (pane.props.disabled || isUndefined$1(pane.props.name))
        return;
      ev.stopPropagation();
      emit("edit", pane.props.name, "remove");
      emit("tabRemove", pane.props.name);
    };
    const handleTabAdd = () => {
      emit("edit", void 0, "add");
      emit("tabAdd");
    };
    const handleKeydown = (event) => {
      const code = getEventCode(event);
      if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter].includes(code))
        handleTabAdd();
    };
    const swapChildren = (vnode) => {
      const actualFirstChild = vnode.el.firstChild;
      const firstChild = ["bottom", "right"].includes(props.tabPosition) ? vnode.children[0].el : vnode.children[1].el;
      if (actualFirstChild !== firstChild) {
        actualFirstChild.before(firstChild);
      }
    };
    watch(() => props.modelValue, (modelValue) => setCurrentName(modelValue));
    watch(currentName, async () => {
      var _a2;
      await nextTick();
      (_a2 = nav$.value) == null ? void 0 : _a2.scrollToActiveTab();
    });
    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane,
      unregisterPane,
      nav$
    });
    expose({
      currentName,
      get tabNavRef() {
        return omit(nav$.value, ["scheduleRender"]);
      }
    });
    return () => {
      const addSlot = slots["add-icon"];
      const newButton = props.editable || props.addable ? createVNode("div", {
        "class": [ns.e("new-tab"), isVertical.value && ns.e("new-tab-vertical")],
        "tabindex": props.tabindex,
        "onClick": handleTabAdd,
        "onKeydown": handleKeydown
      }, [addSlot ? renderSlot(slots, "add-icon") : createVNode(ElIcon, {
        "class": ns.is("icon-plus")
      }, {
        default: () => [createVNode(plus_default, null, null)]
      })]) : null;
      const tabNav = () => createVNode(TabNav, {
        "ref": nav$,
        "currentName": currentName.value,
        "editable": props.editable,
        "type": props.type,
        "panes": panes.value,
        "stretch": props.stretch,
        "onTabClick": handleTabClick,
        "onTabRemove": handleTabRemove
      }, null);
      const header = createVNode("div", {
        "class": [ns.e("header"), isVertical.value && ns.e("header-vertical"), ns.is(props.tabPosition)]
      }, [createVNode(PanesSorter, null, {
        default: tabNav,
        $stable: true
      }), newButton]);
      const panels = createVNode("div", {
        "class": ns.e("content")
      }, [renderSlot(slots, "default")]);
      return createVNode("div", {
        "class": [ns.b(), ns.m(props.tabPosition), {
          [ns.m("card")]: props.type === "card",
          [ns.m("border-card")]: props.type === "border-card"
        }],
        "onVnodeMounted": swapChildren,
        "onVnodeUpdated": swapChildren
      }, [panels, header]);
    };
  }
});
const tabPaneProps = buildProps({
  label: {
    type: String,
    default: ""
  },
  name: {
    type: [String, Number]
  },
  closable: {
    type: Boolean,
    default: void 0
  },
  disabled: Boolean,
  lazy: Boolean
});
const _hoisted_1 = ["id", "aria-hidden", "aria-labelledby"];
const COMPONENT_NAME = "ElTabPane";
const _sfc_main = defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "tab-pane",
  props: tabPaneProps,
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const slots = useSlots();
    const tabsRoot = inject(tabsRootContextKey);
    if (!tabsRoot)
      throwError(COMPONENT_NAME, "usage: <el-tabs><el-tab-pane /></el-tabs/>");
    const ns = useNamespace("tab-pane");
    const paneRef = ref();
    const index = ref();
    const isClosable = computed(() => {
      var _a;
      return (_a = props.closable) != null ? _a : tabsRoot.props.closable;
    });
    const active = computed(
      () => {
        var _a;
        return tabsRoot.currentName.value === ((_a = props.name) != null ? _a : index.value);
      }
    );
    const loaded = ref(active.value);
    const paneName = computed(() => {
      var _a;
      return (_a = props.name) != null ? _a : index.value;
    });
    const shouldBeRender = computed(
      () => !props.lazy || loaded.value || active.value
    );
    const isFocusInsidePane = () => {
      var _a;
      return (_a = paneRef.value) == null ? void 0 : _a.contains((void 0).activeElement);
    };
    watch(active, (val) => {
      if (val)
        loaded.value = true;
    });
    const pane = reactive({
      uid: instance.uid,
      getVnode: () => instance.vnode,
      slots,
      props,
      paneName,
      active,
      index,
      isClosable,
      isFocusInsidePane
    });
    tabsRoot.registerPane(pane);
    return (_ctx, _cache) => {
      return shouldBeRender.value ? withDirectives((openBlock(), createElementBlock("div", {
        key: 0,
        id: `pane-${paneName.value}`,
        ref_key: "paneRef",
        ref: paneRef,
        class: normalizeClass(unref(ns).b()),
        role: "tabpanel",
        "aria-hidden": !active.value,
        "aria-labelledby": `tab-${paneName.value}`
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1)), [
        [vShow, active.value]
      ]) : createCommentVNode("v-if", true);
    };
  }
});
var TabPane = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tabs/src/tab-pane.vue"]]);
const ElTabs = withInstall(Tabs, {
  TabPane
});
const ElTabPane = withNoopInstall(TabPane);

export { AUTO_ALIGNMENT as A, BACKWARD as B, CENTERED_ALIGNMENT as C, DEFAULT_DYNAMIC_LIST_ITEM_SIZE as D, ElTabs as E, FORWARD as F, HORIZONTAL as H, ITEM_RENDER_EVT as I, LTR as L, RTL as R, ScrollbarDirKey as S, VERTICAL as V, ElTabPane as a, SCROLLBAR_MIN_SIZE as b, SCROLL_EVT as c, END_ALIGNMENT as d, START_ALIGNMENT as e, SMART_ALIGNMENT as f, RTL_OFFSET_POS_ASC as g, RTL_OFFSET_NAG as h, RTL_OFFSET_POS_DESC as i, tabNavEmits as j, tabNavProps as k, tabPaneProps as l, tabsEmits as m, tabsProps as n, tabsRootContextKey as o, tabBarProps as t, useWheel as u };
//# sourceMappingURL=index-DghwLlHw.mjs.map
