import getSupabaseClient from "./supabase-F2pQZHm6.js";
const adminPreOrderApi = {
  /**
   * 获取预订单列表
   * 默认过滤掉 'pending' (待支付) 状态
   */
  async getPreOrders(params) {
    const client = getSupabaseClient();
    const limit = params.limit || 500;
    let query = client.from("pre_orders").select(`
                id, order_no, status, total_amount, quantity, created_at, product_snapshot, user_id,
                profiles(id, uid, avatar, nickname)
            `, { count: "exact" }).neq("status", "pending").order("created_at", { ascending: false }).limit(limit);
    const { data, error, count } = await query;
    if (error) {
      console.error("获取预订单列表失败:", error);
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
   * 批量删除预订单
   */
  async deletePreOrders(ids) {
    const client = getSupabaseClient();
    const { error } = await client.from("pre_orders").delete().in("id", ids);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }
};
export {
  adminPreOrderApi as a
};
//# sourceMappingURL=preorder-DmzinY8u.js.map
