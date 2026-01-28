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
        <!-- Active Glow Background -->
        <div v-if="modelValue === cat.id" class="pill-glow"></div>
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
  padding: 4px 4px 12px; /* Extra bottom padding for shadow/glow */
}

/* Premium Pill */
.category-pill {
  position: relative;
  flex-shrink: 0;
  padding: 8px 20px;
  border-radius: 99px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  font-size: 14px;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
}

.category-pill.active {
  color: #fff;
  border-color: rgba(255,255,255,0.2);
  transform: translateY(-1px) scale(1.02);
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.pill-text {
  position: relative;
  z-index: 2;
}

.pill-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--gradient-primary);
  opacity: 0.8;
  z-index: 1;
}

/* Add shimmer to active pill */
.pill-glow::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%; right: -50%; bottom: -50%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%) rotate(45deg); }
  20%, 100% { transform: translateX(100%) rotate(45deg); }
}
</style>

