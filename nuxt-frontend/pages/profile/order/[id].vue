<template>
  <div class="order-detail-page">
    
    <!-- 1. Sticky Status Hero Card -->
    <div class="hero-sticky-wrapper">
      <div class="status-hero-card">
        <div class="hero-aurora-bg" :class="order.status"></div>
        
        <div class="hero-content">
          <!-- Top: Back, Order No, Actions Menu -->
          <div class="hero-header">
            <div class="header-left">
              <div class="back-btn" @click="router.back()">
                <el-icon><ArrowLeft /></el-icon>
              </div>
              <div class="order-no-badge">
                <span class="label">订单号</span>
                <span class="value">{{ order.order_no || '---' }}</span>
                <el-icon class="copy-icon" @click="copyText(order.order_no)"><CopyDocument /></el-icon>
              </div>
            </div>

            <!-- Action Menu Trigger -->
            <div class="header-right">
              <div class="action-menu-trigger" @click.stop="toggleActionMenu">
                <el-icon><MoreFilled /></el-icon>
              </div>
              
              <!-- Popover Menu -->
              <transition name="menu-fade">
                <div v-if="showActionMenu" class="action-menu-popover" @click.stop>
                   <div class="menu-item" @click="handleAction('contact')">
                     <el-icon><Service /></el-icon> 联系客服
                   </div>
                   <div class="menu-item" @click="handleAction('ticket')">
                     <el-icon><Tickets /></el-icon> 申请工单
                   </div>
                   <!-- Only show Renew/Refund if logic allows, or always show as requested -->
                   <div class="menu-item" @click="handleAction('renew')">
                     <el-icon><Refresh /></el-icon> 续费
                   </div>
                   <div class="menu-item danger" @click="handleAction('refund')">
                     <el-icon><Money /></el-icon> 申请退款
                   </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Middle: Status & Amount & CountDown -->
          <div class="status-display">
            <div class="status-main">
              <!-- Icon based on 3 main statuses -->
              <div class="status-icon-box" :class="order.status">
                <el-icon v-if="order.status === 'active' || order.status === 'completed'"><CircleCheck /></el-icon>
                <el-icon v-else-if="order.status === 'pending_delivery'"><Box /></el-icon>
                <el-icon v-else-if="order.status === 'refunding' || order.status === 'refunded'"><RefreshLeft /></el-icon>
                <el-icon v-else><InfoFilled /></el-icon>
              </div>
              
              <div class="status-text-group">
                <h1 class="status-title">{{ statusText }}</h1>
                <!-- Remaining Time (Only for Active) -->
                <div v-if="order.status === 'active' && remainingDays !== null" class="time-badge" :class="getTimeLevel(remainingDays)">
                   <el-icon><Timer /></el-icon> 剩余 {{ remainingDays }} 天
                </div>
                <!-- Refund Text -->
                <div v-else-if="order.status === 'refunding'" class="status-desc">
                  退款申请处理中
                </div>
                <!-- Pending Delivery Text -->
                <div v-else-if="order.status === 'pending_delivery'" class="status-desc">
                   系统正在分配您的商品
                </div>
                <div v-else class="status-desc">
                  下单时间: {{ formatTime(order.createdAt) }}
                </div>
              </div>
            </div>

            <!-- Amount: Wallet Style -->
            <div class="amount-display">
              <span class="amount-integer">{{ getInteger(order.totalAmount || 0) }}</span>
              <span class="amount-decimal">.{{ getDecimal(order.totalAmount || 0) }}</span>
              <span class="amount-unit">点</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Content Stream (Glass Tiles) -->
    <div class="content-stream">
      
      <!-- Product Info Card -->
      <div class="glass-tile product-tile">
        <div class="tile-header">
          <span class="tile-title">商品信息</span>
        </div>
        <div class="product-content">
          <div class="product-thumb">
            <img v-if="order.productImage" :src="order.productImage" />
            <div v-else class="placeholder">📦</div>
          </div>
          <div class="product-details">
            <div class="product-name">{{ order.productName }}</div>
            <div class="product-meta">
              <span class="spec-tag">{{ order.skuSpec }}</span>
              <span class="qty-tag">x{{ order.quantity }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery / Fulfillment Section (The Core) -->
      <!-- Only show for relevant statuses -->
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
      <div v-if="instructionImage" class="glass-tile tutorial-tile fade-in-up">
        <div class="tile-header">
          <span class="tile-title">使用教程</span>
        </div>
        <div class="tutorial-body" @click="previewImage(instructionImage)">
          <img :src="instructionImage" loading="lazy" />
          <div class="zoom-hint">
            <el-icon><ZoomIn /></el-icon> 点击查看大图
          </div>
        </div>
      </div>

    </div>

    <!-- Global Click Listener for closing menu -->
    <div v-if="showActionMenu" class="click-outside-layer" @click="showActionMenu = false"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  ArrowLeft, CopyDocument, CircleCheck, Timer, CircleClose, InfoFilled, 
  ZoomIn, Box, MoreFilled, Service, Tickets, Refresh, Money, RefreshLeft
} from '@element-plus/icons-vue'
import { clientOrderApi } from '@/api/client'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'
import FulfillmentShared from '@/components/order/FulfillmentShared.vue'
import FulfillmentCdk from '@/components/order/FulfillmentCdk.vue'
import FulfillmentSubmitForm from '@/components/order/FulfillmentSubmitForm.vue'
import FulfillmentHistory from '@/components/order/FulfillmentHistory.vue'
import type { FulfillmentField } from '@/types/order'

