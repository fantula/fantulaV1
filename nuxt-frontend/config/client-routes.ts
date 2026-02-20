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

/**
 * 生成PC端路由路径
 */
export const pcRoute = (path: string = ''): string => {
    if (!path) return PC_PREFIX
    // 如果 path 以 / 开头，去除之
    const cleanPath = path.startsWith('/') ? path.substring(1) : path
    return `${PC_PREFIX}/${cleanPath}`
}

/**
 * PC端路由常量
 */
export const pcRoutes = {
    home: () => pcRoute(),
    login: () => pcRoute('login'),
    faq: () => pcRoute('faq'),
    community: () => pcRoute('community'),

    // 个人中心
    profile: () => pcRoute('profile'),
    profileAccount: () => pcRoute('profile/account'),
    profileOrders: () => pcRoute('profile/order'),
    profileTickets: () => pcRoute('profile/tickets'),
    profileFavorites: () => pcRoute('profile/favorites'),
    profileWallet: () => pcRoute('profile/wallet'),
    profileMessages: () => pcRoute('profile/messages'),
    profileRedemption: () => pcRoute('profile/redemption'),

    // 商品与结算
    cart: () => pcRoute('cart'),
    product: (id: string) => pcRoute(`goods/${id}`),
    checkout: (id: string) => pcRoute(`checkout/${id}`),
} as const
