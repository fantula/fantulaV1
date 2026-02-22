import { getSupabaseClient } from '@/utils/supabase'

export interface DashboardStats {
    today_orders: number
    yesterday_orders: number
    today_sales: number
    yesterday_sales: number

    total_products: number
    active_products: number

    today_new_users: number
    month_new_users: number

    cdk_warning_count: number

    order_trend: { date: string; count: number }[]
    sales_trend: { date: string; amount: number }[]
}

export const adminDashboardApi = {
    /**
     * 获取仪表盘统计数据
     */
    async getStats(): Promise<{ success: boolean; data?: DashboardStats; error?: string }> {
        const client = getSupabaseClient()

        // Call the RPC function
        const { data, error } = await client.rpc('admin_get_dashboard_stats')

        if (error) {
            if (import.meta.dev) console.error('Failed to fetch dashboard stats:', error)
            return { success: false, error: error.message }
        }

        return { success: true, data: data as DashboardStats }
    }
}
