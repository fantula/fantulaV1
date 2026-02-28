<template>
  <div class="mobile-layout">
    <!-- CSS Background Fallback -->
    <div class="mobile-bg-layer"></div>

    <!-- Main Content Area -->
    <main class="mobile-content">
      <NuxtErrorBoundary>
        <slot />
        <template #error="{ error, clearError }">
          <div class="layout-error-state">
            <p class="layout-error-icon">⚠️</p>
            <p class="layout-error-title">页面加载失败</p>
            <p class="layout-error-msg">{{ error?.message || '未知错误' }}</p>
            <button class="layout-error-btn" @click="clearError()">重新加载</button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </main>

    <!-- Bottom Navigation -->
    <MobileTabBar v-if="!route.meta.hideTabBar" />

    <!-- Global Toast & Login Sheet (Client Only) -->
    <ClientOnly>
      <MobileToast />
      <MobileLoginSheet
        :visible="modalStore.showLogin"
        @close="modalStore.closeLogin()"
      />
    </ClientOnly>

    <!-- 移除粒子背景：移动端性能优先，不需要装饰性背景 -->
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/mobile.css'
import MobileTabBar from '@/components/mobile/MobileTabBar.vue'
import MobileToast from '@/components/mobile/base/MobileToast.vue'
import MobileLoginSheet from '@/components/mobile/auth/MobileLoginSheet.vue'
import { useRoute } from 'vue-router'
import { useModalStore } from '@/stores/client/modal'

const modalStore = useModalStore()

const route = useRoute()

// Set mobile-specific meta
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
    { name: 'theme-color', content: '#0F172A' }
  ],
  bodyAttrs: {
    class: 'mobile-body' // Hook for global CSS if needed
  }
})
</script>

<style scoped>
.mobile-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background: #020617; REMOVED to allow ParticleBackground to show */
  background: transparent; 
}

.mobile-bg-layer {
  /* Deprecated: Replaced by ParticleBackground. 
     Keeping as a subtle gradient overlay if needed, or remove. 
     For now, let's make it very subtle or invisible to let particles shine. */
  display: none; 
}

.mobile-content {
  flex: 1;
  padding-bottom: calc(60px + env(safe-area-inset-bottom));
  overflow: hidden; /* Pages manage their own scroll containers */
  position: relative;
  z-index: 1;
}

/* Global Error Boundary UI */
.layout-error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 24px;
  color: #94A3B8;
  min-height: 60vh;
}
.layout-error-icon { font-size: 48px; margin: 0; }
.layout-error-title { font-size: 16px; font-weight: 600; color: #E2E8F0; margin: 0; }
.layout-error-msg { font-size: 13px; color: #64748B; margin: 0; text-align: center; }
.layout-error-btn {
  margin-top: 8px;
  padding: 10px 28px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 100px;
  color: #60A5FA;
  font-size: 14px;
  cursor: pointer;
}
</style>
