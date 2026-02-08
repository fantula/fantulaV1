<template>
  <div class="mobile-page">
    <MobileSubPageHeader title="购物车">
       <template #right>
          <span class="edit-btn" @click="isEditMode = !isEditMode">
             {{ isEditMode ? '完成' : '编辑' }}
          </span>
       </template>
    </MobileSubPageHeader>

    <div class="cart-body">
       <!-- Empty State -->
       <div v-if="loading" class="loading-state">
          <div class="spinner-premium"></div>
       </div>
       <div v-else-if="cartStore.items.length === 0" class="empty-state">
          <div class="empty-icon-box">
             <ShoppingCart class="e-icon" />
          </div>
          <p>购物车空空如也</p>
          <button class="btn-go" @click="router.push('/mobile')">去逛逛</button>
       </div>

       <!-- Cart List -->
       <div v-else class="cart-list">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id" 
            class="cart-card"
            :class="{ active: selectedIds.has(item.id) }"
            @click="toggleSelection(item.id)"
          >
             <!-- Checkbox -->
             <div class="checkbox-area" @click.stop="toggleSelection(item.id)">
                <div class="custom-checkbox" :class="{ checked: selectedIds.has(item.id) }">
                   <el-icon v-if="selectedIds.has(item.id)"><Check /></el-icon>
                </div>
             </div>

             <!-- Thumb -->
             <div class="card-thumb">
                <img :src="item.productImage" loading="lazy" decoding="async" />
             </div>

             <!-- Info -->
             <div class="card-info">
                <div class="ci-top">
                   <div class="ci-title">{{ item.productName }}</div>
                   <div class="ci-sku">{{ item.specName || '默认规格' }}</div>
                </div>
                
                <div class="ci-bottom">
                   <div class="ci-price">¥<span class="price-val">{{ item.price }}</span></div>
                   
                   <!-- Stepper -->
                   <div class="stepper" @click.stop>
                      <div class="step-btn minus" @click="updateQty(item, -1)" :class="{ disabled: item.quantity <= 1 }">
                         <Minus />
                      </div>
                      <div class="step-num">{{ item.quantity }}</div>
                      <div class="step-btn plus" @click="updateQty(item, 1)">
                         <Plus />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- Bottom Bar -->
    <div class="cart-footer" v-if="cartStore.items.length > 0">
       <div class="footer-left" @click="toggleSelectAll">
          <div class="custom-checkbox" :class="{ checked: isAllSelected }">
             <el-icon v-if="isAllSelected"><Check /></el-icon>
          </div>
          <span class="sel-text">全选</span>
       </div>

       <div class="footer-right" v-if="!isEditMode">
          <div class="total-box">
             <span class="t-label">合计:</span>
             <span class="t-price">¥{{ totalPrice }}</span>
          </div>
          <button 
             class="btn-checkout" 
             @click="handleCheckout"
             :disabled="selectedIds.size === 0"
          >
             去结算({{ totalCount }})
          </button>
       </div>

       <div class="footer-right" v-else>
          <button 
             class="btn-delete" 
             @click="handleDelete"
             :disabled="selectedIds.size === 0"
          >
             删除
          </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ShoppingCart, Check, Minus, Plus 
} from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/client/cart'
import { supabasePreOrderApi } from '@/api/client/supabase'
import { useToast } from '@/composables/mobile/useToast'
import { ElMessageBox } from 'element-plus'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'

definePageMeta({ layout: 'mobile' })

const router = useRouter()
const cartStore = useCartStore()
const { showToast } = useToast()

const loading = ref(false)
const isEditMode = ref(false)
const selectedIds = ref<Set<string>>(new Set())

// Init
onMounted(async () => {
    loading.value = true
    await cartStore.loadCart()
    loading.value = false
})

const isAllSelected = computed(() => {
    return cartStore.items.length > 0 && selectedIds.value.size === cartStore.items.length
})

const selectedItems = computed(() => {
    return cartStore.items.filter(item => selectedIds.value.has(item.id))
})

