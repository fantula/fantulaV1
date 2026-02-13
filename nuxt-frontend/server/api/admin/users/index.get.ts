/**
 * 获取用户列表
 * GET /api/admin/users?status=active&limit=10&offset=0
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export interface AdminUser {
  id: string
  uid: string
  email: string
  status: 'active' | 'disabled'
  created_at: string
}

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 获取查询参数
    const query = getQuery(event)
    const status = query.status as 'active' | 'disabled' | undefined
    const limit = query.limit ? Number(query.limit) : undefined
    const offset = query.offset ? Number(query.offset) : 0

    // 查询数据
    const supabase = getSupabaseServiceClient()
    let queryBuilder = supabase
      .from('profiles')
      .select('*', { count: 'exact' })

    if (status) {
      queryBuilder = queryBuilder.eq('status', status)
    }

    queryBuilder = queryBuilder.order('created_at', { ascending: false })

    if (limit) {
      queryBuilder = queryBuilder.range(offset, offset + limit - 1)
    }

    const { data, error, count } = await queryBuilder

    if (error) {
      return errorResponse(error.message)
    }

    return successResponse({
      users: data || [],
      total: count || 0
    })
  } catch (error: any) {
    return errorResponse(error.message || '获取用户列表失败')
  }
})
