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
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <div class="active-indicator" v-if="activeTab === tab.key"></div>
      </div>
    </div>

    <!-- Coupon List (Scrollable Area) -->
    <div class="coupon-list-container">
      <div class="coupon-list">
        <!-- Empty State -->
        <div v-if="filteredCoupons.length === 0" class="empty-state">
          <el-icon class="empty-icon"><TicketExpired /></el-icon>
          <div class="empty-text">暂无优惠券</div>
          <div class="empty-desc">快去兑换或参与活动获取吧~</div>
        </div>

        <!-- Coupon Cards -->
        <div 
          v-for="coupon in filteredCoupons" 
          :key="coupon.id" 
          :class="['coupon-ticket', getCouponClass(coupon)]"
          @click="handleCouponClick(coupon)"
        >
          <!-- Left: Value Section -->
          <div class="ticket-left">
            <div class="ticket-value">
              <span class="value-amount">{{ coupon.coupon.value }}</span>
              <span class="value-unit">点</span>
            </div>
            <div class="ticket-type">{{ getCouponTypeLabel(coupon.coupon.type) }}</div>
          </div>

          <!-- Right: Info Section -->
          <div class="ticket-right">
            <div class="ticket-name">{{ coupon.coupon.name }}</div>
            <div class="ticket-condition">
              <template v-if="coupon.coupon.type === 'flat'">满 {{ coupon.coupon.min_usage }} 点可用</template>
              <template v-else-if="coupon.coupon.type === 'balance'">存入余额，无门槛使用</template>
              <template v-else-if="coupon.coupon.type === 'product'">指定商品专用</template>
            </div>
            <div class="ticket-expiry">
              <el-icon><Clock /></el-icon>
              {{ coupon.coupon.end_date ? `有效期 ${formatDate(coupon.coupon.end_date)}` : '永久有效' }}
            </div>
          </div>

          <!-- Action Button (Only for Unused) -->
          <div class="ticket-action">
            <template v-if="coupon.status === 'unused' && !isExpired(coupon)">
              <button class="action-btn use-btn" @click.stop="handleUseCoupon(coupon)">
                {{ coupon.coupon.type === 'balance' ? '立即使用' : '去使用' }}
              </button>
            </template>
            <div v-else-if="coupon.status === 'used'" class="status-badge used">已使用</div>
            <div v-else class="status-badge expired">已过期</div>
          </div>

          <!-- Decorative Punch Holes -->
          <div class="punch-hole top"></div>
          <div class="punch-hole bottom"></div>
        </div>
      </div>
    </div>

    <!-- Balance Coupon Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="glass-modal-mask" @click.self="showModal = false">
        <div class="glass-modal">
          <div class="modal-icon">
            <el-icon v-if="modalType === 'balance'"><Wallet /></el-icon>
            <el-icon v-else-if="modalType === 'redeem_success'"><Check /></el-icon>
            <el-icon v-else><Delete /></el-icon>
          </div>
          
          <div class="modal-title">{{ modalTitle }}</div>
          
          <div class="modal-content" v-html="modalContent"></div>
          
          <div class="modal-actions">
            <button class="glass-btn-cancel" @click="showModal = false" v-if="modalType !== 'redeem_success'">取消</button>
            
            <button 
              v-if="modalType === 'balance'"
              class="glass-btn-confirm" 
              @click="confirmUseBalance" 
              :disabled="processing"
            >
              {{ processing ? '处理中...' : '确定兑换' }}
            </button>

            <button 
              v-else-if="modalType === 'delete'"
              class="glass-btn-confirm delete" 
              @click="confirmDelete" 
              :disabled="processing"
            >
               {{ processing ? '删除中...' : '确认删除' }}
            </button>
            
            <button 
              v-else-if="modalType === 'redeem_success'"
              class="glass-btn-confirm" 
              @click="showModal = false"
            >
               太棒了
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { couponApi, type UserCoupon } from '@/api/coupon'
import { ElMessage } from 'element-plus'
import { Ticket, Clock, Wallet, Delete, Check } from '@element-plus/icons-vue'

// Fake icon for empty state
const TicketExpired = Ticket

const userStore = useUserStore()
const router = useRouter()

const couponList = ref<UserCoupon[]>([])
const redeemCode = ref('')
const redeeming = ref(false)
const activeTab = ref('all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'unused', label: '未使用' },
  { key: 'used', label: '已使用' },
  { key: 'expired', label: '已过期' }
]

const fetchCoupons = async () => {
    const res = await couponApi.getUserCoupons()
    if (res.success && res.data) {
        couponList.value = res.data
    }
}
onMounted(fetchCoupons)

const redeem = async () => {
  if (!redeemCode.value || redeeming.value) return
  redeeming.value = true
  try {
    const res = await couponApi.redeemCoupon(redeemCode.value)
    if (res.success) {
        // Show success modal
        redeemedCouponRaw.value = res.data
        modalType.value = 'redeem_success'
        showModal.value = true
        
        redeemCode.value = ''
        fetchCoupons()
    } else {
        ElMessage.error(res.msg || '兑换失败')
    }
  } finally {
    redeeming.value = false
  }
}

