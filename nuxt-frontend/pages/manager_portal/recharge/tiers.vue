<template>
  <div class="recharge-tiers-page">
    
    <!-- 操作栏 -->
    <AdminActionCard>
      <div class="action-container">
        <el-alert 
          title="提示：此处配置的充值档位将在客户端充值页面展示，排序值越小越靠前。" 
          type="info" 
          show-icon 
          :closable="false"
          style="margin-right: 20px; flex: 1;"
        />
        <el-button type="primary" :icon="Plus" @click="dialog.openAdd()">新增充值档位</el-button>
      </div>
    </AdminActionCard>

    <!-- 列表 -->
    <AdminDataTable
      :data="sortedTiers"
      :loading="loading"
      :show-pagination="false"
      class="mt-4"
    >
        <el-table-column prop="amount" label="充值金额 (元)" min-width="150" align="center">
           <template #default="{ row }">
             <span style="font-weight: bold; font-size: 16px;">{{ row.amount }}点</span>
           </template>
        </el-table-column>
        <el-table-column prop="bonus" label="赠送金额 (元)" min-width="150" align="center">
           <template #default="{ row }">
             <span v-if="row.bonus > 0" style="color: #67C23A;">+ {{ row.bonus }}点</span>
             <span v-else style="color: #909399;">-</span>
           </template>
        </el-table-column>
        <el-table-column label="排序值" width="150" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.sortOrder" :min="0" :max="999" size="small" controls-position="right" @change="handleSortChange" />
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-switch v-model="row.status" @change="handleStatusChange(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="dialog.openEdit(transformRow(row))">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>

    <!-- 添加/编辑弹窗 -->
    <AdminDataDialog
      v-model="dialog.visible.value"
      :title="dialog.isEdit.value ? '编辑充值档位' : '新增充值档位'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <el-form :model="dialog.form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="充值金额" prop="amount">
          <el-input-number v-model="dialog.form.amount" :min="1" :precision="2" :step="1" style="width: 100%;" placeholder="请输入充值金额" />
        </el-form-item>
        <el-form-item label="赠送金额" prop="bonus">
          <el-input-number v-model="dialog.form.bonus" :min="0" :precision="2" :step="1" style="width: 100%;" placeholder="请输入赠送金额" />
        </el-form-item>
        <el-form-item label="排序值" prop="sortOrder">
          <el-input-number v-model="dialog.form.sortOrder" :min="0" :max="999" controls-position="right" />
          <div class="form-tip">数值越小越靠前</div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="dialog.form.status" active-text="启用" inactive-text="停用" />
        </el-form-item>
      </el-form>
    </AdminDataDialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, computed, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { adminRechargeApi } from '@/api/admin'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'

interface TierItem {
  id: string
  amount: number
  bonus: number
  sortOrder: number
  status: boolean
  createTime: string
}

const loading = ref(false)
const tiers = ref<TierItem[]>([])

const sortedTiers = computed(() => {
  return [...tiers.value].sort((a, b) => a.sortOrder - b.sortOrder)
})

// Dialog Logic
const dialog = useAdminDialog({
  id: '',
  amount: 6,
  bonus: 0,
  sortOrder: 0,
  status: true
}, {
  onSubmit: async (form, isEdit) => {
    const payload = {
      amount: form.amount,
      bonus: form.bonus,
      sort_order: form.sortOrder,
      status: form.status ? 'on' as const : 'off' as const
    }
    
    if (isEdit) {
      return await adminRechargeApi.updateTier(form.id, payload)
    } else {
      return await adminRechargeApi.createTier(payload)
    }
  },
  onSuccess: async () => {
    await loadTiers()
  }
})

// Bind formRef to the dialog's reference
const formRef = dialog.formRef

const rules = reactive<FormRules>({
  amount: [
    { required: true, message: '请输入充值金额', trigger: 'blur' },
    { type: 'number', min: 0.01, message: '金额必须大于0', trigger: 'blur' }
  ],
  bonus: [
    { required: true, message: '请输入赠送金额', trigger: 'blur' }
  ]
})

// Helper to transform row data for editing
const transformRow = (row: TierItem) => {
  return {
    id: row.id,
    amount: row.amount,
    bonus: row.bonus,
    sortOrder: row.sortOrder,
    status: row.status
  }
}

// 加载数据
const loadTiers = async () => {
  loading.value = true
  try {
    const res = await adminRechargeApi.getTiers()
    if (res.success) {
      tiers.value = res.data.map((item: any) => ({
        id: item.id,
        amount: Number(item.amount),
        bonus: Number(item.bonus),
        sortOrder: item.sort_order,
        status: item.status === 'on',
        createTime: item.created_at
      }))
    } else {
      ElMessage.error(res.error || '加载失败')
    }
  } catch (e) {
    ElMessage.error('加载充值档位失败')
  } finally {
    loading.value = false
  }
}

// Actions
const handleSortChange = async () => {
  // 批量更新排序（简化实现：逐个更新）
  for (const tier of tiers.value) {
    await adminRechargeApi.updateTier(tier.id, { sort_order: tier.sortOrder })
  }
  ElMessage.success('排序已保存')
}

const handleStatusChange = async (row: TierItem) => {
  const res = await adminRechargeApi.updateTier(row.id, { 
    status: row.status ? 'on' : 'off' 
  })
  if (res.success) {
    ElMessage.success(row.status ? '已启用' : '已停用')
  } else {
    ElMessage.error(res.error || '状态更新失败')
    row.status = !row.status // 回滚
  }
}

const handleDelete = async (row: TierItem) => {
  await confirmDelete(
    `确认删除充值档位 "¥${row.amount}" 吗？`,
    async () => {
      const res = await adminRechargeApi.deleteTier(row.id)
      if (res.success) {
         await loadTiers()
      }
      return res
    }
  )
}

onMounted(() => {
    loadTiers()
    // Initialize default sort order for new items based on basic count
    dialog.form.sortOrder = 0 // Will generally be set by user or we could check tiers.length here but it's reactive
})
</script>

<style scoped>
.action-container {
  display: flex;
  align-items: center;
}

.form-tip {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-left: 10px;
}

.mt-4 {
    margin-top: 16px;
}
</style>
