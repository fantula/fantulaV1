<template>
  <Teleport to="body">
    <Transition name="sheet-fade">
      <div v-if="visible" class="mobile-sheet-overlay" @click="$emit('close')">
        <div class="mobile-sheet-content bg-glass-card" @click.stop>
          
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
                <button class="btn-v3 btn-ghost btn-sm" @click="$emit('close')">去逛逛</button>
             </div>

             <div v-else class="cart-item-card">
                <img :src="cartItem.productImage" class="item-img" />
                <div class="item-info">
                   <div class="item-name">{{ cartItem.productName }}</div>
                   <div class="item-spec">{{ cartItem.specName }}</div>
                   <div class="item-row">
                      <span class="text-price">¥{{ cartItem.price }}</span>
                      <div class="qty-control" v-if="cartItem.allowAddon">
                         <button class="qty-btn" @click="updateQty(-1)" :disabled="cartItem.quantity<=1">-</button>
                         <span class="qty-num">{{ cartItem.quantity }}</span>
                         <button class="qty-btn" @click="updateQty(1)">+</button>
                      </div>
                      <span v-else class="qty-static">x{{ cartItem.quantity }}</span>
                   </div>
                </div>
             </div>
          </div>

          <!-- Footer -->
          <div class="sheet-footer" v-if="hasItems">
             <button class="btn-v3 btn-accent w-full" :disabled="checkingOut" @click="handleCheckout">
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
            router.push(`/profile/order/${res.pre_order_id}`) // Use root path for now, let middleware handle
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
    background: rgba(0,0,0,0.6);
    display: flex; align-items: flex-end;
}
.mobile-sheet-content {
    width: 100%;
    border-radius: 20px 20px 0 0;
    background: var(--bg-deep); /* Fallback */
    /* Handled by bg-glass-card + tweaks */
    border-bottom: none;
}
</style>
