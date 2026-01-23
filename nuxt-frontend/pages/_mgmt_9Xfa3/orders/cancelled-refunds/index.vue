<template>
  <div class="refund-stats-page">
    <div class="page-header">
      <h2>退款统计</h2>
      <p class="sub-desc">已取消的退款申请记录</p>
    </div>

    <!-- 筛选 -->
    <el-card shadow="never" class="filter-card">
      <div class="filter-container">
        <div class="filter-left">
          <el-input v-model="filterParams.orderNo" placeholder="订单号" clearable style="width: 200px; margin-right: 15px;" @keyup.enter="handleSearch">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-input v-model="filterParams.uid" placeholder="用户UID" clearable style="width: 150px; margin-right: 15px;" @keyup.enter="handleSearch">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleRefresh">刷新</el-button>
        </div>
        <div class="filter-right">
          <el-statistic title="总取消次数">
            <template #default>
              <span class="stat-number">{{ totalCount }}</span>
            </template>
          </el-statistic>
        </div>
      </div>
    </el-card>

    <!-- 列表 -->
    <el-card shadow="never" class="list-card">
      <el-table :data="cancelledList" style="width: 100%" v-loading="loading" border>
        <el-table-column prop="order_no" label="订单号" min-width="180" show-overflow-tooltip />
        <el-table-column label="用户" width="150">
          <template #default="{ row }">
            <span>{{ row.user_nickname || row.user_id?.slice(0, 8) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="退款原因" min-width="150" show-overflow-tooltip />
        <el-table-column prop="reason_detail" label="补充说明" min-width="150" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.reason_detail || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="取消时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.reviewed_at) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default>
            <el-tag type="info">已取消</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper" style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getSupabaseClient } from '@/utils/supabase'

definePageMeta({
  title: '退款统计'
})

interface CancelledRefund {
  id: string
  order_id: string
  order_no: string
  user_id: string
  user_nickname?: string
  reason: string
  reason_detail?: string
  created_at: string
  reviewed_at: string
}

const loading = ref(false)
const cancelledList = ref<CancelledRefund[]>([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)

const filterParams = reactive({
  orderNo: '',
  uid: ''
})

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const client = getSupabaseClient()
    
    // 构建查询 - 使用明确的外键关系
    let query = client
      .from('refund_requests')
      .select(`
        id,
        order_id,
        user_id,
        reason,
        reason_detail,
        created_at,
        reviewed_at,
        orders!inner(order_no),
        profiles!refund_requests_user_id_fkey(nickname)
      `, { count: 'exact' })
      .eq('status', 'cancelled')
      .order('reviewed_at', { ascending: false })
      .range((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('加载失败:', error)
      ElMessage.error('加载失败: ' + error.message)
      return
    }

    // 处理数据格式
    cancelledList.value = (data || []).map((item: any) => ({
      id: item.id,
      order_id: item.order_id,
      order_no: item.orders?.order_no || '-',
      user_id: item.user_id,
      user_nickname: item.profiles?.nickname,
      reason: item.reason,
      reason_detail: item.reason_detail,
      created_at: item.created_at,
      reviewed_at: item.reviewed_at
    }))

    totalCount.value = count || 0
  } catch (e: any) {
    ElMessage.error('系统错误: ' + e.message)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadData()
}

const handleRefresh = () => {
  filterParams.orderNo = ''
  filterParams.uid = ''
  currentPage.value = 1
  loadData()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadData()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.refund-stats-page {
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
.page-header .sub-desc {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--el-text-color-secondary);
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
.filter-right {
  text-align: right;
}
.stat-number {
  font-size: 24px;
  font-weight: 600;
  color: #909399;
}
</style>
