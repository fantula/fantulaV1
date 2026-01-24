import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { _ as _export_sfc, u as useModalStore, d as useUserStore, e as useCartStore, j as useRuntimeConfig, E as ElIcon, am as circle_check_default, aO as right_default, aQ as shopping_cart_default, a8 as star_default, b1 as star_filled_default, a3 as info_filled_default, c as __nuxt_component_2$1, bd as useNuxtApp, be as asyncDataDefaults, bf as createError } from './server.mjs';
import { defineComponent, computed, withAsyncContext, ref, mergeProps, withCtx, createVNode, unref, createBlock, openBlock, toValue, getCurrentInstance, onServerPrefetch, shallowRef, toRef, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { g as goodsApi } from './goods-BnwZn77-.mjs';
import { debounce } from 'perfect-debounce';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import '@vueuse/core';
import 'lodash-unified';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-ClPmkyX9.mjs';
import '@vue/shared';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@supabase/supabase-js';
import 'form-data';
import 'crypto';
import 'url';
import 'proxy-from-env';
import 'http';
import 'https';
import 'http2';
import 'util';
import 'follow-redirects';
import 'zlib';
import 'stream';
import 'events';

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
  var _a, _b;
  (_b = (_a = nuxtApp.payload._errors)[key]) != null ? _b : _a[key] = asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const config = useRuntimeConfig();
    const modal = useModalStore();
    useUserStore();
    useCartStore();
    const goodsId = computed(() => {
      const id = route.params.id;
      return Array.isArray(id) ? id[0] : id;
    });
    const { data: goodsResponse, error: fetchError } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `goods-detail-${goodsId.value}`,
      () => goodsApi.getGoodsDetail(goodsId.value)
    )), __temp = await __temp, __restore(), __temp);
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
    useHead({
      title: computed(() => `${goodsSeo.value.title} - \u51E1\u56FE\u62C9`),
      meta: [
        { name: "description", content: computed(() => goodsSeo.value.desc) },
        { property: "og:title", content: computed(() => goodsSeo.value.title) },
        { property: "og:description", content: computed(() => goodsSeo.value.desc) },
        { property: "og:image", content: computed(() => goodsSeo.value.image) },
        { property: "og:url", content: computed(() => `${config.public.siteUrl || "http://localhost:3000"}/goods/${goodsId.value}`) }
      ]
    });
    const qty = ref(1);
    const stock = ref(0);
    const submitting = ref(false);
    const selectedSpecs = ref({});
    const selectedSkuImage = ref("");
    const skuAvailable = ref(false);
    const stockLoading = ref(false);
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
    const allowAddon = computed(() => {
      var _a, _b;
      return ((_b = (_a = goodsData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.allow_addon) === true;
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
    const serviceTags = [
      "\u5B98\u65B9\u91C7\u8D2D\u30FB\u6B63\u54C1\u4FDD\u969C",
      "\u5168\u7A0B\u8D28\u4FDD\u30FB\u65E0\u5FE7\u552E\u540E",
      "\u6781\u901F\u54CD\u5E94\u30FB\u4EBA\u5DE5\u670D\u52A1",
      "\u5B89\u5168\u52A0\u5BC6\u30FB\u9690\u79C1\u4FDD\u62A4"
    ];
    const fetchedFaqs = ref([]);
    const faqs = computed(() => {
      if (fetchedFaqs.value.length > 0) return fetchedFaqs.value;
      return [
        { id: "1", question: "\u4E0B\u5355\u540E\u591A\u4E45\u53D1\u8D27\uFF1F\u4E00\u822C\u4E3A\u79D2\u7EA7\u81EA\u52A8\u53D1\u8D27\u3002" },
        { id: "2", question: "\u8D26\u53F7\u65E0\u6CD5\u767B\u5F55\u600E\u4E48\u529E\uFF1F\u8BF7\u8054\u7CFB\u5728\u7EBF\u4EBA\u5DE5\u5BA2\u670D\u5904\u7406\u3002" },
        { id: "3", question: "\u652F\u6301\u9000\u6B3E\u5417\uFF1F\u865A\u62DF\u5546\u54C1\u53D1\u8D27\u540E\u975E\u8D28\u91CF\u95EE\u9898\u4E0D\u652F\u6301\u9000\u6B3E\u3002" },
        { id: "4", question: "\u53EF\u4EE5\u957F\u671F\u7EED\u8D39\u5417\uFF1F\u652F\u6301\u540C\u53F7\u7EED\u8D39\uFF0C\u8BF7\u5173\u6CE8\u8BA2\u9605\u5230\u671F\u63D0\u9192\u3002" }
      ];
    });
    const activeFaqIndex = ref(0);
    const isTransitioning = ref(true);
    const displayFaqs = computed(() => {
      if (faqs.value.length === 0) return [];
      return [...faqs.value, faqs.value[0]];
    });
    const tickerStyle = computed(() => ({
      transform: `translateY(-${activeFaqIndex.value * 40}px)`,
      transition: isTransitioning.value ? "transform 0.5s ease-in-out" : "none"
    }));
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
    const formatPrice = (price) => {
      const num = typeof price === "string" ? parseFloat(price) : price;
      return num.toFixed(2);
    };
    const skuImages = computed(() => {
      const images = skus.value.map((s) => s.image).filter(Boolean);
      return images.length > 0 ? Array.from(new Set(images)) : [goodsInfo.value.image];
    });
    const isFavorited = ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_LoginRegisterModal = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-91a2db64><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-91a2db64></div>`);
      if (goodsError.value) {
        _push(`<div class="api-warning-bar" data-v-91a2db64> \u26A0\uFE0F \u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38\uFF0C\u6B63\u5728\u9884\u89C8\u6F14\u793A\u6570\u636E </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-content" data-v-91a2db64><div class="back-btn-row" data-v-91a2db64><button class="back-btn" data-v-91a2db64><span class="back-btn-icon" data-v-91a2db64><svg width="20" height="20" viewBox="0 0 32 32" fill="none" style="${ssrRenderStyle({ "display": "block" })}" data-v-91a2db64><path d="M18.5 10L13 16L18.5 22" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-91a2db64></path></svg></span><span class="back-btn-text" data-v-91a2db64>\u8FD4\u56DE\u4E0A\u4E00\u9875</span></button></div><div class="goods-detail-content" data-v-91a2db64><div class="goods-main-section" data-v-91a2db64><div class="goods-left-panel" data-v-91a2db64><div class="main-image-wrapper" data-v-91a2db64><div class="main-image" data-v-91a2db64>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: selectedSkuImage.value || goodsInfo.value.image,
        fit: "contain",
        class: "sku-big-img"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-loading-placeholder" data-v-91a2db64${_scopeId}>\u52A0\u8F7D\u4E2D...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "\u52A0\u8F7D\u4E2D...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (skuImages.value && skuImages.value.length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-91a2db64><!--[-->`);
        ssrRenderList(skuImages.value, (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: selectedSkuImage.value === img }])}" data-v-91a2db64><img${ssrRenderAttr("src", img)} alt="SKU\u56FE\u7247" data-v-91a2db64></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-91a2db64><div class="premium-service-title" data-v-91a2db64>\u670D\u52A1\u4FDD\u969C</div><div class="premium-service-grid" data-v-91a2db64><!--[-->`);
      ssrRenderList(serviceTags, (tag) => {
        _push(`<div class="p-service-item" data-v-91a2db64>`);
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
        _push(`<span data-v-91a2db64>${ssrInterpolate(tag)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="goods-info-panel" data-v-91a2db64><div class="info-header" data-v-91a2db64><h1 class="product-name" data-v-91a2db64>${ssrInterpolate(goodsInfo.value.name)}</h1><div class="product-sales-badge" data-v-91a2db64> \u7D2F\u8BA1\u9500\u91CF <span data-v-91a2db64>${ssrInterpolate(goodsInfo.value.sales)}</span></div></div>`);
      if (faqs.value.length > 0) {
        _push(`<div class="faq-ticker-bar" data-v-91a2db64><div class="faq-ticker-container" data-v-91a2db64><div class="faq-ticker-track" style="${ssrRenderStyle(tickerStyle.value)}" data-v-91a2db64><!--[-->`);
        ssrRenderList(displayFaqs.value, (faq, idx) => {
          _push(`<div class="faq-ticker-item" data-v-91a2db64>${ssrInterpolate(faq.question)}</div>`);
        });
        _push(`<!--]--></div></div><div class="faq-arrow-wrap" data-v-91a2db64>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (hasSkus.value) {
        _push(`<div class="spec-selection-area" data-v-91a2db64><!--[-->`);
        ssrRenderList(specGroups.value, (specGroup) => {
          _push(`<div class="spec-group" data-v-91a2db64><div class="spec-label" data-v-91a2db64>${ssrInterpolate(specGroup.name)}</div><div class="spec-values" data-v-91a2db64><!--[-->`);
          ssrRenderList(specGroup.values, (val) => {
            _push(`<div class="${ssrRenderClass(["spec-val-btn", { active: selectedSpecs.value[specGroup.name] === val }])}" data-v-91a2db64>${ssrInterpolate(val)}</div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="no-sku-notice" data-v-91a2db64><div class="notice-emoji" data-v-91a2db64>\u{1F4E6}\u2728</div><h3 data-v-91a2db64>\u6211\u6B63\u5728\u7591\u72C2\u8865\u8D27\u4E2D\uFF01</h3><p data-v-91a2db64>\u5546\u54C1\u6B63\u5728\u51C6\u5907\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u6216\u8054\u7CFB\u5BA2\u670D\u4E86\u89E3\u66F4\u591A~</p></div>`);
      }
      if ((_a = matchedSku.value) == null ? void 0 : _a.intro) {
        _push(`<div class="sku-intro-section" data-v-91a2db64><span class="sku-intro-text" data-v-91a2db64>${ssrInterpolate(matchedSku.value.intro)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="price-display-section compact-price-area" data-v-91a2db64>`);
      if (hasSkus.value) {
        _push(`<!--[--><div class="price-stock-row" data-v-91a2db64><div class="current-price-box" data-v-91a2db64><span class="p-amount" data-v-91a2db64>${ssrInterpolate(formatPrice(currentPrice.value))}</span></div><div class="stock-info" data-v-91a2db64>`);
        if (stockLoading.value) {
          _push(`<span class="stock-badge loading" data-v-91a2db64>\u67E5\u8BE2\u4E2D...</span>`);
        } else if (hasStock.value) {
          _push(`<span class="stock-badge" data-v-91a2db64>\u5E93\u5B58: ${ssrInterpolate(stock.value)}</span>`);
        } else {
          _push(`<span class="stock-badge out-of-stock" data-v-91a2db64>\u6682\u65F6\u7F3A\u8D27</span>`);
        }
        _push(`</div></div>`);
        if (allowAddon.value && hasStock.value) {
          _push(`<div class="qty-control" data-v-91a2db64><div class="q-actions" data-v-91a2db64><button${ssrIncludeBooleanAttr(!hasStock.value) ? " disabled" : ""} data-v-91a2db64>-</button><input type="number"${ssrRenderAttr("value", qty.value)} min="1"${ssrIncludeBooleanAttr(!hasStock.value) ? " disabled" : ""} data-v-91a2db64><button${ssrIncludeBooleanAttr(!hasStock.value || qty.value >= stock.value) ? " disabled" : ""} data-v-91a2db64>+</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="no-price-notice" data-v-91a2db64><span class="out-of-stock-large" data-v-91a2db64>\u6682\u65F6\u7F3A\u8D27</span></div>`);
      }
      _push(`</div><div class="main-actions" data-v-91a2db64><button class="primary-buy-btn"${ssrIncludeBooleanAttr(stockLoading.value || !hasStock.value || !hasSkus.value || submitting.value) ? " disabled" : ""} data-v-91a2db64>${ssrInterpolate(stockLoading.value ? "\u52A0\u8F7D\u4E2D..." : hasSkus.value && hasStock.value ? "\u7ACB\u5373\u6781\u901F\u8D2D\u4E70" : "\u6682\u65F6\u7F3A\u8D27")} `);
      if (!stockLoading.value && hasStock.value && hasSkus.value) {
        _push(`<span class="btn-subtext" data-v-91a2db64>\u5B89\u5168\u5408\u89C4\xB7\u79D2\u901F\u53D1\u8D27</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="secondary-btns" data-v-91a2db64><button class="add-cart-btn"${ssrIncludeBooleanAttr(stockLoading.value || !hasStock.value || !hasSkus.value || submitting.value) ? " disabled" : ""} data-v-91a2db64>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(shopping_cart_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(shopping_cart_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u52A0\u5165\u8D2D\u7269\u8F66 </button><button class="${ssrRenderClass(["favorite-btn", { favorited: isFavorited.value }])}"${ssrIncludeBooleanAttr(stockLoading.value || !hasStock.value || !hasSkus.value) ? " disabled" : ""} data-v-91a2db64>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isFavorited.value) {
              _push2(ssrRenderComponent(unref(star_default), null, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(star_filled_default), null, null, _parent2, _scopeId));
            }
          } else {
            return [
              !isFavorited.value ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(isFavorited.value ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF\u5546\u54C1")}</button></div></div><div class="safe-disclaimer" data-v-91a2db64>`);
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
      _push(` \u7248\u6743\u58F0\u660E\uFF1A\u672C\u7AD9\u5C55\u793A\u7684\u5FBD\u6807\u3001\u5546\u6807\u53CA\u76F8\u5173\u6807\u5FD7\u5F52\u5404\u6743\u5229\u4EBA\u6240\u6709\u3002 </div></div></div></div><div class="product-detail-rich" data-v-91a2db64><div class="detail-divider" data-v-91a2db64><span data-v-91a2db64>\u5546\u54C1\u8BE6\u60C5\u4ECB\u7ECD</span></div><div class="detail-content-wrap" data-v-91a2db64><!--[-->`);
      ssrRenderList(detailModules.value, (mod, idx) => {
        _push(`<div class="detail-module" data-v-91a2db64>`);
        if (mod.type === "text") {
          _push(`<div class="detail-text-box" data-v-91a2db64>${ssrInterpolate(mod.content)}</div>`);
        } else if (mod.type === "image") {
          _push(`<img${ssrRenderAttr("src", mod.content)} class="detail-full-img" loading="lazy" data-v-91a2db64>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div>`);
      _push(ssrRenderComponent(_component_LoginRegisterModal, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/goods/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91a2db64"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DeMxHHiA.mjs.map
