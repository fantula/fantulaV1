import { e as defineStore, l as useGlobalLoading, m as useCookie } from './server.mjs';
import getSupabaseClient from './supabase-Ds8OQlZJ.mjs';
import { ref, computed, readonly } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { f as favoriteApi } from './common-CeIxTI3I.mjs';
import { useCartStore } from './cart-Lqo8L2Wc.mjs';

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
  if (msg.includes("security purposes") && msg.includes("seconds")) {
    return "\u53D1\u9001\u9891\u7387\u8FC7\u9AD8\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
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
const messageApi = {
  /**
   * Get paginated messages for the current user
   */
  async getMessages(page = 1, limit = 20) {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    }
    const offset = (page - 1) * limit;
    const { data, error, count } = await client.from("messages").select("*", { count: "exact" }).eq("user_id", user.id).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
    if (error) {
      console.error("getMessages error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return {
      code: 0,
      msg: "success",
      success: true,
      data: {
        messages: data || [],
        total: count || 0
      }
    };
  },
  /**
   * Get unread message count (for badge display)
   */
  async getUnreadCount() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    }
    const { count, error } = await client.from("messages").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("is_read", false);
    if (error) {
      console.error("getUnreadCount error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true, data: count || 0 };
  },
  /**
   * Mark a single message as read
   */
  async markAsRead(messageId) {
    const client = getSupabaseClient();
    const { error } = await client.from("messages").update({ is_read: true }).eq("id", messageId);
    if (error) {
      console.error("markAsRead error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  },
  /**
   * Mark all messages as read for the current user
   */
  async markAllAsRead() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) {
      return { code: 401, msg: "\u672A\u767B\u5F55", success: false };
    }
    const { error } = await client.from("messages").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    if (error) {
      console.error("markAllAsRead error:", error);
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "success", success: true };
  }
};
const useUserStore = defineStore("user", () => {
  const { show: showLoading, hide: hideLoading } = useGlobalLoading();
  const user = ref(null);
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 30 });
  const loading = ref(false);
  const isLoggedIn = computed(() => !!token.value && !!user.value);
  const unreadMessageCount = ref(0);
  const favorites = ref([]);
  const orders = ref([]);
  const transactions = ref([]);
  const fetchWalletData = async () => {
    try {
      const res = await authApi.getWalletData();
      if (res.success && res.data) {
        if (res.data.balance !== void 0 && user.value) {
          user.value.balance = res.data.balance;
        }
        transactions.value = res.data.transactions || [];
      }
    } catch (e) {
      console.error("Fetch wallet data failed", e);
    }
  };
  const defaultOrders = [
    // ... (keep default orders content) ...
    {
      id: "2023062012340",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "\xA5899.00",
      time: "2023-06-20 14:30",
      status: "pending",
      statusText: "\u5F85\u652F\u4ED8",
      statusClass: "pending"
    },
    {
      id: "2023061511122",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "\xA53,599.00",
      time: "2023-06-15 10:15",
      status: "shipped",
      statusText: "\u5DF2\u53D1\u8D27",
      statusClass: "shipped"
    },
    {
      id: "2023052817450",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "\xA52,499.00",
      time: "2023-05-28 17:45",
      status: "expired",
      statusText: "\u5DF2\u8FC7\u671F",
      statusClass: "expired"
    },
    {
      id: "2023052817451",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "\xA52,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "\u5DF2\u5B8C\u6210",
      statusClass: "completed"
    },
    {
      id: "2023052817452",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "\xA52,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "\u5DF2\u5B8C\u6210",
      statusClass: "completed"
    },
    {
      id: "2023052817453",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "\xA52,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "\u5DF2\u5B8C\u6210",
      statusClass: "completed"
    }
  ];
  const loadFavorites = async () => {
    if (!token.value) return;
    try {
      const res = await favoriteApi.getFavoritesData();
      if (res.success && res.data && Array.isArray(res.data.favorites)) {
        favorites.value = res.data.favorites.map((item) => ({
          favId: item.id,
          // Real Supabase ID (UUID)
          id: item.productId,
          // Display ID (Product ID) to match frontend usage
          name: item.productName,
          image: item.productImage,
          desc: "",
          region: "",
          quality: "",
          devices: "",
          download: "",
          prices: [],
          hot: false,
          addTime: item.createdAt
        }));
      }
    } catch (e) {
      console.error("\u52A0\u8F7D\u6536\u85CF\u5931\u8D25", e);
    }
  };
  const addToFavorites = async (item) => {
    if (!token.value) return { success: false, message: "\u672A\u767B\u5F55" };
    try {
      const res = await favoriteApi.addFavorite(String(item.id));
      if (res.code === 0) {
        await loadFavorites();
        return { success: true, message: "\u6DFB\u52A0\u6536\u85CF\u6210\u529F" };
      }
      return { success: false, message: res.msg || "\u6DFB\u52A0\u6536\u85CF\u5931\u8D25" };
    } catch (e) {
      return { success: false, message: "\u6DFB\u52A0\u6536\u85CF\u5931\u8D25" };
    }
  };
  const removeFromFavorites = async (itemId) => {
    if (!token.value) return { success: false, message: "\u672A\u767B\u5F55" };
    try {
      const fav = favorites.value.find((f) => f.id == itemId);
      if (!fav || !fav.favId) {
        return { success: false, message: "\u672A\u627E\u5230\u8BE5\u6536\u85CF\u8BB0\u5F55" };
      }
      const res = await favoriteApi.removeFavorite(String(fav.favId));
      if (res.code === 0) {
        await loadFavorites();
        return { success: true, message: "\u53D6\u6D88\u6536\u85CF\u6210\u529F" };
      }
      return { success: false, message: res.msg || "\u53D6\u6D88\u6536\u85CF\u5931\u8D25" };
    } catch (e) {
      return { success: false, message: "\u53D6\u6D88\u6536\u85CF\u5931\u8D25" };
    }
  };
  const checkIsFavorite = (itemId) => {
    return favorites.value.some((fav) => fav.id === itemId);
  };
  const loadOrders = () => {
  };
  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.orderId,
      title: orderData.title,
      amount: typeof orderData.amount === "number" ? `\xA5${orderData.amount.toFixed(2)}` : orderData.amount,
      time: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "completed",
      statusText: "\u5DF2\u5B8C\u6210",
      statusClass: "completed",
      payType: orderData.payType,
      productImage: orderData.productImage
    };
    orders.value.unshift(newOrder);
    console.log("\u2705 \u65B0\u8BA2\u5355\u5DF2\u6DFB\u52A0\u5230\u5217\u8868\u9876\u90E8:", newOrder);
    return { success: true, order: newOrder };
  };
  const getOrders = () => {
    return orders.value;
  };
  const getOrdersByStatus = (status) => {
    if (!status || status === "\u5168\u90E8") {
      return orders.value;
    }
    const statusMap = {
      "\u5F85\u652F\u4ED8": "pending",
      "\u5F85\u53D1\u8D27": "shipped",
      "\u5DF2\u53D1\u8D27": "shipped",
      "\u5DF2\u5B8C\u6210": "completed",
      "\u5DF2\u8FC7\u671F": "expired"
    };
    const targetStatus = statusMap[status] || status;
    return orders.value.filter((order) => order.status === targetStatus);
  };
  const clearOrders = () => {
    orders.value = [...defaultOrders];
  };
  const getFavorites = () => {
    return favorites.value;
  };
  const clearFavorites = () => {
    favorites.value = [];
  };
  const fetchUnreadMessageCount = async () => {
    if (!user.value) return;
    try {
      const res = await messageApi.getUnreadCount();
      if (res.success && typeof res.data === "number") {
        unreadMessageCount.value = res.data;
      }
    } catch (error) {
      console.error("\u83B7\u53D6\u672A\u8BFB\u6D88\u606F\u6570\u5931\u8D25", error);
    }
  };
  const fetchUserInfo = async () => {
    try {
      if (!token.value) return;
      loading.value = true;
      const response = await authApi.getUserInfo();
      if (response.success) {
        user.value = response.data;
        if (false) ;
        fetchUnreadMessageCount();
      }
    } catch (error) {
      console.error("\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25:", error);
      token.value = null;
      user.value = null;
    } finally {
      loading.value = false;
    }
  };
  const login = async (params) => {
    try {
      const response = await authApi.login(params);
      if (response.success) {
        token.value = response.data.token;
        user.value = response.data.user;
        if (false) ;
        loadFavorites();
        loadOrders();
        fetchUnreadMessageCount();
        const cartStore = useCartStore();
        await cartStore.initCart();
        return { success: true, data: response.data };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "\u767B\u5F55\u5931\u8D25" };
    }
  };
  const register = async (params) => {
    try {
      const response = await authApi.loginWithCode({
        email: params.email,
        code: params.code || ""
      });
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "\u6CE8\u518C\u5931\u8D25" };
    }
  };
  const logout = async () => {
    try {
      if (token.value) {
        showLoading("\u6B63\u5728\u9000\u51FA...");
        await authApi.logout();
      }
    } catch (error) {
      console.error("\u767B\u51FA\u5931\u8D25:", error);
    } finally {
      setTimeout(() => {
        hideLoading();
      }, 500);
      token.value = null;
      user.value = null;
      favorites.value = [];
      orders.value = [...defaultOrders];
      unreadMessageCount.value = 0;
      const cartStore = useCartStore();
      cartStore.items = [];
      cartStore.miniCartVisible = false;
    }
  };
  const changePassword = async (params) => {
    try {
      if (params.newPassword !== params.confirmPassword) {
        return { success: false, message: "\u4E24\u6B21\u5BC6\u7801\u8F93\u5165\u4E0D\u4E00\u81F4" };
      }
      const response = await authApi.updatePassword(params.newPassword);
      if (response.success) {
        return { success: true, message: "\u5BC6\u7801\u4FEE\u6539\u6210\u529F" };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "\u4FEE\u6539\u5BC6\u7801\u5931\u8D25" };
    }
  };
  const updateProfile = async (updates) => {
    try {
      const response = await authApi.updateProfile(updates);
      if (response.success) {
        if (user.value) {
          if (updates.nickname) user.value.nickName = updates.nickname;
          if (updates.avatar) user.value.avatar = updates.avatar;
        }
        return { success: true };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "\u66F4\u65B0\u5931\u8D25" };
    }
  };
  const sendEmailCode = async (email) => {
    try {
      const response = await authApi.getEmailCode(email);
      return { success: response.success, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25" };
    }
  };
  const resetPassword = async (params) => {
    try {
      console.warn("\u91CD\u7F6E\u5BC6\u7801\u529F\u80FD\u6682\u672A\u5B9E\u73B0 (API binding pending)");
      return { success: false, message: "\u529F\u80FD\u6682\u672A\u5F00\u653E" };
    } catch (error) {
      return { success: false, message: error.message || "\u91CD\u7F6E\u5BC6\u7801\u5931\u8D25" };
    }
  };
  const init = async () => {
    loadFavorites();
    const cartStore = useCartStore();
    await cartStore.initCart();
    if (token.value) {
      try {
        await fetchUserInfo();
      } catch (error) {
        console.warn("\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25\uFF0C\u53EF\u80FD\u9700\u8981\u91CD\u65B0\u767B\u5F55:", error);
      }
    }
  };
  const restoreSessionFromSupabase = async () => {
    return false;
  };
  const setUser = (userInfo, tokenValue) => {
    user.value = userInfo;
    if (tokenValue) {
      token.value = tokenValue;
    }
    loadFavorites();
    fetchUnreadMessageCount();
    const cartStore = useCartStore();
    cartStore.initCart();
  };
  return {
    // 状态
    user: readonly(user),
    isLoggedIn,
    loading: readonly(loading),
    favorites: readonly(favorites),
    orders: readonly(orders),
    unreadMessageCount: readonly(unreadMessageCount),
    // 导出未读消息数
    // 方法
    login,
    register,
    logout,
    changePassword,
    updateProfile,
    sendEmailCode,
    resetPassword,
    fetchUserInfo,
    init,
    restoreSessionFromSupabase,
    // Export new action
    setUser,
    fetchUnreadMessageCount,
    // 导出获取方法
    // 收藏相关方法
    addToFavorites,
    removeFromFavorites,
    checkIsFavorite,
    getFavorites,
    clearFavorites,
    loadFavorites,
    // 额度变动相关
    transactions: readonly(transactions),
    fetchWalletData,
    // 订单相关方法
    addOrder,
    getOrders,
    getOrdersByStatus,
    clearOrders,
    loadOrders
  };
});

export { authApi as a, messageApi as m, useUserStore as u };
//# sourceMappingURL=user-DLDq0pTF.mjs.map
