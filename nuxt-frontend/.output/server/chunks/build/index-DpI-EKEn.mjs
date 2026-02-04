import { u as useAriaProps } from './index-DqrhOzxH.mjs';
import { isString, isArray, isObject } from '@vue/shared';
import { f as useNamespace, e as debugWarn, i as isNumber$1, j as isBoolean$1, A as isPropAbsent, s as isUndefined$1 } from './server.mjs';
import { a as useSizeProp } from './index-CO6H4Lsj.mjs';
import { U as UPDATE_MODEL_EVENT, C as CHANGE_EVENT } from './event-BZTOGHfp.mjs';
import { defineComponent, computed, provide, toRefs, watch, openBlock, createBlock, resolveDynamicComponent, unref, normalizeClass, withCtx, renderSlot, createElementBlock, Fragment, renderList, mergeProps, useSlots, inject, withDirectives, createElementVNode, isRef, withModifiers, vModelCheckbox, normalizeStyle, createTextVNode, toDisplayString, createCommentVNode, nextTick, ref, getCurrentInstance, toRaw } from 'vue';
import { f as formContextKey } from './constants-hAKFmBbq.mjs';
import { u as useFormDisabled, a as useFormItem, c as useFormItemInputId, b as useFormSize } from './use-form-item-Bj_anzlj.mjs';
import { pick, isEqual, omit } from 'lodash-unified';
import { u as useDeprecated } from './index-DZvUdcyn.mjs';
import { e as withNoopInstall, w as withInstall, b as buildProps, d as definePropType } from './install-VBSKbHUK.mjs';

