/**
 * 根据 UID 获取单个用户
 * GET /api/admin/users/:uid
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // 获取 UID 参数
    const uid = getRouterParam(event, 'uid')
    if (!uid) {
      return errorResponse('缺少 UID 参数', 400)
    }

    // 查询用户
    const supabase = getSupabaseServiceClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('uid', uid)
      .single()

    if (error) {
      return errorResponse(`用户不存在 (${error.code}: ${error.message})`, 404)
    }

    return successResponse({ user: data })
  } catch (error: any) {
    return errorResponse(error.message || '获取用户信息失败')
  }
})
