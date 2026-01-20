/**
 * 用户管理 API
 */
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface AdminUser {
    id: string
    uid: string
    email: string
    status: 'active' | 'disabled'
    created_at: string
}

export const adminUserApi = {
    async getUsers(params?: {
        status?: 'active' | 'disabled'
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; users: AdminUser[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        let query = client
            .from('profiles')
            .select('*', { count: 'exact' })

        if (params?.status) {
            query = query.eq('status', params.status)
        }

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) {
            return { success: false, users: [], total: 0, error: error.message }
        }
        return { success: true, users: data || [], total: count || 0 }
    },

    async getUserByUid(uid: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('profiles')
            .select('*')
            .eq('uid', uid)
            .single()

        if (error) {
            return { success: false, error: `用户不存在 (${error.code}: ${error.message})` }
        }
        return { success: true, user: data }
    },

    async toggleStatus(id: string, status: 'active' | 'disabled'): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('profiles')
            .update({ status })
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },
}
