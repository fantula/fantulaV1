import { j as defineStore } from './server.mjs';
import { c as cartApi } from './common-D9iMPQj0.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
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
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';

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
//# sourceMappingURL=cart-B8xez9id.mjs.map
