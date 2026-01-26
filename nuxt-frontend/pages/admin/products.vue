<template>
  <AdminModuleLayout 
    title="商品管理" 
    :tabs="tabs"
    default-tab="list"
    :hide-tabs-on="['/post', '/products/sku/']"
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
  { name: 'list', label: '商品列表', route: '/admin/products' },
  { name: 'categories', label: '分类管理', route: '/admin/products/categories' },
  { name: 'shared-sku', label: '共享规格库', route: '/admin/products/shared-sku' },
  { name: 'skus', label: 'SKU 管理', route: '/admin/products/skus' }
]
</script>
