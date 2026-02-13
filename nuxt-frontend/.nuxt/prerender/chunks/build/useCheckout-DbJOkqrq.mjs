import { ref, computed } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { useRouter } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue-router/vue-router.node.mjs';
import { u as useUserStore } from './user-C1i1UnhA.mjs';
import { supabasePreOrderApi } from './supabase-fcLPkUp1.mjs';
import { s as setInterval } from './interval-BHZX8LlC.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';

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

export { useCheckout as u };
//# sourceMappingURL=useCheckout-DbJOkqrq.mjs.map
