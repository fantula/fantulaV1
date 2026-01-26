<template>
  <div class="exchange-section">
    <!-- Header -->
    <div class="section-header">
      <h2 class="section-title">兑换中心</h2>
      <div class="section-subtitle">Digital Vault</div>
    </div>

    <!-- Redemption Area -->
    <div class="redemption-card">
      <div class="redemption-header">
        <el-icon class="redemption-icon"><Ticket /></el-icon>
        <div class="redemption-title">兑换优惠券</div>
      </div>
      <div class="redemption-body">
        <div class="input-group">
          <input 
            type="text" 
            class="redemption-input" 
            placeholder="请输入兑换码" 
            v-model="redeemCode" 
            @keyup.enter="redeem"
          />
          <button class="redemption-btn" @click="redeem" :disabled="!redeemCode || redeeming">
            <span v-if="redeeming">兑换中...</span>
            <span v-else>立即兑换</span>
          </button>
        </div>
        <p class="redemption-tips">兑换码通常由16位字母和数字组成，区分大小写</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="coupon-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab-item', { active: activeTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <div class="active-indicator" v-if="activeTab === tab.key"></div>
      </div>
    </div>

    <!-- Coupon List (Scrollable Area) -->
    <div class="coupon-list-container">
      
      <BaseInfiniteList 
        :loading="loading" 
        :finished="finished"
        :error="error" 
        @load="loadMore"
        :offset="150"
      >
        <!-- Empty State -->
        <div v-if="displayList.length === 0 && !loading" class="empty-state">
          <el-icon class="empty-icon"><Ticket /></el-icon>
          <div class="empty-text">暂无优惠券</div>
          <div class="empty-desc">快去兑换或参与活动获取吧~</div>
        </div>

        <!-- Coupon Cards -->
        <div v-else class="coupon-list">
          <component
            v-for="coupon in displayList"
            :key="coupon.id"
            :is="getCouponComponent(coupon.coupon.type)"
            :coupon-data="coupon"
            :is-expired="isExpired(coupon) || coupon.status === 'expired'"
            @click="handleCouponClick"
            @use="handleUseBalance"
          />
        </div>
      </BaseInfiniteList>

    </div>

    <!-- Standard Modals -->
    
    <!-- 1. Balance Use Confirmation -->
    <BaseConfirmModal
      v-model:visible="showBalanceModal"
      title="确认使用额度券"
      confirm-text="确定兑换"
      :loading="processing"
      @confirm="confirmUseBalance"
      show-mascot
    >
      <div v-if="currentCoupon" class="modal-text">
        确定要将这张面值为 <span class="highlight">{{ currentCoupon.coupon.value }} 点</span> 的额度券兑换到您的账户余额中吗？
        <br/><span class="warning">兑换后优惠券将自动失效。</span>
      </div>
    </BaseConfirmModal>

    <!-- 2. Delete Confirmation -->
    <BaseConfirmModal
      v-model:visible="showDeleteModal"
      title="删除优惠券"
      confirm-text="确认删除"
      confirm-type="danger"
      :loading="processing"
      @confirm="confirmDelete"
      show-mascot
    >
       <div class="modal-text">确定要永久删除这张优惠券记录吗？此操作无法撤销。</div>
    </BaseConfirmModal>

    <!-- 3. Success Result -->
    <BaseResultModal
      v-model:visible="showSuccessModal"
      type="success"
      title="兑换成功"
      :message="successMessage"
      primary-text="太棒了"
      @primary="showSuccessModal = false"
      show-mascot
      mascot-position="bottom"
    />

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useUserStore } from '@/stores/client/user'
import { useRouter } from 'vue-router'
import { couponApi, type UserCoupon } from '@/api/client/coupon'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { ElMessage } from 'element-plus'
import { Ticket } from '@element-plus/icons-vue'

// Import Base Modals
import BaseConfirmModal from '@/components/pc/modal/base/BaseConfirmModal.vue'
import BaseResultModal from '@/components/pc/modal/base/BaseResultModal.vue'

// Import Coupon Components
import CouponBalance from '@/components/pc/exchange/coupon/CouponBalance.vue'
import CouponFlat from '@/components/pc/exchange/coupon/CouponFlat.vue'
import CouponProduct from '@/components/pc/exchange/coupon/CouponProduct.vue'

const userStore = useUserStore()
const router = useRouter()

const couponList = ref<UserCoupon[]>([]) // Raw data
const redeemCode = ref('')
const redeeming = ref(false)
const activeTab = ref('all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'unused', label: '未使用' },
  { key: 'used', label: '已使用' },
  { key: 'expired', label: '已过期' }
]

// === Infinite Scroll Logic (Client Mode) ===

// 1. Computed Filtered Source
const filteredSource = computed(() => {
  const now = new Date()
  let list = couponList.value

  if (activeTab.value === 'used') {
    return list.filter(c => c.status === 'used')
  }
  if (activeTab.value === 'expired') {
    return list.filter(c => c.status === 'expired' || (c.coupon.end_date && new Date(c.coupon.end_date) < now))
  }
  if (activeTab.value === 'unused') {
    return list.filter(c => c.status === 'unused' && (!c.coupon.end_date || new Date(c.coupon.end_date) >= now))
  }
  return list
})

// 2. Composable
const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<UserCoupon>({
    data: filteredSource,
    pageSize: 10
})

const fetchCoupons = async () => {
    loading.value = true
    try {
        const res = await couponApi.getUserCoupons()
        if (res.success && res.data) {
            couponList.value = res.data
        }
    } finally {
        loading.value = false
    }
}
onMounted(fetchCoupons)

const switchTab = (tab: string) => {
    activeTab.value = tab
    // Auto reset by composable
}


