<template>
  <div class="mobile-profile-layout">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
// This component acts as a wrapper for the /mobile/profile/* routes.
// It allows pages/mobile/profile/index.vue (The Dashboard) and other children to render.
</script>

<style scoped>
.desktop-only-warning {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 14px; 
  color: #666; 
  padding: 20px;
}
</style>
