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
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'accounts', label: '用户管理', route: '/_mgmt_9Xfa3/users/accounts' },
  { name: 'departments', label: '部门管理', route: '/_mgmt_9Xfa3/users/departments' },
]
</script>
