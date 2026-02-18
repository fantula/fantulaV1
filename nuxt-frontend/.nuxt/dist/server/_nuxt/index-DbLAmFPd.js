import { a as adminCdkApi } from "./cdk-DYhNEa5O.js";
import { a as adminCouponApi } from "./coupon-DzB63IHx.js";
import { a as adminImageCategoryApi, b as adminImageApi, c as adminSettingsApi, d as adminBannerApi } from "./media-dze9BKD9.js";
import { a as adminFaqApi } from "./help-center-d-ts0aZv.js";
import { a as adminOrderApi } from "./order-65zOcaiF.js";
import { a as adminSchedulerApi } from "./scheduler-B1rktNOU.js";
import { a as adminSystemApi } from "./system-ZZeEO69O.js";
import { a as adminProductApi } from "./product-CmEpuoIC.js";
import { a as adminUserApi } from "./user-CGUVoAET.js";
import { a as adminBackendUserApi } from "./backend-user-n3FOJYG8.js";
import { a as adminDepartmentApi } from "./department-_fv-_GS8.js";
import { a as adminMessageApi } from "./message-DzYNKu6o.js";
import { a as adminCategoryApi } from "./category-BusMlGxA.js";
import { a as adminTicketApi } from "./ticket-D0g-SEGL.js";
import getSupabaseClient from "./supabase-F2pQZHm6.js";
import { a as adminFulfillmentApi } from "./fulfillment-BMJ6zbT9.js";
import { a as adminPreOrderApi } from "./preorder-DmzinY8u.js";
import { a as adminSharedSkuApi } from "./shared-sku-BqaBa-he.js";
import { a as adminSkuApi } from "./sku-DceW9XKY.js";
import { a as adminRechargeApi } from "./recharge-BdR5kg3V.js";
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
//# sourceMappingURL=index-DbLAmFPd.js.map
