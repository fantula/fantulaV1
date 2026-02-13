import { ref, inject, computed, unref, getCurrentInstance } from 'vue';
import { c as useGlobalSize } from './index-xMedQC9S.mjs';
import { f as formContextKey, a as formItemContextKey } from './constants-hAKFmBbq.mjs';

const useProp = (name) => {
  const vm = getCurrentInstance();
  return computed(() => {
    var _a, _b;
    return (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$props) == null ? void 0 : _b[name];
  });
};
const useFormSize = (fallback, ignore = {}) => {
  const emptyRef = ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  const globalConfig = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form ? { size: void 0 } : inject(formContextKey, void 0);
  const formItem = ignore.formItem ? { size: void 0 } : inject(formItemContextKey, void 0);
  return computed(
    () => size.value || unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig.value || ""
  );
};
const useFormDisabled = (fallback) => {
  const disabled = useProp("disabled");
  const form = inject(formContextKey, void 0);
  return computed(() => {
    var _a, _b, _c;
    return (_c = (_b = (_a = disabled.value) != null ? _a : unref(fallback)) != null ? _b : form == null ? void 0 : form.disabled) != null ? _c : false;
  });
};
const useSize = useFormSize;
const useDisabled = useFormDisabled;
const useFormItem = () => {
  const form = inject(formContextKey, void 0);
  const formItem = inject(formItemContextKey, void 0);
  return {
    form,
    formItem
  };
};
const useFormItemInputId = (props, {
  formItemContext,
  disableIdGeneration,
  disableIdManagement
}) => {
  if (!disableIdGeneration) {
    disableIdGeneration = ref(false);
  }
  if (!disableIdManagement) {
    disableIdManagement = ref(false);
  }
  getCurrentInstance();
  const inputId = ref();
  const isLabeledByFormItem = computed(() => {
    var _a;
    return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && ((_a = formItemContext.inputIds) == null ? void 0 : _a.length) <= 1);
  });
  return {
    isLabeledByFormItem,
    inputId
  };
};

export { useFormItem as a, useFormSize as b, useFormItemInputId as c, useDisabled as d, useProp as e, useSize as f, useFormDisabled as u };
//# sourceMappingURL=use-form-item-VP6j78iG.mjs.map
