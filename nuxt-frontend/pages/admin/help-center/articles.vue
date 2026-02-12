<template>
  <div class="admin-page">
    <PageTipHeader title="文章管理" description="发布和管理帮助中心的内容文章。" />

    <AdminActionCard>
      <el-button type="primary" :icon="Plus" @click="router.push('/admin/help-center/articles/post')">发布文章</el-button>
    </AdminActionCard>

    <AdminDataTable
      :data="articles"
      :loading="loading"
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @update:current-page="fetchArticles"
      @update:page-size="fetchArticles"
      class="mt-4"
    >
        <el-table-column prop="id" label="ID" width="180" show-overflow-tooltip />
        <el-table-column label="封面" width="100">
          <template #default="{ row }">
            <el-image 
              style="width: 60px; height: 40px; border-radius: 4px" 
              :src="row.cover_image" 
              :preview-src-list="[row.cover_image]"
              fit="cover"
              preview-teleported
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
        <el-table-column label="操作" width="200" fixed="right" align="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="success" @click="handleTogglePublish(row)">
              {{ row.is_published ? '下架' : '发布' }}
            </el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminArticleApi } from '@/api/admin/help-center'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { confirmDelete } from '@/composables/admin/useAdminDialog'
import { useBizFormat } from '@/composables/admin/useBizFormat'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

interface Category {
  id: string
  name: string
  color: string
}

const router = useRouter()
const loading = ref(false)
const articles = ref<any[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const categories = ref<Category[]>([])

const { formatDate } = useBizFormat()

const getCategoryLabel = (id: string) => {
  const cat = categories.value.find((c: Category) => c.id === id)
  return cat ? cat.name : (id || '未分类')
}

const getCategoryColor = (id: string) => {
  const cat = categories.value.find((c: Category) => c.id === id)
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
    ElMessage.error('获取列表失败: ' + (error.message || String(error)))
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
    ElMessage.error('操作失败: ' + (error.message || String(error)))
  }
}

const handleDelete = async (row: any) => {
  await confirmDelete(
      '确定要删除这篇文章吗？此类操作不可恢复',
      async () => {
         const { error } = await adminArticleApi.deleteArticle(row.id)
         if (error) throw new Error(error.message || String(error))
         await fetchArticles()
         return { success: true }
      }
  )
}

onMounted(async () => {
  await fetchCategories()
  await fetchArticles()
})
</script>

<style scoped>
.admin-page {
  padding: 0;
}
</style>
