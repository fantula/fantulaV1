import { defineEventHandler, createError, readBody } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { a as getCurrentUser, b as getSupabaseClient } from '../../../_/supabase.mjs';
import { getWechatPayConfig, generateOutTradeNo, wechatPayRequest, getTimestamp, generateNonceStr, generateJsapiPaySign } from '../../../_/wechat-pay.mjs';
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

const jsapiPay_post = defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "\u672A\u767B\u5F55"
      });
    }
    const body = await readBody(event);
    const { amount, openid, description, bonus = 0 } = body;
    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: "\u5145\u503C\u91D1\u989D\u5FC5\u987B\u5927\u4E8E0"
      });
    }
    if (!openid) {
      throw createError({
        statusCode: 400,
        message: "\u7F3A\u5C11 OpenID"
      });
    }
    const config = getWechatPayConfig();
    if (!config.mchid || !config.privateKey) {
      throw createError({
        statusCode: 500,
        message: "\u652F\u4ED8\u914D\u7F6E\u9519\u8BEF\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458"
      });
    }
    const outTradeNo = generateOutTradeNo("JSAPI");
    const amountInCents = Math.round(amount * 100);
    const supabase = getSupabaseClient(event);
    await supabase.from("recharge_orders").insert({
      out_trade_no: outTradeNo,
      user_id: user.id,
      amount,
      amount_cents: amountInCents,
      bonus,
      status: "pending",
      pay_type: "wechat_jsapi",
      description: description || `\u5145\u503C${amount}\u70B9`,
      payer_openid: openid,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    });
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
      payer: {
        openid
      },
      attach: JSON.stringify({ userId: user.id, type: "recharge", bonus })
    };
    console.log("[JsapiPay] Request:", JSON.stringify(requestBody, null, 2));
    const result = await wechatPayRequest(
      "POST",
      "/v3/pay/transactions/jsapi",
      requestBody,
      config
    );
    const timeStamp = String(getTimestamp());
    const nonceStr = generateNonceStr();
    const paySign = generateJsapiPaySign(
      config.appid,
      timeStamp,
      nonceStr,
      result.prepay_id,
      config.privateKey
    );
    return {
      success: true,
      data: {
        appId: config.appid,
        timeStamp,
        nonceStr,
        package: `prepay_id=${result.prepay_id}`,
        signType: "RSA",
        paySign,
        out_trade_no: outTradeNo,
        amount
      }
    };
  } catch (err) {
    console.error("[JsapiPay] Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      message: err.message || "\u652F\u4ED8\u4E0B\u5355\u5931\u8D25"
    });
  }
});

export { jsapiPay_post as default };
//# sourceMappingURL=jsapi-pay.post.mjs.map
