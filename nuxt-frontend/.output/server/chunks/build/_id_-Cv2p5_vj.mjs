import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { E as ElImage } from './index-BhTf_yFC.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { c as arrow_left_default, j as circle_close_filled_default, aj as timer_default, V as ticket_default, a as arrow_right_default, M as question_filled_default, D as arrow_down_default, aC as wallet_filled_default, r as refresh_default, a8 as select_default, w as warning_filled_default } from './index-CmsdIFY8.mjs';
import { u as useCheckout } from './useCheckout-DLrL_NXv.mjs';
import { C as CouponSelectorModal } from './CouponSelectorModal-BckVRCA-.mjs';
import { R as RechargeModal } from './RechargeModal-SMBZGTXX.mjs';
import { E as ElMessage } from './index-eYVppfk3.mjs';
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
import './index-DBQY6eQ6.mjs';
import './index-ebnaz0b7.mjs';
import './scroll-Df9VGR5S.mjs';
import './raf-CQRaPAjg.mjs';
import './index-D2CY7Ok3.mjs';
import './user-CzJGyf4T.mjs';
import './auth-BCuS92ob.mjs';
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
import './cart-D8FaBhjU.mjs';
import './supabase-fcLPkUp1.mjs';
import './interval-BHZX8LlC.mjs';
import './index-DZvUdcyn.mjs';
import './icon-eqoLCvNY.mjs';
import './index-CO6H4Lsj.mjs';
import './use-global-config-BPKjMkzA.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import '@ctrl/tinycolor';
import './index-EXqkolUp.mjs';
import './BaseCouponTicket-BGNJ4D7F.mjs';
import './coupon-D1so52Ot.mjs';
import './virtual_public-CTq2VprR.mjs';
import './virtual_public-FTeKDcap.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
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
    watch(showPaySuccess, (val) => {
      if (val) {
        ElMessage.success("\u652F\u4ED8\u6210\u529F");
        setTimeout(() => {
          router.replace("/mobile/profile");
        }, 1e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      const _component_el_image = ElImage;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page" }, _attrs))} data-v-129e6473><div class="header" data-v-129e6473><div class="btn-back" data-v-129e6473>`);
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
      _push(`</div><div class="header-title" data-v-129e6473>\u786E\u8BA4\u8BA2\u5355</div><div class="header-placeholder" data-v-129e6473></div></div>`);
      if (unref(loading)) {
        _push(`<div class="state-box" data-v-129e6473><div class="spinner" data-v-129e6473></div><span data-v-129e6473>\u52A0\u8F7D\u8BA2\u5355\u4E2D...</span></div>`);
      } else if (unref(error)) {
        _push(`<div class="state-box error" data-v-129e6473>`);
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
        _push(`<span data-v-129e6473>${ssrInterpolate(unref(error))}</span><button class="btn-retry" data-v-129e6473>\u8FD4\u56DE\u9996\u9875</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="content" data-v-129e6473>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar" data-v-129e6473>`);
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
          _push(`<span data-v-129e6473>\u8BF7\u5728 <span class="time-val" data-v-129e6473>${ssrInterpolate(unref(formatCountdown))}</span> \u5185\u652F\u4ED8</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          var _a2, _b, _c;
          _push(`<div class="card product-card" data-v-129e6473><div class="pc-head" data-v-129e6473><span class="pc-tag" data-v-129e6473>\u5546\u54C1\u4FE1\u606F</span><span class="pc-order-no" data-v-129e6473>${ssrInterpolate(order.order_no)}</span></div><div class="pc-body" data-v-129e6473><div class="thumb" data-v-129e6473>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: (_a2 = order.product_snapshot) == null ? void 0 : _a2.image,
            fit: "cover"
          }, null, _parent));
          _push(`</div><div class="info" data-v-129e6473><div class="p-name" data-v-129e6473>${ssrInterpolate((_b = order.product_snapshot) == null ? void 0 : _b.product_name)}</div><div class="p-sku" data-v-129e6473><div class="sku-pill" data-v-129e6473>${ssrInterpolate(unref(formatSpec)((_c = order.sku_snapshot) == null ? void 0 : _c.spec_combination))}</div></div><div class="p-price-row" data-v-129e6473><div class="p-price" data-v-129e6473>${ssrInterpolate(order.unit_price.toFixed(2))} \u70B9</div><div class="p-qty" data-v-129e6473>x ${ssrInterpolate(order.quantity)}</div></div></div></div></div>`);
        });
        _push(`<!--]--><div class="card coupon-card" data-v-129e6473><div class="cc-left" data-v-129e6473>`);
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
        _push(`<span data-v-129e6473>\u4F18\u60E0\u5238</span></div><div class="cc-right" data-v-129e6473>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="coupon-val" data-v-129e6473>- ${ssrInterpolate(unref(couponDiscount).toFixed(2))} \u70B9</span>`);
        } else {
          _push(`<span class="coupon-ph" data-v-129e6473>\u9009\u62E9\u4F18\u60E0\u5238</span>`);
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
        _push(`</div></div>`);
        if (checkoutFaqs.value.length > 0) {
          _push(`<div class="faq-section" data-v-129e6473><div class="faq-header" data-v-129e6473>`);
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
          _push(` \u5E38\u89C1\u95EE\u9898 </div><div class="faq-list" data-v-129e6473><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-129e6473><div class="faq-q" data-v-129e6473><span data-v-129e6473>${ssrInterpolate(faq.question)}</span>`);
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
            _push(`</div><div class="faq-a" style="${ssrRenderStyle(activeFaq.value === index ? null : { display: "none" })}" data-v-129e6473>${ssrInterpolate(faq.answer)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card pay-card" data-v-129e6473><div class="card-title" data-v-129e6473>\u652F\u4ED8\u65B9\u5F0F</div><div class="pay-methods" data-v-129e6473><div class="pm-item active" data-v-129e6473><div class="pm-icon balance" data-v-129e6473>`);
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
        _push(`</div><div class="pm-info" data-v-129e6473><div class="pm-name" data-v-129e6473>\u989D\u5EA6\u652F\u4ED8</div><div class="pm-desc" data-v-129e6473> \u53EF\u7528\u989D\u5EA6: ${ssrInterpolate(unref(userBalance).toFixed(2))} \u70B9 <div class="refresh-btn" data-v-129e6473>`);
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
        _push(`</div></div></div><div class="pm-check" data-v-129e6473>`);
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
        _push(`</div></div></div></div><div class="tips-box" data-v-129e6473>`);
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
        _push(`<span data-v-129e6473>\u865A\u62DF\u5546\u54C1\u81EA\u52A8\u53D1\u8D27\uFF0C\u552E\u51FA\u540E\u6982\u4E0D\u9000\u6362\u3002\u8D85\u65F6\u672A\u652F\u4ED8\u5C06\u81EA\u52A8\u91CA\u653E\u5E93\u5B58\u3002</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(preOrders).length > 0) {
        _push(`<div class="footer-bar" data-v-129e6473><div class="fb-left" data-v-129e6473><span class="fb-label" data-v-129e6473>\u5E94\u4ED8:</span><span class="fb-price" data-v-129e6473><span class="fb-big" data-v-129e6473>${ssrInterpolate(unref(finalPayAmount).toFixed(2))}</span> \u70B9</span></div><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "btn-pay"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-129e6473>`);
        if (unref(paying)) {
          _push(`<div class="spinner-sm" data-v-129e6473></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-129e6473>\u989D\u5EA6\u4E0D\u8DB3\uFF0C\u53BB\u5145\u503C</span>`);
        } else {
          _push(`<span data-v-129e6473>\u7ACB\u5373\u652F\u4ED8</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(CouponSelectorModal, {
        modelValue: showCouponModal.value,
        "onUpdate:modelValue": ($event) => showCouponModal.value = $event,
        orderAmount: unref(totalProductAmount),
        skuIds: unref(orderSkuIds),
        productIds: unref(orderProductIds),
        currentCouponId: (_a = unref(selectedCoupon)) == null ? void 0 : _a.id,
        onSelect: unref(handleCouponSelect)
      }, null, _parent));
      _push(ssrRenderComponent(RechargeModal, {
        visible: showRechargeModal.value,
        onClose: handleRechargeClose,
        onSuccess: handleRechargeClose
      }, null, _parent));
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-129e6473"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Cv2p5_vj.mjs.map
