import getSupabaseClient from "./supabase-jxF0-7J3.js";
const couponApi = {
  /**
   * 获取用户持有的优惠券
   */
  async getUserCoupons() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false, data: [] };
    const { data, error } = await client.from("user_coupons").select(`
                *,
                coupon:coupons(id, name, type, value, min_usage, end_date, sku_ids)
            `).eq("user_id", user.id).order("redeemed_at", { ascending: false });
    if (error) return { code: 500, msg: error.message, success: false, data: [] };
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
      return { code: 500, msg: error.message, success: false, data: null };
    }
    if (data && data.success) {
      return {
        code: 0,
        msg: data.msg || "兑换成功",
        data: data.coupon,
        success: true
      };
    } else {
      return {
        code: 400,
        msg: data?.error || "兑换失败",
        success: false,
        data: null
      };
    }
  },
  /**
   * 使用余额券 (将券内余额转入用户钱包)
   */
  async useBalanceCoupon(userCouponId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false, data: null };
    const { data: userCoupon, error: fetchUserCouponError } = await client.from("user_coupons").select(`
                *,
                coupon:coupons(*)
            `).eq("id", userCouponId).eq("user_id", user.id).single();
    if (fetchUserCouponError || !userCoupon) {
      return { code: 400, msg: "优惠券不存在", success: false, data: null };
    }
    if (userCoupon.status !== "unused") {
      return { code: 400, msg: "优惠券已使用或已过期", success: false, data: null };
    }
    if (userCoupon.coupon.type !== "balance") {
      return { code: 400, msg: "该优惠券不是余额券", success: false, data: null };
    }
    const { data, error } = await client.rpc("use_balance_coupon", {
      p_user_coupon_id: userCouponId,
      p_user_id: user.id
    });
    if (error) {
      return { code: 500, msg: error.message, success: false, data: null };
    }
    if (data && data.success) {
      return {
        code: 0,
        msg: "使用成功，余额已转入您的钱包",
        success: true,
        data: {
          new_balance: data.new_balance,
          added_amount: data.added_amount
        }
      };
    } else {
      return {
        code: 400,
        msg: data?.error || "使用失败",
        success: false,
        data: null
      };
    }
  },
  /**
   * 删除用户优惠券 (仅限于逻辑删除或隐藏，这里执行真实删除)
   */
  async deleteUserCoupon(userCouponId) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false, data: null };
    const { error } = await client.from("user_coupons").delete().eq("id", userCouponId).eq("user_id", user.id);
    if (error) {
      return { code: 500, msg: error.message, success: false, data: null };
    }
    return { code: 0, msg: "删除成功", success: true, data: null };
  },
  /**
   * 计算优惠券折扣 (结算页调用)
   */
  async calculateDiscount(couponId, amount, skuIds) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { success: false, valid: false, discount_amount: 0, final_amount: amount, error: "未登录" };
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
export {
  couponApi as c
};
//# sourceMappingURL=coupon-DPQs1p3N.js.map
