/**
 * 后台管理菜单配置
 * 统一管理侧边栏和部门权限中的菜单列表
 */

export interface AdminMenuItem {
    index: string      // 路由路径
    path: string       // 同 index，兼容两种用法
    title: string      // 显示名称
    icon?: string      // 图标名称 (Element Plus Icons)
    spacing?: boolean  // 是否在上方添加分隔线
}

/**
 * 后台菜单列表
 * 添加新菜单时只需在此处添加，侧边栏和部门管理会自动同步
 */
export const ADMIN_MENU_ITEMS: AdminMenuItem[] = [
    { index: '/admin', path: '/admin', icon: 'Odometer', title: '仪表盘' },
    { index: '/admin/orders', path: '/admin/orders', icon: 'List', title: '订单管理' },
    { index: '/admin/products', path: '/admin/products', icon: 'Goods', title: '商品管理' },
    { index: '/admin/cdk', path: '/admin/cdk', icon: 'Key', title: 'CDK管理' },
    { index: '/admin/coupons', path: '/admin/coupons', icon: 'Ticket', title: '优惠券管理' },
    { index: '/admin/users', path: '/admin/users', icon: 'User', title: '用户管理', spacing: true },
    { index: '/admin/tickets', path: '/admin/tickets', icon: 'Service', title: '工单管理' },
    { index: '/admin/recharge', path: '/admin/recharge', icon: 'Money', title: '充值管理' },
    { index: '/admin/media', path: '/admin/media', icon: 'Picture', title: '媒体中心' },
    { index: '/admin/help-center', path: '/admin/help-center', icon: 'QuestionFilled', title: '帮助中心' },
    { index: '/admin/messages', path: '/admin/messages', icon: 'Message', title: '消息发送管理' },
    { index: '/admin/backend-settings', path: '/admin/backend-settings', icon: 'Setting', title: '后台设定' },
]

/**
 * 获取权限菜单列表（不含仪表盘，用于部门权限配置）
 */
export const getPermissionMenuItems = () => {
    return ADMIN_MENU_ITEMS.filter(item => item.index !== '/admin')
}
