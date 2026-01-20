<template>
  <div class="tickets-section">
    <div class="section-header">
      <h2 class="section-title">我的工单</h2>
      <button class="apply-btn" @click="showTicketApplyModal = true">+ 申请工单</button>
    </div>
    <div class="tickets-tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab-item', { active: activeTab === tab.key }]"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tickets-list">
      <div class="ticket-card" v-for="ticket in filteredTickets" :key="ticket.id" :class="ticket.statusClass">
        <!-- 标题区域 -->
        <div class="ticket-header-section">
          <span class="ticket-id">工单 #{{ ticket.id }}</span>
          <div class="ticket-status-circle" :class="ticket.statusClass">{{ ticket.statusText }}</div>
        </div>
        
        <!-- 内容区域 -->
        <div class="ticket-content-section">
          <div class="ticket-main-content">
            <div class="ticket-content">{{ ticket.content }}</div>
            <div class="ticket-meta">
              <div class="meta-item">提交时间：{{ ticket.time }}</div>
              <div class="meta-item">关联订单：<span class="order-link">#{{ ticket.orderId }}</span></div>
            </div>
          </div>
          
          <!-- 操作按钮区域 -->
          <div class="ticket-actions-right">
            <button class="action-btn-small view-detail" @click="openViewModal(ticket)">
              <i class="icon-view"></i>
              查看详情
            </button>
            <button v-if="ticket.status === 'processing'" class="action-btn-small add-reply" @click="openReplyModal(ticket)">
              <i class="icon-reply"></i>
              添加回复
            </button>
            <button v-if="ticket.status === 'resolved'" class="action-btn-small add-reply" @click="openReplyModal(ticket)">
              <i class="icon-reply"></i>
              添加回复
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TicketApplyModal v-if="showTicketApplyModal" @close="showTicketApplyModal = false" />

  <!-- 查看工单详情弹窗 -->
  <div v-if="showViewModal" class="modal-mask" @click.self="showViewModal = false">
    <div class="ticket-view-modal">
      <div class="modal-header">
        <span class="modal-title">工单详情 #{{ currentTicket?.id }}</span>
        <button class="modal-close" @click="showViewModal = false">×</button>
      </div>
      <div class="modal-body">
        <div class="ticket-info-summary">
          <div class="info-row"><span class="label">提交时间:</span> {{ currentTicket?.time }}</div>
          <div class="info-row"><span class="label">关联订单:</span> <span class="link">#{{ currentTicket?.orderId }}</span></div>
          <div class="info-row"><span class="label">当前状态:</span> <span :class="['status-text', currentTicket?.status]">{{ currentTicket?.statusText }}</span></div>
        </div>
        <div class="chat-container">
          <div v-for="(reply, idx) in currentTicket?.replies" :key="idx" class="chat-message" :class="reply.sender">
            <div class="message-content">
              <div class="message-text">{{ reply.content }}</div>
              <div class="message-time">{{ reply.time }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" v-if="currentTicket?.status === 'processing'">
        <button class="btn-primary" @click="showViewModal = false; openReplyModal(currentTicket)">回复工单</button>
      </div>
    </div>
  </div>

  <!-- 添加回复弹窗 -->
  <div v-if="showReplyModal" class="modal-mask" @click.self="showReplyModal = false">
    <div class="ticket-reply-modal">
      <div class="modal-header">
        <span class="modal-title">添加回复</span>
        <button class="modal-close" @click="showReplyModal = false">×</button>
      </div>
      <div class="modal-body">
        <textarea v-model="replyContent" class="reply-textarea" placeholder="请输入您的回复内容..." rows="5"></textarea>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" @click="showReplyModal = false">取消</button>
        <button class="btn-primary" @click="submitReply">提交回复</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TicketApplyModal from '@/components/TicketApplyModal.vue'
import { http } from '@/utils/request'

// 标签页数据
const tabs = [
  { key: 'all', label: '全部工单' },
  { key: 'processing', label: '进行中' },
  { key: 'resolved', label: '已解决' }
]

const activeTab = ref('all')
const selectTab = (key: string) => { activeTab.value = key }

const tickets = ref<any[]>([])
const fetchTickets = async () => {
  let data: any[] = []
  try {
    const res = await http.get('/work/list')
    if (res && res.data && res.data.length > 0) {
      data = res.data
    }
  } catch (e) {
    console.error('Fetch tickets failed, using mock data', e)
  }

  if (data.length === 0) {
    // Mock Data
    data = [
      {
        id: 1001,
        content: '购买的 Netflix 账号密码错误，无法登录，请协助重置密码。尝试了多次都不行。',
        time: '2023-12-14 10:30',
        orderId: 'ORD-20231214-002',
        status: 'resolved',
        statusText: '已解决',
        statusClass: 'resolved',
        replies: [
           { sender: 'user', content: '购买的 Netflix 账号密码错误，无法登录，请协助重置密码。尝试了多次都不行。', time: '2023-12-14 10:30' },
           { sender: 'admin', content: '您好，已为您重置密码，新密码为: Fantula2024!，请尝试重新登录。', time: '2023-12-14 11:00' },
           { sender: 'user', content: '可以了，谢谢！', time: '2023-12-14 11:30' }
        ]
      },
      {
        id: 1002,
        content: '申请退款：我不小心买错了商品，原本想买年付的，结果点成了月付，请问可以补差价升级吗？',
        time: '2023-12-15 09:15',
        orderId: 'ORD-20231215-001',
        status: 'processing',
        statusText: '处理中',
        statusClass: 'processing',
        replies: [
           { sender: 'user', content: '申请退款：我不小心买错了商品，原本想买年付的，结果点成了月付，请问可以补差价升级吗？', time: '2023-12-15 09:15' },
           { sender: 'admin', content: '您好，请先提供一下您的订单截图，我们核实后会为您办理补差价升级。', time: '2023-12-15 09:45' }
        ]
      },
      {
        id: 1003,
        content: '账号显示过期了，但我才买了两天，请检查一下是什么情况',
        time: '2023-12-12 16:45',
        orderId: 'ORD-20231210-003',
        status: 'processing',
        statusText: '处理中',
        statusClass: 'processing',
        replies: [
          { sender: 'user', content: '账号显示过期了，但我才买了两天，请检查一下是什么情况', time: '2023-12-12 16:45' }
        ]
      }
    ]
  }
  tickets.value = data
}
onMounted(fetchTickets)

const filteredTickets = computed(() => {
  if (activeTab.value === 'all') return tickets.value
  return tickets.value.filter(ticket => ticket.status === activeTab.value)
})

const showTicketApplyModal = ref(false)
const showViewModal = ref(false)
const showReplyModal = ref(false)
const currentTicket = ref<any>(null)
const replyContent = ref('')

const openViewModal = (ticket: any) => {
  currentTicket.value = ticket
  showViewModal.value = true
}

const openReplyModal = (ticket: any) => {
  currentTicket.value = ticket
  replyContent.value = ''
  showReplyModal.value = true
}

const submitReply = () => {
  if (!replyContent.value.trim()) return
  if (currentTicket.value) {
    // Ensure replies array exists
    if (!currentTicket.value.replies) currentTicket.value.replies = []
    
    currentTicket.value.replies.push({
      sender: 'user',
      content: replyContent.value,
      time: new Date().toLocaleString() // Simple timestamp
    })
    // Also mock update main status if needed, but keeping simple
  }
  showReplyModal.value = false
}
</script>

<style scoped>
.tickets-section {
  padding: 0;
  height: 100%;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}
.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}
.apply-btn {
  background: #1890FF;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.apply-btn:hover {
  background: #1765ad;
}
.tickets-tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
.tab-item {
  padding: 10px 16px;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  background: #F8F8F8;
  border-radius: 20px;
  transition: all 0.3s;
  border: 1px solid transparent;
  font-weight: 500;
}
.tab-item:hover {
  background: #e8e8e8;
}
.tab-item.active {
  color: #1890FF;
  background: #E6F7FF;
  border-color: #1890FF;
}
.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.ticket-card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-left: 4px solid;
}
.ticket-card.processing {
  border-left-color: #1890FF;
}
.ticket-card.resolved {
  border-left-color: #52c41a;
}

