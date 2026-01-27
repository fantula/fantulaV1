<template>
  <div class="goods-detail-page">

    
    <!-- 顶部占位 -->
    <div style="height: 20px;"></div>

    <!-- 异常提示 -->
    <div v-if="goodsError" class="api-warning-bar">
      ⚠️ 网络连接异常，正在预览演示数据
    </div>
    
    <div class="goods-content">
      <!-- 返回按钮 -->
      <div class="back-btn-row">
        <button class="back-btn" @click="goBack">
          <span class="back-btn-icon">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" style="display: block;">
              <path d="M18.5 10L13 16L18.5 22" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="back-btn-text">返回上一页</span>
        </button>
      </div>
      
      <div class="goods-detail-content">
        <div class="goods-main-section">
          <!-- 左侧：图片展示区 (与 SKU 联动) -->
          <div class="goods-left-panel">
            <div class="main-image-wrapper">
              <div class="main-image">
                <el-image 
                  :src="selectedSkuImage || goodsInfo.image" 
                  fit="contain" 
                  class="sku-big-img"
                >
                  <template #placeholder>
                    <div class="img-loading-placeholder">加载中...</div>
                  </template>
                </el-image>
              </div>
              <!-- SKU 绑定的图片列表滚动展示 -->
              <div class="sku-thumb-scroll" v-if="skuImages && skuImages.length > 0">
                <div 
                  v-for="(img, idx) in skuImages" 
                  :key="idx" 
                  :class="['sku-thumb-item', { active: selectedSkuImage === img }]"
                  @click="selectedSkuImage = img"
                >
                  <img :src="img" alt="SKU图片" />
                </div>
              </div>
            </div>

            <!-- 卖点保障区 (Unique 样式) -->
            <div class="premium-service-card">
              <div class="premium-service-title">服务保障</div>
              <div class="premium-service-grid">
                <div class="p-service-item" v-for="tag in serviceTags" :key="tag">
                  <el-icon class="p-icon"><CircleCheck /></el-icon>
                  <span>{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：信息与规格选择 -->
          <div class="goods-info-panel">
            <div class="info-header">
              <h1 class="product-name">{{ goodsInfo.name }}</h1>
              <div class="product-sales-badge">
                累计销量 <span>{{ goodsInfo.sales }}</span>
              </div>
            </div>

            <!-- FAQ 滚动轮播条 -->
            <!-- FAQ 滚动轮播条 (优化版) -->
            <div class="faq-ticker-bar" v-if="faqs.length > 0" @click="goToFaq({})">
              <div class="faq-ticker-container">
                <div class="faq-ticker-track" :style="tickerStyle">
                  <!-- 显示列表 + 原样克隆的第一项用于无缝衔接 -->
                  <div 
                    class="faq-ticker-item" 
                    v-for="(faq, idx) in displayFaqs" 
                    :key="idx"
                  >
                    {{ faq.question }}
                  </div>
                </div>
              </div>
              <div class="faq-arrow-wrap">
                <el-icon><Right /></el-icon>
              </div>
            </div>

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
              <button class="primary-buy-btn" @click="buyNow" :disabled="stockLoading || !hasStock || !hasSkus || submitting">
                {{ stockLoading ? '加载中...' : (hasSkus && hasStock ? '立即极速购买' : '暂时缺货') }}
                <span class="btn-subtext" v-if="!stockLoading && hasStock && hasSkus">安全合规·秒速发货</span>
              </button>
              <div class="secondary-btns">
                <button class="add-cart-btn" @click="handleAddToCartWrapper($event)" :disabled="stockLoading || !hasStock || !hasSkus || submitting">
                  <el-icon><ShoppingCart /></el-icon>
                  加入购物车
                </button>
                <button 
                  :class="['favorite-btn', { favorited: isFavorited }]" 
                  @click="handleToggleFavorite($event)"
                  :disabled="stockLoading || !hasStock || !hasSkus"
                >
                  <el-icon><Star v-if="!isFavorited" /><StarFilled v-else /></el-icon>
                  {{ isFavorited ? '已收藏' : '收藏商品' }}
                </button>
              </div>
            </div>

            <div class="safe-disclaimer">
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
              <img :src="mod.content" class="detail-full-img" loading="lazy" />
            </template>
          </div>
        </div>
      </div>

    </div>
    

    <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { 
  CircleCheck, 
  ShoppingCart, 
  Star, 
  StarFilled,
  InfoFilled,
  Right
} from '@element-plus/icons-vue'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductDetail } from '@/composables/client/useProductDetail'

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

// Services Tags
const serviceTags = [
  '官方采购・正品保障',
  '全程质保・无忧售后',
  '极速响应・人工服务',
  '安全加密・隐私保护'
]

// FAQ Ticker Logic (View specific)
import { ref, computed } from 'vue'
const activeFaqIndex = ref(0)
const isTransitioning = ref(true)
let tickerTimer: any = null

const displayFaqs = computed(() => {
  if (faqs.value.length === 0) return []
  return [...faqs.value, faqs.value[0]] 
})

const tickerStyle = computed(() => ({
  transform: `translateY(-${activeFaqIndex.value * 40}px)`,
  transition: isTransitioning.value ? 'transform 0.5s ease-in-out' : 'none'
}))

const startFaqTicker = () => {
  if (tickerTimer) clearInterval(tickerTimer)
  tickerTimer = setInterval(() => {
    isTransitioning.value = true
    activeFaqIndex.value++
    if (activeFaqIndex.value === faqs.value.length) {
      setTimeout(() => {
        isTransitioning.value = false 
        activeFaqIndex.value = 0 
      }, 500) 
    }
  }, 3000) 
}

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
         // We need to access cartStore to show miniCart.
         // Since we are in the same bundle context, we can just use the store instance if we imported it.
         // Or rely on the store already being active.
         // Let's assume global `useCartStore` is available or import it statically at top.
         // Note: We used `cartStore` from useProductDetail. It was exported.
         // Ah, wait. `useProductDetail` DOES NOT export `cartStore`. It exports `modal` but not `cartStore`.
         // I should updated useProductDetail to export cartStore? 
         // Or just import it here statically.
         
         const cartStore = useCartStore()
         cartStore.miniCartVisible = true
         ElMessage.success('已成功加入购物车')
      })
   })
}

// Wrapper to fix the async import issue in handleAddToCart
const handleAddToCartWrapper = async (event: MouseEvent) => {
    // Re-implementing wrapper logic to be safe
    // We can't pass async callback to addToCart easily if it expects sync.
    // Let's look at useProductDetail.addToCart signature: (callback?: () => void)
    
    // Valid implementation:
    // 1. Call standard addToCart
    // 2. In callback, trigger animation
    
    // But wait, the standard `addToCart` in composable calls `cartStore.addToCart` then runs callback.
    // The `useCartStore` is already used inside composable.
    // We just need to trigger animation.
    
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
  startFaqTicker()
})

onUnmounted(() => {
  if (tickerTimer) clearInterval(tickerTimer)
})
</script>

<style scoped src="@/assets/styles/goods-detail.css"></style>
