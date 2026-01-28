<template>
  <div v-if="visible" class="sheet-mask" @click="handleClose">
    <div class="sheet-panel" @click.stop>
       <div class="sheet-header">
          <div class="title">续费订单</div>
          <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
       </div>

       <div class="sheet-body" v-if="loading">
          <div class="loading-box">加载中...</div>
       </div>

       <div class="sheet-body" v-else>
          <!-- Product -->
          <div class="prod-row">
             <div class="thumb"><img :src="productInfo.image" /></div>
             <div class="info">
                <div class="name">{{ productInfo.name }}</div>
                <div class="expire">当前到期: {{ formatDate(currentEndTime) }}</div>
             </div>
          </div>

          <!-- Specs -->
          <div class="specs-section">
             <div v-for="group in specGroups" :key="group.name" class="group">
                <div class="g-name">{{ group.name }}</div>
                <div class="g-vals">
                   <div v-for="val in group.values" :key="val.value" 
                        class="val-chip"
                        :class="{ active: selectedSpecs[group.name] === val.value }"
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
                          class="val-chip"
                          :class="{ active: selectedSkuId === sku.sku_id }"
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
                    class="coupon-item" 
                    :class="{ active: !selectedCoupon }"
                    @click="handleCouponSelect(null)"
                 >
                    不使用优惠券
                 </div>
                 
                 <!-- Coupon Items -->
                 <div 
                   v-for="coupon in availableCoupons" 
                   :key="coupon.id" 
                   class="coupon-item"
                   :class="{ active: selectedCoupon?.id === coupon.id }"
                   @click="handleCouponSelect(coupon)"
                 >
                    <span class="c-name">{{ coupon.coupon.name }}</span>
                    <span class="c-val" v-if="coupon.coupon.type === 'flat'">-¥{{ coupon.coupon.value }}</span>
                    <span class="c-val" v-else-if="coupon.coupon.type === 'product'">免单</span>
                 </div>
             </div>
          </div>
       </div>

       <div class="sheet-footer">
          <div class="price-info">
             <div class="total-label">总计</div>
             <div class="price-row">
                <div class="price">¥{{ finalAmount }}</div>
                <div v-if="discountAmount > 0" class="discount-tag">-¥{{ discountAmount }}</div>
             </div>
          </div>
          <button class="pay-btn" :disabled="!selectedSkuId || paying" @click="handlePay">
             {{ paying ? '支付中...' : '立即支付' }}
          </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: boolean
  orderId: string
}>()
const emit = defineEmits(['update:modelValue', 'success'])
const router = useRouter()
const userStore = useUserStore()

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
const discountAmount = ref(0)

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
   // Assuming there's an API to get usable coupons for this product/renewal
   try {
      const res = await clientOrderApi.getUsableCoupons({
          product_ids: [productInfo.id],
          amount: originalAmount.value
      })
      if (res.success) {
          availableCoupons.value = res.data || []
      }
   } catch(e) { console.error('Failed to fetch coupons', e) }
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
        ElMessage.error('余额不足')
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
        
        ElMessage.success('续费成功')
        emit('success', confirm.orderId)
        handleClose()
        window.location.reload()
    } catch(e: any) { ElMessage.error(e.message) }
    finally { paying.value = false }
}

const formatDate = (s: string) => s ? s.split('T')[0] : '-'

watch(() => props.modelValue, (v) => { if(v) loadData() })
watch(originalAmount, () => fetchCoupons()) // Refresh coupons if price changes significantly if needed
</script>

<style scoped>
.sheet-mask {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
    display: flex; flex-direction: column; justify-content: flex-end;
}
.sheet-panel {
    background: #1E293B; border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding-bottom: env(safe-area-inset-bottom);
    max-height: 85vh; display: flex; flex-direction: column;
}
.sheet-header { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; }
.title { color: #fff; font-weight: 700; }
.close-btn { color: #94A3B8; font-size: 20px; }

.sheet-body { padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
.loading-box { color: #64748B; text-align: center; padding: 20px; }

.prod-row { display: flex; gap: 12px; align-items: center; }
.thumb { width: 56px; height: 56px; border-radius: 8px; overflow: hidden; background: #0F172A; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.info { flex: 1; }
.name { color: #fff; font-size: 14px; font-weight: 600; }
.expire { color: #94A3B8; font-size: 12px; }

.specs-section { display: flex; flex-direction: column; gap: 16px; }
.g-name { color: #CBD5E1; font-size: 13px; margin-bottom: 8px; }
.g-vals { display: flex; flex-wrap: wrap; gap: 8px; }
.val-chip {
    padding: 8px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px; color: #94A3B8; font-size: 13px;
}
.val-chip.active { background: #3B82F6; color: #fff; border-color: #3B82F6; }

.coupon-section { margin-top: 10px; }
.coupon-list { display: flex; flex-direction: column; gap: 8px; }
.coupon-item {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
    padding: 10px 12px; border-radius: 8px; 
    display: flex; justify-content: space-between; align-items: center;
    color: #94A3B8; font-size: 13px;
}
.coupon-item.active { border-color: #3B82F6; background: rgba(59,130,246,0.1); color: #fff; }
.c-val { color: #F97316; font-weight: 600; }

.sheet-footer {
    padding: 16px; border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; gap: 16px; align-items: center;
}
.price-info { flex: 1; }
.total-label { font-size: 11px; color: #64748B; }
.price-row { display: flex; align-items: baseline; gap: 6px; }
.price { font-size: 20px; font-weight: 700; color: #fff; font-family: 'DIN Alternate'; }
.discount-tag { font-size: 12px; color: #EF4444; }

.pay-btn {
    padding: 12px 32px; background: #3B82F6; color: #fff; font-weight: 600; border-radius: 20px; border: none;
}
.pay-btn:disabled { opacity: 0.5; }
</style>
