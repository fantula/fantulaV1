/* empty css              */
/* empty css                    */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { u as useAdminList } from "./useAdminList-BwghEQmC.js";
import "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { a as adminCouponApi } from "./coupon-DnjcrSN8.js";
import "../server.mjs";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs";
import { E as ElMessageBox } from "./index-CJRqI9Bk.js";
import { E as ElMessage } from "./index-Ho-fELR6.js";
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
    const action = newStatus ? "启用" : "禁用";
    try {
      const res = await adminCouponApi.updateCoupon(row.id, { status: newStatus });
      if (res.success) {
        ElMessage.success(`${action}成功`);
        updateRow(row.id, { status: newStatus });
      } else {
        ElMessage.error(res.error);
      }
    } catch (e) {
      ElMessage.error(e.message || "操作失败");
    }
  };
  const handleDelete = async (row) => {
    ElMessageBox.confirm("确定要删除该优惠券吗？", "提示", { type: "warning" }).then(async () => {
      const res = await adminCouponApi.deleteCoupon(row.id);
      if (res.success) {
        ElMessage.success("删除成功");
        removeRow(row.id);
      } else {
        ElMessage.error(res.error);
      }
    });
  };
  const handleBulkDelete = async () => {
    if (!selectedIds.value.length) return;
    ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券规则吗？`, "提示", { type: "warning" }).then(async () => {
      let successCount = 0;
      for (const id of selectedIds.value) {
        const res = await adminCouponApi.deleteCoupon(id);
        if (res.success) successCount++;
      }
      ElMessage.success(`批量操作结束，成功删除 ${successCount} 个`);
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
export {
  useAdminCouponList as u
};
//# sourceMappingURL=useAdminCouponList-Ckzk72V9.js.map
