<template>
  <div class="coupon-balance-list">
    <PageTipHeader 
      title="额度券管理" 
      description="管理用于充值用户余额的额度券，用户兑换后直接增加账户余额。"
    />

    <!-- Action Bar -->
    <AdminActionCard>
      <template #actions>
        <el-button :icon="Refresh" @click="loadList">刷新</el-button>
        <el-button type="primary" :icon="Plus" @click="handleCreate">新增额度券</el-button>
      </template>
    </AdminActionCard>

    <BulkActionBar 
      v-if="selectedIds.length > 0"
      :count="selectedIds.length"
      @delete="handleBulkDelete"
    />

    <!-- Data Table -->
    <AdminDataTable
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      
      <el-table-column label="名称" min-width="200">
        <template #default="{ row }">
          <div class="code-info">
            <div class="code-name">{{ row.name }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="赠送余额" width="120" align="right">
        <template #default="{ row }">
          <span class="amount">{{ formatPrice(row.value) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="有效期" width="220" align="center">
        <template #default="{ row }">
          <div v-if="!row.end_date" class="validity-tag">永久有效</div>
          <div v-else class="validity-range">
            <div>{{ formatDate(row.start_date) }}</div>
            <div class="date-sep">至</div>
            <div>{{ formatDate(row.end_date) }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            inline-prompt
            active-text="启用"
            inactive-text="停用"
            :loading="row.statusLoading"
            @change="toggleStatus(row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="260" align="center" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="success" @click="handleGenerate(row)">发券</el-button>
          <el-button link type="warning" @click="handleEditCode(row)">说明</el-button>
          <el-button link type="info" @click="handleViewCodes(row)">详情</el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- Code Generator Modal -->
    <CouponCodeGenerator
      v-model="showGenerator"
      :coupon="currentCoupon"
    />
    
    <CouponCodeDrawer 
      v-model="viewCodesDialog.visible" 
      :coupon-id="viewCodesDialog.couponId" 
      :coupon-name="viewCodesDialog.couponName"
    />
    <!-- 说明编辑弹窗 -->
    <CouponCodeEditor
      v-model="codeEditorDialog.visible"
      :coupon="codeEditorDialog.coupon"
      @saved="loadList"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { type AdminCoupon } from '@/api/admin'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useAdminCouponList } from '@/composables/admin/useAdminCouponList'
import { adminRoute } from '@/config/admin-routes'

const { formatDate, formatPrice } = useBizFormat()
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
const router = useRouter()

// Generator Modal State
const showGenerator = ref(false)
const currentCoupon = ref<AdminCoupon | null>(null)

const viewCodesDialog = reactive({
  visible: false,
  couponId: '',
  couponName: ''
})

// 说明编辑弹窗状态
const codeEditorDialog = reactive<{ visible: boolean; coupon: any }>({ 
  visible: false, 
  coupon: null 
})

// Composable
const {
    loading,
    list,
    total,
    currentPage,
    pageSize,
    selectedIds,
    refresh: loadList, // Alias refresh to loadList for compatibility
    handleSelectionChange,
    handleToggleStatus: toggleStatus, // Alias
    handleBulkDelete
} = useAdminCouponList('balance')


const handleCreate = () => {
  router.push(adminRoute('coupons/balance/post'))
}

const handleEdit = (row: AdminCoupon) => {
  router.push(`${adminRoute('coupons/balance/post')}?id=${row.id}`)
}

const handleGenerate = (row: AdminCoupon) => {
  currentCoupon.value = row
  showGenerator.value = true
}

const handleViewCodes = (row: AdminCoupon) => {
    viewCodesDialog.couponId = row.id
    viewCodesDialog.couponName = row.name
    viewCodesDialog.visible = true
}

const handleEditCode = (row: AdminCoupon) => {
    codeEditorDialog.coupon = row
    codeEditorDialog.visible = true
}

// loadList called by composable autoLoad? No, default autoLoad is true.
// But we didn't specify autoLoad: true in composable default, but useAdminList defaults to false? 
// No, default autoLoad is optional in options, if undefined then ??
// Looking at useAdminList.ts: `if (options.autoLoad !== false) { onMounted(...) }`
// So it auto loads. We don't need manual onMounted loadList call unless we want to be explicit.
</script>

<style scoped>
.code-info {
  display: flex;
  flex-direction: column;
}
.code-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--el-text-color-primary);
}
.code-value {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-family: monospace;
}
.amount {
  color: var(--el-color-warning);
  font-weight: bold;
}
.validity-range {
  font-size: 12px;
  color: var(--el-text-color-regular);
}
.date-sep {
  color: var(--el-text-color-secondary);
  font-size: 10px;
  margin: 2px 0;
}
</style>
