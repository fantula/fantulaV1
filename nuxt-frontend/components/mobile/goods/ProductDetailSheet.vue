<template>
  <Teleport to="body">
    <div class="sheet-wrapper">
      <transition name="sheet-fade">
        <div v-if="visible" class="sheet-overlay" @click="handleClose"></div>
      </transition>

      <transition name="sheet-slide">
        <div v-if="visible" class="sheet-panel" @click.stop>
          
          <!-- Top Marketing Strip (Premium Glass) -->
          <div class="marketing-strip-glass">
             <div class="ms-item">
                <el-icon class="ms-icon-gold"><CircleCheckFilled /></el-icon> 官方正品保证
             </div>
             <div class="ms-divider"></div>
             <div class="ms-item">
                <el-icon class="ms-icon-blue"><Lightning /></el-icon> 24h自动发货
             </div>
             <div class="ms-divider"></div>
             <div class="ms-item">
                <el-icon class="ms-icon-purple"><Umbrella /></el-icon> 售后无忧
             </div>
          </div>

          <!-- Header -->
          <div class="sheet-header">
             <!-- Skeleton Loading -->
             <div v-if="pending" style="width: 100%; display: flex; gap: 12px;">
                <el-skeleton-item variant="image" style="width: 88px; height: 88px; border-radius: 12px;" />
                <div style="flex: 1; padding-top: 4px;">
                   <el-skeleton-item variant="h3" style="width: 80%; margin-bottom: 8px;" />
                   <el-skeleton-item variant="h3" style="width: 40%;" />
                </div>
             </div>

             <div v-else class="header-left">
                <div class="thumb-box">
                  <img :src="selectedSkuImage || goodsInfo.image" class="sheet-thumb-img" loading="lazy" decoding="async" />
                </div>
                <div class="info-box">
                   <div class="h-title">{{ goodsInfo.name || '加载中...' }}</div>
                   <div class="h-price-row">
                      <div class="price-wrap">
                          <span class="cy">¥</span>
                          <span class="val">{{ formatPrice(currentPrice) }}</span>
                      </div>
                      <div class="stock-tag" :class="{ 'no-stock': !hasStock }">
                          {{ hasStock ? `库存: ${stock}` : '暂时缺货' }}
                      </div>
                   </div>
                </div>
             </div>
             
             <!-- Detail Button (Top Right) -->
             <!-- Help Button (Top Right, Refined) -->
             <button class="help-btn" @click="showDetailViewer = true" v-if="!pending">
                <el-icon class="h-icon"><QuestionFilled /></el-icon>
                <span>显示帮助</span>
             </button>
          </div>

          <!-- Scrollable Body -->
          <div class="sheet-body">
              <!-- Skeleton Body -->
              <div v-if="pending">
                  <el-skeleton-item variant="rect" style="width: 100%; height: 40px; border-radius: 20px; margin-bottom: 20px;" />
                  <div style="margin-bottom: 20px;">
                      <el-skeleton-item variant="text" style="width: 40px; margin-bottom: 10px;" />
                      <div style="display: flex; gap: 10px;">
                          <el-skeleton-item variant="button" style="width: 60px; height: 32px; border-radius: 8px;" />
                          <el-skeleton-item variant="button" style="width: 60px; height: 32px; border-radius: 8px;" />
                      </div>
                  </div>
              </div>

              <template v-else>
              <!-- FAQ Ticker -->
              <!-- FAQ Ticker (Re-inserted) -->
              <!-- FAQ Ticker (Vertical Pill) -->
              <div class="faq-sticker-pill" v-if="faqs.length > 0" @click="showDetailViewer = true">
                 <div class="faq-pill-text-wrap">
                    <div class="faq-pill-track" :style="trackStyle">
                       <div v-for="(f,i) in displayFaqs" :key="i" class="faq-pill-item">
                           {{ f.question }}
                       </div>
                    </div>
                 </div>
                 <el-icon class="faq-arrow"><ArrowRight /></el-icon>
              </div>

              <!-- Specs -->
              <div class="specs-area" v-if="specGroups.length > 0">
                 <div v-for="group in specGroups" :key="group.name" class="spec-row">
                    <div class="s-label">{{ group.name }}</div>
                    <div class="s-vals">
                       <div 
                         v-for="val in group.values" 
                         :key="val"
                         :class="['val-chip', { active: selectedSpecs[group.name] === val }]"
                         @click="handleSpecSelect(group.name, val)"
                       >
                         {{ val }}
                       </div>
                    </div>
                 </div>
              </div>
              
              <!-- SKU Intro -->
              <div class="sku-intro-box" v-if="matchedSku && matchedSku.intro">
                 <InfoFilled class="info-icon" />
                 <span>{{ matchedSku.intro }}</span>
              </div>

              <!-- Quantity -->
              <div class="qty-row" v-if="allowAddon && hasStock">
                 <span class="q-label">购买数量</span>
                 <div class="q-ctrl">
                    <div class="q-btn" @click="qty = Math.max(1, qty-1)" :class="{ disabled: qty <= 1 }">-</div>
                    <div class="q-num">{{ qty }}</div>
                    <div class="q-btn" @click="qty = qty+1" :class="{ disabled: qty >= stock }">+</div>
                 </div>
              </div>
              </template>
          </div>

          <!-- Footer Actions -->
          <div class="sheet-footer">
              <div class="icon-btns">
                 <div class="ib-item" @click="handleToggleFavorite">
                    <el-icon :class="['action-icon', { active: isFavorited }]">
                        <component :is="isFavorited ? StarFilled : Star" />
                    </el-icon>
                    <span>收藏</span>
                 </div>
              </div>
              
              <div class="main-btns">
                  <button 
                    class="btn-mobile-base btn-mobile-ghost btn-cart" 
                    @click="addToCart" 
                    :disabled="!hasStock || pending"
                  >
                     加入购物车
                  </button>
                  <button 
                    class="btn-mobile-base btn-mobile-accent btn-buy-now" 
                    @click="buyNow" 
                    :disabled="!hasStock || pending"
                  >
                     立即购买
                  </button>
              </div>
          </div>

        </div>
      </transition>
      
      <!-- Centered Detail Viewer Modal (Custom Popup) -->
      <transition name="pop-scale">
         <div v-if="showDetailViewer" class="detail-modal-mask" @click="showDetailViewer = false">
            <div class="detail-modal simple-popup" @click.stop>
               <!-- Close Button Only (Overlay) -->
               <div class="simple-close" @click="showDetailViewer = false">
                  <Close class="close-icon" />
               </div>
               
               <div class="dm-content no-header">
                  <div v-if="detailModules.length === 0" class="empty-detail">
                     <div class="empty-icon">📦</div>
                     <span>暂无详情</span>
                  </div>
                  <div v-else v-for="(mod, idx) in detailModules" :key="idx" class="dm-mod">
                     <img v-if="mod.type === 'image'" :src="mod.content" loading="lazy" decoding="async" />
                     <div v-else-if="mod.type === 'text'" class="dm-text">{{ mod.content }}</div>
                  </div>
               </div>
            </div>
         </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Picture, CircleCheckFilled, Star, StarFilled, Service, Close, 
  Lightning, Umbrella, Document, InfoFilled, ArrowRight, QuestionFilled
} from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/client/cart'
import { useUserStore } from '@/stores/client/user'
import { useToast } from '@/composables/mobile/useToast'
import { useProductDetail } from '@/composables/client/useProductDetail'
import { favoriteApi } from '@/api/client/common' // Direct API use for custom UI feedback

