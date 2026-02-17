import { n as navigateTo, _ as _export_sfc, c as useRoute, f as useRouter, u as useHead, w as __nuxt_component_0, j as useRuntimeConfig } from "../server.mjs";
import { E as ElCarousel, a as ElCarouselItem, b as ElResult } from "./index-bkHi-azk.js";
import { E as ElImage } from "./index-Dl9iHi_U.js";
import { E as ElIcon } from "./index-C4aUwruK.js";
import { E as ElSkeleton, a as ElSkeletonItem } from "./index-BSkMD3ma.js";
/* empty css              */
/* empty css                         */
/* empty css                     */
/* empty css                          */
import { defineComponent, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, ref, watch, nextTick, computed, createTextVNode, defineAsyncComponent, withAsyncContext, resolveComponent, resolveDirective } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrGetDirectiveProps } from "vue/server-renderer";
import { l as loading_default, f as arrow_right_default } from "./index-CCIZH4aC.js";
import { E as ElButton } from "./index-BmUjCntg.js";
import { E as ElEmpty } from "./index-bbvp9z3V.js";
/* empty css                   */
/* empty css                  */
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useModalStore } from "./modal-CBJJqDui.js";
import { u as useHomeData } from "./useHomeData-BGtmFa-M.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/@unhead/vue/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "./install-VBSKbHUK.js";
import "./index-DGk0tJv4.js";
import "./vnode-uc6o_sOa.js";
import "./event-BZTOGHfp.js";
import "./index-C1njJNPQ.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DHEUW9kI.js";
import "./index-COtmEGfB.js";
import "./scroll-ozMyDWSO.js";
import "./raf-CQRaPAjg.js";
import "./objects-Bz74KHmq.js";
import "./index-DuyRWKSc.js";
import "./icon-CadSVx0p.js";
import "./use-global-config-CaR6i8cb.js";
import "./use-form-item-BJm4fR6K.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./common-CeIxTI3I.js";
import "./supabase-Ds8OQlZJ.js";
import "@supabase/supabase-js";
import "./goods-BXDiUgaK.js";
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BannerSection",
  __ssrInlineRender: true,
  props: {
    banners: {}
  },
  setup(__props) {
    const handleBannerClick = (item) => {
      if (item.link) {
        if (item.link.startsWith("http")) {
          (void 0).open(item.link, "_blank");
        } else {
          navigateTo(item.link);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_carousel = ElCarousel;
      const _component_el_carousel_item = ElCarouselItem;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-section" }, _attrs))} data-v-be8556d9><div class="banner-container" data-v-be8556d9>`);
      if (__props.banners && __props.banners.length > 0) {
        _push(ssrRenderComponent(_component_el_carousel, {
          interval: 5e3,
          arrow: "always",
          height: "360px",
          class: "custom-carousel"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.banners, (item) => {
                _push2(ssrRenderComponent(_component_el_carousel_item, {
                  key: item.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="banner-item" data-v-be8556d9${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_image, {
                        src: item.image,
                        fit: "cover",
                        class: "banner-image",
                        loading: "lazy"
                      }, {
                        placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="image-placeholder" data-v-be8556d9${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(unref(loading_default), null, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(unref(loading_default))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "image-placeholder" }, [
                                createVNode(_component_el_icon, { class: "is-loading" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(loading_default))
                                  ]),
                                  _: 1
                                })
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: "banner-item",
                          onClick: ($event) => handleBannerClick(item)
                        }, [
                          createVNode(_component_el_image, {
                            src: item.image,
                            fit: "cover",
                            class: "banner-image",
                            loading: "lazy"
                          }, {
                            placeholder: withCtx(() => [
                              createVNode("div", { class: "image-placeholder" }, [
                                createVNode(_component_el_icon, { class: "is-loading" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(loading_default))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }, 8, ["src"])
                        ], 8, ["onClick"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.banners, (item) => {
                  return openBlock(), createBlock(_component_el_carousel_item, {
                    key: item.id
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "banner-item",
                        onClick: ($event) => handleBannerClick(item)
                      }, [
                        createVNode(_component_el_image, {
                          src: item.image,
                          fit: "cover",
                          class: "banner-image",
                          loading: "lazy"
                        }, {
                          placeholder: withCtx(() => [
                            createVNode("div", { class: "image-placeholder" }, [
                              createVNode(_component_el_icon, { class: "is-loading" }, {
                                default: withCtx(() => [
                                  createVNode(unref(loading_default))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }, 8, ["src"])
                      ], 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="banner-skeleton" data-v-be8556d9>`);
        _push(ssrRenderComponent(_component_el_skeleton, {
          style: { "width": "100%" },
          animated: ""
        }, {
          template: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_skeleton_item, {
                variant: "rect",
                style: { "width": "100%", "height": "360px", "border-radius": "16px" }
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_skeleton_item, {
                  variant: "rect",
                  style: { "width": "100%", "height": "360px", "border-radius": "16px" }
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/BannerSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-be8556d9"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CategoryNav",
  __ssrInlineRender: true,
  props: {
    categories: {},
    activeId: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const scrollContainer = ref(null);
    watch(() => props.activeId, () => {
      nextTick(() => {
        const activeItem = scrollContainer.value?.querySelector(".category-item.active");
        if (activeItem) {
          centerActiveItem(activeItem);
        }
      });
    }, { immediate: true });
    const centerActiveItem = (target) => {
      const container = scrollContainer.value;
      if (target && container) {
        const targetOffsetLeft = target.offsetLeft;
        const targetWidth = target.offsetWidth;
        const containerWidth = container.clientWidth;
        let scrollLeft = targetOffsetLeft - containerWidth / 2 + targetWidth / 2;
        const maxScroll = container.scrollWidth - containerWidth;
        if (scrollLeft < 0) scrollLeft = 0;
        if (scrollLeft > maxScroll) scrollLeft = maxScroll;
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "category-nav" }, _attrs))} data-v-0b6542c1><div class="category-outer" data-v-0b6542c1><div class="category-scroll" data-v-0b6542c1><!--[-->`);
      ssrRenderList(props.categories, (cat) => {
        _push(`<div class="${ssrRenderClass([{
          active: props.activeId === cat.id,
          "active-glow-border": props.activeId === cat.id
        }, "category-item"])}" data-v-0b6542c1><span class="cat-label" data-v-0b6542c1>${ssrInterpolate(cat.name)}</span></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/CategoryNav.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0b6542c1"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PcProductCard",
  __ssrInlineRender: true,
  props: {
    goods: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatPrice } = useBizFormat();
    const getBadgeClass = (label) => {
      const map = {
        "热卖": "bg-hot",
        "新品": "bg-new",
        "推荐": "bg-recommend",
        "限时": "bg-limited",
        "优惠": "bg-promo"
      };
      return map[label] || "";
    };
    const formatSales = (val) => {
      if (val >= 1e4) return (val / 1e4).toFixed(1) + "w+";
      if (val >= 1e3) return (val / 1e3).toFixed(1) + "k+";
      return val;
    };
    const tagsList = computed(() => {
      const tags = props.goods.tags;
      if (!tags) return [];
      if (Array.isArray(tags)) return tags;
      if (typeof tags === "string" && tags.includes(",")) return tags.split(",");
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_image = ElImage;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card" }, _attrs))} data-v-d3e4f804>`);
      if (__props.goods.badge_label && __props.goods.badge_label !== "不展示") {
        _push(`<div class="${ssrRenderClass([getBadgeClass(__props.goods.badge_label), "badge-label"])}" data-v-d3e4f804>${ssrInterpolate(__props.goods.badge_label)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-image-container" data-v-d3e4f804>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: __props.goods.image,
        fit: "cover",
        class: "goods-image",
        loading: "lazy"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="image-placeholder" data-v-d3e4f804${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_skeleton_item, {
              variant: "image",
              style: { "width": "100%", "height": "100%" }
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "image-placeholder" }, [
                createVNode(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "100%" }
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="goods-card-content" data-v-d3e4f804><h3 class="goods-title"${ssrRenderAttr("title", __props.goods.product_name)} data-v-d3e4f804>${ssrInterpolate(__props.goods.product_name)}</h3><div class="goods-price-row" data-v-d3e4f804><span class="price-val" data-v-d3e4f804>${ssrInterpolate(unref(formatPrice)(__props.goods.display_price))}</span><span class="price-unit" data-v-d3e4f804>/起</span></div>`);
      if (tagsList.value.length) {
        _push(`<div class="selling-tags" data-v-d3e4f804><!--[-->`);
        ssrRenderList(tagsList.value.slice(0, 3), (tag, tIdx) => {
          _push(`<span class="sell-tag" data-v-d3e4f804>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-stats" data-v-d3e4f804><div class="stat-item" data-v-d3e4f804><span class="stat-label" data-v-d3e4f804>销量</span><span class="stat-value" data-v-d3e4f804>${ssrInterpolate(formatSales(__props.goods.initial_sales || 0))}</span></div><div class="stat-item rating" data-v-d3e4f804><span class="stat-label" data-v-d3e4f804>好评度</span><span class="stat-value" data-v-d3e4f804>${ssrInterpolate(__props.goods.rating)}%</span></div></div><div class="action-btn-wrap" data-v-d3e4f804>`);
      _push(ssrRenderComponent(BaseButton, {
        themeId: "marketing-buy",
        block: "",
        class: "product-action-btn"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(arrow_right_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(arrow_right_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_icon, { class: "btn-icon" }, {
                default: withCtx(() => [
                  createVNode(unref(arrow_right_default))
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 查看详情 `);
          } else {
            return [
              createTextVNode(" 查看详情 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/PcProductCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const PcProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d3e4f804"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_skeleton = ElSkeleton;
  const _component_el_skeleton_item = ElSkeletonItem;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-skeleton" }, _attrs))} data-v-ee684bcb><div style="${ssrRenderStyle({ "padding": "24px" })}" data-v-ee684bcb>`);
  _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
    template: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-img"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "h3",
          style: { "width": "80%", "margin": "0 auto 10px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "50%", "margin": "0 auto 20px" }
        }, null, _parent2, _scopeId));
        _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" })}" data-v-ee684bcb${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "30%" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "30%" }
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "100%", "height": "40px", "border-radius": "20px" }
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_el_skeleton_item, {
            variant: "image",
            class: "skeleton-img"
          }),
          createVNode(_component_el_skeleton_item, {
            variant: "h3",
            style: { "width": "80%", "margin": "0 auto 10px" }
          }),
          createVNode(_component_el_skeleton_item, {
            variant: "text",
            style: { "width": "50%", "margin": "0 auto 20px" }
          }),
          createVNode("div", { style: { "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "30%" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "30%" }
            })
          ]),
          createVNode(_component_el_skeleton_item, {
            variant: "button",
            style: { "width": "100%", "height": "40px", "border-radius": "20px" }
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/base/PcProductCardSkeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PcProductCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ee684bcb"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GoodsSection",
  __ssrInlineRender: true,
  props: {
    goodsList: {},
    loading: { type: Boolean },
    error: { type: Boolean }
  },
  emits: ["retry"],
  setup(__props, { emit: __emit }) {
    const navigateToGoods = (id) => {
      navigateTo(`/goods/${id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_result = ElResult;
      const _component_el_button = ElButton;
      const _component_el_empty = ElEmpty;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "goods-section" }, _attrs))} data-v-9666a1af><div class="container" data-v-9666a1af>`);
      if (__props.loading) {
        _push(`<div class="goods-grid" data-v-9666a1af><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(ssrRenderComponent(PcProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (__props.goodsList && __props.goodsList.length > 0) {
        _push(`<div class="goods-grid" data-v-9666a1af><!--[-->`);
        ssrRenderList(__props.goodsList, (item) => {
          _push(ssrRenderComponent(PcProductCard, {
            key: item.id,
            goods: item,
            onClick: navigateToGoods
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (__props.error) {
        _push(`<div class="error-state" data-v-9666a1af>`);
        _push(ssrRenderComponent(_component_el_result, {
          icon: "error",
          title: "加载失败",
          "sub-title": "请检查网络后重试"
        }, {
          extra: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: ($event) => _ctx.$emit("retry")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`重试`);
                  } else {
                    return [
                      createTextVNode("重试")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_button, {
                  type: "primary",
                  onClick: ($event) => _ctx.$emit("retry")
                }, {
                  default: withCtx(() => [
                    createTextVNode("重试")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="empty-state" data-v-9666a1af>`);
        _push(ssrRenderComponent(_component_el_empty, { description: "暂无相关商品" }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/GoodsSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9666a1af"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const AboutSection = defineAsyncComponent(() => import("./AboutSection-DVNiB4bI.js"));
    const LoginRegisterModal = defineAsyncComponent(() => import("./LoginRegisterModal-Bx2zS6iM.js"));
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
    useHead({
      title: "凡图拉 - 优质商品平台",
      meta: [
        { name: "description", content: "凡图拉提供优质商品和服务，精选各类商品，确保品质与价格的完美平衡。" },
        { name: "keywords", content: "凡图拉,商品,购物,电商,优质商品" },
        { property: "og:title", content: "凡图拉 - 优质商品平台" },
        { property: "og:description", content: "凡图拉提供优质商品和服务，精选各类商品，确保品质与价格的完美平衡。" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: config.public.siteUrl || "http://localhost:3000" }
      ]
    });
    const {
      banners,
      categories,
      currentGoods,
      activeCategoryId,
      goodsLoading,
      // Client-side switching loading
      pending,
      // SSR/Initial loading
      isLoadingMore,
      hasMore,
      initData,
      handleCategoryChange: _handleCategoryChange,
      loadMore
    } = ([__temp, __restore] = withAsyncContext(() => useHomeData("home-data-pc")), __temp = await __temp, __restore(), __temp);
    const handleCategoryChange = async (categoryId) => {
      await _handleCategoryChange(categoryId);
      router.replace({ query: { ...route.query, category_id: categoryId } });
    };
    const isMounted = ref(false);
    ref(true);
    const modal = useModalStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_BannerSection = __nuxt_component_1;
      const _component_CategoryNav = __nuxt_component_2;
      const _component_GoodsSection = __nuxt_component_3;
      const _component_el_empty = ElEmpty;
      const _component_el_icon = ElIcon;
      const _component_Loading = resolveComponent("Loading");
      const _directive_intersection_observer = resolveDirective("intersection-observer");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-81e60e0a>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_BannerSection, { banners: unref(banners) }, null, _parent));
      _push(ssrRenderComponent(_component_CategoryNav, {
        categories: unref(categories),
        activeId: unref(activeCategoryId),
        onChange: handleCategoryChange
      }, null, _parent));
      _push(`<div class="goods-container" data-v-81e60e0a>`);
      _push(ssrRenderComponent(_component_GoodsSection, {
        goodsList: unref(currentGoods),
        loading: unref(goodsLoading)
      }, null, _parent));
      if (!unref(goodsLoading) && unref(currentGoods).length === 0) {
        _push(`<div class="empty-state" data-v-81e60e0a>`);
        _push(ssrRenderComponent(_component_el_empty, {
          description: "该分类暂无商品",
          "image-size": 120
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasMore) && unref(currentGoods).length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "load-more-trigger" }, ssrGetDirectiveProps(_ctx, _directive_intersection_observer, unref(loadMore))))} data-v-81e60e0a>`);
        if (unref(isLoadingMore)) {
          _push(`<div class="loading-more-spinner" data-v-81e60e0a>`);
          _push(ssrRenderComponent(_component_el_icon, { class: "is-loading" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Loading, null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Loading)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(` 加载更多... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(hasMore) && unref(currentGoods).length > 0) {
        _push(`<div class="no-more-data" data-v-81e60e0a> - 到底了 - </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(AboutSection), null, null, _parent));
      if (isMounted.value && unref(modal).showLogin) {
        _push(ssrRenderComponent(unref(LoginRegisterModal), {
          visible: unref(modal).showLogin,
          onClose: ($event) => unref(modal).closeLogin()
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81e60e0a"]]);
export {
  index as default
};
//# sourceMappingURL=index-Ct0UqoSQ.js.map
