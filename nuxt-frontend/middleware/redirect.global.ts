export default defineNuxtRouteMiddleware((to, from) => {
    // 后台订单管理根路径重定向
    if (to.path === '/_mgmt_9Xfa3/orders' || to.path === '/_mgmt_9Xfa3/orders/') {
        return navigateTo('/_mgmt_9Xfa3/orders/recharge')
    }
})
