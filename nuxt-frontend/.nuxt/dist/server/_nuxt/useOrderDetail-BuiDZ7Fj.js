import { computed, ref } from "vue";
import { c as clientOrderApi } from "./order-2EzuG-pd.js";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { t as ticketApi } from "./ticket-BRmvCekE.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
import { u as useBizFormat } from "./useBizFormat-D_CzFEgD.js";
function useOrderDetailLogic({ order, pendingRefundRequest, refundCancelledCount }) {
  const { getOrderStatusLabel } = useBizConfig();
  const getTimeLevel = (days) => {
    if (days <= 3) return "critical";
    if (days <= 7) return "warning";
    return "safe";
  };
  const formattedStatusText = computed(() => {
    const s = order.value.status;
    if (s === "pending_delivery") return "待发货";
    if (s === "active") return "使用中";
    if (s === "refunding") return "退款中";
    if (s === "refunded") return "已退款";
    return getOrderStatusLabel(s || "");
  });
  const remainingDays = computed(() => {
    if (!order.value.expires_at) return null;
    const diff = new Date(order.value.expires_at).getTime() - Date.now();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1e3 * 60 * 60 * 24));
  });
  const isOneTime = computed(() => order.value.orderType === "one_time_cdk");
  const isVirtualOrShared = computed(() => {
    if (!order.value.orderType) return false;
    return ["virtual", "shared_account"].includes(order.value.orderType);
  });
  const canRenew = computed(() => {
    if (isOneTime.value) return false;
    const s = order.value.status;
    return ["active", "expired"].includes(s || "");
  });
  const canRefund = computed(
    () => isVirtualOrShared.value && ["pending_delivery", "active"].includes(order.value.status || "") && !pendingRefundRequest.value && refundCancelledCount.value < 3
  );
  const canCancelRefund = computed(
    () => isVirtualOrShared.value && order.value.status === "refunding" && !!pendingRefundRequest.value
  );
  const isRefundBlocked = computed(
    () => isVirtualOrShared.value && ["pending_delivery", "active"].includes(order.value.status || "") && !pendingRefundRequest.value && refundCancelledCount.value >= 3
  );
  return {
    statusText: formattedStatusText,
    remainingDays,
    getTimeLevel,
    isOneTime,
    isVirtualOrShared,
    canRenew,
    canRefund,
    canCancelRefund,
    isRefundBlocked
  };
}
function useOrderDetail(orderId) {
  const { formatDate } = useBizFormat();
  const order = ref({});
  const cdkList = ref([]);
  const slotList = ref([]);
  const instructionImage = ref("");
  const loading = ref(true);
  const error = ref(null);
  const pendingRefundRequest = ref(null);
  const refundCancelledCount = ref(0);
  const activeTicketId = ref(null);
  const logic = useOrderDetailLogic({
    order,
    pendingRefundRequest,
    refundCancelledCount
  });
  const hasActiveTicket = computed(() => !!activeTicketId.value);
  const canCreateTicket = computed(
    () => !activeTicketId.value && ["pending_delivery", "active"].includes(order.value.status || "")
  );
  const showFulfillment = computed(
    () => ["pending_delivery", "active", "completed"].includes(order.value.status || "") && order.value.status !== "refunding"
  );
  const showExpiryWarning = computed(() => {
    if (order.value.status !== "active") return false;
    const days = logic.remainingDays.value;
    return days !== null && days <= 7;
  });
  const formatTime = (t) => t ? formatDate(t) : "-";
  const getAmountInteger = (val) => val !== void 0 ? Math.floor(val).toLocaleString() : "0";
  const getAmountDecimal = (val) => val !== void 0 ? (val % 1).toFixed(2).split(".")[1] || "00" : "00";
  const getFieldsForCdk = (cdk) => {
    let keys = [];
    if (cdk.parsed && typeof cdk.parsed === "object") {
      if (Array.isArray(cdk.parsed.fields) && cdk.parsed.fields.length > 0) {
        keys = cdk.parsed.fields.filter((f) => typeof f === "string");
      } else if (Object.keys(cdk.parsed).length > 0) {
        keys = Object.keys(cdk.parsed);
      }
    }
    if (keys.length === 0) {
      const raw = cdk.code?.trim() || "";
      if (!raw) return [];
      const cleaned = raw.replace(/[()（）[\]【】]/g, "");
      keys = cleaned.split(/[,，、]/).map((s) => s.trim()).filter((s) => s.length > 0);
    }
    return keys.map((key) => ({ key, label: key, value: "" }));
  };
  const getCdkForSlot = (slot) => {
    if (!slot || !slot.cdk_id) return {};
    return cdkList.value.find((c) => c.id === slot.cdk_id) || {};
  };
  const loadData = async () => {
    if (!orderId) return;
    loading.value = true;
    error.value = null;
    try {
      const res = await clientOrderApi.getOrderDetail(orderId);
      if (res.success && res.data) {
        const d = res.data;
        const pSnap = d.product_snapshot || {};
        const sSnap = d.sku_snapshot || {};
        order.value = {
          id: d.id,
          order_no: d.order_no,
          orderType: d.order_type,
          status: d.status,
          quantity: d.quantity,
          totalAmount: Number(d.total_amount),
          createdAt: d.created_at,
          expires_at: d.expires_at,
          productName: pSnap.product_name || "",
          productImage: pSnap.image || "",
          skuSpec: sSnap.spec_combination ? Object.values(sSnap.spec_combination).join(" ") : "默认",
          // Include raw snapshots for components
          product_snapshot: pSnap,
          sku_snapshot: sSnap
        };
        if (d.cdkList && Array.isArray(d.cdkList)) {
          cdkList.value = d.cdkList.map((cdk) => ({ ...cdk }));
          if (cdkList.value.length > 0) {
            const first = cdkList.value[0];
            if (first.accountData) {
              instructionImage.value = first.accountData.image || first.accountData.help_image || first.accountData.common_image || "";
            }
          }
        }
        slotList.value = d.slotList && Array.isArray(d.slotList) ? d.slotList : [];
        await loadRefundInfo();
        await loadTicketInfo();
      }
    } catch (e) {
      console.error("Failed to load order detail:", e);
      error.value = "加载订单详情失败";
    } finally {
      loading.value = false;
    }
  };
  const loadRefundInfo = async () => {
    if (!orderId || !logic.isVirtualOrShared.value) {
      pendingRefundRequest.value = null;
      refundCancelledCount.value = 0;
      return;
    }
    try {
      const res = await clientOrderApi.getOrderRefundInfo(orderId);
      if (res.success) {
        pendingRefundRequest.value = res.pendingRequest || null;
        refundCancelledCount.value = res.cancelledCount ?? 0;
      }
    } catch (e) {
      console.error("Failed to load refund info:", e);
    }
  };
  const loadTicketInfo = async () => {
    try {
      const res = await ticketApi.getList("processing");
      if (res.success && res.data) {
        const match = res.data.find((t) => t.order_id === orderId);
        activeTicketId.value = match ? match.id : null;
      }
    } catch (e) {
      console.error("Failed to load ticket info:", e);
    }
  };
  const handleRefundSuccess = async () => {
    await loadRefundInfo();
    await loadData();
  };
  const handleCancelRefundSuccess = async () => {
    pendingRefundRequest.value = null;
    refundCancelledCount.value++;
    await loadData();
  };
  const handleTicketSuccess = async () => {
    await loadData();
  };
  return {
    // Core Data
    order,
    cdkList,
    slotList,
    instructionImage,
    loading,
    error,
    // Refund Data
    pendingRefundRequest,
    refundCancelledCount,
    // Ticket Data
    activeTicketId,
    hasActiveTicket,
    canCreateTicket,
    // Display Logic (from shared composable)
    ...logic,
    // Additional Computed
    showFulfillment,
    showExpiryWarning,
    // Helpers
    formatTime,
    getAmountInteger,
    getAmountDecimal,
    getFieldsForCdk,
    // --- Slot CDK Lookup ---
    getCdkForSlot,
    // Actions
    loadData,
    loadRefundInfo,
    handleRefundSuccess,
    handleCancelRefundSuccess,
    handleTicketSuccess
  };
}
export {
  useOrderDetail as u
};
//# sourceMappingURL=useOrderDetail-BuiDZ7Fj.js.map
