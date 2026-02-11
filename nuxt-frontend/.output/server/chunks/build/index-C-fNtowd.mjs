import { defineComponent, defineAsyncComponent, ref, mergeProps, unref, withCtx, createVNode, watch, computed, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { g as goodsApi } from './goods-DQk19w4f.mjs';
import { _ as _export_sfc, H as usePageLoading } from './server.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { _ as _imports_0 } from './virtual_public-B81IdLpj.mjs';
import { useCartStore } from './cart-C8TGo9ts.mjs';
import { aa as shopping_cart_default, U as star_default, Q as user_default, d as delete_default } from './index-DlETah8a.mjs';
import './request-n20yf-Kr.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
import './common-DNRu9xdu.mjs';
import './install-VBSKbHUK.mjs';
import './objects-Bz74KHmq.mjs';

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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-mini-cart cyber-cart" }, _attrs))} data-v-b8a6f9bb><div class="cart-arrow" data-v-b8a6f9bb></div><div class="mc-header" data-v-b8a6f9bb><span class="mc-title" data-v-b8a6f9bb>\u8D2D\u7269\u8F66</span>`);
        if (hasItems.value) {
          _push(`<div class="mc-clear-btn" data-v-b8a6f9bb>`);
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
          _push(` \u6E05\u7A7A </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mc-body" data-v-b8a6f9bb>`);
        if (cartItem.value) {
          _push(`<div class="mc-product-card" data-v-b8a6f9bb><div class="mc-img-wrap" data-v-b8a6f9bb><img${ssrRenderAttr("src", cartItem.value.productImage || "/images/placeholder.png")} data-v-b8a6f9bb></div><div class="mc-details" data-v-b8a6f9bb><div class="mc-name" data-v-b8a6f9bb>${ssrInterpolate(cartItem.value.productName)}</div><div class="mc-row-bottom" data-v-b8a6f9bb><span class="mc-price" data-v-b8a6f9bb>\xA5${ssrInterpolate(cartItem.value.price)}</span>`);
          if (cartItem.value.allowAddon) {
            _push(`<div class="mc-qty-control" data-v-b8a6f9bb><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value || cartItem.value.quantity <= 1) ? " disabled" : ""} data-v-b8a6f9bb>-</button><span class="qty-num" data-v-b8a6f9bb>${ssrInterpolate(cartItem.value.quantity)}</span><button class="qty-btn"${ssrIncludeBooleanAttr(updating.value) ? " disabled" : ""} data-v-b8a6f9bb>+</button></div>`);
          } else {
            _push(`<div class="mc-qty-static" data-v-b8a6f9bb>x${ssrInterpolate(cartItem.value.quantity)}</div>`);
          }
          _push(`</div></div></div>`);
        } else {
          _push(`<div class="mc-empty" data-v-b8a6f9bb><div class="empty-icon" data-v-b8a6f9bb>\u{1F6D2}</div><p data-v-b8a6f9bb>\u7A7A\u7A7A\u5982\u4E5F</p></div>`);
        }
        _push(`</div>`);
        if (hasItems.value) {
          _push(`<div class="mc-footer" data-v-b8a6f9bb><button class="btn-cyber-checkout"${ssrIncludeBooleanAttr(checkingOut.value) ? " disabled" : ""} data-v-b8a6f9bb>${ssrInterpolate(checkingOut.value ? "\u5904\u7406\u4E2D..." : "\u53BB\u7ED3\u7B97")}</button></div>`);
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
const MobileMiniCart = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-b8a6f9bb"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "HomeHeader",
  __ssrInlineRender: true,
  props: {
    isScrolled: { type: Boolean }
  },
  emits: ["open-login"],
  setup(__props) {
    useRouter();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const showMiniCart = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["mobile-header", { "is-scrolled": __props.isScrolled }]
      }, _attrs))} data-v-ac5558d9><div class="header-top" data-v-ac5558d9><div class="logo-area" data-v-ac5558d9><img${ssrRenderAttr("src", _imports_0)} class="logo-img" alt="FANTULA" data-v-ac5558d9><span class="site-name" data-v-ac5558d9>\u51E1\u56FE\u62C9</span></div><div class="header-actions" data-v-ac5558d9><div class="cart-wrapper-rel" data-v-ac5558d9><button class="icon-btn" data-v-ac5558d9>`);
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
      if (unref(cartStore).totalCount > 0) {
        _push(`<div class="badge-dot-header" data-v-ac5558d9></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(MobileMiniCart, {
        visible: showMiniCart.value,
        onClose: ($event) => showMiniCart.value = false
      }, null, _parent));
      _push(`</div><button class="icon-btn" data-v-ac5558d9>`);
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
      if (!unref(userStore).isLoggedIn) {
        _push(`<button class="icon-btn" data-v-ac5558d9>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(user_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(user_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button>`);
      } else {
        _push(`<div class="header-avatar" data-v-ac5558d9>`);
        if (unref(userStore).loading) {
          _push(`<div class="avatar-skeleton" data-v-ac5558d9></div>`);
        } else {
          _push(`<!--[--><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || "/images/client/pc/avatars/avatar-cat.png")} data-v-ac5558d9><div class="avatar-ring" data-v-ac5558d9></div><!--]-->`);
        }
        _push(`</div>`);
      }
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
const HomeHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ac5558d9"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HomeBanner",
  __ssrInlineRender: true,
  props: {
    banners: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-section" }, _attrs))} data-v-a1ff5c90><div class="banner-container-premium" data-v-a1ff5c90><div class="glow-border-effect" data-v-a1ff5c90></div><div class="banner-content-inner" data-v-a1ff5c90><div class="expanded-view" data-v-a1ff5c90>`);
      if (__props.banners.length > 0) {
        _push(`<div class="banner-carousel" data-v-a1ff5c90><!--[-->`);
        ssrRenderList(__props.banners, (banner) => {
          _push(`<div class="banner-item" data-v-a1ff5c90><img${ssrRenderAttr("src", banner.image)} class="banner-img" data-v-a1ff5c90><div class="banner-overlay" data-v-a1ff5c90></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeBanner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HomeBanner = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-a1ff5c90"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "HomeCategoryNav",
  __ssrInlineRender: true,
  props: {
    categories: {},
    modelValue: {}
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-scroll-wrapper" }, _attrs))} data-v-6344db33><div class="category-scroll no-scrollbar" data-v-6344db33><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: __props.modelValue === cat.id }, "category-pill"])}" data-v-6344db33><span class="pill-text" data-v-6344db33>${ssrInterpolate(cat.name)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeCategoryNav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HomeCategoryNav = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6344db33"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
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
        "\u70ED\u5356": "badge-hot",
        "\u65B0\u54C1": "badge-new",
        "\u63A8\u8350": "badge-recommend",
        "\u9650\u65F6": "badge-limited",
        "\u4F18\u60E0": "badge-promo"
      };
      return map[label] || "badge-new";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-row card-glass" }, _attrs))} data-v-9f1c4f01><div class="goods-thumb" data-v-9f1c4f01><img${ssrRenderAttr("src", __props.goods.image || __props.goods.coverImage)} loading="lazy" decoding="async" data-v-9f1c4f01>`);
      if (__props.goods.badge_label && __props.goods.badge_label !== "\u4E0D\u5C55\u793A") {
        _push(`<div class="${ssrRenderClass([getBadgeClass(__props.goods.badge_label), "card-badge"])}" data-v-9f1c4f01>${ssrInterpolate(__props.goods.badge_label)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="goods-info" data-v-9f1c4f01><h3 class="goods-title" data-v-9f1c4f01>${ssrInterpolate(__props.goods.product_name || __props.goods.name || __props.goods.title)}</h3>`);
      if (tags.value.length) {
        _push(`<div class="goods-tags-row" data-v-9f1c4f01><!--[-->`);
        ssrRenderList(tags.value.slice(0, 2), (tag, idx) => {
          _push(`<span class="tag-item" data-v-9f1c4f01>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-meta-row" data-v-9f1c4f01><span class="stat-text" data-v-9f1c4f01>\u5DF2\u552E ${ssrInterpolate(formatSales(__props.goods.initial_sales || __props.goods.sales || 0))}</span></div><div class="goods-bottom" data-v-9f1c4f01><div class="goods-price-row" data-v-9f1c4f01><span class="price-val text-price" data-v-9f1c4f01>${ssrInterpolate(formatPrice(__props.goods.display_price || __props.goods.price))}</span></div><button class="buy-btn btn-marketing-buy" data-v-9f1c4f01> \u67E5\u770B\u8BE6\u60C5 </button></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/ProductCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9f1c4f01"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-skeleton" }, _attrs))} data-v-348f65f8><div class="skeleton-thumb" data-v-348f65f8></div><div class="skeleton-info" data-v-348f65f8><div class="skeleton-title" data-v-348f65f8></div><div class="skeleton-tags" data-v-348f65f8></div><div class="skeleton-bottom" data-v-348f65f8><div class="skeleton-price" data-v-348f65f8></div><div class="skeleton-btn" data-v-348f65f8></div></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/ProductCardSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-348f65f8"]]);
const PAGE_SIZE = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const ProductDetailSheet = defineAsyncComponent(() => import('./ProductDetailSheet-BXqgptIL.mjs'));
    const MobileLoginSheet = defineAsyncComponent(() => import('./MobileLoginSheet-DO0eXnQ-.mjs'));
    useRouter();
    useRoute();
    useUserStore();
    usePageLoading();
    const banners = ref([]);
    const categories = ref([]);
    const currentGoods = ref([]);
    const activeCategoryId = ref("");
    const goodsLoading = ref(false);
    const currentPage = ref(1);
    const hasMore = ref(true);
    const isLoadingMore = ref(false);
    const isScrolled = ref(false);
    const showDetailSheet = ref(false);
    const showLoginSheet = ref(false);
    const selectedGoodsId = ref("");
    const scrollContainer = ref(null);
    const loadMoreTrigger = ref(null);
    let observer = null;
    const openDetail = (id) => {
      selectedGoodsId.value = id;
      showDetailSheet.value = true;
    };
    const fetchGoods = async (categoryId, isLoadMore = false) => {
      var _a;
      if (!categoryId) return;
      if (isLoadMore) {
        if (!hasMore.value || isLoadingMore.value) return;
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
        const newList = (res == null ? void 0 : res.success) && ((_a = res.data) == null ? void 0 : _a.list) ? res.data.list : [];
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
        console.error(e);
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
      activeCategoryId.value = categoryId;
      await fetchGoods(categoryId);
      setupObserver();
    };
    const setupObserver = () => {
      if (observer) observer.disconnect();
      setTimeout(() => {
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
      }, 100);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-home-page" }, _attrs))} data-v-a8206558>`);
      _push(ssrRenderComponent(HomeHeader, {
        "is-scrolled": isScrolled.value,
        onOpenLogin: ($event) => showLoginSheet.value = true
      }, null, _parent));
      _push(`<div class="content-scroll no-scrollbar" data-v-a8206558>`);
      _push(ssrRenderComponent(HomeBanner, { banners: banners.value }, null, _parent));
      _push(ssrRenderComponent(HomeCategoryNav, {
        categories: categories.value,
        modelValue: activeCategoryId.value,
        "onUpdate:modelValue": ($event) => activeCategoryId.value = $event,
        onChange: handleCategoryChange
      }, null, _parent));
      _push(`<div class="goods-list-section" data-v-a8206558>`);
      if (goodsLoading.value && currentGoods.value.length === 0) {
        _push(`<div class="loading-state" data-v-a8206558><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(ProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (currentGoods.value.length === 0) {
        _push(`<div class="empty-state bg-glass-card" data-v-a8206558><div class="empty-icon" data-v-a8206558>\u{1F4E6}</div><p class="text-muted text-sm" data-v-a8206558>\u6682\u65E0\u76F8\u5173\u5546\u54C1</p></div>`);
      } else {
        _push(`<div class="goods-list" data-v-a8206558><!--[-->`);
        ssrRenderList(currentGoods.value, (item, index2) => {
          _push(ssrRenderComponent(ProductCard, {
            key: item.id,
            goods: item,
            class: "animate-fade-in",
            style: { animationDelay: `${index2 * 0.05}s` },
            onClick: ($event) => openDetail(item.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (hasMore.value && currentGoods.value.length > 0) {
        _push(`<div class="load-more-trigger" data-v-a8206558>`);
        if (isLoadingMore.value) {
          _push(`<div class="loading-more" data-v-a8206558><div class="spinner-mini" data-v-a8206558></div> \u52A0\u8F7D\u66F4\u591A... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!hasMore.value && currentGoods.value.length > 0) {
        _push(`<div class="no-more-data" data-v-a8206558> - \u5230\u5E95\u4E86 - </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="tab-bar-spacer" data-v-a8206558></div></div>`);
      _push(ssrRenderComponent(unref(ProductDetailSheet), {
        visible: showDetailSheet.value,
        "onUpdate:visible": ($event) => showDetailSheet.value = $event,
        "goods-id": selectedGoodsId.value
      }, null, _parent));
      _push(ssrRenderComponent(unref(MobileLoginSheet), {
        visible: showLoginSheet.value,
        onClose: ($event) => showLoginSheet.value = false
      }, null, _parent));
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a8206558"]]);

export { index as default };
//# sourceMappingURL=index-C-fNtowd.mjs.map
