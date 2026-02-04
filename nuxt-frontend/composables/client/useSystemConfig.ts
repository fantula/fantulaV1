
import { useState, useNuxtApp } from '#app'

export interface ContactConfig {
    wechat_id: string
    wechat_qr: string
    telegram_id: string
    telegram_qr: string
    service_time: string
}

export const useSystemConfig = () => {
    const contactConfig = useState<ContactConfig | null>('contact-config', () => null)

    // Fetch contact config
    const fetchContactConfig = async () => {
        if (contactConfig.value) return contactConfig.value // Return cached if exists

        try {
            const { data, success } = await $fetch('/api/client/config/contact')
            if (success) {
                contactConfig.value = data
            }
        } catch (e) {
            console.error('Failed to fetch contact config', e)
        }
        return contactConfig.value
    }

    return {
        contactConfig,
        fetchContactConfig
    }
}
