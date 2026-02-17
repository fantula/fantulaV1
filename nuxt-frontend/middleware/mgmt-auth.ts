/**
 * 后台管理统一认证守卫
 * 需在页面中明确引用: definePageMeta({ middleware: ['mgmt-auth'] })
 */
import { adminRoutes } from '@/config/admin-routes'

export default defineNuxtRouteMiddleware(async (to) => {
    // 仅在客户端执行认证检查，防止 SSR 服务端因 LocalStorage 缺失导致无限重定向
    if (process.server) return

    // 登录页无需验证
    if (to.path === adminRoutes.login()) return

    const adminStore = useAdminStore()

    // 如果尚未初始化，执行初始化
    if (!adminStore.isInitialized) {
        await adminStore.init()
    }

    // 未登录跳转到登录页
    if (!adminStore.isLoggedIn) {
        return navigateTo(adminRoutes.login())
    }

    // 细粒度权限检查
    if (!adminStore.hasPermission(to.path)) {
        return navigateTo(adminRoutes.home())  // 无权限跳转到仪表盘
    }
})
