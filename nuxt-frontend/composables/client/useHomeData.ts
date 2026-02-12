import { ref } from 'vue'
import { commonApi } from '@/api/client/common'
import { goodsApi } from '@/api/client/goods'
import { useSimpleCache } from '@/composables/shared/useSimpleCache'
import type { Banner, Goods, GoodsCategory } from '@/types/api'

export const useHomeData = () => {
  const { getCache, setCache } = useSimpleCache()

  // State
  const banners = ref<Banner[]>([])
  const categories = ref<GoodsCategory[]>([])
  const currentGoods = ref<Goods[]>([])
  const activeCategoryId = ref<string | number>('')
  
  // Loading States
  const goodsLoading = ref(false)
  const isLoadingMore = ref(false)
  const hasMore = ref(true)
  
  // Pagination
  const currentPage = ref(1)
  const PAGE_SIZE = 10

  // Fetch Banners
  const fetchBanners = async () => {
    const cached = getCache<Banner[]>('home_banners')
    if (cached) banners.value = cached
    
    try {
      const res = await commonApi.getBannerList()
      if (res?.success && res.data) {
        banners.value = res.data
        setCache('home_banners', res.data)
      }
    } catch (e) {
      console.error('Fetch banners error:', e)
    }
  }

  // Fetch Categories
  const fetchCategories = async (): Promise<string | number | null> => {
    const cached = getCache<GoodsCategory[]>('home_categories')
    if (cached && cached.length > 0) {
      categories.value = cached
      return cached[0].id
    }
    
    try {
      const res = await goodsApi.getCategories()
      if (res?.success && res.data && res.data.length > 0) {
        categories.value = res.data
        setCache('home_categories', res.data)
        return res.data[0].id
      }
    } catch (e) {
      console.error('Fetch categories error:', e)
    }
    return null
  }

  /**
   * Fetch Goods List
   * @param categoryId Category ID
   * @param isLoadMore If true, append to list; otherwise replace list
   */
  const fetchGoods = async (categoryId?: string | number, isLoadMore = false) => {
    if (!categoryId) return
    
    // Prevent duplicate loading
    if (isLoadMore && (isLoadingMore.value || !hasMore.value)) return

    if (isLoadMore) {
      isLoadingMore.value = true
    } else {
      goodsLoading.value = true
      currentPage.value = 1
      hasMore.value = true
      // Optional: Clear list for skeleton effect, or keep for transition
      currentGoods.value = [] 
    }

    try {
      const res = await goodsApi.getGoodsList({ 
        categoryId: categoryId,
        page: currentPage.value, 
        limit: PAGE_SIZE,
      })
      
      const newList = res?.success && res.data?.list ? res.data.list : []
      
      if (isLoadMore) {
        currentGoods.value = [...currentGoods.value, ...newList]
      } else {
        currentGoods.value = newList
      }

      if (newList.length < PAGE_SIZE) {
        hasMore.value = false
      } else {
        currentPage.value++
        hasMore.value = true
      }
    } catch (e) {
      console.error('Fetch goods error:', e)
      if (!isLoadMore) currentGoods.value = []
    } finally {
      goodsLoading.value = false
      isLoadingMore.value = false
    }
  }

  // Load More Trigger
  const loadMore = () => {
    fetchGoods(activeCategoryId.value, true)
  }

  // Handle Category Change
  const handleCategoryChange = async (categoryId: string | number) => {
    if (activeCategoryId.value === categoryId) return
    activeCategoryId.value = categoryId
    await fetchGoods(categoryId)
  }

  // Initialize Data
  // Supports optional callback for platform-specific init logic (e.g., parsing URL query)
  const initData = async (initialCategoryId?: string | number) => {
    // 1. Parallel fetch banners & categories
    const [_, firstCategoryId] = await Promise.all([
      fetchBanners(),
      fetchCategories()
    ])
    
    // 2. Determine target category
    // If initialCategoryId is provided (e.g. from URL), use it
    // Otherwise use the first category from API/Cache
    let targetId = initialCategoryId || firstCategoryId

    if (categories.value.length > 0 && initialCategoryId) {
       // Verify if initial ID exists in categories
       const exists = categories.value.find(c => String(c.id) === String(initialCategoryId))
       if (!exists && firstCategoryId) targetId = firstCategoryId
    } else if (!targetId && firstCategoryId) {
       targetId = firstCategoryId
    }

    if (targetId) {
      activeCategoryId.value = targetId
      await fetchGoods(targetId)
    }
  }

  return {
    // State
    banners,
    categories,
    currentGoods,
    activeCategoryId,
    
    // Loading State
    goodsLoading,
    isLoadingMore,
    hasMore,

    // Methods
    initData,
    fetchGoods,
    loadMore,
    handleCategoryChange
  }
}
