/**
 * 获取订单列表
 * GET /api/admin/orders?page=1&pageSize=20&order_type=virtual&status=active&keyword=xxx
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export interface AdminOrder {
  id: string
  order_no: string | null
  user_uid: string
  user_id: string
  product_id: string
  sku_id: string | null
  order_type: 'virtual' | 'shared_account' | 'one_time_cdk'
  related_order_id: string | null
  total_amount: number | null
  payment_method: 'wallet' | 'alipay' | 'wechat' | null
  start_time: string
  end_time: string
  status: 'pending_delivery' | 'active' | 'refunding' | 'refunded' | 'expired'
  created_at: string
  profile?: {
    id: string
    uid: string
    avatar: string
    nickname: string
  }
  _profile?: any
  coupon_snapshot?: any
  product_snapshot?: any
  sku_snapshot?: any
}

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 获取查询参数
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 20
    const order_type = query.order_type as string | undefined
    const status = query.status as string | undefined
    const exclude_status = query.exclude_status
      ? (Array.isArray(query.exclude_status) ? query.exclude_status : [query.exclude_status]) as string[]
      : undefined
    const keyword = query.keyword as string | undefined

    // 构建查询
    const supabase = getSupabaseServiceClient()
    let queryBuilder = supabase
      .from('orders')
      .select(`
        *,
        profiles(id, uid, avatar, nickname)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)

    // 应用筛选条件
    if (order_type) {
      queryBuilder = queryBuilder.eq('order_type', order_type)
    }

    if (status) {
      queryBuilder = queryBuilder.eq('status', status)
    }

    // 排除特定状态
    if (exclude_status && exclude_status.length > 0) {
      exclude_status.forEach(s => {
        queryBuilder = queryBuilder.neq('status', s)
      })
    }

    // 关键词搜索
    if (keyword) {
      queryBuilder = queryBuilder.ilike('order_no', `%${keyword}%`)
    }

    const { data, error, count } = await queryBuilder

    if (error) {
      return errorResponse(error.message)
    }

    // 处理数据格式
    const orders = (data || []).map(order => {
      const rawProfile = order.profiles || order.profile
      const profile = Array.isArray(rawProfile) ? rawProfile[0] : (rawProfile || null)

      return {
        ...order,
        _profile: profile
      }
    })

    return successResponse({
      orders,
      total: count || 0
    })
  } catch (error: any) {
    return errorResponse(error.message || '获取订单列表失败')
  }
})
