<template>
  <div class="admin-page">
    <PageTipHeader title="常见问题" description="管理系统常见问题列表。" />

    <AdminActionCard>
      <el-button type="primary" :icon="Plus" @click="$router.push('/admin/help-center/faq/post')">添加问题</el-button>
    </AdminActionCard>

    <!-- Toolbar -->
    <AdminActionCard class="mt-4">
      <el-form :inline="true" class="search-form">
        <el-form-item>
          <el-select v-model="filterCategory" placeholder="全部分类" clearable style="width: 150px">
            <el-option
              v-for="cat in categories"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input 
            v-model="keyword" 
            placeholder="搜索问题关键词..." 
            prefix-icon="Search"
            clearable
            @keyup.enter="fetchFaqs"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchFaqs">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </AdminActionCard>

    <!-- Table -->
    <AdminDataTable
      :data="faqs"
      :loading="loading"
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @update:current-page="fetchFaqs"
      @update:page-size="fetchFaqs"
      class="mt-4"
    >
        <el-table-column prop="sort_order" label="排序" width="80" align="center" />
        
        <el-table-column label="问题" min-width="250">
          <template #default="{ row }">
            <span class="question-text">{{ row.question }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分类" width="150">
          <template #default="{ row }">
            <el-tag v-if="row.category" type="info" effect="plain">{{ row.category.name }}</el-tag>
            <span v-else class="text-gray-400">未分类</span>
          </template>
        </el-table-column>

        <el-table-column label="关联商品" width="200">
          <template #default="{ row }">
            <div v-if="row.product" class="bound-product">
              <el-icon><Goods /></el-icon>
              <span>{{ row.product.product_name }}</span>
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.is_active" type="success" size="small">启用</el-tag>
            <el-tag v-else type="danger" size="small">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="$router.push(`/admin/help-center/faq/post?id=${row.id}`)">
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Search, Goods } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminFaqApi } from '@/api/admin/help-center'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { confirmDelete } from '@/composables/admin/useAdminDialog'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

interface AdminFaqCategory {
  id: string
  name: string
}

interface AdminFaq {
  id: string
  question: string
  sort_order: number
  category?: AdminFaqCategory
  product?: { product_name: string }
  is_active: boolean
}

const loading = ref(false)
const faqs = ref<AdminFaq[]>([])
const categories = ref<AdminFaqCategory[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)

const keyword = ref('')
const filterCategory = ref('')

const fetchCategories = async () => {
  const res = await adminFaqApi.getCategories()
  if (res.success) categories.value = res.categories || []
}

const fetchFaqs = async () => {
  loading.value = true
  try {
    const res = await adminFaqApi.getFaqs({
      page: currentPage.value,
      page_size: pageSize.value,
      keyword: keyword.value,
      category_id: filterCategory.value || undefined
    })
    if (res.success) {
      faqs.value = res.faqs || []
      total.value = res.total || 0
    } else {
      ElMessage.error(res.error || '获取列表失败')
    }
  } finally {
    loading.value = false
  }
}

const handleDelete = async (row: AdminFaq) => {
  await confirmDelete(
      '确定要删除这个问题吗？',
      async () => {
         const res = await adminFaqApi.deleteFaq(row.id)
         if (res.error) throw new Error((res.error as any).message || String(res.error))
         await fetchFaqs()
         return { success: true }
      }
  )
}

const resetFilter = () => {
  keyword.value = ''
  filterCategory.value = ''
  fetchFaqs()
}

onMounted(() => {
  fetchCategories()
  fetchFaqs()
})
</script>

<style scoped>
.admin-page {
  padding: 0;
}
.search-form {
  margin-bottom: 0;
}
.question-text {
  font-weight: 500;
  color: var(--el-text-color-primary);
}
.bound-product {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--el-color-primary);
  font-size: 13px;
}
</style>
