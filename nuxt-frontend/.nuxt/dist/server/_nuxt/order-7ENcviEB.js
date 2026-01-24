import { o as getSupabaseClient } from "../server.mjs";
const clientOrderApi = {
  /**
   * 获取用户订单列表 (已支付订单)
   */
  async getOrderList(params) {
    const client = getSupabaseClient();
    let query = client.from("orders").select("id, order_no, order_type, status, quantity, total_amount, created_at, expires_at, product_snapshot, sku_snapshot").order("created_at", { ascending: false });
    if (params?.limit) {
      query = query.limit(params.limit);
    }
    if (params?.status && params.status !== "all") {
      query = query.eq("status", params.status);
    }
    const { data, error } = await query;
    if (error) {
      console.error("获取订单列表失败:", error);
      return { success: false, error: error.message };
    }
    return { success: true, data: data || [] };
  },
  /**
   * 获取订单详情
   */
  async getOrderDetail(orderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("orders").select("*, cdk_snapshot, slot_occupancy_ids").eq("id", orderId).single();
    if (error || !data) {
      return { success: false, error: error?.message || "订单不存在" };
    }
    let cdkList = [];
    const cdkIds = data.cdk_snapshot?.locked_cdk_ids || data.cdk_snapshot || [];
    const realCdkIds = Array.isArray(cdkIds) ? cdkIds : cdkIds.locked_cdk_ids || [];
    if (realCdkIds.length > 0) {
      const { data: cdks } = await client.from("cdks").select("id, code, account_data").in("id", realCdkIds);
      if (cdks) {
        cdkList = cdks.map((cdk) => {
          let parsed = null;
          try {
            parsed = JSON.parse(cdk.code);
          } catch {
          }
          return {
            id: cdk.id,
            code: cdk.code,
            parsed,
            accountData: cdk.account_data
          };
        });
      }
    }
    let slotList = [];
    if (data.slot_occupancy_ids && data.slot_occupancy_ids.length > 0) {
      const { data: slots } = await client.from("slot_occupancies").select("id, slot_index, cdk_id").in("id", data.slot_occupancy_ids);
      if (slots) {
        slotList = slots;
      }
    }
    return {
      success: true,
      data: { ...data, cdkList, slotList }
    };
  },
  /**
   * 获取待支付预订单列表
   */
  async getPendingPreOrders() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("pre_orders").select("*").eq("status", "pending").gt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).order("created_at", { ascending: false });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: data || [] };
  },
  /**
   * 获取预订单详情
   */
  async getPreOrderDetail(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("get_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "预订单不存在" };
    }
    return { success: true, data: data.pre_order };
  },
  /**
   * 创建预订单 (立即购买)
   */
  async createPreOrder(skuId, quantity = 1, source = "buy_now") {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("create_pre_order", {
      p_sku_id: skuId,
      p_quantity: quantity,
      p_source: source
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "创建预订单失败" };
    }
    return {
      success: true,
      preOrderId: data.pre_order_id,
      orderNo: data.order_no,
      totalAmount: data.total_amount,
      expiresAt: data.expires_at
    };
  },
  /**
   * 确认预订单并支付
   */
  async confirmPreOrder(preOrderId, payMethod, couponId) {
    const client = getSupabaseClient();
    const payload = {
      p_pre_order_id: preOrderId,
      p_pay_method: payMethod
    };
    if (couponId) {
      payload.p_coupon_id = couponId;
    }
    const { data, error } = await client.rpc("confirm_pre_order", payload);
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "支付失败" };
    }
    return {
      success: true,
      orderNo: data.order_no,
      orderId: data.order_id,
      totalAmount: data.total_amount
    };
  },
  /**
   * 取消预订单
   */
  async cancelPreOrder(preOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("cancel_pre_order", {
      p_pre_order_id: preOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "取消失败" };
    }
    return { success: true };
  },
  /**
   * 应用优惠券到预订单
   */
  async applyCoupon(preOrderId, couponId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("apply_coupon_to_pre_order", {
      p_pre_order_id: preOrderId,
      p_coupon_id: couponId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "应用优惠券失败" };
    }
    return {
      success: true,
      totalAmount: data.total_amount,
      discountAmount: data.discount_amount
    };
  },
  // ========================================
  // 续费 API
  // ========================================
  /**
   * 获取订单可续费的 SKU 列表
   */
  async getRenewalSkus(orderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("get_renewal_skus", {
      p_order_id: orderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "获取续费SKU失败" };
    }
    return {
      success: true,
      orderId: data.order_id,
      cdkId: data.cdk_id,
      endTime: data.end_time,
      product: data.product,
      skus: data.skus || []
    };
  },
  /**
   * 创建续费预订单
   */
  async createRenewalPreOrder(skuId, oldOrderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("create_renewal_pre_order", {
      p_sku_id: skuId,
      p_old_order_id: oldOrderId
    });
    if (error) {
      return { success: false, error: error.message };
    }
    if (!data?.success) {
      return { success: false, error: data?.error || "创建续费订单失败" };
    }
    return {
      success: true,
      preOrderId: data.pre_order_id,
      orderNo: data.order_no,
      totalAmount: data.total_amount,
      expiresAt: data.expires_at
    };
  },
  // ========================================
  // 退款 API
  // ========================================
  /**
   * 创建退款申请
   */
  async createRefundRequest(orderId, reason, reasonDetail = "") {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("create_refund_request", {
      p_order_id: orderId,
      p_reason: reason,
      p_reason_detail: reasonDetail
    });
    if (error) return { success: false, error: error.message };
    if (!data?.success) return { success: false, error: data?.error || "申请失败" };
    return { success: true, requestId: data.request_id, message: data.message };
  },
  /**
   * 获取退款申请详情
   */
  async getRefundRequest(orderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("get_refund_request", { p_order_id: orderId });
    if (error) return { success: false, error: error.message };
    if (!data?.success) return { success: false, error: data?.error };
    return { success: true, data: data.request };
  },
  /**
   * 取消退款申请
   */
  async cancelRefundRequest(orderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("cancel_user_refund_request", { p_order_id: orderId });
    if (error) return { success: false, error: error.message };
    if (!data?.success) return { success: false, error: data?.error || "取消失败" };
    return { success: true, message: data.message };
  },
  /**
   * 获取订单退款状态（待审核请求和取消次数）
   */
  async getOrderRefundInfo(orderId) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("get_order_refund_info", { p_order_id: orderId });
    if (error) return { success: false, error: error.message };
    if (!data?.success) return { success: false, error: data?.error };
    return {
      success: true,
      pendingRequest: data.pending_request,
      cancelledCount: data.cancelled_count
    };
  }
};
export {
  clientOrderApi as c
};
//# sourceMappingURL=order-7ENcviEB.js.map
