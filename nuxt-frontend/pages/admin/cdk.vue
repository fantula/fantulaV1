<template>
  <AdminModuleLayout 
    title="CDK 管理" 
    :tabs="tabs"
    default-tab="virtual"
    :hide-tabs-on="['/post', '/edit']"
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
  { name: 'virtual', label: '虚拟充值', route: '/admin/cdk/virtual' },
  { name: 'accounts', label: '账号合租', route: '/admin/cdk/accounts' },
  { name: 'keys', label: '激活码', route: '/admin/cdk/keys' },
  { name: 'cdks', label: 'CDK 管理', route: '/admin/cdk/cdks' },
  { name: 'channel-recognition', label: '频道识别', route: '/admin/cdk/channel-recognition' }
]
</script>