/* 标题区域 - 收窄 */
.ticket-header-section {
  background: #E6F7FF;
  padding: 12px 16px;
  display: flex;

  justify-content: space-between;
  align-items: center;
}
.ticket-id {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}
.ticket-status-circle {
  width: 60px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}
.ticket-status-circle.processing {
  background: #1890FF;
}
.ticket-status-circle.resolved {
  background: #52c41a;
}

/* 内容区域 - 收窄 */
.ticket-content-section {
  background: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}
.ticket-main-content {
  flex: 1;
}
.ticket-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}
.ticket-content:last-of-type {
  margin-bottom: 16px;
}
.ticket-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.meta-item {
  font-size: 13px;
  color: #999;
}
.order-link {
  color: #1890FF;
  cursor: pointer;
}
.order-link:hover {
  text-decoration: underline;
}

/* 右侧操作按钮区域 */
.ticket-actions-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}
.action-btn-small {
  display: flex;
  align-items: center;
  gap: 4px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 80px;
  justify-content: center;
  font-weight: 500;
}
.action-btn-small.view-detail {
  background: #E6F7FF;
  color: #1890FF;
}
.action-btn-small.view-detail:hover {
  background: #d1f0ff;
}
.action-btn-small.add-reply {
  background: #F5F7FA;
  color: #666;
}
.action-btn-small.add-reply:hover {
  background: #e8ecf0;
}
.icon-view::before {
  content: "";
  background-image: url('/images/client/pc/gongdan2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 4px;
}
.icon-reply::before {
  content: "";
  background-image: url('/images/client/pc/gongdan4.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 4px;
}

/* Modal Styles */
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ticket-view-modal, .ticket-reply-modal {
  background: #fff;
  border-radius: 16px;
  width: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}
.ticket-reply-modal { width: 500px; }
.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
}
.modal-title { font-size: 18px; font-weight: 600; color: #333; }
.modal-close { background: none; border: none; font-size: 24px; color: #999; cursor: pointer; }
.modal-body { padding: 24px; max-height: 60vh; overflow-y: auto; }
.ticket-info-summary {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
}
.info-row .label { color: #888; margin-right: 4px; }
.info-row .link { color: #1890FF; font-weight: 500; }
.info-row .status-text.processing { color: #1890FF; }
.info-row .status-text.resolved { color: #52c41a; }

.chat-container { display: flex; flex-direction: column; gap: 16px; }
.chat-message { display: flex; }
.chat-message.user { justify-content: flex-end; }
.chat-message.admin { justify-content: flex-start; }
.message-content {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}
.chat-message.user .message-content {
  background: #E6F7FF;
  border-top-right-radius: 2px;
  color: #333;
}
.chat-message.admin .message-content {
  background: #f5f5f5;
  border-top-left-radius: 2px;
  color: #333;
}
.message-time { font-size: 12px; color: #999; margin-top: 4px; text-align: right; }
.chat-message.admin .message-time { text-align: left; }

.reply-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #f9f9f9;
}
.reply-textarea:focus { border-color: #1890FF; background: #fff; }

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-primary {
  background: #1890FF;
  color: #fff;
  border: none;
  padding: 8px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
}
.btn-primary:hover { background: #1765ad; }
.btn-cancel {
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 8px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
.btn-cancel:hover { background: #e0e0e0; }
</style> 