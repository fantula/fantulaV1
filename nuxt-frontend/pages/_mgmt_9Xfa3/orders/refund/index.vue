<template>
  <div class="page-container">
    <PageTipHeader title="退款管理" description="显示退款中和已退款的订单，审核用户的退款申请" />

    <AdminActionCard>
      <template #actions>
        <el-select v-model="statusFilter" placeholder="状态筛选" style="width: 120px; margin-right: 12px;">
          <el-option label="全部" value="" />
          <el-option label="退款中" value="refunding" />
          <el-option label="已退款" value="refunded" />
        </el-select>
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
            @click="handleViewRefund(row)"
          >
            {{ row.status === 'refunding' ? '审核' : '查看' }}
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- 退款审核弹窗 -->
    <el-dialog v-model="refundDialogVisible" title="退款申请审核" width="600px" destroy-on-close>
      <div v-if="refundLoading" class="loading-state">
        <el-icon class="is-loading"><Loading /></el-icon> 正在加载退款申请...
      </div>
      
      <template v-else-if="currentRequest">
        <el-alert
          v-if="currentRequest.status === 'pending'"
          title="该订单等待退款审核"
          type="warning"
          show-icon
          :closable="false"
          class="mb-4"
        />
        <el-alert
          v-if="currentRequest.status === 'approved'"
          title="该订单已完成退款"
          type="success"
          show-icon
          :closable="false"
          class="mb-4"
        />
        <el-alert
          v-if="currentRequest.status === 'rejected'"
          title="该退款申请已被拒绝"
          type="danger"
          show-icon
          :closable="false"
          class="mb-4"
        />
        
        <!-- 订单信息 -->
        <el-descriptions title="订单信息" :column="2" border class="mb-4">
          <el-descriptions-item label="订单号">{{ currentOrder?.order_no }}</el-descriptions-item>
          <el-descriptions-item label="订单金额">
            <span class="amount">¥{{ currentOrder?.total_amount }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="商品">{{ currentOrder?.product_snapshot?.product_name }}</el-descriptions-item>
          <el-descriptions-item label="原状态">{{ currentRequest?.original_status }}</el-descriptions-item>
        </el-descriptions>

        <!-- 申请信息 -->
        <el-descriptions title="退款申请" :column="1" border>
          <el-descriptions-item label="退款原因">{{ currentRequest.reason }}</el-descriptions-item>
          <el-descriptions-item label="补充说明" v-if="currentRequest.reason_detail">
            {{ currentRequest.reason_detail }}
          </el-descriptions-item>
          <el-descriptions-item label="申请时间">{{ formatTime(currentRequest.created_at) }}</el-descriptions-item>
          <el-descriptions-item label="申请状态">
            <el-tag :type="getRequestStatusType(currentRequest.status)">
              {{ getRequestStatusName(currentRequest.status) }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <!-- 已审核结果 -->
        <template v-if="currentRequest.status !== 'pending'">
          <el-descriptions title="审核结果" :column="1" border class="mt-4">
            <el-descriptions-item label="退款金额" v-if="currentRequest.refund_amount">
              <span class="amount">¥{{ currentRequest.refund_amount }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="管理员备注" v-if="currentRequest.admin_note">
              {{ currentRequest.admin_note }}
            </el-descriptions-item>
            <el-descriptions-item label="审核时间">{{ formatTime(currentRequest.reviewed_at) }}</el-descriptions-item>
          </el-descriptions>
        </template>

        <!-- 审核操作区 (仅 pending 状态) -->
        <template v-if="currentRequest.status === 'pending'">
          <div class="review-form mt-4">
            <div class="form-row">
              <label>退款金额：</label>
              <el-input-number 
                v-model="refundAmount" 
                :min="0" 
                :max="parseFloat(currentOrder?.total_amount || 0)"
                :precision="2"
                controls-position="right"
                style="width: 150px;"
              />
              <span class="hint">（订单金额: ¥{{ currentOrder?.total_amount }}）</span>
            </div>
            <div class="form-row">
              <label>管理员备注：</label>
              <el-input 
                v-model="adminNote" 
                type="textarea" 
                :rows="2" 
                placeholder="审核备注（选填）"
                style="flex: 1;"
              />
            </div>
          </div>
        </template>
      </template>

      <div v-else class="empty-receipt">
        <el-empty description="未找到退款申请记录" :image-size="80" />
      </div>

      <template #footer>
        <template v-if="currentRequest?.status === 'pending'">
          <div class="dialog-footer-actions">
            <el-button @click="handleReview(false)" :loading="refundSubmitting">
              拒绝退款
            </el-button>
            <el-button type="primary" @click="handleReview(true)" :loading="refundSubmitting" :icon="Check">
              同意退款
            </el-button>
          </div>
        </template>
        <template v-else>
          <el-button @click="refundDialogVisible = false">关闭</el-button>
        </template>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Refresh, Loading, Check } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import { DEFAULT_AVATAR } from '@/utils/constants'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

definePageMeta({ ssr: false })

const { formatPrice, formatDate } = useBizFormat()
const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()

const getStatusText = (status: string) => getOrderStatusLabel(status)
const getStatusType = (status: string) => getOrderStatusType(status)
const formatTime = (time: string) => formatDate(time)

// Format spec combination
function formatSpec(spec: any): string {
  if (!spec) return '-'
  if (typeof spec === 'string') return spec
  if (typeof spec === 'object') {
    return Object.entries(spec).map(([k, v]) => `${k}: ${v}`).join(' / ')
  }
  return '-'
}

// List state
const loading = ref(false)
const list = ref<any[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(20)
const statusFilter = ref('')

// Dialog state
const refundDialogVisible = ref(false)
const refundLoading = ref(false)
const refundSubmitting = ref(false)
const currentOrder = ref<any>(null)
const currentRequest = ref<any>(null)
const refundAmount = ref(0)
const adminNote = ref('')

async function loadList() {
  loading.value = true
  try {
    const client = getAdminSupabaseClient()
    
    let query = client
      .from('orders')
      .select(`
        *,
        _profile:profiles!orders_user_id_fkey(id, uid, avatar)
      `, { count: 'exact' })
    
    if (statusFilter.value) {
      query = query.eq('status', statusFilter.value)
    } else {
      query = query.in('status', ['refunding', 'refunded'])
    }
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range((page.value - 1) * pageSize.value, page.value * pageSize.value - 1)

    if (!error && data) {
      list.value = data
      total.value = count || 0
    }
  } catch (e) {
    console.error('加载订单失败:', e)
  }
  loading.value = false
}

watch([page, pageSize, statusFilter], () => loadList())

function handleCopy(text: string) {
  if (!text) return
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制')
}

// View refund request
async function handleViewRefund(order: any) {
  currentOrder.value = order
  refundDialogVisible.value = true
  currentRequest.value = null
  refundAmount.value = parseFloat(order.total_amount || 0)
  adminNote.value = ''
  
  refundLoading.value = true
  try {
    const client = getAdminSupabaseClient()
    const { data, error } = await client
      .from('refund_requests')
      .select('*')
      .eq('order_id', order.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (!error && data) {
      currentRequest.value = data
    }
  } catch (e: any) {
    console.error('获取退款申请失败:', e)
  } finally {
    refundLoading.value = false
  }
}

const getRequestStatusName = (status: string) => {
  const map: Record<string, string> = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return map[status] || status
}

const getRequestStatusType = (status: string) => {
  const map: Record<string, string> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return map[status] || 'info'
}

// Review action
async function handleReview(approved: boolean) {
  if (!currentRequest.value) return
  
  if (approved && refundAmount.value <= 0) {
    ElMessage.warning('请填写退款金额')
    return
  }
  
  const action = approved ? '同意退款' : '拒绝退款'
  try {
    await ElMessageBox.confirm(
      approved 
        ? `确定退款 ¥${refundAmount.value} 给用户？` 
        : '确定拒绝此退款申请？订单将恢复原状态。',
      action,
      { confirmButtonText: '确定', cancelButtonText: '取消' }
    )
  } catch {
    return
  }
  
  refundSubmitting.value = true
  
  try {
    const client = getAdminSupabaseClient()
    const { data, error } = await client.rpc('admin_review_refund', {
      p_request_id: currentRequest.value.id,
      p_approved: approved,
      p_refund_amount: approved ? refundAmount.value : null,
      p_admin_note: adminNote.value || null
    })
    
    if (error) throw error
    
    if (!data?.success) {
      ElMessage.error(data?.error || '操作失败')
      return
    }
    
    ElMessage.success(data?.message || '操作成功')
    refundDialogVisible.value = false
    loadList()
    
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    refundSubmitting.value = false
  }
}

onMounted(() => loadList())
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
.mb-4 { margin-bottom: 20px; }
.mt-4 { margin-top: 20px; }

.review-form {
  padding: 16px;
  background: var(--el-fill-color-light);
  border-radius: 8px;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.form-row:last-child { margin-bottom: 0; }

.form-row label {
  width: 90px;
  color: var(--el-text-color-regular);
  flex-shrink: 0;
}

.form-row .hint {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.dialog-footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
