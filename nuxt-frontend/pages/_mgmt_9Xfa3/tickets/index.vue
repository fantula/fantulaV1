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
        <el-table :data="list" v-loading="loading" border>
           <el-table-column label="工单ID" prop="id" width="100">
             <template #default="{ row }">
               <span class="font-mono text-xs">...{{ row.id.split('-').pop() }}</span>
             </template>
           </el-table-column>
           <el-table-column label="标题" prop="title" min-width="150" show-overflow-tooltip />
           <el-table-column label="用户" width="180">
              <template #default="{ row }">
                 <div>{{ row.profiles?.email || '未知用户' }}</div>
                 <div class="text-xs text-gray-400 font-mono">{{ row.user_id }}</div>
              </template>
           </el-table-column>
           <el-table-column label="关联订单" width="160">
              <template #default="{ row }">
                 <router-link :to="`/_mgmt_9Xfa3/orders/detail/${row.order_id}`" class="text-blue-500 hover:underline font-mono">
                    {{ row.orders?.order_no || row.order_id }}
                 </router-link>
              </template>
           </el-table-column>
           <el-table-column label="优先级" width="100">
              <template #default="{ row }">
                 <el-tag :type="getPriorityType(row.priority)">{{ getPriorityLabel(row.priority) }}</el-tag>
              </template>
           </el-table-column>
           <el-table-column label="状态" width="100">
              <template #default="{ row }">
                 <el-tag :type="row.status === 'processing' ? 'primary' : 'success'">
                    {{ row.status === 'processing' ? '处理中' : '已解决' }}
                 </el-tag>
              </template>
           </el-table-column>
           <el-table-column label="创建时间" width="170">
              <template #default="{ row }">
                 {{ formatDate(row.created_at) }}
              </template>
           </el-table-column>
           <el-table-column label="操作" width="120" fixed="right">
              <template #default="{ row }">
                 <el-button type="primary" size="small" @click="openChat(row)">
                    处理/回复
                 </el-button>
              </template>
           </el-table-column>
        </el-table>

        <div class="flex justify-end mt-4">
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

const {
  loading, list, pagination, currentTab,
  loadList, handlePageChange, handleTabChange, handleCleanup,
  formatDate
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

const getPriorityType = (p: string) => {
   if (p === 'low') return 'info'
   if (p === 'medium') return 'warning'
   return 'danger'
}
const getPriorityLabel = (p: string) => {
   if (p === 'low') return '一般'
   if (p === 'medium') return '重要'
   if (p === 'high') return '紧急'
   return p
}

onMounted(() => {
   loadList()
})
</script>
