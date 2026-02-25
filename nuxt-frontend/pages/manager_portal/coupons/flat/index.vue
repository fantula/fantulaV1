<template>
  <div class="coupon-flat-list">
    <PageTipHeader 
      title="立减券管理" 
      description="管理满减类型的优惠券，用户满足最低消费金额后可减免指定金额。"
    />

    <AdminActionCard>
      <template #actions>
        <el-button :icon="Refresh" @click="loadList">刷新</el-button>
        <el-button type="primary" :icon="Plus" @click="handleCreate">新增立减券</el-button>
      </template>
    </AdminActionCard>

    <BulkActionBar 
      v-if="selectedIds.length > 0"
      :count="selectedIds.length"
      @delete="handleBulkDelete"
    />

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

      <el-table-column label="优惠内容" width="180">
        <template #default="{ row }">
          <div class="benefit-tag">
            <span>满 {{ row.min_usage }} 减</span>
            <span class="benefit-value"> {{ formatPrice(row.value) }}</span>
          </div>
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
import CouponCodeGenerator from '@/components/admin/CouponCodeGenerator.vue'
import CouponCodeDrawer from '@/components/admin/coupon/CouponCodeDrawer.vue'
import CouponCodeEditor from '@/components/admin/coupon/CouponCodeEditor.vue'
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
    refresh: loadList, // Alias for compatibility
    handleSelectionChange,
    handleToggleStatus: toggleStatus, // Alias
    handleBulkDelete
} = useAdminCouponList('flat')

const handleCreate = () => {
  router.push(adminRoute('coupons/flat/post'))
}

const handleEdit = (row: AdminCoupon) => {
  router.push({
    path: adminRoute('coupons/flat/post'),
    query: { id: row.id }
  })
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
</script>

<style scoped>
.code-info {
  display: flex;
  flex-direction: column;
}
.code-name {
  font-weight: 600;
  font-size: 14px;
}
.code-value {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-family: monospace;
}
.benefit-tag {
  color: var(--el-color-danger);
  font-weight: 500;
  background: var(--el-color-danger-light-9);
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
}
.benefit-value {
  font-weight: bold;
  font-size: 15px;
  margin-left: 4px;
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
