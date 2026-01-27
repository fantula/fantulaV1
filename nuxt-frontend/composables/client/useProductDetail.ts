import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { goodsApi } from '@/api/client/goods'
import { supabaseProductApi, supabaseFaqApi } from '@/api/client/supabase'
import { useModalStore } from '@/stores/client/modal'
import { useUserStore } from '@/stores/client/user'
import { useCartStore } from '@/stores/client/cart'

export const useProductDetail = async () => {
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const modal = useModalStore()
  const userStore = useUserStore()
  const cartStore = useCartStore()

  // --- 1. 商品已定义 ID ---
  const goodsId = computed(() => {
    const id = route.params.id
    return Array.isArray(id) ? id[0] : id
  })

  // --- 2. SSR 数据获取 (需在 setup 中调用 useAsyncData) ---
  // 注意：useAsyncData 必须在 setup 顶层调用，不能在普通函数中动态调用，
  // 所以这里我们仅返回 fetch 函数，让组件自己去处理 useAsyncData，或者我们将 useAsyncData 封装在这里

  // 封装 useAsyncData
  const { data: goodsResponse, error: fetchError } = await useAsyncData(
    `goods-detail-${goodsId.value}`,
    () => goodsApi.getGoodsDetail(goodsId.value)
  )

  const goodsData = computed(() => goodsResponse.value || null)
  // API 返回 success: false 也视为错误
  const goodsError = computed(() => !!fetchError.value || (goodsResponse.value && !goodsResponse.value.success))

  // --- 3. SEO 配置 ---
  const goodsSeo = computed(() => {
    const data = goodsData.value?.data || {}
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
  const stockLoading = ref(false) // 默认不加载，只有在切换SKU时才加载

  // FAQ 滚动数据
  const fetchedFaqs = ref<any[]>([])

  // 收藏状态
  const isFavorited = ref(false)
  const favoriteLoading = ref(false)

  // --- 5. 计算属性 ---
  // 是否有库存
  const hasStock = computed(() => !stockLoading.value && skuAvailable.value && stock.value > 0)

  // 商品基础信息适配
  const goodsInfo = computed(() => {
    const data = (goodsData.value?.data || {}) as any
    return {
      name: data.title || data.product_name || '正在加载商品...',
      image: data.coverImage || data.image || '/images/placeholder.png',
      price: data.price || 0,
      sales: data.initial_sales || data.sales || 0,
      rating: data.rating || 100
    }
  })

  // SKU 列表
  const skus = computed(() => (goodsData.value?.data as any)?.skus || [])
  const hasSkus = computed(() => skus.value.length > 0)

  // 规格组
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

  // 当前匹配 SKU
  const matchedSku = computed(() => {
    if (skus.value.length === 0) return null
    return skus.value.find((sku: any) => {
      const combination = sku.spec_combination || {}
      return Object.entries(selectedSpecs.value).every(([name, value]) => {
        return combination[name] === value
      })
    })
  })

  // 当前价格
  const currentPrice = computed(() => {
    return matchedSku.value?.price || goodsInfo.value.price || 35.00
  })

  // SKU 图片集
  const skuImages = computed(() => {
    const images = skus.value.map((s: any) => s.image).filter(Boolean)
    return images.length > 0 ? Array.from(new Set(images)) : [goodsInfo.value.image]
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

  // 是否允许加入购物车
  const allowAddon = computed(() => {
    return (goodsData.value?.data as any)?.allow_addon === true
  })

  // FAQ 显示列表
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

  // 格式化价格
  const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price
    return num.toFixed(2)
  }

  // 检查 SKU 库存
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

  // 选择规格
  const handleSpecSelect = async (group: string, val: string) => {
    selectedSpecs.value[group] = val
    if (matchedSku.value) {
      if (matchedSku.value.image) {
        selectedSkuImage.value = matchedSku.value.image
      }
      await checkSkuAvailability(matchedSku.value.id)
    }
  }

  // 获取绑定 FAQ
  const fetchBoundFaqs = async () => {
    try {
      let finalFaqs: any[] = []
      const res = await supabaseFaqApi.getFaqsByProduct(goodsId.value)
      if (res.success && res.faqs.length > 0) {
        finalFaqs = [...res.faqs]
      }
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

  // 收藏状态检查
  const checkFavoriteStatus = async () => {
    if (!userStore.isLoggedIn || !goodsId.value) return
    const { favoriteApi } = await import('@/api/client/common')
    const res = await favoriteApi.checkFavorite(String(goodsId.value), matchedSku.value?.id)
    isFavorited.value = res.data || false

    // Sync with Global Header State via useState if needed (Component specific logic might be better kept in component, but shared state here is fine)
    const globalFavState = useState('is-current-page-favorited', () => false)
    globalFavState.value = isFavorited.value
  }

  // 立即购买
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
      const { supabasePreOrderApi } = await import('@/api/client/supabase')
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

  // 加入购物车
  // callback: 成功后的回调，通常用于执行动画
  const addToCart = async (callback?: () => void) => {
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
        if (callback) callback()
        else {
          cartStore.miniCartVisible = true
          ElMessage.success('已成功加入购物车')
        }
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

  // 切换收藏
  // callback: 成功后的回调，通常用于执行动画
  const toggleFavorite = async (event?: MouseEvent, callback?: (target: HTMLElement, image: string) => void) => {
    if (!userStore.isLoggedIn) {
      modal.showLogin = true
      return
    }
    if (favoriteLoading.value) return

    favoriteLoading.value = true
    try {
      const { favoriteApi } = await import('@/api/client/common')
      if (isFavorited.value) {
        ElMessage.info('取消收藏请前往"我的收藏"页面')
      } else {
        const res = await favoriteApi.addFavorite(String(goodsId.value), matchedSku.value?.id)
        if (res.success) {
          isFavorited.value = true
          useState('is-current-page-favorited').value = true

          if (callback && event) {
            const btnEl = event.target as HTMLElement
            const targetBtn = btnEl.closest('.favorite-btn') as HTMLElement || btnEl
            const imageToFly = selectedSkuImage.value || goodsInfo.value.image
            callback(targetBtn, imageToFly)
          }
          ElMessage.success('收藏成功')
        } else {
          ElMessage.warning(res.msg || '收藏失败')
        }
      }
    } finally {
      favoriteLoading.value = false
    }
  }

  // 客户端初始化 (在 onMounted 调用)
  const initClientState = async () => {
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

    fetchBoundFaqs()
    checkFavoriteStatus()
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
    modal // Export store for template access if needed
  }
}
