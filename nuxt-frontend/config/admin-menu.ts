/**
 * 后台管理菜单配置
 * 统一管理侧边栏和部门权限中的菜单列表
 */
import { adminRoutes } from './admin-routes'

export interface AdminMenuItem {
    index: string      // 路由路径
    path: string       // 同 index，兼容两种用法
    title: string      // 显示名称
    icon?: string      // 图标名称 (Element Plus Icons)
    spacing?: boolean  // 是否在上方添加分隔线
    children?: AdminMenuItem[] // 子菜单
}

/**
 * 后台菜单列表
 * 添加新菜单时只需在此处添加，侧边栏和部门管理会自动同步
 */
export const ADMIN_MENU_ITEMS: AdminMenuItem[] = [
    { index: adminRoutes.home(), path: adminRoutes.home(), icon: 'Odometer', title: '仪表盘' },
    { index: adminRoutes.orders(), path: adminRoutes.orders(), icon: 'List', title: '订单管理' },
    { index: adminRoutes.products(), path: adminRoutes.products(), icon: 'Goods', title: '商品管理' },
    { index: adminRoutes.cdk(), path: adminRoutes.cdk(), icon: 'Key', title: 'CDK管理' },
    { index: adminRoutes.coupons(), path: adminRoutes.coupons(), icon: 'Ticket', title: '优惠券管理' },
    { index: adminRoutes.users(), path: adminRoutes.users(), icon: 'User', title: '用户管理', spacing: true },
    { index: adminRoutes.tickets(), path: adminRoutes.tickets(), icon: 'Service', title: '工单管理' },
    { index: adminRoutes.recharge(), path: adminRoutes.recharge(), icon: 'Money', title: '充值管理' },
    { index: adminRoutes.media(), path: adminRoutes.media(), icon: 'Picture', title: '媒体中心' },
    { index: adminRoutes.helpCenter(), path: adminRoutes.helpCenter(), icon: 'QuestionFilled', title: '帮助中心' },
    { index: adminRoutes.messages(), path: adminRoutes.messages(), icon: 'Message', title: '消息发送管理' },
    { index: adminRoutes.settings(), path: adminRoutes.settings(), icon: 'Setting', title: '系统设置' },
]

/**
 * 获取权限菜单列表（不含仪表盘，用于部门权限配置）
 */
export const getPermissionMenuItems = () => {
    return ADMIN_MENU_ITEMS.filter(item => item.index !== adminRoutes.home())
}
