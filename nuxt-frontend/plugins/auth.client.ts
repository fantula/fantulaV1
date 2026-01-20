export default defineNuxtPlugin(async (nuxtApp) => {
    const userStore = useUserStore()
    const token = useCookie('token')

    console.log('[Auth Plugin] Initializing...')

    // 如果有 Token 但没有用户信息，尝试恢复会话
    // 这会在应用挂载前执行，确保首屏就有数据
    if (token.value && !userStore.user) {
        try {
            console.log('[Auth Plugin] Token found, restoring session...')
            await userStore.init()
            console.log('[Auth Plugin] Session restored for:', userStore.user?.nickname)
        } catch (e) {
            console.error('[Auth Plugin] Restoration failed:', e)
        }
    } else if (token.value && userStore.user) {
        // 即使有用户信息，也后台刷新一次，确保数据（如头像、余额）最新
        userStore.fetchUserInfo().catch(e => console.error('[Auth Plugin] Background refresh failed:', e))
    } else {
        // 如果没有 Token，确保 Store 也是空的
        if (!token.value) {
            userStore.logout() // 清理可能残留的状态
        }
        console.log('[Auth Plugin] No token found or session active.')
    }
})
