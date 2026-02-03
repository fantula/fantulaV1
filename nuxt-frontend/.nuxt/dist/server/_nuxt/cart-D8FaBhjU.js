import { h as defineStore } from "../server.mjs";
import { cartApi } from "./common-DNRu9xdu.js";
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
      this.loading = true;
      try {
        const res = await cartApi.getCartList();
        if (res.success && res.data?.list) {
          this.items = res.data.list;
        } else {
          this.items = [];
        }
      } catch (e) {
        console.error("加载购物车失败:", e);
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
            msg: "暂时不支持同时购买不同规格商品，请先结算现有商品",
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
        console.error("添加购物车失败:", e);
        return { success: false, msg: "添加失败" };
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
        console.error("更新数量失败:", e);
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
        console.error("删除购物车项失败:", e);
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
        console.error("清空购物车失败:", e);
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
export {
  useCartStore as u
};
//# sourceMappingURL=cart-D8FaBhjU.js.map