const checkboxProps = {
  /**
   * @description binding value
   */
  modelValue: {
    type: [Number, String, Boolean],
    default: void 0
  },
  /**
   * @description label of the Checkbox when used inside a `checkbox-group`
   */
  label: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  /**
   * @description value of the Checkbox when used inside a `checkbox-group`
   */
  value: {
    type: [String, Boolean, Number, Object],
    default: void 0
  },
  /**
   * @description Set indeterminate state, only responsible for style control
   */
  indeterminate: Boolean,
  /**
   * @description whether the Checkbox is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description if the Checkbox is checked
   */
  checked: Boolean,
  /**
   * @description native 'name' attribute
   */
  name: {
    type: String,
    default: void 0
  },
  /**
   * @description value of the Checkbox if it's checked
   */
  trueValue: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @description value of the Checkbox if it's not checked
   */
  falseValue: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @deprecated use `trueValue` instead
   * @description value of the Checkbox if it's checked
   */
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @deprecated use `falseValue` instead
   * @description value of the Checkbox if it's not checked
   */
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  /**
   * @description input id
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description whether to add a border around Checkbox
   */
  border: Boolean,
  /**
   * @description size of the Checkbox
   */
  size: useSizeProp,
  /**
   * @description input tabindex
   */
  tabindex: [String, Number],
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  ariaLabel: String,
  ...useAriaProps(["ariaControls"])
};
const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber$1(val) || isBoolean$1(val),
  change: (val) => isString(val) || isNumber$1(val) || isBoolean$1(val)
};
const checkboxPropsDefaults = {
  modelValue: void 0,
  label: void 0,
  value: void 0,
  disabled: void 0,
  name: void 0,
  trueValue: void 0,
  falseValue: void 0,
  trueLabel: void 0,
  falseLabel: void 0,
  id: void 0,
  validateEvent: true
};
const checkboxGroupContextKey = /* @__PURE__ */ Symbol("checkboxGroupContextKey");
const useCheckboxDisabled = ({
  model,
  isChecked
}) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const formContext = inject(formContextKey, void 0);
  const isLimitDisabled = computed(() => {
    var _a, _b;
    const max = (_a = checkboxGroup == null ? void 0 : checkboxGroup.max) == null ? void 0 : _a.value;
    const min = (_b = checkboxGroup == null ? void 0 : checkboxGroup.min) == null ? void 0 : _b.value;
    return !isUndefined$1(max) && model.value.length >= max && !isChecked.value || !isUndefined$1(min) && model.value.length <= min && isChecked.value;
  });
  const isDisabled = useFormDisabled(
    computed(() => {
      var _a, _b;
      if (checkboxGroup === void 0) {
        return (_a = formContext == null ? void 0 : formContext.disabled) != null ? _a : isLimitDisabled.value;
      } else {
        return ((_b = checkboxGroup.disabled) == null ? void 0 : _b.value) || isLimitDisabled.value;
      }
    })
  );
  return {
    isDisabled,
    isLimitDisabled
  };
};
const useCheckboxEvent = (props, {
  model,
  isLimitExceeded,
  hasOwnLabel,
  isDisabled,
  isLabeledByFormItem
}) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const { formItem } = useFormItem();
  const { emit } = getCurrentInstance();
  function getLabeledValue(value) {
    var _a, _b, _c, _d;
    return [true, props.trueValue, props.trueLabel].includes(value) ? (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true : (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false;
  }
  function emitChangeEvent(checked, e) {
    emit(CHANGE_EVENT, getLabeledValue(checked), e);
  }
  function handleChange(e) {
    if (isLimitExceeded.value) return;
    const target = e.target;
    emit(CHANGE_EVENT, getLabeledValue(target.checked), e);
  }
  async function onClickRoot(e) {
    if (isLimitExceeded.value) return;
    if (!hasOwnLabel.value && !isDisabled.value && isLabeledByFormItem.value) {
      const eventTargets = e.composedPath();
      const hasLabel = eventTargets.some(
        (item) => item.tagName === "LABEL"
      );
      if (!hasLabel) {
        model.value = getLabeledValue(
          [false, props.falseValue, props.falseLabel].includes(model.value)
        );
        await nextTick();
        emitChangeEvent(model.value, e);
      }
    }
  }
  const validateEvent = computed(
    () => (checkboxGroup == null ? void 0 : checkboxGroup.validateEvent) || props.validateEvent
  );
  watch(
    () => props.modelValue,
    () => {
      if (validateEvent.value) {
        formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
      }
    }
  );
  return {
    handleChange,
    onClickRoot
  };
};
const useCheckboxModel = (props) => {
  const selfModel = ref(false);
  const { emit } = getCurrentInstance();
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const isGroup = computed(() => isUndefined$1(checkboxGroup) === false);
  const isLimitExceeded = ref(false);
  const model = computed({
    get() {
      var _a, _b;
      return isGroup.value ? (_a = checkboxGroup == null ? void 0 : checkboxGroup.modelValue) == null ? void 0 : _a.value : (_b = props.modelValue) != null ? _b : selfModel.value;
    },
    set(val) {
      var _a, _b;
      if (isGroup.value && isArray(val)) {
        isLimitExceeded.value = ((_a = checkboxGroup == null ? void 0 : checkboxGroup.max) == null ? void 0 : _a.value) !== void 0 && val.length > (checkboxGroup == null ? void 0 : checkboxGroup.max.value) && val.length > model.value.length;
        isLimitExceeded.value === false && ((_b = checkboxGroup == null ? void 0 : checkboxGroup.changeEvent) == null ? void 0 : _b.call(checkboxGroup, val));
      } else {
        emit(UPDATE_MODEL_EVENT, val);
        selfModel.value = val;
      }
    }
  });
  return {
    model,
    isGroup,
    isLimitExceeded
  };
};
const useCheckboxStatus = (props, slots, { model }) => {
  const checkboxGroup = inject(checkboxGroupContextKey, void 0);
  const isFocused = ref(false);
  const actualValue = computed(() => {
    if (!isPropAbsent(props.value)) {
      return props.value;
    }
    return props.label;
  });
  const isChecked = computed(() => {
    const value = model.value;
    if (isBoolean$1(value)) {
      return value;
    } else if (isArray(value)) {
      if (isObject(actualValue.value)) {
        return value.map(toRaw).some((o) => isEqual(o, actualValue.value));
      } else {
        return value.map(toRaw).includes(actualValue.value);
      }
    } else if (value !== null && value !== void 0) {
      return value === props.trueValue || value === props.trueLabel;
    } else {
      return !!value;
    }
  });
  const checkboxButtonSize = useFormSize(
    computed(() => {
      var _a;
      return (_a = checkboxGroup == null ? void 0 : checkboxGroup.size) == null ? void 0 : _a.value;
    }),
    {
      prop: true
    }
  );
  const checkboxSize = useFormSize(computed(() => {
    var _a;
    return (_a = checkboxGroup == null ? void 0 : checkboxGroup.size) == null ? void 0 : _a.value;
  }));
  const hasOwnLabel = computed(() => {
    return !!slots.default || !isPropAbsent(actualValue.value);
  });
  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
    actualValue
  };
};
const useCheckbox = (props, slots) => {
  const { formItem: elFormItem } = useFormItem();
  const { model, isGroup, isLimitExceeded } = useCheckboxModel(props);
  const {
    isFocused,
    isChecked,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    actualValue
  } = useCheckboxStatus(props, slots, { model });
  const { isDisabled } = useCheckboxDisabled({ model, isChecked });
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: elFormItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup
  });
  const { handleChange, onClickRoot } = useCheckboxEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem
  });
  const setStoreValue = () => {
    function addToStore() {
      var _a, _b;
      if (isArray(model.value) && !model.value.includes(actualValue.value)) {
        model.value.push(actualValue.value);
      } else {
        model.value = (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true;
      }
    }
    props.checked && addToStore();
  };
  setStoreValue();
  useDeprecated(
    {
      from: "label act as value",
      replacement: "value",
      version: "3.0.0",
      scope: "el-checkbox",
      ref: "https://element-plus.org/en-US/component/checkbox.html"
    },
    computed(() => isGroup.value && isPropAbsent(props.value))
  );
  useDeprecated(
    {
      from: "true-label",
      replacement: "true-value",
      version: "3.0.0",
      scope: "el-checkbox",
      ref: "https://element-plus.org/en-US/component/checkbox.html"
    },
    computed(() => !!props.trueLabel)
  );
  useDeprecated(
    {
      from: "false-label",
      replacement: "false-value",
      version: "3.0.0",
      scope: "el-checkbox",
      ref: "https://element-plus.org/en-US/component/checkbox.html"
    },
    computed(() => !!props.falseLabel)
  );
  return {
    inputId,
    isLabeledByFormItem,
    isChecked,
    isDisabled,
    isFocused,
    checkboxButtonSize,
    checkboxSize,
    hasOwnLabel,
    model,
    actualValue,
    handleChange,
    onClickRoot
  };
};
const _hoisted_1$1 = ["id", "indeterminate", "name", "tabindex", "disabled"];
var _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckbox"
  },
  __name: "checkbox",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      inputId,
      isLabeledByFormItem,
      isChecked,
      isDisabled,
      isFocused,
      checkboxSize,
      hasOwnLabel,
      model,
      actualValue,
      handleChange,
      onClickRoot
    } = useCheckbox(props, slots);
    const inputBindings = computed(() => {
      var _a, _b, _c, _d;
      if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) {
        return {
          "true-value": (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true,
          "false-value": (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false
        };
      }
      return {
        value: actualValue.value
      };
    });
    const ns = useNamespace("checkbox");
    const compKls = computed(() => {
      return [
        ns.b(),
        ns.m(checkboxSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("bordered", props.border),
        ns.is("checked", isChecked.value)
      ];
    });
    const spanKls = computed(() => {
      return [
        ns.e("input"),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(!unref(hasOwnLabel) && unref(isLabeledByFormItem) ? "span" : "label"), {
        for: !unref(hasOwnLabel) && unref(isLabeledByFormItem) ? null : unref(inputId),
        class: normalizeClass(compKls.value),
        "aria-controls": __props.indeterminate ? __props.ariaControls : null,
        "aria-checked": __props.indeterminate ? "mixed" : void 0,
        "aria-label": __props.ariaLabel,
        onClick: unref(onClickRoot)
      }, {
        default: withCtx(() => [
          createElementVNode(
            "span",
            {
              class: normalizeClass(spanKls.value)
            },
            [
              withDirectives(createElementVNode("input", mergeProps({
                id: unref(inputId),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
                class: unref(ns).e("original"),
                type: "checkbox",
                indeterminate: __props.indeterminate,
                name: __props.name,
                tabindex: __props.tabindex,
                disabled: unref(isDisabled)
              }, inputBindings.value, {
                onChange: _cache[1] || (_cache[1] = //@ts-ignore
                (...args) => unref(handleChange) && unref(handleChange)(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
                onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
                onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                }, ["stop"]))
              }), null, 16, _hoisted_1$1), [
                [vModelCheckbox, unref(model)]
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
          unref(hasOwnLabel) ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("label"))
            },
            [
              renderSlot(_ctx.$slots, "default"),
              !_ctx.$slots.default ? (openBlock(), createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(__props.label),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["for", "class", "aria-controls", "aria-checked", "aria-label", "onClick"]);
    };
  }
});
const _hoisted_1 = ["name", "tabindex", "disabled"];
var _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckboxButton"
  },
  __name: "checkbox-button",
  props: checkboxProps,
  emits: checkboxEmits,
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const {
      isFocused,
      isChecked,
      isDisabled,
      checkboxButtonSize,
      model,
      actualValue,
      handleChange
    } = useCheckbox(props, slots);
    const inputBindings = computed(() => {
      var _a, _b, _c, _d;
      if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) {
        return {
          "true-value": (_b = (_a = props.trueValue) != null ? _a : props.trueLabel) != null ? _b : true,
          "false-value": (_d = (_c = props.falseValue) != null ? _c : props.falseLabel) != null ? _d : false
        };
      }
      return {
        value: actualValue.value
      };
    });
    const checkboxGroup = inject(checkboxGroupContextKey, void 0);
    const ns = useNamespace("checkbox");
    const activeStyle = computed(() => {
      var _a, _b, _c, _d;
      const fillValue = (_b = (_a = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a.value) != null ? _b : "";
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
      };
    });
    const labelKls = computed(() => {
      return [
        ns.b("button"),
        ns.bm("button", checkboxButtonSize.value),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("focus", isFocused.value)
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "label",
        {
          class: normalizeClass(labelKls.value)
        },
        [
          withDirectives(createElementVNode("input", mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
            class: unref(ns).be("button", "original"),
            type: "checkbox",
            name: __props.name,
            tabindex: __props.tabindex,
            disabled: unref(isDisabled)
          }, inputBindings.value, {
            onChange: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => unref(handleChange) && unref(handleChange)(...args)),
            onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
            onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
            onClick: _cache[4] || (_cache[4] = withModifiers(() => {
            }, ["stop"]))
          }), null, 16, _hoisted_1), [
            [vModelCheckbox, unref(model)]
          ]),
          _ctx.$slots.default || __props.label ? (openBlock(), createElementBlock(
            "span",
            {
              key: 0,
              class: normalizeClass(unref(ns).be("button", "inner")),
              style: normalizeStyle(unref(isChecked) ? activeStyle.value : void 0)
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
            6
            /* CLASS, STYLE */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});
const checkboxGroupProps = buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: definePropType(Array),
    default: () => []
  },
  /**
   * @description whether the nesting checkboxes are disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description minimum number of checkbox checked
   */
  min: Number,
  /**
   * @description maximum number of checkbox checked
   */
  max: Number,
  /**
   * @description size of checkbox
   */
  size: useSizeProp,
  /**
   * @description border and background color when button is active
   */
  fill: String,
  /**
   * @description font color when button is active
   */
  textColor: String,
  /**
   * @description element tag of the checkbox group
   */
  tag: {
    type: String,
    default: "div"
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
    default: () => checkboxDefaultProps
  },
  type: {
    type: String,
    values: ["checkbox", "button"],
    default: "checkbox"
  },
  ...useAriaProps(["ariaLabel"])
});
const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val) => isArray(val),
  change: (val) => isArray(val)
};
const checkboxDefaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled"
};
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElCheckboxGroup"
  },
  __name: "checkbox-group",
  props: checkboxGroupProps,
  emits: checkboxGroupEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("checkbox");
    const checkboxDisabled = useFormDisabled();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem
    });
    const changeEvent = async (value) => {
      emit(UPDATE_MODEL_EVENT, value);
      await nextTick();
      emit(CHANGE_EVENT, value);
    };
    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      }
    });
    const aliasProps = computed(() => ({
      ...checkboxDefaultProps,
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
    provide(checkboxGroupContextKey, {
      ...pick(toRefs(props), [
        "size",
        "min",
        "max",
        "validateEvent",
        "fill",
        "textColor"
      ]),
      disabled: checkboxDisabled,
      modelValue,
      changeEvent
    });
    watch(
      () => props.modelValue,
      (newVal, oldValue) => {
        if (props.validateEvent && !isEqual(newVal, oldValue)) {
          formItem == null ? void 0 : formItem.validate("change").catch((err) => debugWarn());
        }
      }
    );
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        id: unref(groupId),
        class: normalizeClass(unref(ns).b("group")),
        role: "group",
        "aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "checkbox-group" : void 0,
        "aria-labelledby": unref(isLabeledByFormItem) ? (_a = unref(formItem)) == null ? void 0 : _a.labelId : void 0
      }, {
        default: withCtx(() => [
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
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
    };
  }
});
const ElCheckbox = withInstall(_sfc_main$2, {
  CheckboxButton: _sfc_main$1,
  CheckboxGroup: _sfc_main
});
const ElCheckboxButton = withNoopInstall(_sfc_main$1);
const ElCheckboxGroup = withNoopInstall(_sfc_main);

export { ElCheckbox as E, ElCheckboxGroup as a, ElCheckboxButton as b, checkboxDefaultProps as c, checkboxEmits as d, checkboxGroupContextKey as e, checkboxGroupEmits as f, checkboxGroupProps as g, checkboxProps as h, checkboxPropsDefaults as i };
//# sourceMappingURL=index-DpI-EKEn.mjs.map
