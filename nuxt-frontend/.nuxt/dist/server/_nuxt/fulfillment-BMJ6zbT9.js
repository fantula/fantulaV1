import getSupabaseClient from "./supabase-F2pQZHm6.js";
const adminFulfillmentApi = {
  /**
   * Get the latest fulfillment receipt for an order
   */
  async getOrderFulfillment(orderId) {
    try {
      const client = getSupabaseClient();
      const { data, error } = await client.from("order_fulfillments").select("*").eq("order_id", orderId).order("submitted_at", { ascending: false }).limit(1).maybeSingle();
      if (error) {
        return { success: false, error: "获取回执失败: " + error.message };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message || "系统异常" };
    }
  },
  /**
   * Approve a fulfillment receipt and update order status to active
   */
  async approveFulfillment(fulfillmentId, orderId) {
    try {
      const client = getSupabaseClient();
      const { error: fulfillmentError } = await client.from("order_fulfillments").update({
        status: "approved",
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", fulfillmentId);
      if (fulfillmentError) {
        return { success: false, error: "更新回执失败: " + fulfillmentError.message };
      }
      const { error: orderError } = await client.from("orders").update({ status: "active" }).eq("id", orderId);
      if (orderError) {
        return { success: false, error: "更新订单状态失败: " + orderError.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "系统异常" };
    }
  },
  /**
   * Reject a fulfillment receipt
   */
  async rejectFulfillment(fulfillmentId, reason) {
    try {
      const client = getSupabaseClient();
      const { error } = await client.from("order_fulfillments").update({
        status: "rejected",
        reject_reason: reason,
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", fulfillmentId);
      if (error) {
        return { success: false, error: "驳回失败: " + error.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "系统异常" };
    }
  }
};
export {
  adminFulfillmentApi as a
};
//# sourceMappingURL=fulfillment-BMJ6zbT9.js.map
