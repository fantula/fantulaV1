<template>
  <div class="admin-page">
    <PageTipHeader title="常见问题" description="管理系统常见问题列表。" />

    <AdminActionCard>
      <el-button type="primary" :icon="Plus" @click="$router.push(adminRoute('help-center/faq/post'))">添加问题</el-button>
      <el-button :icon="Sort" @click="openSortDialog">调整排序</el-button>
    </AdminActionCard>

    <!-- Toolbar -->
    <AdminActionCard class="mt-4">
      <div class="toolbar-content">
        <el-form :inline="true" class="search-form">
          <el-form-item>
            <el-select v-model="filterCategory" placeholder="全部分类" clearable style="width: 150px" @change="fetchFaqs">
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

        <div class="batch-actions" v-if="selectedIds.length > 0">
           <span class="selection-info">已选 {{ selectedIds.length }} 项</span>
           <el-button type="danger" link @click="handleBatchDelete">批量删除</el-button>
           <el-divider direction="vertical" />
           <el-button link @click="clearSelection">取消选择</el-button>
        </div>
      </div>
    </AdminActionCard>

    <!-- Table -->
    <AdminDataTable
      ref="tableRef"
      :data="faqs"
      :loading="loading"
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      @update:current-page="fetchFaqs"
      @update:page-size="fetchFaqs"
      @selection-change="handleSelectionChange"
      class="mt-4"
    >
        <el-table-column type="selection" width="55" />
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
            <el-button type="primary" link size="small" @click="$router.push(`${adminRoute('help-center/faq/post')}?id=${row.id}`)">
              编辑
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
    </AdminDataTable>

    <!-- Sort Dialog -->
    <el-dialog
      v-model="sortDialogVisible"
      title="调整问题顺序"
      width="600px"
      append-to-body
    >
      <div class="sort-header mb-4">
         <div class="sort-tip text-gray-400 text-sm">
            提示：仅显示当前筛选分类下的问题。拖拽调整顺序。
         </div>
         <el-select v-model="sortFilterCategory" placeholder="选择分类" size="small" style="width: 150px" @change="fetchSortList">
             <el-option label="全部分类" value="" />
             <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
         </el-select>
      </div>
      
      <div class="sort-container" v-loading="loadingSortList">
         <el-empty v-if="sortList.length === 0" description="暂无数据" :image-size="60" />
         <draggable 
           v-else
           v-model="sortList" 
           item-key="id"
           animation="200"
           handle=".drag-handle"
           ghost-class="ghost-item"
         >
            <template #item="{ element, index }">
               <div class="sort-item">
                  <div class="drag-handle">
                    <el-icon><Sort /></el-icon>
                  </div>
                  <div class="sort-content">
                     <span class="sort-name text-truncate">{{ element.question }}</span>
                     <div class="sort-meta">
                        <el-tag v-if="element.category" size="small" type="info" effect="plain" class="mr-2">
                            {{ element.category.name }}
                        </el-tag>
                        <el-tag size="small" type="primary" effect="light">{{ index * 10 }}</el-tag>
                     </div>
                  </div>
               </div>
            </template>
         </draggable>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="sortDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSort" :loading="savingSort" :disabled="sortList.length === 0">保存排序</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Search, Goods, Sort } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import draggable from 'vuedraggable'
import { adminFaqApi } from '@/api/admin/help-center'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { confirmDelete } from '@/composables/admin/useAdminDialog'
import { adminRoute } from '@/config/admin-routes'

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

const selectedIds = ref<string[]>([])
const tableRef = ref()

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

const handleSelectionChange = (selection: AdminFaq[]) => {
  selectedIds.value = selection.map(item => item.id)
}

const clearSelection = () => {
  if (tableRef.value) {
    // AdminDataTable exposes el-table via ref? Usually requires inner ref access or exposing method
    // If AdminDataTable doesn't expose toggleRowSelection, we might need to rely on re-fetching or implementing expose
    // Fallback: just clear state, user manually deselects or we refresh
    selectedIds.value = []
    fetchFaqs() // Quick way to clear selection UI
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

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) return
  
  try {
      await ElMessageBox.confirm(
          `确定要删除选中的 ${selectedIds.value.length} 个问题吗？`,
          '批量删除',
          { type: 'warning', confirmButtonText: '确定删除', cancelButtonText: '取消' }
      )
      
      // Loop delete (backend missing batch delete)
      let successCount = 0
      for (const id of selectedIds.value) {
          const res = await adminFaqApi.deleteFaq(id)
          if (res.success) successCount++
      }
      
      ElMessage.success(`成功删除 ${successCount} 个问题`)
      clearSelection()
      await fetchFaqs()
      
  } catch (e) {
      // Cancelled
  }
}

const resetFilter = () => {
  keyword.value = ''
  filterCategory.value = ''
  fetchFaqs()
}

// --- Sorting Logic ---
const sortDialogVisible = ref(false)
const sortList = ref<AdminFaq[]>([])
const loadingSortList = ref(false)
const savingSort = ref(false)
const sortFilterCategory = ref('')

const openSortDialog = () => {
  sortFilterCategory.value = filterCategory.value // Default to current filter
  sortDialogVisible.value = true
  fetchSortList()
}

const fetchSortList = async () => {
  loadingSortList.value = true
  // Fetch ALL items for sorting (no pagination), or at least a large number
  // Ideally backend supports 'get all for sorting'
  // We reuse getFaqs with large page size
  const res = await adminFaqApi.getFaqs({
      page: 1,
      page_size: 100, // Limit 100 for drag sort performance
      category_id: sortFilterCategory.value || undefined
  })
  if (res.success) {
      sortList.value = res.faqs || []
  }
  loadingSortList.value = false
}

const saveSort = async () => {
  savingSort.value = true
  try {
    const updates = sortList.value.map((item, index) => {
      const newOrder = index * 10
      if (item.sort_order !== newOrder) {
          return adminFaqApi.updateFaq(item.id, { sort_order: newOrder })
      }
      return null
    }).filter(p => p !== null)

    if (updates.length > 0) {
      await Promise.all(updates)
      ElMessage.success(`已更新 ${updates.length} 个问题的顺序`)
    } else {
      ElMessage.info('顺序未发生变化')
    }
    sortDialogVisible.value = false
    fetchFaqs()
  } catch (e: any) {
    ElMessage.error('排序保存失败: ' + e.message)
  } finally {
    savingSort.value = false
  }
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
.toolbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.batch-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--el-color-danger-light-9);
    padding: 4px 12px;
    border-radius: 4px;
}
.selection-info {
    font-size: 13px;
    color: var(--el-color-danger);
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

/* Sort Dialog */
.sort-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sort-container {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  height: 400px;
  overflow-y: auto;
}
.sort-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: white;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.sort-item:last-child {
  border-bottom: none;
}
.drag-handle {
  cursor: move;
  color: var(--el-text-color-secondary);
  margin-right: 12px;
  display: flex;
  align-items: center;
}
.sort-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0; 
}
.sort-name {
  font-weight: 500;
  margin-right: 10px;
}
.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ghost-item {
  background: var(--el-color-primary-light-9);
  opacity: 0.5;
}
</style>
