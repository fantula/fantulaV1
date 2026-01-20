<template>
  <div class="cdks-page">
     <div class="page-tip-header">
        <el-alert title="此处显示所有 CDK 物理数据。建议定期清理未绑定 SKU 的孤儿 CDK。" type="warning" show-icon :closable="false" center />
     </div>

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
           <el-button @click="loadCdks" :icon="Refresh">刷新</el-button>
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
        :data="cdks" 
        :loading="loading"
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
               <div class="product-cell" style="display: flex; align-items: center;">
                 <el-image 
                   v-if="row.product_snapshot?.product_image" 
                   :src="row.product_snapshot.product_image" 
                   fit="cover"
                   style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; flex-shrink: 0;"
                 />
                 <span class="product-name">{{ row.product_snapshot?.product_name || '未知商品' }}</span>
               </div>
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
                   @click="handleDelete(row)"
                >删除</el-button>
            </template>
        </el-table-column>

     </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Refresh, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminCdkApi, type AdminCDK } from '@/api/admin-supabase'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

const { getProductTypeLabel, getProductTypeTag, getCdkStatusLabel, getCdkStatusType } = useBizConfig()
const { formatDate, formatPrice } = useBizFormat()

// State
const loading = ref(false)
const filterMode = ref('all') // 'all' | 'unlinked'
const cdks = ref<AdminCDK[]>([])
const selectedIds = ref<string[]>([])

// Load
const loadCdks = async () => {
    loading.value = true
    try {
        const res = await adminCdkApi.getCdks({ limit: 500 })
        if (res.success) {
            let data = res.cdks || []
            // Client-side filter for unlinked
            if (filterMode.value === 'unlinked') {
                data = data.filter(cdk => !cdk.sku_mappings || cdk.sku_mappings.length === 0)
            }
            cdks.value = data
        } else {
            ElMessage.error(res.error)
        }
    } catch (e: any) {
        ElMessage.error(e.message || '加载失败')
    } finally {
        loading.value = false
    }
}

const handleFilterChange = () => {
    loadCdks()
}

// Helpers
// Date formatted by global formatDate, no local function needed

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
const handleSelectionChange = (val: any[]) => {
    selectedIds.value = val.map(v => v.id)
}

// Actions
const handleDelete = (row: AdminCDK) => {
    ElMessageBox.confirm('确认删除此未绑定的孤儿 CDK 吗？此操作无法恢复。', '警告', { type: 'warning' })
    .then(async () => {
        const res = await adminCdkApi.deleteCdk(row.id)
        if(res.success) { ElMessage.success('删除成功'); loadCdks() }
        else ElMessage.error(res.error)
    })
}

const handleBulkDelete = () => {
    if(!selectedIds.value.length) return
    ElMessageBox.confirm(`确认批量删除 ${selectedIds.value.length} 个孤儿 CDK？`, '高风险操作', { 
        type: 'error',
        confirmButtonText: '确定删除',
        cancelButtonText: '取消'
    }).then(async () => {
        const res = await adminCdkApi.deleteCdks(selectedIds.value)
        if(res.success) { 
            ElMessage.success('批量删除成功')
            selectedIds.value = []
            loadCdks() 
        }
        else ElMessage.error(res.error)
    })
}

onMounted(() => {
    loadCdks()
})
</script>

<style scoped>
.page-tip-header { display: flex; justify-content: center; margin-bottom: 20px; }
.cdks-page { height: 100%; display: flex; flex-direction: column; }

.filter-group { display: flex; align-items: center; gap: 10px; }

.product-name { font-size: 14px; font-weight: 500; }
.linked-skus { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.more-tag { font-size: 12px; color: #909399; }
.code-text { font-family: monospace; font-size: 13px; color: #333; }
.time-text { font-size: 12px; color: #666; }
</style>
