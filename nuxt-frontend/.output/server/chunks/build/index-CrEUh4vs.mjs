import { defineComponent, reactive, computed, toRefs, provide, openBlock, createElementBlock, unref, normalizeClass, createElementVNode, normalizeStyle, createVNode, createBlock, createCommentVNode, Fragment, renderList, withModifiers, shallowRef, ref, watch, withCtx, toDisplayString, h, nextTick, inject } from 'vue';
import { useEventListener } from '@vueuse/core';
import { E as ElInputNumber } from './index-C8Zv6czV.mjs';
import { placements } from '@popperjs/core';
import { w as withInstall, b as buildProps, c as definePropType } from './index-DuV_oMrC.mjs';
import { u as useAriaProps } from './index-C88l1uRA.mjs';
import { b as useLocale, a as useSizeProp } from './index-xMedQC9S.mjs';
import { g as useNamespace, i as isNumber$1, y as throwError, f as debugWarn } from './server.mjs';
import { isArray, isString } from '@vue/shared';
import { C as CHANGE_EVENT, I as INPUT_EVENT, U as UPDATE_MODEL_EVENT } from './event-BZTOGHfp.mjs';
import { E as ElTooltip } from './index-B8mpCVSS.mjs';
import { debounce, clamp } from 'lodash-unified';
import { g as getEventCode, E as EVENT_CODE } from './event-D3FEo2C5.mjs';
import { c as useFormItemInputId, b as useFormSize, a as useFormItem, u as useFormDisabled } from './use-form-item-VP6j78iG.mjs';

