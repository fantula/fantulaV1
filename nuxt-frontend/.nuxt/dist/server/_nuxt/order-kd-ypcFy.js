import { by as getAdminSupabaseClient } from "../server.mjs";
const adminOrderApi = {
  /**
   * 获取订单列表
   * 支持按 order_type 筛选 (virtual, shared_account, one_time_cdk)
   */
  async getOrders(params) {
    const client = getAdminSupabaseClient();
    const { page = 1, pageSize = 20, order_type, status, exclude_status, keyword } = params;
    let query = client.from("orders").select(`
                *,
                profiles(id, uid, avatar, nickname)
            `, { count: "exact" }).order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1);
    if (order_type) {
      query = query.eq("order_type", order_type);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (exclude_status && exclude_status.length > 0) {
      exclude_status.forEach((s) => {
        query = query.neq("status", s);
      });
    }
    if (keyword) {
      query = query.ilike("order_no", `%${keyword}%`);
    }
    const { data, error, count } = await query;
    if (error) {
      console.error("获取订单列表失败:", error);
      return { success: false, orders: [], total: 0, error: error.message };
    }
    const orders = (data || []).map((order) => {
      const rawProfile = order.profiles || order.profile;
      const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile || null;
      return {
        ...order,
        _profile: profile
      };
    });
    return { success: true, orders, total: count || 0 };
  },
  /**
   * 更新订单状态
   */
  async updateOrderStatus(id, status) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("orders").update({ status }).eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  },
  /**
   * 删除订单 (软删除或硬删除，视业务而定，目前假设是硬删除)
   */
  async deleteOrders(ids) {
    const client = getAdminSupabaseClient();
    const { error } = await client.from("orders").delete().in("id", ids);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
export {
  adminOrderApi as a
};
//# sourceMappingURL=order-kd-ypcFy.js.map
