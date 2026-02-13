/* empty css              */
/* empty css                    */
import { computed, unref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { g as goodsApi } from "./goods-Q8QuJnLu.js";
import { supabaseProductApi, supabaseFaqApi } from "./supabase-fcLPkUp1.js";
import { u as useModalStore } from "./modal-_wZ2Eah3.js";
import { u as useUserStore } from "./user-C1i1UnhA.js";
import { useCartStore } from "./cart-B8xez9id.js";
import { u as useAsyncData } from "./asyncData-BY91Pj36.js";
import { G as useState } from "../server.mjs";
import { E as ElMessage } from "./index-Ho-fELR6.js";
const useProductDetail = (overrideId) => {
  const route = useRoute();
  const router = useRouter();
  const modal = useModalStore();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const goodsId = computed(() => {
    const oid = unref(overrideId);
    if (oid) return String(oid);
    const id = route.params.id;
    return Array.isArray(id) ? id[0] : id;
  });
  const shouldAutoFetch = computed(() => !unref(overrideId));
  const { data: goodsResponse, error: fetchError, pending, refresh: fetchGoodsData } = useAsyncData(
    () => `goods-detail-${goodsId.value}`,
    () => goodsApi.getGoodsDetail(goodsId.value),
    {
      watch: [goodsId],
      immediate: shouldAutoFetch.value,
      lazy: true
    }
  );
  const goodsData = computed(() => goodsResponse.value || null);
  const goodsError = computed(() => !!fetchError.value || goodsResponse.value && !goodsResponse.value.success);
  const goodsSeo = computed(() => {
    const data = goodsData.value?.data || {};
    return {
      title: data.product_name || "商品详情",
      desc: data.description || "凡图拉提供优质数字商品服务",
      image: data.coverImage || data.image
    };
  });
  const qty = ref(1);
  const stock = ref(0);
  const submitting = ref(false);
  const selectedSpecs = ref({});
  const selectedSkuImage = ref("");
  const skuAvailable = ref(false);
  const stockLoading = ref(false);
  const fetchedFaqs = ref([]);
  const isFavorited = ref(false);
  const favoriteLoading = ref(false);
  const hasStock = computed(() => !stockLoading.value && skuAvailable.value && stock.value > 0);
  const goodsInfo = computed(() => {
    const data = goodsData.value?.data || {};
    return {
      id: data.id,
      // Ensure ID is available
      name: data.title || data.product_name || "正在加载商品...",
      image: data.coverImage || data.image || "/images/placeholder.png",
      price: data.price || 0,
      sales: data.initial_sales || data.sales || 0,
      rating: data.rating || 100
    };
  });
  const skus = computed(() => goodsData.value?.data?.skus || []);
  const hasSkus = computed(() => skus.value.length > 0);
  const specGroups = computed(() => {
    const backendGroups = goodsData.value?.data?.specGroups;
    if (backendGroups && backendGroups.length > 0) return backendGroups;
    if (skus.value.length > 0) {
      const groups = {};
      skus.value.forEach((sku) => {
        const combination = sku.spec_combination || {};
        Object.entries(combination).forEach(([name, value]) => {
          if (!groups[name]) groups[name] = /* @__PURE__ */ new Set();
          groups[name].add(value);
        });
      });
      return Object.keys(groups).map((name) => ({
        name,
        values: Array.from(groups[name])
      }));
    }
    return [];
  });
  const matchedSku = computed(() => {
    if (skus.value.length === 0) return null;
    return skus.value.find((sku) => {
      const combination = sku.spec_combination || {};
      return Object.entries(selectedSpecs.value).every(([name, value]) => {
        return combination[name] === value;
      });
    });
  });
  const currentPrice = computed(() => matchedSku.value?.price || goodsInfo.value.price || 0);
  const skuImages = computed(() => {
    const images = skus.value.map((s) => s.image).filter(Boolean);
    return images.length > 0 ? Array.from(new Set(images)) : [goodsInfo.value.image];
  });
  const detailModules = computed(() => {
    const dataModules = goodsData.value?.data?.detail_modules;
    if (dataModules && dataModules.length > 0) return dataModules;
    return [
      { type: "image", content: "/images/client/pc/netflix_detail_1.png" },
      { type: "image", content: "/images/client/pc/netflix_detail_2.png" }
    ];
  });
  const allowAddon = computed(() => goodsData.value?.data?.allow_addon === true);
  const faqs = computed(() => {
    if (fetchedFaqs.value.length > 0) return fetchedFaqs.value;
    return [
      { id: "1", question: "下单后多久发货？一般为秒级自动发货。" },
      { id: "2", question: "账号无法登录怎么办？请联系在线人工客服处理。" },
      { id: "3", question: "支持退款吗？虚拟商品发货后非质量问题不支持退款。" },
      { id: "4", question: "可以长期续费吗？支持同号续费，请关注订阅到期提醒。" }
    ];
  });
  const formatPrice = (price) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return Number(num).toFixed(2);
  };
  const checkSkuAvailability = async (skuId) => {
    if (!skuId) {
      skuAvailable.value = false;
      stock.value = 0;
      return;
    }
    stockLoading.value = true;
    try {
      const result = await supabaseProductApi.checkSkuAvailability(skuId);
      skuAvailable.value = result.available;
      stock.value = result.availableCount;
    } catch (e) {
      skuAvailable.value = false;
      stock.value = 0;
    } finally {
      stockLoading.value = false;
    }
  };
  const handleSpecSelect = async (group, val) => {
    selectedSpecs.value[group] = val;
    if (matchedSku.value) {
      if (matchedSku.value.image) selectedSkuImage.value = matchedSku.value.image;
      await checkSkuAvailability(matchedSku.value.id);
    }
  };
  const fetchBoundFaqs = async () => {
    try {
      let finalFaqs = [];
      const res = await supabaseFaqApi.getFaqsByProduct(goodsId.value);
      if (res.success && res.faqs.length > 0) finalFaqs = [...res.faqs];
      if (finalFaqs.length < 5) {
        const resGen = await supabaseFaqApi.getFaqs();
        if (resGen.success && resGen.faqs.length > 0) {
          const existingIds = new Set(finalFaqs.map((f) => f.id));
          const generalToAdd = resGen.faqs.filter((f) => !existingIds.has(f.id));
          finalFaqs = [...finalFaqs, ...generalToAdd].slice(0, 5);
        }
      }
      fetchedFaqs.value = finalFaqs;
    } catch (e) {
      console.error("Fetch FAQ error:", e);
    }
  };
  const checkFavoriteStatus = async () => {
    if (!userStore.isLoggedIn || !goodsId.value) return;
    const { favoriteApi } = await import("./common-D9iMPQj0.js").then((n) => n.b);
    const skuId = matchedSku.value?.id ? String(matchedSku.value.id) : void 0;
    const res = await favoriteApi.checkFavorite(String(goodsId.value), skuId);
    isFavorited.value = res.data || false;
    useState("is-current-page-favorited", () => false).value = isFavorited.value;
  };
  const buyNow = async () => {
    if (!userStore.isLoggedIn) return modal.showLogin = true;
    if (!hasStock.value) return ElMessage.warning("商品暂时缺货");
    if (!matchedSku.value && hasSkus.value) return ElMessage.warning("请选择商品规格");
    const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id;
    if (submitting.value) return;
    submitting.value = true;
    try {
      const { supabasePreOrderApi } = await import("./supabase-fcLPkUp1.js");
      const result = await supabasePreOrderApi.createPreOrder(skuId, qty.value, "buy_now");
      if (!result.success) {
        if (["DUPLICATE_ORDER", "LIMIT_EXCEEDED"].includes(result.code)) {
          ElMessage.warning("您有未完成的订单，请前往订单中心查看");
          router.push("/profile/orders?tab=待支付");
          return;
        }
        ElMessage.error(result.error || "创建预订单失败");
        return;
      }
      router.push(`/checkout/${result.pre_order_id}`);
    } catch (e) {
      console.error("立即购买失败", e);
    } finally {
      submitting.value = false;
    }
  };
  const addToCart = async (callback) => {
    if (!userStore.isLoggedIn) return modal.showLogin = true;
    if (!hasStock.value) return ElMessage.warning("商品暂时缺货");
    if (!matchedSku.value && hasSkus.value) return ElMessage.warning("请选择商品规格");
    const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id;
    if (submitting.value) return;
    submitting.value = true;
    try {
      const result = await cartStore.addToCart(skuId, qty.value);
      if (result.success) {
        if (callback) callback();
        else {
          cartStore.miniCartVisible = true;
          ElMessage.success("已成功加入购物车");
        }
      } else {
        ElMessage.error(result.msg || "加入购物车失败");
      }
    } catch (e) {
      ElMessage.error("加入购物车失败");
    } finally {
      submitting.value = false;
    }
  };
  const toggleFavorite = async (event, callback) => {
    if (!userStore.isLoggedIn) return modal.showLogin = true;
    if (favoriteLoading.value) return;
    favoriteLoading.value = true;
    try {
      const { favoriteApi } = await import("./common-D9iMPQj0.js").then((n) => n.b);
      if (isFavorited.value) {
        ElMessage.info('取消收藏请前往"我的收藏"页面');
      } else {
        const skuId = matchedSku.value?.id ? String(matchedSku.value.id) : void 0;
        const res = await favoriteApi.addFavorite(String(goodsId.value), skuId);
        if (res.success) {
          isFavorited.value = true;
          useState("is-current-page-favorited").value = true;
          if (callback && event) {
            const target = event.target.closest(".favorite-btn") || event.target;
            callback(target, selectedSkuImage.value || goodsInfo.value.image);
          }
          ElMessage.success("收藏成功");
        } else {
          ElMessage.warning(res.msg || "收藏失败");
        }
      }
    } finally {
      favoriteLoading.value = false;
    }
  };
  const initClientState = async () => {
    if (!shouldAutoFetch.value) {
      await fetchGoodsData();
    }
    if (pending.value) {
      const unwatch = watch(pending, (val) => {
        if (!val) {
          _initConfig();
          unwatch();
        }
      });
      return;
    }
    await _initConfig();
  };
  const _initConfig = async () => {
    if (!goodsData.value?.success) return;
    if (specGroups.value && specGroups.value.length > 0) {
      specGroups.value.forEach((g) => {
        if (!selectedSpecs.value[g.name]) selectedSpecs.value[g.name] = g.values[0];
      });
    }
    if (matchedSku.value) {
      if (matchedSku.value.image) selectedSkuImage.value = matchedSku.value.image;
      await checkSkuAvailability(matchedSku.value.id);
    } else if (skus.value.length > 0 && skus.value[0].id) {
      await checkSkuAvailability(skus.value[0].id);
    } else {
      stock.value = Number(goodsData.value?.data?.stock || 0);
      skuAvailable.value = stock.value > 0;
    }
    await Promise.all([fetchBoundFaqs(), checkFavoriteStatus()]);
  };
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
    fetchGoodsData,
    // Expose for manual refresh
    modal
  };
};
export {
  useProductDetail as u
};
//# sourceMappingURL=useProductDetail-D9yIQzx6.js.map
