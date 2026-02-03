import { E as ElIcon } from "./index-Byc6LUYX.js";
import { E as ElImage } from "./index-BB-fMy6o.js";
/* empty css              */
/* empty css                         */
/* empty css                    */
import { defineComponent, ref, computed, watch, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { h as arrow_left_default, d as circle_close_filled_default, al as timer_default, V as ticket_default, f as arrow_right_default, M as question_filled_default, A as arrow_down_default, aC as wallet_filled_default, v as refresh_default, a0 as select_default, w as warning_filled_default } from "./index-4qszPKX4.js";
import { u as useCheckout } from "./useCheckout-CurulKxX.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { C as CouponSelectorModal } from "./CouponSelectorModal-By6Mp4b5.js";
import { R as RechargeModal } from "./RechargeModal-CpBOy_mm.js";
import { E as ElMessage } from "./index-CJUZrfXE.js";
import { _ as _export_sfc } from "../server.mjs";
import "./install-VBSKbHUK.js";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "./objects-Bz74KHmq.js";
import "./typescript-D6L75muK.js";
import "./focus-trap.vue-BCkHbPy6.js";
import "./aria-Rs9hkxop.js";
import "./event-D3FEo2C5.js";
import "./index-DBQY6eQ6.js";
import "./index-ebnaz0b7.js";
import "./scroll-Df9VGR5S.js";
import "./raf-CQRaPAjg.js";
import "./index-D2CY7Ok3.js";
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
import "./index-B9iQGHXi.js";
import "./icon-BcxG_YvU.js";
import "./index-CO6H4Lsj.js";
import "./use-global-config-BPKjMkzA.js";
import "./use-form-item-Bj_anzlj.js";
import "./constants-hAKFmBbq.js";
import "@ctrl/tinycolor";
import "./index-EXqkolUp.js";
/* empty css                   */
/* empty css                  */
import "./BaseCouponTicket-CKW8RMPT.js";
import "./coupon-D1so52Ot.js";
import "./virtual_public-CTq2VprR.js";
import "./virtual_public-FTeKDcap.js";
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
        ElMessage.success("支付成功");
        setTimeout(() => {
          router.replace("/mobile/profile");
        }, 1e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
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
      _push(`</div><div class="header-title" data-v-129e6473>确认订单</div><div class="header-placeholder" data-v-129e6473></div></div>`);
      if (unref(loading)) {
        _push(`<div class="state-box" data-v-129e6473><div class="spinner" data-v-129e6473></div><span data-v-129e6473>加载订单中...</span></div>`);
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
        _push(`<span data-v-129e6473>${ssrInterpolate(unref(error))}</span><button class="btn-retry" data-v-129e6473>返回首页</button></div>`);
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
          _push(`<span data-v-129e6473>请在 <span class="time-val" data-v-129e6473>${ssrInterpolate(unref(formatCountdown))}</span> 内支付</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          _push(`<div class="card product-card" data-v-129e6473><div class="pc-head" data-v-129e6473><span class="pc-tag" data-v-129e6473>商品信息</span><span class="pc-order-no" data-v-129e6473>${ssrInterpolate(order.order_no)}</span></div><div class="pc-body" data-v-129e6473><div class="thumb" data-v-129e6473>`);
          _push(ssrRenderComponent(_component_el_image, {
            src: order.product_snapshot?.image,
            fit: "cover"
          }, null, _parent));
          _push(`</div><div class="info" data-v-129e6473><div class="p-name" data-v-129e6473>${ssrInterpolate(order.product_snapshot?.product_name)}</div><div class="p-sku" data-v-129e6473><div class="sku-pill" data-v-129e6473>${ssrInterpolate(unref(formatSpec)(order.sku_snapshot?.spec_combination))}</div></div><div class="p-price-row" data-v-129e6473><div class="p-price" data-v-129e6473>${ssrInterpolate(order.unit_price.toFixed(2))} 点</div><div class="p-qty" data-v-129e6473>x ${ssrInterpolate(order.quantity)}</div></div></div></div></div>`);
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
        _push(`<span data-v-129e6473>优惠券</span></div><div class="cc-right" data-v-129e6473>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="coupon-val" data-v-129e6473>- ${ssrInterpolate(unref(couponDiscount).toFixed(2))} 点</span>`);
        } else {
          _push(`<span class="coupon-ph" data-v-129e6473>选择优惠券</span>`);
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
          _push(` 常见问题 </div><div class="faq-list" data-v-129e6473><!--[-->`);
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
        _push(`<div class="card pay-card" data-v-129e6473><div class="card-title" data-v-129e6473>支付方式</div><div class="pay-methods" data-v-129e6473><div class="pm-item active" data-v-129e6473><div class="pm-icon balance" data-v-129e6473>`);
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
        _push(`</div><div class="pm-info" data-v-129e6473><div class="pm-name" data-v-129e6473>额度支付</div><div class="pm-desc" data-v-129e6473> 可用额度: ${ssrInterpolate(unref(userBalance).toFixed(2))} 点 <div class="refresh-btn" data-v-129e6473>`);
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
        _push(`<span data-v-129e6473>虚拟商品自动发货，售出后概不退换。超时未支付将自动释放库存。</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(preOrders).length > 0) {
        _push(`<div class="footer-bar" data-v-129e6473><div class="fb-left" data-v-129e6473><span class="fb-label" data-v-129e6473>应付:</span><span class="fb-price" data-v-129e6473><span class="fb-big" data-v-129e6473>${ssrInterpolate(unref(finalPayAmount).toFixed(2))}</span> 点</span></div><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "btn-pay"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-129e6473>`);
        if (unref(paying)) {
          _push(`<div class="spinner-sm" data-v-129e6473></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-129e6473>额度不足，去充值</span>`);
        } else {
          _push(`<span data-v-129e6473>立即支付</span>`);
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
        currentCouponId: unref(selectedCoupon)?.id,
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
export {
  _id_ as default
};
//# sourceMappingURL=_id_-CpKgrkdC.js.map
