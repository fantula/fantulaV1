<template>
  <div class="tickets-section">
    <div class="section-header">
      <h2 class="section-title">我的工单</h2>
    </div>
    
    <!-- Tabs (Glass Pill) -->
    <div class="tickets-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab-item', { active: activeTab === tab.key }]"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- Ticket List -->
    <div class="tickets-list">
      <div class="ticket-card-glass" v-for="ticket in filteredTickets" :key="ticket.id" :class="ticket.statusClass">
        <!-- Header -->
        <div class="card-header">
          <div class="header-left">
            <span class="ticket-id">{{ ticket.shortId }}</span>
            <div class="ticket-status-badge" :class="ticket.statusClass">{{ ticket.statusText }}</div>
          </div>
          <span class="ticket-time">{{ ticket.time }}</span>
        </div>
        
        <!-- Content -->
        <div class="card-body">
          <div class="ticket-content-text">{{ ticket.content }}</div>
          <div class="ticket-meta-row" v-if="ticket.orderId">
             <span class="label">关联业务:</span>
             <span class="product-name">{{ ticket.productName }}</span>
             <span class="order-link">订单 {{ ticket.orderId }}</span>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="card-actions">
           <button class="action-btn glass-btn" @click="openViewModal(ticket)">
              <el-icon><View /></el-icon> 查看详情
           </button>
        </div>
      </div>
    </div>
  </div>

  <!-- New Standard Detail Modal -->
  <TicketDetailModal
     v-model:visible="showDetailModal"
     :ticket-id="currentTicketId"
     @close="showDetailModal = false"
     @reply-success="fetchTickets"
  />

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ticketApi } from '@/api/client/ticket'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { View } from '@element-plus/icons-vue'
import TicketDetailModal from '@/components/modal/business/TicketDetailModal.vue'

const { formatDate } = useBizFormat()

// Tabs
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'processing', label: '进行中' },
  { key: 'resolved', label: '已解决' }
]

const activeTab = ref('all')
const loading = ref(false)
const tickets = ref<any[]>([])

// Modal State
const showDetailModal = ref(false)
const currentTicketId = ref('')

const selectTab = (key: string) => { 
  activeTab.value = key 
}

const fetchTickets = async () => {
  loading.value = true
  try {
    const res = await ticketApi.getList()
    if (res.success && res.data) {
      tickets.value = res.data.map((t: any) => ({
        id: t.id,
        shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`, // Use real ticket_no if exists
        content: t.title, 
        time: formatDate(t.created_at),
        orderId: t.orders?.order_no || '',
        productName: t.orders?.product_snapshot?.product_name || '通用工单',
        status: t.status,
        statusText: t.status === 'processing' ? '处理中' : '已解决',
        statusClass: t.status === 'processing' ? 'processing' : 'resolved',
      }))
    }
  } catch (e) {
    console.error('Fetch tickets failed', e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchTickets)

const filteredTickets = computed(() => {
  if (activeTab.value === 'all') return tickets.value
  return tickets.value.filter(ticket => ticket.status === activeTab.value)
})

const openViewModal = (ticket: any) => {
  currentTicketId.value = ticket.id
  showDetailModal.value = true
}
</script>

<style scoped>
.tickets-section { padding: 0; min-height: 100%; display: flex; flex-direction: column; }

.section-header {
  margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.section-title { font-size: 20px; font-weight: 700; color: #F1F5F9; margin: 0; letter-spacing: -0.5px; }

/* Tabs */
.tickets-tabs { display: flex; gap: 12px; margin-bottom: 24px; }
.tab-item {
  padding: 8px 20px; border-radius: 100px;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
  color: #94A3B8; font-size: 14px; font-weight: 500; cursor: pointer;
  transition: all 0.2s;
}
.tab-item:hover { background: rgba(255,255,255,0.08); color: #E2E8F0; }
.tab-item.active {
  background: rgba(59, 130, 246, 0.15); color: #3B82F6; border-color: rgba(59, 130, 246, 0.3);
  font-weight: 600;
}

/* List */
.tickets-list { display: flex; flex-direction: column; gap: 16px; }

/* Glass Card */
.ticket-card-glass {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 16px 20px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.ticket-card-glass:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Status Indicator Border (Left) */
.ticket-card-glass::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: #3B82F6; opacity: 0.5;
}
.ticket-card-glass.resolved::before { background: #10B981; }

.card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; }
.header-left { display: flex; align-items: center; gap: 10px; }
.ticket-id { font-size: 15px; font-weight: 600; color: #E2E8F0; font-family: monospace; }
.ticket-status-badge {
    font-size: 11px; padding: 2px 8px; border-radius: 4px;
    background: rgba(59, 130, 246, 0.1); color: #3B82F6; border: 1px solid rgba(59, 130, 246, 0.2);
}
.ticket-status-badge.resolved {
    background: rgba(16, 185, 129, 0.1); color: #10B981; border-color: rgba(16, 185, 129, 0.2);
}
.ticket-time { font-size: 12px; color: #64748B; }

.card-body { margin-bottom: 16px; }
.ticket-content-text { font-size: 14px; color: #CBD5E1; margin-bottom: 8px; line-height: 1.5; }
.ticket-meta-row { font-size: 12px; color: #94A3B8; display: flex; align-items: center; gap: 6px; }
.product-name { color: #E2E8F0; font-weight: 500; }
.order-link { color: #64748B; font-family: monospace; }

.card-actions { 
    display: flex; gap: 10px; justify-content: flex-end; 
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px;
}
.glass-btn {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    color: #94A3B8; padding: 6px 16px; border-radius: 8px; font-size: 13px;
    cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;
}
.glass-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
</style> 