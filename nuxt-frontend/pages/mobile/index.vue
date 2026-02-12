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
// import { commonApi } from '@/api/client/common' // Removed
// import { goodsApi } from '@/api/client/goods' // Removed
import { wechatLoginApi } from '@/api/client/wechat-login'
// import { useSimpleCache } from '@/composables/shared/useSimpleCache' // Removed
import { usePageLoading } from '@/composables/usePageLoading'
import { useUserStore } from '@/stores/client/user'
// import type { Banner, Goods, GoodsCategory } from '@/types/api' // Removed
import { useHomeData } from '@/composables/client/useHomeData'

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
// const { getCache, setCache } = useSimpleCache() // Removed
const { startLoading, stopLoading } = usePageLoading()

// Shared Logic from Composable
const { 
  banners, 
  categories, 
  currentGoods, 
  activeCategoryId,
  goodsLoading, 
  hasMore, 
  isLoadingMore,
  initData,
  handleCategoryChange: _handleCategoryChange, // Rename to avoid conflict if we need wrapper
  loadMore
} = useHomeData()


// UI State (Mobile Specific)
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

// 分类切换处理 wrapper
const handleCategoryChange = async (categoryId: string | number) => {
  await _handleCategoryChange(categoryId)
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
        // 【关键】处理微信授权回调的 code 参数
        const code = route.query.code as string
        // const state = route.query.state as string
        
        if (code && !userStore.isLoggedIn) {
            console.log('[MobileHome] Processing WeChat OAuth callback...')
            try {
                const res = await wechatLoginApi.oauthLogin(code)
                if (res.success && res.data) {
                    if (res.data.status === 'logged_in' && res.data.actionLink) {
                        // 有 Magic Link，跳转完成登录
                        console.log('[MobileHome] Redirecting to Magic Link...')
                        window.location.href = res.data.actionLink
                        return // 停止后续执行
                    } else if (res.data.status === 'need_bind') {
                        // 需要绑定邮箱，跳转到 wechat-callback 页面
                        router.replace(`/mobile/wechat-callback?code=${code}`)
                        return
                    }
                }
            } catch (e) {
                console.error('[MobileHome] OAuth login failed:', e)
            }
            // 清除 URL 中的 code 参数
            router.replace({ path: '/mobile', query: {} })
        }
        
        // Use shared init logic
        await initData()
        
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
