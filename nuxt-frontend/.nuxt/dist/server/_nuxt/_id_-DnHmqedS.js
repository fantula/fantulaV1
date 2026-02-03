import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElImage } from "./index-BB-fMy6o.js";
import { _ as __nuxt_component_2 } from "./LoginRegisterModal-CQuqnDUY.js";
/* empty css              */
/* empty css                         */
/* empty css                    */
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { h as arrow_left_default, M as question_filled_default, i as info_filled_default, af as star_filled_default, W as star_default } from "./index-4qszPKX4.js";
import { useRouter } from "vue-router";
import { u as useProductDetail } from "./useProductDetail-CFvz_UKi.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
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
      goodsInfo,
      currentPrice,
      hasStock,
      stockLoading,
      faqs,
      hasSkus,
      specGroups,
      selectedSpecs,
      handleSpecSelect,
      matchedSku,
      detailModules,
      selectedSkuImage,
      formatPrice,
      buyNow,
      addToCart,
      toggleFavorite,
      isFavorited,
      initClientState,
      modal
    } = ([__temp, __restore] = withAsyncContext(() => useProductDetail()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_image = ElImage;
      const _component_LoginRegisterModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-goods-detail" }, _attrs))} data-v-e35190b3><div class="bg-layer" data-v-e35190b3><img${ssrRenderAttr("src", unref(goodsInfo).image)} class="bg-img" data-v-e35190b3><div class="bg-overlay" data-v-e35190b3></div></div><div class="nav-header" data-v-e35190b3><div class="back-btn" data-v-e35190b3>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(arrow_left_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(arrow_left_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="page-title" data-v-e35190b3>商品详情</div><div class="share-btn" data-v-e35190b3></div></div><div class="content-sheet" data-v-e35190b3><div class="sheet-header" data-v-e35190b3><div class="product-thumb" data-v-e35190b3>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: unref(selectedSkuImage) || unref(goodsInfo).image,
        fit: "cover",
        class: "thumb-img",
        "preview-src-list": [unref(selectedSkuImage) || unref(goodsInfo).image],
        "initial-index": 0
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="loading-placeholder" data-v-e35190b3${_scopeId}>...</div>`);
          } else {
            return [
              createVNode("div", { class: "loading-placeholder" }, "...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="product-info-col" data-v-e35190b3><h1 class="m-product-title" data-v-e35190b3>${ssrInterpolate(unref(goodsInfo).name)}</h1><div class="m-price-row" data-v-e35190b3><span class="currency" data-v-e35190b3>¥</span><span class="price-val" data-v-e35190b3>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="m-sales-row" data-v-e35190b3><span class="sales-tag" data-v-e35190b3>销量 ${ssrInterpolate(unref(goodsInfo).sales)}</span>`);
      if (unref(hasStock)) {
        _push(`<span class="stock-tag" data-v-e35190b3>库存充足</span>`);
      } else {
        _push(`<span class="stock-tag out" data-v-e35190b3>暂时缺货</span>`);
      }
      _push(`</div></div></div>`);
      if (unref(faqs).length > 0) {
        _push(`<div class="faq-section" data-v-e35190b3><div class="faq-icon" data-v-e35190b3>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(question_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(question_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="faq-content" data-v-e35190b3><div class="marquee-track" data-v-e35190b3><!--[-->`);
        ssrRenderList(unref(faqs), (faq, i) => {
          _push(`<span class="faq-item" data-v-e35190b3><span class="q-tag" data-v-e35190b3>问</span> ${ssrInterpolate(faq.question)}</span>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(unref(faqs), (faq, i) => {
          _push(`<span class="faq-item" data-v-e35190b3><span class="q-tag" data-v-e35190b3>问</span> ${ssrInterpolate(faq.question)}</span>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasSkus)) {
        _push(`<div class="sku-section" data-v-e35190b3><!--[-->`);
        ssrRenderList(unref(specGroups), (group) => {
          _push(`<div class="spec-group" data-v-e35190b3><div class="group-title" data-v-e35190b3>${ssrInterpolate(group.name)}</div><div class="spec-options" data-v-e35190b3><!--[-->`);
          ssrRenderList(group.values, (val) => {
            _push(`<div class="${ssrRenderClass(["spec-chip", { active: unref(selectedSpecs)[group.name] === val }])}" data-v-e35190b3>${ssrInterpolate(val)}</div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="no-sku-state" data-v-e35190b3> 商品规格加载中... </div>`);
      }
      if (unref(matchedSku)?.intro) {
        _push(`<div class="sku-intro" data-v-e35190b3><div class="intro-box" data-v-e35190b3>`);
        _push(ssrRenderComponent(_component_el_icon, { class: "info-icon" }, {
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
        _push(`<div class="intro-text" data-v-e35190b3>${ssrInterpolate(unref(matchedSku).intro)}</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="detail-content" data-v-e35190b3><div class="detail-divider" data-v-e35190b3>—— 商品详情 ——</div><!--[-->`);
      ssrRenderList(unref(detailModules), (mod, idx) => {
        _push(`<div class="m-detail-mod" data-v-e35190b3>`);
        if (mod.type === "text") {
          _push(`<div class="m-text-mod" data-v-e35190b3>${ssrInterpolate(mod.content)}</div>`);
        } else if (mod.type === "image") {
          _push(`<img${ssrRenderAttr("src", mod.content)} class="m-img-mod" loading="lazy" data-v-e35190b3>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="bottom-spacer" data-v-e35190b3></div></div><div class="bottom-action-bar" data-v-e35190b3><div class="icon-actions" data-v-e35190b3><div class="action-item" data-v-e35190b3>`);
      _push(ssrRenderComponent(_component_el_icon, {
        class: { active: unref(isFavorited) }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isFavorited)) {
              _push2(ssrRenderComponent(unref(star_filled_default), null, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(star_default), null, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(isFavorited) ? (openBlock(), createBlock(unref(star_filled_default), { key: 0 })) : (openBlock(), createBlock(unref(star_default), { key: 1 }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span data-v-e35190b3>收藏</span></div></div><div class="btn-actions" data-v-e35190b3><button class="m-btn cart" data-v-e35190b3>加入购物车</button><button class="m-btn buy" data-v-e35190b3>立即购买</button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/goods/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e35190b3"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DnHmqedS.js.map
