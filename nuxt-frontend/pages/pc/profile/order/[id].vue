<template>
  <div class="order-detail-page">
    
    <!-- 1. Sticky Status Hero Card -->
    <div class="hero-sticky-wrapper">
      <OrderDetailHero
        :order="order"
        :statusText="statusText"
        :remainingDays="remainingDays"
        :pendingRefundReason="pendingRefundReason"
        :activeTicketId="activeTicketId"
        :canRenew="canRenew"
        :canRefund="canRefund"
        :canCancelRefund="canCancelRefund"
        :isRefundBlocked="isRefundBlocked"
        :getTimeLevel="getTimeLevel"
        @back="router.back()"
        @copy="copyText"
        @action="handleAction"
      />
    </div>

    <!-- 2. Content Stream (Glass Tiles) -->
    <div class="content-stream">
      
      <!-- Product Info Card -->
      <!-- Product Info Card -->
      <ProductInfoCard 
        class="fade-in-up" 
        :product-snapshot="order.product_snapshot"
        :sku-snapshot="order.sku_snapshot"
        :quantity="order.quantity"
        :order-status="order.status"
      />

      <!-- Delivery / Fulfillment Section (The Core) -->
      <!-- 退款中时显示 RefundingCard -->
      <template v-if="order.status === 'refunding' && pendingRefundRequest">
        <RefundingCard 
          class="fade-in-up" 
          :refund-request="pendingRefundRequest" 
        />
      </template>
      
      <!-- 正常状态显示交付内容 -->
      <template v-else-if="['pending_delivery', 'active', 'completed'].includes(order.status || '')">
        <div class="fulfillment-section fade-in-up">
          
          <!-- Shared Account: STRICT LOOP by Slot List -->
          <!-- Display Rule: Display Slot1 Content... Display Slot2 Content... -->
          <template v-if="order.orderType === 'shared_account'">
             <div v-for="(slot, idx) in slotList" :key="slot.id || idx" class="virtual-item-group">
                 
                 <!-- Separator if multiple -->
                 <div v-if="slotList.length > 1" class="item-separator">
                    <span class="sep-label">车位 {{ idx + 1 }}</span>
                 </div>

                 <!-- Pass Single Slot Context -->
                 <PcFulfillmentShared 
                    :cdk-item="getCdkForSlot(slot)"
                    :slot-index="slot.slot_index"
                 />
             </div>
          </template>
          
          <!-- One-Time CDK: Standard List -->
          <template v-else-if="order.orderType === 'one_time_cdk'">
              <PcFulfillmentCdk :cdk-list="cdkList" />
          </template>

          <!-- Virtual: Single View (First CDK only) -->
          <template v-else-if="order.orderType === 'virtual' && cdkList.length > 0">
             <div class="virtual-item-group">
               <PcFulfillmentSubmitForm
                  :order-id="order.id || ''"
                  :order-status="order.status || ''"
                  :cdk-fields="getFieldsForCdk(cdkList[0])"
                  :cdk-id="cdkList[0].id"
                  @submit-success="handleFulfillmentSuccess"
               />

               <PcFulfillmentHistory
                  ref="historyRef"
                  :order-id="order.id || ''"
                  :filter-cdk-id="cdkList[0].id"
               />
             </div>
          </template>

        </div>
      </template>

      <!-- Tutorial Section -->
      <!-- 退款中状态时不显示使用说明 -->
      <div v-if="instructionImage && order.status !== 'refunding'" class="glass-tile tutorial-tile fade-in-up">
        <div class="tile-header">
          <div class="header-left">
             <el-icon class="header-icon"><Guide /></el-icon>
             <span class="tile-title">使用说明</span>
          </div>
        </div>
        <div class="tutorial-body" @click="previewImage(instructionImage)">
          <div class="image-wrapper">
             <img :src="instructionImage" loading="lazy" />
          </div>
          <div class="zoom-overlay">
            <div class="zoom-pill">
               <el-icon><ZoomIn /></el-icon> 点击查看大图
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modals -->
    <RenewalModal
      v-if="order.id"
      v-model="showRenewalModal"
      :order-id="order.id"
      @success="onRenewalSuccess"
    />

    <RefundModal
      v-if="order.id"
      v-model="showRefundModal"
      :order-id="order.id"
      :order-no="order.order_no || ''"
      @success="onRefundSuccess"
    />

    <TicketApplyModal
      v-if="showTicketModal && order.id"
      :order-id="order.id"
      :order-info="{ order_no: order.order_no || '', product_name: order.product_snapshot?.product_name || '' }"
      @close="showTicketModal = false"
      @success="onTicketSuccess"
    />

    <CancelRefundModal
      v-if="order.id"
      v-model="showCancelRefundModal"
      :order-id="order.id"
      :order-no="order.order_no || ''"
      :refund-request="pendingRefundRequest"
      :cancelled-count="refundCancelledCount"
      @success="onCancelRefundSuccess"
    />

    <ServiceModal
      v-if="showContactModal"
      @close="showContactModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pcRoutes } from '@/config/client-routes'
