<template>
  <div class="mobile-page">
    <div class="page-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">我的工单</h1>
      <div class="header-right"></div>
    </div>

    <!-- Tabs -->
    <div class="tabs-header">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="content-body">
      <BaseInfiniteList
         :loading="loading"
         :finished="finished"
         :error="error"
         @load="loadMore"
      >
         <div v-if="displayList.length === 0 && !loading" class="empty-state">
            <el-icon class="empty-icon"><Headset /></el-icon>
            <p>暂无工单记录</p>
         </div>

         <div v-else class="ticket-list">
            <div 
              v-for="ticket in displayList" 
              :key="ticket.id" 
              class="ticket-card"
              @click="goToDetail(ticket.id)"
            >
               <div class="ticket-header">
                  <span class="ticket-id">{{ ticket.shortId }}</span>
                  <span class="ticket-status" :class="ticket.statusClass">{{ ticket.statusText }}</span>
               </div>
               <div class="ticket-title">{{ ticket.content }}</div>
               <div class="ticket-footer">
                  <div class="ticket-meta">
                     <span v-if="ticket.productName">关联: {{ ticket.productName }}</span>
                  </div>
                  <div class="ticket-time">{{ ticket.time }}</div>
               </div>
            </div>
         </div>
      </BaseInfiniteList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Headset } from '@element-plus/icons-vue'
import { ticketApi } from '@/api/client/ticket'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const { formatDate } = useBizFormat()
const activeTab = ref('all')
const allTickets = ref<any[]>([])

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'processing', label: '进行中' },
  { key: 'resolved', label: '已解决' }
]

const filteredList = computed(() => {
    if(activeTab.value === 'all') return allTickets.value
    return allTickets.value.filter((t: any) => t.status === activeTab.value)
})

const fetchTickets = async () => {
    loading.value = true
    try {
        const res = await ticketApi.getList()
        if (res.success && res.data) {
            allTickets.value = res.data.map((t: any) => ({
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
        error.value = true
    } finally {
        loading.value = false
    }
}

const { displayList, loading, finished, error, loadMore } = useInfiniteScroll<any>({
    data: filteredList,
    pageSize: 10
})

const goToDetail = (id: string) => {
    router.push(`/mobile/profile/tickets/${id}`)
}

// Initial fetch handled by loadMore? No, verify usage.
// In favorites/index.vue I did fetchFavorites() onMounted.
// In redemption I used fetchData.
// Here I am using `data` source (client side paging). So I need to fetch data.
import { onMounted } from 'vue'
onMounted(fetchTickets)

</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: #0F172A;
  padding-bottom: 40px;
  color: #fff;
  display: flex; flex-direction: column;
}

.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.95);
  position: sticky; top: 0; z-index: 20;
}
.back-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
}
.page-title {
  flex: 1; text-align: center; font-size: 18px; font-weight: 600; margin: 0; padding-right: 32px;
}

.tabs-header {
    display: flex;
    background: #0F172A;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky; top: 72px; z-index: 10;
}
.tab-item {
    flex: 1; text-align: center;
    padding: 14px 0;
    font-size: 14px; color: #94A3B8;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
}
.tab-item.active { color: #fff; font-weight: 600; border-bottom-color: #3B82F6; }

.content-body { padding: 20px; flex: 1; }

.ticket-list { display: flex; flex-direction: column; gap: 12px; }

.ticket-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 16px;
}

.ticket-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 8px;
}
.ticket-id { font-family: monospace; font-size: 13px; color: #94A3B8; }
.ticket-status { font-size: 12px; padding: 2px 6px; border-radius: 4px; }
.ticket-status.processing { background: rgba(59, 130, 246, 0.1); color: #3B82F6; }
.ticket-status.resolved { background: rgba(16, 185, 129, 0.1); color: #10B981; }

.ticket-title {
    font-size: 15px; color: #E2E8F0; margin-bottom: 12px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.ticket-footer {
    display: flex; justify-content: space-between; align-items: flex-end;
}
.ticket-meta { font-size: 12px; color: #64748B; max-width: 60%; }
.ticket-time { font-size: 12px; color: #64748B; }

.empty-state { text-align: center; color: #64748B; padding-top: 60px; }
.empty-icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }
</style>
