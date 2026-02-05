<template>
  <div class="mobile-order-detail">
    
    <!-- Sticky Header -->
    <div class="sticky-header">
      <div class="header-top">
         <div class="back-btn" @click="router.back()">
            <el-icon><ArrowLeft /></el-icon>
         </div>
         <div class="header-title">订单详情</div>
         <div class="header-action"></div> <!-- Placeholder -->
      </div>
      
      <!-- Status Card inside Header (Collapsible feel) -->
      <div class="status-card" :class="order.status">
          <div class="status-main">
             <div class="status-icon">
                <el-icon v-if="order.status === 'active'"><CircleCheck /></el-icon>
                <el-icon v-else-if="order.status === 'pending_delivery'"><Box /></el-icon>
                <el-icon v-else-if="order.status === 'refunding'"><RefreshLeft /></el-icon>
                <el-icon v-else><InfoFilled /></el-icon>
             </div>
             <div class="status-text">
                <div class="status-label">{{ statusText }}</div>
                <div class="status-sub" v-if="order.status === 'active'">到期: {{ formatTime(order.expires_at) }}</div>
                <div class="status-sub" v-else>下单: {{ formatTime(order.createdAt) }}</div>
             </div>
             <div class="status-amount">
                <span class="symbol">¥</span>
                <span class="val">{{ order.totalAmount }}</span>
             </div>
          </div>
          
          <!-- Operation Bar -->
          <div class="ops-bar">
             <button class="op-btn" @click="handleAction('contact')">
                <el-icon><Headset /></el-icon> 客服
             </button>
             <button v-if="activeTicketId" class="op-btn" @click="handleAction('view_ticket')">
                <el-icon><Tickets /></el-icon> 工单
             </button>
             <button v-else class="op-btn" @click="handleAction('create_ticket')">
                <el-icon><Tickets /></el-icon> 报障
             </button>

             <!-- Dynamic Buttons - 退款按钮组（与PC端逻辑对齐） -->
             <button v-if="canRenew" class="op-btn primary" @click="handleAction('renew')">续费</button>
             
             <!-- 1. 可取消退款（有待审核申请） -->
             <button v-if="canCancelRefund" class="op-btn warning" @click="handleAction('cancel_refund')">取消退款</button>
             <!-- 2. 可申请退款 -->
             <button v-else-if="canRefund" class="op-btn danger" @click="handleAction('apply_refund')">退款</button>
             <!-- 3. 退款次数已达上限 -->
             <button v-else-if="isRefundBlocked" class="op-btn disabled" disabled>退款已达上限</button>
          </div>
      </div>
    </div>

    <!-- Scroll Content -->
    <div class="content-body" v-if="!loading">
       
       <!-- Product Card -->
       <div class="info-card">
          <div class="prod-row">
             <div class="prod-thumb">
                <el-image :src="order.productImage" fit="cover" />
             </div>
             <div class="prod-info">
                <div class="prod-name">{{ order.productName }}</div>
                <div class="prod-meta">
                   <span class="tag">{{ order.skuSpec }}</span>
                   <span class="qty">x{{ order.quantity }}</span>
                </div>
                <div class="order-no" @click="copyText(order.order_no || '')">
                   NO.{{ order.order_no }} <el-icon><CopyDocument /></el-icon>
                </div>
             </div>
          </div>
       </div>

       <!-- Fulfillment Section - 退款中时显示处理中卡片 -->
       <template v-if="order.status === 'refunding' && pendingRefundRequest">
          <MobileRefundingCard :refund-request="pendingRefundRequest" />
       </template>
       
       <!-- 正常状态显示交付内容 -->
       <template v-else-if="['pending_delivery', 'active', 'completed'].includes(order.status || '')">
          <div class="fulfillment-container">
              
              <!-- Shared Account -->
              <template v-if="order.orderType === 'shared_account'">
                 <div v-for="(slot, idx) in slotList" :key="slot.id || idx" class="section-group">
                     <FulfillmentShared 
                         :cdk-item="getCdkForSlot(slot) as any"
                         :slot-index="slot.slot_index"
                     />
                 </div>
              </template>

              <!-- One Time CDK -->
              <template v-else-if="order.orderType === 'one_time_cdk'">
                  <div class="section-group">
                      <div class="section-title">卡密信息</div>
                      <FulfillmentCdk :cdk-list="cdkList" />
                  </div>
              </template>

              <!-- Virtual -->
              <template v-else-if="order.orderType === 'virtual' && cdkList.length > 0">
                  <div class="section-group">
                     <div class="section-title">充值进度</div>
                     
                     <div class="virtual-item-group">
                         <FulfillmentSubmitForm
                            :order-id="order.id || ''"
                            :order-status="order.status || ''"
                            :cdk-fields="getFieldsForCdk(cdkList[0])"
                            :cdk-id="cdkList[0].id"
                            @submit-success="handleFulfillmentSuccess"
                         />

                         <FulfillmentHistory
                            ref="historyRef"
                            :order-id="order.id || ''"
                            :filter-cdk-id="cdkList[0].id"
                         />
                     </div>
                  </div>
              </template>

          </div>
       </template>

       <!-- Tutorial -->
       <div class="section-group" v-if="instructionImage && order.status !== 'refunding'">
           <div class="section-title">使用说明</div>
           <div class="tutorial-box" @click="previewImage(instructionImage)">
              <el-image :src="instructionImage" fit="cover" />
              <div class="zoom-hint"><el-icon><ZoomIn /></el-icon></div>
           </div>
       </div>

    </div>
    
    <div v-if="loading" class="loading-screen">
       <div class="spinner"></div>
    </div>

    <!-- Sheets -->
    <MobileRenewalSheet v-if="order.id" v-model="showRenewalSheet" :order-id="order.id || ''" @success="loadData" />
    <MobileRefundSheet v-if="order.id" v-model="showRefundSheet" :order-id="order.id || ''" :order-no="order.order_no || ''" @success="handleRefundSuccess" />
    <MobileTicketSheet v-if="showTicketSheet && order.id" v-model="showTicketSheet" :order-id="order.id" :order-info="order" @success="onTicketSuccess" />
    <MobileCancelRefundSheet 
       v-if="order.id" 
       v-model="showCancelRefundSheet" 
       :order-id="order.id || ''" 
       :order-no="order.order_no || ''"
       :refund-request="pendingRefundRequest"
       :cancelled-count="refundCancelledCount"
       @success="handleCancelRefundSuccess"
    />
    
    <MobileContactModal v-model="showContactModal" />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  ArrowLeft, CopyDocument, CircleCheck, InfoFilled, 
  Box, RefreshLeft, Headset, Tickets, ZoomIn
} from '@element-plus/icons-vue'
import { useOrderDetail } from '@/composables/client/useOrderDetail'
import FulfillmentShared from '@/components/mobile/order/FulfillmentShared.vue'
import FulfillmentCdk from '@/components/mobile/order/FulfillmentCdk.vue'
import FulfillmentSubmitForm from '@/components/mobile/order/FulfillmentSubmitForm.vue'
import FulfillmentHistory from '@/components/mobile/order/FulfillmentHistory.vue'

