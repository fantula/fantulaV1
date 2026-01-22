<template>
  <BaseModal
    :visible="true"
    title="联系客服"
    width="400px"
    :show-footer="false"
    show-mascot
    @close="$emit('close')"
  >
    <div class="contact-content">
      <div class="icon-wrapper">
        <span class="service-icon">🎧</span>
      </div>
      <p class="desc">您可以直接联系我们的在线客服，或拨打下方的服务热线</p>
      
      <div class="contact-card">
        <div class="card-label">服务热线</div>
        <div class="card-value">400-123-4567</div>
      </div>
      
      <div class="contact-card">
        <div class="card-label">在线时间</div>
        <div class="card-value">09:00 - 22:00 (每日)</div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
defineEmits(['close'])
</script>

<style scoped>
.contact-content {
  padding: 10px 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
  margin-bottom: 8px;
}

.service-icon {
  font-size: 32px;
}

.desc {
  font-size: 14px;
  color: #94A3B8;
  text-align: center;
  line-height: 1.5;
  margin: 0;
  max-width: 80%;
}

.contact-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.contact-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.card-label {
  font-size: 13px;
  color: #64748B;
}

.card-value {
  font-size: 16px;
  font-weight: 700;
  color: #E2E8F0;
  font-family: monospace;
}
</style>