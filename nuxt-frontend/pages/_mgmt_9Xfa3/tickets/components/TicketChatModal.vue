<template>
  <el-dialog
    v-model="visible"
    title="工单详情与回复"
    width="800px"
    @close="emit('closed')"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div class="h-[600px] flex flex-col" v-loading="loading">
       <!-- Header Info -->
       <div class="mb-4 p-3 bg-gray-50 rounded text-sm flex gap-4" v-if="ticket">
          <div><span class="text-gray-500">工单号:</span> {{ ticket.id.split('-').pop() }}</div>
          <div><span class="text-gray-500">关联订单:</span> {{ ticket.orders?.order_no }}</div>
          <div>
            <span class="text-gray-500">状态:</span> 
            <el-tag size="small" :type="ticket.status === 'processing' ? 'primary': 'success'">
               {{ ticket.status === 'processing' ? '处理中' : '已解决' }}
            </el-tag>
          </div>
       </div>

       <!-- Chat Area -->
       <div class="flex-1 overflow-y-auto p-4 bg-white border rounded mb-4 shadow-inner" ref="chatBox">
          <div v-for="msg in messages" :key="msg.id" class="mb-6 flex" :class="msg.is_admin ? 'justify-end' : 'justify-start'">
             <!-- Avatar Placeholder -->
             <div v-if="!msg.is_admin" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2 flex-shrink-0">
               客
             </div>
             
             <div class="max-w-[80%] flex flex-col" :class="msg.is_admin ? 'items-end' : 'items-start'">
                <div class="text-xs text-gray-400 mb-1">
                   {{ msg.is_admin ? '客服' : '用户' }} {{ new Date(msg.created_at).toLocaleString() }}
                </div>
                <div class="p-3 rounded-lg shadow-sm w-fit" 
                     :class="msg.is_admin ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'">
                   <!-- Text -->
                   <div class="whitespace-pre-wrap text-sm text-gray-800 break-words">{{ msg.content }}</div>
                   <!-- Images -->
                   <div v-if="msg.attachments && msg.attachments.length" class="mt-2 flex gap-2 flex-wrap">
                      <el-image 
                        v-for="url in msg.attachments" :key="url"
                        :src="url" 
                        class="w-24 h-24 rounded border object-cover cursor-pointer"
                        :preview-src-list="msg.attachments"
                        preview-teleported
                        fit="cover"
                      >
                         <template #error>
                            <div class="w-full h-full flex items-center justify-center bg-gray-100 text-xs text-gray-400 text-center p-1">
                               图片已过期
                            </div>
                         </template>
                      </el-image>
                   </div>
                </div>
             </div>

             <div v-if="msg.is_admin" class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white ml-2 flex-shrink-0">
                服
             </div>
          </div>
       </div>

       <!-- Action Area -->
       <div class="border-t pt-4">
          <div class="flex justify-between items-center mb-2" v-if="ticket?.status === 'processing'">
             <div class="text-sm text-gray-500">
             </div>
             <el-button type="success" size="small" @click="handleResolve" :loading="resolving" plain>
                <el-icon class="mr-1"><Check /></el-icon> 标记为已解决
             </el-button>
          </div>
          <div v-else-if="ticket" class="mb-4 text-center text-orange-500 bg-orange-50 p-2 rounded text-sm">
             此工单已于 {{ new Date(ticket.resolved_at).toLocaleString() }} 结单。
          </div>

          <div v-if="ticket?.status === 'processing'" class="flex gap-2">
             <el-input 
                v-model="replyText" 
                type="textarea" 
                :rows="3" 
                placeholder="输入回复内容..." 
             />
             <div class="flex flex-col gap-2 justify-end">
                <el-button type="primary" @click="handleReply" :disabled="!replyText.trim() || sending" :loading="sending">
                   发送
                </el-button>
             </div>
          </div>
       </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { adminTicketApi, type TicketMessage } from '@/api/admin/ticket'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: boolean
  ticketId: string
}>()

const emit = defineEmits(['update:modelValue', 'closed'])

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

const scrollToBottom = () => {
   nextTick(() => {
      if (chatBox.value) {
         chatBox.value.scrollTop = chatBox.value.scrollHeight + 100
      }
   })
}

const loadData = async () => {
   if (!props.ticketId) return
   loading.value = true
   try {
      // 1. Get Details
      const resDetail = await adminTicketApi.getDetail(props.ticketId)
      if (resDetail.success) {
         ticket.value = resDetail.data
      }

      // 2. Get Messages
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
         // Refresh messages
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
      await ElMessageBox.confirm('确定要将此工单标记为已解决吗？用户将无法再回复。', '确认结单', {
         type: 'warning'
      })
      
      resolving.value = true
      const res = await adminTicketApi.resolve(props.ticketId)
      if (res.success) {
         ElMessage.success('工单已结单')
         await loadData() // Refresh status
      } else {
         ElMessage.error('操作失败')
      }
   } catch (e) {
      // Cancel
   } finally {
      resolving.value = false
   }
}

onMounted(() => {
   loadData()
})

watch(() => props.ticketId, (newId) => {
   if (newId && visible.value) {
      loadData()
   }
})
</script>
