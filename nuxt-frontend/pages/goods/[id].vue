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
                <button class="add-cart-btn" @click="addToCart($event)" :disabled="stockLoading || !hasStock || !hasSkus || submitting">
                  <el-icon><ShoppingCart /></el-icon>
                  加入购物车
                </button>
                <button 
                  :class="['favorite-btn', { favorited: isFavorited }]" 
                  @click="toggleFavorite($event)"
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
import { 
  CircleCheck, 
  QuestionFilled, 
  ShoppingCart, 
  Star, 
  StarFilled,
  InfoFilled,
  Right
} from '@element-plus/icons-vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { goodsApi } from '@/api/goods'
import { supabaseProductApi, supabaseFaqApi } from '@/api/supabase'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const modal = useModalStore()
const userStore = useUserStore()
const cartStore = useCartStore()

// 修复 goodsId 类型问题 - Supabase 使用 UUID 字符串
const goodsId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

// --- SSR 数据获取 ---
const { data: goodsResponse, error: fetchError } = await useAsyncData(
  `goods-detail-${goodsId.value}`,
  () => goodsApi.getGoodsDetail(goodsId.value)
)

const goodsData = computed(() => goodsResponse.value || null)
// API 返回 success: false 也视为错误
const goodsError = computed(() => !!fetchError.value || (goodsResponse.value && !goodsResponse.value.success))

// --- SEO 配置 ---
const goodsSeo = computed(() => {
  const data = goodsData.value?.data || {}
  return {
    title: data.product_name || '商品详情',
    desc: data.description || '凡图拉提供优质数字商品服务',
    image: data.coverImage || data.image
  }
})

useHead({
  title: computed(() => `${goodsSeo.value.title} - 凡图拉`),
  meta: [
    { name: 'description', content: computed(() => goodsSeo.value.desc) },
    { property: 'og:title', content: computed(() => goodsSeo.value.title) },
    { property: 'og:description', content: computed(() => goodsSeo.value.desc) },
    { property: 'og:image', content: computed(() => goodsSeo.value.image) },
    { property: 'og:url', content: computed(() => `${config.public.siteUrl || 'http://localhost:3000'}/goods/${goodsId.value}`) }
  ]
})

// --- 数据状态 ---
const qty = ref(1)
const stock = ref(0) // 可用库存数量
const submitting = ref(false) // 提交状态
const selectedSpecs = ref<Record<string, string>>({})
const selectedSkuImage = ref('')

// 新增：SKU 可购买性状态
const skuAvailable = ref(false)
const stockLoading = ref(false) // 默认不加载，只有在切换SKU时才加载

// 计算是否有库存
const hasStock = computed(() => !stockLoading.value && skuAvailable.value && stock.value > 0)

/**
 * 检查 SKU 可购买性（调用数据库函数）
 */
const checkSkuAvailability = async (skuId: string) => {
  if (!skuId) {
    skuAvailable.value = false
    stock.value = 0
    stockLoading.value = false
    return
  }
  
  stockLoading.value = true
  try {
    const result = await supabaseProductApi.checkSkuAvailability(skuId)
    skuAvailable.value = result.available
    stock.value = result.availableCount
  } catch (e) {
    console.error('检查 SKU 可购买性失败:', e)
    skuAvailable.value = false
    stock.value = 0
  } finally {
    stockLoading.value = false
  }
}

