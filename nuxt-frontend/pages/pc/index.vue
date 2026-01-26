<template>
  <div class="home-page">
    <!-- 页面内容 -->
    
    <!-- 轮播图区域 -->
    <BannerSection :banners="banners" />

    <!-- 商品分类导航 -->
    <CategoryNav 
      :categories="categories" 
      :activeId="activeCategoryId" 
      @change="handleCategoryChange" 
    />

    <!-- 商品列表区 -->
    <div class="goods-container">
      <Transition :name="slideDirection" mode="out-in">
        <div :key="activeCategoryId">
          <!-- 这里的 key 很重要，确保切换分类时重置组件 -->
           
          <GoodsSection 
            v-if="currentGoods.length > 0 || goodsLoading"
            :goodsList="currentGoods" 
            :loading="goodsLoading" 
          />

          <!-- Empty State -->
          <div v-else-if="!goodsLoading && currentGoods.length === 0" class="empty-state">
             <el-empty description="该分类暂无商品" :image-size="120" />
          </div>

          <!-- Infinite Scroll Trigger -->
          <div v-if="hasMore && currentGoods.length > 0" class="load-more-trigger" v-intersection-observer="loadMore">
             <div v-if="isLoadingMore" class="loading-more-spinner">
                <el-icon class="is-loading"><Loading /></el-icon> 加载更多...
             </div>
          </div>
          
           <!-- No More Data Text -->
           <div v-if="!hasMore && currentGoods.length > 0" class="no-more-data">
              - 到底了 -
           </div>
        </div>
      </Transition>
    </div>

    <!-- 关于我们区域 -->
    <AboutSection />

    <!-- 页脚 -->

    <!-- 登录注册弹窗 -->
    <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, onMounted } from 'vue'
import { useModalStore } from '@/stores/client/modal'
import { commonApi } from '@/api/client/common'
import { goodsApi } from '@/api/client/goods'
import { preloadModalAssets } from '@/utils/modalAssetPreloader'
import type { Banner, Goods, GoodsCategory } from '@/types/api'

// 1. 顶层定义路由实例 & 配置
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const { getCache, setCache } = useSimpleCache()

// 2. SEO配置 - 使用环境变量
useHead({
  title: '凡图拉 - 优质商品平台',
  meta: [
    { name: 'description', content: '凡图拉提供优质商品和服务，精选各类商品，确保品质与价格的完美平衡。' },
    { name: 'keywords', content: '凡图拉,商品,购物,电商,优质商品' },
    { property: 'og:title', content: '凡图拉 - 优质商品平台' },
    { property: 'og:description', content: '凡图拉提供优质商品和服务，精选各类商品，确保品质与价格的完美平衡。' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: (config.public.siteUrl as string) || 'http://localhost:3000' }
  ]
})

// 状态管理
const banners = ref<Banner[]>([])
const categories = ref<GoodsCategory[]>([])
const currentGoods = ref<Goods[]>([])
const activeCategoryId = ref<string | number>('')
const goodsLoading = ref(false)
const slideDirection = ref('slide-right')

// 分页状态
const currentPage = ref(1)
const hasMore = ref(true)
const isLoadingMore = ref(false)
const PAGE_SIZE = 10 

// ========================================
// 数据获取函数（带缓存）
// ========================================

// 获取轮播图数据 (保持不变)
const fetchBanners = async () => {
  const cached = getCache<Banner[]>('home_banners')
  if (cached) banners.value = cached
  try {
    const res = await commonApi.getBannerList()
    if (res?.success && res.data) {
      banners.value = res.data
      setCache('home_banners', res.data)
    }
  } catch (error) { console.error('获取轮播图失败:', error) }
}

// 获取分类数据 (保持不变)
const fetchCategories = async (): Promise<string | number | null> => {
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
  } catch (error) { console.error('获取分类失败:', error) }
  return null
}

