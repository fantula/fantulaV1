import { getCurrentInstance, shallowRef, computed, ref, watch, defineComponent, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, normalizeStyle, inject, watchEffect, Fragment, renderList, reactive, provide, createBlock, createCommentVNode, createVNode, renderSlot, nextTick, withCtx, mergeProps, withDirectives, vShow, withKeys, createTextVNode, toDisplayString } from "vue";
import { isNil, pick, debounce } from "lodash-unified";
import { q as buildProps, D as definePropType, x as useNamespace, T as addUnit, V as getEventCode, W as EVENT_CODE, w as _export_sfc, y as useLocale, v as debugWarn, B as withInstall, aY as useEmptyValuesProps, ax as useSizeProp, aV as useEmptyValues, E as ElIcon, aZ as arrow_down_default, J as close_default } from "../server.mjs";
import { reactiveComputed } from "@vueuse/core";
import { u as useTooltipContentProps, E as ElTooltip } from "./index-B9I5bL_Z.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
import { u as useAriaProps } from "./index-Dxw_X3Hq.js";
import { U as UPDATE_MODEL_EVENT, C as CHANGE_EVENT } from "./event-BZTOGHfp.js";
import { isString, hasOwn } from "@vue/shared";
import { E as ElInput, a as useFocusController } from "./index-Bf1ETwA6.js";
import { TinyColor } from "@ctrl/tinycolor";
import { u as useFormItem, b as useFormDisabled, a as useFormSize, c as useFormItemInputId } from "./use-form-common-props-DlCG9pC5.js";
import { C as ClickOutside } from "./index-DCrMmn3b.js";
const alphaSliderProps = buildProps({
  color: {
    type: definePropType(Object),
    required: true
  },
  vertical: Boolean,
  disabled: Boolean
});
const hueSliderProps = alphaSliderProps;
const getOffsetTop = (el) => {
  let offset = 0;
  let parent = el;
  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return offset;
};
const getOffsetTopDistance = (el, containerEl) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};
const getClientXY = (event) => {
  let clientX;
  let clientY;
  if (event.type === "touchend") {
    clientY = event.changedTouches[0].clientY;
    clientX = event.changedTouches[0].clientX;
  } else if (event.type.startsWith("touch")) {
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
const useSlider = (props, { key, minValue: minValue2, maxValue: maxValue2 }) => {
  const instance = getCurrentInstance();
  const thumb = shallowRef();
  const bar = shallowRef();
  const currentValue = computed(() => props.color.get(key));
  function handleClick(event) {
    var _a;
    if (props.disabled)
      return;
    const target = event.target;
    if (target !== thumb.value) {
      handleDrag(event);
    }
    (_a = thumb.value) == null ? void 0 : _a.focus();
  }
  function handleDrag(event) {
    if (!bar.value || !thumb.value || props.disabled)
      return;
    const el = instance.vnode.el;
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = getClientXY(event);
    let value;
    if (!props.vertical) {
      let left = clientX - rect.left;
      left = Math.max(thumb.value.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumb.value.offsetWidth / 2);
      value = Math.round(
        (left - thumb.value.offsetWidth / 2) / (rect.width - thumb.value.offsetWidth) * maxValue2
      );
    } else {
      let top = clientY - rect.top;
      top = Math.max(thumb.value.offsetHeight / 2, top);
      top = Math.min(top, rect.height - thumb.value.offsetHeight / 2);
      value = Math.round(
        (top - thumb.value.offsetHeight / 2) / (rect.height - thumb.value.offsetHeight) * maxValue2
      );
    }
    props.color.set(key, value);
  }
  function handleKeydown(event) {
    if (props.disabled)
      return;
    const { shiftKey } = event;
    const code = getEventCode(event);
    const step = shiftKey ? 10 : 1;
    const reverse = key === "hue" ? -1 : 1;
    let isPreventDefault = true;
    switch (code) {
      case EVENT_CODE.left:
      case EVENT_CODE.down:
        incrementPosition(-step * reverse);
        break;
      case EVENT_CODE.right:
      case EVENT_CODE.up:
        incrementPosition(step * reverse);
        break;
      case EVENT_CODE.home:
        props.color.set(key, key === "hue" ? maxValue2 : minValue2);
        break;
      case EVENT_CODE.end:
        props.color.set(key, key === "hue" ? minValue2 : maxValue2);
        break;
      case EVENT_CODE.pageDown:
        incrementPosition(-4 * reverse);
        break;
      case EVENT_CODE.pageUp:
        incrementPosition(4 * reverse);
        break;
      default:
        isPreventDefault = false;
        break;
    }
    isPreventDefault && event.preventDefault();
  }
  function incrementPosition(step) {
    let next = currentValue.value + step;
    next = next < minValue2 ? minValue2 : next > maxValue2 ? maxValue2 : next;
    props.color.set(key, next);
  }
  return {
    thumb,
    bar,
    currentValue,
    handleDrag,
    handleClick,
    handleKeydown
  };
};
const useSliderDOM = (props, {
  namespace,
  maxValue: maxValue2,
  bar,
  thumb,
  currentValue,
  handleDrag,
  getBackground
}) => {
  const instance = getCurrentInstance();
  const ns = useNamespace(namespace);
  const thumbLeft = ref(0);
  const thumbTop = ref(0);
  const background = ref();
  function getThumbLeft() {
    if (!thumb.value)
      return 0;
    if (props.vertical)
      return 0;
    const el = instance.vnode.el;
    const value = currentValue.value;
    if (!el)
      return 0;
    return Math.round(
      value * (el.offsetWidth - thumb.value.offsetWidth / 2) / maxValue2
    );
  }
  function getThumbTop() {
    if (!thumb.value)
      return 0;
    const el = instance.vnode.el;
    if (!props.vertical)
      return 0;
    const value = currentValue.value;
    if (!el)
      return 0;
    return Math.round(
      value * (el.offsetHeight - thumb.value.offsetHeight / 2) / maxValue2
    );
  }
  function update() {
    thumbLeft.value = getThumbLeft();
    thumbTop.value = getThumbTop();
    background.value = getBackground == null ? void 0 : getBackground();
  }
  watch(currentValue, () => update());
  watch(
    () => props.color.value,
    () => update()
  );
  const rootKls = computed(() => [
    ns.b(),
    ns.is("vertical", props.vertical),
    ns.is("disabled", props.disabled)
  ]);
  const barKls = computed(() => ns.e("bar"));
  const thumbKls = computed(() => ns.e("thumb"));
  const barStyle = computed(() => ({ background: background.value }));
  const thumbStyle = computed(() => ({
    left: addUnit(thumbLeft.value),
    top: addUnit(thumbTop.value)
  }));
  return {
    rootKls,
    barKls,
    barStyle,
    thumbKls,
    thumbStyle,
    thumbLeft,
    thumbTop,
    update
  };
};
const _hoisted_1$4 = ["aria-label", "aria-valuenow", "aria-valuetext", "aria-orientation", "tabindex", "aria-disabled"];
const minValue$1 = 0;
const maxValue$1 = 100;
const _sfc_main$5 = defineComponent({
  ...{
    name: "ElColorAlphaSlider"
  },
  __name: "alpha-slider",
  props: alphaSliderProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, { key: "alpha", minValue: minValue$1, maxValue: maxValue$1 });
    const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } = useSliderDOM(props, {
      namespace: "color-alpha-slider",
      maxValue: maxValue$1,
      currentValue,
      bar,
      thumb,
      handleDrag,
      getBackground
    });
    const { t } = useLocale();
    const ariaLabel = computed(() => t("el.colorpicker.alphaLabel"));
    const ariaValuetext = computed(() => {
      return t("el.colorpicker.alphaDescription", {
        alpha: currentValue.value,
        color: props.color.value
      });
    });
    function getBackground() {
      if (props.color && props.color.value) {
        const { r, g, b } = props.color.toRgb();
        return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
      }
      return "";
    }
    __expose({
      update,
      bar,
      thumb
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          createElementVNode(
            "div",
            {
              ref_key: "bar",
              ref: bar,
              class: normalizeClass(unref(barKls)),
              style: normalizeStyle(unref(barStyle)),
              onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClick) && unref(handleClick)(...args))
            },
            null,
            6
          ),
          createElementVNode("div", {
            ref_key: "thumb",
            ref: thumb,
            class: normalizeClass(unref(thumbKls)),
            style: normalizeStyle(unref(thumbStyle)),
            "aria-label": ariaLabel.value,
            "aria-valuenow": unref(currentValue),
            "aria-valuetext": ariaValuetext.value,
            "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
            "aria-valuemin": minValue$1,
            "aria-valuemax": maxValue$1,
            role: "slider",
            tabindex: _ctx.disabled ? void 0 : 0,
            "aria-disabled": _ctx.disabled,
            onKeydown: _cache[1] || (_cache[1] = (...args) => unref(handleKeydown) && unref(handleKeydown)(...args))
          }, null, 46, _hoisted_1$4)
        ],
        2
      );
    };
  }
});
var AlphaSlider = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker-panel/src/components/alpha-slider.vue"]]);
const _hoisted_1$3 = ["aria-label", "aria-valuenow", "aria-valuetext", "aria-orientation", "tabindex", "aria-disabled"];
const minValue = 0;
const maxValue = 360;
const _sfc_main$4 = defineComponent({
  ...{
    name: "ElColorHueSlider"
  },
  __name: "hue-slider",
  props: hueSliderProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, { key: "hue", minValue, maxValue });
    const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } = useSliderDOM(props, {
      namespace: "color-hue-slider",
      maxValue,
      currentValue,
      bar,
      thumb,
      handleDrag
    });
    const { t } = useLocale();
    const ariaLabel = computed(() => t("el.colorpicker.hueLabel"));
    const ariaValuetext = computed(() => {
      return t("el.colorpicker.hueDescription", {
        hue: currentValue.value,
        color: props.color.value
      });
    });
    __expose({
      bar,
      thumb,
      thumbTop,
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          createElementVNode(
            "div",
            {
              ref_key: "bar",
              ref: bar,
              class: normalizeClass(unref(barKls)),
              onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClick) && unref(handleClick)(...args))
            },
            null,
            2
          ),
          createElementVNode("div", {
            ref_key: "thumb",
            ref: thumb,
            class: normalizeClass(unref(thumbKls)),
            style: normalizeStyle(unref(thumbStyle)),
            "aria-label": ariaLabel.value,
            "aria-valuenow": unref(currentValue),
            "aria-valuetext": ariaValuetext.value,
            "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
            "aria-valuemin": minValue,
            "aria-valuemax": maxValue,
            role: "slider",
            tabindex: _ctx.disabled ? void 0 : 0,
            "aria-disabled": _ctx.disabled,
            onKeydown: _cache[1] || (_cache[1] = (...args) => unref(handleKeydown) && unref(handleKeydown)(...args))
          }, null, 46, _hoisted_1$3)
        ],
        2
      );
    };
  }
});
var HueSlider = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker-panel/src/components/hue-slider.vue"]]);
const predefineProps = buildProps({
  colors: {
    type: definePropType(Array),
    required: true
  },
  color: {
    type: definePropType(Object),
    required: true
  },
  enableAlpha: {
    type: Boolean,
    required: true
  },
  disabled: Boolean
});
const colorPickerPanelProps = buildProps({
  modelValue: {
    type: definePropType(String),
    default: void 0
  },
  border: {
    type: Boolean,
    default: true
  },
  showAlpha: Boolean,
  colorFormat: String,
  disabled: Boolean,
  predefine: {
    type: definePropType(Array)
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
});
const colorPickerPanelEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNil(val)
};
const ROOT_COMMON_COLOR_INJECTION_KEY = /* @__PURE__ */ Symbol("colorCommonPickerKey");
const colorPickerPanelContextKey = /* @__PURE__ */ Symbol("colorPickerPanelContextKey");
class Color {
  constructor(options = {}) {
    this._hue = 0;
    this._saturation = 100;
    this._value = 100;
    this._alpha = 100;
    this._tiny = new TinyColor();
    this._isValid = false;
    this.enableAlpha = false;
    this.format = "";
    this.value = "";
    for (const option in options) {
      if (hasOwn(options, option)) {
        this[option] = options[option];
      }
    }
    if (options.value) {
      this.fromString(options.value);
    } else {
      this.doOnChange();
    }
  }
  set(prop, value) {
    if (arguments.length === 1 && typeof prop === "object") {
      for (const p in prop) {
        if (hasOwn(prop, p)) {
          this.set(p, prop[p]);
        }
      }
      return;
    }
    this[`_${prop}`] = value;
    this._isValid = true;
    this.doOnChange();
  }
  get(prop) {
    if (["hue", "saturation", "value", "alpha"].includes(prop)) {
      return Math.round(this[`_${prop}`]);
    }
    return this[`_${prop}`];
  }
  toRgb() {
    return this._isValid ? this._tiny.toRgb() : { r: 255, g: 255, b: 255, a: 0 };
  }
  fromString(value) {
    const color = new TinyColor(value);
    this._isValid = color.isValid;
    if (color.isValid) {
      const { h, s, v, a } = color.toHsv();
      this._hue = h;
      this._saturation = s * 100;
      this._value = v * 100;
      this._alpha = a * 100;
    } else {
      this._hue = 0;
      this._saturation = 100;
      this._value = 100;
      this._alpha = 100;
    }
    this.doOnChange();
  }
  clear() {
    this._isValid = false;
    this.value = "";
    this._hue = 0;
    this._saturation = 100;
    this._value = 100;
    this._alpha = 100;
  }
  compare(color) {
    const compareColor = new TinyColor({
      h: color._hue,
      s: color._saturation / 100,
      v: color._value / 100,
      a: color._alpha / 100
    });
    return this._tiny.equals(compareColor);
  }
  doOnChange() {
    const { _hue, _saturation, _value, _alpha, format, enableAlpha } = this;
    let _format = format || (enableAlpha ? "rgb" : "hex");
    if (format === "hex" && enableAlpha) {
      _format = "hex8";
    }
    this._tiny = new TinyColor({
      h: _hue,
      s: _saturation / 100,
      v: _value / 100,
      a: _alpha / 100
    });
    this.value = this._isValid ? this._tiny.toString(_format) : "";
  }
}
const usePredefine = (props) => {
  const { currentColor } = inject(colorPickerPanelContextKey);
  const rgbaColors = ref(parseColors(props.colors, props.color));
  watch(
    () => currentColor.value,
    (val) => {
      const color = new Color({
        value: val,
        enableAlpha: props.enableAlpha
      });
      rgbaColors.value.forEach((item) => {
        item.selected = color.compare(item);
      });
    }
  );
  watchEffect(() => {
    rgbaColors.value = parseColors(props.colors, props.color);
  });
  function handleSelect(index) {
    props.color.fromString(props.colors[index]);
  }
  function parseColors(colors, color) {
    return colors.map((value) => {
      const c = new Color({
        value,
        enableAlpha: props.enableAlpha
      });
      c.selected = c.compare(color);
      return c;
    });
  }
  return {
    rgbaColors,
    handleSelect
  };
};
const usePredefineDOM = (props) => {
  const ns = useNamespace("color-predefine");
  const rootKls = computed(() => [ns.b(), ns.is("disabled", props.disabled)]);
  const colorsKls = computed(() => ns.e("colors"));
  function colorSelectorKls(item) {
    return [
      ns.e("color-selector"),
      ns.is("alpha", item.get("alpha") < 100),
      { selected: item.selected }
    ];
  }
  return {
    rootKls,
    colorsKls,
    colorSelectorKls
  };
};
const _hoisted_1$2 = ["disabled", "aria-label", "onClick"];
const _sfc_main$3 = defineComponent({
  ...{
    name: "ElColorPredefine"
  },
  __name: "predefine",
  props: predefineProps,
  setup(__props) {
    const props = __props;
    const { rgbaColors, handleSelect } = usePredefine(props);
    const { rootKls, colorsKls, colorSelectorKls } = usePredefineDOM(props);
    const { t } = useLocale();
    const ariaLabel = (value) => {
      return t("el.colorpicker.predefineDescription", { value });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls))
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(colorsKls))
            },
            [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(rgbaColors), (item, index) => {
                  return openBlock(), createElementBlock("button", {
                    key: _ctx.colors[index],
                    type: "button",
                    disabled: _ctx.disabled,
                    "aria-label": ariaLabel(item.value),
                    class: normalizeClass(unref(colorSelectorKls)(item)),
                    onClick: ($event) => unref(handleSelect)(index)
                  }, [
                    createElementVNode(
                      "div",
                      {
                        style: normalizeStyle({ backgroundColor: item.value })
                      },
                      null,
                      4
                    )
                  ], 10, _hoisted_1$2);
                }),
                128
              ))
            ],
            2
          )
        ],
        2
      );
    };
  }
});
var Predefine = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker-panel/src/components/predefine.vue"]]);
const svPanelProps = buildProps({
  color: {
    type: definePropType(Object),
    required: true
  },
  disabled: Boolean
});
const useSvPanel = (props) => {
  const instance = getCurrentInstance();
  const cursorRef = ref();
  const cursorTop = ref(0);
  const cursorLeft = ref(0);
  const background = ref("hsl(0, 100%, 50%)");
  const saturation = computed(() => props.color.get("saturation"));
  const brightness = computed(() => props.color.get("value"));
  const hue = computed(() => props.color.get("hue"));
  function handleClick(event) {
    var _a;
    if (props.disabled)
      return;
    const target = event.target;
    if (target !== cursorRef.value) {
      handleDrag(event);
    }
    (_a = cursorRef.value) == null ? void 0 : _a.focus({ preventScroll: true });
  }
  function handleDrag(event) {
    if (props.disabled)
      return;
    const el = instance.vnode.el;
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = getClientXY(event);
    let left = clientX - rect.left;
    let top = clientY - rect.top;
    left = Math.max(0, left);
    left = Math.min(left, rect.width);
    top = Math.max(0, top);
    top = Math.min(top, rect.height);
    cursorLeft.value = left;
    cursorTop.value = top;
    props.color.set({
      saturation: left / rect.width * 100,
      value: 100 - top / rect.height * 100
    });
  }
  function handleKeydown(event) {
    if (props.disabled)
      return;
    const { shiftKey } = event;
    const code = getEventCode(event);
    const step = shiftKey ? 10 : 1;
    let isPreventDefault = true;
    switch (code) {
      case EVENT_CODE.left:
        incrementSaturation(-step);
        break;
      case EVENT_CODE.right:
        incrementSaturation(step);
        break;
      case EVENT_CODE.up:
        incrementBrightness(step);
        break;
      case EVENT_CODE.down:
        incrementBrightness(-step);
        break;
      default:
        isPreventDefault = false;
        break;
    }
    isPreventDefault && event.preventDefault();
  }
  function incrementSaturation(step) {
    let next = saturation.value + step;
    next = next < 0 ? 0 : next > 100 ? 100 : next;
    props.color.set("saturation", next);
  }
  function incrementBrightness(step) {
    let next = brightness.value + step;
    next = next < 0 ? 0 : next > 100 ? 100 : next;
    props.color.set("value", next);
  }
  return {
    cursorRef,
    cursorTop,
    cursorLeft,
    background,
    saturation,
    brightness,
    hue,
    handleClick,
    handleDrag,
    handleKeydown
  };
};
const useSvPanelDOM = (props, {
  cursorTop,
  cursorLeft,
  background,
  handleDrag
}) => {
  const instance = getCurrentInstance();
  const ns = useNamespace("color-svpanel");
  function update() {
    const saturation = props.color.get("saturation");
    const brightness = props.color.get("value");
    const el = instance.vnode.el;
    const { clientWidth: width, clientHeight: height } = el;
    cursorLeft.value = saturation * width / 100;
    cursorTop.value = (100 - brightness) * height / 100;
    background.value = `hsl(${props.color.get("hue")}, 100%, 50%)`;
  }
  watch(
    [
      () => props.color.get("hue"),
      () => props.color.get("value"),
      () => props.color.value
    ],
    () => update()
  );
  const rootKls = computed(() => ns.b());
  const cursorKls = computed(() => ns.e("cursor"));
  const rootStyle = computed(() => ({
    backgroundColor: background.value
  }));
  const cursorStyle = computed(() => ({
    top: addUnit(cursorTop.value),
    left: addUnit(cursorLeft.value)
  }));
  return {
    rootKls,
    cursorKls,
    rootStyle,
    cursorStyle,
    update
  };
};
const _hoisted_1$1 = ["tabindex", "aria-disabled", "aria-label", "aria-valuenow", "aria-valuetext"];
const _sfc_main$2 = defineComponent({
  ...{
    name: "ElSvPanel"
  },
  __name: "sv-panel",
  props: svPanelProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const {
      cursorRef,
      cursorTop,
      cursorLeft,
      background,
      saturation,
      brightness,
      handleClick,
      handleDrag,
      handleKeydown
    } = useSvPanel(props);
    const { rootKls, cursorKls, rootStyle, cursorStyle, update } = useSvPanelDOM(
      props,
      {
        cursorTop,
        cursorLeft,
        background,
        handleDrag
      }
    );
    const { t } = useLocale();
    const ariaLabel = computed(() => t("el.colorpicker.svLabel"));
    const ariaValuetext = computed(() => {
      return t("el.colorpicker.svDescription", {
        saturation: saturation.value,
        brightness: brightness.value,
        color: props.color.value
      });
    });
    __expose({
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(rootKls)),
          style: normalizeStyle(unref(rootStyle)),
          onClick: _cache[1] || (_cache[1] = (...args) => unref(handleClick) && unref(handleClick)(...args))
        },
        [
          createElementVNode("div", {
            ref_key: "cursorRef",
            ref: cursorRef,
            class: normalizeClass(unref(cursorKls)),
            style: normalizeStyle(unref(cursorStyle)),
            tabindex: _ctx.disabled ? void 0 : 0,
            "aria-disabled": _ctx.disabled,
            role: "slider",
            "aria-valuemin": "0,0",
            "aria-valuemax": "100,100",
            "aria-label": ariaLabel.value,
            "aria-valuenow": `${unref(saturation)},${unref(brightness)}`,
            "aria-valuetext": ariaValuetext.value,
            onKeydown: _cache[0] || (_cache[0] = (...args) => unref(handleKeydown) && unref(handleKeydown)(...args))
          }, null, 46, _hoisted_1$1)
        ],
        6
      );
    };
  }
});
var SvPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker-panel/src/components/sv-panel.vue"]]);
const useCommonColor = (props, emit) => {
  const color = reactive(
    new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || "",
      value: props.modelValue
    })
  );
  watch(
    () => [props.colorFormat, props.showAlpha],
    () => {
      color.enableAlpha = props.showAlpha;
      color.format = props.colorFormat || color.format;
      color.doOnChange();
      emit(UPDATE_MODEL_EVENT, color.value);
    }
  );
  return {
    color
  };
};
const _sfc_main$1 = defineComponent({
  ...{
    name: "ElColorPickerPanel"
  },
  __name: "color-picker-panel",
  props: colorPickerPanelProps,
  emits: colorPickerPanelEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("color-picker-panel");
    const { formItem } = useFormItem();
    const disabled = useFormDisabled();
    const hueRef = ref();
    const svRef = ref();
    const alphaRef = ref();
    const inputRef = ref();
    const customInput = ref("");
    const { color } = inject(
      ROOT_COMMON_COLOR_INJECTION_KEY,
      () => useCommonColor(props, emit),
      true
    );
    function handleConfirm() {
      color.fromString(customInput.value);
      if (color.value !== customInput.value) {
        customInput.value = color.value;
      }
    }
    function handleFocusout() {
      var _a;
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => debugWarn(err));
      }
    }
    function update() {
      var _a, _b, _c;
      (_a = hueRef.value) == null ? void 0 : _a.update();
      (_b = svRef.value) == null ? void 0 : _b.update();
      (_c = alphaRef.value) == null ? void 0 : _c.update();
    }
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== color.value) {
          newVal ? color.fromString(newVal) : color.clear();
        }
      }
    );
    watch(
      () => color.value,
      (val) => {
        emit(UPDATE_MODEL_EVENT, val);
        customInput.value = val;
        if (props.validateEvent) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
        }
      }
    );
    provide(colorPickerPanelContextKey, {
      currentColor: computed(() => color.value)
    });
    __expose({
      color,
      inputRef,
      update
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).is("disabled", unref(disabled)), unref(ns).is("border", _ctx.border)]),
          onFocusout: handleFocusout
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("wrapper"))
            },
            [
              createVNode(HueSlider, {
                ref_key: "hueRef",
                ref: hueRef,
                class: "hue-slider",
                color: unref(color),
                vertical: "",
                disabled: unref(disabled)
              }, null, 8, ["color", "disabled"]),
              createVNode(SvPanel, {
                ref_key: "svRef",
                ref: svRef,
                color: unref(color),
                disabled: unref(disabled)
              }, null, 8, ["color", "disabled"])
            ],
            2
          ),
          _ctx.showAlpha ? (openBlock(), createBlock(AlphaSlider, {
            key: 0,
            ref_key: "alphaRef",
            ref: alphaRef,
            color: unref(color),
            disabled: unref(disabled)
          }, null, 8, ["color", "disabled"])) : createCommentVNode("v-if", true),
          _ctx.predefine ? (openBlock(), createBlock(Predefine, {
            key: 1,
            ref: "predefine",
            "enable-alpha": _ctx.showAlpha,
            color: unref(color),
            colors: _ctx.predefine,
            disabled: unref(disabled)
          }, null, 8, ["enable-alpha", "color", "colors", "disabled"])) : createCommentVNode("v-if", true),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("footer"))
            },
            [
              createVNode(unref(ElInput), {
                ref_key: "inputRef",
                ref: inputRef,
                modelValue: customInput.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customInput.value = $event),
                "validate-event": false,
                size: "small",
                disabled: unref(disabled),
                onChange: handleConfirm
              }, null, 8, ["modelValue", "disabled"]),
              renderSlot(_ctx.$slots, "footer")
            ],
            2
          )
        ],
        34
      );
    };
  }
});
var ColorPickerPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker-panel/src/color-picker-panel.vue"]]);
const ElColorPickerPanel = withInstall(ColorPickerPanel);
const colorPickerProps = buildProps({
  persistent: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: definePropType(String),
    default: void 0
  },
  id: String,
  showAlpha: Boolean,
  colorFormat: String,
  disabled: {
    type: Boolean,
    default: void 0
  },
  clearable: {
    type: Boolean,
    default: true
  },
  size: useSizeProp,
  popperClass: useTooltipContentProps.popperClass,
  popperStyle: useTooltipContentProps.popperStyle,
  tabindex: {
    type: [String, Number],
    default: 0
  },
  teleported: useTooltipContentProps.teleported,
  appendTo: useTooltipContentProps.appendTo,
  predefine: {
    type: definePropType(Array)
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  ...useEmptyValuesProps,
  ...useAriaProps(["ariaLabel"])
});
const colorPickerEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNil(val),
  [CHANGE_EVENT]: (val) => isString(val) || isNil(val),
  activeChange: (val) => isString(val) || isNil(val),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true
};
const _hoisted_1 = ["id", "aria-label", "aria-labelledby", "aria-description", "aria-disabled", "tabindex"];
const _sfc_main = defineComponent({
  ...{
    name: "ElColorPicker"
  },
  __name: "color-picker",
  props: colorPickerProps,
  emits: colorPickerEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("color");
    const { formItem } = useFormItem();
    const colorSize = useFormSize();
    const colorDisabled = useFormDisabled();
    const { valueOnClear, isEmptyValue } = useEmptyValues(props, null);
    const commonColor = useCommonColor(props, emit);
    const { inputId: buttonId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const popper = ref();
    const triggerRef = ref();
    const pickerPanelRef = ref();
    const showPicker = ref(false);
    const showPanelColor = ref(false);
    let shouldActiveChange = true;
    const { isFocused, handleFocus, handleBlur } = useFocusController(triggerRef, {
      disabled: colorDisabled,
      beforeBlur(event) {
        var _a;
        return (_a = popper.value) == null ? void 0 : _a.isFocusInsideContent(event);
      },
      afterBlur() {
        var _a;
        setShowPicker(false);
        resetColor();
        if (props.validateEvent) {
          (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "blur").catch((err) => debugWarn(err));
        }
      }
    });
    const color = reactiveComputed(
      () => {
        var _a, _b;
        return (_b = (_a = pickerPanelRef.value) == null ? void 0 : _a.color) != null ? _b : commonColor.color;
      }
    );
    const panelProps = computed(
      () => pick(props, Object.keys(colorPickerPanelProps))
    );
    const displayedColor = computed(() => {
      if (!props.modelValue && !showPanelColor.value) {
        return "transparent";
      }
      return displayedRgb(color, props.showAlpha);
    });
    const currentColor = computed(() => {
      return !props.modelValue && !showPanelColor.value ? "" : color.value;
    });
    const buttonAriaLabel = computed(() => {
      return !isLabeledByFormItem.value ? props.ariaLabel || t("el.colorpicker.defaultLabel") : void 0;
    });
    const buttonAriaLabelledby = computed(() => {
      return isLabeledByFormItem.value ? formItem == null ? void 0 : formItem.labelId : void 0;
    });
    const btnKls = computed(() => {
      return [
        ns.b("picker"),
        ns.is("disabled", colorDisabled.value),
        ns.bm("picker", colorSize.value),
        ns.is("focused", isFocused.value)
      ];
    });
    function displayedRgb(color2, showAlpha) {
      const { r, g, b, a } = color2.toRgb();
      return showAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    }
    function setShowPicker(value) {
      showPicker.value = value;
    }
    const debounceSetShowPicker = debounce(setShowPicker, 100, { leading: true });
    function show() {
      if (colorDisabled.value)
        return;
      setShowPicker(true);
    }
    function hide() {
      debounceSetShowPicker(false);
      resetColor();
    }
    function resetColor() {
      nextTick(() => {
        if (props.modelValue) {
          color.fromString(props.modelValue);
        } else {
          color.value = "";
          nextTick(() => {
            showPanelColor.value = false;
          });
        }
      });
    }
    function handleTrigger() {
      if (colorDisabled.value)
        return;
      if (showPicker.value) {
        resetColor();
      }
      debounceSetShowPicker(!showPicker.value);
    }
    function confirmValue() {
      const value = isEmptyValue(color.value) ? valueOnClear.value : color.value;
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
      if (props.validateEvent) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
      }
      debounceSetShowPicker(false);
      nextTick(() => {
        const newColor = new Color({
          enableAlpha: props.showAlpha,
          format: props.colorFormat || "",
          value: props.modelValue
        });
        if (!color.compare(newColor)) {
          resetColor();
        }
      });
    }
    function clear() {
      debounceSetShowPicker(false);
      emit(UPDATE_MODEL_EVENT, valueOnClear.value);
      emit(CHANGE_EVENT, valueOnClear.value);
      if (props.modelValue !== valueOnClear.value && props.validateEvent) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
      }
      resetColor();
      emit("clear");
    }
    function handleShowTooltip() {
      var _a, _b;
      (_b = (_a = pickerPanelRef == null ? void 0 : pickerPanelRef.value) == null ? void 0 : _a.inputRef) == null ? void 0 : _b.focus();
    }
    function handleClickOutside() {
      if (!showPicker.value)
        return;
      hide();
      isFocused.value && focus();
    }
    function handleEsc(event) {
      event.preventDefault();
      event.stopPropagation();
      setShowPicker(false);
      resetColor();
    }
    function handleKeyDown(event) {
      const code = getEventCode(event);
      switch (code) {
        case EVENT_CODE.enter:
        case EVENT_CODE.numpadEnter:
        case EVENT_CODE.space:
          event.preventDefault();
          event.stopPropagation();
          show();
          break;
        case EVENT_CODE.esc:
          handleEsc(event);
          break;
      }
    }
    function focus() {
      triggerRef.value.focus();
    }
    function blur() {
      triggerRef.value.blur();
    }
    watch(
      () => currentColor.value,
      (val) => {
        shouldActiveChange && emit("activeChange", val);
        shouldActiveChange = true;
      }
    );
    watch(
      () => color.value,
      () => {
        if (!props.modelValue && !showPanelColor.value) {
          showPanelColor.value = true;
        }
      }
    );
    watch(
      () => props.modelValue,
      (newVal) => {
        if (!newVal) {
          showPanelColor.value = false;
        } else if (newVal && newVal !== color.value) {
          shouldActiveChange = false;
          color.fromString(newVal);
        }
      }
    );
    watch(
      () => showPicker.value,
      () => {
        pickerPanelRef.value && nextTick(pickerPanelRef.value.update);
      }
    );
    provide(ROOT_COMMON_COLOR_INJECTION_KEY, commonColor);
    __expose({
      color,
      show,
      hide,
      focus,
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTooltip), {
        ref_key: "popper",
        ref: popper,
        visible: showPicker.value,
        "show-arrow": false,
        "fallback-placements": ["bottom", "top", "right", "left"],
        offset: 0,
        "gpu-acceleration": false,
        "popper-class": [unref(ns).be("picker", "panel"), _ctx.popperClass],
        "popper-style": _ctx.popperStyle,
        "stop-popper-mouse-event": false,
        pure: "",
        loop: "",
        role: "dialog",
        effect: "light",
        trigger: "click",
        teleported: _ctx.teleported,
        transition: `${unref(ns).namespace.value}-zoom-in-top`,
        persistent: _ctx.persistent,
        "append-to": _ctx.appendTo,
        onShow: handleShowTooltip,
        onHide: _cache[2] || (_cache[2] = ($event) => setShowPicker(false))
      }, {
        content: withCtx(() => [
          withDirectives((openBlock(), createBlock(
            unref(ElColorPickerPanel),
            mergeProps({
              ref_key: "pickerPanelRef",
              ref: pickerPanelRef
            }, panelProps.value, {
              border: false,
              "validate-event": false,
              onKeydown: withKeys(handleEsc, ["esc"])
            }),
            {
              footer: withCtx(() => [
                createElementVNode("div", null, [
                  _ctx.clearable ? (openBlock(), createBlock(unref(ElButton), {
                    key: 0,
                    class: normalizeClass(unref(ns).be("footer", "link-btn")),
                    text: "",
                    size: "small",
                    onClick: clear
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(unref(t)("el.colorpicker.clear")),
                        1
                      )
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("v-if", true),
                  createVNode(unref(ElButton), {
                    plain: "",
                    size: "small",
                    class: normalizeClass(unref(ns).be("footer", "btn")),
                    onClick: confirmValue
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(unref(t)("el.colorpicker.confirm")),
                        1
                      )
                    ]),
                    _: 1
                  }, 8, ["class"])
                ])
              ]),
              _: 1
            },
            16
          )), [
            [unref(ClickOutside), handleClickOutside, triggerRef.value]
          ])
        ]),
        default: withCtx(() => [
          createElementVNode("div", mergeProps({
            id: unref(buttonId),
            ref_key: "triggerRef",
            ref: triggerRef
          }, _ctx.$attrs, {
            class: btnKls.value,
            role: "button",
            "aria-label": buttonAriaLabel.value,
            "aria-labelledby": buttonAriaLabelledby.value,
            "aria-description": unref(t)("el.colorpicker.description", { color: _ctx.modelValue || "" }),
            "aria-disabled": unref(colorDisabled),
            tabindex: unref(colorDisabled) ? void 0 : _ctx.tabindex,
            onKeydown: handleKeyDown,
            onFocus: _cache[0] || (_cache[0] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
            onBlur: _cache[1] || (_cache[1] = (...args) => unref(handleBlur) && unref(handleBlur)(...args))
          }), [
            createElementVNode(
              "div",
              {
                class: normalizeClass(unref(ns).be("picker", "trigger")),
                onClick: handleTrigger
              },
              [
                createElementVNode(
                  "span",
                  {
                    class: normalizeClass([unref(ns).be("picker", "color"), unref(ns).is("alpha", _ctx.showAlpha)])
                  },
                  [
                    createElementVNode(
                      "span",
                      {
                        class: normalizeClass(unref(ns).be("picker", "color-inner")),
                        style: normalizeStyle({
                          backgroundColor: displayedColor.value
                        })
                      },
                      [
                        withDirectives(createVNode(unref(ElIcon), {
                          class: normalizeClass([unref(ns).be("picker", "icon"), unref(ns).is("icon-arrow-down")])
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(arrow_down_default))
                          ]),
                          _: 1
                        }, 8, ["class"]), [
                          [vShow, _ctx.modelValue || showPanelColor.value]
                        ]),
                        withDirectives(createVNode(unref(ElIcon), {
                          class: normalizeClass([unref(ns).be("picker", "empty"), unref(ns).is("icon-close")])
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(close_default))
                          ]),
                          _: 1
                        }, 8, ["class"]), [
                          [vShow, !_ctx.modelValue && !showPanelColor.value]
                        ])
                      ],
                      6
                    )
                  ],
                  2
                )
              ],
              2
            )
          ], 16, _hoisted_1)
        ]),
        _: 1
      }, 8, ["visible", "popper-class", "popper-style", "teleported", "transition", "persistent", "append-to"]);
    };
  }
});
var ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/color-picker/src/color-picker.vue"]]);
const ElColorPicker = withInstall(ColorPicker);
export {
  ElColorPicker as E,
  ROOT_COMMON_COLOR_INJECTION_KEY as R,
  colorPickerPanelEmits as a,
  colorPickerPanelProps as b,
  colorPickerPanelContextKey as c,
  ElColorPickerPanel as d,
  colorPickerEmits as e,
  colorPickerProps as f
};
//# sourceMappingURL=index-DNS59kyd.js.map
