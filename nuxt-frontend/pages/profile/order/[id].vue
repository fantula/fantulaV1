<template>
  <div class="order-detail-page">
    <!-- Header -->
    <div class="page-header sticky-header">
      <div class="header-content">
        <div class="header-left" @click="router.back()">
          <span class="back-icon">❮</span>
          <h1 class="page-title">返回订单列表</h1>
        </div>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <OrderSkeleton v-if="loading" />

    <template v-else-if="order.id">
      <div class="pc-container fade-in-up">
        
        <!-- ============================================== -->
        <!-- TOP: 核心信息 (通过 Order No 获取) -->
        <!-- ============================================== -->
        <div class="glass-card info-card">
          <div class="card-header">
            <span class="order-no">订单号：{{ order.order_no }}</span>
            <div class="status-tags">
              <span class="status-badge" :class="order.status">{{ statusText }}</span>
              <span v-if="remainingDays !== null && order.status !== 'expired'" class="expiry-tag warning">
                <span class="pulse-dot"></span> 剩余 {{ remainingDays }} 天
              </span>
            </div>
          </div>
          
          <div class="card-body flex-row">
            <!-- 商品头图 -->
            <div class="product-thumb">
              <img v-if="order.productImage" :src="order.productImage" alt="Product" />
              <div v-else class="placeholder">📦</div>
            </div>

            <!-- 名字 / SKU规格 / 下单时间 -->
            <div class="product-info-col">
              <h2 class="product-name">{{ order.productName }}</h2>
              <div class="sku-spec">规格：{{ order.skuSpec }}</div>
              <div class="meta-time">下单时间：{{ formatTime(order.createdAt) }}</div>
            </div>

            <!-- 数量 / 总金额 -->
            <div class="price-col">
              <div class="qty">x {{ order.quantity }}</div>
              <div class="total-price">￥{{ order.totalAmount }}</div>
            </div>
          </div>
        </div>

        <!-- ============================================== -->
        <!-- MIDDLE: 交付信息 (根据 Order Type 显示) -->
        <!-- 只在 待发货(pending_delivery) 和 使用中(active) 时显示 -->
        <!-- ============================================== -->
        <div v-if="['pending_delivery', 'active'].includes(order.status || '')" class="fade-in-up" style="animation-delay: 0.1s">
          <!-- Virtual Order: Hide FulfillmentVirtual (CDK code), only show Submit Form below -->
          
          <FulfillmentShared 
            v-if="order.orderType === 'shared_account'" 
            :cdk-list="cdkList" 
          />
          <FulfillmentCdk 
            v-else-if="order.orderType !== 'virtual'" 
            :cdk-list="cdkList" 
          />
        </div>

        <!-- ============================================== -->
        <!-- 虚拟充值回执表单 (仅 virtual 类型) -->
        <!-- ============================================== -->
        <FulfillmentSubmitForm
          v-if="order.orderType === 'virtual' && ['pending_delivery', 'active'].includes(order.status || '')"
          :order-id="order.id || ''"
          :order-status="order.status || ''"
          :cdk-fields="fulfillmentFields"
          @submit-success="handleFulfillmentSuccess"
          class="fade-in-up"
          style="animation-delay: 0.15s"
        />

        <!-- ============================================== -->
        <!-- 回执历史记录 (仅 virtual 类型) -->
        <!-- ============================================== -->
        <FulfillmentHistory
          v-if="order.orderType === 'virtual'"
          ref="historyRef"
          :order-id="order.id || ''"
          class="fade-in-up"
          style="animation-delay: 0.18s"
        />

        <!-- ============================================== -->
        <!-- BOTTOM: 使用教程 (One Image from account_data) -->
        <!-- ============================================== -->
        <div v-if="instructionImage" class="glass-card tutorial-card fade-in-up" style="animation-delay: 0.2s">
          <div class="section-title">📖 使用教程</div>
          <div class="tutorial-body">
            <img :src="instructionImage" alt="使用教程" />
            <div class="zoom-overlay">
              <span>点击查看大图</span>
            </div>
          </div>
        </div>

        <!-- 底部空白占位 (防止最后一张卡片贴底) -->
        <div style="height: 20px;"></div>
      </div>
      
      <!-- 底部操作栏 -->
      <OrderActions :order="order" />
      
    </template>


    <!-- Fallback / Empty -->
    <div v-else class="empty-state">
      <div class="empty-icon">📂</div>
      <p>订单信息加载中或不存在</p>
      <button class="back-btn" @click="router.back()">返回</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { clientOrderApi } from '@/api/client'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'
