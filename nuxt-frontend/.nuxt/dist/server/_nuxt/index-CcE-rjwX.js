import { markRaw, getCurrentInstance, shallowRef, ref, watch, unref, nextTick, defineComponent, useAttrs, useSlots, computed, toRef, openBlock, createElementBlock, normalizeStyle, normalizeClass, createCommentVNode, Fragment, renderSlot, createElementVNode, createBlock, withCtx, resolveDynamicComponent, mergeProps, withModifiers, toDisplayString } from "vue";
import { c as circle_close_default, E as view_default, F as hide_default } from "./index-CmsdIFY8.js";
import { m as mutable } from "./typescript-D6L75muK.js";
import { i as iconPropType, V as ValidateComponentsMap } from "./icon-eqoLCvNY.js";
import { a as useSizeProp } from "./index-CO6H4Lsj.js";
import { U as UPDATE_MODEL_EVENT, I as INPUT_EVENT, C as CHANGE_EVENT } from "./event-BZTOGHfp.js";
import { b as buildProps, d as definePropType, w as withInstall } from "./install-VBSKbHUK.js";
import { u as useAriaProps } from "./index-DqrhOzxH.js";
import { isString, isFunction, NOOP, isObject } from "@vue/shared";
import { useEventListener, useResizeObserver, isClient } from "@vueuse/core";
import { isNil } from "lodash-unified";
import { E as ElIcon } from "./index-Byc6LUYX.js";
import { i as isFirefox } from "./event-D3FEo2C5.js";
import { i as isNumber, f as useNamespace, e as debugWarn } from "../server.mjs";
import { u as useAttrs$1 } from "./index-D2CY7Ok3.js";
import { u as useFormItem, c as useFormItemInputId, a as useFormSize, b as useFormDisabled } from "./use-form-item-Bj_anzlj.js";
import { i as isFocusable } from "./aria-Rs9hkxop.js";
const inputProps = buildProps({
  /**
   * @description native input id
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description input box size
   */
  size: useSizeProp,
  /**
   * @description whether to disable
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  /**
   * @description v-model modifiers, reference [Vue modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)
   */
  modelModifiers: {
    type: definePropType(Object),
    default: () => ({})
  },
  /**
   * @description same as `maxlength` in native input
   */
  maxlength: {
    type: [String, Number]
  },
  /**
   * @description same as `minlength` in native input
   */
  minlength: {
    type: [String, Number]
  },
  /**
   * @description type of input, see more in [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
   */
  type: {
    type: definePropType(String),
    default: "text"
  },
  /**
   * @description control the resizability
   */
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  /**
   * @description whether textarea has an adaptive height
   */
  autosize: {
    type: definePropType([Boolean, Object]),
    default: false
  },
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    type: definePropType(String),
    default: "off"
  },
  /**
   * @description format content
   */
  formatter: {
    type: Function
  },
  /**
   * @description parse content
   */
  parser: {
    type: Function
  },
  /**
   * @description placeholder
   */
  placeholder: {
    type: String
  },
  /**
   * @description native input form
   */
  form: {
    type: String
  },
  /**
   * @description native input readonly
   */
  readonly: Boolean,
  /**
   * @description whether to show clear button
   */
  clearable: Boolean,
  /**
   * @description custom clear icon component
   */
  clearIcon: {
    type: iconPropType,
    default: circle_close_default
  },
  /**
   * @description toggleable password input
   */
  showPassword: Boolean,
  /**
   * @description word count
   */
  showWordLimit: Boolean,
  /**
   * @description word count position, valid when `show-word-limit` is true
   */
  wordLimitPosition: {
    type: String,
    values: ["inside", "outside"],
    default: "inside"
  },
  /**
   * @description suffix icon
   */
  suffixIcon: {
    type: iconPropType
  },
  /**
   * @description prefix icon
   */
  prefixIcon: {
    type: iconPropType
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    type: String,
    default: void 0
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description input or textarea element style
   */
  inputStyle: {
    type: definePropType([Object, Array, String]),
    default: () => mutable({})
  },
  /**
   * @description native input autofocus
   */
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2
  },
  ...useAriaProps(["ariaLabel"]),
  /**
   * @description native input mode for virtual keyboards
   */
  inputmode: {
    type: definePropType(String),
    default: void 0
  },
  /**
   * @description same as `name` in native input
   */
  name: String
});
const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value),
  input: (value) => isString(value),
  change: (value, evt) => isString(value) && (evt instanceof Event || evt === void 0),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt) => evt instanceof Event,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};
