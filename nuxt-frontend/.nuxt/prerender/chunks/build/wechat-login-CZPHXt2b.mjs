import getSupabaseClient from './supabase-F2pQZHm6.mjs';
import { j as useRuntimeConfig } from './server.mjs';

const BASE_URL = "/api/wechat";
const wechatLoginApi = {
  /**
   * 获取微信扫码登录二维码（PC端用）
   */
  async getLoginQrCode() {
    var _a, _b;
    try {
      const response = await $fetch(
        `${BASE_URL}/login-qrcode`
      );
      console.log("\u{1F534} [PC Stage 1] Ticket:", ((_a = response.data) == null ? void 0 : _a.ticket) ? "Received" : "Empty");
      return {
        code: 0,
        success: true,
        msg: "success",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: ((_b = err.data) == null ? void 0 : _b.message) || err.message || "\u83B7\u53D6\u4E8C\u7EF4\u7801\u5931\u8D25",
        data: void 0
      };
    }
  },
  /**
   * 轮询扫码状态（PC端用）
   */
  async checkScanStatus(sceneStr) {
    var _a;
    try {
      const response = await $fetch(
        `${BASE_URL}/check-scan`,
        { query: { scene: sceneStr } }
      );
      return {
        code: 0,
        success: true,
        msg: "success",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: ((_a = err.data) == null ? void 0 : _a.message) || err.message || "\u67E5\u8BE2\u72B6\u6001\u5931\u8D25",
        data: void 0
      };
    }
  },
  /**
   * 移动端微信 OAuth 登录
   */
  async oauthLogin(code, options) {
    var _a;
    try {
      const response = await $fetch(
        `${BASE_URL}/oauth-login`,
        {
          method: "POST",
          body: { code, ...options }
        }
      );
      return {
        code: 0,
        success: true,
        msg: "success",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: ((_a = err.data) == null ? void 0 : _a.message) || err.message || "\u767B\u5F55\u5931\u8D25",
        data: void 0
      };
    }
  },
  /**
   * 绑定微信到邮箱账号（配合 bindToken 使用）
   */
  async bindWechatToEmail(params) {
    var _a;
    try {
      const client = getSupabaseClient();
      const { data: { session } } = await client.auth.getSession();
      const token = session == null ? void 0 : session.access_token;
      const response = await $fetch(
        "/api/auth/bind-wechat",
        {
          method: "POST",
          body: params,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      return {
        code: 0,
        success: true,
        msg: response.message || "\u7ED1\u5B9A\u6210\u529F",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: ((_a = err.data) == null ? void 0 : _a.message) || err.message || "\u7ED1\u5B9A\u5931\u8D25",
        data: void 0
      };
    }
  },
  /**
   * 已登录用户绑定微信（移动端 wechatCode 或 PC端 bindToken）
   */
  async bindWechatToAccount(params) {
    var _a;
    try {
      const client = getSupabaseClient();
      const { data: { session } } = await client.auth.getSession();
      const token = session == null ? void 0 : session.access_token;
      const response = await $fetch(
        "/api/auth/bind-wechat",
        {
          method: "POST",
          body: params,
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      return {
        code: 0,
        success: true,
        msg: response.message || "\u7ED1\u5B9A\u6210\u529F",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: ((_a = err.data) == null ? void 0 : _a.message) || err.message || "\u7ED1\u5B9A\u5931\u8D25",
        data: void 0
      };
    }
  },
  /**
   * 生成微信 OAuth 授权 URL（移动端用）
   */
  getOAuthUrl(redirectUri, state = "login") {
    const config = useRuntimeConfig();
    const appid = config.public.wechatAppid || "";
    const encodedUri = encodeURIComponent(redirectUri);
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodedUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
  }
};

export { wechatLoginApi as w };
//# sourceMappingURL=wechat-login-CZPHXt2b.mjs.map
