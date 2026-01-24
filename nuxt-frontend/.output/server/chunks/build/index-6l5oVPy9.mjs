import { defineComponent, computed, unref, withDirectives, createElementBlock, openBlock, normalizeStyle, normalizeClass, createCommentVNode, renderSlot, vShow, withModifiers, createBlock, createElementVNode, createVNode, Transition, withCtx, Fragment, renderList, toDisplayString, inject, getCurrentInstance, ref, reactive, useSlots, watch, shallowRef, provide, isVNode } from 'vue';
import { B as withInstall, C as withNoopInstall, w as _export_sfc$1, q as buildProps, x as useNamespace, y as useLocale, E as ElIcon, z as arrow_left_default, f as arrow_right_default, r as isNumber$1, A as isUndefined$1 } from './server.mjs';
import { throttle } from 'lodash-unified';
import { u as useOrderedChildren } from './index-BrFCEoKQ.mjs';
import { isString } from '@vue/shared';
import { C as CHANGE_EVENT } from './event-BZTOGHfp.mjs';
import { f as flattedChildren } from './vnode-D0IHQw_9.mjs';

const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: String,
    default: ""
  },
  trigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3e3
  },
  indicatorPosition: {
    type: String,
    values: ["", "none", "outside"],
    default: ""
  },
  arrow: {
    type: String,
    values: ["always", "hover", "never"],
    default: "hover"
  },
  type: {
    type: String,
    values: ["", "card"],
    default: ""
  },
  cardScale: {
    type: Number,
    default: 0.83
  },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  motionBlur: Boolean
});
const carouselEmits = {
  change: (current, prev) => [current, prev].every(isNumber$1)
};
const carouselContextKey = /* @__PURE__ */ Symbol("carouselContextKey");
const CAROUSEL_ITEM_NAME = "ElCarouselItem";
const THROTTLE_TIME = 300;
const useCarousel = (props, emit, componentName) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem,
    ChildrenSorter: ItemsSorter
  } = useOrderedChildren(
    getCurrentInstance(),
    CAROUSEL_ITEM_NAME
  );
  const slots = useSlots();
  const activeIndex = ref(-1);
  const timer = ref(null);
  const hover = ref(false);
  const root = ref();
  const containerHeight = ref(0);
  const isItemsTwoLength = ref(true);
  const arrowDisplay = computed(
    () => props.arrow !== "never" && !unref(isVertical)
  );
  const hasLabel = computed(() => {
    return items.value.some((item) => item.props.label.toString().length > 0);
  });
  const isCardType = computed(() => props.type === "card");
  const isVertical = computed(() => props.direction === "vertical");
  const containerStyle = computed(() => {
    if (props.height !== "auto") {
      return {
        height: props.height
      };
    }
    return {
      height: `${containerHeight.value}px`,
      overflow: "hidden"
    };
  });
  const throttledArrowClick = throttle(
    (index) => {
      setActiveItem(index);
    },
    THROTTLE_TIME,
    { trailing: true }
  );
  const throttledIndicatorHover = throttle((index) => {
    handleIndicatorHover(index);
  }, THROTTLE_TIME);
  const isTwoLengthShow = (index) => {
    if (!isItemsTwoLength.value)
      return true;
    return activeIndex.value <= 1 ? index <= 1 : index > 1;
  };
  function pauseTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
  function startTimer() {
    if (props.interval <= 0 || !props.autoplay || timer.value)
      return;
    timer.value = setInterval(() => playSlides(), props.interval);
  }
  const playSlides = () => {
    if (activeIndex.value < items.value.length - 1) {
      activeIndex.value = activeIndex.value + 1;
    } else if (props.loop) {
      activeIndex.value = 0;
    }
  };
  function setActiveItem(index) {
    if (isString(index)) {
      const filteredItems = items.value.filter(
        (item) => item.props.name === index
      );
      if (filteredItems.length > 0) {
        index = items.value.indexOf(filteredItems[0]);
      }
    }
    index = Number(index);
    if (Number.isNaN(index) || index !== Math.floor(index)) {
      return;
    }
    const itemCount = items.value.length;
    const oldIndex = activeIndex.value;
    if (index < 0) {
      activeIndex.value = props.loop ? itemCount - 1 : 0;
    } else if (index >= itemCount) {
      activeIndex.value = props.loop ? 0 : itemCount - 1;
    } else {
      activeIndex.value = index;
    }
    if (oldIndex === activeIndex.value) {
      resetItemPosition(oldIndex);
    }
    resetTimer();
  }
  function resetItemPosition(oldIndex) {
    items.value.forEach((item, index) => {
      item.translateItem(index, activeIndex.value, oldIndex);
    });
  }
  function itemInStage(item, index) {
    var _a, _b, _c, _d;
    const _items = unref(items);
    const itemCount = _items.length;
    if (itemCount === 0 || !item.states.inStage)
      return false;
    const nextItemIndex = index + 1;
    const prevItemIndex = index - 1;
    const lastItemIndex = itemCount - 1;
    const isLastItemActive = _items[lastItemIndex].states.active;
    const isFirstItemActive = _items[0].states.active;
    const isNextItemActive = (_b = (_a = _items[nextItemIndex]) == null ? void 0 : _a.states) == null ? void 0 : _b.active;
    const isPrevItemActive = (_d = (_c = _items[prevItemIndex]) == null ? void 0 : _c.states) == null ? void 0 : _d.active;
    if (index === lastItemIndex && isFirstItemActive || isNextItemActive) {
      return "left";
    } else if (index === 0 && isLastItemActive || isPrevItemActive) {
      return "right";
    }
    return false;
  }
  function handleMouseEnter() {
    hover.value = true;
    if (props.pauseOnHover) {
      pauseTimer();
    }
  }
  function handleMouseLeave() {
    hover.value = false;
    startTimer();
  }
  function handleButtonEnter(arrow) {
    if (unref(isVertical))
      return;
    items.value.forEach((item, index) => {
      if (arrow === itemInStage(item, index)) {
        item.states.hover = true;
      }
    });
  }
  function handleButtonLeave() {
    if (unref(isVertical))
      return;
    items.value.forEach((item) => {
      item.states.hover = false;
    });
  }
  function handleIndicatorClick(index) {
    activeIndex.value = index;
  }
  function handleIndicatorHover(index) {
    if (props.trigger === "hover" && index !== activeIndex.value) {
      activeIndex.value = index;
    }
  }
  function prev() {
    setActiveItem(activeIndex.value - 1);
  }
  function next() {
    setActiveItem(activeIndex.value + 1);
  }
  function resetTimer() {
    pauseTimer();
    if (!props.pauseOnHover)
      startTimer();
  }
  function setContainerHeight(height) {
    if (props.height !== "auto")
      return;
    containerHeight.value = height;
  }
  function PlaceholderItem() {
    var _a;
    const defaultSlots = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (!defaultSlots)
      return null;
    const flatSlots = flattedChildren(defaultSlots);
    const normalizeSlots = flatSlots.filter((slot) => {
      return isVNode(slot) && slot.type.name === CAROUSEL_ITEM_NAME;
    });
    if ((normalizeSlots == null ? void 0 : normalizeSlots.length) === 2 && props.loop && !isCardType.value) {
      isItemsTwoLength.value = true;
      return normalizeSlots;
    }
    isItemsTwoLength.value = false;
    return null;
  }
  watch(
    () => activeIndex.value,
    (current, prev2) => {
      resetItemPosition(prev2);
      if (isItemsTwoLength.value) {
        current = current % 2;
        prev2 = prev2 % 2;
      }
      if (prev2 > -1) {
        emit(CHANGE_EVENT, current, prev2);
      }
    }
  );
  const exposeActiveIndex = computed({
    get: () => {
      return isItemsTwoLength.value ? activeIndex.value % 2 : activeIndex.value;
    },
    set: (value) => activeIndex.value = value
  });
  watch(
    () => props.autoplay,
    (autoplay) => {
      autoplay ? startTimer() : pauseTimer();
    }
  );
  watch(
    () => props.loop,
    () => {
      setActiveItem(activeIndex.value);
    }
  );
  watch(
    () => props.interval,
    () => {
      resetTimer();
    }
  );
  shallowRef();
  provide(carouselContextKey, {
    root,
    isCardType,
    isVertical,
    items,
    loop: props.loop,
    cardScale: props.cardScale,
    addItem,
    removeItem,
    setActiveItem,
    setContainerHeight
  });
  return {
    root,
    activeIndex,
    exposeActiveIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    ItemsSorter,
    throttledArrowClick,
    throttledIndicatorHover
  };
};
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["onMouseenter", "onClick"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  style: { "display": "none" }
};
const COMPONENT_NAME = "ElCarousel";
const _sfc_main$1 = defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "carousel",
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      root,
      activeIndex,
      exposeActiveIndex,
      arrowDisplay,
      hasLabel,
      hover,
      isCardType,
      items,
      isVertical,
      containerStyle,
      handleButtonEnter,
      handleButtonLeave,
      handleIndicatorClick,
      handleMouseEnter,
      handleMouseLeave,
      setActiveItem,
      prev,
      next,
      PlaceholderItem,
      isTwoLengthShow,
      ItemsSorter,
      throttledArrowClick,
      throttledIndicatorHover
    } = useCarousel(props, emit);
    const ns = useNamespace("carousel");
    const { t } = useLocale();
    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m("card"));
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
      if (unref(hasLabel)) {
        classes.push(ns.em("indicators", "labels"));
      }
      if (props.indicatorPosition === "outside") {
        classes.push(ns.em("indicators", "outside"));
      }
      if (unref(isVertical)) {
        classes.push(ns.em("indicators", "right"));
      }
      return classes;
    });
    function handleTransitionStart(e) {
      if (!props.motionBlur)
        return;
      const kls = unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
      e.currentTarget.classList.add(kls);
    }
    function handleTransitionEnd(e) {
      if (!props.motionBlur)
        return;
      const kls = unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
      e.currentTarget.classList.remove(kls);
    }
    __expose({
      activeIndex: exposeActiveIndex,
      setActiveItem,
      prev,
      next
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: normalizeClass(carouselClasses.value),
          onMouseenter: _cache[6] || (_cache[6] = withModifiers(
            (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args),
            ["stop"]
          )),
          onMouseleave: _cache[7] || (_cache[7] = withModifiers(
            (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args),
            ["stop"]
          ))
        },
        [
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: "carousel-arrow-left",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "left")]),
                "aria-label": unref(t)("el.carousel.leftArrow"),
                onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(handleButtonEnter)("left")),
                onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) - 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 42, _hoisted_1), [
                [vShow, (_ctx.arrow === "always" || unref(hover)) && (_ctx.loop || unref(activeIndex) > 0)]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 1,
            name: "carousel-arrow-right",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "right")]),
                "aria-label": unref(t)("el.carousel.rightArrow"),
                onMouseenter: _cache[3] || (_cache[3] = ($event) => unref(handleButtonEnter)("right")),
                onMouseleave: _cache[4] || (_cache[4] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[5] || (_cache[5] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) + 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 42, _hoisted_2), [
                [
                  vShow,
                  (_ctx.arrow === "always" || unref(hover)) && (_ctx.loop || unref(activeIndex) < unref(items).length - 1)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("container")),
              style: normalizeStyle(unref(containerStyle)),
              onTransitionstart: handleTransitionStart,
              onTransitionend: handleTransitionEnd
            },
            [
              createVNode(unref(PlaceholderItem)),
              renderSlot(_ctx.$slots, "default")
            ],
            38
          ),
          createVNode(unref(ItemsSorter), null, {
            default: withCtx(() => [
              _ctx.indicatorPosition !== "none" ? (openBlock(), createElementBlock(
                "ul",
                {
                  key: 0,
                  class: normalizeClass(indicatorsClasses.value)
                },
                [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(items), (item, index) => {
                      return withDirectives((openBlock(), createElementBlock("li", {
                        key: index,
                        class: normalizeClass([
                          unref(ns).e("indicator"),
                          unref(ns).em("indicator", _ctx.direction),
                          unref(ns).is("active", index === unref(activeIndex))
                        ]),
                        onMouseenter: ($event) => unref(throttledIndicatorHover)(index),
                        onClick: withModifiers(($event) => unref(handleIndicatorClick)(index), ["stop"])
                      }, [
                        createElementVNode("button", {
                          class: normalizeClass(unref(ns).e("button")),
                          "aria-label": unref(t)("el.carousel.indicator", { index: index + 1 })
                        }, [
                          unref(hasLabel) ? (openBlock(), createElementBlock(
                            "span",
                            _hoisted_5,
                            toDisplayString(item.props.label),
                            1
                          )) : createCommentVNode("v-if", true)
                        ], 10, _hoisted_4)
                      ], 42, _hoisted_3)), [
                        [vShow, unref(isTwoLengthShow)(index)]
                      ]);
                    }),
                    128
                  ))
                ],
                2
              )) : createCommentVNode("v-if", true)
            ]),
            _: 1
          }),
          _ctx.motionBlur ? (openBlock(), createElementBlock("svg", _hoisted_6, [..._cache[8] || (_cache[8] = [
            createElementVNode(
              "defs",
              null,
              [
                createElementVNode("filter", { id: "elCarouselHorizontal" }, [
                  createElementVNode("feGaussianBlur", {
                    in: "SourceGraphic",
                    stdDeviation: "12,0"
                  })
                ]),
                createElementVNode("filter", { id: "elCarouselVertical" }, [
                  createElementVNode("feGaussianBlur", {
                    in: "SourceGraphic",
                    stdDeviation: "0,10"
                  })
                ])
              ],
              -1
            )
          ])])) : createCommentVNode("v-if", true)
        ],
        34
      );
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);
const carouselItemProps = buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});
const useCarouselItem = (props) => {
  const carouselContext = inject(carouselContextKey);
  const instance = getCurrentInstance();
  const carouselItemRef = ref();
  const hover = ref(false);
  const translate = ref(0);
  const scale = ref(1);
  const active = ref(false);
  const ready = ref(false);
  const inStage = ref(false);
  const animating = ref(false);
  const { isCardType, isVertical, cardScale } = carouselContext;
  function processIndex(index, activeIndex, length) {
    const lastItemIndex = length - 1;
    const prevItemIndex = activeIndex - 1;
    const nextItemIndex = activeIndex + 1;
    const halfItemIndex = length / 2;
    if (activeIndex === 0 && index === lastItemIndex) {
      return -1;
    } else if (activeIndex === lastItemIndex && index === 0) {
      return length;
    } else if (index < prevItemIndex && activeIndex - index >= halfItemIndex) {
      return length + 1;
    } else if (index > nextItemIndex && index - activeIndex >= halfItemIndex) {
      return -2;
    }
    return index;
  }
  function calcCardTranslate(index, activeIndex) {
    var _a, _b;
    const parentWidth = unref(isVertical) ? ((_a = carouselContext.root.value) == null ? void 0 : _a.offsetHeight) || 0 : ((_b = carouselContext.root.value) == null ? void 0 : _b.offsetWidth) || 0;
    if (inStage.value) {
      return parentWidth * ((2 - cardScale) * (index - activeIndex) + 1) / 4;
    } else if (index < activeIndex) {
      return -(1 + cardScale) * parentWidth / 4;
    } else {
      return (3 + cardScale) * parentWidth / 4;
    }
  }
  function calcTranslate(index, activeIndex, isVertical2) {
    const rootEl = carouselContext.root.value;
    if (!rootEl)
      return 0;
    const distance = (isVertical2 ? rootEl.offsetHeight : rootEl.offsetWidth) || 0;
    return distance * (index - activeIndex);
  }
  const translateItem = (index, activeIndex, oldIndex) => {
    var _a;
    const _isCardType = unref(isCardType);
    const carouselItemLength = (_a = carouselContext.items.value.length) != null ? _a : Number.NaN;
    const isActive = index === activeIndex;
    if (!_isCardType && !isUndefined$1(oldIndex)) {
      animating.value = isActive || index === oldIndex;
    }
    if (!isActive && carouselItemLength > 2 && carouselContext.loop) {
      index = processIndex(index, activeIndex, carouselItemLength);
    }
    const _isVertical = unref(isVertical);
    active.value = isActive;
    if (_isCardType) {
      inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1;
      translate.value = calcCardTranslate(index, activeIndex);
      scale.value = unref(active) ? 1 : cardScale;
    } else {
      translate.value = calcTranslate(index, activeIndex, _isVertical);
    }
    ready.value = true;
    if (isActive && carouselItemRef.value) {
      carouselContext.setContainerHeight(carouselItemRef.value.offsetHeight);
    }
  };
  function handleItemClick() {
    if (carouselContext && unref(isCardType)) {
      const index = carouselContext.items.value.findIndex(
        ({ uid }) => uid === instance.uid
      );
      carouselContext.setActiveItem(index);
    }
  }
  const carouselItemContext = {
    props,
    states: reactive({
      hover,
      translate,
      scale,
      active,
      ready,
      inStage,
      animating
    }),
    uid: instance.uid,
    getVnode: () => instance.vnode,
    translateItem
  };
  carouselContext.addItem(carouselItemContext);
  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    isVertical,
    translate,
    isCardType,
    scale,
    ready,
    handleItemClick
  };
};
const _sfc_main = defineComponent({
  ...{
    name: CAROUSEL_ITEM_NAME
  },
  __name: "carousel-item",
  props: carouselItemProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("carousel");
    const {
      carouselItemRef,
      active,
      animating,
      hover,
      inStage,
      isVertical,
      translate,
      isCardType,
      scale,
      ready,
      handleItemClick
    } = useCarouselItem(props);
    const itemKls = computed(() => [
      ns.e("item"),
      ns.is("active", active.value),
      ns.is("in-stage", inStage.value),
      ns.is("hover", hover.value),
      ns.is("animating", animating.value),
      {
        [ns.em("item", "card")]: isCardType.value,
        [ns.em("item", "card-vertical")]: isCardType.value && isVertical.value
      }
    ]);
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock(
        "div",
        {
          ref_key: "carouselItemRef",
          ref: carouselItemRef,
          class: normalizeClass(itemKls.value),
          style: normalizeStyle(itemStyle.value),
          onClick: _cache[0] || (_cache[0] = (...args) => unref(handleItemClick) && unref(handleItemClick)(...args))
        },
        [
          unref(isCardType) ? withDirectives((openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("mask"))
            },
            null,
            2
          )), [
            [vShow, !unref(active)]
          ]) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default")
        ],
        6
      )), [
        [vShow, unref(ready)]
      ]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);
const ElCarousel = withInstall(Carousel, {
  CarouselItem
});
const ElCarouselItem = withNoopInstall(CarouselItem);

export { CAROUSEL_ITEM_NAME as C, ElCarousel as E, ElCarouselItem as a, carouselEmits as b, carouselContextKey as c, carouselItemProps as d, carouselProps as e };
//# sourceMappingURL=index-6l5oVPy9.mjs.map
