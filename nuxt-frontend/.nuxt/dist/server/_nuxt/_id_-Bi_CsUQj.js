import { E as ElIcon } from "./index-_zadwVDN.js";
import "./base-CEWXqFm3.js";
/* empty css                    */
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, useSSRContext, defineAsyncComponent, createTextVNode, isRef, toDisplayString, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { a as circle_check_default, g as arrow_left_default, $ as shopping_cart_default, F as star_default, a0 as star_filled_default, i as info_filled_default } from "./index-DNnPa_Q9.js";
import { useRouter } from "vue-router";
import { u as useProductDetail } from "./useProductDetail-DLP8HdIq.js";
import { E as ElImage } from "./index-BSYGfCfY.js";
/* empty css                         */
import { _ as _export_sfc, u as useHead } from "../server.mjs";
import { B as BaseButton } from "./BaseButton-BnWAaIRO.js";
import { E as ElSkeleton, a as ElSkeletonItem } from "./index-Buprbscf.js";
/* empty css                     */
/* empty css                          */
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { E as ElMessage } from "./index-BwQVtIp5.js";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./goods-BEbxfX07.js";
import "./common-Bgv_wRgd.js";
import "./supabase-F2pQZHm6.js";
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
import "./supabase-DLV6up8l.js";
import "./modal-CBJJqDui.js";
import "./user-CctDsbAN.js";
import "./cart-CDhPH3qi.js";
import "./useNotify-QNEBBzdZ.js";
import "./useToast-DsT-1f4c.js";
import "./asyncData-BpgkB7Y4.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-ByGmkA5C.js";
import "./index-DbvZsXcZ.js";
import "./index-BrJcxSwt.js";
import "./scroll-BEbqb1sm.js";
import "./raf-CQRaPAjg.js";
import "./index-DuyRWKSc.js";
import "./icon-Ck0_dGQP.js";
import "./use-global-config-C5kRDPtv.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductGallery",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    defaultImage: {},
    images: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const currentImage = computed(() => props.modelValue);
    const serviceTags = [
      "官方采购・正品保障",
      "全程质保・无忧售后",
      "极速响应・人工服务",
      "安全加密・隐私保护"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_image = ElImage;
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-left-panel" }, _attrs))} data-v-8db2d9d8><div class="main-image-wrapper" data-v-8db2d9d8><div class="main-image" data-v-8db2d9d8>`);
      _push(ssrRenderComponent(_component_el_image, {
        src: unref(currentImage) || __props.defaultImage,
        fit: "contain",
        class: "sku-big-img"
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="img-loading-placeholder" data-v-8db2d9d8${_scopeId}>加载中...</div>`);
          } else {
            return [
              createVNode("div", { class: "img-loading-placeholder" }, "加载中...")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (__props.images && __props.images.length > 0) {
        _push(`<div class="sku-thumb-scroll" data-v-8db2d9d8><!--[-->`);
        ssrRenderList(__props.images, (img, idx) => {
          _push(`<div class="${ssrRenderClass(["sku-thumb-item", { active: unref(currentImage) === img }])}" data-v-8db2d9d8><img${ssrRenderAttr("src", img)} alt="SKU图片" data-v-8db2d9d8></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="premium-service-card" data-v-8db2d9d8><div class="premium-service-title" data-v-8db2d9d8>服务保障</div><div class="premium-service-grid" data-v-8db2d9d8><!--[-->`);
      ssrRenderList(serviceTags, (tag) => {
        _push(`<div class="p-service-item" data-v-8db2d9d8>`);
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
        _push(`<span data-v-8db2d9d8>${ssrInterpolate(tag)}</span></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/goods/ProductGallery.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProductGallery = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8db2d9d8"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_skeleton = ElSkeleton;
  const _component_el_skeleton_item = ElSkeletonItem;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-detail-skeleton" }, _attrs))} data-v-7483f82e><div class="skeleton-content" data-v-7483f82e><div class="skeleton-left" data-v-7483f82e>`);
  _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
    template: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-main-img"
        }, null, _parent2, _scopeId));
        _push2(`<div class="skeleton-thumbs" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "image",
          class: "skeleton-thumb"
        }, null, _parent2, _scopeId));
        _push2(`</div><div class="skeleton-service" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "100%", "height": "80px" }
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_el_skeleton_item, {
            variant: "image",
            class: "skeleton-main-img"
          }),
          createVNode("div", { class: "skeleton-thumbs" }, [
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "image",
              class: "skeleton-thumb"
            })
          ]),
          createVNode("div", { class: "skeleton-service" }, [
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "100%", "height": "80px" }
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="skeleton-right" data-v-7483f82e>`);
  _push(ssrRenderComponent(_component_el_skeleton, { animated: "" }, {
    template: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "h1",
          style: { "width": "80%", "height": "32px", "margin-bottom": "16px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "120px", "height": "24px", "margin-bottom": "24px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "rect",
          style: { "width": "100%", "height": "40px", "margin-bottom": "30px", "border-radius": "20px" }
        }, null, _parent2, _scopeId));
        _push2(`<div style="${ssrRenderStyle({ "margin-bottom": "30px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "60px", "margin-bottom": "10px" }
        }, null, _parent2, _scopeId));
        _push2(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "10px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "80px", "height": "36px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "80px", "height": "36px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "80px", "height": "36px" }
        }, null, _parent2, _scopeId));
        _push2(`</div></div><div style="${ssrRenderStyle({ "margin-bottom": "30px", "display": "flex", "align-items": "baseline", "gap": "10px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "h3",
          style: { "width": "150px", "height": "40px" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "text",
          style: { "width": "80px" }
        }, null, _parent2, _scopeId));
        _push2(`</div><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px", "height": "52px" })}" data-v-7483f82e${_scopeId}>`);
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "flex": "1", "height": "100%" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "140px", "height": "100%" }
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_el_skeleton_item, {
          variant: "button",
          style: { "width": "100px", "height": "100%" }
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(_component_el_skeleton_item, {
            variant: "h1",
            style: { "width": "80%", "height": "32px", "margin-bottom": "16px" }
          }),
          createVNode(_component_el_skeleton_item, {
            variant: "text",
            style: { "width": "120px", "height": "24px", "margin-bottom": "24px" }
          }),
          createVNode(_component_el_skeleton_item, {
            variant: "rect",
            style: { "width": "100%", "height": "40px", "margin-bottom": "30px", "border-radius": "20px" }
          }),
          createVNode("div", { style: { "margin-bottom": "30px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "60px", "margin-bottom": "10px" }
            }),
            createVNode("div", { style: { "display": "flex", "gap": "10px" } }, [
              createVNode(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "80px", "height": "36px" }
              }),
              createVNode(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "80px", "height": "36px" }
              }),
              createVNode(_component_el_skeleton_item, {
                variant: "button",
                style: { "width": "80px", "height": "36px" }
              })
            ])
          ]),
          createVNode("div", { style: { "margin-bottom": "30px", "display": "flex", "align-items": "baseline", "gap": "10px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "h3",
              style: { "width": "150px", "height": "40px" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "text",
              style: { "width": "80px" }
            })
          ]),
          createVNode("div", { style: { "display": "flex", "gap": "10px", "height": "52px" } }, [
            createVNode(_component_el_skeleton_item, {
              variant: "button",
              style: { "flex": "1", "height": "100%" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "button",
              style: { "width": "140px", "height": "100%" }
            }),
            createVNode(_component_el_skeleton_item, {
              variant: "button",
              style: { "width": "100px", "height": "100%" }
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/goods/ProductDetailSkeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductDetailSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7483f82e"]]);
const useCartAnimation = () => {
  const startAnimation = (startEl, imageSrc, onComplete) => {
    const targetEl = (void 0).getElementById("cart-icon-ref");
    if (!targetEl) {
      console.warn("Cart icon target not found");
      onComplete?.();
      return;
    }
    const startRect = startEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const flyer = (void 0).createElement("img");
    flyer.src = imageSrc;
    flyer.style.position = "fixed";
    flyer.style.zIndex = "9999";
    flyer.style.width = "50px";
    flyer.style.height = "50px";
    flyer.style.objectFit = "cover";
    flyer.style.borderRadius = "50%";
    flyer.style.transition = "all 0.8s cubic-bezier(0.2, -0.3, 0.1, 1.2)";
    flyer.style.left = `${startRect.left + startRect.width / 2 - 25}px`;
    flyer.style.top = `${startRect.top + startRect.height / 2 - 25}px`;
    flyer.style.opacity = "0.8";
    flyer.style.pointerEvents = "none";
    (void 0).body.appendChild(flyer);
    flyer.offsetHeight;
    requestAnimationFrame(() => {
      flyer.style.left = `${targetRect.left + targetRect.width / 2 - 10}px`;
      flyer.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`;
      flyer.style.width = "20px";
      flyer.style.height = "20px";
      flyer.style.opacity = "0.5";
    });
    setTimeout(() => {
      if ((void 0).body.contains(flyer)) {
        (void 0).body.removeChild(flyer);
      }
      onComplete?.();
    }, 800);
  };
  return {
    startAnimation
  };
};
const useFlyingAnimation = () => {
  const startAnimation = (startEl, imageSrc, targetId, onComplete) => {
    if (!startEl) {
      console.warn("Start element is null");
      onComplete?.();
      return;
    }
    const targetEl = (void 0).getElementById(targetId);
    if (!targetEl) {
      console.warn(`Target element #${targetId} not found`);
      onComplete?.();
      return;
    }
    const startRect = startEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const flyer = (void 0).createElement("img");
    flyer.src = imageSrc;
    flyer.style.position = "fixed";
    flyer.style.zIndex = "9999";
    flyer.style.width = "50px";
    flyer.style.height = "50px";
    flyer.style.objectFit = "cover";
    flyer.style.borderRadius = "50%";
    flyer.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.5)";
    flyer.style.transition = "all 0.8s cubic-bezier(0.2, -0.3, 0.1, 1.2)";
    flyer.style.left = `${startRect.left + startRect.width / 2 - 25}px`;
    flyer.style.top = `${startRect.top + startRect.height / 2 - 25}px`;
    flyer.style.opacity = "0.9";
    flyer.style.pointerEvents = "none";
    (void 0).body.appendChild(flyer);
    flyer.offsetHeight;
    requestAnimationFrame(() => {
      flyer.style.left = `${targetRect.left + targetRect.width / 2 - 10}px`;
      flyer.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`;
      flyer.style.width = "20px";
      flyer.style.height = "20px";
      flyer.style.opacity = "0";
    });
    setTimeout(() => {
      targetEl.style.transform = "scale(1.2)";
      setTimeout(() => {
        targetEl.style.transform = "scale(1)";
      }, 200);
    }, 600);
    setTimeout(() => {
      if ((void 0).body.contains(flyer)) {
        (void 0).body.removeChild(flyer);
      }
      onComplete?.();
    }, 800);
  };
  return {
    startAnimation
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const FaqTicker = defineAsyncComponent(() => import("./FaqTicker-zv4QXmzP.js"));
    const LoginRegisterModal = defineAsyncComponent(() => import("./LoginRegisterModal-ClwExjfE.js"));
    const router = useRouter();
    const {
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
      pending,
      formatPrice,
      buyNow,
      addToCart,
      isFavorited,
      toggleFavorite,
      goodsSeo
    } = useProductDetail();
    useHead({
      title: computed(() => `${goodsSeo.value.title} - 凡图拉`),
      meta: [
        { name: "description", content: computed(() => goodsSeo.value.desc) },
        { name: "keywords", content: computed(() => `${goodsSeo.value.title},数字产品,代充,凡图拉`) },
        { property: "og:title", content: computed(() => goodsSeo.value.title) },
        { property: "og:description", content: computed(() => goodsSeo.value.desc) },
        { property: "og:image", content: computed(() => goodsSeo.value.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: computed(() => goodsSeo.value.title) },
        { name: "twitter:image", content: computed(() => goodsSeo.value.image) }
      ]
    });
    const { startAnimation } = useCartAnimation();
    const { startAnimation: startFavAnimation } = useFlyingAnimation();
    const goToFaq = (faq) => {
      if (faq.id) {
        router.push(`/faq?q=${faq.id}`);
      } else {
        router.push("/faq");
      }
    };
    const goBack = () => router.back();
    const handleAddToCartWrapper = async (event) => {
      const { useCartStore: useCartStore2 } = await import("./cart-CDhPH3qi.js");
      const cartStore = useCartStore2();
      addToCart(() => {
        const btnEl = event.target;
        const target = btnEl.closest("button") || btnEl;
        startAnimation(target, matchedSku.value?.image || goodsInfo.value.image, () => {
          cartStore.miniCartVisible = true;
          ElMessage.success("已成功加入购物车");
        });
      });
    };
    const handleToggleFavorite = (event) => {
      toggleFavorite(event, (target, image) => {
        startFavAnimation(target, image, "favorites-icon-ref", () => {
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "goods-detail-page" }, _attrs))} data-v-05c2624a><div style="${ssrRenderStyle({ "height": "20px" })}" data-v-05c2624a></div>`);
      if (unref(goodsError)) {
        _push(`<div class="api-warning-bar" data-v-05c2624a> ⚠️ 网络连接异常，正在预览演示数据 </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="goods-content" data-v-05c2624a>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(ProductDetailSkeleton, null, null, _parent));
      } else {
        _push(`<div class="goods-content-inner" data-v-05c2624a><div class="back-btn-row" data-v-05c2624a>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "secondary",
          onClick: goBack
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(arrow_left_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(arrow_left_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 返回上一页 `);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 返回上一页 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="goods-detail-content" data-v-05c2624a><div class="goods-main-section" data-v-05c2624a>`);
        _push(ssrRenderComponent(ProductGallery, {
          modelValue: unref(selectedSkuImage),
          "onUpdate:modelValue": ($event) => isRef(selectedSkuImage) ? selectedSkuImage.value = $event : null,
          "default-image": unref(goodsInfo).image,
          images: unref(skuImages)
        }, null, _parent));
        _push(`<div class="goods-info-panel" data-v-05c2624a><div class="info-header" data-v-05c2624a><h1 class="product-name" data-v-05c2624a>${ssrInterpolate(unref(goodsInfo).name)}</h1><div class="product-sales-badge" data-v-05c2624a> 累计销量 <span data-v-05c2624a>${ssrInterpolate(unref(goodsInfo).sales)}</span></div></div>`);
        _push(ssrRenderComponent(unref(FaqTicker), {
          faqs: unref(faqs),
          onClick: ($event) => goToFaq({})
        }, null, _parent));
        if (unref(hasSkus)) {
          _push(`<div class="spec-selection-area" data-v-05c2624a><!--[-->`);
          ssrRenderList(unref(specGroups), (specGroup) => {
            _push(`<div class="spec-group" data-v-05c2624a><div class="spec-label" data-v-05c2624a>${ssrInterpolate(specGroup.name)}</div><div class="spec-values" data-v-05c2624a><!--[-->`);
            ssrRenderList(specGroup.values, (val) => {
              _push(`<div class="${ssrRenderClass(["spec-val-btn", { active: unref(selectedSpecs)[specGroup.name] === val }])}" data-v-05c2624a>${ssrInterpolate(val)}</div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-sku-notice" data-v-05c2624a><div class="notice-emoji" data-v-05c2624a>📦✨</div><h3 data-v-05c2624a>我正在疑狂补货中！</h3><p data-v-05c2624a>商品正在准备中，请稍后再来或联系客服了解更多~</p></div>`);
        }
        if (unref(matchedSku)?.intro) {
          _push(`<div class="sku-intro-section" data-v-05c2624a><span class="sku-intro-text" data-v-05c2624a>${ssrInterpolate(unref(matchedSku).intro)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="price-display-section compact-price-area" data-v-05c2624a>`);
        if (unref(hasSkus)) {
          _push(`<!--[--><div class="price-stock-row" data-v-05c2624a><div class="current-price-box" data-v-05c2624a><span class="p-amount" data-v-05c2624a>${ssrInterpolate(unref(formatPrice)(unref(currentPrice)))}</span></div><div class="stock-info" data-v-05c2624a>`);
          if (unref(stockLoading)) {
            _push(`<span class="stock-badge loading" data-v-05c2624a>查询中...</span>`);
          } else if (unref(hasStock)) {
            _push(`<span class="stock-badge" data-v-05c2624a>库存: ${ssrInterpolate(unref(stock))}</span>`);
          } else {
            _push(`<span class="stock-badge out-of-stock" data-v-05c2624a>暂时缺货</span>`);
          }
          _push(`</div></div>`);
          if (unref(allowAddon) && unref(hasStock)) {
            _push(`<div class="qty-control" data-v-05c2624a><div class="q-actions" data-v-05c2624a><button${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-05c2624a>-</button><input type="number"${ssrRenderAttr("value", unref(qty))} min="1"${ssrIncludeBooleanAttr(!unref(hasStock)) ? " disabled" : ""} data-v-05c2624a><button${ssrIncludeBooleanAttr(!unref(hasStock) || unref(qty) >= unref(stock)) ? " disabled" : ""} data-v-05c2624a>+</button></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<div class="no-price-notice" data-v-05c2624a><span class="out-of-stock-large" data-v-05c2624a>暂时缺货</span></div>`);
        }
        _push(`</div><div class="main-actions" data-v-05c2624a>`);
        _push(ssrRenderComponent(BaseButton, {
          "theme-id": "marketing-buy",
          class: "flex-1",
          disabled: unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting),
          loading: unref(submitting),
          onClick: unref(buyNow)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(stockLoading) ? "加载中..." : unref(hasSkus) && unref(hasStock) ? "立即极速购买" : "暂时缺货")}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(stockLoading) ? "加载中..." : unref(hasSkus) && unref(hasStock) ? "立即极速购买" : "暂时缺货"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="secondary-btns" data-v-05c2624a>`);
        _push(ssrRenderComponent(BaseButton, {
          "theme-id": "secondary",
          onClick: ($event) => handleAddToCartWrapper($event),
          disabled: unref(stockLoading) || !unref(hasStock) || !unref(hasSkus) || unref(submitting)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(shopping_cart_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(shopping_cart_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` 加入购物车 `);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(shopping_cart_default))
                  ]),
                  _: 1
                }),
                createTextVNode(" 加入购物车 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(BaseButton, {
          "theme-id": "secondary",
          class: { favorited: unref(isFavorited) },
          onClick: ($event) => handleToggleFavorite($event),
          disabled: unref(stockLoading) || !unref(hasStock) || !unref(hasSkus)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(isFavorited)) {
                      _push3(ssrRenderComponent(unref(star_default), null, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(star_filled_default), null, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      !unref(isFavorited) ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(isFavorited) ? "已收藏" : "收藏")}`);
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    !unref(isFavorited) ? (openBlock(), createBlock(unref(star_default), { key: 0 })) : (openBlock(), createBlock(unref(star_filled_default), { key: 1 }))
                  ]),
                  _: 1
                }),
                createTextVNode(" " + toDisplayString(unref(isFavorited) ? "已收藏" : "收藏"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="safe-disclaimer" style="${ssrRenderStyle({ "margin-top": "20px" })}" data-v-05c2624a>`);
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
        _push(` 版权声明：本站展示的徽标、商标及相关标志归各权利人所有。 </div></div></div></div><div class="product-detail-rich" data-v-05c2624a><div class="detail-divider" data-v-05c2624a><span data-v-05c2624a>商品详情介绍</span></div><div class="detail-content-wrap" data-v-05c2624a><!--[-->`);
        ssrRenderList(unref(detailModules), (mod, idx) => {
          _push(`<div class="detail-module" data-v-05c2624a>`);
          if (mod.type === "text") {
            _push(`<div class="detail-text-box" data-v-05c2624a>${ssrInterpolate(mod.content)}</div>`);
          } else if (mod.type === "image") {
            _push(`<img${ssrRenderAttr("src", mod.content)} class="detail-full-img" loading="lazy" decoding="async" data-v-05c2624a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(unref(LoginRegisterModal), {
        visible: _ctx.modal.showLogin,
        onClose: ($event) => _ctx.modal.closeLogin()
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-05c2624a"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-Bi_CsUQj.js.map
