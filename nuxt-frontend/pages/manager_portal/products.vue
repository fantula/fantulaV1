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
import { adminRoute } from '@/config/admin-routes'

const tabs = [
  { name: 'list', label: '商品列表', route: adminRoute('products') },
  { name: 'categories', label: '分类管理', route: adminRoute('products/categories') },
  { name: 'shared-sku', label: '共享规格库', route: adminRoute('products/shared-sku') },
  { name: 'skus', label: 'SKU 管理', route: adminRoute('products/skus') }
]
</script>
