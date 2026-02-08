<template>
  <div class="goods-detail-page">

    
    <!-- 顶部占位 -->
    <div style="height: 20px;"></div>

    <!-- 异常提示 -->
    <div v-if="goodsError" class="api-warning-bar">
      ⚠️ 网络连接异常，正在预览演示数据
    </div>
    
    <div class="goods-content">
      <!-- 骨架屏 -->
      <ProductDetailSkeleton v-if="pending" />

      <!-- 主内容 -->
      <template v-else>
      <div class="goods-content-inner">
      <!-- 返回按钮 -->
      <div class="back-btn-row">
        <BaseButton themeId="secondary" @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回上一页
        </BaseButton>
      </div>
      
      <div class="goods-detail-content">
        <div class="goods-main-section">
          <!-- 左侧：图片展示区 (Extract: ProductGallery) -->
          <ProductGallery 
            v-model="selectedSkuImage" 
            :default-image="goodsInfo.image" 
            :images="skuImages"
          />

          <!-- 右侧：信息与规格选择 -->
          <div class="goods-info-panel">
            <div class="info-header">
              <h1 class="product-name">{{ goodsInfo.name }}</h1>
              <div class="product-sales-badge">
                累计销量 <span>{{ goodsInfo.sales }}</span>
              </div>
            </div>

            <!-- FAQ 滚动轮播条 (Extract: FaqTicker) -->
            <FaqTicker :faqs="faqs" @click="goToFaq({})" />

            <!-- 规格选择区域 -->
            <template v-if="hasSkus">
              <div class="spec-selection-area">
                <div v-for="specGroup in specGroups" :key="specGroup.name" class="spec-group">
                  <div class="spec-label">{{ specGroup.name }}</div>
                  <div class="spec-values">
                    <div 
                      v-for="val in specGroup.values" 
                      :key="val"
                      :class="['spec-val-btn', { active: selectedSpecs[specGroup.name] === val }]"
                      @click="handleSpecSelect(specGroup.name, val)"
                    >
                      {{ val }}
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- 无 SKU 提示卡片 -->
            <template v-else>
              <div class="no-sku-notice">
                <div class="notice-emoji">📦✨</div>
                <h3>我正在疑狂补货中！</h3>
                <p>商品正在准备中，请稍后再来或联系客服了解更多~</p>
              </div>
            </template>

            <!-- SKU 简介区域 -->
            <div v-if="matchedSku?.intro" class="sku-intro-section">
              <span class="sku-intro-text">{{ matchedSku.intro }}</span>
            </div>

            <!-- 价格展示区 -->
            <div class="price-display-section compact-price-area">
              <!-- 有 SKU 时显示价格 -->
              <template v-if="hasSkus">
                <div class="price-stock-row">
                  <div class="current-price-box">
                    <span class="p-amount">{{ formatPrice(currentPrice) }}</span>
                  </div>
                  <div class="stock-info">
                    <span v-if="stockLoading" class="stock-badge loading">查询中...</span>
                    <span v-else-if="hasStock" class="stock-badge">库存: {{ stock }}</span>
                    <span v-else class="stock-badge out-of-stock">暂时缺货</span>
                  </div>
                </div>
                
                <div v-if="allowAddon && hasStock" class="qty-control">
                  <div class="q-actions">
                    <button @click="qty = Math.max(1, qty-1)" :disabled="!hasStock">-</button>
                    <input type="number" v-model="qty" min="1" :disabled="!hasStock" />
                    <button @click="qty = qty+1" :disabled="!hasStock || qty >= stock">+</button>
                  </div>
                </div>
              </template>
              
              <!-- 无 SKU 时放大显示缺货提示 -->
              <template v-else>
                <div class="no-price-notice">
                  <span class="out-of-stock-large">暂时缺货</span>
                </div>
              </template>
            </div>

            <div class="main-actions">
              <!-- Buy Now -> BaseButton -->
              <BaseButton 
                theme-id="marketing-buy" 
                class="flex-1"
                :disabled="stockLoading || !hasStock || !hasSkus || submitting"
                :loading="submitting"
                @click="buyNow"
              >
                {{ stockLoading ? '加载中...' : (hasSkus && hasStock ? '立即极速购买' : '暂时缺货') }}
                <!-- Note: BaseButton slot handling for subtext might need custom styling inside or specific slot usage -->
                 <!-- Subtext strategy: BaseButton content slot -->
                 <!-- Actually BaseButton styles might not support block subtext easily without flex column. 
                      Let's check if we can style the content inside. -->
              </BaseButton>
              
              <div class="secondary-btns">
                <BaseButton 
                  theme-id="secondary" 
                  @click="handleAddToCartWrapper($event)" 
                  :disabled="stockLoading || !hasStock || !hasSkus || submitting"
                >
                  <el-icon><ShoppingCart /></el-icon>
                  加入购物车
                </BaseButton>

                <BaseButton 
                  theme-id="secondary"
                  :class="{ favorited: isFavorited }" 
                  @click="handleToggleFavorite($event)"
                  :disabled="stockLoading || !hasStock || !hasSkus"
                >
                  <el-icon><Star v-if="!isFavorited" /><StarFilled v-else /></el-icon>
                  {{ isFavorited ? '已收藏' : '收藏' }}
                </BaseButton>
              </div>
            </div>
            
            <!-- Safe Disclaimer needs a bit of margin if Buttons change size -->
            <div class="safe-disclaimer" style="margin-top: 20px;">
              <el-icon><InfoFilled /></el-icon>
              版权声明：本站展示的徽标、商标及相关标志归各权利人所有。
            </div>
          </div>
        </div>
      </div>

      <!-- 商品详情图文区 -->
      <div class="product-detail-rich">
        <div class="detail-divider">
          <span>商品详情介绍</span>
        </div>
        <div class="detail-content-wrap">
          <div v-for="(mod, idx) in detailModules" :key="idx" class="detail-module">
            <template v-if="mod.type === 'text'">
              <div class="detail-text-box">{{ mod.content }}</div>
            </template>
            <template v-else-if="mod.type === 'image'">
              <img :src="mod.content" class="detail-full-img" loading="lazy" decoding="async" />
            </template>
          </div>
        </div>
      </div>

      </div>
      </template>

    </div>
    

    <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { 
  ShoppingCart, 
  Star, 
  StarFilled,
  InfoFilled,
  ArrowLeft
} from '@element-plus/icons-vue'
import { onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useProductDetail } from '@/composables/client/useProductDetail'
import ProductGallery from '@/components/pc/goods/ProductGallery.vue'
// FaqTicker is below fold mostly, can be async
const FaqTicker = defineAsyncComponent(() => import('@/components/pc/goods/FaqTicker.vue'))
import BaseButton from '@/components/shared/BaseButton.vue'
import ProductDetailSkeleton from '@/components/pc/goods/ProductDetailSkeleton.vue'

