<template>
  <!-- 透传：子页面各自声明 layout: 'profile-pc'，SideNavigation 由布局统一渲染 -->
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // 子页面自行决定布局，此包裹文件不介入
})
</script>