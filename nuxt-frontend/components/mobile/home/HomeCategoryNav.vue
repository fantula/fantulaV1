<template>
  <div class="category-scroll-wrapper">
    <div class="category-scroll no-scrollbar" ref="scrollContainer">
      <div 
        v-for="cat in categories" 
        :key="cat.id" 
        class="category-pill"
        :class="{ active: modelValue === cat.id }"
        @click="handleCategoryClick(cat.id)"
      >
        <span class="pill-text">{{ cat.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import type { GoodsCategory } from '@/types/api'

const props = defineProps<{
  categories: GoodsCategory[]
  modelValue: string | number
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const scrollContainer = ref<HTMLElement | null>(null)

const handleCategoryClick = (id: string | number) => {
  if (props.modelValue === id) return
  emit('update:modelValue', id)
  emit('change', id)
  centerActiveCategory()
}

const centerActiveCategory = () => {
    nextTick(() => {
        if (!scrollContainer.value) return
        
        const activeEl = scrollContainer.value.querySelector('.category-pill.active') as HTMLElement
        if (activeEl) {
            const container = scrollContainer.value
            const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2)
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
        }
    })
}

watch(() => props.modelValue, () => {
  centerActiveCategory()
})
</script>

<style scoped>
.category-scroll-wrapper {
  padding: 0 16px;
  position: sticky;
  top: 60px; /* Below Header */
  z-index: 90;
  margin-bottom: 16px;
}

.category-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px 4px 12px; /* Extra bottom padding for shadow */
}

/* Simplified Pill - High End, No "Flash" */
.category-pill {
  position: relative;
  flex-shrink: 0;
  padding: 8px 20px;
  border-radius: 99px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  font-size: 14px;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.category-pill:active { 
    transform: scale(0.96); 
}

.category-pill.active {
  color: #fff;
  background: var(--primary-color); /* Solid Primary Color */
  border-color: transparent;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); /* Clean shadow */
}

.pill-text {
  position: relative;
  z-index: 2;
}
</style>

