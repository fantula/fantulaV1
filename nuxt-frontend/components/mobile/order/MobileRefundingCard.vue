<template>
  <div class="refunding-card">
    <div class="card-header">
      <div class="icon-wrapper">
        <el-icon class="spinning"><Loading /></el-icon>
      </div>
      <div class="title">退款处理中</div>
    </div>
    
    <div class="card-body">
      <div class="info-row">
        <span class="label">申请时间</span>
        <span class="value">{{ formatDate(refundRequest?.created_at) }}</span>
      </div>
      <div class="info-row">
        <span class="label">退款原因</span>
        <span class="value">{{ refundRequest?.reason || '--' }}</span>
      </div>
      <div v-if="refundRequest?.reason_detail" class="info-row">
        <span class="label">详细说明</span>
        <span class="value">{{ refundRequest?.reason_detail }}</span>
      </div>
    </div>
    
    <div class="card-tip">
      <el-icon><InfoFilled /></el-icon>
      <span>您的退款申请正在审核中，请耐心等待。如需取消，可点击上方"取消退款"按钮。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading, InfoFilled } from '@element-plus/icons-vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

defineProps<{
  refundRequest?: {
    id: string
    reason: string
    reason_detail?: string
    created_at: string
  } | null
}>()

const { formatDate } = useBizFormat()
</script>

<style scoped>
.refunding-card {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin: 0 16px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F59E0B;
  font-size: 18px;
}

.spinning {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #FCD34D;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 13px;
}

.info-row .label {
  color: #94A3B8;
  flex-shrink: 0;
}

.info-row .value {
  color: #E2E8F0;
  text-align: right;
  max-width: 60%;
  word-break: break-all;
}

.card-tip {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: #F59E0B;
  line-height: 1.5;
}

.card-tip .el-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
</style>
