<template>
  <div class="fulfillment-expired">
    <div class="expired-content">
      <div class="expired-icon-wrapper">
        <div class="clock-icon">⌛</div>
      </div>
      
      <h3 class="expired-title">订单及服务已过期</h3>
      
      <div class="expired-reason">
        <span class="reason-label">过期原因：</span>
        <span class="reason-text">{{ reason || '服务已到期，系统已自动释放相关资源。' }}</span>
      </div>

      <div class="security-notice">
        为了保护您的隐私，所有历史敏感信息（如账号密码、兑换码等）在过期后已自动抹除。
      </div>

      <div class="expired-actions">
        <button class="buy-again-btn" @click="$emit('buyAgain')">再次购买</button>
        <button class="support-btn" @click="$emit('contactSupport')">联系客服</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  reason?: string;
}>()

defineEmits(['buyAgain', 'contactSupport'])
</script>

<style scoped>
.fulfillment-expired {
  background: #fff;
  border-radius: 16px;
  padding: 48px 24px;
  text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.fulfillment-expired::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: #94a3b8;
}

.expired-icon-wrapper {
  width: 80px;
  height: 80px;
  background: #f8fafc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  border: 2px solid #e2e8f0;
}

.expired-title {
  font-size: 22px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 16px;
}

.expired-reason {
  background: #f1f5f9;
  padding: 16px 20px;
  border-radius: 12px;
  display: inline-block;
  max-width: 100%;
  margin-bottom: 24px;
  font-size: 14px;
}

.reason-label {
  color: #64748b;
  font-weight: 600;
}

.reason-text {
  color: #334155;
}

.security-notice {
  font-size: 13px;
  color: #94a3b8;
  max-width: 400px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.expired-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.buy-again-btn {
  background: #2563eb;
  color: #fff;
  padding: 12px 32px;
  border-radius: 24px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.buy-again-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.support-btn {
  background: #fff;
  color: #64748b;
  padding: 12px 32px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.support-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}
</style>
