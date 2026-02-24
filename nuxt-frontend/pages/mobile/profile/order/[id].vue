<template>
  <div class="mobile-order-detail">
    
    <!-- Sticky Header -->
    <MobileSubPageHeader title="订单详情" />

    <!-- Status Card and Content combined inside !loading -->
    <template v-if="!loading">
      <!-- Status Card (Glass & Neon & Colored) -->
      <div class="status-card-glass" :class="order.status">
         <div class="status-main">
            <div class="status-icon-wrapper">
               <el-icon v-if="order.status === 'active'"><CircleCheck /></el-icon>
               <el-icon v-else-if="order.status === 'pending_delivery'"><Box /></el-icon>
               <el-icon v-else-if="order.status === 'refunding'"><RefreshLeft /></el-icon>
               <el-icon v-else><InfoFilled /></el-icon>
            </div>
            <div class="status-content">
               <div class="status-title">{{ statusText }}</div>
               <div class="status-desc" v-if="order.status === 'active'">到期: {{ formatTime(order.expires_at) }}</div>
               <div class="status-desc" v-else>下单: {{ formatTime(order.createdAt) }}</div>
            </div>
            <div class="status-price">
               <span class="val">{{ Number(order.totalAmount || 0).toFixed(2) }}</span>
            </div>
         </div>
         
         <!-- Operation Bar (Gradient Pills) -->
         <div class="ops-bar-glass">
            <button class="action-btn ghost" @click="handleAction('contact')">
               <el-icon><Headset /></el-icon> 联系客服
            </button>
            <button v-if="activeTicketId" class="action-btn ghost" @click="handleAction('view_ticket')">
               <el-icon><Tickets /></el-icon> 查看工单
            </button>
            <button v-else class="action-btn ghost" @click="handleAction('create_ticket')">
               <el-icon><Tickets /></el-icon> 申请工单
            </button>

            <!-- Dynamic Buttons -->
            <button v-if="canRenew" class="action-btn primary" @click="handleAction('renew')">续费</button>
            
            <button v-if="canCancelRefund" class="action-btn warning" @click="handleAction('cancel_refund')">取消退款</button>
            <button v-else-if="canRefund" class="action-btn danger" @click="handleAction('apply_refund')">申请退款</button>
            <button v-else-if="isRefundBlocked" class="action-btn disabled" disabled>退款上限</button>
         </div>
      </div>

    <!-- Scroll Content -->
    <div class="content-body">
       
       <!-- Product Card Component -->
       <MobileOrderProductInfo :order="order" />

       <!-- Fulfillment Section -->
       <template v-if="order.status === 'refunding' && pendingRefundRequest">
          <MobileRefundingCard :refund-request="pendingRefundRequest" />
       </template>
       
       <template v-else-if="['pending_delivery', 'active', 'completed'].includes(order.status || '')">
          <div class="fulfillment-container">
              
              <!-- Shared Account -->
              <template v-if="order.orderType === 'shared_account'">
                 <div v-for="(slot, idx) in slotList" :key="slot.id || idx" class="section-group">
                     <MobileFulfillmentShared 
                         :cdk-item="getCdkForSlot(slot) as any"
                         :slot-index="slot.slot_index"
                     />
                 </div>
              </template>

              <!-- One Time CDK -->
              <template v-else-if="order.orderType === 'one_time_cdk'">
                  <div class="section-group">
                      <div class="section-header">卡密信息</div>
                      <MobileFulfillmentCdk :cdk-list="cdkList" />
                  </div>
              </template>

              <!-- Virtual -->
              <template v-else-if="order.orderType === 'virtual' && cdkList.length > 0">
                  <div class="section-group">
                     <div class="section-header">充值进度</div>
                  <!-- Delivery Content -->
                  <div class="delivery-content">
                      <MobileFulfillmentSubmitForm 
                          :order-id="order.id || ''"
                          :order-status="order.status || ''"
                          :cdk-fields="getFieldsForCdk(cdkList[0])"
                          :cdk-id="cdkList[0].id"
                          @submit-success="handleFulfillmentSuccess"
                      />
                  </div>
              </div>


            <!-- History -->
            <div class="detail-card">
               <h3 class="card-title">回执记录</h3>
               <MobileFulfillmentHistory :order-id="order.id || ''" ref="historyRef" />
            </div>
       </template> <!-- Closes Virtual -->
       
       </div> <!-- Closes fulfillment-container -->
    </template> <!-- Closes Active/Pending Wrapper -->

       <!-- Tutorial -->
       <div class="section-group" v-if="instructionImage && order.status !== 'refunding'">
           <div class="section-header">使用说明</div>
           <div class="tutorial-box" @click="previewImage(instructionImage)">
              <img :src="instructionImage" class="tutorial-img" loading="lazy" />
              <div class="zoom-hint"><el-icon><ZoomIn /></el-icon></div>
           </div>
       </div>

    </div>
    </template>
    
    <div v-if="loading" class="loading-screen">
       <div class="spinner"></div>
    </div>

    <!-- Sheets -->
    <MobileRenewalSheet v-if="order.id" v-model="showRenewalSheet" :order-id="order.id || ''" :order="order" @success="loadData" />
    <MobileRefundSheet v-if="order.id" v-model="showRefundSheet" :order-id="order.id || ''" :order-no="order.order_no || ''" :order="order" @success="handleRefundSuccess" />
    <MobileTicketSheet v-if="showTicketSheet && order.id" v-model="showTicketSheet" :order-id="order.id" :order-info="order" @success="onTicketSuccess" />
    <MobileCancelRefundSheet 
       v-if="order.id" 
       v-model="showCancelRefundSheet" 
       :order-id="order.id || ''" 
       :order-no="order.order_no || ''"
       :order="order"
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
import { mobileRoutes } from '@/config/client-routes'
import { useToast } from '@/composables/mobile/useToast'
import { 
  ArrowLeft, CopyDocument, CircleCheck, InfoFilled, 
  Box, RefreshLeft, Headset, Tickets, ZoomIn
} from '@element-plus/icons-vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'
import MobileOrderProductInfo from '@/components/mobile/order/MobileOrderProductInfo.vue'
import { useOrderDetail } from '@/composables/client/useOrderDetail'
import MobileFulfillmentShared from '@/components/mobile/order/MobileFulfillmentShared.vue'
import MobileFulfillmentCdk from '@/components/mobile/order/MobileFulfillmentCdk.vue'
import MobileFulfillmentSubmitForm from '@/components/mobile/order/MobileFulfillmentSubmitForm.vue'
import MobileFulfillmentHistory from '@/components/mobile/order/MobileFulfillmentHistory.vue'

