/**
 * 消息管理 API
 */
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface AdminMessage {
    id: string
    user_uid: string
    title: string
    content: string
    is_read: boolean
    created_at: string
}

export const adminMessageApi = {
    async getMessages(params?: {
        user_uid?: string
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; messages: AdminMessage[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        let query = client
            .from('messages')
            .select('*', { count: 'exact' })

        if (params?.user_uid) {
            query = query.eq('user_uid', params.user_uid)
        }

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) {
            return { success: false, messages: [], total: 0, error: error.message }
        }
        return { success: true, messages: data || [], total: count || 0 }
    },

    async sendMessage(
        userUid: string,
        title: string,
        content: string,
        type: 'system' | 'order' | 'activity' | 'security' = 'system',
        link?: string
    ): Promise<{ success: boolean; message_id?: string; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data: profile, error: profileError } = await client
            .from('profiles')
            .select('id, uid')
            .eq('uid', userUid)
            .single()

        if (profileError || !profile) {
            return { success: false, error: '用户不存在，禁止发送消息' }
        }

        const { data, error } = await client
            .from('messages')
            .insert({
                user_id: profile.id,
                user_uid: userUid,
                title,
                content,
                type,
                link: link || null,
            })
            .select('id')
            .single()

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true, message_id: data.id }
    },

    /**
     * 获取客户消息通知配置
     */
    async getNotificationSettings(): Promise<{ success: boolean; settings?: any; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('system_settings')
            .select('value')
            .eq('key', 'customer_notification_config')
            .single()

        if (error) {
            // 如果未找到配置，返回默认空对象或错误
            if (error.code === 'PGRST116') {
                return { success: true, settings: {} }
            }
            return { success: false, error: error.message }
        }

        // Parse JSON if needed (Supabase returns JSONB as object automatically)
        let settings = data.value
        if (typeof settings === 'string') {
            try { settings = JSON.parse(settings) } catch (e) { }
        }

        return { success: true, settings }
    },

    /**
     * 更新客户消息通知配置
     */
    async updateNotificationSettings(settings: any): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // Ensure it's stored as JSON
        const value = settings

        const { error } = await client
            .from('system_settings')
            .upsert({
                key: 'customer_notification_config',
                value: value,
                description: 'Customer notification trigger configuration'
            })

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    }
}
