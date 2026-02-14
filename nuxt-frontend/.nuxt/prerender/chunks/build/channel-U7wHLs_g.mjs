import { E as ElIcon } from './index-D6MDXFfa.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { O as search_default, ah as right_default, n as circle_check_filled_default, e as warning_filled_default, aC as compass_default } from './index-CRs4T-Jf.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './objects-Bz74KHmq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
    const ProductDetailSheet = defineAsyncComponent(() => import('./ProductDetailSheet-BvcxWbbA.mjs'));
    getSupabaseClient();
    ref(null);
    const state = ref("input");
    const loading = ref(false);
    const channelInput = ref("@");
    const resultKey = ref("");
    const boundProductId = ref(null);
    const product = ref(null);
    const showDetailSheet = ref(false);
    const isValidInput = computed(() => /^@[a-z0-9_]+$/.test(channelInput.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page" }, _attrs))} data-v-fa70143e><header class="hub-header" data-v-fa70143e><h1 class="hub-title" data-v-fa70143e>\u63A2\u7D22\u529F\u80FD <span class="dot" data-v-fa70143e>.</span></h1><p class="hub-subtitle" data-v-fa70143e>Discovery Tools</p></header><div class="hub-body" data-v-fa70143e><div class="tool-card expanded" data-v-fa70143e><div class="tool-header" data-v-fa70143e><div class="th-icon" data-v-fa70143e>`);
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
      _push(`</div><div class="th-info" data-v-fa70143e><h3 data-v-fa70143e>\u9891\u9053\u8BC6\u522B</h3><p data-v-fa70143e>\u94FE\u63A5\u4E13\u5C5E\u5546\u54C1\u6E20\u9053</p></div></div><div class="tool-content" data-v-fa70143e><div class="input-row" data-v-fa70143e><input${ssrRenderAttr("value", channelInput.value)} type="text" class="glass-input" placeholder="@channel_key" spellcheck="false" data-v-fa70143e><button class="btn-icon-action"${ssrIncludeBooleanAttr(loading.value || !isValidInput.value) ? " disabled" : ""} data-v-fa70143e>`);
      if (loading.value) {
        _push(`<div class="spinner-xs" data-v-fa70143e></div>`);
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
        _push(`<div class="result-area" data-v-fa70143e>`);
        if (state.value === "bound" && product.value) {
          _push(`<div class="result-success animate-fade-in" data-v-fa70143e><div class="success-tag" data-v-fa70143e>`);
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
          _push(` \u8BC6\u522B\u6210\u529F </div><div class="preview-card" data-v-fa70143e><img${ssrRenderAttr("src", product.value.image || product.value.coverImage)} class="pc-thumb" decoding="async" loading="lazy" data-v-fa70143e><div class="pc-info" data-v-fa70143e><div class="pc-name" data-v-fa70143e>${ssrInterpolate(product.value.name || product.value.title)}</div><div class="pc-price" data-v-fa70143e> \xA5<span class="val" data-v-fa70143e>${ssrInterpolate(product.value.price)}</span></div></div><button class="pc-btn" data-v-fa70143e>\u8D2D\u4E70</button></div></div>`);
        } else if (state.value === "pending") {
          _push(`<div class="result-warning animate-fade-in" data-v-fa70143e><div class="warning-icon" data-v-fa70143e>`);
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
          _push(`</div><div class="warning-text" data-v-fa70143e><p data-v-fa70143e>\u9891\u9053 <span data-v-fa70143e>${ssrInterpolate(resultKey.value)}</span> \u6682\u672A\u7ED1\u5B9A\u5546\u54C1</p><button class="btn-text-reset" data-v-fa70143e>\u91CD\u8BD5</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="tools-grid" data-v-fa70143e><div class="tool-card mini disabled" data-v-fa70143e>`);
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
      _push(`<span data-v-fa70143e>\u66F4\u591A\u529F\u80FD</span><div class="badge-soon" data-v-fa70143e>Coming Soon</div></div></div></div>`);
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
const channel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa70143e"]]);

export { channel as default };
//# sourceMappingURL=channel-U7wHLs_g.mjs.map
