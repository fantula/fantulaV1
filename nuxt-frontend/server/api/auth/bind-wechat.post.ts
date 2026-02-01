/**
 * POST /api/auth/bind-wechat
 * 绑定微信到邮箱账号（新用户注册或已有用户绑定）
 * 
 * 场景：
 * 1. 微信扫码登录 -> 新用户 -> 需要绑定邮箱
 * 2. 微信授权登录（移动端）-> 新用户 -> 需要绑定邮箱
 * 3. 已登录用户 -> 绑定微信到现有账号
 */
import { getSupabaseServiceClient, getCurrentUser } from '~/server/utils/supabase'
import { verifyBindToken, getWechatUserInfo } from '~/server/utils/wechat-login'

interface BindWechatRequest {
    // 场景1/2: 未登录用户通过微信来，需要绑定邮箱
    bindToken?: string  // 包含 openid 的临时 token
    email?: string
    code?: string       // 邮箱验证码
    password?: string   // 可选：同时设置密码

    // 场景3: 已登录用户绑定微信
    wechatCode?: string // 微信授权 code（移动端用）
    nickname?: string
    avatar?: string
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<BindWechatRequest>(event)
        const supabase = getSupabaseServiceClient()


        // 场景3: 已登录用户绑定微信
        const currentUser = await getCurrentUser(event)
        if (currentUser) {
            if (body.wechatCode) {
                // 移动端: 用户已登录，使用 wechat code 换取 openid 并绑定
                return await bindWechatToExistingUser(supabase, currentUser.id, body.wechatCode)
            }
            if (body.bindToken) {
                // PC端: 用户已登录，使用 bindToken (扫码结果) 获取 openid 并绑定
                return await bindWechatToExistingUserByToken(supabase, currentUser.id, body.bindToken)
            }
        }

        // 场景1/2: 未登录用户，需要 bindToken + email
        if (!body.bindToken) {
            throw createError({
                statusCode: 400,
                message: '缺少绑定凭证',
            })
        }

        // 验证 bindToken
        const tokenResult = verifyBindToken(body.bindToken)
        if (!tokenResult.valid || !tokenResult.openid) {
            throw createError({
                statusCode: 400,
                message: tokenResult.error || '绑定凭证无效或已过期',
            })
        }

        let openid = tokenResult.openid!
        let unionid: string | undefined

        // 尝试获取 UnionID (如果没在 token 里, 可以尝试 fetch)
        try {
            const userInfo = await getWechatUserInfo(openid)
            if (userInfo.unionid) unionid = userInfo.unionid
        } catch (e) {
            console.warn('[BindWechat] Failed to fetch user info:', e)
        }

        if (!body.email) {
            throw createError({
                statusCode: 400,
                message: '请输入邮箱地址',
            })
        }

        if (!body.code) {
            throw createError({
                statusCode: 400,
                message: '请输入验证码',
            })
        }

        // 检查 openid 是否已被其他账号绑定
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id, email')
            .eq('wechat_openid', openid)
            .single()

        if (existingProfile) {
            throw createError({
                statusCode: 400,
                message: '此微信已绑定其他账号',
            })
        }

        // 尝试通过验证码验证邮箱（同时可能创建新用户）
        const { createClient } = await import('@supabase/supabase-js')
        const config = useRuntimeConfig()

        // 使用标准 Supabase 客户端进行 OTP 验证
        const anonClient = createClient(
            config.public.supabaseUrl as string,
            config.public.supabaseKey as string
        )

        const { data: authData, error: verifyError } = await anonClient.auth.verifyOtp({
            email: body.email,
            token: body.code,
            type: 'email',
        })

        if (verifyError) {
            throw createError({
                statusCode: 400,
                message: verifyError.message || '验证码错误或已过期',
            })
        }

        if (!authData.user) {
            throw createError({
                statusCode: 500,
                message: '验证失败，请重试',
            })
        }

        // 如果提供了密码，设置密码
        if (body.password) {
            await anonClient.auth.updateUser({
                password: body.password,
            })
        }

