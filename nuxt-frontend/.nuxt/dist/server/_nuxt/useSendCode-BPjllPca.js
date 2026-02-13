/* empty css              */
/* empty css                    */
import { ref } from "vue";
import { a as authApi } from "./user-C1i1UnhA.js";
import { s as setInterval } from "./interval-BHZX8LlC.js";
import { E as ElMessage } from "./index-Ho-fELR6.js";
function useAuthTimer() {
  const countdown = ref(0);
  let timerInterval = null;
  function restore(key) {
    return;
  }
  function start(seconds, key, isNew = true) {
    countdown.value = seconds;
    if (isNew) {
      const endTime = Date.now() + seconds * 1e3;
      localStorage.setItem(key, endTime.toString());
    }
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval();
  }
  function stop(key) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    countdown.value = 0;
    localStorage.removeItem(key);
  }
  return {
    countdown,
    start,
    stop,
    restore
  };
}
function useSendCode(options) {
  const { timerKey, cooldown = 180 } = options;
  const loading = ref(false);
  const { countdown, start, restore } = useAuthTimer();
  async function sendCode(email) {
    if (countdown.value > 0) return;
    if (!email) {
      ElMessage.warning("请输入邮箱");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ElMessage.warning("邮箱格式不正确");
      return false;
    }
    loading.value = true;
    try {
      const res = await authApi.getEmailCode(email);
      if (res.success) {
        ElMessage.success("验证码已发送");
        start(cooldown, timerKey);
        return true;
      } else {
        ElMessage.error(res.msg || "发送失败");
        return false;
      }
    } catch (error) {
      ElMessage.error(error.message || "网络错误");
      return false;
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    countdown,
    sendCode,
    checkTimer: () => restore(timerKey)
  };
}
export {
  useSendCode as u
};
//# sourceMappingURL=useSendCode-BPjllPca.js.map
