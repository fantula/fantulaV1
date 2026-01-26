<template>
  <GlobalLoader :loading="isLoading && loadingVariant !== 'section'" :variant="loadingVariant" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// 引入 Element Plus 暗黑模式变量 (供后台管理使用)
import 'element-plus/theme-chalk/dark/css-vars.css'
// GlobalLoader is auto-imported

// 使用全局 Loading 状态管理
const { isLoading, loadingVariant, startLoading, stopLoading } = usePageLoading()
const nuxtApp = useNuxtApp()

onMounted(() => {
  // 1. 设置初始 loading 状态
  startLoading('initial')

  // 2. 最小展示时间 (防止加载太快导致闪烁)
  const minTimePromise = new Promise(resolve => setTimeout(resolve, 800))
  
  // 3. 实际资源加载完成
  const loadPromise = new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve(true)
    } else {
      window.addEventListener('load', () => resolve(true))
    }
  })

  // 4. 等待两者都完成
  Promise.all([loadPromise, minTimePromise]).then(() => {
    stopLoading()
  })

  // 5. 安全兜底
  setTimeout(() => {
    isLoading.value = false
  }, 5000)
})

// 监听页面导航完成事件，关闭 Loading
nuxtApp.hook('page:finish', () => {
  // 只有在导航模式下才自动关闭，初始模式由 onMounted 控制 (更精确)
  if (loadingVariant.value === 'navigation') {
    stopLoading()
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
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>