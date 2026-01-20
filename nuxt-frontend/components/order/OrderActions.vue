<template>
  <div class="order-actions">
    <!-- 次要按钮组 -->
    <div class="action-group secondary">
      <button class="action-btn secondary" @click="handleContact">
        <span class="icon">🎧</span>
        <span class="text">联系客服</span>
      </button>
      <button class="action-btn secondary" @click="handleTicket">
        <span class="icon">🎫</span>
        <span class="text">申请工单</span>
      </button>
    </div>

    <!-- 主要按钮组 -->
    <div class="action-group primary">
      <!-- 申请退款 (仅限 Virtual/Shared + 非 pending) -->
      <button 
        v-if="canRefund" 
        class="action-btn danger-text"
        @click="handleRefund"
      >
        申请退款
      </button>

      <!-- 立即续费 (仅限 Virtual/Shared + active/expired) -->
      <button 
        v-if="canRenew" 
        class="action-btn primary"
        @click="handleRenew"
      >
        立即续费
      </button>
    </div>

    <!-- Renewal Modal -->
    <RenewalModal
      v-model="showRenewalModal"
      :orderId="order?.id || ''"
      @success="handleRenewalSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import RenewalModal from '@/components/order/RenewalModal.vue'

const props = defineProps<{
  order: any
}>()

const router = useRouter()

// Modal state
const showRenewalModal = ref(false)

const isVirtualOrShared = computed(() => 
  ['virtual', 'shared_account'].includes(props.order?.orderType)
)

// 退款条件: 虚拟/合租 + 待发货或使用中
const canRefund = computed(() => 
  isVirtualOrShared.value && 
  ['pending_delivery', 'active'].includes(props.order?.status)
)

// 续费条件: 虚拟/合租 + 仅使用中 (已过期不能续费，资源已释放)
const canRenew = computed(() => 
  isVirtualOrShared.value && 
  props.order?.status === 'active'
)

// Actions
const handleContact = () => {
  ElMessage.info('客服系统接入中...')
}

const handleTicket = () => {
  router.push('/support/ticket/create?orderId=' + props.order?.id)
}

const handleRefund = () => {
  router.push('/support/refund/create?orderId=' + props.order?.id)
}

const handleRenew = () => {
  showRenewalModal.value = true
}

const handleRenewalSuccess = (newOrderId: string) => {
  // Already handled in RenewalModal (redirects to new order)
}
</script>

<style scoped>
.order-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px; /* 限制最大宽度，适配 PC */
  margin: 0 auto; /* 居中 */
}

.action-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

/* Secondary Button */
.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  border-color: rgba(255, 255, 255, 0.05);
}
.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

/* Primary Button */
.action-btn.primary {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.action-btn.primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

/* Danger Text Button */
.action-btn.danger-text {
  background: transparent;
  color: #ef4444;
  padding: 8px 12px;
}
.action-btn.danger-text:hover {
  background: rgba(239, 68, 68, 0.1);
}

/* Responsive adjust for mobile */
@media (max-width: 640px) {
  .order-actions {
    padding: 12px 16px;
  }
  .action-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
  .action-btn .icon {
    font-size: 16px;
  }
}
</style>
