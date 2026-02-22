<template>
  <div class="recharge-orders-page">

    <!-- 筛选操作栏 -->
    <AdminActionCard>
      <div class="filter-bar">
        <el-input
          v-model="keyword"
          placeholder="搜索订单号..."
          clearable
          style="width: 220px;"
          @clear="fetchData"
          @keyup.enter="fetchData"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <el-select v-model="statusFilter" style="width: 140px;" @change="fetchData">
          <el-option label="全部状态" value="all" />
          <el-option label="待支付" value="pending" />
          <el-option label="已支付" value="paid" />
          <el-option label="失败" value="failed" />
          <el-option label="已退款" value="refunded" />
        </el-select>

        <el-button :icon="Refresh" @click="fetchData">刷新</el-button>

        <div class="filter-summary" v-if="total > 0">
          共 <strong>{{ total }}</strong> 条充值记录
        </div>
      </div>
    </AdminActionCard>

    <!-- 数据表格 -->
    <AdminDataTable
      :data="orders"
      :loading="loading"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      class="mt-4"
      @page-change="handlePageChange"
    >
      <el-table-column label="订单号" min-width="200" show-overflow-tooltip>
        <template #default="{ row }">
          <span class="order-no">{{ row.out_trade_no }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户" min-width="180" show-overflow-tooltip>
        <template #default="{ row }">
          <span>{{ row.profiles?.email || row.user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="充值金额" width="120" align="right">
        <template #default="{ row }">
          <span class="amount-text">¥{{ Number(row.amount).toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="赠送" width="100" align="right">
        <template #default="{ row }">
          <span v-if="row.bonus > 0" class="bonus-text">+{{ row.bonus }} 点</span>
          <span v-else class="text-muted">-</span>
        </template>
      </el-table-column>

      <el-table-column label="支付方式" width="120" align="center">
        <template #default="{ row }">
          <el-tag size="small" :type="row.pay_type === 'wechat_native' ? 'success' : 'primary'" effect="plain">
            {{ formatPayType(row.pay_type) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)" effect="light">
            {{ statusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="充值时间" width="180">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>

      <el-table-column label="备注" min-width="150" show-overflow-tooltip>
        <template #default="{ row }">
          <span class="text-muted">{{ row.description || '-' }}</span>
        </template>
      </el-table-column>
    </AdminDataTable>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ['mgmt-auth'],
  title: '充值记录'
})

import { ref, onMounted } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminRechargeApi, type RechargeOrder } from '@/api/admin/recharge'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'

// --- State ---
const loading = ref(false)
const orders = ref<RechargeOrder[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const keyword = ref('')
const statusFilter = ref('all')

// --- Data ---
const fetchData = async () => {
  loading.value = true
  try {
    const res = await adminRechargeApi.getOrders({
      page: currentPage.value,
      pageSize: pageSize.value,
      status: statusFilter.value,
      keyword: keyword.value || undefined
    })
    if (res.success) {
      orders.value = res.data
      total.value = res.total
    } else {
      ElMessage.error(res.error || '加载失败')
    }
  } catch (e: any) {
    ElMessage.error('加载充值记录失败: ' + e.message)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchData()
}

// --- Formatters ---
const statusLabel = (status: string) => ({
  pending: '待支付',
  paid: '已支付',
  failed: '失败',
  refunded: '已退款'
}[status] || status)

const statusTagType = (status: string): '' | 'success' | 'warning' | 'info' | 'danger' => ({
  pending: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'info'
}[status] as any || '')

const formatPayType = (type: string) => ({
  wechat_native: '微信扫码',
  wechat_jsapi: '微信公众号',
  alipay: '支付宝'
}[type] || type || '-')

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}

onMounted(() => fetchData())
</script>

<style scoped>
.recharge-orders-page { padding: 0; }
.mt-4 { margin-top: 16px; }

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-summary {
  margin-left: auto;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.order-no {
  font-family: monospace;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.amount-text {
  font-weight: 600;
  color: var(--el-color-danger);
  font-size: 15px;
}

.bonus-text {
  color: var(--el-color-success);
  font-size: 13px;
}

.text-muted {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
</style>
