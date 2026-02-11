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


        const access_token = result.access_token
        const openid = result.openid
        console.log('[OAuthLogin] Got openid:', openid)

        // 使用 access_token 获取用户头像昵称 (snsapi_userinfo)
        let userInfo: any = {}
        try {
            const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
            const userRes = await fetch(userInfoUrl)
            userInfo = await userRes.json()
            console.log('[OAuthLogin] Got config:', { nickname: userInfo.nickname })
        } catch (e) {
            console.warn('[OAuthLogin] Failed to fetch user info:', e)
        }

        // 查询是否已有绑定的用户
        // 关键点：使用 Service Role Client (Admin) 以便生成 Link
        const supabaseAdmin = getSupabaseServiceClient()

        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('id, email, nickname, avatar')
            .eq('wechat_openid', openid)
            .single()

        if (profile) {
            // 已绑定用户，尝试更新头像昵称 (如果为空)
            const updates: any = {}
            if (userInfo.nickname && !profile.nickname) updates.nickname = userInfo.nickname
            if (userInfo.headimgurl && !profile.avatar) updates.avatar = userInfo.headimgurl

            if (Object.keys(updates).length > 0) {
                await supabaseAdmin.from('profiles').update(updates).eq('id', profile.id)
            }

            // 生成 Magic Link 以便通过 Token 登录
            // 注意：Magic Link 验证后必须跳转到 wechat-callback 页面，
            // 因为只有该页面有从 URL hash 中提取 access_token 并建立 session 的逻辑。
            // 用户最终的目标页面通过 return_to 参数传递。
            let actionLink = null
            if (profile.email) {
                const config = useRuntimeConfig()
                const baseUrl = config.public.siteUrl || 'https://www.fantula.com'

                // 构建 wechat-callback URL 作为 Magic Link 的 redirectTo
                // 用户实际想去的页面通过 return_to query 参数传递
                const finalDestination = body.redirectTo || '/mobile'
                const callbackUrl = `${baseUrl}/mobile/wechat-callback?return_to=${encodeURIComponent(finalDestination)}`

                console.log('[OAuthLogin] Magic Link RedirectTo:', callbackUrl)

                const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
                    type: 'magiclink',
                    email: profile.email,
                    options: {
                        redirectTo: callbackUrl
                    }
                })

                if (!linkError && linkData?.properties?.action_link) {
                    actionLink = linkData.properties.action_link
                } else {
                    console.error('[OAuthLogin] Failed to generate magic link:', linkError)
                }
            }

            // 返回用户信息
            return {
                success: true,
                data: {
                    status: 'logged_in',
                    message: '登录成功',
                    userId: profile.id,
                    email: profile.email,
                    nickname: updates.nickname || profile.nickname,
                    avatar: updates.avatar || profile.avatar,
                    openid,
                    actionLink // 返回 Magic Link
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
                    nickname: userInfo.nickname,
                    avatar: userInfo.headimgurl
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
