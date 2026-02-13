import { E as ElIcon } from "./index-CsSUb8pm.js";
import { E as ElImage } from "./index-ALppOkb6.js";
/* empty css              */
/* empty css                         */
/* empty css                    */
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { g as circle_close_filled_default, an as timer_default, Z as ticket_default, m as arrow_right_default, P as question_filled_default, D as arrow_down_default, aG as wallet_filled_default, A as refresh_default, a4 as select_default, h as warning_filled_default } from "./index-DuV_oMrC.js";
import { u as useCheckout } from "./useCheckout-DbJOkqrq.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { M as MobileSubPageHeader } from "./MobileSubPageHeader-iRi1Uk9z.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "./objects-Bz74KHmq.js";
import "lodash-unified";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-CG7JU5b_.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-xMedQC9S.js";
import "./index-CC_9xuAU.js";
import "./scroll-DHYrZ40v.js";
import "./raf-CQRaPAjg.js";
import "./index-Cy25Tved.js";
import "./user-C1i1UnhA.js";
import "./supabase-jxF0-7J3.js";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
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
import "./common-D9iMPQj0.js";
import "./cart-B8xez9id.js";
import "./supabase-fcLPkUp1.js";
import "./interval-BHZX8LlC.js";
import "./index-Ho-fELR6.js";
import "./icon-CyvpkMdQ.js";
import "./use-global-config-Dt87SALX.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const MobileCouponSelectorSheet = defineAsyncComponent(() => import("./MobileCouponSelectorSheet-BR9jOFw_.js"));
    const RechargeModal = defineAsyncComponent(() => import("./RechargeModal-CDeMTilj.js"));
    const MobilePaySuccessModal = defineAsyncComponent(() => import("./MobilePaySuccessModal-ER6f0jEh.js"));
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page-glass" }, _attrs))} data-v-39576671>`);
      _push(ssrRenderComponent(MobileSubPageHeader, {
        title: "确认订单",
        back: () => unref(router).back()
      }, null, _parent));
      if (unref(loading)) {
        _push(`<div class="state-box" data-v-39576671><div class="spinner" data-v-39576671></div><span data-v-39576671>加载订单中...</span></div>`);
      } else if (unref(error)) {
        _push(`<div class="state-box error" data-v-39576671><div class="error-icon" data-v-39576671>`);
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
        _push(`</div><span data-v-39576671>${ssrInterpolate(unref(error))}</span><button class="btn-retry" data-v-39576671>返回首页</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="content" data-v-39576671>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar-glass" data-v-39576671>`);
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
          _push(`<span data-v-39576671>请在 <span class="time-val" data-v-39576671>${ssrInterpolate(unref(formatCountdown))}</span> 内支付</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          _push(`<div class="info-card-glass" data-v-39576671><div class="card-head" data-v-39576671><span class="card-title-sm" data-v-39576671>商品信息</span><span class="order-no" data-v-39576671>${ssrInterpolate(order.order_no)}</span></div><div class="product-body" data-v-39576671><div class="thumb-glow" data-v-39576671>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: order.product_snapshot?.image,
            fit: "cover",
            loading: "lazy"
          }, null, _parent));
          _push(`</div><div class="product-info" data-v-39576671><div class="p-name" data-v-39576671>${ssrInterpolate(order.product_snapshot?.product_name)}</div><div class="p-sku" data-v-39576671><div class="sku-pill-glass" data-v-39576671>${ssrInterpolate(unref(formatSpec)(order.sku_snapshot?.spec_combination))}</div></div><div class="p-price-row" data-v-39576671><div class="p-price" data-v-39576671>${ssrInterpolate(order.unit_price.toFixed(2))} <span class="unit" data-v-39576671>点</span></div><div class="p-qty" data-v-39576671>x ${ssrInterpolate(order.quantity)}</div></div></div></div></div>`);
        });
        _push(`<!--]--><div class="info-card-glass clickable" data-v-39576671><div class="row-between" data-v-39576671><div class="row-left" data-v-39576671><div class="icon-box-glass" data-v-39576671>`);
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
        _push(`</div><span class="label" data-v-39576671>优惠券</span></div><div class="row-right" data-v-39576671>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="coupon-val" data-v-39576671>- ${ssrInterpolate(unref(couponDiscount).toFixed(2))} 点</span>`);
        } else {
          _push(`<span class="coupon-ph" data-v-39576671>选择优惠券</span>`);
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
          _push(`<div class="faq-section" data-v-39576671><div class="section-title" data-v-39576671>`);
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
          _push(` 常见问题 </div><div class="faq-list-glass" data-v-39576671><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-39576671><div class="faq-q" data-v-39576671><span data-v-39576671>${ssrInterpolate(faq.question)}</span>`);
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
            _push(`</div><div class="faq-a" style="${ssrRenderStyle(activeFaq.value === index ? null : { display: "none" })}" data-v-39576671>${ssrInterpolate(faq.answer)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info-card-glass" data-v-39576671><div class="card-title" data-v-39576671>支付方式</div><div class="pay-methods" data-v-39576671><div class="pm-item-glass active" data-v-39576671><div class="pm-icon balance" data-v-39576671>`);
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
        _push(`</div><div class="pm-info" data-v-39576671><div class="pm-name" data-v-39576671>额度支付</div><div class="pm-desc" data-v-39576671> 可用额度: ${ssrInterpolate(unref(userBalance).toFixed(2))} 点 <div class="refresh-btn" data-v-39576671>`);
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
        _push(`</div></div></div><div class="pm-check" data-v-39576671>`);
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
        _push(`</div></div></div></div><div class="tips-box-glass" data-v-39576671>`);
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
        _push(`<span data-v-39576671>虚拟商品自动发货，售出后概不退换。超时未支付将自动释放库存。</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(preOrders).length > 0) {
        _push(`<div class="footer-bar-glass" data-v-39576671><div class="fb-left" data-v-39576671><span class="fb-label" data-v-39576671>应付:</span><span class="fb-price" data-v-39576671><span class="fb-big" data-v-39576671>${ssrInterpolate(unref(finalPayAmount).toFixed(2))}</span> 点</span></div><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "btn-pay-glow"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-39576671>`);
        if (unref(paying)) {
          _push(`<div class="spinner-sm" data-v-39576671></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-39576671>额度不足，去充值</span>`);
        } else {
          _push(`<span data-v-39576671>立即支付</span>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39576671"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DrscWduS.js.map