const buyNow = async () => {
  if (!userStore.isLoggedIn) {
    modal.showLogin = true
    return
  }
  if (!hasStock.value) {
    ElMessage.warning('商品暂时缺货')
    return
  }
  if (!matchedSku.value) {
    ElMessage.warning('请选择商品规格')
    return
  }
  if (submitting.value) return
  
  submitting.value = true
  try {
    // 使用预订单 API
    const { supabasePreOrderApi } = await import('@/api/supabase')
    const result = await supabasePreOrderApi.createPreOrder(
      matchedSku.value.id,
      qty.value,
      'buy_now'
    )
    
    if (!result.success) {
      if (result.code === 'DUPLICATE_ORDER') {
         try {
           await ElMessageBox.confirm(
             '您已经下过该商品的订单了，快去看看吧',
             '重复下单提示',
             {
               confirmButtonText: '去查看',
               cancelButtonText: '取消',
               type: 'warning',
               distinguishCancelAndClose: true
             }
           )
           router.push('/profile/orders?tab=待支付')
           return
         } catch (action: any) {
            return
         }
      }

      if (result.code === 'LIMIT_EXCEEDED') {
         try {
           await ElMessageBox.confirm(
             '您的未支付订单太多了，请先处理一下吧',
             '订单数量超限',
             {
               confirmButtonText: '去查看',
               cancelButtonText: '取消',
               type: 'warning',
               distinguishCancelAndClose: true
             }
           )
           router.push('/profile/orders?tab=待支付')
           return
         } catch (action: any) {
            return
         }
      }
      
      ElMessage.error(result.error || '创建预订单失败')
      return
    }
    
    router.push(`/checkout/${result.pre_order_id}`)
  } catch (e) {
    console.error('立即购买失败', e)
  } finally {
    submitting.value = false
  }
}

// 动画 composable
import { useCartAnimation } from '@/composables/useCartAnimation' // 确保正确导入
const { startAnimation } = useCartAnimation()

const addToCart = async (event: MouseEvent) => {
  if (!userStore.isLoggedIn) {
     modal.showLogin = true
     return
  }
  if (!hasStock.value) {
    ElMessage.warning('商品暂时缺货')
    return
  }
  if (!matchedSku.value) {
    ElMessage.warning('请选择商品规格')
    return
  }
  if (submitting.value) return

  submitting.value = true
  try {
    const result = await cartStore.addToCart(matchedSku.value.id, qty.value)
    if (result.success) {
      // 成功：执行动画
      const btnEl = event.target as HTMLElement
      // 如果点击的是图标，可能需要找到按钮本身
      const target = btnEl.closest('button') || btnEl
      
      startAnimation(target, matchedSku.value.image || goodsInfo.value.image, () => {
         cartStore.miniCartVisible = true
         ElMessage.success('已成功加入购物车')
      })
      
    } else {
      if (result.code === 'DIFFERENT_SKU') {
         ElMessage.warning(result.msg || '暂时不支持同时购买不同商品')
      } else {
         ElMessage.error(result.msg || '加入购物车失败')
      }
    }
  } catch (e) {
    ElMessage.error('加入购物车失败')
  } finally {
    submitting.value = false
  }
}

// --- 模拟与 API 适配数据 ---
const goodsInfo = computed(() => {
  const data = goodsData.value?.data || ({} as any)
  return {
    name: data.title || data.product_name || '正在加载商品...',
    image: data.coverImage || data.image || '/images/placeholder.png',
    price: data.price || 0,
    sales: data.initial_sales || data.sales || 0,
    rating: data.rating || 100
  }
})

// 是否允许加入购物车
const allowAddon = computed(() => {
  return (goodsData.value?.data as any)?.allow_addon === true
})

// 详情模块
const detailModules = computed(() => {
  const dataModules = (goodsData.value?.data as any)?.detail_modules
  if (dataModules && dataModules.length > 0) return dataModules
  
  return [
    { type: 'image', content: '/images/client/pc/netflix_detail_1.png' },
    { type: 'image', content: '/images/client/pc/netflix_detail_2.png' }
  ]
})

// 卖点标签 (Unique 样式)
const serviceTags = [
  '官方采购・正品保障',
  '全程质保・无忧售后',
  '极速响应・人工服务',
  '安全加密・隐私保护'
]

