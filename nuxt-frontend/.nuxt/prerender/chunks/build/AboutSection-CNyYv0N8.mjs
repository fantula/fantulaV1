import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { T as monitor_default, s as service_default, aV as trophy_default, aW as share_default } from './index-DuV_oMrC.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const cards = [
      {
        icon: monitor_default,
        // Team -> Monitor/Screen
        title: "\u5927\u56E2\u961F\u5F00\u53D1",
        desc: "\u6240\u6709\u5546\u54C1\u5747\u4E3A\u56E2\u961F\u5F00\u53D1\uFF0C\u54C1\u8D28\u4FDD\u969C"
      },
      {
        icon: service_default,
        // Service -> Headset/Service
        title: "\u4EBA\u5DE5\u5BA2\u670D\u670D\u52A1",
        desc: "\u63D0\u4F9B\u5B8C\u5584\u7684\u552E\u540E\u670D\u52A1\uFF0C\u8D2D\u7269\u65E0\u5FE7"
      },
      {
        icon: trophy_default,
        // Platform -> Trophy/Medal
        title: "\u5927\u5E73\u53F0\u66F4\u653E\u5FC3",
        desc: "\u5341\u5E74\u5F00\u53D1\u7ECF\u9A8C\uFF0C\u670D\u52A1\u5343\u4E07\u7528\u6237"
      },
      {
        icon: share_default,
        // Network -> Share/Connection
        title: "\u5168\u7F51\u77E9\u9635",
        desc: "\u8986\u76D6\u5168\u56FD\u5E73\u53F0\uFF0C\u5FEB\u901F\u9001\u8FBE"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "about-section" }, _attrs))} data-v-443c8716><div class="about-bg" data-v-443c8716><div class="about-title" data-v-443c8716>\u5173\u4E8E\u6211\u4EEC</div><div class="about-subtitle" data-v-443c8716>\u63D0\u4F9B\u9AD8\u54C1\u8D28\u4F18\u8D28\u670D\u52A1</div><div class="about-cards" data-v-443c8716><!--[-->`);
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
      _push(`<!--]--></div><button class="about-more-btn" data-v-443c8716>\u67E5\u770B\u66F4\u591A \u2192</button></div></section>`);
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

export { AboutSection as default };
//# sourceMappingURL=AboutSection-CNyYv0N8.mjs.map
