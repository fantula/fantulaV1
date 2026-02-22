<template>
  <div v-if="records.length > 0" class="fulfillment-history glass-panel">
    <div class="history-header">
      <div class="header-left">
        <span class="icon">📋</span>
        <span class="title">回执记录</span>
        <span class="count-badge flex-center">{{ records.length }}</span>
      </div>
      
      <!-- Expand Toggle -->
      <button v-if="records.length > 1" class="expand-btn" @click="toggleExpand">
         <span class="btn-text">{{ isExpanded ? '收起' : '展开历史' }}</span>
         <el-icon :class="{ 'rotate-180': isExpanded }"><ArrowDown /></el-icon>
      </button>
    </div>
    
    <div class="history-list">
      <div 
        v-for="(record, index) in displayRecords" 
        :key="record.id" 
        class="history-card slide-in"
        :class="record.status"
      >
        <!-- Card Header: Status + Time -->
        <div class="card-top">
           <div class="status-indicator" :class="record.status">
              <el-icon v-if="record.status === 'approved'"><CircleCheck /></el-icon>
              <el-icon v-else-if="record.status === 'rejected'"><CircleClose /></el-icon>
              <el-icon v-else><Loading /></el-icon>
              <span>{{ statusText(record.status) }}</span>
           </div>
           <span class="time-str">{{ formatTime(record.submitted_at) }}</span>
        </div>

        <!-- Payload (Compact) -->
        <div class="card-payload">
             <div v-for="(value, key) in record.payload" :key="key" class="payload-field" v-show="String(key) !== '_cdk_id'">
               <span class="field-label">{{ key }}:</span>
               <span class="field-value">{{ maskValue(value) }}</span>
             </div>
        </div>

        <!-- Reject Reason (Prominent) -->
        <div v-if="record.status === 'rejected' && record.reject_reason" class="reject-alert">
             <el-icon><Warning /></el-icon>
             <span>驳回原因: {{ record.reject_reason }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ArrowDown, CircleCheck, CircleClose, Loading, Warning } from '@element-plus/icons-vue'
import { useFulfillmentHistory } from '@/composables/client/useFulfillmentHistory'

const props = defineProps<{
  orderId: string
  filterCdkId?: string
}>()

const {
  records,
  isExpanded,
  displayRecords,
  toggleExpand,
  fetchHistory,
  statusText,
  formatTime,
  maskValue
} = useFulfillmentHistory({
  orderId: () => props.orderId,
  filterCdkId: () => props.filterCdkId
})

onMounted(() => {
  fetchHistory()
})

// 暴露刷新方法供父组件调用
defineExpose({ refresh: fetchHistory })
</script>

<style scoped>
.glass-panel {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-left { display: flex; align-items: center; gap: 8px; }
.title { font-size: 13px; font-weight: 600; color: #E2E8F0; }
.count-badge {
    background: rgba(255,255,255,0.1);
    color: #94A3B8;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
}

.expand-btn {
    display: flex; align-items: center; gap: 4px;
    background: transparent; border: none;
    font-size: 12px; color: #64748B;
    cursor: pointer; transition: color 0.2s;
}
.expand-btn:hover { color: #fff; }
.rotate-180 { transform: rotate(180deg); transition: transform 0.3s; }

/* List */
.history-list {
  padding: 16px 20px;
  display: flex; flex-direction: column; gap: 12px;
}

.history-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 12px 16px;
    transition: all 0.2s;
}
.slide-in { animation: slideIn 0.3s ease-out backwards; }
@keyframes slideIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

.card-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 10px;
}

.status-indicator {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 500;
}
.status-indicator.submitted { color: #FACC15; }
.status-indicator.approved { color: #4ADE80; }
.status-indicator.rejected { color: #F87171; }

.time-str { font-size: 12px; color: #64748B; font-family: monospace; }

.card-payload {
    display: flex; flex-wrap: wrap; gap: 12px;
}

.payload-field {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 10px;
    background: rgba(0,0,0,0.2);
    border-radius: 6px;
}
.field-label { color: #64748B; font-size: 12px; }
.field-value { color: #E2E8F0; font-size: 13px; font-family: monospace; }

.reject-alert {
    margin-top: 10px;
    display: flex; align-items: center; gap: 8px;
    background: rgba(239, 68, 68, 0.1);
    color: #F87171;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
}
</style>
