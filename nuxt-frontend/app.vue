<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// 引入 Element Plus 暗黑模式变量 (供后台管理使用)
import 'element-plus/theme-chalk/dark/css-vars.css'
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'PingFang SC', 'Noto Sans SC', sans-serif;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>