<template>
  <div class="coupon-stats-page">
    <PageTipHeader 
      title="优惠券统计" 
      description="查看优惠券领取和使用记录，支持按兑换码或用户查询。"
    />

    <!-- Filter Bar -->
    <AdminActionCard>
      <div class="filter-group">
        <el-input 
          v-model="filters.code" 
          placeholder="搜索兑换码" 
          style="width: 200px" 
          clearable 
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        
        <el-input 
          v-model="filters.userUid" 
          placeholder="搜索用户UID (8位)" 
          style="width: 200px" 
          clearable 
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix><el-icon><User /></el-icon></template>
        </el-input>
        
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
      
      <template #actions>
        <el-button :icon="Refresh" @click="loadData">刷新</el-button>
      </template>
    </AdminActionCard>

    <!-- Bulk Actions -->
    <BulkActionBar 
      v-if="selectedIds.length > 0"
      :count="selectedIds.length"
      @delete="handleBatchDelete"
    />

    <!-- Data Table -->
    <AdminDataTable
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      
      <el-table-column prop="code" label="兑换码" min-width="180">
        <template #default="{ row }">
           <span class="code-text">{{ row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="coupon_name" label="优惠券名称" min-width="150" />
      
      <el-table-column label="所属用户" min-width="180">
         <template #default="{ row }">
           <div v-if="row.display_uid || row.user_uid" class="user-cell">
              <el-tag size="small" type="info">{{ row.display_uid || row.user_uid }}</el-tag>
              <div class="user-nickname" v-if="row.user_nickname">{{ row.user_nickname }}</div>
           </div>
           <span v-else class="text-gray">-</span>
         </template>
      </el-table-column>

      <el-table-column label="关联订单" min-width="180">
         <template #default="{ row }">
           <span v-if="row.order_no" class="order-no">{{ row.order_no }}</span>
           <span v-else-if="row.order_id" class="order-uuid">{{ row.order_id }}</span>
           <span v-else class="text-gray">-</span>
         </template>
      </el-table-column>
      
      <el-table-column prop="status" label="状态" width="100" align="center">
         <template #default="{ row }">
            <el-tag :type="getCouponStatusType(row.status)" size="small">
              {{ getCouponStatusLabel(row.status) }}
            </el-tag>
         </template>
      </el-table-column>

      <el-table-column label="领取时间" width="170" align="center">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>

      <el-table-column label="使用时间" width="170" align="center">
        <template #default="{ row }">
          {{ formatDate(row.used_at) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="{ row }">
          <el-button 
            v-if="['used', 'expired'].includes(row.status)"
            link type="danger" size="small" 
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- Pagination -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { onMounted } from 'vue'
import { Search, User, Refresh } from '@element-plus/icons-vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import BulkActionBar from '@/components/admin/base/BulkActionBar.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'

// Use composable
const {
  loading,
  dataList,
  selectedIds,
  pagination,
  filters,
  loadData,
  handleSearch,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
  handleDelete,
  handleBatchDelete,
  formatDate,
  getCouponStatusType,
  getCouponStatusLabel
} = useAdminCouponStats()

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.filter-group {
    display: flex;
    gap: 12px;
}
.code-text {
  font-family: monospace;
  font-weight: 600;
  color: var(--el-color-primary);
}
.user-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.user-nickname {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.order-no {
  font-family: monospace;
}
.order-uuid {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-family: monospace;
}
.text-gray {
  color: #ccc;
}
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
