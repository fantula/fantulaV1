<template>
  <BaseModal
    v-model:visible="visible"
    title="选择优惠券"
    width="500px"
    :footer="false"
  >
    <div class="coupon-selector-content">
      <!-- 头部操作区 -->
      <div class="action-header">
        <div class="header-tip">仅显示当前订单可用的优惠券</div>
        <el-button :icon="Refresh" circle size="small" @click="loadCoupons" :loading="loading" />
      </div>

      <!-- 优惠券列表 -->
      <div class="coupon-list-container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div> 加载中...
        </div>

        <div v-else-if="coupons.length === 0" class="empty-state">
          无可用优惠券
        </div>

        <div v-else class="coupon-list">
          <div 
            v-for="coupon in sortedCoupons" 
            :key="coupon.id"
            class="coupon-item"
            :class="{ 
              active: selectedId === coupon.id,
              disabled: !isApplicable(coupon)
            }"
            @click="handleSelect(coupon)"
          >
            <!-- 左侧金额/折扣 -->
            <div class="coupon-left">
              <div class="coupon-amount">
                <span class="symbol">￥</span>
                <span class="value">{{ coupon.coupon.value }}</span>
              </div>
              <div class="coupon-condition">满 {{ coupon.coupon.min_usage }} 可用</div>
            </div>

            <!-- 中间详情 -->
            <div class="coupon-center">
              <div class="coupon-title">
                <span class="type-tag">{{ getCouponTypeLabel(coupon.coupon.type) }}</span>
                {{ coupon.coupon.name }}
              </div>
              <div class="coupon-date">
                有效期至 {{ formatDate(coupon.coupon.end_date) }}
              </div>
              <div v-if="!isApplicable(coupon)" class="coupon-reason">
                {{ getInapplicableReason(coupon) }}
              </div>
            </div>

            <!-- 右侧选择状态 -->
            <div class="coupon-right">
              <div class="checkbox"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 不使用优惠券选项 -->
      <div class="no-coupon-option" @click="handleSelect(null)">
        <span>不使用优惠券</span>
        <div class="checkbox" :class="{ checked: !selectedId }"></div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { couponApi, type UserCoupon } from '@/api/coupon'
import { Refresh } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
  orderAmount: number
  skuIds: string[]
  productIds: string[] // 用于客户端预筛选
  currentCouponId?: string
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const loading = ref(false)
const coupons = ref<UserCoupon[]>([])
const selectedId = ref(props.currentCouponId)

// 监听弹窗打开刷新列表
watch(() => props.modelValue, (val) => {
  if (val) {
    loadCoupons()
    selectedId.value = props.currentCouponId
  }
})

const sortedCoupons = computed(() => {
  // 可用的排前面，金额大的排前面
  return [...coupons.value].sort((a, b) => {
    const aValid = isApplicable(a)
    const bValid = isApplicable(b)
    if (aValid && !bValid) return -1
    if (!aValid && bValid) return 1
    return b.coupon.value - a.coupon.value
  })
})

const loadCoupons = async () => {
  loading.value = true
  try {
    const res = await couponApi.getUserCoupons()
    if (res.success && res.data) {
      // 过滤掉已使用和过期的 (虽然 API 已排序，但再保险一下)
      // 同时也过滤掉 balance 类型的券，因为这不能在订单中使用
      const now = new Date()
      coupons.value = res.data.filter(c => 
        c.status === 'unused' && 
        c.coupon.type !== 'balance' && // 余额券不能在订单中使用
        (!c.coupon.end_date || new Date(c.coupon.end_date) >= now)
      )
    }
  } catch (e) {
    console.error('Failed to load coupons', e)
  } finally {
    loading.value = false
  }
}

// 检查是否可用
const isApplicable = (coupon: UserCoupon) => {
  // 1. 金额门槛
  if (props.orderAmount < coupon.coupon.min_usage) return false
  
  // 2. 商品匹配
  if (coupon.coupon.type === 'product') {
     // A. 优先检查 SKU IDs (数据库新添加的字段)
     // 如果 coupon.coupon.sku_ids 存在，则必须匹配 SKU
     if (coupon.coupon.sku_ids && coupon.coupon.sku_ids.length > 0) {
        const hasCommonSku = props.skuIds.some(sid => 
          (coupon.coupon as any).sku_ids.includes(sid)
        )
        if (!hasCommonSku) return false
     } 
     // B. 兼容旧逻辑：检查 Product ID (如果有)
     else if (coupon.coupon.product_ids && coupon.coupon.product_ids.length > 0) {
        const hasCommonProduct = props.productIds.some(pid => 
          coupon.coupon.product_ids?.includes(pid) // 假设 API 返回的是 text[]
        )
        if (!hasCommonProduct) return false
     }
  }
  
  return true
}

const getInapplicableReason = (coupon: UserCoupon) => {
  if (props.orderAmount < coupon.coupon.min_usage) {
    return `还差 ￥${(coupon.coupon.min_usage - props.orderAmount).toFixed(2)} 可用`
  }
  if (coupon.coupon.type === 'product') {
    return '该商品不可用'
  }
  return '不可用'
}

const handleSelect = async (coupon: UserCoupon | null) => {
  if (coupon && !isApplicable(coupon)) return

  if (coupon) {
      emit('select', coupon)
  } else {
      emit('select', null)
  }
  visible.value = false
}

const getCouponTypeLabel = (type: string) => {
  const map: any = { flat: '满减券', product: '商品券' }
  return map[type] || '优惠券'
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return '永久有效'
  return new Date(dateStr).toLocaleDateString()
}
</script>

<style scoped>
.coupon-selector-content {
  padding: 20px;
}


.action-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-tip {
  font-size: 13px;
  color: #94A3B8;
}

/* 列表 */
.coupon-list-container {
  height: 360px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.coupon-item {
  display: flex;
  align-items: center;
  background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.coupon-item:hover {
  border-color: rgba(76, 122, 224, 0.4);
}

.coupon-item.active {
  background: linear-gradient(145deg, rgba(76, 122, 224, 0.15), rgba(76, 122, 224, 0.05));
  border-color: #4C7AE0;
}

.coupon-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.8);
}

.coupon-left {
  width: 100px;
  text-align: center;
  padding: 16px 0;
  border-right: 1px dashed rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.coupon-amount {
  color: #FF5252;
  font-weight: bold;
}

.coupon-amount .symbol { font-size: 14px; }
.coupon-amount .value { font-size: 24px; }

.coupon-condition {
  font-size: 12px;
  color: #94A3B8;
  margin-top: 4px;
}

.coupon-center {
  flex: 1;
  padding: 16px;
}

.coupon-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #E2E8F0;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
}

.type-tag {
  background: rgba(76, 122, 224, 0.2);
  color: #60A5FA;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.coupon-date {
  font-size: 12px;
  color: #64748B;
}

.coupon-reason {
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
}

.coupon-right {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #64748B;
  position: relative;
}

.coupon-item.active .checkbox {
  border-color: #4C7AE0;
  background: #4C7AE0;
}

.coupon-item.active .checkbox::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}

.no-coupon-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  cursor: pointer;
  color: #94A3B8;
}

.no-coupon-option:hover {
  background: rgba(255, 255, 255, 0.06);
}

.checkbox.checked {
  border-color: #4C7AE0;
  background: #4C7AE0;
}
.checkbox.checked::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}

/* 滚动条 */
.coupon-list-container::-webkit-scrollbar {
  width: 6px;
}
.coupon-list-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.loading-state, .empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  flex-direction: column;
  gap: 12px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4C7AE0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
