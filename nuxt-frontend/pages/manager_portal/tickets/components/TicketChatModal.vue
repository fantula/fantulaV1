<template>
  <AdminDataDialog
    v-model="visible"
    title="工单详情与处理"
    width="900px"
    class="ticket-chat-modal"
    @closed="handleClose"
    :close-on-click-modal="false"
    destroy-on-close
    append-to-body
    :show-footer="false"
  >
    <div class="modal-layout" v-loading="loading">
       <!-- Error State -->
       <div v-if="error" class="flex flex-col items-center justify-center w-full h-full text-center">
          <el-icon class="text-red-500 mb-2" :size="40"><CircleCloseFilled /></el-icon>
          <div class="text-gray-600 mb-4">{{ error }}</div>
          <el-button type="primary" @click="loadData">
             <el-icon class="mr-1"><RefreshRight /></el-icon> 重试
          </el-button>
       </div>

       <!-- Content (Only show when loaded and no error) -->
       <template v-else-if="loaded">
           <!-- Left Sidebar: Info -->
           <div class="layout-sidebar">
              <!-- Ticket Status -->
              <div class="info-block">
                 <div class="label">工单状态</div>
                 <div class="value">
                    <el-tag :type="getTicketStatusType(ticket?.status)" effect="dark" size="large">
                       {{ getTicketStatusLabel(ticket?.status) }}
                    </el-tag>
                 </div>
              </div>

              <!-- User Info -->
              <div class="info-block">
                 <div class="label">提交用户</div>
                 <div class="user-card">
                    <el-avatar :size="32" class="user-avatar">
                       {{ ticket?.user_id?.substring(0,2).toUpperCase() }}
                    </el-avatar>
                    <div class="user-details">
                       <div class="uid">UID: {{ ticket?.user_id?.substring(0,8).toUpperCase() }}</div>
                       <div class="email" v-if="ticket?.profiles?.email">{{ ticket.profiles.email }}</div>
                    </div>
                 </div>
              </div>

              <!-- Associated Order Snapshot -->
              <div class="info-block" v-if="ticket?.orders">
                 <div class="label">关联订单快照</div>
                 <div class="order-card-large">
                     <img :src="ticket.orders.product_snapshot?.image" class="order-img-large" />
                     
                     <div class="order-details-rows">
                        <div class="detail-row">
                           <span class="row-label">订单号</span>
                           <span class="row-value font-mono copyable" @click="copyText(ticket.orders.order_no)">
                              {{ ticket.orders.order_no }}
                           </span>
                        </div>
                        <div class="detail-row">
                           <span class="row-label">商品</span>
                           <span class="row-value" :title="ticket.orders.product_snapshot?.product_name">
                              {{ ticket.orders.product_snapshot?.product_name }}
                           </span>
                        </div>
                        <div class="detail-row" v-if="ticket.orders.sku_snapshot?.spec_combination">
                           <span class="row-label">规格</span>
                           <span class="row-value spec-tag">
                              {{ Object.values(ticket.orders.sku_snapshot.spec_combination).join(' / ') }}
                           </span>
                        </div>
                        <div class="detail-row">
                           <span class="row-label">金额</span>
                           <span class="row-value price">¥{{ ticket.orders.total_amount?.toFixed(2) }}</span>
                        </div>
                        
                        <!-- Time Remaining -->
                        <div class="detail-row bg-blue-50 p-2 rounded mt-2 border border-blue-100" v-if="timeLeft">
                           <span class="row-label text-blue-600">剩余时间</span>
                           <span class="row-value font-bold text-blue-700">{{ timeLeft }}</span>
                        </div>
                     </div>
                 </div>
              </div>
              
              <!-- Created Time -->
              <div class="info-block">
                 <div class="label">创建时间</div>
                 <div class="value text-gray-500 text-sm">
                    {{ ticket ? new Date(ticket.created_at).toLocaleString() : '-' }}
                 </div>
              </div>
           </div>

           <!-- Right Content: Chat -->
           <div class="layout-main">
              <!-- Chat History -->
              <div class="chat-container custom-scrollbar" ref="chatBox">
                  <div v-if="messages.length === 0" class="empty-chat">
                     <el-empty description="暂无沟通记录" :image-size="60" />
                  </div>

                  <div v-for="(group, date) in groupedMessages" :key="date">
                     <div class="date-divider"><span>{{ date }}</span></div>
                     
                     <div v-for="msg in group" :key="msg.id" class="message-row" :class="{ 'is-admin': msg.is_admin }">
                        <el-avatar :size="32" :class="msg.is_admin ? 'avatar-admin' : 'avatar-user'">
                           {{ msg.is_admin ? '服' : '客' }}
                        </el-avatar>
                        
                        <div class="message-content">
                           <div class="bubble">
                              {{ msg.content }}
                           </div>
                           
                           <div class="meta">
                              <span>{{ formatTime(msg.created_at) }}</span>
                           </div>

                           <div v-if="msg.attachments?.length" class="attachments">
                              <el-image 
                                v-for="url in msg.attachments" :key="url"
                                :src="url" 
                                class="attachment-img"
                                :preview-src-list="msg.attachments"
                                preview-teleported
                                fit="cover"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
              </div>

              <!-- Action Footer -->
              <div class="chat-footer">
                  <!-- Debug: Show status if it's not processing or resolved (temporary) -->
                  <div v-if="ticket?.status !== 'processing' && ticket?.status !== 'resolved'" class="text-xs text-red-400 text-center mb-2">
                      当前状态异常: {{ ticket?.status }}
                  </div>

                  <div v-if="ticket?.status === 'processing'" class="action-area">
                     <!-- Pending Attachments Preview -->
                     <div v-if="pendingAttachments.length > 0" class="preview-area">
                        <div v-for="(url, index) in pendingAttachments" :key="index" class="preview-item">
                           <el-image :src="url" class="preview-img" fit="cover" />
                           <div class="remove-btn" @click="removeAttachment(index)">
                              <el-icon><Close /></el-icon>
                           </div>
                        </div>
                     </div>

                     <el-input 
                        v-model="replyText" 
                        type="textarea" 
                        :rows="3"
                        resize="none"
                        placeholder="请输入回复内容 (Cmd/Ctrl + Enter 发送)" 
                        @keydown.meta.enter="handleReply"
                        @keydown.ctrl.enter="handleReply"
                     />
                     
                     <div class="footer-buttons">
                         <!-- Hidden File Input -->
                         <input 
                            type="file" 
                            ref="fileInput" 
                            style="display: none" 
                            accept="image/jpeg,image/png,image/gif"
                            @change="handleFileSelect"
                         />
                         
                         <!-- Upload Button -->
                         <el-button type="info" plain @click="triggerUpload" :loading="isUploading" circle>
                            <el-icon><Picture /></el-icon>
                         </el-button>

                         <div class="flex-grow"></div>

                         <el-button type="success" plain @click="handleResolve" :loading="resolving">
                            <el-icon class="mr-1"><Check /></el-icon> 标记已解决
                         </el-button>
                         <el-button type="primary" @click="handleReply" :loading="sending" :disabled="!replyText.trim() && pendingAttachments.length === 0">
                            发送回复
                         </el-button>
                     </div>
                  </div>
                  
                  <div v-else-if="ticket?.status === 'resolved'" class="resolved-banner">
                     <el-icon class="text-green-500 mr-2"><CircleCheckFilled /></el-icon>
                     工单已结单，无法继续回复
                  </div>
              </div>
           </div>
       </template>
    </div>
  </AdminDataDialog>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, computed, watch, nextTick } from 'vue'
