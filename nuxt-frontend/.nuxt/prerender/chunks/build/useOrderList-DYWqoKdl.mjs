import { ref, computed } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { c as clientOrderApi } from './order-CRVwbgS6.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';
import { u as useBizConfig } from './useBizConfig-tsYRZrF8.mjs';

function useOrderList() {
  const loading = ref(false);
  const orders = ref([]);
  const preOrders = ref([]);
  const currentTab = ref("all");
  const { formatPrice, formatDate } = useBizFormat();
  const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
  const tabs = [
    { label: "\u5168\u90E8\u8BA2\u5355", value: "all" },
    { label: "\u5F85\u652F\u4ED8", value: "pending" },
    { label: "\u5F85\u53D1\u8D27", value: "pending_delivery" },
    { label: "\u4F7F\u7528\u4E2D", value: "active" },
    { label: "\u5DF2\u8FC7\u671F", value: "expired" },
    { label: "\u9000\u6B3E/\u552E\u540E", value: "refund" }
    // 包含 refunding + refunded
  ];
  const allOrders = computed(() => {
    const pendingList = preOrders.value.map((o) => {
      var _a, _b, _c;
      return {
        id: o.id,
        order_no: o.order_no,
        status: "pending",
        total_amount: o.total_amount,
        quantity: o.quantity,
        created_at: o.created_at,
        // 扁平化字段 (供模板直接使用)
        product_name: ((_a = o.product_snapshot) == null ? void 0 : _a.product_name) || "\u5F85\u652F\u4ED8\u5546\u54C1",
        product_image: ((_b = o.product_snapshot) == null ? void 0 : _b.image) || "",
        spec_text: formatSpec((_c = o.sku_snapshot) == null ? void 0 : _c.spec_combination),
        isPending: true
      };
    });
    const paidList = orders.value.map((o) => {
      var _a, _b, _c;
      return {
        id: o.id,
        order_no: o.order_no,
        status: o.status,
        total_amount: o.total_amount,
        quantity: o.quantity,
        created_at: o.created_at,
        // 扁平化字段
        product_name: ((_a = o.product_snapshot) == null ? void 0 : _a.product_name) || "\u672A\u77E5\u5546\u54C1",
        product_image: ((_b = o.product_snapshot) == null ? void 0 : _b.image) || "",
        spec_text: formatSpec((_c = o.sku_snapshot) == null ? void 0 : _c.spec_combination),
        isPending: false
      };
    });
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
      console.error("\u52A0\u8F7D\u8BA2\u5355\u5217\u8868\u5931\u8D25:", error);
    } finally {
      loading.value = false;
    }
  }
  function changeTab(tabValue) {
    currentTab.value = tabValue;
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
    var _a;
    return ((_a = tabs.find((t) => t.value === currentTab.value)) == null ? void 0 : _a.label) || "\u8BA2\u5355";
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
    formatSpec,
    getCurrentTabLabel,
    // 全局工具
    formatPrice,
    formatDate,
    getOrderStatusLabel,
    getOrderStatusType
  };
}

export { useOrderList as u };
//# sourceMappingURL=useOrderList-DYWqoKdl.mjs.map
