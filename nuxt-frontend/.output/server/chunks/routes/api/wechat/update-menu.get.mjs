import { d as defineEventHandler, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const config = useRuntimeConfig();
const appid = config.wechatAppid || config.public.wechatAppid;
const secret = config.wechatAppSecret;
const updateMenu_get = defineEventHandler(async (event) => {
  try {
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return { success: false, message: "Failed to get access token", error: tokenData };
    }
    const menuData = {
      button: [
        {
          name: "\u5F00\u59CB\u4F7F\u7528",
          sub_button: [
            {
              type: "view",
              name: "\u8FDB\u5165\u56FE\u62C9",
              url: "https://www.fantula.com/mobile"
            },
            {
              type: "view",
              name: "\u6211\u7684\u56FE\u62C9",
              url: "https://www.fantula.com/mobile/profile/account"
            }
          ]
        },
        {
          name: "\u670D\u52A1\u4E2D\u5FC3",
          sub_button: [
            {
              type: "click",
              name: "\u8054\u7CFB\u5BA2\u670D",
              key: "MENU_CONTACT_SUPPORT"
            },
            {
              type: "view",
              name: "\u5E2E\u52A9\u6587\u6863",
              url: "https://www.fantula.com/mobile/help"
            }
          ]
        },
        {
          type: "view",
          name: "\u767B\u5F55\u65E7\u7248",
          url: "https://en.jjhezu.com/pages/login/login"
        }
      ]
    };
    const createMenuUrl = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${tokenData.access_token}`;
    const createRes = await fetch(createMenuUrl, {
      method: "POST",
      body: JSON.stringify(menuData),
      headers: { "Content-Type": "application/json" }
    });
    const createResult = await createRes.json();
    return {
      success: createResult.errcode === 0,
      result: createResult,
      menu: menuData
    };
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
});

export { updateMenu_get as default };
//# sourceMappingURL=update-menu.get.mjs.map
