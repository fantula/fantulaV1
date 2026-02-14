<template>
  <div class="mobile-cdk-list">
    <div v-for="(item, index) in cdkList" :key="item.id || index" class="info-card-glass">
      <div class="cdk-header">
        <span class="cdk-label">卡密 {{ index + 1 }}</span>
        <div class="copy-tag" @click="copyText(item.code)">
           <el-icon><CopyDocument /></el-icon>
        </div>
      </div>
      <div class="cdk-content">
        <div class="code-box">{{ item.code }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CopyDocument } from '@element-plus/icons-vue'
import { useToast } from '@/composables/mobile/useToast'

defineProps<{
  cdkList: any[]
}>()

const { showToast } = useToast()

const copyText = (text: string) => {
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    showToast('已复制', 'success')
  }).catch(() => {
    showToast('复制失败', 'error')
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

.info-card-glass {
    background: #1E293B; /* Slate 800 base */
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; 
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.cdk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cdk-label {
  font-size: 13px;
  color: #94A3B8;
  font-weight: 600;
}

.copy-tag {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #CBD5E1; cursor: pointer;
  transition: all 0.2s;
}
.copy-tag:active { background: rgba(255,255,255,0.2); color: #fff; }
.copy-tag .el-icon { font-size: 14px; }

.cdk-content {
  padding: 16px;
}

.code-box {
  font-family: 'Monaco', monospace;
  font-size: 14px;
  color: #fff;
  word-break: break-all;
  line-height: 1.5;
  background: rgba(0,0,0,0.2);
  padding: 10px; border-radius: 8px;
}
</style>
