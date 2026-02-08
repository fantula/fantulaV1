<template>
  <div class="mobile-home-page">
    <HomeHeader 
      :is-scrolled="isScrolled"
      @open-login="showLoginSheet = true" 
    />

    <!-- Content Scroll -->
    <div class="content-scroll no-scrollbar" ref="scrollContainer" @scroll="handleScroll">
      
      <!-- 1. Banners -->
      <HomeBanner :banners="banners" />

      <!-- 2. Categories -->
      <HomeCategoryNav 
        :categories="categories"
        v-model="activeCategoryId"
        @change="handleCategoryChange"
      />

      <!-- 3. Goods List -->
      <div class="goods-list-section">
        
        <div v-if="goodsLoading && currentGoods.length === 0" class="loading-state">
           <ProductCardSkeleton v-for="i in 6" :key="i" />
        </div>
        
        <div v-else-if="currentGoods.length === 0" class="empty-state bg-glass-card">
           <div class="empty-icon">📦</div>
           <p class="text-muted text-sm">暂无相关商品</p>
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

        <!-- Load More Trigger -->
        <div v-if="hasMore && currentGoods.length > 0" class="load-more-trigger" ref="loadMoreTrigger">
           <div v-if="isLoadingMore" class="loading-more">
             <div class="spinner-mini"></div> 加载更多...
           </div>
        </div>
        
        <!-- No More Data -->
        <div v-if="!hasMore && currentGoods.length > 0" class="no-more-data">
           - 到底了 -
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
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
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
import ProductCardSkeleton from '@/components/mobile/goods/ProductCardSkeleton.vue'
const ProductDetailSheet = defineAsyncComponent(() => import('@/components/mobile/goods/ProductDetailSheet.vue'))
const MobileLoginSheet = defineAsyncComponent(() => import('@/components/mobile/auth/MobileLoginSheet.vue'))

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

// Pagination State (与 PC 端一致)
const currentPage = ref(1)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const PAGE_SIZE = 10

// UI State
const isScrolled = ref(false)
const scrollThreshold = 20
const showDetailSheet = ref(false)
const showLoginSheet = ref(false)
const selectedGoodsId = ref<string | number>('')

// Refs for IntersectionObserver
const scrollContainer = ref<HTMLElement | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

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

// 核心：获取商品列表 (支持分页，与 PC 端逻辑一致)
const fetchGoods = async (categoryId?: string | number, isLoadMore = false) => {
  if (!categoryId) return
  
  if (isLoadMore) {
    if (!hasMore.value || isLoadingMore.value) return
    isLoadingMore.value = true
  } else {
    // 重置列表
    goodsLoading.value = true
    currentPage.value = 1
    hasMore.value = true
    currentGoods.value = []
  }

  try {
    const res = await goodsApi.getGoodsList({ 
        categoryId: categoryId,
        page: currentPage.value, 
        limit: PAGE_SIZE,
    })
    
    const newList = res?.success && res.data?.list ? res.data.list : []
    
    if (isLoadMore) {
      currentGoods.value = [...currentGoods.value, ...newList]
    } else {
      currentGoods.value = newList
    }

    if (newList.length < PAGE_SIZE) {
      hasMore.value = false
    } else {
      currentPage.value++
      hasMore.value = true
    }
  } catch (e) {
    console.error(e)
    if (!isLoadMore) currentGoods.value = []
  } finally {
    goodsLoading.value = false
    isLoadingMore.value = false
  }
}

// 滚动加载触发器
const loadMore = () => {
  fetchGoods(activeCategoryId.value, true)
}

// 分类切换处理
const handleCategoryChange = async (categoryId: string | number) => {
  activeCategoryId.value = categoryId
  await fetchGoods(categoryId)
  // 切换分类后重新设置 Observer
  setupObserver()
}

// 设置 IntersectionObserver
const setupObserver = () => {
  if (observer) observer.disconnect()
  
  // 等待 DOM 更新后设置
  setTimeout(() => {
    if (loadMoreTrigger.value) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore.value && !isLoadingMore.value) {
            loadMore()
          }
        },
        { 
          root: scrollContainer.value,
          rootMargin: '100px'
        }
      )
      observer.observe(loadMoreTrigger.value)
    }
  }, 100)
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
        
        // 设置滚动加载监听
        setupObserver()
        
        if (route.query.open) {
            openDetail(route.query.open as string)
            router.replace({ query: { ...route.query, open: undefined } })
        }
        
        if (route.query.login) {
            showLoginSheet.value = true
            router.replace({ query: { ...route.query, login: undefined } })
        }
    } finally {
        setTimeout(() => stopLoading(), 500)
    }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
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
  padding-bottom: var(--sp-5);
  scroll-behavior: smooth;
}

.goods-list-section { 
  padding: 0 var(--sp-4);
  min-height: 500px; 
  position: relative;
  z-index: 10;
}

.section-header {
  margin-bottom: var(--sp-4);
  display: flex;
  align-items: baseline;
  gap: var(--sp-2);
}
.section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  display: flex; align-items: center; gap: 4px;
}
.section-dot {
  width: 6px; height: 6px; background: var(--accent); border-radius: 50%;
  box-shadow: 0 0 8px var(--accent);
}
.section-subtitle {
  font-size: var(--text-xs); color: var(--text-muted);
}


.goods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Updated Loading/Empty States using Glass */
.loading-state, .empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px;
  padding: var(--sp-5);
  /* Handled by .bg-glass-card */
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

.load-more-trigger {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.no-more-data {
  text-align: center;
  padding: 24px 0;
  color: #64748B;
  font-size: 12px;
  opacity: 0.6;
}

.tab-bar-spacer { height: 80px; }
</style>
