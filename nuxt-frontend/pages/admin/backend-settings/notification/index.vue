<template>
  <div class="notification-list-page">
    <div class="page-header">
      <h3>邮件通知配置</h3>
      <el-button :icon="Refresh" circle @click="() => refresh()" :loading="pending" />
    </div>

    <AdminDataTable
      :data="templates"
      :loading="pending"
      :total="templates.length"
      :show-pagination="false"
    >
      <el-table-column prop="name" label="通知名称" min-width="150" />
      <el-table-column prop="event_type" label="事件类型" min-width="150">
        <template #default="{ row }">
          <el-tag>{{ row.event_type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="启用状态" width="100" align="center">
        <template #default="{ row }">
          <el-switch
            v-model="row.is_enabled"
            :loading="row.updating"
            @change="handleToggle(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template #default="{ row }">
          <el-button 
            type="primary" 
            link 
            @click="router.push(`/admin/backend-settings/notification/template/${row.id}`)"
          >
            编辑模板
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>

    <div v-if="true" class="mt-4 p-4 bg-gray-100 rounded text-xs font-mono">
      <p>DEBUG INFO:</p>
      <pre>{{ JSON.stringify({ pending, error, res }, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const router = useRouter()
const { data: res, pending, refresh, error } = await useFetch('/api/admin/system/notifications/templates')

const templates = computed(() => res.value?.data || [])

const handleToggle = async (row: any) => {
  row.updating = true
  try {
    const { error } = await useFetch('/api/admin/system/notifications/templates', {
      method: 'POST',
      body: {
        id: row.id,
        event_type: row.event_type, // Required by validation
        is_enabled: row.is_enabled
      }
    })
    
    if (error.value) {
      ElMessage.error(error.value.statusMessage || '更新失败')
      row.is_enabled = !row.is_enabled // revert
    } else {
      ElMessage.success('更新成功')
    }
  } catch (e) {
    ElMessage.error('更新失败')
    row.is_enabled = !row.is_enabled
  } finally {
    row.updating = false
  }
}
</script>

<style scoped>
.notification-list-page {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.page-header h3 {
  margin: 0;
}
</style>
