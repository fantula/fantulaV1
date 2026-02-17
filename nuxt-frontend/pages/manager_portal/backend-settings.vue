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
import { adminRoute } from '@/config/admin-routes'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const tabs = [
  { name: 'info', label: '系统状态', route: adminRoute('backend-settings') },
  { name: 'contact', label: '联系方式', route: adminRoute('backend-settings/contact') },
  { name: 'scheduler', label: '定时任务', route: adminRoute('backend-settings/scheduler') },
  { name: 'storage', label: '存储测试', route: adminRoute('backend-settings/storage') },
  { name: 'notification', label: '邮件通知', route: adminRoute('backend-settings/notification') }
]
</script>
