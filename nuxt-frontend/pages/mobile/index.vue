<template>
  <div class="mobile-home-page">
    <HomeHeader 
      :is-scrolled="isScrolled"
      @open-login="showLoginSheet = true" 
    />

    <!-- Content Scroll -->
    <div class="content-scroll no-scrollbar" @scroll="handleScroll">
      
      <!-- 1. Banners -->
      <HomeBanner :banners="banners" />

      <!-- 2. Categories -->
      <HomeCategoryNav 
        :categories="categories"
        v-model="activeCategoryId"
        @change="fetchGoods"
      />

      <!-- 3. Goods List -->
      <div class="goods-list-section">
        
        <div v-if="goodsLoading && currentGoods.length === 0" class="loading-state">
          <div class="spinner-premium"></div>
          <span>正在加载好物...</span>
        </div>
        
        <div v-else-if="currentGoods.length === 0" class="empty-state">
           <div class="empty-icon">📦</div>
           <p>暂无相关商品</p>
        </div>

        <div v-else class="goods-list">
           <ProductCard 
             v-for="(item, index) in currentGoods" 
             :key="item.id" 
             :goods="item"
             class="animate-fade-in"
             :style="{ animationDelay: `${index * 0.05}s` }"
             @click="openDetail(item.id)"
           />
        </div>

        <!-- Load More -->
        <div v-if="goodsLoading && currentGoods.length > 0" class="loading-more">
          <div class="spinner-mini"></div> 加载更多...
        </div>
      </div>
      
      <!-- Bottom Padding for TabBar -->
      <div class="tab-bar-spacer"></div>

    </div>

    <!-- Sheets -->
    <ProductDetailSheet 
      v-model:visible="showDetailSheet" 
      :goods-id="selectedGoodsId" 
    />
    
    <MobileLoginSheet 
      :visible="showLoginSheet" 
      @close="showLoginSheet = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { commonApi } from '@/api/client/common'
import { goodsApi } from '@/api/client/goods'
import { useSimpleCache } from '@/composables/shared/useSimpleCache'
import { usePageLoading } from '@/composables/usePageLoading'
import { useUserStore } from '@/stores/client/user'
import type { Banner, Goods, GoodsCategory } from '@/types/api'

// Components
import HomeHeader from '@/components/mobile/home/HomeHeader.vue'
import HomeBanner from '@/components/mobile/home/HomeBanner.vue'
import HomeCategoryNav from '@/components/mobile/home/HomeCategoryNav.vue'
import ProductCard from '@/components/mobile/goods/ProductCard.vue'
import ProductDetailSheet from '@/components/mobile/goods/ProductDetailSheet.vue'
import MobileLoginSheet from '@/components/mobile/auth/MobileLoginSheet.vue'

definePageMeta({
  layout: 'mobile'
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { getCache, setCache } = useSimpleCache()
const { startLoading, stopLoading } = usePageLoading()

// State
const banners = ref<Banner[]>([])
const categories = ref<GoodsCategory[]>([])
const currentGoods = ref<Goods[]>([])
const activeCategoryId = ref<string | number>('')
const goodsLoading = ref(false)

// UI State
const isScrolled = ref(false)
const scrollThreshold = 20;
const showDetailSheet = ref(false)
const showLoginSheet = ref(false)
const selectedGoodsId = ref<string | number>('')

// Interactions
const openDetail = (id: string | number) => {
    selectedGoodsId.value = id
    showDetailSheet.value = true
}

// Data Fetching logic
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
    const res = await goodsApi.getGoodsList({ 
        categoryId: categoryId || activeCategoryId.value, 
        page: 1, 
        limit: 10,
    })
    
    currentGoods.value = res?.success && res.data?.list ? res.data.list : []
  } catch (e) {
    console.error(e)
    currentGoods.value = []
  } finally {
    goodsLoading.value = false
  }
}

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  isScrolled.value = target.scrollTop > scrollThreshold
}

// Init
onMounted(async () => {
    startLoading('initial')
    try {
        await Promise.all([
           fetchBanners(),
           fetchCategories().then(id => {
               if (id) {
                   activeCategoryId.value = id
                   return fetchGoods(id)
               }
           })
        ])
        
        if (route.query.open) {
            openDetail(route.query.open as string)
            router.replace({ query: { ...route.query, open: undefined } })
        }
    } finally {
        setTimeout(() => stopLoading(), 500)
    }
})
</script>

<style scoped>
.mobile-home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  /* Background handled by Layout/Global */
}

/* Scroll Area */
.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
  scroll-behavior: smooth;
}

.goods-list-section { 
  padding: 0 16px; 
  min-height: 500px; 
  position: relative;
  z-index: 10;
}

.section-header {
  margin-bottom: 16px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.section-title {
  font-size: 18px;
  font-weight: 700;
  display: flex; align-items: center; gap: 4px;
}
.section-dot {
  width: 6px; height: 6px; background: var(--accent-color); border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-color);
}
.section-subtitle {
  font-size: 12px; color: var(--text-muted);
}

.goods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.loading-state, .empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; color: var(--text-muted); font-size: 13px;
  background: rgba(255,255,255,0.02); border-radius: 12px;
}
.empty-icon { font-size: 32px; margin-bottom: 8px; opacity: 0.5; }

/* Premium Spinner */
.spinner-premium {
  width: 32px; height: 32px; 
  border: 3px solid rgba(59, 130, 246, 0.2); 
  border-top-color: var(--primary-color); 
  border-radius: 50%; 
  animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; 
  margin-bottom: 12px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
}

.loading-more { 
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 24px; color: var(--text-muted); font-size: 12px; 
}
.spinner-mini {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: var(--text-secondary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.tab-bar-spacer { height: 80px; }
</style>
