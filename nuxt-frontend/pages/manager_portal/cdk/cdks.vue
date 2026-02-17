<template>
  <div class="cdks-page">
     <div class="page-tip-header">
        <el-alert title="此处显示所有 CDK 物理数据。建议定期清理未绑定 SKU 的孤儿 CDK。" type="warning" show-icon :closable="false" center />
     </div>

     <!-- Action Bar -->
     <AdminActionCard>
        <template #default>
           <div class="filter-group">
              <el-radio-group v-model="filters.mode" @change="handleFilterChange">
                 <el-radio-button label="all">全部</el-radio-button>
                 <el-radio-button label="unlinked">未连接</el-radio-button>
              </el-radio-group>
           </div>
        </template>
        
        <template #actions>
           <el-button @click="refresh" :icon="Refresh">刷新</el-button>
           <el-button 
             type="danger" 
             :icon="Delete" 
             :disabled="!hasSelection"
             :loading="isCleaning"
             @click="() => handleBulkCleanup(selectedIds)"
           >
             批量删除
           </el-button>
        </template>
     </AdminActionCard>

     <!-- Data Table -->
     <AdminDataTable 
        ref="adminTableRef"
        :data="list" 
        :loading="loading"
        :total="total"
        v-model:page="currentPage"
        v-model:pageSize="pageSize"
        @selection-change="handleSelectionChange"
     >
        <el-table-column type="selection" width="55" :selectable="canSelectRow" />
        
        <el-table-column label="CDK 类型" width="120" align="center">
            <template #default="{ row }">
                <el-tag :type="getCdkTypeTag(row.cdk_type)">{{ getCdkTypeLabel(row.cdk_type) }}</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="绑定商品" min-width="200">
            <template #default="{ row }">
                <ProductThumbCell 
                  :image="row.product_snapshot?.product_image" 
                  :name="row.product_snapshot?.product_name || '未知商品'" 
                  :id="undefined"
                  :truncate-id="false"
                />
            </template>
        </el-table-column>

        <el-table-column label="绑定 SKU" min-width="160">
            <template #default="{ row }">
               <div v-if="row.sku_mappings && row.sku_mappings.length > 0" class="linked-skus">
                   <el-tag 
                       v-for="mapping in row.sku_mappings.slice(0, 2)" 
                       :key="mapping.id"
                       size="small"
                       effect="plain"
                       style="margin-right: 4px;"
                   >
                       {{ formatSkuSpec(mapping.sku?.spec_combination) }}
                   </el-tag>
                   <span v-if="row.sku_mappings.length > 2" class="more-tag">+{{ row.sku_mappings.length - 2 }}</span>
               </div>
               <el-tag v-else type="danger" effect="plain" size="small">未绑定</el-tag>
            </template>
        </el-table-column>

        <el-table-column label="内容" min-width="180">
            <template #default="{ row }">
                <span class="code-text">{{ row.code || '-' }}</span>
            </template>
        </el-table-column>

        <el-table-column label="库存" width="80" align="center">
            <template #default="{ row }">
                <span>{{ row.stock ?? 1 }}</span>
            </template>
        </el-table-column>

        <el-table-column label="状态" width="100" align="center">
            <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">{{ getStatusLabel(row.status) }}</el-tag>
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
                   v-if="!row.sku_mappings || row.sku_mappings.length === 0" 
                   type="danger" 
                   link 
                   size="small" 
                   @click="handleSingleCleanup(row)"
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminCdkApi, type AdminCDK } from '@/api/admin'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useAdminList } from '@/composables/admin/useAdminList'
import { useAdminCdkCleanup } from '@/composables/admin/useAdminCdkCleanup'
import ProductThumbCell from '@/components/admin/base/ProductThumbCell.vue'

const { getProductTypeLabel, getProductTypeTag, getCdkStatusLabel, getCdkStatusType } = useBizConfig()
const { formatDate } = useBizFormat()

// 配置 useAdminList
const {
    loading,
    list,
    total,
    currentPage,
    pageSize,
    filters,
    selectedIds,
    hasSelection,
    selectedCount,
    refresh,
    handleFilterChange,
    handleSelectionChange,
    removeRow,
    removeRows
} = useAdminList<AdminCDK>({
    defaultFilters: { mode: 'all' },
    defaultPageSize: 50, // CDK 数据较多，默认 50
    fetchFn: async (params) => {
        // Mode 'all': Standard Server-Side Pagination
        if (params.filters.mode === 'all') {
            const offset = (params.page - 1) * params.pageSize
            const res = await adminCdkApi.getCdks({ 
                limit: params.pageSize,
                offset: offset
            })
            if (!res.success) throw new Error(res.error)
            
            return {
                success: true,
                data: res.cdks,
                total: res.total
            }
        }
        
        // Mode 'unlinked': Client-Side Filtering (Temporary Scalability Fix)
        // Limitation: Can only find orphans within the first 1000 records.
        // TODO: Implement backend filter for 'unlinked'
        const res = await adminCdkApi.getCdks({ limit: 1000 }) 
        if (!res.success) throw new Error(res.error)

        let data = res.cdks || []
        data = data.filter(cdk => !cdk.sku_mappings || cdk.sku_mappings.length === 0)
        
        const total = data.length
        const start = (params.page - 1) * params.pageSize
        const end = start + params.pageSize
        const pagedData = data.slice(start, end)
        
        return {
            success: true,
            data: pagedData,
            total
        }
    }
})

// Helpers
const getCdkTypeLabel = (type: string) => getProductTypeLabel(type)
const getCdkTypeTag = (type: string) => getProductTypeTag(type)
const getStatusLabel = (s: string) => getCdkStatusLabel(s)
const getStatusType = (s: string) => getCdkStatusType(s)

const formatSkuSpec = (spec: any) => {
    if(!spec) return '默认'
    return Object.values(spec).join(' / ')
}

// Selection - only unlinked can be selected
const canSelectRow = (row: AdminCDK) => !row.sku_mappings || row.sku_mappings.length === 0

// Cleanup Logic
const { isCleaning, handleSingleCleanup, handleBulkCleanup } = useAdminCdkCleanup({
    onDeleteSuccess: (id) => removeRow(id),
    onBulkDeleteSuccess: (ids) => removeRows(ids)
})
</script>

<style scoped>
.page-tip-header { display: flex; justify-content: center; margin-bottom: 20px; }
.cdks-page { height: 100%; display: flex; flex-direction: column; }

.filter-group { display: flex; align-items: center; gap: 10px; }

/* .product-name removed */
.linked-skus { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.more-tag { font-size: 12px; color: #909399; }
.code-text { font-family: monospace; font-size: 13px; color: #333; }
.time-text { font-size: 12px; color: #666; }
</style>
