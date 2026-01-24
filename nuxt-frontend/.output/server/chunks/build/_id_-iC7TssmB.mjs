import { _ as _export_sfc, E as ElIcon, l as loading_default, z as arrow_left_default, a2 as warning_default } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
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
      var _a;
      const url = (_a = article.value) == null ? void 0 : _a.video_url;
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
      var _a;
      return renderMarkdown(((_a = article.value) == null ? void 0 : _a.content) || "");
    });
    const getCategoryLabel = (key) => {
      const map = {
        "guide": "\u4F7F\u7528\u653B\u7565",
        "equipment": "\u8BBE\u5907\u63A8\u8350",
        "troubleshoot": "\u6545\u969C\u6392\u67E5",
        "news": "\u5B98\u65B9\u516C\u544A"
      };
      return map[key] || "\u5176\u4ED6";
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
      title: computed(() => article.value ? `${article.value.title} - \u5E2E\u52A9\u4E2D\u5FC3` : "\u52A0\u8F7D\u4E2D..."),
      meta: [
        { name: "description", content: computed(() => {
          var _a;
          return ((_a = article.value) == null ? void 0 : _a.description) || "";
        }) }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
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
        _push(`<span data-v-3f79754c>\u52A0\u8F7D\u4E2D...</span></div>`);
      } else if (article.value) {
        _push(`<div class="article-container" data-v-3f79754c>`);
        if (videoEmbedUrl.value) {
          _push(`<div class="video-section" data-v-3f79754c><div class="video-wrapper" data-v-3f79754c><iframe${ssrRenderAttr("src", videoEmbedUrl.value)} scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" data-v-3f79754c></iframe></div></div>`);
        } else if (article.value.cover_image) {
          _push(`<div class="cover-section" data-v-3f79754c><img${ssrRenderAttr("src", article.value.cover_image)}${ssrRenderAttr("alt", article.value.title)} data-v-3f79754c></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<article class="content-wrapper" data-v-3f79754c><header class="article-header" data-v-3f79754c><div class="category-pill" data-v-3f79754c>${ssrInterpolate(getCategoryLabel(article.value.category))}</div><h1 class="article-title" data-v-3f79754c>${ssrInterpolate(article.value.title)}</h1><div class="meta-info" data-v-3f79754c><div class="author" data-v-3f79754c><img${ssrRenderAttr("src", ((_a = article.value.author) == null ? void 0 : _a.avatar) || "/images/client/pc/service-avatar.png")} class="avatar" data-v-3f79754c><span class="name" data-v-3f79754c>${ssrInterpolate(((_b = article.value.author) == null ? void 0 : _b.name) || "\u5B98\u65B9\u5BA2\u670D")}</span></div><span class="divider" data-v-3f79754c>|</span><span class="date" data-v-3f79754c>${ssrInterpolate(formatDate(article.value.created_at))}</span></div></header><div class="markdown-body" data-v-3f79754c>${(_c = renderedContent.value) != null ? _c : ""}</div></article><div class="article-actions" data-v-3f79754c><button class="action-btn back-btn" data-v-3f79754c>`);
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
        _push(` \u8FD4\u56DE\u5217\u8868 </button></div></div>`);
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
        _push(`<p data-v-3f79754c>\u6587\u7AE0\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664</p><button class="back-link" data-v-3f79754c>\u8FD4\u56DE\u793E\u533A</button></div>`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-iC7TssmB.mjs.map
