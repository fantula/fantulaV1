/**
 * 发送验证码 Composable
 * 统一管理发送逻辑、校验和倒计时
 */
import { ref, onMounted } from 'vue'
import { authApi } from '@/api/client/auth'
import { useAuthTimer } from '@/composables/client/useAuthTimer'
import { ElMessage } from 'element-plus'

interface UseSendCodeOptions {
    timerKey: string
    cooldown?: number
}

export function useSendCode(options: UseSendCodeOptions) {
    const { timerKey, cooldown = 180 } = options
    const loading = ref(false)

    // 使用统一的 Timer Composable
    const { countdown, start, restore } = useAuthTimer()

    // 初始化时尝试恢复倒计时 (Client-side only)
    onMounted(() => {
        restore(timerKey)
    })

    /**
     * 发送验证码核心逻辑
     * @param email 邮箱地址
     * @param type 业务类型 (login/register/forgot/bind) - 目前接口统一，参数仅作扩展预留
     */
    async function sendCode(email: string) {
        if (countdown.value > 0) return

        if (!email) {
            ElMessage.warning('请输入邮箱')
            return false
        }

        // 简单邮箱格式校验
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            ElMessage.warning('邮箱格式不正确')
            return false
        }

        loading.value = true
        try {
            // 统一调用发送接口 (目前 authApi.getEmailCode 是通用的)
            // 如果后续有区分场景的 API，可根据 type 参数判断
            const res = await authApi.getEmailCode(email)

            if (res.success) {
                ElMessage.success('验证码已发送')
                start(cooldown, timerKey)
                return true
            } else {
                ElMessage.error(res.msg || '发送失败')
                return false
            }
        } catch (error: any) {
            ElMessage.error(error.message || '网络错误')
            return false
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        countdown,
        sendCode,
        checkTimer: () => restore(timerKey)
    }
}