import { adminTicketApi, type TicketMessage } from '@/api/admin/ticket'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { confirmAction } from '@/composables/admin/useAdminDialog'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Check, CircleCheckFilled, RefreshRight, Picture, Close } from '@element-plus/icons-vue'
import { uploadImageToStorage } from '@/utils/uploadImage'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'

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
const loaded = ref(false)
const error = ref<string | null>(null)
const sending = ref(false)
const resolving = ref(false)
const messages = ref<TicketMessage[]>([])
const ticket = ref<any>(null)
const replyText = ref('')
const chatBox = ref<HTMLElement | null>(null)

// Upload State
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const pendingAttachments = ref<string[]>([])

// --- Helper Functions ---
const handleClose = () => {
    emit('closed')
}

const copyText = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    ElMessage.success('已复制')
}

const timeLeft = computed(() => {
    if (!ticket.value?.orders) return null
    const order = ticket.value.orders
    
    // Check various expiry fields
    const expiryStr = order.expires_at || order.end_time
    if (!expiryStr) return null
    
    const expiry = new Date(expiryStr).getTime()
    const now = new Date().getTime()
    const diff = expiry - now
    
    if (diff <= 0) return '已过期'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}天 ${hours}小时`
    return `${hours}小时`
})

const formatTime = (isoString: string) => {
   return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const isToday = (date: Date) => {
   const today = new Date()
   return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
}

const isYesterday = (date: Date) => {
   const yesterday = new Date()
   yesterday.setDate(yesterday.getDate() - 1)
   return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()
}

// --- Logic ---
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

const scrollToBottom = () => {
   nextTick(() => {
      if (chatBox.value) {
         chatBox.value.scrollTop = chatBox.value.scrollHeight + 200
      }
   })
}

const loadData = async () => {
   if (!props.ticketId) return
   
   loading.value = true
   error.value = null
   
   try {

      
      const [resDetail, resMsgs] = await Promise.all([
         adminTicketApi.getDetail(props.ticketId),
         adminTicketApi.getMessages(props.ticketId)
      ])

      if (resDetail.success) {
          ticket.value = resDetail.data
          loaded.value = true 
      } else {
          throw new Error(resDetail.error || '工单详情加载失败')
      }

      if (resMsgs.success) {
         messages.value = resMsgs.data
         scrollToBottom()

      }
   } catch(e: any) {

      error.value = e.message || '加载失败，请重试'
      loaded.value = false
   } finally {
      loading.value = false
   }
}

// --- Upload Logic ---
const triggerUpload = () => {
    fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return
    
    const file = input.files[0]
    
    // Validate
    if (file.size > 5 * 1024 * 1024) {
        ElMessage.warning('图片大小不能超过 5MB')
        input.value = ''
        return
    }
    
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        ElMessage.warning('只支持 JPG, PNG, GIF 格式')
        input.value = ''
        return
    }

    isUploading.value = true
    try {
        const { getAuthToken } = await import('@/utils/supabase')
        const token = await getAuthToken()
        
        if (!token) {
           ElMessage.error('请登录')
           isUploading.value = false
           return
        }

        const res = await uploadImageToStorage(file, 'tickets', undefined, token)
        if (res.success && res.url) {
            pendingAttachments.value.push(res.url)
        } else {
            ElMessage.error(res.error || '上传失败')
        }
    } catch (e) {
        ElMessage.error('上传出错')
    } finally {
        isUploading.value = false
        input.value = '' // Reset input
    }
}

const removeAttachment = (index: number) => {
    pendingAttachments.value.splice(index, 1)
}

const handleReply = async () => {
   if (!replyText.value.trim() && pendingAttachments.value.length === 0) return
   sending.value = true
   try {
      // Pass attachments
      const res = await adminTicketApi.reply(props.ticketId, replyText.value, pendingAttachments.value)
      if (res.success) {
         replyText.value = ''
         pendingAttachments.value = [] // Clear attachments
         ElMessage.success('发送成功')
         const resMsgs = await adminTicketApi.getMessages(props.ticketId)
         if (resMsgs.success) {
            messages.value = resMsgs.data
            scrollToBottom()
         }
      } else {
         ElMessage.error(res.error || '发送失败')
      }
   } catch (e) {
      ElMessage.error('系统错误')
   } finally {
      sending.value = false
   }
}

const handleResolve = async () => {
    const success = await confirmAction(
        '确定要将此工单标记为已解决吗？用户将无法再回复。',
        async () => {
             resolving.value = true
             try {
                 const res = await adminTicketApi.resolve(props.ticketId)
                 return res
             } finally {
                 resolving.value = false
             }
        },
        { 
            title: '确认结单', 
            confirmText: '确定结单', 
            type: 'warning',
            successMessage: '工单已结单'
        }
    )
    
    if (success) {
        await loadData()
    }
}

watch(() => props.modelValue, (val) => {
    if (val && props.ticketId) {
        messages.value = []
        ticket.value = null
        replyText.value = ''
        pendingAttachments.value = []
        error.value = null
        loaded.value = false
        
        loadData()
    }
}, { immediate: true })
</script>

<style scoped>
.modal-layout {
    display: flex;
    height: 600px; /* Fixed height for consistency */
    border-top: 1px solid #e5e7eb;
}

/* Sidebar */
.layout-sidebar {
    width: 260px;
    border-right: 1px solid #e5e7eb;
    background: #f9fafb;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.info-block .label {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.user-card {
    display: flex;
    align-items: center;
    gap: 10px;
}
.user-avatar { background: #dbeafe; color: #2563eb; font-weight: 600; font-size: 12px; }
.user-details { display: flex; flex-direction: column; min-width: 0; }
.uid { font-family: monospace; font-size: 12px; font-weight: 500; color: #374151; }
.email { font-size: 11px; color: #6b7280; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }

.order-card-large {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.order-img-large { width: 100%; height: 120px; border-radius: 6px; object-fit: cover; background: #f3f4f6; }

.order-details-rows { display: flex; flex-direction: column; gap: 8px; }
.detail-row { display: flex; justify-content: space-between; font-size: 12px; align-items: flex-start; }
.row-label { color: #6b7280; flex-shrink: 0; margin-right: 8px; }
.row-value { color: #374151; font-weight: 500; text-align: right; word-break: break-all; }
.copyable { cursor: pointer; color: #2563eb; }
.copyable:hover { text-decoration: underline; }
.spec-tag { background: #f3f4f6; color: #6b7280; padding: 1px 6px; border-radius: 4px; font-size: 11px; }
.price { font-weight: 600; color: #059669; }

/* Main Chat Area */
.layout-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
}

.chat-container {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.date-divider {
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 5;
}
.date-divider span {
    background: #f3f4f6;
    color: #9ca3af;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 10px;
}

.message-row { display: flex; gap: 12px; align-items: flex-start; }
.is-admin { flex-direction: row-reverse; }

.avatar-admin { background: #2563eb; color: white; font-size: 12px; }
.avatar-user { background: #9ca3af; color: white; font-size: 12px; }

.message-content {
    max-width: 70%;
    display: flex;
    flex-direction: column;
}
.is-admin .message-content { align-items: flex-end; }

.bubble {
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word;
    white-space: pre-wrap;
    position: relative;
}
.message-row:not(.is-admin) .bubble {
    background: #f3f4f6;
    color: #1f2937;
    border-top-left-radius: 0;
}
.message-row.is-admin .bubble {
    background: #eff6ff;
    border: 1px solid #dbeafe;
    color: #1e3a8a;
    border-top-right-radius: 0;
}

.meta { font-size: 10px; color: #9ca3af; margin-top: 4px; padding: 0 2px; }

.attachments { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
.is-admin .attachments { justify-content: flex-end; }
.attachment-img { width: 80px; height: 80px; border-radius: 4px; border: 1px solid #e5e7eb; }

/* Footer */
.chat-footer {
    padding: 16px;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
}

.footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 12px;
}

.resolved-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: #ecfdf5;
    border: 1px solid #d1fae5;
    border-radius: 6px;
    color: #059669;
    font-size: 14px;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }

/* Attachment Preview */
.preview-area {
    display: flex;
    gap: 10px;
    padding: 0 0 10px 0;
    flex-wrap: wrap;
}
.preview-item {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
}
.preview-img {
    width: 100%;
    height: 100%;
}
.remove-btn {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(0,0,0,0.6);
    color: white;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 10px;
}
.remove-btn:hover {
    background: rgba(0,0,0,0.8);
}
</style>
