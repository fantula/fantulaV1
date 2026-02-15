<template>
  <AdminModuleLayout 
    title="系统设置" 
    :tabs="tabs" 
    default-tab="info"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const tabs = [
  { name: 'info', label: '系统状态', route: '/manager_portal/backend-settings' },
  { name: 'contact', label: '联系方式', route: '/manager_portal/backend-settings/contact' },
  { name: 'scheduler', label: '定时任务', route: '/manager_portal/backend-settings/scheduler' },
  { name: 'storage', label: '存储测试', route: '/manager_portal/backend-settings/storage' },
  { name: 'notification', label: '邮件通知', route: '/manager_portal/backend-settings/notification' }
]
</script>