import OrderSkeleton from '@/components/order/OrderSkeleton.vue'
import FulfillmentShared from '@/components/order/FulfillmentShared.vue'
import FulfillmentCdk from '@/components/order/FulfillmentCdk.vue'
import FulfillmentSubmitForm from '@/components/order/FulfillmentSubmitForm.vue'
import FulfillmentHistory from '@/components/order/FulfillmentHistory.vue'
import OrderActions from '@/components/order/OrderActions.vue'
import type { FulfillmentField } from '@/types/order'

definePageMeta({ ssr: false })

const route = useRoute()
const router = useRouter()
const orderId = route.params.id as string
const loading = ref(true)

const { getOrderStatusLabel } = useBizConfig()
const { formatDate } = useBizFormat()
// ... (Types)
interface OrderDetail {
  id: string
  order_no: string
  orderType: string
  status: string
  quantity: number
  totalAmount: number
  createdAt: string
  // Snapshot info
  productName: string
  productImage: string
  skuSpec: string
}

interface CdkItem {
  id: string
  code: string
  parsed: any
  accountData: any
  slotIndex?: number // For shared account
}

const order = ref<Partial<OrderDetail>>({})
const cdkList = ref<CdkItem[]>([])
const instructionImage = ref('')

// --- Computed ---
const statusText = computed(() => getOrderStatusLabel(order.value.status || ''))

const remainingDays = computed(() => {
  // @ts-ignore
  if (!order.value.expires_at) return null
  // @ts-ignore
  const diff = new Date(order.value.expires_at).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
})

// 从 CDK code 解析出需要填写的字段
const fulfillmentFields = computed((): FulfillmentField[] => {
  if (!cdkList.value.length) return []
  
  const cdk = cdkList.value[0]
  let keys: string[] = []

  // 1. Try JSON Parsed first
  if (cdk.parsed && typeof cdk.parsed === 'object') {
    // Priority: Check for "fields" array (e.g., {"fields":["邮箱","订单"]})
    if (Array.isArray(cdk.parsed.fields) && cdk.parsed.fields.length > 0) {
      keys = cdk.parsed.fields.filter((f: any) => typeof f === 'string')
    } 
    // Fallback: Use object keys if not "fields" format
    else if (Object.keys(cdk.parsed).length > 0) {
      keys = Object.keys(cdk.parsed)
    }
  }

  // 2. Fallback: Parse raw code string
  if (keys.length === 0) {
    // e.g. "（账号，密码，备注）" -> ["账号", "密码", "备注"]
    const raw = cdk.code?.trim() || ''
    if (!raw) return []
    
    // Remove parentheses: ( ) （ ） [ ] 【 】
    let cleaned = raw.replace(/[\(\)（）\[\]【】]/g, '')
    
    // Split by delimiters: , ， 、
    keys = cleaned.split(/[,，、]/).map(s => s.trim()).filter(s => s.length > 0)
  }

  return keys.map(key => ({
    key,
    label: key,
    value: ''
  }))
})

// 回执历史组件引用
const historyRef = ref<{ refresh: () => void } | null>(null)

// 回执提交成功回调
const handleFulfillmentSuccess = () => {
  // 刷新历史记录
  historyRef.value?.refresh()
}

// --- Methods ---
const formatTime = (t?: string) => t ? formatDate(t) : '-'
const previewImage = (url: string) => window.open(url, '_blank')

