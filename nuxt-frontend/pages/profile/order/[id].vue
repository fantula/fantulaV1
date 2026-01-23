<template>
  <div class="order-detail-page">
    
    <!-- 1. Sticky Status Hero Card -->
    <div class="hero-sticky-wrapper">
      <div class="status-hero-card">
        <div class="hero-aurora-bg" :class="order.status"></div>
        
        <div class="hero-content">
          <!-- Top Row: Back | Order No | Amount (Right) -->
          <div class="hero-top-row">
            <div class="top-left-group">
              <div class="back-btn" @click="router.back()">
                <el-icon><ArrowLeft /></el-icon>
                <span class="back-text">返回</span>
              </div>
              <div class="order-no-badge">
                <span class="label">订单号</span>
                <span class="value">{{ order.order_no || '---' }}</span>
                <el-icon class="copy-icon" @click="copyText(order.order_no)"><CopyDocument /></el-icon>
              </div>
            </div>

            <!-- Amount Display (Top Right) -->
            <div class="amount-display-top">
              <span class="amount-integer">{{ getInteger(order.totalAmount || 0) }}</span>
              <span class="amount-decimal">.{{ getDecimal(order.totalAmount || 0) }}</span>
              <span class="amount-unit">点</span>
            </div>
          </div>

          <!-- Middle/Bottom Row: Status Icon+Text | Action Buttons -->
          <div class="hero-main-row">
            
            <!-- Status Info (Left) -->
            <div class="status-group">
              <div class="status-icon-box" :class="order.status">
                <el-icon v-if="order.status === 'active' || order.status === 'completed'"><CircleCheck /></el-icon>
                <el-icon v-else-if="order.status === 'pending_delivery'"><Box /></el-icon>
                <el-icon v-else-if="order.status === 'refunding' || order.status === 'refunded'"><RefreshLeft /></el-icon>
                <el-icon v-else><InfoFilled /></el-icon>
              </div>
              
              <div class="status-text-wrapper">
                <div class="status-title-row">
                  <h1 class="status-title">{{ statusText }}</h1>
                  <!-- Countdown Badge for Active -->
                  <div v-if="order.status === 'active' && remainingDays !== null" class="time-badge" :class="getTimeLevel(remainingDays)">
                     <el-icon><Timer /></el-icon> 剩余 {{ remainingDays }} 天
                  </div>
                </div>
                <!-- Subtitles -->
                 <div class="status-desc">
                    <span v-if="order.status === 'refunding'">退款申请待审核：{{ pendingRefundReason || '请耐心等待' }}</span>
                    <span v-else-if="order.status === 'pending_delivery'">系统正在极速配货中</span>
                    <span v-else-if="order.status === 'active'">商品状态正常，到期时间: {{ formatTime(order.expires_at) }}</span>
                    <span v-else>下单时间: {{ formatTime(order.createdAt) }}</span>
                 </div>
              </div>
            </div>

            <!-- Action Buttons (Right) - Plan A Logic -->
            <div class="hero-actions">
               
               <!-- 0. Contact Service (Always Visible) -->
               <button class="hero-btn secondary" @click="handleAction('contact')">
                 <el-icon><Headset /></el-icon> 联系客服
               </button>

               <!-- 1. Ticket Action -->
               <button v-if="activeTicketId" class="hero-btn secondary" @click="handleAction('view_ticket')">
                 <el-icon><Tickets /></el-icon> 查看工单
               </button>
               <button v-else class="hero-btn secondary" @click="handleAction('create_ticket')">
                 <el-icon><Tickets /></el-icon> 申请工单
               </button>

               <!-- 2. Renew Action (Hidden for One-Time) -->
               <button v-if="canRenew" class="hero-btn primary" @click="handleAction('renew')">
                 <el-icon><Refresh /></el-icon> 续费
               </button>

               <!-- 3. Refund Action (Hidden for One-Time) -->
               <!-- Case A: Pending Refund -> Cancel Button -->
               <button v-if="order.status === 'refunding' || pendingRefundRequest" class="hero-btn warning" @click="handleAction('cancel_refund')">
                 <el-icon><CircleClose /></el-icon> 取消退款
               </button>
               <!-- Case B: Can Apply Refund -->
               <button v-else-if="canRefund" class="hero-btn danger" @click="handleAction('apply_refund')">
                 <el-icon><Money /></el-icon> 申请退款
               </button>

            </div>
          </div>
        </div>
        
        <!-- Optional: Decorator or texture overlay -->
        <div class="noise-overlay"></div>
      </div>
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
      <!-- Only show for relevant statuses (including refunding to see what happened) -->
      <div v-if="['pending_delivery', 'active', 'completed', 'refunding'].includes(order.status || '')" class="fulfillment-section fade-in-up">
        
        <!-- Shared Account Fulfillment -->
        <FulfillmentShared 
          v-if="order.orderType === 'shared_account'" 
          :cdk-list="cdkList" 
        />
        
        <!-- CDK / Standard Fulfillment -->
        <FulfillmentCdk 
          v-else-if="order.orderType !== 'virtual'" 
          :cdk-list="cdkList" 
        />

        <!-- Virtual Submit Form -->
        <FulfillmentSubmitForm
          v-if="order.orderType === 'virtual'"
          :order-id="order.id || ''"
          :order-status="order.status || ''"
          :cdk-fields="fulfillmentFields"
          @submit-success="handleFulfillmentSuccess"
        />

        <!-- Virtual History -->
        <FulfillmentHistory
          v-if="order.orderType === 'virtual'"
          ref="historyRef"
          :order-id="order.id || ''"
        />
      </div>

      <!-- Tutorial Section -->
      <!-- Tutorial Section -->
      <div v-if="instructionImage" class="glass-tile tutorial-tile fade-in-up">
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
      :order-no="order.order_no"
      @success="onRefundSuccess"
    />

    <TicketApplyModal
      v-if="showTicketModal && order.id"
      :order-id="order.id"
      :order-info="{ order_no: order.order_no || '', product_name: order.product_snapshot?.product_name || '' }"
      @close="showTicketModal = false"
      @success="onTicketSuccess"
    />

    <ContactModal
      v-if="showContactModal"
      @close="showContactModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  ArrowLeft, CopyDocument, CircleCheck, Timer, CircleClose, InfoFilled, 
  ZoomIn, Box, Tickets, Refresh, Money, RefreshLeft, Headset, Guide
} from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client'
import { ticketApi } from '@/api/client/ticket'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'
import FulfillmentShared from '@/components/order/FulfillmentShared.vue'
import FulfillmentCdk from '@/components/order/FulfillmentCdk.vue'
import FulfillmentSubmitForm from '@/components/order/FulfillmentSubmitForm.vue'
import FulfillmentHistory from '@/components/order/FulfillmentHistory.vue'
import RenewalModal from '@/components/order/RenewalModal.vue'
import RefundModal from '@/components/order/RefundModal.vue'
import TicketApplyModal from '@/components/modal/business/TicketApplyModal.vue'
import ContactModal from '@/components/ContactModal.vue'
import ProductInfoCard from '@/components/order/ProductInfoCard.vue'
import type { FulfillmentField } from '@/types/order'

