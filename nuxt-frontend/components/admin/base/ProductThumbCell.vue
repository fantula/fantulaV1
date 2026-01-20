<template>
  <div class="product-thumb-cell">
    <el-image :src="image" class="thumb" fit="cover">
      <template #error>
        <div class="no-img">{{ errorText }}</div>
      </template>
    </el-image>
    <div class="info">
      <div class="name" :title="name">{{ name }}</div>
      <div class="id" v-if="id">ID: {{ truncateId ? id.slice(0, 8) + '...' : id }}</div>
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  image?: string
  name: string
  id?: string
  truncateId?: boolean
  errorText?: string
}>(), {
  truncateId: true,
  errorText: '无图'
})
</script>

<style scoped>
.product-thumb-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.thumb {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid #eee;
  flex-shrink: 0;
}

.no-img {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.name {
  font-weight: 500;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.id {
  font-size: 11px;
  color: #999;
}

/* Dark mode support */
:root.dark .thumb {
  border-color: rgba(255, 255, 255, 0.1);
}

:root.dark .no-img {
  background: #1e293b;
  color: #64748b;
}

:root.dark .id {
  color: #94a3b8;
}
</style>
