/**
 * 获取仪表盘统计数据
 * GET /api/admin/dashboard/stats
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

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

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 使用 Service Client 调用 RPC
    const supabase = getSupabaseServiceClient()
    const { data, error } = await supabase.rpc('admin_get_dashboard_stats')

    if (error) {
      return errorResponse(error.message)
    }

    return successResponse<DashboardStats>(data as DashboardStats)
  } catch (error: any) {
    return errorResponse(error.message || '获取仪表盘数据失败')
  }
})