const props = defineProps<{
  visible: boolean
  goodsId: string | number
}>()

const emit = defineEmits(['update:visible'])
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const { showToast } = useToast()

// --- Shared Logic ---
// We pass the goodsId prop as a Ref to the composable
const {
  // State
  pending, // Replaces loading
  goodsInfo,
  skus,
  specGroups,
  faqs,      // Computed from fallback + fetch
  detailModules,
  allowAddon,
  
  // Interactive State
  qty,
  stock,
  selectedSpecs,
  selectedSkuImage,
  isFavorited,
  
  // Computed
  currentPrice,
  hasStock,
  matchedSku,
  skuAvailable, // used for stock check
  
  // Methods
  formatPrice,
  handleSpecSelect,
  initClientState,
  modal
} = useProductDetail(toRef(props, 'goodsId'))

// --- Mobile Specific UI State ---
const showDetailViewer = ref(false)

// --- FAQ Ticker Logic (UI Only) ---
const activeFaqIndex = ref(0)
const isTransitioning = ref(true)
let faqTimer: any = null

const displayFaqs = computed(() => {
    if (faqs.value.length === 0) return []
    return [...faqs.value, faqs.value[0]] 
})

const trackStyle = computed(() => ({
    transform: `translateY(-${activeFaqIndex.value * 100}%)`,
    transition: isTransitioning.value ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
}))

