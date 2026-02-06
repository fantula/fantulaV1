
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
    message: string
    type?: ToastType
    duration?: number
}

const isVisible = ref(false)
const message = ref('')
const type = ref<ToastType>('info')
let timer: ReturnType<typeof setTimeout> | null = null

export const useToast = () => {
    const showToast = (msg: string, toastType: ToastType = 'info', duration = 2000) => {
        // Clear existing
        if (timer) {
            clearTimeout(timer)
            isVisible.value = false // force reset animation if needed, or just update content
        }

        message.value = msg
        type.value = toastType
        isVisible.value = true

        timer = setTimeout(() => {
            isVisible.value = false
            timer = null
        }, duration)
    }

    const hideToast = () => {
        isVisible.value = false
        if (timer) clearTimeout(timer)
    }

    return {
        isVisible,
        message,
        type,
        showToast,
        hideToast
    }
}
