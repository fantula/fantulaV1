/**
 * Admin API Index
 * Barrel file for admin APIs.
 */

// Import all modules for aggregation
import { adminCdkApi } from './cdk'
import { adminCouponApi } from './coupon'
import { adminImageApi, adminImageCategoryApi, adminBannerApi, adminSettingsApi } from './media'
import { adminFaqApi } from './help-center'
import { adminOrderApi } from './order'
import { adminSchedulerApi } from './scheduler'
import { adminSystemApi } from './system'
import { adminProductApi } from './product'
import { adminUserApi } from './user'
import { adminBackendUserApi } from './backend-user'
import { adminDepartmentApi } from './department'
import { adminMessageApi } from './message'
import { adminCategoryApi } from './category'
import { adminTicketApi } from './ticket'
import { adminDashboardApi } from './dashboard'
import { adminFulfillmentApi } from './fulfillment'
import { adminPreOrderApi } from './preorder'
import { adminSharedSkuApi } from './shared-sku'
import { adminSkuApi } from './sku'
import { adminRechargeApi } from './recharge'

// Re-export all explicitly
export * from './cdk'
export * from './coupon'
export * from './media'
export * from './help-center'
export * from './order'
export * from './scheduler'
export * from './system'
export * from './product'
export * from './user'
export * from './backend-user'
export * from './department'
export * from './message'
export * from './category'
export * from './ticket'
export * from './dashboard'
export * from './fulfillment'
export * from './preorder'
export * from './shared-sku'
export * from './sku'
export * from './recharge'

// Unified Admin API Object (for backward compatibility and namespace usage)
export const adminApi = {
    cdk: adminCdkApi,
    coupon: adminCouponApi,
    image: adminImageApi,
    imageCategory: adminImageCategoryApi,
    banner: adminBannerApi,
    settings: adminSettingsApi,
    faq: adminFaqApi,
    order: adminOrderApi,
    scheduler: adminSchedulerApi,
    system: adminSystemApi,
    product: adminProductApi,
    user: adminUserApi,
    backendUser: adminBackendUserApi,
    department: adminDepartmentApi,
    message: adminMessageApi,
    category: adminCategoryApi,
    ticket: adminTicketApi,
    dashboard: adminDashboardApi,
    fulfillment: adminFulfillmentApi,
    preorder: adminPreOrderApi,
    sharedSku: adminSharedSkuApi,
    sku: adminSkuApi,
    recharge: adminRechargeApi
}
