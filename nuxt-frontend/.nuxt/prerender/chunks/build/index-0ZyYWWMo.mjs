import { defineComponent, ref, mergeProps, unref, watch, computed, createVNode, resolveDynamicComponent, nextTick, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderTeleport, ssrRenderVNode, ssrIncludeBooleanAttr, ssrRenderStyle, ssrLooseContain } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter, useRoute } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { g as goodsApi } from './goods-DQk19w4f.mjs';
import { _ as _export_sfc, F as usePageLoading } from './server.mjs';
import { u as useUserStore } from './user-CzJGyf4T.mjs';
import { D as arrow_down_default, h as circle_check_filled_default, a9 as lightning_default, au as umbrella_default, K as document_default, i as info_filled_default, af as star_filled_default, W as star_default, s as service_default, n as close_default } from './index-CmsdIFY8.mjs';
import { supabaseFaqApi, supabaseProductApi } from './supabase-fcLPkUp1.mjs';
import { u as useCartStore } from './cart-D8FaBhjU.mjs';
import { a as authApi } from './auth-BCuS92ob.mjs';
import { E as EmailInput, S as SendCodeButton } from './SendCodeButton-Bt2-2zIY.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
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
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vueuse/core/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/lodash-unified/import.js';
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
import './install-VBSKbHUK.mjs';
import './typescript-D6L75muK.mjs';
import './icon-eqoLCvNY.mjs';
import './index-Byc6LUYX.mjs';
import './objects-Bz74KHmq.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-DBQY6eQ6.mjs';
import './index-CO6H4Lsj.mjs';
import './event-D3FEo2C5.mjs';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "HomeHeader",
  __ssrInlineRender: true,
  props: {
    isScrolled: { type: Boolean }
  },
  emits: ["open-login"],
  setup(__props) {
    useRouter();
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["mobile-header", { "is-scrolled": __props.isScrolled }]
      }, _attrs))} data-v-67113fc4><div class="header-top" data-v-67113fc4><div class="logo-area" data-v-67113fc4><span class="logo-text" data-v-67113fc4>FANTULA</span></div><div class="header-actions" data-v-67113fc4>`);
      if (!unref(userStore).isLoggedIn) {
        _push(`<button class="btn btn-glass btn-sm login-btn" data-v-67113fc4>\u767B\u5F55</button>`);
      } else {
        _push(`<div class="header-avatar" data-v-67113fc4><img${ssrRenderAttr("src", ((_a = unref(userStore).user) == null ? void 0 : _a.avatar) || "/images/default-avatar.png")} data-v-67113fc4><div class="avatar-ring" data-v-67113fc4></div></div>`);
      }
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeHeader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HomeHeader = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-67113fc4"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "HomeBanner",
  __ssrInlineRender: true,
  props: {
    banners: {}
  },
  setup(__props) {
    const isCollapsed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-section" }, _attrs))} data-v-9c4d33ec>`);
      if (isCollapsed.value) {
        _push(`<div class="banner-placeholder-glass" data-v-9c4d33ec><span class="placeholder-text" data-v-9c4d33ec>\u67E5\u770B\u63A8\u8350\u6D3B\u52A8</span>`);
        _push(ssrRenderComponent(unref(arrow_down_default), { class: "icon-down" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="banner-container-3d" data-v-9c4d33ec><div class="banner-glow" data-v-9c4d33ec></div><div class="banner-content card-glass" data-v-9c4d33ec>`);
        if (__props.banners.length > 0) {
          _push(`<div class="banner-carousel" data-v-9c4d33ec><!--[-->`);
          ssrRenderList(__props.banners, (banner) => {
            _push(`<div class="banner-item" data-v-9c4d33ec><img${ssrRenderAttr("src", banner.image)} class="banner-img" data-v-9c4d33ec><div class="banner-overlay" data-v-9c4d33ec></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeBanner.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const HomeBanner = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9c4d33ec"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-scroll-wrapper" }, _attrs))} data-v-c905e5f7><div class="category-scroll no-scrollbar" data-v-c905e5f7><!--[-->`);
      ssrRenderList(__props.categories, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: __props.modelValue === cat.id }, "category-pill"])}" data-v-c905e5f7><span class="pill-text" data-v-c905e5f7>${ssrInterpolate(cat.name)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/home/HomeCategoryNav.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HomeCategoryNav = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c905e5f7"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
        "\u63A8\u8350": "badge-hot",
        "\u9650\u65F6": "badge-new",
        "\u4F18\u60E0": "badge-hot"
      };
      return map[label] || "badge-new";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-row card-glass" }, _attrs))} data-v-6741a9da><div class="goods-thumb" data-v-6741a9da><img${ssrRenderAttr("src", __props.goods.image || __props.goods.coverImage)} loading="lazy" data-v-6741a9da>`);
      if (__props.goods.badge_label && __props.goods.badge_label !== "\u4E0D\u5C55\u793A") {
        _push(`<div class="${ssrRenderClass([getBadgeClass(__props.goods.badge_label), "card-badge"])}" data-v-6741a9da>${ssrInterpolate(__props.goods.badge_label)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="goods-info" data-v-6741a9da><h3 class="goods-title" data-v-6741a9da>${ssrInterpolate(__props.goods.product_name || __props.goods.name || __props.goods.title)}</h3>`);
      if (tags.value.length) {
        _push(`<div class="goods-tags-row" data-v-6741a9da><!--[-->`);
        ssrRenderList(tags.value.slice(0, 2), (tag, idx) => {
          _push(`<span class="tag-item" data-v-6741a9da>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-meta-row" data-v-6741a9da><span class="stat-text" data-v-6741a9da>\u5DF2\u552E ${ssrInterpolate(formatSales(__props.goods.initial_sales || __props.goods.sales || 0))}</span></div><div class="goods-bottom" data-v-6741a9da><div class="goods-price-row" data-v-6741a9da><span class="currency" data-v-6741a9da>\xA5</span><span class="price-val text-price" data-v-6741a9da>${ssrInterpolate(formatPrice(__props.goods.display_price || __props.goods.price))}</span></div><button class="buy-btn btn-primary" data-v-6741a9da> \u8D2D\u4E70 </button></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/ProductCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6741a9da"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductDetailSheet",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    goodsId: {}
  },
  emits: ["update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRouter();
    useCartStore();
    useUserStore();
    const loading = ref(false);
    const goodsInfo = ref({});
    const skus = ref([]);
    const specGroups = ref([]);
    const faqs = ref([]);
    const detailModules = ref([]);
    const selectedSpecs = ref({});
    const qty = ref(1);
    const stock = ref(0);
    const isFavorited = ref(false);
    const showDetailViewer = ref(false);
    const allowAddon = ref(true);
    const matchedSku = computed(() => {
      if (skus.value.length === 0) return null;
      return skus.value.find((sku) => {
        const combination = sku.spec_combination || {};
        return Object.entries(selectedSpecs.value).every(([k, v]) => combination[k] === v);
      });
    });
    const currentPrice = computed(() => {
      var _a;
      return ((_a = matchedSku.value) == null ? void 0 : _a.price) || goodsInfo.value.price || 0;
    });
    const hasStock = computed(() => stock.value > 0);
    const selectedSkuImage = computed(() => {
      var _a;
      return (_a = matchedSku.value) == null ? void 0 : _a.image;
    });
    const formatPrice = (p) => Number(p).toFixed(2);
    const checkSkuAvailability = async (skuId) => {
      try {
        const res = await supabaseProductApi.checkSkuAvailability(skuId);
        stock.value = res.available ? res.availableCount : 0;
      } catch (e) {
        stock.value = 0;
      }
    };
    const fetchData = async (id) => {
      loading.value = true;
      try {
        const res = await goodsApi.getGoodsDetail(id);
        if (res.success && res.data) {
          const d = res.data;
          goodsInfo.value = {
            name: d.product_name || d.title,
            image: d.coverImage || d.image,
            price: d.price
          };
          skus.value = d.skus || [];
          detailModules.value = d.detail_modules || [];
          allowAddon.value = d.allow_addon === true;
          if (skus.value.length > 0) {
            const groups = {};
            skus.value.forEach((s) => {
              const comb = s.spec_combination || {};
              Object.entries(comb).forEach(([k, v]) => {
                if (!groups[k]) groups[k] = /* @__PURE__ */ new Set();
                groups[k].add(v);
              });
            });
            specGroups.value = Object.keys(groups).map((k) => ({ name: k, values: Array.from(groups[k]) }));
            specGroups.value.forEach((g) => {
              if (!selectedSpecs.value[g.name]) selectedSpecs.value[g.name] = g.values[0];
            });
            if (matchedSku.value) await checkSkuAvailability(matchedSku.value.id);
            else if (skus.value[0]) await checkSkuAvailability(skus.value[0].id);
          } else {
            stock.value = Number(d.stock || 0);
          }
        }
        const fRes = await supabaseFaqApi.getFaqsByProduct(id);
        if (fRes.success) faqs.value = fRes.faqs;
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    watch(() => props.visible, (val) => {
      if (val && props.goodsId) fetchData(String(props.goodsId));
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="sheet-wrapper" data-v-aef34db6>`);
        if (__props.visible) {
          _push2(`<div class="sheet-overlay" data-v-aef34db6></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.visible) {
          _push2(`<div class="sheet-panel" data-v-aef34db6><div class="marketing-strip" data-v-aef34db6><div class="ms-item" data-v-aef34db6>`);
          _push2(ssrRenderComponent(unref(circle_check_filled_default), { class: "ms-icon" }, null, _parent));
          _push2(` \u5B98\u65B9\u6B63\u54C1 </div><div class="ms-item" data-v-aef34db6>`);
          _push2(ssrRenderComponent(unref(lightning_default), { class: "ms-icon" }, null, _parent));
          _push2(` \u81EA\u52A8\u53D1\u8D27 </div><div class="ms-item" data-v-aef34db6>`);
          _push2(ssrRenderComponent(unref(umbrella_default), { class: "ms-icon" }, null, _parent));
          _push2(` \u552E\u540E\u65E0\u5FE7 </div></div><div class="sheet-header" data-v-aef34db6><div class="header-left" data-v-aef34db6><div class="thumb-box" data-v-aef34db6><img${ssrRenderAttr("src", selectedSkuImage.value || goodsInfo.value.image)} class="sheet-thumb-img" loading="lazy" data-v-aef34db6></div><div class="info-box" data-v-aef34db6><div class="h-title" data-v-aef34db6>${ssrInterpolate(goodsInfo.value.name || "\u52A0\u8F7D\u4E2D...")}</div><div class="h-price-row" data-v-aef34db6><div class="price-wrap" data-v-aef34db6><span class="cy" data-v-aef34db6>\xA5</span><span class="val" data-v-aef34db6>${ssrInterpolate(formatPrice(currentPrice.value))}</span></div><div class="${ssrRenderClass([{ "no-stock": !hasStock.value }, "stock-tag"])}" data-v-aef34db6>${ssrInterpolate(hasStock.value ? `\u5E93\u5B58: ${stock.value}` : "\u6682\u65F6\u7F3A\u8D27")}</div></div></div></div><button class="detail-btn" data-v-aef34db6><div class="d-icon-circle" data-v-aef34db6>`);
          _push2(ssrRenderComponent(unref(document_default), { class: "d-icon" }, null, _parent));
          _push2(`</div><span data-v-aef34db6>\u56FE\u6587\u8BE6\u60C5</span></button></div><div class="sheet-body" data-v-aef34db6>`);
          if (faqs.value.length > 0) {
            _push2(`<div class="faq-bar" data-v-aef34db6><div class="faq-label" data-v-aef34db6>\u5E38\u89C1\u95EE\u9898</div><div class="faq-text-wrap" data-v-aef34db6><div class="faq-scroll-track" data-v-aef34db6><!--[-->`);
            ssrRenderList(faqs.value, (f, i) => {
              _push2(`<span class="faq-item" data-v-aef34db6>${ssrInterpolate(f.question)}</span>`);
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(faqs.value, (f, i) => {
              _push2(`<span class="faq-item" data-v-aef34db6>${ssrInterpolate(f.question)}</span>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (specGroups.value.length > 0) {
            _push2(`<div class="specs-area" data-v-aef34db6><!--[-->`);
            ssrRenderList(specGroups.value, (group) => {
              _push2(`<div class="spec-row" data-v-aef34db6><div class="s-label" data-v-aef34db6>${ssrInterpolate(group.name)}</div><div class="s-vals" data-v-aef34db6><!--[-->`);
              ssrRenderList(group.values, (val) => {
                _push2(`<div class="${ssrRenderClass(["val-chip", { active: selectedSpecs.value[group.name] === val }])}" data-v-aef34db6>${ssrInterpolate(val)}</div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (matchedSku.value && matchedSku.value.intro) {
            _push2(`<div class="sku-intro-box" data-v-aef34db6>`);
            _push2(ssrRenderComponent(unref(info_filled_default), { class: "info-icon" }, null, _parent));
            _push2(`<span data-v-aef34db6>${ssrInterpolate(matchedSku.value.intro)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (allowAddon.value && hasStock.value) {
            _push2(`<div class="qty-row" data-v-aef34db6><span class="q-label" data-v-aef34db6>\u8D2D\u4E70\u6570\u91CF</span><div class="q-ctrl" data-v-aef34db6><div class="${ssrRenderClass([{ disabled: qty.value <= 1 }, "q-btn"])}" data-v-aef34db6>-</div><div class="q-num" data-v-aef34db6>${ssrInterpolate(qty.value)}</div><div class="${ssrRenderClass([{ disabled: qty.value >= stock.value }, "q-btn"])}" data-v-aef34db6>+</div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="sheet-footer" data-v-aef34db6><div class="icon-btns" data-v-aef34db6><div class="ib-item" data-v-aef34db6>`);
          ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(isFavorited.value ? unref(star_filled_default) : unref(star_default)), {
            class: ["action-icon", { active: isFavorited.value }]
          }, null), _parent);
          _push2(`<span data-v-aef34db6>\u6536\u85CF</span></div><div class="ib-item" data-v-aef34db6>`);
          _push2(ssrRenderComponent(unref(service_default), { class: "action-icon" }, null, _parent));
          _push2(`<span data-v-aef34db6>\u5BA2\u670D</span></div></div><div class="main-btns" data-v-aef34db6>`);
          if (allowAddon.value) {
            _push2(`<button class="btn-cart"${ssrIncludeBooleanAttr(!hasStock.value || loading.value) ? " disabled" : ""} data-v-aef34db6> \u52A0\u5165\u8D2D\u7269\u8F66 </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<button class="btn-buy"${ssrIncludeBooleanAttr(!hasStock.value || loading.value) ? " disabled" : ""} style="${ssrRenderStyle({ flex: allowAddon.value ? 1 : 2 })}" data-v-aef34db6> \u7ACB\u5373\u8D2D\u4E70 </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (showDetailViewer.value) {
          _push2(`<div class="detail-modal-mask" data-v-aef34db6><div class="detail-modal" data-v-aef34db6><div class="dm-header" data-v-aef34db6><span data-v-aef34db6>\u5546\u54C1\u8BE6\u60C5</span><div class="dm-close" data-v-aef34db6>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "close-icon" }, null, _parent));
          _push2(`</div></div><div class="dm-content" data-v-aef34db6>`);
          if (detailModules.value.length === 0) {
            _push2(`<div class="empty-detail" data-v-aef34db6><div class="empty-icon" data-v-aef34db6>\u{1F4E6}</div><span data-v-aef34db6>\u6682\u65E0\u8BE6\u60C5</span></div>`);
          } else {
            _push2(`<!--[-->`);
            ssrRenderList(detailModules.value, (mod, idx) => {
              _push2(`<div class="dm-mod" data-v-aef34db6>`);
              if (mod.type === "image") {
                _push2(`<img${ssrRenderAttr("src", mod.content)} loading="lazy" data-v-aef34db6>`);
              } else if (mod.type === "text") {
                _push2(`<div class="dm-text" data-v-aef34db6>${ssrInterpolate(mod.content)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/ProductDetailSheet.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProductDetailSheet = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-aef34db6"]]);
const COOLDOWN = 60;
const TIMER_KEY = "mobile_auth_timer";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileLoginSheet",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const mode = ref("login");
    const loginType = ref("code");
    const loading = ref(false);
    const loginForm = ref({ email: "", password: "", remember: false, agree: false });
    const loginCodeForm = ref({ email: "", code: "", remember: false, agree: false });
    const registerForm = ref({ email: "", code: "", password: "", inviteId: "", agree: false });
    const codeTimer = ref(0);
    let codeInterval = null;
    const startTimer = (seconds, fresh = true) => {
      codeTimer.value = seconds;
      if (fresh) localStorage.setItem(TIMER_KEY, (Date.now() + seconds * 1e3).toString());
      if (codeInterval) clearInterval(codeInterval);
      codeInterval = setInterval();
    };
    const sendCode = async (type) => {
      if (codeTimer.value > 0) return;
      const email = type === "register" ? registerForm.value.email : loginCodeForm.value.email;
      if (!email) return ElMessage.warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
      loading.value = true;
      try {
        const res = await authApi.getEmailCode(email);
        if (res.success) {
          ElMessage.success("\u53D1\u9001\u6210\u529F");
          startTimer(COOLDOWN);
        } else ElMessage.error(res.msg || "\u53D1\u9001\u5931\u8D25");
      } catch (e) {
        ElMessage.error("\u7F51\u7EDC\u9519\u8BEF");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="login-sheet-wrapper" data-v-f9de8119>`);
        if (__props.visible) {
          _push2(`<div class="sheet-overlay" data-v-f9de8119></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.visible) {
          _push2(`<div class="sheet-panel" data-v-f9de8119><div class="sheet-handle-bar" data-v-f9de8119><div class="sheet-handle" data-v-f9de8119></div></div><div class="sheet-header" data-v-f9de8119><div class="h-title" data-v-f9de8119>Welcome Back (v2)</div><div class="h-sub" data-v-f9de8119>\u767B\u5F55\u60A8\u7684\u51E1\u56FE\u62C9\u8D26\u6237</div><div class="auth-tabs" data-v-f9de8119><div class="${ssrRenderClass([{ active: mode.value === "login" }, "tab-item"])}" data-v-f9de8119>\u767B\u5F55</div><div class="${ssrRenderClass([{ active: mode.value === "register" }, "tab-item"])}" data-v-f9de8119>\u6CE8\u518C</div></div></div><div class="sheet-body" data-v-f9de8119>`);
          if (mode.value === "login") {
            _push2(`<div class="auth-form" data-v-f9de8119><div class="login-type-switch" data-v-f9de8119><span class="${ssrRenderClass({ active: loginType.value === "code" })}" data-v-f9de8119>\u9A8C\u8BC1\u7801</span><span class="${ssrRenderClass({ active: loginType.value === "password" })}" data-v-f9de8119>\u5BC6\u7801</span></div>`);
            if (loginType.value === "password") {
              _push2(`<form data-v-f9de8119><div class="input-group" data-v-f9de8119>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginForm.value.email,
                "onUpdate:modelValue": ($event) => loginForm.value.email = $event,
                required: true,
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
              }, null, _parent));
              _push2(`</div><div class="input-group" data-v-f9de8119><input type="password"${ssrRenderAttr("value", loginForm.value.password)} placeholder="\u8BF7\u8F93\u5165\u5BC6\u7801" required data-v-f9de8119></div><div class="form-options" data-v-f9de8119><label class="checkbox-label" data-v-f9de8119><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.remember) ? ssrLooseContain(loginForm.value.remember, null) : loginForm.value.remember) ? " checked" : ""} data-v-f9de8119> \u8BB0\u4F4F\u6211 </label><span class="forgot-btn" data-v-f9de8119>\u5FD8\u8BB0\u5BC6\u7801?</span></div><div class="form-agreement" data-v-f9de8119><label data-v-f9de8119><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginForm.value.agree) ? ssrLooseContain(loginForm.value.agree, null) : loginForm.value.agree) ? " checked" : ""} data-v-f9de8119><span data-v-f9de8119>\u540C\u610F <span class="link" data-v-f9de8119>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-f9de8119>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !loginForm.value.agree) ? " disabled" : ""} data-v-f9de8119>${ssrInterpolate(loading.value ? "\u767B\u5F55\u4E2D..." : "\u7ACB\u5373\u767B\u5F55")}</button></form>`);
            } else {
              _push2(`<form data-v-f9de8119><div class="input-group" data-v-f9de8119>`);
              _push2(ssrRenderComponent(EmailInput, {
                modelValue: loginCodeForm.value.email,
                "onUpdate:modelValue": ($event) => loginCodeForm.value.email = $event,
                required: true,
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
              }, null, _parent));
              _push2(`</div><div class="input-group code-row" data-v-f9de8119><input type="text"${ssrRenderAttr("value", loginCodeForm.value.code)} placeholder="\u9A8C\u8BC1\u7801" required data-v-f9de8119>`);
              _push2(ssrRenderComponent(SendCodeButton, {
                loading: loading.value,
                countdown: codeTimer.value,
                onClick: ($event) => sendCode("login")
              }, null, _parent));
              _push2(`</div><div class="form-agreement" data-v-f9de8119><label data-v-f9de8119><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(loginCodeForm.value.agree) ? ssrLooseContain(loginCodeForm.value.agree, null) : loginCodeForm.value.agree) ? " checked" : ""} data-v-f9de8119><span data-v-f9de8119>\u540C\u610F <span class="link" data-v-f9de8119>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-f9de8119>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !loginCodeForm.value.agree) ? " disabled" : ""} data-v-f9de8119>${ssrInterpolate(loading.value ? "\u767B\u5F55\u4E2D..." : "\u7ACB\u5373\u767B\u5F55")}</button></form>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<div class="auth-form" data-v-f9de8119><form data-v-f9de8119><div class="input-group" data-v-f9de8119>`);
            _push2(ssrRenderComponent(EmailInput, {
              modelValue: registerForm.value.email,
              "onUpdate:modelValue": ($event) => registerForm.value.email = $event,
              required: true,
              placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
            }, null, _parent));
            _push2(`</div><div class="input-group code-row" data-v-f9de8119><input type="text"${ssrRenderAttr("value", registerForm.value.code)} placeholder="\u9A8C\u8BC1\u7801" required data-v-f9de8119>`);
            _push2(ssrRenderComponent(SendCodeButton, {
              loading: loading.value,
              countdown: codeTimer.value,
              onClick: ($event) => sendCode("register")
            }, null, _parent));
            _push2(`</div><div class="input-group" data-v-f9de8119><input type="password"${ssrRenderAttr("value", registerForm.value.password)} placeholder="\u8BBE\u7F6E\u5BC6\u7801 (\u81F3\u5C116\u4F4D)" required data-v-f9de8119></div><div class="input-group" data-v-f9de8119><input type="text"${ssrRenderAttr("value", registerForm.value.inviteId)} placeholder="\u9080\u8BF7\u7801 (\u9009\u586B)" data-v-f9de8119></div><div class="form-agreement" data-v-f9de8119><label data-v-f9de8119><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(registerForm.value.agree) ? ssrLooseContain(registerForm.value.agree, null) : registerForm.value.agree) ? " checked" : ""} data-v-f9de8119><span data-v-f9de8119>\u540C\u610F <span class="link" data-v-f9de8119>\u7528\u6237\u534F\u8BAE</span> \u548C <span class="link" data-v-f9de8119>\u9690\u79C1\u653F\u7B56</span></span></label></div><button class="submit-btn" type="submit"${ssrIncludeBooleanAttr(loading.value || !registerForm.value.agree) ? " disabled" : ""} data-v-f9de8119>${ssrInterpolate(loading.value ? "\u6CE8\u518C\u4E2D..." : "\u7ACB\u5373\u6CE8\u518C")}</button></form></div>`);
          }
          _push2(`<div class="social-divider" data-v-f9de8119><span data-v-f9de8119>\u6216\u8005</span></div><div class="social-login" data-v-f9de8119><button class="google-btn" data-v-f9de8119><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" data-v-f9de8119><span data-v-f9de8119>Google</span></button><button class="wechat-btn" data-v-f9de8119><svg class="wechat-icon" viewBox="0 0 24 24" width="22" height="22" data-v-f9de8119><path fill="#07C160" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.023-.118-.04-.177l-.325-1.233a.49.49 0 0 1 .177-.554c1.525-1.122 2.502-2.779 2.502-4.608-.001-3.248-2.913-5.935-7.061-6.135zm-2.344 3.363c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982zm4.726 0c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982z" data-v-f9de8119></path></svg><span data-v-f9de8119>\u5FAE\u4FE1</span></button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/auth/MobileLoginSheet.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileLoginSheet = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f9de8119"]]);
const PAGE_SIZE = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-home-page" }, _attrs))} data-v-e2416433>`);
      _push(ssrRenderComponent(HomeHeader, {
        "is-scrolled": isScrolled.value,
        onOpenLogin: ($event) => showLoginSheet.value = true
      }, null, _parent));
      _push(`<div class="content-scroll no-scrollbar" data-v-e2416433>`);
      _push(ssrRenderComponent(HomeBanner, { banners: banners.value }, null, _parent));
      _push(ssrRenderComponent(HomeCategoryNav, {
        categories: categories.value,
        modelValue: activeCategoryId.value,
        "onUpdate:modelValue": ($event) => activeCategoryId.value = $event,
        onChange: handleCategoryChange
      }, null, _parent));
      _push(`<div class="goods-list-section" data-v-e2416433>`);
      if (goodsLoading.value && currentGoods.value.length === 0) {
        _push(`<div class="loading-state" data-v-e2416433><div class="spinner-premium" data-v-e2416433></div><span data-v-e2416433>\u6B63\u5728\u52A0\u8F7D\u597D\u7269...</span></div>`);
      } else if (currentGoods.value.length === 0) {
        _push(`<div class="empty-state" data-v-e2416433><div class="empty-icon" data-v-e2416433>\u{1F4E6}</div><p data-v-e2416433>\u6682\u65E0\u76F8\u5173\u5546\u54C1</p></div>`);
      } else {
        _push(`<div class="goods-list" data-v-e2416433><!--[-->`);
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
        _push(`<div class="load-more-trigger" data-v-e2416433>`);
        if (isLoadingMore.value) {
          _push(`<div class="loading-more" data-v-e2416433><div class="spinner-mini" data-v-e2416433></div> \u52A0\u8F7D\u66F4\u591A... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!hasMore.value && currentGoods.value.length > 0) {
        _push(`<div class="no-more-data" data-v-e2416433> - \u5230\u5E95\u4E86 - </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="tab-bar-spacer" data-v-e2416433></div></div>`);
      _push(ssrRenderComponent(ProductDetailSheet, {
        visible: showDetailSheet.value,
        "onUpdate:visible": ($event) => showDetailSheet.value = $event,
        "goods-id": selectedGoodsId.value
      }, null, _parent));
      _push(ssrRenderComponent(MobileLoginSheet, {
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2416433"]]);

export { index as default };
//# sourceMappingURL=index-0ZyYWWMo.mjs.map
