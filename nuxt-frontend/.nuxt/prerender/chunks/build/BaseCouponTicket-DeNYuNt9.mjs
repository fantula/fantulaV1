import { _ as _export_sfc, o as getSupabaseClient, E as ElIcon, aN as clock_default } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/server-renderer/index.mjs';

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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BaseCouponTicket",
  __ssrInlineRender: true,
  props: {
    color: { default: "default" },
    size: { default: "normal" },
    value: {},
    unit: { default: "\u70B9" },
    title: {},
    desc: {},
    typeLabel: {},
    expiryText: {},
    status: { default: "unused" },
    disabled: { type: Boolean, default: false },
    actionText: { default: "\u53BB\u4F7F\u7528" }
  },
  emits: ["click", "action"],
  setup(__props) {
    const props = __props;
    const statusText = computed(() => {
      if (props.status === "used") return "\u5DF2\u4F7F\u7528";
      if (props.status === "expired") return "\u5DF2\u8FC7\u671F";
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_icon = ElIcon;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["coupon-ticket", [
          `color-${__props.color}`,
          `size-${__props.size}`,
          { "is-disabled": __props.disabled || __props.status !== "unused" }
        ]]
      }, _attrs))} data-v-3f846438><div class="ticket-left" data-v-3f846438><div class="ticket-value" data-v-3f846438><span class="value-amount" data-v-3f846438>${ssrInterpolate(__props.value)}</span>`);
      if (__props.unit) {
        _push(`<span class="value-unit" data-v-3f846438>${ssrInterpolate(__props.unit)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ticket-type-label" data-v-3f846438>`);
      ssrRenderSlot(_ctx.$slots, "type-label", {}, () => {
        _push(`${ssrInterpolate(__props.typeLabel)}`);
      }, _push, _parent);
      _push(`</div></div><div class="ticket-right" data-v-3f846438><div class="right-main" data-v-3f846438><div class="ticket-name" data-v-3f846438>${ssrInterpolate(__props.title)}</div><div class="ticket-desc" data-v-3f846438>${ssrInterpolate(__props.desc)}</div></div><div class="ticket-footer" data-v-3f846438><div class="ticket-expiry" data-v-3f846438>`);
      _push(ssrRenderComponent(_component_el_icon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(clock_default), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(clock_default))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(__props.expiryText)}</div><div class="ticket-action" data-v-3f846438>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, () => {
        if (__props.status === "unused" && !__props.disabled) {
          _push(`<button class="action-btn" data-v-3f846438>${ssrInterpolate(__props.actionText)}</button>`);
        } else {
          _push(`<div class="status-badge" data-v-3f846438>${ssrInterpolate(statusText.value)}</div>`);
        }
      }, _push, _parent);
      _push(`</div></div></div><div class="punch-hole top" data-v-3f846438></div><div class="punch-hole bottom" data-v-3f846438></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/exchange/coupon/BaseCouponTicket.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BaseCouponTicket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f846438"]]);

export { BaseCouponTicket as B, couponApi as c };
//# sourceMappingURL=BaseCouponTicket-DeNYuNt9.mjs.map
