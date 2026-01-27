<template>
  <div class="mobile-home-page">
    <!-- Header -->
    <header class="mobile-header" :class="{ 'is-scrolled': isScrolled }">
      <div class="logo-area">
         <span class="logo-text">FANTULA</span>
      </div>
      <div class="header-actions">
         <template v-if="!userStore.isLoggedIn">
            <button class="login-btn-header" @click="showLoginSheet = true">登录</button>
         </template>
         <template v-else>
            <div class="header-avatar" @click="router.push('/mobile/profile')">
               <img :src="userStore.user?.avatar || '/images/default-avatar.png'" />
            </div>
         </template>
      </div>
    </header>

    <!-- Content Scroll -->
    <div class="content-scroll" @scroll="handleScroll">
      
      <!-- 1. Banners (Floating Card with PC Style Gradient) -->
      <div class="banner-section">
        <!-- Collapsed Placeholder (Show when hidden) -->
        <div v-if="isBannerCollapsed" class="banner-placeholder-strip" @click="isBannerCollapsed = false">
             <span class="placeholder-text">展开轮播图</span>
             <el-icon><ArrowDown></ArrowDown></el-icon>
        </div>

        <!-- Main Banner Wrapper (Hidden when collapsed) -->
        <div v-else class="banner-outer-container" @click="handleBannerClick">
          <div class="banner-gradient-border"></div>
          <div class="banner-inner-content">
             <!-- Carousel -->
             <div class="banner-carousel" v-if="banners.length > 0">
                <div 
                  v-for="banner in banners" 
                  :key="banner.id" 
                  class="banner-item"
                >
                  <img :src="banner.image" class="banner-img" />
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- 2. Categories -->
      <div class="category-scroll-wrapper">
        <div class="category-scroll" ref="categoryScrollRef">
          <div 
            v-for="cat in categories" 
            :key="cat.id" 
            class="category-pill"
            :class="{ active: activeCategoryId === cat.id }"
            @click="handleCategoryChange(cat.id)"
            ref="categoryItemRefs"
            :data-id="cat.id"
          >
            {{ cat.name }}
          </div>
        </div>
      </div>

      <!-- 3. Goods List (Vertical - PC Aligned) -->
      <div class="goods-list-section">
        <div v-if="goodsLoading && currentGoods.length === 0" class="loading-state">
          <div class="spinner"></div>
          <span>加载中...</span>
        </div>
        
        <div v-else-if="currentGoods.length === 0" class="empty-state">
           暂无商品
        </div>

        <div v-else class="goods-list">
          <div 
            v-for="item in currentGoods" 
            :key="item.id" 
            class="goods-card-row"
            @click="openDetail(item.id)"
          >
            <!-- Left: Image -->
            <div class="goods-thumb">
              <img :src="item.image || item.coverImage" loading="lazy" />
              <!-- PC-style Badge -->
              <div v-if="item.badge_label && item.badge_label !== '不展示'" 
                   class="card-badge" 
                   :class="getBadgeClass(item.badge_label)">
                 {{ item.badge_label }}
              </div>
            </div>

            <!-- Right: Info -->
            <div class="goods-info">
              <h3 class="goods-title">{{ item.product_name || item.name || item.title }}</h3>
              
              <!-- Tags: Show ALL (Flex Wrap) -->
              <div class="goods-tags-row" v-if="parseTags(item.tags).length">
                <span class="tag-item" v-for="(tag, idx) in parseTags(item.tags)" :key="idx">{{ tag }}</span>
              </div>

              <!-- Stats: Sales & Rating -->
              <div class="goods-meta-row">
                 <span class="stat-text">销量 {{ formatSales(item.initial_sales || item.sales || 0) }}</span>
                 <span class="stat-divider">|</span>
                 <span class="rating-text">好评度 {{ item.rating || 98 }}%</span>
              </div>
              
              <div class="goods-bottom">
                <div class="goods-price-row">
                  <!-- Price Format: 10.00 (No Currency Symbol) -->
                  <span class="price-val">{{ formatPrice(item.display_price || item.price) }}</span>
                </div>
                <!-- Action: View Details Button -->
                <button class="view-btn">
                  查看详情
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More / Spinner -->
        <div v-if="goodsLoading && currentGoods.length > 0" class="loading-more">
          加载中...
        </div>
      </div>
      
      <!-- Bottom Padding for TabBar -->
      <div class="tab-bar-spacer"></div>

    </div>

    <!-- Sheets -->
    <ProductDetailSheet 
      v-model:visible="showDetailSheet" 
      :goods-id="selectedGoodsId" 
    ></ProductDetailSheet>
    
    <MobileLoginSheet 
      :visible="showLoginSheet" 
      @close="showLoginSheet = false" 
    ></MobileLoginSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus, ArrowDown, Search } from '@element-plus/icons-vue' 
