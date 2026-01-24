<template>
  <Transition name="cart-pop">
    <div class="mini-cart-popup" v-if="visible">
      <div class="mini-cart-arrow"></div>
      
      <!-- Header -->
      <div class="mc-header">
        <span class="mc-title">购物车</span>
        <div 
          v-if="hasItems" 
          class="mc-clear-btn" 
          @click="handleClear"
          title="清空购物车"
        >
          <el-icon><Delete /></el-icon>
          <span>清空</span>
        </div>
      </div>

      <!-- Content -->
      <div class="mc-body">
        <template v-if="cartItem">
           <div class="mc-product-card">
             <div class="mc-img-wrap">
               <img :src="cartItem.productImage || '/images/placeholder.png'" alt="Product" />
             </div>
             <div class="mc-details">
               <div class="mc-name">{{ cartItem.productName }}</div>
               <div class="mc-spec">{{ cartItem.specName }}</div>
               <div class="mc-price-row">
                 <span class="mc-price">¥{{ cartItem.price }}</span>
                 
                 <!-- Quantity Control -->
                 <div class="mc-qty-control" v-if="cartItem.allowAddon">
                    <button class="qty-btn" @click="updateQty(-1)" :disabled="updating || cartItem.quantity <= 1">-</button>
                    <span class="qty-num">{{ cartItem.quantity }}</span>
                    <button class="qty-btn" @click="updateQty(1)" :disabled="updating">+</button>
                 </div>
                 <div class="mc-qty-static" v-else>x{{ cartItem.quantity }}</div>
               </div>
             </div>
           </div>
        </template>
        
        <template v-else>
           <div class="mc-empty">
             <div class="empty-icon">🛒</div>
             <p>购物车空空如也</p>
             <button class="mc-btn secondary small" @click="emit('close')">去逛逛</button>
           </div>
        </template>
      </div>
      
      <!-- Footer -->
      <div class="mc-footer" v-if="hasItems">
         <button class="mc-btn primary block" @click="handleCheckout" :disabled="checkingOut">
           {{ checkingOut ? '处理中...' : '去结算' }}
         </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { supabasePreOrderApi } from '@/api/supabase'
import { ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])

const router = useRouter()
const cartStore = useCartStore()
const updating = ref(false)
const checkingOut = ref(false)

// 由于单 SKU 策略，只展示第 0 个商品
const cartItem = computed(() => {
  if (cartStore.items && cartStore.items.length > 0) {
    return cartStore.items[0]
  }
  return null
})

const hasItems = computed(() => !!cartItem.value)

const handleClear = async () => {
  await cartStore.clearCart()
  ElMessage.success('购物车已清空')
}

const handleCheckout = async () => {
  if (!cartItem.value) return
  if (checkingOut.value) return

  checkingOut.value = true
  try {
    // 创建预订单
    const result = await supabasePreOrderApi.createPreOrder(
      cartItem.value.skuId,
      cartItem.value.quantity,
      'cart'
    )

    if (result.success && result.pre_order_id) {
       // 结算成功，清空购物车（因为已生成订单）
       cartStore.clearCart()
       
       emit('close')
       router.push(`/checkout/${result.pre_order_id}`)
    } else {
       ElMessage.error(result.error || result.msg || '创建订单失败')
    }
  } catch (e: any) {
    ElMessage.error('结算失败: ' + (e.message || '未知错误'))
  } finally {
    checkingOut.value = false
  }
}

const updateQty = async (delta: number) => {
  if (!cartItem.value) return
  if (updating.value) return
  
  const newQty = cartItem.value.quantity + delta
  if (newQty < 1) return
  
  updating.value = true
  try {
    await cartStore.updateQuantity(cartItem.value.id, newQty)
  } finally {
    updating.value = false
  }
}
</script>

<style scoped>
/* Transition */
.cart-pop-enter-active,
.cart-pop-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-pop-enter-from,
.cart-pop-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.mini-cart-popup {
  position: absolute;
  top: 50px;
  right: -50px; /* Align relative to parent wrapper */
  z-index: 9999;
  width: 340px;
  
  /* Deep Glass Theme (Matching BaseModal) */
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
    0 25px 50px -12px rgba(0, 0, 0, 0.5);
    
  border-radius: 20px;
  padding: 0; /* Header/Body separated */
  color: #fff;
  overflow: visible; /* For arrow */
}

.mini-cart-arrow {
  position: absolute;
  top: -6px;
  right: 60px; /* Align with icon center approx */
  width: 12px;
  height: 12px;
  background: rgba(30, 41, 59, 0.95); /* Match bg */
  transform: rotate(45deg);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Header */
.mc-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mc-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.mc-clear-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #94A3B8;
  cursor: pointer;
  transition: color 0.2s;
}
.mc-clear-btn:hover {
  color: #EF4444; /* Red for delete */
}

/* Body */
.mc-body {
  padding: 20px;
}

.mc-product-card {
  display: flex;
  gap: 16px;
  background: rgba(255, 255, 255, 0.03);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.mc-img-wrap {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #0F172A;
}
.mc-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mc-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mc-name {
  font-size: 14px;
  font-weight: 600;
  color: #F1F5F9;
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mc-spec {
  font-size: 12px;
  color: #94A3B8;
  margin-bottom: 8px;
}

.mc-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.mc-price {
  font-size: 15px;
  font-weight: 700;
  color: #EAB308;
}

/* Qty Control */
.mc-qty-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px;
  border-radius: 6px;
}

.qty-btn {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.qty-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}
.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-num {
  font-size: 13px;
  font-weight: 600;
  min-width: 16px;
  text-align: center;
}

.mc-qty-static {
  color: #94A3B8;
  font-size: 13px;
}

/* Empty State */
.mc-empty {
  text-align: center;
  padding: 20px 0;
}
.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.5;
}
.mc-empty p {
  color: #94A3B8;
  font-size: 14px;
  margin-bottom: 20px;
}

/* Footer */
.mc-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Buttons */
.mc-btn {
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mc-btn.block {
  width: 100%;
  padding: 12px;
}

.mc-btn.small {
  padding: 8px 16px;
}

.mc-btn.primary {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: #fff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.mc-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}
.mc-btn.primary:active {
  transform: scale(0.98);
}
.mc-btn.primary:disabled {
  background: #334155;
  color: #94A3B8;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

.mc-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #E2E8F0;
}
.mc-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
</style>
