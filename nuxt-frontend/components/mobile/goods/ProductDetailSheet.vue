<template>
  <Teleport to="body">
    <div class="sheet-wrapper">
      <transition name="sheet-fade">
        <div v-if="visible" class="sheet-overlay" @click="handleClose"></div>
      </transition>

      <transition name="sheet-slide">
        <div v-if="visible" class="sheet-panel" @click.stop>
          
          <!-- Top Marketing Strip -->
          <div class="marketing-strip">
             <div class="ms-item">
                <el-icon><CircleCheckFilled /></el-icon> 官方正品
             </div>
             <div class="ms-item">
                <el-icon><Lightning /></el-icon> 自动发货
             </div>
             <div class="ms-item">
                <el-icon><Umbrella /></el-icon> 售后无忧
             </div>
          </div>

          <!-- Header -->
          <div class="sheet-header">
             <div class="header-left">
                <div class="thumb-box">
                  <el-image :src="selectedSkuImage || goodsInfo.image" fit="cover">
                     <template #placeholder><div class="img-ph"></div></template>
                  </el-image>
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
             <button class="detail-btn" @click="showDetailViewer = true">
                <div class="d-icon-circle">
                   <el-icon><Document /></el-icon>
                </div>
                <span>图文详情</span>
             </button>
          </div>

          <!-- Scrollable Body -->
          <div class="sheet-body">
              <!-- FAQ Ticker -->
              <div class="faq-bar" v-if="faqs.length > 0">
                 <div class="faq-label">常见问题</div>
                 <div class="faq-text-wrap">
                    <div class="faq-scroll-track">
                       <span v-for="(f,i) in faqs" :key="i" class="faq-item">{{ f.question }}</span>
                       <!-- Duplicate for seamless loop -->
                       <span v-for="(f,i) in faqs" :key="`dup-${i}`" class="faq-item">{{ f.question }}</span>
                    </div>
                 </div>
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
                 <el-icon><InfoFilled /></el-icon>
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
          </div>

          <!-- Footer Actions -->
          <div class="sheet-footer">
              <div class="icon-btns">
                 <div class="ib-item" @click="handleToggleFavorite">
                    <el-icon :class="{ active: isFavorited }"><StarFilled v-if="isFavorited"/><Star v-else/></el-icon>
                    <span>收藏</span>
                 </div>
                 <div class="ib-item" @click="contactService">
                    <el-icon><Service /></el-icon>
                    <span>客服</span>
                 </div>
              </div>
              
              <div class="main-btns">
                  <button 
                    v-if="allowAddon" 
                    class="btn-cart" 
                    @click="addToCart" 
                    :disabled="!hasStock || loading"
                  >
                     加入购物车
                  </button>
                  <button 
                    class="btn-buy" 
                    @click="buyNow" 
                    :disabled="!hasStock || loading"
                    :style="{ flex: allowAddon ? 1 : 2 }"
                  >
                     立即购买
                  </button>
              </div>
          </div>

        </div>
      </transition>
      
      <!-- Centered Detail Viewer Modal -->
      <transition name="pop-scale">
         <div v-if="showDetailViewer" class="detail-modal-mask" @click="showDetailViewer = false">
            <div class="detail-modal" @click.stop>
               <div class="dm-header">
                  <span>商品详情</span>
                  <div class="dm-close" @click="showDetailViewer = false">
                     <el-icon><Close /></el-icon>
                  </div>
               </div>
               <div class="dm-content">
                  <div v-if="detailModules.length === 0" class="empty-detail">
                     <el-empty description="暂无详情" :image-size="60" />
                  </div>
                  <div v-else v-for="(mod, idx) in detailModules" :key="idx" class="dm-mod">
                     <img v-if="mod.type === 'image'" :src="mod.content" loading="lazy" />
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
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Picture, CircleCheckFilled, Star, StarFilled, Service, Close, 
  Lightning, Umbrella, Document, InfoFilled
} from '@element-plus/icons-vue'
import { goodsApi } from '@/api/client/goods'
import { supabaseFaqApi, supabaseProductApi } from '@/api/client/supabase'
import { useCartStore } from '@/stores/client/cart'
import { useUserStore } from '@/stores/client/user'

const props = defineProps<{
  visible: boolean
  goodsId: string | number
}>()

const emit = defineEmits(['update:visible'])
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

// --- State ---
const loading = ref(false)
const goodsInfo = ref<any>({})
const skus = ref<any[]>([])
const specGroups = ref<any[]>([])
const faqs = ref<any[]>([])
const detailModules = ref<any[]>([])

const selectedSpecs = ref<Record<string, string>>({})
const qty = ref(1)
const stock = ref(0)
const isFavorited = ref(false)
const showDetailViewer = ref(false)
const allowAddon = ref(true) // Default true, fetch to confirm

