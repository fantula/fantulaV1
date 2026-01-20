/**
 * 后台管理统一认证守卫
 * 保护所有 /_mgmt_9Xfa3/* 路由，未登录用户重定向到登录页
 */
export default defineNuxtRouteMiddleware(async (to) => {
    // 仅拦截后台路由
    if (!to.path.startsWith('/_mgmt_9Xfa3')) return

    // 登录页无需验证
    if (to.path === '/_mgmt_9Xfa3/login') return

    const adminStore = useAdminStore()

    // 如果尚未初始化，执行初始化
    if (!adminStore.isInitialized) {
        await adminStore.init()
    }

    // 未登录跳转到登录页
    if (!adminStore.isLoggedIn) {
        return navigateTo('/_mgmt_9Xfa3/login')
    }

    // 可选: 细粒度权限检查 (未来扩展)
    // if (!adminStore.hasPermission(to.path)) {
    //   return navigateTo('/_mgmt_9Xfa3/403')
    // }
})
