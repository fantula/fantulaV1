import { _ as _export_sfc, E as ElIcon, l as loading_default, bc as video_play_default, $ as document_default } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs';

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
    const baseTag = { key: "all", label: "\u5168\u90E8", icon: "\u{1F4A0}", color: "#409EFF" };
    const categoryTags = computed(() => {
      const dynamicTags = categories.value.map((cat) => ({
        key: cat.id,
        label: cat.name,
        icon: cat.icon || "\u{1F4DD}",
        color: cat.color || "#409EFF"
      }));
      return [baseTag, ...dynamicTags];
    });
    const getCategoryLabel = (id) => {
      const cat = categories.value.find((c) => c.id === id);
      return cat ? cat.name : "\u672A\u5206\u7C7B";
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
      title: "\u5E2E\u52A9\u4E2D\u5FC3 - \u51E1\u56FE\u62C9",
      meta: [
        { name: "description", content: "\u51E1\u56FE\u62C9\u793E\u533A\u5E2E\u52A9\u4E2D\u5FC3\uFF0C\u63D0\u4F9B\u5948\u98DE\u3001\u8FEA\u58EB\u5C3C+\u7B49\u6D41\u5A92\u4F53\u4F7F\u7528\u6559\u7A0B\u4E0E\u8BBE\u5907\u6307\u5357\u3002" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "community-page" }, _attrs))} data-v-8873eba6><div class="page-content" data-v-8873eba6><div class="category-tags" data-v-8873eba6><!--[-->`);
      ssrRenderList(categoryTags.value, (tag) => {
        _push(`<button class="${ssrRenderClass(["tag-btn", { active: activeTag.value === tag.key }])}" style="${ssrRenderStyle(activeTag.value === tag.key ? { "--active-color": tag.color } : {})}" data-v-8873eba6><span class="tag-icon" data-v-8873eba6>${ssrInterpolate(tag.icon)}</span> ${ssrInterpolate(tag.label)} `);
        if (activeTag.value === tag.key && activeTag.value !== "all") {
          _push(`<span class="reset-hint" data-v-8873eba6>\xD7</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
      if (loading.value && articles.value.length === 0) {
        _push(`<div class="loading-state" data-v-8873eba6>`);
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
        _push(`<span data-v-8873eba6>\u52A0\u8F7D\u4E2D...</span></div>`);
      } else if (articles.value.length > 0) {
        _push(`<div class="articles-grid" data-v-8873eba6><!--[-->`);
        ssrRenderList(articles.value, (article) => {
          var _a, _b;
          _push(`<div class="article-card" data-v-8873eba6><div class="article-cover" data-v-8873eba6><img${ssrRenderAttr("src", article.cover_image || "/images/default-cover.jpg")}${ssrRenderAttr("alt", article.title)} loading="lazy" data-v-8873eba6>`);
          if (article.video_url) {
            _push(`<div class="video-badge" data-v-8873eba6>`);
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
          _push(`<div class="card-category-tag" style="${ssrRenderStyle({ borderColor: getCategoryColor(article.category), color: getCategoryColor(article.category), backgroundColor: "rgba(0,0,0,0.6)" })}" data-v-8873eba6>${ssrInterpolate(getCategoryLabel(article.category))}</div></div><div class="article-content" data-v-8873eba6><h3 class="article-title" data-v-8873eba6>${ssrInterpolate(article.title)}</h3><p class="article-desc" data-v-8873eba6>${ssrInterpolate(article.description)}</p><div class="article-footer" data-v-8873eba6><div class="author-info" data-v-8873eba6><img${ssrRenderAttr("src", ((_a = article.author) == null ? void 0 : _a.avatar) || "/images/client/pc/service-avatar.png")} class="author-avatar" data-v-8873eba6><span class="author-name" data-v-8873eba6>${ssrInterpolate(((_b = article.author) == null ? void 0 : _b.name) || "\u5B98\u65B9\u5BA2\u670D")}</span></div><span class="article-date" data-v-8873eba6>${ssrInterpolate(formatDate(article.created_at))}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-8873eba6>`);
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
        _push(`<p data-v-8873eba6>\u6682\u65F6\u6CA1\u6709\u76F8\u5173\u6587\u7AE0</p></div>`);
      }
      if (hasMore.value && !loading.value) {
        _push(`<div class="load-more-section" data-v-8873eba6><button class="load-more-btn" data-v-8873eba6> \u52A0\u8F7D\u66F4\u591A </button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/community.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const community = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8873eba6"]]);

export { community as default };
//# sourceMappingURL=community-CyTjc0rg.mjs.map
