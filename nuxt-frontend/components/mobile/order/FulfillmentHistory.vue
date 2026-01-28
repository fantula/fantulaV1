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
             <div v-for="(value, key) in record.payload" :key="key" class="field-row" v-show="key !== '_cdk_id'">
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
import { ref, computed, onMounted } from 'vue'
import { ArrowDown, CircleCheck, CircleClose, Loading, Warning } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'

interface OrderFulfillment {
  id: string
  status: string
  payload: any
  submitted_at: string
  reject_reason?: string
}

const props = defineProps<{
  orderId: string
  filterCdkId?: string
}>()

const records = ref<OrderFulfillment[]>([])
// Usually on mobile we might want to show just the latest, expandable
const isExpanded = ref(false)

const displayRecords = computed(() => {
    if (isExpanded.value) return records.value
    return records.value.slice(0, 1)
})

const toggleExpand = () => isExpanded.value = !isExpanded.value

const fetchHistory = async () => {
  if (!props.orderId) return
  
  try {
    const client = getSupabaseClient()
    let query = client
      .from('order_fulfillments')
      .select('*')
      .eq('order_id', props.orderId)
      .order('submitted_at', { ascending: false })

    if (props.filterCdkId) {
        query = query.contains('payload', { _cdk_id: props.filterCdkId })
    }

    const { data, error } = await query
    if (!error && data) {
      records.value = data as OrderFulfillment[]
    }
  } catch (err) { console.error(err) }
}

const statusText = (status: string) => {
  const map: Record<string, string> = { submitted: '审核中', approved: '已通过', rejected: '已驳回' }
  return map[status] || status
}

const formatTime = (time: string) => {
  const date = new Date(time)
  const m = (date.getMonth()+1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  const h = date.getHours().toString().padStart(2, '0')
  const min = date.getMinutes().toString().padStart(2, '0')
  return `${m}-${d} ${h}:${min}`
}

const maskValue = (value: string) => {
  if (!value || value.length <= 4) return value
  return value.slice(0, 2) + '****' + value.slice(-2)
}

onMounted(fetchHistory)
defineExpose({ refresh: fetchHistory })
</script>

<style scoped>
.mobile-history-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px; overflow: hidden;
  margin-top: 12px;
}

.card-header {
  padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;
  background: rgba(0,0,0,0.1); border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
}
.header-main { display: flex; align-items: center; gap: 8px; }
.title { font-size: 13px; font-weight: 600; color: #E2E8F0; }
.badge { background: rgba(255,255,255,0.1); color: #94A3B8; font-size: 10px; padding: 1px 6px; border-radius: 8px; }

.toggle-icon { color: #64748B; font-size: 12px; transition: transform 0.2s; }
.rotate-180 { transform: rotate(180deg); }

.history-list { padding: 12px; display: flex; flex-direction: column; gap: 10px; }

.record-item {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; padding: 10px;
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
.val { color: #E2E8F0; font-family: monospace; }

.reject-box {
  margin-top: 8px; background: rgba(239, 68, 68, 0.1); color: #F87171;
  padding: 6px 10px; border-radius: 6px; font-size: 11px; display: flex; gap: 6px; align-items: center;
}
</style>
