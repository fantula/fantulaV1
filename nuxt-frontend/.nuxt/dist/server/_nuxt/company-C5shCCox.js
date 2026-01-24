import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import { _ as _export_sfc } from "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "company-page" }, _attrs))} data-v-3ea6d68a><div class="page-content" data-v-3ea6d68a><div class="content-container" data-v-3ea6d68a><div class="header-section" data-v-3ea6d68a><h1 class="main-title" data-v-3ea6d68a>关于我们</h1><h2 class="sub-title" data-v-3ea6d68a>公司简介</h2></div><div class="content-section" data-v-3ea6d68a><div class="content-blocks-container" data-v-3ea6d68a><div class="highlighted-block top-block" data-v-3ea6d68a><p class="content-paragraph highlighted-merged" data-v-3ea6d68a> 凡图拉成立于2019年，是一家专注于数字商品充值、礼品卡服务与虚拟支付卡解决方案的多元化数字平台。自创立以来，我们始终秉持「简单实用」的产品理念，为全球用户提供快捷、安全、稳定的数字消费体验。 </p><p class="content-paragraph highlighted-merged" data-v-3ea6d68a> 在最初的几年中，凡图拉仅由几位热爱数字内容的技术成员维护，主要以人工处理海外平台充值订单为主。面对复杂的支付环境和不断变化的内容平台政策，我们不断进行系统升级与流程优化。到2021年，凡图拉上线了自研订单管理系统和钱包功能，正式步入平台化运营。 </p></div><div class="white-block" data-v-3ea6d68a><p class="content-paragraph white-merged" data-v-3ea6d68a> 截至目前，凡图拉已稳定运行超过五年，累计注册用户突破10,000人，服务范围覆盖30多个国家和地区。我们支持用户以加密货币、数字钱包、支付宝等多种方式充值余额，并通过平台进行代充、代付、兑换礼品卡等多项操作。 </p><p class="content-paragraph white-merged" data-v-3ea6d68a> 我们的核心业务包括但不限于：<br data-v-3ea6d68a> • 海外内容平台会员充值与代付服务，摇醒化呈现，保障用户认知与合规<br data-v-3ea6d68a> • 数字礼品卡发售与兑换服务，如奢当劳卡、Netflix礼品卡等<br data-v-3ea6d68a> • 虚拟支付卡服务，如万事达虚拟卡，用于海外订阅与购物<br data-v-3ea6d68a> • 平台钱包余额管理与自动退款系统，用户追款权退至平台钱包，暂不支持提现 </p></div><div class="highlighted-block bottom-block" data-v-3ea6d68a><p class="content-paragraph highlighted-merged" data-v-3ea6d68a> 凡图拉目前采用邮箱注册 + 验证码登录机制，无需实名或手机号，降低了使用门槛。我们支持全自动发货与微信/Telegram/WhatsApp客服售后体系，确保用户下单无忧、售后有保。 </p><p class="content-paragraph highlighted-merged" data-v-3ea6d68a> 随着全球数字化消费的持续增长，凡图拉正加快布局数字礼品卡市场与虚拟支付卡业务，致力于成为华语用户首选的跨境数字商品服务平台。我们将不断扩展服务品类、提升平台稳定性，并探索全球节点部署，真正实现&quot;数字生活，无国界&quot;。 </p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/company.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const company = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ea6d68a"]]);
export {
  company as default
};
//# sourceMappingURL=company-C5shCCox.js.map
