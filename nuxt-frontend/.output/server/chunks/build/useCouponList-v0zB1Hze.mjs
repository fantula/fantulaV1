import { ref, computed } from 'vue';
import { c as couponApi } from './coupon-DPQs1p3N.mjs';

const useCouponList = (orderAmount, skuIds = ref([]), productIds = ref([]), options = { autoLoad: false }) => {
  const loading = ref(false);
  const coupons = ref([]);
  const error = ref("");
  const isApplicable = (coupon) => {
    const c = coupon.coupon;
    if (orderAmount.value < c.min_usage) return false;
    if (c.type === "product") {
      const cAny = c;
      if (cAny.sku_ids && cAny.sku_ids.length > 0) {
        const hasCommonSku = skuIds.value.some((sid) => cAny.sku_ids.includes(sid));
        if (!hasCommonSku) return false;
      } else if (cAny.product_ids && cAny.product_ids.length > 0) {
        const hasCommonProduct = productIds.value.some((pid) => {
          var _a;
          return (_a = cAny.product_ids) == null ? void 0 : _a.includes(pid);
        });
        if (!hasCommonProduct) return false;
      }
    }
    return true;
  };
  const getInapplicableReason = (coupon) => {
    const c = coupon.coupon;
    if (orderAmount.value < c.min_usage) {
      return `\u8FD8\u5DEE \xA5${(c.min_usage - orderAmount.value).toFixed(2)}`;
    }
    if (c.type === "product" && !isApplicable(coupon)) {
      return "\u8BE5\u5546\u54C1\u4E0D\u53EF\u7528";
    }
    return "\u4E0D\u53EF\u7528";
  };
  const loadCoupons = async () => {
    loading.value = true;
    error.value = "";
    try {
      const res = await couponApi.getUserCoupons();
      if (res.success && res.data) {
        const now = /* @__PURE__ */ new Date();
        coupons.value = res.data.filter(
          (c) => c.status === "unused" && c.coupon.type !== "balance" && (!c.coupon.end_date || new Date(c.coupon.end_date) >= now)
        );
      } else {
        coupons.value = [];
      }
    } catch (e) {
      error.value = e.message || "\u52A0\u8F7D\u4F18\u60E0\u5238\u5931\u8D25";
      coupons.value = [];
    } finally {
      loading.value = false;
    }
  };
  const sortedCoupons = computed(() => {
    return [...coupons.value].sort((a, b) => {
      const aValid = isApplicable(a);
      const bValid = isApplicable(b);
      if (aValid && !bValid) return -1;
      if (!aValid && bValid) return 1;
      return b.coupon.value - a.coupon.value;
    });
  });
  if (options.autoLoad) {
    loadCoupons();
  }
  return {
    // State
    loading,
    coupons,
    error,
    // Computed
    sortedCoupons,
    // Actions
    loadCoupons,
    isApplicable,
    getInapplicableReason
  };
};

export { useCouponList as u };
//# sourceMappingURL=useCouponList-v0zB1Hze.mjs.map
