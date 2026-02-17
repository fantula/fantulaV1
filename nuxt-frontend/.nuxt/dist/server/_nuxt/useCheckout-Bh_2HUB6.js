import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { u as useUserStore } from "./user-DLDq0pTF.js";
import { supabasePreOrderApi } from "./supabase-D4dCvdwD.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { u as useNotify } from "./useNotify-Bx9I1ZGd.js";
import { l as useGlobalLoading } from "../server.mjs";
import { s as setInterval } from "./interval-BnEBQU8I.js";
function useCheckout() {
  const router = useRouter();
  const userStore = useUserStore();
  const { success, error: notifyError, warning } = useNotify();
  const globalLoading = useGlobalLoading();
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
      success("额度已更新");
    } catch (e) {
      notifyError("更新失败");
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
          warning("请先登录");
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
          success("已取消优惠券");
        } else {
          success("优惠券使用成功");
        }
      } else {
        notifyError(res.error || "应用优惠券失败");
        if (coupon) selectedCoupon.value = null;
        couponDiscount.value = 0;
      }
    } catch (e) {
      notifyError("系统异常: " + (e.message || JSON.stringify(e)));
      console.error(e);
    } finally {
      loading.value = false;
    }
  };
  const handlePay = async () => {
    if (paying.value) return;
    if (preOrders.value.length > 0 && preOrders.value[0].status !== "pending") {
      notifyError("订单状态异常，请刷新页面");
      return;
    }
    if (userBalance.value < finalPayAmount.value) {
      warning("额度不足，请先充值");
      router.push("/profile/recharge");
      return;
    }
    paying.value = true;
    globalLoading.show("正在支付...");
    try {
      const preOrder = preOrders.value[0];
      const res = await supabasePreOrderApi.confirmPreOrder(
        preOrder.id,
        "balance",
        selectedCoupon.value?.id
      );
      if (!res.success) {
        notifyError(res.error || "支付失败");
        globalLoading.hide();
        return;
      }
      globalLoading.success("支付成功");
      setTimeout(async () => {
        lastOrderId.value = res.order_no || "";
        lastOrderAmount.value = finalPayAmount.value;
        showPaySuccess.value = true;
        await userStore.fetchUserInfo();
      }, 1e3);
    } catch (e) {
      notifyError(e.message || "系统异常");
      globalLoading.hide();
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
export {
  useCheckout as u
};
//# sourceMappingURL=useCheckout-Bh_2HUB6.js.map
