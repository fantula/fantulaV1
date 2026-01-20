<template>
  <div class="product-list-page">
    <!-- Category Sub-Nav (Pills) -->
    <CategoryPills 
      v-model="filters.category_id"
      :items="categories"
      label-key="name"
      value-key="id"
      count-key="product_count"
      :total-count="total"
      @update:model-value="selectCategory"
    />
    
    <!-- Action Bar -->
    <AdminActionCard>
       <template #default>
         <el-select v-model="filters.status" placeholder="状态: 全部" clearable style="width: 120px" @change="handleFilterChange">
            <el-option label="上架" value="on" />
            <el-option label="下架" value="off" />
         </el-select>
         
         <el-input 
            v-model="filters.keyword" 
            placeholder="搜索商品名称 (回车)" 
            clearable 
            style="width: 200px" 
            :prefix-icon="Search"
            @keyup.enter="handleFilterChange" 
            @clear="handleFilterChange"
         />
       </template>
       
       <template #actions>
          <el-button @click="loadList" :icon="Refresh">刷新</el-button>
          <el-button type="primary" @click="handleAddProduct" :icon="Plus">添加商品</el-button>
       </template>
    </AdminActionCard>

    <!-- Data Table -->
    <AdminDataTable 
        :data="list" 
        :loading="loading" 
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        @update:current-page="loadList"
        @update:page-size="loadList"
        @selection-change="handleSelectionChange"
    >
        <template #toolbar v-if="selectedIds.length > 0">
           <BulkActionBar :count="selectedIds.length" @delete="handleBulkDelete" />
        </template>

        <el-table-column type="selection" width="50" align="center" />
        
        <el-table-column label="商品信息" min-width="250">
           <template #default="{ row }">
              <div class="product-cell">
                 <el-image :src="row.image" class="thumb" fit="cover">
                    <template #error><div class="no-img">无图</div></template>
                 </el-image>
                 <div class="info">
                    <div class="name" :title="row.product_name">{{ row.product_name }}</div>
                    <div class="id">ID: {{ row.id.slice(0,8) }}...</div>
                 </div>
              </div>
           </template>
        </el-table-column>

        <el-table-column label="角标" width="100" align="center">
           <template #default="{ row }">
              <el-tag v-if="row.badge_label" type="warning" effect="plain" size="small">{{ row.badge_label }}</el-tag>
              <span v-else class="text-secondary">-</span>
           </template>
        </el-table-column>

        <el-table-column label="排序" width="80" align="center" prop="sort_order" sortable />

        <el-table-column label="包含规格" min-width="200">
           <template #default="{ row }">
               <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  <el-tag type="info" effect="dark" size="small" style="margin-right: 4px;">{{ row.sku_count || 0 }}个</el-tag>
                  <el-tag 
                    v-for="(spec, idx) in row.sku_details" 
                    :key="idx" 
                    size="small" 
                    type="info" 
                    effect="plain"
                  >
                    {{ spec }}
                  </el-tag>
               </div>
           </template>
        </el-table-column>

        <el-table-column label="状态" width="100" align="center">
           <template #default="{ row }">
              <el-switch 
                 v-model="row.status" 
                 active-value="on" 
                 inactive-value="off" 
                 :loading="row.statusLoading"
                 @change="handleStatusChange(row)"
                 inline-prompt
                 active-text="上架"
                 inactive-text="下架"
              />
           </template>
        </el-table-column>
        
        <el-table-column label="创建时间" width="160" align="center">
           <template #default="{ row }">
              {{ new Date(row.created_at).toLocaleString('zh-CN', { fontSize: '12px' }) }}
           </template>
        </el-table-column>

        <el-table-column label="操作" width="220" fixed="right" align="center">
           <template #default="{ row }">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="success" @click="handleDuplicate(row)">同款</el-button>
              <el-button link type="warning" @click="handleManageConfigs(row)">规格</el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
           </template>
        </el-table-column>

    </AdminDataTable>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import CategoryPills from '@/components/admin/base/CategoryPills.vue'
import BulkActionBar from '@/components/admin/base/BulkActionBar.vue'
import { useAdminProductList } from '@/composables/admin/useAdminProductList'

definePageMeta({
  title: '商品管理'
})

const router = useRouter()
const {
    loading,
    list,
    total,
    currentPage,
    pageSize,
    categories,
    filters,
    selectedIds,

    loadList,
    selectCategory,
    handleFilterChange,
    handleStatusChange,
    handleDelete,
    handleBulkDelete,
    handleSelectionChange
} = useAdminProductList()

// Navigation Logics (still kept in component as they relate to routing)
const handleAddProduct = () => router.push('/_mgmt_9Xfa3/products/post')
const handleEdit = (r: any) => router.push(`/_mgmt_9Xfa3/products/post?id=${r.id}`)
const handleManageConfigs = (r: any) => router.push(`/_mgmt_9Xfa3/products/sku/${r.id}`)
const handleDuplicate = (r: any) => router.push(`/_mgmt_9Xfa3/products/post?copy_from_id=${r.id}`)

</script>

<style scoped>
.product-list-page {
    /* Padding handled by parent. */
}

/* Product Cell */
.product-cell { display: flex; align-items: center; gap: 12px; }
.thumb { width: 44px; height: 44px; border-radius: 6px; border: 1px solid #eee; flex-shrink: 0; }
.no-img { width: 100%; height: 100%; background: #f5f7fa; color: #ccc; display: flex; align-items: center; justify-content: center; font-size: 10px; }
.info { display: flex; flex-direction: column; overflow: hidden; }
.name { font-weight: 500; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.id { font-size: 11px; color: #999; }
</style>
