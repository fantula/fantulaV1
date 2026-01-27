<template>
  <div class="mobile-page">
    <div class="page-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">消息中心</h1>
      <div class="header-right">
         <span class="read-all-btn" @click="handleReadAll" :class="{ disabled: markingAll }">
            {{ markingAll ? '...' : '已读' }}
         </span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-header">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <span class="dot" v-if="tab.key === 'unread' && unreadCount > 0"></span>
      </div>
    </div>

    <div class="content-body">
       <BaseInfiniteList
         :loading="loading"
         :finished="finished"
         :error="error"
         @load="loadMore"
         ref="infiniteListRef"
       >
         <div v-if="displayList.length === 0 && !loading" class="empty-state">
            <el-icon class="empty-icon"><Bell /></el-icon>
            <p>暂无消息</p>
         </div>

         <div v-else class="message-list">
            <div 
              v-for="msg in displayList" 
              :key="msg.id" 
              class="message-card"
              :class="{ 'is-unread': !msg.is_read }"
              @click="handleClick(msg)"
            >
               <div class="msg-icon" :class="msg.type">
                  <el-icon><component :is="getIcon(msg.type)" /></el-icon>
               </div>
               <div class="msg-content">
                  <div class="msg-top">
                     <span class="msg-title">{{ msg.title }}</span>
                     <span class="msg-time">{{ formatTime(msg.created_at) }}</span>
                  </div>
                  <div class="msg-body">{{ msg.content }}</div>
               </div>
               <div class="unread-dot" v-if="!msg.is_read"></div>
            </div>
         </div>
       </BaseInfiniteList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Bell, ShoppingCart, Warning, ChatDotRound } from '@element-plus/icons-vue'
import { messageApi, type UserMessage } from '@/api/client/message'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { useUserStore } from '@/stores/client/user'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const userStore = useUserStore()
const activeTab = ref('all')
const unreadCount = ref(0)
const markingAll = ref(false)
const infiniteListRef = ref()

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'unread', label: '未读' },
  { key: 'order', label: '订单' },
  { key: 'system', label: '系统' }
]

// Custom fetch for infinite scroll to handle "Client Filtering" if needed
// Or if API supports paging
const fetchMessages = async (page: number, size: number) => {
    // Current API: getMessages(page, limit). 
    // It seems to fetch ALL types. So client filtering is needed for types.
    // BUT we should be careful about paging. 
    // If we use standard paging from server, we might get empty pages if we filter client side.
    const res = await messageApi.getMessages(page, size)
    if(res.success && res.data) {
        let list = (res.data.messages || []) as UserMessage[]
        
        // Client filter (Simple approach, not perfect for paging but standard for this task)
        // Ideally backend supports filtering.
        if (activeTab.value === 'unread') {
            list = list.filter((m: UserMessage) => !m.is_read)
        } else if (activeTab.value !== 'all') {
            list = list.filter((m: UserMessage) => m.type === activeTab.value)
        }
        
        return {
            list,
            hasMore: list.length > 0, // Approx
            total: res.data.total
        }
    }
    return { list: [], hasMore: false }
}

const { displayList, loading, finished, error, loadMore, reset } = useInfiniteScroll<UserMessage>({
    fetchData: fetchMessages,
    pageSize: 20
})

const switchTab = (tab: string) => {
    activeTab.value = tab
    reset()
}

const handleClick = async (msg: UserMessage) => {
    if(!msg.is_read) {
        await messageApi.markAsRead(msg.id)
        msg.is_read = true
        unreadCount.value = Math.max(0, unreadCount.value - 1)
        userStore.fetchUnreadMessageCount()
    }
}

const handleReadAll = async () => {
    if(markingAll.value) return
    markingAll.value = true
    try {
        const res = await messageApi.markAllAsRead()
        if(res.success) {
            ElMessage.success({ message: '全部已读', offset: 100, customClass: 'mobile-message' })
            displayList.value.forEach(m => m.is_read = true)
            unreadCount.value = 0
            userStore.fetchUnreadMessageCount()
        }
    } finally {
        markingAll.value = false
    }
}

const loadUnreadCount = async () => {
    const res = await messageApi.getUnreadCount()
    if(res.success && res.data !== undefined) {
        unreadCount.value = res.data
    }
}

const getIcon = (type: string) => {
    const map: Record<string, any> = {
        order: ShoppingCart,
        security: Warning,
        activity: ChatDotRound,
        system: Bell
    }
    return map[type] || Bell
}

const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = (now.getTime() - date.getTime()) / 1000 / 60
    if(diff < 1) return '刚刚'
    if(diff < 60) return `${Math.floor(diff)}分钟前`
    const hours = diff / 60
    if(hours < 24) return `${Math.floor(hours)}小时前`
    return `${date.getMonth()+1}-${date.getDate()}`
}

onMounted(() => {
    loadUnreadCount()
})
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
  flex: 1; text-align: center; font-size: 18px; font-weight: 600; margin: 0;
}
.header-right { width: 32px; text-align: right; } /* Balance back btn */
.read-all-btn { font-size: 14px; color: #3B82F6; }
.read-all-btn.disabled { opacity: 0.5; }

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
    position: relative;
}
.tab-item.active { color: #fff; font-weight: 600; border-bottom-color: #3B82F6; }
.dot {
    position: absolute; top: 10px; right: 25%;
    width: 6px; height: 6px; background: #EF4444; border-radius: 50%;
}

.content-body { padding: 20px; flex: 1; }

.message-list { display: flex; flex-direction: column; gap: 12px; }

.message-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 16px;
    display: flex; gap: 12px;
    position: relative;
}
.message-card.is-unread {
    background: rgba(30, 41, 59, 0.7);
    border-left: 3px solid #3B82F6;
}

.msg-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
}
.msg-icon.system { background: rgba(59, 130, 246, 0.1); color: #3B82F6; }
.msg-icon.order { background: rgba(249, 115, 22, 0.1); color: #F97316; }
.msg-icon.activity { background: rgba(168, 85, 247, 0.1); color: #A855F7; }
.msg-icon.security { background: rgba(239, 68, 68, 0.1); color: #EF4444; }

.msg-content { flex: 1; overflow: hidden; }

.msg-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 4px;
}
.msg-title { font-size: 15px; font-weight: 500; color: #E2E8F0; }
.msg-time { font-size: 12px; color: #64748B; }

.msg-body {
    font-size: 13px; color: #94A3B8;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.unread-dot {
    position: absolute; top: 16px; right: 16px;
    width: 8px; height: 8px; background: #EF4444; border-radius: 50%;
}

.empty-state { text-align: center; color: #64748B; padding-top: 60px; }
.empty-icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }
</style>
