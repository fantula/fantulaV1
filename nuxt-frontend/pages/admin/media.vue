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

const tabs = [
  { name: 'images', label: '图片库', route: '/admin/media/images' },
  { name: 'banners', label: '轮播图', route: '/admin/media/banners' },
]
</script>
