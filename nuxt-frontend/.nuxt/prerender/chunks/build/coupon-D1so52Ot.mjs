import getSupabaseClient from './supabase-jxF0-7J3.mjs';

const couponApi = {
  /**
   * 获取用户持有的优惠券
   */
  async getUserCoupons() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { data, error } = await client.from("user_coupons").select(`
                *,
                coupon:coupons(id, name, type, value, min_usage, end_date, sku_ids)
            `).eq("user_id", user.id).order("redeemed_at", { ascending: false });
    if (error) return { code: 500, msg: error.message, success: false };
    return { code: 0, msg: "success", data, success: true };
  },
  /**
   * 兑换优惠券码 (使用原子性 RPC 调用)
   */
  async redeemCoupon(code) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("redeem_coupon", {
      p_code: code
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    if (data && data.success) {
      return {
        code: 0,
        msg: data.msg || "\u5151\u6362\u6210\u529F",
        data: data.coupon,
        success: true
      };
    } else {
      return {
        code: 400,
        msg: (data == null ? void 0 : data.error) || "\u5151\u6362\u5931\u8D25",
        success: false
      };
    }
  },
  /**
   * 使用余额券 (将券内余额转入用户钱包)
   */
  async useBalanceCoupon(userCouponId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { data: userCoupon, error: fetchUserCouponError } = await client.from("user_coupons").select(`
                *,
                coupon:coupons(*)
            `).eq("id", userCouponId).eq("user_id", user.id).single();
    if (fetchUserCouponError || !userCoupon) {
      return { code: 400, msg: "\u4F18\u60E0\u5238\u4E0D\u5B58\u5728", success: false };
    }
    if (userCoupon.status !== "unused") {
      return { code: 400, msg: "\u4F18\u60E0\u5238\u5DF2\u4F7F\u7528\u6216\u5DF2\u8FC7\u671F", success: false };
    }
    if (userCoupon.coupon.type !== "balance") {
      return { code: 400, msg: "\u8BE5\u4F18\u60E0\u5238\u4E0D\u662F\u4F59\u989D\u5238", success: false };
    }
    const { data, error } = await client.rpc("use_balance_coupon", {
      p_user_coupon_id: userCouponId,
      p_user_id: user.id
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    if (data && data.success) {
      return {
        code: 0,
        msg: "\u4F7F\u7528\u6210\u529F\uFF0C\u4F59\u989D\u5DF2\u8F6C\u5165\u60A8\u7684\u94B1\u5305",
        success: true,
        data: {
          new_balance: data.new_balance,
          added_amount: data.added_amount
        }
      };
    } else {
      return {
        code: 400,
        msg: (data == null ? void 0 : data.error) || "\u4F7F\u7528\u5931\u8D25",
        success: false
      };
    }
  },
  /**
   * 删除用户优惠券 (仅限于逻辑删除或隐藏，这里执行真实删除)
   */
  async deleteUserCoupon(userCouponId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { error } = await client.from("user_coupons").delete().eq("id", userCouponId).eq("user_id", user.id);
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u5220\u9664\u6210\u529F", success: true };
  },
  /**
   * 计算优惠券折扣 (结算页调用)
   */
  async calculateDiscount(couponId, amount, skuIds) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { success: false, valid: false, discount_amount: 0, final_amount: amount, error: "\u672A\u767B\u5F55" };
    const { data, error } = await client.rpc("calculate_coupon_discount", {
      p_user_id: user.id,
      p_coupon_id: couponId,
      p_order_amount: amount,
      p_sku_ids: skuIds
    });
    if (error) return { success: false, valid: false, discount_amount: 0, final_amount: amount, error: error.message };
    return {
      success: true,
      valid: data.valid,
      discount_amount: data.discount_amount,
      final_amount: data.final_amount,
      error: data.error
    };
  }
};

export { couponApi as c };
//# sourceMappingURL=coupon-D1so52Ot.mjs.map