// --- Computed ---
const matchedSku = computed(() => {
  if (skus.value.length === 0) return null
  return skus.value.find((sku: any) => {
    const combination = sku.spec_combination || {}
    return Object.entries(selectedSpecs.value).every(([k, v]) => combination[k] === v)
  })
})

const currentPrice = computed(() => matchedSku.value?.price || goodsInfo.value.price || 0)
const hasStock = computed(() => stock.value > 0)
const selectedSkuImage = computed(() => matchedSku.value?.image)

// --- Methods ---
const formatPrice = (p: any) => Number(p).toFixed(2)
const handleClose = () => emit('update:visible', false)

const checkSkuAvailability = async (skuId: string) => {
    try {
       const res = await supabaseProductApi.checkSkuAvailability(skuId)
       stock.value = res.available ? res.availableCount : 0
    } catch(e) { stock.value = 0 }
}

const handleSpecSelect = async (group: string, val: string) => {
   selectedSpecs.value[group] = val
   if (matchedSku.value) {
       await checkSkuAvailability(matchedSku.value.id)
   }
}

const fetchData = async (id: string) => {
   loading.value = true
   try {
      const res = await goodsApi.getGoodsDetail(id)
      if (res.success && res.data) {
          const d = res.data
          goodsInfo.value = {
             name: d.product_name || d.title,
             image: d.coverImage || d.image,
             price: d.price
          }
          skus.value = d.skus || []
          detailModules.value = d.detail_modules || []
          allowAddon.value = d.allow_addon === true // Consistency Check
          
          if (skus.value.length > 0) {
             const groups: Record<string, Set<string>> = {}
             skus.value.forEach((s: any) => {
                const comb = s.spec_combination || {}
                Object.entries(comb).forEach(([k,v]) => {
                   if (!groups[k]) groups[k] = new Set()
                   groups[k].add(v as string)
                })
             })
             specGroups.value = Object.keys(groups).map(k => ({ name: k, values: Array.from(groups[k]) }))
             
             // Default Select
             specGroups.value.forEach(g => {
                if (!selectedSpecs.value[g.name]) selectedSpecs.value[g.name] = g.values[0]
             })
             
             // Initial Check
             if (matchedSku.value) await checkSkuAvailability(matchedSku.value.id)
             else if (skus.value[0]) await checkSkuAvailability(skus.value[0].id)
          } else {
             // No SKU product (rare but possible)
             stock.value = Number(d.stock || 0)
          }
      }
      
      const fRes = await supabaseFaqApi.getFaqsByProduct(id)
      if (fRes.success) faqs.value = fRes.faqs
   } catch(e) { console.error(e) }
   finally { loading.value = false }
}

const addToCart = async () => {
    if (!userStore.isLoggedIn) return ElMessage.warning('请登录')
    if (!matchedSku.value && skus.value.length > 0) return ElMessage.warning('请选择规格')
    const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id // Fallback if no sku
    
    const res = await cartStore.addToCart(skuId, qty.value)
    if (res.success) {
        ElMessage.success('已加入购物车')
        handleClose()
    } else {
        ElMessage.error(res.msg || '失败')
    }
}

const buyNow = async () => {
     if (!userStore.isLoggedIn) return ElMessage.warning('请登录')
     if (!matchedSku.value && skus.value.length > 0) return ElMessage.warning('请选择规格')
     const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id

     const { supabasePreOrderApi } = await import('@/api/client/supabase')
     const res = await supabasePreOrderApi.createPreOrder(skuId, qty.value, 'buy_now')
     if (res.success) {
         handleClose()
         router.push(`/mobile/checkout/${res.pre_order_id}`)
     } else {
         ElMessage.error(res.error || '失败')
     }
}

const handleToggleFavorite = () => { isFavorited.value = !isFavorited.value; ElMessage.success(isFavorited.value ? '已收藏' : '已取消') }
const contactService = () => ElMessage.info('客服连接中...')

