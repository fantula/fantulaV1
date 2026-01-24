import { defineComponent, ref, mergeProps, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0 } from './virtual_public-CGOd9nF1.mjs';
import { _ as _export_sfc, d as useUserStore } from './server.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
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
  __name: "referral",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const stats = ref({
      registerNum: 0,
      orderNum: 0,
      orderAmount: 0
    });
    const inviteInfo = ref({
      code: "",
      link: "",
      nickName: "",
      avatar: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "referral-section" }, _attrs))} data-v-f38c5494><div class="section-header" data-v-f38c5494><h2 class="section-title" data-v-f38c5494>\u8FD4\u73B0\u63A8\u5E7F</h2></div><div class="referral-top" data-v-f38c5494><div class="invite-area" data-v-f38c5494><h3 class="invite-title" data-v-f38c5494>\u9080\u8BF7\u597D\u53CB\uFF0C\u8D5A\u53D6\u9AD8\u989D\u8FD4\u73B0</h3><p class="invite-desc" data-v-f38c5494>\u5206\u4EAB\u63A8\u5E7F\u7801\u9080\u8BF7\u597D\u53CB</p></div><div class="earnings-area" data-v-f38c5494><div class="earnings-content" data-v-f38c5494><div class="earnings-label" data-v-f38c5494>\u6211\u7684\u63A8\u5E7F\u6536\u76CA</div><div class="earnings-amount" data-v-f38c5494>\xA5 ${ssrInterpolate((_a = stats.value.orderAmount) != null ? _a : 0)}</div></div><button class="withdraw-btn" data-v-f38c5494>\u7ACB\u5373\u63D0\u73B0</button></div></div><div class="referral-middle" data-v-f38c5494><div class="referral-code-area" data-v-f38c5494><div class="area-header" data-v-f38c5494>\u6211\u7684\u63A8\u5E7F\u7801</div><div class="code-content" data-v-f38c5494><div class="code-label" data-v-f38c5494>\u60A8\u7684\u4E13\u5C5E\u63A8\u5E7F\u7801</div><div class="code-section" data-v-f38c5494><div class="code-display" data-v-f38c5494>${ssrInterpolate(inviteInfo.value.code)}</div><button class="copy-code-btn" data-v-f38c5494>\u590D\u5236\u63A8\u5E7F\u7801</button></div></div></div><div class="referral-link-area" data-v-f38c5494><div class="area-header" data-v-f38c5494>\u63A8\u5E7F\u94FE\u63A5</div><div class="link-content" data-v-f38c5494><div class="link-label" data-v-f38c5494>\u60A8\u7684\u4E13\u5C5E\u63A8\u5E7F\u94FE\u63A5</div><div class="link-section" data-v-f38c5494><input type="text" class="link-input"${ssrRenderAttr("value", inviteInfo.value.link)} readonly data-v-f38c5494><button class="copy-link-btn" data-v-f38c5494>\u590D\u5236\u94FE\u63A5</button></div><p class="link-tip" data-v-f38c5494>\u5206\u4EAB\u6B64\u94FE\u63A5\u7ED9\u597D\u53CB\uFF0C\u597D\u53CB\u901A\u8FC7\u6B64\u94FE\u63A5\u6CE8\u518C\u5373\u53EF\u6210\u4E3A\u60A8\u7684\u63A8\u5E7F\u7528\u6237</p></div></div></div><div class="referral-stats" data-v-f38c5494><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="\u63A8\u5E7F\u7528\u6237\u56FE\u6807" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>\u7528\u6237</div></div></div><div class="stat-label" data-v-f38c5494>\u63A8\u5E7F\u7528\u6237</div><div class="stat-value" data-v-f38c5494>${ssrInterpolate((_b = stats.value.registerNum) != null ? _b : 0)}</div></div><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="\u6210\u529F\u8BA2\u5355\u56FE\u6807" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>\u8BA2\u5355</div></div></div><div class="stat-label" data-v-f38c5494>\u6210\u529F\u8BA2\u5355</div><div class="stat-value" data-v-f38c5494>${ssrInterpolate((_c = stats.value.orderNum) != null ? _c : 0)}</div></div><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="\u7D2F\u8BA1\u6536\u76CA\u56FE\u6807" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>\u6536\u76CA</div></div></div><div class="stat-label" data-v-f38c5494>\u7D2F\u8BA1\u6536\u76CA</div><div class="stat-value" data-v-f38c5494>\xA5${ssrInterpolate((_d = stats.value.orderAmount) != null ? _d : 0)}</div></div><div class="stat-item" data-v-f38c5494><div class="stat-icon" data-v-f38c5494><img${ssrRenderAttr("src", _imports_0)} alt="\u672C\u6708\u6536\u76CA\u56FE\u6807" class="stat-icon-img" onerror="this.style.display=&#39;none&#39;; this.nextElementSibling.style.display=&#39;block&#39;;" data-v-f38c5494><div class="stat-icon-placeholder" style="${ssrRenderStyle({ "display": "none" })}" data-v-f38c5494><div class="placeholder-box" data-v-f38c5494>\u6708\u6536\u76CA</div></div></div><div class="stat-label" data-v-f38c5494>\u672C\u6708\u6536\u76CA</div><div class="stat-value" data-v-f38c5494>--</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/referral.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const referral = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f38c5494"]]);

export { referral as default };
//# sourceMappingURL=referral-CXlLgOio.mjs.map
