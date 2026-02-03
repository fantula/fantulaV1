import { h as defineStore, E as useCookie } from "../server.mjs";
import { a as authApi } from "./auth-BCuS92ob.js";
import { ref, computed, readonly } from "vue";
import "/Users/dalin/fantula/nuxt-frontend/node_modules/hookable/dist/index.mjs";
import { favoriteApi } from "./common-DNRu9xdu.js";
import getSupabaseClient from "./supabase-jxF0-7J3.js";
import { u as useCartStore } from "./cart-D8FaBhjU.js";
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
        await authApi.logout();
      }
    } catch (error) {
      console.error("登出失败:", error);
    } finally {
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
      console.warn("重置密码功能暂未实现，使用模拟返回");
      return { success: true };
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
  const mockLogin = () => {
    const mockUser = {
      id: "145e6b60-03db-47f0-a812-41a257e04468",
      uid: "88888888",
      username: "dev_user",
      nickname: "开发用户",
      email: "admin@fantula.com",
      status: 1,
      createTime: (/* @__PURE__ */ new Date()).toISOString(),
      updateTime: (/* @__PURE__ */ new Date()).toISOString(),
      balance: 5888.5
    };
    const mockToken = "mock_token_" + Date.now();
    user.value = mockUser;
    token.value = mockToken;
    loadFavorites();
    unreadMessageCount.value = 5;
    const cartStore = useCartStore();
    cartStore.initCart();
    console.log("🚀 模拟登录成功！用户信息:", mockUser);
    return { success: true, data: { user: mockUser, token: mockToken } };
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
    mockLogin,
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
  messageApi as m,
  useUserStore as u
};
//# sourceMappingURL=user-CzJGyf4T.js.map