import { commonApi } from '@/api/client/common'
import { goodsApi } from '@/api/client/goods'
import { useSimpleCache } from '@/composables/shared/useSimpleCache'
import { usePageLoading } from '@/composables/usePageLoading'
import { useUserStore } from '@/stores/client/user'
import type { Banner, Goods, GoodsCategory } from '@/types/api'
import ProductDetailSheet from '@/components/mobile/goods/ProductDetailSheet.vue'
import MobileLoginSheet from '@/components/mobile/auth/MobileLoginSheet.vue'

definePageMeta({
  layout: 'mobile'
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { getCache, setCache } = useSimpleCache()
const { loading: pageLoading, startLoading, stopLoading } = usePageLoading()

// State
const banners = ref<Banner[]>([])
const categories = ref<GoodsCategory[]>([])
const currentGoods = ref<Goods[]>([])
const activeCategoryId = ref<string | number>('')
const goodsLoading = ref(false)

// UI State
const isScrolled = ref(false)
const scrollThreshold = 10;
const isBannerCollapsed = ref(false)
const categoryScrollRef = ref<HTMLElement | null>(null)
const categoryItemRefs = ref<HTMLElement[]>([])

// Sheet State
const showDetailSheet = ref(false)
const showLoginSheet = ref(false)
const selectedGoodsId = ref<string | number>('')

// Interactions
const openDetail = (id: string | number) => {
    selectedGoodsId.value = id
    showDetailSheet.value = true
}

// Helper: Parse Tags
const parseTags = (tags: string | string[] | undefined): string[] => {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  if (typeof tags === 'string' && tags.includes(',')) return tags.split(',')
  return [tags as string]
}

// Helper: Format Price (10.00)
const formatPrice = (price: number | string | undefined) => {
  if (price === undefined || price === null) return '0.00'
  const num = typeof price === 'string' ? parseFloat(price) : price
  return num.toFixed(2)
}

// Helper: Format Sales
const formatSales = (val: number | string) => {
  const num = Number(val)
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w+'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k+'
  return num
}

// Helper: Badge Color
const getBadgeClass = (label: string) => {
  const map: Record<string, string> = {
    '热卖': 'bg-hot',
    '新品': 'bg-new',
    '推荐': 'bg-recommend',
    '限时': 'bg-limited',
    '优惠': 'bg-promo'
  }
  return map[label] || 'bg-default'
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

const fetchGoods = async (categoryId?: string | number, append = false) => {
  if (!append) goodsLoading.value = true
  
  try {
    const res = await goodsApi.getGoodsList({ 
        categoryId, 
        page: 1, 
        limit: 10,
    })
    
    // No manual mapping needed if we access fields directly in template
    // API returns consistent objects
    const items = res?.success && res.data?.list ? res.data.list : []

    if (append) {
       currentGoods.value = [...currentGoods.value, ...items]
    } else {
       currentGoods.value = items
    }
  } catch (e) {
    console.error(e)
    if (!append) currentGoods.value = []
  } finally {
    goodsLoading.value = false
  }
}

// Interactions
const handleBannerClick = () => {
  // Collapsing interaction as requested
  if (!isBannerCollapsed.value) isBannerCollapsed.value = true
}

const centerActiveCategory = (id: string | number) => {
    nextTick(() => {
        if (!categoryScrollRef.value) return
        
        // Find the element in our ref array (or query selector but refs are faster if bound correclty)
        // Since v-for refs are arrays, we can iterate. 
        // But simplified logic: Use querySelector on container is safer for dynamic lists
        const activeEl = categoryScrollRef.value.querySelector('.category-pill.active') as HTMLElement
        if (activeEl) {
            const container = categoryScrollRef.value
            const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2)
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
        }
    })
}

const handleCategoryChange = async (id: string | number) => {
  if (activeCategoryId.value === id) return
  activeCategoryId.value = id
  centerActiveCategory(id) // Trigger Center
  await fetchGoods(id)
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
                  centerActiveCategory(id) // Center initial
                  return fetchGoods(id)
              }
          })
        ])
        
        // Handle open param
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
/* Stick to previous Layout styles for Header/Banner etc */
.mobile-home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: transparent; /* Changed from #020617 to show ParticleBackground */
  color: #fff;
  position: relative;
}

