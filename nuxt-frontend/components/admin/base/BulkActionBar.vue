<template>
  <div class="bulk-action-bar" v-if="count > 0">
    <span class="selected-text">已选 {{ count }} 项</span>
    <slot>
      <el-button type="danger" link @click="$emit('delete')">批量删除</el-button>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: number
}>()

defineEmits<{
  (e: 'delete'): void
}>()
</script>

<style scoped>
.bulk-action-bar {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 15px;
  background: #fef0f0;
  border-radius: 4px;
  margin-bottom: 10px;
}

.selected-text {
  font-size: 13px;
  color: #f56c6c;
}

/* Dark mode support */
:root.dark .bulk-action-bar {
  background: rgba(245, 108, 108, 0.1);
}
</style>
