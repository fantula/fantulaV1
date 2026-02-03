import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElTag } from "./index-BV0Habum.js";
import { E as ElButton } from "./index-B9iQGHXi.js";
/* empty css              */
/* empty css                */
/* empty css                   */
import { defineComponent, computed, mergeProps, useSSRContext, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { h as arrow_left_default, al as timer_default, M as question_filled_default, A as arrow_down_default, i as info_filled_default, f as arrow_right_default, T as wallet_default, v as refresh_default, a0 as select_default } from "./index-4qszPKX4.js";
import { u as useCheckout } from "./useCheckout-CurulKxX.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import { C as CouponSelectorModal } from "./CouponSelectorModal-By6Mp4b5.js";
import { W as WalletRechargeModal } from "./WalletRechargeModal-CGOnPK2n.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./index-CO6H4Lsj.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "./index-DBQY6eQ6.js";
import "./icon-BcxG_YvU.js";
import "./use-global-config-BPKjMkzA.js";
import "@ctrl/tinycolor";
/* empty css                    */
import "./user-CzJGyf4T.js";
import "./auth-BCuS92ob.js";
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
import "./common-DNRu9xdu.js";
import "./request-n20yf-Kr.js";
import "./cart-D8FaBhjU.js";
import "./supabase-fcLPkUp1.js";
import "./interval-BHZX8LlC.js";
import "./index-CJUZrfXE.js";
import "./typescript-D6L75muK.js";
import "./event-D3FEo2C5.js";
import "./index-EXqkolUp.js";
/* empty css                  */
import "./BaseCouponTicket-CKW8RMPT.js";
import "./coupon-D1so52Ot.js";
import "./BaseModal-HTOTXfQj.js";
import "./BaseButton-B3srPw2H.js";
import "./virtual_public-CTq2VprR.js";
import "./virtual_public-FTeKDcap.js";
import "qrcode";
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
        "alipay": "支付宝支付",
        "balance": "余额支付",
        "other": "其他支付"
      };
      return typeMap[props.payType] || "未知支付方式";
    });
    const safeTime = computed(() => {
      try {
        const now = /* @__PURE__ */ new Date();
        return now.toLocaleString("zh-CN", { hour12: false });
      } catch {
        return "刚刚";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-cec72282><div class="pay-success-modal glass-card" data-v-cec72282><div class="success-header" data-v-cec72282><div class="success-circle" data-v-cec72282><div class="success-icon-wrapper" data-v-cec72282><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cec72282><polyline points="20 6 9 17 4 12" data-v-cec72282></polyline></svg></div></div><div class="success-title" data-v-cec72282>支付成功</div><div class="success-desc" data-v-cec72282>您的订单已确认，感谢您的购买</div></div><div class="success-info" data-v-cec72282><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>订单编号</span><span class="info-value info-link" data-v-cec72282>${ssrInterpolate(safeOrderId.value)}</span></div><div class="info-divider" data-v-cec72282></div><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>支付金额</span><span class="info-value info-amount" data-v-cec72282>¥${ssrInterpolate(safeAmount.value)}</span></div><div class="info-divider" data-v-cec72282></div><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>支付方式</span><span class="info-value info-paytype" data-v-cec72282>${ssrInterpolate(safePayTypeName.value)}</span></div><div class="info-divider" data-v-cec72282></div><div class="info-row" data-v-cec72282><span class="info-label" data-v-cec72282>支付时间</span><span class="info-value info-time" data-v-cec72282>${ssrInterpolate(safeTime.value)}</span></div></div><div class="status-box" data-v-cec72282><div class="status-icon" data-v-cec72282>🚀</div><div class="status-text" data-v-cec72282>系统正在为您自动发货，请稍候查看</div></div><div class="success-actions" data-v-cec72282><button class="order-btn" data-v-cec72282> 前往查看订单 </button><button class="home-btn" data-v-cec72282> 返回首页 </button></div><div class="success-tip" data-v-cec72282> 如有任何问题，请联系客服 <span class="kefu-phone" data-v-cec72282>在线客服</span></div></div></div>`);
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
      _push(` 返回 </button><div class="page-title" data-v-fa52fae4>订单结算</div></div>`);
      if (unref(loading)) {
        _push(`<div class="checkout-loading" data-v-fa52fae4><div class="glass-loader" data-v-fa52fae4></div><p data-v-fa52fae4>正在加载订单信息...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="checkout-error" data-v-fa52fae4><div class="error-icon" data-v-fa52fae4>⚠️</div><p data-v-fa52fae4>${ssrInterpolate(unref(error))}</p><button class="action-btn" data-v-fa52fae4>返回首页</button></div>`);
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
          _push(`<span data-v-fa52fae4>请在 <strong class="time-highlight" data-v-fa52fae4>${ssrInterpolate(unref(formatCountdown))}</strong> 内完成支付，超时将释放库存</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="order-list" data-v-fa52fae4><!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          _push(`<div class="order-card glass-card" data-v-fa52fae4><div class="order-header-row" data-v-fa52fae4><span class="order-no" data-v-fa52fae4>订单号: ${ssrInterpolate(order.order_no)}</span><span class="order-status" data-v-fa52fae4>待支付</span></div><div class="order-body" data-v-fa52fae4><div class="product-thumb" data-v-fa52fae4><div class="sq-cover-img-container" data-v-fa52fae4><img${ssrRenderAttr("src", order.product_snapshot?.image || "/images/shared/logo.png")} class="sq-cover-img" data-v-fa52fae4></div></div><div class="product-info" data-v-fa52fae4><div class="product-name" data-v-fa52fae4>${ssrInterpolate(order.product_snapshot?.product_name)}</div><div class="product-meta-row" data-v-fa52fae4>`);
          _push(ssrRenderComponent(_component_el_tag, {
            size: "small",
            effect: "dark",
            class: "spec-tag"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(formatSpec)(order.sku_snapshot?.spec_combination))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(formatSpec)(order.sku_snapshot?.spec_combination)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div><div class="product-price" data-v-fa52fae4><div class="price-val" data-v-fa52fae4>${ssrInterpolate(order.unit_price.toFixed(2))} 点</div><div class="qty" data-v-fa52fae4>x${ssrInterpolate(order.quantity)}</div></div></div></div>`);
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
          _push(` 常见问题</h4><div class="faq-list" data-v-fa52fae4><!--[-->`);
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
        _push(` 温馨提示</h4><ul data-v-fa52fae4><li data-v-fa52fae4>资源已为您锁定，请尽快完成支付。</li><li data-v-fa52fae4>超时未支付将自动释放，需重新下单。</li><li data-v-fa52fae4>如遇问题，请联系在线客服。</li></ul></div></div></div><div class="summary-section" data-v-fa52fae4><div class="summary-card glass-card sticky-card" data-v-fa52fae4><h3 class="card-title" data-v-fa52fae4>支付详情</h3><div class="price-rows" data-v-fa52fae4><div class="price-row" data-v-fa52fae4><span data-v-fa52fae4>商品总额</span><span class="val" data-v-fa52fae4>${ssrInterpolate(unref(totalProductAmount).toFixed(2))} 点</span></div><div class="price-row coupon-row" data-v-fa52fae4><div class="coupon-label" data-v-fa52fae4><span data-v-fa52fae4>优惠券</span>`);
        if (unref(selectedCoupon)) {
          _push(ssrRenderComponent(_component_el_tag, {
            size: "small",
            type: "danger",
            effect: "dark",
            class: "discount-tag"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 已抵扣 ${ssrInterpolate(unref(couponDiscount).toFixed(2))} 点 `);
              } else {
                return [
                  createTextVNode(" 已抵扣 " + toDisplayString(unref(couponDiscount).toFixed(2)) + " 点 ", 1)
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
          _push(`<span class="val discount" data-v-fa52fae4>-${ssrInterpolate(unref(couponDiscount).toFixed(2))} 点</span>`);
        } else {
          _push(`<span class="placeholder" data-v-fa52fae4>选择优惠券</span>`);
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
        _push(`</div></div><div class="divider" data-v-fa52fae4></div><div class="price-row total" data-v-fa52fae4><span data-v-fa52fae4>应付金额</span><span class="val final" data-v-fa52fae4>${ssrInterpolate(unref(finalPayAmount).toFixed(2))} 点</span></div></div><div class="payment-method" data-v-fa52fae4><div class="method-title" data-v-fa52fae4>支付方式</div><div class="balance-card active" data-v-fa52fae4><div class="balance-icon" data-v-fa52fae4>`);
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
        _push(`</div><div class="balance-info" data-v-fa52fae4><div class="method-name" data-v-fa52fae4>额度支付</div><div class="user-balance-row" data-v-fa52fae4><span class="user-balance" data-v-fa52fae4>可用额度: ${ssrInterpolate(unref(userBalance).toFixed(2))} 点</span>`);
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
          _push(`<span data-v-fa52fae4>额度不足，去充值</span>`);
        } else {
          _push(`<span data-v-fa52fae4>立即支付 ${ssrInterpolate(unref(finalPayAmount).toFixed(2))} 点</span>`);
        }
        _push(`</button><div class="agreement-text" data-v-fa52fae4> 点击支付即表示同意 <a href="/docs/terms" target="_blank" data-v-fa52fae4>服务协议</a> 和 <a href="/docs/privacy" target="_blank" data-v-fa52fae4>隐私协议</a></div></div></div></div></div>`);
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
        currentCouponId: unref(selectedCoupon)?.id,
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-DWL36IVD.js.map
