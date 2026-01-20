/**
 * 充值管理 API
 */
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface RechargeTier {
    id: string
    amount: number
    bonus: number
    sort_order: number
    status: 'on' | 'off'
    created_at: string
}

export const adminRechargeApi = {
    async getTiers(): Promise<{ success: boolean; data: RechargeTier[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('recharge_tiers')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, data: [], error: error.message }
        }
        return { success: true, data: data || [] }
    },

    async createTier(tierData: {
        amount: number
        bonus: number
        sort_order: number
        status: 'on' | 'off'
    }): Promise<{ success: boolean; data?: RechargeTier; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('recharge_tiers')
            .insert(tierData)
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true, data }
    },

    async updateTier(id: string, tierData: Partial<{
        amount: number
        bonus: number
        sort_order: number
        status: 'on' | 'off'
    }>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('recharge_tiers')
            .update(tierData)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },

    async deleteTier(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('recharge_tiers')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },
}
