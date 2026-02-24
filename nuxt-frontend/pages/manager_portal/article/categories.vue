<template>
  <div class="admin-page">
    <PageTipHeader title="文章分类管理" description="管理社区文章的分类结构。" />
    
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
    <AdminCategoryEditor
      v-model="dialog.visible.value"
      :is-edit="dialog.isEdit.value"
      :loading="dialog.loading.value"
      type="article"
      :initial-data="dialog.form"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { adminCommunityApi, type Category } from '@/api/client/community'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminCategoryEditor from '@/components/admin/base/AdminCategoryEditor.vue'
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const loading = ref(false)
const categories = ref<Category[]>([])

const fetchCategories = async () => {
  loading.value = true
  try {
    const { data, error } = await adminCommunityApi.getCategories()
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
      onSubmit: async (payload, isEdit) => {
    if (!payload.name) {
      ElMessage.warning('请输入分类名称')
      return { success: false }
    }

    let res
    if (isEdit) {
      res = await adminCommunityApi.updateCategory(dialog.form.id, payload)
    } else {
      res = await adminCommunityApi.createCategory(payload)
    }

    if (res.success) {
        return { success: false, error: res.error.message || String(res.error) }
    }
    return { success: true }
  },
  onSuccess: async () => {
      await fetchCategories()
  }
})

const handleConfirm = async (payload: any) => {
  if (dialog.isEdit.value) {
    dialog.form = { ...dialog.form, ...payload }
  } else {
    dialog.form = { ...payload }
  }
  await dialog.submit()
}

const handleStatusChange = async (row: Category) => {
  try {
    const { error } = await adminCommunityApi.updateCategory(row.id, { is_active: row.is_active })
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
         const res = await adminCommunityApi.deleteCategory(row.id)
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
