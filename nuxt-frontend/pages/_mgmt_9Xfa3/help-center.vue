<template>
  <AdminModuleLayout 
    title="帮助中心"
    :tabs="tabs"
  >
    <NuxtPage />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'faq', label: '常见问题', route: '/_mgmt_9Xfa3/help-center/faq' },
  { name: 'faq-categories', label: 'FAQ分类', route: '/_mgmt_9Xfa3/help-center/faq-categories' },
  { name: 'articles', label: '文章管理', route: '/_mgmt_9Xfa3/help-center/articles' },
  { name: 'article-categories', label: '文章分类', route: '/_mgmt_9Xfa3/help-center/article-categories' },
]
</script>