const totalPrice = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
})

const totalCount = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

// Actions
const toggleSelection = (id: string) => {
    if (selectedIds.value.has(id)) {
        selectedIds.value.delete(id)
    } else {
        selectedIds.value.add(id)
    }
}

const toggleSelectAll = () => {
    if (isAllSelected.value) {
        selectedIds.value.clear()
    } else {
        cartStore.items.forEach(item => selectedIds.value.add(item.id))
    }
}

const updateQty = async (item: any, delta: number) => {
    const newQty = item.quantity + delta
    if (newQty < 1) return
    await cartStore.updateQuantity(item.id, newQty)
}

const handleDelete = async () => {
    if (selectedIds.value.size === 0) return
    
    const ids = Array.from(selectedIds.value)
    for (const id of ids) {
        await cartStore.removeFromCart(id)
        selectedIds.value.delete(id)
    }
    showToast('删除成功', 'success')
    if (cartStore.items.length === 0) isEditMode.value = false
}

const handleCheckout = async () => {
    if (selectedIds.value.size === 0) return showToast('请选择商品', 'warning')
    
    const items = selectedItems.value
    const firstSku = items[0].skuId
    const isConsistent = items.every(i => i.skuId === firstSku)
    
    if (!isConsistent) {
        return showToast('暂不支持多规格同时结算', 'warning')
    }
    
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0)
    
    const res = await supabasePreOrderApi.createPreOrder(firstSku, totalQty, 'cart')
    if (res.success && res.pre_order_id) {
        router.push(`/mobile/checkout/${res.pre_order_id}`)
    } else {
        showToast(res.error || '结算失败', 'error')
    }
}
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: transparent; /* Allow global background */
  display: flex; flex-direction: column;
}

.edit-btn { font-size: 14px; color: var(--cyber-primary); cursor: pointer; font-weight: 500; }

.cart-body {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 180px; /* Clearance for Footer + TabBar */
}

