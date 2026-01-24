import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElInput } from './index-Bf1ETwA6.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { _ as _export_sfc } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, toDisplayString, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TagInputGroup",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: { default: "\u8F93\u5165\u6807\u7B7E" },
    addButtonText: { default: "+ \u65B0\u6807\u7B7E" },
    size: { default: "small" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputVisible = ref(false);
    const inputValue = ref("");
    const inputRef = ref();
    const handleRemove = (tag) => {
      const newTags = props.modelValue.filter((t) => t !== tag);
      emit("update:modelValue", newTags);
    };
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.focus();
      });
    };
    const handleConfirm = () => {
      if (inputValue.value && !props.modelValue.includes(inputValue.value)) {
        emit("update:modelValue", [...props.modelValue, inputValue.value]);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tag = ElTag;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tag-input-group" }, _attrs))} data-v-791049e1><!--[-->`);
      ssrRenderList(__props.modelValue, (tag) => {
        _push(ssrRenderComponent(_component_el_tag, {
          key: tag,
          closable: "",
          "disable-transitions": false,
          onClose: ($event) => handleRemove(tag)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tag)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tag), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (inputVisible.value) {
        _push(ssrRenderComponent(_component_el_input, {
          ref_key: "inputRef",
          ref: inputRef,
          modelValue: inputValue.value,
          "onUpdate:modelValue": ($event) => inputValue.value = $event,
          class: "input-new-tag",
          size: __props.size,
          placeholder: __props.placeholder,
          onKeyup: handleConfirm,
          onBlur: handleConfirm
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_el_button, {
          size: __props.size,
          onClick: showInput
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.addButtonText)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.addButtonText), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/base/TagInputGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TagInputGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-791049e1"]]);

export { TagInputGroup as T };
//# sourceMappingURL=TagInputGroup-CxiLjtEh.mjs.map
