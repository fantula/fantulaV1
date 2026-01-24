import { d as useUserStore, e as useCartStore, _ as _export_sfc } from "../server.mjs";
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cart-page" }, _attrs))} data-v-9e7c5da6><div class="cart-main-bg" data-v-9e7c5da6><div class="cart-container" data-v-9e7c5da6><div class="cart-list-section" data-v-9e7c5da6><h2 class="cart-title" data-v-9e7c5da6>购物车</h2>`);
      if (unref(cartStore).loading) {
        _push(`<div class="loading-state" data-v-9e7c5da6>加载中...</div>`);
      } else if (cartItems.value.length === 0) {
        _push(`<div class="empty-cart" data-v-9e7c5da6><p data-v-9e7c5da6>购物车是空的</p><button data-v-9e7c5da6>去选购</button></div>`);
      } else {
        _push(`<table class="cart-table" data-v-9e7c5da6><thead data-v-9e7c5da6><tr data-v-9e7c5da6><th data-v-9e7c5da6>商品信息</th><th data-v-9e7c5da6>单价</th><th data-v-9e7c5da6>数量</th><th data-v-9e7c5da6>小计</th><th data-v-9e7c5da6>操作</th></tr></thead><tbody data-v-9e7c5da6><!--[-->`);
        ssrRenderList(cartItems.value, (item) => {
          _push(`<tr data-v-9e7c5da6><td class="cart-goods-info" data-v-9e7c5da6><img${ssrRenderAttr("src", item.productImage)} class="cart-goods-img" data-v-9e7c5da6><div class="cart-goods-meta" data-v-9e7c5da6><div class="cart-goods-name" data-v-9e7c5da6>${ssrInterpolate(item.productName)}</div>`);
          if (item.specName) {
            _push(`<div class="cart-goods-spec" data-v-9e7c5da6>规格：${ssrInterpolate(item.specName)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="cart-price" data-v-9e7c5da6>￥${ssrInterpolate(item.price.toFixed(2))}</td><td class="cart-qty" data-v-9e7c5da6>`);
          if (item.allowAddon) {
            _push(`<!--[--><button${ssrIncludeBooleanAttr(item.quantity <= 1) ? " disabled" : ""} data-v-9e7c5da6>-</button><span class="qty-value" data-v-9e7c5da6>${ssrInterpolate(item.quantity)}</span><button data-v-9e7c5da6>+</button><!--]-->`);
          } else {
            _push(`<span data-v-9e7c5da6>${ssrInterpolate(item.quantity)}</span>`);
          }
          _push(`</td><td class="cart-subtotal" data-v-9e7c5da6>￥${ssrInterpolate((item.price * item.quantity).toFixed(2))}</td><td data-v-9e7c5da6><button class="cart-remove" data-v-9e7c5da6>删除</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      }
      _push(`</div><div class="cart-summary-section" data-v-9e7c5da6><div class="summary-title" data-v-9e7c5da6>订单结算</div><div class="summary-row" data-v-9e7c5da6><span data-v-9e7c5da6>商品总额</span><span data-v-9e7c5da6>￥${ssrInterpolate(totalPrice.value.toFixed(2))}</span></div><div class="summary-row" data-v-9e7c5da6><span data-v-9e7c5da6>优惠折扣</span><span class="discount" data-v-9e7c5da6>-￥${ssrInterpolate(discount.value.toFixed(2))}</span></div><div class="summary-row total" data-v-9e7c5da6><span data-v-9e7c5da6>应付总额</span><span class="total-price" data-v-9e7c5da6>￥${ssrInterpolate((totalPrice.value - discount.value).toFixed(2))}</span></div><button class="checkout-btn"${ssrIncludeBooleanAttr(cartItems.value.length === 0 || checkingOut.value) ? " disabled" : ""} data-v-9e7c5da6>${ssrInterpolate(checkingOut.value ? "正在创建订单..." : `去结算 (${cartItems.value.length})`)}</button></div></div></div></div>`);
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
export {
  cart as default
};
//# sourceMappingURL=cart-B3bx4XpX.js.map
