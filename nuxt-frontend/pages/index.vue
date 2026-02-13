<template>
  <div class="root-loading">
    <!-- Middleware handles redirection, this is just a brief fallback -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<style scoped>
.root-loading {
  min-height: 100vh;
  background: #0f172a;
}
</style>
