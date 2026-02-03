/**
 * 客户端认证守卫
 * 保护个人中心等需要登录的页面
 */
export default defineNuxtRouteMiddleware(async (to) => {
    // 登录页/注册页无需验证
    if (to.path.includes('/login') || to.path.includes('/register')) return

    const userStore = useUserStore()

    // 尝试初始化（如果是刷新页面）
    if (!userStore.isLoggedIn) {
        await userStore.init()
    }

    // 未登录跳转到登录页（或弹出登录框，视业务逻辑而定）
    // 这里统一跳首页并带上 query openLogin=true 或者跳登录页
    if (!userStore.isLoggedIn) {
        // PC端通常弹窗，但在路由守卫里很难弹窗。
        // 如果是 Mobile，跳登录页
        if (to.path.startsWith('/mobile/')) {
            return navigateTo('/mobile?login=1')
        }
        // PC端跳首页
        return navigateTo('/?login=1')
    }
})
