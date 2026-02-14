
import { H3Error } from 'h3'

export function mapSupabaseError(error: any) {
    console.error('[Supabase Error]', error)

    const defaultMessage = 'An unexpected error occurred'
    let statusCode = 500
    let statusMessage = defaultMessage

    // 1. Handle H3 Errors (already formatted)
    if (error.statusCode) {
        return error
    }

    // 2. Handle Supabase/Postgres Errors
    if (error.code) {
        switch (error.code) {
            case '23505': // unique_violation
                statusCode = 409
                if (error.details?.includes('email')) {
                    statusMessage = '该邮箱已被注册'
                } else if (error.details?.includes('phone')) {
                    statusMessage = '该手机号已被注册'
                } else {
                    statusMessage = '数据已存在 (重复记录)'
                }
                break
            case '23503': // foreign_key_violation
                statusCode = 400
                statusMessage = '关联数据不存在 (外键约束)'
                break
            case '42501': // insufficient_privilege
                statusCode = 403
                statusMessage = '权限不足 (RLS拒绝)'
                break
            case 'PGRST116': // JSON result none (single() failed)
                statusCode = 404
                statusMessage = '记录未找到'
                break
        }
    }

    // 3. Handle Auth API Errors
    if (error.message) {
        if (error.message.includes('Database error checking email')) {
            statusCode = 409
            statusMessage = '邮箱已被占用 (包括未激活账号或历史数据)'
        } else if (error.message.includes('Invalid login credentials')) {
            statusCode = 401
            statusMessage = '账号或密码错误'
        } else if (error.message.includes('Password should be at least')) {
            statusCode = 400
            statusMessage = '密码长度不足 (至少6位)'
        } else {
            statusMessage = error.message
        }
    }

    return createError({ statusCode, statusMessage })
}
