import getSupabaseClient from "./supabase-jxF0-7J3.js";
import { b as useRuntimeConfig } from "../server.mjs";
const BASE_URL = "/api/wechat";
const wechatLoginApi = {
  /**
   * 获取微信扫码登录二维码（PC端用）
   */
  async getLoginQrCode() {
    try {
      const response = await $fetch(
        `${BASE_URL}/login-qrcode`
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
        msg: err.data?.message || err.message || "获取二维码失败",
        data: void 0
      };
    }
  },
  /**
   * 轮询扫码状态（PC端用）
   */
  async checkScanStatus(sceneStr) {
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
        msg: err.data?.message || err.message || "查询状态失败",
        data: void 0
      };
    }
  },
  /**
   * 移动端微信 OAuth 登录
   */
  async oauthLogin(code, options) {
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
        msg: err.data?.message || err.message || "登录失败",
        data: void 0
      };
    }
  },
  /**
   * 绑定微信到邮箱账号（配合 bindToken 使用）
   */
  async bindWechatToEmail(params) {
    try {
      const client = getSupabaseClient();
      const { data: { session } } = await client.auth.getSession();
      const token = session?.access_token;
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
        msg: response.message || "绑定成功",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: err.data?.message || err.message || "绑定失败",
        data: void 0
      };
    }
  },
  /**
   * 已登录用户绑定微信（移动端 wechatCode 或 PC端 bindToken）
   */
  async bindWechatToAccount(params) {
    try {
      const client = getSupabaseClient();
      const { data: { session } } = await client.auth.getSession();
      const token = session?.access_token;
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
        msg: response.message || "绑定成功",
        data: response.data
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        msg: err.data?.message || err.message || "绑定失败",
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
export {
  wechatLoginApi as w
};
//# sourceMappingURL=wechat-login-WH-GLTWF.js.map
