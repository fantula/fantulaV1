<template>
  <div class="faq-list-page">
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">常见问题管理</h2>
        <span class="page-desc">管理帮助中心的常见问题及解答</span>
      </div>
      <div class="header-right">
        <el-button @click="$router.push('/_mgmt_9Xfa3/faq/category')">分类管理</el-button>
        <el-button type="primary" @click="$router.push('/_mgmt_9Xfa3/faq/post')">
          <el-icon><Plus /></el-icon> 添加问题
        </el-button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar-card">
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
    </div>

    <!-- Table -->
    <div class="table-card" v-loading="loading">
      <el-table :data="faqs" style="width: 100%" stripe>
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
            <el-button type="primary" link size="small" @click="$router.push(`/_mgmt_9Xfa3/faq/post?id=${row.id}`)">
              编辑
            </el-button>
            <el-popconfirm title="确定要删除这个问题吗？" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button type="danger" link size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-row">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="fetchFaqs"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Search, Goods } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminFaqApi, type AdminFaq, type AdminFaqCategory } from '@/api/admin-supabase'

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
  if (res.success) categories.value = res.categories
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
      faqs.value = res.faqs
      total.value = res.total
    } else {
      ElMessage.error(res.error || '获取列表失败')
    }
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: string) => {
  const res = await adminFaqApi.deleteFaq(id)
  if (res.success) {
    ElMessage.success('删除成功')
    fetchFaqs()
  } else {
    ElMessage.error(res.error || '删除失败')
  }
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
.faq-list-page {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
/* ... existing styles ... */
.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--el-text-color-primary);
}
.page-desc {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-top: 4px;
  display: block;
}

.toolbar-card {
  background: var(--el-bg-color);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: var(--el-box-shadow-lighter);
}
.search-form {
  margin-bottom: 0;
}

.table-card {
  background: var(--el-bg-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-lighter);
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

.pagination-row {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
