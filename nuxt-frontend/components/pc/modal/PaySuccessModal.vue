<template>
  <Teleport to="body">
    <div class="modal-mask" @click.self="$emit('close')">
      <div class="pay-success-modal glass-card">
        <div class="success-header">
          <div class="success-circle">
            <div class="success-icon-wrapper">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <div class="success-title">支付成功</div>
          <div class="success-desc">您的订单已确认，感谢您的购买</div>
        </div>
        
        <div class="success-info">
          <div class="info-row">
            <span class="info-label">订单编号</span>
            <span class="info-value info-link">{{ safeOrderId }}</span>
          </div>
          <div class="info-divider"></div>
          <div class="info-row">
            <span class="info-label">支付金额</span>
            <span class="info-value info-amount">¥{{ safeAmount }}</span>
          </div>
          <div class="info-divider"></div>
          <div class="info-row">
            <span class="info-label">支付方式</span>
            <span class="info-value info-paytype">{{ safePayTypeName }}</span>
          </div>
          <div class="info-divider"></div>
          <div class="info-row">
            <span class="info-label">支付时间</span>
            <span class="info-value info-time">{{ safeTime }}</span>
          </div>
        </div>
        
        <!-- New Status Display -->
        <div class="status-box">
          <div class="status-icon">🚀</div>
          <div class="status-text">系统正在为您自动发货，请稍候查看</div>
        </div>
        
        <div class="success-actions">
          <BaseButton themeId="primary-orange" block @click="handleGoToOrders">
            前往查看订单
          </BaseButton>
          <BaseButton themeId="secondary" block @click="handleGoToHome">
            返回首页
          </BaseButton>
        </div>
        
        <div class="success-tip">
          如有任何问题，请联系客服 
          <span class="kefu-phone">在线客服</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const props = defineProps({
  orderId: { 
    type: String, 
    default: 'N/A'
  },
  payType: { 
    type: String, 
    default: 'balance'
  },
  amount: { 
    type: [String, Number], 
    default: 0
  }
})

const emits = defineEmits(['close'])

const safeOrderId = computed(() => {
  return props.orderId || 'N/A'
})

const safeAmount = computed(() => {
  try {
    const num = typeof props.amount === 'string' ? parseFloat(props.amount || '0') : (props.amount || 0)
    return isNaN(num) ? '0.00' : num.toFixed(2)
  } catch {
    return '0.00'
  }
})

const safePayTypeName = computed(() => {
  const typeMap: Record<string, string> = {
    'alipay': '支付宝支付',
    'balance': '余额支付',
    'other': '其他支付'
  }
  return typeMap[props.payType] || '未知支付方式'
})

const safeTime = computed(() => {
  try {
    const now = new Date()
    return now.toLocaleString('zh-CN', { hour12: false })
  } catch {
    return '刚刚'
  }
})

const handleGoToHome = () => {
  emits('close')
  try {
    navigateTo('/')
  } catch (error) {
    window.location.href = '/'
  }
}

const handleGoToOrders = () => {
  emits('close')
  try {
    // Navigate to order list page as requested
    navigateTo('/profile/order')
  } catch (error) {
    window.location.href = '/profile/order'
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 3000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.pay-success-modal {
  width: 420px;
  background: rgba(30, 41, 59, 0.85); /* Glass Dark */
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 32px 32px 32px;
  animation: slideUp 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

/* Add a subtle glow at the top */
.pay-success-modal::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--active-orange), var(--primary-blue));
}

.success-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
}

.success-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--active-orange), #ff9f43);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
  animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.success-icon-wrapper {
  color: #fff;
  animation: checkWiggle 0.8s ease-in-out 0.4s;
}

.success-title {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.success-desc {
  font-size: 14px;
  color: var(--text-sub);
  text-align: center;
}

.success-info {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
}

.info-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.info-label {
  color: var(--text-sub);
}

.info-value {
  color: var(--text-main);
  font-weight: 600;
}

.info-link {
  color: var(--primary-blue);
  font-family: monospace;
}

.info-amount {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

/* Status Box */
.status-box {
  width: 100%;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.status-icon {
  font-size: 20px;
}

.status-text {
  font-size: 13px;
  color: #4ade80; /* Green-400 */
}

/* Actions */
.success-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.success-tip {
  margin-top: 24px;
  font-size: 12px;
  color: var(--text-sub);
  text-align: center;
}

.kefu-phone {
  color: var(--primary-blue);
  cursor: pointer;
  font-weight: 600;
}

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, to { animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
  0% { transform: scale3d(0.3, 0.3, 0.3); opacity: 0; }
  20% { transform: scale3d(1.1, 1.1, 1.1); }
  40% { transform: scale3d(0.9, 0.9, 0.9); }
  60% { transform: scale3d(1.03, 1.03, 1.03); }
  80% { transform: scale3d(0.97, 0.97, 0.97); }
  to { transform: scale3d(1, 1, 1); opacity: 1; }
}
@keyframes checkWiggle {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}
</style>