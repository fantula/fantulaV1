import { w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { u as useAriaProps } from './index-DqrhOzxH.mjs';
import { g as useNamespace, i as isNumber$1, f as debugWarn, y as throwError, m as isElement } from './server.mjs';
import { defineComponent, ref, computed, watch, nextTick, provide, reactive, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, normalizeStyle, createBlock, resolveDynamicComponent, withCtx, renderSlot, createCommentVNode, inject, Fragment, createVNode, toRef, Transition, withDirectives, withModifiers, vShow } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { isClient, useResizeObserver, useEventListener } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import { a as addUnit } from './index-jl2vZbkg.mjs';
import { isObject, isArray } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';

const scrollbarProps = buildProps({
  /**
   * @description trigger distance(px)
   */
  distance: {
    type: Number,
    default: 0
  },
  /**
   * @description height of scrollbar
   */
  height: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description max height of scrollbar
   */
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description whether to use the native scrollbar
   */
  native: Boolean,
  /**
   * @description style of wrap
   */
  wrapStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  /**
   * @description class of view
   */
  viewClass: {
    type: [String, Array],
    default: ""
  },
  /**
   * @description style of view
   */
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize: Boolean,
  // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description element tag of the view
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description always show
   */
  always: Boolean,
  /**
   * @description minimum size of scrollbar
   */
  minSize: {
    type: Number,
    default: 20
  },
  /**
   * @description Wrap tabindex
   */
  tabindex: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @description id of view
   */
  id: String,
  /**
   * @description role of view
   */
  role: String,
  ...useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
  "end-reached": (direction) => ["left", "right", "top", "bottom"].includes(direction),
  scroll: ({
    scrollTop,
    scrollLeft
  }) => [scrollTop, scrollLeft].every(isNumber$1)
};
const barProps = buildProps({
  always: {
    type: Boolean,
    default: true
  },
  minSize: {
    type: Number,
    required: true
  }
});
const GAP = 4;
const BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
};
const renderThumbStyle = ({
  move,
  size,
  bar
}) => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`
});
const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
});
const scrollbarContextKey = /* @__PURE__ */ Symbol(
  "scrollbarContextKey"
);
const COMPONENT_NAME$1 = "Thumb";
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "thumb",
  props: thumbProps,
  setup(__props) {
    const props = __props;
    const scrollbar = inject(scrollbarContextKey);
    const ns = useNamespace("scrollbar");
    if (!scrollbar) throwError(COMPONENT_NAME$1, "can not inject scrollbar context");
    const instance = ref();
    const thumb = ref();
    const thumbState = ref({});
    const visible = ref(false);
    let cursorDown = false;
    let cursorLeave = false;
    let baseScrollHeight = 0;
    let baseScrollWidth = 0;
    let originalOnSelectStart = isClient ? (void 0).onselectstart : null;
    const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
    const thumbStyle = computed(
      () => renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value
      })
    );
    const offsetRatio = computed(
      () => (
        // offsetRatioX = original width of thumb / current width of thumb / ratioX
        // offsetRatioY = original height of thumb / current height of thumb / ratioY
        // instance height = wrap height - GAP
        instance.value[bar.value.offset] ** 2 / scrollbar.wrapElement[bar.value.scrollSize] / props.ratio / thumb.value[bar.value.offset]
      )
    );
    const clickThumbHandler = (e) => {
      var _a;
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) return;
      (_a = (void 0).getSelection()) == null ? void 0 : _a.removeAllRanges();
      startDrag(e);
      const el = e.currentTarget;
      if (!el) return;
      thumbState.value[bar.value.axis] = el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction]);
    };
    const clickTrackHandler = (e) => {
      if (!thumb.value || !instance.value || !scrollbar.wrapElement) return;
      const offset = Math.abs(
        e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]
      );
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * scrollbar.wrapElement[bar.value.scrollSize] / 100;
    };
    const startDrag = (e) => {
      e.stopImmediatePropagation();
      cursorDown = true;
      baseScrollHeight = scrollbar.wrapElement.scrollHeight;
      baseScrollWidth = scrollbar.wrapElement.scrollWidth;
      (void 0).addEventListener("mousemove", mouseMoveDocumentHandler);
      (void 0).addEventListener("mouseup", mouseUpDocumentHandler);
      originalOnSelectStart = (void 0).onselectstart;
      (void 0).onselectstart = () => false;
    };
    const mouseMoveDocumentHandler = (e) => {
      if (!instance.value || !thumb.value) return;
      if (cursorDown === false) return;
      const prevPage = thumbState.value[bar.value.axis];
      if (!prevPage) return;
      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * 100 * offsetRatio.value / instance.value[bar.value.offset];
      if (bar.value.scroll === "scrollLeft") {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollWidth / 100;
      } else {
        scrollbar.wrapElement[bar.value.scroll] = thumbPositionPercentage * baseScrollHeight / 100;
      }
    };
    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      thumbState.value[bar.value.axis] = 0;
      (void 0).removeEventListener("mousemove", mouseMoveDocumentHandler);
      (void 0).removeEventListener("mouseup", mouseUpDocumentHandler);
      restoreOnselectstart();
      if (cursorLeave) visible.value = false;
    };
    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible.value = !!props.size;
    };
    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible.value = cursorDown;
    };
    const restoreOnselectstart = () => {
      if ((void 0).onselectstart !== originalOnSelectStart)
        (void 0).onselectstart = originalOnSelectStart;
    };
    useEventListener(
      toRef(scrollbar, "scrollbarElement"),
      "mousemove",
      mouseMoveScrollbarHandler
    );
    useEventListener(
      toRef(scrollbar, "scrollbarElement"),
      "mouseleave",
      mouseLeaveScrollbarHandler
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        persisted: ""
      }, {
        default: withCtx(() => [
          withDirectives(createElementVNode(
            "div",
            {
              ref_key: "instance",
              ref: instance,
              class: normalizeClass([unref(ns).e("bar"), unref(ns).is(bar.value.key)]),
              onMousedown: clickTrackHandler,
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              createElementVNode(
                "div",
                {
                  ref_key: "thumb",
                  ref: thumb,
                  class: normalizeClass(unref(ns).e("thumb")),
                  style: normalizeStyle(thumbStyle.value),
                  onMousedown: clickThumbHandler
                },
                null,
                38
                /* CLASS, STYLE, NEED_HYDRATION */
              )
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ), [
            [vShow, __props.always || visible.value]
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["name"]);
    };
  }
});
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "bar",
  props: barProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const scrollbar = inject(scrollbarContextKey);
    const moveX = ref(0);
    const moveY = ref(0);
    const sizeWidth = ref("");
    const sizeHeight = ref("");
    const ratioY = ref(1);
    const ratioX = ref(1);
    const handleScroll = (wrap) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP;
        const offsetWidth = wrap.offsetWidth - GAP;
        moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
        moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
      }
    };
    const update = () => {
      const wrap = scrollbar == null ? void 0 : scrollbar.wrapElement;
      if (!wrap) return;
      const offsetHeight = wrap.offsetHeight - GAP;
      const offsetWidth = wrap.offsetWidth - GAP;
      const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);
      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
    };
    __expose({
      handleScroll,
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          createVNode(_sfc_main$2, {
            move: moveX.value,
            ratio: ratioX.value,
            size: sizeWidth.value,
            always: __props.always
          }, null, 8, ["move", "ratio", "size", "always"]),
          createVNode(_sfc_main$2, {
            move: moveY.value,
            ratio: ratioY.value,
            size: sizeHeight.value,
            vertical: "",
            always: __props.always
          }, null, 8, ["move", "ratio", "size", "always"])
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});
const _hoisted_1 = ["tabindex"];
const COMPONENT_NAME = "ElScrollbar";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "scrollbar",
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("scrollbar");
    let stopResizeObserver = void 0;
    let stopWrapResizeObserver = void 0;
    let stopResizeListener = void 0;
    let wrapScrollTop = 0;
    let wrapScrollLeft = 0;
    let direction = "";
    const distanceScrollState = {
      bottom: false,
      top: false,
      right: false,
      left: false
    };
    const scrollbarRef = ref();
    const wrapRef = ref();
    const resizeRef = ref();
    const barRef = ref();
    const wrapStyle = computed(() => {
      const style = {};
      const height = addUnit(props.height);
      const maxHeight = addUnit(props.maxHeight);
      if (height) style.height = height;
      if (maxHeight) style.maxHeight = maxHeight;
      return [props.wrapStyle, style];
    });
    const wrapKls = computed(() => {
      return [
        props.wrapClass,
        ns.e("wrap"),
        { [ns.em("wrap", "hidden-default")]: !props.native }
      ];
    });
    const resizeKls = computed(() => {
      return [ns.e("view"), props.viewClass];
    });
    const shouldSkipDirection = (direction2) => {
      var _a;
      return (_a = distanceScrollState[direction2]) != null ? _a : false;
    };
    const DIRECTION_PAIRS = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    };
    const updateTriggerStatus = (arrivedStates) => {
      const oppositeDirection = DIRECTION_PAIRS[direction];
      if (!oppositeDirection) return;
      const arrived = arrivedStates[direction];
      const oppositeArrived = arrivedStates[oppositeDirection];
      if (arrived && !distanceScrollState[direction]) {
        distanceScrollState[direction] = true;
      }
      if (!oppositeArrived && distanceScrollState[oppositeDirection]) {
        distanceScrollState[oppositeDirection] = false;
      }
    };
    const handleScroll = () => {
      var _a;
      if (wrapRef.value) {
        (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
        const prevTop = wrapScrollTop;
        const prevLeft = wrapScrollLeft;
        wrapScrollTop = wrapRef.value.scrollTop;
        wrapScrollLeft = wrapRef.value.scrollLeft;
        const arrivedStates = {
          bottom: wrapScrollTop + wrapRef.value.clientHeight >= wrapRef.value.scrollHeight - props.distance,
          top: wrapScrollTop <= props.distance && prevTop !== 0,
          right: wrapScrollLeft + wrapRef.value.clientWidth >= wrapRef.value.scrollWidth - props.distance && prevLeft !== wrapScrollLeft,
          left: wrapScrollLeft <= props.distance && prevLeft !== 0
        };
        emit("scroll", {
          scrollTop: wrapScrollTop,
          scrollLeft: wrapScrollLeft
        });
        if (prevTop !== wrapScrollTop) {
          direction = wrapScrollTop > prevTop ? "bottom" : "top";
        }
        if (prevLeft !== wrapScrollLeft) {
          direction = wrapScrollLeft > prevLeft ? "right" : "left";
        }
        if (props.distance > 0) {
          if (shouldSkipDirection(direction)) {
            return;
          }
          updateTriggerStatus(arrivedStates);
        }
        if (arrivedStates[direction]) emit("end-reached", direction);
      }
    };
    function scrollTo(arg1, arg2) {
      if (isObject(arg1)) {
        wrapRef.value.scrollTo(arg1);
      } else if (isNumber$1(arg1) && isNumber$1(arg2)) {
        wrapRef.value.scrollTo(arg1, arg2);
      }
    }
    const setScrollTop = (value) => {
      if (!isNumber$1(value)) {
        debugWarn(COMPONENT_NAME, "value must be a number");
        return;
      }
      wrapRef.value.scrollTop = value;
    };
    const setScrollLeft = (value) => {
      if (!isNumber$1(value)) {
        debugWarn(COMPONENT_NAME, "value must be a number");
        return;
      }
      wrapRef.value.scrollLeft = value;
    };
    const update = () => {
      var _a;
      (_a = barRef.value) == null ? void 0 : _a.update();
      distanceScrollState[direction] = false;
    };
    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver == null ? void 0 : stopResizeObserver();
          stopWrapResizeObserver == null ? void 0 : stopWrapResizeObserver();
          stopResizeListener == null ? void 0 : stopResizeListener();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
          ({ stop: stopWrapResizeObserver } = useResizeObserver(wrapRef, update));
          stopResizeListener = useEventListener("resize", update);
        }
      },
      { immediate: true }
    );
    watch(
      () => [props.maxHeight, props.height],
      () => {
        if (!props.native)
          nextTick(() => {
            var _a;
            update();
            if (wrapRef.value) {
              (_a = barRef.value) == null ? void 0 : _a.handleScroll(wrapRef.value);
            }
          });
      }
    );
    provide(
      scrollbarContextKey,
      reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef
      })
    );
    __expose({
      /** @description scrollbar wrap ref */
      wrapRef,
      /** @description update scrollbar state manually */
      update,
      /** @description scrolls to a particular set of coordinates */
      scrollTo,
      /** @description set distance to scroll top */
      setScrollTop,
      /** @description set distance to scroll left */
      setScrollLeft,
      /** @description handle scroll event */
      handleScroll
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "scrollbarRef",
          ref: scrollbarRef,
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode("div", {
            ref_key: "wrapRef",
            ref: wrapRef,
            class: normalizeClass(wrapKls.value),
            style: normalizeStyle(wrapStyle.value),
            tabindex: __props.tabindex,
            onScroll: handleScroll
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
              id: __props.id,
              ref_key: "resizeRef",
              ref: resizeRef,
              class: normalizeClass(resizeKls.value),
              style: normalizeStyle(__props.viewStyle),
              role: __props.role,
              "aria-label": __props.ariaLabel,
              "aria-orientation": __props.ariaOrientation
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["id", "class", "style", "role", "aria-label", "aria-orientation"]))
          ], 46, _hoisted_1),
          !__props.native ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            ref_key: "barRef",
            ref: barRef,
            always: __props.always,
            "min-size": __props.minSize
          }, null, 8, ["always", "min-size"])) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});
const ElScrollbar = withInstall(_sfc_main);
const nodeList = /* @__PURE__ */ new Map();
if (isClient) {
  let startClick;
  (void 0).addEventListener("mousedown", (e) => startClick = e);
  (void 0).addEventListener("mouseup", (e) => {
    if (startClick) {
      for (const handlers of nodeList.values()) {
        for (const { documentHandler } of handlers) {
          documentHandler(e, startClick);
        }
      }
      startClick = void 0;
    }
  });
}
function createDocumentHandler(el, binding) {
  let excludes = [];
  if (isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (isElement(binding.arg)) {
    excludes.push(binding.arg);
  }
  return function(mouseup, mousedown) {
    const popperRef = binding.instance.popperRef;
    const mouseUpTarget = mouseup.target;
    const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
    const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
      return;
    }
    binding.value(mouseup, mousedown);
  };
}
const ClickOutside = {
  beforeMount(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    const handlers = nodeList.get(el);
    const oldHandlerIndex = handlers.findIndex(
      (item) => item.bindingFn === binding.oldValue
    );
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    };
    if (oldHandlerIndex >= 0) {
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el) {
    nodeList.delete(el);
  }
};

export { BAR_MAP as B, ClickOutside as C, ElScrollbar as E, GAP as G, scrollbarContextKey as a, scrollbarProps as b, renderThumbStyle as r, scrollbarEmits as s, thumbProps as t };
//# sourceMappingURL=index-CmHlMPx0.mjs.map
