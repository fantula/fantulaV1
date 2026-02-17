<template>
  <AdminModuleLayout 
    title="帮助中心"
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
  { name: 'faq', label: '常见问题', route: adminRoute('help-center/faq') },
  { name: 'faq-categories', label: 'FAQ分类', route: adminRoute('help-center/faq-categories') },
  { name: 'articles', label: '文章管理', route: adminRoute('help-center/articles') },
  { name: 'article-categories', label: '文章分类', route: adminRoute('help-center/article-categories') },
]
</script>
