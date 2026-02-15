<template>
  <div class="skus-page">
     <PageTipHeader title="此处显示所有 SKU 物理数据。删除 SKU 将自动解除它与所有商品和CDK的关联，请谨慎操作。" type="warning" />

     <!-- Action Bar -->
     <AdminActionCard>
        <template #default>
           <div class="filter-group">
              <el-radio-group v-model="filterMode" @change="handleFilterChange">
                 <el-radio-button label="all">全部</el-radio-button>
                 <el-radio-button label="unlinked">未连接</el-radio-button>
              </el-radio-group>
           </div>
        </template>
        
        <template #actions>
           <el-button @click="loadSkus" :icon="Refresh">刷新</el-button>
           <el-button 
             type="danger" 
             :icon="Delete" 
             :disabled="!selectedIds.length"
             @click="handleBulkDelete"
           >
             批量删除
           </el-button>
        </template>
     </AdminActionCard>

     <!-- Data Table -->
     <AdminDataTable 
        ref="adminTableRef"
        :data="skus" 
        :loading="loading"
        @selection-change="handleSelectionChange"
     >
        <el-table-column type="selection" width="55" />
        
        <el-table-column label="SKU 规格" width="280">
           <template #default="{ row }">
               <div class="sku-cell">
                   <el-image 
                     v-if="row.image" 
                     :src="row.image" 
                     class="sku-thumb" 
                     :preview-src-list="[row.image]" 
                     preview-teleported
                   />
                   <div class="sku-info">
                       <!-- Specs Tags Only -->
                       <div class="sku-specs">
                           <el-tag v-if="row.tag_name" size="small" type="info" effect="plain" style="margin-right:4px">{{ row.tag_name }}</el-tag>
                           <el-tag 
                             v-for="(val, key) in (row.spec_combination || {})" 
                             :key="key"
                             size="small"
                             effect="plain"
                             style="margin-right:4px"
                           >
                             {{ key }}: {{ val }}
                           </el-tag>
                       </div>
                   </div>
               </div>
           </template>
        </el-table-column>

        <el-table-column label="类型" width="100" align="center">
            <template #default="{ row }">
                <el-tag :type="getProductTypeTag(row.product_type)">{{ getProductTypeLabel(row.product_type) }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="绑定商品" min-width="200">
            <template #default="{ row }">
               <div v-if="row.is_linked" class="linked-products">
                   <el-tag type="success" effect="plain" size="small">已绑定 {{ row.linked_count }} 个商品</el-tag>
               </div>
               <div v-else>
                   <el-tag type="danger" effect="plain" size="small">未绑定</el-tag>
               </div>
            </template>
        </el-table-column>

        <el-table-column label="库存" width="100" align="center">
            <template #default="{ row }">
                <span>{{ row.stock_count !== undefined ? row.stock_count : '-' }}</span>
            </template>
        </el-table-column>

        <el-table-column label="创建时间" width="180" align="center">
            <template #default="{ row }">
                <span class="time-text">{{ formatDate(row.created_at) }}</span>
            </template>
        </el-table-column>
        
        <el-table-column label="操作" width="100" align="center" fixed="right">
            <template #default="{ row }">
                <el-button 
                   type="danger" 
                   link 
                   size="small" 
                   @click="handleDelete(row)"
                >删除</el-button>
            </template>
        </el-table-column>

     </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { Refresh, Delete } from '@element-plus/icons-vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import { useAdminGlobalSkuList } from '@/composables/admin/useAdminGlobalSkuList'

const {
    loading,
    skus,
    filterMode,
    selectedIds,
    loadSkus,
    handleFilterChange,
    handleDelete,
    handleBulkDelete,
    handleSelectionChange,
    formatDate,
    getProductTypeLabel,
    getProductTypeTag
} = useAdminGlobalSkuList()

</script>

<style scoped>
.skus-page { height: 100%; display: flex; flex-direction: column; }
.sku-cell { display: flex; align-items: center; gap: 10px; }
.sku-thumb { width: 40px; height: 40px; border-radius: 4px; border: 1px solid #eee; background: #f5f7fa; }
.sku-info { display: flex; flex-direction: column; gap: 2px; }
.sku-id { font-size: 11px; color: #999; font-family: monospace; }
.sku-specs { display: flex; flex-wrap: wrap; gap: 4px; }
.linked-products { display: flex; flex-direction: column; gap: 4px; }
.product-names { font-size: 13px; font-weight: 500; }
.orphan-text { font-size: 12px; color: #f56c6c; margin-left: 5px; }
.time-text { font-size: 12px; color: #666; }
</style>
