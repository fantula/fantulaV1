<template>
  <div class="admin-page">
    <div class="page-actions">
      <el-button type="primary" @click="router.push('/admin/help-center/articles/post')">
        <el-icon class="mr-1"><Plus /></el-icon> 发布文章
      </el-button>
    </div>

    <div class="filter-section">
      <!-- 可以在这里添加筛选功能 -->
    </div>

    <div class="table-container" v-loading="loading">
      <el-table :data="articles" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" show-overflow-tooltip />
        <el-table-column label="封面" width="100">
          <template #default="{ row }">
            <el-image 
              style="width: 60px; height: 40px; border-radius: 4px" 
              :src="row.cover_image" 
              :preview-src-list="[row.cover_image]"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="140">
          <template #default="{ row }">
            <el-tag :style="{ borderColor: getCategoryColor(row.category), color: getCategoryColor(row.category), backgroundColor: 'transparent' }" effect="plain">
              {{ getCategoryLabel(row.category) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="阅读量" width="100" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.is_published ? 'success' : 'info'">
              {{ row.is_published ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="success" @click="handleTogglePublish(row)">
              {{ row.is_published ? '下架' : '发布' }}
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="fetchArticles"
          @current-change="fetchArticles"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminArticleApi, type Category } from '@/api/admin/help-center'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const loading = ref(false)
const articles = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const categories = ref<Category[]>([])

const formatDate = (date: string) => {
  return new Date(date).toLocaleString()
}

const getCategoryLabel = (id: string) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : (id || '未分类')
}

const getCategoryColor = (id: string) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.color : 'var(--el-text-color-secondary)'
}

const fetchCategories = async () => {
  try {
    const { data } = await adminArticleApi.getCategories()
    categories.value = data || []
  } catch (error) {
    console.error('Failed to fetch categories', error)
  }
}

const fetchArticles = async () => {
  loading.value = true
  try {
    const { data, total: count, error } = await adminArticleApi.getArticles(currentPage.value, pageSize.value)
    if (error) throw error
    articles.value = data || []
    total.value = count || 0
  } catch (error: any) {
    ElMessage.error('获取列表失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const handleEdit = (row: any) => {
  router.push({
    path: '/admin/help-center/articles/post',
    query: { id: row.id }
  })
}

const handleTogglePublish = async (row: any) => {
  const newState = !row.is_published
  try {
    const { error } = await adminArticleApi.updateArticle(row.id, { is_published: newState })
    if (error) throw error
    row.is_published = newState
    ElMessage.success(newState ? '已发布' : '已下架')
  } catch (error: any) {
    ElMessage.error('操作失败: ' + error.message)
  }
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定要删除这篇文章吗？此类操作不可恢复', '警告', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const { error } = await adminArticleApi.deleteArticle(row.id)
      if (error) throw error
      ElMessage.success('删除成功')
      fetchArticles()
    } catch (error: any) {
      ElMessage.error('删除失败: ' + error.message)
    }
  })
}

onMounted(async () => {
  await fetchCategories()
  await fetchArticles()
})
</script>

<style scoped>
.admin-page {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
  min-height: calc(100vh - 100px);
}

.page-actions {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
