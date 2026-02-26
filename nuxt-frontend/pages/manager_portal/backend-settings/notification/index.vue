<template>
  <div class="notification-list-page">
    <div class="page-header">
      <h3>邮件通知配置</h3>
      <el-button :icon="Refresh" circle @click="fetchTemplates" :loading="pending" />
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
            @click="router.push(adminRoute(`backend-settings/notification/template/${row.id}`))"
          >
            编辑模板
          </el-button>
        </template>
      </el-table-column>
    </AdminDataTable>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { adminRoute } from '@/config/admin-routes'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const router = useRouter()
const adminStore = useAdminStore()
const pending = ref(false)
const templates = ref<any[]>([])

const getAuthToken = (): string | null => adminStore.accessToken

const fetchTemplates = async () => {
  pending.value = true
  try {
    const token = getAuthToken()
    const res = await $fetch<{ data: any[] }>('/api/admin/system/notifications/templates', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    templates.value = res?.data || []
  } catch (e: any) {
    ElMessage.error('加载模板列表失败')
    if (import.meta.dev) console.error('[NotificationList] fetch error:', e)
  } finally {
    pending.value = false
  }
}

const handleToggle = async (row: any) => {
  row.updating = true
  try {
    const token = getAuthToken()
    await $fetch('/api/admin/system/notifications/templates', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: {
        id: row.id,
        event_type: row.event_type,
        is_enabled: row.is_enabled
      }
    })
    ElMessage.success('更新成功')
  } catch (e: any) {
    ElMessage.error(e.data?.statusMessage || '更新失败')
    row.is_enabled = !row.is_enabled // revert
  } finally {
    row.updating = false
  }
}

onMounted(() => fetchTemplates())
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
