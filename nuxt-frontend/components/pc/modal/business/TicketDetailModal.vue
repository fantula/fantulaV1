<template>
  <BaseModal
    v-model:visible="isVisible"
    :title="`工单详情 ${currentTicketNo}`"
    width="700px"
    :show-footer="false"
    show-mascot
    mascot-position="right"
    @close="handleClose"
  >
    <div class="modal-body" v-loading="loading">
      
      <!-- Rich Order Info Card -->
         <div class="order-card-glass" v-if="orderDetail">
            <div class="card-image">
               <img :src="orderDetail.product_snapshot?.image" alt="Product" />
            </div>
            <div class="card-info">
               <div class="info-top">
                  <span class="order-no">订单号 #{{ orderDetail.order_no }}</span>
                  <span class="status-badge">{{ formatOrderStatus(orderDetail.status) }}</span>
               </div>
               <div class="product-name">{{ orderDetail.product_snapshot?.product_name }}</div>
               <div class="specs" v-if="orderDetail.sku_snapshot">
                  <span v-for="(val, key) in orderDetail.sku_snapshot.spec_combination" :key="key">{{ val }}</span>
               </div>
               <div class="price-row">
                  <span class="price">¥{{ orderDetail.total_amount?.toFixed(2) }}</span>
                  <span class="quantity">x{{ orderDetail.quantity }}</span>
               </div>
            </div>
         </div>
         <div class="order-card-loading" v-else-if="loadingOrder">
            <span class="loading-spinner"></span> 加载订单信息...
         </div>

      <!-- Ticket Meta -->
      <div class="ticket-meta-glass" v-if="ticketDetail">
          <div class="meta-row">
             <span class="label">提交时间:</span> <span class="val">{{ formatDate(ticketDetail.created_at) }}</span>
          </div>
          <div class="meta-row">
             <span class="label">当前状态:</span> 
             <span :class="['status-text', ticketDetail.status]">
                {{ ticketDetail.status === 'processing' ? '处理中' : '已解决' }}
             </span>
          </div>
      </div>

      <!-- Chat Container -->
      <div class="chat-container">
          <div v-for="(reply, idx) in replies" :key="idx" class="chat-message" :class="reply.sender">
             <!-- Admin Avatar -->
             <div v-if="reply.sender === 'admin'" class="avatar admin">服</div>
             
             <div class="message-content-wrapper">
                <div class="message-bubble">
                   <div class="msg-text">{{ reply.content }}</div>
                   
                   <!-- Attachments -->
                   <div v-if="reply.attachments && reply.attachments.length" class="msg-attachments">
                      <el-image 
                        v-for="url in reply.attachments" :key="url"
                        :src="url" 
                        class="attachment-img"
                        :preview-src-list="reply.attachments"
                        preview-teleported
                        fit="cover"
                      />
                   </div>
                </div>
                <div class="message-time">{{ formatDate(reply.time) }}</div>
             </div>

             <!-- User Avatar -->
             <div v-if="reply.sender === 'user'" class="avatar user">我</div>
          </div>
      </div>

      <!-- Reply Input -->
      <div class="reply-area" v-if="ticketDetail?.status === 'processing'">
          <textarea 
            v-model="replyContent" 
            class="reply-textarea" 
            placeholder="请输入您的回复... (Enter 发送)"
            @keydown.enter.prevent="submitReply"
            :disabled="replying"
          ></textarea>
          <div class="reply-actions">
             <button class="btn-send" @click="submitReply" :disabled="!replyContent.trim() || replying">
                {{ replying ? '发送中...' : '发送回复' }}
             </button>
          </div>
      </div>

    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ticketApi } from '@/api/client/ticket'
import { clientOrderApi, type ClientOrder } from '@/api/client/order'
import { useBizFormat } from '@/composables/common/useBizFormat'

const props = defineProps<{
  visible: boolean
  ticketId: string
}>()

const emit = defineEmits(['update:visible', 'close', 'reply-success'])

