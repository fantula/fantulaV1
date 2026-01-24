import { o as getSupabaseClient, d as useUserStore, ah as ElMessage, ak as setInterval, _ as _export_sfc, E as ElIcon, z as arrow_left_default, b6 as timer_default, bj as question_filled_default, aZ as arrow_down_default, a3 as info_filled_default, f as arrow_right_default, a5 as wallet_default, b9 as refresh_default, aI as select_default } from "../server.mjs";
import { E as ElTag } from "./index-BOQJCp53.js";
import { E as ElButton } from "./index-DR2tYDZ3.js";
/* empty css                */
/* empty css                   */
import { ref, computed, defineComponent, mergeProps, useSSRContext, withCtx, unref, createVNode, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useRouter, useRoute } from "vue-router";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { C as CouponSelectorModal } from "./CouponSelectorModal-RmImYc2L.js";
import { W as WalletRechargeModal } from "./WalletRechargeModal-BlA6TVen.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs";
import "@supabase/supabase-js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
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
import "/Users/dalin/fantula/nuxt-frontend/node_modules/cookie-es/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs";
import "./use-form-common-props-DlCG9pC5.js";
import "./constants-hAKFmBbq.js";
import "./index-7IYgoTSU.js";
import "@ctrl/tinycolor";
import "./index-DKY_z0U1.js";
/* empty css                  */
import "./BaseCouponTicket-DeNYuNt9.js";
const supabasePreOrderApi = {
  /**
   * 创建预订单（锁定资源）
   * 新版本：直接传 sku_id 和 quantity
   */
  async createPreOrder(skuId, quantity = 1, source = "buy_now") {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("create_pre_order", {
      p_sku_id: skuId,
      p_quantity: quantity,
      p_source: source
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return {
        success: false,
        code: data.code,
        error: data.error
      };
    }
    return {
      success: true,
      pre_order_id: data.pre_order_id,
      order_no: data.order_no,
      total_amount: data.total_amount,
      expires_at: data.expires_at
    };
  },
  /**
   * 查询预订单详情
   */
  async getPreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("get_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true, pre_order: data.pre_order };
  },
  /**
   * 应用优惠券到预订单
   * 并持久化更新预订单金额
   */
  async applyCouponToPreOrder(preOrderId, couponId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("apply_coupon_to_pre_order", {
      p_pre_order_id: preOrderId,
      p_coupon_id: couponId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    const result = data;
    if (result.success) {
      return {
        success: true,
        total_amount: result.total_amount,
        discount_amount: result.discount_amount
      };
    } else {
      return { success: false, error: result.error || "应用优惠券失败" };
    }
  },
  /**
   * 确认预订单并支付
   */
  async confirmPreOrder(preOrderId, payMethod, couponId) {
    const client = getSupabaseClient();
    const payload = {
      p_pre_order_id: preOrderId,
      p_pay_method: payMethod
    };
    if (couponId) {
      payload.p_coupon_id = couponId;
    }
    const { data, error } = await client.rpc("confirm_pre_order", payload);
    if (error) return { success: false, error: error.message };
    const result = data;
    if (result.success) {
      return {
        success: true,
        order_no: result.order_no,
        order_id: result.order_id,
        total_amount: result.total_amount
      };
    } else {
      return { success: false, error: result.error || "支付失败" };
    }
  },
  /**
   * 取消预订单（释放资源）
   */
  async cancelPreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("cancel_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  },
  /**
   * 删除预订单（仅限已过期或已完成/取消）
   */
  async deletePreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("delete_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  },
  /**
   * 过期预订单（释放资源 + 真实删除）
   * 用于倒计时归零时调用
   */
  async expirePreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("expire_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data.success) {
      return { success: false, error: data.error };
    }
    return { success: true };
  },
  /**
   * 获取用户所有预订单（包括待支付、已过期等）
   */
  async getPreOrders(status) {
    const client = getSupabaseClient();
    let query = client.from("pre_orders").select("*").order("created_at", { ascending: false });
    if (status) {
      query = query.eq("status", status);
    }
    const { data, error } = await query;
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  },
  /**
   * 获取用户待支付预订单
   */
  async getPendingPreOrders() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("pre_orders").select("*").eq("status", "pending").gt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).order("created_at", { ascending: false });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }
};
function useCheckout() {
  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(true);
  const error = ref("");
  const preOrders = ref([]);
  const paying = ref(false);
  const showPaySuccess = ref(false);
  const refreshingBalance = ref(false);
  const lastOrderId = ref("");
  const lastOrderAmount = ref(0);
  const selectedCoupon = ref(null);
  const couponDiscount = ref(0);
  const remainingSeconds = ref(0);
  let countdownTimer = null;
  let pollTimer = null;
  const totalProductAmount = computed(() => {
    return preOrders.value.reduce((sum, o) => sum + o.total_amount, 0);
  });
  const finalPayAmount = computed(() => {
    return preOrders.value.reduce((sum, o) => sum + o.total_amount, 0);
  });
  const userBalance = computed(() => userStore.user?.balance ?? 0);
  const orderSkuIds = computed(() => {
    return preOrders.value.map((o) => o.sku_snapshot?.sku_id).filter(Boolean);
  });
  const orderProductIds = computed(() => {
    return preOrders.value.map((o) => o.product_snapshot?.product_id).filter(Boolean);
  });
  const formatCountdown = computed(() => {
    const mins = Math.floor(remainingSeconds.value / 60);
    const secs = remainingSeconds.value % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  });
  const refreshBalance = async () => {
    if (refreshingBalance.value) return;
    refreshingBalance.value = true;
    try {
      await userStore.fetchUserInfo();
      ElMessage.success("额度已更新");
    } catch (e) {
      ElMessage.error("更新失败");
    } finally {
      refreshingBalance.value = false;
    }
  };
  const startCountdown = (expiresTime) => {
    const update = () => {
      const now = Date.now();
      remainingSeconds.value = Math.max(0, Math.floor((expiresTime - now) / 1e3));
      if (remainingSeconds.value <= 0) {
        handleExpire();
        if (countdownTimer) clearInterval(countdownTimer);
      }
    };
    update();
    countdownTimer = setInterval();
  };
  const handleExpire = async () => {
    error.value = "订单已过期，请重新下单";
    if (preOrders.value.length > 0) {
      try {
        await supabasePreOrderApi.expirePreOrder(preOrders.value[0].id);
      } catch (e) {
        console.error("Failed to expire order", e);
      }
    }
  };
  const startPolling = () => {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval();
  };
  const loadPreOrders = async (ids) => {
    loading.value = true;
    error.value = "";
    try {
      if (!userStore.isLoggedIn) {
        await userStore.fetchUserInfo();
        if (!userStore.isLoggedIn) {
          ElMessage.warning("请先登录");
          router.push("/");
          return;
        }
      }
      if (ids.length === 0) throw new Error("缺少订单 ID");
      const list = [];
      for (const id of ids) {
        const res = await supabasePreOrderApi.getPreOrder(id);
        if (res.success && res.pre_order) list.push(res.pre_order);
      }
      if (list.length === 0) throw new Error("订单不存在或已过期");
      preOrders.value = list;
      const minExpires = Math.min(...list.map((o) => new Date(o.expires_at).getTime()));
      startCountdown(minExpires);
      startPolling();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };
  const handleCouponSelect = async (coupon) => {
    selectedCoupon.value = coupon;
    const couponId = coupon?.id || null;
    const preOrder = preOrders.value[0];
    if (!preOrder) return;
    loading.value = true;
    try {
      const res = await supabasePreOrderApi.applyCouponToPreOrder(preOrder.id, couponId);
      if (res.success) {
        if (res.total_amount !== void 0) {
          preOrder.total_amount = res.total_amount;
          couponDiscount.value = res.discount_amount || 0;
        }
        if (!coupon) {
          ElMessage.success("已取消优惠券");
        } else {
          ElMessage.success("优惠券使用成功");
        }
      } else {
        ElMessage.error(res.error || "应用优惠券失败");
        if (coupon) selectedCoupon.value = null;
        couponDiscount.value = 0;
      }
    } catch (e) {
      ElMessage.error("系统异常: " + (e.message || JSON.stringify(e)));
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  const handlePay = async () => {
    if (paying.value) return;
    if (preOrders.value.length > 0 && preOrders.value[0].status !== "pending") {
      ElMessage.error("订单状态异常，请刷新页面");
      return;
    }
    if (userBalance.value < finalPayAmount.value) {
      ElMessage.warning("额度不足，请先充值");
      router.push("/profile/recharge");
      return;
    }
    paying.value = true;
    try {
      const preOrder = preOrders.value[0];
      const res = await supabasePreOrderApi.confirmPreOrder(
        preOrder.id,
        "balance",
        selectedCoupon.value?.id
      );
      if (!res.success) {
        ElMessage.error(res.error || "支付失败");
        return;
      }
      lastOrderId.value = res.order_no || "";
      lastOrderAmount.value = finalPayAmount.value;
      showPaySuccess.value = true;
      await userStore.fetchUserInfo();
    } catch (e) {
      ElMessage.error(e.message || "系统异常");
    } finally {
      paying.value = false;
    }
  };
  const formatSpec = (spec) => {
    if (!spec) return "默认规格";
    return Object.values(spec).join(" / ");
  };
  return {
    // State
    loading,
    error,
    preOrders,
    paying,
    // showBalanceModal, // Removed
    showPaySuccess,
    refreshingBalance,
    // New
    lastOrderId,
    lastOrderAmount,
    selectedCoupon,
    couponDiscount,
    remainingSeconds,
    // Computed
    totalProductAmount,
    finalPayAmount,
    userBalance,
    orderSkuIds,
    orderProductIds,
    formatCountdown,
    // Methods
    loadPreOrders,
    handleCouponSelect,
    handlePay,
    formatSpec,
    refreshBalance
    // New
  };
}
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-14a59af2><div class="pay-success-modal glass-card" data-v-14a59af2><div class="success-header" data-v-14a59af2><div class="success-circle" data-v-14a59af2><div class="success-icon-wrapper" data-v-14a59af2><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-14a59af2><polyline points="20 6 9 17 4 12" data-v-14a59af2></polyline></svg></div></div><div class="success-title" data-v-14a59af2>支付成功</div><div class="success-desc" data-v-14a59af2>您的订单已确认，感谢您的购买</div></div><div class="success-info" data-v-14a59af2><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>订单编号</span><span class="info-value info-link" data-v-14a59af2>${ssrInterpolate(safeOrderId.value)}</span></div><div class="info-divider" data-v-14a59af2></div><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>支付金额</span><span class="info-value info-amount" data-v-14a59af2>¥${ssrInterpolate(safeAmount.value)}</span></div><div class="info-divider" data-v-14a59af2></div><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>支付方式</span><span class="info-value info-paytype" data-v-14a59af2>${ssrInterpolate(safePayTypeName.value)}</span></div><div class="info-divider" data-v-14a59af2></div><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>支付时间</span><span class="info-value info-time" data-v-14a59af2>${ssrInterpolate(safeTime.value)}</span></div></div><div class="status-box" data-v-14a59af2><div class="status-icon" data-v-14a59af2>🚀</div><div class="status-text" data-v-14a59af2>系统正在为您自动发货，请稍候查看</div></div><div class="success-actions" data-v-14a59af2><button class="order-btn" data-v-14a59af2> 前往查看订单 </button><button class="home-btn" data-v-14a59af2> 返回首页 </button></div><div class="success-tip" data-v-14a59af2> 如有任何问题，请联系客服 <span class="kefu-phone" data-v-14a59af2>在线客服</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaySuccessModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PaySuccessModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-14a59af2"]]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page" }, _attrs))} data-v-7e7f7ac5><div class="checkout-content" data-v-7e7f7ac5><div class="checkout-header" data-v-7e7f7ac5><button class="back-btn" data-v-7e7f7ac5>`);
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
      _push(` 返回 </button><div class="page-title" data-v-7e7f7ac5>订单结算</div></div>`);
      if (unref(loading)) {
        _push(`<div class="checkout-loading" data-v-7e7f7ac5><div class="glass-loader" data-v-7e7f7ac5></div><p data-v-7e7f7ac5>正在加载订单信息...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="checkout-error" data-v-7e7f7ac5><div class="error-icon" data-v-7e7f7ac5>⚠️</div><p data-v-7e7f7ac5>${ssrInterpolate(unref(error))}</p><button class="action-btn" data-v-7e7f7ac5>返回首页</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="checkout-main" data-v-7e7f7ac5><div class="order-section" data-v-7e7f7ac5>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar" data-v-7e7f7ac5>`);
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
          _push(`<span data-v-7e7f7ac5>请在 <strong class="time-highlight" data-v-7e7f7ac5>${ssrInterpolate(unref(formatCountdown))}</strong> 内完成支付，超时将释放库存</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="order-list" data-v-7e7f7ac5><!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          _push(`<div class="order-card glass-card" data-v-7e7f7ac5><div class="order-header-row" data-v-7e7f7ac5><span class="order-no" data-v-7e7f7ac5>订单号: ${ssrInterpolate(order.order_no)}</span><span class="order-status" data-v-7e7f7ac5>待支付</span></div><div class="order-body" data-v-7e7f7ac5><div class="product-thumb" data-v-7e7f7ac5><div class="sq-cover-img-container" data-v-7e7f7ac5><img${ssrRenderAttr("src", order.product_snapshot?.image || "/images/shared/logo.png")} class="sq-cover-img" data-v-7e7f7ac5></div></div><div class="product-info" data-v-7e7f7ac5><div class="product-name" data-v-7e7f7ac5>${ssrInterpolate(order.product_snapshot?.product_name)}</div><div class="product-meta-row" data-v-7e7f7ac5>`);
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
          _push(`</div></div><div class="product-price" data-v-7e7f7ac5><div class="price-val" data-v-7e7f7ac5>${ssrInterpolate(order.unit_price.toFixed(2))} 点</div><div class="qty" data-v-7e7f7ac5>x${ssrInterpolate(order.quantity)}</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (checkoutFaqs.value.length > 0) {
          _push(`<div class="faq-section" data-v-7e7f7ac5><div class="faq-card glass-card" data-v-7e7f7ac5><h4 data-v-7e7f7ac5>`);
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
          _push(` 常见问题</h4><div class="faq-list" data-v-7e7f7ac5><!--[-->`);
          ssrRenderList(checkoutFaqs.value, (faq, index) => {
            _push(`<div class="${ssrRenderClass([{ active: activeFaq.value === index }, "faq-item"])}" data-v-7e7f7ac5><div class="faq-question" data-v-7e7f7ac5><span class="q-text" data-v-7e7f7ac5>${ssrInterpolate(faq.question)}</span>`);
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
            _push(`</div><div class="faq-answer-wrapper" style="${ssrRenderStyle({ maxHeight: activeFaq.value === index ? "200px" : "0" })}" data-v-7e7f7ac5><div class="faq-answer" data-v-7e7f7ac5>${ssrInterpolate(faq.answer)}</div></div></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="tips-container" data-v-7e7f7ac5><div class="tips-card glass-card" data-v-7e7f7ac5><h4 data-v-7e7f7ac5>`);
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
        _push(` 温馨提示</h4><ul data-v-7e7f7ac5><li data-v-7e7f7ac5>资源已为您锁定，请尽快完成支付。</li><li data-v-7e7f7ac5>超时未支付将自动释放，需重新下单。</li><li data-v-7e7f7ac5>如遇问题，请联系在线客服。</li></ul></div></div></div><div class="summary-section" data-v-7e7f7ac5><div class="summary-card glass-card sticky-card" data-v-7e7f7ac5><h3 class="card-title" data-v-7e7f7ac5>支付详情</h3><div class="price-rows" data-v-7e7f7ac5><div class="price-row" data-v-7e7f7ac5><span data-v-7e7f7ac5>商品总额</span><span class="val" data-v-7e7f7ac5>${ssrInterpolate(unref(totalProductAmount).toFixed(2))} 点</span></div><div class="price-row coupon-row" data-v-7e7f7ac5><div class="coupon-label" data-v-7e7f7ac5><span data-v-7e7f7ac5>优惠券</span>`);
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
        _push(`</div><div class="coupon-action" data-v-7e7f7ac5>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="val discount" data-v-7e7f7ac5>-${ssrInterpolate(unref(couponDiscount).toFixed(2))} 点</span>`);
        } else {
          _push(`<span class="placeholder" data-v-7e7f7ac5>选择优惠券</span>`);
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
        _push(`</div></div><div class="divider" data-v-7e7f7ac5></div><div class="price-row total" data-v-7e7f7ac5><span data-v-7e7f7ac5>应付金额</span><span class="val final" data-v-7e7f7ac5>${ssrInterpolate(unref(finalPayAmount).toFixed(2))} 点</span></div></div><div class="payment-method" data-v-7e7f7ac5><div class="method-title" data-v-7e7f7ac5>支付方式</div><div class="balance-card active" data-v-7e7f7ac5><div class="balance-icon" data-v-7e7f7ac5>`);
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
        _push(`</div><div class="balance-info" data-v-7e7f7ac5><div class="method-name" data-v-7e7f7ac5>额度支付</div><div class="user-balance-row" data-v-7e7f7ac5><span class="user-balance" data-v-7e7f7ac5>可用额度: ${ssrInterpolate(unref(userBalance).toFixed(2))} 点</span>`);
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
        _push(`</div></div><div class="check-mark" data-v-7e7f7ac5>`);
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
        _push(`</div></div></div><div class="action-area" data-v-7e7f7ac5><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "pay-btn"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-7e7f7ac5>`);
        if (unref(paying)) {
          _push(`<div class="btn-loader" data-v-7e7f7ac5></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-7e7f7ac5>额度不足，去充值</span>`);
        } else {
          _push(`<span data-v-7e7f7ac5>立即支付 ${ssrInterpolate(unref(finalPayAmount).toFixed(2))} 点</span>`);
        }
        _push(`</button><div class="agreement-text" data-v-7e7f7ac5> 点击支付即表示同意 <a href="/docs/terms" target="_blank" data-v-7e7f7ac5>服务协议</a> 和 <a href="/docs/privacy" target="_blank" data-v-7e7f7ac5>隐私协议</a></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e7f7ac5"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-I9e5TI8I.js.map
