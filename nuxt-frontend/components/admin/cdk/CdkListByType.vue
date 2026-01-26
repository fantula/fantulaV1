<template>
  <div class="cdk-list-view">
    <!-- Action Bar (simplified - no tip, no unlinked filter, no batch delete) -->
    <AdminActionCard>
      <template #default>
        <div class="filter-group">
            <!-- Category Filter -->
            <el-select 
                v-model="filters.categoryId" 
                placeholder="选择分类" 
                clearable 
                style="width: 140px;"
                @change="handleCategoryChange"
            >
                <el-option 
                  v-for="c in categoryOptions" 
                  :key="c.id" 
                  :label="c.name" 
                  :value="c.id" 
                />
            </el-select>

            <!-- Product Filter -->
            <el-select 
                v-model="filters.productId" 
                placeholder="筛选商品" 
                clearable 
                filterable 
                style="width: 160px;"
                @change="handleSearch"
                :disabled="!filters.categoryId"
            >
                <el-option 
                  v-for="p in filteredProducts" 
                  :key="p.id" 
                  :label="p.product_name" 
                  :value="p.id" 
                />
            </el-select>

            <!-- Status Filter -->
            <el-select 
                v-model="filters.status" 
                placeholder="状态" 
                clearable 
                style="width: 120px;"
                @change="handleSearch"
            >
                <el-option label="未连接SKU" value="unlinked" />
                <el-option label="空闲" value="idle" />
                <el-option label="使用中" value="using" />
                <el-option label="已使用" value="used" />
                <el-option label="已下架" value="disabled" />
            </el-select>
        </div>
      </template>

      <template #actions>
        <el-button @click="loadCdks" :icon="Refresh">刷新</el-button>
        <el-button 
          type="danger" 
          :icon="Delete" 
          :disabled="!selectedRows.length"
          @click="handleBulkDelete"
        >
          批量删除
        </el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增 {{ typeLabel }}</el-button>
      </template>
    </AdminActionCard>

    <!-- Data Table -->
    <AdminDataTable 
        :data="cdkList" 
        :loading="loading"
        @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection" width="55" />
        
        <!-- 商品 -->
        <el-table-column label="商品" min-width="180">
           <template #default="{ row }">
              <div class="product-cell">
                <el-image 
                  v-if="row.product_snapshot?.product_image" 
                  :src="row.product_snapshot.product_image" 
                  fit="cover"
                  style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px;"
                />
                <span class="product-name">{{ row.product_snapshot?.product_name || '未知商品' }}</span>
              </div>
           </template>
        </el-table-column>

        <!-- 规格 (绑定SKU) -->
        <el-table-column label="规格" min-width="160">
            <template #default="{ row }">
               <div v-if="row.sku_mappings && row.sku_mappings.length > 0" class="sku-mappings-cell">
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
               <el-tag v-else type="warning" size="small" effect="plain">未绑定</el-tag>
            </template>
        </el-table-column>

        <!-- 内容 (code) - Parse JSON to key:value display -->
        <el-table-column label="内容" min-width="240">
           <template #default="{ row }">
               <div class="code-display">
                   <span class="code-text">{{ formatCodeDisplay(row.code) }}</span>
                   <el-button v-if="row.code" link size="small" @click="copyCode(row.code)">复制</el-button>
               </div>
           </template>
        </el-table-column>

        <!-- 库存/剩余 - Different for shared type -->
        <el-table-column v-if="props.type === 'shared'" label="库存/剩余" width="120" align="center">
            <template #default="{ row }">
                <div class="stock-info">
                    <span>{{ row.max_slots || 1 }}</span>
                    <span class="stock-divider">/</span>
                    <span class="remaining">{{ getIdleSlots(row) }}</span>
                </div>
            </template>
        </el-table-column>

        <el-table-column v-else label="库存" width="80" align="center">
            <template #default="{ row }">
                <span>{{ row.stock ?? 1 }}</span>
            </template>
        </el-table-column>

        <!-- 状态 -->
        <el-table-column label="状态" width="100" align="center">
            <template #default="{ row }">
                <el-switch
                    v-if="['idle', 'disabled'].includes(row.status)"
                    :model-value="row.status === 'idle'"
                    active-text="上架"
                    inactive-text="下架"
                    inline-prompt
                    @change="(val: boolean) => handleToggleStatus(row, val)"
                />
                <el-tag v-else :type="getStatusType(row.status)" size="small">{{ getStatusLabel(row.status) }}</el-tag>
            </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="100" align="center" fixed="right">
            <template #default="{ row }">
                <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            </template>
        </el-table-column>
    </AdminDataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { Refresh, Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminProductApi, adminCdkApi, adminCategoryApi, type AdminProduct, type AdminCDK, type ProductCategory } from '@/api/admin'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useBizConfig } from '@/composables/common/useBizConfig'

const { getProductTypeLabel, getCdkStatusLabel, getCdkStatusType } = useBizConfig()

const props = defineProps<{
    type: 'virtual' | 'shared' | 'one_time'
}>()

const router = useRouter()

// Get label
const typeLabel = computed(() => getProductTypeLabel(props.type))

