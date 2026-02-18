import getSupabaseClient from './supabase-F2pQZHm6.mjs';

const adminFulfillmentApi = {
  /**
   * Get the latest fulfillment receipt for an order
   */
  async getOrderFulfillment(orderId) {
    try {
      const client = getSupabaseClient();
      const { data, error } = await client.from("order_fulfillments").select("*").eq("order_id", orderId).order("submitted_at", { ascending: false }).limit(1).maybeSingle();
      if (error) {
        return { success: false, error: "\u83B7\u53D6\u56DE\u6267\u5931\u8D25: " + error.message };
      }
      return { success: true, data };
    } catch (e) {
      return { success: false, error: e.message || "\u7CFB\u7EDF\u5F02\u5E38" };
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
        return { success: false, error: "\u66F4\u65B0\u56DE\u6267\u5931\u8D25: " + fulfillmentError.message };
      }
      const { error: orderError } = await client.from("orders").update({ status: "active" }).eq("id", orderId);
      if (orderError) {
        return { success: false, error: "\u66F4\u65B0\u8BA2\u5355\u72B6\u6001\u5931\u8D25: " + orderError.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "\u7CFB\u7EDF\u5F02\u5E38" };
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
        return { success: false, error: "\u9A73\u56DE\u5931\u8D25: " + error.message };
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "\u7CFB\u7EDF\u5F02\u5E38" };
    }
  }
};

export { adminFulfillmentApi as a };
//# sourceMappingURL=fulfillment-BMJ6zbT9.mjs.map
