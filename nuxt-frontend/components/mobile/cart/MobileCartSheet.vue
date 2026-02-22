<template>
  <Teleport to="body">
    <Transition name="sheet-fade">
      <div v-if="visible" class="mobile-sheet-overlay" @click="$emit('close')">
        <div class="mobile-sheet-content aurora-sheet-panel" @click.stop>
          
          <!-- Header -->
          <div class="sheet-header">
            <span class="sheet-title">购物车</span>
            <div v-if="hasItems" class="clear-btn" @click="handleClear">
              <el-icon><Delete /></el-icon> 清空
            </div>
            <div v-else class="close-icon" @click="$emit('close')">
               <el-icon><Close /></el-icon>
            </div>
          </div>

          <!-- Body -->
          <div class="sheet-body">
             <div v-if="!hasItems" class="empty-cart">
                <div class="empty-icon">🛒</div>
                <p>购物车还是空的</p>
                <button class="btn-cyber-ghost btn-sm" @click="$emit('close')">去逛逛</button>
             </div>

             <div v-else class="cart-item-card">
                <img :src="cartItem.productImage" class="item-img" />
                <div class="item-info">
                   <div class="item-name">{{ cartItem.productName }}</div>
                   <div class="item-spec">{{ cartItem.specName }}</div>
                   <div class="cart-price">
                    <span class="text-price">¥{{ Number(cartItem.price).toFixed(2) }}</span>
                </div>
                      <div class="qty-control" v-if="cartItem.allowAddon">
                         <button class="qty-btn" @click="updateQty(-1)" :disabled="cartItem.quantity<=1">-</button>
                         <span class="qty-num">{{ cartItem.quantity }}</span>
                         <button class="qty-btn" @click="updateQty(1)">+</button>
                      </div>
                      <span v-else class="qty-static">x{{ cartItem.quantity }}</span>
                </div>
             </div>
          </div>

          <!-- Footer -->
          <div class="sheet-footer" v-if="hasItems">
             <button class="btn-cyber-primary w-full" :disabled="checkingOut" @click="handleCheckout">
                {{ checkingOut ? '处理中...' : '去结算' }}
             </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/client/cart'
import { supabasePreOrderApi } from '@/api/client/supabase'
import { useToast } from '@/composables/mobile/useToast'
import { Delete, Close } from '@element-plus/icons-vue'
import { mobileRoutes } from '@/config/client-routes'

defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()
const checkingOut = ref(false)

const cartItem = computed(() => cartStore.items[0])
const hasItems = computed(() => !!cartItem.value)

const handleClear = async () => {
    await cartStore.clearCart()
    toast.showToast('购物车已清空', 'success')
}

const handleCheckout = async () => {
    if (!cartItem.value || checkingOut.value) return
    checkingOut.value = true
    try {
        const res = await supabasePreOrderApi.createPreOrder(
            cartItem.value.skuId,
            cartItem.value.quantity,
            'cart'
        )
        if (res.success && res.pre_order_id) {
            cartStore.clearCart()
            emit('close')
            router.push(mobileRoutes.orderDetail(res.pre_order_id)) 
        } else {
            toast.showToast(res.error || '创建订单失败', 'error')
        }
    } catch(e) {
        toast.showToast('结算异常', 'error')
    } finally {
        checkingOut.value = false
    }
}

const updateQty = (delta: number) => {
    if(!cartItem.value) return
    const newQty = cartItem.value.quantity + delta
    if(newQty > 0) cartStore.updateQuantity(cartItem.value.id, newQty)
}
</script>

<style scoped>
.mobile-sheet-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7); /* Darker overlay */
    backdrop-filter: blur(4px);
    display: flex; align-items: flex-end;
}
    /* Global Aurora Panel */
}

/* Header */
.sheet-header {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; justify-content: space-between; align-items: center;
}
.sheet-title { 
    font-size: 16px; font-weight: 700; color: var(--cyber-text-main, #E0F2FE);
    text-shadow: 0 0 8px rgba(255,255,255,0.2);
}
.clear-btn { 
    font-size: 13px; color: var(--cyber-text-dim, #94A3B8); 
    display: flex; align-items: center; gap: 4px; cursor: pointer;
}
.close-icon { color: #fff; font-size: 18px; }

/* Body */
.sheet-body { padding: 20px; min-height: 150px; }

.empty-cart { 
    text-align: center; padding: 40px 0; color: var(--cyber-text-dim); 
}
.empty-icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }

/* Product Card */
.cart-item-card {
    display: flex; gap: 16px;
    background: rgba(255,255,255,0.03);
    padding: 12px; border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.05);
}
.item-img {
    width: 80px; height: 80px; border-radius: 12px; object-fit: cover;
    border: 1px solid rgba(255,255,255,0.1);
}
.item-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.item-name { font-size: 15px; color: #fff; font-weight: 500; margin-bottom: 4px; }
.item-spec { font-size: 12px; color: var(--cyber-text-dim); margin-bottom: 8px; }
.item-row { display: flex; justify-content: space-between; align-items: center; }

.text-price { 
    color: var(--cyber-primary, #06B6D4);
    font-size: 18px; font-weight: 700; font-family: 'DIN', sans-serif;
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
}

/* Qty Control */
.qty-control {
    display: flex; align-items: center; gap: 8px;
    background: rgba(0,0,0,0.4); padding: 4px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
}
.qty-btn {
    width: 24px; height: 24px; border: none; background: rgba(255,255,255,0.1);
    color: #fff; border-radius: 6px; display: flex; align-items: center; justify-content: center;
}
.qty-num { min-width: 20px; text-align: center; color: #fff; font-weight: 600; }

/* Footer */
.sheet-footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.05); }

/* Buttons */
.btn-cyber-primary {
    background: var(--cyber-gradient-btn);
    color: #fff; border: none; padding: 14px; border-radius: 14px;
    font-size: 16px; font-weight: 700; width: 100%;
    box-shadow: var(--cyber-glow-orange);
    transition: all 0.2s;
}
.btn-cyber-primary:active { transform: scale(0.98); }

.btn-cyber-ghost {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--cyber-text-main);
    padding: 8px 16px; border-radius: 20px; margin-top: 10px;
}
</style>
