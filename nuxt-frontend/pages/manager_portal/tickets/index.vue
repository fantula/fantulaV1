<template>
  <AdminModuleLayout
    title="工单管理"
    :tabs="tabs"
    :default-tab="currentTab"
    @tab-change="handleTabChange"
  >
    <div class="p-6">
      <AdminActionCard>
        <template #actions>
           <el-button type="warning" plain @click="handleCleanup">
              <el-icon><Delete /></el-icon> 清理历史图片
           </el-button>
        </template>
      </AdminActionCard>

      <AdminDataTable
        :data="list"
        :loading="loading"
        :total="pagination.total"
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        @page-change="handlePageChange"
        @selection-change="handleSelectionChange"
      >
        <!-- 1. 工单ID -->
        <el-table-column label="工单ID" width="160">
          <template #default="{ row }">
            <span class="mono-text cursor-pointer hover:text-blue-600" @click="openChat(row)">
              {{ row.ticket_no || `T-${row.id.substring(0,8).toUpperCase()}` }}
            </span>
            <div class="sub-text mt-1">
               {{ formatDate(row.created_at).split(' ')[0] }}
            </div>
          </template>
        </el-table-column>

        <!-- 2. 关联订单 (新增) -->
        <el-table-column label="关联订单" width="160">
           <template #default="{ row }">
              <div v-if="row.orders">
                 <div class="mono-text cursor-pointer hover:text-blue-600" @click="copy(row.orders.order_no)">
                    {{ row.orders.order_no }}
                 </div>
                 <div class="sub-text truncate" :title="row.orders.product_snapshot?.product_name">
                    {{ row.orders.product_snapshot?.product_name }}
                 </div>
              </div>
              <div v-else class="sub-text text-gray-400">-</div>
           </template>
        </el-table-column>

        <!-- 3. 内容概要 -->
        <el-table-column label="内容概要" min-width="200" show-overflow-tooltip>
           <template #default="{ row }">
              <div class="font-medium truncate mb-1 cursor-pointer hover:text-blue-500" @click="openChat(row)">{{ row.title }}</div>
              <div class="sub-text truncate">{{ row.ticket_messages?.[0]?.content || '暂无消息' }}</div>
           </template>
        </el-table-column>

        <!-- 3. 提交用户 -->
      <el-table-column label="用户" min-width="180">
        <template #default="{ row }">
          <AdminUserCell
    :uid="row.user_id"
    :email="row.profiles?.email"
  />
        </template>
      </el-table-column>

        <!-- 4. 优先级 -->
        <el-table-column label="优先级" width="100" align="center">
           <template #default="{ row }">
              <el-tag :type="getTicketPriorityType(row.priority) as any" effect="plain" size="small">{{ getTicketPriorityLabel(row.priority) }}</el-tag>
           </template>
        </el-table-column>

        <!-- 5. 状态 -->
        <el-table-column label="状态" width="100" align="center">
           <template #default="{ row }">
              <el-tag :type="getTicketStatusType(row.status) as any" size="small">
                 {{ getTicketStatusLabel(row.status) }}
              </el-tag>
           </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="100" fixed="right" align="center">
           <template #default="{ row }">
              <el-button link type="primary" size="small" @click="openChat(row)">
                 处理
              </el-button>
           </template>
        </el-table-column>
      </AdminDataTable>
    </div>
    
    <TicketChatModal 
       v-if="showChat"
       v-model="showChat" 
       :ticketId="selectedTicketId" 
       @closed="onChatClosed"
    />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, onMounted } from 'vue'
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminUserCell from '@/components/admin/base/AdminUserCell.vue'
import { useAdminTicketList } from '@/composables/admin/useAdminTicketList'
import { Delete } from '@element-plus/icons-vue'
import { useClipboard } from '@vueuse/core'

// Use standard composable + Common Config helpers
const {
  loading, list, pagination, currentTab, selectedIds,
  loadList, handlePageChange, handleTabChange, handleSelectionChange, handleCleanup,
  formatDate, getTicketPriorityLabel, getTicketPriorityType, getTicketStatusLabel, getTicketStatusType
} = useAdminTicketList()

const { copy } = useClipboard()

const tabs = [
  { name: 'processing', label: '处理中' },
  { name: 'resolved', label: '已解决' },
  { name: 'all', label: '全部' }
]

const showChat = ref(false)
const selectedTicketId = ref('')

const openChat = (row: any) => {
   selectedTicketId.value = row.id
   showChat.value = true
}

const onChatClosed = () => {
   showChat.value = false
   selectedTicketId.value = ''
   loadList() // Refresh status
}

onMounted(() => {
   loadList()
})
</script>

<style scoped>
.mono-text { font-family: 'Monaco', 'Consolas', monospace; font-weight: 500; }
.sub-text { font-size: 12px; color: #909399; }
/* .user-cell removed */
</style>
