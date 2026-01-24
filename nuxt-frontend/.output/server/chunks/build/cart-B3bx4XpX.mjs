import { _ as _export_sfc, d as useUserStore, e as useCartStore } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useUserStore();
    const cartStore = useCartStore();
    const checkingOut = ref(false);
    const cartItems = computed(() => cartStore.items);
    const totalPrice = computed(() => cartStore.totalPrice);
    const discount = computed(() => {
      if (totalPrice.value >= 1e3) return 120;
      if (totalPrice.value >= 500) return 50;
      if (totalPrice.value >= 200) return 20;
      return 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cart-page" }, _attrs))} data-v-9e7c5da6><div class="cart-main-bg" data-v-9e7c5da6><div class="cart-container" data-v-9e7c5da6><div class="cart-list-section" data-v-9e7c5da6><h2 class="cart-title" data-v-9e7c5da6>\u8D2D\u7269\u8F66</h2>`);
      if (unref(cartStore).loading) {
        _push(`<div class="loading-state" data-v-9e7c5da6>\u52A0\u8F7D\u4E2D...</div>`);
      } else if (cartItems.value.length === 0) {
        _push(`<div class="empty-cart" data-v-9e7c5da6><p data-v-9e7c5da6>\u8D2D\u7269\u8F66\u662F\u7A7A\u7684</p><button data-v-9e7c5da6>\u53BB\u9009\u8D2D</button></div>`);
      } else {
        _push(`<table class="cart-table" data-v-9e7c5da6><thead data-v-9e7c5da6><tr data-v-9e7c5da6><th data-v-9e7c5da6>\u5546\u54C1\u4FE1\u606F</th><th data-v-9e7c5da6>\u5355\u4EF7</th><th data-v-9e7c5da6>\u6570\u91CF</th><th data-v-9e7c5da6>\u5C0F\u8BA1</th><th data-v-9e7c5da6>\u64CD\u4F5C</th></tr></thead><tbody data-v-9e7c5da6><!--[-->`);
        ssrRenderList(cartItems.value, (item) => {
          _push(`<tr data-v-9e7c5da6><td class="cart-goods-info" data-v-9e7c5da6><img${ssrRenderAttr("src", item.productImage)} class="cart-goods-img" data-v-9e7c5da6><div class="cart-goods-meta" data-v-9e7c5da6><div class="cart-goods-name" data-v-9e7c5da6>${ssrInterpolate(item.productName)}</div>`);
          if (item.specName) {
            _push(`<div class="cart-goods-spec" data-v-9e7c5da6>\u89C4\u683C\uFF1A${ssrInterpolate(item.specName)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="cart-price" data-v-9e7c5da6>\uFFE5${ssrInterpolate(item.price.toFixed(2))}</td><td class="cart-qty" data-v-9e7c5da6>`);
          if (item.allowAddon) {
            _push(`<!--[--><button${ssrIncludeBooleanAttr(item.quantity <= 1) ? " disabled" : ""} data-v-9e7c5da6>-</button><span class="qty-value" data-v-9e7c5da6>${ssrInterpolate(item.quantity)}</span><button data-v-9e7c5da6>+</button><!--]-->`);
          } else {
            _push(`<span data-v-9e7c5da6>${ssrInterpolate(item.quantity)}</span>`);
          }
          _push(`</td><td class="cart-subtotal" data-v-9e7c5da6>\uFFE5${ssrInterpolate((item.price * item.quantity).toFixed(2))}</td><td data-v-9e7c5da6><button class="cart-remove" data-v-9e7c5da6>\u5220\u9664</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      }
      _push(`</div><div class="cart-summary-section" data-v-9e7c5da6><div class="summary-title" data-v-9e7c5da6>\u8BA2\u5355\u7ED3\u7B97</div><div class="summary-row" data-v-9e7c5da6><span data-v-9e7c5da6>\u5546\u54C1\u603B\u989D</span><span data-v-9e7c5da6>\uFFE5${ssrInterpolate(totalPrice.value.toFixed(2))}</span></div><div class="summary-row" data-v-9e7c5da6><span data-v-9e7c5da6>\u4F18\u60E0\u6298\u6263</span><span class="discount" data-v-9e7c5da6>-\uFFE5${ssrInterpolate(discount.value.toFixed(2))}</span></div><div class="summary-row total" data-v-9e7c5da6><span data-v-9e7c5da6>\u5E94\u4ED8\u603B\u989D</span><span class="total-price" data-v-9e7c5da6>\uFFE5${ssrInterpolate((totalPrice.value - discount.value).toFixed(2))}</span></div><button class="checkout-btn"${ssrIncludeBooleanAttr(cartItems.value.length === 0 || checkingOut.value) ? " disabled" : ""} data-v-9e7c5da6>${ssrInterpolate(checkingOut.value ? "\u6B63\u5728\u521B\u5EFA\u8BA2\u5355..." : `\u53BB\u7ED3\u7B97 (${cartItems.value.length})`)}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9e7c5da6"]]);

export { cart as default };
//# sourceMappingURL=cart-B3bx4XpX.mjs.map
