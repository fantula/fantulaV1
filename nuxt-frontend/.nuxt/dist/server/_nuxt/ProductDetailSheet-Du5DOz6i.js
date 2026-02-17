import { E as ElIcon } from "./index-C4aUwruK.js";
import { a as ElSkeletonItem } from "./index-BSkMD3ma.js";
/* empty css              */
/* empty css                          */
import { defineComponent, toRef, ref, computed, watch, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { h as circle_check_filled_default, X as lightning_default, am as umbrella_default, al as question_filled_default, f as arrow_right_default, i as info_filled_default, a0 as star_filled_default, F as star_default, b as close_default } from "./index-CCIZH4aC.js";
import { useCartStore } from "./cart-Lqo8L2Wc.js";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import { u as useNotify } from "./useNotify-Bx9I1ZGd.js";
import { u as useProductDetail } from "./useProductDetail-C-dWeqGo.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { s as setInterval } from "./interval-BnEBQU8I.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./common-CeIxTI3I.js";
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
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-CIurcsSv.js";
import "./typescript-D6L75muK.js";
import "./icon-CadSVx0p.js";
import "./use-global-config-CaR6i8cb.js";
import "./index-C1njJNPQ.js";
import "./event-D3FEo2C5.js";
import "./goods-BXDiUgaK.js";
import "./supabase-D4dCvdwD.js";
import "./modal-CBJJqDui.js";
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
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
    useNotify();
    const {
      // State
      pending,
      // Replaces loading
      goodsInfo,
      specGroups,
      faqs,
      // Computed from fallback + fetch
      detailModules,
      allowAddon,
      // Interactive State
      qty,
      stock,
      selectedSpecs,
      selectedSkuImage,
      isFavorited,
      // Computed
      currentPrice,
      hasStock,
      matchedSku,
      // used for stock check
      // Methods
      formatPrice,
      initClientState
    } = useProductDetail(toRef(props, "goodsId"));
    const showDetailViewer = ref(false);
    const activeFaqIndex = ref(0);
    const isTransitioning = ref(true);
    let faqTimer = null;
    const displayFaqs = computed(() => {
      if (faqs.value.length === 0) return [];
      return [...faqs.value, faqs.value[0]];
    });
    const trackStyle = computed(() => ({
      transform: `translateY(-${activeFaqIndex.value * 100}%)`,
      transition: isTransitioning.value ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
    }));
    const startFaqTicker = () => {
      if (faqTimer) clearInterval(faqTimer);
      faqTimer = setInterval();
    };
    watch(() => faqs.value, () => startFaqTicker());
    watch(() => props.visible, async (val) => {
      if (val && props.goodsId) {
        await initClientState();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_skeleton_item = ElSkeletonItem;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="sheet-wrapper" data-v-96760cd5>`);
        if (__props.visible) {
          _push2(`<div class="sheet-overlay" data-v-96760cd5></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.visible) {
          _push2(`<div class="sheet-panel aurora-sheet-panel" data-v-96760cd5><div class="marketing-strip-glass" data-v-96760cd5><div class="ms-item" data-v-96760cd5>`);
          _push2(ssrRenderComponent(_component_el_icon, { class: "ms-icon-gold" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(circle_check_filled_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(circle_check_filled_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(` 官方正品保证 </div><div class="ms-divider" data-v-96760cd5></div><div class="ms-item" data-v-96760cd5>`);
          _push2(ssrRenderComponent(_component_el_icon, { class: "ms-icon-blue" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(lightning_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(lightning_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(` 24h自动发货 </div><div class="ms-divider" data-v-96760cd5></div><div class="ms-item" data-v-96760cd5>`);
          _push2(ssrRenderComponent(_component_el_icon, { class: "ms-icon-purple" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(unref(umbrella_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(umbrella_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(` 售后无忧 </div></div><div class="sheet-header" data-v-96760cd5>`);
          if (unref(pending)) {
            _push2(`<div style="${ssrRenderStyle({ "width": "100%", "display": "flex", "gap": "12px" })}" data-v-96760cd5>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "88px", "height": "88px", "border-radius": "12px" }
            }, null, _parent));
            _push2(`<div style="${ssrRenderStyle({ "flex": "1", "padding-top": "4px" })}" data-v-96760cd5>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h3",
              style: { "width": "80%", "margin-bottom": "8px" }
            }, null, _parent));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "h3",
              style: { "width": "40%" }
            }, null, _parent));
            _push2(`</div></div>`);
          } else {
            _push2(`<div class="header-left" data-v-96760cd5><div class="thumb-box" data-v-96760cd5><img${ssrRenderAttr("src", unref(selectedSkuImage) || unref(goodsInfo).image)} class="sheet-thumb-img" loading="lazy" decoding="async" data-v-96760cd5></div><div class="info-box" data-v-96760cd5><div class="h-title" data-v-96760cd5>${ssrInterpolate(unref(goodsInfo).name || "加载中...")}</div><div class="h-price-row" data-v-96760cd5><div class="price-wrap" data-v-96760cd5><span class="cy" data-v-96760cd5>¥</span><span class="val" data-v-96760cd5>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="${ssrRenderClass([{ "no-stock": !unref(hasStock) }, "stock-tag"])}" data-v-96760cd5>${ssrInterpolate(unref(hasStock) ? `库存: ${unref(stock)}` : "暂时缺货")}</div></div></div></div>`);
          }
          if (!unref(pending)) {
            _push2(`<button class="help-btn" data-v-96760cd5>`);
            _push2(ssrRenderComponent(_component_el_icon, { class: "h-icon" }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(question_filled_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(question_filled_default))
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`<span data-v-96760cd5>显示帮助</span></button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="sheet-body" data-v-96760cd5>`);
          if (unref(pending)) {
            _push2(`<div data-v-96760cd5>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "rect",
              style: { "width": "100%", "height": "40px", "border-radius": "20px", "margin-bottom": "20px" }
            }, null, _parent));
            _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "20px" })}" data-v-96760cd5>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "40px", "margin-bottom": "10px" }
            }, null, _parent));
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}" data-v-96760cd5>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "button",
              style: { "width": "60px", "height": "32px", "border-radius": "8px" }
            }, null, _parent));
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "button",
              style: { "width": "60px", "height": "32px", "border-radius": "8px" }
            }, null, _parent));
            _push2(`</div></div></div>`);
          } else {
            _push2(`<!--[-->`);
            if (unref(faqs).length > 0) {
              _push2(`<div class="faq-sticker-pill" data-v-96760cd5><div class="faq-pill-text-wrap" data-v-96760cd5><div class="faq-pill-track" style="${ssrRenderStyle(trackStyle.value)}" data-v-96760cd5><!--[-->`);
              ssrRenderList(displayFaqs.value, (f, i) => {
                _push2(`<div class="faq-pill-item" data-v-96760cd5>${ssrInterpolate(f.question)}</div>`);
              });
              _push2(`<!--]--></div></div>`);
              _push2(ssrRenderComponent(_component_el_icon, { class: "faq-arrow" }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
                  } else {
                    return [
                      createVNode(unref(arrow_right_default))
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(specGroups).length > 0) {
              _push2(`<div class="specs-area" data-v-96760cd5><!--[-->`);
              ssrRenderList(unref(specGroups), (group) => {
                _push2(`<div class="spec-row" data-v-96760cd5><div class="s-label" data-v-96760cd5>${ssrInterpolate(group.name)}</div><div class="s-vals" data-v-96760cd5><!--[-->`);
                ssrRenderList(group.values, (val) => {
                  _push2(`<div class="${ssrRenderClass(["val-chip", { active: unref(selectedSpecs)[group.name] === val }])}" data-v-96760cd5>${ssrInterpolate(val)}</div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(matchedSku) && unref(matchedSku).intro) {
              _push2(`<div class="sku-intro-box" data-v-96760cd5>`);
              _push2(ssrRenderComponent(unref(info_filled_default), { class: "info-icon" }, null, _parent));
              _push2(`<span data-v-96760cd5>${ssrInterpolate(unref(matchedSku).intro)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(allowAddon) && unref(hasStock)) {
              _push2(`<div class="qty-row" data-v-96760cd5><span class="q-label" data-v-96760cd5>购买数量</span><div class="q-ctrl" data-v-96760cd5><div class="${ssrRenderClass([{ disabled: unref(qty) <= 1 }, "q-btn"])}" data-v-96760cd5>-</div><div class="q-num" data-v-96760cd5>${ssrInterpolate(unref(qty))}</div><div class="${ssrRenderClass([{ disabled: unref(qty) >= unref(stock) }, "q-btn"])}" data-v-96760cd5>+</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          }
          _push2(`</div><div class="sheet-footer" data-v-96760cd5><div class="icon-btns" data-v-96760cd5><div class="ib-item" data-v-96760cd5>`);
          _push2(ssrRenderComponent(_component_el_icon, {
            class: ["action-icon", { active: unref(isFavorited) }]
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(unref(isFavorited) ? unref(star_filled_default) : unref(star_default)), null, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(isFavorited) ? unref(star_filled_default) : unref(star_default))))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-96760cd5>收藏</span></div></div><div class="main-btns" data-v-96760cd5><button class="btn-mobile-base btn-mobile-ghost btn-cart"${ssrIncludeBooleanAttr(!unref(hasStock) || unref(pending)) ? " disabled" : ""} data-v-96760cd5> 加入购物车 </button><button class="aurora-btn-accent btn-buy-now"${ssrIncludeBooleanAttr(!unref(hasStock) || unref(pending)) ? " disabled" : ""} data-v-96760cd5> 立即购买 </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (showDetailViewer.value) {
          _push2(`<div class="detail-modal-mask" data-v-96760cd5><div class="detail-modal simple-popup" data-v-96760cd5><div class="simple-close" data-v-96760cd5>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "close-icon" }, null, _parent));
          _push2(`</div><div class="dm-content no-header" data-v-96760cd5>`);
          if (unref(detailModules).length === 0) {
            _push2(`<div class="empty-detail" data-v-96760cd5><div class="empty-icon" data-v-96760cd5>📦</div><span data-v-96760cd5>暂无详情</span></div>`);
          } else {
            _push2(`<!--[-->`);
            ssrRenderList(unref(detailModules), (mod, idx) => {
              _push2(`<div class="dm-mod" data-v-96760cd5>`);
              if (mod.type === "image") {
                _push2(`<img${ssrRenderAttr("src", mod.content)} loading="lazy" decoding="async" data-v-96760cd5>`);
              } else if (mod.type === "text") {
                _push2(`<div class="dm-text" data-v-96760cd5>${ssrInterpolate(mod.content)}</div>`);
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mobile/goods/ProductDetailSheet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductDetailSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96760cd5"]]);
export {
  ProductDetailSheet as default
};
//# sourceMappingURL=ProductDetailSheet-Du5DOz6i.js.map
