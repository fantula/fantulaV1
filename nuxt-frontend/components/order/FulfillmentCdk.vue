<template>
  <div class="glass-card delivery-card">
    <div class="section-title">📦 交付内容</div>

    <div v-if="cdkList.length > 0" class="delivery-list">
       <div v-for="(item, idx) in cdkList" :key="idx" class="delivery-item cdk-item">
         <div class="kv-row">
           <span class="k-label">激活码</span>
           <span class="v-code">{{ item.code }}</span>
           <span class="copy-btn-simple" @click="copyText(item.code)">复制</span>
         </div>
       </div>
    </div>
    <div v-else class="empty-state">
      暂无详细交付信息
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

interface CdkItem {
  id: string
  code: string
  parsed: any
  accountData: any
}

defineProps<{
  cdkList: CdkItem[]
}>()

const copyText = (t: string) => {
  navigator.clipboard.writeText(t).then(() => ElMessage.success('已复制'))
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.section-title { padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 600; font-size: 15px; background: rgba(0,0,0,0.2); }
.delivery-list { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
.delivery-item { padding: 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }

.cdk-item .kv-row { display: flex; align-items: center; justify-content: space-between; }
.k-label { color: #94a3b8; }
.v-code { font-family: monospace; font-size: 16px; font-weight: 600; color: #e2e8f0; letter-spacing: 1px; }
.copy-btn-simple { padding: 4px 12px; background: rgba(59,130,246,0.1); color: #60a5fa; border-radius: 20px; font-size: 12px; cursor: pointer; }

.empty-state { text-align: center; padding: 20px; color: #64748b; }
</style>
