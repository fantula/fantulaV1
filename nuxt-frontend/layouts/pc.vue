<template>
  <div class="app-wrapper">
    <AppHeader />
    <!-- 页面内容 - flex:1 确保 footer 始终在底部 -->
    <div class="page-slot-wrapper">
      <NuxtErrorBoundary>
        <slot />
        <template #error="{ error, clearError }">
          <div class="layout-error-state">
            <p class="layout-error-icon">⚠️</p>
            <h3 class="layout-error-title">页面加载失败</h3>
            <p class="layout-error-msg">{{ error?.message || '未知错误' }}</p>
            <button class="layout-error-btn" @click="clearError()">重新加载</button>
          </div>
        </template>
      </NuxtErrorBoundary>
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
  min-height: calc(100vh - 60px); /* 防止 out-in 过渡时页面区域瞬间坍缩导致footer跳动 */
  display: flex;
  flex-direction: column;
  /* ⚠️ 不要加 overflow: hidden — 会裁掉高度超过视口的页面内容（首页、商品列表），
     导致浏览器级别的纵向滚动消失。Logo闪烁用缩小 translateX 解决。 */
}

/* slot 内的直接子元素也参与 flex 布局 */
.page-slot-wrapper :deep(> *) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Logic Guard: Prevent PC layout from painting on Mobile devices (SSR Flash Protection) */
@media (max-width: 768px) {
  .app-wrapper {
    display: none !important;
  }
}

/* Global Error Boundary UI */
.layout-error-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 60px 20px;
  color: #94A3B8;
}
.layout-error-icon { font-size: 48px; margin: 0; }
.layout-error-title { font-size: 18px; font-weight: 600; color: #E2E8F0; margin: 0; }
.layout-error-msg { font-size: 14px; color: #64748B; margin: 0; max-width: 400px; text-align: center; }
.layout-error-btn {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 100px;
  color: #3B82F6;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.layout-error-btn:hover { background: rgba(59, 130, 246, 0.1); }
</style>
