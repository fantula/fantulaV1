<template>
  <div class="faq-category-page">
    <div class="page-actions">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon> 新增分类
      </el-button>
    </div>

    <div class="content-card" v-loading="loading">
      <el-table :data="categories" style="width: 100%">
        <el-table-column prop="sort_order" label="排序" width="100" align="center" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.is_active" type="success" size="small">启用</el-tag>
            <el-tag v-else type="info" size="small">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="200">
          <template #default="{ row }">
            {{ new Date(row.created_at).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除此分类吗？" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button type="danger" link size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑分类' : '新增分类'"
      width="500px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort_order" :min="0" />
        </el-form-item>
        <el-form-item label="启用状态" v-if="isEdit">
          <el-switch v-model="form.is_active" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm" :loading="submitting">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminFaqApi, type AdminFaqCategory } from '@/api/admin/help-center'

const loading = ref(false)
const categories = ref<AdminFaqCategory[]>([])
const dialogVisible = ref(false)
const submitting = ref(false)
const isEdit = ref(false)
const currentId = ref('')

const form = ref({
  name: '',
  sort_order: 0,
  is_active: true
})

const fetchCategories = async () => {
  loading.value = true
  const res = await adminFaqApi.getCategories()
  if (res.success) {
    categories.value = res.categories
  }
  loading.value = false
}

const handleAdd = () => {
  isEdit.value = false
  form.value = { name: '', sort_order: 0, is_active: true }
  dialogVisible.value = true
}

const handleEdit = (row: AdminFaqCategory) => {
  isEdit.value = true
  currentId.value = row.id
  form.value = {
    name: row.name,
    sort_order: row.sort_order,
    is_active: row.is_active
  }
  dialogVisible.value = true
}

const handleDelete = async (id: string) => {
  const res = await adminFaqApi.deleteCategory(id)
  if (res.success) {
    ElMessage.success('删除成功')
    fetchCategories()
  } else {
    ElMessage.error(res.error || '删除失败')
  }
}

const submitForm = async () => {
  if (!form.value.name) return ElMessage.warning('请输入分类名称')
  
  submitting.value = true
  try {
    if (isEdit.value) {
      const res = await adminFaqApi.updateCategory(currentId.value, form.value)
      if (res.success) {
        ElMessage.success('更新成功')
        dialogVisible.value = false
        fetchCategories()
      } else {
        ElMessage.error(res.error || '更新失败')
      }
    } else {
      const res = await adminFaqApi.createCategory({
        name: form.value.name,
        sort_order: form.value.sort_order
      })
      if (res.success) {
        ElMessage.success('创建成功')
        dialogVisible.value = false
        fetchCategories()
      } else {
        ElMessage.error(res.error || '创建失败')
      }
    }
  } finally {
    submitting.value = false
  }
}

onMounted(fetchCategories)
</script>

<style scoped>
.faq-category-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-actions {
  margin-bottom: 24px;
}

.content-card {
  background: var(--el-bg-color);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
</style>
