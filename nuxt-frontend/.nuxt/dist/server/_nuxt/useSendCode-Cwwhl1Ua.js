import { ref } from "vue";
import { a as authApi } from "./user-DLDq0pTF.js";
import { s as setInterval } from "./interval-BnEBQU8I.js";
import { u as useNotify } from "./useNotify-QNEBBzdZ.js";
function useAuthTimer() {
  const countdown = ref(0);
  let timerInterval = null;
  function restore(key) {
    return;
  }
  function start(seconds, key, isNew = true) {
    countdown.value = seconds;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval();
  }
  function stop(key) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    countdown.value = 0;
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
  const { success, error, warning } = useNotify();
  const { countdown, start, restore } = useAuthTimer();
  async function sendCode(email) {
    if (countdown.value > 0) return;
    if (!email) {
      warning("请输入邮箱");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      warning("邮箱格式不正确");
      return false;
    }
    loading.value = true;
    try {
      const res = await authApi.getEmailCode(email);
      if (res.success) {
        success("验证码已发送");
        start(cooldown, timerKey);
        return true;
      } else {
        error(res.msg || "发送失败");
        return false;
      }
    } catch (err) {
      error(err.message || "网络错误");
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
//# sourceMappingURL=useSendCode-Cwwhl1Ua.js.map