// State
const loading = ref(false)
const cdkList = ref<AdminCDK[]>([])
const categoryOptions = ref<ProductCategory[]>([])
const productOptions = ref<AdminProduct[]>([])
const selectedRows = ref<AdminCDK[]>([])

const filters = reactive({
    categoryId: '',
    productId: '',
    status: ''
})

// Computed: filter products by category
const filteredProducts = computed(() => {
    if (!filters.categoryId) return productOptions.value
    return productOptions.value.filter(p => p.category_id === filters.categoryId)
})

// Load Data
const loadCategories = async () => {
    const res = await adminCategoryApi.getCategories()
    if(res.success) categoryOptions.value = res.categories
}

const loadProducts = async () => {
    const res = await adminProductApi.getProducts()
    if(res.success) productOptions.value = res.products
}

const loadCdks = async () => {
    loading.value = true
    try {
        const params: any = {
            cdk_type: props.type,
            limit: 200
        }
        if(filters.productId) params.product_id = filters.productId
        // 'unlinked' is handled client-side, other statuses pass to API
        if(filters.status && filters.status !== 'unlinked') params.status = filters.status
        
        const res = await adminCdkApi.getCdks(params)
        if(res.success) {
            let result = res.cdks
            // Client-side filter for unlinked (no SKU mappings)
            if(filters.status === 'unlinked') {
                result = result.filter(cdk => !cdk.sku_mappings || cdk.sku_mappings.length === 0)
            }
            cdkList.value = result
        }
        else ElMessage.error(res.error)
    } catch(e: any) {
        ElMessage.error(e.message)
    } finally {
        loading.value = false
    }
}

const handleCategoryChange = () => {
    filters.productId = ''
    loadCdks()
}

const handleSearch = () => loadCdks()

// Actions
const handleAdd = () => {
    router.push({ path: '/admin/cdk/post', query: { type: props.type } })
}

const handleEdit = (row: AdminCDK) => {
    router.push({
        path: `/admin/cdk/edit/${row.id}`,
        query: { type: props.type }
    })
}

const handleToggleStatus = async (row: AdminCDK, enabled: boolean) => {
    if (enabled) {
        const res = await adminCdkApi.enableCdk(row.id)
        if(res.success) { ElMessage.success('上架成功'); loadCdks() }
    } else {
        const res = await adminCdkApi.disableCdk(row.id)
        if(res.success) { ElMessage.success('下架成功'); loadCdks() }
    }
}

// Selection & Bulk Delete
const handleSelectionChange = (rows: AdminCDK[]) => selectedRows.value = rows

const handleBulkDelete = () => {
    if(!selectedRows.value.length) return
    ElMessageBox.confirm(`确认批量删除 ${selectedRows.value.length} 条 CDK？`, '警告', { 
        type: 'warning',
        confirmButtonText: '确定删除',
        cancelButtonText: '取消'
    }).then(async () => {
        const res = await adminCdkApi.deleteCdks(selectedRows.value.map(r => r.id))
        if(res.success) { 
            ElMessage.success('批量删除成功')
            selectedRows.value = []
            loadCdks() 
        }
        else ElMessage.error(res.error)
    })
}

// Helpers
const getStatusLabel = (s: string) => getCdkStatusLabel(s)
const getStatusType = (s: string) => getCdkStatusType(s)
const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    ElMessage.success('已复制')
}
const formatSkuSpec = (spec: any) => {
    if(!spec) return '默认'
    return Object.values(spec).join(' / ')
}

// Format code: parse JSON to readable display
const formatCodeDisplay = (code: string) => {
    if (!code) return '-'
    try {
        const obj = JSON.parse(code)
        if (typeof obj === 'object' && obj !== null) {
            // Virtual type: {"fields": ["游戏账号", "服务器"]}
            if (obj.fields && Array.isArray(obj.fields)) {
                return `字段: ${obj.fields.join(', ')}`
            }
            // Shared type: {"账号":"11","密码":"11"}
            return Object.entries(obj).map(([k, v]) => `${k}：${v}`).join('  ')
        }
        return code
    } catch {
        return code
    }
}

// Get idle slots count for shared type
const getIdleSlots = (row: AdminCDK) => {
    // slot_occupancies may be included in the response, count idle ones
    if (row.slot_occupancies && Array.isArray(row.slot_occupancies)) {
        return row.slot_occupancies.filter((s: any) => s.status === 'idle').length
    }
    // Fallback: assume all slots are available if status is idle
    if (row.status === 'idle') return row.max_slots || 1
    return 0
}

onMounted(() => {
    loadCategories()
    loadProducts()
    loadCdks()
})
</script>

<style scoped>
.cdk-list-view { height: 100%; display: flex; flex-direction: column; }

.filter-group { display: flex; align-items: center; gap: 10px; }
.product-cell { display: flex; align-items: center; }
.product-name { font-weight: 500; font-size: 14px; }

.code-display { display: flex; align-items: center; gap: 8px; }
.code-text { font-size: 13px; color: #333; word-break: break-all; }

.sku-mappings-cell { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.more-tag { font-size: 12px; color: #909399; }

.stock-info { display: flex; align-items: center; justify-content: center; font-size: 14px; }
.stock-divider { margin: 0 4px; color: #dcdfe6; }
.remaining { color: #67c23a; font-weight: 500; }
</style>
