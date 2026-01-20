<template>
  <div class="page-container">
    <PageTipHeader title="虚拟充值订单" description="显示所有虚拟充值类型的订单，可审核用户提交的回执信息" />

    <AdminActionCard>
      <template #actions>
        <el-button @click="loadList" :icon="Refresh">刷新</el-button>
      </template>
    </AdminActionCard>


    <AdminDataTable
      :data="list"
      :loading="loading"
      :total="total"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      @page-change="loadList"
    >
      <!-- 订单号 -->
      <el-table-column label="订单号" min-width="150">
        <template #default="{ row }">
          <span class="mono-text" @click="handleCopy(row.order_no)">{{ row.order_no }}</span>
        </template>
      </el-table-column>

      <!-- 用户ID+头像 -->
      <el-table-column label="用户" min-width="140">
        <template #default="{ row }">
          <div class="user-cell">
            <el-avatar :size="28" :src="row._profile?.avatar || DEFAULT_AVATAR" />
            <span class="uid-text">{{ row._profile?.uid || '无UID' }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 商品名称+头图 -->
      <el-table-column label="商品" min-width="200">
        <template #default="{ row }">
          <div class="product-cell">
            <img v-if="row.product_snapshot?.image" :src="row.product_snapshot.image" class="product-thumb" />
            <span>{{ row.product_snapshot?.product_name || '未知商品' }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- SKU规格 -->
      <el-table-column label="规格" min-width="140">
        <template #default="{ row }">
          <span class="spec-text">{{ formatSpec(row.sku_snapshot?.spec_combination) }}</span>
        </template>
      </el-table-column>

      <!-- 数量 -->
      <el-table-column label="数量" width="60" align="center">
        <template #default="{ row }">
          <span>{{ row.quantity || 1 }}</span>
        </template>
      </el-table-column>

      <!-- 总支付 -->
      <el-table-column label="总支付" width="90">
        <template #default="{ row }">
          <span class="amount">{{ formatPrice(row.total_amount) }}</span>
        </template>
      </el-table-column>

      <!-- 优惠券抵扣 -->
      <el-table-column label="优惠券" width="80">
        <template #default="{ row }">
          <span v-if="row.coupon_snapshot?.discount_amount" class="discount">
            -{{ formatPrice(row.coupon_snapshot.discount_amount) }}
          </span>
          <span v-else class="no-discount">-</span>
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column label="状态" width="90">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status) || 'info'" size="small">{{ getStatusText(row.status) }}</el-tag>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column label="创建时间" width="150">
        <template #default="{ row }">
          {{ formatTime(row.created_at) }}
        </template>
      </el-table-column>

      <!-- 到期时间 -->
      <el-table-column label="到期时间" width="150">
        <template #default="{ row }">
          {{ formatTime(row.end_time || row.expires_at) }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="120" fixed="right" align="center">
        <template #default="{ row }">
          <el-button 
            link 
            type="primary" 
            @click="handleViewReceipt(row)"
          >
            {{ row.status === 'pending_delivery' ? '审核回执' : '查看回执' }}
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- 回执审核弹窗 -->
    <el-dialog v-model="receiptDialogVisible" title="虚拟充值 - 回执审核" width="600px" destroy-on-close>
      <div v-if="receiptLoading" class="loading-state">
        <el-icon class="is-loading"><Loading /></el-icon> 正在加载回执记录...
      </div>
      
      <template v-else-if="currentReceipt">
        <el-alert
          v-if="currentReceipt.status === 'submitted'"
          title="该订单等待发货审核"
          type="warning"
          show-icon
          :closable="false"
          class="mb-4"
        />
        <el-alert
          v-if="currentReceipt.status === 'approved'"
          title="该订单已发货完成"
          type="success"
          show-icon
          :closable="false"
          class="mb-4"
        />
        
        <el-descriptions title="提交信息" :column="1" border class="receipt-descriptions">
          <el-descriptions-item label="提交时间">{{ formatTime(currentReceipt.submitted_at) }}</el-descriptions-item>
          <el-descriptions-item label="当前状态">
            <el-tag :type="(getReceiptStatusType(currentReceipt.status) as any)">
              {{ getReceiptStatusName(currentReceipt.status) }}
            </el-tag>
          </el-descriptions-item>
          
          <template v-for="(value, key) in currentReceipt.payload" :key="key">
            <el-descriptions-item :label="key" label-class-name="bold-label">
              <span class="payload-value">{{ value }}</span>
            </el-descriptions-item>
          </template>
        </el-descriptions>

        <!-- Reject Reason Display -->
        <div v-if="currentReceipt.status === 'rejected'" class="reject-reason-box">
          <p class="label">驳回原因：</p>
          <p class="content">{{ currentReceipt.reject_reason }}</p>
        </div>

        <!-- Reject Reason Input (for action) -->
        <div v-if="rejectMode" class="reject-input-area">
          <p class="input-label">请输入驳回原因通知用户：</p>
          <el-input 
            v-model="rejectReason" 
            type="textarea" 
            :rows="3" 
            placeholder="例如：账号密码错误，请重新提交..." 
          />
        </div>
      </template>

      <div v-else class="empty-receipt">
        <el-empty description="用户尚未提交充值回执" :image-size="80" />
      </div>

      <template #footer>
        <!-- Action Buttons -->
        <template v-if="currentReceipt?.status === 'submitted'">
          <div class="dialog-footer-actions">
            <template v-if="!rejectMode">
              <el-button @click="rejectMode = true">驳回订单</el-button>
              <el-button type="primary" @click="handleApproveReceipt" :loading="receiptSubmitting" :icon="Check">
                确认发货 (通过)
              </el-button>
            </template>
            <template v-else>
              <el-button @click="rejectMode = false">取消</el-button>
              <el-button type="danger" @click="handleRejectReceipt" :loading="receiptSubmitting">
                确认驳回
              </el-button>
            </template>
          </div>
        </template>
        <template v-else>
          <el-button @click="receiptDialogVisible = false">关闭</el-button>
        </template>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Refresh, Loading, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useAdminOrderList } from '@/composables/admin/useAdminOrderList'
import { adminFulfillmentApi } from '@/api/admin/fulfillment'
import type { OrderFulfillment } from '@/types/order'

definePageMeta({ ssr: false })

const {
  loading,
  list,
  total,
  page,
  pageSize,
  DEFAULT_AVATAR,
  loadList,
  handleCopy,
  formatSpec,
  getStatusText,
  getStatusType,
  formatTime,
  formatPrice
} = useAdminOrderList('virtual')

// --- Receipt Review State ---
const receiptDialogVisible = ref(false)
const receiptLoading = ref(false)
const receiptSubmitting = ref(false)
const currentReceipt = ref<OrderFulfillment | null>(null)
const currentOrderId = ref('')
const rejectMode = ref(false)
const rejectReason = ref('')

// 查看回执
const handleViewReceipt = async (order: any) => {
  currentOrderId.value = order.id
  receiptDialogVisible.value = true
  rejectMode.value = false
  rejectReason.value = ''
  currentReceipt.value = null
  
  receiptLoading.value = true
  try {
    const result = await adminFulfillmentApi.getOrderFulfillment(order.id)
    if (result.success) {
      currentReceipt.value = result.data || null
    } else {
      ElMessage.error(result.error || '获取回执失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '系统异常')
  } finally {
    receiptLoading.value = false
  }
}

const getReceiptStatusName = (status: string) => {
  const map: Record<string, string> = {
    'submitted': '待审核',
    'approved': '已通过',
    'rejected': '已驳回',
  }
  return map[status] || status
}

const getReceiptStatusType = (status: string) => {
  const map: Record<string, string> = {
    'submitted': 'warning',
    'approved': 'success',
    'rejected': 'danger',
  }
  return map[status] || 'info'
}

// 通过回执
const handleApproveReceipt = async () => {
  if (!currentReceipt.value) return
  receiptSubmitting.value = true

  try {
    const result = await adminFulfillmentApi.approveFulfillment(currentReceipt.value.id, currentOrderId.value)
    
    if (result.success) {
      ElMessage.success('已通过，订单已标记为发货完成，状态变更为服务中')
      receiptDialogVisible.value = false
      loadList()
    } else {
      ElMessage.error(result.error || '操作失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '系统异常')
  } finally {
    receiptSubmitting.value = false
  }
}

// 驳回回执
const handleRejectReceipt = async () => {
  if (!currentReceipt.value) return
  if (!rejectReason.value) {
    ElMessage.warning('请填写驳回原因')
    return
  }
  receiptSubmitting.value = true

  try {
    const result = await adminFulfillmentApi.rejectFulfillment(currentReceipt.value.id, rejectReason.value)

    if (result.success) {
      ElMessage.success('已驳回，用户将收到通知需重新提交')
      receiptDialogVisible.value = false
      loadList()
    } else {
      ElMessage.error(result.error || '操作失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '系统异常')
  } finally {
    receiptSubmitting.value = false
  }
}

// Initial load & Watch pagination
watch([page, pageSize], () => loadList(), { immediate: true })
</script>

<style scoped>
.page-container { display: flex; flex-direction: column; gap: 16px; }
.mono-text { font-family: 'Monaco', 'Consolas', monospace; font-size: 12px; color: #94a3b8; cursor: pointer; }
.mono-text:hover { color: #60a5fa; }
.user-cell { display: flex; align-items: center; gap: 8px; }
.uid-text { font-size: 12px; color: #94a3b8; font-family: 'Monaco', monospace; }
.product-cell { display: flex; align-items: center; gap: 8px; }
.product-thumb { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; background: #1e293b; }
.spec-text { font-size: 12px; color: #94a3b8; }
.amount { font-weight: 600; color: #22c55e; }
.discount { font-size: 12px; color: #f59e0b; }
.no-discount { color: #475569; }

/* Dialog Styles */
.loading-state, .empty-receipt { padding: 40px; text-align: center; color: var(--el-text-color-secondary); }
.receipt-descriptions :deep(.el-descriptions__label) { width: 100px; color: var(--el-text-color-secondary); }
.bold-label { font-weight: 600 !important; }
.payload-value { font-family: 'Roboto Mono', monospace; color: var(--el-text-color-primary); font-weight: 500; }

.mb-4 { margin-bottom: 20px; }

.reject-reason-box {
  margin-top: 15px;
  padding: 12px;
  background: var(--el-color-danger-light-9);
  border-radius: 4px;
  border-left: 3px solid var(--el-color-danger);
}
.reject-reason-box .label { font-weight: 600; color: var(--el-color-danger); margin-bottom: 4px; font-size: 12px; }
.reject-reason-box .content { color: var(--el-text-color-primary); font-size: 13px; line-height: 1.5; }

.reject-input-area {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed var(--el-border-color);
}
.input-label { margin-bottom: 8px; color: var(--el-text-color-primary); font-weight: 500; }

.dialog-footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
