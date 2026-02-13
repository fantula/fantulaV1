import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { O as search_default, p as plus_default, s as service_default } from './index-DuV_oMrC.mjs';
import { _ as _export_sfc } from './server.mjs';
import '@vueuse/core';
import '@vue/shared';
import './objects-Bz74KHmq.mjs';
import 'lodash-unified';
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-help-page" }, _attrs))} data-v-b43ebc0b><div class="help-header" data-v-b43ebc0b><h1 data-v-b43ebc0b>\u5E2E\u52A9\u4E2D\u5FC3</h1><p data-v-b43ebc0b>\u5E38\u89C1\u95EE\u9898\u4E0E\u670D\u52A1\u652F\u6301</p></div><div class="search-container" data-v-b43ebc0b><div class="search-box" data-v-b43ebc0b>`);
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
      _push(`<input type="text" placeholder="\u641C\u7D22\u95EE\u9898\u5173\u952E\u8BCD..."${ssrRenderAttr("value", searchQuery.value)} data-v-b43ebc0b></div></div>`);
      if (categories.value.length > 0) {
        _push(`<div class="category-scroll" data-v-b43ebc0b><div class="${ssrRenderClass([{ active: activeCategoryId.value === "all" }, "cat-pill"])}" data-v-b43ebc0b> \u5168\u90E8 </div><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<div class="${ssrRenderClass([{ active: activeCategoryId.value === cat.id }, "cat-pill"])}" data-v-b43ebc0b>${ssrInterpolate(cat.name)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="faq-section" data-v-b43ebc0b>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-b43ebc0b><div class="spinner" data-v-b43ebc0b></div> \u52A0\u8F7D\u4E2D... </div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-b43ebc0b><p data-v-b43ebc0b>\u6682\u65E0\u76F8\u5173\u95EE\u9898</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(filteredFaqs.value, (faq, index) => {
          _push(`<div${ssrRenderAttr("id", `faq-${faq.id}`)} class="${ssrRenderClass([{ active: expandedId.value === faq.id }, "faq-card"])}" data-v-b43ebc0b><div class="faq-head" data-v-b43ebc0b><div class="q-badge" data-v-b43ebc0b>Q</div><span class="q-text" data-v-b43ebc0b>${ssrInterpolate(faq.question)}</span><div class="toggle-icon" data-v-b43ebc0b>`);
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
          _push(`</div></div><div class="${ssrRenderClass([{ "is-expanded": expandedId.value === faq.id }, "faq-body-wrapper"])}" data-v-b43ebc0b><div class="faq-body-inner" data-v-b43ebc0b><div class="a-content" data-v-b43ebc0b>${ssrInterpolate(faq.answer)}</div></div></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div class="contact-area" data-v-b43ebc0b><div class="contact-card" data-v-b43ebc0b><h3 data-v-b43ebc0b>\u6CA1\u627E\u5230\u7B54\u6848\uFF1F</h3><p data-v-b43ebc0b>\u6211\u4EEC\u7684\u5BA2\u670D\u56E2\u961F\u968F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u5E2E\u52A9</p><button class="contact-btn" data-v-b43ebc0b>`);
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
const help = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b43ebc0b"]]);

export { help as default };
//# sourceMappingURL=help-B6kLmxMQ.mjs.map
