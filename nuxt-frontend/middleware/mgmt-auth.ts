/**
 * 后台管理统一认证守卫
 * 需在页面中明确引用: definePageMeta({ middleware: ['mgmt-auth'] })
 */
export default defineNuxtRouteMiddleware(async (to) => {
    // 登录页无需验证
    if (to.path === '/admin/login') return

    const adminStore = useAdminStore()

    // 如果尚未初始化，执行初始化
    if (!adminStore.isInitialized) {
        await adminStore.init()
    }

    // 未登录跳转到登录页
    if (!adminStore.isLoggedIn) {
        return navigateTo('/admin/login')
    }

    // 细粒度权限检查
    if (!adminStore.hasPermission(to.path)) {
        return navigateTo('/admin')  // 无权限跳转到仪表盘
    }
})
