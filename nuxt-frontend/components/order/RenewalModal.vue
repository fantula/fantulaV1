<template>
  <BaseModal
    v-model:visible="visible"
    title="续费订单"
    width="520px"
    :footer="false"
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
        <!-- Product Header -->
        <div class="product-header">
          <div class="product-image">
            <el-image 
              :src="productInfo.image || '/images/placeholder.png'" 
              fit="cover"
              class="thumb-img"
            >
              <template #placeholder>
                <div class="img-placeholder">加载中</div>
              </template>
            </el-image>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ productInfo.name }}</h3>
            <div class="current-end-time">
              <span class="label">当前到期</span>
              <span class="value">{{ formatDate(currentEndTime) }}</span>
            </div>
          </div>
        </div>

        <!-- SKU Spec Selection (like product detail page) -->
        <div class="spec-selection-area" v-if="specGroups.length > 0">
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
                <span v-if="val.price" class="spec-price">¥{{ val.price.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fallback: Simple SKU list if no spec groups -->
        <div v-else-if="skuList.length > 0" class="simple-sku-list">
          <div class="spec-label">选择续费时长</div>
          <div class="spec-values">
            <div 
              v-for="sku in skuList" 
              :key="sku.sku_id"
              :class="['spec-val-btn', { active: selectedSkuId === sku.sku_id }]"
              @click="handleSimpleSkuSelect(sku)"
            >
              {{ sku.duration }}天
              <span class="spec-price">¥{{ sku.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Coupon Selection -->
        <div class="coupon-section" @click="showCouponModal = true">
          <div class="coupon-label">优惠券</div>
          <div class="coupon-value">
            <span v-if="selectedCoupon" class="coupon-selected">
              -¥{{ discountAmount.toFixed(2) }}
            </span>
            <span v-else class="coupon-placeholder">选择优惠券</span>
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>

        <!-- Price Summary -->
        <div class="price-summary">
          <div class="price-row">
            <span>商品金额</span>
            <span>¥{{ originalAmount.toFixed(2) }}</span>
          </div>
          <div v-if="discountAmount > 0" class="price-row discount">
            <span>优惠券</span>
            <span>-¥{{ discountAmount.toFixed(2) }}</span>
          </div>
          <div class="price-row total">
            <span>应付金额</span>
            <span class="final-price">¥{{ finalAmount.toFixed(2) }}</span>
          </div>
          <div class="new-end-time">
            续费后到期：{{ formatDate(newEndTime) }}
          </div>
        </div>

        <!-- Pay Button -->
        <button
          class="pay-btn"
          :disabled="!selectedSkuId || paying"
          @click="handlePay"
        >
          <span v-if="paying">支付中...</span>
          <span v-else>立即支付 ¥{{ finalAmount.toFixed(2) }}</span>
        </button>
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
.renewal-content {
  padding: 20px;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px 0;
  color: #94A3B8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4C7AE0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error-icon { font-size: 48px; margin-bottom: 16px; }

/* Product Header */
.product-header {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.thumb-img {
  width: 100%;
  height: 100%;
}

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  color: #64748B;
  font-size: 12px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #E2E8F0;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.current-end-time {
  font-size: 13px;
}

.current-end-time .label {
  color: #64748B;
  margin-right: 8px;
}

.current-end-time .value {
  color: #94A3B8;
}

/* Spec Selection (matching product detail page) */
.spec-selection-area, .simple-sku-list {
  margin-bottom: 20px;
}

.spec-group {
  margin-bottom: 16px;
}

.spec-label {
  color: #94A3B8;
  font-size: 13px;
  margin-bottom: 10px;
}

.spec-values {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spec-val-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #E2E8F0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.spec-val-btn:hover {
  border-color: rgba(76, 122, 224, 0.4);
  background: rgba(76, 122, 224, 0.05);
}

.spec-val-btn.active {
  border-color: #4C7AE0;
  background: rgba(76, 122, 224, 0.1);
  color: #4C7AE0;
}

.spec-price {
  font-size: 12px;
  color: #64748B;
  margin-top: 4px;
}

.spec-val-btn.active .spec-price {
  color: #4C7AE0;
}

/* Coupon Section */
.coupon-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  cursor: pointer;
}

.coupon-section:hover {
  background: rgba(255, 255, 255, 0.05);
}

.coupon-label { color: #94A3B8; }
.coupon-value { 
  display: flex; 
  align-items: center; 
  gap: 8px; 
  color: #64748B;
}
.coupon-selected { color: #EF4444; }

/* Price Summary */
.price-summary {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 8px;
}

.price-row.discount { color: #EF4444; }

.price-row.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 16px;
  color: #E2E8F0;
}

.final-price {
  font-size: 20px;
  font-weight: 600;
  color: #4C7AE0;
}

.new-end-time {
  text-align: center;
  font-size: 13px;
  color: #64748B;
  margin-top: 12px;
}

/* Pay Button */
.pay-btn {
  width: 100%;
  background: #4C7AE0;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.pay-btn:hover {
  background: #3B66C5;
}

.pay-btn:disabled {
  background: #334155;
  color: #64748B;
  cursor: not-allowed;
}
</style>
