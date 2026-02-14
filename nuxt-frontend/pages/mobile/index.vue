<template>
  <div class="mobile-home-page">
    <HomeHeader 
      :is-scrolled="isScrolled"
      @open-login="showLoginSheet = true" 
    />

    <!-- Content Scroll -->
    <div
      class="content-scroll no-scrollbar"
      ref="scrollContainer"
      @scroll="handleScroll"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >

      <!-- 1. Banners -->
      <HomeBanner
        :banners="banners"
        :loading="bannerLoading"
      />

      <!-- 2. Categories -->
      <HomeCategoryNav 
        :categories="categories"
        :model-value="activeCategoryId"
        :loading="categoryLoading"
        @change="handleCategoryChange"
      />

      <!-- Pull to Refresh Overlay -->
      <div 
        class="pull-refresh-indicator" 
        :style="{ height: `${pullDistance}px`, opacity: pullDistance > 0 ? 1 : 0 }"
      >
        <div class="spinner-mini" v-if="isRefreshing"></div>
        <span v-else class="text-xs text-muted">{{ pullText }}</span>
      </div>

      <!-- 3. Goods List -->
      <div class="goods-list-section">
        
        <div v-if="goodsLoading && currentGoods.length === 0" class="loading-state">
           <MobileProductCardSkeleton v-for="i in 6" :key="i" />
        </div>
        
        <div v-else-if="currentGoods.length === 0" class="empty-state bg-glass-card">
           <div class="empty-icon">📦</div>
           <p class="text-muted text-sm">暂无相关商品</p>
        </div>

        <div class="goods-list" v-else>
           <MobileProductCard 
             v-for="(g, index) in currentGoods" 
             :key="g.id" 
             :goods="g"
             class="animate-fade-in"
             :style="{ animationDelay: `${index * 0.05}s` }"
             @click="openDetail(g.id)"
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

    <!-- Back to Top Button -->
    <transition name="fade">
      <button 
        v-show="showBackToTop" 
        class="back-to-top-btn"
        @click="scrollToTop"
      >
        <el-icon><ArrowUpBold /></el-icon>
      </button>
    </transition>

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
import { ref, onMounted, onUnmounted, defineAsyncComponent, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowUpBold } from '@element-plus/icons-vue'
import { wechatLoginApi } from '@/api/client/wechat-login'
import { useUserStore } from '@/stores/client/user'
import { useHomeData } from '@/composables/client/useHomeData'

// Components
import HomeHeader from '@/components/mobile/home/HomeHeader.vue'
import HomeBanner from '@/components/mobile/home/HomeBanner.vue'
import HomeCategoryNav from '@/components/mobile/home/HomeCategoryNav.vue'
import MobileProductCard from '@/components/mobile/goods/MobileProductCard.vue'
import MobileProductCardSkeleton from '@/components/mobile/goods/MobileProductCardSkeleton.vue'
const ProductDetailSheet = defineAsyncComponent(() => import('@/components/mobile/goods/ProductDetailSheet.vue'))
const MobileLoginSheet = defineAsyncComponent(() => import('@/components/mobile/auth/MobileLoginSheet.vue'))

