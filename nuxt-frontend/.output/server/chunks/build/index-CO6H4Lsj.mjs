import { inject, computed, unref, getCurrentInstance, ref } from 'vue';
import { b as buildProps, d as definePropType, c as buildProp } from './install-VBSKbHUK.mjs';
import { isEqual } from 'lodash-unified';
import { isFunction, isArray } from '@vue/shared';

const componentSizes = ["", "default", "small", "large"];
const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24
};
const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const useSizeProps = {
  size: useSizeProp
};
const SIZE_INJECTION_KEY = /* @__PURE__ */ Symbol("size");
const useGlobalSize = () => {
  const injectedSize = inject(SIZE_INJECTION_KEY, {});
  return computed(() => {
    return unref(injectedSize.size) || "";
  });
};
const emptyValuesContextKey = /* @__PURE__ */ Symbol("emptyValuesContextKey");
const SCOPE = "use-empty-values";
const DEFAULT_EMPTY_VALUES = ["", void 0, null];
const DEFAULT_VALUE_ON_CLEAR = void 0;
const useEmptyValuesProps = buildProps({
  /**
   * @description empty values supported by the component
   */
  emptyValues: Array,
  /**
   * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
   */
  valueOnClear: {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type */
    type: definePropType([
      String,
      Number,
      Boolean,
      Function
    ]),
    default: void 0,
    validator: (val) => {
      val = isFunction(val) ? val() : val;
      if (isArray(val)) {
        return val.every((item) => !item);
      }
      return !val;
    }
  }
});
const useEmptyValues = (props, defaultValue) => {
  const config = getCurrentInstance() ? inject(emptyValuesContextKey, ref({})) : ref({});
  const emptyValues = computed(
    () => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES
  );
  const valueOnClear = computed(() => {
    if (isFunction(props.valueOnClear)) {
      return props.valueOnClear();
    } else if (props.valueOnClear !== void 0) {
      return props.valueOnClear;
    } else if (isFunction(config.value.valueOnClear)) {
      return config.value.valueOnClear();
    } else if (config.value.valueOnClear !== void 0) {
      return config.value.valueOnClear;
    }
    return defaultValue !== void 0 ? defaultValue : DEFAULT_VALUE_ON_CLEAR;
  });
  const isEmptyValue = (value) => {
    let result = true;
    if (isArray(value)) {
      result = emptyValues.value.some((emptyValue) => {
        return isEqual(value, emptyValue);
      });
    } else {
      result = emptyValues.value.includes(value);
    }
    return result;
  };
  if (!isEmptyValue(valueOnClear.value)) ;
  return {
    emptyValues,
    valueOnClear,
    isEmptyValue
  };
};

export { DEFAULT_EMPTY_VALUES as D, SIZE_INJECTION_KEY as S, useSizeProp as a, useGlobalSize as b, componentSizes as c, useEmptyValues as d, emptyValuesContextKey as e, DEFAULT_VALUE_ON_CLEAR as f, SCOPE as g, componentSizeMap as h, useSizeProps as i, useEmptyValuesProps as u };
//# sourceMappingURL=index-CO6H4Lsj.mjs.map
