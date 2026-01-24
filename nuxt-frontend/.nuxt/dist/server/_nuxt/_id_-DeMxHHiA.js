import { E as ElImage } from "./index-Dr3RPaW4.js";
import { bd as useNuxtApp, be as asyncDataDefaults, bf as createError, u as useModalStore, d as useUserStore, e as useCartStore, j as useRuntimeConfig, E as ElIcon, am as circle_check_default, aO as right_default, aQ as shopping_cart_default, a8 as star_default, b1 as star_filled_default, a3 as info_filled_default, c as __nuxt_component_2, _ as _export_sfc } from "../server.mjs";
/* empty css                         */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { computed, toValue, getCurrentInstance, onServerPrefetch, ref, shallowRef, toRef, nextTick, unref, defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { g as goodsApi } from "./goods-BnwZn77-.js";
import { debounce } from "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
import { u as useHead } from "./v3-DfxIQ3dZ.js";
import "@vueuse/core";
import "lodash-unified";
import "./focus-trap-D_6Xxduc.js";
import "./aria-B8G3G_75.js";
import "./index-B-o0CD59.js";
import "./scroll-DcpXtO6O.js";
import "./raf-CQRaPAjg.js";
import "@vue/shared";
import "./index-ClPmkyX9.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
  const handler = !import.meta.prerender || !nuxtApp.ssrContext?._sharedPrerenderCache ? _handler : (nuxtApp2, options2) => {
    const value = nuxtApp2.ssrContext._sharedPrerenderCache.get(key);
    if (value) {
      return value;
    }
    const promise = Promise.resolve().then(() => nuxtApp2.runWithContext(() => _handler(nuxtApp2, options2)));
    nuxtApp2.ssrContext._sharedPrerenderCache.set(key, promise);
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
      const data = goodsData.value?.data || {};
      return {
        title: data.product_name || "商品详情",
        desc: data.description || "凡图拉提供优质数字商品服务",
        image: data.coverImage || data.image
      };
    });
    useHead({
      title: computed(() => `${goodsSeo.value.title} - 凡图拉`),
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
      const data = goodsData.value?.data || {};
      return {
        name: data.title || data.product_name || "正在加载商品...",
        image: data.coverImage || data.image || "/images/placeholder.png",
        price: data.price || 0,
        sales: data.initial_sales || data.sales || 0,
        rating: data.rating || 100
      };
    });
    const allowAddon = computed(() => {
      return goodsData.value?.data?.allow_addon === true;
    });
    const detailModules = computed(() => {
      const dataModules = goodsData.value?.data?.detail_modules;
      if (dataModules && dataModules.length > 0) return dataModules;
      return [
        { type: "image", content: "/images/client/pc/netflix_detail_1.png" },
        { type: "image", content: "/images/client/pc/netflix_detail_2.png" }
      ];
    });
    const serviceTags = [
      "官方采购・正品保障",
      "全程质保・无忧售后",
      "极速响应・人工服务",
      "安全加密・隐私保护"
    ];
    const fetchedFaqs = ref([]);
    const faqs = computed(() => {
      if (fetchedFaqs.value.length > 0) return fetchedFaqs.value;
      return [
        { id: "1", question: "下单后多久发货？一般为秒级自动发货。" },
        { id: "2", question: "账号无法登录怎么办？请联系在线人工客服处理。" },
        { id: "3", question: "支持退款吗？虚拟商品发货后非质量问题不支持退款。" },
        { id: "4", question: "可以长期续费吗？支持同号续费，请关注订阅到期提醒。" }
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
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_LoginRegisterModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-91a2db64><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-91a2db64></div>`);
      if (goodsError.value) {
        _push(`<div class="api-warning-bar" data-v-91a2db64> ⚠️ 网络连接异常，正在预览演示数据 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-content" data-v-91a2db64><div class="back-btn-row" data-v-91a2db64><button class="back-btn" data-v-91a2db64><span class="back-btn-icon" data-v-91a2db64><svg width="20" height="20" viewBox="0 0 32 32" fill="none" style="${ssrRenderStyle({ "display": "block" })}" data-v-91a2db64><path d="M18.5 10L13 16L18.5 22" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-91a2db64></path></svg></span><span class="back-btn-text" data-v-91a2db64>返回上一页</span></button></div><div class="goods-detail-content" data-v-91a2db64><div class="goods-main-section" data-v-91a2db64><div class="goods-left-panel" data-v-91a2db64><div class="main-image-wrapper" data-v-91a2db64><div class="main-image" data-v-91a2db64>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: selectedSkuImage.value || goodsInfo.value.image,
        fit: "contain",
        class: "sku-big-img"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-loading-placeholder" data-v-91a2db64${_scopeId}>加载中...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "加载中...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (skuImages.value && skuImages.value.length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-91a2db64><!--[-->`);
        ssrRenderList(skuImages.value, (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: selectedSkuImage.value === img }])}" data-v-91a2db64><img${ssrRenderAttr("src", img)} alt="SKU图片" data-v-91a2db64></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-91a2db64><div class="premium-service-title" data-v-91a2db64>服务保障</div><div class="premium-service-grid" data-v-91a2db64><!--[-->`);
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
      _push(`<!--]--></div></div></div><div class="goods-info-panel" data-v-91a2db64><div class="info-header" data-v-91a2db64><h1 class="product-name" data-v-91a2db64>${ssrInterpolate(goodsInfo.value.name)}</h1><div class="product-sales-badge" data-v-91a2db64> 累计销量 <span data-v-91a2db64>${ssrInterpolate(goodsInfo.value.sales)}</span></div></div>`);
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
        _push(`<div class="no-sku-notice" data-v-91a2db64><div class="notice-emoji" data-v-91a2db64>📦✨</div><h3 data-v-91a2db64>我正在疑狂补货中！</h3><p data-v-91a2db64>商品正在准备中，请稍后再来或联系客服了解更多~</p></div>`);
      }
      if (matchedSku.value?.intro) {
        _push(`<div class="sku-intro-section" data-v-91a2db64><span class="sku-intro-text" data-v-91a2db64>${ssrInterpolate(matchedSku.value.intro)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="price-display-section compact-price-area" data-v-91a2db64>`);
      if (hasSkus.value) {
        _push(`<!--[--><div class="price-stock-row" data-v-91a2db64><div class="current-price-box" data-v-91a2db64><span class="p-amount" data-v-91a2db64>${ssrInterpolate(formatPrice(currentPrice.value))}</span></div><div class="stock-info" data-v-91a2db64>`);
        if (stockLoading.value) {
          _push(`<span class="stock-badge loading" data-v-91a2db64>查询中...</span>`);
        } else if (hasStock.value) {
          _push(`<span class="stock-badge" data-v-91a2db64>库存: ${ssrInterpolate(stock.value)}</span>`);
        } else {
          _push(`<span class="stock-badge out-of-stock" data-v-91a2db64>暂时缺货</span>`);
        }
        _push(`</div></div>`);
        if (allowAddon.value && hasStock.value) {
          _push(`<div class="qty-control" data-v-91a2db64><div class="q-actions" data-v-91a2db64><button${ssrIncludeBooleanAttr(!hasStock.value) ? " disabled" : ""} data-v-91a2db64>-</button><input type="number"${ssrRenderAttr("value", qty.value)} min="1"${ssrIncludeBooleanAttr(!hasStock.value) ? " disabled" : ""} data-v-91a2db64><button${ssrIncludeBooleanAttr(!hasStock.value || qty.value >= stock.value) ? " disabled" : ""} data-v-91a2db64>+</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="no-price-notice" data-v-91a2db64><span class="out-of-stock-large" data-v-91a2db64>暂时缺货</span></div>`);
      }
      _push(`</div><div class="main-actions" data-v-91a2db64><button class="primary-buy-btn"${ssrIncludeBooleanAttr(stockLoading.value || !hasStock.value || !hasSkus.value || submitting.value) ? " disabled" : ""} data-v-91a2db64>${ssrInterpolate(stockLoading.value ? "加载中..." : hasSkus.value && hasStock.value ? "立即极速购买" : "暂时缺货")} `);
      if (!stockLoading.value && hasStock.value && hasSkus.value) {
        _push(`<span class="btn-subtext" data-v-91a2db64>安全合规·秒速发货</span>`);
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
      _push(` 加入购物车 </button><button class="${ssrRenderClass(["favorite-btn", { favorited: isFavorited.value }])}"${ssrIncludeBooleanAttr(stockLoading.value || !hasStock.value || !hasSkus.value) ? " disabled" : ""} data-v-91a2db64>`);
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
      _push(` ${ssrInterpolate(isFavorited.value ? "已收藏" : "收藏商品")}</button></div></div><div class="safe-disclaimer" data-v-91a2db64>`);
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
      _push(` 版权声明：本站展示的徽标、商标及相关标志归各权利人所有。 </div></div></div></div><div class="product-detail-rich" data-v-91a2db64><div class="detail-divider" data-v-91a2db64><span data-v-91a2db64>商品详情介绍</span></div><div class="detail-content-wrap" data-v-91a2db64><!--[-->`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DeMxHHiA.js.map
