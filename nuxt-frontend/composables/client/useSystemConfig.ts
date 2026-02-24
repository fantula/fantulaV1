
export interface ContactConfig {
    wechat_id: string
    wechat_qr: string
    telegram_id: string
    telegram_qr: string
    service_time: string
}

export const useSystemConfig = () => {
    const contactConfig = useState<ContactConfig | null>('contact-config', () => null)

    // Fetch contact config (cached locally per session/request)
    const fetchContactConfig = async () => {
        // Return immediately if data exists
        if (contactConfig.value) return contactConfig.value

        try {
            const { data, success } = await $fetch('/api/client/config/contact')
            if (success) {
                contactConfig.value = data
            }
        } catch (e) {
            if (import.meta.dev) console.error('Failed to fetch contact config', e)
        }
        return contactConfig.value
    }

    return {
        contactConfig,
        fetchContactConfig
    }
}
