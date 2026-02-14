import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useHead, _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "company",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "公司简介 - 凡图拉",
      meta: [
        { name: "description", content: "了解凡图拉公司的发展历程、企业文化和核心价值观。" },
        { name: "keywords", content: "凡图拉,公司简介,企业介绍,关于我们" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "company-page" }, _attrs))} data-v-3d024240><div class="page-content" data-v-3d024240><div class="content-container" data-v-3d024240><div class="header-section" data-v-3d024240><h1 class="main-title" data-v-3d024240>关于我们</h1><h2 class="sub-title" data-v-3d024240>公司简介</h2></div><div class="content-section" data-v-3d024240><div class="content-blocks-container" data-v-3d024240><div class="highlighted-block top-block" data-v-3d024240><p class="content-paragraph highlighted-merged" data-v-3d024240> 凡图拉成立于 2019 年，是一家面向全球用户的数字化服务平台，专注于为用户提供便捷、稳定、可持续的数字消费支持解决方案。 </p><p class="content-paragraph highlighted-merged" data-v-3d024240> 自成立之初，凡图拉始终坚持「简单实用」的产品理念，围绕用户在跨境数字消费过程中的实际需求，不断优化服务流程与系统架构，致力于降低使用门槛、提升整体体验的稳定性与可靠性。 </p></div><div class="white-block" data-v-3d024240><p class="content-paragraph white-merged" data-v-3d024240> 在早期阶段，平台主要由一支具备技术与内容平台经验的团队进行维护，通过人工与半自动方式处理用户需求，并逐步积累了对不同地区数字消费环境的理解。随着用户规模的增长与业务复杂度的提升，凡图拉持续进行系统升级，于 2021 年完成了核心系统的模块化重构，逐步形成了标准化、流程化的平台运营体系。 </p><p class="content-paragraph white-merged" data-v-3d024240> 截至目前，凡图拉已稳定运行超过五年，累计服务用户超过 10,000 人，用户分布覆盖 30 多个国家和地区。平台支持多种主流数字化支付方式，并为用户提供统一的账户体系与额度管理机制，以满足不同使用场景下的消费需求。 </p></div><div class="highlighted-block bottom-block" data-v-3d024240><p class="content-paragraph highlighted-merged" data-v-3d024240> 凡图拉注重系统安全与服务稳定性，平台采用自动化处理机制结合人工支持的方式，确保服务流程清晰可控。同时，我们建立了多渠道客服支持体系，为用户在使用过程中提供及时、有效的协助。 </p><p class="content-paragraph highlighted-merged" data-v-3d024240> 面向未来，凡图拉将持续拓展服务边界，优化系统性能，并探索更具弹性与韧性的全球化部署方案，努力为用户打造一个长期可信赖的数字化服务平台，真正实现高效、稳定、无地域限制的数字消费体验。 </p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/company.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const company = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d024240"]]);
export {
  company as default
};
//# sourceMappingURL=company-15BGOJcQ.js.map
