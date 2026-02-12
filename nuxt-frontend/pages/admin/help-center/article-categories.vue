<template>
  <div class="admin-page">
    <PageTipHeader title="文章分类" description="管理帮助中心文章的分类结构。" />
    
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
        <el-table-column prop="sort_order" label="排序" width="80" align="center" />
        <el-table-column prop="icon" label="图标" width="80" align="center">
          <template #default="{ row }">
            <span style="font-size: 20px;">{{ row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="150">
          <template #default="{ row }">
            <span :style="{ color: row.color, fontWeight: 'bold' }">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色代码" width="120">
          <template #default="{ row }">
            <div class="flex items-center">
              <div :style="{ background: row.color, width: '16px', height: '16px', borderRadius: '4px', marginRight: '8px', border: '1px solid #ddd' }"></div>
              <span>{{ row.color }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click="dialog.openEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>

    <!-- Edit/Create Dialog -->
    <AdminDataDialog
      v-model="dialog.visible.value"
      :title="dialog.isEdit.value ? '编辑分类' : '新增分类'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <el-form :model="dialog.form" label-width="80px">
        <el-form-item label="名称" required>
          <el-input v-model="dialog.form.name" placeholder="例如: 使用攻略" />
        </el-form-item>
        <el-form-item label="图标" required>
          <el-input v-model="dialog.form.icon" placeholder="Emoji 或 Element 图标名" style="width: 100px;">
            <template #append>
              <span v-if="dialog.form.icon">{{ dialog.form.icon }}</span>
            </template>
          </el-input>
          <span class="text-gray-400 text-xs ml-2">推荐使用 Emoji，如 📝</span>
        </el-form-item>
        <el-form-item label="颜色" required>
          <el-color-picker v-model="dialog.form.color" />
          <el-input v-model="dialog.form.color" style="width: 120px; margin-left: 10px;" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="dialog.form.sort_order" :min="0" :max="999" />
          <span class="text-gray-400 text-xs ml-2">数字越小越靠前</span>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="dialog.form.is_active" active-text="启用" inactive-text="禁用" />
        </el-form-item>
      </el-form>
    </AdminDataDialog>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { adminArticleApi } from '@/api/admin/help-center'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

interface Category {
  id: string
  name: string
  icon: string
  color: string
  sort_order: number
  is_active: boolean
}

const loading = ref(false)
const categories = ref<Category[]>([])

const fetchCategories = async () => {
  loading.value = true
  try {
    const { data, error } = await adminArticleApi.getCategories()
    if (error) throw error
    categories.value = data || []
  } catch (error: any) {
    ElMessage.error('获取分类失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// Dialog Logic
const dialog = useAdminDialog({
  id: '',
  name: '',
  icon: '📝',
  color: '#409EFF',
  sort_order: 10,
  is_active: true
}, {
  onSubmit: async (form, isEdit) => {
    if (!form.name) {
      ElMessage.warning('请输入分类名称')
      return { success: false }
    }

    const payload = {
      name: form.name,
      icon: form.icon,
      color: form.color,
      sort_order: form.sort_order,
      is_active: form.is_active
    }

    let res
    if (isEdit) {
      res = await adminArticleApi.updateCategory(form.id, payload)
    } else {
      res = await adminArticleApi.createCategory(payload)
    }
    
    // Adapt response to standard format if needed, or just return it if it matches { success, error }
    // Based on usage: { data, error } seems to be the return type from adminArticleApi
    // useAdminDialog expects { success: boolean, error?: string }
    if (res.error) {
        return { success: false, error: res.error.message || String(res.error) }
    }
    return { success: true }
  },
  onSuccess: async () => {
      await fetchCategories()
  }
})


const handleStatusChange = async (row: Category) => {
  try {
    const { error } = await adminArticleApi.updateCategory(row.id, { is_active: row.is_active })
    if (error) {
      row.is_active = !row.is_active // revert
      throw error
    }
    ElMessage.success(row.is_active ? '已启用' : '已禁用')
  } catch (error: any) {
    ElMessage.error('更新状态失败: ' + (error.message || String(error)))
  }
}

const handleDelete = async (row: Category) => {
  await confirmDelete(
      '确定要删除这个分类吗？',
      async () => {
         const res = await adminArticleApi.deleteCategory(row.id)
         if (res.error) {
             throw new Error(res.error.message || String(res.error))
         }
         await fetchCategories()
         return { success: true }
      }
  )
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.admin-page {
  padding: 0;
}
</style>
