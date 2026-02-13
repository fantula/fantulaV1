/* empty css              */
/* empty css                    */
import { ref, reactive, computed } from "vue";
import { E as ElMessage } from "./index-Ho-fELR6.js";
function useAdminList(options) {
  const loading = ref(false);
  const initLoading = ref(true);
  const list = ref([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(options.defaultPageSize || 20);
  const selectedIds = ref([]);
  const filters = reactive(options.defaultFilters || {});
  const hasSelection = computed(() => selectedIds.value.length > 0);
  const selectedCount = computed(() => selectedIds.value.length);
  const loadList = async () => {
    loading.value = true;
    try {
      const result = await options.fetchFn({
        page: currentPage.value,
        pageSize: pageSize.value,
        filters
      });
      if (result.success) {
        list.value = result.data || [];
        total.value = result.total || result.data?.length || 0;
      } else {
        ElMessage.error(result.error || "加载数据失败");
      }
    } catch (e) {
      ElMessage.error(e.message || "加载数据失败");
    } finally {
      loading.value = false;
      initLoading.value = false;
    }
  };
  const refresh = async () => {
    await loadList();
    ElMessage.success("刷新成功");
  };
  const handlePageChange = (page) => {
    currentPage.value = page;
    loadList();
  };
  const handlePageSizeChange = (size) => {
    pageSize.value = size;
    currentPage.value = 1;
    loadList();
  };
  const handleFilterChange = () => {
    currentPage.value = 1;
    loadList();
  };
  const handleSelectionChange = (rows) => {
    selectedIds.value = rows.map((r) => r.id);
  };
  const clearSelection = () => {
    selectedIds.value = [];
  };
  const resetFilters = () => {
    const defaults = options.defaultFilters || {};
    Object.keys(filters).forEach((key) => {
      filters[key] = defaults[key] ?? void 0;
    });
    currentPage.value = 1;
    loadList();
  };
  const updateRow = (id, updates) => {
    const index = list.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      list.value[index] = { ...list.value[index], ...updates };
    }
  };
  const removeRow = (id) => {
    const index = list.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      list.value.splice(index, 1);
      total.value = Math.max(0, total.value - 1);
    }
  };
  const removeRows = (ids) => {
    ids.forEach((id) => removeRow(id));
    clearSelection();
  };
  if (options.autoLoad !== false) ;
  return {
    // State
    loading,
    initLoading,
    list,
    total,
    currentPage,
    pageSize,
    selectedIds,
    filters,
    // Computed
    hasSelection,
    selectedCount,
    // Methods
    loadList,
    refresh,
    handlePageChange,
    handlePageSizeChange,
    handleFilterChange,
    handleSelectionChange,
    clearSelection,
    resetFilters,
    updateRow,
    removeRow,
    removeRows
  };
}
export {
  useAdminList as u
};
//# sourceMappingURL=useAdminList-BwghEQmC.js.map
