import { l as loading_default } from "./index-CbQ9NNm4.js";
import { b as buildProps, d as definePropType, w as withInstall, e as withNoopInstall } from "./install-VBSKbHUK.js";
import { i as iconPropType } from "./icon-D-Vgi0cb.js";
import { a as useSizeProp } from "./index-C1njJNPQ.js";
import { watch, unref, computed, inject, ref, useSlots, Text, defineComponent, openBlock, createBlock, resolveDynamicComponent, mergeProps, withCtx, createElementBlock, Fragment, renderSlot, normalizeClass, createCommentVNode, provide, reactive, toRef } from "vue";
import { E as ElIcon } from "./index-C4aUwruK.js";
import { d as debugWarn, b as useNamespace } from "../server.mjs";
import { a as useGlobalConfig } from "./use-global-config-CaR6i8cb.js";
import { u as useFormItem, a as useFormSize, b as useFormDisabled } from "./use-form-item-BJm4fR6K.js";
import { TinyColor } from "@ctrl/tinycolor";
const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  "text",
  ""
];
const buttonNativeTypes = ["button", "submit", "reset"];
const buttonProps = buildProps({
  /**
   * @description button size
   */
  size: useSizeProp,
  /**
   * @description disable the button
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description button type
   */
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType
  },
  /**
   * @description native button type
   */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  /**
   * @description customize loading icon component
   */
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  /**
   * @description determine whether it's a plain button
   */
  plain: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description determine whether it's a text button
   */
  text: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description determine whether it's a link button
   */
  link: Boolean,
  /**
   * @description determine whether the text button background color is always on
   */
  bg: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description determine whether it's a circle button
   */
  circle: Boolean,
  /**
   * @description custom button color, automatically calculate `hover` and `active` color
   */
  color: String,
  /**
   * @description dark mode, which automatically converts `color` to dark mode colors
   */
  dark: Boolean,
  /**
   * @description automatically insert a space between two chinese characters
   */
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description custom element tag
   */
  tag: {
    type: definePropType([String, Object]),
    default: "button"
  }
});
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const buttonGroupContextKey = /* @__PURE__ */ Symbol(
  "buttonGroupContextKey"
);
const useDeprecated = ({ from, replacement, scope, version, ref: ref2, type = "API" }, condition) => {
  watch(
    () => unref(condition),
    (val) => {
      if (val) {
        debugWarn(
          scope,
          `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref2}
`
        );
      }
    },
    {
      immediate: true
    }
  );
};
const useButton = (props, emit) => {
  useDeprecated(
    {
      from: "type.text",
      replacement: "link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
    },
    computed(() => props.type === "text")
  );
  const buttonGroupContext = inject(buttonGroupContextKey, void 0);
  const globalConfig = useGlobalConfig("button");
  const { form } = useFormItem();
  const _size = useFormSize(computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
  const _disabled = useFormDisabled();
  const _ref = ref();
  const slots = useSlots();
  const _type = computed(
    () => {
      var _a;
      return props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || ((_a = globalConfig.value) == null ? void 0 : _a.type) || "";
    }
  );
  const autoInsertSpace = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.autoInsertSpace) != null ? _c : false;
    }
  );
  const _plain = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = props.plain) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.plain) != null ? _c : false;
    }
  );
  const _round = computed(
    () => {
      var _a, _b, _c;
      return (_c = (_b = props.round) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.round) != null ? _c : false;
    }
  );
  const _text = computed(() => {
    var _a, _b, _c;
    return (_c = (_b = props.text) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.text) != null ? _c : false;
  });
  const _props = computed(() => {
    if (props.tag === "button") {
      return {
        ariaDisabled: _disabled.value || props.loading,
        disabled: _disabled.value || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType
      };
    }
    return {};
  });
  const shouldAddSpace = computed(() => {
    var _a;
    const defaultSlot = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
      const slot = defaultSlot[0];
      if ((slot == null ? void 0 : slot.type) === Text) {
        const text = slot.children;
        return new RegExp("^\\p{Unified_Ideograph}{2}$", "u").test(text.trim());
      }
    }
    return false;
  });
  const handleClick = (evt) => {
    if (_disabled.value || props.loading) {
      evt.stopPropagation();
      return;
    }
    if (props.nativeType === "reset") {
      form == null ? void 0 : form.resetFields();
    }
    emit("click", evt);
  };
  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    _plain,
    _round,
    _text,
    shouldAddSpace,
    handleClick
  };
};
function darken(color, amount = 20) {
  return color.mix("#141414", amount).toString();
}
function useButtonCustomStyle(props) {
  const _disabled = useFormDisabled();
  const ns = useNamespace("button");
  return computed(() => {
    let styles = {};
    let buttonColor = props.color;
    if (buttonColor) {
      const match = buttonColor.match(/var\((.*?)\)/);
      if (match) {
        buttonColor = (void 0).getComputedStyle((void 0).document.documentElement).getPropertyValue(match[1]);
      }
      const color = new TinyColor(buttonColor);
      const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
      if (props.plain) {
        styles = ns.cssVarBlock({
          "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
          "text-color": buttonColor,
          "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
          "hover-text-color": `var(${ns.cssVarName("color-white")})`,
          "hover-bg-color": buttonColor,
          "hover-border-color": buttonColor,
          "active-bg-color": activeBgColor,
          "active-text-color": `var(${ns.cssVarName("color-white")})`,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
        }
      } else {
        const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
        const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
        styles = ns.cssVarBlock({
          "bg-color": buttonColor,
          "text-color": textColor,
          "border-color": buttonColor,
          "hover-bg-color": hoverBgColor,
          "hover-text-color": textColor,
          "hover-border-color": hoverBgColor,
          "active-bg-color": activeBgColor,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
          styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
        }
      }
    }
    return styles;
  });
}
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElButton"
  },
  __name: "button",
  props: buttonProps,
  emits: buttonEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const buttonStyle = useButtonCustomStyle(props);
    const ns = useNamespace("button");
    const {
      _ref,
      _size,
      _type,
      _disabled,
      _props,
      _plain,
      _round,
      _text,
      shouldAddSpace,
      handleClick
    } = useButton(props, emit);
    const buttonKls = computed(() => [
      ns.b(),
      ns.m(_type.value),
      ns.m(_size.value),
      ns.is("disabled", _disabled.value),
      ns.is("loading", props.loading),
      ns.is("plain", _plain.value),
      ns.is("round", _round.value),
      ns.is("circle", props.circle),
      ns.is("text", _text.value),
      ns.is("link", props.link),
      ns.is("has-bg", props.bg)
    ]);
    __expose({
      /** @description button html element */
      ref: _ref,
      /** @description button size */
      size: _size,
      /** @description button type */
      type: _type,
      /** @description button disabled */
      disabled: _disabled,
      /** @description whether adding space */
      shouldAddSpace
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), mergeProps({
        ref_key: "_ref",
        ref: _ref
      }, unref(_props), {
        class: buttonKls.value,
        style: unref(buttonStyle),
        onClick: unref(handleClick)
      }), {
        default: withCtx(() => [
          __props.loading ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
                key: 1,
                class: normalizeClass(unref(ns).is("loading"))
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.loadingIcon)))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"]))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
            default: withCtx(() => [
              __props.icon ? (openBlock(), createBlock(resolveDynamicComponent(__props.icon), { key: 0 })) : renderSlot(_ctx.$slots, "icon", { key: 1 })
            ]),
            _: 3
            /* FORWARDED */
          })) : createCommentVNode("v-if", true),
          _ctx.$slots.default ? (openBlock(), createElementBlock(
            "span",
            {
              key: 2,
              class: normalizeClass({ [unref(ns).em("text", "expand")]: unref(shouldAddSpace) })
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class", "style", "onClick"]);
    };
  }
});
const buttonGroupProps = {
  /**
   * @description control the size of buttons in this button-group
   */
  size: buttonProps.size,
  /**
   * @description control the type of buttons in this button-group
   */
  type: buttonProps.type,
  /**
   * @description display direction
   */
  direction: {
    type: definePropType(String),
    values: ["horizontal", "vertical"],
    default: "horizontal"
  }
};
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElButtonGroup"
  },
  __name: "button-group",
  props: buttonGroupProps,
  setup(__props) {
    const props = __props;
    provide(
      buttonGroupContextKey,
      reactive({
        size: toRef(props, "size"),
        type: toRef(props, "type")
      })
    );
    const ns = useNamespace("button");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b("group"), unref(ns).bm("group", props.direction)])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});
const ElButton = withInstall(_sfc_main$1, {
  ButtonGroup: _sfc_main
});
const ElButtonGroup = withNoopInstall(_sfc_main);
export {
  ElButton as E,
  ElButtonGroup as a,
  buttonTypes as b,
  buttonEmits as c,
  buttonGroupContextKey as d,
  buttonNativeTypes as e,
  buttonProps as f,
  useDeprecated as u
};
//# sourceMappingURL=index-BOdp6qaH.js.map
