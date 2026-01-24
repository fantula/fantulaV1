import { u as useModalStore, b as useRoute, c as __nuxt_component_2, _ as _export_sfc } from "../server.mjs";
import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _imports_0 } from "./virtual_public-CGOd9nF1.js";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const modal = useModalStore();
    const route = useRoute();
    const articleId = route.params.id;
    const articles = {
      1: {
        id: 1,
        title: "电视盒子看奈飞4K完整教程：解锁高清流媒体体验",
        description: "教你如何选择合适的电视盒子，安装奈飞App解码4K画质，解决播放卡顿问题...",
        image: "/images/shared/logo.png",
        date: "2023年6月20日",
        category: "教程指南",
        readTime: "8分钟",
        author: {
          avatar: "/images/shared/logo.png",
          name: "张科技"
        }
      }
    };
    const currentArticle = articles[articleId];
    const pageTitle = currentArticle ? currentArticle.title : "文章详情";
    useHead({
      title: `${pageTitle} - 凡图拉`,
      meta: [
        { name: "description", content: currentArticle ? currentArticle.description : "凡图拉文章详情页面" },
        { name: "keywords", content: currentArticle ? `${currentArticle.title},流媒体,教程,技术支持,${currentArticle.author.name}` : "凡图拉,文章" },
        { name: "author", content: currentArticle ? currentArticle.author.name : "凡图拉" },
        { name: "robots", content: "index, follow" },
        { name: "article:published_time", content: currentArticle ? currentArticle.date : "" },
        { name: "article:author", content: currentArticle ? currentArticle.author.name : "" },
        // Open Graph
        { property: "og:title", content: `${pageTitle} - 凡图拉` },
        { property: "og:description", content: currentArticle ? currentArticle.description : "凡图拉文章详情页面" },
        { property: "og:type", content: "article" },
        { property: "og:image", content: currentArticle ? currentArticle.image : "/images/default-og.jpg" },
        { property: "og:url", content: `http://localhost:3000/article/${articleId}` },
        { property: "article:published_time", content: currentArticle ? currentArticle.date : "" },
        { property: "article:author", content: currentArticle ? currentArticle.author.name : "" },
        { property: "article:section", content: currentArticle ? currentArticle.category : "" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${pageTitle} - 凡图拉` },
        { name: "twitter:description", content: currentArticle ? currentArticle.description : "凡图拉文章详情页面" },
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
              "name": "凡图拉",
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
      const _component_LoginRegisterModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-detail-page" }, _attrs))} data-v-ad620e32><div class="page-content" data-v-ad620e32><div class="article-container" data-v-ad620e32>`);
      if (unref(currentArticle)) {
        _push(`<div class="article-content" data-v-ad620e32><div class="article-category" data-v-ad620e32><span class="category-tag" data-v-ad620e32>${ssrInterpolate(unref(currentArticle).category)}</span></div><h1 class="article-title" data-v-ad620e32><div class="title-line-1" data-v-ad620e32>电视盒子看奈飞4K完整教程：</div><div class="title-line-2" data-v-ad620e32>解锁高清流媒体体验</div></h1><div class="article-meta" data-v-ad620e32><div class="author-section" data-v-ad620e32><img${ssrRenderAttr("src", unref(currentArticle).author.avatar)}${ssrRenderAttr("alt", unref(currentArticle).author.name)} class="author-avatar" data-v-ad620e32><div class="author-details" data-v-ad620e32><div class="author-info" data-v-ad620e32><span class="author-name" data-v-ad620e32>${ssrInterpolate(unref(currentArticle).author.name)}</span></div><div class="meta-info" data-v-ad620e32><span class="article-date" data-v-ad620e32>${ssrInterpolate(unref(currentArticle).date)}</span><span class="meta-divider" data-v-ad620e32>•</span><span class="read-time" data-v-ad620e32>阅读时间 ${ssrInterpolate(unref(currentArticle).readTime)}</span></div></div></div></div><div class="content-container" data-v-ad620e32><div class="article-body" data-v-ad620e32><div class="intro-section" data-v-ad620e32><p class="content-text" data-v-ad620e32> 在智能电视和电视盒子普及的今天，越来越多的人选择在电视上观看流媒体内容。Netflix（奈飞）作为全球领先的流媒体平台，提供了大量高质量的4K影视内容。然而，很多用户在使用电视盒子观看奈飞时遇到了各种问题：无法播放4K、画质模糊、没有中文字幕等。本文将详细介绍如何在电视盒子上完美观看奈飞4K内容，包括设备选择、网络设置、账号注册等完整流程。 </p></div><div class="tip-notice" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>提示：</strong>本文适用于各种主流电视盒子（如NVIDIA Shield TV、Apple TV、小米盒子国际版等），也适用于部分智能电视。教程中使用的设备为NVIDIA Shield TV Pro 2019。</p></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>准备工作</h2><p class="content-text" data-v-ad620e32>在开始之前，请确保您已准备好以下内容。这些是观看奈飞4K内容的基本要求：</p><div class="requirements-grid" data-v-ad620e32><div class="requirement-column" data-v-ad620e32><h3 data-v-ad620e32>硬件要求</h3><ul data-v-ad620e32><li data-v-ad620e32>支持4K和Netflix认证的电视盒子</li><li data-v-ad620e32>4K HDR电视（HDMI 2.0接口）</li><li data-v-ad620e32>高速HDMI 2.0线缆（18Gbps）</li><li data-v-ad620e32>支持5.1声道或杜比全景声的音响系统</li></ul></div><div class="requirement-column" data-v-ad620e32><h3 data-v-ad620e32>网络要求</h3><ul data-v-ad620e32><li data-v-ad620e32>稳定的宽带网络（建议100Mbps以上）</li><li data-v-ad620e32>支持5GHz频段的路由器</li><li data-v-ad620e32>奈飞支持的DNS服务（可选）</li></ul></div><div class="requirement-column" data-v-ad620e32><h3 data-v-ad620e32>账号要求</h3><ul data-v-ad620e32><li data-v-ad620e32>Netflix高级会员账号（支持4K）</li><li data-v-ad620e32>支持解锁奈飞的网络环境</li><li data-v-ad620e32>支付方式（信用卡/PayPal）</li></ul></div></div></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>详细步骤</h2><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>1</span><h3 class="step-title" data-v-ad620e32>选择合适的电视盒子</h3></div><p class="content-text" data-v-ad620e32> 并非所有电视盒子都支持奈飞4K播放。以下是经过测试确实支持奈飞4K的设备： </p><div class="device-list" data-v-ad620e32><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>NVIDIA Shield TV Pro (2019)</strong> - 最佳性能，支持杜比视界和全景声 </div><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>Apple TV 4K (2022)</strong> - 优秀的生态系统，流畅体验 </div><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>小米盒子国际版</strong> - 性价比之选，支持4K但不支持杜比视界 </div><div class="device-item" data-v-ad620e32><strong data-v-ad620e32>Chromecast with Google TV</strong> - 小巧便携，支持4K HDR </div></div><div class="device-showcase" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="智能电视盒子界面展示" class="showcase-image" data-v-ad620e32></div><div class="warning-notice" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>注意：</strong>国内版电视盒子（如天猫魔盒、当贝盒子）通常无法直接安装官方奈飞应用，即便安装也无法播放4K内容。</p></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>2</span><h3 class="step-title" data-v-ad620e32>配置网络环境</h3></div><p class="content-text" data-v-ad620e32> 由于奈飞对地区内容的限制，我们需要配置正确的网络环境： </p><div class="network-steps" data-v-ad620e32><div class="network-step" data-v-ad620e32> 使用支持奈飞的网络服务（确保可以访问奈飞库） </div><div class="network-step" data-v-ad620e32> 在路由器或电视盒子设置中配置网络参数 </div><div class="network-step" data-v-ad620e32> 测试网络速度（奈飞4K需要至少25Mbps稳定速度） </div></div><div class="tip-box" data-v-ad620e32><h4 data-v-ad620e32>网络优化技巧：</h4><p data-v-ad620e32>使用网线连接代替WiFi可以获得更稳定的速度。如果必须使用WiFi，请确保使用5GHz频段并靠近路由器。</p></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>3</span><h3 class="step-title" data-v-ad620e32>安装奈飞应用</h3></div><p class="content-text" data-v-ad620e32> 在设备上安装官方Netflix应用： </p><div class="install-steps" data-v-ad620e32><div class="install-step" data-v-ad620e32> 在Google Play商店（Android TV设备）或App Store（Apple TV）搜索&quot;Netflix&quot; </div><div class="install-step" data-v-ad620e32> 下载并安装最新版应用 </div><div class="install-step" data-v-ad620e32> 打开应用并登录您的Netflix账号 </div></div><div class="app-showcase" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="电视盒子应用界面展示" class="showcase-image" data-v-ad620e32></div><div class="warning-notice" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>注意：</strong>请确保安装的是官方Netflix应用，而非第三方修改版，否则可能无法播放4K内容。</p></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>4</span><h3 class="step-title" data-v-ad620e32>配置播放设置</h3></div><p class="content-text" data-v-ad620e32> 登录后，进入账户设置调整播放参数： </p><div class="config-steps" data-v-ad620e32><div class="config-step" data-v-ad620e32> 进入&quot;账户设置&quot;→&quot;播放设置&quot; </div><div class="config-step" data-v-ad620e32> 将数据使用设置为&quot;高&quot;（4K所需） </div><div class="config-step" data-v-ad620e32> 打开&quot;测试参与&quot;选项以获取最新功能 </div><div class="config-step" data-v-ad620e32> 设置首选字幕样式（大小、颜色等） </div></div><div class="config-showcase" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="设备配置和设置界面" class="showcase-image" data-v-ad620e32></div></div><div class="step-section" data-v-ad620e32><div class="step-header" data-v-ad620e32><span class="step-number" data-v-ad620e32>5</span><h3 class="step-title" data-v-ad620e32>验证4K播放效果</h3></div><p class="content-text" data-v-ad620e32> 播放奈飞内容时，如何确认是否达到4K画质： </p><div class="verify-steps" data-v-ad620e32><div class="verify-step" data-v-ad620e32> 在播放界面按&quot;信息&quot;按钮（不同设备按键不同） </div><div class="verify-step" data-v-ad620e32> 查看分辨率信息（应显示2160p） </div><div class="verify-step" data-v-ad620e32> 检查HDR标志（DV或HDR10） </div><div class="verify-step" data-v-ad620e32> 注意音轨信息（DD+或Atmos） </div></div><p class="content-text" data-v-ad620e32> 您也可以播放奈飞官方测试视频（搜索&quot;Test Patterns&quot;）来验证分辨率。 </p></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>常见问题解答</h2><div class="faq-item faq-item-orange" data-v-ad620e32><div class="faq-question" data-v-ad620e32><h3 data-v-ad620e32>为什么我的奈飞只显示HD，没有4K选项？</h3></div><div class="faq-answer" data-v-ad620e32><p data-v-ad620e32>可能原因：1）您的账号不是高级会员；2）设备不支持4K播放；3）网络速度不足；4）内容在该地区没有4K版本。请逐一检查这些因素。</p></div></div><div class="faq-item faq-item-green" data-v-ad620e32><div class="faq-question" data-v-ad620e32><h3 data-v-ad620e32>如何获得中文字幕？</h3></div><div class="faq-answer" data-v-ad620e32><p data-v-ad620e32>奈飞大部分内容都提供中文字幕。播放时点击&quot;字幕和音轨&quot;图标，选择&quot;中文(简体)&quot;即可。如果某些内容没有中文，可能是地区限制导致。</p></div></div><div class="faq-item faq-item-blue" data-v-ad620e32><div class="faq-question" data-v-ad620e32><h3 data-v-ad620e32>为什么播放时经常缓冲？</h3></div><div class="faq-answer" data-v-ad620e32><p data-v-ad620e32>缓冲通常由网络问题引起：1）网络速度不足；2）WiFi信号不稳定；3）DNS解析问题。建议使用网线连接，更换DNS服务器（如Google DNS 8.8.8.8），或升级网络带宽。</p></div></div></div><div class="section-block" data-v-ad620e32><h2 class="section-title" data-v-ad620e32>总结</h2><p class="content-text" data-v-ad620e32> 通过本文的指导，您应该已经成功在电视盒子上配置好了奈飞4K播放环境。享受4K HDR带来的视觉盛宴和杜比全景声的沉浸式体验吧！如果在配置过程中遇到任何问题，欢迎在评论区留言，我会尽力解答。 </p><div class="final-tip" data-v-ad620e32><p data-v-ad620e32><strong data-v-ad620e32>最后提示：</strong>奈飞的4K内容在不断更新，建议关注奈飞官方社交媒体或使用第三方服务（如Unogs）查询最新4K内容。同时，保持设备和应用的更新，以获得最佳体验。</p></div></div></div></div></div><div class="related-section" data-v-ad620e32><h2 class="related-title" data-v-ad620e32>相关推荐</h2><div class="related-articles" data-v-ad620e32><div class="related-article" data-v-ad620e32><div class="related-image" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="Apple TV 4K评测" data-v-ad620e32></div><div class="related-content" data-v-ad620e32><div class="related-category" data-v-ad620e32>设备评测</div><h3 class="related-article-title" data-v-ad620e32>2023年Apple TV 4K全面评测：值得购买吗？</h3><div class="related-author" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="李评测" class="author-avatar-small" data-v-ad620e32><span class="author-name-small" data-v-ad620e32>李评测</span><span class="publish-date-small" data-v-ad620e32>2023-06-15</span></div></div></div><div class="related-article" data-v-ad620e32><div class="related-image" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="家庭影院搭建" data-v-ad620e32></div><div class="related-content" data-v-ad620e32><div class="related-category" data-v-ad620e32>家居影院</div><h3 class="related-article-title" data-v-ad620e32>打造完美家庭影院：从入门到专业的完整指南</h3><div class="related-author" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="王影音" class="author-avatar-small" data-v-ad620e32><span class="author-name-small" data-v-ad620e32>王影音</span><span class="publish-date-small" data-v-ad620e32>2023-06-10</span></div></div></div><div class="related-article" data-v-ad620e32><div class="related-image" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="流媒体平台对比" data-v-ad620e32></div><div class="related-content" data-v-ad620e32><div class="related-category" data-v-ad620e32>流媒体</div><h3 class="related-article-title" data-v-ad620e32>五大流媒体平台对比：Netflix、Disney+、HBO哪家强？</h3><div class="related-author" data-v-ad620e32><img${ssrRenderAttr("src", _imports_0)} alt="赵媒体" class="author-avatar-small" data-v-ad620e32><span class="author-name-small" data-v-ad620e32>赵媒体</span><span class="publish-date-small" data-v-ad620e32>2023-06-05</span></div></div></div></div></div></div>`);
      } else {
        _push(`<div class="content-placeholder" data-v-ad620e32><h1 data-v-ad620e32>文章不存在</h1><p data-v-ad620e32>抱歉，您访问的文章不存在。</p><button class="back-btn" data-v-ad620e32>返回上一页</button></div>`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BQGZIfw_.js.map
