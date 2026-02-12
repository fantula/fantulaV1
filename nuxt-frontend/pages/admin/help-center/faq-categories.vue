<template>
  <div class="admin-page">
    <PageTipHeader title="问题分类" description="管理常见问题（FAQ）的分类结构。" />

    <AdminActionCard>
      <el-button type="primary" :icon="Plus" @click="dialog.openAdd()">新增分类</el-button>
    </AdminActionCard>

    <AdminDataTable
      :data="categories"
      :loading="loading"
      :show-pagination="false"
      class="mt-4"
      row-key="id"
    >
        <el-table-column prop="sort_order" label="排序" width="100" align="center" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.is_active" type="success" size="small">启用</el-tag>
            <el-tag v-else type="info" size="small">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="结算页显示" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.is_checkout_visible" type="warning" size="small">显示</el-tag>
            <el-tag v-else type="info" size="small" effect="plain">隐藏</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="200">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="dialog.openEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>

    <!-- Dialog -->
    <AdminDataDialog
      v-model="dialog.visible.value"
      :title="dialog.isEdit.value ? '编辑分类' : '新增分类'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <el-form ref="formRef" :model="dialog.form" label-width="110px">
        <el-form-item label="分类名称" required>
          <el-input v-model="dialog.form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="dialog.form.sort_order" :min="0" />
        </el-form-item>
        <el-form-item label="启用状态" v-if="dialog.isEdit.value">
          <el-switch v-model="dialog.form.is_active" />
        </el-form-item>
        <el-form-item label="结算页显示">
          <el-switch v-model="dialog.form.is_checkout_visible" />
          <div class="form-tip text-gray-400 text-xs mt-1">开启后，该分类下的问题将显示在结算界面。</div>
        </el-form-item>
      </el-form>
    </AdminDataDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminFaqApi } from '@/api/admin/help-center'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'
import { useBizFormat } from '@/composables/admin/useBizFormat'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

interface AdminFaqCategory {
  id: string
  name: string
  sort_order: number
  is_active: boolean
  is_checkout_visible: boolean
  created_at: string
}

const loading = ref(false)
const categories = ref<AdminFaqCategory[]>([])
const { formatDate } = useBizFormat()

const fetchCategories = async () => {
  loading.value = true
  const res = await adminFaqApi.getCategories()
  if (res.success) {
    categories.value = res.categories || []
  }
  loading.value = false
}

// Dialog Logic
const dialog = useAdminDialog({
  id: '',
  name: '',
  sort_order: 0,
  is_active: true,
  is_checkout_visible: false
}, {
  onSubmit: async (form, isEdit) => {
    if (!form.name) {
       ElMessage.warning('请输入分类名称')
       return { success: false }
    }
  
    let res
    if (isEdit) {
      res = await adminFaqApi.updateCategory(form.id, {
        name: form.name,
        sort_order: form.sort_order,
        is_active: form.is_active,
        is_checkout_visible: form.is_checkout_visible
      })
    } else {
      res = await adminFaqApi.createCategory({
        name: form.name,
        sort_order: form.sort_order,
        is_checkout_visible: form.is_checkout_visible
      })
    }

    if (res.error) {
        return { success: false, error: (res.error as any).message || String(res.error) }
    }
    return { success: true }
  },
  onSuccess: async () => {
     await fetchCategories()
     ElMessage.success(dialog.isEdit.value ? '更新成功' : '创建成功')
  }
})

// Bind formRef to the dialog's reference
const formRef = dialog.formRef

const handleDelete = async (row: AdminFaqCategory) => {
  await confirmDelete(
      '确定要删除此分类吗？',
      async () => {
          const res = await adminFaqApi.deleteCategory(row.id)
          if (res.error) {
              throw new Error((res.error as any).message || String(res.error))
          }
          await fetchCategories()
          return { success: true }
      }
  )
}

onMounted(fetchCategories)
</script>

<style scoped>
.admin-page {
  padding: 0;
}
</style>
