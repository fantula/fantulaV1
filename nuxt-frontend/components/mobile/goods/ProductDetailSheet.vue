<template>
  <transition name="sheet-fade">
    <div v-if="visible" class="sheet-overlay" @click="handleClose">
      <div class="sheet-panel" @click.stop>
        
        <!-- Loading State -->
        <div v-if="loading" class="sheet-loading">
          <div class="spinner"></div>
        </div>

        <template v-else-if="goodsInfo.name">
            <!-- 1. Header (Thumb + Info + Close) -->
            <div class="sheet-header">
            <div class="header-thumb">
                <img :src="selectedSkuImage || goodsInfo.image" />
            </div>
            <div class="header-info">
                <div class="header-title">{{ goodsInfo.name }}</div>
                <div class="header-price-row">
                    <span class="currency">¥</span>
                    <span class="price-val">{{ formatPrice(currentPrice) }}</span>
                </div>
                <div class="header-meta">
                    <span>库存: {{ hasStock ? stock : '缺货' }}</span>
                    <span v-if="selectedSkuText"> · 已选: {{ selectedSkuText }}</span>
                </div>
            </div>
            <button class="close-btn" @click="handleClose">
                <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            </div>

            <!-- 2. FAQ Ticker (Inserted) -->
            <div class="faq-ticker-section" v-if="displayFaqs.length > 0">
                <div class="faq-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#3B82F6" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                </div>
                <div class="faq-content">
                    <div class="faq-track" :style="tickerStyle">
                        <div v-for="(faq, idx) in displayFaqs" :key="idx" class="faq-item">
                            {{ faq.question }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. Scrollable Body -->
            <div class="sheet-body">
                
                <!-- Tags -->
                <div class="tags-row" v-if="parsedTags.length">
                    <span v-for="tag in parsedTags" :key="tag" class="tag-pill">{{ tag }}</span>
                </div>

                <!-- Specs -->
                <div class="specs-section" v-if="specGroups.length > 0">
                    <div v-for="group in specGroups" :key="group.name" class="spec-group">
                        <div class="group-label">{{ group.name }}</div>
                        <div class="group-values">
                            <button 
                                v-for="val in group.values" 
                                :key="val" 
                                class="spec-chip"
                                :class="{ active: selectedSpecs[group.name] === val }"
                                @click="handleSpecSelect(group.name, val)"
                            >
                                {{ val }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quantity -->
                <div class="qty-section">
                    <div class="qty-label">购买数量</div>
                    <div class="qty-control">
                        <button @click="qty = Math.max(1, qty - 1)" :disabled="qty <= 1">-</button>
                        <input type="number" v-model.number="qty" readonly />
                        <button @click="qty = Math.min(stock, qty + 1)" :disabled="qty >= stock">+</button>
                    </div>
                </div>

                <!-- Services -->
                <div class="services-list">
                    <div class="service-tag" v-for="tag in serviceTags" :key="tag">
                        <svg viewBox="0 0 24 24" width="12" height="12" class="icon-check"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        <span>{{ tag }}</span>
                    </div>
                </div>
            </div>

            <!-- 4. Footer Actions -->
            <div class="sheet-footer">
                <!-- Mini Icons -->
                <div class="footer-icons">
                    <button class="f-icon-btn" @click="handleService">
                        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                        <span>客服</span>
                    </button>
                    <button class="f-icon-btn" @click="toggleFavorite">
                        <svg viewBox="0 0 24 24" width="20" height="20" :class="{ active: isFavorited }">
                            <path fill="currentColor" v-if="isFavorited" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            <path fill="currentColor" v-else d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.01 4.38.38-3.32 2.88 1 4.28L12 15.4z"/>
                        </svg>
                        <span>收藏</span>
                    </button>
                </div>
                
                <!-- Buttons -->
                <div class="footer-btns">
                    <button class="btn-cart" @click="handleAddCart" :disabled="!hasStock">加入购物车</button>
                    <button class="btn-buy" @click="handleBuyNow" :disabled="!hasStock">立即购买</button>
                </div>
            </div>
        </template>
        
        <!-- Toast Mock (Local) or emit to global -->
        <transition name="fade">
            <div v-if="toast.show" class="sheet-toast">
                {{ toast.message }}
            </div>
        </transition>

      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { goodsApi } from '@/api/client/goods'
import { supabaseFaqApi } from '@/api/client/supabase'
import { useCartStore } from '@/stores/client/cart'
import { useUserStore } from '@/stores/client/user'

const props = defineProps<{
  visible: boolean
  goodsId: string | number
}>()

const emit = defineEmits(['update:visible', 'close'])
const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

// --- State ---
const loading = ref(false)
const goodsInfo = ref<any>({})
const skus = ref<any[]>([])
const specGroups = ref<any[]>([])
const faqs = ref<any[]>([])

// Selection
const selectedSpecs = ref<Record<string, string>>({})
const qty = ref(1)
const stock = ref(999)
const isFavorited = ref(false)

// Toast
const toast = ref({ show: false, message: '' })
const showToast = (msg: string) => {
    toast.value = { show: true, message: msg }
    setTimeout(() => toast.value.show = false, 2000)
}

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
const selectedSkuText = computed(() => Object.values(selectedSpecs.value).join(' '))
const parsedTags = computed(() => {
    const t = goodsInfo.value.tags
    if (!t) return []
    return typeof t === 'string' ? t.split(',') : t
})
const serviceTags = ['官方正品', '极速发货', '售后无忧']

// --- Methods ---
const formatPrice = (p: any) => Number(p).toFixed(2)
const handleClose = () => emit('update:visible', false)

const handleSpecSelect = (group: string, val: string) => {
    selectedSpecs.value[group] = val
}

const handleService = () => showToast('客服连接中...')
const toggleFavorite = () => { isFavorited.value = !isFavorited.value; showToast(isFavorited.value ? '已收藏' : '已取消') }

const handleAddCart = async () => {
    if (!userStore.isLoggedIn) return showToast('请先登录')
    if (!matchedSku.value) return showToast('请选择规格')
    
    try {
        const res = await cartStore.addToCart(matchedSku.value.id, qty.value)
        showToast(res.success ? '已加入购物车' : (res.msg || '失败'))
        if(res.success) handleClose()
    } catch(e) { showToast('操作失败') }
}

const handleBuyNow = async () => {
    if (!userStore.isLoggedIn) return showToast('请先登录')
    if (!matchedSku.value) return showToast('请选择规格')

    try {
        const { supabasePreOrderApi } = await import('@/api/client/supabase')
        const result = await supabasePreOrderApi.createPreOrder(matchedSku.value.id, qty.value, 'buy_now')
        
        if (result.success) {
            handleClose()
            router.push(`/checkout/${result.pre_order_id}`)
        } else {
            showToast(result.error || '创建订单失败')
        }
    } catch(e) { showToast('系统繁忙') }
}

// --- FAQ Ticker Logic (Reused) ---
const activeFaqIndex = ref(0)
const isTransitioning = ref(true)
let tickerTimer: any = null

const displayFaqs = computed(() => {
    if (faqs.value.length === 0) return []
    return [...faqs.value, faqs.value[0]] 
})

const tickerStyle = computed(() => ({
    transform: `translateY(-${activeFaqIndex.value * 24}px)`, // 24px height
    transition: isTransitioning.value ? 'transform 0.5s ease' : 'none'
}))

const startTicker = () => {
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

// --- Fetch Data ---
const fetchData = async (id: string | number) => {
    loading.value = true
    try {
        // Goods
        const res = await goodsApi.getGoodsDetail(String(id))
        if (res.success && res.data) {
            const data = res.data
            goodsInfo.value = {
                name: data.product_name,
                image: data.coverImage,
                price: data.price,
                tags: data.tags
            }
            skus.value = data.skus || []
            // Process Specs
            if (skus.value.length > 0) {
                const groups: Record<string, Set<string>> = {}
                skus.value.forEach((s: any) => {
                    Object.entries(s.spec_combination || {}).forEach(([k, v]) => {
                        if(!groups[k]) groups[k] = new Set()
                        groups[k].add(v as string)
                    })
                })
                specGroups.value = Object.keys(groups).map(k => ({ name: k, values: Array.from(groups[k]) }))
                 // Default select 1st
                specGroups.value.forEach(g => {
                    if(!selectedSpecs.value[g.name]) selectedSpecs.value[g.name] = g.values[0]
                })
            }
        }

        // FAQs
        const faqRes = await supabaseFaqApi.getFaqsByProduct(String(id))
        if (faqRes.success && faqRes.faqs) faqs.value = faqRes.faqs
        else {
             // Fallback generic
             faqs.value = [
                 { question: '下单后多久发货？一般为秒级自动发货。' },
                 { question: '支持退款吗？虚拟商品不支持退款。' }
             ]
        }
        startTicker()

    } catch(e) { showToast('加载失败') }
    finally { loading.value = false }
}

watch(() => props.visible, (val) => {
    if (val && props.goodsId) {
        fetchData(props.goodsId)
    } else {
        if (tickerTimer) clearInterval(tickerTimer)
        goodsInfo.value = {}
        skus.value = []
        faqs.value = []
    }
})

onUnmounted(() => { if (tickerTimer) clearInterval(tickerTimer) })

</script>

<style scoped>
.sheet-fade-enter-active, .sheet-fade-leave-active { transition: opacity 0.3s; }
.sheet-fade-enter-from, .sheet-fade-leave-to { opacity: 0; }

.sheet-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 999;
    display: flex; flex-direction: column; justify-content: flex-end;
}
.sheet-panel {
    background: #fff;
    border-radius: 20px 20px 0 0;
    width: 100%;
    max-height: 85vh;
    display: flex; flex-direction: column;
    overflow: hidden;
    position: relative;
    padding-bottom: env(safe-area-inset-bottom);
}

.sheet-loading {
    height: 300px; display: flex; align-items: center; justify-content: center;
}
.spinner { width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #3B82F6; border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Header */
.sheet-header {
    padding: 16px;
    display: flex; gap: 12px;
    border-bottom: 1px solid #F1F5F9;
}
.header-thumb {
    width: 80px; height: 80px; border-radius: 8px; overflow: hidden; background: #F8FAFC; flex-shrink: 0;
}
.header-thumb img { width: 100%; height: 100%; object-fit: cover; }
.header-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 0; }
.header-title { font-size: 15px; font-weight: 700; color: #0F172A; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.header-price-row { color: #EF4444; display: flex; align-items: baseline; }
.currency { font-size: 12px; font-weight: 600; }
.price-val { font-size: 20px; font-weight: 800; font-family: 'DIN'; }
.header-meta { font-size: 11px; color: #94A3B8; }

.close-btn { 
    position: absolute; top: 12px; right: 12px; 
    background: none; border: none; color: #94A3B8; cursor: pointer; 
}

/* FAQ Ticker */
.faq-ticker-section {
    background: #EFF6FF;
    padding: 8px 16px;
    display: flex; align-items: center; gap: 8px;
}
.faq-icon { display: flex; align-items: center; }
.faq-content { flex: 1; height: 24px; overflow: hidden; position: relative; }
.faq-track { display: flex; flex-direction: column; }
.faq-item {
    height: 24px; display: flex; align-items: center;
    font-size: 12px; color: #2563EB; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Body */
.sheet-body { flex: 1; overflow-y: auto; padding: 16px; }

.tags-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.tag-pill { font-size: 10px; background: #F1F5F9; color: #64748B; padding: 2px 6px; border-radius: 4px; }

.spec-group { margin-bottom: 16px; }
.group-label { font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 8px; }
.group-values { display: flex; flex-wrap: wrap; gap: 8px; }
.spec-chip {
    padding: 6px 14px; border-radius: 16px; background: #F8FAFC; border: 1px solid transparent;
    font-size: 12px; color: #475569;
}
.spec-chip.active { background: #EFF6FF; border-color: #3B82F6; color: #2563EB; font-weight: 500; }

.qty-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.qty-label { font-size: 13px; font-weight: 600; color: #334155; }
.qty-control { display: flex; background: #F1F5F9; border-radius: 6px; }
.qty-control button { width: 28px; height: 28px; border: none; background: transparent; color: #334155; }
.qty-control button:disabled { opacity: 0.3; }
.qty-control input { width: 32px; border: none; background: transparent; text-align: center; font-size: 13px; font-weight: 600; }

.services-list { display: flex; gap: 12px; }
.service-tag { display: flex; align-items: center; gap: 3px; font-size: 11px; color: #94A3B8; }
.icon-check { color: #3B82F6; }

/* Footer */
.sheet-footer {
    padding: 10px 16px;
    border-top: 1px solid #F1F5F9;
    display: flex; align-items: center; gap: 12px;
}
.footer-icons { display: flex; gap: 12px; }
.f-icon-btn { 
    background: none; border: none; color: #64748B; 
    display: flex; flex-direction: column; align-items: center; gap: 1px;
    font-size: 10px; min-width: 32px;
}
.f-icon-btn svg.active { color: #EF4444; }

.footer-btns { flex: 1; display: flex; border-radius: 20px; overflow: hidden; height: 40px; }
.btn-cart { flex: 1; background: #F59E0B; border: none; color: #fff; font-size: 14px; font-weight: 600; }
.btn-buy { flex: 1; background: #EF4444; border: none; color: #fff; font-size: 14px; font-weight: 600; }
.btn-cart:disabled, .btn-buy:disabled { background: #CBD5E1; }

.sheet-toast {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8); color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 13px;
}
</style>
