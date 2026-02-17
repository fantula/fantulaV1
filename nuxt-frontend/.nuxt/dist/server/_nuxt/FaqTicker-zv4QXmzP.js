import { E as ElIcon } from "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a1 as right_default } from "./index-DNnPa_Q9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
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
export {
  FaqTicker as default
};
//# sourceMappingURL=FaqTicker-zv4QXmzP.js.map
