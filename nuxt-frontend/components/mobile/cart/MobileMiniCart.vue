<template>
  <Transition name="cart-pop">
    <div class="mobile-mini-cart cyber-cart" v-if="visible" @click.stop>
      <div class="cart-arrow"></div>
      
      <!-- Header -->
      <div class="mc-header">
        <span class="mc-title">购物车</span>
        <div v-if="hasItems" class="mc-clear-btn" @click="handleClear">
          <el-icon><Delete /></el-icon> 清空
        </div>
      </div>

      <!-- Content -->
      <div class="mc-body">
        <template v-if="cartItem">
           <div class="mc-product-card">
             <div class="mc-img-wrap">
               <img :src="cartItem.productImage || '/images/placeholder.png'" />
             </div>
             <div class="mc-details">
               <div class="mc-name">{{ cartItem.productName }}</div>
               
               <div class="mc-row-bottom">
                <div class="mc-price-row">
                 <span class="mc-price">¥{{ Number(cartItem.price).toFixed(2) }}</span>
               </div>   
                 <!-- Qty Control -->
                 <div class="mc-qty-control" v-if="cartItem.allowAddon">
                    <button class="qty-btn" @click.stop="updateQty(-1)" :disabled="updating || cartItem.quantity <= 1">-</button>
                    <span class="qty-num">{{ cartItem.quantity }}</span>
                    <button class="qty-btn" @click.stop="updateQty(1)" :disabled="updating">+</button>
                 </div>
                 <div class="mc-qty-static" v-else>x{{ cartItem.quantity }}</div>
               </div>
             </div>
           </div>
        </template>
        
        <template v-else>
           <div class="mc-empty">
             <div class="empty-icon">🛒</div>
             <p>空空如也</p>
           </div>
        </template>
      </div>
      
      <!-- Footer -->
      <div class="mc-footer" v-if="hasItems">
          <button 
           class="btn-cyber-checkout" 
           :disabled="checkingOut"
           @click="handleCheckout"
         >
           {{ checkingOut ? '处理中...' : '去结算' }}
         </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/client/cart'
import { supabasePreOrderApi } from '@/api/client/supabase'
import { Delete } from '@element-plus/icons-vue'
import { mobileRoutes } from '@/config/client-routes'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])

const router = useRouter()
const cartStore = useCartStore()
const updating = ref(false)
const checkingOut = ref(false)

// Display only first item (Single SKU strategy)
const cartItem = computed(() => {
  return (cartStore.items && cartStore.items.length > 0) ? cartStore.items[0] : null
})

const hasItems = computed(() => !!cartItem.value)

const handleClear = async () => {
  await cartStore.clearCart()
}

const handleCheckout = async () => {
  if (!cartItem.value || checkingOut.value) return

  checkingOut.value = true
  try {
    const result = await supabasePreOrderApi.createPreOrder(
      cartItem.value.skuId,
      cartItem.value.quantity,
      'cart'
    )

    if (result.success && result.pre_order_id) {
       cartStore.clearCart()
       emit('close')
       router.push(mobileRoutes.checkout(result.pre_order_id))
    }
  } catch (e) {
    if (import.meta.dev) console.error(e)
  } finally {
    checkingOut.value = false
  }
}

const updateQty = async (delta: number) => {
  if (!cartItem.value || updating.value) return
  
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
.cart-pop-enter-active, .cart-pop-leave-active { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.cart-pop-enter-from, .cart-pop-leave-to { opacity: 0; transform: translateY(10px) scale(0.9) translateX(-50%); }
.cart-pop-enter-to, .cart-pop-leave-from { opacity: 1; transform: translateY(0) scale(1) translateX(-50%); }

.mobile-mini-cart {
  position: absolute;
  top: 55px; 
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  z-index: 1000;
  width: 250px; /* Even more compact */
  
  /* Cyber Glass Style */
  background: var(--cyber-bg-glass, rgba(10, 10, 25, 0.95));
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.15); /* Blue Glow */
  
  border-radius: 16px; 
  overflow: visible;
}

.cart-arrow {
  /* Center Arrow */
  position: absolute;
  top: -6px;
  left: 50%;
  margin-left: -6px; 
  width: 12px; height: 12px;
  background: var(--cyber-bg-deep, #050510);
  transform: rotate(45deg);
  border-left: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
  border-top: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
  z-index: 1;
}

/* Header */
.mc-header {
  padding: 8px 12px; /* Tighter padding */
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; justify-content: space-between; align-items: center;
}
.mc-title { 
    font-size: 13px; font-weight: 700; color: var(--cyber-text-main, #E0F2FE); 
    letter-spacing: 0.5px;
    text-shadow: 0 0 5px rgba(255,255,255,0.2);
}
.mc-clear-btn { 
    font-size: 11px; color: var(--cyber-text-dim, #94A3B8); 
    display: flex; align-items: center; gap: 3px; cursor: pointer;
}
.mc-clear-btn:hover { color: var(--cyber-primary, #06B6D4); }

/* Body */
.mc-body { padding: 8px; }

.mc-product-card {
  display: flex; gap: 8px; /* Tighter gap */
  background: rgba(255,255,255,0.02);
  padding: 8px; border-radius: 12px; 
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.2s;
}
.mc-product-card:hover {
    border-color: var(--cyber-primary, #06B6D4);
    background: rgba(6, 182, 212, 0.05);
}

.mc-img-wrap {
  width: 44px; height: 44px; border-radius: 8px; overflow: hidden; background: #000;
  border: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}
.mc-img-wrap img { width: 100%; height: 100%; object-fit: cover; }

.mc-details { flex: 1; display: flex; flex-direction: column; justify-content: center; min-width: 0; }
.mc-name { 
    font-size: 12px; color: #fff; margin-bottom: 4px; line-height: 1.2; 
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mc-row-bottom { display: flex; justify-content: space-between; align-items: center; }

.mc-price { 
    color: var(--cyber-primary, #06B6D4);
    font-weight: 700; font-size: 14px; font-family: 'DIN', sans-serif;
    text-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
}

/* Qty Control - Compact */
.mc-qty-control {
  display: flex; align-items: center; gap: 4px;
  background: rgba(0,0,0,0.4); padding: 2px; border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05);
}
.qty-btn {
  width: 18px; height: 18px; 
  border: none; background: rgba(255,255,255,0.1); 
  color: #fff; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; cursor: pointer;
}
.qty-btn:active { background: var(--cyber-primary); color: #000; }
.qty-num { font-size: 11px; min-width: 16px; text-align: center; color: #fff; }

.mc-empty { padding: 16px; text-align: center; color: var(--cyber-text-dim); font-size: 12px; }
.empty-icon { font-size: 20px; margin-bottom: 4px; opacity: 0.5; }

/* Footer */
.mc-footer { padding: 8px 12px 12px; border-top: none; }
.btn-cyber-checkout {
  width: 100%; padding: 8px; /* Reduced padding */
  background: var(--cyber-gradient-btn, linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%));
  color: #fff; border: none; border-radius: 8px;
  font-size: 13px; font-weight: 700;
  box-shadow: var(--cyber-glow-orange, 0 0 15px rgba(249, 115, 22, 0.4));
  cursor: pointer; position: relative; overflow: hidden;
  transition: all 0.2s;
}
.btn-cyber-checkout:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.6);
}
.btn-cyber-checkout:active { transform: scale(0.98); }
</style>
