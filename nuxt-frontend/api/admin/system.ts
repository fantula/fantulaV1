
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface AdminContactConfig {
    wechat_id: string
    wechat_qr: string
    telegram_id: string
    telegram_qr: string
    service_time: string
}

export const adminSystemApi = {
    /**
     * 获取联系方式配置
     */
    async getContactConfig(): Promise<{ success: boolean; data?: AdminContactConfig; error?: string }> {
        const client = getAdminSupabaseClient()
        
        const { data, error } = await client
            .from('system_configs')
            .select('value')
            .eq('key', 'contact_info')
            .single()

        if (error) {
            // PGRST116: No matching row found
            if (error.code === 'PGRST116') {
                 return {
                    success: true,
                    data: {
                        wechat_id: 'Spotify-cn',
                        wechat_qr: '',
                        telegram_id: '@Fantula_Support',
                        telegram_qr: '',
                        service_time: '10:00 - 23:00'
                    }
                }
            }
            return { success: false, error: error.message }
        }

        return { success: true, data: data.value }
    },

    /**
     * 更新联系方式配置
     */
    async updateContactConfig(config: AdminContactConfig): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('system_configs')
            .upsert({
                key: 'contact_info',
                value: config,
                updated_at: new Date().toISOString()
            })

        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}
