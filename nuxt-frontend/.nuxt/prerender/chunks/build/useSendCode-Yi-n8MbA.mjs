import { ref } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { a as authApi } from './user-CctDsbAN.mjs';
import { s as setInterval } from './interval-BnEBQU8I.mjs';
import { u as useNotify } from './useNotify-QNEBBzdZ.mjs';

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
      warning("\u8BF7\u8F93\u5165\u90AE\u7BB1");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      warning("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E");
      return false;
    }
    loading.value = true;
    try {
      const res = await authApi.getEmailCode(email);
      if (res.success) {
        success("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001");
        start(cooldown, timerKey);
        return true;
      } else {
        error(res.msg || "\u53D1\u9001\u5931\u8D25");
        return false;
      }
    } catch (err) {
      error(err.message || "\u7F51\u7EDC\u9519\u8BEF");
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

export { useSendCode as u };
//# sourceMappingURL=useSendCode-Yi-n8MbA.mjs.map
