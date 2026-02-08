/**
 * 客户端认证守卫
 * 保护个人中心等需要登录的页面
 */
import { getSupabaseClient } from '~/utils/supabase'

export default defineNuxtRouteMiddleware(async (to) => {
    // 登录页/注册页无需验证
    if (to.path.includes('/login') || to.path.includes('/register')) return

    // 【重要】微信授权回调带有 code 参数时放行，让页面处理 OpenID 获取
    // 否则 middleware 会在 session 恢复前就跳转到登录页
    if (to.query.code && to.query.state) {
        console.log('[client-auth] WeChat OAuth callback detected, skipping auth check')
        return
    }

    // 【重要】Supabase Magic Link 回调带有 hash 参数（access_token 等）
    // 必须放行，让 Supabase 客户端处理 Session 恢复
    if (to.hash && to.hash.includes('access_token')) {
        console.log('[client-auth] Magic Link callback detected, skipping auth check')
        return
    }

    const userStore = useUserStore()

    // 尝试初始化（如果是刷新页面）
    if (!userStore.isLoggedIn) {
        await userStore.init()
    }

    // 二次检查：如果 userStore 仍未登录，检查 Supabase session
    // 这解决了微信授权跳转后 cookie 丢失但 Supabase session 仍有效的问题
    if (!userStore.isLoggedIn) {
        try {
            const supabase = getSupabaseClient()
            const { data: { session } } = await supabase.auth.getSession()

            if (session?.user) {
                // Supabase 有有效 session，恢复登录状态
                console.log('[client-auth] Restoring session from Supabase')

                // 设置 token cookie
                const token = useCookie('token')
                token.value = session.access_token

                // 重新初始化 userStore
                await userStore.init()
            }
        } catch (e) {
            console.warn('[client-auth] Failed to check Supabase session:', e)
        }
    }

    // 最终检查：未登录跳转到登录页
    if (!userStore.isLoggedIn) {
        // Mobile 跳转登录页
        if (to.path.startsWith('/mobile/')) {
            return navigateTo('/mobile?login=1')
        }
        // PC端跳首页
        return navigateTo('/?login=1')
    }
})

