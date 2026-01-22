<template>
  <BaseModal
    v-model:visible="visible"
    title="续费订单"
    width="720px"
    :footer="false"
    show-mascot
  >
    <div class="renewal-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载续费选项...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
      </div>

      <!-- Main Content -->
      <div v-else class="renewal-form">
        <div class="renewal-split-layout">
          
          <!-- Left Column: Specs & Info -->
          <div class="refresh-left-col">
            <!-- Product Header -->
            <div class="product-header-compact">
              <el-image :src="productInfo.image" class="mini-thumb" fit="cover">
                <template #placeholder><div class="ph">IMG</div></template>
              </el-image>
              <div class="ph-info">
                 <div class="ph-name">{{ productInfo.name }}</div>
                 <div class="ph-expire">当前到期: {{ formatDate(currentEndTime) }}</div>
              </div>
            </div>

            <!-- SKU Spec Selection -->
            <div class="specs-wrapper">
              
               <div v-if="specGroups.length > 0">
                <div v-for="specGroup in specGroups" :key="specGroup.name" class="spec-group">
                  <div class="spec-label">{{ specGroup.name }}</div>
                  <div class="spec-values">
                    <div 
                      v-for="val in specGroup.values" 
                      :key="val.value"
                      :class="['spec-val-btn', { active: selectedSpecs[specGroup.name] === val.value }]"
                      @click="handleSpecSelect(specGroup.name, val.value)"
                    >
                      {{ val.value }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="skuList.length > 0" class="simple-sku-list">
                <div class="spec-label">选择时长</div>
                <div class="spec-values">
                  <div 
                    v-for="sku in skuList" 
                    :key="sku.sku_id"
                    :class="['spec-val-btn', { active: selectedSkuId === sku.sku_id }]"
                    @click="handleSimpleSkuSelect(sku)"
                  >
                    {{ sku.duration }}天
                  </div>
                </div>
              </div>

            </div>

             <!-- Coupon Selection (Moved to Left) -->
            <div class="coupon-section" @click="showCouponModal = true">
              <div class="coupon-label">优惠券</div>
              <div class="coupon-value">
                <span v-if="selectedCoupon" class="coupon-selected">-¥{{ discountAmount.toFixed(2) }}</span>
                <span v-else class="coupon-placeholder">选择优惠券</span>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
          </div>

          <!-- Right Column: Summary & Actions -->
          <div class="refresh-right-col">
             <div class="summary-card">
                <div class="summary-title">订单摘要</div>
                
                <div class="summary-row">
                   <span>商品金额</span>
                   <span>¥{{ originalAmount.toFixed(2) }}</span>
                </div>
                <div class="summary-row" v-if="discountAmount > 0">
                   <span>优惠抵扣</span>
                   <span class="text-danger">-¥{{ discountAmount.toFixed(2) }}</span>
                </div>
                
                <div class="divider"></div>
                
                <div class="total-row">
                   <div class="total-label">应付金额</div>
                   <div class="total-price">
                      <span class="unit">¥</span>{{ finalAmount.toFixed(2) }}
                   </div>
                </div>

                <div class="new-expire-tip" v-if="newEndTime">
                  续费后到期: {{ formatDate(newEndTime) }}
                </div>

                <button
                  class="pay-btn"
                  :disabled="!selectedSkuId || paying"
                  @click="handlePay"
                >
                  <span v-if="paying">支付中...</span>
                  <span v-else>立即支付</span>
                </button>
             </div>
          </div>
        
        </div>
      </div>
    </div>

    <!-- Coupon Selector Nested Modal -->
    <CouponSelectorModal
      v-model="showCouponModal"
      :orderAmount="originalAmount"
      :skuIds="selectedSkuId ? [selectedSkuId] : []"
      :productIds="productInfo.id ? [productInfo.id] : []"
      :currentCouponId="selectedCoupon?.id"
      @select="handleCouponSelect"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import BaseModal from '@/components/base/BaseModal.vue'
import CouponSelectorModal from '@/components/CouponSelectorModal.vue'
import { clientOrderApi } from '@/api/client'
import { type UserCoupon } from '@/api/coupon'
import { useUserStore } from '@/stores/user'

interface RenewalSku {
  sku_id: string
  spec_combination: Record<string, string>
  price: number
  duration: number
  product_type: string
  image?: string
}

interface SpecValue {
  value: string
  price?: number
  skuId: string
}

interface SpecGroup {
  name: string
  values: SpecValue[]
}

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

// State
const loading = ref(false)
const error = ref('')
const paying = ref(false)
const showCouponModal = ref(false)

const skuList = ref<RenewalSku[]>([])
const currentEndTime = ref('')
const selectedSkuId = ref('')
const selectedCoupon = ref<UserCoupon | null>(null)
const discountAmount = ref(0)
const selectedSpecs = reactive<Record<string, string>>({})

// Product info
const productInfo = reactive({
  id: '',
  name: '商品',
  image: ''
})

// Build spec groups from SKU list
const specGroups = computed<SpecGroup[]>(() => {
  if (skuList.value.length === 0) return []
  
  const groups: Record<string, Map<string, SpecValue>> = {}
  
  skuList.value.forEach(sku => {
    const combination = sku.spec_combination || {}
    Object.entries(combination).forEach(([name, value]) => {
      if (!groups[name]) {
        groups[name] = new Map()
      }
      // Store value with price info
      if (!groups[name].has(value)) {
        groups[name].set(value, {
          value,
          price: sku.price,
          skuId: sku.sku_id
        })
      }
    })
  })
  
  return Object.entries(groups).map(([name, valuesMap]) => ({
    name,
    values: Array.from(valuesMap.values())
  }))
})

// Computed
const selectedSku = computed(() => {
  if (selectedSkuId.value) {
    return skuList.value.find(s => s.sku_id === selectedSkuId.value)
  }
  // Try to find by spec combination
  if (specGroups.value.length > 0) {
    return skuList.value.find(sku => {
      const combination = sku.spec_combination || {}
      return Object.entries(selectedSpecs).every(([name, value]) => 
        combination[name] === value
      )
    })
  }
  return null
})

const originalAmount = computed(() => 
  selectedSku.value?.price || 0
)

const finalAmount = computed(() => 
  Math.max(0, originalAmount.value - discountAmount.value)
)

const newEndTime = computed(() => {
  if (!currentEndTime.value || !selectedSku.value) return ''
  const endDate = new Date(currentEndTime.value)
  endDate.setDate(endDate.getDate() + selectedSku.value.duration)
  return endDate.toISOString()
})

// Watch for modal open
watch(() => props.modelValue, async (val) => {
  if (val) {
    await loadRenewalSkus()
  } else {
    // Reset state when closed
    selectedSkuId.value = ''
    selectedCoupon.value = null
    discountAmount.value = 0
    Object.keys(selectedSpecs).forEach(k => delete selectedSpecs[k])
  }
})

// Watch for spec selection changes to update selectedSkuId
watch(selectedSpecs, () => {
  if (specGroups.value.length > 0) {
    const matched = skuList.value.find(sku => {
      const combination = sku.spec_combination || {}
      return Object.entries(selectedSpecs).every(([name, value]) => 
        combination[name] === value
      )
    })
    if (matched) {
      selectedSkuId.value = matched.sku_id
    }
  }
}, { deep: true })

// Methods
const loadRenewalSkus = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const res = await clientOrderApi.getRenewalSkus(props.orderId)
    
    if (!res.success) {
      error.value = res.error || '获取续费信息失败'
      return
    }
    
    skuList.value = res.skus || []
    currentEndTime.value = res.endTime || ''
    
    // Set product info
    if (res.product) {
      productInfo.id = res.product.id
      productInfo.name = res.product.name
      productInfo.image = res.product.image
    }
    
    // Auto-select first option
    if (specGroups.value.length > 0) {
      // Select first value of each spec group
      specGroups.value.forEach(group => {
        if (group.values.length > 0) {
          selectedSpecs[group.name] = group.values[0].value
        }
      })
    } else if (skuList.value.length > 0) {
      // Simple mode: select first SKU
      selectedSkuId.value = skuList.value[0].sku_id
    }
  } catch (e: any) {
    error.value = e.message || '系统异常'
  } finally {
    loading.value = false
  }
}

