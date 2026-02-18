/**
 * 客户端路由配置 - 唯一真理源 (Single Source of Truth)
 * 
 * 管理所有客户端（PC/Mobile）的路由路径。
 */

export const MOBILE_PREFIX = '/mobile'
export const PC_PREFIX = '/pc'

/**
 * 生成移动端路由路径
 */
export const mobileRoute = (path: string = ''): string => {
    if (!path) return MOBILE_PREFIX
    // 如果 path 以 / 开头，去除之
    const cleanPath = path.startsWith('/') ? path.substring(1) : path
    return `${MOBILE_PREFIX}/${cleanPath}`
}

/**
 * 移动端路由常量
 */
export const mobileRoutes = {
    home: () => mobileRoute(),
    login: () => mobileRoute('login'),

    // 个人中心
    profile: () => mobileRoute('profile'),
    profileAccount: () => mobileRoute('profile/account'),
    profileOrders: () => mobileRoute('profile/order'),
    profileTickets: () => mobileRoute('profile/tickets'),
    profileFavorites: () => mobileRoute('profile/favorites'),
    profileWallet: () => mobileRoute('profile/wallet'),
    profileMessages: () => mobileRoute('profile/messages'),
    profileRedemption: () => mobileRoute('profile/redemption'),

    // 购物车
    cart: () => mobileRoute('cart'),

    // 商品
    product: (id: string) => mobileRoute(`goods/${id}`),
} as const
