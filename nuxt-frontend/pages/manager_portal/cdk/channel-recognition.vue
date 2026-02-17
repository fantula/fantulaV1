<template>
  <div class="channel-recognition-page">
    <!-- Action Bar -->
    <AdminActionCard>
      <template #default>
        <div class="filter-group">
          <el-input
            v-model="filters.query"
            placeholder="搜索频道标识..."
            style="width: 240px"
            clearable
            @clear="handleFilterChange"
            @keyup.enter="handleFilterChange"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          
          <el-select 
            v-model="filters.status" 
            placeholder="状态筛选" 
            style="width: 140px" 
            @change="handleFilterChange"
          >
            <el-option label="全部" value="all" />
            <el-option label="待处理 (未绑定)" value="unbound" />
            <el-option label="已完成 (已绑定)" value="bound" />
          </el-select>
          
          <el-button type="primary" @click="refresh">查询</el-button>
        </div>
      </template>

      <template #actions>
        <el-button type="success" @click="batchModalVisible = true">
          <el-icon class="el-icon--left"><Plus /></el-icon>
          批量添加
        </el-button>
        <el-button @click="refresh">
          <el-icon><Refresh /></el-icon>
        </el-button>
      </template>
    </AdminActionCard>

    <!-- Data Table -->
    <AdminDataTable
      :data="list"
      :loading="loading"
      :total="total"
      v-model:page="currentPage"
      v-model:pageSize="pageSize"
    >
      <el-table-column prop="channel_key" label="频道标识" min-width="180">
        <template #default="{ row }">
          <span class="channel-key">{{ row.channel_key }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="绑定商品" min-width="250">
        <template #default="{ row }">
          <div v-if="row.products" class="bound-product">
            <el-tag size="small" type="success">已绑定</el-tag>
            <span class="product-name" :title="row.products.product_name">{{ row.products.product_name }}</span>
          </div>
          <el-tag v-else type="warning" size="small">未绑定</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.product_id ? 'success' : 'warning'" effect="dark">
            {{ row.product_id ? '已完成' : '待处理' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openBindModal(row)">
            {{ row.product_id ? '修改商品' : '绑定商品' }}
          </el-button>
          <el-popconfirm 
            title="确定要彻底删除该记录吗？下次用户搜索将重新生成。"
            confirm-button-text="删除"
            cancel-button-text="取消"
            @confirm="removeRow(row.id)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- Bind Product Modal -->
    <el-dialog v-model="bindModalVisible" title="绑定商品" width="500px" destroy-on-close>
      <el-form label-position="top">
        <el-form-item label="当前频道">
          <el-input :model-value="currentRow?.channel_key" disabled />
        </el-form-item>
        
        <!-- Step 1: Category Select -->
        <el-form-item label="选择分类">
          <el-select 
            v-model="selectedCategoryId" 
            placeholder="请选择商品分类" 
            style="width: 100%"
            @change="handleCategoryChange"
          >
            <el-option
              v-for="cat in categoryList"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id"
            />
          </el-select>
        </el-form-item>

        <!-- Step 2: Product Select -->
        <el-form-item label="选择商品">
          <el-select 
            v-model="selectedProductId" 
            placeholder="请选择商品" 
            filterable 
            :disabled="!selectedCategoryId"
            style="width: 100%"
            no-data-text="该分类下暂无商品"
          >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.product_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="bindModalVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSaveBind" :loading="saving" :disabled="!selectedProductId">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Batch Add Modal -->
    <el-dialog v-model="batchModalVisible" title="批量添加频道" width="500px">
      <div class="batch-content">
        <el-alert title="每行输入一个频道标识 (@xxx)，系统会自动去重并生成未绑定记录。" type="info" :closable="false" show-icon />
        <el-input
          v-model="batchInput"
          type="textarea"
          :rows="10"
          placeholder="@channel1\n@channel2\n..."
          style="margin-top: 15px;"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchModalVisible = false">取消</el-button>
          <el-button type="primary" @click="handleBatchAdd" :loading="batchAdding">开始生成</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, onMounted } from 'vue'
import { Search, Plus, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getSupabaseClient } from '@/utils/supabase' // SECURITY FIX: Use standard client
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useAdminList } from '@/composables/admin/useAdminList'
import { useBizFormat } from '@/composables/common/useBizFormat'

const client = getSupabaseClient()
const { formatDate } = useBizFormat()

// --- useAdminList Integration ---
const {
  loading,
  list,
  total,
  currentPage,
  pageSize,
  filters,
  refresh,
  handleFilterChange,
  removeRow
} = useAdminList<any>({
  defaultFilters: { status: 'unbound', query: '' },
  fetchFn: async (params) => {
    let query = client
      .from('channel_recognitions')
      .select('*, products(id, product_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((params.page - 1) * params.pageSize, params.page * params.pageSize - 1)

    // Search
    if (params.filters.query) {
      query = query.ilike('channel_key', `%${params.filters.query}%`)
    }

    // Filter
    if (params.filters.status === 'unbound') {
      query = query.is('product_id', null)
    } else if (params.filters.status === 'bound') {
      query = query.not('product_id', 'is', null)
    }

    const { data, count, error } = await query
    if (error) throw new Error(error.message)

    return {
      success: true,
      data: data || [],
      total: count || 0
    }
  },
  deleteFn: async (id) => {
    const { error } = await client.from('channel_recognitions').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return { success: true }
  }
})

// --- Bind Modal State ---
const bindModalVisible = ref(false)
const currentRow = ref<any>(null)
const selectedCategoryId = ref<string | null>(null)
const selectedProductId = ref<string | null>(null)
const categoryList = ref<any[]>([])
const productList = ref<any[]>([])
const saving = ref(false)

// --- Batch Modal State ---
const batchModalVisible = ref(false)
const batchInput = ref('')
const batchAdding = ref(false)

// --- Init ---
onMounted(() => {
  fetchCategories()
})

const fetchCategories = async () => {
  const { data } = await client
    .from('product_categories')
    .select('id, name')
    .eq('status', 'on')
    .order('sort_order', { ascending: true })
  categoryList.value = data || []
}

// --- Bind Logic ---

const openBindModal = (row: any) => {
  currentRow.value = row
  // Reset selection
  selectedCategoryId.value = null
  selectedProductId.value = null
  productList.value = []
  
  // Try to restore if already bound
  if (row.product_id && row.products) {
    fetchProductDetails(row.product_id)
  }
  
  bindModalVisible.value = true
}

const fetchProductDetails = async (productId: string) => {
  const { data } = await client.from('products').select('category_id').eq('id', productId).single()
  if (data) {
    selectedCategoryId.value = data.category_id
    await handleCategoryChange(data.category_id)
    selectedProductId.value = productId
  }
}

const handleCategoryChange = async (catId: string) => {
  selectedCategoryId.value = catId
  selectedProductId.value = null // reset product
  
  if (!catId) {
    productList.value = []
    return
  }

  const { data } = await client
    .from('products')
    .select('id, product_name')
    .eq('category_id', catId)
    .eq('status', 'on')
    .order('sort_order', { ascending: true })
  
  productList.value = data || []
}

const handleSaveBind = async () => {
  if (!selectedProductId.value) return

  saving.value = true
  try {
    const { error } = await client
      .from('channel_recognitions')
      .update({ 
        product_id: selectedProductId.value,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentRow.value.id)

    if (error) throw error

    ElMessage.success('绑定成功')
    bindModalVisible.value = false
    refresh()
  } catch (err: any) {
    ElMessage.error('保存失败: ' + err.message)
  } finally {
    saving.value = false
  }
}

// --- Batch Add Logic ---

const handleBatchAdd = async () => {
  if (!batchInput.value.trim()) {
    ElMessage.warning('请输入内容')
    return
  }

  batchAdding.value = true
  try {
    // 1. Parse and Sanitize
    const rawLines = batchInput.value.split('\n')
    const uniqueKeys = new Set<string>()

    rawLines.forEach(line => {
      let key = line.trim().toLowerCase()
      if (!key) return
      if (!key.startsWith('@')) key = '@' + key
      uniqueKeys.add(key)
    })

    if (uniqueKeys.size === 0) {
      ElMessage.warning('没有有效的频道标识')
      return
    }

    // 2. Prepare Payload
    const payload = Array.from(uniqueKeys).map(key => ({
      channel_key: key
      // product_id is null by default
    }))

    // 3. Upsert (Ignore conflicts means do nothing if exists, which is perfect)
    const { error } = await client
      .from('channel_recognitions')
      .upsert(payload, { onConflict: 'channel_key', ignoreDuplicates: true })

    if (error) throw error

    ElMessage.success(`操作完成：处理 ${payload.length} 条记录`)
    batchModalVisible.value = false
    batchInput.value = ''
    refresh()
  } catch (err: any) {
    ElMessage.error('批量生成失败: ' + err.message)
  } finally {
    batchAdding.value = false
  }
}
</script>

<style scoped>
.channel-recognition-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.channel-key { font-weight: bold; color: var(--el-color-primary); }
.product-name { margin-left: 8px; font-size: 13px; }
.bound-product { display: flex; align-items: center; }
</style>