const LoginRegisterModal = defineAsyncComponent(() => import('@/components/pc/modal/LoginRegisterModal.vue'))

const router = useRouter()
const {
  goodsId,
  goodsData,
  goodsError,
  goodsInfo,
  qty,
  stock,
  submitting,
  selectedSpecs,
  selectedSkuImage,
  stockLoading,
  hasStock,
  hasSkus,
  specGroups,
  matchedSku,
  currentPrice,
  skuImages,
  detailModules,
  allowAddon,
  faqs,
  pending, // Use pending
  formatPrice,
  handleSpecSelect,
  buyNow,
  addToCart,
  isFavorited,
  toggleFavorite,
  initClientState,
  modal
} = await useProductDetail()

// 动画 composable
import { useCartAnimation } from '@/composables/client/useCartAnimation'
const { startAnimation } = useCartAnimation()

import { useFlyingAnimation } from '@/composables/client/useFlyingAnimation'
const { startAnimation: startFavAnimation } = useFlyingAnimation()

// Logic for Ticker and Gallery moved to components
// Logic for Service Tags moved to ProductGallery

const goToFaq = (faq: any) => {
  if (faq.id) {
    router.push(`/faq?q=${faq.id}`)
  } else {
    router.push('/faq')
  }
}

const goBack = () => router.back()

// UI Wrappers for Actions with Animations
const handleAddToCart = (event: MouseEvent) => {
   addToCart(() => { // Success callback
      const btnEl = event.target as HTMLElement
      const target = btnEl.closest('button') || btnEl
      startAnimation(target, matchedSku.value?.image || goodsInfo.value.image, () => {
         const cartStore = useCartStore()
         cartStore.miniCartVisible = true
         ElMessage.success('已成功加入购物车')
      })
   })
}

// Wrapper to fix the async import issue in handleAddToCart
const handleAddToCartWrapper = async (event: MouseEvent) => {
    // We need to access the store to set visible. 
    // Let's standard import here.
    const { useCartStore } = await import('@/stores/client/cart')
    const cartStore = useCartStore()
    
    addToCart(() => {
       const btnEl = event.target as HTMLElement
       const target = btnEl.closest('button') || btnEl
       startAnimation(target, matchedSku.value?.image || goodsInfo.value.image, () => {
           cartStore.miniCartVisible = true
           ElMessage.success('已成功加入购物车')
       })
    })
}

const handleToggleFavorite = (event: MouseEvent) => {
    toggleFavorite(event, (target, image) => {
        startFavAnimation(target, image, 'favorites-icon-ref', () => {})
    })
}


onMounted(async () => {
  await initClientState()
})

onUnmounted(() => {
})
</script>

<style scoped src="@/assets/styles/goods-detail.css"></style>
<style scoped>
/* Additional overrides for BaseButton integration if needed */
.main-actions .base-button {
  height: 52px; /* Match original button height */
  font-size: 16px;
}
.secondary-btns {
  display: flex; gap: 12px;
}
</style>
