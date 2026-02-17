import { defineComponent, mergeProps, withCtx, unref, createVNode, useSSRContext, createTextVNode, ref, computed } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
import { p as plus_default, s as service_default } from "./index-CCIZH4aC.js";
import { _ as _export_sfc, u as useHead } from "../server.mjs";
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
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
      }, _attrs))} data-v-a8d7f1d8><div class="faq-card-header" data-v-a8d7f1d8><div class="q-badge" data-v-a8d7f1d8>Q</div><div class="faq-question-text" data-v-a8d7f1d8>${ssrInterpolate(__props.question)}</div><div class="toggle-icon" data-v-a8d7f1d8>`);
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
      _push(`</div></div><div class="${ssrRenderClass([{ "is-expanded": __props.isExpanded }, "faq-card-body-grid"])}" data-v-a8d7f1d8><div class="min-h-0-wrapper" data-v-a8d7f1d8><div class="answer-wrapper" data-v-a8d7f1d8><div class="a-badge" data-v-a8d7f1d8>A</div><div class="faq-answer-text" data-v-a8d7f1d8>${ssrInterpolate(__props.answer)}</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/faq/FaqAccordionItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FaqAccordionItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a8d7f1d8"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SupportContactCard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-section" }, _attrs))} data-v-5bc537e9><h3 class="contact-title" data-v-5bc537e9>没有找到您的问题？</h3><p class="contact-desc" data-v-5bc537e9>我们的客服团队随时为您提供帮助，平均响应时间不超过3分钟，解决率高达99.8%!</p>`);
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
            _push2(` 联系在线客服 `);
          } else {
            return [
              createVNode(_component_el_icon, { class: "mr-2" }, {
                default: withCtx(() => [
                  createVNode(unref(service_default))
                ]),
                _: 1
              }),
              createTextVNode(" 联系在线客服 ")
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
      title: "常见问题 - 凡图拉",
      meta: [
        { name: "description", content: "凡图拉常见问题解答，帮助您快速了解平台使用方法和相关政策。" },
        { name: "keywords", content: "凡图拉,常见问题,FAQ,帮助,客服,使用指南" }
      ]
    });
    const searchQuery = ref("");
    const activeCategoryId = ref("all");
    const expandedId = ref(null);
    const loading = ref(true);
    const categories = ref([]);
    const faqs = ref([]);
    const categoryList = computed(() => [
      { id: "all", name: "全部问题" },
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-page force-light" }, _attrs))} data-v-a3e46a19><div class="page-content" data-v-a3e46a19><div class="content-container" data-v-a3e46a19><div class="header-section" data-v-a3e46a19><h1 class="main-title" data-v-a3e46a19>常见问题</h1></div><div class="search-section" data-v-a3e46a19><h3 class="search-title" data-v-a3e46a19>有问题？快速搜索解答</h3><div class="search-box" data-v-a3e46a19><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="输入您的问题关键词..." class="search-input" data-v-a3e46a19><button class="search-btn" data-v-a3e46a19>搜索</button></div></div><div class="category-section" data-v-a3e46a19><!--[-->`);
      ssrRenderList(categoryList.value, (category) => {
        _push(`<button class="${ssrRenderClass(["category-btn", { active: activeCategoryId.value === category.id }])}" data-v-a3e46a19>${ssrInterpolate(category.name)}</button>`);
      });
      _push(`<!--]--></div><div class="faq-list-section" data-v-a3e46a19>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-a3e46a19>加载中...</div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-a3e46a19>暂无相关问题</div>`);
      } else {
        _push(`<div class="faq-card-list" data-v-a3e46a19><!--[-->`);
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
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3e46a19"]]);
export {
  faq as default
};
//# sourceMappingURL=faq-BU5_5vYz.js.map
