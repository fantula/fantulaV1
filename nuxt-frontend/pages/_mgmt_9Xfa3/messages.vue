<template>
  <AdminModuleLayout 
    title="消息管理"
    :tabs="tabs"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'send', label: '消息发送', route: '/_mgmt_9Xfa3/messages/batch-send' },
  { name: 'settings', label: '客户消息设定', route: '/_mgmt_9Xfa3/messages/settings' }
]
</script>