        // 确保 Profile 存在 (处理触发器延迟)
        const { data: userProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', authData.user.id)
            .single()

        if (!userProfile) {
            // 手动创建 Profile (触发器可能延迟)
            console.log('[BindWechat] Profile not found, creating manually for user:', authData.user.id)
            const uid = Math.floor(10000000 + Math.random() * 90000000).toString()

            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: authData.user.id,
                    uid: uid,
                    email: authData.user.email!,
                    nickname: body.nickname || authData.user.email?.split('@')[0] || 'User',
                    avatar: body.avatar || '',
                    status: 'active',
                    balance: 0,
                    wechat_openid: openid,
                    wechat_unionid: unionid,
                })

            if (insertError && !insertError.message.includes('duplicate')) {
                console.error('[BindWechat] Insert profile failed:', insertError)
                throw createError({
                    statusCode: 500,
                    message: '创建账户失败，请重试',
                })
            }
        } else {
            // Profile 存在，正常更新
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    wechat_openid: openid,
                    wechat_unionid: unionid,
                    nickname: body.nickname || undefined,
                    avatar: body.avatar || undefined,
                })
                .eq('id', authData.user.id)

            if (updateError) {
                console.error('[BindWechat] Update profile failed:', updateError)
                throw createError({
                    statusCode: 500,
                    message: '绑定失败，请重试',
                })
            }
        }

        console.log('[BindWechat] Successfully bound:', { userId: authData.user.id, openid })

        return {
            success: true,
            message: '绑定成功',
            data: {
                user: authData.user,
                session: authData.session,
            },
        }
    } catch (err: any) {
        console.error('[BindWechat] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '绑定失败',
        })
    }
})

/**
 * 已登录用户绑定微信 (Mobile OAuth)
 */
async function bindWechatToExistingUser(supabase: any, userId: string, wechatCode: string) {
    const { getWechatPayConfig } = await import('~/server/utils/wechat-pay')
    const config = getWechatPayConfig()

    // 用 code 换取 openid
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${config.appSecret}&code=${wechatCode}&grant_type=authorization_code`

    const response = await fetch(url)
    const result = await response.json() as {
        openid?: string
        unionid?: string
        errcode?: number
        errmsg?: string
    }

    if (result.errcode || !result.openid) {
        throw createError({
            statusCode: 400,
            message: result.errmsg || '微信授权失败',
        })
    }

    return await performBinding(supabase, userId, result.openid!, result.unionid)
}

/**
 * 已登录用户绑定微信 (PC Scan Token)
 */
async function bindWechatToExistingUserByToken(supabase: any, userId: string, bindToken: string) {
    // 验证 bindToken
    const tokenResult = verifyBindToken(bindToken)
    if (!tokenResult.valid || !tokenResult.openid) {
        throw createError({
            statusCode: 400,
            message: tokenResult.error || '绑定凭证无效或已过期',
        })
    }

    // Fetach UnionID
    let unionid: string | undefined
    try {
        const userInfo = await getWechatUserInfo(tokenResult.openid!)
        if (userInfo.unionid) unionid = userInfo.unionid
    } catch (e) {
        console.warn('[BindWechat] Failed to fetch unionid:', e)
    }

    return await performBinding(supabase, userId, tokenResult.openid!, unionid)
}

/**
 * 执行绑定操作 (公共逻辑)
 */
async function performBinding(supabase: any, userId: string, openid: string, unionid?: string) {
    // 检查 openid 是否已被其他账号绑定
    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, wechat_unionid')
        .eq('wechat_openid', openid)
        .single()

    if (existingProfile) {
        if (existingProfile.id === userId) {
            // 如果已绑定但没有 UnionID，且这次请求带了 UnionID，则补全
            if (unionid && !existingProfile.wechat_unionid) {
                await supabase
                    .from('profiles')
                    .update({ wechat_unionid: unionid })
                    .eq('id', userId)

                console.log('[BindWechat] Backfilled missing unionid for user:', userId)
            }

            return {
                success: true,
                message: '您已绑定该微信',
                data: { openid }
            }
        }
        throw createError({
            statusCode: 400,
            message: '此微信已绑定其他账号',
        })
    }

    // 绑定
    const { error } = await supabase
        .from('profiles')
        .update({
            wechat_openid: openid,
            wechat_unionid: unionid,
        })
        .eq('id', userId)

    if (error) {
        throw createError({
            statusCode: 500,
            message: '绑定失败',
        })
    }

    return {
        success: true,
        message: '微信绑定成功',
        data: {
            openid: openid,
        },
    }
}
