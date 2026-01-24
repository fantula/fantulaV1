import { defineComponent, ref, reactive, computed, watch, createElementBlock, openBlock, withModifiers, normalizeClass, unref, withDirectives, createCommentVNode, createVNode, withKeys, renderSlot, withCtx, createBlock, createSlots } from 'vue';
import { isNil } from 'lodash-unified';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { B as withInstall, w as _export_sfc$1, r as isNumber$1, q as buildProps, y as useLocale, x as useNamespace, A as isUndefined$1, E as ElIcon, aZ as arrow_down_default, bz as minus_default, bx as arrow_up_default, p as plus_default, D as definePropType, ax as useSizeProp, X as throwError, v as debugWarn, V as getEventCode, bC as getEventKey, W as EVENT_CODE } from './server.mjs';
import { u as useAriaProps } from './index-Dxw_X3Hq.mjs';
import { U as UPDATE_MODEL_EVENT, I as INPUT_EVENT, C as CHANGE_EVENT } from './event-BZTOGHfp.mjs';
import { v as vRepeatClick } from './index-DOE061f1.mjs';
import { a as useFormItem, b as useFormSize, u as useFormDisabled } from './use-form-common-props-DlCG9pC5.mjs';
import { isString } from '@vue/shared';

const inputNumberProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: Boolean,
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER
  },
  modelValue: {
    type: [Number, null]
  },
  readonly: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  size: useSizeProp,
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: "",
    values: ["", "right"]
  },
  valueOnClear: {
    type: definePropType([String, Number, null]),
    validator: (val) => val === null || isNumber$1(val) || ["min", "max"].includes(val),
    default: null
  },
  name: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  ...useAriaProps(["ariaLabel"]),
  inputmode: {
    type: definePropType(String),
    default: void 0
  },
  align: {
    type: definePropType(String),
    default: "center"
  },
  disabledScientific: Boolean
});
const inputNumberEmits = {
  [CHANGE_EVENT]: (cur, prev) => prev !== cur,
  blur: (e) => e instanceof FocusEvent,
  focus: (e) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val) => isNumber$1(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val) => isNumber$1(val) || isNil(val)
};
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _sfc_main = defineComponent({
  ...{
    name: "ElInputNumber"
  },
  __name: "input-number",
  props: inputNumberProps,
  emits: inputNumberEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("input-number");
    const input = ref();
    const data = reactive({
      currentValue: props.modelValue,
      userInput: null
    });
    const { formItem } = useFormItem();
    const minDisabled = computed(
      () => isNumber$1(props.modelValue) && props.modelValue <= props.min
    );
    const maxDisabled = computed(
      () => isNumber$1(props.modelValue) && props.modelValue >= props.max
    );
    const numPrecision = computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (!isUndefined$1(props.precision)) {
        if (stepPrecision > props.precision) ;
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    const controlsAtRight = computed(() => {
      return props.controls && props.controlsPosition === "right";
    });
    const inputNumberSize = useFormSize();
    const inputNumberDisabled = useFormDisabled();
    const displayValue = computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue = data.currentValue;
      if (isNil(currentValue))
        return "";
      if (isNumber$1(currentValue)) {
        if (Number.isNaN(currentValue))
          return "";
        if (!isUndefined$1(props.precision)) {
          currentValue = currentValue.toFixed(props.precision);
        }
      }
      return currentValue;
    });
    const toPrecision = (num, pre) => {
      if (isUndefined$1(pre))
        pre = numPrecision.value;
      if (pre === 0)
        return Math.round(num);
      let snum = String(num);
      const pointPos = snum.indexOf(".");
      if (pointPos === -1)
        return num;
      const nums = snum.replace(".", "").split("");
      const datum = nums[pointPos + pre];
      if (!datum)
        return num;
      const length = snum.length;
      if (snum.charAt(length - 1) === "5") {
        snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
      }
      return Number.parseFloat(Number(snum).toFixed(pre));
    };
    const getPrecision = (value) => {
      if (isNil(value))
        return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };
    const ensurePrecision = (val, coefficient = 1) => {
      if (!isNumber$1(val))
        return data.currentValue;
      if (val >= Number.MAX_SAFE_INTEGER && coefficient === 1) {
        return val;
      } else if (val <= Number.MIN_SAFE_INTEGER && coefficient === -1) {
        return val;
      }
      return toPrecision(val + props.step * coefficient);
    };
    const handleKeydown = (event) => {
      const code = getEventCode(event);
      const key = getEventKey(event);
      if (props.disabledScientific && ["e", "E"].includes(key)) {
        event.preventDefault();
        return;
      }
      switch (code) {
        case EVENT_CODE.up: {
          event.preventDefault();
          increase();
          break;
        }
        case EVENT_CODE.down: {
          event.preventDefault();
          decrease();
          break;
        }
      }
    };
    const increase = () => {
      if (props.readonly || inputNumberDisabled.value || maxDisabled.value)
        return;
      const value = Number(displayValue.value) || 0;
      const newVal = ensurePrecision(value);
      setCurrentValue(newVal);
      emit(INPUT_EVENT, data.currentValue);
      setCurrentValueToModelValue();
    };
    const decrease = () => {
      if (props.readonly || inputNumberDisabled.value || minDisabled.value)
        return;
      const value = Number(displayValue.value) || 0;
      const newVal = ensurePrecision(value, -1);
      setCurrentValue(newVal);
      emit(INPUT_EVENT, data.currentValue);
      setCurrentValueToModelValue();
    };
    const verifyValue = (value, update) => {
      const { max, min, step, precision, stepStrictly, valueOnClear } = props;
      if (max < min) {
        throwError("InputNumber", "min should not be greater than max.");
      }
      let newVal = Number(value);
      if (isNil(value) || Number.isNaN(newVal)) {
        return null;
      }
      if (value === "") {
        if (valueOnClear === null) {
          return null;
        }
        newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear;
      }
      if (stepStrictly) {
        newVal = toPrecision(
          Math.round(toPrecision(newVal / step)) * step,
          precision
        );
        if (newVal !== value) {
          update && emit(UPDATE_MODEL_EVENT, newVal);
        }
      }
      if (!isUndefined$1(precision)) {
        newVal = toPrecision(newVal, precision);
      }
      if (newVal > max || newVal < min) {
        newVal = newVal > max ? max : min;
        update && emit(UPDATE_MODEL_EVENT, newVal);
      }
      return newVal;
    };
    const setCurrentValue = (value, emitChange = true) => {
      var _a;
      const oldVal = data.currentValue;
      const newVal = verifyValue(value);
      if (!emitChange) {
        emit(UPDATE_MODEL_EVENT, newVal);
        return;
      }
      data.userInput = null;
      if (oldVal === newVal && value)
        return;
      emit(UPDATE_MODEL_EVENT, newVal);
      if (oldVal !== newVal) {
        emit(CHANGE_EVENT, newVal, oldVal);
      }
      if (props.validateEvent) {
        (_a = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a.call(formItem, "change").catch((err) => debugWarn());
      }
      data.currentValue = newVal;
    };
    const handleInput = (value) => {
      data.userInput = value;
      const newVal = value === "" ? null : Number(value);
      emit(INPUT_EVENT, newVal);
      setCurrentValue(newVal, false);
    };
    const handleInputChange = (value) => {
      const newVal = value !== "" ? Number(value) : "";
      if (isNumber$1(newVal) && !Number.isNaN(newVal) || value === "") {
        setCurrentValue(newVal);
      }
      setCurrentValueToModelValue();
      data.userInput = null;
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    const blur = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
    };
    const handleFocus = (event) => {
      emit("focus", event);
    };
    const handleBlur = (event) => {
      var _a, _b;
      data.userInput = null;
      if (data.currentValue === null && ((_a = input.value) == null ? void 0 : _a.input)) {
        input.value.input.value = "";
      }
      emit("blur", event);
      if (props.validateEvent) {
        (_b = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _b.call(formItem, "blur").catch((err) => debugWarn());
      }
    };
    const setCurrentValueToModelValue = () => {
      if (data.currentValue !== props.modelValue) {
        data.currentValue = props.modelValue;
      }
    };
    watch(
      () => props.modelValue,
      (value, oldValue) => {
        const newValue = verifyValue(value, true);
        if (data.userInput === null && newValue !== oldValue) {
          data.currentValue = newValue;
        }
      },
      { immediate: true }
    );
    watch(
      () => props.precision,
      () => {
        data.currentValue = verifyValue(props.modelValue);
      }
    );
    __expose({
      focus,
      blur
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ns).b(),
            unref(ns).m(unref(inputNumberSize)),
            unref(ns).is("disabled", unref(inputNumberDisabled)),
            unref(ns).is("without-controls", !_ctx.controls),
            unref(ns).is("controls-right", controlsAtRight.value),
            unref(ns).is(_ctx.align, !!_ctx.align)
          ]),
          onDragstart: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["prevent"]))
        },
        [
          _ctx.controls ? withDirectives((openBlock(), createElementBlock("span", {
            key: 0,
            role: "button",
            "aria-label": unref(t)("el.inputNumber.decrease"),
            class: normalizeClass([unref(ns).e("decrease"), unref(ns).is("disabled", minDisabled.value)]),
            onKeydown: withKeys(decrease, ["enter"])
          }, [
            renderSlot(_ctx.$slots, "decrease-icon", {}, () => [
              createVNode(unref(ElIcon), null, {
                default: withCtx(() => [
                  controlsAtRight.value ? (openBlock(), createBlock(unref(arrow_down_default), { key: 0 })) : (openBlock(), createBlock(unref(minus_default), { key: 1 }))
                ]),
                _: 1
              })
            ])
          ], 42, _hoisted_1)), [
            [unref(vRepeatClick), decrease]
          ]) : createCommentVNode("v-if", true),
          _ctx.controls ? withDirectives((openBlock(), createElementBlock("span", {
            key: 1,
            role: "button",
            "aria-label": unref(t)("el.inputNumber.increase"),
            class: normalizeClass([unref(ns).e("increase"), unref(ns).is("disabled", maxDisabled.value)]),
            onKeydown: withKeys(increase, ["enter"])
          }, [
            renderSlot(_ctx.$slots, "increase-icon", {}, () => [
              createVNode(unref(ElIcon), null, {
                default: withCtx(() => [
                  controlsAtRight.value ? (openBlock(), createBlock(unref(arrow_up_default), { key: 0 })) : (openBlock(), createBlock(unref(plus_default), { key: 1 }))
                ]),
                _: 1
              })
            ])
          ], 42, _hoisted_2)), [
            [unref(vRepeatClick), increase]
          ]) : createCommentVNode("v-if", true),
          createVNode(unref(ElInput), {
            id: _ctx.id,
            ref_key: "input",
            ref: input,
            type: "number",
            step: _ctx.step,
            "model-value": displayValue.value,
            placeholder: _ctx.placeholder,
            readonly: _ctx.readonly,
            disabled: unref(inputNumberDisabled),
            size: unref(inputNumberSize),
            max: _ctx.max,
            min: _ctx.min,
            name: _ctx.name,
            "aria-label": _ctx.ariaLabel,
            "validate-event": false,
            inputmode: _ctx.inputmode,
            onKeydown: handleKeydown,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onInput: handleInput,
            onChange: handleInputChange
          }, createSlots({
            _: 2
          }, [
            _ctx.$slots.prefix ? {
              name: "prefix",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "prefix")
              ]),
              key: "0"
            } : void 0,
            _ctx.$slots.suffix ? {
              name: "suffix",
              fn: withCtx(() => [
                renderSlot(_ctx.$slots, "suffix")
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["id", "step", "model-value", "placeholder", "readonly", "disabled", "size", "max", "min", "name", "aria-label", "inputmode"])
        ],
        34
      );
    };
  }
});
var InputNumber = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);
const ElInputNumber = withInstall(InputNumber);

export { ElInputNumber as E, inputNumberProps as a, inputNumberEmits as i };
//# sourceMappingURL=index-iY4Ojb3q.mjs.map
