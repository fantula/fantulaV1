export default defineNuxtRouteMiddleware((to, from) => {
    // 排除不需要 Loading 效果的特殊路由 (如后台、纯静态资源等)
    if (to.path.startsWith('/admin')) {
        return
    }

    // 如果是首次加载(服务端渲染或首次打开)，app.vue 会处理 initial loading
    // 这里只处理客户端路由切换
    if (import.meta.client && from.name) {
        const { startLoading } = usePageLoading()

        // 如果是前往个人中心内部页面，使用 Section Loader
        if (to.path.startsWith('/profile')) {
            startLoading('section')
        } else {
            // 其他页面使用全局 Navigation Loader
            startLoading('navigation')
        }
    }
})
