import { a as adminCdkApi } from './cdk-DYhNEa5O.mjs';
import { a as adminCouponApi } from './coupon-DzB63IHx.mjs';
import { a as adminImageApi, b as adminSettingsApi, c as adminBannerApi, d as adminImageCategoryApi } from './media-dze9BKD9.mjs';
import { a as adminFaqApi } from './help-center-d-ts0aZv.mjs';
import { a as adminOrderApi } from './order-65zOcaiF.mjs';
import { a as adminSchedulerApi } from './scheduler-B1rktNOU.mjs';
import { a as adminSystemApi } from './system-ZZeEO69O.mjs';
import { a as adminProductApi } from './product-CmEpuoIC.mjs';
import { a as adminUserApi } from './user-CGUVoAET.mjs';
import { a as adminBackendUserApi } from './backend-user-n3FOJYG8.mjs';
import { a as adminDepartmentApi } from './department-_fv-_GS8.mjs';
import { a as adminMessageApi } from './message-DzYNKu6o.mjs';
import { a as adminCategoryApi } from './category-BusMlGxA.mjs';
import { a as adminTicketApi } from './ticket-D0g-SEGL.mjs';
import getSupabaseClient from './supabase-F2pQZHm6.mjs';
import { a as adminFulfillmentApi } from './fulfillment-BMJ6zbT9.mjs';
import { a as adminPreOrderApi } from './preorder-DmzinY8u.mjs';
import { a as adminSharedSkuApi } from './shared-sku-BqaBa-he.mjs';
import { a as adminSkuApi } from './sku-DceW9XKY.mjs';
import { a as adminRechargeApi } from './recharge-BdR5kg3V.mjs';

const adminDashboardApi = {
  /**
   * 获取仪表盘统计数据
   */
  async getStats() {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("admin_get_dashboard_stats");
    if (error) {
      console.error("Failed to fetch dashboard stats:", error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  }
};
const adminApi = {
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
};

export { adminApi as a };
//# sourceMappingURL=index-DbLAmFPd.mjs.map
