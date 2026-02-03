import { defineEventHandler, getHeader, readRawBody } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { v as verifyCallbackSignature, b as getWechatPayConfig, i as decryptCallback, g as getSupabaseServiceClient } from '../../../_/wechat-pay.mjs';
import '../../../nitro/nitro.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/@supabase/supabase-js/dist/index.mjs';

const notify_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const timestamp = getHeader(event, "Wechatpay-Timestamp") || "";
    const nonce = getHeader(event, "Wechatpay-Nonce") || "";
    const signature = getHeader(event, "Wechatpay-Signature") || "";
    const rawBody = await readRawBody(event);
    const body = JSON.parse(rawBody || "{}");
    console.log("[Notify] Received notification:", body.event_type, body.id);
    const isValid = verifyCallbackSignature(
      timestamp,
      nonce,
      rawBody || "",
      signature,
      ""
    );
    if (!isValid) ;
    if (body.event_type !== "TRANSACTION.SUCCESS") {
      return { code: "SUCCESS", message: "\u975E\u652F\u4ED8\u6210\u529F\u4E8B\u4EF6" };
    }
    const config = getWechatPayConfig();
    const decryptedStr = decryptCallback(
      body.resource.ciphertext,
      body.resource.nonce,
      body.resource.associated_data,
      config.apiV3Key
    );
    const payment = JSON.parse(decryptedStr);
    console.log("[Notify] Decrypted payment:", payment.out_trade_no, payment.trade_state);
    let attach = {};
    try {
      attach = JSON.parse(payment.attach || "{}");
    } catch (e) {
      console.error("[Notify] Failed to parse attach:", payment.attach);
    }
    if (!attach.userId) {
      console.error("[Notify] Missing userId in attach");
      return { code: "FAIL", message: "\u7F3A\u5C11\u7528\u6237ID" };
    }
    const supabase = getSupabaseServiceClient();
    const { data: order, error: orderError } = await supabase.from("recharge_orders").select("*").eq("out_trade_no", payment.out_trade_no).single();
    if (orderError || !order) {
      console.error("[Notify] Order not found:", payment.out_trade_no);
      return { code: "FAIL", message: "\u8BA2\u5355\u4E0D\u5B58\u5728" };
    }
    if (order.status === "paid") {
      console.log("[Notify] Order already processed:", payment.out_trade_no);
      return { code: "SUCCESS", message: "\u5DF2\u5904\u7406" };
    }
    await supabase.from("recharge_orders").update({
      status: "paid",
      transaction_id: payment.transaction_id,
      payer_openid: (_a = payment.payer) == null ? void 0 : _a.openid,
      paid_at: payment.success_time,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("out_trade_no", payment.out_trade_no);
    const { data: profile } = await supabase.from("profiles").select("balance").eq("id", attach.userId).single();
    if (profile) {
      const currentBalance = profile.balance || 0;
      const bonus = order.bonus || attach.bonus || 0;
      const totalAmount = order.amount + bonus;
      const newBalance = currentBalance + totalAmount;
      await supabase.from("profiles").update({
        balance: newBalance,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", attach.userId);
      await supabase.from("wallet_transactions").insert({
        user_id: attach.userId,
        type: "\u5FAE\u4FE1\u5145\u503C",
        amount: totalAmount,
        balance_after: newBalance,
        description: `\u5FAE\u4FE1\u652F\u4ED8\u5145\u503C ${order.amount.toFixed(2)}\u70B9 \u8D60\u9001${bonus.toFixed(2)}\u70B9`,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      });
      console.log(`[Notify] Success: User ${attach.userId} recharged ${totalAmount} (amount: ${order.amount}, bonus: ${bonus})`);
    }
    return { code: "SUCCESS", message: "\u6210\u529F" };
  } catch (err) {
    console.error("[Notify] Error:", err);
    return { code: "FAIL", message: err.message || "\u5904\u7406\u5931\u8D25" };
  }
});

export { notify_post as default };
//# sourceMappingURL=notify.post.mjs.map