const { formatDate } = useBizFormat()
const isVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const currentTicketNo = computed(() => {
  if (ticketDetail.value?.ticket_no) return ticketDetail.value.ticket_no
  if (props.ticketId) return `T-${props.ticketId.substring(0, 8).toUpperCase()}`
  return ''
})

const loading = ref(false)
const loadingOrder = ref(false)
const replying = ref(false)
const ticketDetail = ref<any>(null)
const orderDetail = ref<ClientOrder | null>(null)
const replies = ref<any[]>([])
const replyContent = ref('')

const formatOrderStatus = (status: string) => {
  const map: Record<string, string> = {
    'active': '使用中',
    'completed': '已完成',
    'pending': '处理中',
    'expired': '已过期',
    'refunding': '退款中',
    'refunded': '已退款'
  }
  return map[status] || status
}

const loadData = async () => {
    if (!props.ticketId) return
    loading.value = true
    try {
        // 1. Get Ticket Detail
        const res = await ticketApi.getDetail(props.ticketId)
        if (res.success && res.data) {
            ticketDetail.value = res.data
            replies.value = res.data.replies.map((r: any) => ({
                sender: r.sender,
                content: r.content,
                attachments: r.attachments,
                time: r.time
            }))

            // 2. Fetch Order Detail if Order ID exists
            const orderId = res.data.orders?.id // Assuming ID is available in joined 'orders' from getDetail RPC?
            // Wait, ticketApi.getDetail returns 'orders: { order_no, ... }'. 
            // Usually we need the actual UUID to call clientOrderApi.getOrderDetail(uuid).
            // Let's check ticketApi response structure in previous file... It had `orders` object.
            // If the RPC doesn't return order ID, we might only have order_no.
            // But let's assume `orders` includes `id`. If not, we rely on what we have or need to update RPC.
            // UPDATE: In `tickets.vue` we saw `t.orders?.order_no`.
            // Let's assume we can get `orders.id`.
            
            if (res.data.orders?.id) {
               fetchOrderDetail(res.data.orders.id)
            } else if (res.data.order_id) {
               // Fallback if joined object is different
               fetchOrderDetail(res.data.order_id)
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

const fetchOrderDetail = async (id: string) => {
    loadingOrder.value = true
    try {
        const res = await clientOrderApi.getOrderDetail(id)
        if (res.success && res.data) {
            orderDetail.value = res.data
        }
    } finally {
        loadingOrder.value = false
    }
}

const submitReply = async () => {
    if (!replyContent.value.trim() || replying.value) return
    replying.value = true
    try {
        const res = await ticketApi.reply(props.ticketId, replyContent.value)
        if (res.success) {
            replyContent.value = ''
            await loadData() // Refresh chat
            emit('reply-success')
        }
    } finally {
        replying.value = false
    }
}

const handleClose = () => {
    emit('close')
}

watch(() => props.visible, (val) => {
    if (val && props.ticketId) {
        loadData()
    } else {
        // Reset
        ticketDetail.value = null
        orderDetail.value = null
        replies.value = []
    }
}, { immediate: true })
</script>

<style scoped>
.modal-body {
    display: flex; flex-direction: column; gap: 16px;
    height: 600px;
}

/* Rich Order Glass Card */
.order-card-glass {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08); /* Glass Border */
  border-radius: 12px;
  padding: 12px;
  display: flex; gap: 14px;
  transition: all 0.3s;
  flex-shrink: 0;
}
.order-card-glass:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.card-image {
  width: 72px; height: 72px; border-radius: 8px; overflow: hidden; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.05);
  background: #0F172A;
}
.card-image img { width: 100%; height: 100%; object-fit: cover; }

.card-info {
  flex: 1; display: flex; flex-direction: column; justify-content: space-between; py: 2px;
}

.info-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.order-no { font-size: 12px; color: #64748B; font-family: monospace; }
.status-badge { 
  font-size: 10px; padding: 2px 6px; border-radius: 4px; 
  background: rgba(59, 130, 246, 0.1); color: #3B82F6; border: 1px solid rgba(59, 130, 246, 0.2);
}

.product-name { font-size: 14px; font-weight: 600; color: #F1F5F9; line-height: 1.3; }

.specs { font-size: 12px; color: #94A3B8; display: flex; gap: 8px; margin-top: 2px; }
.price-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 4px; }
.price { font-size: 15px; font-weight: 700; color: #F97316; font-family: 'Outfit', sans-serif; }
.quantity { font-size: 12px; color: #64748B; }

.order-card-loading {
  height: 90px; display: flex; align-items: center; justify-content: center; 
  background: rgba(255,255,255,0.02); border-radius: 12px; color: #64748B; font-size: 13px; gap: 8px;
  flex-shrink: 0;
}
.loading-spinner {
  width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #3B82F6;
  border-radius: 50%; animation: spin 1s linear infinite;
}

/* Ticket Meta */
.ticket-meta-glass {
    display: flex; gap: 20px;
    background: rgba(255,255,255,0.02);
    border-radius: 8px; padding: 8px 12px;
    font-size: 13px; color: #94A3B8;
    border: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
}
.meta-row { display: flex; gap: 6px; align-items: center; }
.val { color: #E2E8F0; font-family: monospace; }
.status-text.processing { color: #3B82F6; }
.status-text.resolved { color: #10B981; }

/* Chat */
.chat-container {
    flex: 1;
    background: rgba(0,0,0,0.2);
    border-radius: 12px;
    padding: 16px;
    overflow-y: auto;
    display: flex; flex-direction: column; gap: 16px;
    border: 1px solid rgba(255,255,255,0.05);
}

.chat-message { display: flex; gap: 12px; }
.chat-message.user { justify-content: flex-end; }
.chat-message.admin { justify-content: flex-start; }

.avatar {
    width: 32px; height: 32px; border-radius: 50%; 
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; color: #fff; font-weight: 600;
    flex-shrink: 0;
}
.avatar.user { background: linear-gradient(135deg, #F97316, #EA580C); order: 2; margin-left: -4px;}
.avatar.admin { background: linear-gradient(135deg, #3B82F6, #2563EB); }

.message-content-wrapper { 
    max-width: 70%; display: flex; flex-direction: column; 
}
.chat-message.user .message-content-wrapper { align-items: flex-end; order: 1}
.chat-message.admin .message-content-wrapper { align-items: flex-start; }

.message-bubble {
    padding: 10px 14px; border-radius: 12px;
    font-size: 14px; line-height: 1.5; color: #E2E8F0;
    position: relative;
}
.chat-message.user .message-bubble { 
    background: rgba(249, 115, 22, 0.15); 
    border: 1px solid rgba(249, 115, 22, 0.3);
    border-top-right-radius: 2px;
}
.chat-message.admin .message-bubble { 
    background: rgba(59, 130, 246, 0.15); 
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-top-left-radius: 2px;
}

.msg-attachments { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
.attachment-img { width: 60px; height: 60px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; }

.message-time { font-size: 11px; color: #64748B; margin-top: 4px; }

/* Reply Area */
.reply-area {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 12px;
    display: flex; flex-direction: column; gap: 10px;
    flex-shrink: 0;
}
.reply-textarea {
    width: 100%; height: 60px; background: transparent; border: none; outline: none;
    color: #fff; font-size: 14px; resize: none;
}
.reply-textarea::placeholder { color: #64748B; }

.reply-actions { display: flex; justify-content: flex-end; }
.btn-send {
    padding: 6px 20px; background: #3B82F6; color: #fff; border: none; border-radius: 6px;
    font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
}
.btn-send:hover:not(:disabled) { background: #2563EB; }
.btn-send:disabled { background: #334155; color: #64748B; cursor: not-allowed; }

@keyframes spin { to { transform: rotate(360deg); } }
</style>
