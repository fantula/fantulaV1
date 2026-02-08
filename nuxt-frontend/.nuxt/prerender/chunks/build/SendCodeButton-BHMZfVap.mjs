import { defineComponent, computed, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SendCodeButton",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: false },
    countdown: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    text: { type: String, default: "\u83B7\u53D6\u9A8C\u8BC1\u7801" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const displayText = computed(() => {
      if (props.loading) return "\u53D1\u9001\u4E2D...";
      if (props.countdown > 0) return `${props.countdown}s\u540E\u91CD\u53D1`;
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

export { SendCodeButton as S };
//# sourceMappingURL=SendCodeButton-BHMZfVap.mjs.map
