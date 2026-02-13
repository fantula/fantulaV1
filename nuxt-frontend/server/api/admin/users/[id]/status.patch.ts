/**
 * 切换用户状态
 * PATCH /api/admin/users/:id/status
 * Body: { status: 'active' | 'disabled' }
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 获取用户 ID
    const id = getRouterParam(event, 'id')
    if (!id) {
      return errorResponse('缺少用户 ID', 400)
    }

    // 获取请求体
    const body = await readBody(event)
    const { status } = body

    if (!status || !['active', 'disabled'].includes(status)) {
      return errorResponse('无效的状态值', 400)
    }

    // 更新状态
    const supabase = getSupabaseServiceClient()
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', id)

    if (error) {
      return errorResponse(error.message)
    }

    return successResponse(null, '状态更新成功')
  } catch (error: any) {
    return errorResponse(error.message || '更新用户状态失败')
  }
})
