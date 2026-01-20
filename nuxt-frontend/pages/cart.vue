<template>
  <div class="cart-page">
    <div class="cart-main-bg">
      <div class="cart-container">
        <!-- 左侧商品列表 -->
        <div class="cart-list-section">
          <h2 class="cart-title">购物车</h2>
          
          <!-- 加载中 -->
          <div v-if="cartStore.loading" class="loading-state">加载中...</div>
          
          <!-- 空购物车 -->
          <div v-else-if="cartItems.length === 0" class="empty-cart">
            <p>购物车是空的</p>
            <button @click="router.push('/')">去选购</button>
          </div>
          
          <!-- 购物车列表 -->
          <table v-else class="cart-table">
            <thead>
              <tr>
                <th>商品信息</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItems" :key="item.id">
                <td class="cart-goods-info">
                  <img :src="item.productImage" class="cart-goods-img" />
                  <div class="cart-goods-meta">
                    <div class="cart-goods-name">{{ item.productName }}</div>
                    <div class="cart-goods-spec" v-if="item.specName">规格：{{ item.specName }}</div>
                  </div>
                </td>
                <td class="cart-price">￥{{ item.price.toFixed(2) }}</td>
                <td class="cart-qty">
                  <!-- 是否支持加量 -->
                  <template v-if="item.allowAddon">
                    <button @click="decreaseQty(item)" :disabled="item.quantity <= 1">-</button>
                    <span class="qty-value">{{ item.quantity }}</span>
                    <button @click="increaseQty(item)">+</button>
                  </template>
                  <span v-else>{{ item.quantity }}</span>
                </td>
                <td class="cart-subtotal">￥{{ (item.price * item.quantity).toFixed(2) }}</td>
                <td><button class="cart-remove" @click="removeItem(item)">删除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 右侧结算区 -->
        <div class="cart-summary-section">
          <div class="summary-title">订单结算</div>
          <div class="summary-row">
            <span>商品总额</span>
            <span>￥{{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>优惠折扣</span>
            <span class="discount">-￥{{ discount.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>应付总额</span>
            <span class="total-price">￥{{ (totalPrice - discount).toFixed(2) }}</span>
          </div>
          <button 
            class="checkout-btn" 
            @click="goCheckout" 
            :disabled="cartItems.length === 0 || checkingOut"
          >
            {{ checkingOut ? '正在创建订单...' : `去结算 (${cartItems.length})` }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
/**
 * 购物车页面
 * 重构版 - 使用 clientOrderApi
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { clientOrderApi } from '@/api/client'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const checkingOut = ref(false)

// 购物车数据
const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

// 优惠折扣
const discount = computed(() => {
  if (totalPrice.value >= 1000) return 120
  if (totalPrice.value >= 500) return 50
  if (totalPrice.value >= 200) return 20
  return 0
})

// 加载购物车
onMounted(() => {
  cartStore.loadCart()
})

// 增加数量
const increaseQty = (item: any) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

// 减少数量
const decreaseQty = (item: any) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}

// 删除商品
const removeItem = (item: any) => {
  cartStore.removeFromCart(item.id)
}

// 去结算 - 创建多个预订单，跳转到结算页
const goCheckout = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  
  if (cartItems.value.length === 0) {
    ElMessage.warning('购物车是空的')
    return
  }
  
  checkingOut.value = true
  const createdPreOrderIds: string[] = []
  const failedItems: string[] = []
  
  try {
    // 为每个购物车商品创建预订单
    for (const item of cartItems.value) {
      const result = await clientOrderApi.createPreOrder(
        item.skuId,
        item.quantity,
        'cart'
      )
      
      if (!result.success) {
        // 重复下单
        if (result.error?.includes('DUPLICATE_ORDER') || result.error?.includes('未支付')) {
          try {
            await ElMessageBox.confirm(
              `商品 "${item.productName}" 已存在未支付订单，快去看看吧`,
              '重复下单提示',
              {
                confirmButtonText: '去查看',
                cancelButtonText: '继续结算',
                type: 'warning'
              }
            )
            router.push('/profile/orders?tab=待支付')
            return
          } catch {
            // 用户选择继续结算，跳过此商品
            failedItems.push(item.productName)
            continue
          }
        }
        
        // 订单超限
        if (result.error?.includes('LIMIT_EXCEEDED') || result.error?.includes('太多')) {
          await ElMessageBox.alert(
            '您的未支付订单太多了，请先处理一下吧',
            '订单数量超限',
            { type: 'warning' }
          )
          router.push('/profile/orders?tab=待支付')
          return
        }
        
        failedItems.push(item.productName)
        continue
      }
      
      // 创建成功
      createdPreOrderIds.push(result.preOrderId!)
      await cartStore.removeFromCart(item.id)
    }
    
    // 检查是否有成功创建的预订单
    if (createdPreOrderIds.length === 0) {
      ElMessage.error('创建订单失败，请稍后重试')
      return
    }
    
    // 跳转到结算页面
    if (createdPreOrderIds.length === 1) {
      // 单个预订单
      router.push(`/checkout/${createdPreOrderIds[0]}`)
    } else {
      // 多个预订单，使用 query 参数传递给同一个页面
      router.push(`/checkout/${createdPreOrderIds[0]}?ids=${createdPreOrderIds.join(',')}`)
    }
    
  } catch (e: any) {
    console.error('结算失败:', e)
    ElMessage.error(e.message || '创建订单失败')
  } finally {
    checkingOut.value = false
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7fbff;
}
.cart-main-bg {
  max-width: 1320px;
  width: 100%;
  margin: 48px auto 32px auto;
  border-radius: 32px;
  box-shadow: 0 8px 32px rgba(35,92,220,0.10);
  background: linear-gradient(120deg, #EEF8FB 0%, #F6F3F0 50%, #FBEFEA 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 0 32px 0;
}
.cart-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}
.cart-list-section {
  flex: 2;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(35,92,220,0.08);
  padding: 32px 24px;
}
.cart-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
}
.cart-table th, .cart-table td {
  padding: 12px 8px;
  text-align: center;
}
.cart-goods-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cart-goods-img {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  object-fit: cover;
  background: #f0f0f0;
}
.cart-goods-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}
.cart-goods-name {
  font-size: 16px;
  font-weight: 600;
  color: #222;
}
.cart-goods-spec {
  font-size: 14px;
  color: #888;
}
.cart-price, .cart-subtotal {
  color: #e74c3c;
  font-weight: 600;
}
.cart-qty button {
  width: 28px;
  height: 28px;
  border: none;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  margin: 0 4px;
}
.cart-qty button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.qty-value {
  display: inline-block;
  min-width: 30px;
  text-align: center;
}
.cart-remove {
  background: #ff4757;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 14px;
}
.cart-remove:hover {
  background: #e74c3c;
}
.cart-summary-section {
  flex: 1;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(35,92,220,0.08);
  padding: 28px 24px;
  min-width: 320px;
}
.summary-title {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}
.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
}
.discount {
  color: #27ae60;
}
.total-price {
  color: #e74c3c;
}
.checkout-btn {
  width: 100%;
  background: linear-gradient(90deg, #4C7AE0 0%, #235CDC 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 600;
  margin-top: 24px;
  cursor: pointer;
}
.checkout-btn:hover {
  background: linear-gradient(90deg, #235CDC 0%, #4C7AE0 100%);
}
.checkout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.empty-cart {
  text-align: center;
  padding: 60px 20px;
}
.empty-cart p {
  font-size: 18px;
  color: #999;
  margin-bottom: 20px;
}
.empty-cart button {
  background: #4C7AE0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 16px;
  cursor: pointer;
}
.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}
</style>