const startFaqTicker = () => {
    if (faqTimer) clearInterval(faqTimer)
    faqTimer = setInterval(() => {
        isTransitioning.value = true
        activeFaqIndex.value += 1
        if (activeFaqIndex.value === faqs.value.length) {
            setTimeout(() => {
                isTransitioning.value = false
                activeFaqIndex.value = 0
            }, 500)
        }
    }, 3000)
}

onMounted(() => {
    if (faqs.value.length > 0) startFaqTicker()
})

onUnmounted(() => {
    if (faqTimer) clearInterval(faqTimer)
})

watch(() => faqs.value, () => startFaqTicker())

// --- Methods (Mobile Specific Action Wrappers) ---
const handleClose = () => emit('update:visible', false)

// Override default interaction methods to use ShowToast instead of ElMessage
const addToCart = async () => {
    if (!userStore.isLoggedIn) return showToast('请登录', 'warning')
    // Safe check if SKUs exist but none matched
    if (!matchedSku.value && skus.value.length > 0) return showToast('请选择规格', 'warning')
    
    // Fallback ID if no SKUs (some products might not have SKUs)
    const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id 
    if (!skuId) return showToast('商品信息异常', 'error')
    
    // Direct call to cart store (same as composable but handling UI here)
    const res = await cartStore.addToCart(skuId, qty.value)
    if (res.success) {
        showToast('已加入购物车', 'success')
        handleClose()
    } else {
        showToast(res.msg || '失败', 'error')
    }
}

const buyNow = async () => {
     if (!userStore.isLoggedIn) return showToast('请登录', 'warning')
     if (!matchedSku.value && skus.value.length > 0) return showToast('请选择规格', 'warning')
     
     const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id
     if (!skuId) return showToast('商品信息异常', 'error')

     const { supabasePreOrderApi } = await import('@/api/client/supabase')
     const res = await supabasePreOrderApi.createPreOrder(skuId, qty.value, 'buy_now')
     if (res.success) {
         handleClose()
         router.push(`/mobile/checkout/${res.pre_order_id}`)
     } else {
         showToast(res.error || '失败', 'error')
     }
}

const handleToggleFavorite = async () => {
    if (!userStore.isLoggedIn) return showToast('请登录', 'warning')
    
    // Optimistic UI or wait? Better wait.
    // Logic from favoriteApi
    if (isFavorited.value) {
         showToast('取消收藏请前往"我的收藏"页面', 'info')
         return
    }
    
    const skuId = matchedSku.value?.id ? String(matchedSku.value.id) : undefined
    const res = await favoriteApi.addFavorite(String(goodsInfo.value.id), skuId)
    if (res.success) {
        isFavorited.value = true
        showToast('收藏成功', 'success')
    } else {
        showToast(res.msg || '收藏失败', 'error')
    }
}

// Lifecycle Init
watch(() => props.visible, async (val) => {
   if (val && props.goodsId) {
       // Trigger the composable's fetch logic logic
       await initClientState()
   }
})
</script>

<style scoped>
/* Wrapper Z-Index High */
.sheet-wrapper { z-index: 3050; position: relative; }

.sheet-overlay { 
  position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 3050;
  backdrop-filter: blur(4px);
}

.sheet-panel {
  position: fixed; bottom: 0; left: 0; width: 100%; 
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px 24px 0 0;
  z-index: 3051;
  padding-bottom: 0; /* Footer handles padding */
  max-height: 85vh;
  display: flex; flex-direction: column;
  box-shadow: 0 -8px 30px rgba(0,0,0,0.5);
  border-top: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
}

