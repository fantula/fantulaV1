<template>
  <div v-if="records.length > 0" class="fulfillment-history">
    <div class="history-header">
      <span class="icon">📋</span>
      <span class="title">回执记录</span>
      <span class="count">{{ records.length }} 条</span>
    </div>
    
    <div class="history-timeline scroll-container">
      <div 
        v-for="record in records" 
        :key="record.id" 
        class="timeline-item"
        :class="record.status"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="item-header">
            <span class="status-badge" :class="record.status">
              {{ statusText(record.status) }}
            </span>
            <span class="time">{{ formatTime(record.submitted_at) }}</span>
          </div>
          
          <!-- Payload Summary -->
          <div class="payload-summary">
            <div v-for="(value, key) in record.payload" :key="key" class="payload-item">
              <span class="key">{{ key }}:</span>
              <span class="value">{{ maskValue(value) }}</span>
            </div>
          </div>
          
          <!-- Reject Reason -->
          <div v-if="record.status === 'rejected' && record.reject_reason" class="reject-reason">
            <span class="label">驳回原因：</span>
            <span class="reason">{{ record.reject_reason }}</span>
          </div>
          
          <!-- Review Time -->
          <div v-if="record.reviewed_at" class="review-time">
            审核于 {{ formatTime(record.reviewed_at) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSupabaseClient } from '@/utils/supabase'
import type { OrderFulfillment } from '@/types/order'

const props = defineProps<{
  orderId: string
}>()

const records = ref<OrderFulfillment[]>([])

const fetchHistory = async () => {
  if (!props.orderId) return
  
  try {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('order_fulfillments')
      .select('*')
      .eq('order_id', props.orderId)
      .order('submitted_at', { ascending: false })

    if (!error && data) {
      records.value = data as OrderFulfillment[]
    }
  } catch (err) {
    console.error('获取回执历史失败:', err)
  }
}

const statusText = (status: string) => {
  const map: Record<string, string> = {
    submitted: '待审核',
    approved: '已通过',
    rejected: '已驳回'
  }
  return map[status] || status
}

const formatTime = (time: string) => {
  return new Date(time).toLocaleString('zh-CN', {
    month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
  })
}

const maskValue = (value: string) => {
  if (!value || value.length <= 4) return value
  return value.slice(0, 2) + '****' + value.slice(-2)
}

onMounted(() => {
  fetchHistory()
})

// 暴露刷新方法供父组件调用
defineExpose({ refresh: fetchHistory })
</script>

<style scoped>
.fulfillment-history {
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.history-header .icon { font-size: 16px; }
.history-header .title { font-size: 14px; font-weight: 600; color: #E2E8F0; }
.history-header .count { font-size: 12px; color: #64748B; margin-left: auto; }

.history-timeline {
  padding: 16px 24px;
}

.scroll-container {
  max-height: 400px;
  overflow-y: auto;
  overscroll-behavior: contain; /* Prevent chaining scroll to parent */
  -webkit-overflow-scrolling: touch;
}

/* Custom Scrollbar */
.scroll-container::-webkit-scrollbar { width: 4px; }
.scroll-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
.scroll-container::-webkit-scrollbar-track { background: transparent; }

.timeline-item {
  position: relative;
  padding-left: 24px;
  padding-bottom: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  margin-left: 8px;
}
.timeline-item:last-child { padding-bottom: 0; border-left-color: transparent; }

.timeline-dot {
  position: absolute;
  left: -5px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #64748B;
  border: 2px solid #1E293B;
}
.timeline-item.submitted .timeline-dot { background: #FACC15; }
.timeline-item.approved .timeline-dot { background: #4ADE80; }
.timeline-item.rejected .timeline-dot { background: #F87171; }

.timeline-content {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 12px 16px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status-badge {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
}
.status-badge.submitted { background: rgba(234, 179, 8, 0.15); color: #FACC15; }
.status-badge.approved { background: rgba(34, 197, 94, 0.15); color: #4ADE80; }
.status-badge.rejected { background: rgba(239, 68, 68, 0.15); color: #F87171; }

.time { font-size: 12px; color: #64748B; }

.payload-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.payload-item { font-size: 13px; }
.payload-item .key { color: #64748B; }
.payload-item .value { color: #94A3B8; margin-left: 4px; }

.reject-reason {
  margin-top: 8px;
  font-size: 12px;
  color: #F87171;
  background: rgba(239, 68, 68, 0.1);
  padding: 6px 10px;
  border-radius: 4px;
}

.review-time {
  margin-top: 6px;
  font-size: 11px;
  color: #475569;
}
</style>
