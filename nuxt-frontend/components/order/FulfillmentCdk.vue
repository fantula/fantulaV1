<template>
  <div class="gift-card-container">
    <div v-if="cdkList.length > 0" class="gift-cards-wrapper">
       <div v-for="(item, idx) in cdkList" :key="idx" class="gift-card-item">
         
         <!-- Decorative Header / Brand Strip -->
         <div class="card-strip">
            <span class="strip-text">DIGITAL VOUCHER</span>
            <div class="strip-decoration"></div>
         </div>

         <!-- Main Content -->
         <div class="card-content">
            <div class="code-label">兑换码 / REDEEM CODE</div>
            
            <div class="code-display-row">
               <span class="the-code">{{ item.code }}</span>
            </div>

            <div class="action-row">
               <button class="copy-pill-btn" @click="copyText(item.code)">
                  <el-icon><CopyDocument /></el-icon> 复制卡密
               </button>
            </div>
         </div>

         <!-- Visual Shine Effect -->
         <div class="shine-effect"></div>
       </div>
    </div>
    <div v-else class="empty-state">
      暂无详细交付信息
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'

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
.gift-card-container {
  margin-top: 16px;
  display: flex; flex-direction: column; gap: 16px;
}

.gift-card-item {
  position: relative;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.gift-card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Decorative Strip */
.card-strip {
  background: linear-gradient(90deg, #F59E0B, #D97706); /* Gold accents */
  height: 6px;
  width: 100%;
  position: relative;
  display: flex; align-items: center; justify-content: space-between;
}
.strip-text {
  font-size: 9px; font-weight: 800; color: rgba(0,0,0,0.4); 
  letter-spacing: 2px; margin-left: 12px; margin-top: 12px; /* Visual offset */
  position: absolute; top: 0; left: 0;
}

.card-content {
  padding: 24px 28px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}

.code-label {
  font-size: 11px; color: #64748B; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
}

.code-display-row {
  width: 100%;
  text-align: center;
  padding: 12px 16px;
  background: rgba(0,0,0,0.3);
  border-radius: 8px;
  border: 1px dashed rgba(255,255,255,0.1);
}

.the-code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 20px; /* Large */
  font-weight: 700;
  color: #F8FAFC;
  letter-spacing: 1.5px;
  word-break: break-all;
}

.action-row {
  width: 100%;
  display: flex; justify-content: center;
}

.copy-pill-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #E2E8F0;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.copy-pill-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff; transform: translateY(-1px);
}

.empty-state { text-align: center; padding: 20px; color: #64748b; }

/* Subtle shine overlay */
.shine-effect {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%);
  pointer-events: none;
}
</style>
