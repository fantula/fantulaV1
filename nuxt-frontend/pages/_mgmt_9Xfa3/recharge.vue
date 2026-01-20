<template>
  <AdminModuleLayout 
    title="充值管理"
    :tabs="tabs"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'tiers', label: '充值档位', route: '/_mgmt_9Xfa3/recharge/tiers' },
  { name: 'orders', label: '充值记录', route: '/_mgmt_9Xfa3/recharge/orders' }
]
</script>
