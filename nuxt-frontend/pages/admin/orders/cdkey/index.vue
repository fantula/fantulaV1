<template>
  <div class="page-container">
    <PageTipHeader title="激活码订单" description="显示所有一次性激活码类型的订单" />

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
          <el-tag :type="getStatusType(row.status)" size="small">{{ getStatusText(row.status) }}</el-tag>
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
    </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useAdminOrderList } from '@/composables/admin/useAdminOrderList'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], ssr: false })

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
} = useAdminOrderList('one_time_cdk') // Use 'one_time_cdk' type

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
</style>
