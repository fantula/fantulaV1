/**
 * 统一的 API 响应格式
 */

export interface ApiResponse<T = any> {
  code: number
  msg: string
  data?: T
  success: boolean
}

/**
 * 成功响应
 */
export function successResponse<T>(data?: T, msg: string = 'success'): ApiResponse<T> {
  return {
    code: 0,
    msg,
    data,
    success: true
  }
}

/**
 * 错误响应
 */
export function errorResponse(msg: string, code: number = 500): ApiResponse {
  return {
    code,
    msg,
    success: false
  }
}

/**
 * 从 Supabase 错误创建响应
 */
export function fromSupabaseError(error: any): ApiResponse {
  return {
    code: 500,
    msg: error?.message || '数据库操作失败',
    success: false
  }
}

/**
 * 处理 API 错误并返回标准格式
 */
export function handleApiError(error: any): ApiResponse {
  if (error?.statusCode) {
    // H3 Error
    return errorResponse(error.statusMessage || error.message, error.statusCode)
  }

  if (error?.message) {
    // 普通错误
    return errorResponse(error.message, 500)
  }

  return errorResponse('未知错误', 500)
}
