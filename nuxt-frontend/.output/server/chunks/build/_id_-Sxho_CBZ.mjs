import { E as ElIcon } from './index-jl2vZbkg.mjs';
import { E as ElImage } from './index-BmjXUoge.mjs';
import { defineComponent, defineAsyncComponent, ref, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { g as circle_close_filled_default, af as timer_default, T as ticket_default, a as arrow_right_default, J as question_filled_default, A as arrow_down_default, az as wallet_filled_default, r as refresh_default, a6 as select_default, w as warning_filled_default } from './index-DlETah8a.mjs';
import { u as useCheckout } from './useCheckout-BJrDtpVb.mjs';
import { M as MobileSubPageHeader } from './MobileSubPageHeader-yXUwt-_q.mjs';
import { _ as _export_sfc } from './server.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './typescript-D6L75muK.mjs';
import './focus-trap.vue-BCkHbPy6.mjs';
import './aria-Rs9hkxop.mjs';
import './event-D3FEo2C5.mjs';
import './index-K5TIzHX_.mjs';
import './index-7KygWwCI.mjs';
import './scroll-BuMAfCNC.mjs';
import './raf-CQRaPAjg.mjs';
import './index-Cy25Tved.mjs';
import './user-Cnuc6I82.mjs';
import './supabase-jxF0-7J3.mjs';
import '@supabase/supabase-js';
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
import './common-DNRu9xdu.mjs';
import './request-n20yf-Kr.mjs';
import './cart-C8TGo9ts.mjs';
import './supabase-fcLPkUp1.mjs';
import './interval-BHZX8LlC.mjs';
import './index-DSo6N35Z.mjs';
import './icon-CK7WLSPl.mjs';
import './use-global-config-79yNXOXL.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const MobileCouponSelectorSheet = defineAsyncComponent(() => import('./MobileCouponSelectorSheet-Ds6bBvJq.mjs'));
    const RechargeModal = defineAsyncComponent(() => import('./RechargeModal-DyRjlK-h.mjs'));
    const MobilePaySuccessModal = defineAsyncComponent(() => import('./MobilePaySuccessModal-Bx1TfsZr.mjs'));
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
      var _a;
      const _component_el_icon = ElIcon;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page-glass" }, _attrs))} data-v-3367ed1b>`);
      _push(ssrRenderComponent(MobileSubPageHeader, {
        title: "\u786E\u8BA4\u8BA2\u5355",
        back: () => unref(router).back()
      }, null, _parent));
      if (unref(loading)) {
        _push(`<div class="state-box" data-v-3367ed1b><div class="spinner" data-v-3367ed1b></div><span data-v-3367ed1b>\u52A0\u8F7D\u8BA2\u5355\u4E2D...</span></div>`);
      } else if (unref(error)) {
        _push(`<div class="state-box error" data-v-3367ed1b><div class="error-icon" data-v-3367ed1b>`);
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
        _push(`</div><span data-v-3367ed1b>${ssrInterpolate(unref(error))}</span><button class="btn-retry" data-v-3367ed1b>\u8FD4\u56DE\u9996\u9875</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="content" data-v-3367ed1b>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar-glass" data-v-3367ed1b>`);
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
          _push(`<span data-v-3367ed1b>\u8BF7\u5728 <span class="time-val" data-v-3367ed1b>${ssrInterpolate(unref(formatCountdown))}</span> \u5185\u652F\u4ED8</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          var _a2, _b, _c;
          _push(`<div class="info-card-glass" data-v-3367ed1b><div class="card-head" data-v-3367ed1b><span class="card-title-sm" data-v-3367ed1b>\u5546\u54C1\u4FE1\u606F</span><span class="order-no" data-v-3367ed1b>${ssrInterpolate(order.order_no)}</span></div><div class="product-body" data-v-3367ed1b><div class="thumb-glow" data-v-3367ed1b>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: (_a2 = order.product_snapshot) == null ? void 0 : _a2.image,
            fit: "cover",
            loading: "lazy"
          }, null, _parent));
          _push(`</div><div class="product-info" data-v-3367ed1b><div class="p-name" data-v-3367ed1b>${ssrInterpolate((_b = order.product_snapshot) == null ? void 0 : _b.product_name)}</div><div class="p-sku" data-v-3367ed1b><div class="sku-pill-glass" data-v-3367ed1b>${ssrInterpolate(unref(formatSpec)((_c = order.sku_snapshot) == null ? void 0 : _c.spec_combination))}</div></div><div class="p-price-row" data-v-3367ed1b><div class="p-price" data-v-3367ed1b>${ssrInterpolate(order.unit_price.toFixed(2))} <span class="unit" data-v-3367ed1b>\u70B9</span></div><div class="p-qty" data-v-3367ed1b>x ${ssrInterpolate(order.quantity)}</div></div></div></div></div>`);
        });
        _push(`<!--]--><div class="info-card-glass clickable" data-v-3367ed1b><div class="row-between" data-v-3367ed1b><div class="row-left" data-v-3367ed1b><div class="icon-box-glass" data-v-3367ed1b>`);
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
        _push(`</div><span class="label" data-v-3367ed1b>\u4F18\u60E0\u5238</span></div><div class="row-right" data-v-3367ed1b>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="coupon-val" data-v-3367ed1b>- ${ssrInterpolate(unref(couponDiscount).toFixed(2))} \u70B9</span>`);
        } else {
          _push(`<span class="coupon-ph" data-v-3367ed1b>\u9009\u62E9\u4F18\u60E0\u5238</span>`);
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
          _push(`<div class="faq-section" data-v-3367ed1b><div class="section-title" data-v-3367ed1b>`);
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
          _push(` \u5E38\u89C1\u95EE\u9898 </div><div class="faq-list-glass" data-v-3367ed1b><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-3367ed1b><div class="faq-q" data-v-3367ed1b><span data-v-3367ed1b>${ssrInterpolate(faq.question)}</span>`);
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
            _push(`</div><div class="faq-a" style="${ssrRenderStyle(activeFaq.value === index ? null : { display: "none" })}" data-v-3367ed1b>${ssrInterpolate(faq.answer)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="info-card-glass" data-v-3367ed1b><div class="card-title" data-v-3367ed1b>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-3367ed1b><div class="pm-item-glass active" data-v-3367ed1b><div class="pm-icon balance" data-v-3367ed1b>`);
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
        _push(`</div><div class="pm-info" data-v-3367ed1b><div class="pm-name" data-v-3367ed1b>\u989D\u5EA6\u652F\u4ED8</div><div class="pm-desc" data-v-3367ed1b> \u53EF\u7528\u989D\u5EA6: ${ssrInterpolate(unref(userBalance).toFixed(2))} \u70B9 <div class="refresh-btn" data-v-3367ed1b>`);
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
        _push(`</div></div></div><div class="pm-check" data-v-3367ed1b>`);
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
        _push(`</div></div></div></div><div class="tips-box-glass" data-v-3367ed1b>`);
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
        _push(`<span data-v-3367ed1b>\u865A\u62DF\u5546\u54C1\u81EA\u52A8\u53D1\u8D27\uFF0C\u552E\u51FA\u540E\u6982\u4E0D\u9000\u6362\u3002\u8D85\u65F6\u672A\u652F\u4ED8\u5C06\u81EA\u52A8\u91CA\u653E\u5E93\u5B58\u3002</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(preOrders).length > 0) {
        _push(`<div class="footer-bar-glass" data-v-3367ed1b><div class="fb-left" data-v-3367ed1b><span class="fb-label" data-v-3367ed1b>\u5E94\u4ED8:</span><span class="fb-price" data-v-3367ed1b><span class="fb-big" data-v-3367ed1b>${ssrInterpolate(unref(finalPayAmount).toFixed(2))}</span> \u70B9</span></div><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "btn-pay-glow"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-3367ed1b>`);
        if (unref(paying)) {
          _push(`<div class="spinner-sm" data-v-3367ed1b></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-3367ed1b>\u989D\u5EA6\u4E0D\u8DB3\uFF0C\u53BB\u5145\u503C</span>`);
        } else {
          _push(`<span data-v-3367ed1b>\u7ACB\u5373\u652F\u4ED8</span>`);
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
        currentCouponId: (_a = unref(selectedCoupon)) == null ? void 0 : _a.id,
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3367ed1b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Sxho_CBZ.mjs.map
