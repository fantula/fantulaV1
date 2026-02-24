<template>
  <div class="order-actions-bar">
    <div class="actions-container">
      
      <!-- Group 1: Support / General -->
      <div class="left-group">
        <!-- Button 1: Contact Service (Mock/External) -->
        <button class="action-btn glow-text pop-in" style="animation-delay: 0ms" @click="handleContactService">
          <span class="icon">💬</span>
          <span class="label">联系客服</span>
        </button>

        <!-- Button 2: Create Ticket (Internal System) -->
        <button class="action-btn glow-text pop-in" style="animation-delay: 50ms" @click="showTicketModal = true">
          <span class="icon">🎫</span>
          <span class="label">申请工单</span>
        </button>
      </div>

      <!-- Group 2: Business Actions (Refund / Renew) -->
      <!-- Only for Virtual & Shared Account types (NOT one_time_cdk) -->
      <div v-if="isVirtualOrShared" class="right-group">
        
        <!-- 退款按钮组 -->
        <!-- 1. 可申请退款 -->
        <button 
          v-if="canRefund" 
          class="action-btn danger-glass pop-in" 
          style="animation-delay: 100ms" 
          @click="handleRefund"
        >
          <span class="icon">💸</span>
          <span class="label">申请退款</span>
        </button>

        <!-- 2. 可取消退款 (有待审核申请) -->
        <button 
          v-else-if="canCancelRefund" 
          class="action-btn warning-glass pop-in" 
          style="animation-delay: 100ms" 
          :disabled="cancellingRefund"
          @click="handleCancelRefund"
        >
          <span class="icon">↩️</span>
          <span class="label">{{ cancellingRefund ? '取消中...' : '取消退款' }}</span>
        </button>

        <!-- 3. 退款次数已达上限 -->
        <button 
          v-else-if="isRefundBlocked" 
          class="action-btn disabled pop-in" 
          style="animation-delay: 100ms" 
          disabled
        >
          <span class="icon">🚫</span>
          <span class="label">退款次数已达上限</span>
        </button>

        <!-- 续费按钮: 仅 active 状态 -->
        <button 
          v-if="canRenew" 
          class="action-btn primary-gradient pop-in" 
          style="animation-delay: 150ms" 
          @click="handleRenew"
        >
          <span class="icon">⚡</span>
          <span class="label">立即续费</span>
        </button>
      </div>

    </div>

    <!-- Renewal Modal -->
    <RenewalModal
      v-model="showRenewalModal"
      :orderId="order?.id || ''"
      @success="handleRenewalSuccess"
    />

    <!-- Refund Modal -->
    <RefundModal
      v-model="showRefundModal"
      :orderId="order?.id || ''"
      :orderNo="order?.order_no || ''"
      @success="handleRefundSuccess"
    />

    <!-- Ticket Apply Modal -->
    <TicketApplyModal 
      v-if="showTicketModal"
      :orderId="order?.id || ''"
      :orderInfo="{ order_no: order?.order_no || '未知', product_name: order?.item?.title || order?.productName || '未知商品' }" 
      @close="showTicketModal = false"
      @success="handleTicketSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import RenewalModal from '@/components/pc/order/RenewalModal.vue'
import RefundModal from '@/components/pc/order/RefundModal.vue'
import TicketApplyModal from '@/components/pc/modal/business/TicketApplyModal.vue'
import { clientOrderApi } from '@/api/client/order'

const props = defineProps<{
  order: any
}>()

const emit = defineEmits(['refresh'])

const router = useRouter()

// Modal state
const showRenewalModal = ref(false)
const showRefundModal = ref(false)
const showTicketModal = ref(false)

// Refund state
const pendingRefundRequest = ref<any>(null)
const refundCancelledCount = ref(0)
const cancellingRefund = ref(false)

// ========================================
// 类型判断
// ========================================

// One-time (one_time_cdk) 不显示退款/续费按钮
const isVirtualOrShared = computed(() => {
  if (!props.order?.orderType) return false
  return ['virtual', 'shared_account'].includes(props.order.orderType)
})

// ========================================
// 退款条件
// ========================================

// 可申请退款: 
// 1. 虚拟/合租类型
// 2. 状态为 pending_delivery 或 active
// 3. 没有待审核退款
// 4. 取消次数未达上限
const canRefund = computed(() => 
  isVirtualOrShared.value &&
  ['pending_delivery', 'active'].includes(props.order?.status) &&
  !pendingRefundRequest.value &&
  refundCancelledCount.value < 3
)

