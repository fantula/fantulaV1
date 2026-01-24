import { _ as _export_sfc, E as ElIcon, z as arrow_left_default, b6 as timer_default, a3 as info_filled_default, f as arrow_right_default, a5 as wallet_default, b9 as refresh_default, aA as select_default, d as useUserStore, ah as ElMessage, o as getSupabaseClient, ak as setInterval } from './server.mjs';
import { E as ElTag } from './index-BOQJCp53.mjs';
import { E as ElButton } from './index-DR2tYDZ3.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { C as CouponSelectorModal } from './CouponSelectorModal-RmImYc2L.mjs';
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
import '@supabase/supabase-js';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
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
import './use-form-common-props-DlCG9pC5.mjs';
import './constants-hAKFmBbq.mjs';
import './index-7IYgoTSU.mjs';
import '@ctrl/tinycolor';
import './index-DKY_z0U1.mjs';
import './BaseCouponTicket-DeNYuNt9.mjs';

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
      return { success: false, error: result.error || "\u5E94\u7528\u4F18\u60E0\u5238\u5931\u8D25" };
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
      return { success: false, error: result.error || "\u652F\u4ED8\u5931\u8D25" };
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
  const userBalance = computed(() => {
    var _a, _b;
    return (_b = (_a = userStore.user) == null ? void 0 : _a.balance) != null ? _b : 0;
  });
  const orderSkuIds = computed(() => {
    return preOrders.value.map((o) => {
      var _a;
      return (_a = o.sku_snapshot) == null ? void 0 : _a.sku_id;
    }).filter(Boolean);
  });
  const orderProductIds = computed(() => {
    return preOrders.value.map((o) => {
      var _a;
      return (_a = o.product_snapshot) == null ? void 0 : _a.product_id;
    }).filter(Boolean);
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
      ElMessage.success("\u989D\u5EA6\u5DF2\u66F4\u65B0");
    } catch (e) {
      ElMessage.error("\u66F4\u65B0\u5931\u8D25");
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
    error.value = "\u8BA2\u5355\u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u4E0B\u5355";
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
          ElMessage.warning("\u8BF7\u5148\u767B\u5F55");
          router.push("/");
          return;
        }
      }
      if (ids.length === 0) throw new Error("\u7F3A\u5C11\u8BA2\u5355 ID");
      const list = [];
      for (const id of ids) {
        const res = await supabasePreOrderApi.getPreOrder(id);
        if (res.success && res.pre_order) list.push(res.pre_order);
      }
      if (list.length === 0) throw new Error("\u8BA2\u5355\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F");
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
    const couponId = (coupon == null ? void 0 : coupon.id) || null;
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
          ElMessage.success("\u5DF2\u53D6\u6D88\u4F18\u60E0\u5238");
        } else {
          ElMessage.success("\u4F18\u60E0\u5238\u4F7F\u7528\u6210\u529F");
        }
      } else {
        ElMessage.error(res.error || "\u5E94\u7528\u4F18\u60E0\u5238\u5931\u8D25");
        if (coupon) selectedCoupon.value = null;
        couponDiscount.value = 0;
      }
    } catch (e) {
      ElMessage.error("\u7CFB\u7EDF\u5F02\u5E38: " + (e.message || JSON.stringify(e)));
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  const handlePay = async () => {
    var _a;
    if (paying.value) return;
    if (preOrders.value.length > 0 && preOrders.value[0].status !== "pending") {
      ElMessage.error("\u8BA2\u5355\u72B6\u6001\u5F02\u5E38\uFF0C\u8BF7\u5237\u65B0\u9875\u9762");
      return;
    }
    if (userBalance.value < finalPayAmount.value) {
      ElMessage.warning("\u989D\u5EA6\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u5145\u503C");
      router.push("/profile/recharge");
      return;
    }
    paying.value = true;
    try {
      const preOrder = preOrders.value[0];
      const res = await supabasePreOrderApi.confirmPreOrder(
        preOrder.id,
        "balance",
        (_a = selectedCoupon.value) == null ? void 0 : _a.id
      );
      if (!res.success) {
        ElMessage.error(res.error || "\u652F\u4ED8\u5931\u8D25");
        return;
      }
      lastOrderId.value = res.order_no || "";
      lastOrderAmount.value = finalPayAmount.value;
      showPaySuccess.value = true;
      await userStore.fetchUserInfo();
    } catch (e) {
      ElMessage.error(e.message || "\u7CFB\u7EDF\u5F02\u5E38");
    } finally {
      paying.value = false;
    }
  };
  const formatSpec = (spec) => {
    if (!spec) return "\u9ED8\u8BA4\u89C4\u683C";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-mask" }, _attrs))} data-v-14a59af2><div class="pay-success-modal glass-card" data-v-14a59af2><div class="success-header" data-v-14a59af2><div class="success-circle" data-v-14a59af2><div class="success-icon-wrapper" data-v-14a59af2><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-14a59af2><polyline points="20 6 9 17 4 12" data-v-14a59af2></polyline></svg></div></div><div class="success-title" data-v-14a59af2>\u652F\u4ED8\u6210\u529F</div><div class="success-desc" data-v-14a59af2>\u60A8\u7684\u8BA2\u5355\u5DF2\u786E\u8BA4\uFF0C\u611F\u8C22\u60A8\u7684\u8D2D\u4E70</div></div><div class="success-info" data-v-14a59af2><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>\u8BA2\u5355\u7F16\u53F7</span><span class="info-value info-link" data-v-14a59af2>${ssrInterpolate(safeOrderId.value)}</span></div><div class="info-divider" data-v-14a59af2></div><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>\u652F\u4ED8\u91D1\u989D</span><span class="info-value info-amount" data-v-14a59af2>\xA5${ssrInterpolate(safeAmount.value)}</span></div><div class="info-divider" data-v-14a59af2></div><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>\u652F\u4ED8\u65B9\u5F0F</span><span class="info-value info-paytype" data-v-14a59af2>${ssrInterpolate(safePayTypeName.value)}</span></div><div class="info-divider" data-v-14a59af2></div><div class="info-row" data-v-14a59af2><span class="info-label" data-v-14a59af2>\u652F\u4ED8\u65F6\u95F4</span><span class="info-value info-time" data-v-14a59af2>${ssrInterpolate(safeTime.value)}</span></div></div><div class="status-box" data-v-14a59af2><div class="status-icon" data-v-14a59af2>\u{1F680}</div><div class="status-text" data-v-14a59af2>\u7CFB\u7EDF\u6B63\u5728\u4E3A\u60A8\u81EA\u52A8\u53D1\u8D27\uFF0C\u8BF7\u7A0D\u5019\u67E5\u770B</div></div><div class="success-actions" data-v-14a59af2><button class="order-btn" data-v-14a59af2> \u524D\u5F80\u67E5\u770B\u8BA2\u5355 </button><button class="home-btn" data-v-14a59af2> \u8FD4\u56DE\u9996\u9875 </button></div><div class="success-tip" data-v-14a59af2> \u5982\u6709\u4EFB\u4F55\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D <span class="kefu-phone" data-v-14a59af2>\u5728\u7EBF\u5BA2\u670D</span></div></div></div>`);
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
    const handlePaySuccessClose = () => {
      showPaySuccess.value = false;
      router.push("/profile/orders");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_el_icon = ElIcon;
      const _component_el_tag = ElTag;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "checkout-page" }, _attrs))} data-v-b245c8d1><div class="checkout-content" data-v-b245c8d1><div class="checkout-header" data-v-b245c8d1><button class="back-btn" data-v-b245c8d1>`);
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
      _push(` \u8FD4\u56DE </button><div class="page-title" data-v-b245c8d1>\u8BA2\u5355\u7ED3\u7B97</div></div>`);
      if (unref(loading)) {
        _push(`<div class="checkout-loading" data-v-b245c8d1><div class="glass-loader" data-v-b245c8d1></div><p data-v-b245c8d1>\u6B63\u5728\u52A0\u8F7D\u8BA2\u5355\u4FE1\u606F...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="checkout-error" data-v-b245c8d1><div class="error-icon" data-v-b245c8d1>\u26A0\uFE0F</div><p data-v-b245c8d1>${ssrInterpolate(unref(error))}</p><button class="action-btn" data-v-b245c8d1>\u8FD4\u56DE\u9996\u9875</button></div>`);
      } else if (unref(preOrders).length > 0) {
        _push(`<div class="checkout-main" data-v-b245c8d1><div class="order-section" data-v-b245c8d1>`);
        if (unref(remainingSeconds) > 0) {
          _push(`<div class="countdown-bar" data-v-b245c8d1>`);
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
          _push(`<span data-v-b245c8d1>\u8BF7\u5728 <strong class="time-highlight" data-v-b245c8d1>${ssrInterpolate(unref(formatCountdown))}</strong> \u5185\u5B8C\u6210\u652F\u4ED8\uFF0C\u8D85\u65F6\u5C06\u91CA\u653E\u5E93\u5B58</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="order-list" data-v-b245c8d1><!--[-->`);
        ssrRenderList(unref(preOrders), (order) => {
          var _a2, _b;
          _push(`<div class="order-card glass-card" data-v-b245c8d1><div class="order-header-row" data-v-b245c8d1><span class="order-no" data-v-b245c8d1>\u8BA2\u5355\u53F7: ${ssrInterpolate(order.order_no)}</span><span class="order-status" data-v-b245c8d1>\u5F85\u652F\u4ED8</span></div><div class="order-body" data-v-b245c8d1><div class="product-thumb" data-v-b245c8d1><div class="sq-cover-img-container" data-v-b245c8d1><img${ssrRenderAttr("src", ((_a2 = order.product_snapshot) == null ? void 0 : _a2.image) || "/images/shared/logo.png")} class="sq-cover-img" data-v-b245c8d1></div></div><div class="product-info" data-v-b245c8d1><div class="product-name" data-v-b245c8d1>${ssrInterpolate((_b = order.product_snapshot) == null ? void 0 : _b.product_name)}</div><div class="product-meta-row" data-v-b245c8d1>`);
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
          _push(`<span class="delivery-info" data-v-b245c8d1>\u53D1\u8D27\u65B9\u5F0F\uFF1A\u81EA\u52A8\u53D1\u8D27</span></div></div><div class="product-price" data-v-b245c8d1><div class="price-val" data-v-b245c8d1>${ssrInterpolate(order.unit_price.toFixed(2))} \u70B9</div><div class="qty" data-v-b245c8d1>x${ssrInterpolate(order.quantity)}</div></div></div></div>`);
        });
        _push(`<!--]--></div><div class="tips-container" data-v-b245c8d1><div class="tips-card glass-card" data-v-b245c8d1><h4 data-v-b245c8d1>`);
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
        _push(` \u6E29\u99A8\u63D0\u793A</h4><ul data-v-b245c8d1><li data-v-b245c8d1>\u8D44\u6E90\u5DF2\u4E3A\u60A8\u9501\u5B9A\uFF0C\u8BF7\u5C3D\u5FEB\u5B8C\u6210\u652F\u4ED8\u3002</li><li data-v-b245c8d1>\u8D85\u65F6\u672A\u652F\u4ED8\u5C06\u81EA\u52A8\u91CA\u653E\uFF0C\u9700\u91CD\u65B0\u4E0B\u5355\u3002</li><li data-v-b245c8d1>\u5982\u9047\u95EE\u9898\uFF0C\u8BF7\u8054\u7CFB\u5728\u7EBF\u5BA2\u670D\u3002</li></ul></div></div></div><div class="summary-section" data-v-b245c8d1><div class="summary-card glass-card sticky-card" data-v-b245c8d1><h3 class="card-title" data-v-b245c8d1>\u652F\u4ED8\u8BE6\u60C5</h3><div class="price-rows" data-v-b245c8d1><div class="price-row" data-v-b245c8d1><span data-v-b245c8d1>\u5546\u54C1\u603B\u989D</span><span class="val" data-v-b245c8d1>${ssrInterpolate(unref(totalProductAmount).toFixed(2))} \u70B9</span></div><div class="price-row coupon-row" data-v-b245c8d1><div class="coupon-label" data-v-b245c8d1><span data-v-b245c8d1>\u4F18\u60E0\u5238</span>`);
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
        _push(`</div><div class="coupon-action" data-v-b245c8d1>`);
        if (unref(selectedCoupon)) {
          _push(`<span class="val discount" data-v-b245c8d1>-${ssrInterpolate(unref(couponDiscount).toFixed(2))} \u70B9</span>`);
        } else {
          _push(`<span class="placeholder" data-v-b245c8d1>\u9009\u62E9\u4F18\u60E0\u5238</span>`);
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
        _push(`</div></div><div class="divider" data-v-b245c8d1></div><div class="price-row total" data-v-b245c8d1><span data-v-b245c8d1>\u5E94\u4ED8\u91D1\u989D</span><span class="val final" data-v-b245c8d1>${ssrInterpolate(unref(finalPayAmount).toFixed(2))} \u70B9</span></div></div><div class="payment-method" data-v-b245c8d1><div class="method-title" data-v-b245c8d1>\u652F\u4ED8\u65B9\u5F0F</div><div class="balance-card active" data-v-b245c8d1><div class="balance-icon" data-v-b245c8d1>`);
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
        _push(`</div><div class="balance-info" data-v-b245c8d1><div class="method-name" data-v-b245c8d1>\u989D\u5EA6\u652F\u4ED8</div><div class="user-balance-row" data-v-b245c8d1><span class="user-balance" data-v-b245c8d1>\u53EF\u7528\u989D\u5EA6: ${ssrInterpolate(unref(userBalance).toFixed(2))} \u70B9</span>`);
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
        _push(`</div></div><div class="check-mark" data-v-b245c8d1>`);
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
        _push(`</div></div></div><div class="action-area" data-v-b245c8d1><button class="${ssrRenderClass([{ "insufficient": isBalanceInsufficient.value }, "pay-btn"])}"${ssrIncludeBooleanAttr(unref(paying) || unref(remainingSeconds) <= 0) ? " disabled" : ""} data-v-b245c8d1>`);
        if (unref(paying)) {
          _push(`<div class="btn-loader" data-v-b245c8d1></div>`);
        } else if (isBalanceInsufficient.value) {
          _push(`<span data-v-b245c8d1>\u989D\u5EA6\u4E0D\u8DB3\uFF0C\u53BB\u5145\u503C</span>`);
        } else {
          _push(`<span data-v-b245c8d1>\u7ACB\u5373\u652F\u4ED8 ${ssrInterpolate(unref(finalPayAmount).toFixed(2))} \u70B9</span>`);
        }
        _push(`</button><div class="agreement-text" data-v-b245c8d1> \u70B9\u51FB\u652F\u4ED8\u5373\u8868\u793A\u540C\u610F <a href="/docs/terms" target="_blank" data-v-b245c8d1>\u670D\u52A1\u534F\u8BAE</a> \u548C <a href="/docs/privacy" target="_blank" data-v-b245c8d1>\u9690\u79C1\u534F\u8BAE</a></div></div></div></div></div>`);
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
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b245c8d1"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CQyFWmRt.mjs.map
