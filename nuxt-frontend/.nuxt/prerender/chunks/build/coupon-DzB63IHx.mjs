import getSupabaseClient from './supabase-F2pQZHm6.mjs';

const adminCouponApi = {
  /**
   * 获取优惠券规则列表
   */
  async getCoupons(params) {
    const client = getSupabaseClient();
    let query = client.from("coupons").select("*", { count: "exact" });
    if (params == null ? void 0 : params.type) query = query.eq("type", params.type);
    if ((params == null ? void 0 : params.status) !== void 0) query = query.eq("status", params.status);
    query = query.order("created_at", { ascending: false });
    if (params == null ? void 0 : params.limit) {
      const offset = params.offset || 0;
      query = query.range(offset, offset + params.limit - 1);
    }
    const { data, error, count } = await query;
    if (error) return { success: false, coupons: [], total: 0, error: error.message };
    return { success: true, coupons: data || [], total: count || 0 };
  },
  /**
   * 获取单个优惠券详情
   */
  async getCouponById(id) {
    const client = getSupabaseClient();
    const { data, error } = await client.from("coupons").select("*").eq("id", id).single();
    if (error) return { success: false, error: error.message };
    return { success: true, coupon: data };
  },
  /**
   * 创建优惠券规则
   */
  async createCoupon(data) {
    const client = getSupabaseClient();
    const payload = {
      name: data.name,
      type: data.type,
      value: data.value,
      sku_ids: data.sku_ids || data.product_ids || [],
      min_usage: data.min_usage || 0,
      total_quantity: data.total_quantity || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      status: data.status !== void 0 ? data.status : true
    };
    const { data: coupon, error } = await client.from("coupons").insert(payload).select().single();
    if (error) return { success: false, error: error.message };
    return { success: true, coupon };
  },
  /**
   * 更新优惠券规则
   */
  async updateCoupon(id, data) {
    const client = getSupabaseClient();
    const payload = { ...data };
    if (payload.product_ids) {
      payload.sku_ids = payload.product_ids;
      delete payload.product_ids;
    }
    const { error } = await client.from("coupons").update(payload).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 生成优惠券码
   */
  async generateCouponCodes(couponId, quantity = 1, mode = "random", customCode, usageLimit) {
    const client = getSupabaseClient();
    const payload = { p_coupon_id: couponId, p_quantity: quantity, p_mode: mode };
    if (mode === "universal") {
      payload.p_custom_code = customCode;
      payload.p_usage_limit = usageLimit;
    }
    const { data, error } = await client.rpc("admin_generate_coupon_codes", payload);
    if (error) return { success: false, error: error.message };
    const res = data;
    if (res.success) return { success: true, count: res.count };
    return { success: false, error: res.error };
  },
  /**
   * 删除优惠券规则
   */
  async deleteCoupon(id) {
    const client = getSupabaseClient();
    const { error } = await client.from("coupons").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
  /**
   * 获取某优惠券的实例码列表
   */
  async getCouponCodes(couponId, params) {
    const client = getSupabaseClient();
    const page = (params == null ? void 0 : params.page) || 1;
    const pageSize = (params == null ? void 0 : params.size) || 20;
    const offset = (page - 1) * pageSize;
    let query = client.from("coupon_codes").select("*", { count: "exact" }).eq("coupon_id", couponId);
    if (params == null ? void 0 : params.status) query = query.eq("status", params.status);
    query = query.order("created_at", { ascending: false }).range(offset, offset + pageSize - 1);
    const { data, error, count } = await query;
    if (error) return { success: false, codes: [], total: 0, error: error.message };
    return { success: true, codes: data || [], total: count || 0 };
  },
  /**
   * 切换状态
   */
  async toggleStatus(id, status) {
    return this.updateCoupon(id, { status });
  },
  /**
   * 批量删除兑换码
   */
  async deleteCouponCodes(ids) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("admin_delete_coupon_codes", { p_ids: ids });
    if (error) return { success: false, error: error.message };
    const res = data;
    if (res.success) return { success: true, count: res.count };
    return { success: false, error: res.error };
  },
  /**
   * 获取优惠券使用统计
   */
  async getCouponStats(params) {
    const client = getSupabaseClient();
    const page = params.page;
    const pageSize = params.pageSize;
    const offset = (page - 1) * pageSize;
    let query = client.from("coupon_codes").select(`
                id,
                code,
                status,
                used_at,
                created_at,
                user_uid,
                coupon:coupons(name, type, value)
            `, { count: "exact" }).neq("status", "available");
    if (params.code) query = query.ilike("code", `%${params.code}%`);
    if (params.userUid) query = query.eq("user_uid", params.userUid);
    query = query.order("used_at", { ascending: false, nullsFirst: false }).range(offset, offset + pageSize - 1);
    const { data: codes, error, count } = await query;
    if (error) return { success: false, data: [], total: 0, error: error.message };
    if (!codes || codes.length === 0) return { success: true, data: [], total: 0 };
    const codeValues = codes.map((c) => c.code);
    let usageMap = {};
    if (codeValues.length > 0) {
      const { data: usages } = await client.from("user_coupons").select("code, user_id, order_id, redeemed_at").in("code", codeValues);
      if (usages) {
        usageMap = usages.reduce((acc, u) => {
          const key = `${u.code}_${u.user_id}`;
          acc[key] = u;
          return acc;
        }, {});
      }
    }
    let formattedData = codes.map((item) => {
      var _a, _b, _c;
      const usageKey = `${item.code}_${item.user_uid}`;
      const usage = usageMap[usageKey];
      return {
        id: item.id,
        // coupon_codes.id
        user_uid: item.user_uid,
        display_uid: item.user_uid,
        used_at: item.used_at,
        created_at: usage ? usage.redeemed_at : item.created_at,
        // Use redemption time if available
        order_id: usage ? usage.order_id : null,
        order_no: usage ? usage.order_id : void 0,
        code: item.code,
        status: item.status,
        coupon_name: (_a = item.coupon) == null ? void 0 : _a.name,
        coupon_type: (_b = item.coupon) == null ? void 0 : _b.type,
        value: (_c = item.coupon) == null ? void 0 : _c.value
      };
    });
    const userIds = formattedData.map((i) => i.user_uid).filter((id) => id && id.length > 20);
    if (userIds.length > 0) {
      const { data: users } = await client.from("users").select("id, uid, nickname").in("id", userIds);
      if (users) {
        const userMap = users.reduce((acc, u) => {
          acc[u.id] = u;
          return acc;
        }, {});
        formattedData = formattedData.map((item) => {
          const u = userMap[item.user_uid];
          return {
            ...item,
            display_uid: u ? u.uid : item.user_uid,
            user_nickname: u ? u.nickname : void 0
          };
        });
      }
    }
    return { success: true, data: formattedData, total: count || 0 };
  },
  /**
   * 批量删除使用记录
   */
  async deleteCouponUsages(ids) {
    const client = getSupabaseClient();
    const { error, count } = await client.from("coupon_codes").delete().in("id", ids);
    if (error) return { success: false, error: error.message };
    return { success: true, count: count || ids.length };
  },
  /**
   * 更新优惠券说明（code 字段）
   */
  async updateCouponCode(id, code) {
    const client = getSupabaseClient();
    const { error } = await client.from("coupons").update({ code }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};

export { adminCouponApi as a };
//# sourceMappingURL=coupon-DzB63IHx.mjs.map