const handleSpecSelect = (groupName: string, value: string) => {
  selectedSpecs[groupName] = value
  // Reset coupon when specs change
  selectedCoupon.value = null
  discountAmount.value = 0
}

const handleSimpleSkuSelect = (sku: RenewalSku) => {
  selectedSkuId.value = sku.sku_id
  // Reset coupon when SKU changes
  selectedCoupon.value = null
  discountAmount.value = 0
}

const handleCouponSelect = async (coupon: UserCoupon | null) => {
  selectedCoupon.value = coupon
  
  if (!coupon) {
    discountAmount.value = 0
    return
  }
  
  // Calculate discount locally (simplified)
  if (coupon.coupon.type === 'flat') {
    discountAmount.value = Math.min(coupon.coupon.value, originalAmount.value)
  } else if (coupon.coupon.type === 'product') {
    discountAmount.value = originalAmount.value
  } else {
    discountAmount.value = 0
  }
}

const handlePay = async () => {
  if (!selectedSkuId.value || paying.value) return
  
  // Check balance first
  const balance = userStore.user?.balance ?? 0
  if (balance < finalAmount.value) {
    ElMessage.error(`余额不足，需 ¥${finalAmount.value.toFixed(2)}，当前 ¥${balance.toFixed(2)}`)
    return
  }
  
  paying.value = true
  
  try {
    // Step 1: Create renewal pre-order
    const createRes = await clientOrderApi.createRenewalPreOrder(
      selectedSkuId.value,
      props.orderId
    )
    
    if (!createRes.success) {
      ElMessage.error(createRes.error || '创建续费订单失败')
      return
    }
    
    const preOrderId = createRes.preOrderId!
    
    // Step 2: Apply coupon if selected
    if (selectedCoupon.value) {
      const couponRes = await clientOrderApi.applyCoupon(
        preOrderId,
        selectedCoupon.value.id
      )
      
      if (!couponRes.success) {
        ElMessage.warning('优惠券应用失败，将按原价支付')
        discountAmount.value = 0
      }
    }
    
    // Step 3: Confirm and pay
    const confirmRes = await clientOrderApi.confirmPreOrder(
      preOrderId,
      'balance',
      selectedCoupon.value?.id
    )
    
    if (!confirmRes.success) {
      ElMessage.error(confirmRes.error || '支付失败')
      return
    }
    
    // Success!
    ElMessage.success('续费成功！')
    await userStore.fetchUserInfo() // Refresh balance
    
    visible.value = false
    emit('success', confirmRes.orderId)
    
    // Redirect to new order
    router.push(`/profile/order/${confirmRes.orderId}`)
    
  } catch (e: any) {
    ElMessage.error(e.message || '系统异常')
  } finally {
    paying.value = false
  }
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
/* CSS for Two-Column Layout */
.renewal-content { padding: 0; }
.renewal-split-layout {
  display: flex;
  height: 420px; /* Fixed height for consistent modal */
}

/* Left Column */
.refresh-left-col {
  flex: 1.4;
  padding: 24px;
  overflow-y: auto;
  border-right: 1px solid rgba(255,255,255,0.05);
}

.product-header-compact {
  display: flex; gap: 12px; align-items: center;
  margin-bottom: 24px;
}
.mini-thumb { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; background: #0F172A; margin: 0; display: block; }
.ph-info { display: flex; flex-direction: column; gap: 4px; }
.ph-name { font-size: 15px; font-weight: 600; color: #fff; }
.ph-expire { font-size: 12px; color: #64748B; }

.specs-wrapper { min-height: 120px; }
.spec-group { margin-bottom: 20px; }
.spec-label { font-size: 13px; color: #94A3B8; margin-bottom: 10px; font-weight: 500; }
.spec-values { display: flex; flex-wrap: wrap; gap: 8px; }

.spec-val-btn {
  padding: 8px 16px; 
  border-radius: 8px;
  background: rgba(255,255,255,0.03); 
  border: 1px solid rgba(255,255,255,0.08); 
  color: #CBD5E1; font-size: 13px; 
  cursor: pointer; transition: all 0.2s;
  min-width: 60px; text-align: center;
}
.spec-val-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
.spec-val-btn.active {
  background: rgba(59, 130, 246, 0.15); 
  border-color: #3B82F6; 
  color: #fff; 
  font-weight: 600; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Coupon (Compact) */
.coupon-section {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 24px; padding: 12px 16px;
  background: rgba(255,255,255,0.02); border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.05); cursor: pointer;
}
.coupon-section:hover { background: rgba(255,255,255,0.04); }
.coupon-label { font-size: 13px; color: #94A3B8; }
.coupon-value { font-size: 13px; color: #64748B; display: flex; align-items: center; gap: 4px; }
.coupon-selected { color: #F87171; font-weight: 600; }

/* Right Column */
.refresh-right-col {
  flex: 0.85;
  padding: 24px;
  background: rgba(0,0,0,0.1); /* Slightly darker/distinct */
  display: flex; flex-direction: column;
}

.summary-card {
  height: 100%;
  display: flex; flex-direction: column;
}

.summary-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 20px; }

.summary-row {
  display: flex; justify-content: space-between;
  font-size: 13px; color: #94A3B8; margin-bottom: 10px;
}
.text-danger { color: #EF4444; }

.divider { height: 1px; background: rgba(255,255,255,0.08); margin: 16px 0; }

.total-row { margin-bottom: auto; }
.total-label { font-size: 13px; color: #CBD5E1; margin-bottom: 4px; }
.total-price { font-size: 32px; font-weight: 700; color: #fff; font-family: 'Outfit', sans-serif; letter-spacing: -1px; }
.total-price .unit { font-size: 18px; margin-right: 2px; color: #64748B; }

.new-expire-tip {
  font-size: 12px; color: #64748B; margin-bottom: 16px; text-align: center;
  background: rgba(255,255,255,0.03); padding: 6px; border-radius: 4px;
}

.pay-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border: none; border-radius: 12px;
  color: #fff; font-weight: 600; font-size: 15px;
  cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.2s;
}
.pay-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4); }
.pay-btn:disabled { opacity: 0.5; cursor: not-allowed; background: #334155; box-shadow: none; }
</style>