// --- Fetch Logic ---
const loadData = async () => {
  if (!orderId) return
  loading.value = true
  
  try {
    const res = await clientOrderApi.getOrderDetail(orderId)
    if (res.success && res.data) {
      const d = res.data
      const pSnap = d.product_snapshot || {}
      const sSnap = d.sku_snapshot || {}

      // 1. Set Order Info
      order.value = {
        id: d.id,
        order_no: d.order_no,
        orderType: d.order_type,
        status: d.status,
        quantity: d.quantity,
        totalAmount: d.total_amount,
        createdAt: d.created_at,
        // @ts-ignore
        expires_at: d.expires_at, // Keeping raw for calc
        productName: pSnap.product_name,
        productImage: pSnap.image,
        skuSpec: sSnap.spec_combination ? Object.values(sSnap.spec_combination).join(' ') : '默认'
      }

      // 2. Set CDK List (Middle)
      if (d.cdkList) {
        // Map slot index if shared
        const finalCdks = d.cdkList.map((cdk: any) => {
          let slotIndex = undefined
          if (d.order_type === 'shared_account' && (d as any).slotList) {
            // Find slot matching this CDK
            const matchSlot = (d as any).slotList.find((s: any) => s.cdk_id === cdk.id)
            if (matchSlot) slotIndex = matchSlot.slot_index
          }
          return {
            ...cdk,
            slotIndex
          }
        })
        cdkList.value = finalCdks

        // 3. Set Instruction Image (Bottom) - Get from first CDK
        if (finalCdks.length > 0 && finalCdks[0].accountData) {
            const acc = finalCdks[0].accountData
            // Try different common field names for image
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
  min-height: 100vh;
  padding-bottom: 100px; /* 增加底部内边距，防止被操作栏遮挡 */
  background: #0f172a;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
}

/* Header */
.sticky-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.header-content { max-width: 800px; margin: 0 auto; padding: 16px 20px; }
.header-left { display: flex; align-items: center; cursor: pointer; opacity: 0.8; }
.header-left:hover { opacity: 1; }
.back-icon { margin-right: 8px; font-size: 14px; }
.page-title { font-size: 16px; font-weight: 500; margin: 0; }

/* Container */
.pc-container {
  max-width: 800px; margin: 24px auto; padding: 0 20px;
  display: flex; flex-direction: column; gap: 24px;
}

/* Glass Card */
.glass-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

/* TOP Section */
.info-card { padding: 24px; background: linear-gradient(180deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.4) 100%); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.order-no { font-family: monospace; color: #94a3b8; font-size: 14px; }
.status-tags { display: flex; gap: 10px; align-items: center; }
.status-badge { padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; text-transform: uppercase; }
.status-badge.active { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
.status-badge.pending_delivery { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
.status-badge.expired { background: rgba(148, 163, 184, 0.2); color: #94a3b8; }
.expiry-tag { font-size: 12px; color: #fb923c; display: flex; align-items: center; gap: 4px; }
.pulse-dot { width: 6px; height: 6px; background: currentColor; border-radius: 50%; }

.card-body { display: flex; gap: 20px; }
.product-thumb { width: 80px; height: 80px; border-radius: 10px; overflow: hidden; background: #1e293b; }
.product-thumb img { width: 100%; height: 100%; object-fit: cover; }
.product-thumb .placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px; }

.product-info-col { flex: 1; display: flex; flex-direction: column; justify-content: center;gap: 6px; }
.product-name { font-size: 18px; font-weight: 600; margin: 0; line-height: 1.4; }
.sku-spec { font-size: 13px; color: #94a3b8; background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 4px; width: fit-content; }
.meta-time { font-size: 12px; color: #64748b; margin-top: 4px; }

.price-col { text-align: right; display: flex; flex-direction: column; justify-content: center; }
.qty { color: #94a3b8; font-size: 14px; margin-bottom: 4px; }
.total-price { font-size: 20px; font-weight: 700; color: #f8fafc; }


/* MIDDLE Section - DELEGATED TO COMPONENTS */
.section-title { padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 600; font-size: 15px; background: rgba(0,0,0,0.2); }
.delivery-list { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }

/* BOTTOM Section */
.tutorial-body { padding: 0; position: relative; cursor: pointer; }
.tutorial-body img { width: 100%; display: block; }
.zoom-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s; }
.tutorial-body:hover .zoom-overlay { opacity: 1; }

.empty-state { text-align: center; padding: 80px 0; color: #64748b; }
.empty-icon { font-size: 48px; margin-bottom: 16px; }
.back-btn { margin-top: 16px; padding: 8px 24px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; border-radius: 8px; cursor: pointer; }

/* Animation */
.fade-in-up { animation: fadeInUp 0.4s ease-out backwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>