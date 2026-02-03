import { h as defineStore, E as useCookie } from './server.mjs';
import { a as authApi } from './auth-BCuS92ob.mjs';
import { ref, computed, readonly } from 'file:///Users/dalin/fantula/nuxt-frontend/node_modules/vue/index.mjs';
import { favoriteApi } from './common-DNRu9xdu.mjs';
import getSupabaseClient from './supabase-jxF0-7J3.mjs';
import { u as useCartStore } from './cart-D8FaBhjU.mjs';

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
        await authApi.logout();
      }
    } catch (error) {
      console.error("\u767B\u51FA\u5931\u8D25:", error);
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
      console.warn("\u91CD\u7F6E\u5BC6\u7801\u529F\u80FD\u6682\u672A\u5B9E\u73B0\uFF0C\u4F7F\u7528\u6A21\u62DF\u8FD4\u56DE");
      return { success: true };
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
      nickname: "\u5F00\u53D1\u7528\u6237",
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
    console.log("\u{1F680} \u6A21\u62DF\u767B\u5F55\u6210\u529F\uFF01\u7528\u6237\u4FE1\u606F:", mockUser);
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

export { messageApi as m, useUserStore as u };
//# sourceMappingURL=user-CzJGyf4T.mjs.map
