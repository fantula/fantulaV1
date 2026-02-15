import { E as ElIcon } from './index-C4aUwruK.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { ad as search_default, $ as right_default, g as circle_check_filled_default, w as warning_filled_default, ag as compass_default } from './index-CbQ9NNm4.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/zod/index.js';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/consola/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/fast-xml-parser/src/fxp.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ipx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs';
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
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "channel",
  __ssrInlineRender: true,
  setup(__props) {
    const ProductDetailSheet = defineAsyncComponent(() => import('./ProductDetailSheet-DcwCPkcm.mjs'));
    getSupabaseClient();
    ref(null);
    const state = ref("input");
    const loading = ref(false);
    const channelInput = ref("@");
    const resultKey = ref("");
    const boundProductId = ref(null);
    const product = ref(null);
    const showDetailSheet = ref(false);
    const errorMessage = ref("");
    const isValidInput = computed(() => /^@[a-z]+$/.test(channelInput.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-608905f0><header class="hub-header" data-v-608905f0><h1 class="hub-title" data-v-608905f0>\u63A2\u7D22\u529F\u80FD <span class="dot" data-v-608905f0>.</span></h1><p class="hub-subtitle" data-v-608905f0>Discovery Tools</p></header><div class="hub-body" data-v-608905f0><div class="tool-card expanded" data-v-608905f0><div class="tool-header" data-v-608905f0><div class="th-icon" data-v-608905f0>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(search_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(search_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="th-info" data-v-608905f0><h3 data-v-608905f0>\u9891\u9053\u8BC6\u522B</h3><p data-v-608905f0>\u94FE\u63A5\u4E13\u5C5E\u5546\u54C1\u6E20\u9053</p></div></div><div class="tool-content" data-v-608905f0><div class="input-row" data-v-608905f0><input${ssrRenderAttr("value", channelInput.value)} type="text" class="glass-input" placeholder="@channel_key" spellcheck="false" data-v-608905f0><button class="btn-icon-action"${ssrIncludeBooleanAttr(loading.value || !isValidInput.value) ? " disabled" : ""} data-v-608905f0>`);
      if (loading.value) {
        _push(`<div class="spinner-xs" data-v-608905f0></div>`);
      } else {
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</button></div>`);
      if (state.value !== "input") {
        _push(`<div class="result-area" data-v-608905f0>`);
        if (state.value === "bound" && product.value) {
          _push(`<div class="result-success animate-fade-in" data-v-608905f0><div class="success-tag" data-v-608905f0>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` \u8BC6\u522B\u6210\u529F </div><div class="preview-card" data-v-608905f0><img${ssrRenderAttr("src", product.value.image || product.value.coverImage)} class="pc-thumb" decoding="async" loading="lazy" data-v-608905f0><div class="pc-info" data-v-608905f0><div class="pc-name" data-v-608905f0>${ssrInterpolate(product.value.name || product.value.title)}</div><div class="pc-price" data-v-608905f0> \xA5<span class="val" data-v-608905f0>${ssrInterpolate(product.value.price)}</span></div></div><button class="pc-btn" data-v-608905f0>\u8D2D\u4E70</button></div></div>`);
        } else if (state.value === "pending") {
          _push(`<div class="result-warning animate-fade-in" data-v-608905f0><div class="warning-icon" data-v-608905f0>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(warning_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div><div class="warning-text" data-v-608905f0><p data-v-608905f0>${ssrInterpolate(errorMessage.value || `\u9891\u9053 ${resultKey.value} \u6682\u672A\u7ED1\u5B9A\u5546\u54C1`)}</p><button class="btn-text-reset" data-v-608905f0>\u91CD\u8BD5</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="tools-grid" data-v-608905f0><div class="tool-card mini disabled" data-v-608905f0>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(compass_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(compass_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-608905f0>\u66F4\u591A\u529F\u80FD</span><div class="badge-soon" data-v-608905f0>Coming Soon</div></div></div></div>`);
      _push(ssrRenderComponent(unref(ProductDetailSheet), {
        visible: showDetailSheet.value,
        "onUpdate:visible": ($event) => showDetailSheet.value = $event,
        "goods-id": boundProductId.value || ""
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/channel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const channel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-608905f0"]]);

export { channel as default };
//# sourceMappingURL=channel-0Wvqk6yf.mjs.map
