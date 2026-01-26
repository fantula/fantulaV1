<template>
  <div class="mobile-cart-page">
    <header class="mobile-header">
      <div class="title">购物车 ({{ cartStore.totalCount }})</div>
      <div class="edit-btn">编辑</div>
    </header>

    <div class="cart-content">
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <el-icon class="empty-icon"><ShoppingCart /></el-icon>
        <p>购物车还是空的</p>
        <button class="go-btn" @click="router.push('/mobile')">去逛逛</button>
      </div>

      <div v-else class="cart-list">
        <!-- Reusing cart item logic usually requires adapting components. 
             For now, simple list. -->
        <div v-for="item in cartStore.items" :key="item.skuId" class="cart-item">
          <div class="item-thumb">
             <img :src="item.image" />
          </div>
          <div class="item-info">
             <div class="item-title">{{ item.title }}</div>
             <div class="item-sku">{{ item.specText }}</div>
             <div class="item-price-row">
                <span class="price">¥{{ item.price }}</span>
                <span class="qty">x{{ item.count }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action Bar -->
    <div v-if="cartStore.items.length > 0" class="cart-footer">
      <div class="total-info">
        <span class="label">合计:</span>
        <span class="value">¥{{ cartStore.totalPrice }}</span>
      </div>
      <button class="checkout-btn">去结算</button>
    </div>

    <div class="tab-bar-spacer"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ShoppingCart } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/client/cart'

definePageMeta({ layout: 'mobile' })

const router = useRouter()
const cartStore = useCartStore()
</script>

<style scoped>
.mobile-cart-page {
  min-height: 100vh;
  background: #0F172A; color: #fff;
  display: flex; flex-direction: column;
}
.mobile-header {
  height: 50px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05); background: rgba(15,23,42,0.9);
  position: sticky; top: 0; z-index: 10;
}
.title { font-weight: 600; font-size: 16px; }
.edit-btn { font-size: 14px; color: #94A3B8; }

.cart-content { flex: 1; padding: 16px; }

.empty-cart {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 300px; color: #64748B; gap: 16px;
}
.empty-icon { font-size: 48px; opacity: 0.5; }
.go-btn {
  padding: 8px 24px; background: #3B82F6; color: #fff; border: none; border-radius: 100px;
}

.cart-item {
  display: flex; gap: 12px; background: rgba(30,41,59,0.5); padding: 12px; border-radius: 12px; margin-bottom: 12px;
}
.item-thumb { width: 80px; height: 80px; background: #1E293B; border-radius: 8px; overflow: hidden; }
.item-thumb img { width: 100%; height: 100%; object-fit: cover; }
.item-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.item-title { font-size: 14px; line-height: 1.4; }
.item-sku { font-size: 12px; color: #94A3B8; }
.item-price-row { display: flex; justify-content: space-between; align-items: center; }
.price { color: #F59E0B; font-weight: 700; }
.qty { color: #94A3B8; font-size: 12px; }

.cart-footer {
  position: fixed; bottom: 60px; left: 0; right: 0;
  height: 50px; background: #1E293B;
  display: flex; align-items: center; justify-content: space-between; padding: 0 16px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.total-info { font-size: 14px; }
.total-info .value { color: #F59E0B; font-weight: 700; margin-left: 4px; font-size: 16px; }
.checkout-btn {
  background: #3B82F6; color: #fff; border: none; padding: 8px 20px; border-radius: 100px; font-weight: 600;
}

.tab-bar-spacer { height: 60px; }
</style>
