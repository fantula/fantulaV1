export default defineNuxtRouteMiddleware((to, from) => {
    // 后台订单管理根路径重定向
    if (to.path === '/admin/orders' || to.path === '/admin/orders/') {
        return navigateTo('/admin/orders/recharge')
    }
})
