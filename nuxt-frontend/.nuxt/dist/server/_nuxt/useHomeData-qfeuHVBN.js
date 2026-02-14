import { ref } from "vue";
import { a as commonApi } from "./common-CeIxTI3I.js";
import { g as goodsApi } from "./goods-C--eYRL4.js";
const useSimpleCache = () => {
  const getCache = (key) => {
    return null;
  };
  const setCache = (key, data) => {
    return;
  };
  return { getCache, setCache };
};
const useHomeData = () => {
  const { getCache, setCache } = useSimpleCache();
  const banners = ref([]);
  const categories = ref([]);
  const currentGoods = ref([]);
  const activeCategoryId = ref("");
  const bannerLoading = ref(true);
  const categoryLoading = ref(true);
  const goodsLoading = ref(false);
  const isLoadingMore = ref(false);
  const hasMore = ref(true);
  const currentPage = ref(1);
  const PAGE_SIZE = 10;
  const fetchBanners = async () => {
    bannerLoading.value = true;
    const cached = getCache("home_banners");
    if (cached) {
      banners.value = cached;
      bannerLoading.value = false;
    }
    try {
      const res = await commonApi.getBannerList();
      if (res?.success && res.data) {
        banners.value = res.data;
        setCache("home_banners", res.data);
      }
    } catch (e) {
      console.error("Fetch banners error:", e);
    } finally {
      bannerLoading.value = false;
    }
  };
  const fetchCategories = async () => {
    categoryLoading.value = true;
    const cached = getCache("home_categories");
    if (cached && cached.length > 0) {
      categories.value = cached;
      categoryLoading.value = false;
      return cached[0].id;
    }
    try {
      const res = await goodsApi.getCategories();
      if (res?.success && res.data && res.data.length > 0) {
        categories.value = res.data;
        setCache("home_categories", res.data);
        return res.data[0].id;
      }
    } catch (e) {
      console.error("Fetch categories error:", e);
    } finally {
      categoryLoading.value = false;
    }
    return null;
  };
  const fetchGoods = async (categoryId, isLoadMore = false) => {
    if (!categoryId) return;
    if (isLoadMore && (isLoadingMore.value || !hasMore.value)) return;
    if (isLoadMore) {
      isLoadingMore.value = true;
    } else {
      goodsLoading.value = true;
      currentPage.value = 1;
      hasMore.value = true;
      currentGoods.value = [];
    }
    try {
      const res = await goodsApi.getGoodsList({
        categoryId,
        page: currentPage.value,
        limit: PAGE_SIZE
      });
      const newList = res?.success && res.data?.list ? res.data.list : [];
      if (isLoadMore) {
        currentGoods.value = [...currentGoods.value, ...newList];
      } else {
        currentGoods.value = newList;
      }
      if (newList.length < PAGE_SIZE) {
        hasMore.value = false;
      } else {
        currentPage.value++;
        hasMore.value = true;
      }
    } catch (e) {
      console.error("Fetch goods error:", e);
      if (!isLoadMore) currentGoods.value = [];
    } finally {
      goodsLoading.value = false;
      isLoadingMore.value = false;
    }
  };
  const loadMore = () => {
    fetchGoods(activeCategoryId.value, true);
  };
  const handleCategoryChange = async (categoryId) => {
    if (activeCategoryId.value === categoryId) return;
    activeCategoryId.value = categoryId;
    await fetchGoods(categoryId);
  };
  const initData = async (initialCategoryId) => {
    fetchBanners();
    const firstCategoryId = await fetchCategories();
    let targetId = initialCategoryId || firstCategoryId;
    if (categories.value.length > 0 && initialCategoryId) {
      const exists = categories.value.find((c) => String(c.id) === String(initialCategoryId));
      if (!exists && firstCategoryId) targetId = firstCategoryId;
    } else if (!targetId && firstCategoryId) {
      targetId = firstCategoryId;
    }
    if (targetId) {
      activeCategoryId.value = targetId;
      await fetchGoods(targetId);
    }
  };
  return {
    // State
    banners,
    categories,
    currentGoods,
    activeCategoryId,
    // Loading State
    bannerLoading,
    categoryLoading,
    goodsLoading,
    isLoadingMore,
    hasMore,
    // Methods
    initData,
    fetchGoods,
    loadMore,
    handleCategoryChange
  };
};
export {
  useHomeData as u
};
//# sourceMappingURL=useHomeData-qfeuHVBN.js.map
