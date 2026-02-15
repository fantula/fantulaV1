import { ref, computed } from 'vue'
import { commonApi } from '@/api/client/common'
import { goodsApi } from '@/api/client/goods'
import type { Banner, Goods, GoodsCategory } from '@/types/api'
import { useAsyncData, useNuxtApp } from '#app'
import { getSupabaseClient } from '@/utils/supabase'

export const useHomeData = async (key: string) => {
  // Use a unique key for hydration matching provided by the caller (PC vs Mobile)
  const CACHE_KEY = key

  // --- Core Data Fetching (SSR + Hydration) ---
  // Await usage ensures data is ready before we initialize local refs
  const { data, pending, refresh, error } = await useAsyncData(
    CACHE_KEY,
    async () => {
      const supabaseClient = getSupabaseClient()

      try {
        // Parallel fetch for initial data with error resilience
        // We use allSettled-like logic or individual catches if we want partial success
        // But here we want a simple "try all, if one fails, handle gracefully"
        // To strictly meet "Promise.all failure doesn't affect overall", we catch individual promises or the block.
        // Let's catch individual critical sections if needed, or the whole block if acceptable.
        // User asked: "Promise.all 任一失败不影响整体" -> One failure should not break others.

        const [bannersResult, categoriesResult] = await Promise.allSettled([
          commonApi.getBannerList(),
          goodsApi.getCategories()
        ])

        const banners = bannersResult.status === 'fulfilled' && bannersResult.value.success
          ? bannersResult.value.data
          : []

        if (bannersResult.status === 'rejected') {
          console.error('Banners fetch failed', bannersResult.reason)
        }

        const categories = categoriesResult.status === 'fulfilled' && categoriesResult.value.success
          ? categoriesResult.value.data
          : []

        if (categoriesResult.status === 'rejected') {
          console.error('Categories fetch failed', categoriesResult.reason)
        }

        // Default to first category if available
        const initialCategoryId = categories.length > 0 ? categories[0].id : ''

        // Fetch initial goods based on first category
        let initialGoods: Goods[] = []
        let initialHasMore = false

        if (initialCategoryId) {
          try {
            // Pass captured client to avoid context loss after await
            const goodsRes = await goodsApi.getGoodsList({
              categoryId: initialCategoryId,
              page: 1,
              limit: 10
            }, supabaseClient)

            if (goodsRes.success && goodsRes.data) {
              initialGoods = goodsRes.data.list
              initialHasMore = goodsRes.data.list.length >= 10
            }
          } catch (err) {
            console.error('Initial goods fetch failed', err)
            // Fail silently for goods, page still loads
          }
        }

        return {
          banners,
          categories,
          initialGoods,
          initialCategoryId,
          initialHasMore
        }
      } catch (e) {
        console.error('CRITICAL: Home Data Fetch Failed Completely', e)
        // Return safe empty state so page doesn't crash
        return {
          banners: [],
          categories: [],
          initialGoods: [],
          initialCategoryId: '',
          initialHasMore: false
        }
      }
    },
    {
      server: true,
      lazy: false, // Must wait for hydration
      immediate: true,
      watch: [] // No auto-watch
    }
  )

  // --- State ---
  // Reactive state derived from hydration data
  const banners = computed(() => data.value?.banners || [])
  const categories = computed(() => data.value?.categories || [])

  // Mutable state for client-side pagination/filtering
  // We initialize from hydration data immediately
  // If data is missing (error case), these will be empty defaults defined above
  const activeCategoryId = ref<string | number>(data.value?.initialCategoryId || '')
  const currentGoods = ref<Goods[]>(data.value?.initialGoods || [])
  const hasMore = ref(data.value?.initialHasMore || false)
  const currentPage = ref(1)

  // Loading states for CLIENT interaction
  const isSwitchingCategory = ref(false)
  const isLoadingMore = ref(false)

  // --- Actions ---

  const handleCategoryChange = async (categoryId: string | number) => {
    if (activeCategoryId.value === categoryId) return

    activeCategoryId.value = categoryId
    isSwitchingCategory.value = true
    currentPage.value = 1
    currentGoods.value = []
    hasMore.value = true

    try {
      const res = await goodsApi.getGoodsList({
        categoryId,
        page: 1,
        limit: 10
      })

      if (res.success && res.data) {
        currentGoods.value = res.data.list
        hasMore.value = res.data.list.length >= 10
      } else {
        currentGoods.value = []
        hasMore.value = false
      }
    } catch (e) {
      console.error('Category switch error:', e)
      currentGoods.value = []
    } finally {
      isSwitchingCategory.value = false
    }
  }

  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value) return

    isLoadingMore.value = true
    const nextPage = currentPage.value + 1

    try {
      const res = await goodsApi.getGoodsList({
        categoryId: activeCategoryId.value,
        page: nextPage,
        limit: 10
      })

      if (res.success && res.data) {
        const newGoods = res.data.list
        if (newGoods.length > 0) {
          currentGoods.value = [...currentGoods.value, ...newGoods]
          currentPage.value = nextPage
          hasMore.value = newGoods.length >= 10
        } else {
          hasMore.value = false
        }
      }
    } catch (e) {
      console.error('Load more error:', e)
    } finally {
      isLoadingMore.value = false
    }
  }

  // initData is MAINLY for override or recovery. 
  // SSR data is already there. We do NOT call this by default in onMounted.
  const initData = async (overrideCatId?: string | number) => {
    // If override provided (e.g. from URL), switch to it immediately
    if (overrideCatId && overrideCatId !== activeCategoryId.value) {
      await handleCategoryChange(overrideCatId)
    } else if (!data.value && !pending.value && !error.value) {
      // Only refresh if we have absolutely nothing and no error
      await refresh()
    }
  }

  // Watch for hydration update to sync refs if they were empty initially (delayed hydration)
  // This ensures if data arrives late (client-side fallback), refs get updated
  watch(data, (val) => {
    if (val && currentGoods.value.length === 0 && val.initialGoods.length > 0) {
      activeCategoryId.value = val.initialCategoryId
      currentGoods.value = val.initialGoods
      hasMore.value = val.initialHasMore
    }
  })

  return {
    // Data
    banners,
    categories,
    currentGoods,
    activeCategoryId,

    // Status
    pending, // SSR Loading
    goodsLoading: isSwitchingCategory, // Client Loading (Category switch)
    isLoadingMore,
    hasMore,
    error,

    // Methods
    initData,
    handleCategoryChange,
    loadMore,
    refresh // Expose standard refresh
  }
}
