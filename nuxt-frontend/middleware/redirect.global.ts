export default defineNuxtRouteMiddleware((to, from) => {
    // 后台订单管理根路径重定向
    if (to.path === '/admin/orders' || to.path === '/admin/orders/') {
        return navigateTo('/admin/orders/recharge')
    }

    // 智能设备检测与重定向
    // 1. 根路径重定向 (服务端 + 客户端)
    if (to.path === '/') {
        let isMobile = false

        if (import.meta.server) {
            const event = useRequestEvent()
            const userAgent = event?.node?.req?.headers?.['user-agent'] || ''
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
        } else {
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }

        return navigateTo(isMobile ? '/mobile' : '/pc')
    }

    // 2. 这里的逻辑主要处理错误的设备路径访问 (仅服务端处理即可，客户端由 responsive layout 处理或保持现状)
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
