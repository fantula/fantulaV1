<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="sheet-mask" @click="handleClose">
        <div class="sheet-panel-glass" @click.stop>
          <div class="sheet-header">
            <div class="title">选择优惠券</div>
            <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
          </div>
          
          <div class="sheet-sub-header">
            <div class="header-tip">
               <el-icon><InfoFilled /></el-icon>
               仅显示当前订单可用的优惠券
            </div>
            <div class="refresh-btn" @click="loadCoupons">
               <el-icon :class="{ spinning: listLoading }"><Refresh /></el-icon>
            </div>
          </div>

          <div class="sheet-body">
             <div v-if="listLoading" class="loading-state">
                <el-icon class="spinning"><Loading /></el-icon>
                <span>加载中...</span>
             </div>

             <div v-else-if="coupons.length === 0" class="empty-state">
                <el-empty description="暂无可用优惠券" :image-size="80" />
             </div>

             <div v-else class="coupon-list">
                <!-- Don't use coupon -->
                <div 
                   class="no-coupon-item glass-card"
                   :class="{ active: tempSelected === null }"
                   @click="tempSelected = null"
                >
                   <div class="label">不使用优惠券</div>
                   <div class="radio-check"></div>
                </div>

                <!-- Coupon Items -->
                <div 
                   v-for="coupon in sortedCoupons"
                   :key="coupon.id"
                   class="coupon-wrapper"
                   :class="{ disabled: !isApplicable(coupon) }"
                   @click="handleItemClick(coupon)"
                >
                   <MobileCouponTicket
                      :type="coupon.coupon.type"
                      :value="coupon.coupon.value"
                      :title="coupon.coupon.name"
                      :expiryText="formatDate(coupon.coupon.end_date)"
                      :status="'unused'"
                      :disabled="!isApplicable(coupon)"
                   />
                   
                   <!-- Selection Overlay -->
                   <div class="selection-overlay">
                       <div class="radio-check" :class="{ checked: tempSelected?.id === coupon.id }"></div>
                   </div>

                   <!-- Inapplicable Reason -->
                   <div v-if="!isApplicable(coupon)" class="inapplicable-reason">
                       {{ getInapplicableReason(coupon) }}
                   </div>
                </div>
             </div>
          </div>

          <div class="sheet-footer">
             <button class="submit-btn-glow" @click="handleConfirm">
                确认使用
             </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Close, InfoFilled, Refresh, Loading } from '@element-plus/icons-vue'
import { couponApi, type UserCoupon } from '@/api/client/coupon'
import MobileCouponTicket from '@/components/mobile/redemption/MobileCouponTicket.vue'

const props = defineProps<{
  modelValue: boolean
  orderAmount: number
  skuIds: string[]
  productIds: string[]
  currentCouponId?: string
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const listLoading = ref(false)
const coupons = ref<UserCoupon[]>([])
const tempSelected = ref<UserCoupon | null>(null)

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
      
      if (props.currentCouponId) {
        tempSelected.value = coupons.value.find(c => c.id === props.currentCouponId) || null
      } else {
        tempSelected.value = null
      }
    }
  } catch (e) {
    // console.error('Failed to load coupons', e)
  } finally {
    listLoading.value = false
  }
}

const isApplicable = (coupon: UserCoupon) => {
  const c = coupon.coupon
  if (props.orderAmount < c.min_usage) return false
  
  if (c.type === 'product') {
     const cAny = c as any
     if (cAny.sku_ids && cAny.sku_ids.length > 0) {
        const hasCommonSku = props.skuIds.some(sid => cAny.sku_ids.includes(sid))
        if (!hasCommonSku) return false
     } else if (cAny.product_ids && cAny.product_ids.length > 0) {
        const hasCommonProduct = props.productIds.some(pid => cAny.product_ids?.includes(pid))
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
  tempSelected.value = coupon
}

const handleClose = () => visible.value = false

const handleConfirm = () => {
  emit('select', tempSelected.value)
  handleClose()
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '永久有效'
  const date = new Date(dateStr)
  return `有效期至 ${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`
}
</script>

<style scoped>
.sheet-mask {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    display: flex; flex-direction: column; justify-content: flex-end;
}
.sheet-panel-glass {
    background: rgba(15, 23, 42, 0.95);
    border-top: 1px solid rgba(255,255,255,0.1);
    border-top-left-radius: 24px; border-top-right-radius: 24px;
    padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
    max-height: 85vh; display: flex; flex-direction: column;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

.sheet-header {
    padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; justify-content: space-between; align-items: center;
}
.title { color: #fff; font-weight: 700; font-size: 16px; }
.close-btn { font-size: 20px; color: #94A3B8; padding: 4px; }

.sheet-sub-header {
    padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;
    background: rgba(0,0,0,0.1);
}
.header-tip { font-size: 12px; color: #94A3B8; display: flex; gap: 4px; align-items: center; }
.refresh-btn { font-size: 16px; color: #3B82F6; padding: 4px; }
.spinning { animation: spin 1s linear infinite; }

.sheet-body { padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }

.loading-state { text-align: center; padding: 40px; color: #94A3B8; display: flex; align-items: center; justify-content: center; gap: 8px; }

.coupon-list { display: flex; flex-direction: column; gap: 12px; }

.no-coupon-item {
    height: 50px; background: rgba(255,255,255,0.05); border-radius: 12px;
    display: flex; align-items: center; justify-content: space-between; padding: 0 16px;
    border: 1px solid rgba(255,255,255,0.05);
    transition: all 0.2s;
}
.no-coupon-item.active { border-color: #3B82F6; background: rgba(59, 130, 246, 0.1); }
.label { font-size: 14px; color: #fff; }

.coupon-wrapper { position: relative; }
.selection-overlay {
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; z-index: 5;
}

.radio-check {
    width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.3);
    position: relative; transition: all 0.2s;
}
.radio-check.checked, .no-coupon-item.active .radio-check {
    background: #3B82F6; border-color: #3B82F6;
}
.radio-check.checked::after, .no-coupon-item.active .radio-check::after {
    content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 8px; height: 8px; background: #fff; border-radius: 50%;
}

.inapplicable-reason {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
    display: flex; align-items: center; justify-content: center;
    color: #EF4444; font-weight: 600; font-size: 14px;
    border-radius: 12px; z-index: 10;
}

.sheet-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
.submit-btn-glow {
    width: 100%; padding: 14px; background: linear-gradient(90deg, #3B82F6, #2563EB);
    color: #fff; font-weight: 600; border-radius: 12px; border: none; font-size: 15px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
