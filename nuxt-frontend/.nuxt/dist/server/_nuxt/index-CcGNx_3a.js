import { a as adminCdkApi } from "./cdk-5451p_uG.js";
import { a as adminCouponApi } from "./coupon-Llh82Qx6.js";
import { a as adminImageCategoryApi, b as adminImageApi, c as adminSettingsApi, d as adminBannerApi } from "./media-BJaGHW2U.js";
import { a as adminFaqApi } from "./help-center-CsRpUZsm.js";
import { a as adminOrderApi } from "./order-Ic3SkFUp.js";
import { a as adminSchedulerApi } from "./scheduler-B1rktNOU.js";
import { a as adminSystemApi } from "./system-BFPljdi8.js";
import { a as adminProductApi } from "./product-BAjfeoTx.js";
import { a as adminUserApi } from "./user-FETuJIoK.js";
import { a as adminBackendUserApi } from "./backend-user-KLM18bCt.js";
import { a as adminDepartmentApi } from "./department-DqJTa_H8.js";
import { a as adminMessageApi } from "./message-CbmmzyV5.js";
import { a as adminCategoryApi } from "./category-DQHxliQi.js";
import { a as adminTicketApi } from "./ticket-D4JFVklQ.js";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
import { a as adminFulfillmentApi } from "./fulfillment-BkNi-rM7.js";
import { a as adminPreOrderApi } from "./preorder-BUnz70ti.js";
import { a as adminSharedSkuApi } from "./shared-sku-B9BuGZhu.js";
import { a as adminSkuApi } from "./sku-DxqcmBf6.js";
import { a as adminRechargeApi } from "./recharge-CUyORFAR.js";
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
export {
  adminApi as a
};
//# sourceMappingURL=index-CcGNx_3a.js.map
