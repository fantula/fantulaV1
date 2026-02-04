import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { ae as shopping_cart_default } from "./index-CmsdIFY8.js";
import { u as useCartStore } from "./cart-D8FaBhjU.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const cartStore = useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-cart-page" }, _attrs))} data-v-f7eb664c><header class="mobile-header" data-v-f7eb664c><div class="title" data-v-f7eb664c>购物车 (${ssrInterpolate(unref(cartStore).totalCount)})</div><div class="edit-btn" data-v-f7eb664c>编辑</div></header><div class="cart-content" data-v-f7eb664c>`);
      if (unref(cartStore).items.length === 0) {
        _push(`<div class="empty-cart" data-v-f7eb664c>`);
        _push(ssrRenderComponent(unref(shopping_cart_default), { class: "empty-icon" }, null, _parent));
        _push(`<p data-v-f7eb664c>购物车还是空的</p><button class="go-btn" data-v-f7eb664c>去逛逛</button></div>`);
      } else {
        _push(`<div class="cart-list" data-v-f7eb664c><!--[-->`);
        ssrRenderList(unref(cartStore).items, (item) => {
          _push(`<div class="cart-item" data-v-f7eb664c><div class="item-thumb" data-v-f7eb664c><img${ssrRenderAttr("src", item.image)} data-v-f7eb664c></div><div class="item-info" data-v-f7eb664c><div class="item-title" data-v-f7eb664c>${ssrInterpolate(item.title)}</div><div class="item-sku" data-v-f7eb664c>${ssrInterpolate(item.specText)}</div><div class="item-price-row" data-v-f7eb664c><span class="price" data-v-f7eb664c>¥${ssrInterpolate(item.price)}</span><span class="qty" data-v-f7eb664c>x${ssrInterpolate(item.count)}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
      if (unref(cartStore).items.length > 0) {
        _push(`<div class="cart-footer" data-v-f7eb664c><div class="total-info" data-v-f7eb664c><span class="label" data-v-f7eb664c>合计:</span><span class="value" data-v-f7eb664c>¥${ssrInterpolate(unref(cartStore).totalPrice)}</span></div><button class="checkout-btn" data-v-f7eb664c>去结算</button></div>`);
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
export {
  cart as default
};
//# sourceMappingURL=cart-Dag3JDsn.js.map
