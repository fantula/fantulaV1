import { useRoute } from '#app'
import { useToast } from '@/composables/mobile/useToast'

// PC Element Plus Type (we can just use strings to avoid depending on Element types directly if needed, 
// but using the string literals 'success' | 'warning' | 'info' | 'error' is safe).
type NotifyType = 'success' | 'warning' | 'info' | 'error'

export const useNotify = () => {
    const route = useRoute()
    const { showToast } = useToast()

    const notify = (message: string, type: NotifyType = 'info') => {
        // Check if Mobile (based on route or device)
        const isMobile = route.path.includes('/mobile') || (import.meta.client && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

        if (isMobile) {
            // Use Mobile Custom Toast (non-blocking, centered, dark)
            showToast(message, type)
        } else {
            // Use PC Element Plus Message (top-center, white)
            // Import dynamically to ensure it works in headers/setup
            // Note: Auto-import usually handles ElMessage, but explicit is sometimes safer in composables
            // depending on Nuxt config. We'll rely on auto-import for now as it's standard in this project.
            // @ts-ignore
            ElMessage({
                message,
                type,
                duration: 3000,
                showClose: true,
                grouping: true
            })
        }
    }

    return {
        notify,
        success: (msg: string) => notify(msg, 'success'),
        error: (msg: string) => notify(msg, 'error'),
        warning: (msg: string) => notify(msg, 'warning'),
        info: (msg: string) => notify(msg, 'info')
    }
}
