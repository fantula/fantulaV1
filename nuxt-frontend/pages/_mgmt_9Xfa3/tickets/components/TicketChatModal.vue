<template>
  <el-dialog
    v-model="visible"
    title="工单详情与回复"
    width="800px"
    class="ticket-chat-modal"
    @close="emit('closed')"
    :close-on-click-modal="false"
    destroy-on-close
    align-center
  >
    <div class="flex flex-col h-[650px]" v-loading="loading">
       <!-- Header Info -->
       <div class="px-5 py-4 border-b bg-gray-50 flex items-start gap-4">
          <!-- Left: Order Info -->
          <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                  <span class="text-base font-bold text-gray-900 font-mono">
                     {{ ticket?.ticket_no || `T-${ticket?.id?.substring(0,8).toUpperCase()}` }}
                  </span>
                  <el-tag size="small" :type="getTicketStatusType(ticket?.status)" effect="dark">
                     {{ getTicketStatusLabel(ticket?.status) }}
                  </el-tag>
                  <span class="text-xs text-gray-500">
                     {{ new Date(ticket?.created_at).toLocaleString() }}
                  </span>
              </div>

              <!-- Order Card (Admin Style: Compact & Clean) -->
              <div class="flex items-center gap-3 p-3 rounded border border-gray-200 bg-white" v-if="ticket?.orders">
                  <div class="shrink-0 w-12 h-12 border border-gray-200 rounded overflow-hidden">
                      <img :src="ticket.orders.product_snapshot?.image" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 truncate">
                          {{ ticket.orders.product_snapshot?.product_name }}
                      </div>
                      <div class="text-xs text-gray-500 flex items-center gap-2 mt-1">
                          <span class="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">#{{ ticket.orders.order_no }}</span>
                      </div>
                  </div>
                  <div class="text-right pl-4 border-l border-gray-100">
                      <div class="font-mono text-sm font-bold text-gray-900">¥{{ ticket.orders.total_amount?.toFixed(2) }}</div>
                  </div>
              </div>
          </div>

          <!-- Right: User Info -->
          <div class="w-48 bg-white p-3 rounded border border-gray-200 flex flex-col items-center justify-center shrink-0">
              <el-avatar :size="36" class="mb-1 bg-blue-100 text-blue-600 font-mono">
                 {{ ticket?.user_id?.substring(0,2).toUpperCase() }}
              </el-avatar>
              <div class="text-xs font-mono font-bold text-gray-700">UID: {{ ticket?.user_id?.substring(0,8).toUpperCase() }}</div>
              <div class="text-xs text-gray-500 scale-90 mt-0.5" v-if="ticket?.profiles?.email">
                 {{ ticket.profiles.email }}
              </div>
          </div>
       </div>

       <!-- Chat Area -->
       <div class="flex-1 overflow-y-auto p-5 bg-white space-y-6 custom-scrollbar" ref="chatBox">
          <div v-if="loading && messages.length === 0" class="space-y-4 opacity-50">
             <!-- Simple loading placeholder -->
             <div class="flex justify-center text-gray-400 text-sm">加载消息记录...</div>
          </div>

          <div v-for="(group, date) in groupedMessages" :key="date">
             <div class="flex justify-center mb-4 sticky top-0 z-10">
                <span class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full border border-gray-200">
                   {{ date }}
                </span>
             </div>

             <div class="space-y-4">
                <div v-for="msg in group" :key="msg.id" class="flex gap-3" :class="msg.is_admin ? 'flex-row-reverse' : ''">
                   <el-avatar 
                     :size="32" 
                     :class="msg.is_admin ? 'bg-blue-600' : 'bg-gray-400'"
                     class="shrink-0"
                   >
                      {{ msg.is_admin ? '服' : '客' }}
                   </el-avatar>
                   
                   <div class="max-w-[80%] flex flex-col" :class="msg.is_admin ? 'items-end' : 'items-start'">
                      <div 
                        class="p-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap break-words border"
                        :class="[
                           msg.is_admin 
                             ? 'bg-blue-50 border-blue-100 text-gray-800' 
                             : 'bg-gray-50 border-gray-200 text-gray-800'
                        ]"
                      >
                         {{ msg.content }}
                      </div>
                      
                      <div class="text-[10px] text-gray-400 mt-1 px-1 select-none">
                         {{ formatTime(msg.created_at) }}
                      </div>

                      <div v-if="msg.attachments?.length" class="mt-2 flex flex-wrap gap-2" :class="msg.is_admin ? 'justify-end' : ''">
                         <el-image 
                           v-for="url in msg.attachments" :key="url"
                           :src="url" 
                           class="rounded border border-gray-200 bg-white"
                           style="width: 80px; height: 80px;"
                           :preview-src-list="msg.attachments"
                           preview-teleported
                           fit="cover"
                         />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div v-if="!loading && messages.length === 0" class="flex flex-col items-center justify-center py-20">
             <span class="text-gray-400 text-sm">暂无沟通记录</span>
          </div>
       </div>

       <!-- Footer -->
       <div class="p-4 border-t bg-gray-50 relative z-10">
          <div v-if="ticket?.status === 'processing'" class="flex flex-col gap-3">
             <el-input 
                v-model="replyText" 
                type="textarea" 
                :rows="3"
                resize="none"
                placeholder="请输入回复内容..." 
                @keydown.meta.enter="handleReply"
                @keydown.ctrl.enter="handleReply"
                class="bg-white"
             />

             <div class="flex justify-between items-center">
                 <div class="text-xs text-gray-400">
                     按 <span class="font-bold">Cmd+Enter</span> 发送
                 </div>
                 <div class="flex gap-3">
                     <el-button type="success" plain size="small" @click="handleResolve" :loading="resolving">
                        <el-icon class="mr-1"><Check /></el-icon> 标记已解决
                     </el-button>
                     <el-button type="primary" size="small" @click="handleReply" :loading="sending" :disabled="!replyText.trim()">
                        发送回复
                     </el-button>
                 </div>
             </div>
          </div>
          
          <div v-else class="flex items-center justify-center py-4 bg-gray-100 rounded border border-gray-200">
             <el-icon size="16" class="text-green-600 mr-2"><CircleCheckFilled /></el-icon>
             <span class="text-gray-600 text-sm">此工单已结单，无法继续回复。</span>
          </div>
       </div>

       <!-- Phantom Mascot -->
       <img 
          src="/images/modal/pc/mascot_01.png" 
          class="modal-mascot-phantom"
       />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { adminTicketApi, type TicketMessage } from '@/api/admin/ticket'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Check, CircleCheckFilled, Close } from '@element-plus/icons-vue' // Added Close icon