// Mobile Sheets
import MobileRenewalSheet from '@/components/mobile/order/MobileRenewalSheet.vue'
import MobileRefundSheet from '@/components/mobile/order/MobileRefundSheet.vue'
import MobileTicketSheet from '@/components/mobile/order/MobileTicketSheet.vue'
import MobileCancelRefundSheet from '@/components/mobile/order/MobileCancelRefundSheet.vue'
import MobileRefundingCard from '@/components/mobile/order/MobileRefundingCard.vue'
import MobileContactModal from '@/components/mobile/modal/MobileContactModal.vue'

definePageMeta({ layout: 'mobile', ssr: false, middleware: 'client-auth' })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string

// --- Use Unified Composable ---
const {
  order,
  cdkList,
  slotList,
  instructionImage,
  loading,
  activeTicketId,
  pendingRefundRequest,
  refundCancelledCount,
  // Logic
  statusText,
  isVirtualOrShared,
  canRenew,
  canRefund,
  canCancelRefund,
  isRefundBlocked,
  // Helpers
  formatTime,
  getFieldsForCdk,
  getCdkForSlot,
  // Actions
  loadData,
  handleRefundSuccess,
  handleCancelRefundSuccess,
} = useOrderDetail(orderId)

// Virtual Component Refs
const historyRef = ref<any>(null)

// Sheets State
const showRenewalSheet = ref(false)
const showRefundSheet = ref(false)
const showTicketSheet = ref(false)
const showContactModal = ref(false)
const showCancelRefundSheet = ref(false)

const handleFulfillmentSuccess = () => {
    historyRef.value?.refresh()
}

