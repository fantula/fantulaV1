<template>
  <div class="channel-recognition-page">
    <!-- Header Actions -->
    <div class="page-header">
      <div class="left-actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索频道标识..."
          style="width: 240px"
          clearable
          @clear="fetchData"
          @keyup.enter="fetchData"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-select 
          v-model="filterStatus" 
          placeholder="状态筛选" 
          style="width: 140px" 
          @change="fetchData"
        >
          <el-option label="全部" value="all" />
          <el-option label="待处理 (未绑定)" value="unbound" />
          <el-option label="已完成 (已绑定)" value="bound" />
        </el-select>
        
        <el-button type="primary" @click="fetchData">查询</el-button>
      </div>

      <div class="right-actions">
        <el-button type="success" @click="batchModalVisible = true">
          <el-icon class="el-icon--left"><Plus /></el-icon>
          批量添加
        </el-button>
        <el-button @click="fetchData">
          <el-icon><Refresh /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- Data Table -->
    <el-table :data="tableData" v-loading="loading" style="width: 100%" border stripe>
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
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button link type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="fetchData"
        @current-change="fetchData"
      />
    </div>

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
import dayjs from 'dayjs'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

const client = getAdminSupabaseClient()

// --- State ---
const loading = ref(false)
const tableData = ref<any[]>([])
const searchQuery = ref('')
const filterStatus = ref('unbound') // Default: Unbound
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// Bind Modal State
const bindModalVisible = ref(false)
const currentRow = ref<any>(null)
const selectedCategoryId = ref<string | null>(null)
const selectedProductId = ref<string | null>(null)
const categoryList = ref<any[]>([])
const productList = ref<any[]>([])
const saving = ref(false)

// Batch Modal State
const batchModalVisible = ref(false)
const batchInput = ref('')
const batchAdding = ref(false)

// --- Init ---
onMounted(() => {
  fetchData()
  fetchCategories()
})

// --- Data Fetching ---
const fetchData = async () => {
  loading.value = true
  try {
    let query = client
      .from('channel_recognitions')
      .select('*, products(id, product_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value - 1)

    // Search
    if (searchQuery.value) {
      query = query.ilike('channel_key', `%${searchQuery.value}%`)
    }

    // Filter
    if (filterStatus.value === 'unbound') {
      query = query.is('product_id', null)
    } else if (filterStatus.value === 'bound') {
      query = query.not('product_id', 'is', null)
    }

    const { data, count, error } = await query

    if (error) throw error

    tableData.value = data || []
    total.value = count || 0
  } catch (err: any) {
    ElMessage.error('加载失败: ' + err.message)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  const { data } = await client
    .from('product_categories')
    .select('id, name')
    .eq('status', 'on')
    .order('sort_order', { ascending: true })
  categoryList.value = data || []
}

// --- Actions ---

const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const handleDelete = async (row: any) => {
  try {
    const { error } = await client.from('channel_recognitions').delete().eq('id', row.id)
    if (error) throw error
    ElMessage.success('删除成功')
    fetchData()
  } catch (err: any) {
    ElMessage.error('删除失败: ' + err.message)
  }
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
    // If we knew the category_id of the product, we could auto-select.
    // However, channel_recognitions doesn't store category_id.
    // It's acceptable to make user re-select for modification, OR we could fetch product details.
    // Let's try to fetch product details to get category_id.
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
    fetchData()
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
    fetchData()
  } catch (err: any) {
    ElMessage.error('批量生成失败: ' + err.message)
  } finally {
    batchAdding.value = false
  }
}
</script>

<style scoped>
.channel-recognition-page {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.left-actions, .right-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.channel-key {
  font-family: monospace;
  font-weight: bold;
  color: #409EFF;
}

.bound-product {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-name {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
