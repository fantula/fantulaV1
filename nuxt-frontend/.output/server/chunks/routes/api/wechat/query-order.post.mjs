import { d as defineEventHandler, j as getCurrentUser, c as createError, r as readBody, C as getSupabaseClient, A as getWechatPayConfig, D as wechatPayRequest, b as getSupabaseServiceClient } from '../../../nitro/nitro.mjs';
import '@supabase/supabase-js';
import 'zod';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import 'consola';
import 'node:url';
import 'fast-xml-parser';
import 'ipx';

const queryOrder_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { out_trade_no } = body;
    if (!out_trade_no) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11\u8BA2\u5355\u53F7"
      });
    }
    const supabase = getSupabaseClient(event);
    const { data: order, error: orderError } = await supabase.from("recharge_orders").select("*").eq("out_trade_no", out_trade_no).eq("user_id", user.id).single();
    if (orderError || !order) {
      throw createError({
        statusCode: 404,
        message: "\u8BA2\u5355\u4E0D\u5B58\u5728"
      });
    }
    if (order.status === "paid") {
      return {
        success: true,
        data: {
          trade_state: "SUCCESS",
          trade_state_desc: "\u652F\u4ED8\u6210\u529F",
          out_trade_no,
          amount: order.amount,
          paid: true
        }
      };
    }
    const config = getWechatPayConfig();
    const path = `/v3/pay/transactions/out-trade-no/${out_trade_no}?mchid=${config.mchid}`;
    console.log("[QueryOrder] Querying:", out_trade_no);
    const result = await wechatPayRequest(
      "GET",
      path,
      null,
      config
    );
    console.log("[QueryOrder] Result:", result.trade_state);
    if (result.trade_state === "SUCCESS" && order.status !== "paid") {
      const supabaseService = getSupabaseServiceClient();
      await supabaseService.from("recharge_orders").update({
        status: "paid",
        transaction_id: result.transaction_id,
        paid_at: result.success_time,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("out_trade_no", out_trade_no);
      const { data: profile } = await supabaseService.from("profiles").select("balance").eq("id", user.id).single();
      if (profile) {
        const currentBalance = profile.balance || 0;
        const bonus = order.bonus || 0;
        const totalAmount = order.amount + bonus;
        const newBalance = currentBalance + totalAmount;
        await supabaseService.from("profiles").update({
          balance: newBalance,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", user.id);
        await supabaseService.from("wallet_transactions").insert({
          user_id: user.id,
          type: "\u5FAE\u4FE1\u5145\u503C",
          amount: totalAmount,
          balance_after: newBalance,
          description: `\u5FAE\u4FE1\u652F\u4ED8\u5145\u503C ${order.amount.toFixed(2)}\u70B9 \u8D60\u9001${bonus.toFixed(2)}\u70B9`,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    }
    return {
      success: true,
      data: {
        trade_state: result.trade_state,
        trade_state_desc: result.trade_state_desc,
        out_trade_no,
        transaction_id: result.transaction_id,
        amount: order.amount,
        paid: result.trade_state === "SUCCESS"
      }
    };
  } catch (err) {
    console.error("[QueryOrder] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u67E5\u8BE2\u5931\u8D25"
    });
  }
});

export { queryOrder_post as default };
//# sourceMappingURL=query-order.post.mjs.map
