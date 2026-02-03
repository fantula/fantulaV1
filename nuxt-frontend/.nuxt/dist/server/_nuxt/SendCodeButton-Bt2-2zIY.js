import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EmailInput",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "请输入您的邮箱" },
    type: { type: String, default: "email" },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "blur", "focus"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const DOMAIN_SUFFIXES = [
      "gmail.com",
      "qq.com",
      "163.com",
      "outlook.com",
      "icloud.com"
    ];
    const wrapperRef = ref(null);
    const inputRef = ref(null);
    const showDropdown = ref(false);
    const activeIndex = ref(0);
    const currentPrefix = computed(() => {
      const val = props.modelValue || "";
      const atIndex = val.indexOf("@");
      return atIndex > -1 ? val.slice(0, atIndex) : val;
    });
    const currentSuffixInput = computed(() => {
      const val = props.modelValue || "";
      const atIndex = val.indexOf("@");
      return atIndex > -1 ? val.slice(atIndex + 1) : "";
    });
    const filteredSuffixes = computed(() => {
      const input = currentSuffixInput.value.toLowerCase();
      const val = props.modelValue || "";
      if (!val.includes("@")) return [];
      return DOMAIN_SUFFIXES.filter(
        (domain) => domain.startsWith(input)
      );
    });
    __expose({
      focus: () => inputRef.value?.focus()
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "email-input-wrapper",
        ref_key: "wrapperRef",
        ref: wrapperRef
      }, _attrs))} data-v-f0845516><input${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="custom-email-input" data-v-f0845516>`);
      if (showDropdown.value && filteredSuffixes.value.length > 0) {
        _push(`<ul class="suffix-list" data-v-f0845516><!--[-->`);
        ssrRenderList(filteredSuffixes.value, (suffix, index) => {
          _push(`<li class="${ssrRenderClass({ active: activeIndex.value === index })}" data-v-f0845516><span class="prefix" data-v-f0845516>${ssrInterpolate(currentPrefix.value)}</span>@<span class="suffix-highlight" data-v-f0845516>${ssrInterpolate(suffix)}</span></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/EmailInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const EmailInput = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f0845516"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SendCodeButton",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    countdown: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: "获取验证码" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const displayText = computed(() => {
      if (props.loading) return "发送中...";
      if (props.countdown > 0) return `${props.countdown}s后重发`;
      return props.text;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "send-code-btn-unified",
        disabled: __props.disabled || __props.loading || __props.countdown > 0,
        type: "button"
      }, _attrs))} data-v-51508867>${ssrInterpolate(displayText.value)}</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SendCodeButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SendCodeButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51508867"]]);
export {
  EmailInput as E,
  SendCodeButton as S
};
//# sourceMappingURL=SendCodeButton-Bt2-2zIY.js.map