const inputPropsDefaults = {
  disabled: void 0,
  modelValue: "",
  modelModifiers: () => ({}),
  type: "text",
  autocomplete: "off",
  clearIcon: markRaw(circle_close_default),
  wordLimitPosition: "inside",
  tabindex: 0,
  validateEvent: true,
  inputStyle: () => ({}),
  rows: 2
};
let hiddenTextarea = void 0;
const HIDDEN_STYLE = {
  height: "0",
  visibility: "hidden",
  overflow: isFirefox() ? "" : "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break"
];
const looseToNumber = (val) => {
  const n = Number.parseFloat(val);
  return Number.isNaN(n) ? val : n;
};
function calculateNodeStyling(targetElement) {
  const style = (void 0).getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => [
    name,
    style.getPropertyValue(name)
  ]);
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a, _b;
  if (!hiddenTextarea) {
    hiddenTextarea = (void 0).createElement("textarea");
    ((_a = targetElement.parentNode) != null ? _a : (void 0).body).appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  contextStyle.forEach(
    ([key, value]) => hiddenTextarea == null ? void 0 : hiddenTextarea.style.setProperty(key, value)
  );
  Object.entries(HIDDEN_STYLE).forEach(
    ([key, value]) => hiddenTextarea == null ? void 0 : hiddenTextarea.style.setProperty(key, value, "important")
  );
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_b = hiddenTextarea.parentNode) == null ? void 0 : _b.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}
function useFocusController(target, {
  disabled,
  beforeFocus,
  afterFocus,
  beforeBlur,
  afterBlur
} = {}) {
  const instance = getCurrentInstance();
  const { emit } = instance;
  const wrapperRef = shallowRef();
  const isFocused = ref(false);
  const handleFocus = (event) => {
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
    if (unref(disabled) || isFocused.value || cancelFocus) return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus == null ? void 0 : afterFocus();
  };
  const handleBlur = (event) => {
    var _a;
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (unref(disabled) || event.relatedTarget && ((_a = wrapperRef.value) == null ? void 0 : _a.contains(event.relatedTarget)) || cancelBlur)
      return;
    isFocused.value = false;
    emit("blur", event);
    afterBlur == null ? void 0 : afterBlur();
  };
  const handleClick = (event) => {
    var _a, _b;
    if (unref(disabled) || isFocusable(event.target) || ((_a = wrapperRef.value) == null ? void 0 : _a.contains((void 0).activeElement)) && wrapperRef.value !== (void 0).activeElement)
      return;
    (_b = target.value) == null ? void 0 : _b.focus();
  };
  watch([wrapperRef, () => unref(disabled)], ([el, disabled2]) => {
    if (!el) return;
    if (disabled2) {
      el.removeAttribute("tabindex");
    } else {
      el.setAttribute("tabindex", "-1");
    }
  });
  useEventListener(wrapperRef, "focus", handleFocus, true);
  useEventListener(wrapperRef, "blur", handleBlur, true);
  useEventListener(wrapperRef, "click", handleClick, true);
  if (process.env.NODE_ENV === "test") ;
  return {
    isFocused,
    /** Avoid using wrapperRef and handleFocus/handleBlur together */
    wrapperRef,
    handleFocus,
    handleBlur
  };
}
const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);
function useComposition({
  afterComposition,
  emit
}) {
  const isComposing = ref(false);
  const handleCompositionStart = (event) => {
    emit == null ? void 0 : emit("compositionstart", event);
    isComposing.value = true;
  };
  const handleCompositionUpdate = (event) => {
    var _a;
    emit == null ? void 0 : emit("compositionupdate", event);
    const text = (_a = event.target) == null ? void 0 : _a.value;
    const lastCharacter = text[text.length - 1] || "";
    isComposing.value = !isKorean(lastCharacter);
  };
  const handleCompositionEnd = (event) => {
    emit == null ? void 0 : emit("compositionend", event);
    if (isComposing.value) {
      isComposing.value = false;
      nextTick(() => afterComposition(event));
    }
  };
  const handleComposition = (event) => {
    event.type === "compositionend" ? handleCompositionEnd(event) : handleCompositionUpdate(event);
  };
  return {
    isComposing,
    handleComposition,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  };
}
function useCursor(input) {
  let selectionInfo;
  function recordCursor() {
    if (input.value == void 0) return;
    const { selectionStart, selectionEnd, value } = input.value;
    if (selectionStart == null || selectionEnd == null) return;
    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));
    selectionInfo = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt
    };
  }
  function setCursor() {
    if (input.value == void 0 || selectionInfo == void 0) return;
    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionInfo;
    if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
      return;
    let startPos = value.length;
    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    input.value.setSelectionRange(startPos, startPos);
  }
  return [recordCursor, setCursor];
}
const _hoisted_1 = ["id", "name", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus", "role", "inputmode"];
const _hoisted_2 = ["id", "name", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus", "rows", "role"];
const COMPONENT_NAME = "ElInput";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME,
    inheritAttrs: false
  },
  __name: "input",
  props: inputProps,
  emits: inputEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const rawAttrs = useAttrs();
    const attrs = useAttrs$1();
    const slots = useSlots();
    const containerKls = computed(() => [
      props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.value),
      nsInput.is("disabled", inputDisabled.value),
      nsInput.is("exceed", inputExceed.value),
      {
        [nsInput.b("group")]: slots.prepend || slots.append,
        [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
        [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
        [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
        [nsInput.b("hidden")]: props.type === "hidden"
      },
      rawAttrs.class
    ]);
    const wrapperKls = computed(() => [
      nsInput.e("wrapper"),
      nsInput.is("focus", isFocused.value)
    ]);
    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace("input");
    const nsTextarea = useNamespace("textarea");
    const input = shallowRef();
    const textarea = shallowRef();
    const hovering = ref(false);
    const passwordVisible = ref(false);
    const countStyle = ref();
    const textareaCalcStyle = shallowRef(props.inputStyle);
    const _ref = computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(
      _ref,
      {
        disabled: inputDisabled,
        afterBlur() {
          var _a;
          if (props.validateEvent) {
            (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur").catch((err) => debugWarn(err));
          }
        }
      }
    );
    const needStatusIcon = computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateIcon = computed(
      () => validateState.value && ValidateComponentsMap[validateState.value]
    );
    const passwordIcon = computed(
      () => passwordVisible.value ? view_default : hide_default
    );
    const containerStyle = computed(() => [
      rawAttrs.style
    ]);
    const textareaStyle = computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = computed(
      () => isNil(props.modelValue) ? "" : String(props.modelValue)
    );
    const showClear = computed(
      () => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value)
    );
    const showPwdVisible = computed(
      () => props.showPassword && !inputDisabled.value && !!nativeInputValue.value
    );
    const isWordLimitVisible = computed(
      () => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword
    );
    const textLength = computed(() => nativeInputValue.value.length);
    const inputExceed = computed(
      () => (
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value && textLength.value > Number(props.maxlength)
      )
    );
    const suffixVisible = computed(
      () => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value
    );
    const hasModelModifiers = computed(
      () => !!Object.keys(props.modelModifiers).length
    );
    const [recordCursor, setCursor] = useCursor(input);
    useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.value || props.resize !== "both" && props.resize !== "horizontal")
        return;
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.value = {
        /** right: 100% - width + padding(22) - right(10) */
        right: `calc(100% - ${width + 22 - 10}px)`
      };
    });
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (!isClient || type !== "textarea" || !textarea.value) return;
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
      }
    };
    const createOnceInitResize = (resizeTextarea2) => {
      let isInit = false;
      return () => {
        var _a;
        if (isInit || !props.autosize) return;
        const isElHidden = ((_a = textarea.value) == null ? void 0 : _a.offsetParent) === null;
        if (!isElHidden) {
          setTimeout(resizeTextarea2);
          isInit = true;
        }
      };
    };
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
    const setNativeInputValue = () => {
      const input2 = _ref.value;
      const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
      if (!input2 || input2.value === formatterValue || props.type === "file") return;
      input2.value = formatterValue;
    };
    const formatValue = (value) => {
      const { trim, number } = props.modelModifiers;
      if (trim) {
        value = value.trim();
      }
      if (number) {
        value = `${looseToNumber(value)}`;
      }
      if (props.formatter && props.parser) {
        value = props.parser(value);
      }
      return value;
    };
    const handleInput = async (event) => {
      if (isComposing.value) return;
      const { lazy } = props.modelModifiers;
      let { value } = event.target;
      if (lazy) {
        emit(INPUT_EVENT, value);
        return;
      }
      value = formatValue(value);
      if (String(value) === nativeInputValue.value) {
        if (props.formatter) {
          setNativeInputValue();
        }
        return;
      }
      recordCursor();
      emit(UPDATE_MODEL_EVENT, value);
      emit(INPUT_EVENT, value);
      await nextTick();
      if (props.formatter && props.parser || !hasModelModifiers.value) {
        setNativeInputValue();
      }
      setCursor();
    };
    const handleChange = async (event) => {
      let { value } = event.target;
      value = formatValue(value);
      if (props.modelModifiers.lazy) {
        emit(UPDATE_MODEL_EVENT, value);
      }
      emit(CHANGE_EVENT, value, event);
      await nextTick();
      setNativeInputValue();
    };
    const {
      isComposing,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd
    } = useComposition({ emit, afterComposition: handleInput });
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
    };
    const focus = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.blur();
    };
    const handleMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const handleMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    const select = () => {
      var _a;
      (_a = _ref.value) == null ? void 0 : _a.select();
    };
    const clear = () => {
      emit(UPDATE_MODEL_EVENT, "");
      emit(CHANGE_EVENT, "");
      emit("clear");
      emit(INPUT_EVENT, "");
    };
    watch(
      () => props.modelValue,
      () => {
        var _a;
        nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn(err));
        }
      }
    );
    watch(nativeInputValue, (newValue) => {
      if (!_ref.value) {
        return;
      }
      const { trim, number } = props.modelModifiers;
      const elValue = _ref.value.value;
      const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${looseToNumber(elValue)}` : elValue;
      if (displayValue === newValue) {
        return;
      }
      if ((void 0).activeElement === _ref.value && _ref.value.type !== "range") {
        if (trim && displayValue.trim() === newValue) {
          return;
        }
      }
      setNativeInputValue();
    });
    watch(
      () => props.type,
      async () => {
        await nextTick();
        setNativeInputValue();
        resizeTextarea();
      }
    );
    __expose({
      /** @description HTML input element */
      input,
      /** @description HTML textarea element */
      textarea,
      /** @description HTML element, input or textarea */
      ref: _ref,
      /** @description style of textarea. */
      textareaStyle,
      /** @description from props (used on unit test) */
      autosize: toRef(props, "autosize"),
      /** @description is input composing */
      isComposing,
      /** @description HTML input element native method */
      focus,
      /** @description HTML input element native method */
      blur,
      /** @description HTML input element native method */
      select,
      /** @description clear input value */
      clear,
      /** @description resize textarea. */
      resizeTextarea
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            containerKls.value,
            {
              [unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
              [unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
            }
          ]),
          style: normalizeStyle(containerStyle.value),
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        },
        [
          createCommentVNode(" input "),
          __props.type !== "textarea" ? (openBlock(), createElementBlock(
            Fragment,
            { key: 0 },
            [
              createCommentVNode(" prepend slot "),
              _ctx.$slots.prepend ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(nsInput).be("group", "prepend"))
                },
                [
                  renderSlot(_ctx.$slots, "prepend")
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  ref_key: "wrapperRef",
                  ref: wrapperRef,
                  class: normalizeClass(wrapperKls.value)
                },
                [
                  createCommentVNode(" prefix slot "),
                  _ctx.$slots.prefix || __props.prefixIcon ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 0,
                      class: normalizeClass(unref(nsInput).e("prefix"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(nsInput).e("prefix-inner"))
                        },
                        [
                          renderSlot(_ctx.$slots, "prefix"),
                          __props.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 0,
                            class: normalizeClass(unref(nsInput).e("icon"))
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(__props.prefixIcon)))
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  createElementVNode("input", mergeProps({
                    id: unref(inputId),
                    ref_key: "input",
                    ref: input,
                    class: unref(nsInput).e("inner")
                  }, unref(attrs), {
                    name: __props.name,
                    minlength: __props.minlength,
                    maxlength: __props.maxlength,
                    type: __props.showPassword ? passwordVisible.value ? "text" : "password" : __props.type,
                    disabled: unref(inputDisabled),
                    readonly: __props.readonly,
                    autocomplete: __props.autocomplete,
                    tabindex: __props.tabindex,
                    "aria-label": __props.ariaLabel,
                    placeholder: __props.placeholder,
                    style: __props.inputStyle,
                    form: __props.form,
                    autofocus: __props.autofocus,
                    role: __props.containerRole,
                    inputmode: __props.inputmode,
                    onCompositionstart: _cache[0] || (_cache[0] = //@ts-ignore
                    (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
                    onCompositionupdate: _cache[1] || (_cache[1] = //@ts-ignore
                    (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
                    onCompositionend: _cache[2] || (_cache[2] = //@ts-ignore
                    (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
                    onInput: handleInput,
                    onChange: handleChange,
                    onKeydown: handleKeydown
                  }), null, 16, _hoisted_1),
                  createCommentVNode(" suffix slot "),
                  suffixVisible.value ? (openBlock(), createElementBlock(
                    "span",
                    {
                      key: 1,
                      class: normalizeClass(unref(nsInput).e("suffix"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(nsInput).e("suffix-inner"))
                        },
                        [
                          !showClear.value || !showPwdVisible.value || !isWordLimitVisible.value ? (openBlock(), createElementBlock(
                            Fragment,
                            { key: 0 },
                            [
                              renderSlot(_ctx.$slots, "suffix"),
                              __props.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
                                key: 0,
                                class: normalizeClass(unref(nsInput).e("icon"))
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(__props.suffixIcon)))
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["class"])) : createCommentVNode("v-if", true)
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          )) : createCommentVNode("v-if", true),
                          showClear.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 1,
                            class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
                            onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                            onClick: clear
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
                          showPwdVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 2,
                            class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
                            onClick: handlePasswordVisible,
                            onMousedown: withModifiers(unref(NOOP), ["prevent"]),
                            onMouseup: withModifiers(unref(NOOP), ["prevent"])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(passwordIcon.value)))
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class", "onMousedown", "onMouseup"])) : createCommentVNode("v-if", true),
                          isWordLimitVisible.value ? (openBlock(), createElementBlock(
                            "span",
                            {
                              key: 3,
                              class: normalizeClass([
                                unref(nsInput).e("count"),
                                unref(nsInput).is("outside", __props.wordLimitPosition === "outside")
                              ])
                            },
                            [
                              createElementVNode(
                                "span",
                                {
                                  class: normalizeClass(unref(nsInput).e("count-inner"))
                                },
                                toDisplayString(textLength.value) + " / " + toDisplayString(__props.maxlength),
                                3
                                /* TEXT, CLASS */
                              )
                            ],
                            2
                            /* CLASS */
                          )) : createCommentVNode("v-if", true),
                          validateState.value && validateIcon.value && needStatusIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
                            key: 4,
                            class: normalizeClass([
                              unref(nsInput).e("icon"),
                              unref(nsInput).e("validateIcon"),
                              unref(nsInput).is("loading", validateState.value === "validating")
                            ])
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(validateIcon.value)))
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["class"])) : createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              createCommentVNode(" append slot "),
              _ctx.$slots.append ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 1,
                  class: normalizeClass(unref(nsInput).be("group", "append"))
                },
                [
                  renderSlot(_ctx.$slots, "append")
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (openBlock(), createElementBlock(
            Fragment,
            { key: 1 },
            [
              createCommentVNode(" textarea "),
              createElementVNode("textarea", mergeProps({
                id: unref(inputId),
                ref_key: "textarea",
                ref: textarea,
                class: [unref(nsTextarea).e("inner"), unref(nsInput).is("focus", unref(isFocused))]
              }, unref(attrs), {
                name: __props.name,
                minlength: __props.minlength,
                maxlength: __props.maxlength,
                tabindex: __props.tabindex,
                disabled: unref(inputDisabled),
                readonly: __props.readonly,
                autocomplete: __props.autocomplete,
                style: textareaStyle.value,
                "aria-label": __props.ariaLabel,
                placeholder: __props.placeholder,
                form: __props.form,
                autofocus: __props.autofocus,
                rows: __props.rows,
                role: __props.containerRole,
                onCompositionstart: _cache[3] || (_cache[3] = //@ts-ignore
                (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
                onCompositionupdate: _cache[4] || (_cache[4] = //@ts-ignore
                (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
                onCompositionend: _cache[5] || (_cache[5] = //@ts-ignore
                (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
                onInput: handleInput,
                onFocus: _cache[6] || (_cache[6] = //@ts-ignore
                (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
                onBlur: _cache[7] || (_cache[7] = //@ts-ignore
                (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
                onChange: handleChange,
                onKeydown: handleKeydown
              }), null, 16, _hoisted_2),
              isWordLimitVisible.value ? (openBlock(), createElementBlock(
                "span",
                {
                  key: 0,
                  style: normalizeStyle(countStyle.value),
                  class: normalizeClass([
                    unref(nsInput).e("count"),
                    unref(nsInput).is("outside", __props.wordLimitPosition === "outside")
                  ])
                },
                toDisplayString(textLength.value) + " / " + toDisplayString(__props.maxlength),
                7
                /* TEXT, CLASS, STYLE */
              )) : createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      );
    };
  }
});
const ElInput = withInstall(_sfc_main);
export {
  ElInput as E,
  useFocusController as a,
  inputEmits as b,
  inputPropsDefaults as c,
  useCursor as d,
  inputProps as i,
  useComposition as u
};
//# sourceMappingURL=index-CcE-rjwX.js.map
