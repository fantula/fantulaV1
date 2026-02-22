<template>
  <div class="exchange-section">
    <!-- Header -->
    <div class="section-header">
      <h2 class="section-title">兑换中心</h2>
      <div class="section-subtitle">Digital Vault</div>
    </div>

    <!-- Redemption Area (Extracted) -->
    <RedemptionCard @redeemed="onCouponRedeemed" />

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
        <!-- 1. Skeleton Loading State -->
        <div v-if="loading && displayList.length === 0" class="coupon-list">
          <div v-for="i in 3" :key="i" style="padding: 24px; background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; display: flex; gap: 24px;">
             <el-skeleton animated style="width: 100%">
               <template #template>
                 <div style="display: flex; gap: 24px; align-items: center;">
                    <!-- Left: Ticket Stub -->
                    <el-skeleton-item variant="rect" style="width: 140px; height: 100px; border-radius: 12px;" />
                    <!-- Right: Info -->
                    <div style="flex: 1">
                       <el-skeleton-item variant="h3" style="width: 40%; margin-bottom: 16px;" />
                       <el-skeleton-item variant="text" style="width: 70%; margin-bottom: 12px;" />
                       <el-skeleton-item variant="text" style="width: 30%;" />
                    </div>
                    <!-- Action -->
                    <div style="width: 100px; display: flex; justify-content: flex-end;">
                       <el-skeleton-item variant="button" style="width: 88px; height: 40px; border-radius: 20px;" />
                    </div>
                 </div>
               </template>
             </el-skeleton>
          </div>
        </div>

        <!-- 2. Empty State -->
        <div v-else-if="displayList.length === 0" class="empty-state">
          <el-icon class="empty-icon"><Ticket /></el-icon>
          <div class="empty-text">暂无优惠券</div>
          <div class="empty-desc">快去兑换或参与活动获取吧~</div>
        </div>

        <!-- 3. Coupon Cards -->
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
// Lazy load Redemption Widget
const RedemptionCard = defineAsyncComponent(() => import('@/components/pc/exchange/RedemptionCard.vue'))

// Import Coupon Components (Lazy load if list is long, but these are small functional components)
// For list items, async component might cause flicker on scroll if not preloaded. 
// Given the use in v-for with dynamic :is, let's keep them imported or use Async with loading stub if heavy.
// Since they are small, standard import might be better for list smoothness, BUT we can async them to reduce initial bundle.
// Let's safe optimization: Async.
const CouponBalance = defineAsyncComponent(() => import('@/components/pc/exchange/coupon/CouponBalance.vue'))
const CouponFlat = defineAsyncComponent(() => import('@/components/pc/exchange/coupon/CouponFlat.vue'))
const CouponProduct = defineAsyncComponent(() => import('@/components/pc/exchange/coupon/CouponProduct.vue'))

const userStore = useUserStore()
const router = useRouter()

const couponList = ref<UserCoupon[]>([]) // Raw data
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

const onCouponRedeemed = (data: any) => {
    redeemedCouponRaw.value = data
    showSuccessModal.value = true
    fetchCoupons()
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
  flex: 1; min-height: 0; width: 100%;
  display: flex;
  flex-direction: column;
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
  flex: 1; overflow-y: auto; padding: 24px 32px 32px 32px;
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