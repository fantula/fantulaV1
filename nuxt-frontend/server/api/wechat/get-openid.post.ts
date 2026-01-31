/**
 * POST /api/wechat/get-openid
 * 用微信授权 code 换取用户 OpenID
 */
import { getSupabaseServiceClient, getCurrentUser } from '~/server/utils/supabase'
import { getWechatPayConfig } from '~/server/utils/wechat-pay'

interface WechatAccessTokenResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    openid: string
    scope: string
    errcode?: number
    errmsg?: string
}

export default defineEventHandler(async (event) => {
    try {
        // 验证用户身份
        const user = await getCurrentUser(event)
        if (!user) {
            throw createError({
                statusCode: 401,
                message: '未登录',
            })
        }

        // 解析请求参数
        const body = await readBody(event)
        const { code } = body

        if (!code) {
            throw createError({
                statusCode: 400,
                message: '缺少授权 code',
            })
        }

        // 获取配置
        const config = getWechatPayConfig()
        if (!config.appid || !config.appSecret) {
            throw createError({
                statusCode: 500,
                message: '微信配置错误',
            })
        }

        // 调用微信 OAuth API 获取 access_token 和 openid
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`

        const response = await fetch(url)
        const result: WechatAccessTokenResponse = await response.json()

        if (result.errcode) {
            console.error('[GetOpenId] WeChat API error:', result)
            throw createError({
                statusCode: 400,
                message: result.errmsg || '获取 OpenID 失败',
            })
        }

        console.log('[GetOpenId] Got openid:', result.openid)

        // 保存 openid 到用户 profile
        const supabase = getSupabaseServiceClient()
        await supabase
            .from('profiles')
            .update({
                wechat_openid: result.openid,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)

        return {
            success: true,
            data: {
                openid: result.openid,
            },
        }
    } catch (err: any) {
        console.error('[GetOpenId] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '获取 OpenID 失败',
        })
    }
})