watch(() => props.visible, (val) => {
   if (val && props.goodsId) fetchData(String(props.goodsId))
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
  background: #111827;
  border-radius: 24px 24px 0 0;
  z-index: 3051;
  padding-bottom: 0; /* Footer handles padding */
  max-height: 85vh;
  display: flex; flex-direction: column;
  box-shadow: 0 -8px 30px rgba(0,0,0,0.5);
  overflow: hidden;
}

/* Marketing Strip */
.marketing-strip {
  background: linear-gradient(90deg, #F59E0B20, #F9731620);
  height: 36px;
  display: flex; align-items: center; justify-content: space-around;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.ms-item {
  color: #F59E0B; font-size: 11px; display: flex; align-items: center; gap: 4px; font-weight: 500;
}

/* Header */
.sheet-header {
  padding: 16px; display: flex; justify-content: space-between; align-items: flex-start;
}
.header-left { display: flex; gap: 12px; flex: 1; }
.thumb-box { 
   width: 88px; height: 88px; border-radius: 12px; overflow: hidden; 
   background: #000; border: 1px solid rgba(255,255,255,0.1); 
   flex-shrink: 0;
}
.thumb-box .el-image { width: 100%; height: 100%; }
.info-box { display: flex; flex-direction: column; justify-content: center; padding-top: 4px; }
.h-title { 
   color: #fff; font-size: 16px; font-weight: 600; line-height: 1.4; margin-bottom: 8px; 
   display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.h-price-row { display: flex; align-items: center; gap: 8px; }
.price-wrap { color: #F97316; display: flex; align-items: baseline; }
.cy { font-size: 12px; font-weight: 600; margin-right: 2px; }
.val { font-size: 22px; font-family: 'DIN Alternates'; font-weight: 700; }
.stock-tag { 
   font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(52, 211, 153, 0.2); color: #34D399; 
}
.stock-tag.no-stock { background: rgba(239, 68, 68, 0.2); color: #EF4444; }

.detail-btn {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; padding: 8px 10px; cursor: pointer;
  margin-left: 10px;
}
.d-icon-circle {
   width: 24px; height: 24px; border-radius: 50%; background: rgba(249, 115, 22, 0.2);
   display: flex; align-items: center; justify-content: center; color: #F97316;
}
.detail-btn span { color: #94A3B8; font-size: 10px; }

/* Body */
.sheet-body { flex: 1; overflow-y: auto; padding: 10px 16px 20px; }

/* FAQ */
.faq-bar {
  background: rgba(30, 41, 59, 1); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px; padding: 10px; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
}
.faq-label { font-size: 11px; font-weight: 600; color: #64748B; background: #0F172A; padding: 2px 6px; border-radius: 4px; }
.faq-text-wrap { flex: 1; overflow: hidden; height: 16px; position: relative; }
.faq-scroll-track { display: flex; animation: faq-marquee 12s linear infinite; white-space: nowrap; }
.faq-item { margin-right: 24px; font-size: 12px; color: #94A3B8; }
@keyframes faq-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* Specs */
.specs-area { margin-bottom: 20px; }
.spec-row { margin-bottom: 12px; }
.s-label { font-size: 12px; color: #94A3B8; margin-bottom: 8px; }
.s-vals { display: flex; flex-wrap: wrap; gap: 10px; }
.val-chip {
  padding: 6px 14px; background: #1F2937; border-radius: 8px;
  font-size: 12px; color: #CBD5E1; border: 1px solid transparent;
  transition: all 0.2s;
}
.val-chip.active {
  background: rgba(249, 115, 22, 0.2); color: #F97316; border-color: #F97316;
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

/* Footer */
.sheet-footer {
  padding: 12px 16px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 30px); /* Extra lift */
  background: #111827;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex; gap: 16px; align-items: center;
}
.icon-btns { display: flex; gap: 16px; }
.ib-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #94A3B8; font-size: 10px; cursor: pointer; }
.ib-item .el-icon { font-size: 20px; }
.ib-item .el-icon.active { color: #F59E0B; }

.main-btns { flex: 1; display: flex; gap: 10px; }
.btn-cart, .btn-buy {
  height: 44px; border-radius: 22px; border: none; font-size: 14px; font-weight: 600; color: #fff;
  flex: 1; cursor: pointer;
}
.btn-cart { background: #374151; color: #F3F4F6; }
.btn-buy { background: linear-gradient(135deg, #F97316, #EA580C); box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3); }
.btn-cart:disabled, .btn-buy:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; background: #333; }

/* Centered Pop Modal */
.detail-modal-mask {
   position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 3000;
   display: flex; align-items: center; justify-content: center;
   backdrop-filter: blur(5px);
}
.detail-modal {
   width: 90%; max-height: 70vh; background: #1E293B; border-radius: 16px;
   display: flex; flex-direction: column; overflow: hidden;
   box-shadow: 0 20px 40px rgba(0,0,0,0.8);
   border: 1px solid rgba(255,255,255,0.1);
}
.dm-header {
   padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
   display: flex; justify-content: space-between; align-items: center;
   background: #0F172A;
}
.dm-header span { color: #fff; font-size: 16px; font-weight: 600; }
.dm-close { 
   width: 30px; height: 30px; background: rgba(255,255,255,0.1); border-radius: 50%; 
   display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer;
}
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
