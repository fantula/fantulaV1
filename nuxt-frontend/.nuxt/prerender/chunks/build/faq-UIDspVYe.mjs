import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { p as plus_default, s as service_default } from './index-DlETah8a.mjs';
import { _ as _export_sfc } from './server.mjs';
import { B as BaseButton } from './BaseButton-BlqmccK6.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FaqAccordionItem",
  __ssrInlineRender: true,
  props: {
    question: {},
    answer: {},
    isExpanded: { type: Boolean }
  },
  emits: ["toggle"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["faq-card", { active: __props.isExpanded }]
      }, _attrs))} data-v-621b1d56><div class="faq-card-header" data-v-621b1d56><div class="q-badge" data-v-621b1d56>Q</div><div class="faq-question-text" data-v-621b1d56>${ssrInterpolate(__props.question)}</div><div class="toggle-icon" data-v-621b1d56>`);
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
        _: 1
      }, _parent));
      _push(`</div></div><div class="${ssrRenderClass([{ "is-expanded": __props.isExpanded }, "faq-card-body-grid"])}" data-v-621b1d56><div class="min-h-0-wrapper" data-v-621b1d56><div class="answer-wrapper" data-v-621b1d56><div class="a-badge" data-v-621b1d56>A</div><div class="faq-answer-text" data-v-621b1d56>${ssrInterpolate(__props.answer)}</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/faq/FaqAccordionItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FaqAccordionItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-621b1d56"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SupportContactCard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-section" }, _attrs))} data-v-5bc537e9><h3 class="contact-title" data-v-5bc537e9>\u6CA1\u6709\u627E\u5230\u60A8\u7684\u95EE\u9898\uFF1F</h3><p class="contact-desc" data-v-5bc537e9>\u6211\u4EEC\u7684\u5BA2\u670D\u56E2\u961F\u968F\u65F6\u4E3A\u60A8\u63D0\u4F9B\u5E2E\u52A9\uFF0C\u5E73\u5747\u54CD\u5E94\u65F6\u95F4\u4E0D\u8D85\u8FC73\u5206\u949F\uFF0C\u89E3\u51B3\u7387\u9AD8\u8FBE99.8%!</p>`);
      _push(ssrRenderComponent(BaseButton, {
        "theme-id": "primary",
        class: "contact-btn-wrapper"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "mr-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(service_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(service_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` \u8054\u7CFB\u5728\u7EBF\u5BA2\u670D `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "mr-2" }, {
                default: withCtx(() => [
                  createVNode(unref(service_default))
                ]),
                _: 1
              }),
              createTextVNode(" \u8054\u7CFB\u5728\u7EBF\u5BA2\u670D ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/support/SupportContactCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SupportContactCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5bc537e9"]]);
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
    const toggleFaq = (id) => {
      if (expandedId.value === id) {
        expandedId.value = null;
      } else {
        expandedId.value = id;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-page force-light" }, _attrs))} data-v-dfdd3c98><div class="page-content" data-v-dfdd3c98><div class="content-container" data-v-dfdd3c98><div class="header-section" data-v-dfdd3c98><h1 class="main-title" data-v-dfdd3c98>\u5E38\u89C1\u95EE\u9898</h1></div><div class="search-section" data-v-dfdd3c98><h3 class="search-title" data-v-dfdd3c98>\u6709\u95EE\u9898\uFF1F\u5FEB\u901F\u641C\u7D22\u89E3\u7B54</h3><div class="search-box" data-v-dfdd3c98><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="\u8F93\u5165\u60A8\u7684\u95EE\u9898\u5173\u952E\u8BCD..." class="search-input" data-v-dfdd3c98><button class="search-btn" data-v-dfdd3c98>\u641C\u7D22</button></div></div><div class="category-section" data-v-dfdd3c98><!--[-->`);
      ssrRenderList(categoryList.value, (category) => {
        _push(`<button class="${ssrRenderClass(["category-btn", { active: activeCategoryId.value === category.id }])}" data-v-dfdd3c98>${ssrInterpolate(category.name)}</button>`);
      });
      _push(`<!--]--></div><div class="faq-list-section" data-v-dfdd3c98>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-dfdd3c98>\u52A0\u8F7D\u4E2D...</div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-dfdd3c98>\u6682\u65E0\u76F8\u5173\u95EE\u9898</div>`);
      } else {
        _push(`<div class="faq-card-list" data-v-dfdd3c98><!--[-->`);
        ssrRenderList(filteredFaqs.value, (faq2) => {
          _push(ssrRenderComponent(FaqAccordionItem, {
            key: faq2.id,
            id: `faq-${faq2.id}`,
            question: faq2.question,
            answer: faq2.answer,
            "is-expanded": expandedId.value === faq2.id,
            onToggle: ($event) => toggleFaq(faq2.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(SupportContactCard, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dfdd3c98"]]);

export { faq as default };
//# sourceMappingURL=faq-UIDspVYe.mjs.map
