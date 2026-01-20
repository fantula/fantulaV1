/**
 * Admin API 统一导出
 * 从各个独立模块聚合导出，简化导入路径
 */

// 商品管理
export { adminProductApi } from './product'

// SKU 管理
export { adminSkuApi } from './sku'

// 订单管理
export { adminOrderApi } from './order'
export type { AdminOrder, AdminOrderDelivery } from './order'

// 预订单管理
export { adminPreOrderApi } from './preorder'

// CDK 管理
export { adminCdkApi } from './cdk'
export type { AdminCDK } from './cdk'

// 优惠券管理
export { adminCouponApi } from './coupon'
export type { AdminCoupon } from './coupon'

// 媒体中心
export { adminImageApi, adminImageCategoryApi, adminBannerApi, adminSettingsApi } from './media'
export type { AdminImage, AdminImageCategory, AdminBanner } from './media'

// 帮助中心
export { adminFaqApi, adminArticleApi } from './help-center'
export type { AdminFaq, AdminFaqCategory } from './help-center'

// Scheduler
export { adminSchedulerApi, type SchedulerStatus, type SchedulerLog } from './scheduler'

// 部门管理
export { adminDepartmentApi } from './department'
export type { AdminDepartment } from './department'

// 后台用户管理
export { adminBackendUserApi } from './backend-user'
export type { AdminBackendUser } from './backend-user'

// 订单履约
export { adminFulfillmentApi } from './fulfillment'

// ========== 新增模块 ==========

// 商品分类管理
export { adminCategoryApi, type ProductCategory } from './category'

// 用户管理
export { adminUserApi, type AdminUser } from './user'

// 消息管理
export { adminMessageApi, type AdminMessage } from './message'

// 充值管理
export { adminRechargeApi, type RechargeTier } from './recharge'

// 共享规格管理
export { adminSharedSkuApi, type SharedSkuGroup } from './shared-sku'

// 工单管理
export { adminTicketApi, type AdminTicket, type TicketMessage } from './ticket'
