<template>
  <BaseBusinessModal
    :visible="visible"
    title="选择优惠券"
    width="600px"
    confirmText="确认使用"
    :loading="loading"
    :confirmDisabled="!allowEmpty" 
    @close="handleClose"
    @cancel="handleClose"
    @confirm="handleConfirm"
  >
    <div class="coupon-selector-content">
      <!-- 头部提示与刷新 -->
      <div class="action-header">
        <div class="header-tip">
          <el-icon><InfoFilled /></el-icon>
          仅显示当前订单可用的优惠券
        </div>
        <el-button 
          :icon="Refresh" 
          circle 
          size="small" 
          class="refresh-btn"
          @click="loadCoupons" 
          :loading="listLoading" 
        />
      </div>

      <!-- 优惠券列表 -->
      <div class="coupon-list-container">
        <div v-if="listLoading" class="loading-state">
          <div class="spinner"></div> 正在获取优惠券...
        </div>

        <div v-else-if="coupons.length === 0" class="empty-state">
          <el-empty description="暂无可用优惠券" :image-size="80" />
        </div>

        <div v-else class="coupon-list">
          <!-- 不使用优惠券选项 (Styled to match Ticket dimensions roughly) -->
           <div 
            class="coupon-item no-coupon glass-card"
            :class="{ active: tempSelected === null }"
            @click="tempSelected = null"
          >
            <div class="coupon-left">
              <el-icon><CircleClose /></el-icon>
            </div>
            <div class="coupon-center">
              <div class="coupon-title">不使用优惠券</div>
              <div class="coupon-desc">放弃当前优惠</div>
            </div>
            <div class="coupon-right">
              <div class="radio-check"></div>
            </div>
          </div>

          <!-- 优惠券项 (Using BaseCouponTicket) -->
          <div 
            v-for="coupon in sortedCoupons" 
            :key="coupon.id"
            class="ticket-wrapper"
            :class="{ 
              selected: tempSelected?.id === coupon.id,
              disabled: !isApplicable(coupon)
            }"
            @click="handleItemClick(coupon)"
          >
            <BaseCouponTicket
              :color="getTicketColor(coupon.coupon)"
              :value="getTicketValue(coupon.coupon)"
              :unit="getTicketUnit(coupon.coupon)"
              :title="coupon.coupon.name"
              :desc="getTicketDesc(coupon.coupon)"
              :type-label="getCouponTypeLabel(coupon.coupon.type)"
              :expiry-text="formatDate(coupon.coupon.end_date)"
              :status="'unused'"
              :disabled="!isApplicable(coupon)"
              size="compact"
              class="selector-ticket"
            >
               <!-- Custom Action Slot for Selection -->
               <template #action>
                  <div class="radio-check" :class="{ checked: tempSelected?.id === coupon.id }"></div>
               </template>
            </BaseCouponTicket>
            
            <!-- Inapplicable Reason Overlay/Text if needed, or just rely on transparency -->
             <div v-if="!isApplicable(coupon)" class="inapplicable-reason">
                {{ getInapplicableReason(coupon) }}
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部左侧信息 -->
    <template #footer-left>
      <div class="selected-info" v-if="tempSelected">
        已选择: <span class="highlight">{{ tempSelected.coupon.name }}</span>
        <span class="discount-preview">-¥{{ tempSelected.coupon.value }}</span>
      </div>
      <div class="selected-info" v-else>
        未选择优惠券
      </div>
    </template>
  </BaseBusinessModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseBusinessModal from '@/components/modal/base/BaseBusinessModal.vue'
import BaseCouponTicket from '@/components/exchange/coupon/BaseCouponTicket.vue'
import { couponApi, type UserCoupon, type Coupon } from '@/api/coupon'
import { Refresh, InfoFilled, CircleClose } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
  orderAmount: number
  skuIds: string[]
  productIds: string[]
  currentCouponId?: string
}>()

const emit = defineEmits(['update:modelValue', 'select'])

