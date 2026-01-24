import { ah as ElMessage } from './server.mjs';
import { ref } from 'vue';
import { a as adminOrderApi } from './order-kd-ypcFy.mjs';
import { D as DEFAULT_AVATAR } from './constants-Co_OOoHD.mjs';
import { u as useBizConfig } from './useBizConfig-DtWyKy4G.mjs';
import { u as useBizFormat } from './useBizFormat-CLwhy_Ih.mjs';

function useAdminOrderList(orderType) {
  const loading = ref(false);
  const list = ref([]);
  const total = ref(0);
  const page = ref(1);
  const pageSize = ref(20);
  const selectedIds = ref([]);
  async function loadList() {
    loading.value = true;
    try {
      const { success, orders, total: totalCount, error } = await adminOrderApi.getOrders({
        page: page.value,
        pageSize: pageSize.value,
        order_type: orderType,
        exclude_status: ["refunding", "refunded"]
        // 排除退款中和已退款的订单
      });
      if (!success) {
        ElMessage.error(error || "\u52A0\u8F7D\u5931\u8D25");
        return;
      }
      list.value = orders;
      total.value = totalCount;
    } catch (e) {
      console.error("\u52A0\u8F7D\u8BA2\u5355\u5931\u8D25:", e);
      ElMessage.error("\u7CFB\u7EDF\u5F02\u5E38");
    } finally {
      loading.value = false;
    }
  }
  function handlePageChange(val) {
    page.value = val;
    loadList();
  }
  function handleSizeChange(val) {
    pageSize.value = val;
    page.value = 1;
    loadList();
  }
  function handleSelectionChange(selection) {
    selectedIds.value = selection.map((item) => item.id);
  }
  function handleCopy(text) {
    if (!text) return;
    (void 0).clipboard.writeText(text);
    ElMessage.success("\u5DF2\u590D\u5236");
  }
  function formatSpec(spec) {
    if (!spec) return "-";
    if (typeof spec === "string") return spec;
    if (typeof spec === "object") {
      return Object.entries(spec).map(([k, v]) => `${k}: ${v}`).join(" / ");
    }
    return "-";
  }
  const { formatPrice, formatDate } = useBizFormat();
  const { getOrderStatusLabel, getOrderStatusType } = useBizConfig();
  const getStatusText = (status) => getOrderStatusLabel(status);
  const getStatusType = (status) => getOrderStatusType(status);
  const formatTime = (time) => formatDate(time);
  return {
    // State
    loading,
    list,
    total,
    page,
    pageSize,
    selectedIds,
    DEFAULT_AVATAR,
    // Actions
    loadList,
    handlePageChange,
    handleSizeChange,
    handleSelectionChange,
    handleCopy,
    // Helpers
    formatSpec,
    getStatusText,
    getStatusType,
    formatTime,
    formatPrice
  };
}

export { useAdminOrderList as u };
//# sourceMappingURL=useAdminOrderList-DviHj6Hn.mjs.map
