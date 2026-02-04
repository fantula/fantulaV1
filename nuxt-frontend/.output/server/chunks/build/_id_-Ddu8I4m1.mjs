import { E as ElIcon } from './index-Byc6LUYX.mjs';
import { E as ElTag } from './index-BZB4XnD2.mjs';
import { E as ElButton } from './index-DZvUdcyn.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { c as arrow_left_default, aj as timer_default, M as question_filled_default, D as arrow_down_default, i as info_filled_default, a as arrow_right_default, T as wallet_default, r as refresh_default, a8 as select_default } from './index-CmsdIFY8.mjs';
import { u as useCheckout } from './useCheckout-DLrL_NXv.mjs';
import { _ as _export_sfc } from './server.mjs';
import { C as CouponSelectorModal } from './CouponSelectorModal-BckVRCA-.mjs';
import { W as WalletRechargeModal } from './WalletRechargeModal-ClHnmzJa.mjs';
import './install-VBSKbHUK.mjs';
import 'lodash-unified';
import '@vue/shared';
import '@vueuse/core';
import './objects-Bz74KHmq.mjs';
import './index-CO6H4Lsj.mjs';
import './use-form-item-Bj_anzlj.mjs';
import './constants-hAKFmBbq.mjs';
import './index-DBQY6eQ6.mjs';
import './icon-eqoLCvNY.mjs';
import './use-global-config-BPKjMkzA.mjs';
import '@ctrl/tinycolor';
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
import './index-eYVppfk3.mjs';
import './typescript-D6L75muK.mjs';
import './event-D3FEo2C5.mjs';
import './index-EXqkolUp.mjs';
import './BaseCouponTicket-BGNJ4D7F.mjs';
import './coupon-D1so52Ot.mjs';
import './BaseModal-HTOTXfQj.mjs';
import './BaseButton-B3srPw2H.mjs';
import './virtual_public-CTq2VprR.mjs';
import './virtual_public-FTeKDcap.mjs';
import 'qrcode';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaySuccessModal",
  __ssrInlineRender: true,
  props: {
    orderId: {
      type: String,
      default: "N/A"
    },
    payType: {
      type: String,
      default: "balance"
    },
    amount: {
      type: [String, Number],
      default: 0
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const safeOrderId = computed(() => {
      return props.orderId || "N/A";
    });
    const safeAmount = computed(() => {
      try {
        const num = typeof props.amount === "string" ? parseFloat(props.amount || "0") : props.amount || 0;
        return isNaN(num) ? "0.00" : num.toFixed(2);
      } catch {
        return "0.00";
      }
    });
    const safePayTypeName = computed(() => {
      const typeMap = {
        "alipay": "\u652F\u4ED8\u5B9D\u652F\u4ED8",
        "balance": "\u4F59\u989D\u652F\u4ED8",
        "other": "\u5176\u4ED6\u652F\u4ED8"
      };
      return typeMap[props.payType] || "\u672A\u77E5\u652F\u4ED8\u65B9\u5F0F";
    });
    const safeTime = computed(() => {
      try {
        const now = /* @__PURE__ */ new Date();
        return now.toLocaleString("zh-CN", { hour12: false });
      } catch {
        return "\u521A\u521A";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-cec72282><div class="pay-success-modal glass-card" data-v-cec72282><div class="success-header" data-v-cec72282><div class="success-circle" data-v-cec72282><div class="success-icon-wrapper" data-v-cec72282><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cec72282><polyline points="20 6 9 17 4 12" data-v-cec72282></polyline></svg></div></div><div class="success-title" data-v-cec72282>\u652F\u4ED8\u6210\u529F</div><div class="success-desc" data-v-cec72282>\u60A8\u7684\u8BA2\u5355\u5DF2\u786E\u8BA4\uFF0C\u611F\u8C22\u60A8\u7684\u8D2D\u4E70</div></div><div class="success-info" data-v-cec72282><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>\u8BA2\u5355\u7F16\u53F7</span><span class="info-value info-link" data-v-cec72282>${ssrInterpolate(safeOrderId.value)}</span></div><div class="info-divider" data-v-cec72282></div><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>\u652F\u4ED8\u91D1\u989D</span><span class="info-value info-amount" data-v-cec72282>\xA5${ssrInterpolate(safeAmount.value)}</span></div><div class="info-divider" data-v-cec72282></div><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>\u652F\u4ED8\u65B9\u5F0F</span><span class="info-value info-paytype" data-v-cec72282>${ssrInterpolate(safePayTypeName.value)}</span></div><div class="info-divider" data-v-cec72282></div><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>\u652F\u4ED8\u65F6\u95F4</span><span class="info-value info-time" data-v-cec72282>${ssrInterpolate(safeTime.value)}</span></div></div><div class="status-box" data-v-cec72282><div class="status-icon" data-v-cec72282>\u{1F680}</div><div class="status-text" data-v-cec72282>\u7CFB\u7EDF\u6B63\u5728\u4E3A\u60A8\u81EA\u52A8\u53D1\u8D27\uFF0C\u8BF7\u7A0D\u5019\u67E5\u770B</div></div><div class="success-actions" data-v-cec72282><button class="order-btn" data-v-cec72282> \u524D\u5F80\u67E5\u770B\u8BA2\u5355 </button><button class="home-btn" data-v-cec72282> \u8FD4\u56DE\u9996\u9875 </button></div><div class="success-tip" data-v-cec72282> \u5982\u6709\u4EFB\u4F55\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D <span class="kefu-phone" data-v-cec72282>\u5728\u7EBF\u5BA2\u670D</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/modal/PaySuccessModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PaySuccessModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-cec72282"]]);
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
      lastOrderId,
      lastOrderAmount,
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
      // New
      refreshingBalance
      // New
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
    const handlePaySuccessClose = () => {
      showPaySuccess.value = false;
      router.push("/profile/orders");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page" }, _attrs))} data-v-fa52fae4><div class="checkout-content" data-v-fa52fae4><div class="checkout-header" data-v-fa52fae4><button class="back-btn" data-v-fa52fae4>`);
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
      _push(` \u8FD4\u56DE </button><div class="page-title" data-v-fa52fae4>\u8BA2\u5355\u7ED3\u7B97</div></div>`);
      if (unref(loading)) {
        _push(`<div class="checkout-loading" data-v-fa52fae4><div class="glass-loader" data-v-fa52fae4></div><p data-v-fa52fae4>\u6B63\u5728\u52A0\u8F7D\u8BA2\u5355\u4FE1\u606F...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="checkout-error" data-v-fa52fae4><div class="error-icon" data-v-fa52fae4>\u26A0\uFE0F</div><p data-v-fa52fae4>${ssrInterpolate(unref(error))}</p><button class="action-btn" data-v-fa52fae4>\u8FD4\u56DE\u9996\u9875</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="checkout-main" data-v-fa52fae4><div class="order-section" data-v-fa52fae4>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar" data-v-fa52fae4>`);
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
          _push(`<span data-v-fa52fae4>\u8BF7\u5728 <strong class="time-highlight" data-v-fa52fae4>${ssrInterpolate(unref(formatCountdown))}</strong> \u5185\u5B8C\u6210\u652F\u4ED8\uFF0C\u8D85\u65F6\u5C06\u91CA\u653E\u5E93\u5B58</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="order-list" data-v-fa52fae4><!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          var _a2, _b;
          _push(`<div class="order-card glass-card" data-v-fa52fae4><div class="order-header-row" data-v-fa52fae4><span class="order-no" data-v-fa52fae4>\u8BA2\u5355\u53F7: ${ssrInterpolate(order.order_no)}</span><span class="order-status" data-v-fa52fae4>\u5F85\u652F\u4ED8</span></div><div class="order-body" data-v-fa52fae4><div class="product-thumb" data-v-fa52fae4><div class="sq-cover-img-container" data-v-fa52fae4><img${ssrRenderAttr("src", ((_a2 = order.product_snapshot) == null ? void 0 : _a2.image) || "/images/shared/logo.png")} class="sq-cover-img" data-v-fa52fae4></div></div><div class="product-info" data-v-fa52fae4><div class="product-name" data-v-fa52fae4>${ssrInterpolate((_b = order.product_snapshot) == null ? void 0 : _b.product_name)}</div><div class="product-meta-row" data-v-fa52fae4>`);
          _push(ssrRenderComponent(_component_el_tag, {
            size: "small",
            effect: "dark",
            class: "spec-tag"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a3, _b2;
              if (_push2) {
                _push2(`${ssrInterpolate(unref(formatSpec)((_a3 = order.sku_snapshot) == null ? void 0 : _a3.spec_combination))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(formatSpec)((_b2 = order.sku_snapshot) == null ? void 0 : _b2.spec_combination)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div class="product-price" data-v-fa52fae4><div class="price-val" data-v-fa52fae4>${ssrInterpolate(order.unit_price.toFixed(2))} \u70B9</div><div class="qty" data-v-fa52fae4>x${ssrInterpolate(order.quantity)}</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (checkoutFaqs.value.length > 0) {
          _push(`<div class="faq-section" data-v-fa52fae4><div class="faq-card glass-card" data-v-fa52fae4><h4 data-v-fa52fae4>`);
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
          _push(` \u5E38\u89C1\u95EE\u9898</h4><div class="faq-list" data-v-fa52fae4><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-fa52fae4><div class="faq-question" data-v-fa52fae4><span class="q-text" data-v-fa52fae4>${ssrInterpolate(faq.question)}</span>`);
            _push(ssrRenderComponent(_component_el_icon, { class: "arrow-icon" }, {
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
            _push(`</div><div class="faq-answer-wrapper" style="${ssrRenderStyle({ maxHeight: activeFaq.value === index ? "200px" : "0" })}" data-v-fa52fae4><div class="faq-answer" data-v-fa52fae4>${ssrInterpolate(faq.answer)}</div></div></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tips-container" data-v-fa52fae4><div class="tips-card glass-card" data-v-fa52fae4><h4 data-v-fa52fae4>`);
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
        _push(` \u6E29\u99A8\u63D0\u793A</h4><ul data-v-fa52fae4><li data-v-fa52fae4>\u8D44\u6E90\u5DF2\u4E3A\u60A8\u9501\u5B9A\uFF0C\u8BF7\u5C3D\u5FEB\u5B8C\u6210\u652F\u4ED8\u3002</li><li data-v-fa52fae4>\u8D85\u65F6\u672A\u652F\u4ED8\u5C06\u81EA\u52A8\u91CA\u653E\uFF0C\u9700\u91CD\u65B0\u4E0B\u5355\u3002</li><li data-v-fa52fae4>\u5982\u9047\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFB\u5728\u7EBF\u5BA2\u670D\u3002</li></ul></div></div></div><div class="summary-section" data-v-fa52fae4><div class="summary-card glass-card sticky-card" data-v-fa52fae4><h3 class="card-title" data-v-fa52fae4>\u652F\u4ED8\u8BE6\u60C5</h3><div class="price-rows" data-v-fa52fae4><div class="price-row" data-v-fa52fae4><span data-v-fa52fae4>\u5546\u54C1\u603B\u989D</span><span class="val" data-v-fa52fae4>${ssrInterpolate(unref(totalProductAmount).toFixed(2))} \u70B9</span></div><div class="price-row coupon-row" data-v-fa52fae4><div class="coupon-label" data-v-fa52fae4><span data-v-fa52fae4>\u4F18\u60E0\u5238</span>`);
        if (unref(selectedCoupon)) {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "small",
            type: "danger",
            effect: "dark",
            class: "discount-tag"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u5DF2\u62B5\u6263 ${ssrInterpolate(unref(couponDiscount).toFixed(2))} \u70B9 `);
              } else {
                return [
                  createTextVNode(" \u5DF2\u62B5\u6263 " + toDisplayString(unref(couponDiscount).toFixed(2)) + " \u70B9 ", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="coupon-action" data-v-fa52fae4>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="val discount" data-v-fa52fae4>-${ssrInterpolate(unref(couponDiscount).toFixed(2))} \u70B9</span>`);
        } else {
          _push(`<span class="placeholder" data-v-fa52fae4>\u9009\u62E9\u4F18\u60E0\u5238</span>`);
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
        _push(`</div></div><div class="divider" data-v-fa52fae4></div><div class="price-row total" data-v-fa52fae4><span data-v-fa52fae4>\u5E94\u4ED8\u91D1\u989D</span><span class="val final" data-v-fa52fae4>${ssrInterpolate(unref(finalPayAmount).toFixed(2))} \u70B9</span></div></div><div class="payment-method" data-v-fa52fae4><div class="method-title" data-v-fa52fae4>\u652F\u4ED8\u65B9\u5F0F</div><div class="balance-card active" data-v-fa52fae4><div class="balance-icon" data-v-fa52fae4>`);
        _push(ssrRenderComponent(_component_el_icon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(wallet_default), null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(wallet_default))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="balance-info" data-v-fa52fae4><div class="method-name" data-v-fa52fae4>\u989D\u5EA6\u652F\u4ED8</div><div class="user-balance-row" data-v-fa52fae4><span class="user-balance" data-v-fa52fae4>\u53EF\u7528\u989D\u5EA6: ${ssrInterpolate(unref(userBalance).toFixed(2))} \u70B9</span>`);
        _push(ssrRenderComponent(_component_el_button, {
          link: "",
          type: "primary",
          size: "small",
          onClick: unref(refreshBalance),
          loading: unref(refreshingBalance),
          class: "refresh-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_icon, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(refresh_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(refresh_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_el_icon, null, {
                  default: withCtx(() => [
                    createVNode(unref(refresh_default))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="check-mark" data-v-fa52fae4>`);
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
        _push(`</div></div></div><div class="action-area" data-v-fa52fae4><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "pay-btn"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-fa52fae4>`);
        if (unref(paying)) {
          _push(`<div class="btn-loader" data-v-fa52fae4></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-fa52fae4>\u989D\u5EA6\u4E0D\u8DB3\uFF0C\u53BB\u5145\u503C</span>`);
        } else {
          _push(`<span data-v-fa52fae4>\u7ACB\u5373\u652F\u4ED8 ${ssrInterpolate(unref(finalPayAmount).toFixed(2))} \u70B9</span>`);
        }
        _push(`</button><div class="agreement-text" data-v-fa52fae4> \u70B9\u51FB\u652F\u4ED8\u5373\u8868\u793A\u540C\u610F <a href="/docs/terms" target="_blank" data-v-fa52fae4>\u670D\u52A1\u534F\u8BAE</a> \u548C <a href="/docs/privacy" target="_blank" data-v-fa52fae4>\u9690\u79C1\u534F\u8BAE</a></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showPaySuccess)) {
        _push(ssrRenderComponent(PaySuccessModal, {
          orderId: unref(lastOrderId),
          amount: unref(lastOrderAmount),
          payType: "balance",
          onClose: handlePaySuccessClose
        }, null, _parent));
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
      if (showRechargeModal.value) {
        _push(ssrRenderComponent(WalletRechargeModal, { onClose: handleRechargeClose }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pc/checkout/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa52fae4"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Ddu8I4m1.mjs.map
