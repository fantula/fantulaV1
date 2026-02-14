
import { z } from 'zod'
import { H3Event } from 'h3'

// --- Schemas ---

export const passwordLoginSchema = z.object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(6, '密码至少需要6位'),
    type: z.literal('password')
})

export const verifyOtpSchema = z.object({
    email: z.string().email('邮箱格式不正确'),
    code: z.string().min(6, '验证码无效'),
    type: z.literal('otp')
})

export const loginBaseSchema = z.object({
    type: z.enum(['password', 'otp'])
}).passthrough()

export const createUserSchema = z.object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(6, '密码至少需要6位'),
    name: z.string().min(1, '姓名不能为空'),
    // Relax UUID validation to string because some legacy IDs (like Super Admin) are not RFC-compliant
    department_id: z.string().min(1, '部门ID无效'),
    status: z.enum(['enabled', 'disabled']).optional().default('enabled')
})

export const sendOtpSchema = z.object({
    email: z.string().email('邮箱格式不正确')
})

export const deleteUserSchema = z.object({
    id: z.string() // Relaxed from uuid()
})

// --- Validator ---

export async function validateBody<T>(event: H3Event, schema: z.ZodSchema<T>): Promise<T> {
    const body = await readBody(event)
    // Logs removed
    const result = schema.safeParse(body)

    if (!result.success) {
        const errorMap = result.error.flatten().fieldErrors as Record<string, string[] | undefined>
        const firstKey = Object.keys(errorMap)[0]
        const firstError = firstKey && errorMap[firstKey] ? errorMap[firstKey]![0] : '参数校验失败'

        throw createError({
            statusCode: 400,
            statusMessage: firstError,
            data: errorMap
        })
    }

    return result.data
}
