import { ref, computed, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { goodsApi } from '@/api/client/goods'
import { supabaseProductApi, supabaseFaqApi } from '@/api/client/supabase'
import { useModalStore } from '@/stores/client/modal'
import { useUserStore } from '@/stores/client/user'
import { useCartStore } from '@/stores/client/cart'
import { useNotify } from '@/composables/useNotify'

export const useProductDetail = (overrideId?: string | number | Ref<string | number>) => {
  const route = useRoute()
  const router = useRouter()
  const modal = useModalStore()
  const userStore = useUserStore()
  const cartStore = useCartStore()
  const { success, warning, error, info } = useNotify()

  // --- 1. 商品 ID (优先使用传入的 ID) ---
  const goodsId = computed(() => {
    const oid = unref(overrideId)
    if (oid) return String(oid)
    const id = route.params.id
    return Array.isArray(id) ? id[0] : id
  })

  // --- 2. 数据获取 ---
  // PC 端 (Route ID) 默认立即获取; 移动端 (Override ID) 默认不立即获取，由组件控制
  const shouldAutoFetch = computed(() => {
    // If overrideId is provided, we wait for manual init (Mobile Sheet)
    // If route.params.id is missing (e.g. initial render), we also shouldn't fetch
    return !unref(overrideId) && !!goodsId.value && goodsId.value !== 'undefined'
  })

  const { data: goodsResponse, error: fetchError, pending, refresh: fetchGoodsData } = useAsyncData(
    () => `goods-detail-${goodsId.value}`,
    async () => {
      if (!goodsId.value || goodsId.value === 'undefined') return null
      return await goodsApi.getGoodsDetail(goodsId.value)
    },
    {
      watch: [goodsId],
      immediate: shouldAutoFetch.value,
      lazy: true
    }
  )

  const goodsData = computed(() => goodsResponse.value || null)
  const goodsError = computed(() => !!fetchError.value || (goodsResponse.value && !goodsResponse.value.success))

  // --- 3. SEO 配置 ---
  const goodsSeo = computed(() => {
    const data = (goodsData.value?.data || {}) as any
    return {
      title: data.product_name || '商品详情',
      desc: data.description || '凡图拉提供优质数字商品服务',
      image: data.coverImage || data.image
    }
  })

  // --- 4. 状态定义 ---
  const qty = ref(1)
  const stock = ref(0) // 可用库存数量
  const submitting = ref(false) // 提交状态
  const selectedSpecs = ref<Record<string, string>>({})
  const selectedSkuImage = ref('')
  const skuAvailable = ref(false)
  const stockLoading = ref(false)
  const fetchedFaqs = ref<any[]>([])
  const isFavorited = ref(false)
  const favoriteLoading = ref(false)

  // --- 5. 计算属性 ---
  const hasStock = computed(() => !stockLoading.value && skuAvailable.value && stock.value > 0)

  const goodsInfo = computed(() => {
    const data = (goodsData.value?.data || {}) as any
    return {
      id: data.id, // Ensure ID is available
      name: data.title || data.product_name || '正在加载商品...',
      image: data.coverImage || data.image || '/images/shared/logo_v2.png',
      price: data.price || 0,
      sales: data.initial_sales || data.sales || 0,
      rating: data.rating || 100
    }
  })

  const skus = computed(() => (goodsData.value?.data as any)?.skus || [])
  const hasSkus = computed(() => skus.value.length > 0)

  const specGroups = computed(() => {
    const backendGroups = (goodsData.value?.data as any)?.specGroups
    if (backendGroups && backendGroups.length > 0) return backendGroups

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

  const matchedSku = computed(() => {
    if (skus.value.length === 0) return null
    return skus.value.find((sku: any) => {
      const combination = sku.spec_combination || {}
      return Object.entries(selectedSpecs.value).every(([name, value]) => {
        return combination[name] === value
      })
    })
  })

  const currentPrice = computed(() => matchedSku.value?.price || goodsInfo.value.price || 0)

  const skuImages = computed(() => {
    const images = skus.value.map((s: any) => s.image).filter(Boolean)
    return images.length > 0 ? Array.from(new Set(images)) : [goodsInfo.value.image]
  })

  const detailModules = computed(() => {
    const dataModules = (goodsData.value?.data as any)?.detail_modules
    if (dataModules && dataModules.length > 0) return dataModules
    return []
  })

  const allowAddon = computed(() => (goodsData.value?.data as any)?.allow_addon === true)

  const faqs = computed(() => {
    if (fetchedFaqs.value.length > 0) return fetchedFaqs.value
    return [
      { id: '1', question: '下单后多久发货？一般为秒级自动发货。' },
      { id: '2', question: '账号无法登录怎么办？请联系在线人工客服处理。' },
      { id: '3', question: '支持退款吗？虚拟商品发货后非质量问题不支持退款。' },
      { id: '4', question: '可以长期续费吗？支持同号续费，请关注订阅到期提醒。' }
    ]
  })

  // --- 6. 核心方法 ---
  const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price
    return Number(num).toFixed(2)
  }

  const checkSkuAvailability = async (skuId: string) => {
    if (!skuId) {
      skuAvailable.value = false
      stock.value = 0
      return
    }
    stockLoading.value = true
    try {
      const result = await supabaseProductApi.checkSkuAvailability(skuId)
      skuAvailable.value = result.available
      stock.value = result.availableCount
    } catch (e) {
      skuAvailable.value = false
      stock.value = 0
    } finally {
      stockLoading.value = false
    }
  }

  const handleSpecSelect = async (group: string, val: string) => {
    selectedSpecs.value[group] = val
    if (matchedSku.value) {
      if (matchedSku.value.image) selectedSkuImage.value = matchedSku.value.image
      await checkSkuAvailability(matchedSku.value.id)
    }
  }

  const fetchBoundFaqs = async () => {
    fetchedFaqs.value = []
    try {
      let finalFaqs: any[] = []
      const res = await supabaseFaqApi.getFaqsByProduct(goodsId.value)
      if (res.success && res.faqs.length > 0) finalFaqs = [...res.faqs]

      if (finalFaqs.length < 5) {
        const resGen = await supabaseFaqApi.getFaqs()
        if (resGen.success && resGen.faqs.length > 0) {
          const existingIds = new Set(finalFaqs.map(f => f.id))
          const generalToAdd = resGen.faqs.filter((f: any) => !existingIds.has(f.id))
          finalFaqs = [...finalFaqs, ...generalToAdd].slice(0, 5)
        }
      }
      fetchedFaqs.value = finalFaqs
    } catch (e) { if (import.meta.dev) console.error('Fetch FAQ error:', e) }
  }

  const checkFavoriteStatus = async () => {
    if (!userStore.isLoggedIn || !goodsId.value) return
    const { favoriteApi } = await import('@/api/client/common')
    // Safe check if matchedSku exists
    const skuId = matchedSku.value?.id ? String(matchedSku.value.id) : undefined
    const res = await favoriteApi.checkFavorite(String(goodsId.value), skuId)
    isFavorited.value = res.data || false

    // Sync global state
    useState('is-current-page-favorited', () => false).value = isFavorited.value
  }

  const buyNow = async () => {
    if (!userStore.isLoggedIn) return modal.showLogin = true
    if (!hasStock.value) return warning('商品暂时缺货')
    if (!matchedSku.value && hasSkus.value) return warning('请选择商品规格')

    const skuId = matchedSku.value ? String(matchedSku.value.id) : String(goodsInfo.value.id)
    if (!skuId) {
      warning('商品信息异常')
      return
    }
    if (submitting.value) return

    submitting.value = true
    try {
      const { supabasePreOrderApi } = await import('@/api/client/supabase')
      const result = await supabasePreOrderApi.createPreOrder(skuId, qty.value, 'buy_now')

      if (!result.success) {
        if (['DUPLICATE_ORDER', 'LIMIT_EXCEEDED'].includes(result.code)) {
          warning('您有未完成的订单，请前往订单中心查看')
          router.push('/profile/orders?tab=待支付')
          return
        }
        error(result.error || '创建预订单失败')
        return
      }
      router.push(`/checkout/${result.pre_order_id}`)
    } catch (e) {
      if (import.meta.dev) console.error('立即购买失败', e)
    } finally {
      submitting.value = false
    }
  }

  const addToCart = async (callback?: () => void) => {
    if (!userStore.isLoggedIn) return modal.showLogin = true
    if (!hasStock.value) return warning('商品暂时缺货')
    if (!matchedSku.value && hasSkus.value) return warning('请选择商品规格')

    const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id
    if (submitting.value) return

    submitting.value = true
    try {
      const result = await cartStore.addToCart(skuId, qty.value)
      if (result.success) {
        if (callback) callback()
        else {
          cartStore.miniCartVisible = true
          success('已成功加入购物车')
        }
      } else {
        error(result.msg || '加入购物车失败')
      }
    } catch (e) {
      error('加入购物车失败')
    } finally {
      submitting.value = false
    }
  }

  const toggleFavorite = async (event?: MouseEvent, callback?: (target: HTMLElement, image: string) => void) => {
    if (!userStore.isLoggedIn) return modal.showLogin = true
    if (favoriteLoading.value) return

    favoriteLoading.value = true
    try {
      const { favoriteApi } = await import('@/api/client/common')
      if (isFavorited.value) {
        info('取消收藏请前往"我的收藏"页面')
      } else {
        const skuId = matchedSku.value?.id ? String(matchedSku.value.id) : undefined
        const res = await favoriteApi.addFavorite(String(goodsId.value), skuId)
        if (res.success) {
          isFavorited.value = true
          useState('is-current-page-favorited').value = true

          if (callback && event) {
            const target = (event.target as HTMLElement).closest('.favorite-btn') as HTMLElement || (event.target as HTMLElement)
            callback(target, selectedSkuImage.value || goodsInfo.value.image)
          }
          success('收藏成功')
        } else {
          warning(res.msg || '收藏失败')
        }
      }
    } finally {
      favoriteLoading.value = false
    }
  }

  // 初始化逻辑
  const initClientState = async () => {
    // 如果需要手动获取 (Mobile)
    if (!shouldAutoFetch.value) {
      // Fix: Only fetch if data is missing or invalid to avoid duplicate fetch on hydration
      if (!goodsData.value || !goodsData.value.success) {
        await fetchGoodsData()
      }
    }

    // 等待数据加载完成
    if (pending.value) {
      const unwatch = watch(pending, (val) => {
        if (!val) {
          _initConfig()
          unwatch()
        }
      })
      return
    }
    await _initConfig()
  }

  const _initConfig = async () => {
    if (!goodsData.value?.success) return

    // 重置选择状态，确保每次打开新商品都从第一个规格开始
    selectedSpecs.value = {}
    selectedSkuImage.value = ''
    qty.value = 1
    stock.value = 0

    if (specGroups.value && specGroups.value.length > 0) {
      specGroups.value.forEach((g: any) => {
        selectedSpecs.value[g.name] = g.values[0]
      })
    }

    if (matchedSku.value) {
      if (matchedSku.value.image) selectedSkuImage.value = matchedSku.value.image
      await checkSkuAvailability(matchedSku.value.id)
    } else if (skus.value.length > 0 && skus.value[0].id) {
      await checkSkuAvailability(skus.value[0].id)
    } else {
      // 无 SKU 情况 (如 one_time/virtual 单品)
      stock.value = Number((goodsData.value?.data as any)?.stock || 0)
      skuAvailable.value = stock.value > 0
    }

    await Promise.all([fetchBoundFaqs(), checkFavoriteStatus()])
  }

  return {
    goodsId,
    goodsData,
    goodsError,
    goodsSeo,
    goodsInfo,
    qty,
    stock,
    submitting,
    selectedSpecs,
    selectedSkuImage,
    skuAvailable,
    stockLoading,
    pending,
    hasStock,
    hasSkus,
    skus,
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
    favoriteLoading,
    toggleFavorite,
    initClientState,
    fetchGoodsData, // Expose for manual refresh
    modal
  }
}
