<template>
  <Teleport to="body">
  <Transition name="fade">
  <div v-if="visible" class="sheet-mask" @click="handleClose">
    <div class="sheet-panel-glass aurora-sheet-panel" @click.stop>
       <div class="sheet-header">
          <div class="title">续费订单</div>
          <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
       </div>

       <div class="sheet-body" v-if="loading">
          <div class="loading-box">
             <div class="spinner"></div>
             <div>加载中...</div>
          </div>
       </div>

       <div class="sheet-body" v-else>
          <!-- Product -->
          <MobileOrderProductInfo :order="productInfoAsOrder" />

          <!-- Specs -->
          <div class="specs-section">
             <div v-for="group in specGroups" :key="group.name" class="group">
                <div class="g-name">{{ group.name }}</div>
                <div class="g-vals">
                   <div v-for="val in group.values" :key="val.value" 
                        class="val-chip-glass aurora-option-card"
                        :class="{ 'active-blue': selectedSpecs[group.name] === val.value, active: selectedSpecs[group.name] === val.value }"
                        @click="handleSpec(group.name, val.value)"
                   >
                      {{ val.value }}
                   </div>
                </div>
             </div>
             
             <!-- Simple SKU List fallback -->
             <div v-if="specGroups.length === 0 && skuList.length > 0" class="group">
                 <div class="g-name">选择时长</div>
                 <div class="g-vals">
                     <div v-for="sku in skuList" :key="sku.sku_id"
                          class="val-chip-glass aurora-option-card"
                          :class="{ 'active': selectedSkuId === sku.sku_id, 'active-blue': selectedSkuId === sku.sku_id }"
                          @click="handleSku(sku.sku_id)"
                     >
                        {{ sku.duration }}天
                     </div>
                 </div>
             </div>
          </div>
          
          <!-- Coupon Section -->
          <div class="coupon-section" v-if="availableCoupons.length > 0">
             <div class="g-name">优惠券</div>
             <div class="coupon-list">
                 <!-- No Coupon Option -->
                 <div 
                    class="coupon-item-glass aurora-option-card" 
                    :class="{ active: !selectedCoupon }"
                    @click="handleCouponSelect(null)"
                 >
                    不使用优惠券
                    <el-icon v-if="!selectedCoupon" class="chk"><Select /></el-icon>
                 </div>
                 
                 <!-- Coupon Items -->
                 <div 
                   v-for="coupon in availableCoupons" 
                   :key="coupon.id" 
                   class="coupon-item-glass aurora-option-card"
                   :class="{ active: selectedCoupon?.id === coupon.id }"
                   @click="handleCouponSelect(coupon)"
                 >
                    <div class="c-left">
                       <span class="c-name">{{ coupon.coupon.name }}</span>
                    </div>
                    <div class="c-right">
                       <span class="c-val" v-if="coupon.coupon.type === 'flat'">-{{ coupon.coupon.value }}点</span>
                       <span class="c-val" v-else-if="coupon.coupon.type === 'product'">免单</span>
                       <el-icon v-if="selectedCoupon?.id === coupon.id" class="chk"><Select /></el-icon>
                    </div>
                 </div>
             </div>
          </div>
       </div>

       <div class="sheet-footer">
          <div class="price-info">
             <div class="total-label">总计</div>
             <div class="price-row">
                <!-- <span class="currency">¥</span> -->
                <span class="price-val">{{ finalAmount }}</span><span class="unit-text">点</span>
                <div v-if="discountAmount > 0" class="discount-tag">已省 {{ discountAmount }}点</div>
             </div>
          </div>
          <button class="aurora-btn-accent gap-2" :disabled="!selectedSkuId || paying" @click="handlePay">
             <span v-if="paying" class="btn-spinner"></span>
             <span>{{ paying ? '支付中...' : '立即续费' }}</span>
          </button>
       </div>
    </div>
  </div>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Close, Clock, Select } from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client'
