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

             <!-- Dynamic Buttons -->
             <button v-if="canRenew" class="op-btn primary" @click="handleAction('renew')">续费</button>
             
             <button v-if="order.status === 'refunding' || pendingRefundRequest" class="op-btn warning" @click="handleAction('cancel_refund')">取消退款</button>
             <button v-else-if="canRefund" class="op-btn danger" @click="handleAction('apply_refund')">退款</button>
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
                <div class="order-no" @click="copyText(order.order_no)">
                   NO.{{ order.order_no }} <el-icon><CopyDocument /></el-icon>
                </div>
             </div>
          </div>
       </div>

       <!-- Fulfillment Section -->
       <div class="fulfillment-container" v-if="['pending_delivery', 'active', 'completed', 'refunding'].includes(order.status || '')">
           
           <!-- Shared Account -->
           <template v-if="order.orderType === 'shared_account'">
              <div v-for="(slot, idx) in slotList" :key="slot.id || idx" class="section-group">
                  <FulfillmentShared 
                      :cdk-item="getCdkForSlot(slot)"
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
                         :order-id="order.id"
                         :order-status="order.status"
                         :cdk-fields="getFieldsForCdk(cdkList[0])"
                         :cdk-id="cdkList[0].id"
                         @submit-success="handleFulfillmentSuccess"
                      />

                      <FulfillmentHistory
                         ref="historyRef"
                         :order-id="order.id"
                         :filter-cdk-id="cdkList[0].id"
                      />
                  </div>
               </div>
           </template>

       </div>

       <!-- Tutorial -->
       <div class="section-group" v-if="instructionImage">
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
    <MobileRenewalSheet v-if="order.id" v-model="showRenewalSheet" :order-id="order.id" @success="loadData" />
    <MobileRefundSheet v-if="order.id" v-model="showRefundSheet" :order-id="order.id" :order-no="order.order_no" @success="loadData" />
    <MobileTicketSheet v-if="showTicketSheet && order.id" v-model="showTicketSheet" :order-id="order.id" :order-info="order" @success="onTicketSuccess" />
    
    <ContactModal v-if="showContactModal" @close="showContactModal = false" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  ArrowLeft, CopyDocument, CircleCheck, InfoFilled, 
  Box, RefreshLeft, Headset, Tickets, ZoomIn
} from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client'
import { ticketApi } from '@/api/client/ticket'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'
import FulfillmentShared from '@/components/mobile/order/FulfillmentShared.vue'
import FulfillmentCdk from '@/components/mobile/order/FulfillmentCdk.vue'
import FulfillmentSubmitForm from '@/components/mobile/order/FulfillmentSubmitForm.vue'
import FulfillmentHistory from '@/components/mobile/order/FulfillmentHistory.vue'

// Mobile Sheets
import MobileRenewalSheet from '@/components/mobile/order/MobileRenewalSheet.vue'
import MobileRefundSheet from '@/components/mobile/order/MobileRefundSheet.vue'
import MobileTicketSheet from '@/components/mobile/order/MobileTicketSheet.vue'
// Reuse PC Contact Modal as it's simple enough or fallback
import ContactModal from '@/components/pc/modal/ContactModal.vue'

definePageMeta({ layout: 'mobile', ssr: false, middleware: 'client-auth' })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string
const loading = ref(true)

const { getOrderStatusLabel } = useBizConfig()
const { formatDate } = useBizFormat()
const formatTime = (t?: string) => t ? formatDate(t) : '--'

// Data
const order = ref<any>({})
const cdkList = ref<any[]>([])
const slotList = ref<any[]>([])
const instructionImage = ref('')
const activeTicketId = ref<string | null>(null)
const pendingRefundRequest = ref<any>(null)

// Virtual Component Refs
const historyRef = ref<any>(null)

// Sheets State
const showRenewalSheet = ref(false)
const showRefundSheet = ref(false)
const showTicketSheet = ref(false)
const showContactModal = ref(false)

// Logic
const statusText = computed(() => {
  const s = order.value.status
  if (s === 'pending_delivery') return '待发货'
  if (s === 'active') return '使用中'
  if (s === 'refunding') return '退款中'
  if (s === 'refunded') return '已退款'
  return getOrderStatusLabel(s || '')
})

const isOneTime = computed(() => order.value.orderType === 'one_time_cdk')
const canRenew = computed(() => !isOneTime.value && ['active', 'expired'].includes(order.value.status || ''))
const canRefund = computed(() => !isOneTime.value && ['pending_delivery', 'active'].includes(order.value.status || ''))

const loadData = async () => {
    if (!orderId) return
    loading.value = true
    try {
        const res = await clientOrderApi.getOrderDetail(orderId)
        if (res.success && res.data) {
            const d = res.data
            order.value = {
                id: d.id,
                order_no: d.order_no,
                orderType: d.order_type,
                status: d.status,
                quantity: d.quantity,
                totalAmount: Number(d.total_amount).toFixed(2),
                createdAt: d.created_at,
                expires_at: d.expires_at,
                productName: d.product_snapshot?.product_name || '',
                productImage: d.product_snapshot?.image || '',
                skuSpec: d.sku_snapshot?.spec_combination ? Object.values(d.sku_snapshot.spec_combination).join(' ') : '标准'
            }

            if (d.cdkList) {
                cdkList.value = d.cdkList
                 if (cdkList.value.length > 0) {
                    const first = cdkList.value[0]
                    if (first.accountData) {
                       instructionImage.value = first.accountData.image || first.accountData.help_image || ''
                    }
                }
            }
            slotList.value = d.slotList || []

            // Extras
            if (['refunding', 'active', 'pending_delivery'].includes(d.status)) {
                const r = await clientOrderApi.getRefundRequest(orderId)
                if (r.success) pendingRefundRequest.value = r.data
            }
            const t = await ticketApi.getList('processing')
            if (t.success && t.data) {
                const match = t.data.find((x:any) => x.order_id === orderId)
                activeTicketId.value = match ? match.id : null
            }
        }
    } catch(e) { console.error(e) } 
    finally { loading.value = false }
}

const getCdkForSlot = (slot: any) => cdkList.value.find(c => c.id === slot.cdk_id) || {}

// Helper for Virtual Fields
const getFieldsForCdk = (cdk: any) => {
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
    keys = cleaned.split(/[,，、]/).map((s: string) => s.trim()).filter((s: string) => s.length > 0)
  }
  return keys.map(key => ({ key, label: key, value: '' }))
}

const handleFulfillmentSuccess = () => {
    historyRef.value?.refresh()
}

const handleAction = async (type: string) => {
    if (type === 'contact') showContactModal.value = true
    else if (type === 'create_ticket') showTicketSheet.value = true
    else if (type === 'view_ticket') router.push('/mobile/profile/tickets')
    else if (type === 'renew') showRenewalSheet.value = true
    else if (type === 'apply_refund') showRefundSheet.value = true
    else if (type === 'cancel_refund') {
        try {
            await ElMessageBox.confirm('确定撤销退款申请？', '提示', { type: 'warning' })
            await clientOrderApi.cancelRefundRequest(orderId)
            ElMessage.success('已撤销')
            loadData()
        } catch {}
    }
}

const previewImage = (url: string) => {
    // Simple new tab preview for now
    window.open(url, '_blank')
}
const copyText = (t: string) => {
    navigator.clipboard.writeText(t).then(() => ElMessage.success('已复制'))
}
const onTicketSuccess = () => {
    ElMessage.success('工单已提交')
    loadData()
}

onMounted(loadData)

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
