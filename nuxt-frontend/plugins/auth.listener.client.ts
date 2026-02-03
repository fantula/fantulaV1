import { useUserStore } from '@/stores/client/user'
import { getSupabaseClient } from '@/utils/supabase'

export default defineNuxtPlugin((nuxtApp) => {
    const client = getSupabaseClient()
    const userStore = useUserStore()

    // 监听 Supabase 认证状态变化
    client.auth.onAuthStateChange(async (event, session) => {
        // console.log('[Auth Listener] Event:', event)

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session) {
                // 更新 Token Cookie
                const tokenCookie = useCookie('token')
                tokenCookie.value = session.access_token

                // 刷新用户信息到 Store
                if (!userStore.isLoggedIn || !userStore.userInfo) {
                    await userStore.fetchUserInfo()
                }
            }
        } else if (event === 'SIGNED_OUT') {
            const tokenCookie = useCookie('token')
            tokenCookie.value = null
            userStore.logout()
        }
    })

    // 初始化检查
    // 页面加载时，如果 Supabase 已经有 Session 但 Store 空，手动触发同步
    client.auth.getSession().then(({ data: { session } }) => {
        if (session && !userStore.isLoggedIn) {
            // console.log('[Auth Listener] Recovering session...')
            const tokenCookie = useCookie('token')
            tokenCookie.value = session.access_token
            userStore.fetchUserInfo()
        }
    })
})
