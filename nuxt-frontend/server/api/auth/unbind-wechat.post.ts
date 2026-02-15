/**
 * POST /api/auth/unbind-wechat
 * 解绑当前用户的微信
 * 需要登录态 (Session)
 */
import { getSupabaseServiceClient, getCurrentUser } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
    try {
        const user = await getCurrentUser(event)
        if (!user) {
            throw createError({
                statusCode: 401,
                message: '请先登录',
            })
        }

        const supabase = getSupabaseServiceClient()

        // 检查当前绑定状态
        const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('wechat_openid')
            .eq('id', user.id)
            .single()

        if (fetchError || !profile) {
            throw createError({
                statusCode: 404,
                message: '用户资料不存在',
            })
        }

        if (!profile.wechat_openid) {
            return {
                success: true,
                message: '当前未绑定微信',
            }
        }

        // 执行解绑
        // 注意：这里我们只清空 openid 和 unionid，不删除用户
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                wechat_openid: null,
                wechat_unionid: null,
                updated_at: new Date().toISOString(), // Now we can use this!
            })
            .eq('id', user.id)

        if (updateError) {
            console.error('[UnbindWechat] Failed to unbind:', updateError)
            throw createError({
                statusCode: 500,
                message: '解绑失败，请重试',
            })
        }

        console.log('[UnbindWechat] Success for user:', user.id)

        return {
            success: true,
            message: '微信解绑成功',
        }
    } catch (err: any) {
        console.error('[UnbindWechat] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '解绑失败',
        })
    }
})
