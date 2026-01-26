<template>
  <div class="app-wrapper">
    <AppHeader />
    <!-- 页面内容 -->
    <slot />
    <AppFooter />
    <!-- 开发工具组件 -->
    <DevLoginTool />
    <!-- 粒子背景 -->
    <ClientOnly>
      <ParticleBackground />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/pc.css'
import AppHeader from '@/components/pc/AppHeader.vue'
import AppFooter from '@/components/pc/AppFooter.vue'
import DevLoginTool from '@/components/pc/DevLoginTool.vue'
import ParticleBackground from '@/components/pc/ParticleBackground.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 通用页面布局样式 - 确保页脚始终在底部 */
:deep(.page-layout), 
:deep(.home-page), 
:deep(.profile-page), 
:deep(.about-page), 
:deep(.goods-page), 
:deep(.faq-page), 
:deep(.policy-page), 
:deep(.login-page),
:deep(.community-page),
:deep(.service-page) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 页面主内容区域 */
:deep(.page-content), 
:deep(.profile-container),
:deep(.about-container),
:deep(.goods-container),
:deep(.faq-container),
:deep(.policy-container),
:deep(.login-container),
:deep(.community-container),
:deep(.service-container) {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
