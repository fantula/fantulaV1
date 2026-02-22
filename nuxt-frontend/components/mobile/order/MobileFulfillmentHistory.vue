<template>
  <div v-if="records.length > 0" class="mobile-history-card">
    <div class="card-header" @click="toggleExpand">
      <div class="header-main">
         <span class="title">回执记录</span>
         <span class="badge">{{ records.length }}</span>
      </div>
      <div class="toggle-icon">
         <el-icon :class="{ 'rotate-180': isExpanded }"><ArrowDown /></el-icon>
      </div>
    </div>
    
    <div v-if="isExpanded || records.length > 0" class="history-list">
      <div 
        v-for="(record, index) in displayRecords" 
        :key="record.id" 
        class="record-item"
        :class="record.status"
      >
        <div class="record-top">
           <div class="status-tag" :class="record.status">
              <el-icon v-if="record.status === 'approved'"><CircleCheck /></el-icon>
              <el-icon v-else-if="record.status === 'rejected'"><CircleClose /></el-icon>
              <el-icon v-else><Loading /></el-icon>
              <span>{{ statusText(record.status) }}</span>
           </div>
           <span class="time">{{ formatTime(record.submitted_at) }}</span>
        </div>

        <div class="record-body">
             <div v-for="(value, key) in record.payload" :key="key" class="field-row" v-show="String(key) !== '_cdk_id'">
               <span class="label">{{ key }}:</span>
               <span class="val">{{ maskValue(value) }}</span>
             </div>
        </div>

        <div v-if="record.status === 'rejected' && record.reject_reason" class="reject-box">
             <el-icon><Warning /></el-icon>
             <span>原因: {{ record.reject_reason }}</span>
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

onMounted(fetchHistory)
defineExpose({ refresh: fetchHistory })
</script>

<style scoped>
.mobile-history-card {
  background: #1E293B; /* Slate 800 base */
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px; 
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  margin-top: 12px;
}

.card-header {
  padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
}
.header-main { display: flex; align-items: center; gap: 8px; }
.title { font-size: 13px; font-weight: 600; color: #E2E8F0; }
.badge { background: rgba(255,255,255,0.1); color: #94A3B8; font-size: 10px; padding: 1px 6px; border-radius: 8px; }

.toggle-icon { color: #64748B; font-size: 12px; transition: transform 0.2s; }
.rotate-180 { transform: rotate(180deg); }

.history-list { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

.record-item {
  background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; padding: 12px;
}

.record-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }

.status-tag { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; }
.status-tag.submitted { color: #FACC15; }
.status-tag.approved { color: #4ADE80; }
.status-tag.rejected { color: #F87171; }
.time { font-size: 11px; color: #64748B; font-family: monospace; }

.record-body { display: flex; flex-direction: column; gap: 4px; }
.field-row { display: flex; justify-content: space-between; font-size: 12px; }
.label { color: #64748B; }
.val { color: #E2E8F0; font-family: 'Monaco', monospace; }

.reject-box {
  margin-top: 8px; background: rgba(239, 68, 68, 0.1); color: #F87171;
  padding: 8px 10px; border-radius: 8px; font-size: 11px; display: flex; gap: 6px; align-items: center;
}
</style>
