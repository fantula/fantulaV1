import { e as defineStore } from './server.mjs';
import { c as cartApi } from './common-Bgv_wRgd.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import './supabase-F2pQZHm6.mjs';

const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    loading: false,
    miniCartVisible: false
  }),
  actions: {
    /**
     * 加载购物车（从后端获取）
     */
    async loadCart() {
      var _a;
      this.loading = true;
      try {
        const res = await cartApi.getCartList();
        if (res.success && ((_a = res.data) == null ? void 0 : _a.list)) {
          this.items = res.data.list;
        } else {
          this.items = [];
        }
      } catch (e) {
        console.error("\u52A0\u8F7D\u8D2D\u7269\u8F66\u5931\u8D25:", e);
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
    /**
     * 添加到购物车（只需 skuId）
     * 规则：购物车必须保持单一 SKU。如果已存在不同 SKU，则禁止添加。
     */
    async addToCart(skuId, quantity = 1) {
      if (this.items.length > 0) {
        const existingItem = this.items[0];
        if (existingItem.skuId !== skuId) {
          return {
            success: false,
            msg: "\u6682\u65F6\u4E0D\u652F\u6301\u540C\u65F6\u8D2D\u4E70\u4E0D\u540C\u89C4\u683C\u5546\u54C1\uFF0C\u8BF7\u5148\u7ED3\u7B97\u73B0\u6709\u5546\u54C1",
            code: "DIFFERENT_SKU"
          };
        }
      }
      try {
        const res = await cartApi.addToCart(skuId, quantity);
        if (res.success) {
          await this.loadCart();
          return { success: true };
        }
        return { success: false, msg: res.msg };
      } catch (e) {
        console.error("\u6DFB\u52A0\u8D2D\u7269\u8F66\u5931\u8D25:", e);
        return { success: false, msg: "\u6DFB\u52A0\u5931\u8D25" };
      }
    },
    /**
     * 更新数量
     */
    async updateQuantity(cartItemId, quantity) {
      try {
        const res = await cartApi.updateQuantity(cartItemId, quantity);
        if (res.success) {
          const item = this.items.find((i) => i.id === cartItemId);
          if (item) item.quantity = quantity;
        }
      } catch (e) {
        console.error("\u66F4\u65B0\u6570\u91CF\u5931\u8D25:", e);
      }
    },
    /**
     * 从购物车删除
     */
    async removeFromCart(cartItemId) {
      try {
        const res = await cartApi.removeFromCart(cartItemId);
        if (res.success) {
          this.items = this.items.filter((i) => i.id !== cartItemId);
        }
      } catch (e) {
        console.error("\u5220\u9664\u8D2D\u7269\u8F66\u9879\u5931\u8D25:", e);
      }
    },
    /**
     * 清空购物车
     */
    async clearCart() {
      try {
        const res = await cartApi.clearCart();
        if (res.success) {
          this.items = [];
        }
      } catch (e) {
        console.error("\u6E05\u7A7A\u8D2D\u7269\u8F66\u5931\u8D25:", e);
      }
    },
    /**
     * 初始化购物车
     */
    async initCart() {
      await this.loadCart();
    }
  },
  getters: {
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    totalCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    }
  }
});

export { useCartStore };
//# sourceMappingURL=cart-CDhPH3qi.mjs.map
