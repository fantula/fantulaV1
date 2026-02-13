/**
 * Admin 认证中间件
 * 用于保护后台管理 API
 */
import type { H3Event } from 'h3'
import { getSupabaseServiceClient } from './supabase'

/**
 * 验证是否为管理员
 * 从请求头获取 Authorization token，验证用户是否有 admin 角色
 */
export async function requireAdminAuth(event: H3Event) {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Missing or invalid authorization header'
    })
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  // 使用 Service Client 验证 token 并获取用户信息
  const supabase = getSupabaseServiceClient()
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid token'
    })
  }

  // 检查用户是否有 admin 角色
  // 从 profiles 表获取用户角色
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: User profile not found'
    })
  }

  // 检查是否为管理员
  if (profile.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Admin access required'
    })
  }

  // 将用户信息附加到 event context，供后续使用
  event.context.adminUser = user
  event.context.adminProfile = profile

  return user
}

/**
 * 获取已认证的管理员用户
 * 需要先调用 requireAdminAuth
 */
export function getAdminUser(event: H3Event) {
  if (!event.context.adminUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Error: Admin auth not verified'
    })
  }
  return event.context.adminUser
}
