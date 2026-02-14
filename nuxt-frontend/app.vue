<template>
  <!-- 全局 Logo 动画 (仅PC端首次访问) -->
  <GlobalLoader v-if="showGlobalLoader" :loading="showGlobalLoader" @finish="handleLoaderFinish" />

  <!-- 顶部进度条 (页面导航时的加载指示) -->
  <NuxtLoadingIndicator color="#3B82F6" :height="3" :throttle="200" />

  <!-- 全局加载指示器（API请求等操作时显示） -->
  <GlobalLoading />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import 'element-plus/theme-chalk/dark/css-vars.css'

const GlobalLoader = defineAsyncComponent(() => import('@/components/shared/GlobalLoader.vue'))

const route = useRoute()
const showGlobalLoader = ref(false)

// 改进的设备检测函数
const isPC = () => {
  if (process.server) return false

  // 1. 检查屏幕宽度
  const isLargeScreen = window.innerWidth >= 768

  // 2. 检查UserAgent（排除移动设备）
  const ua = navigator.userAgent
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

  // 3. 综合判断：大屏幕 且 不是移动设备UA
  return isLargeScreen && !isMobileUA
}

onMounted(() => {
  // 只在PC端显示动画
  if (!isPC()) {
    return
  }

  // 检查当前路由是否为PC路由
  const isPCRoute = route.path.startsWith('/pc') || route.path === '/'

  if (isPCRoute) {
    // 使用localStorage替代sessionStorage（更持久）
    // 但使用日期作为key，每天首次访问都显示
    const today = new Date().toDateString()
    const lastVisit = localStorage.getItem('fantula_last_logo_visit')

    if (lastVisit !== today) {
      showGlobalLoader.value = true
      localStorage.setItem('fantula_last_logo_visit', today)
    }
  }
})

const handleLoaderFinish = () => {
  // 等待动画完整播放后关闭
  setTimeout(() => {
    showGlobalLoader.value = false
  }, 4000)
}
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