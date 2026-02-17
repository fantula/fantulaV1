import { b as buildProps, d as definePropType, e as withNoopInstall, w as withInstall } from "./install-VBSKbHUK.js";
import { a as useSizeProp } from "./index-C1njJNPQ.js";
import { isString } from "@vue/shared";
import { i as isNumber, o as isBoolean, I as isPropAbsent, b as useNamespace, x as useId, d as debugWarn } from "../server.mjs";
import { C as CHANGE_EVENT, U as UPDATE_MODEL_EVENT } from "./event-BZTOGHfp.js";
import { ref, inject, computed, defineComponent, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withDirectives, withModifiers, isRef, vModelRadio, renderSlot, createTextVNode, toDisplayString, nextTick, normalizeStyle, provide, reactive, toRefs, watch, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps } from "vue";
import { a as useFormSize, b as useFormDisabled, u as useFormItem, c as useFormItemInputId } from "./use-form-item-BJm4fR6K.js";
import { u as useDeprecated } from "./index-BmUjCntg.js";
import { u as useAriaProps } from "./index-DqrhOzxH.js";
import { isEqual, omit } from "lodash-unified";
const radioPropsBase = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description size of the Radio
   */
  size: useSizeProp,
  /**
   * @description whether Radio is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description the label of Radio
   */
  label: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description the value of Radio
   */
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: void 0
  }
});
const radioProps = buildProps({
  ...radioPropsBase,
  /**
   * @description whether to add a border around Radio
   */
  border: Boolean
});
const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val)
};
const radioPropsDefaults = {
  modelValue: void 0,
  disabled: void 0,
  label: void 0,
  value: void 0,
  name: void 0,
  border: false
};
const radioGroupKey = /* @__PURE__ */ Symbol("radioGroupKey");
const useRadio = (props, emit) => {
  const radioRef = ref();
  const radioGroup = inject(radioGroupKey, void 0);
  const isGroup = computed(() => !!radioGroup);
  const actualValue = computed(() => {
    if (!isPropAbsent(props.value)) {
      return props.value;
    }
    return props.label;
  });
  const modelValue = computed({
    get() {
      return isGroup.value ? radioGroup.modelValue : props.modelValue;
    },
    set(val) {
      if (isGroup.value) {
        radioGroup.changeEvent(val);
      } else {
        emit && emit(UPDATE_MODEL_EVENT, val);
      }
      radioRef.value.checked = props.modelValue === actualValue.value;
    }
  });
  const size = useFormSize(computed(() => radioGroup == null ? void 0 : radioGroup.size));
  const disabled = useFormDisabled(computed(() => radioGroup == null ? void 0 : radioGroup.disabled));
  const focus = ref(false);
  const tabIndex = computed(() => {
    return disabled.value || isGroup.value && modelValue.value !== actualValue.value ? -1 : 0;
  });
  useDeprecated(
    {
      from: "label act as value",
      replacement: "value",
      version: "3.0.0",
      scope: "el-radio",
      ref: "https://element-plus.org/en-US/component/radio.html"
    },
    computed(() => isGroup.value && isPropAbsent(props.value))
  );
  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    size,
    disabled,
    tabIndex,
    modelValue,
    actualValue
  };
};
const _hoisted_1$2 = ["value", "name", "disabled", "checked"];
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRadio"
  },
  __name: "radio",
  props: radioProps,
  emits: radioEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const { radioRef, radioGroup, focus, size, disabled, modelValue, actualValue } = useRadio(props, emit);
    function handleChange() {
      nextTick(() => emit(CHANGE_EVENT, modelValue.value));
    }
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("focus", unref(focus)),
            unref(ns).is("bordered", __props.border),
            unref(ns).is("checked", unref(modelValue) === unref(actualValue)),
            unref(ns).m(unref(size))
          ])
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass([
                unref(ns).e("input"),
                unref(ns).is("disabled", unref(disabled)),
                unref(ns).is("checked", unref(modelValue) === unref(actualValue))
              ])
            },
            [
              withDirectives(createElementVNode("input", {
                ref_key: "radioRef",
                ref: radioRef,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
                class: normalizeClass(unref(ns).e("original")),
                value: unref(actualValue),
                name: __props.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
                disabled: unref(disabled),
                checked: unref(modelValue) === unref(actualValue),
                type: "radio",
                onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
                onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
                onChange: handleChange,
                onClick: _cache[3] || (_cache[3] = withModifiers(() => {
                }, ["stop"]))
              }, null, 42, _hoisted_1$2), [
                [vModelRadio, unref(modelValue)]
              ]),
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("inner"))
                },
                null,
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("label")),
              onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(__props.label),
                  1
                  /* TEXT */
                )
              ])
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});
const radioButtonProps = buildProps({
  ...radioPropsBase
});
const radioButtonPropsDefaults = {
  modelValue: void 0,
  disabled: void 0,
  label: void 0,
  value: void 0,
  name: void 0
};
const _hoisted_1$1 = ["value", "name", "disabled"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRadioButton"
  },
  __name: "radio-button",
  props: radioButtonProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("radio");
    const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = useRadio(props);
    const activeStyle = computed(() => {
      return {
        backgroundColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        borderColor: (radioGroup == null ? void 0 : radioGroup.fill) || "",
        boxShadow: (radioGroup == null ? void 0 : radioGroup.fill) ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: (radioGroup == null ? void 0 : radioGroup.textColor) || ""
      };
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass([
            unref(ns).b("button"),
            unref(ns).is("active", unref(modelValue) === unref(actualValue)),
            unref(ns).is("disabled", unref(disabled)),
            unref(ns).is("focus", unref(focus)),
            unref(ns).bm("button", unref(size))
          ])
        },
        [
          withDirectives(createElementVNode("input", {
            ref_key: "radioRef",
            ref: radioRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
            class: normalizeClass(unref(ns).be("button", "original-radio")),
            value: unref(actualValue),
            type: "radio",
            name: __props.name || ((_a = unref(radioGroup)) == null ? void 0 : _a.name),
            disabled: unref(disabled),
            onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
            onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
            onClick: _cache[3] || (_cache[3] = withModifiers(() => {
            }, ["stop"]))
          }, null, 42, _hoisted_1$1), [
            [vModelRadio, unref(modelValue)]
          ]),
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).be("button", "inner")),
              style: normalizeStyle(unref(modelValue) === unref(actualValue) ? activeStyle.value : {}),
              onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
              }, ["stop"]))
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(
                  toDisplayString(__props.label),
                  1
                  /* TEXT */
                )
              ])
            ],
            38
            /* CLASS, STYLE, NEED_HYDRATION */
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});
const radioDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
const radioGroupProps = buildProps({
  /**
   * @description native `id` attribute
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description the size of radio buttons or bordered radios
   */
  size: useSizeProp,
  /**
   * @description whether the nesting radios are disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: void 0
  },
  /**
   * @description border and background color when button is active
   */
  fill: {
    type: String,
    default: ""
  },
  /**
   * @description font color when button is active
   */
  textColor: {
    type: String,
    default: ""
  },
  /**
   * @description native `name` attribute
   */
  name: {
    type: String,
    default: void 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  options: {
    type: definePropType(Array)
  },
  props: {
    type: definePropType(Object),
    default: () => radioDefaultProps
  },
  type: {
    type: String,
    values: ["radio", "button"],
    default: "radio"
  },
  ...useAriaProps(["ariaLabel"])
});
const radioGroupEmits = radioEmits;
const radioGroupPropsDefaults = {
  id: void 0,
  disabled: void 0,
  modelValue: void 0,
  fill: "",
  textColor: "",
  name: void 0,
  validateEvent: true,
  props: () => radioDefaultProps,
  type: "radio"
};
const _hoisted_1 = ["id", "aria-label", "aria-labelledby"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElRadioGroup"
  },
  __name: "radio-group",
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const radioId = useId();
    const radioGroupRef = ref();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => emit(CHANGE_EVENT, value));
    };
    const name = computed(() => {
      return props.name || radioId.value;
    });
    const aliasProps = computed(() => ({
      ...radioDefaultProps,
      ...props.props
    }));
    const getOptionProps = (option) => {
      const { label, value, disabled } = aliasProps.value;
      const base = {
        label: option[label],
        value: option[value],
        disabled: option[disabled]
      };
      return { ...omit(option, [label, value, disabled]), ...base };
    };
    const optionComponent = computed(
      () => props.type === "button" ? _sfc_main$1 : _sfc_main$2
    );
    provide(
      radioGroupKey,
      reactive({
        ...toRefs(props),
        changeEvent,
        name
      })
    );
    watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn(err));
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: unref(groupId),
        ref_key: "radioGroupRef",
        ref: radioGroupRef,
        class: normalizeClass(unref(ns).b("group")),
        role: "radiogroup",
        "aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "radio-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem).labelId : void 0
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          (openBlock(true), createElementBlock(
            Fragment,
            null,
            renderList(__props.options, (item, index) => {
              return openBlock(), createBlock(
                resolveDynamicComponent(optionComponent.value),
                mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)),
                null,
                16
                /* FULL_PROPS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ], 10, _hoisted_1);
    };
  }
});
const ElRadio = withInstall(_sfc_main$2, {
  RadioButton: _sfc_main$1,
  RadioGroup: _sfc_main
});
const ElRadioGroup = withNoopInstall(_sfc_main);
const ElRadioButton = withNoopInstall(_sfc_main$1);
export {
  ElRadioGroup as E,
  ElRadioButton as a,
  ElRadio as b,
  radioButtonPropsDefaults as c,
  radioDefaultProps as d,
  radioEmits as e,
  radioGroupEmits as f,
  radioGroupKey as g,
  radioGroupProps as h,
  radioGroupPropsDefaults as i,
  radioProps as j,
  radioPropsBase as k,
  radioPropsDefaults as l,
  radioButtonProps as r
};
//# sourceMappingURL=index-tnznqLDe.js.map
