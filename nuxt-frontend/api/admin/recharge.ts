/**
 * 充值管理 API
 */
import { getSupabaseClient } from '@/utils/supabase'

export interface RechargeTier {
    id: string
    amount: number
    bonus: number
    sort_order: number
    status: 'on' | 'off'
    created_at: string
}

export interface RechargeOrder {
    id: string
    user_id: string
    out_trade_no: string
    amount: number
    bonus: number
    status: 'pending' | 'paid' | 'failed' | 'refunded'
    pay_type: string
    description: string
    created_at: string
    updated_at?: string
    profiles?: { email: string }
}

export const adminRechargeApi = {
    async getTiers(): Promise<{ success: boolean; data: RechargeTier[]; error?: string }> {
        const client = getSupabaseClient()
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
        const client = getSupabaseClient()
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
        const client = getSupabaseClient()
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
        const client = getSupabaseClient()
        const { error } = await client
            .from('recharge_tiers')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },

    async getOrders(params: {
        page?: number
        pageSize?: number
        status?: string
        keyword?: string
    } = {}): Promise<{ success: boolean; data: RechargeOrder[]; total: number; error?: string }> {
        const client = getSupabaseClient()
        const { page = 1, pageSize = 20, status, keyword } = params
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        let query = client
            .from('recharge_orders')
            .select('*, profiles(email)', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to)

        if (status && status !== 'all') {
            query = query.eq('status', status)
        }
        if (keyword) {
            query = query.or(`out_trade_no.ilike.%${keyword}%`)
        }

        const { data, error, count } = await query
        if (error) {
            return { success: false, data: [], total: 0, error: error.message }
        }
        return { success: true, data: data || [], total: count || 0 }
    },
}
