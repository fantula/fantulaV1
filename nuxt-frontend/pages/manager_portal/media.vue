<template>
  <AdminModuleLayout 
    title="媒体中心"
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
import { adminRoute } from '@/config/admin-routes'

const tabs = [
  { name: 'images', label: '图片库', route: adminRoute('media/images') },
  { name: 'banners', label: '轮播图', route: adminRoute('media/banners') },
]
</script>