/* Header */
.mobile-header {
  flex-shrink: 0;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: transparent;
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.mobile-header.is-scrolled {
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(12px);
  position: fixed;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.logo-text {
  font-family: 'DIN Alternates', sans-serif;
  font-weight: 700; font-size: 20px; letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #94A3B8);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.login-btn-header {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1);
  color: #fff; font-size: 12px; font-weight: 600; padding: 6px 14px;
  border-radius: 20px; backdrop-filter: blur(4px);
}
.header-avatar {
  width: 32px; height: 32px; border-radius: 50%; overflow: hidden;
  border: 1px solid rgba(255,255,255,0.2);
}
.header-avatar img { width: 100%; height: 100%; object-fit: cover; }

/* Scroll Area */
.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
}

/* 1. Banners (PC Style Floating Card) */
.banner-section {
    padding-top: 60px; /* Space for Header */
    margin-bottom: 24px;
    padding-left: 32px;  /* Narrower Width (Increased Padding) */
    padding-right: 32px; /* Narrower Width (Increased Padding) */
    min-height: 40px; 
}

/* Placeholder Strip */
.banner-placeholder-strip {
    width: 100%;
    height: 36px;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #94A3B8;
    font-size: 13px;
    backdrop-filter: blur(8px);
    transition: all 0.3s;
    cursor: pointer;
}
.banner-placeholder-strip:active { transform: scale(0.98); background: rgba(59, 130, 246, 0.2); color: #3B82F6; }

/* Main Container */
.banner-outer-container {
    position: relative;
    width: 100%;
    height: 160px; /* Taller Height */
    border-radius: 20px; /* Large PC Style Radius */
    padding: 3px; /* Space for border */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.banner-outer-container:active { transform: scale(0.98); }

/* Animated Gradient Border */
.banner-gradient-border {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 20px;
    background: linear-gradient(
        45deg, 
        #3B82F6, 
        #F97316, 
        #06B6D4, 
        #3B82F6
    );
    background-size: 400% 400%;
    z-index: 0;
    animation: gradientFlow 6s ease infinite;
    opacity: 0.8;
    filter: blur(4px);
}
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.banner-inner-content {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 18px; /* Slightly smaller than outer */
    overflow: hidden;
    z-index: 1;
}

.banner-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  border-radius: 18px;
}
.banner-carousel::-webkit-scrollbar { display: none; }
.banner-item {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
  position: relative;
}
.banner-img {
  width: 100%; height: 100%; object-fit: cover;
}

/* 2. Categories */
.category-scroll-wrapper {
  padding: 0 16px;
  margin-bottom: 16px;
}
.category-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px;
}
.category-scroll::-webkit-scrollbar { display: none; }

.category-pill {
  flex-shrink: 0;
  padding: 6px 16px;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 20px; /* Full pill */
  font-size: 13px;
  color: #94A3B8;
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  backdrop-filter: blur(4px);
}
.category-pill.active {
  /* Premium Gradient Style */
  background: linear-gradient(135deg, #3B82F6, #06B6D4);
  color: #fff;
  border-color: transparent;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(6, 182, 212, 0.4);
  transform: translateY(-1px) scale(1.05);
}

/* 3. Goods List (Row Layout) */
.goods-list-section { padding: 0 16px; min-height: 500px; }
.goods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.goods-card-row {
  display: flex;
  gap: 12px;
  background: transparent;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.03);
  background: rgba(30, 41, 59, 0.2);
}

.goods-thumb {
  width: 100px; /* Small Square */
  height: 100px;
  flex-shrink: 0;
  background: #1E293B;
  border-radius: 8px;
  position: relative;
  /* Removed overflow hidden to allow shadow if needed, but img usually clips. 
     Better to put border on img or container. 
     User requested border. */
}
.goods-thumb img { 
    width: 100%; height: 100%; object-fit: cover; 
    border-radius: 8px;
    /* Image Border & Shadow Effect */
    border: 1px solid #3B82F6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

/* PC-Aligned Badges matching GoodsSection */
.card-badge {
    position: absolute;
    top: 0; left: 0;
    font-size: 10px; font-weight: 700;
    color: #fff;
    padding: 3px 8px;
    border-radius: 8px 0 8px 0;
    z-index: 5;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}
.bg-hot { background: linear-gradient(135deg, #F97316, #EA580C); }
.bg-new { background: linear-gradient(135deg, #3B82F6, #0284C7); }
.bg-recommend { background: linear-gradient(135deg, #F97316, #F97316); }
.bg-limited { background: linear-gradient(135deg, #3B82F6, #0369A1); }
.bg-promo { background: linear-gradient(135deg, #3B82F6, #0EA5E9); }
.bg-default { background: rgba(0,0,0,0.6); }


.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 0;
}

.goods-title {
  font-size: 15px; margin: 0; color: #F1F5F9;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 6px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.goods-tags-row {
    display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px;
}
.tag-item {
    font-size: 10px;
    color: #38BDF8;
    border: 1px solid rgba(56, 189, 248, 0.3);
    background: rgba(56, 189, 248, 0.05);
    padding: 1px 5px;
    border-radius: 4px;
    white-space: nowrap;
}

.goods-meta-row {
    display: flex; gap: 6px; align-items: center;
    font-size: 11px; color: #64748B;
    margin-bottom: auto; /* Push price to bottom */
}
.stat-divider { color: #334155; }
.rating-text { color: #F59E0B; }

.goods-bottom {
    display: flex; justify-content: space-between; align-items: flex-end;
}
/* Price Format: 10.00 with Glow Effect */
.goods-price-row { 
    color: #F97316; 
    display: flex; 
    align-items: baseline;
    font-family: 'DIN', sans-serif; /* Presumed numeric font, fallback sans */
}
.price-val { 
    font-size: 22px; 
    font-weight: 900;
    letter-spacing: -0.5px;
    /* Text Stroke & Glow */
    -webkit-text-stroke: 0.5px #C2410C; /* Darker Orange Stroke */
    text-shadow: 0 0 10px rgba(249, 115, 22, 0.4);
}

/* View Details Button */
.view-btn {
    padding: 6px 14px;
    border-radius: 100px;
    background: linear-gradient(135deg, #3B82F6, #2563EB);
    border: none;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
    transition: transform 0.1s;
}
.view-btn:active { transform: scale(0.95); opacity: 0.9; }


.loading-state, .empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; color: #64748B; font-size: 13px;
}
.spinner {
  width: 24px; height: 24px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #3B82F6; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 10px;
}
.loading-more { text-align: center; padding: 20px; color: #64748B; font-size: 12px; }
@keyframes spin { to { transform: rotate(360deg); } }

.tab-bar-spacer { height: 60px; }
</style>
