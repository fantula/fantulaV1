import { E as ElIcon, p as plus_default, s as service_default, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-page force-light" }, _attrs))} data-v-bd484e3d><div class="page-content" data-v-bd484e3d><div class="content-container" data-v-bd484e3d><div class="header-section" data-v-bd484e3d><h1 class="main-title" data-v-bd484e3d>常见问题</h1></div><div class="search-section" data-v-bd484e3d><h3 class="search-title" data-v-bd484e3d>有问题？快速搜索解答</h3><div class="search-box" data-v-bd484e3d><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="输入您的问题关键词..." class="search-input" data-v-bd484e3d><button class="search-btn" data-v-bd484e3d>搜索</button></div></div><div class="category-section" data-v-bd484e3d><!--[-->`);
      ssrRenderList(categoryList.value, (category) => {
        _push(`<button class="${ssrRenderClass(["category-btn", { active: activeCategoryId.value === category.id }])}" data-v-bd484e3d>${ssrInterpolate(category.name)}</button>`);
      });
      _push(`<!--]--></div><div class="faq-list-section" data-v-bd484e3d>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-bd484e3d>加载中...</div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-bd484e3d>暂无相关问题</div>`);
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
      _push(`</div><div class="contact-section" data-v-bd484e3d><h3 class="contact-title" data-v-bd484e3d>没有找到您的问题？</h3><p class="contact-desc" data-v-bd484e3d>我们的客服团队随时为您提供帮助，平均响应时间不超过3分钟，解决率高达99.8%!</p><button class="contact-btn" data-v-bd484e3d><span class="contact-icon" data-v-bd484e3d>`);
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
      _push(`</span> 联系在线客服 </button></div></div></div></div>`);
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
export {
  faq as default
};
//# sourceMappingURL=faq-B1d3CfEx.js.map
