<template>
  <div class="mobile-page">
    <div class="page-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <h1 class="page-title">工单详情</h1>
      <div class="header-right"></div>
    </div>

    <div class="chat-container" ref="chatContainer">
       <div v-if="loading" class="loading-state">
          <el-icon class="is-loading"><Loading /></el-icon>
       </div>

       <div v-else class="messages-list">
          <!-- Ticket Info Header -->
          <div class="ticket-info-card">
              <div class="info-row">
                  <span class="label">工单号:</span> {{ ticketInfo?.ticket_no || ticketInfo?.id }}
              </div>
              <div class="info-row">
                  <span class="label">状态:</span> {{ ticketInfo?.status === 'processing' ? '处理中' : '已解决' }}
              </div>
              <div class="info-row">
                  <span class="label">标题:</span> {{ ticketInfo?.title }}
              </div>
          </div>

          <!-- Messages -->
          <div 
            v-for="msg in messages" 
            :key="msg.id" 
            class="message-item"
            :class="{ 'is-me': msg.sender === 'user' }"
          >
             <div class="message-bubble">{{ msg.content }}</div>
             <div class="message-time">{{ formatTime(msg.time) }}</div>
          </div>
       </div>
    </div>

    <!-- Input Area -->
    <div class="input-area">
       <input 
         v-model="replyContent" 
         type="text" 
         class="chat-input" 
         placeholder="请输入回复内容..."
         @keyup.enter="handleReply"
       />
       <button class="send-btn" @click="handleReply" :disabled="!replyContent || sending">
          <el-icon v-if="sending" class="is-loading"><Loading /></el-icon>
          <span v-else>发送</span>
       </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Loading } from '@element-plus/icons-vue'
import { ticketApi } from '@/api/client/ticket'
import { ElMessage } from 'element-plus'
import { useBizFormat } from '@/composables/common/useBizFormat' // Assuming formatTime or similar helper

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const route = useRoute()
const ticketId = route.params.id as string

const loading = ref(true)
const sending = ref(false)
const ticketInfo = ref<any>(null)
const messages = ref<any[]>([])
const replyContent = ref('')
const chatContainer = ref<HTMLElement | null>(null)

const fetchDetail = async () => {
   loading.value = true
   try {
      const res = await ticketApi.getDetail(ticketId)
      if(res.success && res.data) {
          ticketInfo.value = res.data
          messages.value = res.data.replies || []
          scrollToBottom()
      } else {
          ElMessage.error('工单不存在')
          router.back()
      }
   } catch(e) {
      ElMessage.error('网络错误')
   } finally {
      loading.value = false
   }
}

const handleReply = async () => {
   if(!replyContent.value.trim() || sending.value) return
   
   sending.value = true
   try {
      const res = await ticketApi.reply(ticketId, replyContent.value)
      if(res.success) {
         // Optimistic update or refresh
         // Refresh is safer to get server time etc
         await fetchDetail()
         replyContent.value = ''
      } else {
         ElMessage.error(res.error || '发送失败')
      }
   } catch(e) {
      ElMessage.error('网络错误')
   } finally {
      sending.value = false
   }
}

const formatTime = (time: string) => {
   const date = new Date(time)
   return `${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

const scrollToBottom = async () => {
    await nextTick()
    if(chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

onMounted(() => {
   fetchDetail()
})
</script>

<style scoped>
.mobile-page {
  height: 100vh;
  background: #0F172A;
  display: flex; flex-direction: column;
  color: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(255,255,255,0.05);
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

.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.loading-state {
    display: flex; justify-content: center; padding: 20px; font-size: 24px;
}

.ticket-info-card {
    background: rgba(255,255,255,0.05);
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 12px; color: #94A3B8;
}
.info-row { margin-bottom: 4px; }
.info-row .label { color: #64748B; margin-right: 4px; }

.messages-list {
    display: flex; flex-direction: column; gap: 16px;
}

.message-item {
    display: flex; flex-direction: column; align-items: flex-start;
    max-width: 80%;
}
.message-item.is-me {
    align-items: flex-end; align-self: flex-end;
}

.message-bubble {
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px; line-height: 1.4;
    word-break: break-all;
}
.message-item.is-me .message-bubble {
    background: #3B82F6; color: #fff;
    border-bottom-right-radius: 2px;
}
.message-item:not(.is-me) .message-bubble {
    background: #1E293B; color: #E2E8F0;
    border-bottom-left-radius: 2px;
}

.message-time {
    font-size: 10px; color: #64748B; margin-top: 4px;
}

.input-area {
    padding: 12px 16px;
    background: #1E293B;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; gap: 10px;
    /* Safe area for iPhone X+ */
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
}

.chat-input {
    flex: 1;
    height: 36px;
    border-radius: 18px;
    background: #0F172A;
    border: none;
    padding: 0 16px;
    color: #fff; font-size: 14px;
}
.chat-input:focus { outline: 1px solid #3B82F6; }

.send-btn {
    height: 36px; padding: 0 16px;
    background: #3B82F6;
    border: none; border-radius: 18px;
    color: #fff; font-size: 14px; font-weight: 600;
}
.send-btn:disabled { opacity: 0.5; background: #334155; }
</style>
