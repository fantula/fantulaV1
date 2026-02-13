import { defineEventHandler, getMethod, getQuery, readRawBody } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/h3/dist/index.mjs';
import { g as getSupabaseServiceClient } from '../../../_/supabase.mjs';
import { p as parseWechatEventXml } from '../../../_/wechat-login.mjs';
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
import '../../../_/wechat-pay.mjs';

const eventCallback = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method === "GET") {
    const query = getQuery(event);
    const echostr = query.echostr;
    console.log("[WechatCallback] URL verification, echostr:", echostr);
    return echostr || "ok";
  }
  try {
    const rawBody = await readRawBody(event) || "";
    console.log("[WechatCallback] Received event:", rawBody.substring(0, 200));
    const eventData = parseWechatEventXml(rawBody);
    console.log("[WechatCallback] Parsed event:", eventData);
    const msgType = eventData.MsgType;
    const eventType = eventData.Event;
    const fromUser = eventData.FromUserName;
    const eventKey = eventData.EventKey;
    if (msgType !== "event") {
      return "success";
    }
    if (eventType === "SCAN" || eventType === "subscribe") {
      let sceneStr = eventKey;
      if (eventType === "subscribe" && (eventKey == null ? void 0 : eventKey.startsWith("qrscene_"))) {
        sceneStr = eventKey.replace("qrscene_", "");
      }
      if (!sceneStr || !sceneStr.startsWith("login_")) {
        console.log("[WechatCallback] Not a login scan, ignoring");
        return "success";
      }
      console.log("[WechatCallback] Login scan detected:", { sceneStr, openid: fromUser });
      const supabase = getSupabaseServiceClient();
      const { error } = await supabase.from("wechat_login_sessions").update({
        openid: fromUser,
        status: "scanned"
      }).eq("scene_str", sceneStr).eq("status", "waiting");
      if (error) {
        console.error("[WechatCallback] Update session failed:", error);
      } else {
        console.log("[WechatCallback] Session updated to scanned");
      }
    }
    if (eventType === "CLICK" && eventKey === "MENU_CONTACT_SUPPORT") {
      const now = Math.floor(Date.now() / 1e3);
      const content = `\u516C\u4F17\u53F7\u65E0\u4EBA\u503C\u5B88\uFF1A\u9700\u8981\u5E2E\u52A9\u8BF7\u8054\u7CFB\u56FE\u62C9
Spotify-cn(\u957F\u6309\u5FAE\u4FE1\u53F7\u53EF\u590D\u5236)
\u5728\u7EBF\u65F6\u95F4\uFF1A10:00-23:00`;
      return `<xml>
              <ToUserName><![CDATA[${fromUser}]]></ToUserName>
              <FromUserName><![CDATA[${eventData.ToUserName}]]></FromUserName>
              <CreateTime>${now}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${content}]]></Content>
            </xml>`;
    }
    return "success";
  } catch (err) {
    console.error("[WechatCallback] Error:", err);
    return "success";
  }
});

export { eventCallback as default };
//# sourceMappingURL=event-callback.mjs.map
