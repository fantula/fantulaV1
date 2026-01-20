<template>
  <AdminModuleLayout 
    title="媒体中心"
    :tabs="tabs"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'images', label: '图片库', route: '/_mgmt_9Xfa3/media/images' },
  { name: 'banners', label: '轮播图', route: '/_mgmt_9Xfa3/media/banners' },
]
</script>
