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
      <!-- Only for Virtual & Shared Account types -->
      <div v-if="isVirtualOrShared" class="right-group">
        
        <!-- Button 3: Request Refund -->
        <button 
          v-if="canRefund" 
          class="action-btn danger-glass pop-in" 
          style="animation-delay: 100ms" 
          @click="handleRefund"
        >
          <span class="icon">💸</span>
          <span class="label">申请退款</span>
        </button>

        <!-- Button 4: Renew Now -->
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import RenewalModal from '@/components/order/RenewalModal.vue'
import TicketApplyModal from '@/components/TicketApplyModal.vue'

const props = defineProps<{
  order: any
}>()

const router = useRouter()

// Modal state
const showRenewalModal = ref(false)
const showTicketModal = ref(false)

// Logic: Refund/Renew ONLY for 'virtual' (虚拟充值) and 'shared_account' (账号合租)
const isVirtualOrShared = computed(() => {
  if (!props.order?.orderType) return false
  return ['virtual', 'shared_account'].includes(props.order.orderType)
})

// Condition: Refund
// Allowed if order is pending delivery or active (service running)
const canRefund = computed(() => 
  ['pending_delivery', 'active'].includes(props.order?.status)
)

// 续费条件: 虚拟/合租 + (使用中 OR 已过期)
// 允许过期后续费是常见需求
const canRenew = computed(() => 
  isVirtualOrShared.value && 
  ['active', 'expired', 'completed'].includes(props.order?.status)
)

// Actions
const handleContactService = () => {
    // Placeholder or redirect to a help page
    ElMessage.info('客服系统连接中...')
}

const handleRefund = () => {
  router.push('/support/refund/create?orderId=' + props.order?.id)
}

const handleRenew = () => {
  showRenewalModal.value = true
}

const handleRenewalSuccess = () => {
  // Handled
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
  background: rgba(15, 23, 42, 0.85); /* Semi-transparent dark bg */
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

/* 1. Pop-In Animation */
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

/* Style: Primary Gradient (Renew - The specialized 'Renew Now' button) */
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
