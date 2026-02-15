import { E as ElIcon } from "./index-C4aUwruK.js";
/* empty css              */
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, useSSRContext, watch, nextTick, defineAsyncComponent, withAsyncContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import { Y as delete_default, Z as shopping_cart_default, F as star_default, B as user_default, ae as arrow_up_bold_default } from "./index-CbQ9NNm4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import { u as useHomeData } from "./useHomeData-BGtmFa-M.js";
import { _ as _export_sfc, w as __nuxt_component_0 } from "../server.mjs";
import { _ as _imports_0 } from "./virtual_public-B81IdLpj.js";
import { useCartStore } from "./cart-Lqo8L2Wc.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
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
import "./common-CeIxTI3I.js";
import "./goods-BXDiUgaK.js";
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MobileMiniCart",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useRouter();
    const cartStore = useCartStore();
    const updating = ref(false);
    const checkingOut = ref(false);
    const cartItem = computed(() => {
      return cartStore.items && cartStore.items.length > 0 ? cartStore.items[0] : null;
    });
    const hasItems = computed(() => !!cartItem.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-mini-cart cyber-cart" }, _attrs))} data-v-04f9d09d><div class="cart-arrow" data-v-04f9d09d></div><div class="mc-header" data-v-04f9d09d><span class="mc-title" data-v-04f9d09d>购物车</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" data-v-04f9d09d>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(delete_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(delete_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 清空 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-04f9d09d>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-04f9d09d><div class="mc-img-wrap" data-v-04f9d09d><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} data-v-04f9d09d></div><div class="mc-details" data-v-04f9d09d><div class="mc-name" data-v-04f9d09d>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-row-bottom" data-v-04f9d09d><span class="mc-price" data-v-04f9d09d>¥${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-04f9d09d><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-04f9d09d>-</button><span class="qty-num" data-v-04f9d09d>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-04f9d09d>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-04f9d09d>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-04f9d09d><div class="empty-icon" data-v-04f9d09d>🛒</div><p data-v-04f9d09d>空空如也</p></div>`);
        }
        _push(`</div>`);
        if (hasItems.value) {
          _push(`<div class="mc-footer" data-v-04f9d09d><button class="btn-cyber-checkout"${ssrIncludeBooleanAttr(checkingOut.value) ? " disabled" : ""} data-v-04f9d09d>${ssrInterpolate(checkingOut.value ? "处理中..." : "去结算")}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/cart/MobileMiniCart.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const MobileMiniCart = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-04f9d09d"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "HomeHeader",
  __ssrInlineRender: true,
  props: {
    isScrolled: { type: Boolean }
  },
  emits: ["open-login"],
  setup(__props) {
    useRouter();
    useUserStore();
    const cartStore = useCartStore();
    const showMiniCart = ref(false);
    ref(null);
    const isMounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["mobile-header", { "is-scrolled": __props.isScrolled }]
      }, _attrs))} data-v-f086c091><div class="header-top" data-v-f086c091><div class="logo-area" data-v-f086c091><img${ssrRenderAttr("src", _imports_0)} class="logo-img" alt="FANTULA" data-v-f086c091><span class="site-name" data-v-f086c091>凡图拉</span></div><div class="header-actions" data-v-f086c091><div class="cart-wrapper-rel" data-v-f086c091><button class="icon-btn" data-v-f086c091>`);
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
      if (isMounted.value && unref(cartStore).totalCount > 0) {
        _push(`<div class="badge-dot-header" data-v-f086c091></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(MobileMiniCart, {
        visible: showMiniCart.value,
        onClose: ($event) => showMiniCart.value = false
      }, null, _parent));
      _push(`</div><button class="icon-btn" data-v-f086c091>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(star_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(star_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="icon-btn" data-v-f086c091${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(user_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(user_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                class: "icon-btn",
                onClick: ($event) => _ctx.$emit("open-login")
              }, [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(user_default))
                  ]),
                  _: 1
                })
              ], 8, ["onClick"])
            ];
          }
        })
      }, _parent));
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeHeader.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const HomeHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-f086c091"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HomeBanner",
  __ssrInlineRender: true,
  props: {
    banners: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-section" }, _attrs))} data-v-6b5867dc><div class="banner-container-premium" data-v-6b5867dc>`);
      if (!__props.loading) {
        _push(`<div class="glow-border-effect" data-v-6b5867dc></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.loading) {
        _push(`<div class="banner-skeleton" data-v-6b5867dc><div class="skeleton-shimmer" data-v-6b5867dc></div></div>`);
      } else {
        _push(`<div class="banner-content-inner" data-v-6b5867dc><div class="expanded-view" data-v-6b5867dc>`);
        if (__props.banners.length > 0) {
          _push(`<div class="banner-carousel" data-v-6b5867dc><!--[-->`);
          ssrRenderList(__props.banners, (banner) => {
            _push(`<div class="banner-item" data-v-6b5867dc><img${ssrRenderAttr("src", banner.image)} class="banner-img" data-v-6b5867dc><div class="banner-overlay" data-v-6b5867dc></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeBanner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HomeBanner = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6b5867dc"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "HomeCategoryNav",
  __ssrInlineRender: true,
  props: {
    categories: {},
    modelValue: {},
    loading: { type: Boolean }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const scrollContainer = ref(null);
    const centerActiveCategory = () => {
      nextTick(() => {
        if (!scrollContainer.value) return;
        const activeEl = scrollContainer.value.querySelector(".category-pill.active");
        if (activeEl) {
          const container = scrollContainer.value;
          const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
          container.scrollTo({ left: scrollLeft, behavior: "smooth" });
        }
      });
    };
    watch(() => props.modelValue, () => {
      centerActiveCategory();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-scroll-wrapper" }, _attrs))} data-v-a16f3035><div class="category-scroll no-scrollbar" data-v-a16f3035>`);
      if (__props.loading) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="category-pill skeleton-pill" data-v-a16f3035></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(__props.categories, (cat) => {
          _push(`<div class="${ssrRenderClass([{
            active: __props.modelValue === cat.id,
            "active-glow-border": __props.modelValue === cat.id
          }, "category-pill"])}" data-v-a16f3035><span class="pill-text" data-v-a16f3035>${ssrInterpolate(cat.name)}</span></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeCategoryNav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HomeCategoryNav = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a16f3035"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileProductCard",
  __ssrInlineRender: true,
  props: {
    goods: {}
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const tags = computed(() => {
      const t = props.goods.tags;
      if (!t) return [];
      if (Array.isArray(t)) return t;
      if (typeof t === "string" && t.includes(",")) return t.split(",");
      return [t];
    });
    const formatPrice = (price) => {
      if (price === void 0 || price === null) return "0.00";
      const num = typeof price === "string" ? parseFloat(price) : price;
      return num.toFixed(2);
    };
    const formatSales = (val) => {
      const num = Number(val);
      if (num >= 1e4) return (num / 1e4).toFixed(1) + "w";
      if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
      return num;
    };
    const getBadgeClass = (label) => {
      const map = {
        "热卖": "badge-hot",
        "新品": "badge-new",
        "推荐": "badge-recommend",
        "限时": "badge-limited",
        "优惠": "badge-promo"
      };
      return map[label] || "badge-new";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-row card-glass" }, _attrs))} data-v-b336a6fa><div class="goods-thumb" data-v-b336a6fa><img${ssrRenderAttr("src", __props.goods.image || __props.goods.coverImage)} loading="lazy" decoding="async" data-v-b336a6fa>`);
      if (__props.goods.badge_label && __props.goods.badge_label !== "不展示") {
        _push(`<div class="${ssrRenderClass([getBadgeClass(__props.goods.badge_label), "card-badge"])}" data-v-b336a6fa>${ssrInterpolate(__props.goods.badge_label)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="goods-info" data-v-b336a6fa><h3 class="goods-title" data-v-b336a6fa>${ssrInterpolate(__props.goods.product_name || __props.goods.name || __props.goods.title)}</h3>`);
      if (tags.value.length) {
        _push(`<div class="goods-tags-row" data-v-b336a6fa><!--[-->`);
        ssrRenderList(tags.value.slice(0, 2), (tag, idx) => {
          _push(`<span class="aurora-tag" data-v-b336a6fa>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-meta-row" data-v-b336a6fa><span class="stat-text" data-v-b336a6fa>已售 ${ssrInterpolate(formatSales(__props.goods.initial_sales || __props.goods.sales || 0))}</span></div><div class="goods-bottom" data-v-b336a6fa><div class="goods-price-row" data-v-b336a6fa><span class="price-val text-price" data-v-b336a6fa>${ssrInterpolate(formatPrice(__props.goods.display_price || __props.goods.price))}</span></div><button class="buy-btn btn-marketing-buy" data-v-b336a6fa> 查看详情 </button></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/MobileProductCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MobileProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b336a6fa"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-skeleton" }, _attrs))} data-v-0050002c><div class="skeleton-thumb" data-v-0050002c></div><div class="skeleton-info" data-v-0050002c><div class="skeleton-title" data-v-0050002c></div><div class="skeleton-tags" data-v-0050002c></div><div class="skeleton-bottom" data-v-0050002c><div class="skeleton-price" data-v-0050002c></div><div class="skeleton-btn" data-v-0050002c></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/MobileProductCardSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileProductCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0050002c"]]);
const PULL_THRESHOLD = 60;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const ProductDetailSheet = defineAsyncComponent(() => import("./ProductDetailSheet-DcwCPkcm.js"));
    const MobileLoginSheet = defineAsyncComponent(() => import("./MobileLoginSheet-WIOZ1cel.js"));
    useRouter();
    useRoute();
    useUserStore();
    const {
      banners,
      categories,
      currentGoods,
      activeCategoryId,
      pending,
      goodsLoading,
      hasMore,
      isLoadingMore,
      initData,
      refresh,
      handleCategoryChange: _handleCategoryChange,
      loadMore
    } = ([__temp, __restore] = withAsyncContext(() => useHomeData("home-data-mobile")), __temp = await __temp, __restore(), __temp);
    const bannerLoading = pending;
    const categoryLoading = pending;
    const isScrolled = ref(false);
    const showBackToTop = ref(false);
    const showDetailSheet = ref(false);
    const showLoginSheet = ref(false);
    const selectedGoodsId = ref("");
    const pullDistance = ref(0);
    const isRefreshing = ref(false);
    ref(0);
    ref(false);
    const isMounted = ref(false);
    const pullText = computed(() => {
      if (isRefreshing.value) return "Refreshing...";
      return pullDistance.value > PULL_THRESHOLD ? "Release to Refresh" : "Pull to Refresh";
    });
    const scrollContainer = ref(null);
    const loadMoreTrigger = ref(null);
    let observer = null;
    const openDetail = (id) => {
      selectedGoodsId.value = id;
      showDetailSheet.value = true;
    };
    const handleCategoryChange = async (categoryId) => {
      await _handleCategoryChange(categoryId);
      setupObserver();
    };
    const setupObserver = async () => {
      if (observer) observer.disconnect();
      await nextTick();
      if (loadMoreTrigger.value) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore.value && !isLoadingMore.value) {
              loadMore();
            }
          },
          {
            root: scrollContainer.value,
            rootMargin: "100px"
          }
        );
        observer.observe(loadMoreTrigger.value);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-home-page" }, _attrs))} data-v-28eac39f>`);
      _push(ssrRenderComponent(HomeHeader, {
        "is-scrolled": isScrolled.value,
        onOpenLogin: ($event) => showLoginSheet.value = true
      }, null, _parent));
      _push(`<div class="content-scroll no-scrollbar" data-v-28eac39f>`);
      _push(ssrRenderComponent(HomeBanner, {
        banners: unref(banners),
        loading: unref(bannerLoading)
      }, null, _parent));
      _push(ssrRenderComponent(HomeCategoryNav, {
        categories: unref(categories),
        "model-value": unref(activeCategoryId),
        loading: unref(categoryLoading),
        onChange: handleCategoryChange
      }, null, _parent));
      _push(`<div class="pull-refresh-indicator" style="${ssrRenderStyle({ height: `${pullDistance.value}px`, opacity: pullDistance.value > 0 ? 1 : 0 })}" data-v-28eac39f>`);
      if (isRefreshing.value) {
        _push(`<div class="spinner-mini" data-v-28eac39f></div>`);
      } else {
        _push(`<span class="text-xs text-muted" data-v-28eac39f>${ssrInterpolate(pullText.value)}</span>`);
      }
      _push(`</div><div class="goods-list-section" data-v-28eac39f>`);
      if ((unref(pending) || unref(goodsLoading)) && unref(currentGoods).length === 0) {
        _push(`<div class="loading-state" data-v-28eac39f><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(MobileProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(currentGoods).length === 0) {
        _push(`<div class="empty-state bg-glass-card" data-v-28eac39f><div class="empty-icon" data-v-28eac39f>📦</div><p class="text-muted text-sm" data-v-28eac39f>暂无相关商品</p></div>`);
      } else {
        _push(`<div class="goods-list" data-v-28eac39f><!--[-->`);
        ssrRenderList(unref(currentGoods), (g, index2) => {
          _push(ssrRenderComponent(MobileProductCard, {
            key: g.id,
            goods: g,
            class: "animate-fade-in",
            style: { animationDelay: `${index2 * 0.05}s` },
            onClick: ($event) => openDetail(g.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (unref(hasMore) && unref(currentGoods).length > 0) {
        _push(`<div class="load-more-trigger" data-v-28eac39f>`);
        if (unref(isLoadingMore)) {
          _push(`<div class="loading-more" data-v-28eac39f><div class="spinner-mini" data-v-28eac39f></div> 加载更多... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(hasMore) && unref(currentGoods).length > 0) {
        _push(`<div class="no-more-data" data-v-28eac39f> - 到底了 - </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="tab-bar-spacer" data-v-28eac39f></div></div><button class="back-to-top-btn" style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}" data-v-28eac39f>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_up_bold_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_up_bold_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
      if (isMounted.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(ProductDetailSheet), {
          visible: showDetailSheet.value,
          "onUpdate:visible": ($event) => showDetailSheet.value = $event,
          "goods-id": selectedGoodsId.value
        }, null, _parent));
        _push(ssrRenderComponent(unref(MobileLoginSheet), {
          visible: showLoginSheet.value,
          onClose: ($event) => showLoginSheet.value = false
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-28eac39f"]]);
export {
  index as default
};
//# sourceMappingURL=index-BwBTUztx.js.map
