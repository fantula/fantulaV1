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
        <GoodsSection 
          :key="activeCategoryId" 
          :goodsList="currentGoods" 
          :loading="goodsLoading" 
        />
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

const banners = ref<Banner[]>([])
const categories = ref<GoodsCategory[]>([])
const currentGoods = ref<Goods[]>([])
const activeCategoryId = ref<string | number>('')
const goodsLoading = ref(false)
const slideDirection = ref('slide-right')

// ========================================
// 数据获取函数（带缓存）
// ========================================

// 获取轮播图数据
const fetchBanners = async () => {
  // 先尝试读取缓存，立即显示
  const cached = getCache<Banner[]>('home_banners')
  if (cached) {
    banners.value = cached
  }
  
  // 后台获取最新数据
  try {
    const res = await commonApi.getBannerList()
    if (res?.success && res.data) {
      banners.value = res.data
      setCache('home_banners', res.data)
    }
  } catch (error) {
    console.error('获取轮播图失败:', error)
  }
}

// 获取分类数据
const fetchCategories = async (): Promise<string | number | null> => {
  // 先尝试读取缓存，立即显示
  const cached = getCache<GoodsCategory[]>('home_categories')
  if (cached && cached.length > 0) {
    categories.value = cached
    return cached[0].id // 返回缓存的第一个分类 ID
  }
  
  // 后台获取最新数据
  try {
    const res = await goodsApi.getCategories()
    if (res?.success && res.data && res.data.length > 0) {
      categories.value = res.data
      setCache('home_categories', res.data)
      return res.data[0].id
    }
  } catch (error) {
    console.error('获取分类失败:', error)
  }
  return null
}

// 根据分类获取商品（不缓存，保证实时性）
const fetchGoods = async (categoryId?: string | number) => {
  goodsLoading.value = true
  try {
    const res = await goodsApi.getGoodsList({ 
      categoryId: categoryId,
      page: 1, 
      limit: 12 
    })
    if (res?.success && res.data?.list) {
      currentGoods.value = res.data.list
    } else {
      currentGoods.value = []
    }
  } catch (error) {
    console.error('获取商品列表失败:', error)
    // TODO: 增加用户界面的错误提示
    currentGoods.value = []
  } finally {
    goodsLoading.value = false
  }
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

const modal = useModalStore()
</script>

<style scoped>
.home-page {
  /* background: #f8f9fa; */
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