import { couponApi } from '@/api/client/coupon'
import { useUserStore } from '@/stores/client/user'
import { useNotify } from '@/composables/useNotify'
import MobileOrderProductInfo from './MobileOrderProductInfo.vue'

const props = defineProps<{
  modelValue: boolean
  orderId: string
  order: any
}>()
const emit = defineEmits(['update:modelValue', 'success'])
const userStore = useUserStore()
const { success, error } = useNotify()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const loading = ref(false)
const paying = ref(false)
const skuList = ref<any[]>([])
const currentEndTime = ref('')
const productInfo = reactive({ id: '', name: '', image: '' })

const selectedSkuId = ref('')
const selectedSpecs = reactive<Record<string,string>>({})

// Coupons
const availableCoupons = ref<any[]>([])
const selectedCoupon = ref<any>(null)
const discountAmount = ref(0) // Should reset when amount changes

const productInfoAsOrder = computed(() => ({
    ...props.order,
    productName: productInfo.name || props.order.productName,
    productImage: productInfo.image || props.order.productImage,
}))

const specGroups = computed(() => {
   if (!skuList.value.length) return []
   const groups: Record<string, Set<string>> = {}
   skuList.value.forEach(sku => {
      const combo = sku.spec_combination || {}
      Object.entries(combo).forEach(([k, v]) => {
         if (!groups[k]) groups[k] = new Set()
         groups[k].add(v as string)
      })
   })
   return Object.entries(groups).map(([k, set]) => ({
      name: k, values: Array.from(set).map(v => ({ value: v }))
   }))
})

const originalAmount = computed(() => {
   const sku = skuList.value.find(s => s.sku_id === selectedSkuId.value)
   return sku ? sku.price : 0
})

const finalAmount = computed(() => {
   return Math.max(0, originalAmount.value - discountAmount.value).toFixed(2)
})

const handleClose = () => visible.value = false

const loadData = async () => {
   loading.value = true
   try {
      const res = await clientOrderApi.getRenewalSkus(props.orderId)
      if (res.success) {
         skuList.value = res.skus || []
         currentEndTime.value = res.endTime || ''
         if (res.product) {
            productInfo.id = res.product.id
            productInfo.name = res.product.name
            productInfo.image = res.product.image
         }
         // Auto select first
         if (skuList.value.length > 0) {
            const first = skuList.value[0]
            if (first.spec_combination) {
               Object.assign(selectedSpecs, first.spec_combination)
            }
            selectedSkuId.value = first.sku_id
         }
         
         // Fetch Coupons
         fetchCoupons()
      }
   } catch(e) {}
   finally { loading.value = false }
}

const fetchCoupons = async () => {
   try {
      // Use client coupon API to get all coupons and filter locally
      const res = await couponApi.getUserCoupons()
      if (res.success && res.data) {
          availableCoupons.value = res.data.filter(c => {
              if (c.status !== 'unused') return false
              // Min usage check
              if (c.coupon.min_usage > originalAmount.value) return false
              // Expiry check
              if (c.coupon.end_date && new Date(c.coupon.end_date) < new Date()) return false
              return true
          })
      }
   } catch(e) { if (import.meta.dev) console.error('Failed to fetch coupons', e) }
}

const handleSpec = (group: string, val: string) => {
   selectedSpecs[group] = val
   const match = skuList.value.find(s => {
      const combo = s.spec_combination || {}
      return Object.entries(selectedSpecs).every(([k, v]) => combo[k] === v)
   })
   if (match) selectedSkuId.value = match.sku_id
   // Re-calculate discount
   calculateDiscount()
}

const handleSku = (id: string) => {
    selectedSkuId.value = id
    calculateDiscount()
}

const handleCouponSelect = (coupon: any) => {
    selectedCoupon.value = coupon
    calculateDiscount()
}

const calculateDiscount = () => {
    if (!selectedCoupon.value) {
        discountAmount.value = 0
        return
    }
    const c = selectedCoupon.value.coupon
    if (c.type === 'flat') {
        discountAmount.value = Math.min(c.value, originalAmount.value)
    } else if (c.type === 'product') {
        // Free
        discountAmount.value = originalAmount.value
    } else {
        discountAmount.value = 0
    }
}

