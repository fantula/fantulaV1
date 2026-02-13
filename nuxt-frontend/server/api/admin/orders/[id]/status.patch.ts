/**
 * 更新订单状态
 * PATCH /api/admin/orders/:id/status
 * Body: { status: string }
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 获取订单 ID
    const id = getRouterParam(event, 'id')
    if (!id) {
      return errorResponse('缺少订单 ID', 400)
    }

    // 获取请求体
    const body = await readBody(event)
    const { status } = body

    if (!status) {
      return errorResponse('缺少 status 参数', 400)
    }

    // 更新订单状态
    const supabase = getSupabaseServiceClient()
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    if (error) {
      return errorResponse(error.message)
    }

    return successResponse(null, '订单状态更新成功')
  } catch (error: any) {
    return errorResponse(error.message || '更新订单状态失败')
  }
})
