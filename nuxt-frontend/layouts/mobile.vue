<template>
  <div class="mobile-layout">
    <!-- Main Content Area -->
    <main class="mobile-content">
      <slot />
    </main>

    <!-- Bottom Navigation -->
    <MobileTabBar />
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/mobile.css'
import MobileTabBar from '@/components/mobile/MobileTabBar.vue'
import { onMounted } from 'vue'

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
  background: #0F172A; /* Global Dark Background */
  display: flex;
  flex-direction: column;
}

.mobile-content {
  flex: 1;
  padding-bottom: calc(60px + env(safe-area-inset-bottom)); /* Add space for fixed tab bar */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scroll on iOS */
}
</style>
