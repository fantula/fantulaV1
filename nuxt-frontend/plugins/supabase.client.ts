/**
 * Supabase 认证插件
 * 在客户端初始化时自动恢复用户会话
 */

import { getSupabaseClient } from '@/utils/supabase'

export default defineNuxtPlugin(async (nuxtApp) => {
    // 仅在客户端执行
    if (process.server) return

    const client = getSupabaseClient()

    // 监听认证状态变化
    client.auth.onAuthStateChange((event, session) => {
        console.log('[Supabase Auth]', event, session?.user?.email)

        if (event === 'SIGNED_OUT') {
            // 用户登出，清除状态
            const userStore = useUserStore()
            userStore.logout()
        }
    })

    // 尝试恢复会话
    const { data: { session } } = await client.auth.getSession()
    if (session) {
        console.log('[Supabase Auth] 已恢复会话:', session.user.email)
    }
})
