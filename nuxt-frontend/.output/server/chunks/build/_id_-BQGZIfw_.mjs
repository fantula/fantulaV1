import { _ as _export_sfc, u as useModalStore, b as useRoute, c as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-CGOd9nF1.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const modal = useModalStore();
    const route = useRoute();
    const articleId = route.params.id;
    const articles = {
      1: {
        id: 1,
        title: "\u7535\u89C6\u76D2\u5B50\u770B\u5948\u98DE4K\u5B8C\u6574\u6559\u7A0B\uFF1A\u89E3\u9501\u9AD8\u6E05\u6D41\u5A92\u4F53\u4F53\u9A8C",
        description: "\u6559\u4F60\u5982\u4F55\u9009\u62E9\u5408\u9002\u7684\u7535\u89C6\u76D2\u5B50\uFF0C\u5B89\u88C5\u5948\u98DEApp\u89E3\u78014K\u753B\u8D28\uFF0C\u89E3\u51B3\u64AD\u653E\u5361\u987F\u95EE\u9898...",
        image: "/images/shared/logo.png",
        date: "2023\u5E746\u670820\u65E5",
        category: "\u6559\u7A0B\u6307\u5357",
        readTime: "8\u5206\u949F",
        author: {
          avatar: "/images/shared/logo.png",
          name: "\u5F20\u79D1\u6280"
        }
      }
    };
    const currentArticle = articles[articleId];
    const pageTitle = currentArticle ? currentArticle.title : "\u6587\u7AE0\u8BE6\u60C5";
    useHead({
      title: `${pageTitle} - \u51E1\u56FE\u62C9`,
      meta: [
        { name: "description", content: currentArticle ? currentArticle.description : "\u51E1\u56FE\u62C9\u6587\u7AE0\u8BE6\u60C5\u9875\u9762" },
        { name: "keywords", content: currentArticle ? `${currentArticle.title},\u6D41\u5A92\u4F53,\u6559\u7A0B,\u6280\u672F\u652F\u6301,${currentArticle.author.name}` : "\u51E1\u56FE\u62C9,\u6587\u7AE0" },
        { name: "author", content: currentArticle ? currentArticle.author.name : "\u51E1\u56FE\u62C9" },
        { name: "robots", content: "index, follow" },
        { name: "article:published_time", content: currentArticle ? currentArticle.date : "" },
        { name: "article:author", content: currentArticle ? currentArticle.author.name : "" },
        // Open Graph
        { property: "og:title", content: `${pageTitle} - \u51E1\u56FE\u62C9` },
        { property: "og:description", content: currentArticle ? currentArticle.description : "\u51E1\u56FE\u62C9\u6587\u7AE0\u8BE6\u60C5\u9875\u9762" },
        { property: "og:type", content: "article" },
        { property: "og:image", content: currentArticle ? currentArticle.image : "/images/default-og.jpg" },
        { property: "og:url", content: `http://localhost:3000/article/${articleId}` },
        { property: "article:published_time", content: currentArticle ? currentArticle.date : "" },
        { property: "article:author", content: currentArticle ? currentArticle.author.name : "" },
        { property: "article:section", content: currentArticle ? currentArticle.category : "" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${pageTitle} - \u51E1\u56FE\u62C9` },
        { name: "twitter:description", content: currentArticle ? currentArticle.description : "\u51E1\u56FE\u62C9\u6587\u7AE0\u8BE6\u60C5\u9875\u9762" },
        { name: "twitter:image", content: currentArticle ? currentArticle.image : "/images/default-og.jpg" }
      ],
      link: [
        { rel: "canonical", href: `http://localhost:3000/article/${articleId}` }
      ],
      script: currentArticle ? [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": currentArticle.title,
            "description": currentArticle.description,
            "image": [currentArticle.image],
            "datePublished": currentArticle.date,
            "dateModified": currentArticle.date,
            "author": {
              "@type": "Person",
              "name": currentArticle.author.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "\u51E1\u56FE\u62C9",
              "logo": {
                "@type": "ImageObject",
                "url": "http://localhost:3000/images/shared/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `http://localhost:3000/article/${articleId}`
            }
          })
        }
      ] : []
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoginRegisterModal = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-page" }, _attrs))} data-v-ad620e32><div class="page-content" data-v-ad620e32><div class="article-container" data-v-ad620e32>`);
      if (unref(currentArticle)) {
        _push(`<div class="article-content" data-v-ad620e32><div class="article-category" data-v-ad620e32><span class="category-tag" data-v-ad620e32>${ssrInterpolate(unref(currentArticle).category)}</span></div><h1 class="article-title" data-v-ad620e32><div class="title-line-1" data-v-ad620e32>\u7535\u89C6\u76D2\u5B50\u770B\u5948\u98DE4K\u5B8C\u6574\u6559\u7A0B\uFF1A</div><div class="title-line-2" data-v-ad620e32>\u89E3\u9501\u9AD8\u6E05\u6D41\u5A92\u4F53\u4F53\u9A8C</div></h1><div class="article-meta" data-v-ad620e32><div class="author-section" data-v-ad620e32><img${ssrRenderAttr("src", unref(currentArticle).author.avatar)}${ssrRenderAttr("alt", unref(currentArticle).author.name)} class="author-avatar" data-v-ad620e32><div class="author-details" data-v-ad620e32><div class="author-info" data-v-ad620e32><span class="author-name" data-v-ad620e32>${ssrInterpolate(unref(currentArticle).author.name)}</span></div><div class="meta-info" data-v-ad620e32><span class="article-date" data-v-ad620e32>${ssrInterpolate(unref(currentArticle).date)}</span><span class="meta-divider" data-v-ad620e32>\u2022</span><span class="read-time" data-v-ad620e32>\u9605\u8BFB\u65F6\u95F4 ${ssrInterpolate(unref(currentArticle).readTime)}</span></div></div></div></div><div class="content-container" data-v-ad620e32><div class="article-body" data-v-ad620e32><div class="intro-section" data-v-ad620e32><p class="content-text" data-v-ad620e32> \u5728\u667A\u80FD\u7535\u89C6\u548C\u7535\u89C6\u76D2\u5B50\u666E\u53CA\u7684\u4ECA\u5929\uFF0C\u8D8A\u6765\u8D8A\u591A\u7684\u4EBA\u9009\u62E9\u5728\u7535\u89C6\u4E0A\u89C2\u770B\u6D41\u5A92\u4F53\u5185\u5BB9\u3002Netflix\uFF08\u5948\u98DE\uFF09\u4F5C\u4E3A\u5168\u7403\u9886\u5148\u7684\u6D41\u5A92\u4F53\u5E73\u53F0\uFF0C\u63D0\u4F9B\u4E86\u5927\u91CF\u9AD8\u8D28\u91CF\u76844K\u5F71\u89C6\u5185\u5BB9\u3002\u7136\u800C\uFF0C\u5F88\u591A\u7528\u6237\u5728\u4F7F\u7528\u7535\u89C6\u76D2\u5B50\u89C2\u770B\u5948\u98DE\u65F6\u9047\u5230\u4E86\u5404\u79CD\u95EE\u9898\uFF1A\u65E0\u6CD5\u64AD\u653E4K\u3001\u753B\u8D28\u6A21\u7CCA\u3001\u6CA1\u6709\u4E2D\u6587\u5B57\u5E55\u7B49\u3002\u672C\u6587\u5C06\u8BE6\u7EC6\u4ECB\u7ECD\u5982\u4F55\u5728\u7535\u89C6\u76D2\u5B50\u4E0A\u5B8C\u7F8E\u89C2\u770B\u5948\u98DE4K\u5185\u5BB9\uFF0C\u5305\u62EC\u8BBE\u5907\u9009\u62E9\u3001\u7F51\u7EDC\u8BBE\u7F6E\u3001\u8D26\u53F7\u6CE8\u518C\u7B49\u5B8C\u6574\u6D41\u7A0B\u3002 </p></div><div class="tip-notice" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>\u63D0\u793A\uFF1A</strong>\u672C\u6587\u9002\u7528\u4E8E\u5404\u79CD\u4E3B\u6D41\u7535\u89C6\u76D2\u5B50\uFF08\u5982NVIDIA Shield TV\u3001Apple TV\u3001\u5C0F\u7C73\u76D2\u5B50\u56FD\u9645\u7248\u7B49\uFF09\uFF0C\u4E5F\u9002\u7528\u4E8E\u90E8\u5206\u667A\u80FD\u7535\u89C6\u3002\u6559\u7A0B\u4E2D\u4F7F\u7528\u7684\u8BBE\u5907\u4E3ANVIDIA Shield TV Pro 2019\u3002</p></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>\u51C6\u5907\u5DE5\u4F5C</h2><p class="content-text" data-v-ad620e32>\u5728\u5F00\u59CB\u4E4B\u524D\uFF0C\u8BF7\u786E\u4FDD\u60A8\u5DF2\u51C6\u5907\u597D\u4EE5\u4E0B\u5185\u5BB9\u3002\u8FD9\u4E9B\u662F\u89C2\u770B\u5948\u98DE4K\u5185\u5BB9\u7684\u57FA\u672C\u8981\u6C42\uFF1A</p><div class="requirements-grid" data-v-ad620e32><div class="requirement-column" data-v-ad620e32><h3 data-v-ad620e32>\u786C\u4EF6\u8981\u6C42</h3><ul data-v-ad620e32><li data-v-ad620e32>\u652F\u63014K\u548CNetflix\u8BA4\u8BC1\u7684\u7535\u89C6\u76D2\u5B50</li><li data-v-ad620e32>4K HDR\u7535\u89C6\uFF08HDMI 2.0\u63A5\u53E3\uFF09</li><li data-v-ad620e32>\u9AD8\u901FHDMI 2.0\u7EBF\u7F06\uFF0818Gbps\uFF09</li><li data-v-ad620e32>\u652F\u63015.1\u58F0\u9053\u6216\u675C\u6BD4\u5168\u666F\u58F0\u7684\u97F3\u54CD\u7CFB\u7EDF</li></ul></div><div class="requirement-column" data-v-ad620e32><h3 data-v-ad620e32>\u7F51\u7EDC\u8981\u6C42</h3><ul data-v-ad620e32><li data-v-ad620e32>\u7A33\u5B9A\u7684\u5BBD\u5E26\u7F51\u7EDC\uFF08\u5EFA\u8BAE100Mbps\u4EE5\u4E0A\uFF09</li><li data-v-ad620e32>\u652F\u63015GHz\u9891\u6BB5\u7684\u8DEF\u7531\u5668</li><li data-v-ad620e32>\u5948\u98DE\u652F\u6301\u7684DNS\u670D\u52A1\uFF08\u53EF\u9009\uFF09</li></ul></div><div class="requirement-column" data-v-ad620e32><h3 data-v-ad620e32>\u8D26\u53F7\u8981\u6C42</h3><ul data-v-ad620e32><li data-v-ad620e32>Netflix\u9AD8\u7EA7\u4F1A\u5458\u8D26\u53F7\uFF08\u652F\u63014K\uFF09</li><li data-v-ad620e32>\u652F\u6301\u89E3\u9501\u5948\u98DE\u7684\u7F51\u7EDC\u73AF\u5883</li><li data-v-ad620e32>\u652F\u4ED8\u65B9\u5F0F\uFF08\u4FE1\u7528\u5361/PayPal\uFF09</li></ul></div></div></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>\u8BE6\u7EC6\u6B65\u9AA4</h2><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>1</span><h3 class="step-title" data-v-ad620e32>\u9009\u62E9\u5408\u9002\u7684\u7535\u89C6\u76D2\u5B50</h3></div><p class="content-text" data-v-ad620e32> \u5E76\u975E\u6240\u6709\u7535\u89C6\u76D2\u5B50\u90FD\u652F\u6301\u5948\u98DE4K\u64AD\u653E\u3002\u4EE5\u4E0B\u662F\u7ECF\u8FC7\u6D4B\u8BD5\u786E\u5B9E\u652F\u6301\u5948\u98DE4K\u7684\u8BBE\u5907\uFF1A </p><div class="device-list" data-v-ad620e32><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>NVIDIA Shield TV Pro (2019)</strong> - \u6700\u4F73\u6027\u80FD\uFF0C\u652F\u6301\u675C\u6BD4\u89C6\u754C\u548C\u5168\u666F\u58F0 </div><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>Apple TV 4K (2022)</strong> - \u4F18\u79C0\u7684\u751F\u6001\u7CFB\u7EDF\uFF0C\u6D41\u7545\u4F53\u9A8C </div><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>\u5C0F\u7C73\u76D2\u5B50\u56FD\u9645\u7248</strong> - \u6027\u4EF7\u6BD4\u4E4B\u9009\uFF0C\u652F\u63014K\u4F46\u4E0D\u652F\u6301\u675C\u6BD4\u89C6\u754C </div><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>Chromecast with Google TV</strong> - \u5C0F\u5DE7\u4FBF\u643A\uFF0C\u652F\u63014K HDR </div></div><div class="device-showcase" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u667A\u80FD\u7535\u89C6\u76D2\u5B50\u754C\u9762\u5C55\u793A" class="showcase-image" data-v-ad620e32></div><div class="warning-notice" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>\u6CE8\u610F\uFF1A</strong>\u56FD\u5185\u7248\u7535\u89C6\u76D2\u5B50\uFF08\u5982\u5929\u732B\u9B54\u76D2\u3001\u5F53\u8D1D\u76D2\u5B50\uFF09\u901A\u5E38\u65E0\u6CD5\u76F4\u63A5\u5B89\u88C5\u5B98\u65B9\u5948\u98DE\u5E94\u7528\uFF0C\u5373\u4FBF\u5B89\u88C5\u4E5F\u65E0\u6CD5\u64AD\u653E4K\u5185\u5BB9\u3002</p></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>2</span><h3 class="step-title" data-v-ad620e32>\u914D\u7F6E\u7F51\u7EDC\u73AF\u5883</h3></div><p class="content-text" data-v-ad620e32> \u7531\u4E8E\u5948\u98DE\u5BF9\u5730\u533A\u5185\u5BB9\u7684\u9650\u5236\uFF0C\u6211\u4EEC\u9700\u8981\u914D\u7F6E\u6B63\u786E\u7684\u7F51\u7EDC\u73AF\u5883\uFF1A </p><div class="network-steps" data-v-ad620e32><div class="network-step" data-v-ad620e32> \u4F7F\u7528\u652F\u6301\u5948\u98DE\u7684\u7F51\u7EDC\u670D\u52A1\uFF08\u786E\u4FDD\u53EF\u4EE5\u8BBF\u95EE\u5948\u98DE\u5E93\uFF09 </div><div class="network-step" data-v-ad620e32> \u5728\u8DEF\u7531\u5668\u6216\u7535\u89C6\u76D2\u5B50\u8BBE\u7F6E\u4E2D\u914D\u7F6E\u7F51\u7EDC\u53C2\u6570 </div><div class="network-step" data-v-ad620e32> \u6D4B\u8BD5\u7F51\u7EDC\u901F\u5EA6\uFF08\u5948\u98DE4K\u9700\u8981\u81F3\u5C1125Mbps\u7A33\u5B9A\u901F\u5EA6\uFF09 </div></div><div class="tip-box" data-v-ad620e32><h4 data-v-ad620e32>\u7F51\u7EDC\u4F18\u5316\u6280\u5DE7\uFF1A</h4><p data-v-ad620e32>\u4F7F\u7528\u7F51\u7EBF\u8FDE\u63A5\u4EE3\u66FFWiFi\u53EF\u4EE5\u83B7\u5F97\u66F4\u7A33\u5B9A\u7684\u901F\u5EA6\u3002\u5982\u679C\u5FC5\u987B\u4F7F\u7528WiFi\uFF0C\u8BF7\u786E\u4FDD\u4F7F\u75285GHz\u9891\u6BB5\u5E76\u9760\u8FD1\u8DEF\u7531\u5668\u3002</p></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>3</span><h3 class="step-title" data-v-ad620e32>\u5B89\u88C5\u5948\u98DE\u5E94\u7528</h3></div><p class="content-text" data-v-ad620e32> \u5728\u8BBE\u5907\u4E0A\u5B89\u88C5\u5B98\u65B9Netflix\u5E94\u7528\uFF1A </p><div class="install-steps" data-v-ad620e32><div class="install-step" data-v-ad620e32> \u5728Google Play\u5546\u5E97\uFF08Android TV\u8BBE\u5907\uFF09\u6216App Store\uFF08Apple TV\uFF09\u641C\u7D22&quot;Netflix&quot; </div><div class="install-step" data-v-ad620e32> \u4E0B\u8F7D\u5E76\u5B89\u88C5\u6700\u65B0\u7248\u5E94\u7528 </div><div class="install-step" data-v-ad620e32> \u6253\u5F00\u5E94\u7528\u5E76\u767B\u5F55\u60A8\u7684Netflix\u8D26\u53F7 </div></div><div class="app-showcase" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u7535\u89C6\u76D2\u5B50\u5E94\u7528\u754C\u9762\u5C55\u793A" class="showcase-image" data-v-ad620e32></div><div class="warning-notice" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>\u6CE8\u610F\uFF1A</strong>\u8BF7\u786E\u4FDD\u5B89\u88C5\u7684\u662F\u5B98\u65B9Netflix\u5E94\u7528\uFF0C\u800C\u975E\u7B2C\u4E09\u65B9\u4FEE\u6539\u7248\uFF0C\u5426\u5219\u53EF\u80FD\u65E0\u6CD5\u64AD\u653E4K\u5185\u5BB9\u3002</p></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>4</span><h3 class="step-title" data-v-ad620e32>\u914D\u7F6E\u64AD\u653E\u8BBE\u7F6E</h3></div><p class="content-text" data-v-ad620e32> \u767B\u5F55\u540E\uFF0C\u8FDB\u5165\u8D26\u6237\u8BBE\u7F6E\u8C03\u6574\u64AD\u653E\u53C2\u6570\uFF1A </p><div class="config-steps" data-v-ad620e32><div class="config-step" data-v-ad620e32> \u8FDB\u5165&quot;\u8D26\u6237\u8BBE\u7F6E&quot;\u2192&quot;\u64AD\u653E\u8BBE\u7F6E&quot; </div><div class="config-step" data-v-ad620e32> \u5C06\u6570\u636E\u4F7F\u7528\u8BBE\u7F6E\u4E3A&quot;\u9AD8&quot;\uFF084K\u6240\u9700\uFF09 </div><div class="config-step" data-v-ad620e32> \u6253\u5F00&quot;\u6D4B\u8BD5\u53C2\u4E0E&quot;\u9009\u9879\u4EE5\u83B7\u53D6\u6700\u65B0\u529F\u80FD </div><div class="config-step" data-v-ad620e32> \u8BBE\u7F6E\u9996\u9009\u5B57\u5E55\u6837\u5F0F\uFF08\u5927\u5C0F\u3001\u989C\u8272\u7B49\uFF09 </div></div><div class="config-showcase" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u8BBE\u5907\u914D\u7F6E\u548C\u8BBE\u7F6E\u754C\u9762" class="showcase-image" data-v-ad620e32></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>5</span><h3 class="step-title" data-v-ad620e32>\u9A8C\u8BC14K\u64AD\u653E\u6548\u679C</h3></div><p class="content-text" data-v-ad620e32> \u64AD\u653E\u5948\u98DE\u5185\u5BB9\u65F6\uFF0C\u5982\u4F55\u786E\u8BA4\u662F\u5426\u8FBE\u52304K\u753B\u8D28\uFF1A </p><div class="verify-steps" data-v-ad620e32><div class="verify-step" data-v-ad620e32> \u5728\u64AD\u653E\u754C\u9762\u6309&quot;\u4FE1\u606F&quot;\u6309\u94AE\uFF08\u4E0D\u540C\u8BBE\u5907\u6309\u952E\u4E0D\u540C\uFF09 </div><div class="verify-step" data-v-ad620e32> \u67E5\u770B\u5206\u8FA8\u7387\u4FE1\u606F\uFF08\u5E94\u663E\u793A2160p\uFF09 </div><div class="verify-step" data-v-ad620e32> \u68C0\u67E5HDR\u6807\u5FD7\uFF08DV\u6216HDR10\uFF09 </div><div class="verify-step" data-v-ad620e32> \u6CE8\u610F\u97F3\u8F68\u4FE1\u606F\uFF08DD+\u6216Atmos\uFF09 </div></div><p class="content-text" data-v-ad620e32> \u60A8\u4E5F\u53EF\u4EE5\u64AD\u653E\u5948\u98DE\u5B98\u65B9\u6D4B\u8BD5\u89C6\u9891\uFF08\u641C\u7D22&quot;Test Patterns&quot;\uFF09\u6765\u9A8C\u8BC1\u5206\u8FA8\u7387\u3002 </p></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>\u5E38\u89C1\u95EE\u9898\u89E3\u7B54</h2><div class="faq-item faq-item-orange" data-v-ad620e32><div class="faq-question" data-v-ad620e32><h3 data-v-ad620e32>\u4E3A\u4EC0\u4E48\u6211\u7684\u5948\u98DE\u53EA\u663E\u793AHD\uFF0C\u6CA1\u67094K\u9009\u9879\uFF1F</h3></div><div class="faq-answer" data-v-ad620e32><p data-v-ad620e32>\u53EF\u80FD\u539F\u56E0\uFF1A1\uFF09\u60A8\u7684\u8D26\u53F7\u4E0D\u662F\u9AD8\u7EA7\u4F1A\u5458\uFF1B2\uFF09\u8BBE\u5907\u4E0D\u652F\u63014K\u64AD\u653E\uFF1B3\uFF09\u7F51\u7EDC\u901F\u5EA6\u4E0D\u8DB3\uFF1B4\uFF09\u5185\u5BB9\u5728\u8BE5\u5730\u533A\u6CA1\u67094K\u7248\u672C\u3002\u8BF7\u9010\u4E00\u68C0\u67E5\u8FD9\u4E9B\u56E0\u7D20\u3002</p></div></div><div class="faq-item faq-item-green" data-v-ad620e32><div class="faq-question" data-v-ad620e32><h3 data-v-ad620e32>\u5982\u4F55\u83B7\u5F97\u4E2D\u6587\u5B57\u5E55\uFF1F</h3></div><div class="faq-answer" data-v-ad620e32><p data-v-ad620e32>\u5948\u98DE\u5927\u90E8\u5206\u5185\u5BB9\u90FD\u63D0\u4F9B\u4E2D\u6587\u5B57\u5E55\u3002\u64AD\u653E\u65F6\u70B9\u51FB&quot;\u5B57\u5E55\u548C\u97F3\u8F68&quot;\u56FE\u6807\uFF0C\u9009\u62E9&quot;\u4E2D\u6587(\u7B80\u4F53)&quot;\u5373\u53EF\u3002\u5982\u679C\u67D0\u4E9B\u5185\u5BB9\u6CA1\u6709\u4E2D\u6587\uFF0C\u53EF\u80FD\u662F\u5730\u533A\u9650\u5236\u5BFC\u81F4\u3002</p></div></div><div class="faq-item faq-item-blue" data-v-ad620e32><div class="faq-question" data-v-ad620e32><h3 data-v-ad620e32>\u4E3A\u4EC0\u4E48\u64AD\u653E\u65F6\u7ECF\u5E38\u7F13\u51B2\uFF1F</h3></div><div class="faq-answer" data-v-ad620e32><p data-v-ad620e32>\u7F13\u51B2\u901A\u5E38\u7531\u7F51\u7EDC\u95EE\u9898\u5F15\u8D77\uFF1A1\uFF09\u7F51\u7EDC\u901F\u5EA6\u4E0D\u8DB3\uFF1B2\uFF09WiFi\u4FE1\u53F7\u4E0D\u7A33\u5B9A\uFF1B3\uFF09DNS\u89E3\u6790\u95EE\u9898\u3002\u5EFA\u8BAE\u4F7F\u7528\u7F51\u7EBF\u8FDE\u63A5\uFF0C\u66F4\u6362DNS\u670D\u52A1\u5668\uFF08\u5982Google DNS 8.8.8.8\uFF09\uFF0C\u6216\u5347\u7EA7\u7F51\u7EDC\u5E26\u5BBD\u3002</p></div></div></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>\u603B\u7ED3</h2><p class="content-text" data-v-ad620e32> \u901A\u8FC7\u672C\u6587\u7684\u6307\u5BFC\uFF0C\u60A8\u5E94\u8BE5\u5DF2\u7ECF\u6210\u529F\u5728\u7535\u89C6\u76D2\u5B50\u4E0A\u914D\u7F6E\u597D\u4E86\u5948\u98DE4K\u64AD\u653E\u73AF\u5883\u3002\u4EAB\u53D74K HDR\u5E26\u6765\u7684\u89C6\u89C9\u76DB\u5BB4\u548C\u675C\u6BD4\u5168\u666F\u58F0\u7684\u6C89\u6D78\u5F0F\u4F53\u9A8C\u5427\uFF01\u5982\u679C\u5728\u914D\u7F6E\u8FC7\u7A0B\u4E2D\u9047\u5230\u4EFB\u4F55\u95EE\u9898\uFF0C\u6B22\u8FCE\u5728\u8BC4\u8BBA\u533A\u7559\u8A00\uFF0C\u6211\u4F1A\u5C3D\u529B\u89E3\u7B54\u3002 </p><div class="final-tip" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>\u6700\u540E\u63D0\u793A\uFF1A</strong>\u5948\u98DE\u76844K\u5185\u5BB9\u5728\u4E0D\u65AD\u66F4\u65B0\uFF0C\u5EFA\u8BAE\u5173\u6CE8\u5948\u98DE\u5B98\u65B9\u793E\u4EA4\u5A92\u4F53\u6216\u4F7F\u7528\u7B2C\u4E09\u65B9\u670D\u52A1\uFF08\u5982Unogs\uFF09\u67E5\u8BE2\u6700\u65B04K\u5185\u5BB9\u3002\u540C\u65F6\uFF0C\u4FDD\u6301\u8BBE\u5907\u548C\u5E94\u7528\u7684\u66F4\u65B0\uFF0C\u4EE5\u83B7\u5F97\u6700\u4F73\u4F53\u9A8C\u3002</p></div></div></div></div></div><div class="related-section" data-v-ad620e32><h2 class="related-title" data-v-ad620e32>\u76F8\u5173\u63A8\u8350</h2><div class="related-articles" data-v-ad620e32><div class="related-article" data-v-ad620e32><div class="related-image" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="Apple TV 4K\u8BC4\u6D4B" data-v-ad620e32></div><div class="related-content" data-v-ad620e32><div class="related-category" data-v-ad620e32>\u8BBE\u5907\u8BC4\u6D4B</div><h3 class="related-article-title" data-v-ad620e32>2023\u5E74Apple TV 4K\u5168\u9762\u8BC4\u6D4B\uFF1A\u503C\u5F97\u8D2D\u4E70\u5417\uFF1F</h3><div class="related-author" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u674E\u8BC4\u6D4B" class="author-avatar-small" data-v-ad620e32><span class="author-name-small" data-v-ad620e32>\u674E\u8BC4\u6D4B</span><span class="publish-date-small" data-v-ad620e32>2023-06-15</span></div></div></div><div class="related-article" data-v-ad620e32><div class="related-image" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u5BB6\u5EAD\u5F71\u9662\u642D\u5EFA" data-v-ad620e32></div><div class="related-content" data-v-ad620e32><div class="related-category" data-v-ad620e32>\u5BB6\u5C45\u5F71\u9662</div><h3 class="related-article-title" data-v-ad620e32>\u6253\u9020\u5B8C\u7F8E\u5BB6\u5EAD\u5F71\u9662\uFF1A\u4ECE\u5165\u95E8\u5230\u4E13\u4E1A\u7684\u5B8C\u6574\u6307\u5357</h3><div class="related-author" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u738B\u5F71\u97F3" class="author-avatar-small" data-v-ad620e32><span class="author-name-small" data-v-ad620e32>\u738B\u5F71\u97F3</span><span class="publish-date-small" data-v-ad620e32>2023-06-10</span></div></div></div><div class="related-article" data-v-ad620e32><div class="related-image" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u6D41\u5A92\u4F53\u5E73\u53F0\u5BF9\u6BD4" data-v-ad620e32></div><div class="related-content" data-v-ad620e32><div class="related-category" data-v-ad620e32>\u6D41\u5A92\u4F53</div><h3 class="related-article-title" data-v-ad620e32>\u4E94\u5927\u6D41\u5A92\u4F53\u5E73\u53F0\u5BF9\u6BD4\uFF1ANetflix\u3001Disney+\u3001HBO\u54EA\u5BB6\u5F3A\uFF1F</h3><div class="related-author" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="\u8D75\u5A92\u4F53" class="author-avatar-small" data-v-ad620e32><span class="author-name-small" data-v-ad620e32>\u8D75\u5A92\u4F53</span><span class="publish-date-small" data-v-ad620e32>2023-06-05</span></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="content-placeholder" data-v-ad620e32><h1 data-v-ad620e32>\u6587\u7AE0\u4E0D\u5B58\u5728</h1><p data-v-ad620e32>\u62B1\u6B49\uFF0C\u60A8\u8BBF\u95EE\u7684\u6587\u7AE0\u4E0D\u5B58\u5728\u3002</p><button class="back-btn" data-v-ad620e32>\u8FD4\u56DE\u4E0A\u4E00\u9875</button></div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_LoginRegisterModal, {
        visible: unref(modal).showLogin,
        onClose: ($event) => unref(modal).closeLogin()
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad620e32"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-BQGZIfw_.mjs.map