definePageMeta({ ssr: false })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string
const loading = ref(true)

const { getOrderStatusLabel } = useBizConfig()
const { formatDate } = useBizFormat()

// --- Data Types ---
interface OrderDetail {
  id: string
  order_no: string
  orderType: string
  status: string
  quantity: number
  totalAmount: number
  createdAt: string
  expires_at?: string
  productName: string
  productImage: string
  skuSpec: string
  product_snapshot?: any
  sku_snapshot?: any
}

interface CdkItem {
  id: string
  code: string
  parsed: any
  accountData: any
  slotIndex?: number
}

const order = ref<Partial<OrderDetail>>({})
const cdkList = ref<CdkItem[]>([])
const instructionImage = ref('')

// Logic State
const activeTicketId = ref<string | null>(null)
const pendingRefundRequest = ref<any>(null)

// Computed Status Text
const statusText = computed(() => {
  const s = order.value.status
  if (s === 'pending_delivery') return '待发货'
  if (s === 'active') return '使用中'
  if (s === 'refunding') return '退款中'
  if (s === 'refunded') return '已退款'
  return getOrderStatusLabel(s || '')
})

const pendingRefundReason = computed(() => pendingRefundRequest.value?.reason)

const remainingDays = computed(() => {
  // @ts-ignore
  if (!order.value.expires_at) return null
  // @ts-ignore
  const diff = new Date(order.value.expires_at).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

const getTimeLevel = (days: number) => {
  if (days <= 3) return 'critical' // Red
  if (days <= 7) return 'warning'  // Orange
  return 'safe'                    // Green
}

// Logic Computed
// Rule: One-time orders don't show Renew/Refund
const isOneTime = computed(() => order.value.orderType === 'one_time_cdk')

const canRenew = computed(() => {
  if (isOneTime.value) return false
  const s = order.value.status
  return ['active', 'expired'].includes(s || '')
})

const canRefund = computed(() => {
  if (isOneTime.value) return false
  const s = order.value.status
  // Usually refund allowed for pending_delivery or active (within X days, ignoring X days for now as per user just status)
  return ['pending_delivery', 'active'].includes(s || '')
})


// Amount Helpers
const getInteger = (val: number) => Math.floor(val).toLocaleString()
const getDecimal = (val: number) => (val % 1).toFixed(2).split('.')[1] || '00'

const fulfillmentFields = computed((): FulfillmentField[] => {
  if (!cdkList.value.length) return []
  const cdk = cdkList.value[0]
  let keys: string[] = []
  
  if (cdk.parsed && typeof cdk.parsed === 'object') {
    if (Array.isArray(cdk.parsed.fields) && cdk.parsed.fields.length > 0) {
      keys = cdk.parsed.fields.filter((f: any) => typeof f === 'string')
    } else if (Object.keys(cdk.parsed).length > 0) {
      keys = Object.keys(cdk.parsed)
    }
  }

  if (keys.length === 0) {
    const raw = cdk.code?.trim() || ''
    if (!raw) return []
    let cleaned = raw.replace(/[\(\)（）\[\]【】]/g, '')
    keys = cleaned.split(/[,，、]/).map(s => s.trim()).filter(s => s.length > 0)
  }

  return keys.map(key => ({ key, label: key, value: '' }))
})

const historyRef = ref<{ refresh: () => void } | null>(null)
const handleFulfillmentSuccess = () => { historyRef.value?.refresh() }

// Utility
const formatTime = (t?: string) => t ? formatDate(t) : '-'
const previewImage = (url: string) => window.open(url, '_blank')
const copyText = (text?: string) => {
  if(!text) return
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制')
}

// Action Handlers
  const handleAction = async (type: string) => {
  
  if (type === 'contact') {
    showContactModal.value = true
  }

  // 1. Ticket
  else if (type === 'create_ticket') {
    showTicketModal.value = true
  } 
  else if (type === 'view_ticket') {
    if (activeTicketId.value) {
       // TODO: Go to ticket detail if accessible, or maybe just list
       router.push('/profile/tickets')
    }
  }

  // 2. Renew
  else if (type === 'renew') {
    showRenewalModal.value = true
  } 

  // 3. Refund
  else if (type === 'apply_refund') {
    showRefundModal.value = true
  } 
  else if (type === 'cancel_refund') {
    try {
      await ElMessageBox.confirm('确定要撤销退款申请并恢复订单吗？', '撤销退款', {
         confirmButtonText: '确定撤销',
         cancelButtonText: '暂不撤销',
         type: 'warning'
      })
      
      const res = await clientOrderApi.cancelRefundRequest(orderId)
      if (res.success) {
        ElMessage.success(res.message || '已撤销')
        loadData() // Refresh status
      } else {
        ElMessage.error(res.error || '撤销失败')
      }
    } catch {
      // Cancelled
    }
  }
}

// Modal Success Handlers
const onRenewalSuccess = (newOrderId: string) => {
    // RenewalModal already handles redirect, but we can close it here just in case
    showRenewalModal.value = false
}

const onTicketSuccess = () => {
    ElMessage.success('工单已提交')
    loadData() // Refresh to see "View Ticket" button
}

const onRefundSuccess = () => {
    loadData() // Refresh to see "Cancel Refund" button
}

// Fetch
const showRenewalModal = ref(false)
const showRefundModal = ref(false)
const showTicketModal = ref(false)
const showContactModal = ref(false)
const ticketRefreshKey = ref(0) // Used to force refresh ticket list if needed

const loadData = async () => {

  if (!orderId) return
  loading.value = true
  try {
    // 1. Get Order
    const res = await clientOrderApi.getOrderDetail(orderId)
    if (res.success && res.data) {
      const d = res.data
      const pSnap = d.product_snapshot || {} as any
      const sSnap = d.sku_snapshot || {} as any

      order.value = {
        id: d.id,
        order_no: d.order_no,
        orderType: d.order_type,
        status: d.status,
        quantity: d.quantity,
        totalAmount: d.total_amount,
        createdAt: d.created_at,
        expires_at: d.expires_at,
        productName: pSnap.product_name || '',
        productImage: pSnap.image || '',
        skuSpec: sSnap.spec_combination ? Object.values(sSnap.spec_combination).join(' ') : '默认',
        product_snapshot: pSnap,
        sku_snapshot: sSnap
      }

      // 2. Parse CDKs
      if (d.cdkList) {
        const finalCdks = d.cdkList.map((cdk: any) => {
          let slotIndex = undefined
          if (d.order_type === 'shared_account' && (d as any).slotList) {
            const matchSlot = (d as any).slotList.find((s: any) => s.cdk_id === cdk.id)
            if (matchSlot) slotIndex = matchSlot.slot_index
          }
          return { ...cdk, slotIndex }
        })
        cdkList.value = finalCdks

        if (finalCdks.length > 0 && finalCdks[0].accountData) {
            const acc = finalCdks[0].accountData
            instructionImage.value = acc.image || acc.help_image || acc.common_image || ''
        }
      }

      // 3. Check Refund Request (If status is 'refunding' OR checking just in case)
      if (d.status === 'refunding' || d.status === 'active' || d.status === 'pending_delivery') {
         const refundRes = await clientOrderApi.getRefundRequest(orderId)
         if (refundRes.success && refundRes.data) {
             pendingRefundRequest.value = refundRes.data
         } else {
             pendingRefundRequest.value = null
         }
      }

      // 4. Check Active Tickets
      // We look for any currently processing ticket for this order
      // Assuming ticketApi.getList can filter by order is hard without modifying it,
      // but let's check what getList does. It filters by 'status' global.
      // Ideally we need `ticketApi.getList(status, orderId)`.
      // For now, let's fetch 'processing' tickets and search client side (not efficient but works for low volume)
      const ticketRes = await ticketApi.getList('processing')
      if (ticketRes.success && ticketRes.data) {
          const match = ticketRes.data.find((t:any) => t.order_id === orderId)
          if (match) {
              activeTicketId.value = match.id
          } else {
              activeTicketId.value = null
          }
      }

    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>

.order-detail-page {
  display: flex; flex-direction: column; 
  width: 100%; max-width: 100%;
  padding: 0; /* No global padding to allow full-bleed header */
  /* overflow-x: hidden;  <-- REMOVED to fix sticky behavior */
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

/* --- 1. Status Hero Card (Full Width Header) --- */
.status-hero-card {
  position: relative;
  width: 100%; 
  height: 180px; /* Restored/Fixed Height, user wanted ~140-180? Code says 140 before */
  /* Let's keep 140px as requested previously, or adjusted */
  height: 140px;
  
  /* Full bleed: No border radius at top to flush with container */
  /* Optional: Round bottom for style */
  border-radius: 0; 
  /* Or if user wants floating look but flush top: */
  /* border-radius: 0 0 24px 24px; */ 
  
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  background: #0F172A;
}

.noise-overlay {
  position: absolute; inset: 0; pointer-events: none; z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.hero-content {
  position: relative; z-index: 3; height: 100%;
  display: flex; flex-direction: column; 
  padding: 20px 32px; /* Increased side padding for aesthetics */
  justify-content: space-between;
}

.hero-top-row { display: flex; justify-content: space-between; align-items: flex-start; }
.top-left-group { display: flex; align-items: center; gap: 16px; }

.back-btn {
  display: flex; align-items: center; gap: 6px;
  color: #fff; cursor: pointer; font-size: 14px; font-weight: 500;
  opacity: 0.8; transition: opacity 0.2s;
}
.back-btn:hover { opacity: 1; }

.order-no-badge {
  display: flex; align-items: center; gap: 8px;
  background: rgba(0,0,0,0.3); padding: 4px 12px; border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05); height: 28px;
}
.order-no-badge .label { font-size: 11px; color: #64748B; font-weight: 700; transform: translateY(1px); }
.order-no-badge .value { font-family: 'Monaco', monospace; color: #CBD5E1; font-size: 12px; }
.copy-icon { cursor: pointer; color: #64748B; transition: color 0.2s; }
.copy-icon:hover { color: #fff; }

.amount-display-top { 
  font-family: 'Outfit', sans-serif; display: flex; align-items: baseline; color: #fff; line-height: 1; 
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.amount-integer { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
.amount-decimal { font-size: 16px; font-weight: 500; color: #CBD5E1; }
.amount-unit { font-size: 12px; color: #F59E0B; font-weight: 600; margin-left: 4px; }

.hero-main-row { display: flex; justify-content: space-between; align-items: flex-end; }
.status-group { display: flex; align-items: center; gap: 16px; }

.status-icon-box {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.status-text-wrapper { display: flex; flex-direction: column; gap: 2px; }
.status-title-row { display: flex; align-items: center; gap: 10px; }
.status-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
.status-desc { font-size: 12px; color: #94A3B8; font-weight: 400; }

.time-badge { 
  font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 4px; 
  padding: 2px 8px; border-radius: 4px; border: 1px solid;
}
.time-badge.critical { color: #FECACA; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.3); animation: pulse-red 2s infinite; }
.time-badge.warning { color: #FDE68A; background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.3); }
.time-badge.safe { color: #A7F3D0; background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.3); }

/* Buttons */
.hero-actions { display: flex; gap: 10px; align-items: center; }

.hero-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 10px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  border: none; transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.hero-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 15px rgba(0,0,0,0.3); }
.hero-btn:active { transform: translateY(0); }
.hero-btn.secondary { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
.hero-btn.secondary:hover { background: rgba(255,255,255,0.15); }
.hero-btn.primary { background: #3B82F6; color: #fff; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
.hero-btn.primary:hover { background: #2563EB; }
.hero-btn.danger { background: rgba(239, 68, 68, 0.15); color: #FCA5A5; border: 1px solid rgba(239, 68, 68, 0.3); }
.hero-btn.danger:hover { background: rgba(239, 68, 68, 0.25); color: #fff; border-color: rgba(239, 68, 68, 0.5); }

/* Gradients */
.hero-aurora-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1; transition: all 0.5s;
  background: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.2), transparent 40%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.active, .hero-aurora-bg.completed {
  background: radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.25), transparent 50%),
              linear-gradient(135deg, rgba(6, 78, 59, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.pending_delivery {
  background: radial-gradient(circle at 90% 10%, rgba(249, 115, 22, 0.25), transparent 50%),
              linear-gradient(135deg, rgba(67, 20, 7, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.refunding {
  background: radial-gradient(circle at 50% 10%, rgba(168, 85, 247, 0.25), transparent 50%),
              linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.refunded, .hero-aurora-bg.closed {
  background: radial-gradient(circle at 50% 10%, rgba(239, 68, 68, 0.2), transparent 50%),
              linear-gradient(135deg, rgba(69, 10, 10, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}

.status-icon-box.active { color: #34D399; background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.3); }
.status-icon-box.pending_delivery { color: #FB923C; background: rgba(249, 115, 22, 0.2); border-color: rgba(249, 115, 22, 0.3); }
.status-icon-box.refunding { color: #A855F7; background: rgba(168, 85, 247, 0.2); border-color: rgba(168, 85, 247, 0.3); }
.status-icon-box.refunded { color: #F87171; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.3); }

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
</style>