definePageMeta({ ssr: false })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string
const loading = ref(true)
const showActionMenu = ref(false)

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

// Computed Status Text
const statusText = computed(() => {
  const s = order.value.status
  if (s === 'pending_delivery') return '待发货'
  if (s === 'active') return '使用中'
  if (s === 'refunding') return '退款中'
  if (s === 'refunded') return '已退款'
  return getOrderStatusLabel(s || '')
})

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

// Amount Helpers
const getInteger = (val: number) => Math.floor(val).toLocaleString()
const getDecimal = (val: number) => (val % 1).toFixed(2).split('.')[1]

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

// Action Menu Interactions
const toggleActionMenu = () => {
  showActionMenu.value = !showActionMenu.value
}
const handleAction = (type: string) => {
  showActionMenu.value = false
  if (type === 'contact') {
    window.open('https://work.weixin.qq.com/kfid/your_kfid', '_blank') // Replace with real link or config
  } else if (type === 'ticket') {
    // Open Ticket Modal (Not implemented here, verify if exists)
    ElMessage.info('功能开发中: 申请工单')
  } else if (type === 'renew') {
    ElMessage.info('功能开发中: 续费')
  } else if (type === 'refund') {
    ElMessage.warning('请联系客服申请退款')
  }
}

// Fetch
const loadData = async () => {
  if (!orderId) return
  loading.value = true
  try {
    const res = await clientOrderApi.getOrderDetail(orderId)
    if (res.success && res.data) {
      const d = res.data
      const pSnap = d.product_snapshot || {}
      const sSnap = d.sku_snapshot || {}

      order.value = {
        id: d.id,
        order_no: d.order_no,
        orderType: d.order_type,
        status: d.status,
        quantity: d.quantity,
        totalAmount: d.total_amount,
        createdAt: d.created_at,
        expires_at: d.expires_at,
        productName: pSnap.product_name,
        productImage: pSnap.image,
        skuSpec: sSnap.spec_combination ? Object.values(sSnap.spec_combination).join(' ') : '默认'
      }

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
  display: flex; flex-direction: column; gap: 24px;
  width: 100%; max-width: 100%;
  padding-bottom: 40px;
  position: relative;
}

/* --- Sticky Wrapper --- */
.hero-sticky-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  margin: -20px -20px 0 -20px; /* Pull out of parent padding to stick to true top */
  padding: 20px 20px 0 20px;   /* Compensation padding */
  background: rgba(15, 23, 42, 0.85); /* Dark backdrop for sticky area */
  backdrop-filter: blur(12px);
  padding-bottom: 20px; /* Spacing below card */
  border-bottom: 1px solid rgba(255,255,255,0.02);
}

/* --- 1. Status Hero Card --- */
.status-hero-card {
  position: relative;
  width: 100%; height: 180px; 
  border-radius: 20px; overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
}

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
  background: radial-gradient(circle at 50% 10%, rgba(168, 85, 247, 0.3), transparent 50%),
              linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.refunded, .hero-aurora-bg.closed {
  background: radial-gradient(circle at 50% 10%, rgba(239, 68, 68, 0.2), transparent 50%),
              linear-gradient(135deg, rgba(69, 10, 10, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}

.hero-content {
  position: relative; z-index: 2; height: 100%;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 20px 28px;
}

.hero-header { display: flex; justify-content: space-between; align-items: flex-start; }
.header-left { display: flex; align-items: center; gap: 12px; }
.header-right { position: relative; }

.back-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  color: #fff; cursor: pointer; font-size: 16px;
  border-radius: 8px; transition: all 0.2s;
  background: rgba(255,255,255,0.1);
}
.back-btn:hover { background: rgba(255,255,255,0.2); }

.order-no-badge {
  display: flex; align-items: center; gap: 8px;
  background: rgba(0,0,0,0.3); padding: 6px 14px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.05); height: 32px;
}
.order-no-badge .label { font-size: 11px; color: #64748B; font-weight: 700; transform: translateY(1px); }
.order-no-badge .value { font-family: 'Monaco', monospace; color: #CBD5E1; font-size: 13px; }
.copy-icon { cursor: pointer; color: #64748B; transition: color 0.2s; }
.copy-icon:hover { color: #fff; }

/* Action Menu */
.action-menu-trigger {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.1); border-radius: 8px;
  cursor: pointer; color: #fff; transition: all 0.2s;
}
.action-menu-trigger:hover { background: rgba(255,255,255,0.2); transform: rotate(90deg); }

.action-menu-popover {
  position: absolute; top: 40px; right: 0; min-width: 160px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
  display: flex; flex-direction: column; gap: 2px;
  z-index: 200;
  transform-origin: top right;
}
.menu-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  font-size: 13px; font-weight: 500; color: #E2E8F0;
  border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.menu-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
.menu-item.danger { color: #F87171; }
.menu-item.danger:hover { background: rgba(239, 68, 68, 0.1); }

.click-outside-layer { position: fixed; inset: 0; z-index: 90; cursor: default; }
.menu-fade-enter-active, .menu-fade-leave-active { transition: all 0.2s ease; }
.menu-fade-enter-from, .menu-fade-leave-to { opacity: 0; transform: scale(0.95); }

/* Middle Areas */
.status-display { display: flex; justify-content: space-between; align-items: flex-end; }
.status-main { display: flex; align-items: center; gap: 16px; }
.status-icon-box {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
}
.status-icon-box.active { color: #34D399; background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.3); }
.status-icon-box.pending_delivery { color: #FB923C; background: rgba(249, 115, 22, 0.2); border-color: rgba(249, 115, 22, 0.3); }
.status-icon-box.refunding { color: #A855F7; background: rgba(168, 85, 247, 0.2); border-color: rgba(168, 85, 247, 0.3); }
.status-icon-box.refunded { color: #F87171; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.3); }

.status-text-group { display: flex; flex-direction: column; gap: 2px; }
.status-title { font-size: 22px; font-weight: 700; color: #fff; margin: 0; letter-spacing: -0.5px; }
.status-desc { font-size: 13px; color: #94A3B8; }
.time-badge { font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 4px; padding-top: 2px; }
.time-badge.critical { color: #EF4444; }
.time-badge.warning { color: #F59E0B; }
.time-badge.safe { color: #10B981; }

.amount-display { font-family: 'Outfit', sans-serif; display: flex; align-items: baseline; color: #fff; line-height: 1; }
.amount-integer { font-size: 36px; font-weight: 700; letter-spacing: -1px; }
.amount-decimal { font-size: 20px; font-weight: 500; color: #CBD5E1; }
.amount-unit { font-size: 14px; color: #F59E0B; font-weight: 600; margin-left: 4px; transform: translateY(-3px); }

/* --- 2. Content Stream --- */
.content-stream { display: flex; flex-direction: column; gap: 16px; margin-top: 10px; }

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
.tutorial-body { position: relative; cursor: pointer; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
.tutorial-body img { width: 100%; display: block; transition: transform 0.3s; }
.zoom-hint {
  position: absolute; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  opacity: 0; transition: opacity 0.2s; color: #fff; font-weight: 600;
}
.tutorial-body:hover .zoom-hint { opacity: 1; }
.tutorial-body:hover img { transform: scale(1.02); }

.fade-in-up { animation: fadeInUp 0.4s ease-out backwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Mobile */
@media (max-width: 768px) {
  .status-display { flex-direction: column; align-items: flex-start; gap: 16px; }
  .status-hero-card { height: auto; }
}
</style>