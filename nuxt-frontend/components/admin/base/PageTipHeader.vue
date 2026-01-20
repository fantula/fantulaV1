<template>
  <div class="page-tip-header">
    <el-alert 
      :title="title" 
      :type="type" 
      :show-icon="showIcon" 
      :closable="closable" 
      center 
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  type?: 'success' | 'warning' | 'info' | 'error'
  showIcon?: boolean
  closable?: boolean
}>(), {
  type: 'info',
  showIcon: true,
  closable: false
})
</script>

<style scoped>
.page-tip-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
