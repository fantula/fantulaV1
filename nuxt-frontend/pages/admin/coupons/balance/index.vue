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
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi, type AdminCoupon } from '@/api/admin'
import { useBizFormat } from '@/composables/common/useBizFormat'

const { formatDate, formatPrice } = useBizFormat()
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import BulkActionBar from '@/components/admin/base/BulkActionBar.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import CouponCodeDrawer from '@/components/admin/coupon/CouponCodeDrawer.vue'
import CouponCodeGenerator from '@/components/admin/CouponCodeGenerator.vue'
import CouponCodeEditor from '@/components/admin/coupon/CouponCodeEditor.vue'

const router = useRouter()
const loading = ref(false)
const list = ref<AdminCoupon[]>([])
const total = ref(0)
const selectedIds = ref<string[]>([])

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

const loadList = async () => {
  loading.value = true
  try {
    const res = await adminApi.coupon.getCoupons({ type: 'balance' })
    if (res.success) {
      list.value = (res.coupons as any[]).map(item => ({ ...item, statusLoading: false })) 
      total.value = res.total || list.value.length
    } else {
      ElMessage.error(res.error || '加载失败')
    }
  } catch (e) {
    ElMessage.error('加载异常')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  router.push('/admin/coupons/balance/post')
}

const handleEdit = (row: AdminCoupon) => {
  router.push(`/admin/coupons/balance/post?id=${row.id}`)
}

const handleGenerate = (row: AdminCoupon) => {
  currentCoupon.value = row
  showGenerator.value = true
}

// Old submitGenerate removed

const handleViewCodes = (row: AdminCoupon) => {
    viewCodesDialog.couponId = row.id
    viewCodesDialog.couponName = row.name
    viewCodesDialog.visible = true
}

const handleEditCode = (row: AdminCoupon) => {
    codeEditorDialog.coupon = row
    codeEditorDialog.visible = true
}

const handleSelectionChange = (selection: AdminCoupon[]) => {
  selectedIds.value = selection.map(item => item.id)
}

const handleBulkDelete = () => {
  if (!selectedIds.value.length) return
  ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券规则吗？`, '批量删除', {
    type: 'warning'
  }).then(async () => {
    let successCount = 0
    for (const id of selectedIds.value) {
        const res = await adminApi.coupon.deleteCoupon(id)
        if (res.success) successCount++
    }
    ElMessage.success(`成功删除 ${successCount} 个优惠券规则`)
    loadList()
    selectedIds.value = []
  })
}

const toggleStatus = async (row: any) => {
  row.statusLoading = true
  try {
    const res = await adminApi.coupon.toggleStatus(row.id, row.status)
    if (res.success) {
      ElMessage.success(`已${row.status ? '启用' : '停用'}`)
    } else {
      row.status = !row.status
      ElMessage.error(res.error || '操作失败')
    }
  } catch (e) {
    row.status = !row.status
    ElMessage.error('操作异常')
  } finally {
    row.statusLoading = false
  }
}

// formatDate and formatPrice are now from useBizFormat

onMounted(() => {
  loadList()
})
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