// FAQ 滚动数据
const fetchedFaqs = ref<any[]>([])
const faqs = computed(() => {
  if (fetchedFaqs.value.length > 0) return fetchedFaqs.value
  
  return [
    { id: '1', question: '下单后多久发货？一般为秒级自动发货。' },
    { id: '2', question: '账号无法登录怎么办？请联系在线人工客服处理。' },
    { id: '3', question: '支持退款吗？虚拟商品发货后非质量问题不支持退款。' },
    { id: '4', question: '可以长期续费吗？支持同号续费，请关注订阅到期提醒。' }
  ]
})
// 无缝滚动逻辑
const activeFaqIndex = ref(0)
const isTransitioning = ref(true)
let tickerTimer: any = null

// 构建显示列表：原列表 + 第一项克隆
const displayFaqs = computed(() => {
  if (faqs.value.length === 0) return []
  return [...faqs.value, faqs.value[0]] // Append clone of first item
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

const fetchBoundFaqs = async () => {
  try {
    let finalFaqs: any[] = []
    
    // 1. 获取绑定 FAQ
    const res = await supabaseFaqApi.getFaqsByProduct(goodsId.value)
    if (res.success && res.faqs.length > 0) {
      finalFaqs = [...res.faqs]
    }
    
    // 2. 如果不足 5 条，获取通用 FAQ 补齐
    if (finalFaqs.length < 5) {
      const resGen = await supabaseFaqApi.getFaqs()
      if (resGen.success && resGen.faqs.length > 0) {
        const existingIds = new Set(finalFaqs.map(f => f.id))
        const generalToAdd = resGen.faqs.filter((f: any) => !existingIds.has(f.id))
        finalFaqs = [...finalFaqs, ...generalToAdd].slice(0, 5)
      }
    }
    
    fetchedFaqs.value = finalFaqs
  } catch (e) {
    console.error('Fetch FAQ error:', e)
  }
}

const goToFaq = (faq: any) => {
  if (faq.id) {
    router.push(`/faq?q=${faq.id}`)
  } else {
    router.push('/faq')
  }
}

// 规格处理 (SKU)
const skus = computed(() => (goodsData.value?.data as any)?.skus || [])

// 是否有 SKU
const hasSkus = computed(() => skus.value.length > 0)

const specGroups = computed(() => {
  const backendGroups = (goodsData.value?.data as any)?.specGroups
  if (backendGroups && backendGroups.length > 0) {
    return backendGroups
  }
  
  if (skus.value.length > 0) {
    const groups: Record<string, Set<string>> = {}
    skus.value.forEach((sku: any) => {
      const combination = sku.spec_combination || {}
      Object.entries(combination).forEach(([name, value]) => {
        if (!groups[name]) groups[name] = new Set()
        groups[name].add(value as string)
      })
    })
    
    return Object.keys(groups).map(name => ({
      name,
      values: Array.from(groups[name])
    }))
  }
  
  return []
})

// 当前匹配到的 SKU
const matchedSku = computed(() => {
  if (skus.value.length === 0) return null
  
  // 查找完全匹配的 SKU
  return skus.value.find((sku: any) => {
    const combination = sku.spec_combination || {}
    // 检查所有已选规格是否都匹配
    return Object.entries(selectedSpecs.value).every(([name, value]) => {
      return combination[name] === value
    })
  })
})

const handleSpecSelect = async (group: string, val: string) => {
  selectedSpecs.value[group] = val
  if (matchedSku.value) {
    if (matchedSku.value.image) {
      selectedSkuImage.value = matchedSku.value.image
    }
    await checkSkuAvailability(matchedSku.value.id)
  }
}

// 当前选中的 SKU 价格与图片
const currentPrice = computed(() => {
  return matchedSku.value?.price || goodsInfo.value.price || 35.00
})

const formatPrice = (price: number | string) => {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return num.toFixed(2)
}

const skuImages = computed(() => {
  const images = skus.value.map((s: any) => s.image).filter(Boolean)
  return images.length > 0 ? Array.from(new Set(images)) : [goodsInfo.value.image]
})

// --- 收藏功能 ---
const isFavorited = ref(false)
const favoriteLoading = ref(false)

const checkFavoriteStatus = async () => {
  if (!userStore.isLoggedIn || !goodsId.value) return
  const { favoriteApi } = await import('@/api/common')
  const res = await favoriteApi.checkFavorite(String(goodsId.value), matchedSku.value?.id)
  isFavorited.value = res.data || false
}

// 动画 composable
import { useFlyingAnimation } from '@/composables/useFlyingAnimation'
const { startAnimation: startFavAnimation } = useFlyingAnimation()

const toggleFavorite = async (event: MouseEvent) => {
  if (!userStore.isLoggedIn) {
    modal.showLogin = true
    return
  }
  if (favoriteLoading.value) return
  
  favoriteLoading.value = true
  try {
    const { favoriteApi } = await import('@/api/common')
    if (isFavorited.value) {
      // 这里的逻辑保持不变：如果是取消收藏，暂时提示用户去列表页操作
      // 用户提到 "取消收藏就是要减吗？对不要减", 意味着取消收藏可能不需要特效，或者不期望有反向动画。
      // 当前逻辑是 "取消收藏请前往我的收藏页面"，暂不修改此行为，除非明确要求原地取消。
      // 如果要原地取消：调用 removeFavoriteAPI -> isFavorited = false -> Toast '已取消'
      // 根据 Analysis: "取消收藏...不要减就是这个右上角这个动画" -> 用户似乎希望取消也在详情页做？
      // User said: "我需要这么优化之后那个取消收藏吗？取消收藏就是要减吗？对不要减就是这个右上角这个动画"
      // Interpretation: Don't do a "flying away" animation for remove, or maybe just keep simple.
      // Current code forces user to go to favorites page to remove. Let's keep it simple for now as Plan didn't specify changing this logic (Plan said "Cancel Favorite: ... Current logic prompts to go to page. We will keep this unless asked").
      ElMessage.info('取消收藏请前往"我的收藏"页面')
    } else {
      const res = await favoriteApi.addFavorite(String(goodsId.value), matchedSku.value?.id)
      if (res.success) {
        isFavorited.value = true
        // 触发飞入动画
        const btnEl = event.target as HTMLElement
        // 找到按钮元素
        const targetBtn = btnEl.closest('.favorite-btn') as HTMLElement || btnEl
        const imageToFly = selectedSkuImage.value || goodsInfo.value.image

        startFavAnimation(targetBtn, imageToFly, 'favorites-icon-ref', () => {
             // 动画结束后不需要额外操作，状态已经变了
        })
        ElMessage.success('收藏成功')
      } else {
        ElMessage.warning(res.msg || '收藏失败')
      }
    }
  } finally {
    favoriteLoading.value = false
  }
}

const goBack = () => router.back()

// Client-side initialization logic
const initClientState = async () => {
   // 只有成功获取数据后才进行客户端状态初始化
   if (!goodsData.value?.success) return

   // 默认选中第一个规格
    if (specGroups.value && specGroups.value.length > 0) {
        specGroups.value.forEach((g: { name: string; values: string[] }) => {
            if (!selectedSpecs.value[g.name]) {
               selectedSpecs.value[g.name] = g.values[0]
            }
        })
    }
    
    // 设置默认 SKU 的图片
    if (matchedSku.value) {
        if (matchedSku.value.image) {
           selectedSkuImage.value = matchedSku.value.image
        }
        await checkSkuAvailability(matchedSku.value.id)
    } else if (skus.value.length > 0 && skus.value[0].id) {
        await checkSkuAvailability(skus.value[0].id)
    }
    
    // Fetch FAQs
    fetchBoundFaqs()
}

onMounted(async () => {
  await initClientState()
  checkFavoriteStatus()
  startFaqTicker()
})

onUnmounted(() => {
  if (tickerTimer) clearInterval(tickerTimer)
})
</script>

<style scoped src="@/assets/styles/goods-detail.css"></style>
