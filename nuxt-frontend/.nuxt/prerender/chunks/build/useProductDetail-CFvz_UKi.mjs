import { computed, ref, toValue, getCurrentInstance, onServerPrefetch, shallowRef, nextTick, unref, toRef } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { useRoute, useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { g as goodsApi } from './goods-DQk19w4f.mjs';
import { supabaseProductApi, supabaseFaqApi } from './supabase-fcLPkUp1.mjs';
import { u as useModalStore } from './modal-HUsR3oCs.mjs';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { u as useCartStore } from './cart-D8FaBhjU.mjs';
import { debounce } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs';
import { a as useNuxtApp, G as asyncDataDefaults, I as useState, H as createError } from './server.mjs';
import { E as ElMessage } from './index-CJUZrfXE.mjs';
import { E as ElMessageBox } from './index-Daa9EAVW.mjs';

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  (_a = options.server) != null ? _a : options.server = true;
  (_b = options.default) != null ? _b : options.default = getDefault;
  (_c = options.getCachedData) != null ? _c : options.getCachedData = getDefaultCachedData;
  (_d = options.lazy) != null ? _d : options.lazy = false;
  (_e = options.immediate) != null ? _e : options.immediate = true;
  (_f = options.deep) != null ? _f : options.deep = asyncDataDefaults.deep;
  (_g = options.dedupe) != null ? _g : options.dedupe = "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    var _a2;
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.data;
    }),
    pending: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.pending;
    }),
    status: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.status;
    }),
    error: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.error;
    }),
    refresh: (...args2) => {
      var _a2;
      if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry == null ? void 0 : entry._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      var _a;
      return (_a = getter()) == null ? void 0 : _a.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  var _a, _b, _c;
  (_b = (_a = nuxtApp.payload._errors)[key]) != null ? _b : _a[key] = asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = !((_c = nuxtApp.ssrContext) == null ? void 0 : _c["~sharedPrerenderCache"]) ? _handler : (nuxtApp2, options2) => {
    const value = nuxtApp2.ssrContext["~sharedPrerenderCache"].get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp2.runWithContext(() => _handler(nuxtApp2, options2)));
    nuxtApp2.ssrContext["~sharedPrerenderCache"].set(key, promise);
    return promise;
  };
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      var _a2, _b2;
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer((_a2 = opts.dedupe) != null ? _a2 : options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: (_b2 = opts.cause) != null ? _b2 : "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          var _a3, _b3;
          try {
            const timeout = (_a3 = opts.timeout) != null ? _a3 : options.timeout;
            const mergedSignal = mergeAbortSignals([(_b3 = asyncData._abortController) == null ? void 0 : _b3.signal, opts == null ? void 0 : opts.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        var _a3;
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if ((_a3 = asyncData._abortController) == null ? void 0 : _a3.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        {
          asyncData.pending.value = false;
        }
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      var _a2;
      unsubRefreshAsyncData();
      if ((_a2 = nuxtApp._asyncData[key]) == null ? void 0 : _a2._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          var _a3;
          if (!((_a3 = nuxtApp._asyncData[key]) == null ? void 0 : _a3._init)) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  var _a, _b, _c;
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = (_a = AbortSignal.timeout) == null ? void 0 : _a.call(AbortSignal, timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = (_b = sig.reason) != null ? _b : new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    var _a2;
    const abortedSignal = list.find((s) => s.aborted);
    const reason = (_a2 = abortedSignal == null ? void 0 : abortedSignal.reason) != null ? _a2 : new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    (_c = sig.addEventListener) == null ? void 0 : _c.call(sig, "abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const useProductDetail = async () => {
  const route = useRoute();
  const router = useRouter();
  const modal = useModalStore();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const goodsId = computed(() => {
    const id = route.params.id;
    return Array.isArray(id) ? id[0] : id;
  });
  const { data: goodsResponse, error: fetchError } = await useAsyncData(
    `goods-detail-${goodsId.value}`,
    () => goodsApi.getGoodsDetail(goodsId.value)
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
    if (backendGroups && backendGroups.length > 0) {
      return backendGroups;
    }
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
    return ((_a = matchedSku.value) == null ? void 0 : _a.price) || goodsInfo.value.price || 35;
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
    return num.toFixed(2);
  };
  const checkSkuAvailability = async (skuId) => {
    if (!skuId) {
      skuAvailable.value = false;
      stock.value = 0;
      stockLoading.value = false;
      return;
    }
    stockLoading.value = true;
    try {
      const result = await supabaseProductApi.checkSkuAvailability(skuId);
      skuAvailable.value = result.available;
      stock.value = result.availableCount;
    } catch (e) {
      console.error("\u68C0\u67E5 SKU \u53EF\u8D2D\u4E70\u6027\u5931\u8D25:", e);
      skuAvailable.value = false;
      stock.value = 0;
    } finally {
      stockLoading.value = false;
    }
  };
  const handleSpecSelect = async (group, val) => {
    selectedSpecs.value[group] = val;
    if (matchedSku.value) {
      if (matchedSku.value.image) {
        selectedSkuImage.value = matchedSku.value.image;
      }
      await checkSkuAvailability(matchedSku.value.id);
    }
  };
  const fetchBoundFaqs = async () => {
    try {
      let finalFaqs = [];
      const res = await supabaseFaqApi.getFaqsByProduct(goodsId.value);
      if (res.success && res.faqs.length > 0) {
        finalFaqs = [...res.faqs];
      }
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
    const { favoriteApi } = await import('./common-DNRu9xdu.mjs');
    const res = await favoriteApi.checkFavorite(String(goodsId.value), (_a = matchedSku.value) == null ? void 0 : _a.id);
    isFavorited.value = res.data || false;
    const globalFavState = useState("is-current-page-favorited", () => false);
    globalFavState.value = isFavorited.value;
  };
  const buyNow = async () => {
    if (!userStore.isLoggedIn) {
      modal.showLogin = true;
      return;
    }
    if (!hasStock.value) {
      ElMessage.warning("\u5546\u54C1\u6682\u65F6\u7F3A\u8D27");
      return;
    }
    if (!matchedSku.value) {
      ElMessage.warning("\u8BF7\u9009\u62E9\u5546\u54C1\u89C4\u683C");
      return;
    }
    if (submitting.value) return;
    submitting.value = true;
    try {
      const { supabasePreOrderApi } = await import('./supabase-fcLPkUp1.mjs');
      const result = await supabasePreOrderApi.createPreOrder(
        matchedSku.value.id,
        qty.value,
        "buy_now"
      );
      if (!result.success) {
        if (result.code === "DUPLICATE_ORDER") {
          try {
            await ElMessageBox.confirm(
              "\u60A8\u5DF2\u7ECF\u4E0B\u8FC7\u8BE5\u5546\u54C1\u7684\u8BA2\u5355\u4E86\uFF0C\u5FEB\u53BB\u770B\u770B\u5427",
              "\u91CD\u590D\u4E0B\u5355\u63D0\u793A",
              {
                confirmButtonText: "\u53BB\u67E5\u770B",
                cancelButtonText: "\u53D6\u6D88",
                type: "warning",
                distinguishCancelAndClose: true
              }
            );
            router.push("/profile/orders?tab=\u5F85\u652F\u4ED8");
            return;
          } catch (action) {
            return;
          }
        }
        if (result.code === "LIMIT_EXCEEDED") {
          try {
            await ElMessageBox.confirm(
              "\u60A8\u7684\u672A\u652F\u4ED8\u8BA2\u5355\u592A\u591A\u4E86\uFF0C\u8BF7\u5148\u5904\u7406\u4E00\u4E0B\u5427",
              "\u8BA2\u5355\u6570\u91CF\u8D85\u9650",
              {
                confirmButtonText: "\u53BB\u67E5\u770B",
                cancelButtonText: "\u53D6\u6D88",
                type: "warning",
                distinguishCancelAndClose: true
              }
            );
            router.push("/profile/orders?tab=\u5F85\u652F\u4ED8");
            return;
          } catch (action) {
            return;
          }
        }
        ElMessage.error(result.error || "\u521B\u5EFA\u9884\u8BA2\u5355\u5931\u8D25");
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
    if (!userStore.isLoggedIn) {
      modal.showLogin = true;
      return;
    }
    if (!hasStock.value) {
      ElMessage.warning("\u5546\u54C1\u6682\u65F6\u7F3A\u8D27");
      return;
    }
    if (!matchedSku.value) {
      ElMessage.warning("\u8BF7\u9009\u62E9\u5546\u54C1\u89C4\u683C");
      return;
    }
    if (submitting.value) return;
    submitting.value = true;
    try {
      const result = await cartStore.addToCart(matchedSku.value.id, qty.value);
      if (result.success) {
        if (callback) callback();
        else {
          cartStore.miniCartVisible = true;
          ElMessage.success("\u5DF2\u6210\u529F\u52A0\u5165\u8D2D\u7269\u8F66");
        }
      } else {
        if (result.code === "DIFFERENT_SKU") {
          ElMessage.warning(result.msg || "\u6682\u65F6\u4E0D\u652F\u6301\u540C\u65F6\u8D2D\u4E70\u4E0D\u540C\u5546\u54C1");
        } else {
          ElMessage.error(result.msg || "\u52A0\u5165\u8D2D\u7269\u8F66\u5931\u8D25");
        }
      }
    } catch (e) {
      ElMessage.error("\u52A0\u5165\u8D2D\u7269\u8F66\u5931\u8D25");
    } finally {
      submitting.value = false;
    }
  };
  const toggleFavorite = async (event, callback) => {
    var _a;
    if (!userStore.isLoggedIn) {
      modal.showLogin = true;
      return;
    }
    if (favoriteLoading.value) return;
    favoriteLoading.value = true;
    try {
      const { favoriteApi } = await import('./common-DNRu9xdu.mjs');
      if (isFavorited.value) {
        ElMessage.info('\u53D6\u6D88\u6536\u85CF\u8BF7\u524D\u5F80"\u6211\u7684\u6536\u85CF"\u9875\u9762');
      } else {
        const res = await favoriteApi.addFavorite(String(goodsId.value), (_a = matchedSku.value) == null ? void 0 : _a.id);
        if (res.success) {
          isFavorited.value = true;
          useState("is-current-page-favorited").value = true;
          if (callback && event) {
            const btnEl = event.target;
            const targetBtn = btnEl.closest(".favorite-btn") || btnEl;
            const imageToFly = selectedSkuImage.value || goodsInfo.value.image;
            callback(targetBtn, imageToFly);
          }
          ElMessage.success("\u6536\u85CF\u6210\u529F");
        } else {
          ElMessage.warning(res.msg || "\u6536\u85CF\u5931\u8D25");
        }
      }
    } finally {
      favoriteLoading.value = false;
    }
  };
  const initClientState = async () => {
    var _a;
    if (!((_a = goodsData.value) == null ? void 0 : _a.success)) return;
    if (specGroups.value && specGroups.value.length > 0) {
      specGroups.value.forEach((g) => {
        if (!selectedSpecs.value[g.name]) {
          selectedSpecs.value[g.name] = g.values[0];
        }
      });
    }
    if (matchedSku.value) {
      if (matchedSku.value.image) {
        selectedSkuImage.value = matchedSku.value.image;
      }
      await checkSkuAvailability(matchedSku.value.id);
    } else if (skus.value.length > 0 && skus.value[0].id) {
      await checkSkuAvailability(skus.value[0].id);
    }
    fetchBoundFaqs();
    checkFavoriteStatus();
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
    modal
    // Export store for template access if needed
  };
};

export { useProductDetail as u };
//# sourceMappingURL=useProductDetail-CFvz_UKi.mjs.map
