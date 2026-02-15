<template>
  <div class="admin-page">
    <div class="page-header">
      <h2 class="page-title">文章分类管理</h2>
      <el-button type="primary" @click="openCreate">
        <el-icon class="mr-1"><Plus /></el-icon> 新增分类
      </el-button>
    </div>

    <div class="table-container" v-loading="loading">
      <el-table :data="categories" border style="width: 100%" row-key="id">
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
            <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Edit/Create Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑分类' : '新增分类'"
      width="500px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" placeholder="例如: 使用攻略" />
        </el-form-item>
        <el-form-item label="图标" required>
          <el-input v-model="form.icon" placeholder="Emoji 或 Element 图标名" style="width: 100px;">
            <template #append>
              <span v-if="form.icon">{{ form.icon }}</span>
            </template>
          </el-input>
          <span class="text-gray-400 text-xs ml-2">推荐使用 Emoji，如 📝</span>
        </el-form-item>
        <el-form-item label="颜色" required>
          <el-color-picker v-model="form.color" />
          <el-input v-model="form.color" style="width: 120px; margin-left: 10px;" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort_order" :min="0" :max="999" />
          <span class="text-gray-400 text-xs ml-2">数字越小越靠前</span>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.is_active" active-text="启用" inactive-text="禁用" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, onMounted } from 'vue'
import { adminCommunityApi, type Category } from '@/api/client/community'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)
const categories = ref<Category[]>([])
const dialogVisible = ref(false)
const submitting = ref(false)
const isEdit = ref(false)

const form = reactive({
  id: '',
  name: '',
  icon: '📝',
  color: '#409EFF',
  sort_order: 0,
  is_active: true
})

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

const openCreate = () => {
  isEdit.value = false
  form.id = ''
  form.name = ''
  form.icon = '📝'
  form.color = '#409EFF'
  form.sort_order = 10
  form.is_active = true
  dialogVisible.value = true
}

const openEdit = (row: Category) => {
  isEdit.value = true
  Object.assign(form, row)
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!form.name) {
    ElMessage.warning('请输入分类名称')
    return
  }

  submitting.value = true
  try {
    const payload = {
      name: form.name,
      icon: form.icon,
      color: form.color,
      sort_order: form.sort_order,
      is_active: form.is_active
    }

    if (isEdit.value) {
      const { error } = await adminCommunityApi.updateCategory(form.id, payload)
      if (error) throw error
      ElMessage.success('更新成功')
    } else {
      const { error } = await adminCommunityApi.createCategory(payload)
      if (error) throw error
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    fetchCategories()
  } catch (error: any) {
    ElMessage.error('操作失败: ' + error.message)
  } finally {
    submitting.value = false
  }
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
    ElMessage.error('更新状态失败: ' + error.message)
  }
}

const handleDelete = (row: Category) => {
  ElMessageBox.confirm('确定要删除这个分类吗？', '警告', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const { error } = await adminCommunityApi.deleteCategory(row.id)
      if (error) throw error
      ElMessage.success('删除成功')
      fetchCategories()
    } catch (error: any) {
      ElMessage.error('删除失败: ' + error.message)
    }
  })
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.admin-page {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
  min-height: calc(100vh - 100px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #EBEEF5;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
</style>
