
import { ref, onMounted } from 'vue'
import { adminSystemApi, type AdminContactConfig } from '@/api/admin'
import { ElMessage } from 'element-plus'

export function useAdminContactConfig() {
    const loading = ref(false)
    const saving = ref(false)
    const form = ref<AdminContactConfig>({
        wechat_id: '',
        wechat_qr: '',
        telegram_id: '',
        telegram_qr: '',
        service_time: ''
    })

    const loadConfig = async () => {
        loading.value = true
        try {
            const res = await adminSystemApi.getContactConfig()
            if (res.success && res.data) {
                form.value = { ...form.value, ...res.data }
            } else {
                // FALLBACK: Use static assets if DB is empty or fails (e.g. Schema Cache issue)
                // This ensures the UI looks correct immediately for the user.
                if (import.meta.dev) console.warn('Using static defaults due to DB missing/error', res.error)
                form.value = {
                    wechat_id: 'Spotify-cn',
                    wechat_qr: '/images/contact/wechat_qr.jpg',
                    telegram_id: '@FANTULA_SUPPORT',
                    telegram_qr: '/images/contact/telegram_qr.jpg',
                    service_time: '10:00 - 23:00'
                }
            }
        } catch (e: any) {
            ElMessage.error(e.message || '加载配置失败')
        } finally {
            loading.value = false
        }
    }

    const saveConfig = async () => {
        saving.value = true
        try {
            const res = await adminSystemApi.updateContactConfig(form.value)
            if (res.success) {
                ElMessage.success('配置已保存')
            } else {
                ElMessage.error(res.error || '保存失败')
            }
        } catch (e: any) {
            ElMessage.error(e.message || '保存异常')
        } finally {
            saving.value = false
        }
    }

    onMounted(() => {
        loadConfig()
    })

    return {
        form,
        loading,
        saving,
        loadConfig,
        saveConfig
    }
}
