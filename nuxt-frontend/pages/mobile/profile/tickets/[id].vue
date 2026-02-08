<template>
  <div class="mobile-page">
    <MobileSubPageHeader title="工单详情" />

    <div class="chat-container" ref="chatContainer">
       <div v-if="loading" class="loading-state">
          <div class="spinner-premium"></div>
       </div>

       <div v-else class="content-wrapper">
          <!-- 1. Product Info (Reused) -->
          <div class="section-card" v-if="productData">
              <div class="section-title">关联商品</div>
              <MobileOrderProductInfo :order="productData" />
          </div>

          <!-- 2. Ticket Status Card (Compact) -->
          <div class="info-card-glass ticket-status-card">
              <div class="card-head">
                  <div class="status-badge" :class="ticketInfo?.status">
                      <div class="dot"></div>
                      {{ getStatusText(ticketInfo?.status) }}
                  </div>
                  <div class="ticket-no">NO. {{ ticketInfo?.ticket_no || ticketInfo?.id }}</div>
              </div>
              
              <div class="card-body">
                  <div class="desc-row">
                      <span class="label">问题:</span>
                      <span class="val text-highlight">{{ ticketInfo?.title }}</span>
                  </div>
                  <div class="time-row">
                      {{ formatTime(ticketInfo?.created_at) }}
                  </div>
              </div>
          </div>

          <!-- 3. Chat History -->
          <div class="divider">
              <span>沟通记录</span>
          </div>

          <div class="messages-list">
              <div 
                v-for="msg in messages" 
                :key="msg.id" 
                class="message-item"
                :class="{ 'is-me': msg.sender === 'user' }"
              >
                 <!-- Avatar -->
                 <div class="msg-avatar">
                     <img v-if="msg.sender === 'user'" :src="userStore.user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" />
                     <div v-else class="service-icon"><el-icon><Headset /></el-icon></div>
                 </div>

                 <div class="msg-content-wrapper">
                     <div class="message-bubble">
                        {{ msg.content }}
                     </div>
                     <div class="message-time">{{ formatTime(msg.time) }}</div>
                 </div>
              </div>
          </div>
       </div>
    </div>

    <!-- Input Area (Fixed Bottom - No TabBar) -->
    <div class="input-area-glass">
       <div class="input-wrapper">
           <input 
             v-model="replyContent" 
             type="text" 
             class="glass-input" 
             placeholder="请输入回复内容..."
             @keyup.enter="handleReply"
           />
           <button class="send-btn" @click="handleReply" :disabled="!replyContent || sending">
              <div v-if="sending" class="spinner-mini"></div>
              <span v-else>发送</span>
           </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Headset } from '@element-plus/icons-vue'
import { ticketApi } from '@/api/client/ticket'
import { useUserStore } from '@/stores/client/user'
import { useToast } from '@/composables/mobile/useToast'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
import MobileOrderProductInfo from '@/components/mobile/order/MobileOrderProductInfo.vue'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth',
  hideTabBar: true // Hide global TabBar for full-screen chat experience
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { showToast } = useToast()
const ticketId = route.params.id as string

const loading = ref(true)
const sending = ref(false)
const ticketInfo = ref<any>(null)
const messages = ref<any[]>([])
const replyContent = ref('')
const chatContainer = ref<HTMLElement | null>(null)

// Map Ticket Order to Product Card Props
const productData = computed(() => {
    if (!ticketInfo.value?.orders) return null
    const o = ticketInfo.value.orders
    const snap = o.product_snapshot || {}
    
    // Debug: Check which spec field is available
    // MobileOrderProductInfo uses: order.skuSpec OR order.spec_text
    // We map to skuSpec here.
    // Try to find ANY spec string.
    const spec = snap.spec || snap.sku_spec || snap.spec_text || o.spec_text || '标准规格'
    
    return {
        productImage: snap.image || '',
        productName: snap.product_name || '未知商品',
        skuSpec: spec, 
        order_no: o.order_no,
        quantity: snap.quantity || 1
    }
})

const fetchDetail = async () => {
   loading.value = true
   try {
      const res = await ticketApi.getDetail(ticketId)
      if(res.success && res.data) {
          ticketInfo.value = res.data
          messages.value = res.data.replies || []
          scrollToBottom()
      } else {
          showToast('工单不存在', 'error')
          router.back()
      }
   } catch(e) {
      showToast('网络错误', 'error')
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
         await fetchDetail()
         replyContent.value = ''
      } else {
         showToast(res.error || '发送失败', 'error')
      }
   } catch(e) {
      showToast('网络错误', 'error')
   } finally {
      sending.value = false
   }
}

