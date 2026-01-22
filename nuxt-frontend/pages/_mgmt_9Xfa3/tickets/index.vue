```
<template>
  <AdminModuleLayout
    title="工单管理"
    :tabs="tabs"
     :default-tab="currentTab"
     @tab-change="handleTabChange"
  >
     <template #actions>
        <el-button type="warning" plain @click="handleCleanup">
           <el-icon><Delete /></el-icon> 清理历史图片
        </el-button>
     </template>

     <div class="p-6">
         <el-table :data="list" v-loading="loading" border @selection-change="handleSelectionChange">
            <!-- 0. Selection -->
            <el-table-column type="selection" width="55" align="center" />

            <!-- 1. Ticket ID (Standard format) -->
            <el-table-column label="工单ID" prop="ticket_no" width="140">
              <template #default="{ row }">
                <span class="font-mono font-medium text-blue-600 cursor-pointer hover:underline" @click="openChat(row)">
                  {{ row.ticket_no || `T-${row.id.substring(0,8).toUpperCase()}` }}
                </span>
                <div class="text-xs text-gray-400 scale-90 origin-left mt-0.5">
                   创建于 {{ formatDate(row.created_at).split(' ')[0] }}
                </div>
              </template>
            </el-table-column>

            <!-- 2. Content Preview -->
            <el-table-column label="内容概要" min-width="200" show-overflow-tooltip>
               <template #default="{ row }">
                  <div class="font-medium truncate mb-1 cursor-pointer hover:text-blue-500" @click="openChat(row)">{{ row.title }}</div>
                  <div class="text-xs text-gray-400 truncate">{{ row.ticket_messages?.[0]?.content || '暂无消息' }}</div>
               </template>
            </el-table-column>

            <!-- 3. User Info (8-digit UID) -->
            <el-table-column label="提交用户" width="180">
               <template #default="{ row }">
                  <div class="flex items-center gap-2">
                     <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-500">
                        {{ row.user_id.substring(0,2).toUpperCase() }}
                     </div>
                     <div>
                        <div class="text-xs font-mono font-medium">UID: {{ row.user_id.substring(0,8).toUpperCase() }}</div>
                        <div class="text-xs text-gray-400 truncate w-24" :title="row.profiles?.email">{{ row.profiles?.email || '未知用户' }}</div>
                     </div>
                  </div>
               </template>
            </el-table-column>

            <!-- 4. Priority -->
            <el-table-column label="优先级" width="100" align="center">
               <template #default="{ row }">
                  <el-tag :type="getTicketPriorityType(row.priority)" effect="plain" size="small">{{ getTicketPriorityLabel(row.priority) }}</el-tag>
               </template>
            </el-table-column>

            <!-- 5. Status -->
            <el-table-column label="状态" width="100" align="center">
               <template #default="{ row }">
                  <el-tag :type="getTicketStatusType(row.status)" effect="dark" size="small">
                     {{ getTicketStatusLabel(row.status) }}
                  </el-tag>
               </template>
            </el-table-column>

            <el-table-column label="操作" width="120" fixed="right">
               <template #default="{ row }">
                  <el-button link type="primary" size="small" @click="openChat(row)">
                     处理/回复
                  </el-button>
               </template>
            </el-table-column>
         </el-table>

         <div class="flex justify-between items-center mt-4">
             <div class="text-xs text-gray-400">
                已选 {{ selectedIds.length }} 项
             </div>
             <el-pagination
                v-model:current-page="pagination.page"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                layout="total, prev, pager, next"
                @current-change="handlePageChange"
             />
         </div>
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
import { ref, onMounted } from 'vue'
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'
import { useAdminTicketList } from '@/composables/admin/useAdminTicketList'
import { Delete } from '@element-plus/icons-vue'
import TicketChatModal from './components/TicketChatModal.vue'

// Use standard composable + Common Config helpers
const {
  loading, list, pagination, currentTab, selectedIds,
  loadList, handlePageChange, handleTabChange, handleSelectionChange, handleCleanup,
  formatDate, getTicketPriorityLabel, getTicketPriorityType, getTicketStatusLabel, getTicketStatusType
} = useAdminTicketList()

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
```
