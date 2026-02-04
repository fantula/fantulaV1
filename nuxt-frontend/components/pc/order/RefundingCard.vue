<template>
  <div class="refunding-card">
    <div class="refunding-header">
      <div class="icon-wrapper">
        <el-icon class="spin"><Loading /></el-icon>
      </div>
      <div class="header-text">
        <h3 class="title">退款审核中</h3>
        <p class="subtitle">您的退款申请已提交，正在等待人工审核</p>
      </div>
    </div>

    <div class="refunding-body">
      <div class="info-grid">
        <div class="info-item">
          <span class="label">申请时间</span>
          <span class="value">{{ formatDate(refundRequest?.created_at) }}</span>
        </div>
        <div class="info-item">
          <span class="label">退款原因</span>
          <span class="value reason">{{ refundRequest?.reason || '未填写' }}</span>
        </div>
      </div>

      <div class="notice-box">
        <el-icon><InfoFilled /></el-icon>
        <div class="notice-text">
          <p>审核期间商品服务暂时冻结，您可以：</p>
          <ul>
            <li>耐心等待审核结果（通常1-3个工作日）</li>
            <li>如需恢复使用，可点击顶部"取消退款"按钮</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="refunding-footer">
      <el-icon><Headset /></el-icon>
      <span>如有疑问，请联系客服</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading, InfoFilled, Headset } from '@element-plus/icons-vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

defineProps<{
  refundRequest?: {
    id: string
    reason: string
    created_at: string
  } | null
}>()

const { formatDate } = useBizFormat()
</script>

<style scoped>
.refunding-card {
  background: linear-gradient(145deg, rgba(168, 85, 247, 0.08), rgba(139, 92, 246, 0.04));
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 16px;
  overflow: hidden;
}

.refunding-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%);
  border-bottom: 1px solid rgba(168, 85, 247, 0.15);
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(168, 85, 247, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #A855F7;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.spin {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.header-text .title {
  font-size: 18px;
  font-weight: 700;
  color: #E9D5FF;
  margin: 0 0 4px 0;
}
.header-text .subtitle {
  font-size: 13px;
  color: #A78BFA;
  margin: 0;
}

.refunding-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-item .label {
  font-size: 12px;
  color: #94A3B8;
}
.info-item .value {
  font-size: 14px;
  color: #E2E8F0;
  font-weight: 500;
}
.info-item .value.reason {
  color: #C4B5FD;
}

.notice-box {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 12px;
}
.notice-box > .el-icon {
  font-size: 20px;
  color: #60A5FA;
  flex-shrink: 0;
  margin-top: 2px;
}
.notice-text {
  flex: 1;
}
.notice-text p {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #93C5FD;
}
.notice-text ul {
  margin: 0;
  padding-left: 18px;
}
.notice-text li {
  font-size: 12px;
  color: #94A3B8;
  line-height: 1.6;
}

.refunding-footer {
  padding: 14px 24px;
  background: rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: #64748B;
}
.refunding-footer .el-icon {
  font-size: 16px;
}
</style>