// Component Mapping
const getCouponComponent = (type: string) => {
  switch (type) {
    case 'balance': return CouponBalance
    case 'product': return CouponProduct
    case 'flat': return CouponFlat
    default: return CouponFlat // Fallback
  }
}

// === Action Logic ===

const processing = ref(false)
const currentCoupon = ref<UserCoupon | null>(null)

// 1. Redeem Code
const showSuccessModal = ref(false)
const redeemedCouponRaw = ref<{ name: string; type: string; value: number } | null>(null)

const successMessage = computed(() => {
    const c = redeemedCouponRaw.value
    if (!c) return '恭喜您获得一张优惠券！'
    return `恭喜您获得 ${c.name}，包含 ${c.value}点 权益`
})

const redeem = async () => {
  if (!redeemCode.value || redeeming.value) return
  redeeming.value = true
  try {
    const res = await couponApi.redeemCoupon(redeemCode.value)
    if (res.success) {
        redeemedCouponRaw.value = res.data
        showSuccessModal.value = true
        redeemCode.value = ''
        fetchCoupons()
    } else {
        ElMessage.error(res.msg || '兑换失败')
    }
  } finally {
    redeeming.value = false
  }
}

// 2. Use Balance Coupon
const showBalanceModal = ref(false)

const handleUseBalance = (coupon: UserCoupon) => {
    currentCoupon.value = coupon
    showBalanceModal.value = true
}

const confirmUseBalance = async () => {
    if (!currentCoupon.value || processing.value) return
    processing.value = true
    try {
      const res = await couponApi.useBalanceCoupon(currentCoupon.value.id)
      if (res.success) {
          ElMessage.success('金额已成功存入您的钱包')
          showBalanceModal.value = false
          fetchCoupons()
          userStore.fetchUserInfo()
      } else {
          ElMessage.error(res.msg || '操作失败')
      }
    } finally {
      processing.value = false
    }
}

// 3. Delete / Cleanup
const showDeleteModal = ref(false)

const handleCouponClick = (coupon: UserCoupon) => {
  // Only allow interact (delete) if used or expired
  if (coupon.status === 'used' || coupon.status === 'expired' || isExpired(coupon)) {
    currentCoupon.value = coupon
    showDeleteModal.value = true
  }
}

const confirmDelete = async () => {
  if (!currentCoupon.value || processing.value) return
  processing.value = true
    try {
      const res = await couponApi.deleteUserCoupon(currentCoupon.value.id)
      if (res.success) {
          ElMessage.success('删除成功')
          showDeleteModal.value = false
          // Need to update source data to trigger reactive update
          couponList.value = couponList.value.filter(c => c.id !== currentCoupon.value?.id)
      } else {
          ElMessage.error(res.msg || '删除失败')
      }
    } finally {
      processing.value = false
    }
}

// Helpers
const isExpired = (coupon: UserCoupon) => {
  if (!coupon.coupon.end_date) return false
  return new Date(coupon.coupon.end_date) < new Date()
}
</script>

<style scoped>
.exchange-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
}

/* Header */
.section-header {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 20px; font-weight: 700; color: #fff; margin: 0;
}
.section-subtitle {
  font-size: 12px; font-family: 'Outfit', sans-serif; color: #64748B;
  text-transform: uppercase; letter-spacing: 1px;
}

/* Redemption Card */
.redemption-card {
  flex-shrink: 0;
  margin: 24px 32px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 20px;
  overflow: hidden;
}

.redemption-header {
  padding: 20px 24px; display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.redemption-icon { font-size: 24px; color: #F97316; }
.redemption-title { font-size: 16px; font-weight: 600; color: #fff; }

.redemption-body { padding: 24px; }
.input-group { display: flex; gap: 12px; margin-bottom: 12px; }

.redemption-input {
  flex: 1; height: 48px; background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0 20px;
  font-size: 15px; color: #fff; outline: none; transition: all 0.3s;
}
.redemption-input:focus { border-color: #F97316; box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1); }
.redemption-input::placeholder { color: #64748B; }

.redemption-btn {
  height: 48px; padding: 0 32px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border: none; border-radius: 12px; color: #fff; font-size: 15px; font-weight: 600;
  cursor: pointer; transition: all 0.3s; white-space: nowrap;
}
.redemption-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  transform: translateY(-1px); box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}
.redemption-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.redemption-tips { font-size: 12px; color: #64748B; margin: 0; }

/* Tabs */
.coupon-tabs {
  flex-shrink: 0; display: flex; gap: 32px; padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.tab-item {
  padding: 16px 0; color: #94A3B8; cursor: pointer; font-size: 14px; font-weight: 500;
  position: relative; transition: all 0.3s;
}
.tab-item:hover { color: #CBD5E1; }
.tab-item.active { color: #fff; font-weight: 600; }
.active-indicator {
  position: absolute; bottom: 0; left: 0; width: 100%; height: 2px;
  background: #3B82F6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); border-radius: 2px;
}

/* Coupon List */
.coupon-list-container {
  flex: 1; overflow-y: auto; padding: 24px 32px 0; /* Let BaseInfiniteList handle bottom spacing */
  min-height: 0;
}
.coupon-list { display: flex; flex-direction: column; gap: 16px; }

/* Empty State */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 64px 0; color: #64748B;
}
.empty-icon { font-size: 48px; opacity: 0.3; margin-bottom: 16px; }
.empty-text { font-size: 16px; font-weight: 600; color: #94A3B8; margin-bottom: 8px; }
.empty-desc { font-size: 13px; opacity: 0.7; }

/* Modal Text */
.modal-text { font-size: 15px; color: #E2E8F0; line-height: 1.6; }
.highlight { color: #FBBF24; font-weight: 600; }
.warning { color: #F87171; font-size: 13px; margin-top: 8px; display: block; }
</style>