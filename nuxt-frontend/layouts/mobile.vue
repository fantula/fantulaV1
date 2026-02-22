<template>
  <div class="mobile-layout">
    <!-- CSS Background Fallback -->
    <div class="mobile-bg-layer"></div>

    <!-- Main Content Area -->
    <main class="mobile-content">
      <slot />
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
</style>