// UI 状态
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const listLoading = ref(false)
const loading = ref(false) // 确认按钮 loading
const coupons = ref<UserCoupon[]>([])
const tempSelected = ref<UserCoupon | null>(null)
const allowEmpty = true // 允许传 null

// 初始化逻辑
watch(() => props.modelValue, (val) => {
  if (val) {
    loadCoupons()
  }
})

const sortedCoupons = computed(() => {
  return [...coupons.value].sort((a, b) => {
    const aValid = isApplicable(a)
    const bValid = isApplicable(b)
    if (aValid && !bValid) return -1
    if (!aValid && bValid) return 1
    return b.coupon.value - a.coupon.value
  })
})

const loadCoupons = async () => {
  listLoading.value = true
  try {
    const res = await couponApi.getUserCoupons()
    if (res.success && res.data) {
      const now = new Date()
      coupons.value = res.data.filter(c => 
        c.status === 'unused' && 
        c.coupon.type !== 'balance' &&
        (!c.coupon.end_date || new Date(c.coupon.end_date) >= now)
      )
      
      // 初始化选中状态
      if (props.currentCouponId) {
        tempSelected.value = coupons.value.find(c => c.id === props.currentCouponId) || null
      } else {
        tempSelected.value = null
      }
    }
  } catch (e) {
    console.error('Failed to load coupons', e)
  } finally {
    listLoading.value = false
  }
}

// 检查可用性
const isApplicable = (coupon: UserCoupon) => {
  const c = coupon.coupon
  if (props.orderAmount < c.min_usage) return false
  
  if (c.type === 'product') {
     // Assuming c.extra holds sku_ids or product_ids as per previous logic, 
     // but type definition might vary. Using 'any' safety or strict type if known.
     const extra = (c as any).extra || {}
     // Some coupons might use direct fields if refined, but sticking to previous logic structure:
     // If the previous code used c.sku_ids directly, I will assume it exists on the type or I cast it.
     // Re-checking previous file content: it used `c.sku_ids` and `c.product_ids`.
     const cAny = c as any
     
     if (cAny.sku_ids && cAny.sku_ids.length > 0) {
        const hasCommonSku = props.skuIds.some(sid => 
          cAny.sku_ids.includes(sid)
        )
        if (!hasCommonSku) return false
     } else if (cAny.product_ids && cAny.product_ids.length > 0) {
        const hasCommonProduct = props.productIds.some(pid => 
          cAny.product_ids?.includes(pid)
        )
        if (!hasCommonProduct) return false
     }
  }
  return true
}

const getInapplicableReason = (coupon: UserCoupon) => {
  if (props.orderAmount < coupon.coupon.min_usage) {
    return `还差 ¥${(coupon.coupon.min_usage - props.orderAmount).toFixed(2)}`
  }
  if (coupon.coupon.type === 'product') {
    return '该商品不可用'
  }
  return '不可用'
}

const handleItemClick = (coupon: UserCoupon) => {
  if (!isApplicable(coupon)) return
  // Toggle off if clicking selected? Or just select. Standard is just select.
  tempSelected.value = coupon
}

// 事件处理
const handleClose = () => {
  visible.value = false
}

const handleConfirm = () => {
  emit('select', tempSelected.value)
  visible.value = false
}

// 转换函数 for BaseCouponTicket
const getTicketColor = (c: Coupon) => {
  if (c.type === 'flat') return 'purple'
  if (c.type === 'product') return 'cyan'
  if (c.type === 'balance') return 'gold'
  return 'default'
}

const getTicketDesc = (c: Coupon) => {
  if (c.type === 'product') {
      const extra = (c as any).extra
      if (extra && extra.product_name) {
          return `${extra.product_name} 专用`
      }
      return '指定商品专用优惠'
  }
  if (c.min_usage > 0) return `满 ${c.min_usage} 可用`
  return '无门槛使用'
}

const getTicketValue = (c: Coupon) => {
    if (c.type === 'product' && (!c.value || c.value === 0)) {
        return '兑换'
    }
    return c.value
}