const getStatusText = (status: string) => {
    const map: Record<string, string> = {
        'pending': '排队中',
        'processing': '处理中',
        'resolved': '已回复',
        'closed': '已结束'
    }
    return map[status] || status
}

const formatTime = (time: string) => {
   if (!time) return ''
   const date = new Date(time)
   return `${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}

const scrollToBottom = async () => {
    await nextTick()
    if(chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight + 100
    }
}

onMounted(() => {
   fetchDetail()
})
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  background: #0F172A; /* Global BG */
  display: flex; flex-direction: column;
  /* Reduced padding since TabBar is hidden */
  padding-bottom: calc(70px + env(safe-area-inset-bottom)); 
}

/* Chat Container */
.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px;
    scroll-behavior: smooth;
}

.content-wrapper {
    display: flex; flex-direction: column; gap: 16px;
}

.section-title {
    font-size: 12px; color: #64748B; margin-bottom: 8px; padding-left: 4px;
}

/* Loading */
.loading-state {
    display: flex; justify-content: center; padding: 40px;
}
.spinner-premium {
    width: 30px; height: 30px;
    border: 3px solid rgba(56, 189, 248, 0.2);
    border-top-color: var(--cyber-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
.spinner-mini {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Compact Ticket Status Card */
.ticket-status-card {
    padding: 12px 16px !important;
}
.card-head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 8px;
}
.status-badge {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600;
}
.status-badge .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.status-badge.processing, .status-badge.pending { color: #FACC15; }
.status-badge.resolved { color: #4ADE80; }
.status-badge.closed { color: #94A3B8; }

.ticket-no { font-family: 'Monaco', monospace; font-size: 11px; color: #64748B; }

.card-body { display: flex; flex-direction: column; gap: 4px; }
.desc-row { font-size: 13px; color: #E2E8F0; line-height: 1.4; }
.desc-row .label { color: #64748B; margin-right: 6px; }
.time-row { font-size: 11px; color: #64748B; text-align: right; margin-top: 4px; }

/* Divider */
.divider {
    display: flex; align-items: center; justify-content: center;
    margin: 10px 0; color: #64748B; font-size: 12px;
}
.divider::before, .divider::after {
    content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05); margin: 0 12px;
}

/* Chat Messages */
.messages-list {
    display: flex; flex-direction: column; gap: 20px;
}
.message-item {
    display: flex; gap: 12px;
    max-width: 85%;
}
.message-item.is-me {
    align-self: flex-end; flex-direction: row-reverse;
}

/* Avatar */
.msg-avatar {
    width: 36px; height: 36px; flex-shrink: 0;
}
.msg-avatar img {
    width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
    border: 1px solid rgba(255,255,255,0.1);
}
.service-icon {
    width: 100%; height: 100%; border-radius: 50%;
    background: linear-gradient(135deg, #3B82F6, #06B6D4);
    display: flex; align-items: center; justify-content: center;
    color: #fff;
}

/* Bubble */
.message-bubble {
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px; line-height: 1.5;
    word-break: break-all;
    position: relative;
}
.message-item.is-me .message-bubble {
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    color: #fff;
    border-top-right-radius: 2px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}
.message-item:not(.is-me) .message-bubble {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255,255,255,0.05);
    color: #E2E8F0;
    border-top-left-radius: 2px;
}

.message-time {
    font-size: 10px; color: #64748B; margin-top: 6px;
    text-align: right;
}
.message-item:not(.is-me) .message-time { text-align: left; }


/* Fixed Input Area - No TabBar below */
.input-area-glass {
    position: fixed; 
    bottom: 0; left: 0; right: 0;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 10px 16px;
    padding-bottom: calc(10px + env(safe-area-inset-bottom));
    z-index: 100;
}
.input-wrapper {
    display: flex; gap: 10px; alignItems: center;
}
.glass-input {
    flex: 1; height: 40px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 0 16px;
    color: #fff; font-size: 14px;
    transition: all 0.3s;
}
.glass-input:focus {
    border-color: var(--cyber-primary);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.1);
}
.send-btn {
    height: 40px; padding: 0 20px;
    background: linear-gradient(135deg, var(--cyber-primary), #0EA5E9);
    border-radius: 20px;
    color: #fff; font-weight: 600; font-size: 14px;
    border: none;
    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
    display: flex; align-items: center; justify-content: center;
}
.send-btn:disabled {
    opacity: 0.5; box-shadow: none; background: #334155;
}
</style>