const handlePay = async () => {
    if (!selectedSkuId.value) return
    if ((userStore.user?.balance || 0) < Number(finalAmount.value)) {
        error('余额不足')
        return
    }
    paying.value = true
    try {
        const create = await clientOrderApi.createRenewalPreOrder(selectedSkuId.value, props.orderId)
        if (!create.success) throw new Error(create.error)
        
        let preOrderId = create.preOrderId!
        
        // Apply coupon if selected
        if (selectedCoupon.value) {
            await clientOrderApi.applyCoupon(preOrderId, selectedCoupon.value.id)
        }

        const confirm = await clientOrderApi.confirmPreOrder(preOrderId, 'balance')
        if (!confirm.success) throw new Error(confirm.error)
        
        success('续费成功')
        emit('success', confirm.orderId)
        handleClose()
        window.location.reload()
    } catch(e: any) { error(e.message) }
    finally { paying.value = false }
}

const formatDate = (s: string) => s ? s.split('T')[0] : '-'

watch(() => props.modelValue, (v) => { if(v) loadData() })
watch(originalAmount, () => fetchCoupons()) // Refresh coupons if price changes significantly if needed
</script>

<style scoped>
.sheet-mask {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    display: flex; flex-direction: column; justify-content: flex-end;
}
.sheet-panel-glass {
    /* Global Aurora */
    padding-bottom: 0;
    max-height: 85vh; display: flex; flex-direction: column;
}
.sheet-header { padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
.title { color: #fff; font-weight: 700; font-size: 16px; }
.close-btn { color: #94A3B8; font-size: 20px; padding: 4px; }

.sheet-body { padding: 20px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; }
.loading-box { color: #64748B; text-align: center; padding: 40px; display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 13px; }
.prod-card-glass {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px; padding: 12px;
    display: flex; gap: 12px; align-items: center;
}
.thumb { width: 48px; height: 48px; border-radius: 12px; overflow: hidden; background: #0F172A;border: 1px solid rgba(255,255,255,0.05); }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.info { flex: 1; }
.name { color: #F1F5F9; font-size: 14px; font-weight: 600; line-height: 1.3; }
.expire { color: #94A3B8; font-size: 11px; margin-top: 4px; display: flex; align-items: center; gap: 4px; }

.specs-section { display: flex; flex-direction: column; gap: 16px; }
.g-name { color: #CBD5E1; font-size: 13px; margin-bottom: 10px; font-weight: 500; }
.g-vals { display: flex; flex-wrap: wrap; gap: 10px; }

/* .val-chip-glass handled by global .aurora-option-card */
.val-chip-glass.active-blue {
    /* Ensure blue override from global applies */
    background: rgba(59, 130, 246, 0.15); 
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(59, 130, 246, 0.2);
    color: #60A5FA;
}

.coupon-section { margin-top: 0; }
.coupon-list { display: flex; flex-direction: column; gap: 10px; }
/* .coupon-item-glass handled by .aurora-option-card */
.coupon-item-glass {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 16px;
    font-size: 13px; color: #94A3B8;
}

.c-val { color: var(--color-accent); font-weight: 700; margin-right: 6px; }
.chk { font-size: 16px; }

.sheet-footer {
    padding: 20px; border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; gap: 16px; align-items: center;
}
.price-info { flex: 1; }
.total-label { font-size: 11px; color: #64748B; margin-bottom: 2px; }
.price-row { display: flex; align-items: baseline; gap: 2px; }
/* .currencyRemoved { font-size: 14px; color: #fff; font-weight: 600; } */
.price-val { font-size: 24px; font-weight: 700; color: #F59E0B; font-family: 'DIN Alternate'; margin-right: 8px; }
.discount-tag { 
    font-size: 10px; color: #fff; background: #EF4444; 
    padding: 1px 6px; border-radius: 4px; transform: translateY(-3px);
}
/* pay-btn handled globally */

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