const getTicketUnit = (c: Coupon) => {
    if (c.type === 'product' && (!c.value || c.value === 0)) {
        return ''
    }
    return '点'
}

const getCouponTypeLabel = (type: string) => {
  const map: any = { flat: '立减券', product: '商品券', balance: '额度券' }
  return map[type] || '通用券'
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '永久有效'
  const date = new Date(dateStr)
  return `有效期至 ${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`
}

</script>

<style scoped>
.coupon-selector-content {
  /* No padding needed because BaseBusinessModal body has padding */
}

/* Header */
.action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-tip {
  font-size: 13px;
  color: var(--text-sub);
  display: flex;
  align-items: center;
  gap: 6px;
}

.refresh-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-sub);
}

.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--active-orange);
  border-color: var(--active-orange);
}

/* List */
.coupon-list-container {
  height: 480px; 
  overflow-y: auto;
  padding-right: 4px;
}

.coupon-list {
  display: flex; flex-direction: column; gap: 16px;
}

/* Ticket Wrapper for Selection State */
.ticket-wrapper {
  position: relative;
  transition: all 0.2s;
  border-radius: 16px; /* Match ticket radius */
  cursor: pointer;
}

.ticket-wrapper.selected {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.ticket-wrapper.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(1);
}

.inapplicable-reason {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.8);
  color: #EF4444;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  pointer-events: none;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* No Coupon Item - Manually styled to look consistent */
.coupon-item.no-coupon {
  display: flex;
  align-items: center;
  /* Match BaseCouponTicket height approx */
  height: 80px; 
  background: rgba(255, 255, 255, 0.03); 
  border: 1px solid rgba(255, 255, 255, 0.08); 
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.coupon-item.no-coupon:hover {
  border-color: var(--primary-blue);
}
.coupon-item.no-coupon.active {
  background: rgba(23, 143, 198, 0.15);
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 1px var(--primary-blue) inset;
}

.coupon-item.no-coupon .coupon-left {
  width: 80px;
  display: flex; justify-content: center; align-items: center;
  font-size: 24px; color: var(--text-sub);
  border-right: 1px dashed rgba(255,255,255,0.1);
}
.coupon-item.no-coupon .coupon-center {
  flex: 1; padding: 0 20px;
}
.coupon-item.no-coupon .coupon-title { font-size: 15px; color: var(--text-main); font-weight: 600; }
.coupon-item.no-coupon .coupon-desc { font-size: 13px; color: var(--text-sub); margin-top: 4px; }
.coupon-item.no-coupon .coupon-right { width: 60px; display: flex; justify-content: center; }


/* Radio Check Style */
.radio-check {
  width: 22px; height: 22px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  transition: all 0.2s;
  position: relative;
}

.radio-check.checked,
.coupon-item.no-coupon.active .radio-check {
  border-color: var(--active-orange);
  background: var(--active-orange);
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
}

.radio-check.checked::after,
.coupon-item.no-coupon.active .radio-check::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 8px; height: 8px;
  background: #fff;
  border-radius: 50%;
}

/* Footer Info */
.selected-info {
  font-size: 14px;
  color: var(--text-sub);
}

.highlight {
  color: var(--active-orange);
  font-weight: 600;
  margin: 0 4px;
}

.discount-preview {
  color: #EF4444; 
  font-weight: 600;
  margin-left: 4px;
}

/* BaseBusinessModal Overrides for Liquid Metal */
:deep(.modal-header) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px !important;
}

:deep(.modal-title) {
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

:deep(.modal-close) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.modal-close:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: var(--primary-blue) !important;
  color: var(--active-orange) !important;
}

:deep(.btn-secondary) {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: var(--text-sub) !important;
}

:deep(.btn-secondary:hover) {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: #fff !important;
}

:deep(.btn-primary) {
  background: linear-gradient(90deg, var(--active-orange) 0%, #FB923C 100%) !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3) !important;
}

:deep(.btn-primary:hover) {
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.5) !important;
  transform: translateY(-1px) !important;
}
</style>
