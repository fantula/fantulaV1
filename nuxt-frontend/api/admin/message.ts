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
}
