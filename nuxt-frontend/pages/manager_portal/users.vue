<template>
  <AdminModuleLayout
    title="用户管理"
    :tabs="tabs"
    default-tab="accounts"
    :hide-tabs-on="['/post', '/edit']"
  >
    <NuxtPage :keepalive="{ include: ['UserAccounts', 'UserDepartments'] }" />
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
  { name: 'accounts', label: '用户管理', route: adminRoute('users/accounts') },
  { name: 'departments', label: '部门管理', route: adminRoute('users/departments') },
]
</script>
