import { ref, watch } from "vue";
function useInfiniteScroll(options) {
  const {
    data,
    fetchData,
    pageSize = 10,
    manual = false
  } = options;
  const displayList = ref([]);
  const loading = ref(false);
  const finished = ref(false);
  const page = ref(1);
  const total = ref(0);
  const error = ref(false);
  const isClientMode = !!data;
  const loadMore = async () => {
    if (loading.value || finished.value) return;
    loading.value = true;
    error.value = false;
    try {
      if (isClientMode) {
        const sourceData = data.value;
        const start = (page.value - 1) * pageSize;
        const end = start + pageSize;
        const nextBatch = sourceData.slice(start, end);
        if (nextBatch.length > 0) {
          displayList.value.push(...nextBatch);
          page.value++;
        }
        if (displayList.value.length >= sourceData.length) {
          finished.value = true;
        }
      } else if (fetchData) {
        const res = await fetchData(page.value, pageSize);
        if (res.list.length > 0) {
          displayList.value.push(...res.list);
          page.value++;
        }
        if (res.hasMore === false || res.list.length < pageSize) {
          finished.value = true;
        }
        if (typeof res.total === "number") {
          total.value = res.total;
        }
      }
    } catch (e) {
      console.error("Infinite Scroll Load Error:", e);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };
  const reset = () => {
    displayList.value = [];
    page.value = 1;
    finished.value = false;
    loading.value = false;
    error.value = false;
    loadMore();
  };
  if (isClientMode) {
    watch(data, () => {
      reset();
    });
  } else if (!manual) {
    loadMore();
  }
  return {
    displayList,
    loading,
    finished,
    error,
    loadMore,
    reset
  };
}
export {
  useInfiniteScroll as u
};
//# sourceMappingURL=useInfiniteScroll-Cg7MWwox.js.map