// 核心：获取商品列表 (支持分页)
// isLoadMore: true 表示追加数据，false 表示重置列表
const fetchGoods = async (categoryId?: string | number, isLoadMore = false) => {
  if (!categoryId) return
  
  if (isLoadMore) {
    if (!hasMore.value || isLoadingMore.value) return
    isLoadingMore.value = true
  } else {
    goodsLoading.value = true
    currentPage.value = 1
    hasMore.value = true
    currentGoods.value = [] // 清空列表，避免显示旧数据
  }

  // Safety: Force stop loading if API hangs for too long (5s)
  const safetyTimer = setTimeout(() => {
    if (goodsLoading.value || isLoadingMore.value) {
        console.warn('⚠️ Fetch timeout: Force stopping spinner')
        goodsLoading.value = false
        isLoadingMore.value = false
    }
  }, 5000)

  try {
    const res = await goodsApi.getGoodsList({ 
      categoryId: categoryId,
      page: currentPage.value, 
      limit: PAGE_SIZE 
    })
    
    const newList = res?.success && res.data?.list ? res.data.list : []
    
    if (isLoadMore) {
      currentGoods.value = [...currentGoods.value, ...newList]
    } else {
      currentGoods.value = newList
    }

    // 判断是否还有更多数据
    if (newList.length < PAGE_SIZE) {
      hasMore.value = false
    } else {
      currentPage.value++ 
      hasMore.value = true
    }

  } catch (error) {
    console.error('获取商品列表失败:', error)
    if (!isLoadMore) currentGoods.value = []
  } finally {
    clearTimeout(safetyTimer)
    goodsLoading.value = false
    isLoadingMore.value = false
  }
}

// 滚动加载触发器
const loadMore = () => {
  fetchGoods(activeCategoryId.value, true)
}

// 初始化数据 - 优化版：缓存优先 + 并行获取 + 后台刷新
const initData = async () => {
  // 第一批：并行获取轮播图和分类（有缓存则立即显示）
  const [_, firstCategoryId] = await Promise.all([
    fetchBanners(),
    fetchCategories()
  ])
  
  // 优先从 URL 获取分类 ID
  const queryCategoryId = route.query.category_id
  let targetId = queryCategoryId ? String(queryCategoryId) : firstCategoryId

  // 如果 URL 有参数但不在分类列表中（或者列表为空），回退到第一个
  if (queryCategoryId && categories.value.length > 0) {
    const exists = categories.value.find(c => String(c.id) === String(queryCategoryId))
    if (!exists && firstCategoryId) targetId = firstCategoryId
  }

  if (targetId) {
    activeCategoryId.value = targetId
    await fetchGoods(targetId)
  }
}

// 分类切换处理
const handleCategoryChange = async (categoryId: string | number) => {
  // 1. Calculate direction
  const oldIndex = categories.value.findIndex(c => c.id === activeCategoryId.value)
  const newIndex = categories.value.findIndex(c => c.id === categoryId)
  
  if (oldIndex !== -1 && newIndex !== -1) {
    slideDirection.value = newIndex > oldIndex ? 'slide-right' : 'slide-left'
  }

  activeCategoryId.value = categoryId
  
  // Sync URL
  router.replace({ query: { ...route.query, category_id: categoryId } })
  await fetchGoods(categoryId)
}

onMounted(() => {
  // 预加载弹窗素材（消除闪烁）
  preloadModalAssets()
  // 初始化页面数据
  initData()
})

import { Loading } from '@element-plus/icons-vue'

// Custom Directive for Intersection Observer (Simplest implementation)
const vIntersectionObserver = {
  mounted: (el: HTMLElement, binding: any) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        binding.value()
      }
    }, { rootMargin: '100px' }) // Trigger 100px before bottom
    observer.observe(el)
    // @ts-ignore
    el._observer = observer
  },
  unmounted: (el: HTMLElement) => {
    // @ts-ignore
    if (el._observer) el._observer.disconnect()
  }
}

const modal = useModalStore()
</script>

<style scoped>
.home-page {
  /* background: #f8f9fa; */
}

.empty-state {
  padding: 60px 0;
  display: flex;
  justify-content: center;
}

.load-more-trigger {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #94A3B8;
  width: 100%;
}

.loading-more-spinner {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.no-more-data {
  text-align: center;
  padding: 30px 0;
  color: #64748B;
  font-size: 13px;
  opacity: 0.6;
}

/* 左右滑动过渡动画 */
.goods-container {
  min-height: 400px; /* 防止高度坍塌 */
  overflow: hidden;  /* 防止滚动条抖动 */
}

/* 向右滑动 (点右边按钮) */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 向左滑动 (点左边按钮) */
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>