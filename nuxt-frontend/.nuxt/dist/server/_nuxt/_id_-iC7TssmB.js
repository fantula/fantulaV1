import { E as ElIcon, l as loading_default, z as arrow_left_default, a2 as warning_default, _ as _export_sfc } from "../server.mjs";
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import "marked";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const renderMarkdown = (text) => {
      if (!text) return "";
      return text.replace(/\n/g, "<br/>");
    };
    useRoute();
    useRouter();
    const loading = ref(true);
    const article = ref(null);
    const videoEmbedUrl = computed(() => {
      const url = article.value?.video_url;
      if (!url) return null;
      const b_match = url.match(/(BV[a-zA-Z0-9]+)/);
      if (b_match) {
        return `//player.bilibili.com/player.html?bvid=${b_match[1]}&page=1&high_quality=1&danmaku=0`;
      }
      const y_match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
      if (y_match) {
        return `https://www.youtube.com/embed/${y_match[1]}?rel=0&modestbranding=1`;
      }
      return null;
    });
    const renderedContent = computed(() => {
      return renderMarkdown(article.value?.content || "");
    });
    const getCategoryLabel = (key) => {
      const map = {
        "guide": "使用攻略",
        "equipment": "设备推荐",
        "troubleshoot": "故障排查",
        "news": "官方公告"
      };
      return map[key] || "其他";
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    useHead({
      title: computed(() => article.value ? `${article.value.title} - 帮助中心` : "加载中..."),
      meta: [
        { name: "description", content: computed(() => article.value?.description || "") }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-page" }, _attrs))} data-v-3f79754c>`);
      if (loading.value) {
        _push(`<div class="loading-state" data-v-3f79754c>`);
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
        _push(`<span data-v-3f79754c>加载中...</span></div>`);
      } else if (article.value) {
        _push(`<div class="article-container" data-v-3f79754c>`);
        if (videoEmbedUrl.value) {
          _push(`<div class="video-section" data-v-3f79754c><div class="video-wrapper" data-v-3f79754c><iframe${ssrRenderAttr("src", videoEmbedUrl.value)} scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" data-v-3f79754c></iframe></div></div>`);
        } else if (article.value.cover_image) {
          _push(`<div class="cover-section" data-v-3f79754c><img${ssrRenderAttr("src", article.value.cover_image)}${ssrRenderAttr("alt", article.value.title)} data-v-3f79754c></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<article class="content-wrapper" data-v-3f79754c><header class="article-header" data-v-3f79754c><div class="category-pill" data-v-3f79754c>${ssrInterpolate(getCategoryLabel(article.value.category))}</div><h1 class="article-title" data-v-3f79754c>${ssrInterpolate(article.value.title)}</h1><div class="meta-info" data-v-3f79754c><div class="author" data-v-3f79754c><img${ssrRenderAttr("src", article.value.author?.avatar || "/images/client/pc/service-avatar.png")} class="avatar" data-v-3f79754c><span class="name" data-v-3f79754c>${ssrInterpolate(article.value.author?.name || "官方客服")}</span></div><span class="divider" data-v-3f79754c>|</span><span class="date" data-v-3f79754c>${ssrInterpolate(formatDate(article.value.created_at))}</span></div></header><div class="markdown-body" data-v-3f79754c>${renderedContent.value ?? ""}</div></article><div class="article-actions" data-v-3f79754c><button class="action-btn back-btn" data-v-3f79754c>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(arrow_left_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` 返回列表 </button></div></div>`);
      } else {
        _push(`<div class="error-state" data-v-3f79754c>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(warning_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(warning_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<p data-v-3f79754c>文章不存在或已被删除</p><button class="back-link" data-v-3f79754c>返回社区</button></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f79754c"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-iC7TssmB.js.map
