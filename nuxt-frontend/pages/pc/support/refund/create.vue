<template>
  <div class="refund-apply-page">
    <div class="page-container">
      <!-- Header -->
      <div class="page-header">
        <button class="back-btn" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </button>
        <h1 class="page-title">申请退款</h1>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="loadOrder">重试</button>
      </div>

      <!-- Already has pending request -->
      <div v-else-if="hasPendingRequest" class="pending-state">
        <div class="pending-icon">🕐</div>
        <h2>退款申请处理中</h2>
        <p>您的退款申请正在审核中，请耐心等待。</p>
        <button class="primary-btn" @click="goBack">返回订单详情</button>
      </div>

      <!-- Apply Form -->
      <div v-else class="apply-form">
        <!-- Order Info -->
        <div class="order-card">
          <div class="order-header">
            <span class="order-label">订单信息</span>
            <span class="order-no">{{ order?.order_no }}</span>
          </div>
          <div class="order-content">
            <div class="product-info">
              <img :src="order?.product_snapshot?.image || '/images/shared/logo_v2.png'" class="product-img" />
              <div class="product-detail">
                <div class="product-name">{{ order?.product_snapshot?.product_name }}</div>
                <div class="product-spec">{{ getSpecText(order?.sku_snapshot) }}</div>
              </div>
            </div>
            <div class="order-amount">{{ order?.total_amount }}点</div>
          </div>
        </div>

        <!-- Reason Selection -->
        <div class="form-section">
          <div class="form-label">退款原因 <span class="required">*</span></div>
          <el-select v-model="reason" placeholder="请选择退款原因" class="reason-select">
            <el-option 
              v-for="opt in reasonOptions" 
              :key="opt.value" 
              :label="opt.label" 
              :value="opt.value" 
            />
          </el-select>
        </div>

        <!-- Detail -->
        <div class="form-section">
          <div class="form-label">补充说明</div>
          <el-input
            v-model="reasonDetail"
            type="textarea"
            :rows="3"
            placeholder="请详细描述您的问题（选填）"
            maxlength="500"
            show-word-limit
          />
        </div>

        <!-- Notice -->
        <div class="notice-card">
          <div class="notice-icon">ℹ️</div>
          <div class="notice-text">
            退款申请提交后将进入人工审核流程，最终退款金额以审核结果为准。
          </div>
        </div>

        <!-- Submit -->
        <button 
          class="submit-btn" 
          :disabled="!reason || submitting"
          @click="handleSubmit"
        >
          {{ submitting ? '提交中...' : '提交退款申请' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'
import { pcRoutes } from '@/config/client-routes'

const route = useRoute()
const router = useRouter()

const orderId = ref('')
const order = ref<any>(null)
const loading = ref(true)
const error = ref('')
const submitting = ref(false)
const hasPendingRequest = ref(false)

const reason = ref('')
const reasonDetail = ref('')

const reasonOptions = [
  { value: '买错商品', label: '买错商品' },
  { value: '不想要了', label: '不想要了' },
  { value: '商品无法使用', label: '商品无法使用' },
  { value: '未收到商品', label: '未收到商品' },
  { value: '其他原因', label: '其他原因' }
]

onMounted(() => {
  orderId.value = route.query.orderId as string
  if (!orderId.value) {
    error.value = '缺少订单ID'
    loading.value = false
    return
  }
  loadOrder()
})

async function loadOrder() {
  loading.value = true
  error.value = ''
  
  try {
    const client = getSupabaseClient()
    
    // Get order
    const { data: orderData, error: orderError } = await client
      .from('orders')
      .select('*')
      .eq('id', orderId.value)
      .single()
    
    if (orderError) throw orderError
    order.value = orderData
    
    // Check if can apply
    if (!['pending_delivery', 'active'].includes(orderData.status)) {
      error.value = '当前订单状态不可申请退款'
      return
    }
    
    // Check existing request
    const { data: requestData } = await client.rpc('get_refund_request', {
      p_order_id: orderId.value
    })
    
    if (requestData?.request?.status === 'pending') {
      hasPendingRequest.value = true
    }
    
  } catch (e: any) {
    error.value = e.message || '加载失败'
  } finally {
    loading.value = false
  }
}

function getSpecText(skuSnapshot: any) {
  if (!skuSnapshot?.spec_combination) return ''
  return Object.values(skuSnapshot.spec_combination).join(' / ')
}

async function handleSubmit() {
  if (!reason.value || submitting.value) return
  
  try {
    await ElMessageBox.confirm(
      '确定要提交退款申请吗？',
      '确认提交',
      { confirmButtonText: '确定', cancelButtonText: '取消' }
    )
  } catch {
    return
  }
  
  submitting.value = true
  
  try {
    const client = getSupabaseClient()
    const { data, error: rpcError } = await client.rpc('create_refund_request', {
      p_order_id: orderId.value,
      p_reason: reason.value,
      p_reason_detail: reasonDetail.value || null
    })
    
    if (rpcError) throw rpcError
    
    if (!data?.success) {
      ElMessage.error(data?.error || '提交失败')
      return
    }
    
    ElMessage.success('退款申请已提交，请等待审核')
    router.replace(pcRoutes.orderDetail(orderId.value))
    
  } catch (e: any) {
    ElMessage.error(e.message || '提交失败')
  } finally {
    submitting.value = false
  }
}

function goBack() {
  if (orderId.value) {
    router.push(pcRoutes.orderDetail(orderId.value))
  } else {
    router.back()
  }
}
</script>

<style scoped>
.refund-apply-page {
  min-height: 100vh;
  background: transparent;
  padding: 20px;
}

.page-container {
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
}

/* Loading & Error */
.loading-state, .error-state, .pending-state {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4C7AE0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin { to { transform: rotate(360deg); } }

.error-icon, .pending-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.pending-state h2 {
  color: #e2e8f0;
  margin: 0 0 8px 0;
}

.retry-btn, .primary-btn {
  margin-top: 16px;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.retry-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #94a3b8;
}

.primary-btn {
  background: #3b82f6;
  border: none;
  color: white;
}

/* Order Card */
.order-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
}

.order-label { color: #64748b; }
.order-no { color: #94a3b8; font-family: monospace; }

.order-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.product-img {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  background: #1e293b;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 4px;
}

.product-spec {
  font-size: 12px;
  color: #64748b;
}

.order-amount {
  font-size: 16px;
  font-weight: 600;
  color: #22c55e;
}

/* Form */
.form-section {
  margin-bottom: 20px;
}

.form-label {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.required { color: #ef4444; }

.reason-select {
  width: 100%;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-textarea__inner) {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

/* Notice */
.notice-card {
  display: flex;
  gap: 12px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.notice-icon { font-size: 20px; }

.notice-text {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
}

/* Submit */
.submit-btn {
  width: 100%;
  background: #ef4444;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover {
  background: #dc2626;
}

.submit-btn:disabled {
  background: #334155;
  color: #64748b;
  cursor: not-allowed;
}
</style>