const props = defineProps<{
  modelValue: boolean
  ticketId: string
}>()

const emit = defineEmits(['update:modelValue', 'closed'])

const { getTicketStatusLabel, getTicketStatusType } = useBizConfig()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const loading = ref(false)
const sending = ref(false)
const resolving = ref(false)
const messages = ref<TicketMessage[]>([])
const ticket = ref<any>(null)
const replyText = ref('')
const chatBox = ref<HTMLElement | null>(null)

// --- Grouping Logic ---
const groupedMessages = computed(() => {
   const groups: Record<string, TicketMessage[]> = {}
   messages.value.forEach(msg => {
      const date = new Date(msg.created_at)
      const dateStr = isToday(date) ? '今天' : 
                      isYesterday(date) ? '昨天' : 
                      date.toLocaleDateString()
      if (!groups[dateStr]) groups[dateStr] = []
      groups[dateStr].push(msg)
   })
   return groups
})

const isToday = (date: Date) => {
   const today = new Date()
   return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

const isYesterday = (date: Date) => {
   const yesterday = new Date()
   yesterday.setDate(yesterday.getDate() - 1)
   return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()
}

const formatTime = (isoString: string) => {
   return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
   nextTick(() => {
      if (chatBox.value) {
         chatBox.value.scrollTop = chatBox.value.scrollHeight + 500
      }
   })
}

const loadData = async () => {
   if (!props.ticketId) return
   // Don't set loading true if it's just a refresh, only on initial open
   if (!ticket.value || ticket.value.id !== props.ticketId) {
      loading.value = true
   }
   
   try {
      const resDetail = await adminTicketApi.getDetail(props.ticketId)
      if (resDetail.success) ticket.value = resDetail.data

      const resMsgs = await adminTicketApi.getMessages(props.ticketId)
      if (resMsgs.success) {
         messages.value = resMsgs.data
         scrollToBottom()
      }
   } catch(e) {
      ElMessage.error('加载失败')
   } finally {
      loading.value = false
   }
}

const handleReply = async () => {
   if (!replyText.value.trim()) return
   sending.value = true
   try {
      const res = await adminTicketApi.reply(props.ticketId, replyText.value)
      if (res.success) {
         replyText.value = ''
         ElMessage.success('发送成功')
         const resMsgs = await adminTicketApi.getMessages(props.ticketId)
         if (resMsgs.success) {
            messages.value = resMsgs.data
            scrollToBottom()
         }
      } else {
         ElMessage.error('发送失败')
      }
   } catch (e) {
      ElMessage.error('系统错误')
   } finally {
      sending.value = false
   }
}

const handleResolve = async () => {
   try {
      await ElMessageBox.confirm('确定要将此工单标记为已解决吗？用户将无法再回复。', '确认结单', { type: 'warning' })
      resolving.value = true
      const res = await adminTicketApi.resolve(props.ticketId)
      if (res.success) {
         ElMessage.success('工单已结单')
         await loadData()
      } else {
         ElMessage.error('操作失败')
      }
   } catch (e) {} finally {
      resolving.value = false
   }
}

onMounted(() => {
   loadData()
})

watch(() => props.ticketId, (newId) => {
   if (newId && visible.value) {
      // Clear old state before load
      messages.value = []
      ticket.value = null
      loadData()
   }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }

/* Phantom Mascot Style (Color Version) */
.modal-mascot-phantom {
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 350px; /* Constrained width */
  height: auto;
  opacity: 0.15;
  pointer-events: none;
  z-index: 0; 
  mask-image: linear-gradient(to top, black 30%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 30%, transparent 100%);
  filter: none !important;
  mix-blend-mode: normal;
  
  /* Standard Animation */
  animation: mascot-rise 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.1s;
  --start-transform: translateY(50px) scale(0.9);
  --end-transform: translateY(0px) scale(1);
}

@keyframes mascot-rise {
  0% { opacity: 0; transform: var(--start-transform); }
  100% { opacity: 0.1; transform: var(--end-transform); }
}
/* Bubble Tails */
.chat-bubble-user {
   border-top-left-radius: 0;
}
.chat-bubble-admin {
   border-top-right-radius: 0;
}

/* Custom Textarea Polish */
:deep(.el-textarea__inner) {
   box-shadow: none !important;
   border: 1px solid #e5e7eb;
   background-color: #f9fafb;
   padding: 12px;
   font-size: 14px;
   transition: all 0.2s;
}
:deep(.el-textarea__inner:focus) {
   background-color: #fff;
   border-color: #3b82f6;
   box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
}

/* Modal Tweaks */
:global(.ticket-chat-modal .el-dialog__header) {
   display: none; /* Hide default header to use custom one */
}
:global(.ticket-chat-modal .el-dialog__body) {
   padding: 0 !important;
}
</style>
