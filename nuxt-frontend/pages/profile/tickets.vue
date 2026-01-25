<template>
  <div class="tickets-section">
    <!-- Header -->
    <div class="section-header">
      <div class="header-left">
        <h2 class="section-title">我的工单</h2>
        <div class="section-subtitle">Support Tickets</div>
      </div>
      <!-- Right Action (Optional: Create Ticket?) -->
      <!-- <button class="create-btn">新建工单</button> -->
    </div>

    <!-- Tabs -->
    <div class="tickets-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
        <!-- Optional Dot if needing attention -->
        <!-- <div v-if="tab.key === 'processing'" class="tab-status-dot"></div> -->
        <div class="active-indicator" v-if="activeTab === tab.key"></div>
      </div>
    </div>

    <!-- Ticket List Container -->
    <div class="tickets-list-container">
      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <el-skeleton animated v-for="i in 3" :key="i" class="skeleton-item">
          <template #template>
            <div style="display: flex; gap: 16px; padding: 20px;">
              <el-skeleton-item variant="circle" style="width: 48px; height: 48px;" />
              <div style="flex: 1">
                <el-skeleton-item variant="h3" style="width: 40%; margin-bottom: 12px" />
                <el-skeleton-item variant="text" style="width: 80%" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTickets.length === 0" class="empty-state">
        <div class="empty-icon-wrap">
          <el-icon class="empty-icon"><Service /></el-icon>
        </div>
        <div class="empty-text">暂无工单</div>
        <div class="empty-desc">您还没有提交过任何工单记录</div>
      </div>

      <!-- Ticket List -->
      <div v-else class="tickets-list">
        <transition-group name="list">
          <div 
            v-for="ticket in filteredTickets" 
            :key="ticket.id" 
            class="ticket-card"
            :class="ticket.statusClass"
            @click="openViewModal(ticket)"
          >
            <!-- Icon -->
            <div class="ticket-icon" :class="ticket.statusClass">
              <el-icon><Service /></el-icon>
            </div>

            <!-- Content -->
            <div class="ticket-content">
              <div class="ticket-top">
                <div class="ticket-title-row">
                  <span class="ticket-id">{{ ticket.shortId }}</span>
                  <span class="status-tag" :class="ticket.statusClass">{{ ticket.statusText }}</span>
                </div>
                <span class="ticket-time">{{ ticket.time }}</span>
              </div>
              
              <div class="ticket-body">
                {{ ticket.content }}
              </div>
              
              <div class="ticket-meta" v-if="ticket.productName">
                关联: {{ ticket.productName }}
              </div>
            </div>

            <!-- Delete Action -->
            <div class="delete-action" @click.stop="handleDeleteClick(ticket)">
               <el-icon><Delete /></el-icon>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>

  <!-- Detail Modal -->
  <TicketDetailModal
     v-model:visible="showDetailModal"
     :ticket-id="currentTicketId"
     @close="showDetailModal = false"
     @reply-success="fetchTickets"
  />

  <!-- Delete Confirmation Modal -->
  <BaseConfirmModal
    v-model:visible="showDeleteModal"
    title="删除工单"
    message="确定要删除这条工单记录吗？此操作无法撤销。"
    type="danger"
    confirm-text="删除"
    :loading="deleteLoading"
    @confirm="confirmDelete"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ticketApi } from '@/api/client/ticket'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { Service, Right, Delete } from '@element-plus/icons-vue'
import TicketDetailModal from '@/components/modal/business/TicketDetailModal.vue'
import BaseConfirmModal from '@/components/modal/base/BaseConfirmModal.vue'

const { formatDate } = useBizFormat()
const router = useRouter()

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

// Delete State
const showDeleteModal = ref(false)
const deleteTicketId = ref('')
const deleteLoading = ref(false)

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
        shortId: t.ticket_no || `T-${t.id.substring(0, 8).toUpperCase()}`,
        content: t.title, 
        time: formatDate(t.created_at),
        orderId: t.orders?.order_no || '',
        productName: t.orders?.product_snapshot?.product_name || '',
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
  return tickets.value.filter((ticket: any) => ticket.status === activeTab.value)
})

const openViewModal = (ticket: any) => {
  currentTicketId.value = ticket.id
  showDetailModal.value = true
}

const handleDeleteClick = (ticket: any) => {
  deleteTicketId.value = ticket.id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!deleteTicketId.value) return
  
  deleteLoading.value = true
  try {
    const res = await ticketApi.delete(deleteTicketId.value)
    if (res.success) {
      ElMessage.success('删除成功')
      showDeleteModal.value = false
      fetchTickets() // Refresh list
    } else {
      ElMessage.error(res.error || '删除失败')
    }
  } catch (e) {
    ElMessage.error('删除异常')
  } finally {
    deleteLoading.value = false
  }
}
</script>

<style scoped>
.tickets-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
}

/* Header */
.section-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.section-subtitle {
  font-size: 12px;
  font-family: 'Outfit', sans-serif;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Tabs */
.tickets-tabs {
  flex-shrink: 0;
  display: flex;
  gap: 32px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab-item {
  padding: 16px 0;
  color: #94A3B8;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.tab-item:hover { color: #CBD5E1; }
.tab-item.active { color: #fff; font-weight: 600; }

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3B82F6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  border-radius: 2px;
}

/* List Container */
.tickets-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px 64px;
  min-height: 0;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Ticket Card */
.ticket-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
}

.ticket-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

/* Icon */
.ticket-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

/* Dynamic Status Styles */
.ticket-icon.processing {
  background: rgba(59, 130, 246, 0.15); /* Blue tint */
  color: #3B82F6;
}
.ticket-card.processing {
  border-left: 3px solid #3B82F6;
}

.ticket-icon.resolved {
  background: rgba(16, 185, 129, 0.15); /* Green tint */
  color: #10B981;
}
.ticket-card.resolved {
  border-left: 3px solid #10B981;
  opacity: 0.8; 
}

/* Content */
.ticket-content {
  flex: 1;
  min-width: 0;
}

.ticket-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 12px;
}

.ticket-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ticket-id {
  font-size: 15px;
  font-weight: 600;
  color: #E2E8F0;
  font-family: monospace;
}

.status-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
}
.status-tag.processing { color: #3B82F6; background: rgba(59, 130, 246, 0.1); }
.status-tag.resolved { color: #10B981; background: rgba(16, 185, 129, 0.1); }

.ticket-time {
  font-size: 12px;
  color: #64748B;
  white-space: nowrap;
}

.ticket-body {
  font-size: 14px;
  color: #CBD5E1;
  line-height: 1.5;
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ticket-meta {
  font-size: 12px;
  color: #64748B;
}

/* .arrow-hint removed */

.delete-action {
  /* Flex layout */
  position: relative;
  align-self: center; /* Vertically center */
  margin-left: 10px;  /* Space from content */
  width: 40px; height: 40px; /* Larger size */
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; /* Larger icon */
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.2s;
  flex-shrink: 0;
}

.delete-action:hover {
   background: #EF4444; color: #fff;
   box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
   transform: scale(1.05);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.empty-icon-wrap {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.empty-icon {
  font-size: 32px;
  color: #475569;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: #CBD5E1;
  margin-bottom: 8px;
}

.empty-desc {
  font-size: 13px;
  color: #64748B;
}

/* Loading */
.loading-state { display: flex; flex-direction: column; gap: 12px; }
.skeleton-item { background: rgba(255, 255, 255, 0.02) !important; border-radius: 16px; }

/* Transitions */
.list-move, .list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-20px); }
</style> 