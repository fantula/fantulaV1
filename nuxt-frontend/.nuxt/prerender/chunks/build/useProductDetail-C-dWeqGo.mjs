import { computed, unref, ref, watch } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { g as goodsApi } from './goods-BXDiUgaK.mjs';
import { supabaseProductApi, supabaseFaqApi } from './supabase-D4dCvdwD.mjs';
import { u as useModalStore } from './modal-CBJJqDui.mjs';
import { u as useUserStore } from './user-DLDq0pTF.mjs';
import { useCartStore } from './cart-Lqo8L2Wc.mjs';
import { u as useNotify } from './useNotify-Bx9I1ZGd.mjs';
import { u as useAsyncData } from './asyncData-BpgkB7Y4.mjs';
import { H as useState } from './server.mjs';

const useProductDetail = (overrideId) => {
  const route = useRoute();
  const router = useRouter();
  const modal = useModalStore();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const { success, warning, error, info } = useNotify();
  const goodsId = computed(() => {
    const oid = unref(overrideId);
    if (oid) return String(oid);
    const id = route.params.id;
    return Array.isArray(id) ? id[0] : id;
  });
  const shouldAutoFetch = computed(() => {
    return !unref(overrideId) && !!goodsId.value && goodsId.value !== "undefined";
  });
  const { data: goodsResponse, error: fetchError, pending, refresh: fetchGoodsData } = useAsyncData(
    () => `goods-detail-${goodsId.value}`,
    async () => {
      if (!goodsId.value || goodsId.value === "undefined") return null;
      return await goodsApi.getGoodsDetail(goodsId.value);
    },
    {
      watch: [goodsId],
      immediate: shouldAutoFetch.value,
      lazy: true
    }
  );
  const goodsData = computed(() => goodsResponse.value || null);
  const goodsError = computed(() => !!fetchError.value || goodsResponse.value && !goodsResponse.value.success);
  const goodsSeo = computed(() => {
    var _a;
    const data = ((_a = goodsData.value) == null ? void 0 : _a.data) || {};
    return {
      title: data.product_name || "\u5546\u54C1\u8BE6\u60C5",
      desc: data.description || "\u51E1\u56FE\u62C9\u63D0\u4F9B\u4F18\u8D28\u6570\u5B57\u5546\u54C1\u670D\u52A1",
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
    var _a;
    const data = ((_a = goodsData.value) == null ? void 0 : _a.data) || {};
    return {
      id: data.id,
      // Ensure ID is available
      name: data.title || data.product_name || "\u6B63\u5728\u52A0\u8F7D\u5546\u54C1...",
      image: data.coverImage || data.image || "/images/placeholder.png",
      price: data.price || 0,
      sales: data.initial_sales || data.sales || 0,
      rating: data.rating || 100
    };
  });
  const skus = computed(() => {
    var _a, _b;
    return ((_b = (_a = goodsData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.skus) || [];
  });
  const hasSkus = computed(() => skus.value.length > 0);
  const specGroups = computed(() => {
    var _a, _b;
    const backendGroups = (_b = (_a = goodsData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.specGroups;
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
  const currentPrice = computed(() => {
    var _a;
    return ((_a = matchedSku.value) == null ? void 0 : _a.price) || goodsInfo.value.price || 0;
  });
  const skuImages = computed(() => {
    const images = skus.value.map((s) => s.image).filter(Boolean);
    return images.length > 0 ? Array.from(new Set(images)) : [goodsInfo.value.image];
  });
  const detailModules = computed(() => {
    var _a, _b;
    const dataModules = (_b = (_a = goodsData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.detail_modules;
    if (dataModules && dataModules.length > 0) return dataModules;
    return [
      { type: "image", content: "/images/client/pc/netflix_detail_1.png" },
      { type: "image", content: "/images/client/pc/netflix_detail_2.png" }
    ];
  });
  const allowAddon = computed(() => {
    var _a, _b;
    return ((_b = (_a = goodsData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.allow_addon) === true;
  });
  const faqs = computed(() => {
    if (fetchedFaqs.value.length > 0) return fetchedFaqs.value;
    return [
      { id: "1", question: "\u4E0B\u5355\u540E\u591A\u4E45\u53D1\u8D27\uFF1F\u4E00\u822C\u4E3A\u79D2\u7EA7\u81EA\u52A8\u53D1\u8D27\u3002" },
      { id: "2", question: "\u8D26\u53F7\u65E0\u6CD5\u767B\u5F55\u600E\u4E48\u529E\uFF1F\u8BF7\u8054\u7CFB\u5728\u7EBF\u4EBA\u5DE5\u5BA2\u670D\u5904\u7406\u3002" },
      { id: "3", question: "\u652F\u6301\u9000\u6B3E\u5417\uFF1F\u865A\u62DF\u5546\u54C1\u53D1\u8D27\u540E\u975E\u8D28\u91CF\u95EE\u9898\u4E0D\u652F\u6301\u9000\u6B3E\u3002" },
      { id: "4", question: "\u53EF\u4EE5\u957F\u671F\u7EED\u8D39\u5417\uFF1F\u652F\u6301\u540C\u53F7\u7EED\u8D39\uFF0C\u8BF7\u5173\u6CE8\u8BA2\u9605\u5230\u671F\u63D0\u9192\u3002" }
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
    var _a;
    if (!userStore.isLoggedIn || !goodsId.value) return;
    const { favoriteApi } = await import('./common-CeIxTI3I.mjs').then((n) => n.b);
    const skuId = ((_a = matchedSku.value) == null ? void 0 : _a.id) ? String(matchedSku.value.id) : void 0;
    const res = await favoriteApi.checkFavorite(String(goodsId.value), skuId);
    isFavorited.value = res.data || false;
    useState("is-current-page-favorited", () => false).value = isFavorited.value;
  };
  const buyNow = async () => {
    if (!userStore.isLoggedIn) return modal.showLogin = true;
    if (!hasStock.value) return warning("\u5546\u54C1\u6682\u65F6\u7F3A\u8D27");
    if (!matchedSku.value && hasSkus.value) return warning("\u8BF7\u9009\u62E9\u5546\u54C1\u89C4\u683C");
    const skuId = matchedSku.value ? String(matchedSku.value.id) : String(goodsInfo.value.id);
    if (!skuId) {
      warning("\u5546\u54C1\u4FE1\u606F\u5F02\u5E38");
      return;
    }
    if (submitting.value) return;
    submitting.value = true;
    try {
      const { supabasePreOrderApi } = await import('./supabase-D4dCvdwD.mjs');
      const result = await supabasePreOrderApi.createPreOrder(skuId, qty.value, "buy_now");
      if (!result.success) {
        if (["DUPLICATE_ORDER", "LIMIT_EXCEEDED"].includes(result.code)) {
          warning("\u60A8\u6709\u672A\u5B8C\u6210\u7684\u8BA2\u5355\uFF0C\u8BF7\u524D\u5F80\u8BA2\u5355\u4E2D\u5FC3\u67E5\u770B");
          router.push("/profile/orders?tab=\u5F85\u652F\u4ED8");
          return;
        }
        error(result.error || "\u521B\u5EFA\u9884\u8BA2\u5355\u5931\u8D25");
        return;
      }
      router.push(`/checkout/${result.pre_order_id}`);
    } catch (e) {
      console.error("\u7ACB\u5373\u8D2D\u4E70\u5931\u8D25", e);
    } finally {
      submitting.value = false;
    }
  };
  const addToCart = async (callback) => {
    if (!userStore.isLoggedIn) return modal.showLogin = true;
    if (!hasStock.value) return warning("\u5546\u54C1\u6682\u65F6\u7F3A\u8D27");
    if (!matchedSku.value && hasSkus.value) return warning("\u8BF7\u9009\u62E9\u5546\u54C1\u89C4\u683C");
    const skuId = matchedSku.value ? matchedSku.value.id : goodsInfo.value.id;
    if (submitting.value) return;
    submitting.value = true;
    try {
      const result = await cartStore.addToCart(skuId, qty.value);
      if (result.success) {
        if (callback) callback();
        else {
          cartStore.miniCartVisible = true;
          success("\u5DF2\u6210\u529F\u52A0\u5165\u8D2D\u7269\u8F66");
        }
      } else {
        error(result.msg || "\u52A0\u5165\u8D2D\u7269\u8F66\u5931\u8D25");
      }
    } catch (e) {
      error("\u52A0\u5165\u8D2D\u7269\u8F66\u5931\u8D25");
    } finally {
      submitting.value = false;
    }
  };
  const toggleFavorite = async (event, callback) => {
    var _a;
    if (!userStore.isLoggedIn) return modal.showLogin = true;
    if (favoriteLoading.value) return;
    favoriteLoading.value = true;
    try {
      const { favoriteApi } = await import('./common-CeIxTI3I.mjs').then((n) => n.b);
      if (isFavorited.value) {
        info('\u53D6\u6D88\u6536\u85CF\u8BF7\u524D\u5F80"\u6211\u7684\u6536\u85CF"\u9875\u9762');
      } else {
        const skuId = ((_a = matchedSku.value) == null ? void 0 : _a.id) ? String(matchedSku.value.id) : void 0;
        const res = await favoriteApi.addFavorite(String(goodsId.value), skuId);
        if (res.success) {
          isFavorited.value = true;
          useState("is-current-page-favorited").value = true;
          if (callback && event) {
            const target = event.target.closest(".favorite-btn") || event.target;
            callback(target, selectedSkuImage.value || goodsInfo.value.image);
          }
          success("\u6536\u85CF\u6210\u529F");
        } else {
          warning(res.msg || "\u6536\u85CF\u5931\u8D25");
        }
      }
    } finally {
      favoriteLoading.value = false;
    }
  };
  const initClientState = async () => {
    if (!shouldAutoFetch.value) {
      if (!goodsData.value || !goodsData.value.success) {
        await fetchGoodsData();
      }
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
    var _a, _b, _c;
    if (!((_a = goodsData.value) == null ? void 0 : _a.success)) return;
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
      stock.value = Number(((_c = (_b = goodsData.value) == null ? void 0 : _b.data) == null ? void 0 : _c.stock) || 0);
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

export { useProductDetail as u };
//# sourceMappingURL=useProductDetail-C-dWeqGo.mjs.map
