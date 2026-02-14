import { e as defineStore, l as useGlobalLoading, m as useCookie } from "../server.mjs";
import getSupabaseClient from "./supabase-Ds8OQlZJ.js";
import { ref, computed, readonly } from "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/nuxt/node_modules/hookable/dist/index.mjs";
import { f as favoriteApi } from "./common-CeIxTI3I.js";
import { useCartStore } from "./cart-Lqo8L2Wc.js";
function localizeAuthError(originalMsg) {
  if (!originalMsg) return "未知错误";
  const msg = originalMsg.toLowerCase();
  if (msg.includes("token has expired") || msg.includes("invalid token") || msg.includes("token is invalid")) {
    return "验证码已过期或无效";
  }
  if (msg.includes("invalid login credentials")) {
    return "账号或密码错误";
  }
  if (msg.includes("user not found") || msg.includes("invalid email")) {
    return "用户不存在或邮箱错误";
  }
  if (msg.includes("already registered")) {
    return "该邮箱已被注册";
  }
  if (msg.includes("password should be")) {
    return "密码长度或格式不符合要求";
  }
  if (msg.includes("too many requests") || msg.includes("rate limit")) {
    return "操作太频繁了，请稍后再试";
  }
  if (msg.includes("security purposes") && msg.includes("seconds")) {
    return "发送频率过高，请稍后再试";
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
    return { code: 0, msg: "登录成功", data, success: true };
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
    return { code: 0, msg: "验证码已发送到您的邮箱", success: true };
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
    return { code: 0, msg: "登录成功", data, success: true };
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
      return { code: 500, msg: "注册失败，无法创建会话", success: false };
    }
    const { error: updateError } = await client.auth.updateUser({
      password: params.password
    });
    if (updateError) {
      return { code: 500, msg: "密码设置失败: " + localizeAuthError(updateError.message), success: false };
    }
    return { code: 0, msg: "注册并登录成功", data, success: true };
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
      return { code: 500, msg: "密码重置失败: " + localizeAuthError(updateError.message), success: false };
    }
    return { code: 0, msg: "密码重置成功", success: true };
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
    const client = getSupabaseClient();
    const { data: { user }, error: authError } = await client.auth.getUser();
    if (authError || !user) {
      return { code: 401, msg: "未登录或登录已过期", success: false };
    }
    const { data: profile, error: profileError } = await client.from("profiles").select("*").eq("id", user.id).single();
    const adaptedUser = {
      id: user.id,
      uid: profile?.uid,
      // 新增：映射数据库中的 8 位数字 UID
      email: user.email,
      nickName: profile?.nickname || user.email?.split("@")[0],
      price: profile?.balance || 0,
      // 适配前端余额字段
      balance: profile?.balance || 0,
      // 兼容性字段，确保 checkout.vue 能读取到
      avatar: profile?.avatar || "",
      openId: profile?.wechat_openid || ""
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
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { data, error } = await client.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) return { code: 500, msg: localizeAuthError(error.message), success: false };
    return { code: 0, msg: "success", data: data || [], success: true };
  },
  /**
   * 【优化】获取钱包数据（余额 + 流水）合并接口
   */
  async getWalletData() {
    const client = getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { code: 401, msg: "未登录", success: false };
    const [profileRes, transRes] = await Promise.all([
      client.from("profiles").select("balance").eq("id", user.id).single(),
      client.from("wallet_transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
    ]);
    const balance = profileRes.data?.balance || 0;
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
      desc: item.bonus > 0 ? `送￥${item.bonus}` : "无优惠"
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
      return { code: 500, msg: resValue?.msg || "注销失败", success: false };
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
    if (!user) return { code: 401, msg: "未登录", success: false };
    const { error } = await client.from("profiles").update(updates).eq("id", user.id);
    if (error) {
      return { code: 500, msg: error.message, success: false };
    }
    return { code: 0, msg: "更新成功", success: true };
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
    return { code: 0, msg: "密码更新成功", success: true };
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
    return { code: 0, msg: "验证码已发送", success: true };
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
    return { code: 0, msg: "确认邮件已发送到新邮箱，请查收并点击确认链接", success: true };
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
    return { code: 0, msg: "验证成功", success: true };
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
      msg: data ? "邮箱可用" : "邮箱已被占用",
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
      return { code: 401, msg: "未登录", success: false };
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
      return { code: 401, msg: "未登录", success: false };
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
      return { code: 401, msg: "未登录", success: false };
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
  const token = useCookie("token");
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
      amount: "¥899.00",
      time: "2023-06-20 14:30",
      status: "pending",
      statusText: "待支付",
      statusClass: "pending"
    },
    {
      id: "2023061511122",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥3,599.00",
      time: "2023-06-15 10:15",
      status: "shipped",
      statusText: "已发货",
      statusClass: "shipped"
    },
    {
      id: "2023052817450",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "expired",
      statusText: "已过期",
      statusClass: "expired"
    },
    {
      id: "2023052817451",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "已完成",
      statusClass: "completed"
    },
    {
      id: "2023052817452",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "已完成",
      statusClass: "completed"
    },
    {
      id: "2023052817453",
      title: "XXXXXXXXXXXXXXXXX",
      amount: "¥2,499.00",
      time: "2023-05-28 17:45",
      status: "completed",
      statusText: "已完成",
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
      console.error("加载收藏失败", e);
    }
  };
  const addToFavorites = async (item) => {
    if (!token.value) return { success: false, message: "未登录" };
    try {
      const res = await favoriteApi.addFavorite(String(item.id));
      if (res.code === 0) {
        await loadFavorites();
        return { success: true, message: "添加收藏成功" };
      }
      return { success: false, message: res.msg || "添加收藏失败" };
    } catch (e) {
      return { success: false, message: "添加收藏失败" };
    }
  };
  const removeFromFavorites = async (itemId) => {
    if (!token.value) return { success: false, message: "未登录" };
    try {
      const fav = favorites.value.find((f) => f.id == itemId);
      if (!fav || !fav.favId) {
        return { success: false, message: "未找到该收藏记录" };
      }
      const res = await favoriteApi.removeFavorite(String(fav.favId));
      if (res.code === 0) {
        await loadFavorites();
        return { success: true, message: "取消收藏成功" };
      }
      return { success: false, message: res.msg || "取消收藏失败" };
    } catch (e) {
      return { success: false, message: "取消收藏失败" };
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
      amount: typeof orderData.amount === "number" ? `¥${orderData.amount.toFixed(2)}` : orderData.amount,
      time: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "completed",
      statusText: "已完成",
      statusClass: "completed",
      payType: orderData.payType,
      productImage: orderData.productImage
    };
    orders.value.unshift(newOrder);
    console.log("✅ 新订单已添加到列表顶部:", newOrder);
    return { success: true, order: newOrder };
  };
  const getOrders = () => {
    return orders.value;
  };
  const getOrdersByStatus = (status) => {
    if (!status || status === "全部") {
      return orders.value;
    }
    const statusMap = {
      "待支付": "pending",
      "待发货": "shipped",
      "已发货": "shipped",
      "已完成": "completed",
      "已过期": "expired"
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
      console.error("获取未读消息数失败", error);
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
      console.error("获取用户信息失败:", error);
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
      return { success: false, message: error.message || "登录失败" };
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
      return { success: false, message: error.message || "注册失败" };
    }
  };
  const logout = async () => {
    try {
      if (token.value) {
        showLoading("正在退出...");
        await authApi.logout();
      }
    } catch (error) {
      console.error("登出失败:", error);
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
        return { success: false, message: "两次密码输入不一致" };
      }
      const response = await authApi.updatePassword(params.newPassword);
      if (response.success) {
        return { success: true, message: "密码修改成功" };
      }
      return { success: false, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "修改密码失败" };
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
      return { success: false, message: error.message || "更新失败" };
    }
  };
  const sendEmailCode = async (email) => {
    try {
      const response = await authApi.getEmailCode(email);
      return { success: response.success, message: response.msg };
    } catch (error) {
      return { success: false, message: error.message || "发送验证码失败" };
    }
  };
  const resetPassword = async (params) => {
    try {
      console.warn("重置密码功能暂未实现 (API binding pending)");
      return { success: false, message: "功能暂未开放" };
    } catch (error) {
      return { success: false, message: error.message || "重置密码失败" };
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
        console.warn("获取用户信息失败，可能需要重新登录:", error);
      }
    }
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
export {
  authApi as a,
  messageApi as m,
  useUserStore as u
};
//# sourceMappingURL=user-B9FaDvHc.js.map
