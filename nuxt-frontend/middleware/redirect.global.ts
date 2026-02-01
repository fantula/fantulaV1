export default defineNuxtRouteMiddleware((to, from) => {
    // 后台订单管理根路径重定向
    if (to.path === '/admin/orders' || to.path === '/admin/orders/') {
        return navigateTo('/admin/orders/recharge')
    }

    // 智能设备检测 - 仅在服务端执行（首次访问时）
    // 如果用户访问 /pc 或 /mobile 开头的路径，检查设备是否匹配
    if (import.meta.server) {
        const event = useRequestEvent()
        const userAgent = event?.node?.req?.headers?.['user-agent'] || ''
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

        // 如果是移动设备访问 /pc 路径，重定向到 /mobile
        if (isMobile && to.path.startsWith('/pc')) {
            const mobilePath = to.path.replace('/pc', '/mobile')
            return navigateTo(mobilePath)
        }

        // 如果是PC设备访问 /mobile 路径，重定向到 /pc
        if (!isMobile && to.path.startsWith('/mobile')) {
            const pcPath = to.path.replace('/mobile', '/pc')
            return navigateTo(pcPath)
        }
    }
})
