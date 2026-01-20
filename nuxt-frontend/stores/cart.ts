import { defineStore } from 'pinia'
import { cartApi } from '@/api/common'

export interface CartItem {
  id: string              // 购物车项 ID
  skuId: string           // SKU ID
  quantity: number        // 数量
  productId: string       // 商品 ID
  productName: string     // 商品名称
  productImage: string    // 商品图片
  allowAddon: boolean     // 是否支持加量
  price: number           // 价格
  specName: string        // 规格描述
}

interface CartState {
  items: CartItem[]
  loading: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    loading: false
  }),

  actions: {
    /**
     * 加载购物车（从后端获取）
     */
    async loadCart() {
      this.loading = true
      try {
        const res = await cartApi.getCartList()
        if (res.success && res.data?.list) {
          this.items = res.data.list
        } else {
          this.items = []
        }
      } catch (e) {
        console.error('加载购物车失败:', e)
        this.items = []
      } finally {
        this.loading = false
      }
    },

    /**
     * 添加到购物车（只需 skuId）
     */
    async addToCart(skuId: string, quantity: number = 1) {
      try {
        const res = await cartApi.addToCart(skuId, quantity)
        if (res.success) {
          await this.loadCart()
          return { success: true }
        }
        return { success: false, msg: res.msg }
      } catch (e) {
        console.error('添加购物车失败:', e)
        return { success: false, msg: '添加失败' }
      }
    },

    /**
     * 更新数量
     */
    async updateQuantity(cartItemId: string, quantity: number) {
      try {
        const res = await cartApi.updateQuantity(cartItemId, quantity)
        if (res.success) {
          // 本地更新
          const item = this.items.find(i => i.id === cartItemId)
          if (item) item.quantity = quantity
        }
      } catch (e) {
        console.error('更新数量失败:', e)
      }
    },

    /**
     * 从购物车删除
     */
    async removeFromCart(cartItemId: string) {
      try {
        const res = await cartApi.removeFromCart(cartItemId)
        if (res.success) {
          this.items = this.items.filter(i => i.id !== cartItemId)
        }
      } catch (e) {
        console.error('删除购物车项失败:', e)
      }
    },

    /**
     * 清空购物车
     */
    async clearCart() {
      try {
        const res = await cartApi.clearCart()
        if (res.success) {
          this.items = []
        }
      } catch (e) {
        console.error('清空购物车失败:', e)
      }
    },

    /**
     * 初始化购物车
     */
    async initCart() {
      await this.loadCart()
    }
  },

  getters: {
    totalPrice: (state) => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    totalCount: (state) => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    }
  }
})