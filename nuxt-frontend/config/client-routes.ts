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

    // 探索功能（频道识别）
    channel: () => mobileRoute('channel'),

    // 微信回调
    wechatCallback: () => mobileRoute('wechat-callback'),

    // 订单相关
    checkout: (id: string) => mobileRoute(`checkout/${id}`),
    orderDetail: (id: string) => mobileRoute(`profile/order/${id}`),

    // 静态与帮助页面
    help: () => mobileRoute('help'),
    policy: () => mobileRoute('policy'),
    privacy: () => mobileRoute('privacy'),

    // 工单详情
    profileTicketDetail: (id: string) => mobileRoute(`profile/tickets/${id}`),
} as const

/**
 * 生成 PC 端路由路径
 */
export const pcRoute = (path: string = ''): string => {
    if (!path) return PC_PREFIX
    const cleanPath = path.startsWith('/') ? path.substring(1) : path
    return `${PC_PREFIX}/${cleanPath}`
}

/**
 * PC 端路由常量
 */
export const pcRoutes = {
    home: () => pcRoute(),
    faq: () => pcRoute('faq'),
    community: () => pcRoute('community'),

    // 静态页面
    company: () => pcRoute('company'),
    aboutUs: () => pcRoute('about-us'),
    advantages: () => pcRoute('advantages'),
    joinUs: () => pcRoute('join-us'),

    // 政策页面
    privacy: () => pcRoute('privacy'),
    policy: () => pcRoute('policy'),
    refund: () => pcRoute('refund'),
    disclaimer: () => pcRoute('disclaimer'),

    // 个人中心
    profile: () => pcRoute('profile'),
    profileOrders: () => pcRoute('profile/order'),
    profileTickets: () => pcRoute('profile/tickets'),
    profileFavorites: () => pcRoute('profile/favorites'),
    profileWallet: () => pcRoute('profile/wallet'),
    profileExchange: () => pcRoute('profile/exchange'),
    profileMessages: () => pcRoute('profile/messages'),

    // 商品与结算
    product: (id: string) => pcRoute(`goods/${id}`),
    checkout: (id: string) => pcRoute(`checkout/${id}`),
    orderDetail: (id: string) => pcRoute(`profile/order/${id}`),
    article: (id: string) => pcRoute(`article/${id}`),
} as const
