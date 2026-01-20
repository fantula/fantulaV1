<template>
  <div class="app-wrapper">
    <AppHeader v-if="!isAdmin" />
    <!-- 页面内容 -->
    <NuxtPage />
    <AppFooter v-if="!isAdmin" />
    <!-- 开发工具组件 -->
    <DevLoginTool v-if="!isAdmin" />
    <!-- 粒子背景 -->
    <ClientOnly>
      <ParticleBackground v-if="!isAdmin" />
    </ClientOnly>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import DevLoginTool from '@/components/DevLoginTool.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
// 应用初始化时恢复登录状态
const userStore = useUserStore()
const route = useRoute()

// 判断是否为后台管理页面
const isAdmin = computed(() => route.path.startsWith('/_mgmt_9Xfa3'))

// 引入 Element Plus 暗黑模式变量 (供后台管理使用)
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入新主题预览（如果不想要，注释掉下面这行即可恢复）
// import '@/assets/theme-glass.css'
// import '@/assets/theme-dark.css'
// import '@/assets/theme-dark-orange.css'
// import '@/assets/theme-blue-orange.css'
// import '@/assets/theme-titanium.css'
// import '@/assets/theme-cyber.css'
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

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 通用页面布局样式 - 确保页脚始终在底部 */
.page-layout, 
.home-page, 
.profile-page, 
.about-page, 
.goods-page, 
.faq-page, 
.policy-page, 
.login-page,
.community-page,
.service-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 页面主内容区域 */
.page-content, 
.profile-container,
.about-container,
.goods-container,
.faq-container,
.policy-container,
.login-container,
.community-container,
.service-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style> 