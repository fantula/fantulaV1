import { E as ElCarousel, a as ElCarouselItem, b as ElResult } from './index-DnNi5K8u.mjs';
import { E as ElImage } from './index-ALppOkb6.mjs';
import { E as ElIcon } from './index-CsSUb8pm.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './index-CC2EaJo5.mjs';
import { defineComponent, defineAsyncComponent, resolveComponent, resolveDirective, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, ref, watch, nextTick, createTextVNode, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { l as loading_default, a as arrow_right_default } from './index-DuV_oMrC.mjs';
import { _ as _export_sfc, h as useRoute, u as useRouter, b as useRuntimeConfig, n as navigateTo } from './server.mjs';
import { E as ElButton } from './index-DV2Xa1Kj.mjs';
import { E as ElEmpty } from './index-B_8BWUnE.mjs';
import { B as BaseButton } from './BaseButton-BnWAaIRO.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { u as useModalStore } from './modal-_wZ2Eah3.mjs';
import { u as useHomeData } from './useHomeData-BAU-FNGf.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import 'lodash-unified';
import './index-COX41yze.mjs';
import './vnode-BKSxKQVt.mjs';
import '@vue/shared';
import './event-BZTOGHfp.mjs';
import './index-xMedQC9S.mjs';
import './typescript-D6L75muK.mjs';
import '@vueuse/core';
import './focus-trap.vue-CG7JU5b_.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-CC_9xuAU.mjs';
import './scroll-DHYrZ40v.mjs';
import './raf-CQRaPAjg.mjs';
import './objects-Bz74KHmq.mjs';
import './index-Cy25Tved.mjs';
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
import 'vue-router';
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
import './icon-CyvpkMdQ.mjs';
import './use-global-config-Dt87SALX.mjs';
import './use-form-item-VP6j78iG.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './common-D9iMPQj0.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
import './goods-Q8QuJnLu.mjs';

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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-section" }, _attrs))} data-v-71d9cac5><div class="banner-container" data-v-71d9cac5>`);
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
                      _push3(`<div class="banner-item" data-v-71d9cac5${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_image, {
                        src: item.image,
                        fit: "cover",
                        class: "banner-image",
                        loading: "lazy"
                      }, {
                        placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="image-placeholder" data-v-71d9cac5${_scopeId3}>`);
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
        _push(`<div class="banner-skeleton" data-v-71d9cac5>`);
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-71d9cac5"]]);
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
        var _a;
        const activeItem = (_a = scrollContainer.value) == null ? void 0 : _a.querySelector(".category-item.active");
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
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0b6542c1"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
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
        "\u70ED\u5356": "bg-hot",
        "\u65B0\u54C1": "bg-new",
        "\u63A8\u8350": "bg-recommend",
        "\u9650\u65F6": "bg-limited",
        "\u4F18\u60E0": "bg-promo"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card" }, _attrs))} data-v-7dd97cc0>`);
      if (__props.goods.badge_label && __props.goods.badge_label !== "\u4E0D\u5C55\u793A") {
        _push(`<div class="${ssrRenderClass([getBadgeClass(__props.goods.badge_label), "badge-label"])}" data-v-7dd97cc0>${ssrInterpolate(__props.goods.badge_label)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-image-container" data-v-7dd97cc0>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: __props.goods.image,
        fit: "cover",
        class: "goods-image",
        loading: "lazy"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="image-placeholder" data-v-7dd97cc0${_scopeId}>`);
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
      _push(`</div><div class="goods-card-content" data-v-7dd97cc0><h3 class="goods-title"${ssrRenderAttr("title", __props.goods.product_name)} data-v-7dd97cc0>${ssrInterpolate(__props.goods.product_name)}</h3><div class="goods-price-row" data-v-7dd97cc0><span class="price-val" data-v-7dd97cc0>${ssrInterpolate(unref(formatPrice)(__props.goods.display_price))}</span><span class="price-unit" data-v-7dd97cc0>/\u8D77</span></div>`);
      if (tagsList.value.length) {
        _push(`<div class="selling-tags" data-v-7dd97cc0><!--[-->`);
        ssrRenderList(tagsList.value.slice(0, 3), (tag, tIdx) => {
          _push(`<span class="sell-tag" data-v-7dd97cc0>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-stats" data-v-7dd97cc0><div class="stat-item" data-v-7dd97cc0><span class="stat-label" data-v-7dd97cc0>\u9500\u91CF</span><span class="stat-value" data-v-7dd97cc0>${ssrInterpolate(formatSales(__props.goods.initial_sales || 0))}</span></div><div class="stat-item rating" data-v-7dd97cc0><span class="stat-label" data-v-7dd97cc0>\u597D\u8BC4\u5EA6</span><span class="stat-value" data-v-7dd97cc0>${ssrInterpolate(__props.goods.rating)}%</span></div></div><div class="action-btn-wrap" data-v-7dd97cc0>`);
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
            _push2(` \u67E5\u770B\u8BE6\u60C5 `);
          } else {
            return [
              createTextVNode(" \u67E5\u770B\u8BE6\u60C5 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/ProductCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7dd97cc0"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_skeleton = ElSkeleton;
  const _component_el_skeleton_item = ElSkeletonItem;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-card-skeleton" }, _attrs))} data-v-9125c3d6><div style="${ssrRenderStyle({ "padding": "24px" })}" data-v-9125c3d6>`);
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
        _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" })}" data-v-9125c3d6${_scopeId}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/base/ProductCardSkeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProductCardSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9125c3d6"]]);
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "goods-section" }, _attrs))} data-v-97d10014><div class="container" data-v-97d10014>`);
      if (__props.loading) {
        _push(`<div class="goods-grid" data-v-97d10014><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(ssrRenderComponent(ProductCardSkeleton, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (__props.goodsList && __props.goodsList.length > 0) {
        _push(`<div class="goods-grid" data-v-97d10014><!--[-->`);
        ssrRenderList(__props.goodsList, (item) => {
          _push(ssrRenderComponent(ProductCard, {
            key: item.id,
            goods: item,
            onClick: navigateToGoods
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (__props.error) {
        _push(`<div class="error-state" data-v-97d10014>`);
        _push(ssrRenderComponent(_component_el_result, {
          icon: "error",
          title: "\u52A0\u8F7D\u5931\u8D25",
          "sub-title": "\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5"
        }, {
          extra: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_button, {
                type: "primary",
                onClick: ($event) => _ctx.$emit("retry")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`\u91CD\u8BD5`);
                  } else {
                    return [
                      createTextVNode("\u91CD\u8BD5")
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
                    createTextVNode("\u91CD\u8BD5")
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
        _push(`<div class="empty-state" data-v-97d10014>`);
        _push(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u76F8\u5173\u5546\u54C1" }, null, _parent));
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
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-97d10014"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const AboutSection = defineAsyncComponent(() => import('./AboutSection-CNyYv0N8.mjs'));
    const LoginRegisterModal = defineAsyncComponent(() => import('./LoginRegisterModal-CloBqWAq.mjs'));
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
    useHead({
      title: "\u51E1\u56FE\u62C9 - \u4F18\u8D28\u5546\u54C1\u5E73\u53F0",
      meta: [
        { name: "description", content: "\u51E1\u56FE\u62C9\u63D0\u4F9B\u4F18\u8D28\u5546\u54C1\u548C\u670D\u52A1\uFF0C\u7CBE\u9009\u5404\u7C7B\u5546\u54C1\uFF0C\u786E\u4FDD\u54C1\u8D28\u4E0E\u4EF7\u683C\u7684\u5B8C\u7F8E\u5E73\u8861\u3002" },
        { name: "keywords", content: "\u51E1\u56FE\u62C9,\u5546\u54C1,\u8D2D\u7269,\u7535\u5546,\u4F18\u8D28\u5546\u54C1" },
        { property: "og:title", content: "\u51E1\u56FE\u62C9 - \u4F18\u8D28\u5546\u54C1\u5E73\u53F0" },
        { property: "og:description", content: "\u51E1\u56FE\u62C9\u63D0\u4F9B\u4F18\u8D28\u5546\u54C1\u548C\u670D\u52A1\uFF0C\u7CBE\u9009\u5404\u7C7B\u5546\u54C1\uFF0C\u786E\u4FDD\u54C1\u8D28\u4E0E\u4EF7\u683C\u7684\u5B8C\u7F8E\u5E73\u8861\u3002" },
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
      isLoadingMore,
      hasMore,
      handleCategoryChange: _handleCategoryChange,
      loadMore
    } = useHomeData();
    const handleCategoryChange = async (categoryId) => {
      await _handleCategoryChange(categoryId);
      router.replace({ query: { ...route.query, category_id: categoryId } });
    };
    const modal = useModalStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BannerSection = __nuxt_component_0;
      const _component_CategoryNav = __nuxt_component_1;
      const _component_GoodsSection = __nuxt_component_2;
      const _component_el_empty = ElEmpty;
      const _component_el_icon = ElIcon;
      const _component_Loading = resolveComponent("Loading");
      const _directive_intersection_observer = resolveDirective("intersection-observer");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-8f2b856e>`);
      _push(ssrRenderComponent(_component_BannerSection, { banners: unref(banners) }, null, _parent));
      _push(ssrRenderComponent(_component_CategoryNav, {
        categories: unref(categories),
        activeId: unref(activeCategoryId),
        onChange: handleCategoryChange
      }, null, _parent));
      _push(`<div class="goods-container" data-v-8f2b856e>`);
      _push(ssrRenderComponent(_component_GoodsSection, {
        goodsList: unref(currentGoods),
        loading: unref(goodsLoading)
      }, null, _parent));
      if (!unref(goodsLoading) && unref(currentGoods).length === 0) {
        _push(`<div class="empty-state" data-v-8f2b856e>`);
        _push(ssrRenderComponent(_component_el_empty, {
          description: "\u8BE5\u5206\u7C7B\u6682\u65E0\u5546\u54C1",
          "image-size": 120
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(hasMore) && unref(currentGoods).length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "load-more-trigger" }, ssrGetDirectiveProps(_ctx, _directive_intersection_observer, unref(loadMore))))} data-v-8f2b856e>`);
        if (unref(isLoadingMore)) {
          _push(`<div class="loading-more-spinner" data-v-8f2b856e>`);
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
          _push(` \u52A0\u8F7D\u66F4\u591A... </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(hasMore) && unref(currentGoods).length > 0) {
        _push(`<div class="no-more-data" data-v-8f2b856e> - \u5230\u5E95\u4E86 - </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(AboutSection), null, null, _parent));
      if (unref(modal).showLogin) {
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f2b856e"]]);

export { index as default };
//# sourceMappingURL=index-G-c9eLwn.mjs.map
