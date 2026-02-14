/**
 * 验证码倒计时 Composable
 * 统一管理倒计时逻辑和持久化
 */
import { ref, onMounted, onUnmounted } from 'vue'

export function useAuthTimer() {
    const countdown = ref(0)
    let timerInterval: any = null

    /**
     * 恢复倒计时
     * @param key localStorage key
     */
    function restore(key: string) {
        if (typeof window === 'undefined') return
        const endTimeStr = localStorage.getItem(key)
        if (endTimeStr) {
            const endTime = parseInt(endTimeStr, 10)
            const now = Date.now()
            if (endTime > now) {
                const remaining = Math.ceil((endTime - now) / 1000)
                start(remaining, key, false)
            } else {
                localStorage.removeItem(key)
                countdown.value = 0
            }
        }
    }

    /**
     * 开始倒计时
     * @param seconds 倒计时秒数
     * @param key localStorage key
     * @param isNew 是否是新的倒计时 (需要设置 localStorage)
     */
    function start(seconds: number, key: string, isNew = true) {
        countdown.value = seconds

        if (isNew && typeof window !== 'undefined') {
            const endTime = Date.now() + seconds * 1000
            localStorage.setItem(key, endTime.toString())
        }

        if (timerInterval) clearInterval(timerInterval)

        timerInterval = setInterval(() => {
            countdown.value--
            if (countdown.value <= 0) {
                stop(key)
            }
        }, 1000)
    }

    /**
     * 停止倒计时
     */
    function stop(key: string) {
        if (timerInterval) {
            clearInterval(timerInterval)
            timerInterval = null
        }
        countdown.value = 0
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key)
        }
    }

    onUnmounted(() => {
        if (timerInterval) clearInterval(timerInterval)
    })

    return {
        countdown,
        start,
        stop,
        restore
    }
}
