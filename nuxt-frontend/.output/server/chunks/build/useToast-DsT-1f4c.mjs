import { ref } from 'vue';

const isVisible = ref(false);
const message = ref("");
const type = ref("info");
let timer = null;
const useToast = () => {
  const showToast = (msg, toastType = "info", duration = 2e3) => {
    if (timer) {
      clearTimeout(timer);
      isVisible.value = false;
    }
    message.value = msg;
    type.value = toastType;
    isVisible.value = true;
    timer = setTimeout(() => {
      isVisible.value = false;
      timer = null;
    }, duration);
  };
  const hideToast = () => {
    isVisible.value = false;
    if (timer) clearTimeout(timer);
  };
  return {
    isVisible,
    message,
    type,
    showToast,
    hideToast
  };
};

export { useToast as u };
//# sourceMappingURL=useToast-DsT-1f4c.mjs.map