definePageMeta({
  layout: 'mobile'
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// Shared Logic from Composable
const { 
  banners, 
  categories, 
  currentGoods, 
  activeCategoryId,
  bannerLoading,
  categoryLoading,
  goodsLoading, 
  hasMore, 
  isLoadingMore,
  initData,
  handleCategoryChange: _handleCategoryChange, // Rename to avoid conflict if we need wrapper
  loadMore
} = useHomeData()


// UI State (Mobile Specific)
const isScrolled = ref(false)
const showBackToTop = ref(false)
const scrollThreshold = 20
const showDetailSheet = ref(false)
const showLoginSheet = ref(false)
const selectedGoodsId = ref<string | number>('')

// Pull to Refresh State
const pullDistance = ref(0)
const isRefreshing = ref(false)
const startY = ref(0)
const hasVibrated = ref(false)
const PULL_THRESHOLD = 60
const MAX_PULL = 120

const pullText = computed(() => {
  if (isRefreshing.value) return 'Refreshing...'
  return pullDistance.value > PULL_THRESHOLD ? 'Release to Refresh' : 'Pull to Refresh'
})

// RAF optimization for pull to refresh
let rafId: number | null = null
let lastTouchY = 0

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
const setupObserver = async () => {
  if (observer) observer.disconnect()

  // 使用 nextTick 等待 DOM 更新
  await nextTick()

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
}

// 滚动处理（使用节流优化性能）
let scrollRafId: number | null = null
const handleScroll = (e: Event) => {
  if (scrollRafId !== null) return

  scrollRafId = requestAnimationFrame(() => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    isScrolled.value = scrollTop > scrollThreshold
    showBackToTop.value = scrollTop > 500
    scrollRafId = null
  })
}

const scrollToTop = () => {
  scrollContainer.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

// Touch Handlers for Pull to Refresh (优化版)
const handleTouchStart = (e: TouchEvent) => {
  if (scrollContainer.value?.scrollTop === 0) {
    startY.value = e.touches[0].clientY
    hasVibrated.value = false
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (scrollContainer.value?.scrollTop !== 0 || startY.value === 0 || isRefreshing.value) {
    return
  }

  lastTouchY = e.touches[0].clientY

  // 使用 RAF 节流优化性能
  if (rafId === null) {
    rafId = requestAnimationFrame(() => {
      const diff = lastTouchY - startY.value
      if (diff > 0) {
        // 阻力效果：越拉越难（平方根曲线）
        pullDistance.value = Math.min(Math.sqrt(diff * 30), MAX_PULL)

        // 触发触觉反馈（达到阈值时）
        if (pullDistance.value > PULL_THRESHOLD && !hasVibrated.value) {
          if (navigator?.vibrate) {
            navigator.vibrate(10) // 轻微震动10ms
          }
          hasVibrated.value = true
        }

        // 防止默认滚动行为
        if (pullDistance.value > 10) {
          e.preventDefault()
        }
      }
      rafId = null
    })
  }
}

const handleTouchEnd = async () => {
  // 取消未完成的 RAF
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  if (pullDistance.value > PULL_THRESHOLD && !isRefreshing.value) {
    isRefreshing.value = true
    hasVibrated.value = false
    pullDistance.value = 50 // 保持指示器显示

    try {
      await initData(activeCategoryId.value)
      // 成功后触觉反馈
      if (navigator?.vibrate) {
        navigator.vibrate([30, 20, 30]) // 成功的节奏感震动
      }
    } catch (error) {
      if (import.meta.dev) {
        console.error('Refresh failed:', error)
      }
    } finally {
      // 平滑收回动画（使用 RAF）
      const startDist = pullDistance.value
      const duration = 300
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3) // cubic ease-out

        pullDistance.value = startDist * (1 - easeOut)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          isRefreshing.value = false
          pullDistance.value = 0
        }
      }

      requestAnimationFrame(animate)
    }
  } else {
    // 快速回弹
    pullDistance.value = 0
  }
  startY.value = 0
}

// Init
onMounted(async () => {
    try {
        // 【关键】处理微信授权回调的 code 参数
        const code = route.query.code as string
        // const state = route.query.state as string

        if (code && !userStore.isLoggedIn) {
            if (import.meta.dev) {
                console.log('[MobileHome] Processing WeChat OAuth callback...')
            }
            try {
                const res = await wechatLoginApi.oauthLogin(code)
                if (res.success && res.data) {
                    if (res.data.status === 'logged_in' && res.data.actionLink) {
                        // 有 Magic Link，直接跳转（不显示loading避免双动画）
                        if (import.meta.dev) {
                            console.log('[MobileHome] Redirecting to Magic Link...')
                        }
                        window.location.href = res.data.actionLink
                        return // 停止后续执行
                    } else if (res.data.status === 'need_bind') {
                        // 需要绑定邮箱，跳转到 wechat-callback 页面
                        router.replace(`/mobile/wechat-callback?code=${code}`)
                        return
                    }
                }
            } catch (e) {
                if (import.meta.dev) {
                    console.error('[MobileHome] OAuth login failed:', e)
                }
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
    } catch (error) {
        if (import.meta.dev) {
            console.error('[MobileHome] Init error:', error)
        }
    }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  // 清理 RAF
  if (rafId !== null) cancelAnimationFrame(rafId)
  if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)
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


/* Pull to Refresh */
.pull-refresh-indicator {
  display: flex; justify-content: center; align-items: center;
  overflow: hidden;
  transition: height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: 100%;
}

/* Back to Top */
.back-to-top-btn {
  position: fixed;
  bottom: calc(130px + env(safe-area-inset-bottom)); /* Safe above TabBar */
  right: 20px;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 90;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s;
}
.back-to-top-btn:active { transform: scale(0.9); }

.tab-bar-spacer { height: 80px; }
</style>
