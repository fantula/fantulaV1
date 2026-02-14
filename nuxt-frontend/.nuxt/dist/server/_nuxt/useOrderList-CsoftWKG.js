import { ref, computed } from "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { c as clientOrderApi } from "./order---CTIOc2.js";
import { u as useBizFormat } from "./useBizFormat-CLwhy_Ih.js";
import { u as useBizConfig } from "./useBizConfig-tsYRZrF8.js";
function useOrderList() {
  const loading = ref(false);
  const orders = ref([]);
  const preOrders = ref([]);
  const currentTab = ref("all");
  const { formatPrice, formatDate } = useBizFormat();
  const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
  const tabs = [
    { label: "全部订单", value: "all" },
    { label: "待支付", value: "pending" },
    { label: "待发货", value: "pending_delivery" },
    { label: "使用中", value: "active" },
    { label: "已过期", value: "expired" },
    { label: "退款/售后", value: "refund" }
    // 包含 refunding + refunded
  ];
  const allOrders = computed(() => {
    const pendingList = preOrders.value.map((o) => ({
      id: o.id,
      order_no: o.order_no,
      status: "pending",
      total_amount: o.total_amount,
      quantity: o.quantity,
      created_at: o.created_at,
      // 扁平化字段 (供模板直接使用)
      product_name: o.product_snapshot?.product_name || "待支付商品",
      product_image: o.product_snapshot?.image || "",
      spec_text: formatSpec(o.sku_snapshot?.spec_combination),
      isPending: true
    }));
    const paidList = orders.value.map((o) => ({
      id: o.id,
      order_no: o.order_no,
      status: o.status,
      total_amount: o.total_amount,
      quantity: o.quantity,
      created_at: o.created_at,
      // 扁平化字段
      product_name: o.product_snapshot?.product_name || "未知商品",
      product_image: o.product_snapshot?.image || "",
      spec_text: formatSpec(o.sku_snapshot?.spec_combination),
      isPending: false
    }));
    const merged = [...pendingList, ...paidList];
    merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return merged;
  });
  const filterStrategies = {
    "all": () => true,
    // 待支付: 仅显示预订单 (pending)
    "pending": (o) => o.isPending === true && o.status === "pending",
    // 待发货: 仅显示正式订单
    "pending_delivery": (o) => !o.isPending && o.status === "pending_delivery",
    // 使用中: 仅显示正式订单
    "active": (o) => !o.isPending && o.status === "active",
    // 已过期: 仅显示正式订单 (预订单过期会被自动清理或不显示)
    "expired": (o) => !o.isPending && o.status === "expired",
    // 退款/售后: 包含退款中和已退款
    "refund": (o) => !o.isPending && ["refunding", "refunded"].includes(o.status)
  };
  const filteredList = computed(() => {
    const strategy = filterStrategies[currentTab.value];
    if (!strategy) return allOrders.value;
    return allOrders.value.filter(strategy);
  });
  async function loadList() {
    loading.value = true;
    try {
      const [ordersRes, preOrdersRes] = await Promise.all([
        clientOrderApi.getOrderList(),
        clientOrderApi.getPendingPreOrders()
      ]);
      if (ordersRes.success) {
        orders.value = ordersRes.data || [];
      }
      if (preOrdersRes.success) {
        preOrders.value = preOrdersRes.data || [];
      }
    } catch (error) {
      console.error("加载订单列表失败:", error);
    } finally {
      loading.value = false;
    }
  }
  function changeTab(tabValue) {
    currentTab.value = tabValue;
  }
  async function deleteOrder(orderId, isPreOrder = false) {
    if (isPreOrder) {
      return deletePreOrder(orderId);
    } else {
      const res = await clientOrderApi.hideOrder(orderId);
      if (res.success) {
        orders.value = orders.value.filter((o) => o.id !== orderId);
        return true;
      }
      return false;
    }
  }
  async function deletePreOrder(preOrderId) {
    const res = await clientOrderApi.cancelPreOrder(preOrderId);
    if (res.success) {
      preOrders.value = preOrders.value.filter((o) => o.id !== preOrderId);
      return true;
    }
    return false;
  }
  function formatSpec(spec) {
    if (!spec) return "";
    if (typeof spec === "string") return spec;
    return Object.values(spec).join(" / ");
  }
  function getCurrentTabLabel() {
    return tabs.find((t) => t.value === currentTab.value)?.label || "订单";
  }
  return {
    // 状态
    loading,
    orders,
    preOrders,
    currentTab,
    tabs,
    // 计算属性
    allOrders,
    filteredList,
    // 方法
    loadList,
    changeTab,
    deletePreOrder,
    deleteOrder,
    formatSpec,
    getCurrentTabLabel,
    // 全局工具
    formatPrice,
    formatDate,
    getOrderStatusLabel,
    getOrderStatusType
  };
}
export {
  useOrderList as u
};
//# sourceMappingURL=useOrderList-CsoftWKG.js.map