const sliderContextKey = /* @__PURE__ */ Symbol("sliderContextKey");
const sliderProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: definePropType([Number, Array]),
    default: 0
  },
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description minimum value
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * @description maximum value
   */
  max: {
    type: Number,
    default: 100
  },
  /**
   * @description step size
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * @description whether to display an input box, works when `range` is false
   */
  showInput: Boolean,
  /**
   * @description whether to display control buttons when `show-input` is true
   */
  showInputControls: {
    type: Boolean,
    default: true
  },
  /**
   * @description size of the slider wrapper, will not work in vertical mode
   */
  size: useSizeProp,
  /**
   * @description size of the input box, when set `size`, the default is the value of `size`
   */
  inputSize: useSizeProp,
  /**
   * @description whether to display breakpoints
   */
  showStops: Boolean,
  /**
   * @description whether to display tooltip value
   */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /**
   * @description format to display tooltip value
   */
  formatTooltip: {
    type: definePropType(Function),
    default: void 0
  },
  /**
   * @description whether Slider is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether to select a range
   */
  range: Boolean,
  /**
   * @description vertical mode
   */
  vertical: Boolean,
  /**
   * @description slider height, required in vertical mode
   */
  height: String,
  /**
   * @description when `range` is true, screen reader label for the start of the range
   */
  rangeStartLabel: {
    type: String,
    default: void 0
  },
  /**
   * @description when `range` is true, screen reader label for the end of the range
   */
  rangeEndLabel: {
    type: String,
    default: void 0
  },
  /**
   * @description format to display the `aria-valuenow` attribute for screen readers
   */
  formatValueText: {
    type: definePropType(Function),
    default: void 0
  },
  /**
   * @description custom class name for the tooltip
   */
  tooltipClass: {
    type: String,
    default: void 0
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String,
    values: placements,
    default: "top"
  },
  /**
   * @description marks, type of key must be `number` and must in closed interval `[min, max]`, each mark can custom style
   */
  marks: {
    type: definePropType(Object)
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description when slider tooltip inactive and `persistent` is `false` , popconfirm will be destroyed. `persistent` always be `false` when `show-tooltip ` is `false`
   */
  persistent: {
    type: Boolean,
    default: true
  },
  ...useAriaProps(["ariaLabel"])
});
const isValidValue = (value) => isNumber$1(value) || isArray(value) && value.every(isNumber$1);
const sliderEmits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue
};
const sliderButtonProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  },
  vertical: Boolean,
  tooltipClass: String,
  placement: {
    type: String,
    values: placements,
    default: "top"
  }
});
const sliderButtonEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isNumber$1(value)
};
const useTooltip = (props, formatTooltip, showTooltip) => {
  const tooltip = ref();
  const tooltipVisible = ref(false);
  const enableFormat = computed(() => {
    return formatTooltip.value instanceof Function;
  });
  const formatValue = computed(() => {
    return enableFormat.value && formatTooltip.value(props.modelValue) || props.modelValue;
  });
  const displayTooltip = debounce(() => {
    showTooltip.value && (tooltipVisible.value = true);
  }, 50);
  const hideTooltip = debounce(() => {
    showTooltip.value && (tooltipVisible.value = false);
  }, 50);
  return {
    tooltip,
    tooltipVisible,
    formatValue,
    displayTooltip,
    hideTooltip
  };
};
const useSliderButton = (props, initData, emit) => {
  const {
    disabled,
    min,
    max,
    step,
    showTooltip,
    persistent,
    precision,
    sliderSize,
    formatTooltip,
    emitChange,
    resetSize,
    updateDragging
  } = inject(sliderContextKey);
  const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip } = useTooltip(props, formatTooltip, showTooltip);
  const button = ref();
  const currentPosition = computed(() => {
    return `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`;
  });
  const wrapperStyle = computed(() => {
    return props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value };
  });
  const handleMouseEnter = () => {
    initData.hovering = true;
    displayTooltip();
  };
  const handleMouseLeave = () => {
    initData.hovering = false;
    if (!initData.dragging) {
      hideTooltip();
    }
  };
  const onButtonDown = (event) => {
    if (disabled.value) return;
    event.preventDefault();
    onDragStart(event);
    (void 0).addEventListener("mousemove", onDragging);
    (void 0).addEventListener("touchmove", onDragging);
    (void 0).addEventListener("mouseup", onDragEnd);
    (void 0).addEventListener("touchend", onDragEnd);
    (void 0).addEventListener("contextmenu", onDragEnd);
    button.value.focus();
  };
  const incrementPosition = (amount) => {
    if (disabled.value) return;
    initData.newPosition = Number.parseFloat(currentPosition.value) + amount / (max.value - min.value) * 100;
    setPosition(initData.newPosition);
    emitChange();
  };
  const onLeftKeyDown = () => {
    incrementPosition(-step.value);
  };
  const onRightKeyDown = () => {
    incrementPosition(step.value);
  };
  const onPageDownKeyDown = () => {
    incrementPosition(-step.value * 4);
  };
  const onPageUpKeyDown = () => {
    incrementPosition(step.value * 4);
  };
  const onHomeKeyDown = () => {
    if (disabled.value) return;
    setPosition(0);
    emitChange();
  };
  const onEndKeyDown = () => {
    if (disabled.value) return;
    setPosition(100);
    emitChange();
  };
  const onKeyDown = (event) => {
    const code = getEventCode(event);
    let isPreventDefault = true;
    switch (code) {
      case EVENT_CODE.left:
      case EVENT_CODE.down:
        onLeftKeyDown();
        break;
      case EVENT_CODE.right:
      case EVENT_CODE.up:
        onRightKeyDown();
        break;
      case EVENT_CODE.home:
        onHomeKeyDown();
        break;
      case EVENT_CODE.end:
        onEndKeyDown();
        break;
      case EVENT_CODE.pageDown:
        onPageDownKeyDown();
        break;
      case EVENT_CODE.pageUp:
        onPageUpKeyDown();
        break;
      default:
        isPreventDefault = false;
        break;
    }
    isPreventDefault && event.preventDefault();
  };
  const getClientXY = (event) => {
    let clientX;
    let clientY;
    if (event.type.startsWith("touch")) {
      clientY = event.touches[0].clientY;
      clientX = event.touches[0].clientX;
    } else {
      clientY = event.clientY;
      clientX = event.clientX;
    }
    return {
      clientX,
      clientY
    };
  };
  const onDragStart = (event) => {
    initData.dragging = true;
    initData.isClick = true;
    const { clientX, clientY } = getClientXY(event);
    if (props.vertical) {
      initData.startY = clientY;
    } else {
      initData.startX = clientX;
    }
    initData.startPosition = Number.parseFloat(currentPosition.value);
    initData.newPosition = initData.startPosition;
  };
  const onDragging = (event) => {
    if (initData.dragging) {
      initData.isClick = false;
      displayTooltip();
      resetSize();
      let diff;
      const { clientX, clientY } = getClientXY(event);
      if (props.vertical) {
        initData.currentY = clientY;
        diff = (initData.startY - initData.currentY) / sliderSize.value * 100;
      } else {
        initData.currentX = clientX;
        diff = (initData.currentX - initData.startX) / sliderSize.value * 100;
      }
      initData.newPosition = initData.startPosition + diff;
      setPosition(initData.newPosition);
    }
  };
  const onDragEnd = () => {
    if (initData.dragging) {
      setTimeout(() => {
        initData.dragging = false;
        if (!initData.hovering) {
          hideTooltip();
        }
        if (!initData.isClick) {
          setPosition(initData.newPosition);
        }
        emitChange();
      }, 0);
      (void 0).removeEventListener("mousemove", onDragging);
      (void 0).removeEventListener("touchmove", onDragging);
      (void 0).removeEventListener("mouseup", onDragEnd);
      (void 0).removeEventListener("touchend", onDragEnd);
      (void 0).removeEventListener("contextmenu", onDragEnd);
    }
  };
  const setPosition = async (newPosition) => {
    if (newPosition === null || Number.isNaN(+newPosition)) return;
    newPosition = clamp(newPosition, 0, 100);
    const fullSteps = Math.floor((max.value - min.value) / step.value);
    const fullRangePercentage = fullSteps * step.value / (max.value - min.value) * 100;
    const threshold = fullRangePercentage + (100 - fullRangePercentage) / 2;
    let value;
    if (newPosition < fullRangePercentage) {
      const valueBetween = fullRangePercentage / fullSteps;
      const steps = Math.round(newPosition / valueBetween);
      value = min.value + steps * step.value;
    } else if (newPosition < threshold) {
      value = min.value + fullSteps * step.value;
    } else {
      value = max.value;
    }
    value = Number.parseFloat(value.toFixed(precision.value));
    if (value !== props.modelValue) {
      emit(UPDATE_MODEL_EVENT, value);
    }
    if (!initData.dragging && props.modelValue !== initData.oldValue) {
      initData.oldValue = props.modelValue;
    }
    await nextTick();
    initData.dragging && displayTooltip();
    tooltip.value.updatePopper();
  };
  watch(
    () => initData.dragging,
    (val) => {
      updateDragging(val);
    }
  );
  useEventListener(button, "touchstart", onButtonDown, { passive: false });
  return {
    disabled,
    button,
    tooltip,
    tooltipVisible,
    showTooltip,
    persistent,
    wrapperStyle,
    formatValue,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown,
    onKeyDown,
    setPosition
  };
};
const _hoisted_1$1 = ["tabindex"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSliderButton"
  },
  __name: "button",
  props: sliderButtonProps,
  emits: sliderButtonEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("slider");
    const initData = reactive({
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.modelValue
    });
    const tooltipPersistent = computed(
      () => !showTooltip.value ? false : persistent.value
    );
    const {
      disabled,
      button,
      tooltip,
      showTooltip,
      persistent,
      tooltipVisible,
      wrapperStyle,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition
    } = useSliderButton(props, initData, emit);
    const { hovering, dragging } = toRefs(initData);
    __expose({
      onButtonDown,
      onKeyDown,
      setPosition,
      hovering,
      dragging
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "button",
        ref: button,
        class: normalizeClass([unref(ns).e("button-wrapper"), { hover: unref(hovering), dragging: unref(dragging) }]),
        style: normalizeStyle(unref(wrapperStyle)),
        tabindex: unref(disabled) ? void 0 : 0,
        onMouseenter: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args)),
        onMouseleave: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args)),
        onMousedown: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => unref(onButtonDown) && unref(onButtonDown)(...args)),
        onFocus: _cache[3] || (_cache[3] = //@ts-ignore
        (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args)),
        onBlur: _cache[4] || (_cache[4] = //@ts-ignore
        (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args)),
        onKeydown: _cache[5] || (_cache[5] = //@ts-ignore
        (...args) => unref(onKeyDown) && unref(onKeyDown)(...args))
      }, [
        createVNode(unref(ElTooltip), {
          ref_key: "tooltip",
          ref: tooltip,
          visible: unref(tooltipVisible),
          placement: _ctx.placement,
          "fallback-placements": ["top", "bottom", "right", "left"],
          "stop-popper-mouse-event": false,
          "popper-class": _ctx.tooltipClass,
          disabled: !unref(showTooltip),
          persistent: tooltipPersistent.value
        }, {
          content: withCtx(() => [
            createElementVNode(
              "span",
              null,
              toDisplayString(unref(formatValue)),
              1
              /* TEXT */
            )
          ]),
          default: withCtx(() => [
            createElementVNode(
              "div",
              {
                class: normalizeClass([unref(ns).e("button"), { hover: unref(hovering), dragging: unref(dragging) }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          _: 1
          /* STABLE */
        }, 8, ["visible", "placement", "popper-class", "disabled", "persistent"])
      ], 46, _hoisted_1$1);
    };
  }
});
const sliderMarkerProps = buildProps({
  mark: {
    type: definePropType([String, Object]),
    default: void 0
  }
});
var SliderMarker = defineComponent({
  name: "ElSliderMarker",
  props: sliderMarkerProps,
  setup(props) {
    const ns = useNamespace("slider");
    const label = computed(() => {
      return isString(props.mark) ? props.mark : props.mark.label;
    });
    const style = computed(
      () => isString(props.mark) ? void 0 : props.mark.style
    );
    return () => h(
      "div",
      {
        class: ns.e("marks-text"),
        style: style.value
      },
      label.value
    );
  }
});
const useSlide = (props, initData, emit) => {
  const { formItem: elFormItem } = useFormItem();
  const slider = shallowRef();
  const firstButton = ref();
  const secondButton = ref();
  const buttonRefs = {
    firstButton,
    secondButton
  };
  const sliderDisabled = useFormDisabled();
  const minValue = computed(() => {
    return Math.min(initData.firstValue, initData.secondValue);
  });
  const maxValue = computed(() => {
    return Math.max(initData.firstValue, initData.secondValue);
  });
  const barSize = computed(() => {
    return props.range ? `${100 * (maxValue.value - minValue.value) / (props.max - props.min)}%` : `${100 * (initData.firstValue - props.min) / (props.max - props.min)}%`;
  });
  const barStart = computed(() => {
    return props.range ? `${100 * (minValue.value - props.min) / (props.max - props.min)}%` : "0%";
  });
  const runwayStyle = computed(() => {
    return props.vertical ? { height: props.height } : {};
  });
  const barStyle = computed(() => {
    return props.vertical ? {
      height: barSize.value,
      bottom: barStart.value
    } : {
      width: barSize.value,
      left: barStart.value
    };
  });
  const resetSize = () => {
    if (slider.value) {
      const rect = slider.value.getBoundingClientRect();
      initData.sliderSize = rect[props.vertical ? "height" : "width"];
    }
  };
  const getButtonRefByPercent = (percent) => {
    const targetValue = props.min + percent * (props.max - props.min) / 100;
    if (!props.range) {
      return firstButton;
    }
    let buttonRefName;
    if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
      buttonRefName = initData.firstValue < initData.secondValue ? "firstButton" : "secondButton";
    } else {
      buttonRefName = initData.firstValue > initData.secondValue ? "firstButton" : "secondButton";
    }
    return buttonRefs[buttonRefName];
  };
  const setPosition = (percent) => {
    const buttonRef = getButtonRefByPercent(percent);
    buttonRef.value.setPosition(percent);
    return buttonRef;
  };
  const setFirstValue = (firstValue) => {
    initData.firstValue = firstValue != null ? firstValue : props.min;
    _emit(
      props.range ? [minValue.value, maxValue.value] : firstValue != null ? firstValue : props.min
    );
  };
  const setSecondValue = (secondValue) => {
    initData.secondValue = secondValue;
    if (props.range) {
      _emit([minValue.value, maxValue.value]);
    }
  };
  const _emit = (val) => {
    emit(UPDATE_MODEL_EVENT, val);
    emit(INPUT_EVENT, val);
  };
  const emitChange = async () => {
    await nextTick();
    emit(
      CHANGE_EVENT,
      props.range ? [minValue.value, maxValue.value] : props.modelValue
    );
  };
  const handleSliderPointerEvent = (event) => {
    var _a, _b, _c, _d, _e, _f;
    if (sliderDisabled.value || initData.dragging) return;
    resetSize();
    let newPercent = 0;
    if (props.vertical) {
      const clientY = (_c = (_b = (_a = event.touches) == null ? void 0 : _a.item(0)) == null ? void 0 : _b.clientY) != null ? _c : event.clientY;
      const sliderOffsetBottom = slider.value.getBoundingClientRect().bottom;
      newPercent = (sliderOffsetBottom - clientY) / initData.sliderSize * 100;
    } else {
      const clientX = (_f = (_e = (_d = event.touches) == null ? void 0 : _d.item(0)) == null ? void 0 : _e.clientX) != null ? _f : event.clientX;
      const sliderOffsetLeft = slider.value.getBoundingClientRect().left;
      newPercent = (clientX - sliderOffsetLeft) / initData.sliderSize * 100;
    }
    if (newPercent < 0 || newPercent > 100) return;
    return setPosition(newPercent);
  };
  const onSliderWrapperPrevent = (event) => {
    var _a, _b;
    if (((_a = buttonRefs["firstButton"].value) == null ? void 0 : _a.dragging) || ((_b = buttonRefs["secondButton"].value) == null ? void 0 : _b.dragging)) {
      event.preventDefault();
    }
  };
  const onSliderDown = async (event) => {
    const buttonRef = handleSliderPointerEvent(event);
    if (buttonRef) {
      await nextTick();
      buttonRef.value.onButtonDown(event);
    }
  };
  const onSliderClick = (event) => {
    const buttonRef = handleSliderPointerEvent(event);
    if (buttonRef) {
      emitChange();
    }
  };
  const onSliderMarkerDown = (position) => {
    if (sliderDisabled.value || initData.dragging) return;
    const buttonRef = setPosition(position);
    if (buttonRef) {
      emitChange();
    }
  };
  return {
    elFormItem,
    slider,
    firstButton,
    secondButton,
    sliderDisabled,
    minValue,
    maxValue,
    runwayStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderWrapperPrevent,
    onSliderClick,
    onSliderDown,
    onSliderMarkerDown,
    setFirstValue,
    setSecondValue
  };
};
const useStops = (props, initData, minValue, maxValue) => {
  const stops = computed(() => {
    if (!props.showStops || props.min > props.max) return [];
    if (props.step === 0) {
      return [];
    }
    const stopCount = Math.ceil((props.max - props.min) / props.step);
    const stepWidth = 100 * props.step / (props.max - props.min);
    const result = Array.from({ length: stopCount - 1 }).map(
      (_, index) => (index + 1) * stepWidth
    );
    if (props.range) {
      return result.filter((step) => {
        return step < 100 * (minValue.value - props.min) / (props.max - props.min) || step > 100 * (maxValue.value - props.min) / (props.max - props.min);
      });
    } else {
      return result.filter(
        (step) => step > 100 * (initData.firstValue - props.min) / (props.max - props.min)
      );
    }
  });
  const getStopStyle = (position) => {
    return props.vertical ? { bottom: `${position}%` } : { left: `${position}%` };
  };
  return {
    stops,
    getStopStyle
  };
};
const useMarks = (props) => {
  return computed(() => {
    if (!props.marks) {
      return [];
    }
    const marksKeys = Object.keys(props.marks);
    return marksKeys.map(Number.parseFloat).sort((a, b) => a - b).filter((point) => point <= props.max && point >= props.min).map(
      (point) => ({
        point,
        position: (point - props.min) * 100 / (props.max - props.min),
        mark: props.marks[point]
      })
    );
  });
};
const useWatch = (props, initData, minValue, maxValue, emit, elFormItem) => {
  const _emit = (val) => {
    emit(UPDATE_MODEL_EVENT, val);
    emit(INPUT_EVENT, val);
  };
  const valueChanged = () => {
    if (props.range) {
      return ![minValue.value, maxValue.value].every(
        (item, index) => item === initData.oldValue[index]
      );
    } else {
      return props.modelValue !== initData.oldValue;
    }
  };
  const setValues = () => {
    var _a, _b;
    if (props.min > props.max) {
      throwError("Slider", "min should not be greater than max.");
    }
    const val = props.modelValue;
    if (props.range && isArray(val)) {
      if (val[1] < props.min) {
        _emit([props.min, props.min]);
      } else if (val[0] > props.max) {
        _emit([props.max, props.max]);
      } else if (val[0] < props.min) {
        _emit([props.min, val[1]]);
      } else if (val[1] > props.max) {
        _emit([val[0], props.max]);
      } else {
        initData.firstValue = val[0];
        initData.secondValue = val[1];
        if (valueChanged()) {
          if (props.validateEvent) {
            (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn());
          }
          initData.oldValue = val.slice();
        }
      }
    } else if (!props.range && isNumber$1(val) && !Number.isNaN(val)) {
      if (val < props.min) {
        _emit(props.min);
      } else if (val > props.max) {
        _emit(props.max);
      } else {
        initData.firstValue = val;
        if (valueChanged()) {
          if (props.validateEvent) {
            (_b = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _b.call(elFormItem, "change").catch((err) => debugWarn());
          }
          initData.oldValue = val;
        }
      }
    }
  };
  setValues();
  watch(
    () => initData.dragging,
    (val) => {
      if (!val) {
        setValues();
      }
    }
  );
  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (initData.dragging || isArray(val) && isArray(oldVal) && val.every((item, index) => item === oldVal[index]) && initData.firstValue === val[0] && initData.secondValue === val[1]) {
        return;
      }
      setValues();
    },
    {
      deep: true
    }
  );
  watch(
    () => [props.min, props.max],
    () => {
      setValues();
    }
  );
};
const useLifecycle = (props, initData, resetSize) => {
  const sliderWrapper = ref();
  return {
    sliderWrapper
  };
};
const _hoisted_1 = ["id", "role", "aria-label", "aria-labelledby"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSlider"
  },
  __name: "slider",
  props: sliderProps,
  emits: sliderEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("slider");
    const { t } = useLocale();
    const initData = reactive({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: false,
      sliderSize: 1
    });
    const {
      elFormItem,
      slider,
      firstButton,
      secondButton,
      sliderDisabled,
      minValue,
      maxValue,
      runwayStyle,
      barStyle,
      resetSize,
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      onSliderMarkerDown,
      setFirstValue,
      setSecondValue
    } = useSlide(props, initData, emit);
    const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue);
    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const sliderWrapperSize = useFormSize();
    const sliderInputSize = computed(
      () => props.inputSize || sliderWrapperSize.value
    );
    const groupLabel = computed(() => {
      return props.ariaLabel || t("el.slider.defaultLabel", {
        min: props.min,
        max: props.max
      });
    });
    const firstButtonLabel = computed(() => {
      if (props.range) {
        return props.rangeStartLabel || t("el.slider.defaultRangeStartLabel");
      } else {
        return groupLabel.value;
      }
    });
    const firstValueText = computed(() => {
      return props.formatValueText ? props.formatValueText(firstValue.value) : `${firstValue.value}`;
    });
    const secondButtonLabel = computed(() => {
      return props.rangeEndLabel || t("el.slider.defaultRangeEndLabel");
    });
    const secondValueText = computed(() => {
      return props.formatValueText ? props.formatValueText(secondValue.value) : `${secondValue.value}`;
    });
    const sliderKls = computed(() => [
      ns.b(),
      ns.m(sliderWrapperSize.value),
      ns.is("vertical", props.vertical),
      { [ns.m("with-input")]: props.showInput }
    ]);
    const markList = useMarks(props);
    useWatch(props, initData, minValue, maxValue, emit, elFormItem);
    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map((item) => {
        const decimal = `${item}`.split(".")[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    });
    const { sliderWrapper } = useLifecycle();
    const { firstValue, secondValue, sliderSize } = toRefs(initData);
    const updateDragging = (val) => {
      initData.dragging = val;
    };
    useEventListener(sliderWrapper, "touchstart", onSliderWrapperPrevent, {
      passive: false
    });
    useEventListener(sliderWrapper, "touchmove", onSliderWrapperPrevent, {
      passive: false
    });
    provide(sliderContextKey, {
      ...toRefs(props),
      sliderSize,
      disabled: sliderDisabled,
      precision,
      emitChange,
      resetSize,
      updateDragging
    });
    __expose({
      onSliderClick
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("div", {
        id: _ctx.range ? unref(inputId) : void 0,
        ref_key: "sliderWrapper",
        ref: sliderWrapper,
        class: normalizeClass(sliderKls.value),
        role: _ctx.range ? "group" : void 0,
        "aria-label": _ctx.range && !unref(isLabeledByFormItem) ? groupLabel.value : void 0,
        "aria-labelledby": _ctx.range && unref(isLabeledByFormItem) ? (_a = unref(elFormItem)) == null ? void 0 : _a.labelId : void 0
      }, [
        createElementVNode(
          "div",
          {
            ref_key: "slider",
            ref: slider,
            class: normalizeClass([
              unref(ns).e("runway"),
              { "show-input": _ctx.showInput && !_ctx.range },
              unref(ns).is("disabled", unref(sliderDisabled))
            ]),
            style: normalizeStyle(unref(runwayStyle)),
            onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
            (...args) => unref(onSliderDown) && unref(onSliderDown)(...args)),
            onTouchstartPassive: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => unref(onSliderDown) && unref(onSliderDown)(...args))
          },
          [
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).e("bar")),
                style: normalizeStyle(unref(barStyle))
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            createVNode(_sfc_main$1, {
              id: !_ctx.range ? unref(inputId) : void 0,
              ref_key: "firstButton",
              ref: firstButton,
              "model-value": unref(firstValue),
              vertical: _ctx.vertical,
              "tooltip-class": _ctx.tooltipClass,
              placement: _ctx.placement,
              role: "slider",
              "aria-label": _ctx.range || !unref(isLabeledByFormItem) ? firstButtonLabel.value : void 0,
              "aria-labelledby": !_ctx.range && unref(isLabeledByFormItem) ? (_b = unref(elFormItem)) == null ? void 0 : _b.labelId : void 0,
              "aria-valuemin": _ctx.min,
              "aria-valuemax": _ctx.range ? unref(secondValue) : _ctx.max,
              "aria-valuenow": unref(firstValue),
              "aria-valuetext": firstValueText.value,
              "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
              "aria-disabled": unref(sliderDisabled),
              "onUpdate:modelValue": unref(setFirstValue)
            }, null, 8, ["id", "model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-labelledby", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"]),
            _ctx.range ? (openBlock(), createBlock(_sfc_main$1, {
              key: 0,
              ref_key: "secondButton",
              ref: secondButton,
              "model-value": unref(secondValue),
              vertical: _ctx.vertical,
              "tooltip-class": _ctx.tooltipClass,
              placement: _ctx.placement,
              role: "slider",
              "aria-label": secondButtonLabel.value,
              "aria-valuemin": unref(firstValue),
              "aria-valuemax": _ctx.max,
              "aria-valuenow": unref(secondValue),
              "aria-valuetext": secondValueText.value,
              "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
              "aria-disabled": unref(sliderDisabled),
              "onUpdate:modelValue": unref(setSecondValue)
            }, null, 8, ["model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"])) : createCommentVNode("v-if", true),
            _ctx.showStops ? (openBlock(), createElementBlock("div", _hoisted_2, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(stops), (item, key) => {
                  return openBlock(), createElementBlock(
                    "div",
                    {
                      key,
                      class: normalizeClass(unref(ns).e("stop")),
                      style: normalizeStyle(unref(getStopStyle)(item))
                    },
                    null,
                    6
                    /* CLASS, STYLE */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true),
            unref(markList).length > 0 ? (openBlock(), createElementBlock(
              Fragment,
              { key: 2 },
              [
                createElementVNode("div", null, [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(markList), (item, key) => {
                      return openBlock(), createElementBlock(
                        "div",
                        {
                          key,
                          style: normalizeStyle(unref(getStopStyle)(item.position)),
                          class: normalizeClass([unref(ns).e("stop"), unref(ns).e("marks-stop")])
                        },
                        null,
                        6
                        /* CLASS, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(ns).e("marks"))
                  },
                  [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(unref(markList), (item, key) => {
                        return openBlock(), createBlock(unref(SliderMarker), {
                          key,
                          mark: item.mark,
                          style: normalizeStyle(unref(getStopStyle)(item.position)),
                          onMousedown: withModifiers(($event) => unref(onSliderMarkerDown)(item.position), ["stop"])
                        }, null, 8, ["mark", "style", "onMousedown"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true)
          ],
          38
          /* CLASS, STYLE, NEED_HYDRATION */
        ),
        _ctx.showInput && !_ctx.range ? (openBlock(), createBlock(unref(ElInputNumber), {
          key: 0,
          ref: "input",
          "model-value": unref(firstValue),
          class: normalizeClass(unref(ns).e("input")),
          step: _ctx.step,
          disabled: unref(sliderDisabled),
          controls: _ctx.showInputControls,
          min: _ctx.min,
          max: _ctx.max,
          precision: precision.value,
          size: sliderInputSize.value,
          "onUpdate:modelValue": unref(setFirstValue),
          onChange: unref(emitChange)
        }, null, 8, ["model-value", "class", "step", "disabled", "controls", "min", "max", "precision", "size", "onUpdate:modelValue", "onChange"])) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
});
const ElSlider = withInstall(_sfc_main);

export { ElSlider as E, sliderEmits as a, sliderProps as b, sliderContextKey as s };
//# sourceMappingURL=index-CrEUh4vs.mjs.map