// Mobile Sheets
import MobileRenewalSheet from '@/components/mobile/order/MobileRenewalSheet.vue'
import MobileRefundSheet from '@/components/mobile/order/MobileRefundSheet.vue'
import MobileTicketSheet from '@/components/mobile/order/MobileTicketSheet.vue'
import MobileCancelRefundSheet from '@/components/mobile/order/MobileCancelRefundSheet.vue'
import MobileRefundingCard from '@/components/mobile/order/MobileRefundingCard.vue'
import MobileContactModal from '@/components/mobile/modal/MobileContactModal.vue'

import { useFulfillmentHistory } from '@/composables/client/useFulfillmentHistory'
import { computed } from 'vue'

definePageMeta({ layout: 'mobile', ssr: false, middleware: 'client-auth' })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string
const { showToast } = useToast()

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

const {
  records: fulfillmentHistory,
  fetchHistory
} = useFulfillmentHistory({ orderId: () => orderId })

const hasFulfillmentRecord = computed(() => fulfillmentHistory.value && fulfillmentHistory.value.length > 0)
const fulfillmentData = computed(() => fulfillmentHistory.value.length > 0 ? fulfillmentHistory.value[0] : null)

const refreshData = async () => {
    await fetchHistory()
    await loadData()
}

// Virtual Component Refs
const historyRef = ref<any>(null)

// Sheets State
const showRenewalSheet = ref(false)
const showRefundSheet = ref(false)
const showTicketSheet = ref(false)
const showContactModal = ref(false)
const showCancelRefundSheet = ref(false)

const handleFulfillmentSuccess = () => {
    refreshData()
}

const handleAction = async (type: string) => {
    if (type === 'contact') showContactModal.value = true
    else if (type === 'create_ticket') showTicketSheet.value = true
    else if (type === 'view_ticket') router.push(mobileRoutes.profileTickets())
    else if (type === 'renew') showRenewalSheet.value = true
    else if (type === 'apply_refund') showRefundSheet.value = true
    else if (type === 'cancel_refund') showCancelRefundSheet.value = true
}

