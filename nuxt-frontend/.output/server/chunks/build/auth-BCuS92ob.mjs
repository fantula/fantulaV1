import getSupabaseClient from './supabase-jxF0-7J3.mjs';

function localizeAuthError(originalMsg) {
  if (!originalMsg) return "\u672A\u77E5\u9519\u8BEF";
  const msg = originalMsg.toLowerCase();
  if (msg.includes("token has expired") || msg.includes("invalid token") || msg.includes("token is invalid")) {
    return "\u9A8C\u8BC1\u7801\u5DF2\u8FC7\u671F\u6216\u65E0\u6548";
  }
  if (msg.includes("invalid login credentials")) {
    return "\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF";
  }
  if (msg.includes("user not found") || msg.includes("invalid email")) {
    return "\u7528\u6237\u4E0D\u5B58\u5728\u6216\u90AE\u7BB1\u9519\u8BEF";
  }
  if (msg.includes("already registered")) {
    return "\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u6CE8\u518C";
  }
  if (msg.includes("password should be")) {
    return "\u5BC6\u7801\u957F\u5EA6\u6216\u683C\u5F0F\u4E0D\u7B26\u5408\u8981\u6C42";
  }
  if (msg.includes("too many requests") || msg.includes("rate limit")) {
    return "\u64CD\u4F5C\u592A\u9891\u7E41\u4E86\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
  }
  return originalMsg;
}
const authApi = {
  /**
    * 用户登录 (Supabase 密码版)
    * @param params 登录参数
    */
  async login(params) {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({
      email: params.email,
      password: params.password
    });
    if (error) {
      return { code: 500, msg: localizeAuthError(error.message), success: false };
    }
    return { code: 0, msg: "\u767B\u5F55\u6210\u529F", data, success: true };
  },
  /**
   * 发送邮箱 OTP 验证码 (Supabase版)
   * @param email 邮箱地址
   */
  async getEmailCode(email) {
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
        // 自动注册
      }
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u5230\u60A8\u7684\u90AE\u7BB1", success: true };
  },
  /**
   * 验证邮箱 OTP 登录 (Supabase版)
   * @param email 邮箱
   * @param token 验证码
   */
  async loginWithCode(params) {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.verifyOtp({
      email: params.email,
      token: params.code,
      type: "email"
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u767B\u5F55\u6210\u529F", data, success: true };
  },
  /**
   * 注册 (验证码 + 密码)
   * 1. 验证 OTP (自动登录)
   * 2. 设置密码
   */
  async registerWithCodeAndPassword(params) {
    const client = getSupabaseClient();
    const { data, error: verifyError } = await client.auth.verifyOtp({
      email: params.email,
      token: params.code,
      type: "email"
    });
    if (verifyError) {
      return { code: 400, msg: localizeAuthError(verifyError.message), success: false };
    }
    if (!data.user) {
      return { code: 500, msg: "\u6CE8\u518C\u5931\u8D25\uFF0C\u65E0\u6CD5\u521B\u5EFA\u4F1A\u8BDD", success: false };
    }
    const { error: updateError } = await client.auth.updateUser({
      password: params.password
    });
    if (updateError) {
      return { code: 500, msg: "\u5BC6\u7801\u8BBE\u7F6E\u5931\u8D25: " + localizeAuthError(updateError.message), success: false };
    }
    return { code: 0, msg: "\u6CE8\u518C\u5E76\u767B\u5F55\u6210\u529F", data, success: true };
  },
  /**
   * 重置密码 (OTP flow)
   */
  async resetPasswordWithOtp(params) {
    const client = getSupabaseClient();
    const { error: verifyError } = await client.auth.verifyOtp({
      email: params.email,
      token: params.code,
      type: "email"
    });
    if (verifyError) {
      return { code: 400, msg: localizeAuthError(verifyError.message), success: false };
    }
    const { error: updateError } = await client.auth.updateUser({
      password: params.password
    });
    if (updateError) {
      return { code: 500, msg: "\u5BC6\u7801\u91CD\u7F6E\u5931\u8D25: " + localizeAuthError(updateError.message), success: false };
    }
    return { code: 0, msg: "\u5BC6\u7801\u91CD\u7F6E\u6210\u529F", success: true };
  },
  // TODO: 待后端实现用户注册功能
  // /**
  //  * 用户注册
  //  * @param params 注册参数
  //  */
  // register(params: {
  //   username: string
  //   password: string
  //   email: string
  //   confirmPassword: string
  //   code?: string
  // }): Promise<ApiResponse<LoginResponse>> {
  //   return http.post('/product/auth/register', params)
  // },
  /**
   * 用户退出登录 (Supabase版)
   */
  async logout() {
    const client = getSupabaseClient();
    const { error } = await client.auth.signOut();
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  },
  /**
   * 获取当前用户信息 (Supabase版)
   */
  async getUserInfo() {
    var _a;
    const client = getSupabaseClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) {
      return { code: 401, msg: "\u672A\u767B\u5F55\u6216\u767B\u5F55\u5DF2\u8FC7\u671F", success: false };
    }
    const { data: profile, error: profileError } = await client.from("profiles").select("*").eq("id", user.id).single();
    const adaptedUser = {
      id: user.id,
      uid: profile == null ? void 0 : profile.uid,
      // 新增：映射数据库中的 8 位数字 UID
      email: user.email,
      nickName: (profile == null ? void 0 : profile.nickname) || ((_a = user.email) == null ? void 0 : _a.split("@")[0]),
      price: (profile == null ? void 0 : profile.balance) || 0,
      // 适配前端余额字段
      balance: (profile == null ? void 0 : profile.balance) || 0,
      // 兼容性字段，确保 checkout.vue 能读取到
      avatar: (profile == null ? void 0 : profile.avatar) || "",
      openId: (profile == null ? void 0 : profile.wechat_openid) || ""
      // 映射微信OpenID
    };
    return { code: 0, msg: "success", data: adaptedUser, success: true };
  },
  /**
   * 获取钱包流水明细
   */
  async getWalletTransactions() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { data, error } = await client.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) return { code: 500, msg: localizeAuthError(error.message), success: false };
    return { code: 0, msg: "success", data: data || [], success: true };
  },
  /**
   * 【优化】获取钱包数据（余额 + 流水）合并接口
   */
  async getWalletData() {
    var _a;
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const [profileRes, transRes] = await Promise.all([
      client.from("profiles").select("balance").eq("id", user.id).single(),
      client.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
    ]);
    const balance = ((_a = profileRes.data) == null ? void 0 : _a.balance) || 0;
    const transactions = transRes.data || [];
    return {
      code: 0,
      msg: "success",
      data: { balance, transactions },
      success: true
    };
  },
  /**
   * 获取已启用的充值档位（供客户端使用）
   */
  async getActiveTiers() {
    const client = getSupabaseClient();
    const { data, error } = await client.from("recharge_tiers").select("amount, bonus, sort_order").eq("status", "on").order("sort_order", { ascending: true });
    if (error) {
      return { code: 500, msg: localizeAuthError(error.message), data: [], success: false };
    }
    const adapted = (data || []).map((item) => ({
      value: Number(item.amount),
      desc: item.bonus > 0 ? `\u9001\uFFE5${item.bonus}` : "\u65E0\u4F18\u60E0"
    }));
    return { code: 0, msg: "success", data: adapted, success: true };
  },
  // TODO: 待后端实现token刷新功能
  // /**
  //  * 刷新token
  //  */
  // refreshToken(): Promise<ApiResponse<{ token: string }>> {
  //   return http.post('/product/auth/refresh')
  // },
  // TODO: 待后端实现密码修改功能
  // /**
  //  * 修改密码
  //  * @param params 密码参数
  //  */
  // changePassword(params: {
  //   oldPassword: string
  //   newPassword: string
  //   confirmPassword: string
  // }): Promise<ApiResponse<null>> {
  //   return http.post('/product/auth/change-password', params)
  // },
  // TODO: 待后端实现密码重置功能
  // /**
  //  * 重置密码
  //  * @param params 重置参数
  //  */
  // resetPassword(params: {
  //   email: string
  //   code: string
  //   newPassword: string
  //   confirmPassword: string
  // }): Promise<ApiResponse<null>> {
  //   return http.post('/product/auth/reset-password', params)
  // },
  // /**
  //  * 发送重置密码验证码
  //  * @param email 邮箱地址
  //  */
  // sendResetCode(email: string): Promise<ApiResponse<null>> {
  //   return http.post('/product/auth/send-reset-code', { email })
  // },
  /**
   * 删除当前用户账号 (RPC)
   */
  async deleteAccount() {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("delete_own_account");
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    const resValue = data;
    if (!resValue || !resValue.success) {
      return { code: 500, msg: (resValue == null ? void 0 : resValue.msg) || "\u6CE8\u9500\u5931\u8D25", success: false };
    }
    await client.auth.signOut();
    return { code: 0, msg: resValue.msg, success: true };
  },
  /**
   * 更新用户 Profile 信息 (如昵称、头像)
   */
  async updateProfile(updates) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    const { error } = await client.from("profiles").update(updates).eq("id", user.id);
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u66F4\u65B0\u6210\u529F", success: true };
  },
  /**
   * 更新密码 (需要登录状态)
   */
  async updatePassword(password) {
    const client = getSupabaseClient();
    const { error } = await client.auth.updateUser({ password });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u5BC6\u7801\u66F4\u65B0\u6210\u529F", success: true };
  },
  /**
   * 通用发送 OTP (用于敏感操作验证)
   */
  async sendOtp(email) {
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }
      // 仅限现有用户
    });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001", success: true };
  },
  /**
   * 更新用户邮箱 (安全方式)
   * 调用此方法后，Supabase 会自动向新邮箱发送确认链接
   */
  async updateEmail(newEmail) {
    const client = getSupabaseClient();
    const { error } = await client.auth.updateUser({ email: newEmail });
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "\u786E\u8BA4\u90AE\u4EF6\u5DF2\u53D1\u9001\u5230\u65B0\u90AE\u7BB1\uFF0C\u8BF7\u67E5\u6536\u5E76\u70B9\u51FB\u786E\u8BA4\u94FE\u63A5", success: true };
  },
  /**
   * 验证 OTP (用于敏感操作前的二次确认)
   */
  async verifyOtp(email, code) {
    const client = getSupabaseClient();
    const { error } = await client.auth.verifyOtp({
      email,
      token: code,
      type: "email"
    });
    if (error) {
      return { code: 400, msg: localizeAuthError(error.message), success: false };
    }
    return { code: 0, msg: "\u9A8C\u8BC1\u6210\u529F", success: true };
  },
  /**
   * 检查邮箱是否可用 (是否已被注册)
   */
  async checkEmailAvailable(email) {
    const client = getSupabaseClient();
    const { data, error } = await client.rpc("check_email_available", { email_input: email });
    if (error) {
      return { code: 500, msg: error.message, data: false, success: false };
    }
    return {
      code: 0,
      msg: data ? "\u90AE\u7BB1\u53EF\u7528" : "\u90AE\u7BB1\u5DF2\u88AB\u5360\u7528",
      data,
      success: true
      // Fix: Always return true for success so UI can handle the 'false' data (occupied) case
    };
  }
};

export { authApi as a };
//# sourceMappingURL=auth-BCuS92ob.mjs.map
