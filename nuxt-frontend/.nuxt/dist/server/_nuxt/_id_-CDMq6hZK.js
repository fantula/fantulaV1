import { E as ElIcon } from "./index-C4aUwruK.js";
import { E as ElImage } from "./index-CEmMQsAU.js";
/* empty css              */
/* empty css                         */
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { d as circle_close_filled_default, a5 as timer_default, E as ticket_default, f as arrow_right_default, aj as question_filled_default, a3 as arrow_down_default, ax as wallet_filled_default, M as refresh_default, L as select_default, w as warning_filled_default } from "./index-CbQ9NNm4.js";
import { u as useCheckout } from "./useCheckout-B7iN9zRP.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-Na2GamiB.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-DI9LAhPg.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DHEUW9kI.js";
import "./index-C1njJNPQ.js";
import "./index-COtmEGfB.js";
import "./scroll-ozMyDWSO.js";
import "./raf-CQRaPAjg.js";
import "./index-DuyRWKSc.js";
import "./user-DLDq0pTF.js";
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
import "./common-CeIxTI3I.js";
import "./cart-Lqo8L2Wc.js";
import "./supabase-D4dCvdwD.js";
import "./useNotify-BkAlUoZx.js";
/* empty css                    */
import "./useToast-DsT-1f4c.js";
import "./index-CQnGB6WT.js";
import "./icon-D-Vgi0cb.js";
import "./use-global-config-CaR6i8cb.js";
import "./interval-BnEBQU8I.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const MobileCouponSelectorSheet = defineAsyncComponent(() => import("./MobileCouponSelectorSheet-CSpfCC_m.js"));
    const RechargeModal = defineAsyncComponent(() => import("./RechargeModal-B6RJ3rNT.js"));
    const MobilePaySuccessModal = defineAsyncComponent(() => import("./MobilePaySuccessModal-BuM_iLHt.js"));
    const route = useRoute();
    const router = useRouter();
    const showCouponModal = ref(false);
    const showRechargeModal = ref(false);
    const checkoutFaqs = ref([]);
    const activeFaq = ref(null);
    const {
      loading,
      error,
      preOrders,
      paying,
      showPaySuccess,
      // Data
      selectedCoupon,
      couponDiscount,
      remainingSeconds,
      formatCountdown,
      totalProductAmount,
      finalPayAmount,
      userBalance,
      lastOrderId,
      // Get Last Order ID
      lastOrderAmount,
      // Get Last Payment Amount
      orderSkuIds,
      orderProductIds,
      handleCouponSelect,
      formatSpec,
      refreshBalance,
      refreshingBalance
    } = useCheckout();
    computed(() => {
      const id = route.params.id;
      const ids = route.query.ids;
      if (ids) return ids.split(",");
      if (id) return [id];
      return [];
    });
    const isBalanceInsufficient = computed(() => {
      return userBalance.value < finalPayAmount.value;
    });
    const handleRechargeClose = () => {
      showRechargeModal.value = false;
      refreshBalance();
    };
    const goToOrder = () => {
      router.replace("/mobile/profile/order");
    };
    const goToHome = () => {
      router.replace("/mobile");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page-glass" }, _attrs))} data-v-e96b0e8a>`);
      _push(ssrRenderComponent(MobileSubPageHeader, {
        title: "确认订单",
        back: () => unref(router).back()
      }, null, _parent));
      if (unref(loading)) {
        _push(`<div class="state-box" data-v-e96b0e8a><div class="spinner" data-v-e96b0e8a></div><span data-v-e96b0e8a>加载订单中...</span></div>`);
      } else if (unref(error)) {
        _push(`<div class="state-box error" data-v-e96b0e8a><div class="error-icon" data-v-e96b0e8a>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(circle_close_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(circle_close_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><span data-v-e96b0e8a>${ssrInterpolate(unref(error))}</span><button class="btn-retry" data-v-e96b0e8a>返回首页</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="content" data-v-e96b0e8a>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar-glass" data-v-e96b0e8a>`);
          _push(ssrRenderComponent(_component_el_icon, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(timer_default), null, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(timer_default))
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<span data-v-e96b0e8a>请在 <span class="time-val" data-v-e96b0e8a>${ssrInterpolate(unref(formatCountdown))}</span> 内支付</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          _push(`<div class="info-card-glass" data-v-e96b0e8a><div class="card-head" data-v-e96b0e8a><span class="card-title-sm" data-v-e96b0e8a>商品信息</span><span class="order-no" data-v-e96b0e8a>${ssrInterpolate(order.order_no)}</span></div><div class="product-body" data-v-e96b0e8a><div class="thumb-glow" data-v-e96b0e8a>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: order.product_snapshot?.image,
            fit: "cover",
            loading: "lazy"
          }, null, _parent));
          _push(`</div><div class="product-info" data-v-e96b0e8a><div class="p-name" data-v-e96b0e8a>${ssrInterpolate(order.product_snapshot?.product_name)}</div><div class="p-sku" data-v-e96b0e8a><div class="sku-pill-glass" data-v-e96b0e8a>${ssrInterpolate(unref(formatSpec)(order.sku_snapshot?.spec_combination))}</div></div><div class="p-price-row" data-v-e96b0e8a><div class="p-price" data-v-e96b0e8a>${ssrInterpolate(order.unit_price.toFixed(2))} <span class="unit" data-v-e96b0e8a>点</span></div><div class="p-qty" data-v-e96b0e8a>x ${ssrInterpolate(order.quantity)}</div></div></div></div></div>`);
        });
        _push(`<!--]--><div class="info-card-glass clickable" data-v-e96b0e8a><div class="row-between" data-v-e96b0e8a><div class="row-left" data-v-e96b0e8a><div class="icon-box-glass" data-v-e96b0e8a>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ticket_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(ticket_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><span class="label" data-v-e96b0e8a>优惠券</span></div><div class="row-right" data-v-e96b0e8a>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="coupon-val" data-v-e96b0e8a>- ${ssrInterpolate(unref(couponDiscount).toFixed(2))} 点</span>`);
        } else {
          _push(`<span class="coupon-ph" data-v-e96b0e8a>选择优惠券</span>`);
        }
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(arrow_right_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(arrow_right_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
        if (checkoutFaqs.value.length > 0) {
          _push(`<div class="faq-section" data-v-e96b0e8a><div class="section-title" data-v-e96b0e8a>`);
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
          _push(` 常见问题 </div><div class="faq-list-glass" data-v-e96b0e8a><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-e96b0e8a><div class="faq-q" data-v-e96b0e8a><span data-v-e96b0e8a>${ssrInterpolate(faq.question)}</span>`);
            _push(ssrRenderComponent(_component_el_icon, {
              class: ["arrow", { rotate: activeFaq.value === index }]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(arrow_down_default), null, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(arrow_down_default))
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div><div class="faq-a" style="${ssrRenderStyle(activeFaq.value === index ? null : { display: "none" })}" data-v-e96b0e8a>${ssrInterpolate(faq.answer)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info-card-glass" data-v-e96b0e8a><div class="card-title" data-v-e96b0e8a>支付方式</div><div class="pay-methods" data-v-e96b0e8a><div class="pm-item-glass active" data-v-e96b0e8a><div class="pm-icon balance" data-v-e96b0e8a>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(wallet_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(wallet_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="pm-info" data-v-e96b0e8a><div class="pm-name" data-v-e96b0e8a>额度支付</div><div class="pm-desc" data-v-e96b0e8a> 可用额度: ${ssrInterpolate(unref(userBalance).toFixed(2))} 点 <div class="refresh-btn" data-v-e96b0e8a>`);
        _push(ssrRenderComponent(_component_el_icon, {
          class: { spinning: unref(refreshingBalance) }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(refresh_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(refresh_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div><div class="pm-check" data-v-e96b0e8a>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(select_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(select_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div><div class="tips-box-glass" data-v-e96b0e8a>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(warning_filled_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(warning_filled_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span data-v-e96b0e8a>虚拟商品自动发货，售出后概不退换。超时未支付将自动释放库存。</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(preOrders).length > 0) {
        _push(`<div class="footer-bar-glass" data-v-e96b0e8a><div class="fb-left" data-v-e96b0e8a><span class="fb-label" data-v-e96b0e8a>应付:</span><span class="fb-price" data-v-e96b0e8a><span class="fb-big" data-v-e96b0e8a>${ssrInterpolate(unref(finalPayAmount).toFixed(2))}</span> 点</span></div><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "btn-pay-glow"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-e96b0e8a>`);
        if (unref(paying)) {
          _push(`<div class="spinner-sm" data-v-e96b0e8a></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-e96b0e8a>额度不足，去充值</span>`);
        } else {
          _push(`<span data-v-e96b0e8a>立即支付</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(MobileCouponSelectorSheet), {
        modelValue: showCouponModal.value,
        "onUpdate:modelValue": ($event) => showCouponModal.value = $event,
        orderAmount: unref(totalProductAmount),
        skuIds: unref(orderSkuIds),
        productIds: unref(orderProductIds),
        currentCouponId: unref(selectedCoupon)?.id,
        onSelect: unref(handleCouponSelect)
      }, null, _parent));
      _push(ssrRenderComponent(unref(RechargeModal), {
        visible: showRechargeModal.value,
        onClose: handleRechargeClose,
        onSuccess: handleRechargeClose
      }, null, _parent));
      if (unref(showPaySuccess)) {
        _push(ssrRenderComponent(unref(MobilePaySuccessModal), {
          visible: unref(showPaySuccess),
          orderNo: unref(lastOrderId),
          amount: unref(lastOrderAmount).toFixed(2),
          onViewOrder: goToOrder,
          onGoHome: goToHome,
          onClose: goToOrder
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mobile/checkout/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e96b0e8a"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CDMq6hZK.js.map
