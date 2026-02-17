<template>
  <div class="page-container">
    <PageTipHeader title="退款管理" description="统一管理所有退款申请，包括待审核、已批准、已拒绝和用户取消的记录" />

    <AdminActionCard>
      <template #actions>
        <div class="filter-group">
          <el-select v-model="statusFilter" placeholder="状态筛选" style="width: 120px;" clearable>
            <el-option label="全部" value="" />
            <el-option label="待审核" value="pending" />
            <el-option label="已退款" value="approved" />
            <el-option label="已拒绝" value="rejected" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
          <el-input 
            v-model="searchOrderNo" 
            placeholder="订单号" 
            style="width: 180px;" 
            clearable 
            @keyup.enter="handleSearch"
          />
          <el-input 
            v-model="searchUid" 
            placeholder="用户UID" 
            style="width: 150px;" 
            clearable 
            @keyup.enter="handleSearch"
          />
          <el-button type="primary" @click="handleSearch" :icon="Search">查询</el-button>
          <el-button @click="handleReset" :icon="Refresh">重置</el-button>
        </div>
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
      <el-table-column label="订单号" min-width="180">
        <template #default="{ row }">
          <span class="mono-text" @click="handleCopy(row.orders?.order_no)">{{ row.orders?.order_no || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 用户 -->
      <el-table-column label="用户" min-width="140">
        <template #default="{ row }">
          <AdminUserCell :user="row.profiles" :uid="row.user_id" />
        </template>
      </el-table-column>

      <!-- 商品 (从关联订单获取) -->
      <el-table-column label="商品" min-width="200" show-overflow-tooltip>
        <template #default="{ row }">
          <span>{{ row.orders?.product_snapshot?.product_name || '未知商品' }}</span>
        </template>
      </el-table-column>

      <!-- 退款原因 -->
      <el-table-column prop="reason" label="退款原因" min-width="150" show-overflow-tooltip />

      <!-- 申请金额 (订单总额) -->
      <el-table-column label="订单金额" width="100">
        <template #default="{ row }">
          <span class="amount">{{ formatPrice(row.orders?.total_amount) }}</span>
        </template>
      </el-table-column>

      <!-- 申请时间 -->
      <el-table-column label="申请时间" width="150">
        <template #default="{ row }">
          {{ formatTime(row.created_at) }}
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getRequestStatusType(row.status)">{{ getRequestStatusName(row.status) }}</el-tag>
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
            {{ row.status === 'pending' ? '审核' : '查看' }}
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- 退款审核/详情弹窗 -->
    <el-dialog v-model="refundDialogVisible" title="退款申请详情" width="600px" destroy-on-close>
      <div v-if="!currentRequest" class="loading-state">
        <el-icon class="is-loading"><Loading /></el-icon> 正在加载...
      </div>
      
      <div v-else>
        <!-- 状态提示 -->
        <el-alert v-if="currentRequest.status === 'pending'" title="该申请等待审核" type="warning" show-icon :closable="false" class="mb-4" />
        <el-alert v-if="currentRequest.status === 'approved'" title="已完成退款" type="success" show-icon :closable="false" class="mb-4" />
        <el-alert v-if="currentRequest.status === 'rejected'" title="已拒绝退款" type="danger" show-icon :closable="false" class="mb-4" />
        <el-alert v-if="currentRequest.status === 'cancelled'" title="用户已取消申请" type="info" show-icon :closable="false" class="mb-4" />
        
        <!-- 订单信息 -->
        <el-descriptions title="订单信息" :column="2" border class="mb-4">
          <el-descriptions-item label="订单号">{{ currentRequest.orders?.order_no }}</el-descriptions-item>
          <el-descriptions-item label="订单金额">
            <span class="amount">{{ formatPrice(currentRequest.orders?.total_amount) }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="商品">{{ currentRequest.orders?.product_snapshot?.product_name }}</el-descriptions-item>
        </el-descriptions>

        <!-- 申请信息 -->
        <el-descriptions title="申请内容" :column="1" border>
          <el-descriptions-item label="退款原因">{{ currentRequest.reason }}</el-descriptions-item>
          <el-descriptions-item label="补充说明" v-if="currentRequest.reason_detail">
            {{ currentRequest.reason_detail }}
          </el-descriptions-item>
          <el-descriptions-item label="申请时间">{{ formatTime(currentRequest.created_at) }}</el-descriptions-item>
        </el-descriptions>

        <!-- 审核结果 (非 Pending) -->
        <template v-if="currentRequest.status !== 'pending' && currentRequest.status !== 'cancelled'">
          <el-descriptions title="审核记录" :column="1" border class="mt-4">
            <el-descriptions-item label="退款金额" v-if="currentRequest.refund_amount">
              <span class="amount">{{ formatPrice(currentRequest.refund_amount) }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="管理员备注" v-if="currentRequest.admin_note">
              {{ currentRequest.admin_note }}
            </el-descriptions-item>
            <el-descriptions-item label="处理时间">{{ formatTime(currentRequest.reviewed_at) }}</el-descriptions-item>
          </el-descriptions>
        </template>
        
        <!-- 审核表单 (仅 Pending) -->
        <template v-if="currentRequest.status === 'pending'">
          <div class="review-form mt-4">
            <div class="form-row">
              <label>退款金额：</label>
              <el-input-number 
                v-model="refundAmount" 
                :min="0" 
                :max="parseFloat(currentRequest.orders?.total_amount || 0)"
                :precision="2"
                controls-position="right"
                style="width: 150px;"
              />
              <span class="hint">（订单金额: {{ formatPrice(currentRequest.orders?.total_amount) }}）</span>
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
      </div>

      <template #footer>
        <div v-if="currentRequest?.status === 'pending'" class="dialog-footer-actions">
          <el-button @click="handleReview(false)" :loading="submitting">拒绝退款</el-button>
          <el-button type="primary" @click="handleReview(true)" :loading="submitting" :icon="Check">同意退款</el-button>
        </div>
        <div v-else>
          <el-button @click="refundDialogVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh, Loading, Check } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminUserCell from '@/components/admin/base/AdminUserCell.vue'
import { useAdminList } from '@/composables/admin/useAdminList'
import { getSupabaseClient } from '@/utils/supabase' // FIX: use regular client, not admin
import { useBizFormat } from '@/composables/common/useBizFormat'

definePageMeta({ layout: 'mgmt', middleware: ["mgmt-auth"], ssr: false })

const { formatPrice, formatDate } = useBizFormat()
const formatTime = formatDate
const client = getSupabaseClient()

// Status helpers
const getRequestStatusName = (status: string) => {
  const map: Record<string, string> = {
    pending: '待审核',
    approved: '已批准',
    rejected: '已拒绝',
    cancelled: '用户取消'
  }
  return map[status] || status
}

const getRequestStatusType = (status: string) => {
  const map: Record<string, string> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    cancelled: 'info'
  }
  return map[status] || 'info'
}

// Local Filter State
const statusFilter = ref('')
const searchOrderNo = ref('')
const searchUid = ref('')

// List Logic
const {
  loading,
  list,
  total,
  page,
  pageSize,
  loadList,
  handleCopy
} = useAdminList<any, any>({
  fetchFn: async ({ page, pageSize }) => {
    let query = client
      .from('refund_requests')
      .select(`
        *,
        orders!inner(*),
        profiles!refund_requests_user_id_fkey(*)
      `, { count: 'exact' })
    
    // 1. Status Filter
    if (statusFilter.value) {
      query = query.eq('status', statusFilter.value)
    }

    // 2. Order No Filter (via inner joined orders table)
    if (searchOrderNo.value) {
      query = query.eq('orders.order_no', searchOrderNo.value)
    }

    // 3. UID Filter (via inner joined profiles table)
    if (searchUid.value) {
      query = query.eq('profiles.uid', searchUid.value)
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)

    return { success: !error, data, total: count, error: error?.message }
  },
  defaultFilters: {},
  defaultPageSize: 20
})

// Search Actions
const handleSearch = () => {
  page.value = 1
  loadList()
}

const handleReset = () => {
  statusFilter.value = ''
  searchOrderNo.value = ''
  searchUid.value = ''
  page.value = 1
  loadList()
}

// Review Logic
const refundDialogVisible = ref(false)
const currentRequest = ref<any>(null)
const refundAmount = ref(0)
const adminNote = ref('')
const submitting = ref(false)

function handleViewRefund(row: any) {
  currentRequest.value = row
  refundDialogVisible.value = true
  // Init form
  refundAmount.value = parseFloat(row.orders?.total_amount || 0)
  adminNote.value = ''
}

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
        ? `确定退款 ${formatPrice(refundAmount.value)} 给用户？` 
        : '确定拒绝此退款申请？订单将恢复原状态。',
      action,
      { confirmButtonText: '确定', cancelButtonText: '取消', type: approved ? 'warning' : 'info' }
    )
  } catch { return }

  submitting.value = true
  try {
    const { data, error } = await client.rpc('admin_review_refund', {
      p_request_id: currentRequest.value.id,
      p_approved: approved,
      p_refund_amount: approved ? refundAmount.value : null,
      p_admin_note: adminNote.value || null
    })

    if (error) throw error
    if (data && !data.success) throw new Error(data.error)

    ElMessage.success('操作成功')
    refundDialogVisible.value = false
    loadList()
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page-container { display: flex; flex-direction: column; gap: 16px; }
.mono-text { font-family: 'Monaco', 'Consolas', monospace; font-size: 12px; color: #94a3b8; cursor: pointer; }
.mono-text:hover { color: #60a5fa; }
.amount { font-weight: 600; color: #22c55e; }

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
.form-row label {
  width: 90px;
  color: var(--el-text-color-regular);
}
.dialog-footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.filter-group {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
