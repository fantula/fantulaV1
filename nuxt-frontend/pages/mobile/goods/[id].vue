<template>
  <div class="mobile-goods-detail">
    <!-- Top Area: Image, Price, Sales (Sticky/Fixed Top or Scrollable?) 
         User Requirement: "Bottom Sheet style". "The bottom sheet height depends on SKU content". "Top left is image, next is price/sales".
         Interpretation: The entire "detail card" is a bottom sheet that slides up over a background (maybe blurred product image?).
         Let's make the background the product image (blurred) and the main content a sheet at the bottom.
    -->
    
    <!-- Background Layer -->
    <div class="bg-layer">
      <img :src="goodsInfo.image" class="bg-img" />
      <div class="bg-overlay"></div>
    </div>

    <!-- Navigation Bar (Absolute Top) -->
    <div class="nav-header">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div class="page-title">商品详情</div>
      <div class="share-btn">
        <!-- Optional Share/More -->
      </div>
    </div>

    <!-- Main Content Sheet -->
    <div class="content-sheet">
       <!-- 1. Header Section: Image + Info -->
       <div class="sheet-header">
         <div class="product-thumb">
           <el-image 
             :src="selectedSkuImage || goodsInfo.image" 
             fit="cover" 
             class="thumb-img"
             :preview-src-list="[selectedSkuImage || goodsInfo.image]" 
             :initial-index="0"
           >
              <template #placeholder>
                <div class="loading-placeholder">...</div>
              </template>
           </el-image>
         </div>
         <div class="product-info-col">
            <h1 class="m-product-title">{{ goodsInfo.name }}</h1>
            <div class="m-price-row">
               <span class="currency">¥</span>
               <span class="price-val">{{ formatPrice(currentPrice) }}</span>
            </div>
            <div class="m-sales-row">
               <span class="sales-tag">销量 {{ goodsInfo.sales }}</span>
               <span class="stock-tag" v-if="hasStock">库存充足</span>
               <span class="stock-tag out" v-else>暂时缺货</span>
            </div>
         </div>
       </div>

       <!-- 2. FAQ Ticker (Horizontal Scroll) -->
       <div class="faq-section" v-if="faqs.length > 0">
          <div class="faq-icon">
            <el-icon><QuestionFilled /></el-icon>
          </div>
          <div class="faq-content">
             <!-- Text ticker using CSS animation or JS -->
             <div class="marquee-track">
                <span v-for="(faq, i) in faqs" :key="i" class="faq-item">
                  <span class="q-tag">问</span> {{ faq.question }}
                </span>
                 <!-- Clone for infinite loop visual -->
                <span v-for="(faq, i) in faqs" :key="'clone-'+i" class="faq-item">
                  <span class="q-tag">问</span> {{ faq.question }}
                </span>
             </div>
          </div>
       </div>

       <!-- 3. SKU Selection Area -->
       <div class="sku-section" v-if="hasSkus">
          <div v-for="group in specGroups" :key="group.name" class="spec-group">
             <div class="group-title">{{ group.name }}</div>
             <div class="spec-options">
                <div 
                   v-for="val in group.values" 
                   :key="val"
                   :class="['spec-chip', { active: selectedSpecs[group.name] === val }]"
                   @click="handleSpecSelect(group.name, val)"
                >
                   {{ val }}
                </div>
             </div>
          </div>
       </div>
       
       <!-- No SKU State -->
       <div v-else class="no-sku-state">
          商品规格加载中...
       </div>

       <!-- 4. SKU Intro -->
       <div class="sku-intro" v-if="matchedSku?.intro">
          <div class="intro-box">
             <el-icon class="info-icon"><InfoFilled /></el-icon>
             <div class="intro-text">{{ matchedSku.intro }}</div>
          </div>
       </div>

       <!-- 5. Product Detail Content (Rich Text/Images) -->
       <!-- User didn't explicitly ask for this in "mobile layout", but usually it's below. 
            Request says: "image -> price/sales -> FAQ -> SKU -> SKU intro -> Bottom Buttons".
            It didn't strictly say "no detail content". I will put it at bottom, scrollable.
       -->
       <div class="detail-content">
           <div class="detail-divider">—— 商品详情 ——</div>
           <div v-for="(mod, idx) in detailModules" :key="idx" class="m-detail-mod">
              <div v-if="mod.type === 'text'" class="m-text-mod">{{ mod.content }}</div>
              <img v-else-if="mod.type === 'image'" :src="mod.content" class="m-img-mod" loading="lazy"/>
           </div>
       </div>
       
       <!-- Safe Area for Bottom Bar -->
       <div class="bottom-spacer"></div>
    </div>

    <!-- Fixed Bottom Action Bar -->
    <div class="bottom-action-bar">
       <div class="icon-actions">
          <div class="action-item" @click="handleToggleFavorite($event)">
             <el-icon :class="{ active: isFavorited }"><StarFilled v-if="isFavorited"/><Star v-else/></el-icon>
             <span>收藏</span>
          </div>
          <!-- More items if needed (e.g. Service) -->
       </div>
       <div class="btn-actions">
          <button class="m-btn cart" @click="handleAddToCartWrapper($event)">加入购物车</button>
          <button class="m-btn buy" @click="buyNow">立即购买</button>
       </div>
    </div>

    <!-- Login Modal -->
    <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
    
    <!-- Flying Animation Target (Optional, if we want to support it on mobile) -->
    <!-- We can reuse the same composable if it works on generic elements -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mobile',
  hideTabBar: true
})

import { 
  ArrowLeft,
  QuestionFilled,
  InfoFilled,
  Star,
  StarFilled  
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useProductDetail } from '@/composables/client/useProductDetail'
// Mobile styles
import '@/assets/styles/mobile-goods.css' // We will create this

const router = useRouter()

// Use the Shared Logic
const {
  goodsInfo,
  currentPrice,
  hasStock,
  stockLoading,
  faqs,
  hasSkus,
  specGroups,
  selectedSpecs,
  handleSpecSelect,
  matchedSku,
  detailModules,
  selectedSkuImage,
  formatPrice,
  buyNow,
  addToCart,
  toggleFavorite,
  isFavorited,
  initClientState,
  modal
} = await useProductDetail()

// Animations
import { useCartAnimation } from '@/composables/client/useCartAnimation'
const { startAnimation } = useCartAnimation()
import { useFlyingAnimation } from '@/composables/client/useFlyingAnimation'
const { startAnimation: startFavAnimation } = useFlyingAnimation()

// Wrappers
const handleAddToCartWrapper = async (event: MouseEvent) => {
    // Import store here if needed, or rely on logic in addToCart
    // On mobile, maybe show a Toast instead of "MiniCart" (which might not exist on mobile)
    // But logic is reused.
    addToCart(async () => {
       ElMessage.success('已加入购物车')
       // Optional: Add Animation
    })
}

const handleToggleFavorite = (event: MouseEvent) => {
    toggleFavorite(event)
}

// Init
onMounted(async () => {
   await initClientState()
})
</script>

<style scoped>
/* Scoped styles/overrides if needed. Main styles in external file for cleanliness */
.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  height: 100%;
  color: #909399;
}
</style>
