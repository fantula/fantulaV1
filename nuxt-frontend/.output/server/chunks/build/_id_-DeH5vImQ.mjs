import { E as ElImage } from './index-BB-fMy6o.mjs';
import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { _ as __nuxt_component_2 } from './LoginRegisterModal-CQuqnDUY.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { q as circle_check_default, ag as right_default, ae as shopping_cart_default, W as star_default, af as star_filled_default, i as info_filled_default } from './index-4qszPKX4.mjs';
import { useRouter } from 'vue-router';
import { u as useProductDetail } from './useProductDetail-CFvz_UKi.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import './typescript-D6L75muK.mjs';
import '@vueuse/core';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-DBQY6eQ6.mjs';
import './index-ebnaz0b7.mjs';
import './scroll-Df9VGR5S.mjs';
import './raf-CQRaPAjg.mjs';
import './objects-Bz74KHmq.mjs';
import './index-D2CY7Ok3.mjs';
import './nuxt-link-DErVm1dK.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './auth-BCuS92ob.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
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
import './SendCodeButton-Bt2-2zIY.mjs';
import './BaseButton-B3srPw2H.mjs';
import './interval-BHZX8LlC.mjs';
import './index-CJUZrfXE.mjs';
import './icon-BcxG_YvU.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './index-CO6H4Lsj.mjs';
import './goods-DQk19w4f.mjs';
import './request-n20yf-Kr.mjs';
import './supabase-fcLPkUp1.mjs';
import './modal-HUsR3oCs.mjs';
import './user-CzJGyf4T.mjs';
import './common-DNRu9xdu.mjs';
import './cart-D8FaBhjU.mjs';
import 'perfect-debounce';
import './index-Daa9EAVW.mjs';
import './index-B9iQGHXi.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-6YP9MNcL.mjs';
import './event-BZTOGHfp.mjs';
import './index-DqrhOzxH.mjs';
import './index-NMCQtDk_.mjs';
import './vnode-C7bAOlXh.mjs';
import './validator-CGHVIElq.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
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
      formatPrice,
      handleSpecSelect,
      buyNow,
      addToCart,
      isFavorited,
      toggleFavorite,
      initClientState,
      modal
    } = ([__temp, __restore] = withAsyncContext(() => useProductDetail()), __temp = await __temp, __restore(), __temp);
    const serviceTags = [
      "\u5B98\u65B9\u91C7\u8D2D\u30FB\u6B63\u54C1\u4FDD\u969C",
      "\u5168\u7A0B\u8D28\u4FDD\u30FB\u65E0\u5FE7\u552E\u540E",
      "\u6781\u901F\u54CD\u5E94\u30FB\u4EBA\u5DE5\u670D\u52A1",
      "\u5B89\u5168\u52A0\u5BC6\u30FB\u9690\u79C1\u4FDD\u62A4"
    ];
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_LoginRegisterModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-f843e637><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-f843e637></div>`);
      if (unref(goodsError)) {
        _push(`<div class="api-warning-bar" data-v-f843e637> \u26A0\uFE0F \u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38\uFF0C\u6B63\u5728\u9884\u89C8\u6F14\u793A\u6570\u636E </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-content" data-v-f843e637><div class="back-btn-row" data-v-f843e637><button class="back-btn" data-v-f843e637><span class="back-btn-icon" data-v-f843e637><svg width="20" height="20" viewBox="0 0 32 32" fill="none" style="${ssrRenderStyle({ "display": "block" })}" data-v-f843e637><path d="M18.5 10L13 16L18.5 22" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-f843e637></path></svg></span><span class="back-btn-text" data-v-f843e637>\u8FD4\u56DE\u4E0A\u4E00\u9875</span></button></div><div class="goods-detail-content" data-v-f843e637><div class="goods-main-section" data-v-f843e637><div class="goods-left-panel" data-v-f843e637><div class="main-image-wrapper" data-v-f843e637><div class="main-image" data-v-f843e637>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: unref(selectedSkuImage) || unref(goodsInfo).image,
        fit: "contain",
        class: "sku-big-img"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-loading-placeholder" data-v-f843e637${_scopeId}>\u52A0\u8F7D\u4E2D...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "\u52A0\u8F7D\u4E2D...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(skuImages) && unref(skuImages).length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-f843e637><!--[-->`);
        ssrRenderList(unref(skuImages), (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: unref(selectedSkuImage) === img }])}" data-v-f843e637><img${ssrRenderAttr("src", img)} alt="SKU\u56FE\u7247" data-v-f843e637></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-f843e637><div class="premium-service-title" data-v-f843e637>\u670D\u52A1\u4FDD\u969C</div><div class="premium-service-grid" data-v-f843e637><!--[-->`);
      ssrRenderList(serviceTags, (tag) => {
        _push(`<div class="p-service-item" data-v-f843e637>`);
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
        _push(`<span data-v-f843e637>${ssrInterpolate(tag)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="goods-info-panel" data-v-f843e637><div class="info-header" data-v-f843e637><h1 class="product-name" data-v-f843e637>${ssrInterpolate(unref(goodsInfo).name)}</h1><div class="product-sales-badge" data-v-f843e637> \u7D2F\u8BA1\u9500\u91CF <span data-v-f843e637>${ssrInterpolate(unref(goodsInfo).sales)}</span></div></div>`);
      if (unref(faqs).length > 0) {
        _push(`<div class="faq-ticker-bar" data-v-f843e637><div class="faq-ticker-container" data-v-f843e637><div class="faq-ticker-track" style="${ssrRenderStyle(tickerStyle.value)}" data-v-f843e637><!--[-->`);
        ssrRenderList(displayFaqs.value, (faq, idx) => {
          _push(`<div class="faq-ticker-item" data-v-f843e637>${ssrInterpolate(faq.question)}</div>`);
        });
        _push(`<!--]--></div></div><div class="faq-arrow-wrap" data-v-f843e637>`);
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
      if (unref(hasSkus)) {
        _push(`<div class="spec-selection-area" data-v-f843e637><!--[-->`);
        ssrRenderList(unref(specGroups), (specGroup) => {
          _push(`<div class="spec-group" data-v-f843e637><div class="spec-label" data-v-f843e637>${ssrInterpolate(specGroup.name)}</div><div class="spec-values" data-v-f843e637><!--[-->`);
          ssrRenderList(specGroup.values, (val) => {
            _push(`<div class="${ssrRenderClass(["spec-val-btn", { active: unref(selectedSpecs)[specGroup.name] === val }])}" data-v-f843e637>${ssrInterpolate(val)}</div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="no-sku-notice" data-v-f843e637><div class="notice-emoji" data-v-f843e637>\u{1F4E6}\u2728</div><h3 data-v-f843e637>\u6211\u6B63\u5728\u7591\u72C2\u8865\u8D27\u4E2D\uFF01</h3><p data-v-f843e637>\u5546\u54C1\u6B63\u5728\u51C6\u5907\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u518D\u6765\u6216\u8054\u7CFB\u5BA2\u670D\u4E86\u89E3\u66F4\u591A~</p></div>`);
      }
      if ((_a = unref(matchedSku)) == null ? void 0 : _a.intro) {
        _push(`<div class="sku-intro-section" data-v-f843e637><span class="sku-intro-text" data-v-f843e637>${ssrInterpolate(unref(matchedSku).intro)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="price-display-section compact-price-area" data-v-f843e637>`);
      if (unref(hasSkus)) {
        _push(`<!--[--><div class="price-stock-row" data-v-f843e637><div class="current-price-box" data-v-f843e637><span class="p-amount" data-v-f843e637>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="stock-info" data-v-f843e637>`);
        if (unref(stockLoading)) {
          _push(`<span class="stock-badge loading" data-v-f843e637>\u67E5\u8BE2\u4E2D...</span>`);
        } else if (unref(hasStock)) {
          _push(`<span class="stock-badge" data-v-f843e637>\u5E93\u5B58: ${ssrInterpolate(unref(stock))}</span>`);
        } else {
          _push(`<span class="stock-badge out-of-stock" data-v-f843e637>\u6682\u65F6\u7F3A\u8D27</span>`);
        }
        _push(`</div></div>`);
        if (unref(allowAddon) && unref(hasStock)) {
          _push(`<div class="qty-control" data-v-f843e637><div class="q-actions" data-v-f843e637><button${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-f843e637>-</button><input type="number"${ssrRenderAttr("value", unref(qty))} min="1"${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-f843e637><button${ssrIncludeBooleanAttr(!unref(hasStock) || unref(qty) >= unref(stock)) ? " disabled" : ""} data-v-f843e637>+</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="no-price-notice" data-v-f843e637><span class="out-of-stock-large" data-v-f843e637>\u6682\u65F6\u7F3A\u8D27</span></div>`);
      }
      _push(`</div><div class="main-actions" data-v-f843e637><button class="primary-buy-btn"${ssrIncludeBooleanAttr(unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting)) ? " disabled" : ""} data-v-f843e637>${ssrInterpolate(unref(stockLoading) ? "\u52A0\u8F7D\u4E2D..." : unref(hasSkus) && unref(hasStock) ? "\u7ACB\u5373\u6781\u901F\u8D2D\u4E70" : "\u6682\u65F6\u7F3A\u8D27")} `);
      if (!unref(stockLoading) && unref(hasStock) && unref(hasSkus)) {
        _push(`<span class="btn-subtext" data-v-f843e637>\u5B89\u5168\u5408\u89C4\xB7\u79D2\u901F\u53D1\u8D27</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="secondary-btns" data-v-f843e637><button class="add-cart-btn"${ssrIncludeBooleanAttr(unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting)) ? " disabled" : ""} data-v-f843e637>`);
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
      _push(` \u52A0\u5165\u8D2D\u7269\u8F66 </button><button class="${ssrRenderClass(["favorite-btn", { favorited: unref(isFavorited) }])}"${ssrIncludeBooleanAttr(unref(stockLoading) || !unref(hasStock) || !unref(hasSkus)) ? " disabled" : ""} data-v-f843e637>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(isFavorited)) {
              _push2(ssrRenderComponent(unref(star_default), null, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(star_filled_default), null, null, _parent2, _scopeId));
            }
          } else {
            return [
              !unref(isFavorited) ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(unref(isFavorited) ? "\u5DF2\u6536\u85CF" : "\u6536\u85CF\u5546\u54C1")}</button></div></div><div class="safe-disclaimer" data-v-f843e637>`);
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
      _push(` \u7248\u6743\u58F0\u660E\uFF1A\u672C\u7AD9\u5C55\u793A\u7684\u5FBD\u6807\u3001\u5546\u6807\u53CA\u76F8\u5173\u6807\u5FD7\u5F52\u5404\u6743\u5229\u4EBA\u6240\u6709\u3002 </div></div></div></div><div class="product-detail-rich" data-v-f843e637><div class="detail-divider" data-v-f843e637><span data-v-f843e637>\u5546\u54C1\u8BE6\u60C5\u4ECB\u7ECD</span></div><div class="detail-content-wrap" data-v-f843e637><!--[-->`);
      ssrRenderList(unref(detailModules), (mod, idx) => {
        _push(`<div class="detail-module" data-v-f843e637>`);
        if (mod.type === "text") {
          _push(`<div class="detail-text-box" data-v-f843e637>${ssrInterpolate(mod.content)}</div>`);
        } else if (mod.type === "image") {
          _push(`<img${ssrRenderAttr("src", mod.content)} class="detail-full-img" loading="lazy" data-v-f843e637>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/goods/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f843e637"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DeH5vImQ.mjs.map
