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
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'virtual', label: '虚拟充值', route: '/_mgmt_9Xfa3/cdk/virtual' },
  { name: 'accounts', label: '账号合租', route: '/_mgmt_9Xfa3/cdk/accounts' },
  { name: 'keys', label: '激活码', route: '/_mgmt_9Xfa3/cdk/keys' },
  { name: 'cdks', label: 'CDK 管理', route: '/_mgmt_9Xfa3/cdk/cdks' }
]
</script>
