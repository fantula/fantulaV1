<template>
  <!-- 顶部进度条 (页面导航时的加载指示) -->
  <NuxtLoadingIndicator color="#3B82F6" :height="3" :throttle="200" />

  <!-- 全局加载指示器（API请求等操作时显示） -->
  <GlobalLoading />

  <NuxtLayout>
    <NuxtPage :keepalive="{ max: 10 }" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { isPC } from '@/utils/device'
import { mobileRoutes, pcRoutes } from '@/config/client-routes'

const route = useRoute()

onMounted(() => {
  // --- Client-Side Device Guard (Safety Net) ---
  const _isPC = isPC()
  const currentPath = route.path

  // Mobile User on PC Route -> Force Mobile
  if (!_isPC && (currentPath.startsWith('/pc') || currentPath === '/')) {
    navigateTo(mobileRoutes.home(), { external: true })
    return
  }

  // PC User on Mobile Route -> Force PC
  if (_isPC && currentPath.startsWith('/mobile')) {
    navigateTo(pcRoutes.home(), { external: true })
    return
  }
})
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
  background-color: #020617; /* Match loader background to prevent white flash */
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>