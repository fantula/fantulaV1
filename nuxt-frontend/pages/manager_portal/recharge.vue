<template>
  <AdminModuleLayout 
    title="充值管理"
    :tabs="tabs"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'tiers', label: '充值档位', route: '/manager_portal/recharge/tiers' },
  { name: 'orders', label: '充值记录', route: '/manager_portal/recharge/orders' }
]
</script>