import { ElMessage } from 'element-plus'
import { 
  ZoomIn, Guide
} from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client'
import { ticketApi } from '@/api/client/ticket'
import { useOrderDetail } from '@/composables/client/useOrderDetail'
import PcFulfillmentCdk from '@/components/pc/order/PcFulfillmentCdk.vue'
import PcFulfillmentShared from '@/components/pc/order/PcFulfillmentShared.vue'
import PcFulfillmentSubmitForm from '@/components/pc/order/PcFulfillmentSubmitForm.vue'
import PcFulfillmentHistory from '@/components/pc/order/PcFulfillmentHistory.vue'
import OrderDetailHero from '@/components/pc/order/OrderDetailHero.vue'
import RefundingCard from '@/components/pc/order/RefundingCard.vue'
import RenewalModal from '@/components/pc/order/RenewalModal.vue'
import RefundModal from '@/components/pc/order/RefundModal.vue'
import CancelRefundModal from '@/components/pc/order/CancelRefundModal.vue'
import TicketApplyModal from '@/components/pc/modal/business/TicketApplyModal.vue'
import ServiceModal from '@/components/pc/modal/ServiceModal.vue'
import ProductInfoCard from '@/components/pc/order/ProductInfoCard.vue'
import type { FulfillmentField } from '@/types/order'

definePageMeta({
  layout: 'pc', ssr: false })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string

// --- Use Unified Composable ---
const {
  // Core Data
  order,
  cdkList,
  slotList,
  instructionImage,
  loading,
  
  // Refund State
  pendingRefundRequest,
  refundCancelledCount,
  
  // Ticket State
  activeTicketId,
  
  // Logic (from useOrderDetailLogic)
  statusText,
  remainingDays,
  getTimeLevel,
  isOneTime,
  isVirtualOrShared,
  canRenew,
  canRefund,
  canCancelRefund,
  isRefundBlocked,
  
  // Helpers
  // formatTime,
  // getAmountInteger,
  // getAmountDecimal,
  getFieldsForCdk,
  getCdkForSlot,
  
  // Actions
  loadData,
  handleRefundSuccess: onRefundSuccess,
  handleCancelRefundSuccess: onCancelRefundSuccess,
} = useOrderDetail(orderId)

// Alias amount helpers to match template (Wait, those helpers are moved to Hero)
// But we still need them if used elsewhere? No, they were only used in Hero.
// Removing local helpers as functionality moved to OrderDetailHero

const pendingRefundReason = computed(() => pendingRefundRequest.value?.reason)

const historyRef = ref<{ refresh: () => void } | null>(null)
const handleFulfillmentSuccess = () => { historyRef.value?.refresh() }

// Preview/Copy
const previewImage = (url: string) => window.open(url, '_blank')
const copyText = (text?: string) => {
  if(!text) return
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制')
}