const previewImage = (url: string) => {
    window.open(url, '_blank')
}

const onTicketSuccess = () => {
    showToast('工单已提交', 'success')
    loadData()
}
</script>

<style scoped>
.mobile-order-detail {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #0F172A;
    padding-bottom: 40px;
}

/* Status Card Glass (Colored) */
.status-card-glass {
    margin: 16px;
    padding: 20px;
    border-radius: 20px;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    transition: all 0.3s;
}

/* Active: Green Scheme */
.status-card-glass.active { 
    background: linear-gradient(145deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.4));
    border: 1px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
}
/* Pending: Blue Scheme */
.status-card-glass.pending_delivery { 
    background: linear-gradient(145deg, rgba(59, 130, 246, 0.15), rgba(30, 58, 138, 0.4));
    border: 1px solid rgba(59, 130, 246, 0.3);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
}
/* Refunding: Orange Scheme */
.status-card-glass.refunding { 
    background: linear-gradient(145deg, rgba(245, 158, 11, 0.15), rgba(120, 53, 15, 0.4));
    border: 1px solid rgba(245, 158, 11, 0.3);
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.1);
}

.status-main { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
.status-icon-wrapper {
    width: 40px; height: 40px; border-radius: 12px; 
    background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;
    color: #94A3B8; font-size: 20px;
}
.status-card-glass.active .status-icon-wrapper { background: rgba(34, 197, 94, 0.2); color: #4ADE80; }
.status-card-glass.pending_delivery .status-icon-wrapper { background: rgba(59, 130, 246, 0.2); color: #60A5FA; }
.status-card-glass.refunding .status-icon-wrapper { background: rgba(251, 191, 36, 0.2); color: #FCD34D; }

.status-content { flex: 1; padding-top: 2px; }
.status-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.status-desc { font-size: 11px; color: #94A3B8; }
.status-card-glass.active .status-desc { color: #A7F3D0; }

.status-price { font-family: 'DIN Alternate'; font-weight: 700; color: #fff; display: flex; align-items: baseline; }
.status-price .val { font-size: 24px; text-shadow: 0 2px 10px rgba(0,0,0,0.3); }

/* Ops Bar */
.ops-bar-glass { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 2px; }
.ops-bar-glass::-webkit-scrollbar { display: none; }

.action-btn {
    padding: 8px 16px; border-radius: 99px; font-size: 12px; font-weight: 600; white-space: nowrap;
    border: none; display: flex; align-items: center; gap: 4px; transition: all 0.2s;
}
.action-btn.ghost { background: rgba(255,255,255,0.1); color: #E2E8F0; border: 1px solid rgba(255,255,255,0.1); }
.action-btn.ghost:active { background: rgba(255,255,255,0.2); }

.action-btn.primary { background: linear-gradient(90deg, #3B82F6, #2563EB); color: #fff; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
.action-btn.warning { background: linear-gradient(90deg, var(--color-accent), var(--color-accent-hover)); color: #fff; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3); }
.action-btn.danger { background: rgba(239, 68, 68, 0.15); color: #FCA5A5; border: 1px solid rgba(239, 68, 68, 0.4); }
.action-btn.disabled { opacity: 0.5; filter: grayscale(1); cursor: not-allowed; }

/* Content Body */
.content-body { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 16px; }

/* Section Headers */
.section-group { display: flex; flex-direction: column; gap: 10px; }
.section-header { 
    font-size: 13px; font-weight: 600; color: #94A3B8; 
    padding-left: 10px; border-left: 2px solid #3B82F6; 
}

/* Tutorial */
.tutorial-box {
    border-radius: 12px; overflow: hidden; position: relative;
    border: 1px solid rgba(255,255,255,0.1);
}
.tutorial-img { display: block; width: 100%; object-fit: cover; }
.zoom-hint {
    position: absolute; bottom: 8px; right: 8px;
    background: rgba(0,0,0,0.5); color: #fff; padding: 4px; border-radius: 50%;
}

.loading-screen { padding: 40px; display: flex; justify-content: center; }


.fulfillment-container { display: flex; flex-direction: column; gap: 20px; }
</style>
