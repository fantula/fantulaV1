import { defineComponent, mergeProps, unref, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { ae as shopping_cart_default } from './index-4qszPKX4.mjs';
import { u as useCartStore } from './cart-D8FaBhjU.mjs';
import { _ as _export_sfc } from './server.mjs';
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const cartStore = useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-cart-page" }, _attrs))} data-v-f7eb664c><header class="mobile-header" data-v-f7eb664c><div class="title" data-v-f7eb664c>\u8D2D\u7269\u8F66 (${ssrInterpolate(unref(cartStore).totalCount)})</div><div class="edit-btn" data-v-f7eb664c>\u7F16\u8F91</div></header><div class="cart-content" data-v-f7eb664c>`);
      if (unref(cartStore).items.length === 0) {
        _push(`<div class="empty-cart" data-v-f7eb664c>`);
        _push(ssrRenderComponent(unref(shopping_cart_default), { class: "empty-icon" }, null, _parent));
        _push(`<p data-v-f7eb664c>\u8D2D\u7269\u8F66\u8FD8\u662F\u7A7A\u7684</p><button class="go-btn" data-v-f7eb664c>\u53BB\u901B\u901B</button></div>`);
      } else {
        _push(`<div class="cart-list" data-v-f7eb664c><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="cart-item" data-v-f7eb664c><div class="item-thumb" data-v-f7eb664c><img${ssrRenderAttr("src", item.image)} data-v-f7eb664c></div><div class="item-info" data-v-f7eb664c><div class="item-title" data-v-f7eb664c>${ssrInterpolate(item.title)}</div><div class="item-sku" data-v-f7eb664c>${ssrInterpolate(item.specText)}</div><div class="item-price-row" data-v-f7eb664c><span class="price" data-v-f7eb664c>\xA5${ssrInterpolate(item.price)}</span><span class="qty" data-v-f7eb664c>x${ssrInterpolate(item.count)}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (unref(cartStore).items.length > 0) {
        _push(`<div class="cart-footer" data-v-f7eb664c><div class="total-info" data-v-f7eb664c><span class="label" data-v-f7eb664c>\u5408\u8BA1:</span><span class="value" data-v-f7eb664c>\xA5${ssrInterpolate(unref(cartStore).totalPrice)}</span></div><button class="checkout-btn" data-v-f7eb664c>\u53BB\u7ED3\u7B97</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tab-bar-spacer" data-v-f7eb664c></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7eb664c"]]);

export { cart as default };
//# sourceMappingURL=cart-CRsoL0Vd.mjs.map
