import { E as ElIcon } from "./index-jl2vZbkg.js";
/* empty css              */
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext, computed, unref, createVNode, openBlock, createBlock, defineAsyncComponent, ref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { f as arrow_right_default, R as wallet_default, q as refresh_default, _ as select_default, g as arrow_left_default, ah as timer_default, J as question_filled_default, v as arrow_down_default, i as info_filled_default } from "./index-DlETah8a.js";
import { u as useCheckout } from "./useCheckout-BJrDtpVb.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { E as ElTag } from "./index-CAqDGa72.js";
/* empty css                */
import { _ as _export_sfc } from "../server.mjs";
import { E as ElButton } from "./index-Cfk6gFRD.js";
/* empty css                   */
import { B as BaseButton } from "./BaseButton-BlqmccK6.js";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
/* empty css                    */
import "./user-Cnuc6I82.js";
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
import "./cart-C8TGo9ts.js";
import "./supabase-fcLPkUp1.js";
import "./interval-BHZX8LlC.js";
import "./index-DSo6N35Z.js";
import "./typescript-D6L75muK.js";
import "./icon-CK7WLSPl.js";
import "./use-global-config-79yNXOXL.js";
import "./index-K5TIzHX_.js";
import "./event-D3FEo2C5.js";
import "./use-form-item-Bhmdieo-.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutOrderList",
  __ssrInlineRender: true,
  props: {
    orders: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    const formatSpec = (spec) => {
      if (!spec) return "默认规格";
      return Object.values(spec).join(" / ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "order-list" }, _attrs))} data-v-9aa3c754><!--[-->`);
      ssrRenderList(__props.orders, (order) => {
        _push(`<div class="order-card glass-card" data-v-9aa3c754><div class="order-header-row" data-v-9aa3c754><span class="order-no" data-v-9aa3c754>订单号: ${ssrInterpolate(order.order_no)}</span><span class="order-status" data-v-9aa3c754>待支付</span></div><div class="order-body" data-v-9aa3c754><div class="product-thumb" data-v-9aa3c754><div class="sq-cover-img-container" data-v-9aa3c754><img${ssrRenderAttr("src", order.product_snapshot?.image || "/images/shared/logo.png")} class="sq-cover-img" data-v-9aa3c754></div></div><div class="product-info" data-v-9aa3c754><div class="product-name" data-v-9aa3c754>${ssrInterpolate(order.product_snapshot?.product_name)}</div><div class="product-meta-row" data-v-9aa3c754>`);
        _push(ssrRenderComponent(_component_el_tag, {
          size: "small",
          effect: "dark",
          class: "spec-tag"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(formatSpec(order.sku_snapshot?.spec_combination))}`);
            } else {
              return [
                createTextVNode(toDisplayString(formatSpec(order.sku_snapshot?.spec_combination)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div><div class="product-price" data-v-9aa3c754><div class="price-val" data-v-9aa3c754>${ssrInterpolate(order.unit_price.toFixed(2))} 点</div><div class="qty" data-v-9aa3c754>x${ssrInterpolate(order.quantity)}</div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/checkout/CheckoutOrderList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CheckoutOrderList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9aa3c754"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CheckoutSummary",
  __ssrInlineRender: true,
  props: {
    amountDetails: {},
    userBalance: {},
    countdownSeconds: {},
    loading: { type: Boolean },
    paying: { type: Boolean },
    coupon: {}
  },
  emits: ["pay", "refreshBalance", "selectCoupon"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isBalanceInsufficient = computed(() => {
      return props.userBalance < props.amountDetails.final;
    });
    const handlePayClick = () => {
      emit("pay", isBalanceInsufficient.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_tag = ElTag;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "summary-card glass-card sticky-card" }, _attrs))} data-v-37335e28><h3 class="card-title" data-v-37335e28>支付详情</h3><div class="price-rows" data-v-37335e28><div class="price-row" data-v-37335e28><span data-v-37335e28>商品总额</span><span class="val" data-v-37335e28>${ssrInterpolate(__props.amountDetails.total.toFixed(2))} 点</span></div><div class="price-row coupon-row" data-v-37335e28><div class="coupon-label" data-v-37335e28><span data-v-37335e28>优惠券</span>`);
      if (__props.coupon) {
        _push(ssrRenderComponent(_component_el_tag, {
          size: "small",
          type: "danger",
          effect: "dark",
          class: "discount-tag"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 已抵扣 ${ssrInterpolate(__props.amountDetails.discount.toFixed(2))} 点 `);
            } else {
              return [
                createTextVNode(" 已抵扣 " + toDisplayString(__props.amountDetails.discount.toFixed(2)) + " 点 ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="coupon-action" data-v-37335e28>`);
      if (__props.coupon) {
        _push(`<span class="val discount" data-v-37335e28>-${ssrInterpolate(__props.amountDetails.discount.toFixed(2))} 点</span>`);
      } else {
        _push(`<span class="placeholder" data-v-37335e28>选择优惠券</span>`);
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
      _push(`</div></div><div class="divider" data-v-37335e28></div><div class="price-row total" data-v-37335e28><span data-v-37335e28>应付金额</span><span class="val final" data-v-37335e28>${ssrInterpolate(__props.amountDetails.final.toFixed(2))} 点</span></div></div><div class="payment-method" data-v-37335e28><div class="method-title" data-v-37335e28>支付方式</div><div class="balance-card active" data-v-37335e28><div class="balance-icon" data-v-37335e28>`);
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
      _push(`</div><div class="balance-info" data-v-37335e28><div class="method-name" data-v-37335e28>额度支付</div><div class="user-balance-row" data-v-37335e28><span class="user-balance" data-v-37335e28>可用额度: ${ssrInterpolate(__props.userBalance.toFixed(2))} 点</span>`);
      _push(ssrRenderComponent(_component_el_button, {
        link: "",
        type: "primary",
        size: "small",
        onClick: ($event) => _ctx.$emit("refreshBalance"),
        loading: __props.loading,
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
      _push(`</div></div><div class="check-mark" data-v-37335e28>`);
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
      _push(`</div></div></div><div class="action-area" data-v-37335e28>`);
      _push(ssrRenderComponent(BaseButton, {
        class: ["pay-btn-full", { "insufficient": isBalanceInsufficient.value }],
        disabled: __props.paying || __props.countdownSeconds <= 0,
        loading: __props.paying,
        "theme-id": isBalanceInsufficient.value ? "secondary" : "marketing-buy",
        onClick: handlePayClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isBalanceInsufficient.value) {
              _push2(`<span data-v-37335e28${_scopeId}>额度不足，去充值</span>`);
            } else {
              _push2(`<span data-v-37335e28${_scopeId}>立即支付 ${ssrInterpolate(__props.amountDetails.final.toFixed(2))} 点</span>`);
            }
          } else {
            return [
              isBalanceInsufficient.value ? (openBlock(), createBlock("span", { key: 0 }, "额度不足，去充值")) : (openBlock(), createBlock("span", { key: 1 }, "立即支付 " + toDisplayString(__props.amountDetails.final.toFixed(2)) + " 点", 1))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="agreement-text" data-v-37335e28> 点击支付即表示同意 <a href="/docs/terms" target="_blank" data-v-37335e28>服务协议</a> 和 <a href="/docs/privacy" target="_blank" data-v-37335e28>隐私协议</a></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pc/checkout/CheckoutSummary.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CheckoutSummary = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-37335e28"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const PaySuccessModal = defineAsyncComponent(() => import("./PaySuccessModal-BlJIWln9.js"));
    const CouponSelectorModal = defineAsyncComponent(() => import("./CouponSelectorModal-BwXgWnDr.js"));
    const WalletRechargeModal = defineAsyncComponent(() => import("./WalletRechargeModal-Dofqnuyg.js"));
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
      handlePay,
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
    const handlePayActionFromComponent = (insufficient) => {
      if (insufficient) {
        showRechargeModal.value = true;
        return;
      }
      handlePay();
    };
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page" }, _attrs))} data-v-e1a17336><div class="checkout-content" data-v-e1a17336><div class="checkout-header" data-v-e1a17336>`);
      _push(ssrRenderComponent(BaseButton, {
        themeId: "secondary",
        onClick: ($event) => unref(router).back()
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
            _push2(` 返回 `);
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(arrow_left_default))
                ]),
                _: 1
              }),
              createTextVNode(" 返回 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-title" data-v-e1a17336>订单结算</div></div>`);
      if (unref(loading)) {
        _push(`<div class="checkout-loading" data-v-e1a17336><div class="glass-loader" data-v-e1a17336></div><p data-v-e1a17336>正在加载订单信息...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="checkout-error" data-v-e1a17336><div class="error-icon" data-v-e1a17336>⚠️</div><p data-v-e1a17336>${ssrInterpolate(unref(error))}</p>`);
        _push(ssrRenderComponent(BaseButton, {
          themeId: "secondary",
          onClick: ($event) => unref(router).push("/")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`返回首页`);
            } else {
              return [
                createTextVNode("返回首页")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="checkout-main" data-v-e1a17336><div class="order-section" data-v-e1a17336>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar" data-v-e1a17336>`);
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
          _push(`<span data-v-e1a17336>请在 <strong class="time-highlight" data-v-e1a17336>${ssrInterpolate(unref(formatCountdown))}</strong> 内完成支付，超时将释放库存</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(CheckoutOrderList, { orders: unref(preOrders) }, null, _parent));
        if (checkoutFaqs.value.length > 0) {
          _push(`<div class="faq-section" data-v-e1a17336><div class="faq-card glass-card" data-v-e1a17336><h4 data-v-e1a17336>`);
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
          _push(` 常见问题</h4><div class="faq-list" data-v-e1a17336><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-e1a17336><div class="faq-question" data-v-e1a17336><span class="q-text" data-v-e1a17336>${ssrInterpolate(faq.question)}</span>`);
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
            _push(`</div><div class="faq-answer-wrapper" style="${ssrRenderStyle({ maxHeight: activeFaq.value === index ? "200px" : "0" })}" data-v-e1a17336><div class="faq-answer" data-v-e1a17336>${ssrInterpolate(faq.answer)}</div></div></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tips-container" data-v-e1a17336><div class="tips-card glass-card" data-v-e1a17336><h4 data-v-e1a17336>`);
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
        _push(` 温馨提示</h4><ul data-v-e1a17336><li data-v-e1a17336>资源已为您锁定，请尽快完成支付。</li><li data-v-e1a17336>超时未支付将自动释放，需重新下单。</li><li data-v-e1a17336>如遇问题，请联系在线客服。</li></ul></div></div></div><div class="summary-section" data-v-e1a17336>`);
        _push(ssrRenderComponent(CheckoutSummary, {
          "amount-details": {
            total: unref(totalProductAmount),
            discount: unref(couponDiscount),
            final: unref(finalPayAmount)
          },
          "user-balance": unref(userBalance),
          "countdown-seconds": unref(remainingSeconds),
          loading: unref(refreshingBalance),
          paying: unref(paying),
          coupon: unref(selectedCoupon),
          onSelectCoupon: ($event) => showCouponModal.value = true,
          onRefreshBalance: unref(refreshBalance),
          onPay: handlePayActionFromComponent
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showPaySuccess)) {
        _push(ssrRenderComponent(unref(PaySuccessModal), {
          orderId: unref(lastOrderId),
          amount: unref(lastOrderAmount),
          payType: "balance",
          onClose: handlePaySuccessClose
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(CouponSelectorModal), {
        modelValue: showCouponModal.value,
        "onUpdate:modelValue": ($event) => showCouponModal.value = $event,
        orderAmount: unref(totalProductAmount),
        skuIds: unref(orderSkuIds),
        productIds: unref(orderProductIds),
        currentCouponId: unref(selectedCoupon)?.id,
        onSelect: unref(handleCouponSelect)
      }, null, _parent));
      if (showRechargeModal.value) {
        _push(ssrRenderComponent(unref(WalletRechargeModal), { onClose: handleRechargeClose }, null, _parent));
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1a17336"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BQxstCFz.js.map
