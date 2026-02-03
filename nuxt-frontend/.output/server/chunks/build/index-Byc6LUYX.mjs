import { w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';
import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';
import { f as useNamespace, i as isNumber$1, d as isStringNumber } from './server.mjs';
import { isClient } from '@vueuse/core';
import { isString, camelize, isObject } from '@vue/shared';
import { e as entriesOf } from './objects-Bz74KHmq.mjs';

const iconProps = buildProps({
  /**
   * @description SVG icon size, size x size
   */
  size: {
    type: definePropType([Number, String])
  },
  /**
   * @description SVG tag's fill attribute
   */
  color: {
    type: String
  }
});
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim()) return;
  el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
  var _a;
  if (!isClient || !element || !styleName) return "";
  let key = camelize(styleName);
  if (key === "float") key = "cssFloat";
  try {
    const style = element.style[key];
    if (style) return style;
    const computed2 = (_a = (void 0).defaultView) == null ? void 0 : _a.getComputedStyle(element, "");
    return computed2 ? computed2[key] : "";
  } catch (e) {
    return element.style[key];
  }
};
const setStyle = (element, styleName, value) => {
  if (!element || !styleName) return;
  if (isObject(styleName)) {
    entriesOf(styleName).forEach(
      ([prop, value2]) => setStyle(element, prop, value2)
    );
  } else {
    const key = camelize(styleName);
    element.style[key] = value;
  }
};
function addUnit(value, defaultUnit = "px") {
  if (!value && value !== 0) return "";
  if (isNumber$1(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
}
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElIcon",
    inheritAttrs: false
  },
  __name: "icon",
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      const fontSize = addUnit(size);
      if (!fontSize && !color) return {};
      return {
        fontSize,
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "i",
        mergeProps({
          class: unref(ns).b(),
          style: style.value
        }, _ctx.$attrs),
        [
          renderSlot(_ctx.$slots, "default")
        ],
        16
        /* FULL_PROPS */
      );
    };
  }
});
const ElIcon = withInstall(_sfc_main);

export { ElIcon as E, addUnit as a, addClass as b, getStyle as g, hasClass as h, iconProps as i, removeClass as r, setStyle as s };
//# sourceMappingURL=index-Byc6LUYX.mjs.map