const filteredCoupons = computed(() => {
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

// Modal Logic
const showModal = ref(false)
const processing = ref(false)
const modalType = ref<'balance' | 'delete' | 'redeem_success'>('balance')
const currentCoupon = ref<UserCoupon | null>(null)
// For redeem success display
const redeemedCouponRaw = ref<{ name: string; type: string; value: number } | null>(null)

const modalTitle = computed(() => {
  if (modalType.value === 'balance') return '确认使用额度券'
  if (modalType.value === 'delete') return '删除优惠券'
  if (modalType.value === 'redeem_success') return '兑换成功'
  return ''
})

const modalContent = computed(() => {
  if (modalType.value === 'balance') {
    return `确定要将这张面值为 <span class="highlight">${currentCoupon.value?.coupon.value} 点</span> 的额度券兑换到您的账户余额中吗？<br/><span class="warning">兑换后优惠券将自动失效。</span>`
  } else if (modalType.value === 'delete') {
    return `确定要永久删除这张优惠券记录吗？此操作无法撤销。`
  } else if (modalType.value === 'redeem_success') {
    const c = redeemedCouponRaw.value
    if (!c) return '恭喜您获得一张优惠券！'
    return `恭喜您获得 <span class="highlight">${c.name}</span><br/>包含 <span class="highlight">${c.value}点</span> 权益`
  }
  return ''
})

// Click handlers
const handleUseCoupon = (coupon: UserCoupon) => {
    if (coupon.coupon.type === 'balance') {
        currentCoupon.value = coupon
        modalType.value = 'balance'
        showModal.value = true
    } else {
        goToGoods()
    }
}

const handleCouponClick = (coupon: UserCoupon) => {
  if (coupon.status === 'used' || coupon.status === 'expired' || isExpired(coupon)) {
    currentCoupon.value = coupon
    modalType.value = 'delete'
    showModal.value = true
  }
}

const confirmUseBalance = async () => {
    if (!currentCoupon.value || processing.value) return
    processing.value = true
    try {
      const res = await couponApi.useBalanceCoupon(currentCoupon.value.id)
      if (res.success) {
          ElMessage.success('金额已成功存入您的钱包')
          showModal.value = false
          fetchCoupons()
          userStore.getUserInfo()
      } else {
          ElMessage.error(res.msg || '操作失败')
      }
    } finally {
      processing.value = false
    }
}

const confirmDelete = async () => {
  if (!currentCoupon.value || processing.value) return
  processing.value = true
    try {
      const res = await couponApi.deleteUserCoupon(currentCoupon.value.id)
      if (res.success) {
          ElMessage.success('删除成功')
          showModal.value = false
          fetchCoupons()
      } else {
          ElMessage.error(res.msg || '删除失败')
      }
    } finally {
      processing.value = false
    }
}

const goToGoods = () => {
  router.push('/')
}

// Helpers
const getCouponClass = (coupon: UserCoupon) => {
  if (coupon.status === 'used') return 'used'
  if (coupon.status === 'expired' || isExpired(coupon)) return 'expired'
  
  if (coupon.coupon.type === 'flat') return 'type-flat' // Purple
  if (coupon.coupon.type === 'balance') return 'type-balance' // Gold
  if (coupon.coupon.type === 'product') return 'type-product' // Cyan
  
  return 'type-flat'
}

const getCouponTypeLabel = (type: string) => {
  const map: Record<string, string> = {
    'flat': '立减券',
    'balance': '额度券',
    'product': '指定商品券'
  }
  return map[type] || '优惠券'
}

const isExpired = (coupon: UserCoupon) => {
  if (!coupon.coupon.end_date) return false
  return new Date(coupon.coupon.end_date) < new Date()
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.exchange-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden; /* Prevent body scroll */
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
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-subtitle {
  font-size: 12px;
  font-family: 'Outfit', sans-serif;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.redemption-icon {
  font-size: 24px;
  color: #F97316;
}

.redemption-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.redemption-body {
  padding: 24px;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.redemption-input {
  flex: 1;
  height: 48px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0 20px;
  font-size: 15px;
  color: #fff;
  outline: none;
  transition: all 0.3s;
}

.redemption-input::placeholder {
  color: #64748B;
}

.redemption-input:focus {
  border-color: #F97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

.redemption-btn {
  height: 48px;
  padding: 0 32px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.redemption-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.redemption-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.redemption-tips {
  font-size: 12px;
  color: #64748B;
  margin: 0;
}

/* Tabs */
.coupon-tabs {
  flex-shrink: 0;
  display: flex;
  gap: 32px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-item {
  padding: 16px 0;
  color: #94A3B8;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  transition: all 0.3s;
}

.tab-item:hover {
  color: #CBD5E1;
}

.tab-item.active {
  color: #fff;
  font-weight: 600;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3B82F6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  border-radius: 2px;
}

/* Coupon List Container (Scrollable) */
.coupon-list-container {
  flex: 1;
  overflow-y: auto; /* Enable scrolling here */
  padding: 24px 32px 64px 32px; /* Pad bottom for scroll */
  min-height: 0; /* Important for flex child scrolling */
}

.coupon-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Coupon Ticket - Shared Base */
.coupon-ticket {
  position: relative;
  display: flex;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: default;
}

.coupon-ticket:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.coupon-ticket.used, .coupon-ticket.expired {
    cursor: pointer; /* Clickable for delete */
}

/* === Color Logic === */

/* 1. Flat Discount (Neon Purple) - LiJianQuan */
.coupon-ticket.type-flat {
  background: linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-color: rgba(217, 70, 239, 0.2);
}
.coupon-ticket.type-flat:hover {
  border-color: rgba(217, 70, 239, 0.4);
  box-shadow: 0 8px 24px rgba(217, 70, 239, 0.15);
}
.coupon-ticket.type-flat .value-symbol,
.coupon-ticket.type-flat .value-amount { color: #E879F9; }


/* 2. Balance (Cyber Gold) - EQuQuan */
.coupon-ticket.type-balance {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(251, 191, 36, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}
.coupon-ticket.type-balance:hover {
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.15);
}
.coupon-ticket.type-balance .value-symbol,
.coupon-ticket.type-balance .value-amount { color: #FBBF24; }


/* 3. Product (Cyan Blue) - Specified Product */
.coupon-ticket.type-product {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(34, 211, 238, 0.05) 100%);
  border-color: rgba(6, 182, 212, 0.2);
}
.coupon-ticket.type-product:hover {
  border-color: rgba(6, 182, 212, 0.4);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.15);
}
.coupon-ticket.type-product .value-symbol,
.coupon-ticket.type-product .value-amount { color: #22D3EE; }


/* Used/Expired */
.coupon-ticket.used,
.coupon-ticket.expired {
  opacity: 0.5;
  filter: grayscale(0.8);
  border-color: rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.02);
}
.coupon-ticket.used .value-amount, .coupon-ticket.expired .value-amount { color: #64748B; }

.coupon-ticket.used:hover,
.coupon-ticket.expired:hover {
  transform: none;
  box-shadow: none;
  filter: grayscale(0); /* Reveal color on hover slightly for interaction */
  opacity: 0.8;
  border-color: #EF4444; /* Hint delete */
}


/* Ticket Left */
.ticket-left {
  width: 140px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px dashed rgba(255, 255, 255, 0.1);
  position: relative;
}

.ticket-value {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.value-amount {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  color: #fff;
}

.value-unit {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    margin-left: 2px;
}

.ticket-type {
  font-size: 12px;
  color: #94A3B8;
  margin-top: 4px;
}

/* Ticket Right */
.ticket-right {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.ticket-name {
  font-size: 15px;
  font-weight: 600;
  color: #E2E8F0;
}

.ticket-condition {
  font-size: 12px;
  color: #94A3B8;
}

.ticket-expiry {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748B;
}

/* Ticket Action */
.ticket-action {
  padding: 16px 20px;
  display: flex;
  align-items: center;
}

.action-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.action-btn.use-btn {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #fff;
}

.action-btn.use-btn:hover {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.status-badge {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.used {
  background: rgba(148, 163, 184, 0.1);
  color: #94A3B8;
}

.status-badge.expired {
  background: rgba(239, 68, 68, 0.1);
  color: #F87171;
}

/* Punch Holes */
.punch-hole {
  position: absolute;
  left: 140px;
  width: 12px;
  height: 12px;
  background: #0F172A;
  border-radius: 50%;
  transform: translateX(-50%);
}

.punch-hole.top {
  top: -6px;
}

.punch-hole.bottom {
  bottom: -6px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  color: #64748B;
}

.empty-icon {
  font-size: 48px;
  opacity: 0.3;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: #94A3B8;
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 13px;
  opacity: 0.7;
}

/* Glass Modal */
.glass-modal-mask {
  position: fixed;
  z-index: 3100;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;
}

.glass-modal {
  width: 360px;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.modal-icon .el-icon {
  font-size: 28px;
  color: #F97316;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.modal-content {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.modal-content .highlight {
  color: #F97316;
  font-weight: 700;
}

.modal-content .warning {
  color: #64748B;
  font-size: 12px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.glass-btn-cancel,
.glass-btn-confirm {
  flex: 1;
  padding: 12px 0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.glass-btn-cancel {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
}

.glass-btn-cancel:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.glass-btn-confirm {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #fff;
}

.glass-btn-confirm:hover:not(:disabled) {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.glass-btn-confirm.delete {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}
.glass-btn-confirm.delete:hover:not(:disabled) {
  background: linear-gradient(135deg, #F87171 0%, #EF4444 100%);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.glass-btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scrollbar styling for Webkit */
.coupon-list-container::-webkit-scrollbar {
  width: 6px;
}
.coupon-list-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.coupon-list-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
.coupon-list-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>