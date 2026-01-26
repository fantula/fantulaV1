<template>
  <div class="mobile-category-page">
    <header class="mobile-header">
      <div class="title">全部分类</div>
    </header>

    <div class="category-container">
      <!-- Left Sidebar: Main Categories -->
      <div class="sidebar">
        <div 
          v-for="cat in categories" 
          :key="cat.id" 
          class="sidebar-item"
          :class="{ active: activeId === cat.id }"
          @click="activeId = cat.id"
        >
          {{ cat.name }}
        </div>
      </div>

      <!-- Right Content: Subcategories or Goods (Placeholder) -->
      <div class="right-content">
        <div class="category-banner">
          <span class="banner-text">{{ activeCategoryName }}</span>
        </div>
        
        <div class="sub-grid">
           <!-- Placeholder Items -->
           <div v-for="i in 6" :key="i" class="sub-item">
             <div class="sub-icon"></div>
             <div class="sub-name">Item {{ i }}</div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { goodsApi } from '@/api/client/goods'
import { useSimpleCache } from '@/composables/shared/useSimpleCache'
import type { GoodsCategory } from '@/types/api'

definePageMeta({ layout: 'mobile' })

const { getCache, setCache } = useSimpleCache()
const categories = ref<GoodsCategory[]>([])
const activeId = ref<string | number>('')

const activeCategoryName = computed(() => {
  return categories.value.find(c => c.id === activeId.value)?.name || '分类'
})

const fetchCategories = async () => {
  const cached = getCache<GoodsCategory[]>('home_categories')
  if (cached) { 
    categories.value = cached
    if (cached.length > 0) activeId.value = cached[0].id
    return
  }
  
  try {
    const res = await goodsApi.getCategories()
    if (res?.success && res.data) {
      categories.value = res.data
      setCache('home_categories', res.data)
      if (res.data.length > 0) activeId.value = res.data[0].id
    }
  } catch (e) { console.error(e) }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.mobile-category-page {
  height: 100vh;
  display: flex; flex-direction: column;
  background: #0F172A; color: #fff;
}
.mobile-header {
  height: 50px; display: flex; align-items: center; justify-content: center;
  border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0;
}
.title { font-weight: 600; font-size: 16px; }

.category-container {
  flex: 1; display: flex; overflow: hidden;
  padding-bottom: 60px; /* Tab Bar */
}

.sidebar {
  width: 90px; background: rgba(30, 41, 59, 0.5);
  overflow-y: auto;
}
.sidebar-item {
  padding: 16px 10px; text-align: center; font-size: 13px; color: #94A3B8;
  border-bottom: 1px solid rgba(255,255,255,0.02);
  transition: all 0.2s;
}
.sidebar-item.active {
  background: #0F172A; color: #3B82F6; font-weight: 600;
  border-left: 3px solid #3B82F6;
}

.right-content {
  flex: 1; padding: 16px; overflow-y: auto;
}
.category-banner {
  height: 80px; background: linear-gradient(135deg, #3B82F6, #60A5FA);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.banner-text { font-size: 18px; font-weight: 700; color: #fff; }

.sub-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.sub-item {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.sub-icon {
  width: 48px; height: 48px; background: rgba(255,255,255,0.05); border-radius: 12px;
}
.sub-name { font-size: 12px; color: #94A3B8; }
</style>
