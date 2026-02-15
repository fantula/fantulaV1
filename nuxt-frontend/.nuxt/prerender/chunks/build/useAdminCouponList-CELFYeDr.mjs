import { u as useAdminList } from './useAdminList-8OVTPqBj.mjs';
import { a as adminCouponApi } from './coupon-Llh82Qx6.mjs';
import { E as ElMessageBox } from './index-TRxueLL5.mjs';
import { E as ElMessage } from './index-CQnGB6WT.mjs';

function useAdminCouponList(type) {
  const {
    loading,
    list,
    total,
    currentPage,
    pageSize,
    selectedIds,
    hasSelection,
    refresh,
    handleFilterChange,
    handleSelectionChange,
    loadList,
    removeRow,
    removeRows,
    updateRow
  } = useAdminList({
    defaultPageSize: 20,
    fetchFn: async (params) => {
      const res = await adminCouponApi.getCoupons({
        type,
        offset: (params.page - 1) * params.pageSize,
        limit: params.pageSize
      });
      if (!res.success) {
        return { success: false, error: res.error };
      }
      return {
        success: true,
        data: res.coupons,
        total: res.total
      };
    }
  });
  const handleToggleStatus = async (row) => {
    const newStatus = !row.status;
    const action = newStatus ? "\u542F\u7528" : "\u7981\u7528";
    try {
      const res = await adminCouponApi.updateCoupon(row.id, { status: newStatus });
      if (res.success) {
        ElMessage.success(`${action}\u6210\u529F`);
        updateRow(row.id, { status: newStatus });
      } else {
        ElMessage.error(res.error);
      }
    } catch (e) {
      ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
    }
  };
  const handleDelete = async (row) => {
    ElMessageBox.confirm("\u786E\u5B9A\u8981\u5220\u9664\u8BE5\u4F18\u60E0\u5238\u5417\uFF1F", "\u63D0\u793A", { type: "warning" }).then(async () => {
      const res = await adminCouponApi.deleteCoupon(row.id);
      if (res.success) {
        ElMessage.success("\u5220\u9664\u6210\u529F");
        removeRow(row.id);
      } else {
        ElMessage.error(res.error);
      }
    });
  };
  const handleBulkDelete = async () => {
    if (!selectedIds.value.length) return;
    ElMessageBox.confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9009\u4E2D\u7684 ${selectedIds.value.length} \u4E2A\u4F18\u60E0\u5238\u89C4\u5219\u5417\uFF1F`, "\u63D0\u793A", { type: "warning" }).then(async () => {
      let successCount = 0;
      for (const id of selectedIds.value) {
        const res = await adminCouponApi.deleteCoupon(id);
        if (res.success) successCount++;
      }
      ElMessage.success(`\u6279\u91CF\u64CD\u4F5C\u7ED3\u675F\uFF0C\u6210\u529F\u5220\u9664 ${successCount} \u4E2A`);
      removeRows(selectedIds.value);
      refresh();
    });
  };
  return {
    loading,
    list,
    total,
    currentPage,
    pageSize,
    selectedIds,
    hasSelection,
    refresh,
    handleFilterChange,
    handleSelectionChange,
    handleToggleStatus,
    handleDelete,
    handleBulkDelete,
    loadList
  };
}

export { useAdminCouponList as u };
//# sourceMappingURL=useAdminCouponList-CELFYeDr.mjs.map
