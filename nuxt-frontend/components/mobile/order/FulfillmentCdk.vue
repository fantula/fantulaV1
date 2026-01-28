<template>
  <div class="mobile-cdk-list">
    <div v-for="(item, index) in cdkList" :key="item.id || index" class="cdk-item">
      <div class="cdk-header">
        <span class="cdk-label">卡密 {{ index + 1 }}</span>
        <button class="copy-btn" @click="copyText(item.code)">
           <el-icon><CopyDocument /></el-icon> 复制
        </button>
      </div>
      <div class="cdk-content">
        <div class="code-box">{{ item.code }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'

defineProps<{
  cdkList: any[]
}>()

const copyText = (text: string) => {
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('已复制')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}
</script>

<style scoped>
.mobile-cdk-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.cdk-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

.cdk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cdk-label {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 600;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 11px;
  color: #3B82F6;
  padding: 0;
}

.cdk-content {
  padding: 12px;
}

.code-box {
  font-family: 'Monaco', monospace;
  font-size: 13px;
  color: #fff;
  word-break: break-all;
  line-height: 1.4;
}
</style>
