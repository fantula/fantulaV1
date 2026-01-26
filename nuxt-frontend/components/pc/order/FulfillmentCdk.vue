<template>
  <div class="gift-card-container">
    
    <!-- Case A: Single Code (Rich Display) -->
    <div v-if="cdkList.length === 1" class="gift-cards-wrapper">
       <div class="gift-card-item">
         <div class="card-strip">
            <span class="strip-text">DIGITAL VOUCHER</span>
            <div class="strip-decoration"></div>
         </div>
         <div class="card-content">
            <div class="code-label">兑换码 / REDEEM CODE</div>
            <div class="code-display-row">
               <span class="the-code">{{ cdkList[0].code }}</span>
            </div>
            <div class="action-row">
               <button class="copy-pill-btn" @click="copyText(cdkList[0].code)">
                  <el-icon><CopyDocument /></el-icon> 复制卡密
               </button>
            </div>
         </div>
         <div class="shine-effect"></div>
       </div>
    </div>

    <!-- Case B: Multiple Codes (Compact Stack) -->
    <div v-else-if="cdkList.length > 1" class="compact-stack-wrapper">
       <div class="glass-header">
          <div class="header-left">
             <el-icon class="stack-icon"><Files /></el-icon>
             <span class="stack-title">包含 {{ cdkList.length }} 组激活码</span>
          </div>
          <button class="batch-copy-btn" @click="copyAll">
             复制全部
          </button>
       </div>
       
       <div class="stack-list">
          <div v-for="(item, idx) in cdkList" :key="idx" class="stack-item">
             <div class="stack-index">{{ idx + 1 }}</div>
             <div class="stack-code">{{ item.code }}</div>
             <button class="icon-copy-btn" @click="copyText(item.code)">
                <el-icon><CopyDocument /></el-icon>
             </button>
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
import { CopyDocument, Files } from '@element-plus/icons-vue'

interface CdkItem {
  id: string
  code: string
  parsed: any
  accountData: any
}

const props = defineProps<{
  cdkList: CdkItem[]
}>()

const copyText = (t: string) => {
  navigator.clipboard.writeText(t).then(() => ElMessage.success('已复制'))
}

const copyAll = () => {
   const allText = props.cdkList.map(c => c.code).join('\n')
   copyText(allText)
}
</script>

<style scoped>
.gift-card-container {
  margin-top: 16px;
  display: flex; flex-direction: column; gap: 16px;
}

/* --- Case A: Single Card Styles --- */
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

.card-strip {
  background: linear-gradient(90deg, #F59E0B, #D97706);
  height: 6px; width: 100%; position: relative;
}
.strip-text {
  font-size: 9px; font-weight: 800; color: rgba(0,0,0,0.4); 
  letter-spacing: 2px; margin-left: 12px; margin-top: 12px; 
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
  width: 100%; text-align: center; padding: 12px 16px;
  background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.1);
}

.the-code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 20px; font-weight: 700; color: #F8FAFC; letter-spacing: 1.5px; word-break: break-all;
}

.action-row { width: 100%; display: flex; justify-content: center; }

.copy-pill-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: #E2E8F0; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.copy-pill-btn:hover { background: rgba(255, 255, 255, 0.2); color: #fff; transform: translateY(-1px); }

.shine-effect {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 70%);
  pointer-events: none;
}

/* --- Case B: Compact Stack Styles --- */
.compact-stack-wrapper {
   background: rgba(30, 41, 59, 0.4);
   border: 1px solid rgba(255, 255, 255, 0.08);
   border-radius: 12px; overflow: hidden;
}

.glass-header {
   padding: 12px 20px;
   background: rgba(0,0,0,0.2);
   border-bottom: 1px solid rgba(255,255,255,0.05);
   display: flex; justify-content: space-between; align-items: center;
}

.header-left { display: flex; align-items: center; gap: 8px; color: #E2E8F0; font-weight: 600; font-size: 14px; }
.stack-icon { color: #3B82F6; }

.batch-copy-btn {
   font-size: 12px; color: #3B82F6; background: none; border: none; cursor: pointer; font-weight: 500;
}
.batch-copy-btn:hover { text-decoration: underline; }

.stack-list { }

.stack-item {
   display: flex; align-items: center; gap: 12px;
   padding: 12px 20px;
   border-bottom: 1px solid rgba(255,255,255,0.03);
   transition: background 0.2s;
}
.stack-item:last-child { border-bottom: none; }
.stack-item:hover { background: rgba(255,255,255,0.05); }

.stack-index {
   font-size: 11px; color: #64748B; width: 20px; font-family: 'Monaco', monospace;
}

.stack-code {
   flex: 1;
   font-family: 'Monaco', monospace; font-size: 14px; color: #CBD5E1;
   word-break: break-all;
}

.icon-copy-btn {
   width: 28px; height: 28px; border-radius: 6px;
   background: rgba(255,255,255,0.05); border: none; color: #94A3B8;
   display: flex; align-items: center; justify-content: center; cursor: pointer;
}
.icon-copy-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }

.empty-state { text-align: center; padding: 20px; color: #64748b; }
</style>
