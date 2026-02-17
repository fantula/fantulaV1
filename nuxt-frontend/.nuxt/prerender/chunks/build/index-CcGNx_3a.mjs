import { a as adminCdkApi } from './cdk-5451p_uG.mjs';
import { a as adminCouponApi } from './coupon-Llh82Qx6.mjs';
import { a as adminImageApi, b as adminSettingsApi, c as adminBannerApi, d as adminImageCategoryApi } from './media-BJaGHW2U.mjs';
import { a as adminFaqApi } from './help-center-CsRpUZsm.mjs';
import { a as adminOrderApi } from './order-Ic3SkFUp.mjs';
import { a as adminSchedulerApi } from './scheduler-B1rktNOU.mjs';
import { a as adminSystemApi } from './system-BFPljdi8.mjs';
import { a as adminProductApi } from './product-BAjfeoTx.mjs';
import { a as adminUserApi } from './user-FETuJIoK.mjs';
import { a as adminBackendUserApi } from './backend-user-KLM18bCt.mjs';
import { a as adminDepartmentApi } from './department-DqJTa_H8.mjs';
import { a as adminMessageApi } from './message-CbmmzyV5.mjs';
import { a as adminCategoryApi } from './category-DQHxliQi.mjs';
import { a as adminTicketApi } from './ticket-D4JFVklQ.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import { a as adminFulfillmentApi } from './fulfillment-BkNi-rM7.mjs';
import { a as adminPreOrderApi } from './preorder-BUnz70ti.mjs';
import { a as adminSharedSkuApi } from './shared-sku-B9BuGZhu.mjs';
import { a as adminSkuApi } from './sku-DxqcmBf6.mjs';
import { a as adminRechargeApi } from './recharge-CUyORFAR.mjs';

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
//# sourceMappingURL=index-CcGNx_3a.mjs.map
