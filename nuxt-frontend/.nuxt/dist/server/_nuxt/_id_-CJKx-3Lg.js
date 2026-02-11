import { E as ElIcon } from "./index-jl2vZbkg.js";
/* empty css              */
/* empty css                    */
import { computed, toValue, getCurrentInstance, onServerPrefetch, ref, shallowRef, nextTick, unref, toRef, watch, defineComponent, mergeProps, withCtx, createVNode, useSSRContext, defineAsyncComponent, withAsyncContext, createTextVNode, isRef, toDisplayString, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { a as circle_check_default, g as arrow_left_default, aa as shopping_cart_default, U as star_default, ab as star_filled_default, i as info_filled_default } from "./index-DlETah8a.js";
import { useRoute, useRouter } from "vue-router";
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { g as goodsApi } from "./goods-DQk19w4f.js";
import { supabaseProductApi, supabaseFaqApi } from "./supabase-fcLPkUp1.js";
import { u as useModalStore } from "./modal-_wZ2Eah3.js";
import { u as useUserStore } from "./user-Cnuc6I82.js";
import { useCartStore } from "./cart-C8TGo9ts.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { debounce } from "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
import { a as useNuxtApp, I as asyncDataDefaults, J as createError, G as useState, _ as _export_sfc } from "../server.mjs";
import { E as ElMessage } from "./index-DSo6N35Z.js";
import { E as ElMessageBox } from "./index-C_BEi-G8.js";
import { E as ElImage } from "./index-BmjXUoge.js";
/* empty css                         */
import { B as BaseButton } from "./BaseButton-BlqmccK6.js";
import { E as ElSkeleton, a as ElSkeletonItem } from "./index-DrSf1xVr.js";
/* empty css                     */
/* empty css                          */
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./request-n20yf-Kr.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "form-data";
import "crypto";
import "url";
import "proxy-from-env";
import "http";
import "https";
import "http2";
import "util";
import "follow-redirects";
import "zlib";
import "stream";
import "events";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./common-DNRu9xdu.js";
import "./typescript-D6L75muK.js";
import "./icon-CK7WLSPl.js";
import "./use-global-config-79yNXOXL.js";
import "./index-K5TIzHX_.js";
import "./event-D3FEo2C5.js";
import "./index-Cfk6gFRD.js";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-DfZ5KWBt.js";
import "./event-BZTOGHfp.js";
import "./index-DqrhOzxH.js";
import "./index-Cy25Tved.js";
import "./aria-Rs9hkxop.js";
import "./index-CuQ4LNHg.js";
import "./vnode-BKSxKQVt.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./validator-BaQl3RdN.js";
import "./index-7KygWwCI.js";
import "./scroll-BuMAfCNC.js";
import "./raf-CQRaPAjg.js";
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
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
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
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
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry?._abortController) {
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
      return getter()?.value;
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
  nuxtApp.payload._errors[key] ??= asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = !import.meta.prerender || !nuxtApp.ssrContext?.["~sharedPrerenderCache"] ? _handler : (nuxtApp2, options2) => {
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
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer(opts.dedupe ?? options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
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
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
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
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
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
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
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
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
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
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
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
  const { data: goodsResponse, error: fetchError, pending } = await useAsyncData(
    `goods-detail-${goodsId.value}`,
    () => goodsApi.getGoodsDetail(goodsId.value),
    { lazy: true }
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
    return matchedSku.value?.price || goodsInfo.value.price || 35;
  });
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
  const allowAddon = computed(() => {
    return goodsData.value?.data?.allow_addon === true;
  });
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
      console.error("检查 SKU 可购买性失败:", e);
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
    if (!userStore.isLoggedIn || !goodsId.value) return;
    const { favoriteApi } = await import("./common-DNRu9xdu.js");
    const res = await favoriteApi.checkFavorite(String(goodsId.value), matchedSku.value?.id);
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
      ElMessage.warning("商品暂时缺货");
      return;
    }
    if (!matchedSku.value) {
      ElMessage.warning("请选择商品规格");
      return;
    }
    if (submitting.value) return;
    submitting.value = true;
    try {
      const { supabasePreOrderApi } = await import("./supabase-fcLPkUp1.js");
      const result = await supabasePreOrderApi.createPreOrder(
        matchedSku.value.id,
        qty.value,
        "buy_now"
      );
      if (!result.success) {
        if (result.code === "DUPLICATE_ORDER") {
          try {
            await ElMessageBox.confirm(
              "您已经下过该商品的订单了，快去看看吧",
              "重复下单提示",
              {
                confirmButtonText: "去查看",
                cancelButtonText: "取消",
                type: "warning",
                distinguishCancelAndClose: true
              }
            );
            router.push("/profile/orders?tab=待支付");
            return;
          } catch (action) {
            return;
          }
        }
        if (result.code === "LIMIT_EXCEEDED") {
          try {
            await ElMessageBox.confirm(
              "您的未支付订单太多了，请先处理一下吧",
              "订单数量超限",
              {
                confirmButtonText: "去查看",
                cancelButtonText: "取消",
                type: "warning",
                distinguishCancelAndClose: true
              }
            );
            router.push("/profile/orders?tab=待支付");
            return;
          } catch (action) {
            return;
          }
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
    if (!userStore.isLoggedIn) {
      modal.showLogin = true;
      return;
    }
    if (!hasStock.value) {
      ElMessage.warning("商品暂时缺货");
      return;
    }
    if (!matchedSku.value) {
      ElMessage.warning("请选择商品规格");
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
          ElMessage.success("已成功加入购物车");
        }
      } else {
        if (result.code === "DIFFERENT_SKU") {
          ElMessage.warning(result.msg || "暂时不支持同时购买不同商品");
        } else {
          ElMessage.error(result.msg || "加入购物车失败");
        }
      }
    } catch (e) {
      ElMessage.error("加入购物车失败");
    } finally {
      submitting.value = false;
    }
  };
  const toggleFavorite = async (event, callback) => {
    if (!userStore.isLoggedIn) {
      modal.showLogin = true;
      return;
    }
    if (favoriteLoading.value) return;
    favoriteLoading.value = true;
    try {
      const { favoriteApi } = await import("./common-DNRu9xdu.js");
      if (isFavorited.value) {
        ElMessage.info('取消收藏请前往"我的收藏"页面');
      } else {
        const res = await favoriteApi.addFavorite(String(goodsId.value), matchedSku.value?.id);
        if (res.success) {
          isFavorited.value = true;
          useState("is-current-page-favorited").value = true;
          if (callback && event) {
            const btnEl = event.target;
            const targetBtn = btnEl.closest(".favorite-btn") || btnEl;
            const imageToFly = selectedSkuImage.value || goodsInfo.value.image;
            callback(targetBtn, imageToFly);
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
    if (pending.value) {
      const unwatch = watch(pending, (val) => {
        if (!val) {
          _initConfig();
          unwatch();
        }
      });
      return;
    }
    _initConfig();
  };
  const _initConfig = async () => {
    if (!goodsData.value?.success) return;
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
    await Promise.all([
      fetchBoundFaqs(),
      checkFavoriteStatus()
    ]);
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
    // Export pending status
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductGallery",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    defaultImage: {},
    images: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const currentImage = computed(() => props.modelValue);
    const serviceTags = [
      "官方采购・正品保障",
      "全程质保・无忧售后",
      "极速响应・人工服务",
      "安全加密・隐私保护"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-left-panel" }, _attrs))} data-v-8db2d9d8><div class="main-image-wrapper" data-v-8db2d9d8><div class="main-image" data-v-8db2d9d8>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: unref(currentImage) || __props.defaultImage,
        fit: "contain",
        class: "sku-big-img"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-loading-placeholder" data-v-8db2d9d8${_scopeId}>加载中...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "加载中...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.images && __props.images.length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-8db2d9d8><!--[-->`);
        ssrRenderList(__props.images, (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: unref(currentImage) === img }])}" data-v-8db2d9d8><img${ssrRenderAttr("src", img)} alt="SKU图片" data-v-8db2d9d8></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-8db2d9d8><div class="premium-service-title" data-v-8db2d9d8>服务保障</div><div class="premium-service-grid" data-v-8db2d9d8><!--[-->`);
      ssrRenderList(serviceTags, (tag) => {
        _push(`<div class="p-service-item" data-v-8db2d9d8>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "p-icon" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(circle_check_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(circle_check_default))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<span data-v-8db2d9d8>${ssrInterpolate(tag)}</span></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/goods/ProductGallery.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProductGallery = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8db2d9d8"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_skeleton = ElSkeleton;
  const _component_el_skeleton_item = ElSkeletonItem;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-detail-skeleton" }, _attrs))} data-v-7483f82e><div class="skeleton-content" data-v-7483f82e><div class="skeleton-left" data-v-7483f82e>`);
  _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
    template: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-main-img"
        }, null, _parent2, _scopeId));
        _push2(`<div class="skeleton-thumbs" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="skeleton-service" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "100%", "height": "80px" }
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_el_skeleton_item, {
            variant: "image",
            class: "skeleton-main-img"
          }),
          createVNode("div", { class: "skeleton-thumbs" }, [
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            })
          ]),
          createVNode("div", { class: "skeleton-service" }, [
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "100%", "height": "80px" }
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="skeleton-right" data-v-7483f82e>`);
  _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
    template: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "h1",
          style: { "width": "80%", "height": "32px", "margin-bottom": "16px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "120px", "height": "24px", "margin-bottom": "24px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "rect",
          style: { "width": "100%", "height": "40px", "margin-bottom": "30px", "border-radius": "20px" }
        }, null, _parent2, _scopeId));
        _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "60px", "margin-bottom": "10px" }
        }, null, _parent2, _scopeId));
        _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "80px", "height": "36px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "80px", "height": "36px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "80px", "height": "36px" }
        }, null, _parent2, _scopeId));
        _push2(`</div></div><div style="${ssrRenderStyle({ "margin-bottom": "30px", "display": "flex", "align-items": "baseline", "gap": "10px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "h3",
          style: { "width": "150px", "height": "40px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "80px" }
        }, null, _parent2, _scopeId));
        _push2(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px", "height": "52px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "flex": "1", "height": "100%" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "140px", "height": "100%" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "100px", "height": "100%" }
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_el_skeleton_item, {
            variant: "h1",
            style: { "width": "80%", "height": "32px", "margin-bottom": "16px" }
          }),
          createVNode(_component_el_skeleton_item, {
            variant: "text",
            style: { "width": "120px", "height": "24px", "margin-bottom": "24px" }
          }),
          createVNode(_component_el_skeleton_item, {
            variant: "rect",
            style: { "width": "100%", "height": "40px", "margin-bottom": "30px", "border-radius": "20px" }
          }),
          createVNode("div", { style: { "margin-bottom": "30px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "60px", "margin-bottom": "10px" }
            }),
            createVNode("div", { style: { "display": "flex", "gap": "10px" } }, [
              createVNode(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "80px", "height": "36px" }
              }),
              createVNode(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "80px", "height": "36px" }
              }),
              createVNode(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "80px", "height": "36px" }
              })
            ])
          ]),
          createVNode("div", { style: { "margin-bottom": "30px", "display": "flex", "align-items": "baseline", "gap": "10px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "h3",
              style: { "width": "150px", "height": "40px" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "80px" }
            })
          ]),
          createVNode("div", { style: { "display": "flex", "gap": "10px", "height": "52px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "button",
              style: { "flex": "1", "height": "100%" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "button",
              style: { "width": "140px", "height": "100%" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "button",
              style: { "width": "100px", "height": "100%" }
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/goods/ProductDetailSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductDetailSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7483f82e"]]);
const useCartAnimation = () => {
  const startAnimation = (startEl, imageSrc, onComplete) => {
    const targetEl = (void 0).getElementById("cart-icon-ref");
    if (!targetEl) {
      console.warn("Cart icon target not found");
      onComplete?.();
      return;
    }
    const startRect = startEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const flyer = (void 0).createElement("img");
    flyer.src = imageSrc;
    flyer.style.position = "fixed";
    flyer.style.zIndex = "9999";
    flyer.style.width = "50px";
    flyer.style.height = "50px";
    flyer.style.objectFit = "cover";
    flyer.style.borderRadius = "50%";
    flyer.style.transition = "all 0.8s cubic-bezier(0.2, -0.3, 0.1, 1.2)";
    flyer.style.left = `${startRect.left + startRect.width / 2 - 25}px`;
    flyer.style.top = `${startRect.top + startRect.height / 2 - 25}px`;
    flyer.style.opacity = "0.8";
    flyer.style.pointerEvents = "none";
    (void 0).body.appendChild(flyer);
    flyer.offsetHeight;
    requestAnimationFrame(() => {
      flyer.style.left = `${targetRect.left + targetRect.width / 2 - 10}px`;
      flyer.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`;
      flyer.style.width = "20px";
      flyer.style.height = "20px";
      flyer.style.opacity = "0.5";
    });
    setTimeout(() => {
      if ((void 0).body.contains(flyer)) {
        (void 0).body.removeChild(flyer);
      }
      onComplete?.();
    }, 800);
  };
  return {
    startAnimation
  };
};
const useFlyingAnimation = () => {
  const startAnimation = (startEl, imageSrc, targetId, onComplete) => {
    if (!startEl) {
      console.warn("Start element is null");
      onComplete?.();
      return;
    }
    const targetEl = (void 0).getElementById(targetId);
    if (!targetEl) {
      console.warn(`Target element #${targetId} not found`);
      onComplete?.();
      return;
    }
    const startRect = startEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const flyer = (void 0).createElement("img");
    flyer.src = imageSrc;
    flyer.style.position = "fixed";
    flyer.style.zIndex = "9999";
    flyer.style.width = "50px";
    flyer.style.height = "50px";
    flyer.style.objectFit = "cover";
    flyer.style.borderRadius = "50%";
    flyer.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.5)";
    flyer.style.transition = "all 0.8s cubic-bezier(0.2, -0.3, 0.1, 1.2)";
    flyer.style.left = `${startRect.left + startRect.width / 2 - 25}px`;
    flyer.style.top = `${startRect.top + startRect.height / 2 - 25}px`;
    flyer.style.opacity = "0.9";
    flyer.style.pointerEvents = "none";
    (void 0).body.appendChild(flyer);
    flyer.offsetHeight;
    requestAnimationFrame(() => {
      flyer.style.left = `${targetRect.left + targetRect.width / 2 - 10}px`;
      flyer.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`;
      flyer.style.width = "20px";
      flyer.style.height = "20px";
      flyer.style.opacity = "0";
    });
    setTimeout(() => {
      targetEl.style.transform = "scale(1.2)";
      setTimeout(() => {
        targetEl.style.transform = "scale(1)";
      }, 200);
    }, 600);
    setTimeout(() => {
      if ((void 0).body.contains(flyer)) {
        (void 0).body.removeChild(flyer);
      }
      onComplete?.();
    }, 800);
  };
  return {
    startAnimation
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const FaqTicker = defineAsyncComponent(() => import("./FaqTicker-DaGTnB-Z.js"));
    const LoginRegisterModal = defineAsyncComponent(() => import("./LoginRegisterModal-Bk5ohhhl.js"));
    const router = useRouter();
    const {
      goodsId,
      goodsData,
      goodsError,
      goodsInfo,
      qty,
      stock,
      submitting,
      selectedSpecs,
      selectedSkuImage,
      stockLoading,
      hasStock,
      hasSkus,
      specGroups,
      matchedSku,
      currentPrice,
      skuImages,
      detailModules,
      allowAddon,
      faqs,
      pending,
      // Use pending
      formatPrice,
      handleSpecSelect,
      buyNow,
      addToCart,
      isFavorited,
      toggleFavorite,
      initClientState,
      modal
    } = ([__temp, __restore] = withAsyncContext(() => useProductDetail()), __temp = await __temp, __restore(), __temp);
    const { startAnimation } = useCartAnimation();
    const { startAnimation: startFavAnimation } = useFlyingAnimation();
    const goToFaq = (faq) => {
      if (faq.id) {
        router.push(`/faq?q=${faq.id}`);
      } else {
        router.push("/faq");
      }
    };
    const goBack = () => router.back();
    const handleAddToCartWrapper = async (event) => {
      const { useCartStore: useCartStore2 } = await import("./cart-C8TGo9ts.js");
      const cartStore = useCartStore2();
      addToCart(() => {
        const btnEl = event.target;
        const target = btnEl.closest("button") || btnEl;
        startAnimation(target, matchedSku.value?.image || goodsInfo.value.image, () => {
          cartStore.miniCartVisible = true;
          ElMessage.success("已成功加入购物车");
        });
      });
    };
    const handleToggleFavorite = (event) => {
      toggleFavorite(event, (target, image) => {
        startFavAnimation(target, image, "favorites-icon-ref", () => {
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-927b3cee><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-927b3cee></div>`);
      if (unref(goodsError)) {
        _push(`<div class="api-warning-bar" data-v-927b3cee> ⚠️ 网络连接异常，正在预览演示数据 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-content" data-v-927b3cee>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(ProductDetailSkeleton, null, null, _parent));
      } else {
        _push(`<div class="goods-content-inner" data-v-927b3cee><div class="back-btn-row" data-v-927b3cee>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "secondary",
          onClick: goBack
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(arrow_left_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(arrow_left_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 返回上一页 `);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 返回上一页 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="goods-detail-content" data-v-927b3cee><div class="goods-main-section" data-v-927b3cee>`);
        _push(ssrRenderComponent(ProductGallery, {
          modelValue: unref(selectedSkuImage),
          "onUpdate:modelValue": ($event) => isRef(selectedSkuImage) ? selectedSkuImage.value = $event : null,
          "default-image": unref(goodsInfo).image,
          images: unref(skuImages)
        }, null, _parent));
        _push(`<div class="goods-info-panel" data-v-927b3cee><div class="info-header" data-v-927b3cee><h1 class="product-name" data-v-927b3cee>${ssrInterpolate(unref(goodsInfo).name)}</h1><div class="product-sales-badge" data-v-927b3cee> 累计销量 <span data-v-927b3cee>${ssrInterpolate(unref(goodsInfo).sales)}</span></div></div>`);
        _push(ssrRenderComponent(unref(FaqTicker), {
          faqs: unref(faqs),
          onClick: ($event) => goToFaq({})
        }, null, _parent));
        if (unref(hasSkus)) {
          _push(`<div class="spec-selection-area" data-v-927b3cee><!--[-->`);
          ssrRenderList(unref(specGroups), (specGroup) => {
            _push(`<div class="spec-group" data-v-927b3cee><div class="spec-label" data-v-927b3cee>${ssrInterpolate(specGroup.name)}</div><div class="spec-values" data-v-927b3cee><!--[-->`);
            ssrRenderList(specGroup.values, (val) => {
              _push(`<div class="${ssrRenderClass(["spec-val-btn", { active: unref(selectedSpecs)[specGroup.name] === val }])}" data-v-927b3cee>${ssrInterpolate(val)}</div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-sku-notice" data-v-927b3cee><div class="notice-emoji" data-v-927b3cee>📦✨</div><h3 data-v-927b3cee>我正在疑狂补货中！</h3><p data-v-927b3cee>商品正在准备中，请稍后再来或联系客服了解更多~</p></div>`);
        }
        if (unref(matchedSku)?.intro) {
          _push(`<div class="sku-intro-section" data-v-927b3cee><span class="sku-intro-text" data-v-927b3cee>${ssrInterpolate(unref(matchedSku).intro)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="price-display-section compact-price-area" data-v-927b3cee>`);
        if (unref(hasSkus)) {
          _push(`<!--[--><div class="price-stock-row" data-v-927b3cee><div class="current-price-box" data-v-927b3cee><span class="p-amount" data-v-927b3cee>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="stock-info" data-v-927b3cee>`);
          if (unref(stockLoading)) {
            _push(`<span class="stock-badge loading" data-v-927b3cee>查询中...</span>`);
          } else if (unref(hasStock)) {
            _push(`<span class="stock-badge" data-v-927b3cee>库存: ${ssrInterpolate(unref(stock))}</span>`);
          } else {
            _push(`<span class="stock-badge out-of-stock" data-v-927b3cee>暂时缺货</span>`);
          }
          _push(`</div></div>`);
          if (unref(allowAddon) && unref(hasStock)) {
            _push(`<div class="qty-control" data-v-927b3cee><div class="q-actions" data-v-927b3cee><button${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-927b3cee>-</button><input type="number"${ssrRenderAttr("value", unref(qty))} min="1"${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-927b3cee><button${ssrIncludeBooleanAttr(!unref(hasStock) || unref(qty) >= unref(stock)) ? " disabled" : ""} data-v-927b3cee>+</button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<div class="no-price-notice" data-v-927b3cee><span class="out-of-stock-large" data-v-927b3cee>暂时缺货</span></div>`);
        }
        _push(`</div><div class="main-actions" data-v-927b3cee>`);
        _push(ssrRenderComponent(BaseButton, {
          "theme-id": "marketing-buy",
          class: "flex-1",
          disabled: unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting),
          loading: unref(submitting),
          onClick: unref(buyNow)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(stockLoading) ? "加载中..." : unref(hasSkus) && unref(hasStock) ? "立即极速购买" : "暂时缺货")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(stockLoading) ? "加载中..." : unref(hasSkus) && unref(hasStock) ? "立即极速购买" : "暂时缺货"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="secondary-btns" data-v-927b3cee>`);
        _push(ssrRenderComponent(BaseButton, {
          "theme-id": "secondary",
          onClick: ($event) => handleAddToCartWrapper($event),
          disabled: unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(shopping_cart_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(shopping_cart_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 加入购物车 `);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(shopping_cart_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 加入购物车 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(BaseButton, {
          "theme-id": "secondary",
          class: { favorited: unref(isFavorited) },
          onClick: ($event) => handleToggleFavorite($event),
          disabled: unref(stockLoading) || !unref(hasStock) || !unref(hasSkus)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(isFavorited)) {
                      _push3(ssrRenderComponent(unref(star_default), null, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(star_filled_default), null, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      !unref(isFavorited) ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(isFavorited) ? "已收藏" : "收藏")}`);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    !unref(isFavorited) ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
                  ]),
                  _: 1
                }),
                createTextVNode(" " + toDisplayString(unref(isFavorited) ? "已收藏" : "收藏"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="safe-disclaimer" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-927b3cee>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(info_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(info_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` 版权声明：本站展示的徽标、商标及相关标志归各权利人所有。 </div></div></div></div><div class="product-detail-rich" data-v-927b3cee><div class="detail-divider" data-v-927b3cee><span data-v-927b3cee>商品详情介绍</span></div><div class="detail-content-wrap" data-v-927b3cee><!--[-->`);
        ssrRenderList(unref(detailModules), (mod, idx) => {
          _push(`<div class="detail-module" data-v-927b3cee>`);
          if (mod.type === "text") {
            _push(`<div class="detail-text-box" data-v-927b3cee>${ssrInterpolate(mod.content)}</div>`);
          } else if (mod.type === "image") {
            _push(`<img${ssrRenderAttr("src", mod.content)} class="detail-full-img" loading="lazy" decoding="async" data-v-927b3cee>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(LoginRegisterModal), {
        visible: unref(modal).showLogin,
        onClose: ($event) => unref(modal).closeLogin()
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/goods/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-927b3cee"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CJKx-3Lg.js.map
