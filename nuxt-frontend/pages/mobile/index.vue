<template>
  <div class="mobile-home-page">
    <!-- Header -->
    <header class="mobile-header">
      <div class="logo-area">
        <span class="logo-text">FANTULA</span>
      </div>
      <div class="header-actions">
        <!-- Search Placeholder -->
        <div class="search-btn">
          <el-icon><Search /></el-icon>
        </div>
      </div>
    </header>

    <!-- Content Scroll -->
    <div class="content-scroll">
      
      <!-- 1. Banners (CSS Scroll Snap) -->
      <div class="banner-carousel" v-if="banners.length > 0">
        <div 
          v-for="banner in banners" 
          :key="banner.id" 
          class="banner-item"
        >
          <img :src="banner.image" class="banner-img" />
        </div>
      </div>

      <!-- 2. Categories (Horizontal Scroll) -->
      <div class="category-scroll-wrapper">
        <div class="category-scroll">
          <div 
            v-for="cat in categories" 
            :key="cat.id" 
            class="category-pill"
            :class="{ active: activeCategoryId === cat.id }"
            @click="handleCategoryChange(cat.id)"
          >
            {{ cat.name }}
          </div>
        </div>
      </div>

      <!-- 3. Goods Grid -->
      <div class="goods-grid-section">
        <div v-if="goodsLoading" class="loading-state">
          <div class="spinner"></div>
          <span>加载中...</span>
        </div>
        
        <div v-else-if="currentGoods.length === 0" class="empty-state">
           暂无商品
        </div>

        <div v-else class="goods-grid">
          <div 
            v-for="item in currentGoods" 
            :key="item.id" 
            class="goods-card"
            @click="router.push(`/goods/${item.id}`)"
          >
            <div class="goods-thumb">
              <img :src="item.image" loading="lazy" />
            </div>
            <div class="goods-info">
              <h3 class="goods-title">{{ item.name }}</h3>
              <div class="goods-price-row">
                <span class="price-symbol">¥</span>
                <span class="price-val">{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Padding for TabBar -->
      <div class="tab-bar-spacer"></div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { commonApi } from '@/api/client/common'
import { goodsApi } from '@/api/client/goods'
import { useSimpleCache } from '@/composables/shared/useSimpleCache'
import type { Banner, Goods, GoodsCategory } from '@/types/api'

definePageMeta({
  layout: 'mobile'
})

const router = useRouter()
const { getCache, setCache } = useSimpleCache()

// State
const banners = ref<Banner[]>([])
const categories = ref<GoodsCategory[]>([])
const currentGoods = ref<Goods[]>([])
const activeCategoryId = ref<string | number>('')
const goodsLoading = ref(false)

// Data Fetching logic (simplified from client)
const fetchBanners = async () => {
  const cached = getCache<Banner[]>('home_banners')
  if (cached) { banners.value = cached; return }
  
  try {
    const res = await commonApi.getBannerList()
    if (res?.success && res.data) {
      banners.value = res.data
      setCache('home_banners', res.data)
    }
  } catch (e) { console.error(e) }
}

const fetchCategories = async () => {
  const cached = getCache<GoodsCategory[]>('home_categories')
  if (cached && cached.length > 0) {
    categories.value = cached
    return cached[0].id
  }
  
  try {
    const res = await goodsApi.getCategories()
    if (res?.success && res.data && res.data.length > 0) {
      categories.value = res.data
      setCache('home_categories', res.data)
      return res.data[0].id
    }
  } catch (e) { console.error(e) }
  return null
}

const fetchGoods = async (categoryId?: string | number) => {
  goodsLoading.value = true
  try {
    const res = await goodsApi.getGoodsList({ categoryId, page: 1, limit: 10 })
    if (res?.success && res.data?.list) {
      currentGoods.value = res.data.list
    } else {
      currentGoods.value = []
    }
  } catch (e) {
    console.error(e)
    currentGoods.value = []
  } finally {
    goodsLoading.value = false
  }
}

// Interactions
const handleCategoryChange = async (id: string | number) => {
  if (activeCategoryId.value === id) return
  activeCategoryId.value = id
  await fetchGoods(id)
}

// Init
onMounted(async () => {
  await fetchBanners()
  const firstId = await fetchCategories()
  if (firstId) {
    activeCategoryId.value = firstId
    await fetchGoods(firstId)
  }
})
</script>

<style scoped>
.mobile-home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0F172A;
  color: #fff;
}

/* Header */
.mobile-header {
  flex-shrink: 0;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
}
.logo-text { font-weight: 800; font-size: 18px; letter-spacing: 1px; color: #3B82F6; }
.search-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 50%; }

/* Scroll Area */
.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
}

/* 1. Banners */
.banner-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  margin: 16px;
  border-radius: 12px;
  height: 150px;
  gap: 10px;
}
.banner-carousel::-webkit-scrollbar { display: none; }
.banner-item {
  flex: 0 0 100%;
  scroll-snap-align: center;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}
.banner-img {
  width: 100%; height: 100%; object-fit: cover;
}

/* 2. Categories */
.category-scroll-wrapper {
  padding: 0 16px;
  margin-bottom: 20px;
}
.category-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px; /* Hide scrollbar visual if visible */
}
.category-scroll::-webkit-scrollbar { display: none; }

.category-pill {
  flex-shrink: 0;
  padding: 6px 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 100px;
  font-size: 13px;
  color: #94A3B8;
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.2s;
}
.category-pill.active {
  background: #3B82F6;
  color: #fff;
  border-color: #3B82F6;
  font-weight: 500;
}

/* 3. Goods Grid */
.goods-grid-section { padding: 0 16px; min-height: 300px; }
.goods-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.goods-card {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
}
.goods-thumb {
  aspect-ratio: 1;
  background: #1E293B;
  overflow: hidden;
}
.goods-thumb img { width: 100%; height: 100%; object-fit: cover; }

.goods-info { padding: 10px; }
.goods-title {
  font-size: 13px; margin: 0 0 6px 0;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  height: 36px; /* Fixed height for 2 lines */
  line-height: 1.4;
}
.goods-price-row { color: #F59E0B; font-weight: 700; }
.price-symbol { font-size: 11px; margin-right: 2px; }
.price-val { font-size: 16px; }

.loading-state, .empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; color: #64748B; font-size: 13px;
}
.spinner {
  width: 24px; height: 24px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #3B82F6; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 10px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.tab-bar-spacer { height: 60px; }
</style>
