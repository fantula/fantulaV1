import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { defineComponent, defineAsyncComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, isRef, toDisplayString, openBlock, createBlock, computed, ref, toValue, getCurrentInstance, onServerPrefetch, watch, shallowRef, nextTick, toRef, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { b as arrow_left_default, aa as shopping_cart_default, U as star_default, ab as star_filled_default, i as info_filled_default, n as circle_check_default } from './index-DlETah8a.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { g as goodsApi } from './goods-DQk19w4f.mjs';
import { supabaseProductApi, supabaseFaqApi } from './supabase-fcLPkUp1.mjs';
import { u as useModalStore } from './modal-_wZ2Eah3.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
import { useCartStore } from './cart-C8TGo9ts.mjs';
import { debounce } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs';
import { _ as _export_sfc, a as useNuxtApp, I as asyncDataDefaults, G as useState, J as createError } from './server.mjs';
import { E as ElMessage } from './index-DSo6N35Z.mjs';
import { E as ElMessageBox } from './index-C_BEi-G8.mjs';
import { E as ElImage } from './index-BmjXUoge.mjs';
import { B as BaseButton } from './BaseButton-BlqmccK6.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './index-DrSf1xVr.mjs';
import './install-VBSKbHUK.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import './objects-Bz74KHmq.mjs';
import './request-n20yf-Kr.mjs';
import './supabase-jxF0-7J3.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/devalue/index.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/form-data/lib/form_data.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/proxy-from-env/index.js';
import 'node:http';
import 'node:https';
import 'node:http2';
import 'node:util';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/follow-redirects/index.js';
import 'node:zlib';
import 'node:stream';
import 'node:events';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import './common-DNRu9xdu.mjs';
import './typescript-D6L75muK.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';
import './index-K5TIzHX_.mjs';
import './event-D3FEo2C5.mjs';
import './index-Cfk6gFRD.mjs';
import './use-form-item-Bhmdieo-.mjs';
import './constants-hAKFmBbq.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@ctrl/tinycolor/dist/public_api.js';
import './index-DfZ5KWBt.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './index-Cy25Tved.mjs';
import './aria-Rs9hkxop.mjs';
import './index-CuQ4LNHg.mjs';
import './vnode-BKSxKQVt.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './validator-BaQl3RdN.mjs';
import './index-7KygWwCI.mjs';
import './scroll-BuMAfCNC.mjs';
import './raf-CQRaPAjg.mjs';

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
  const { data: goodsResponse, error: fetchError, pending } = await useAsyncData(
    `goods-detail-${goodsId.value}`,
    () => goodsApi.getGoodsDetail(goodsId.value),
    { lazy: true }
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
      "\u5B98\u65B9\u91C7\u8D2D\u30FB\u6B63\u54C1\u4FDD\u969C",
      "\u5168\u7A0B\u8D28\u4FDD\u30FB\u65E0\u5FE7\u552E\u540E",
      "\u6781\u901F\u54CD\u5E94\u30FB\u4EBA\u5DE5\u670D\u52A1",
      "\u5B89\u5168\u52A0\u5BC6\u30FB\u9690\u79C1\u4FDD\u62A4"
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
            _push2(`<div class="img-loading-placeholder" data-v-8db2d9d8${_scopeId}>\u52A0\u8F7D\u4E2D...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "\u52A0\u8F7D\u4E2D...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.images && __props.images.length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-8db2d9d8><!--[-->`);
        ssrRenderList(__props.images, (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: unref(currentImage) === img }])}" data-v-8db2d9d8><img${ssrRenderAttr("src", img)} alt="SKU\u56FE\u7247" data-v-8db2d9d8></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-8db2d9d8><div class="premium-service-title" data-v-8db2d9d8>\u670D\u52A1\u4FDD\u969C</div><div class="premium-service-grid" data-v-8db2d9d8><!--[-->`);
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
      onComplete == null ? void 0 : onComplete();
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
      onComplete == null ? void 0 : onComplete();
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
      onComplete == null ? void 0 : onComplete();
      return;
    }
    const targetEl = (void 0).getElementById(targetId);
    if (!targetEl) {
      console.warn(`Target element #${targetId} not found`);
      onComplete == null ? void 0 : onComplete();
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
      onComplete == null ? void 0 : onComplete();
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
    const FaqTicker = defineAsyncComponent(() => import('./FaqTicker-DaGTnB-Z.mjs'));
    const LoginRegisterModal = defineAsyncComponent(() => import('./LoginRegisterModal-yj-0Rq6I.mjs'));
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
      const { useCartStore: useCartStore2 } = await import('./cart-C8TGo9ts.mjs');
      const cartStore = useCartStore2();
      addToCart(() => {
        var _a;
        const btnEl = event.target;
        const target = btnEl.closest("button") || btnEl;
        startAnimation(target, ((_a = matchedSku.value) == null ? void 0 : _a.image) || goodsInfo.value.image, () => {
          cartStore.miniCartVisible = true;
          ElMessage.success("\u5DF2\u6210\u529F\u52A0\u5165\u8D2D\u7269\u8F66");
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
      var _a;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-927b3cee><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-927b3cee></div>`);
      if (unref(goodsError)) {
        _push(`<div class="api-warning-bar" data-v-927b3cee> \u26A0\uFE0F \u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38\uFF0C\u6B63\u5728\u9884\u89C8\u6F14\u793A\u6570\u636E </div>`);
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
              _push2(` \u8FD4\u56DE\u4E0A\u4E00\u9875 `);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" \u8FD4\u56DE\u4E0A\u4E00\u9875 ")
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
        _push(`<div class="goods-info-panel" data-v-927b3cee><div class="info-header" data-v-927b3cee><h1 class="product-name" data-v-927b3cee>${ssrInterpolate(unref(goodsInfo).name)}</h1><div class="product-sales-badge" data-v-927b3cee> \u7D2F\u8BA1\u9500\u91CF <span data-v-927b3cee>${ssrInterpolate(unref(goodsInfo).sales)}</span></div></div>`);
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
          _push(`<div class="no-sku-notice" data-v-927b3cee><div class="notice-emoji" data-v-927b3cee>\u{1F4E6}\u2728</div><h3 data-v-927b3cee>\u6211\u6B63\u5728\u7591\u72C2\u8865\u8D27\u4E2D\uFF01</h3><p data-v-927b3cee>\u5546\u54C1\u6B63\u5728\u51C6\u5907\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u6216\u8054\u7CFB\u5BA2\u670D\u4E86\u89E3\u66F4\u591A~</p></div>`);
        }
        if ((_a = unref(matchedSku)) == null ? void 0 : _a.intro) {
          _push(`<div class="sku-intro-section" data-v-927b3cee><span class="sku-intro-text" data-v-927b3cee>${ssrInterpolate(unref(matchedSku).intro)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="price-display-section compact-price-area" data-v-927b3cee>`);
        if (unref(hasSkus)) {
          _push(`<!--[--><div class="price-stock-row" data-v-927b3cee><div class="current-price-box" data-v-927b3cee><span class="p-amount" data-v-927b3cee>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="stock-info" data-v-927b3cee>`);
          if (unref(stockLoading)) {
            _push(`<span class="stock-badge loading" data-v-927b3cee>\u67E5\u8BE2\u4E2D...</span>`);
          } else if (unref(hasStock)) {
            _push(`<span class="stock-badge" data-v-927b3cee>\u5E93\u5B58: ${ssrInterpolate(unref(stock))}</span>`);
          } else {
            _push(`<span class="stock-badge out-of-stock" data-v-927b3cee>\u6682\u65F6\u7F3A\u8D27</span>`);
          }
          _push(`</div></div>`);
          if (unref(allowAddon) && unref(hasStock)) {
            _push(`<div class="qty-control" data-v-927b3cee><div class="q-actions" data-v-927b3cee><button${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-927b3cee>-</button><input type="number"${ssrRenderAttr("value", unref(qty))} min="1"${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-927b3cee><button${ssrIncludeBooleanAttr(!unref(hasStock) || unref(qty) >= unref(stock)) ? " disabled" : ""} data-v-927b3cee>+</button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<div class="no-price-notice" data-v-927b3cee><span class="out-of-stock-large" data-v-927b3cee>\u6682\u65F6\u7F3A\u8D27</span></div>`);
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
              _push2(`${ssrInterpolate(unref(stockLoading) ? "\u52A0\u8F7D\u4E2D..." : unref(hasSkus) && unref(hasStock) ? "\u7ACB\u5373\u6781\u901F\u8D2D\u4E70" : "\u6682\u65F6\u7F3A\u8D27")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(stockLoading) ? "\u52A0\u8F7D\u4E2D..." : unref(hasSkus) && unref(hasStock) ? "\u7ACB\u5373\u6781\u901F\u8D2D\u4E70" : "\u6682\u65F6\u7F3A\u8D27"), 1)
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
              _push2(` \u52A0\u5165\u8D2D\u7269\u8F66 `);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(shopping_cart_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" \u52A0\u5165\u8D2D\u7269\u8F66 ")
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
              _push2(` ${ssrInterpolate(unref(isFavorited) ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF")}`);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    !unref(isFavorited) ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
                  ]),
                  _: 1
                }),
                createTextVNode(" " + toDisplayString(unref(isFavorited) ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF"), 1)
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
        _push(` \u7248\u6743\u58F0\u660E\uFF1A\u672C\u7AD9\u5C55\u793A\u7684\u5FBD\u6807\u3001\u5546\u6807\u53CA\u76F8\u5173\u6807\u5FD7\u5F52\u5404\u6743\u5229\u4EBA\u6240\u6709\u3002 </div></div></div></div><div class="product-detail-rich" data-v-927b3cee><div class="detail-divider" data-v-927b3cee><span data-v-927b3cee>\u5546\u54C1\u8BE6\u60C5\u4ECB\u7ECD</span></div><div class="detail-content-wrap" data-v-927b3cee><!--[-->`);
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

export { _id_ as default };
//# sourceMappingURL=_id_-BVe6h7NB.mjs.map
