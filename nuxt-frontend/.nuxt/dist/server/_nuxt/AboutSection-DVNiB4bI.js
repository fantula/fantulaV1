import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
import { defineComponent, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from "vue/server-renderer";
import { x as monitor_default, s as service_default, aP as trophy_default, aQ as share_default } from "./index-CCIZH4aC.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
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
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const cards = [
      {
        icon: monitor_default,
        // Team -> Monitor/Screen
        title: "大团队开发",
        desc: "所有商品均为团队开发，品质保障"
      },
      {
        icon: service_default,
        // Service -> Headset/Service
        title: "人工客服服务",
        desc: "提供完善的售后服务，购物无忧"
      },
      {
        icon: trophy_default,
        // Platform -> Trophy/Medal
        title: "大平台更放心",
        desc: "十年开发经验，服务千万用户"
      },
      {
        icon: share_default,
        // Network -> Share/Connection
        title: "全网矩阵",
        desc: "覆盖全国平台，快速送达"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "about-section" }, _attrs))} data-v-443c8716><div class="about-bg" data-v-443c8716><div class="about-title" data-v-443c8716>关于我们</div><div class="about-subtitle" data-v-443c8716>提供高品质优质服务</div><div class="about-cards" data-v-443c8716><!--[-->`);
      ssrRenderList(cards, (item) => {
        _push(`<div class="about-card" data-v-443c8716><div class="about-icon" data-v-443c8716>`);
        _push(ssrRenderComponent(_component_el_icon, { size: 48 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), null, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="about-card-title" data-v-443c8716>${ssrInterpolate(item.title)}</div><div class="about-card-desc" data-v-443c8716>${ssrInterpolate(item.desc)}</div></div>`);
      });
      _push(`<!--]--></div><button class="about-more-btn" data-v-443c8716>查看更多 →</button></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/AboutSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AboutSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-443c8716"]]);
export {
  AboutSection as default
};
//# sourceMappingURL=AboutSection-DVNiB4bI.js.map
