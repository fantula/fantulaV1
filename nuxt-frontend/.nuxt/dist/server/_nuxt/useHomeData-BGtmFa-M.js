import { computed, ref, watch } from "vue";
import { a as commonApi } from "./common-CeIxTI3I.js";
import { g as goodsApi } from "./goods-BXDiUgaK.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useAsyncData } from "./asyncData-BpgkB7Y4.js";
import "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
const useHomeData = async (key) => {
  const CACHE_KEY = key;
  const { data, pending, refresh, error } = await useAsyncData(
    CACHE_KEY,
    async () => {
      const supabaseClient = getSupabaseClient();
      try {
        const [bannersResult, categoriesResult] = await Promise.allSettled([
          commonApi.getBannerList(),
          goodsApi.getCategories()
        ]);
        const banners2 = bannersResult.status === "fulfilled" && bannersResult.value.success ? bannersResult.value.data : [];
        if (bannersResult.status === "rejected") {
          console.error("Banners fetch failed", bannersResult.reason);
        }
        const categories2 = categoriesResult.status === "fulfilled" && categoriesResult.value.success ? categoriesResult.value.data : [];
        if (categoriesResult.status === "rejected") {
          console.error("Categories fetch failed", categoriesResult.reason);
        }
        const initialCategoryId = categories2.length > 0 ? categories2[0].id : "";
        let initialGoods = [];
        let initialHasMore = false;
        if (initialCategoryId) {
          try {
            const goodsRes = await goodsApi.getGoodsList({
              categoryId: initialCategoryId,
              page: 1,
              limit: 10
            }, supabaseClient);
            if (goodsRes.success && goodsRes.data) {
              initialGoods = goodsRes.data.list;
              initialHasMore = goodsRes.data.list.length >= 10;
            }
          } catch (err) {
            console.error("Initial goods fetch failed", err);
          }
        }
        return {
          banners: banners2,
          categories: categories2,
          initialGoods,
          initialCategoryId,
          initialHasMore
        };
      } catch (e) {
        console.error("CRITICAL: Home Data Fetch Failed Completely", e);
        return {
          banners: [],
          categories: [],
          initialGoods: [],
          initialCategoryId: "",
          initialHasMore: false
        };
      }
    },
    {
      server: true,
      lazy: false,
      // Must wait for hydration
      immediate: true,
      watch: []
      // No auto-watch
    }
  );
  const banners = computed(() => data.value?.banners || []);
  const categories = computed(() => data.value?.categories || []);
  const activeCategoryId = ref(data.value?.initialCategoryId || "");
  const currentGoods = ref(data.value?.initialGoods || []);
  const hasMore = ref(data.value?.initialHasMore || false);
  const currentPage = ref(1);
  const isSwitchingCategory = ref(false);
  const isLoadingMore = ref(false);
  const handleCategoryChange = async (categoryId) => {
    if (activeCategoryId.value === categoryId) return;
    activeCategoryId.value = categoryId;
    isSwitchingCategory.value = true;
    currentPage.value = 1;
    currentGoods.value = [];
    hasMore.value = true;
    try {
      const res = await goodsApi.getGoodsList({
        categoryId,
        page: 1,
        limit: 10
      });
      if (res.success && res.data) {
        currentGoods.value = res.data.list;
        hasMore.value = res.data.list.length >= 10;
      } else {
        currentGoods.value = [];
        hasMore.value = false;
      }
    } catch (e) {
      console.error("Category switch error:", e);
      currentGoods.value = [];
    } finally {
      isSwitchingCategory.value = false;
    }
  };
  const loadMore = async () => {
    if (isLoadingMore.value || !hasMore.value) return;
    isLoadingMore.value = true;
    const nextPage = currentPage.value + 1;
    try {
      const res = await goodsApi.getGoodsList({
        categoryId: activeCategoryId.value,
        page: nextPage,
        limit: 10
      });
      if (res.success && res.data) {
        const newGoods = res.data.list;
        if (newGoods.length > 0) {
          currentGoods.value = [...currentGoods.value, ...newGoods];
          currentPage.value = nextPage;
          hasMore.value = newGoods.length >= 10;
        } else {
          hasMore.value = false;
        }
      }
    } catch (e) {
      console.error("Load more error:", e);
    } finally {
      isLoadingMore.value = false;
    }
  };
  const initData = async (overrideCatId) => {
    if (overrideCatId && overrideCatId !== activeCategoryId.value) {
      await handleCategoryChange(overrideCatId);
    } else if (!data.value && !pending.value && !error.value) {
      await refresh();
    }
  };
  watch(data, (val) => {
    if (val && currentGoods.value.length === 0 && val.initialGoods.length > 0) {
      activeCategoryId.value = val.initialCategoryId;
      currentGoods.value = val.initialGoods;
      hasMore.value = val.initialHasMore;
    }
  });
  return {
    // Data
    banners,
    categories,
    currentGoods,
    activeCategoryId,
    // Status
    pending,
    // SSR Loading
    goodsLoading: isSwitchingCategory,
    // Client Loading (Category switch)
    isLoadingMore,
    hasMore,
    error,
    // Methods
    initData,
    handleCategoryChange,
    loadMore,
    refresh
    // Expose standard refresh
  };
};
export {
  useHomeData as u
};
//# sourceMappingURL=useHomeData-BGtmFa-M.js.map