/* Marketing Strip (New) */
.marketing-strip-glass {
  height: 40px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center; gap: 16px;
}
.ms-item {
  font-size: 11px; color: #94A3B8; display: flex; align-items: center; gap: 4px; font-weight: 500;
}
.ms-icon-gold { color: #F59E0B; font-size: 14px; }
.ms-icon-blue { color: #38BDF8; font-size: 14px; }
.ms-icon-purple { color: #A855F7; font-size: 14px; }

.ms-divider { width: 1px; height: 12px; background: rgba(255,255,255,0.1); }

/* Header */
.sheet-header {
  padding: 16px; display: flex; justify-content: space-between; align-items: flex-start;
}
.header-left { display: flex; gap: 12px; flex: 1; }
.thumb-box { 
   width: 88px; height: 88px; border-radius: 12px; overflow: hidden; 
   background: #000; border: 1px solid var(--primary); 
   flex-shrink: 0;
}
.sheet-thumb-img { width: 100%; height: 100%; object-fit: cover; }
.info-box { display: flex; flex-direction: column; justify-content: center; padding-top: 4px; }
.h-title { 
   color: #fff; font-size: 16px; font-weight: 600; line-height: 1.4; margin-bottom: 8px; 
   display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.h-price-row { display: flex; align-items: center; gap: 8px; }
.price-wrap { color: var(--accent); display: flex; align-items: baseline; }
.cy { font-size: 12px; font-weight: 600; margin-right: 2px; }
.val { font-size: 22px; font-family: 'DIN Alternates'; font-weight: 700; }
.stock-tag { 
   font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(52, 211, 153, 0.2); color: #34D399; 
}
.stock-tag.no-stock { background: rgba(239, 68, 68, 0.2); color: #EF4444; }

.help-btn {
  display: flex; align-items: center; gap: 4px;
  background: rgba(56, 189, 248, 0.1); 
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 14px; padding: 4px 10px; cursor: pointer;
  margin-left: 10px; height: 28px;
}
.help-btn .h-icon { font-size: 14px; color: #38BDF8; }
.help-btn span { color: #38BDF8; font-size: 11px; font-weight: 500; }

/* Body */
.sheet-body { flex: 1; overflow-y: auto; padding: 10px 16px 20px; }

/* FAQ Ticker (Vertical Pill Style) */
.faq-sticker-pill {
  margin: 0 0 16px; /* Remove side margin to fill container */
  height: 40px; 
  background: rgba(255, 255, 255, 0.05); /* Ghost Style */
  border: 1px solid rgba(255, 255, 255, 0.1); 
  border-radius: 20px; 
  padding: 0 12px;
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.faq-pill-text-wrap {
    flex: 1; height: 100%; overflow: hidden; position: relative;
    /* Optional mask for smooth text entry */
}
.faq-pill-track {
    display: flex; flex-direction: column; height: 100%;
}
.faq-pill-item {
    height: 100%; flex-shrink: 0;
    display: flex; align-items: center;
    font-size: 13px; color: #E2E8F0; /* Brighter text */
    font-weight: 500;
}
.faq-arrow { color: #64748B; font-size: 14px; margin-left: 8px; }

/* Specs */
.specs-area { margin-bottom: 20px; }
.spec-row { margin-bottom: 12px; }
.s-label { font-size: 12px; color: #94A3B8; margin-bottom: 8px; }
.s-vals { display: flex; flex-wrap: wrap; gap: 10px; }
.val-chip {
  padding: 6px 14px; background: rgba(255,255,255,0.05); border-radius: 8px;
  font-size: 12px; color: #CBD5E1; border: 1px solid rgba(255,255,255,0.1);
  transition: all 0.2s;
}
.val-chip.active {
  background: rgba(249, 115, 22, 0.2); color: var(--accent); border-color: var(--accent);
  box-shadow: 0 0 10px rgba(249, 115, 22, 0.2);
}

/* SKU Intro */
.sku-intro-box {
   background: #3B82F615; border: 1px solid #3B82F630;
   border-radius: 8px; padding: 10px; 
   display: flex; gap: 8px; align-items: flex-start; 
   margin-bottom: 20px;
}
.sku-intro-box .el-icon { color: #3B82F6; margin-top: 2px; }
.sku-intro-box span { font-size: 12px; color: #60A5FA; line-height: 1.4; }

/* Qty */
.qty-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.q-label { font-size: 13px; color: #E2E8F0; }
.q-ctrl { display: flex; align-items: center; background: #1F2937; border-radius: 6px; padding: 2px; }
.q-btn { 
   width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; 
   color: #fff; font-size: 16px; cursor: pointer;
}
.q-btn.disabled { opacity: 0.2; cursor: not-allowed; }
.q-num { width: 32px; text-align: center; color: #fff; font-weight: 600; font-size: 14px; }

/* Icon sizes */
.info-icon { width: 14px; height: 14px; margin-top: 2px; color: #3B82F6; }

/* Footer */
.sheet-footer {
  padding: 12px 16px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 30px); /* Extra lift */
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex; gap: 16px; align-items: center;
}
.icon-btns { display: flex; gap: 16px; }
.icon-btns { display: flex; gap: 16px; }
.ib-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #94A3B8; font-size: 10px; cursor: pointer; }
.action-icon { width: 20px; height: 20px; color: #94A3B8; }
.action-icon.active { color: #F59E0B; }

.main-btns { flex: 1; display: flex; gap: 12px; }

.btn-cart { 
    flex: 1; 
    height: 50px; /* Taller */
    border-radius: 14px; /* Squircle, not pill */
    font-size: 15px; 
    font-weight: 600;
    color: #fff !important;
    background: rgba(255,255,255,0.08) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
}
.btn-buy-now { 
    flex: 1.5; 
    height: 50px; /* Taller */
    border-radius: 14px; /* Squircle */
    font-size: 16px; 
    font-weight: 700;
    box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4); /* Stronger shadow */
    background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
}

.btn-cart:disabled, .btn-buy-now:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; filter: grayscale(100%); }

/* Centered Pop Modal */
.detail-modal-mask {
   position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 3100;
   display: flex; align-items: center; justify-content: center;
   backdrop-filter: blur(5px);
}
.detail-modal {
   width: 85%; max-height: 70vh; 
   background: #1E293B; border-radius: 16px;
   display: flex; flex-direction: column; overflow: hidden;
   box-shadow: 0 20px 40px rgba(0,0,0,0.8);
   border: 1px solid rgba(255,255,255,0.1);
}
/* Simple Popup Style */
.detail-modal.simple-popup {
   width: 80%; max-height: 60vh;
   background: #1E293B; border-radius: 12px;
   overflow: hidden; position: relative;
   box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.simple-close {
   position: absolute; top: 10px; right: 10px; z-index: 10;
   width: 24px; height: 24px;
   background: rgba(0,0,0,0.3); border-radius: 50%;
   display: flex; align-items: center; justify-content: center;
   color: #fff; cursor: pointer; backdrop-filter: blur(4px);
}
.dm-content.no-header { padding-top: 0; background: #000; }
.close-icon { width: 12px; height: 12px; }

/* Empty Detail */
.empty-detail { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #64748B; gap: 10px; }
.empty-icon { font-size: 32px; opacity: 0.5; }
.dm-content { flex: 1; overflow-y: auto; background: #000; padding-bottom: 20px; }
.dm-mod img { width: 100%; display: block; }
.dm-text { color: #ccc; padding: 16px; font-size: 14px; line-height: 1.6; }

/* Transitions */
.sheet-fade-enter-active, .sheet-fade-leave-active { transition: opacity 0.3s; }
.sheet-fade-enter-from, .sheet-fade-leave-to { opacity: 0; }
.sheet-slide-enter-active, .sheet-slide-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.sheet-slide-enter-from, .sheet-slide-leave-to { transform: translateY(100%); }

.pop-scale-enter-active, .pop-scale-leave-active { transition: all 0.2s ease; }
.pop-scale-enter-from, .pop-scale-leave-to { opacity: 0; transform: scale(0.9); }
</style>
