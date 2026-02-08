import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { ac as right_default } from './index-DlETah8a.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FaqTicker",
  __ssrInlineRender: true,
  props: {
    faqs: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const activeFaqIndex = ref(0);
    const isTransitioning = ref(true);
    const displayFaqs = computed(() => {
      if (props.faqs.length === 0) return [];
      return [...props.faqs, props.faqs[0]];
    });
    const tickerStyle = computed(() => ({
      transform: `translateY(-${activeFaqIndex.value * 40}px)`,
      transition: isTransitioning.value ? "transform 0.5s ease-in-out" : "none"
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.faqs.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-ticker-bar" }, _attrs))} data-v-fc6b3fed><div class="faq-ticker-container" data-v-fc6b3fed><div class="faq-ticker-track" style="${ssrRenderStyle(tickerStyle.value)}" data-v-fc6b3fed><!--[-->`);
        ssrRenderList(displayFaqs.value, (faq, idx) => {
          _push(`<div class="faq-ticker-item" data-v-fc6b3fed>${ssrInterpolate(faq.question)}</div>`);
        });
        _push(`<!--]--></div></div><div class="faq-arrow-wrap" data-v-fc6b3fed>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/goods/FaqTicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FaqTicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc6b3fed"]]);

export { FaqTicker as default };
//# sourceMappingURL=FaqTicker-DaGTnB-Z.mjs.map