// Modals
const showRenewalModal = ref(false)
const showRefundModal = ref(false)
const showCancelRefundModal = ref(false)
const showTicketModal = ref(false)
const showContactModal = ref(false)

// Action Handlers
const handleAction = async (type: string) => {
  if (type === 'contact') {
    showContactModal.value = true
  }
  else if (type === 'create_ticket') {
    showTicketModal.value = true
  } 
  else if (type === 'view_ticket') {
    if (activeTicketId.value) {
       router.push(pcRoutes.profileTickets())
    }
  }
  else if (type === 'renew') {
    showRenewalModal.value = true
  } 
  else if (type === 'apply_refund') {
    showRefundModal.value = true
  } 
  else if (type === 'cancel_refund') {
    showCancelRefundModal.value = true
  }
}

// Modal Success Handlers
const onRenewalSuccess = (newOrderId: string) => {
    showRenewalModal.value = false
}

const onTicketSuccess = () => {
    ElMessage.success('工单已提交')
    loadData()
}


</script>

<style scoped>

.order-detail-page {
  display: flex; flex-direction: column; 
  width: 100%; max-width: 100%;
  flex: 1; min-height: 0;
  overflow-y: auto;
  padding: 0; /* No global padding to allow full-bleed header */
  padding-bottom: 40px;
}

/* --- Sticky Wrapper --- */
.hero-sticky-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  /* Remove negative margins that caused overflow */
  margin: 0;
  padding: 0;
  
  /* Background to mask content behind */
  background: #0F172A; 
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

/* --- 2. Content Stream --- */
.content-stream { 
  display: flex; flex-direction: column; gap: 16px; 
  margin-top: 10px; 
  padding: 0 24px; /* ADDED PADDING to restore spacing for content */
}

.glass-tile {
  background: rgba(30, 41, 59, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
}

.tile-header { margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.tile-title { font-size: 15px; font-weight: 600; color: #E2E8F0; border-left: 3px solid #3B82F6; padding-left: 10px; }

/* Product Tile */
.product-content { display: flex; gap: 20px; }
.product-thumb { width: 80px; height: 80px; border-radius: 12px; overflow: hidden; background: #0f172a; border: 1px solid rgba(255,255,255,0.05); }
.product-thumb img { width: 100%; height: 100%; object-fit: cover; }
.product-thumb .placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px; }

.product-details { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 8px; }
.product-name { font-size: 18px; font-weight: 600; color: #fff; line-height: 1.4; }
.product-meta { display: flex; gap: 10px; }
.spec-tag, .qty-tag { padding: 2px 8px; border-radius: 6px; background: rgba(255,255,255,0.05); font-size: 12px; color: #94A3B8; }

/* Tutorial */
.header-icon { font-size: 18px; color: #3B82F6; }

.tutorial-body {
  position: relative; cursor: pointer; border-radius: 16px; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0,0,0,0.2);
}
.tutorial-body:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-color: rgba(59, 130, 246, 0.4);
}

.image-wrapper { width: 100%; display: flex; justify-content: center; background: #000; }
.image-wrapper img { max-width: 100%; display: block; }

.zoom-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s; backdrop-filter: blur(2px);
}
.tutorial-body:hover .zoom-overlay { opacity: 1; }

.zoom-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 20px; border-radius: 20px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff; font-size: 13px; font-weight: 600;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.fade-in-up { animation: fadeInUp 0.4s ease-out backwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Mobile */
@media (max-width: 768px) {
  .hero-main-row { flex-direction: column; align-items: flex-start; gap: 16px; }
  .status-hero-card { height: auto; }
  .content-stream { padding: 0 16px; }
}
/* Virtual Loop Styles */
.virtual-item-group {
  display: flex; flex-direction: column; gap: 16px;
  margin-bottom: 24px;
}

.item-separator {
  display: flex; align-items: center;
  margin-bottom: 8px;
}
.sep-label {
  font-size: 13px; font-weight: 600; color: #94A3B8;
  background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 6px;
}
</style>