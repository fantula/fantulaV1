import { E as ElIcon } from "./index-D6MDXFfa.js";
/* empty css              */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { l as loading_default, ay as video_play_default, N as document_default } from "./index-CRs4T-Jf.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useHead, _ as _export_sfc } from "../server.mjs";
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
  __name: "community",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const loading = ref(false);
    const articles = ref([]);
    const categories = ref([]);
    const activeTag = ref("all");
    ref(1);
    const hasMore = ref(true);
    const baseTag = { key: "all", label: "全部", icon: "💠", color: "#409EFF" };
    const categoryTags = computed(() => {
      const dynamicTags = categories.value.map((cat) => ({
        key: cat.id,
        label: cat.name,
        icon: cat.icon || "📝",
        color: cat.color || "#409EFF"
      }));
      return [baseTag, ...dynamicTags];
    });
    const getCategoryLabel = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.name : "未分类";
    };
    const getCategoryColor = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.color : "#909399";
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("zh-CN");
    };
    useHead({
      title: "帮助中心 - 凡图拉",
      meta: [
        { name: "description", content: "凡图拉社区帮助中心，提供奈飞、迪士尼+等流媒体使用教程与设备指南。" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "community-page" }, _attrs))} data-v-a36853c4><div class="page-content" data-v-a36853c4><div class="category-tags" data-v-a36853c4><!--[-->`);
      ssrRenderList(categoryTags.value, (tag) => {
        _push(`<button class="${ssrRenderClass(["tag-btn", { active: activeTag.value === tag.key }])}" style="${ssrRenderStyle(activeTag.value === tag.key ? { "--active-color": tag.color } : {})}" data-v-a36853c4><span class="tag-icon" data-v-a36853c4>${ssrInterpolate(tag.icon)}</span> ${ssrInterpolate(tag.label)} `);
        if (activeTag.value === tag.key && activeTag.value !== "all") {
          _push(`<span class="reset-hint" data-v-a36853c4>×</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
      if (loading.value && articles.value.length === 0) {
        _push(`<div class="loading-state" data-v-a36853c4>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(loading_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(loading_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-a36853c4>加载中...</span></div>`);
      } else if (articles.value.length > 0) {
        _push(`<div class="articles-grid" data-v-a36853c4><!--[-->`);
        ssrRenderList(articles.value, (article) => {
          _push(`<div class="article-card" data-v-a36853c4><div class="article-cover" data-v-a36853c4><img${ssrRenderAttr("src", article.cover_image || "/images/default-cover.jpg")}${ssrRenderAttr("alt", article.title)} loading="lazy" data-v-a36853c4>`);
          if (article.video_url) {
            _push(`<div class="video-badge" data-v-a36853c4>`);
            _push(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(video_play_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(video_play_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="card-category-tag" style="${ssrRenderStyle({ borderColor: getCategoryColor(article.category), color: getCategoryColor(article.category), backgroundColor: "rgba(0,0,0,0.6)" })}" data-v-a36853c4>${ssrInterpolate(getCategoryLabel(article.category))}</div></div><div class="article-content" data-v-a36853c4><h3 class="article-title" data-v-a36853c4>${ssrInterpolate(article.title)}</h3><p class="article-desc" data-v-a36853c4>${ssrInterpolate(article.description)}</p><div class="article-footer" data-v-a36853c4><div class="author-info" data-v-a36853c4><img${ssrRenderAttr("src", article.author?.avatar || "/images/client/pc/service-avatar.png")} class="author-avatar" data-v-a36853c4><span class="author-name" data-v-a36853c4>${ssrInterpolate(article.author?.name || "官方客服")}</span></div><span class="article-date" data-v-a36853c4>${ssrInterpolate(formatDate(article.created_at))}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-a36853c4>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(document_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(document_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p data-v-a36853c4>暂时没有相关文章</p></div>`);
      }
      if (hasMore.value && !loading.value) {
        _push(`<div class="load-more-section" data-v-a36853c4><button class="load-more-btn" data-v-a36853c4> 加载更多 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/community.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const community = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a36853c4"]]);
export {
  community as default
};
//# sourceMappingURL=community-DN389XAO.js.map
