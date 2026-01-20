<template>
  <section class="category-nav">
    <div class="category-outer">
      <div class="category-scroll" ref="scrollContainer">
        <div 
          v-for="cat in props.categories"
          :key="cat.id"
          class="category-item"
          :class="{ active: props.activeId === cat.id }"
          @click="handleSelect($event, cat.id)"
        >
          <span class="cat-label">{{ cat.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { GoodsCategory } from '@/types/api'

// 接收父组件传递的分类数据和选中 ID
const props = defineProps<{
  categories: GoodsCategory[]
  activeId: string | number
}>()

const emit = defineEmits<{
  change: [categoryId: string | number]
}>()

const scrollContainer = ref<HTMLElement | null>(null)

// 当 activeId 变化时，自动居中选中项
watch(() => props.activeId, () => {
  nextTick(() => {
    const activeItem = scrollContainer.value?.querySelector('.category-item.active') as HTMLElement
    if (activeItem) {
      centerActiveItem(activeItem)
    }
  })
}, { immediate: true })

const centerActiveItem = (target: HTMLElement) => {
  const container = scrollContainer.value
  if (target && container) {
    const targetOffsetLeft = target.offsetLeft
    const targetWidth = target.offsetWidth
    const containerWidth = container.clientWidth
    
    // 计算目标位置，使项居中
    let scrollLeft = targetOffsetLeft - (containerWidth / 2) + (targetWidth / 2)
    
    // 边界处理
    const maxScroll = container.scrollWidth - containerWidth
    if (scrollLeft < 0) scrollLeft = 0
    if (scrollLeft > maxScroll) scrollLeft = maxScroll

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }
}

const handleSelect = (e: MouseEvent, id: string | number) => {
  emit('change', id)
  const target = e.currentTarget as HTMLElement
  centerActiveItem(target)
}
</script>

<style scoped>
.category-nav {
  padding: 0;
  margin-top: 25px;
  margin-bottom: 20px;
  background: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.category-outer {
  width: 780px;
  max-width: 95%;
  overflow: hidden;
}

.category-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 10px 10px;
  scroll-behavior: smooth;
  position: relative;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-item {
  flex-shrink: 0;
  width: 140px;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 18px;
  user-select: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.cat-label {
  position: relative;
  display: inline-block;
  z-index: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

/* 适配移动端 (虽然已移除适配需求，但保留基础响应式防止布局崩坏) */
@media (max-width: 768px) {
  .category-outer {
    width: 100%;
  }
  .category-scroll {
    padding: 10px 20px;
    /* 允许横滚 */
    justify-content: flex-start; 
  }
}
</style>

