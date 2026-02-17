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
import { adminRoute } from '@/config/admin-routes'

const tabs = [
  { name: 'virtual', label: '虚拟充值', route: adminRoute('cdk/virtual') },
  { name: 'accounts', label: '账号合租', route: adminRoute('cdk/accounts') },
  { name: 'keys', label: '激活码', route: adminRoute('cdk/keys') },
  { name: 'cdks', label: 'CDK 管理', route: adminRoute('cdk/cdks') },
  { name: 'channel-recognition', label: '频道识别', route: adminRoute('cdk/channel-recognition') }
]
</script>
