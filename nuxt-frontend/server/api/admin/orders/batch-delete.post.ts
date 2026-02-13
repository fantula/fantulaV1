/**
 * 批量删除订单
 * POST /api/admin/orders/batch-delete
 * Body: { ids: string[] }
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 获取请求体
    const body = await readBody(event)
    const { ids } = body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return errorResponse('缺少或无效的 ids 参数', 400)
    }

    // 批量删除订单
    const supabase = getSupabaseServiceClient()
    const { error } = await supabase
      .from('orders')
      .delete()
      .in('id', ids)

    if (error) {
      return errorResponse(error.message)
    }

    return successResponse(null, `成功删除 ${ids.length} 个订单`)
  } catch (error: any) {
    return errorResponse(error.message || '删除订单失败')
  }
})
