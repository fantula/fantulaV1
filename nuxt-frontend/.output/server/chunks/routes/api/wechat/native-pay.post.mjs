import { d as defineEventHandler, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { a as getCurrentUser, b as getWechatPayConfig, c as generateOutTradeNo, d as getSupabaseClient, w as wechatPayRequest } from '../../../_/wechat-pay.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@supabase/supabase-js';
import 'crypto';

const nativePay_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { amount, bonus = 0, description } = body;
    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: "\u5145\u503C\u91D1\u989D\u5FC5\u987B\u5927\u4E8E0"
      });
    }
    const config = getWechatPayConfig();
    if (!config.mchid || !config.privateKey) {
      console.error("[NativePay] Missing WeChat Pay config");
      throw createError({
        statusCode: 500,
        message: "\u652F\u4ED8\u914D\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"
      });
    }
    const outTradeNo = generateOutTradeNo("RECHARGE");
    const amountInCents = Math.round(amount * 100);
    const supabase = getSupabaseClient(event);
    const { error: insertError } = await supabase.from("recharge_orders").insert({
      out_trade_no: outTradeNo,
      user_id: user.id,
      amount,
      bonus,
      // 赠送金额
      amount_cents: amountInCents,
      status: "pending",
      pay_type: "wechat_native",
      description: description || `\u5145\u503C${amount}\u70B9`,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (insertError) {
      console.error("[NativePay] Failed to create order:", insertError);
      if (!insertError.message.includes("does not exist")) {
        throw insertError;
      }
    }
    const requestBody = {
      appid: config.appid,
      mchid: config.mchid,
      description: description || `\u51E1\u56FE\u62C9-\u5145\u503C${amount}\u70B9`,
      out_trade_no: outTradeNo,
      notify_url: config.notifyUrl,
      amount: {
        total: amountInCents,
        currency: "CNY"
      },
      attach: JSON.stringify({ userId: user.id, type: "recharge", bonus })
    };
    console.log("[NativePay] Request:", JSON.stringify(requestBody, null, 2));
    const result = await wechatPayRequest(
      "POST",
      "/v3/pay/transactions/native",
      requestBody,
      config
    );
    console.log("[NativePay] Response:", result);
    return {
      success: true,
      data: {
        code_url: result.code_url,
        out_trade_no: outTradeNo,
        amount
      }
    };
  } catch (err) {
    console.error("[NativePay] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u652F\u4ED8\u4E0B\u5355\u5931\u8D25"
    });
  }
});

export { nativePay_post as default };
//# sourceMappingURL=native-pay.post.mjs.map
