<template>
  <div class="refund-page">
    <div class="page-header">
      <h2>退款管理</h2>
    </div>

    <!-- 筛选 -->
    <el-card shadow="never" class="filter-card">
      <div class="filter-container">
        <div class="filter-left">
          <el-select v-model="filterParams.status" placeholder="退款状态" clearable style="width: 150px; margin-right: 15px;" @change="handleSearch">
            <el-option label="待处理" value="pending" />
            <el-option label="已驳回" value="rejected" />
            <el-option label="已退款" value="refunded" />
          </el-select>
          <el-input v-model="filterParams.uid" placeholder="用户UID" clearable style="width: 200px; margin-right: 15px;" @keyup.enter="handleSearch">
             <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
        </div>
      </div>
    </el-card>

    <!-- 列表 -->
    <el-card shadow="never" class="list-card">
      <el-table :data="refundList" style="width: 100%" v-loading="loading" border>
        <el-table-column prop="refundNo" label="退款编号" min-width="180" show-overflow-tooltip />
        <el-table-column prop="orderNo" label="关联订单号" min-width="180" show-overflow-tooltip />
        <el-table-column prop="uid" label="用户UID" width="120" />
        <el-table-column label="退款金额" width="120">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" width="180" />
        <el-table-column label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">{{ getStatusName(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row)">
              {{ row.status === 'pending' ? '处理' : '查看' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

       <!-- 分页 -->
      <div class="pagination-wrapper" style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
        />
      </div>
    </el-card>

    <!-- 处理/查看弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentRow?.status === 'pending' ? '处理退款申请' : '查看退款详情'"
      width="700px"
      @close="resetDialog"
    >
      <div v-if="currentRow" class="detail-container">
        <!-- 订单信息 -->
        <div class="section-title">订单信息</div>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="订单号">{{ currentRow.orderInfo.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="实付金额">¥{{ currentRow.orderInfo.paidAmount }}</el-descriptions-item>
          <el-descriptions-item label="商品名称" :span="2">{{ currentRow.orderInfo.productName }}</el-descriptions-item>
          <el-descriptions-item label="商品规格" :span="2">{{ currentRow.orderInfo.productSpec }}</el-descriptions-item>
          <el-descriptions-item label="支付时间">{{ currentRow.orderInfo.payTime }}</el-descriptions-item>
          <el-descriptions-item label="支付方式">{{ currentRow.orderInfo.paymentMethod }}</el-descriptions-item>
          <el-descriptions-item label="过期时间" :span="2">{{ currentRow.orderInfo.expiryTime }}</el-descriptions-item>
        </el-descriptions>

        <!-- 退款信息 -->
        <div class="section-title" style="margin-top: 20px;">退款申请信息</div>
         <el-descriptions :column="1" border size="small">
          <el-descriptions-item label="退款理由">{{ currentRow.reason }}</el-descriptions-item>
          <el-descriptions-item label="当前状态">
             <el-tag :type="getStatusTag(currentRow.status)">{{ getStatusName(currentRow.status) }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="驳回原因" v-if="currentRow.status === 'rejected' && currentRow.rejectReason">
             <span style="color: #F56C6C;">{{ currentRow.rejectReason }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <template v-if="currentRow?.status === 'pending'">
             <el-button type="danger" @click="handleReject">驳回退款</el-button>
             <el-button type="primary" @click="handleAgree">同意退款</el-button>
          </template>
        </span>
      </template>
    </el-dialog>

    <!-- 驳回退款弹窗 (Nested) -->
    <el-dialog
      v-model="rejectDialogVisible"
      title="驳回退款"
      width="400px"
      append-to-body
    >
      <el-form :model="rejectForm" label-width="80px">
        <el-form-item label="驳回原因">
          <el-input 
            v-model="rejectForm.reason" 
            type="textarea" 
            :rows="3" 
            placeholder="请输入驳回原因" 
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rejectDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmReject">确认驳回</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 同意退款确认弹窗 (Nested) -->
    <el-dialog
      v-model="agreeDialogVisible"
      title="确认同意退款"
      width="400px"
      append-to-body
    >
      <span>确认同意该退款申请吗？操作后资金将退回用户钱包。</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="agreeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAgree">确认同意</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"],
  title: '退款管理'
})

type RefundStatus = 'pending' | 'rejected' | 'refunded'

interface OrderInfo {
  orderNo: string
  productName: string
  productSpec: string
  paidAmount: number
  payTime: string
  expiryTime: string
  paymentMethod: string
}

interface RefundItem {
  id: string
  refundNo: string
  orderNo: string
  uid: string
  amount: number
  applyTime: string
  status: RefundStatus
  reason: string
  rejectReason?: string
  orderInfo: OrderInfo
}

const loading = ref(false)
const filterParams = reactive({
  status: '',
  uid: ''
})

const dialogVisible = ref(false)
const rejectDialogVisible = ref(false)
const agreeDialogVisible = ref(false)
const rejectForm = reactive({
  reason: ''
})
const currentRow = ref<RefundItem | null>(null)

// Mock Data
const refundList = ref<RefundItem[]>([
  {
    id: '1',
    refundNo: 'REF202505200001',
    orderNo: 'ORD202505201001',
    uid: '10086',
    amount: 99.00,
    applyTime: '2025-05-20 14:30:00',
    status: 'pending',
    reason: '买错了，不需要了',
    orderInfo: {
      orderNo: 'ORD202505201001',
      productName: '高级会员年卡',
      productSpec: '12个月',
      paidAmount: 99.00,
      payTime: '2025-05-20 10:00:00',
      expiryTime: '2026-05-20 10:00:00',
      paymentMethod: '微信支付'
    }
  },
  {
    id: '2',
    refundNo: 'REF202505190005',
    orderNo: 'ORD202505190888',
    uid: '10010',
    amount: 299.00,
    applyTime: '2025-05-19 16:00:00',
    status: 'refunded',
    reason: '商品描述不符',
    orderInfo: {
      orderNo: 'ORD202505190888',
      productName: '限量版皮肤礼包',
      productSpec: '全套',
      paidAmount: 299.00,
      payTime: '2025-05-19 12:00:00',
      expiryTime: '永久',
      paymentMethod: '支付宝'
    }
  },
  {
    id: '3',
    refundNo: 'REF202505180022',
    orderNo: 'ORD202505180666',
    uid: '9527',
    amount: 50.00,
    applyTime: '2025-05-18 09:30:00',
    status: 'rejected',
    reason: '不想玩了',
    rejectReason: '虚拟商品一经发出概不退换',
    orderInfo: {
      orderNo: 'ORD202505180666',
      productName: '游戏点券',
      productSpec: '500点',
      paidAmount: 50.00,
      payTime: '2025-05-18 09:00:00',
      expiryTime: '永久',
      paymentMethod: '余额支付'
    }
  }
])

const getStatusTag = (status: RefundStatus) => {
  const map: Record<RefundStatus, 'info' | 'success' | 'danger' | 'warning'> = {
    pending: 'warning',
    refunded: 'success',
    rejected: 'danger'
  }
  return map[status] || 'info'
}

const getStatusName = (status: RefundStatus) => {
  const map: Record<RefundStatus, string> = {
    pending: '待处理',
    refunded: '已退款',
    rejected: '已驳回'
  }
  return map[status] || status
}

const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('查询成功 (Mock)')
  }, 500)
}

const handleRefresh = () => {
  loading.value = true
  filterParams.status = ''
  filterParams.uid = ''
  setTimeout(() => {
    loading.value = false
    ElMessage.success('已刷新')
  }, 500)
}

const handleDetail = (row: RefundItem) => {
  currentRow.value = row
  dialogVisible.value = true
}

const resetDialog = () => {
  // Clear any temp state if needed
}

const handleAgree = () => {
  if (!currentRow.value) return
  agreeDialogVisible.value = true
}

const confirmAgree = () => {
    // Mock processing
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (currentRow.value) {
        currentRow.value.status = 'refunded'
      }
      agreeDialogVisible.value = false
      dialogVisible.value = false
      ElMessage.success('操作成功，已同意退款')
    }, 800)
}

const handleReject = () => {
   rejectForm.reason = ''
   rejectDialogVisible.value = true
}

const confirmReject = () => {
  if (!rejectForm.reason) {
     ElMessage.warning('驳回原因不能为空')
     return
  }
   // Mock processing
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (currentRow.value) {
        currentRow.value.status = 'rejected'
        currentRow.value.rejectReason = rejectForm.reason
      }
      rejectDialogVisible.value = false
      dialogVisible.value = false
      ElMessage.warning('已驳回该退款申请')
    }, 800)
}

</script>

<style scoped>
.refund-page {
  padding: 0;
}
.page-header {
  margin-bottom: 24px;
}
.page-header h2 {
  margin: 0;
  font-size: 28px;
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.filter-card {
  margin-bottom: 24px;
}
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter-left {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 12px;
  border-left: 4px solid #409EFF;
  padding-left: 8px;
}
</style>
