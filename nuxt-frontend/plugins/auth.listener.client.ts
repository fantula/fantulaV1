import { useUserStore } from '@/stores/client/user'
import { useAdminStore } from '@/stores/admin/admin'
import { getSupabaseClient } from '@/utils/supabase'
import { adminRoutes } from '@/config/admin-routes'

// 只有访问后台页面时才初始化 adminStore
const isAdminPath = () => typeof window !== 'undefined' && window.location.pathname.startsWith('/manager_portal')

export default defineNuxtPlugin((nuxtApp) => {
    const client = getSupabaseClient()
    const userStore = useUserStore()
    const adminStore = useAdminStore()

    // 监听 Supabase 认证状态变化
    client.auth.onAuthStateChange(async (event, session) => {
        // console.log('[Auth Listener] Event:', event)

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session) {
                // 更新 Token Cookie
                const tokenCookie = useCookie('token')
                tokenCookie.value = session.access_token

                // 刷新用户信息到 Store
                if (!userStore.isLoggedIn || !userStore.user) {
                    await userStore.fetchUserInfo()
                }

                // 刷新后台管理员信息（只在管理后台页面才需要）
                if (isAdminPath() && (!adminStore.isLoggedIn || !adminStore.user)) {
                    await adminStore.init()
                }
            }
        } else if (event === 'SIGNED_OUT') {
            const tokenCookie = useCookie('token')
            tokenCookie.value = null
            userStore.logout()

            // 同步清空后台管理员状态
            if (adminStore.isLoggedIn) {
                adminStore.logout()
                if (import.meta.client && window.location.pathname.startsWith('/manager_portal') && window.location.pathname !== adminRoutes.login()) {
                    window.location.href = adminRoutes.login()
                }
            }
        }
    })

    // 初始化检查
    // 页面加载时，如果 Supabase 已经有 Session 但 Store 空，手动触发同步
    client.auth.getSession().then(({ data: { session } }) => {
        if (session && !userStore.isLoggedIn) {
            const tokenCookie = useCookie('token')
            tokenCookie.value = session.access_token
            userStore.fetchUserInfo()
        }
        // adminStore 只在管理后台页面初始化，避免对普通用户触发 /api/admin/auth/me
        if (session && isAdminPath() && !adminStore.isLoggedIn) {
            adminStore.init()
        }
    })
})
