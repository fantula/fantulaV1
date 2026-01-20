<template>
  <div class="page-container">
    <PageTipHeader 
      title="预订单统计" 
      description="查看已转换、已过期、已删除的预订单记录，支持批量清理"
    />

    <AdminActionCard>
      <template #actions>
        <el-select v-model="statusFilter" placeholder="状态筛选" clearable style="width: 140px; margin-right: 12px;">
          <el-option label="已转换" value="converted" />
          <el-option label="已过期" value="expired" />
          <el-option label="已删除" value="deleted" />
        </el-select>
        <el-button :icon="Refresh" @click="loadList">刷新</el-button>
      </template>
    </AdminActionCard>

    <BulkActionBar 
      v-if="selectedIds.length > 0"
      :count="selectedIds.length"
      @delete="handleBulkDelete"
      delete-text="批量删除"
    />

    <AdminDataTable
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column label="订单号" min-width="150">
        <template #default="{ row }">
          <span class="mono-text" @click="handleCopy(row.order_no)">{{ row.order_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" min-width="140">
        <template #default="{ row }">
          <div class="user-cell">
            <el-avatar :size="24" :src="row._profile?.avatar || DEFAULT_AVATAR" />
            <span class="user-email">{{ row._profile?.nickname || row._profile?.uid || '未知用户' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品" min-width="180">
        <template #default="{ row }">
          <div class="product-cell">
             <!-- 注意：API返回的是 product_snapshot 对象 -->
            <img v-if="row.product_snapshot?.image" :src="row.product_snapshot.image" class="product-thumb" />
            <span>{{ row.product_snapshot?.product_name || '未知商品' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="100">
        <template #default="{ row }">
          <span class="amount">¥{{ row.total_amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="quantity" width="80" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="170">
        <template #default="{ row }">
          {{ formatTime(row.created_at) }}
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- 统计卡片 -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-value">{{ stats.converted }}</div>
        <div class="stat-label">已转换</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.expired }}</div>
        <div class="stat-label">已过期</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.deleted }}</div>
        <div class="stat-label">已删除</div>
      </div>
      <div class="stat-card total">
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-label">总计</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import BulkActionBar from '@/components/admin/base/BulkActionBar.vue'
import { useAdminPreOrderList } from '@/composables/admin/useAdminPreOrderList'

definePageMeta({ ssr: false })

const {
  loading,
  list,
  stats,
  statusFilter,
  selectedIds,
  DEFAULT_AVATAR,
  loadList,
  handleBulkDelete,
  handleSelectionChange,
  handleCopy,
  getStatusText,
  getStatusType,
  formatTime
} = useAdminPreOrderList()

onMounted(() => {
  loadList()
})
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mono-text {
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
}
.mono-text:hover { color: #60a5fa; }

.user-cell { display: flex; align-items: center; gap: 8px; }
.user-email { font-size: 13px; color: #cbd5e1; }

.product-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-thumb {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
  background: #1e293b;
}

.amount {
  font-weight: 600;
  color: #22c55e;
}

.stats-row {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.stat-card {
  flex: 1;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
}

.stat-card.total {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}
</style>