// 可取消退款: 有待审核申请
const canCancelRefund = computed(() =>
  isVirtualOrShared.value &&
  props.order?.status === 'refunding' &&
  !!pendingRefundRequest.value
)

// 退款次数已达上限
const isRefundBlocked = computed(() =>
  isVirtualOrShared.value &&
  ['pending_delivery', 'active'].includes(props.order?.status) &&
  !pendingRefundRequest.value &&
  refundCancelledCount.value >= 3
)

// ========================================
// 续费条件 (仅 active 状态)
// ========================================
const canRenew = computed(() => 
  isVirtualOrShared.value && 
  props.order?.status === 'active'
)

// ========================================
// 加载退款状态
// ========================================
const loadRefundInfo = async () => {
  if (!props.order?.id || !isVirtualOrShared.value) return
  
  try {
    const res = await clientOrderApi.getOrderRefundInfo(props.order.id)
    if (res.success) {
      pendingRefundRequest.value = res.pendingRequest
      refundCancelledCount.value = res.cancelledCount ?? 0
    }
  } catch (e) {
    if (import.meta.dev) console.error('Failed to load refund info:', e)
  }
}

// 监听订单变化
watch(() => props.order?.id, () => {
  loadRefundInfo()
}, { immediate: true })

// ========================================
// Actions
// ========================================
const handleContactService = () => {
  ElMessage.info('客服系统连接中...')
}

const handleRefund = () => {
  showRefundModal.value = true
}

const handleCancelRefund = async () => {
  if (!props.order?.id || cancellingRefund.value) return
  
  cancellingRefund.value = true
  try {
    const res = await clientOrderApi.cancelRefundRequest(props.order.id)
    if (res.success) {
      ElMessage.success('退款申请已取消')
      pendingRefundRequest.value = null
      refundCancelledCount.value++
      emit('refresh') // 通知父组件刷新订单
    } else {
      ElMessage.error(res.error || '取消失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '系统错误')
  } finally {
    cancellingRefund.value = false
  }
}

const handleRefundSuccess = () => {
  loadRefundInfo()
  emit('refresh')
}

const handleRenew = () => {
  showRenewalModal.value = true
}

const handleRenewalSuccess = () => {
  emit('refresh')
}

const handleTicketSuccess = () => {
  ElMessage.success('工单提交成功，请留意"我的工单"')
}
</script>

<style scoped>
.order-actions-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px 24px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: center;
}

.actions-container {
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-group, .right-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.action-btn:active {
  transform: scale(0.96);
}

.action-btn .icon { font-size: 16px; }

/* Pop-In Animation */
@keyframes popIn {
  0% { opacity: 0; transform: translateY(20px) scale(0.8); }
  60% { opacity: 1; transform: translateY(-5px) scale(1.05); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.pop-in {
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

/* Style: Glow Text (Secondary) */
.glow-text {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  border-color: rgba(255, 255, 255, 0.05);
}
.glow-text:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

/* Style: Danger Glass (Refund) */
.danger-glass {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.danger-glass:hover {
  background: rgba(239, 68, 68, 0.2);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

/* Style: Warning Glass (Cancel Refund) */
.warning-glass {
  background: rgba(234, 179, 8, 0.1);
  color: #fbbf24;
  border: 1px solid rgba(234, 179, 8, 0.2);
}
.warning-glass:hover:not(:disabled) {
  background: rgba(234, 179, 8, 0.2);
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.2);
  transform: translateY(-2px);
}
.warning-glass:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Style: Disabled (Refund Blocked) */
.action-btn.disabled {
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
  border: 1px solid rgba(100, 116, 139, 0.2);
  cursor: not-allowed;
}

/* Style: Primary Gradient (Renew) */
.primary-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.primary-gradient:hover {
  filter: brightness(1.1);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
  transform: translateY(-3px);
}
.primary-gradient::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: 0.5s;
}
.primary-gradient:hover::after {
  left: 100%;
}

/* Responsive */
@media (max-width: 640px) {
  .order-actions-bar { padding: 12px 16px; }
  .action-btn { padding: 8px 12px; font-size: 12px; border-radius: 8px; }
  .action-btn .icon { font-size: 14px; }
  .left-group, .right-group { gap: 8px; }
}
</style>
