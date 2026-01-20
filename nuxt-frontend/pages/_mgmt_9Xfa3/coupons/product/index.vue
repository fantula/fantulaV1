<template>
  <div class="coupon-product-list">
    <PageTipHeader 
      title="指定商品券" 
      description="管理特定商品专用的优惠券，用户购买指定商品时可享受优惠。"
    />

    <AdminActionCard>
      <template #actions>
        <el-button :icon="Refresh" @click="loadList">刷新</el-button>
        <el-button type="primary" :icon="Plus" @click="handleCreate">新增指定商品券</el-button>
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
      
      <el-table-column label="名称" min-width="180">
        <template #default="{ row }">
          <div class="code-info">
            <div class="code-name">{{ row.name }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="关联商品" min-width="200">
        <template #default="{ row }">
           <div v-if="row.sku_ids && row.sku_ids.length" class="product-tags">
             <el-tag v-for="sid in row.sku_ids.slice(0, 3)" :key="sid" size="small" effect="plain" class="product-tag">
               SKU: {{ sid.slice(0, 6) }}...
             </el-tag>
             <el-tag v-if="row.sku_ids.length > 3" size="small" type="info">+{{ row.sku_ids.length - 3 }}</el-tag>
           </div>
           <span v-else class="text-secondary">无关联商品</span>
        </template>
      </el-table-column>

      <el-table-column label="立减金额" width="120" align="right">
        <template #default="{ row }">
          <span class="amount">{{ formatPrice(row.value) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="有效期" width="200" align="center">
        <template #default="{ row }">
          <div v-if="!row.end_date" class="validity-tag">永久有效</div>
          <div v-else class="validity-range">
            <div>{{ formatDate(row.end_date) }} 到期</div>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi, type AdminCoupon } from '@/api/admin-supabase'
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
    const res = await adminApi.coupon.getCoupons({ type: 'product' })
    if (res.success) {
      list.value = (res.coupons as any[]).map(item => ({ ...item, statusLoading: false }))
      total.value = res.total || list.value.length
    }
  } catch (e) {
    ElMessage.error('加载异常')
  } finally {
    loading.value = false
  }
}

const handleCreate = () => {
  router.push('/_mgmt_9Xfa3/coupons/product/post')
}

const handleEdit = (row: AdminCoupon) => {
  router.push(`/_mgmt_9Xfa3/coupons/product/post?id=${row.id}`)
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
  ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券吗？`, '批量删除', {
    type: 'warning'
  }).then(async () => {
    let successCount = 0
    for (const id of selectedIds.value) {
        const res = await adminApi.coupon.deleteCoupon(id)
        if (res.success) successCount++
    }
    ElMessage.success(`成功删除 ${successCount} 个优惠券`)
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
}
.amount {
  color: var(--el-color-primary);
  font-weight: bold;
}
.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.product-tag {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-secondary {
  color: #909399;
  font-size: 12px;
}
.validity-range {
  font-size: 12px;
  color: var(--el-text-color-regular);
}
</style>
