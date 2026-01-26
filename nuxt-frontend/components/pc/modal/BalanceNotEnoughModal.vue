<template>
  <div class="modal-mask">
    <div class="balance-modal">
      <div class="modal-header">
        <div class="title">余额不足</div>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="modal-content">
        <div class="icon-area">
          <el-icon :size="48" color="#F56C6C"><Warning /></el-icon>
        </div>
        <p class="message">当前余额不足以支付订单</p>
        <div class="info-row">
          <span>当前余额：</span>
          <span class="amount">¥{{ balance.toFixed(2) }}</span>
        </div>
        <div class="info-row">
          <span>需要支付：</span>
          <span class="amount highlight">¥{{ needAmount.toFixed(2) }}</span>
        </div>
        <div class="info-row">
          <span>还需充值：</span>
          <span class="amount">¥{{ (needAmount - balance).toFixed(2) }}</span>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="$emit('close')">取消</button>
        <button class="btn-confirm" @click="handleRecharge">立即充值</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue'

const props = defineProps<{
  balance: number
  needAmount: number
}>()

const emit = defineEmits(['close'])

const handleRecharge = () => {
  navigateTo('/profile/wallet') // Assuming wallet page exists
  emit('close')
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2100;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.balance-modal {
  width: 360px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}
.modal-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-area {
  margin-bottom: 16px;
}
.message {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}
.info-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}
.amount {
  font-family: monospace;
  font-weight: 600;
}
.highlight {
  color: #F56C6C;
}
.modal-footer {
  padding: 16px 20px;
  background: #f9f9f9;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-cancel {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  color: #606266;
}
.btn-confirm {
  padding: 8px 16px;
  border: none;
  background: #F56C6C;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
}
</style>
