<template>
  <div class="category-scroll-wrapper">
    <div class="category-scroll no-scrollbar" ref="scrollContainer">
      <!-- Loading Skeleton -->
      <template v-if="loading">
        <div class="category-pill skeleton-pill" v-for="i in 5" :key="`skel-${i}`"></div>
      </template>

      <!-- Real Content -->
      <template v-else>
        <div 
            v-for="cat in categories" 
            :key="cat.id" 
            class="category-pill"
            :class="{ 
            active: modelValue === cat.id,
            'active-glow-border': modelValue === cat.id
            }"
            @click="handleCategoryClick(cat.id)"
        >
            <span class="pill-text">{{ cat.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import type { GoodsCategory } from '@/types/api'

const props = defineProps<{
  categories: GoodsCategory[]
  modelValue: string | number
  loading?: boolean
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
  top: calc(env(safe-area-inset-top) + 60px); /* Header + Safe Area */
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
  font-weight: 600;
  /* Background handled by .active-glow-border::after via var */
  --glow-inner-bg: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);

  box-shadow: 0 4px 12px var(--color-brand-glow);
  /* Removing background/border as animation handles it */
  background: transparent;
  border-color: transparent;
}

.pill-text {
  position: relative;
  z-index: 2;
}

.skeleton-pill {
    width: 60px;
    height: 36px; /* Matches padding + font size approx */
    background: rgba(255, 255, 255, 0.05);
    border-color: transparent;
    animation: shimmer 1.5s infinite;
    padding: 0; /* Reset padding for skeleton */
    background: linear-gradient(90deg, 
        rgba(255,255,255,0.02) 25%, 
        rgba(255,255,255,0.08) 50%, 
        rgba(255,255,255,0.02) 75%
    );
    background-size: 200% 100%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
