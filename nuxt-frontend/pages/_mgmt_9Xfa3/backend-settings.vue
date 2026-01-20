<template>
  <AdminModuleLayout 
    title="后台设定"
    :tabs="tabs"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'storage', label: '对象存储管理', route: '/_mgmt_9Xfa3/backend-settings/storage' },
  { name: 'scheduler', label: '定时任务管理', route: '/_mgmt_9Xfa3/backend-settings/scheduler' }
]
</script>