const handleAction = async (type: string) => {
    if (type === 'contact') showContactModal.value = true
    else if (type === 'create_ticket') showTicketSheet.value = true
    else if (type === 'view_ticket') router.push('/mobile/profile/tickets')
    else if (type === 'renew') showRenewalSheet.value = true
    else if (type === 'apply_refund') showRefundSheet.value = true
    else if (type === 'cancel_refund') showCancelRefundSheet.value = true
}

const previewImage = (url: string) => {
    window.open(url, '_blank')
}

const copyText = (t: string) => {
    navigator.clipboard.writeText(t).then(() => ElMessage.success('已复制'))
}

const onTicketSuccess = () => {
    ElMessage.success('工单已提交')
    loadData()
}



</script>

<style scoped>
.mobile-order-detail {
    min-height: 100vh;
    background: #0F172A;
    padding-bottom: 40px;
}

/* Header */
.sticky-header {
    position: sticky; top: 0; z-index: 100;
    background: #0F172A;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.header-top {
    height: 44px; display: flex; align-items: center; justify-content: space-between;
    padding: 0 12px;
}
.back-btn {
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    color: #fff;
}
.header-title { font-weight: 700; color: #fff; }
.header-action { width: 32px; }

/* Status Card */
.status-card {
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9));
    transition: all 0.3s;
}
.status-card.active { border-bottom: 2px solid #22C55E; }
.status-card.pending_delivery { border-bottom: 2px solid #3B82F6; }
.status-card.refunding { border-bottom: 2px solid #F59E0B; }

.status-main { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.status-icon {
    font-size: 28px; color: #94A3B8;
}
.status-card.active .status-icon { color: #22C55E; }
.status-card.pending_delivery .status-icon { color: #3B82F6; }

.status-text { flex: 1; }
.status-label { font-size: 18px; font-weight: 700; color: #fff; }
.status-sub { font-size: 11px; color: #64748B; margin-top: 2px; }

.status-amount { font-family: 'DIN Alternate'; font-weight: 700; color: #fff; }
.status-amount .symbol { font-size: 12px; color: #F59E0B; }
.status-amount .val { font-size: 20px; }

.ops-bar { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
.ops-bar::-webkit-scrollbar { display: none; }
.op-btn {
    padding: 6px 12px; border-radius: 20px; font-size: 12px; flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #CBD5E1;
    display: flex; align-items: center; gap: 4px;
}
.op-btn.primary { background: #3B82F6; color: #fff; border: none; }
.op-btn.warning { background: #F59E0B; color: #fff; border: none; }
.op-btn.danger { background: rgba(239, 68, 68, 0.2); color: #FCA5A5; border-color: rgba(239, 68, 68, 0.5); }
.op-btn.disabled { 
    background: rgba(100, 116, 139, 0.1); 
    color: #64748B; 
    border-color: rgba(100, 116, 139, 0.2); 
    cursor: not-allowed; 
    opacity: 0.7;
}

/* Content */
.content-body { padding: 16px; display: flex; flex-direction: column; gap: 20px; }

.info-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px; padding: 16px;
}
.prod-row { display: flex; gap: 12px; }
.prod-thumb { width: 72px; height: 72px; border-radius: 8px; overflow: hidden; background: #1E293B; flex-shrink: 0; }
.prod-thumb .el-image { width: 100%; height: 100%; }
.prod-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.prod-name { font-size: 14px; font-weight: 600; color: #fff; line-height: 1.3; }
.prod-meta { display: flex; gap: 6px; font-size: 11px; color: #94A3B8; }
.tag { background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; }
.order-no {
    font-size: 11px; color: #64748B; font-family: 'Monaco', monospace; margin-top: 4px;
    display: flex; align-items: center; gap: 4px;
}

.section-group { display: flex; flex-direction: column; gap: 10px; }
.section-title { font-size: 14px; font-weight: 600; color: #E2E8F0; padding-left: 8px; border-left: 3px solid #3B82F6; }

.virtual-status-box {
    padding: 16px; background: rgba(30, 41, 59, 0.4); border-radius: 12px;
    color: #94A3B8; font-size: 13px; text-align: center;
}

.tutorial-box {
    border-radius: 12px; overflow: hidden; position: relative;
    border: 1px solid rgba(255,255,255,0.1);
}
.tutorial-box .el-image { display: block; width: 100%; }
.zoom-hint {
    position: absolute; bottom: 8px; right: 8px;
    background: rgba(0,0,0,0.5); color: #fff; padding: 4px;
    border-radius: 50%;
}

.loading-screen { padding: 40px; display: flex; justify-content: center; }
.spinner {
    width: 24px; height: 24px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #3B82F6;
    border-radius: 50%; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
