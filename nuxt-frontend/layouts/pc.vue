<template>
  <div class="app-wrapper">
    <AppHeader />
    <!-- 页面内容 - flex:1 确保 footer 始终在底部 -->
    <div class="page-slot-wrapper">
      <slot />
    </div>
    <AppFooter />
    <!-- 开发工具组件（仅开发环境） -->
    <DevLoginTool v-if="isDev" />
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

// 只在开发环境显示开发工具
const isDev = import.meta.dev
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 通用页面填充 - 确保页脚始终在底部 */
.page-slot-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* slot 内的直接子元素也参与 flex 布局 */
.page-slot-wrapper :deep(> *) {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
