import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { a as ElSkeletonItem } from './index-DrSf1xVr.mjs';
import { defineComponent, ref, computed, watch, withCtx, unref, createVNode, resolveDynamicComponent, openBlock, createBlock, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { f as circle_check_filled_default, a7 as lightning_default, ay as umbrella_default, J as question_filled_default, a as arrow_right_default, i as info_filled_default, ab as star_filled_default, U as star_default, j as close_default } from './index-DlETah8a.mjs';
import { g as goodsApi } from './goods-DQk19w4f.mjs';
import { supabaseFaqApi, supabaseProductApi } from './supabase-fcLPkUp1.mjs';
import { useCartStore } from './cart-C8TGo9ts.mjs';
import { u as useUserStore } from './user-Cnuc6I82.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { _ as _export_sfc } from './server.mjs';
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
    const loading = ref(false);
    const goodsInfo = ref({});
    const skus = ref([]);
    const specGroups = ref([]);
    const faqs = ref([
      { id: "1", question: "\u4E0B\u5355\u540E\u591A\u4E45\u53D1\u8D27\uFF1F\u4E00\u822C\u4E3A\u79D2\u7EA7\u81EA\u52A8\u53D1\u8D27\u3002" },
      { id: "2", question: "\u8D26\u53F7\u65E0\u6CD5\u767B\u5F55\u600E\u4E48\u529E\uFF1F\u8BF7\u8054\u7CFB\u5728\u7EBF\u4EBA\u5DE5\u5BA2\u670D\u5904\u7406\u3002" },
      { id: "3", question: "\u652F\u6301\u9000\u6B3E\u5417\uFF1F\u865A\u62DF\u5546\u54C1\u53D1\u8D27\u540E\u975E\u8D28\u91CF\u95EE\u9898\u4E0D\u652F\u6301\u9000\u6B3E\u3002" },
      { id: "4", question: "\u53EF\u4EE5\u957F\u671F\u7EED\u8D39\u5417\uFF1F\u652F\u6301\u540C\u53F7\u7EED\u8D39\uFF0C\u8BF7\u5173\u6CE8\u8BA2\u9605\u5230\u671F\u63D0\u9192\u3002" }
    ]);
    const detailModules = ref([]);
    const selectedSpecs = ref({});
    const qty = ref(1);
    const stock = ref(0);
    const isFavorited = ref(false);
    const showDetailViewer = ref(false);
    const allowAddon = ref(true);
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
            if (skus.value[0] && skus.value[0].spec_combination) {
              selectedSpecs.value = { ...skus.value[0].spec_combination };
            } else {
              specGroups.value.forEach((g) => {
                if (!selectedSpecs.value[g.name]) selectedSpecs.value[g.name] = g.values[0];
              });
            }
            if (matchedSku.value) await checkSkuAvailability(matchedSku.value.id);
            else if (skus.value[0]) await checkSkuAvailability(skus.value[0].id);
          } else {
            stock.value = Number(d.stock || 0);
          }
        }
        let finalFaqs = [];
        const fRes = await supabaseFaqApi.getFaqsByProduct(id);
        if (fRes.success && fRes.faqs.length > 0) finalFaqs = [...fRes.faqs];
        if (finalFaqs.length < 5) {
          const fGen = await supabaseFaqApi.getFaqs();
          if (fGen.success && fGen.faqs.length > 0) {
            const existingIds = new Set(finalFaqs.map((f) => f.id));
            const add = fGen.faqs.filter((f) => !existingIds.has(f.id));
            finalFaqs = [...finalFaqs, ...add];
          }
        }
        if (finalFaqs.length > 0) {
          faqs.value = finalFaqs.slice(0, 5);
        }
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
      const _component_el_icon = ElIcon;
      const _component_el_skeleton_item = ElSkeletonItem;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="sheet-wrapper" data-v-2cff84bb>`);
        if (__props.visible) {
          _push2(`<div class="sheet-overlay" data-v-2cff84bb></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (__props.visible) {
          _push2(`<div class="sheet-panel" data-v-2cff84bb><div class="marketing-strip-glass" data-v-2cff84bb><div class="ms-item" data-v-2cff84bb>`);
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
          _push2(` \u5B98\u65B9\u6B63\u54C1\u4FDD\u8BC1 </div><div class="ms-divider" data-v-2cff84bb></div><div class="ms-item" data-v-2cff84bb>`);
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
          _push2(` 24h\u81EA\u52A8\u53D1\u8D27 </div><div class="ms-divider" data-v-2cff84bb></div><div class="ms-item" data-v-2cff84bb>`);
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
          _push2(` \u552E\u540E\u65E0\u5FE7 </div></div><div class="sheet-header" data-v-2cff84bb>`);
          if (loading.value) {
            _push2(`<div style="${ssrRenderStyle({ "width": "100%", "display": "flex", "gap": "12px" })}" data-v-2cff84bb>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "88px", "height": "88px", "border-radius": "12px" }
            }, null, _parent));
            _push2(`<div style="${ssrRenderStyle({ "flex": "1", "padding-top": "4px" })}" data-v-2cff84bb>`);
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
            _push2(`<div class="header-left" data-v-2cff84bb><div class="thumb-box" data-v-2cff84bb><img${ssrRenderAttr("src", selectedSkuImage.value || goodsInfo.value.image)} class="sheet-thumb-img" loading="lazy" decoding="async" data-v-2cff84bb></div><div class="info-box" data-v-2cff84bb><div class="h-title" data-v-2cff84bb>${ssrInterpolate(goodsInfo.value.name || "\u52A0\u8F7D\u4E2D...")}</div><div class="h-price-row" data-v-2cff84bb><div class="price-wrap" data-v-2cff84bb><span class="cy" data-v-2cff84bb>\xA5</span><span class="val" data-v-2cff84bb>${ssrInterpolate(formatPrice(currentPrice.value))}</span></div><div class="${ssrRenderClass([{ "no-stock": !hasStock.value }, "stock-tag"])}" data-v-2cff84bb>${ssrInterpolate(hasStock.value ? `\u5E93\u5B58: ${stock.value}` : "\u6682\u65F6\u7F3A\u8D27")}</div></div></div></div>`);
          }
          if (!loading.value) {
            _push2(`<button class="help-btn" data-v-2cff84bb>`);
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
            _push2(`<span data-v-2cff84bb>\u663E\u793A\u5E2E\u52A9</span></button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="sheet-body" data-v-2cff84bb>`);
          if (loading.value) {
            _push2(`<div data-v-2cff84bb>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "rect",
              style: { "width": "100%", "height": "40px", "border-radius": "20px", "margin-bottom": "20px" }
            }, null, _parent));
            _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "20px" })}" data-v-2cff84bb>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "40px", "margin-bottom": "10px" }
            }, null, _parent));
            _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}" data-v-2cff84bb>`);
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
            if (faqs.value.length > 0) {
              _push2(`<div class="faq-sticker-pill" data-v-2cff84bb><div class="faq-pill-text-wrap" data-v-2cff84bb><div class="faq-pill-track" style="${ssrRenderStyle(trackStyle.value)}" data-v-2cff84bb><!--[-->`);
              ssrRenderList(displayFaqs.value, (f, i) => {
                _push2(`<div class="faq-pill-item" data-v-2cff84bb>${ssrInterpolate(f.question)}</div>`);
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
            if (specGroups.value.length > 0) {
              _push2(`<div class="specs-area" data-v-2cff84bb><!--[-->`);
              ssrRenderList(specGroups.value, (group) => {
                _push2(`<div class="spec-row" data-v-2cff84bb><div class="s-label" data-v-2cff84bb>${ssrInterpolate(group.name)}</div><div class="s-vals" data-v-2cff84bb><!--[-->`);
                ssrRenderList(group.values, (val) => {
                  _push2(`<div class="${ssrRenderClass(["val-chip", { active: selectedSpecs.value[group.name] === val }])}" data-v-2cff84bb>${ssrInterpolate(val)}</div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (matchedSku.value && matchedSku.value.intro) {
              _push2(`<div class="sku-intro-box" data-v-2cff84bb>`);
              _push2(ssrRenderComponent(unref(info_filled_default), { class: "info-icon" }, null, _parent));
              _push2(`<span data-v-2cff84bb>${ssrInterpolate(matchedSku.value.intro)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (allowAddon.value && hasStock.value) {
              _push2(`<div class="qty-row" data-v-2cff84bb><span class="q-label" data-v-2cff84bb>\u8D2D\u4E70\u6570\u91CF</span><div class="q-ctrl" data-v-2cff84bb><div class="${ssrRenderClass([{ disabled: qty.value <= 1 }, "q-btn"])}" data-v-2cff84bb>-</div><div class="q-num" data-v-2cff84bb>${ssrInterpolate(qty.value)}</div><div class="${ssrRenderClass([{ disabled: qty.value >= stock.value }, "q-btn"])}" data-v-2cff84bb>+</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--]-->`);
          }
          _push2(`</div><div class="sheet-footer" data-v-2cff84bb><div class="icon-btns" data-v-2cff84bb><div class="ib-item" data-v-2cff84bb>`);
          _push2(ssrRenderComponent(_component_el_icon, {
            class: ["action-icon", { active: isFavorited.value }]
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(isFavorited.value ? unref(star_filled_default) : unref(star_default)), null, null), _parent2, _scopeId);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(isFavorited.value ? unref(star_filled_default) : unref(star_default))))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<span data-v-2cff84bb>\u6536\u85CF</span></div></div><div class="main-btns" data-v-2cff84bb><button class="btn-mobile-base btn-mobile-ghost btn-cart"${ssrIncludeBooleanAttr(!hasStock.value || loading.value) ? " disabled" : ""} data-v-2cff84bb> \u52A0\u5165\u8D2D\u7269\u8F66 </button><button class="btn-mobile-base btn-mobile-accent btn-buy-now"${ssrIncludeBooleanAttr(!hasStock.value || loading.value) ? " disabled" : ""} data-v-2cff84bb> \u7ACB\u5373\u8D2D\u4E70 </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (showDetailViewer.value) {
          _push2(`<div class="detail-modal-mask" data-v-2cff84bb><div class="detail-modal simple-popup" data-v-2cff84bb><div class="simple-close" data-v-2cff84bb>`);
          _push2(ssrRenderComponent(unref(close_default), { class: "close-icon" }, null, _parent));
          _push2(`</div><div class="dm-content no-header" data-v-2cff84bb>`);
          if (detailModules.value.length === 0) {
            _push2(`<div class="empty-detail" data-v-2cff84bb><div class="empty-icon" data-v-2cff84bb>\u{1F4E6}</div><span data-v-2cff84bb>\u6682\u65E0\u8BE6\u60C5</span></div>`);
          } else {
            _push2(`<!--[-->`);
            ssrRenderList(detailModules.value, (mod, idx) => {
              _push2(`<div class="dm-mod" data-v-2cff84bb>`);
              if (mod.type === "image") {
                _push2(`<img${ssrRenderAttr("src", mod.content)} loading="lazy" decoding="async" data-v-2cff84bb>`);
              } else if (mod.type === "text") {
                _push2(`<div class="dm-text" data-v-2cff84bb>${ssrInterpolate(mod.content)}</div>`);
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
const ProductDetailSheet = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2cff84bb"]]);

export { ProductDetailSheet as default };
//# sourceMappingURL=ProductDetailSheet-BXqgptIL.mjs.map
