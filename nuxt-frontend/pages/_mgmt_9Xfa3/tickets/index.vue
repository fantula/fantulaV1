<template>
  <div class="ticket-page">
    <div class="page-header">
      <h2>工单管理</h2>
    </div>

    <!-- 筛选 -->
    <el-card shadow="never" class="filter-card">
      <div class="filter-container">
        <div class="filter-left">
          <el-select v-model="filterParams.status" placeholder="工单状态" clearable style="width: 150px; margin-right: 15px;" @change="handleSearch">
            <el-option label="待处理" value="pending" />
            <el-option label="处理中" value="processing" />
            <el-option label="已解决" value="resolved" />
          </el-select>
          <el-input v-model="filterParams.uid" placeholder="用户UID" clearable style="width: 150px; margin-right: 15px;" @keyup.enter="handleSearch">
             <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-input v-model="filterParams.email" placeholder="用户邮箱" clearable style="width: 200px; margin-right: 15px;" @keyup.enter="handleSearch">
             <template #prefix>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
        </div>
      </div>
    </el-card>

    <!-- 列表 -->
    <el-card shadow="never" class="list-card">
      <el-table :data="ticketList" style="width: 100%" v-loading="loading" border>
        <el-table-column prop="ticketNo" label="工单编号" min-width="180" show-overflow-tooltip />
        <el-table-column prop="uid" label="用户UID" width="120" />
        <el-table-column prop="email" label="用户邮箱" min-width="180" show-overflow-tooltip />
        <el-table-column prop="title" label="问题标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="submitTime" label="提交时间" width="180" />
        <el-table-column label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">{{ getStatusName(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row)">
              {{ row.status === 'resolved' ? '查看' : '处理' }}
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
      :title="currentTicket?.status === 'resolved' ? '查看工单详情' : '处理工单'"
      width="700px"
      @close="resetDialog"
    >
      <div v-if="currentTicket" class="detail-container">
        
        <!-- 提示信息 -->
        <el-alert
          title="提示：工单沟通请通过邮件进行，后台仅用于查看内容与管理状态。"
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 20px;"
        />

        <!-- 工单基础信息 -->
         <div class="section-title">工单基础信息</div>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="工单编号">{{ currentTicket.ticketNo }}</el-descriptions-item>
          <el-descriptions-item label="当前状态">
             <el-tag :type="getStatusTag(currentTicket.status)">{{ getStatusName(currentTicket.status) }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="用户UID">{{ currentTicket.uid }}</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">{{ currentTicket.email }}</el-descriptions-item>
          <el-descriptions-item label="提交时间" :span="2">{{ currentTicket.submitTime }}</el-descriptions-item>
        </el-descriptions>

        <!-- 关联订单信息 -->
        <div class="section-title" style="margin-top: 20px;">关联订单信息</div>
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="订单号">{{ currentTicket.orderInfo.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="支付金额">¥{{ currentTicket.orderInfo.paidAmount }}</el-descriptions-item>
          <el-descriptions-item label="商品名称" :span="2">{{ currentTicket.orderInfo.productName }}</el-descriptions-item>
          <el-descriptions-item label="商品规格" :span="2">{{ currentTicket.orderInfo.productSpec }}</el-descriptions-item>
          <el-descriptions-item label="支付时间">{{ currentTicket.orderInfo.payTime }}</el-descriptions-item>
          <el-descriptions-item label="支付方式">{{ currentTicket.orderInfo.paymentMethod }}</el-descriptions-item>
        </el-descriptions>

        <!-- 工单内容 -->
        <div class="section-title" style="margin-top: 20px;">工单内容</div>
         <el-descriptions :column="1" border size="small">
          <el-descriptions-item label="问题标题">{{ currentTicket.title }}</el-descriptions-item>
          <el-descriptions-item label="问题描述">
            <div style="white-space: pre-wrap;">{{ currentTicket.description }}</div>
          </el-descriptions-item>
          <el-descriptions-item label="附件/图片" v-if="currentTicket.attachments && currentTicket.attachments.length > 0">
             <div class="attachment-list">
               <el-image 
                v-for="(url, index) in currentTicket.attachments" 
                :key="index"
                :src="url" 
                :preview-src-list="currentTicket.attachments"
                fit="cover"
                style="width: 100px; height: 100px; margin-right: 10px; border-radius: 4px;"
              />
             </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          
          <!-- State Transitions -->
          <template v-if="currentTicket?.status === 'pending'">
             <el-button type="primary" @click="updateStatus('processing')">标记为处理中</el-button>
          </template>

          <template v-if="currentTicket?.status === 'processing'">
             <el-button type="success" @click="updateStatus('resolved')">标记为已解决</el-button>
          </template>

        </span>
      </template>
    </el-dialog>

    <!-- 确认处理弹窗 (Nested) -->
    <el-dialog
      v-model="processDialogVisible"
      title="确认开始处理"
      width="400px"
      append-to-body
    >
      <span>确认开始处理该工单吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="processDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmProcess">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 确认解决弹窗 (Nested) -->
    <el-dialog
      v-model="resolveDialogVisible"
      title="确认已解决"
      width="400px"
      append-to-body
    >
      <span>确认问题已解决并关闭工单吗？此操作不可逆。</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resolveDialogVisible = false">取消</el-button>
          <el-button type="success" @click="confirmResolve">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh, Message } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

definePageMeta({
  title: '工单管理'
})

type TicketStatus = 'pending' | 'processing' | 'resolved'

interface OrderInfo {
  orderNo: string
  productName: string
  productSpec: string
  paidAmount: number
  payTime: string
  paymentMethod: string
}

interface TicketItem {
  id: string
  ticketNo: string
  uid: string
  email: string
  title: string
  description: string
  submitTime: string
  status: TicketStatus
  orderInfo: OrderInfo
  attachments?: string[]
}

const loading = ref(false)
const filterParams = reactive({
  status: '',
  uid: '',
  email: ''
})

const dialogVisible = ref(false)
const processDialogVisible = ref(false)
const resolveDialogVisible = ref(false)
const currentTicket = ref<TicketItem | null>(null)

// Mock Data
const ticketList = ref<TicketItem[]>([
  {
    id: '1',
    ticketNo: 'TKT20250520001',
    uid: '10086',
    email: 'user10086@example.com',
    title: '支付成功但会员未到账',
    description: '我刚刚支付了99元的年卡会员，微信显示扣款成功了，但是回到APP里还是显示普通用户，请尽快处理！',
    submitTime: '2025-05-20 15:30:00',
    status: 'pending',
    orderInfo: {
      orderNo: 'ORD202505201001',
      productName: '高级会员年卡',
      productSpec: '12个月',
      paidAmount: 99.00,
      payTime: '2025-05-20 15:25:00',
      paymentMethod: '微信支付'
    },
    attachments: [
      'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    ]
  },
  {
    id: '2',
    ticketNo: 'TKT20250519005',
    uid: '10010',
    email: 'vip_user@gmail.com',
    title: '如何申请退款？',
    description: '我买错了商品，想要申请退款，但是在订单页面没找到退款按钮，请问怎么操作？',
    submitTime: '2025-05-19 10:00:00',
    status: 'processing',
    orderInfo: {
      orderNo: 'ORD202505190888',
      productName: '限量版皮肤礼包',
      productSpec: '全套',
      paidAmount: 299.00,
      payTime: '2025-05-19 09:50:00',
      paymentMethod: '支付宝'
    }
  },
  {
    id: '3',
    ticketNo: 'TKT20250518022',
    uid: '9527',
    email: 'gamer9527@qq.com',
    title: '账号登录异常',
    description: '昨天还能正常登录，今天提示密码错误，我重置了也没用。',
    submitTime: '2025-05-18 09:30:00',
    status: 'resolved',
    orderInfo: {
      orderNo: 'ORD202505180666',
      productName: '游戏点券',
      productSpec: '500点',
      paidAmount: 50.00,
      payTime: '2025-05-18 09:00:00',
      paymentMethod: '余额支付'
    }
  }
])

const getStatusTag = (status: TicketStatus) => {
  const map: Record<TicketStatus, 'info' | 'success' | 'danger' | 'warning'> = {
    pending: 'danger',
    processing: 'warning',
    resolved: 'success'
  }
  return map[status] || 'info'
}

const getStatusName = (status: TicketStatus) => {
  const map: Record<TicketStatus, string> = {
    pending: '待处理',
    processing: '处理中',
    resolved: '已解决'
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
  filterParams.email = ''
  setTimeout(() => {
    loading.value = false
    ElMessage.success('已刷新')
  }, 500)
}

const handleDetail = (row: TicketItem) => {
  currentTicket.value = row
  dialogVisible.value = true
}

const resetDialog = () => {
  // Clear state
}

const updateStatus = (newStatus: TicketStatus) => {
  if (!currentTicket.value) return

  if (newStatus === 'processing') {
    processDialogVisible.value = true
  } else if (newStatus === 'resolved') {
    resolveDialogVisible.value = true
  }
}

const confirmProcess = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (currentTicket.value) {
        currentTicket.value.status = 'processing'
      }
      processDialogVisible.value = false
      dialogVisible.value = false
      ElMessage.success('已标记为处理中')
    }, 600)
}

const confirmResolve = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      if (currentTicket.value) {
        currentTicket.value.status = 'resolved'
      }
      resolveDialogVisible.value = false
      dialogVisible.value = false
      ElMessage.success('已标记为已解决')
    }, 600)
}

</script>

<style scoped>
.ticket-page {
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
  border-left: 4px solid var(--el-color-primary);
  padding-left: 8px;
}

.attachment-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
