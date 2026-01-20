<template>
  <div class="category-pills-scroll">
    <div 
      class="pill-item" 
      :class="{ active: modelValue === '' }"
      @click="$emit('update:modelValue', '')"
    >
      <span>{{ allLabel }}</span>
      <span class="count" v-if="showTotalCount">{{ totalCount }}</span>
    </div>
    <div 
      v-for="item in items" 
      :key="item[valueKey]" 
      class="pill-item"
      :class="{ active: modelValue === item[valueKey] }"
      @click="$emit('update:modelValue', item[valueKey])"
    >
      <span>{{ item[labelKey] }}</span>
      <span class="count" v-if="item[countKey]">{{ item[countKey] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
  items: any[]
  labelKey?: string
  valueKey?: string
  countKey?: string
  allLabel?: string
  totalCount?: number
  showTotalCount?: boolean
}>(), {
  labelKey: 'name',
  valueKey: 'id',
  countKey: 'count',
  allLabel: '全部',
  showTotalCount: true
})

defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()
</script>

<style scoped>
.category-pills-scroll {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 20px;
  margin-bottom: 5px;
}

.pill-item {
  background: var(--el-bg-color-overlay, #fff);
  border: 1px solid var(--el-border-color);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  white-space: nowrap;
}

.pill-item:hover {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}

.pill-item.active {
  background: var(--el-color-primary);
  color: #fff;
  border-color: var(--el-color-primary);
  box-shadow: 0 4px 10px rgba(64, 158, 255, 0.25);
}

.pill-item .count {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
}

.pill-item.active .count {
  background: rgba(255, 255, 255, 0.2);
}
</style>
