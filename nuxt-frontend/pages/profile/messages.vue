<template>
  <div class="messages-section">
    <!-- Header -->
    <div class="section-header">
      <div class="header-left">
        <h2 class="section-title">消息中心</h2>
        <div class="section-subtitle">Notifications</div>
      </div>
      <button v-if="messages.length > 0" class="read-all-btn" @click="handleMarkAllRead" :disabled="markingAll">
        <el-icon v-if="markingAll"><Loading /></el-icon>
        <span v-else>全部已读</span>
      </button>
    </div>

    <!-- Tabs -->
    <div class="message-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span v-if="tab.key === 'unread' && unreadCount > 0" class="badge">{{ unreadCount }}</span>
        <div class="active-indicator" v-if="activeTab === tab.key"></div>
      </div>
    </div>

    <!-- Message List Container -->
    <div class="message-list-container">
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
      <div v-else-if="filteredMessages.length === 0" class="empty-state">
        <div class="empty-icon-wrap">
          <el-icon class="empty-icon"><Bell /></el-icon>
        </div>
        <div class="empty-text">暂无消息</div>
        <div class="empty-desc">所有通知和提醒都会显示在这里</div>
      </div>

      <!-- Message Cards -->
      <div v-else class="message-list">
        <transition-group name="list">
          <div 
            v-for="msg in filteredMessages" 
            :key="msg.id" 
            class="message-card"
            :class="{ unread: !msg.is_read, clickable: !!msg.link }"
            @click="handleMessageClick(msg)"
          >
            <!-- Icon -->
            <div class="message-icon" :class="getIconClass(msg.type)">
              <el-icon><component :is="getIconComponent(msg.type)" /></el-icon>
            </div>

            <!-- Content -->
            <div class="message-content">
              <div class="message-top">
                <span class="message-title">{{ msg.title }}</span>
                <span class="message-time">{{ formatTime(msg.created_at) }}</span>
              </div>
              <div class="message-body">{{ msg.content }}</div>
              <div v-if="msg.link" class="message-link-hint">
                <el-icon><Right /></el-icon>
                点击查看详情
              </div>
            </div>

            <!-- Unread Dot -->
            <div v-if="!msg.is_read" class="unread-dot"></div>
          </div>
        </transition-group>
      </div>

      <!-- Pagination -->
      <div v-if="total > pageSize" class="pagination-wrap">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          v-model:current-page="currentPage"
          @current-change="loadMessages"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { messageApi, type UserMessage } from '@/api/message'
import { Bell, ChatDotRound, ShoppingCart, Warning, Right, Loading } from '@element-plus/icons-vue'

const router = useRouter()

// State
const loading = ref(true)
const markingAll = ref(false)
const messages = ref<UserMessage[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 20
const activeTab = ref('all')
const unreadCount = ref(0)

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'unread', label: '未读' },
  { key: 'order', label: '订单' },
  { key: 'system', label: '系统' },
]

// Load messages
const loadMessages = async () => {
  loading.value = true
  try {
    const res = await messageApi.getMessages(currentPage.value, pageSize)
    if (res.success && res.data) {
      messages.value = res.data.messages
      total.value = res.data.total
    }
  } finally {
    loading.value = false
  }
}

const loadUnreadCount = async () => {
  const res = await messageApi.getUnreadCount()
  if (res.success && res.data !== undefined) {
    unreadCount.value = res.data
  }
}

onMounted(() => {
  loadMessages()
  loadUnreadCount()
})

// Filtering
const filteredMessages = computed(() => {
  if (activeTab.value === 'all') return messages.value
  if (activeTab.value === 'unread') return messages.value.filter(m => !m.is_read)
  return messages.value.filter(m => m.type === activeTab.value)
})

// Actions
const handleMessageClick = async (msg: UserMessage) => {
  // Mark as read if unread
  if (!msg.is_read) {
    await messageApi.markAsRead(msg.id)
    msg.is_read = true
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  }
  // Navigate if link exists
  if (msg.link) {
    router.push(msg.link)
  }
}

const handleMarkAllRead = async () => {
  if (markingAll.value) return
  markingAll.value = true
  try {
    const res = await messageApi.markAllAsRead()
    if (res.success) {
      messages.value.forEach(m => m.is_read = true)
      unreadCount.value = 0
      ElMessage.success('已全部标记为已读')
    }
  } finally {
    markingAll.value = false
  }
}

// Helpers
const getIconClass = (type: string) => `type-${type}`

const getIconComponent = (type: string) => {
  const map: Record<string, any> = {
    system: Bell,
    order: ShoppingCart,
    activity: ChatDotRound,
    security: Warning,
  }
  return map[type] || Bell
}

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins} 分钟前`
  if (diffHours < 24) return `${diffHours} 小时前`
  if (diffDays < 7) return `${diffDays} 天前`
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.messages-section {
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

.read-all-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.read-all-btn:hover:not(:disabled) {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #3B82F6;
}
.read-all-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Tabs */
.message-tabs {
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

.badge {
  background: #EF4444;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 100px;
  font-weight: 600;
}

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
.message-list-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px 64px;
  min-height: 0;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Message Card */
.message-card {
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
}

.message-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.message-card.unread {
  background: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.15);
}

.message-card.clickable {
  cursor: pointer;
}

/* Icon */
.message-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.message-icon.type-system {
  background: rgba(59, 130, 246, 0.15);
  color: #3B82F6;
}
.message-icon.type-order {
  background: rgba(249, 115, 22, 0.15);
  color: #F97316;
}
.message-icon.type-activity {
  background: rgba(168, 85, 247, 0.15);
  color: #A855F7;
}
.message-icon.type-security {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}

/* Content */
.message-content {
  flex: 1;
  min-width: 0;
}

.message-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 12px;
}

.message-title {
  font-size: 15px;
  font-weight: 600;
  color: #E2E8F0;
}

.message-time {
  font-size: 12px;
  color: #64748B;
  white-space: nowrap;
}

.message-body {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.5;
}

.message-link-hint {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  font-size: 12px;
  color: #3B82F6;
}

/* Unread Dot */
.unread-dot {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
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

/* Pagination */
.pagination-wrap { margin-top: 24px; display: flex; justify-content: center; }

/* Transitions */
.list-move, .list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-20px); }
</style>