<template>
  <div class="admin-base-page">
    <div class="admin-page-header" v-if="title || $slots.header">
       <slot name="header">
         <h2 class="page-title">{{ title }}</h2>
       </slot>
    </div>
    
    <div class="admin-page-content">
       <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.admin-base-page {
  width: 100%;
  min-height: 100%;
}

.admin-page-header {
  margin-bottom: 24px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  color: var(--el-text-color-primary);
  font-weight: 600;
}

.admin-page-content {
  position: relative;
}
</style>
