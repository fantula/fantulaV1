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
    { index: '/_mgmt_9Xfa3', path: '/_mgmt_9Xfa3', icon: 'Odometer', title: '仪表盘' },
    { index: '/_mgmt_9Xfa3/orders', path: '/_mgmt_9Xfa3/orders', icon: 'List', title: '订单管理' },
    { index: '/_mgmt_9Xfa3/products', path: '/_mgmt_9Xfa3/products', icon: 'Goods', title: '商品管理' },
    { index: '/_mgmt_9Xfa3/cdk', path: '/_mgmt_9Xfa3/cdk', icon: 'Key', title: 'CDK管理' },
    { index: '/_mgmt_9Xfa3/coupons', path: '/_mgmt_9Xfa3/coupons', icon: 'Ticket', title: '优惠券管理' },
    { index: '/_mgmt_9Xfa3/users', path: '/_mgmt_9Xfa3/users', icon: 'User', title: '用户管理', spacing: true },
    { index: '/_mgmt_9Xfa3/tickets', path: '/_mgmt_9Xfa3/tickets', icon: 'Service', title: '工单管理' },
    { index: '/_mgmt_9Xfa3/recharge', path: '/_mgmt_9Xfa3/recharge', icon: 'Money', title: '充值管理' },
    { index: '/_mgmt_9Xfa3/media', path: '/_mgmt_9Xfa3/media', icon: 'Picture', title: '媒体中心' },
    { index: '/_mgmt_9Xfa3/help-center', path: '/_mgmt_9Xfa3/help-center', icon: 'QuestionFilled', title: '帮助中心' },
    { index: '/_mgmt_9Xfa3/messages', path: '/_mgmt_9Xfa3/messages', icon: 'Message', title: '消息发送管理' },
    { index: '/_mgmt_9Xfa3/backend-settings', path: '/_mgmt_9Xfa3/backend-settings', icon: 'Setting', title: '后台设定' },
]

/**
 * 获取权限菜单列表（不含仪表盘，用于部门权限配置）
 */
export const getPermissionMenuItems = () => {
    return ADMIN_MENU_ITEMS.filter(item => item.index !== '/_mgmt_9Xfa3')
}
