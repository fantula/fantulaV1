import { E as ElIcon } from './index-C4aUwruK.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { ad as search_default, p as plus_default, s as service_default } from './index-CbQ9NNm4.mjs';
import { u as useNotify } from './useNotify-BkAlUoZx.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './useToast-DsT-1f4c.mjs';
import './index-CQnGB6WT.mjs';
import './typescript-D6L75muK.mjs';
import './icon-D-Vgi0cb.mjs';
import './use-global-config-CaR6i8cb.mjs';
import './index-C1njJNPQ.mjs';
import './event-D3FEo2C5.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "help",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const loading = ref(false);
    const faqs = ref([]);
    const categories = ref([]);
    const activeCategoryId = ref("all");
    const expandedId = ref(null);
    const searchQuery = ref("");
    useNotify();
    const filteredFaqs = computed(() => {
      let result = faqs.value;
      if (activeCategoryId.value !== "all") {
        result = result.filter((f) => f.category_id === activeCategoryId.value);
      }
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (f) => f.question.toLowerCase().includes(q) || f.answer && f.answer.toLowerCase().includes(q)
        );
      }
      return result;
    });
    watch(activeCategoryId, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-help-page" }, _attrs))} data-v-5176ffac><div class="help-header" data-v-5176ffac><h1 data-v-5176ffac>\u5E2E\u52A9\u4E2D\u5FC3</h1><p data-v-5176ffac>\u5E38\u89C1\u95EE\u9898\u4E0E\u670D\u52A1\u652F\u6301</p></div><div class="search-container" data-v-5176ffac><div class="search-box" data-v-5176ffac>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(search_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(search_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<input type="text" placeholder="\u641C\u7D22\u95EE\u9898\u5173\u952E\u8BCD..."${ssrRenderAttr("value", searchQuery.value)} data-v-5176ffac></div></div>`);
      if (categories.value.length > 0) {
        _push(`<div class="category-scroll" data-v-5176ffac><div class="${ssrRenderClass([{ active: activeCategoryId.value === "all" }, "cat-pill"])}" data-v-5176ffac> \u5168\u90E8 </div><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<div class="${ssrRenderClass([{ active: activeCategoryId.value === cat.id }, "cat-pill"])}" data-v-5176ffac>${ssrInterpolate(cat.name)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="faq-section" data-v-5176ffac>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-5176ffac><div class="spinner" data-v-5176ffac></div> \u52A0\u8F7D\u4E2D... </div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-5176ffac><p data-v-5176ffac>\u6682\u65E0\u76F8\u5173\u95EE\u9898</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredFaqs.value, (faq, index) => {
          _push(`<div${ssrRenderAttr("id", `faq-${faq.id}`)} class="${ssrRenderClass([{ active: expandedId.value === faq.id }, "faq-card"])}" data-v-5176ffac><div class="faq-head" data-v-5176ffac><div class="q-badge" data-v-5176ffac>Q</div><span class="q-text" data-v-5176ffac>${ssrInterpolate(faq.question)}</span><div class="toggle-icon" data-v-5176ffac>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(plus_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(plus_default))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div class="${ssrRenderClass([{ "is-expanded": expandedId.value === faq.id }, "faq-body-wrapper"])}" data-v-5176ffac><div class="faq-body-inner" data-v-5176ffac><div class="a-content" data-v-5176ffac>${ssrInterpolate(faq.answer)}</div></div></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div class="contact-area" data-v-5176ffac><div class="contact-card" data-v-5176ffac><h3 data-v-5176ffac>\u6CA1\u627E\u5230\u7B54\u6848\uFF1F</h3><p data-v-5176ffac>\u6211\u4EEC\u7684\u5BA2\u670D\u56E2\u961F\u968F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u5E2E\u52A9</p><button class="contact-btn" data-v-5176ffac>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(service_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(service_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u8054\u7CFB\u4EBA\u5DE5\u5BA2\u670D </button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/help.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const help = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5176ffac"]]);

export { help as default };
//# sourceMappingURL=help-ME-VHLeS.mjs.map
