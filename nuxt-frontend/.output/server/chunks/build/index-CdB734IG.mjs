import { E as ElCarousel, a as ElCarouselItem } from './index-6l5oVPy9.mjs';
import { E as ElImage } from './index-Dr3RPaW4.mjs';
import { _ as _export_sfc, b as useRoute, i as useRouter, j as useRuntimeConfig, u as useModalStore, c as __nuxt_component_2$1, E as ElIcon, l as loading_default, f as arrow_right_default, m as monitor_default, s as service_default, g as trophy_default, h as share_default, n as navigateTo } from './server.mjs';
import { E as ElSkeleton, a as ElSkeletonItem } from './index-BXD0oWDt.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, watch, nextTick, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderVNode } from 'vue/server-renderer';
import { E as ElEmpty } from './index-DKY_z0U1.mjs';
import { g as goodsApi } from './goods-BnwZn77-.mjs';
import { u as useHead } from './v3-DfxIQ3dZ.mjs';
import 'lodash-unified';
import './index-BrFCEoKQ.mjs';
import './vnode-D0IHQw_9.mjs';
import '@vue/shared';
import './event-BZTOGHfp.mjs';
import '@vueuse/core';
import './focus-trap-D_6Xxduc.mjs';
import './aria-B8G3G_75.mjs';
import './index-B-o0CD59.mjs';
import './scroll-DcpXtO6O.mjs';
import './index-ClPmkyX9.mjs';
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
import '@supabase/supabase-js';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner-section" }, _attrs))} data-v-b84bd4e1><div class="banner-container" data-v-b84bd4e1>`);
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
                      _push3(`<div class="banner-item" data-v-b84bd4e1${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_el_image, {
                        src: item.image,
                        fit: "cover",
                        class: "banner-image",
                        loading: "lazy"
                      }, {
                        placeholder: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="image-placeholder" data-v-b84bd4e1${_scopeId3}>`);
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
        _push(`<div class="banner-skeleton" data-v-b84bd4e1>`);
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BannerSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b84bd4e1"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "category-nav" }, _attrs))} data-v-7cf8d9ba><div class="category-outer" data-v-7cf8d9ba><div class="category-scroll" data-v-7cf8d9ba><!--[-->`);
      ssrRenderList(props.categories, (cat) => {
        _push(`<div class="${ssrRenderClass([{ active: props.activeId === cat.id }, "category-item"])}" data-v-7cf8d9ba><span class="cat-label" data-v-7cf8d9ba>${ssrInterpolate(cat.name)}</span></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoryNav.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7cf8d9ba"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "GoodsSection",
  __ssrInlineRender: true,
  props: {
    goodsList: {},
    loading: { type: Boolean }
  },
  setup(__props) {
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
    const parseTags = (tags) => {
      if (!tags) return [];
      if (Array.isArray(tags)) return tags;
      if (typeof tags === "string" && tags.includes(",")) return tags.split(",");
      return [];
    };
    const formatPrice = (price) => {
      if (price === void 0 || price === null) return "0.00";
      const num = typeof price === "string" ? parseFloat(price) : price;
      return num.toFixed(2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_skeleton = ElSkeleton;
      const _component_el_skeleton_item = ElSkeletonItem;
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      const _component_el_empty = ElEmpty;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "goods-section" }, _attrs))} data-v-692bc394><div class="container" data-v-692bc394>`);
      if (__props.loading) {
        _push(`<div class="goods-grid" data-v-692bc394><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<div class="goods-card" data-v-692bc394><div style="${ssrRenderStyle({ "padding": "24px" })}" data-v-692bc394>`);
          _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
            template: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "image",
                  style: { "width": "100%", "height": "160px", "border-radius": "12px", "margin-bottom": "20px" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "h3",
                  style: { "width": "80%", "margin": "0 auto 10px" }
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_el_skeleton_item, {
                  variant: "text",
                  style: { "width": "50%", "margin": "0 auto 20px" }
                }, null, _parent2, _scopeId));
                _push2(`<div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "margin-bottom": "20px" })}" data-v-692bc394${_scopeId}>`);
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
                    style: { "width": "100%", "height": "160px", "border-radius": "12px", "margin-bottom": "20px" }
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
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (__props.goodsList && __props.goodsList.length > 0) {
        _push(`<div class="goods-grid" data-v-692bc394><!--[-->`);
        ssrRenderList(__props.goodsList, (item) => {
          _push(`<div class="goods-card" data-v-692bc394>`);
          if (item.badge_label && item.badge_label !== "\u4E0D\u5C55\u793A") {
            _push(`<div class="${ssrRenderClass([getBadgeClass(item.badge_label), "badge-label"])}" data-v-692bc394>${ssrInterpolate(item.badge_label)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="goods-image-container" data-v-692bc394>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: item.image,
            fit: "cover",
            class: "goods-image",
            loading: "lazy"
          }, {
            placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="image-placeholder" data-v-692bc394${_scopeId}>`);
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
            _: 2
          }, _parent));
          _push(`</div><div class="goods-card-content" data-v-692bc394><h3 class="goods-title"${ssrRenderAttr("title", item.product_name)} data-v-692bc394>${ssrInterpolate(item.product_name)}</h3><div class="goods-price-row" data-v-692bc394><span class="price-val" data-v-692bc394>${ssrInterpolate(formatPrice(item.display_price))}</span><span class="price-unit" data-v-692bc394>/\u8D77</span></div>`);
          if (parseTags(item.tags).length) {
            _push(`<div class="selling-tags" data-v-692bc394><!--[-->`);
            ssrRenderList(parseTags(item.tags).slice(0, 3), (tag, tIdx) => {
              _push(`<span class="sell-tag" data-v-692bc394>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="goods-stats" data-v-692bc394><div class="stat-item" data-v-692bc394><span class="stat-label" data-v-692bc394>\u9500\u91CF</span><span class="stat-value" data-v-692bc394>${ssrInterpolate(formatSales(item.initial_sales || 0))}</span></div><div class="stat-item rating" data-v-692bc394><span class="stat-label" data-v-692bc394>\u597D\u8BC4\u5EA6</span><span class="stat-value" data-v-692bc394>${ssrInterpolate(item.rating)}%</span></div></div><div class="action-btn-wrap" data-v-692bc394><div class="select-btn" data-v-692bc394> \u67E5\u770B\u8BE6\u60C5 `);
          _push(ssrRenderComponent(_component_el_icon, { class: "btn-icon" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(arrow_right_default))
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-692bc394>`);
        _push(ssrRenderComponent(_component_el_empty, { description: "\u6682\u65E0\u76F8\u5173\u5546\u54C1" }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GoodsSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-692bc394"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const cards = [
      {
        icon: monitor_default,
        // Team -> Monitor/Screen
        title: "\u5927\u56E2\u961F\u5F00\u53D1",
        desc: "\u6240\u6709\u5546\u54C1\u5747\u4E3A\u56E2\u961F\u5F00\u53D1\uFF0C\u54C1\u8D28\u4FDD\u969C"
      },
      {
        icon: service_default,
        // Service -> Headset/Service
        title: "\u4EBA\u5DE5\u5BA2\u670D\u670D\u52A1",
        desc: "\u63D0\u4F9B\u5B8C\u5584\u7684\u552E\u540E\u670D\u52A1\uFF0C\u8D2D\u7269\u65E0\u5FE7"
      },
      {
        icon: trophy_default,
        // Platform -> Trophy/Medal
        title: "\u5927\u5E73\u53F0\u66F4\u653E\u5FC3",
        desc: "\u5341\u5E74\u5F00\u53D1\u7ECF\u9A8C\uFF0C\u670D\u52A1\u5343\u4E07\u7528\u6237"
      },
      {
        icon: share_default,
        // Network -> Share/Connection
        title: "\u5168\u7F51\u77E9\u9635",
        desc: "\u8986\u76D6\u5168\u56FD\u5E73\u53F0\uFF0C\u5FEB\u901F\u9001\u8FBE"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "about-section" }, _attrs))} data-v-46f69d0d><div class="about-bg" data-v-46f69d0d><div class="about-title" data-v-46f69d0d>\u5173\u4E8E\u6211\u4EEC</div><div class="about-subtitle" data-v-46f69d0d>\u63D0\u4F9B\u9AD8\u54C1\u8D28\u4F18\u8D28\u670D\u52A1</div><div class="about-cards" data-v-46f69d0d><!--[-->`);
      ssrRenderList(cards, (item) => {
        _push(`<div class="about-card" data-v-46f69d0d><div class="about-icon" data-v-46f69d0d>`);
        _push(ssrRenderComponent(_component_el_icon, { size: 48 }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), null, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="about-card-title" data-v-46f69d0d>${ssrInterpolate(item.title)}</div><div class="about-card-desc" data-v-46f69d0d>${ssrInterpolate(item.desc)}</div></div>`);
      });
      _push(`<!--]--></div><button class="about-more-btn" data-v-46f69d0d>\u67E5\u770B\u66F4\u591A \u2192</button></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-46f69d0d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
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
    const banners = ref([]);
    const categories = ref([]);
    const currentGoods = ref([]);
    const activeCategoryId = ref("");
    const goodsLoading = ref(false);
    const slideDirection = ref("slide-right");
    const fetchGoods = async (categoryId) => {
      var _a;
      goodsLoading.value = true;
      try {
        const res = await goodsApi.getGoodsList({
          categoryId,
          page: 1,
          limit: 12
        });
        if ((res == null ? void 0 : res.success) && ((_a = res.data) == null ? void 0 : _a.list)) {
          currentGoods.value = res.data.list;
        } else {
          currentGoods.value = [];
        }
      } catch (error) {
        console.error("\u83B7\u53D6\u5546\u54C1\u5217\u8868\u5931\u8D25:", error);
        currentGoods.value = [];
      } finally {
        goodsLoading.value = false;
      }
    };
    const handleCategoryChange = async (categoryId) => {
      const oldIndex = categories.value.findIndex((c) => c.id === activeCategoryId.value);
      const newIndex = categories.value.findIndex((c) => c.id === categoryId);
      if (oldIndex !== -1 && newIndex !== -1) {
        slideDirection.value = newIndex > oldIndex ? "slide-right" : "slide-left";
      }
      activeCategoryId.value = categoryId;
      router.replace({ query: { ...route.query, category_id: categoryId } });
      await fetchGoods(categoryId);
    };
    const modal = useModalStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BannerSection = __nuxt_component_0;
      const _component_CategoryNav = __nuxt_component_1;
      const _component_GoodsSection = __nuxt_component_2;
      const _component_AboutSection = __nuxt_component_3;
      const _component_LoginRegisterModal = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-450ecfd7>`);
      _push(ssrRenderComponent(_component_BannerSection, { banners: banners.value }, null, _parent));
      _push(ssrRenderComponent(_component_CategoryNav, {
        categories: categories.value,
        activeId: activeCategoryId.value,
        onChange: handleCategoryChange
      }, null, _parent));
      _push(`<div class="goods-container" data-v-450ecfd7>`);
      _push(ssrRenderComponent(_component_GoodsSection, {
        key: activeCategoryId.value,
        goodsList: currentGoods.value,
        loading: goodsLoading.value
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AboutSection, null, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-450ecfd7"]]);

export { index as default };
//# sourceMappingURL=index-CdB734IG.mjs.map
