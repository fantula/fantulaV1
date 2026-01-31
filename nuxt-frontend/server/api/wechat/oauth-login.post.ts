/**
 * POST /api/wechat/oauth-login
 * 移动端微信 OAuth 登录 - 用授权 code 换取 OpenID 并检查绑定状态
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import { generateBindToken } from '~/server/utils/wechat-login'
import { getWechatPayConfig } from '~/server/utils/wechat-pay'

export default defineEventHandler(async (event) => {
    try {
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

        // 用 code 换取 access_token 和 openid
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`

        const response = await fetch(url)
        const result = await response.json() as {
            access_token?: string
            openid?: string
            errcode?: number
            errmsg?: string
        }

        if (result.errcode || !result.openid) {
            console.error('[OAuthLogin] WeChat API error:', result)
            throw createError({
                statusCode: 400,
                message: result.errmsg || '微信授权失败',
            })
        }

        const openid = result.openid
        console.log('[OAuthLogin] Got openid:', openid)

        // 查询是否已有绑定的用户
        const supabase = getSupabaseServiceClient()
        const { data: profile } = await supabase
            .from('profiles')
            .select('id, email, nickname')
            .eq('wechat_openid', openid)
            .single()

        if (profile) {
            // 已绑定用户，返回用户信息（前端需要后续处理登录）
            return {
                success: true,
                data: {
                    status: 'logged_in',
                    message: '登录成功',
                    userId: profile.id,
                    email: profile.email,
                    nickname: profile.nickname,
                    openid,
                },
            }
        } else {
            // 未绑定用户，需要绑定邮箱
            const bindToken = generateBindToken(openid)
            return {
                success: true,
                data: {
                    status: 'need_bind',
                    message: '请绑定邮箱以完成登录',
                    bindToken,
                },
            }
        }
    } catch (err: any) {
        console.error('[OAuthLogin] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '登录失败',
        })
    }
})
