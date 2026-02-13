import { E as ElIcon } from "./index-CsSUb8pm.js";
/* empty css              */
/* empty css                    */
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { O as search_default, p as plus_default, s as service_default } from "./index-DuV_oMrC.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-help-page" }, _attrs))} data-v-b43ebc0b><div class="help-header" data-v-b43ebc0b><h1 data-v-b43ebc0b>帮助中心</h1><p data-v-b43ebc0b>常见问题与服务支持</p></div><div class="search-container" data-v-b43ebc0b><div class="search-box" data-v-b43ebc0b>`);
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
      _push(`<input type="text" placeholder="搜索问题关键词..."${ssrRenderAttr("value", searchQuery.value)} data-v-b43ebc0b></div></div>`);
      if (categories.value.length > 0) {
        _push(`<div class="category-scroll" data-v-b43ebc0b><div class="${ssrRenderClass([{ active: activeCategoryId.value === "all" }, "cat-pill"])}" data-v-b43ebc0b> 全部 </div><!--[-->`);
        ssrRenderList(categories.value, (cat) => {
          _push(`<div class="${ssrRenderClass([{ active: activeCategoryId.value === cat.id }, "cat-pill"])}" data-v-b43ebc0b>${ssrInterpolate(cat.name)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="faq-section" data-v-b43ebc0b>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-b43ebc0b><div class="spinner" data-v-b43ebc0b></div> 加载中... </div>`);
      } else if (filteredFaqs.value.length === 0) {
        _push(`<div class="empty-state" data-v-b43ebc0b><p data-v-b43ebc0b>暂无相关问题</p></div>`);
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
      _push(`</div><div class="contact-area" data-v-b43ebc0b><div class="contact-card" data-v-b43ebc0b><h3 data-v-b43ebc0b>没找到答案？</h3><p data-v-b43ebc0b>我们的客服团队随时为您提供帮助</p><button class="contact-btn" data-v-b43ebc0b>`);
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
      _push(` 联系人工客服 </button></div></div></div>`);
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
export {
  help as default
};
//# sourceMappingURL=help-B6kLmxMQ.js.map
