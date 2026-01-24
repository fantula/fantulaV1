import { _ as _export_sfc, E as ElIcon, p as plus_default, s as service_default } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "\u5E38\u89C1\u95EE\u9898 - \u51E1\u56FE\u62C9",
      meta: [
        { name: "description", content: "\u51E1\u56FE\u62C9\u5E38\u89C1\u95EE\u9898\u89E3\u7B54\uFF0C\u5E2E\u52A9\u60A8\u5FEB\u901F\u4E86\u89E3\u5E73\u53F0\u4F7F\u7528\u65B9\u6CD5\u548C\u76F8\u5173\u653F\u7B56\u3002" },
        { name: "keywords", content: "\u51E1\u56FE\u62C9,\u5E38\u89C1\u95EE\u9898,FAQ,\u5E2E\u52A9,\u5BA2\u670D,\u4F7F\u7528\u6307\u5357" }
      ]
    });
    const searchQuery = ref("");
    const activeCategoryId = ref("all");
    const expandedId = ref(null);
    const loading = ref(true);
    const categories = ref([]);
    const faqs = ref([]);
    const categoryList = computed(() => [
      { id: "all", name: "\u5168\u90E8\u95EE\u9898" },
      ...categories.value
    ]);
    const filteredFaqs = computed(() => {
      let result = faqs.value || [];
      if (activeCategoryId.value !== "all") {
        result = result.filter((faq2) => faq2.category_id === activeCategoryId.value);
      }
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        result = result.filter(
          (faq2) => faq2.question.toLowerCase().includes(q) || faq2.answer && faq2.answer.toLowerCase().includes(q)
        );
      }
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-page force-light" }, _attrs))} data-v-bd484e3d><div class="page-content" data-v-bd484e3d><div class="content-container" data-v-bd484e3d><div class="header-section" data-v-bd484e3d><h1 class="main-title" data-v-bd484e3d>\u5E38\u89C1\u95EE\u9898</h1></div><div class="search-section" data-v-bd484e3d><h3 class="search-title" data-v-bd484e3d>\u6709\u95EE\u9898\uFF1F\u5FEB\u901F\u641C\u7D22\u89E3\u7B54</h3><div class="search-box" data-v-bd484e3d><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="\u8F93\u5165\u60A8\u7684\u95EE\u9898\u5173\u952E\u8BCD..." class="search-input" data-v-bd484e3d><button class="search-btn" data-v-bd484e3d>\u641C\u7D22</button></div></div><div class="category-section" data-v-bd484e3d><!--[-->`);
      ssrRenderList(categoryList.value, (category) => {
        _push(`<button class="${ssrRenderClass(["category-btn", { active: activeCategoryId.value === category.id }])}" data-v-bd484e3d>${ssrInterpolate(category.name)}</button>`);
      });
      _push(`<!--]--></div><div class="faq-list-section" data-v-bd484e3d>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-bd484e3d>\u52A0\u8F7D\u4E2D...</div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-bd484e3d>\u6682\u65E0\u76F8\u5173\u95EE\u9898</div>`);
      } else {
        _push(`<div class="faq-card-list" data-v-bd484e3d><!--[-->`);
        ssrRenderList(filteredFaqs.value, (faq2, index) => {
          _push(`<div class="${ssrRenderClass(["faq-card", { active: expandedId.value === faq2.id }])}" data-v-bd484e3d><div class="faq-card-header" data-v-bd484e3d><div class="q-badge" data-v-bd484e3d>Q</div><div class="faq-question-text" data-v-bd484e3d>${ssrInterpolate(faq2.question)}</div><div class="toggle-icon" data-v-bd484e3d>`);
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
          _push(`</div></div><div class="${ssrRenderClass([{ "is-expanded": expandedId.value === faq2.id }, "faq-card-body-grid"])}" data-v-bd484e3d><div class="min-h-0-wrapper" data-v-bd484e3d><div class="answer-wrapper" data-v-bd484e3d><div class="a-badge" data-v-bd484e3d>A</div><div class="faq-answer-text" data-v-bd484e3d>${ssrInterpolate(faq2.answer)}</div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="contact-section" data-v-bd484e3d><h3 class="contact-title" data-v-bd484e3d>\u6CA1\u6709\u627E\u5230\u60A8\u7684\u95EE\u9898\uFF1F</h3><p class="contact-desc" data-v-bd484e3d>\u6211\u4EEC\u7684\u5BA2\u670D\u56E2\u961F\u968F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u5E2E\u52A9\uFF0C\u5E73\u5747\u54CD\u5E94\u65F6\u95F4\u4E0D\u8D85\u8FC73\u5206\u949F\uFF0C\u89E3\u51B3\u7387\u9AD8\u8FBE99.8%!</p><button class="contact-btn" data-v-bd484e3d><span class="contact-icon" data-v-bd484e3d>`);
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
      _push(`</span> \u8054\u7CFB\u5728\u7EBF\u5BA2\u670D </button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd484e3d"]]);

export { faq as default };
//# sourceMappingURL=faq-B1d3CfEx.mjs.map
