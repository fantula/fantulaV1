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
      <!-- 
         Mature Architecture: 
         No Transition Component here to avoid layout jumping.
         We simply swap the data. Use :key to force re-render if needed, 
         but ideally GoodsSection handles updates gracefully.
      -->
      
      <!-- List / Skeleton -->
      <GoodsSection 
        :goodsList="currentGoods" 
        :loading="goodsLoading" 
      />

      <!-- Empty State (Only if not loading and empty) -->
      <div v-if="!goodsLoading && currentGoods.length === 0" class="empty-state">
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

    <!-- 关于我们区域 -->
    <AboutSection />

    <!-- 页脚 -->

    <!-- 登录注册弹窗 -->
    <LoginRegisterModal v-if="modal.showLogin" :visible="modal.showLogin" @close="modal.closeLogin()" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useModalStore } from '@/stores/client/modal'
import { preloadModalAssets } from '@/utils/modalAssetPreloader'
import { useHomeData } from '@/composables/client/useHomeData'

// Components
const AboutSection = defineAsyncComponent(() => import('@/components/pc/AboutSection.vue'))
const LoginRegisterModal = defineAsyncComponent(() => import('@/components/pc/modal/LoginRegisterModal.vue'))


// 1. 顶层定义路由实例 & 配置
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

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

// 3. 核心业务逻辑 (使用共享 Composable)
const {
  banners,
  categories,
  currentGoods,
  activeCategoryId,
  goodsLoading,
  isLoadingMore,
  hasMore,
  initData,
  handleCategoryChange: _handleCategoryChange,
  loadMore
} = useHomeData()

// 包装 CategoryChange 以同步 URL
const handleCategoryChange = async (categoryId: string | number) => {
  await _handleCategoryChange(categoryId)
  router.replace({ query: { ...route.query, category_id: categoryId } })
}

onMounted(() => {
  // 预加载弹窗素材（消除闪烁）
  preloadModalAssets()
  // 初始化页面数据 (传入 URL 中的 classify_id)
  const queryCategoryId = route.query.category_id ? String(route.query.category_id) : undefined
  initData(queryCategoryId)
})

const modal = useModalStore()
</script>

<style scoped>


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

.goods-container {
  min-height: 400px; /* 防止高度坍塌 */
  overflow: hidden;  /* 防止滚动条抖动 */
}
</style>