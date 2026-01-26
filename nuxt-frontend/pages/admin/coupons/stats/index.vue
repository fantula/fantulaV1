<template>
  <div class="coupon-stats-page">
    <PageTipHeader 
      title="优惠券统计" 
      description="查看优惠券领取和使用记录，支持按兑换码或用户查询。"
    />

    <!-- Filter Bar -->
    <AdminActionCard>
      <div class="filter-group">
        <el-input 
          v-model="filters.code" 
          placeholder="搜索兑换码" 
          style="width: 200px" 
          clearable 
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        
        <el-input 
          v-model="filters.userUid" 
          placeholder="搜索用户UID (8位)" 
          style="width: 200px" 
          clearable 
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix><el-icon><User /></el-icon></template>
        </el-input>
        
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </div>
      
      <template #actions>
        <el-button :icon="Refresh" @click="loadData">刷新</el-button>
      </template>
    </AdminActionCard>

    <!-- Bulk Actions -->
    <BulkActionBar 
      v-if="selectedIds.length > 0"
      :count="selectedIds.length"
      @delete="handleBatchDelete"
    />

    <!-- Data Table -->
    <AdminDataTable
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      
      <el-table-column prop="code" label="兑换码" min-width="180">
        <template #default="{ row }">
           <span class="code-text">{{ row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="coupon_name" label="优惠券名称" min-width="150" />
      
      <el-table-column label="所属用户" min-width="180">
         <template #default="{ row }">
           <div v-if="row.display_uid || row.user_uid" class="user-cell">
              <el-tag size="small" type="info">{{ row.display_uid || row.user_uid }}</el-tag>
              <div class="user-nickname" v-if="row.user_nickname">{{ row.user_nickname }}</div>
           </div>
           <span v-else class="text-gray">-</span>
         </template>
      </el-table-column>

      <el-table-column label="关联订单" min-width="180">
         <template #default="{ row }">
           <span v-if="row.order_no" class="order-no">{{ row.order_no }}</span>
           <span v-else-if="row.order_id" class="order-uuid">{{ row.order_id }}</span>
           <span v-else class="text-gray">-</span>
         </template>
      </el-table-column>
      
      <el-table-column prop="status" label="状态" width="100" align="center">
         <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusLabel(row.status) }}
            </el-tag>
         </template>
      </el-table-column>

      <el-table-column label="领取时间" width="170" align="center">
        <template #default="{ row }">
          {{ formatTime(row.created_at) }}
        </template>
      </el-table-column>

      <el-table-column label="使用时间" width="170" align="center">
        <template #default="{ row }">
          {{ formatTime(row.used_at) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template #default="{ row }">
          <el-button 
            v-if="['used', 'expired'].includes(row.status)"
            link type="danger" size="small" 
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <!-- Pagination -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, User, Refresh } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { adminApi } from '@/api/admin'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import BulkActionBar from '@/components/admin/base/BulkActionBar.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'

const loading = ref(false)
const dataList = ref<any[]>([])
const selectedIds = ref<string[]>([])

const pagination = reactive({
  page: 1,
  pageSize: 20,
  total: 0
})

const filters = reactive({
  code: '',
  userUid: ''
})

const getStatusType = (status: string) => {
  switch (status) {
    case 'used': return 'success'
    case 'expired': return 'info'
    default: return 'warning'
  }
}

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    'used': '已使用',
    'expired': '已过期'
  }
  return map[status] || status
}

const formatTime = (time: string) => {
  if (!time) return '-'
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}



const loadData = async () => {
  loading.value = true
  try {
    const res = await adminApi.coupon.getCouponStats({
      page: pagination.page,
      pageSize: pagination.pageSize,
      code: filters.code,
      userUid: filters.userUid
    })
    
    if (res.success) {
      let list = res.data
      
      // 前端二次查询获取 8位 UID (不修改后端API，防止破坏)
      const userIds = list.map(i => i.user_uid).filter(id => id && id.length > 20) // 简单的UUID长度检查
      if (userIds.length > 0) {
          const client = getAdminSupabaseClient()
          const { data: users } = await client.from('users').select('id, uid, nickname').in('id', userIds)
          if (users) {
              const userMap = users.reduce((acc, u) => {
                  acc[u.id] = u
                  return acc
              }, {} as Record<string, any>)
              
              // 映射回列表
              list = list.map(item => {
                  const u = userMap[item.user_uid]
                  return {
                      ...item,
                      display_uid: u ? u.uid : item.user_uid, // 有8位显示8位，没有显示UUID
                      user_nickname: u ? u.nickname : item.user_nickname
                  }
              })
          }
      } else {
           // 如果本来就是短ID或者没查到，就用原来的
           list = list.map(item => ({ ...item, display_uid: item.user_uid }))
      }

      dataList.value = list
      pagination.total = res.total
    } else {
      ElMessage.error(res.error || '加载失败')
    }
  } catch (e: any) {
    ElMessage.error('网络错误: ' + e.message)
  } finally {
    loading.value = false
  }
}

// ... other functions ...

const handleSearch = () => {
  pagination.page = 1
  loadData()
}

const handleSizeChange = (val: number) => {
    pagination.pageSize = val
    loadData()
}

const handleCurrentChange = (val: number) => {
    pagination.page = val
    loadData()
}

const handleSelectionChange = (rows: any[]) => {
  selectedIds.value = rows.map(r => r.id)
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定删除该条记录吗？删除后用户侧将不再显示此优惠券。', '警告', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteItems([row.id])
  })
}

const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) return
  ElMessageBox.confirm(`确定删除选中的 ${selectedIds.value.length} 条记录吗？`, '批量删除', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteItems(selectedIds.value)
  })
}

const deleteItems = async (ids: string[]) => {
  try {
    const res = await adminApi.coupon.deleteCouponUsages(ids)
    if (res.success) {
      ElMessage.success(`成功删除 ${res.count || ids.length} 条记录`)
      loadData()
      selectedIds.value = []
    } else {
      ElMessage.error(res.error || '删除失败')
    }
  } catch (e: any) {
    ElMessage.error('删除异常: ' + e.message)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.filter-group {
    display: flex;
    gap: 12px;
}
.code-text {
  font-family: monospace;
  font-weight: 600;
  color: var(--el-color-primary);
}
.user-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.user-nickname {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.order-no {
  font-family: monospace;
}
.order-uuid {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-family: monospace;
}
.text-gray {
  color: #ccc;
}
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
