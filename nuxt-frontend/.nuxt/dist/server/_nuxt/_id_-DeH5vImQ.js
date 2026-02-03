import { E as ElImage } from "./index-BB-fMy6o.js";
import { E as ElIcon } from "./index-Byc6LUYX.js";
import { _ as __nuxt_component_2 } from "./LoginRegisterModal-CQuqnDUY.js";
/* empty css              */
/* empty css                         */
/* empty css                    */
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { a as circle_check_default, ag as right_default, ae as shopping_cart_default, W as star_default, af as star_filled_default, i as info_filled_default } from "./index-4qszPKX4.js";
import { useRouter } from "vue-router";
import { u as useProductDetail } from "./useProductDetail-CFvz_UKi.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "./typescript-D6L75muK.js";
import "@vueuse/core";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./objects-Bz74KHmq.js";
import "./index-D2CY7Ok3.js";
import "./nuxt-link-DErVm1dK.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "./auth-BCuS92ob.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
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
import "./SendCodeButton-Bt2-2zIY.js";
import "./BaseButton-B3srPw2H.js";
import "./interval-BHZX8LlC.js";
import "./index-CJUZrfXE.js";
import "./icon-BcxG_YvU.js";
import "./use-global-config-BPKjMkzA.js";
import "./index-CO6H4Lsj.js";
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import "./goods-DQk19w4f.js";
import "./request-n20yf-Kr.js";
import "./supabase-fcLPkUp1.js";
import "./modal-HUsR3oCs.js";
import "./user-CzJGyf4T.js";
import "./common-DNRu9xdu.js";
import "./cart-D8FaBhjU.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "./index-Daa9EAVW.js";
import "./index-B9iQGHXi.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-6YP9MNcL.js";
import "./event-BZTOGHfp.js";
import "./index-DqrhOzxH.js";
import "./index-NMCQtDk_.js";
import "./vnode-C7bAOlXh.js";
import "./validator-CGHVIElq.js";
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
      "官方采购・正品保障",
      "全程质保・无忧售后",
      "极速响应・人工服务",
      "安全加密・隐私保护"
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
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_LoginRegisterModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-f843e637><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-f843e637></div>`);
      if (unref(goodsError)) {
        _push(`<div class="api-warning-bar" data-v-f843e637> ⚠️ 网络连接异常，正在预览演示数据 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-content" data-v-f843e637><div class="back-btn-row" data-v-f843e637><button class="back-btn" data-v-f843e637><span class="back-btn-icon" data-v-f843e637><svg width="20" height="20" viewBox="0 0 32 32" fill="none" style="${ssrRenderStyle({ "display": "block" })}" data-v-f843e637><path d="M18.5 10L13 16L18.5 22" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-f843e637></path></svg></span><span class="back-btn-text" data-v-f843e637>返回上一页</span></button></div><div class="goods-detail-content" data-v-f843e637><div class="goods-main-section" data-v-f843e637><div class="goods-left-panel" data-v-f843e637><div class="main-image-wrapper" data-v-f843e637><div class="main-image" data-v-f843e637>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: unref(selectedSkuImage) || unref(goodsInfo).image,
        fit: "contain",
        class: "sku-big-img"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-loading-placeholder" data-v-f843e637${_scopeId}>加载中...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "加载中...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(skuImages) && unref(skuImages).length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-f843e637><!--[-->`);
        ssrRenderList(unref(skuImages), (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: unref(selectedSkuImage) === img }])}" data-v-f843e637><img${ssrRenderAttr("src", img)} alt="SKU图片" data-v-f843e637></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-f843e637><div class="premium-service-title" data-v-f843e637>服务保障</div><div class="premium-service-grid" data-v-f843e637><!--[-->`);
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
      _push(`<!--]--></div></div></div><div class="goods-info-panel" data-v-f843e637><div class="info-header" data-v-f843e637><h1 class="product-name" data-v-f843e637>${ssrInterpolate(unref(goodsInfo).name)}</h1><div class="product-sales-badge" data-v-f843e637> 累计销量 <span data-v-f843e637>${ssrInterpolate(unref(goodsInfo).sales)}</span></div></div>`);
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
        _push(`<div class="no-sku-notice" data-v-f843e637><div class="notice-emoji" data-v-f843e637>📦✨</div><h3 data-v-f843e637>我正在疑狂补货中！</h3><p data-v-f843e637>商品正在准备中，请稍后再来或联系客服了解更多~</p></div>`);
      }
      if (unref(matchedSku)?.intro) {
        _push(`<div class="sku-intro-section" data-v-f843e637><span class="sku-intro-text" data-v-f843e637>${ssrInterpolate(unref(matchedSku).intro)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="price-display-section compact-price-area" data-v-f843e637>`);
      if (unref(hasSkus)) {
        _push(`<!--[--><div class="price-stock-row" data-v-f843e637><div class="current-price-box" data-v-f843e637><span class="p-amount" data-v-f843e637>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="stock-info" data-v-f843e637>`);
        if (unref(stockLoading)) {
          _push(`<span class="stock-badge loading" data-v-f843e637>查询中...</span>`);
        } else if (unref(hasStock)) {
          _push(`<span class="stock-badge" data-v-f843e637>库存: ${ssrInterpolate(unref(stock))}</span>`);
        } else {
          _push(`<span class="stock-badge out-of-stock" data-v-f843e637>暂时缺货</span>`);
        }
        _push(`</div></div>`);
        if (unref(allowAddon) && unref(hasStock)) {
          _push(`<div class="qty-control" data-v-f843e637><div class="q-actions" data-v-f843e637><button${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-f843e637>-</button><input type="number"${ssrRenderAttr("value", unref(qty))} min="1"${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-f843e637><button${ssrIncludeBooleanAttr(!unref(hasStock) || unref(qty) >= unref(stock)) ? " disabled" : ""} data-v-f843e637>+</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="no-price-notice" data-v-f843e637><span class="out-of-stock-large" data-v-f843e637>暂时缺货</span></div>`);
      }
      _push(`</div><div class="main-actions" data-v-f843e637><button class="primary-buy-btn"${ssrIncludeBooleanAttr(unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting)) ? " disabled" : ""} data-v-f843e637>${ssrInterpolate(unref(stockLoading) ? "加载中..." : unref(hasSkus) && unref(hasStock) ? "立即极速购买" : "暂时缺货")} `);
      if (!unref(stockLoading) && unref(hasStock) && unref(hasSkus)) {
        _push(`<span class="btn-subtext" data-v-f843e637>安全合规·秒速发货</span>`);
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
      _push(` 加入购物车 </button><button class="${ssrRenderClass(["favorite-btn", { favorited: unref(isFavorited) }])}"${ssrIncludeBooleanAttr(unref(stockLoading) || !unref(hasStock) || !unref(hasSkus)) ? " disabled" : ""} data-v-f843e637>`);
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
      _push(` ${ssrInterpolate(unref(isFavorited) ? "已收藏" : "收藏商品")}</button></div></div><div class="safe-disclaimer" data-v-f843e637>`);
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
      _push(` 版权声明：本站展示的徽标、商标及相关标志归各权利人所有。 </div></div></div></div><div class="product-detail-rich" data-v-f843e637><div class="detail-divider" data-v-f843e637><span data-v-f843e637>商品详情介绍</span></div><div class="detail-content-wrap" data-v-f843e637><!--[-->`);
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DeH5vImQ.js.map