/* Loading */
.loading-state { display: flex; align-items: center; justify-content: center; height: 200px; }
.spinner-premium {
  width: 32px; height: 32px; 
  border: 3px solid rgba(56, 189, 248, 0.2); 
  border-top-color: var(--cyber-primary); 
  border-radius: 50%; 
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; 
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Empty State */
.empty-state {
   display: flex; flex-direction: column; align-items: center; justify-content: center;
   padding-top: 100px;
}
.empty-icon-box {
   width: 100px; height: 100px; background: rgba(30,41,59,0.5);
   border-radius: 50%; display: flex; align-items: center; justify-content: center;
   margin-bottom: 20px;
   box-shadow: 0 0 20px rgba(0,0,0,0.2);
}
.e-icon { font-size: 40px; color: #64748B; }
.empty-state p { color: #94A3B8; margin-bottom: 24px; font-size: 15px; }
.btn-go {
   padding: 10px 32px; background: var(--cyber-primary); color: #fff;
   border: none; border-radius: 100px; font-weight: 600;
   box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
}

/* List */
.cart-list { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

/* Card - Using Global Glass & Border */
.cart-card {
   background: var(--glass-bg);
   border: 1px solid var(--glass-border);
   border-radius: 16px;
   padding: 12px;
   display: flex; align-items: center; gap: 12px;
   transition: all 0.2s;
   position: relative;
   overflow: hidden;
}
.cart-card.active {
   background: rgba(15, 23, 42, 0.8);
   border-color: var(--cyber-primary); /* Highlight border */
   box-shadow: inset 0 0 20px rgba(56, 189, 248, 0.05);
}

/* Checkbox */
.checkbox-area { padding: 8px 0; cursor: pointer; }
.custom-checkbox {
   width: 22px; height: 22px; border-radius: 50%;
   border: 2px solid #64748B;
   display: flex; align-items: center; justify-content: center;
   transition: all 0.2s;
   background: rgba(255,255,255,0.05);
}
.custom-checkbox.checked {
   background: var(--cyber-primary); border-color: var(--cyber-primary);
   box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
   animation: pulse-check 0.3s;
}
@keyframes pulse-check { 0% { transform: scale(0.8); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
.custom-checkbox .el-icon { font-size: 14px; color: #fff; font-weight: 800; }

/* Thumb */
.card-thumb {
   width: 88px; height: 88px; border-radius: 10px; overflow: hidden;
   background: #0F172A; flex-shrink: 0;
   border: 1px solid var(--glass-border);
}
.card-thumb img { width: 100%; height: 100%; object-fit: cover; }

/* Info */
.card-info { flex: 1; height: 88px; display: flex; flex-direction: column; justify-content: space-between; padding-right: 4px; }

.ci-title { 
   font-size: 15px; font-weight: 500; color: var(--text-primary); line-height: 1.4; margin-bottom: 4px;
   display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Specs - Matching Tag Style */
.ci-sku { 
    font-size: 11px; 
    color: var(--text-secondary);
    border: 1px solid rgba(6, 182, 212, 0.2);
    background: rgba(6, 182, 212, 0.05);
    padding: 2px 8px; border-radius: 4px; 
    display: inline-block;
}

.ci-bottom { display: flex; justify-content: space-between; align-items: flex-end; }

/* Price - Global Style */
.ci-price { 
    font-size: 13px; color: var(--accent); font-weight: 700; font-family: 'DIN Alternates'; 
    display: flex; align-items: baseline;
}
.price-val { font-size: 18px; letter-spacing: -0.5px; }

/* Stepper (Premium Glass) */
.stepper {
   display: flex; align-items: center;
   background: rgba(15, 23, 42, 0.8);
   border-radius: 8px; padding: 2px;
   border: 1px solid rgba(255,255,255,0.1);
   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.step-btn { 
   width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
   color: #94A3B8; font-size: 14px; cursor: pointer;
   border-radius: 6px;
   transition: all 0.2s;
}
.step-btn:active { background: rgba(255,255,255,0.1); color: #fff; }
.step-btn.disabled { opacity: 0.3; pointer-events: none; }
.step-num { min-width: 32px; text-align: center; font-size: 14px; font-weight: 600; color: #E2E8F0; font-variant-numeric: tabular-nums; }
.step-btn.plus { color: var(--cyber-primary); }

/* Footer - Floating Above TabBar */
.cart-footer {
   position: fixed; 
   bottom: 100px; /* Above TabBar (~84px) */
   left: 16px; right: 16px; /* Floating Card Style */
   width: auto;
   height: 60px;
   background: rgba(15, 23, 42, 0.95);
   backdrop-filter: blur(20px);
   border: 1px solid var(--glass-border);
   border-radius: 30px; /* Pill Shape */
   display: flex; align-items: center; justify-content: space-between;
   padding: 0 20px;
   z-index: 900; /* Below TabBar (1000) but above content */
   box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.footer-left { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.sel-text { font-size: 14px; color: #CBD5E1; }

.footer-right { display: flex; align-items: center; gap: 16px; }

.total-box { display: flex; align-items: baseline; gap: 4px; flex-direction: column; align-items: flex-end; }
.t-label { font-size: 11px; color: #94A3B8; }
.t-price { color: var(--accent); font-size: 18px; font-weight: 700; line-height: 1; font-family: 'DIN Alternates'; }

.btn-checkout {
   background: linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%);
   color: #fff; border: none; padding: 0 24px; height: 38px;
   border-radius: 100px; font-weight: 600; font-size: 14px;
   box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
   transition: all 0.2s;
}
.btn-checkout:active { transform: scale(0.96); box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3); }

.btn-checkout:disabled { 
    opacity: 0.5; filter: grayscale(1); box-shadow: none; transform: none;
    background: #475569;
}

.btn-delete {
   background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3);
   padding: 0 20px; height: 34px; border-radius: 100px; font-size: 13px; font-weight: 500;
}
</style>
