import { defineStore } from 'pinia'
import type { User, LoginParams } from '@/types/api'
import { authApi } from '@/api/client/auth'
import { clientOrderApi as orderApi } from '@/api/client/order' // Use modern API
import { favoriteApi } from '@/api/client/common'
import { messageApi } from '@/api/client/message'
import { useGlobalLoading } from '@/composables/useGlobalLoading'

// ... (keep interface definitions) ...

// 定义收藏商品类型
interface FavoriteItem {
  id: number | string // Allow string | number for product ID
  favId?: string // Real favorite ID from Supabase
  name: string
  image: string
  desc?: string
  region?: string
  quality?: string
  devices?: string
  download?: string
  prices?: { label: string; value: string }[]
  hot?: boolean
  addTime: string
}

// 定义订单类型
interface OrderItem {
  id: string
  title: string
  amount: string
  time: string
  status: 'pending' | 'shipped' | 'completed' | 'expired' | 'cancelled'
  statusText: string
  statusClass: string
  payType?: string
  productImage?: string
}

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', () => {
  // Global Loading
  const { show: showLoading, hide: hideLoading, success: showSuccess } = useGlobalLoading()

  // 状态
  const user = ref<User | null>(null)
  const token = useCookie('token')
  const loading = ref(false) // 加载状态，用于骨架屏显示
  const isLoggedIn = computed(() => !!token.value && !!user.value)

  // 消息相关状态
  const unreadMessageCount = ref(0)

  // 收藏相关状态
  const favorites = ref<FavoriteItem[]>([])
  const favoritesKey = 'user_favorites'

  // ... (keep rest of state) ...
  const orders = ref<OrderItem[]>([])
  const ordersKey = 'user_orders'

  // ... (keep defaultOrders) ...
  // ... (keep defaultOrders) ...
  const transactions = ref<any[]>([])

  const fetchWalletData = async () => {
    try {
      const res = await authApi.getWalletData()
      if (res.success && res.data) {
        // Update balance if returned (optional, depends on API)
        if (res.data.balance !== undefined && user.value) {
          user.value.balance = res.data.balance
        }
        transactions.value = res.data.transactions || []
      }
    } catch (e) {
      console.error('Fetch wallet data failed', e)
    }
  }

  const defaultOrders: OrderItem[] = [
    // ... (keep default orders content) ...
    {
      id: '2023062012340',
      title: 'XXXXXXXXXXXXXXXXX',
      amount: '¥899.00',
      time: '2023-06-20 14:30',
      status: 'pending',
      statusText: '待支付',
      statusClass: 'pending'
    },
    {
      id: '2023061511122',
      title: 'XXXXXXXXXXXXXXXXX',
      amount: '¥3,599.00',
      time: '2023-06-15 10:15',
      status: 'shipped',
      statusText: '已发货',
      statusClass: 'shipped'
    },
    {
      id: '2023052817450',
      title: 'XXXXXXXXXXXXXXXXX',
      amount: '¥2,499.00',
      time: '2023-05-28 17:45',
      status: 'expired',
      statusText: '已过期',
      statusClass: 'expired'
    },
    {
      id: '2023052817451',
      title: 'XXXXXXXXXXXXXXXXX',
      amount: '¥2,499.00',
      time: '2023-05-28 17:45',
      status: 'completed',
      statusText: '已完成',
      statusClass: 'completed'
    },
    {
      id: '2023052817452',
      title: 'XXXXXXXXXXXXXXXXX',
      amount: '¥2,499.00',
      time: '2023-05-28 17:45',
      status: 'completed',
      statusText: '已完成',
      statusClass: 'completed'
    },
    {
      id: '2023052817453',
      title: 'XXXXXXXXXXXXXXXXX',
      amount: '¥2,499.00',
      time: '2023-05-28 17:45',
      status: 'completed',
      statusText: '已完成',
      statusClass: 'completed'
    }
  ]
  // ... (keep rest of existing functions) ...

  // 收藏相关API实现
  const loadFavorites = async () => {
    if (!token.value) return // No token, no favorites
    try {
      // Use modern API
      const res = await favoriteApi.getFavoritesData()
      if (res.success && res.data && Array.isArray(res.data.favorites)) {
        favorites.value = res.data.favorites.map((item: any) => ({
          favId: item.id, // Real Supabase ID (UUID)
          id: item.productId, // Display ID (Product ID) to match frontend usage
          name: item.productName,
          image: item.productImage,
          desc: '',
          region: '',
          quality: '',
          devices: '',
          download: '',
          prices: [],
          hot: false,
          addTime: item.createdAt
        }))
      }
    } catch (e) {
      console.error('加载收藏失败', e)
    }
  }

  // ... (keep addToFavorites, removeFromFavorites, checkIsFavorite) ...
  const addToFavorites = async (item: Omit<FavoriteItem, 'addTime'>) => {
    if (!token.value) return { success: false, message: '未登录' }
    try {
      // item.id is productId
      const res = await favoriteApi.addFavorite(String(item.id))
      if (res.code === 0) {
        await loadFavorites()
        return { success: true, message: '添加收藏成功' }
      }
      return { success: false, message: res.msg || '添加收藏失败' }
    } catch (e) {
      return { success: false, message: '添加收藏失败' }
    }
  }

  const removeFromFavorites = async (itemId: number | string) => {
    if (!token.value) return { success: false, message: '未登录' }
    try {
      // Find the favorite item by productId (which is mapped to id)
      const fav = favorites.value.find((f: any) => f.id == itemId)
      if (!fav || !fav.favId) {
        return { success: false, message: '未找到该收藏记录' }
      }

      const res = await favoriteApi.removeFavorite(String(fav.favId))
      if (res.code === 0) {
        await loadFavorites()
        return { success: true, message: '取消收藏成功' }
      }
      return { success: false, message: res.msg || '取消收藏失败' }
    } catch (e) {
      return { success: false, message: '取消收藏失败' }
    }
  }

  const checkIsFavorite = (itemId: number) => {
    return favorites.value.some(fav => fav.id === itemId)
  }


  // 从本地存储加载订单数据
  const loadOrders = () => {
    if (process.client) {
      try {
        // 从API获取订单数据
        if (isLoggedIn.value) {
          fetchOrdersFromAPI()
        } else {
          orders.value = [...defaultOrders]
        }
      } catch (error) {
        console.error('加载订单数据失败:', error)
        orders.value = [...defaultOrders]
      }
    }
  }

  // ✅ 新增：从API获取订单数据
  const fetchOrdersFromAPI = async () => {
    try {
      if (!token.value) {
        orders.value = [...defaultOrders]
        return
      }

      const response = await orderApi.getOrderList({ limit: 50 })
      if (response.success && response.data) {
        // 转换API订单格式为前端格式
        const apiOrders = response.data.map((order: any) => ({
          id: order.order_no, // use order_no as id
          title: order.product_snapshot?.product_name || '未知商品',
          amount: `¥${order.total_amount?.toFixed(2) || '0.00'}`,
          time: order.created_at, // ISO string
          status: getOrderStatus(order.status),
          statusText: getOrderStatusText(order.status),
          statusClass: getOrderStatusClass(order.status),
          payType: '未知',
          productImage: order.product_snapshot?.image
        }))

        orders.value = [...apiOrders, ...defaultOrders]
      } else {
        orders.value = [...defaultOrders]
      }
    } catch (error) {
      console.error('获取订单列表失败:', error)
      orders.value = [...defaultOrders]
    }
  }

  // ... (keep getOrderStatus helpers) ...
  const getOrderStatus = (status: string | number): OrderItem['status'] => {
    // Handle both number (legacy) and string (new) status
    if (typeof status === 'number') {
      switch (status) {
        case 0: return 'pending'
        case 1: return 'shipped'
        case 2: return 'shipped'
        case 3: return 'completed'
        case 4: return 'completed'
        case 5: return 'cancelled'
        default: return 'expired'
      }
    }

    // String status from new API
    // 'pending' | 'pending_delivery' | 'active' | 'expired' | 'completed' | 'refunding' | 'refunded'
    switch (status) {
      case 'pending': return 'pending'
      case 'pending_delivery': return 'shipped' // or pending?
      case 'active': return 'completed' // active subscription is completed order
      case 'completed': return 'completed'
      case 'expired': return 'expired'
      case 'refunding': return 'cancelled'
      case 'refunded': return 'cancelled'
      default: return 'expired'
    }
  }

  const getOrderStatusText = (status: string | number): string => {
    if (typeof status === 'number') {
      switch (status) {
        case 0: return '待支付'
        case 1: return '已发货'
        case 2: return '已发货'
        case 3: return '已完成'
        case 4: return '已完成'
        case 5: return '已取消'
        default: return '已过期'
      }
    }

    switch (status) {
      case 'pending': return '待支付'
      case 'pending_delivery': return '待发货'
      case 'active': return '使用中'
      case 'completed': return '已完成'
      case 'expired': return '已过期'
      case 'refunding': return '退款中'
      case 'refunded': return '已退款'
      default: return '未知'
    }
  }

  const getOrderStatusClass = (status: string | number): string => {
    if (typeof status === 'number') {
      switch (status) {
        case 0: return 'pending'
        case 1: return 'shipped'
        case 2: return 'shipped'
        case 3: return 'completed'
        case 4: return 'completed'
        case 5: return 'cancelled'
        default: return 'expired'
      }
    }

    switch (status) {
      case 'pending': return 'pending'
      case 'pending_delivery': return 'shipped'
      case 'active': return 'completed'
      case 'completed': return 'completed'
      case 'expired': return 'expired'
      case 'refunding': return 'cancelled'
      case 'refunded': return 'cancelled'
      default: return 'expired'
    }
  }

  // ... (keep saveFavorites, saveOrders, addOrder, getOrders, getOrdersByStatus, clearOrders, getFavorites, clearFavorites) ...
  const saveFavorites = () => {
    if (process.client) {
      try {
        localStorage.setItem(favoritesKey, JSON.stringify(favorites.value))
      } catch (error) {
        console.error('保存收藏数据失败:', error)
      }
    }
  }

  const saveOrders = () => {
    if (process.client) {
      try {
        // 过滤出新增的订单（不在默认订单中的）
        const newOrders = orders.value.filter(order =>
          !defaultOrders.some(defaultOrder => defaultOrder.id === order.id)
        )
        localStorage.setItem(ordersKey, JSON.stringify(newOrders))
      } catch (error) {
        console.error('保存订单数据失败:', error)
      }
    }
  }

  const addOrder = (orderData: {
    orderId: string
    title: string
    amount: number | string
    payType: string
    productImage?: string
  }) => {
    const newOrder: OrderItem = {
      id: orderData.orderId,
      title: orderData.title,
      amount: typeof orderData.amount === 'number' ? `¥${orderData.amount.toFixed(2)}` : orderData.amount,
      time: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'completed',
      statusText: '已完成',
      statusClass: 'completed',
      payType: orderData.payType,
      productImage: orderData.productImage
    }

    orders.value.unshift(newOrder)
    saveOrders()

    console.log('✅ 新订单已添加到列表顶部:', newOrder)
    return { success: true, order: newOrder }
  }

  const getOrders = () => {
    return orders.value
  }

  const getOrdersByStatus = (status?: string) => {
    if (!status || status === '全部') {
      return orders.value
    }

    const statusMap: Record<string, string> = {
      '待支付': 'pending',
      '待发货': 'shipped',
      '已发货': 'shipped',
      '已完成': 'completed',
      '已过期': 'expired'
    }

    const targetStatus = statusMap[status] || status
    return orders.value.filter(order => order.status === targetStatus)
  }

  const clearOrders = () => {
    orders.value = [...defaultOrders]
    saveOrders()
  }

  const getFavorites = () => {
    return favorites.value
  }

  const clearFavorites = () => {
    favorites.value = []
    saveFavorites()
  }

  // 消息相关方法
  const fetchUnreadMessageCount = async () => {
    if (!user.value) return
    try {
      const res = await messageApi.getUnreadCount()
      if (res.success && typeof res.data === 'number') {
        unreadMessageCount.value = res.data
      }
    } catch (error) {
      console.error('获取未读消息数失败', error)
    }
  }

  const fetchUserInfo = async () => {
    try {
      if (!token.value) return
      loading.value = true
      const response = await authApi.getUserInfo()
      if (response.success) {
        user.value = response.data
        // Save to localStorage
        if (process.client) {
          localStorage.setItem('user_info', JSON.stringify(user.value))
        }
        // 获取用户信息成功后，顺便获取未读消息数
        fetchUnreadMessageCount()
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      token.value = null
      user.value = null
    } finally {
      loading.value = false
    }
  }

  // ... (keep login, register, logout, changePassword, sendEmailCode, resetPassword, init, setUser, mockLogin) ...
  const login = async (params: LoginParams) => {
    try {
      const response = await authApi.login(params)
      if (response.success) {
        token.value = response.data.token
        user.value = response.data.user
        if (process.client) {
          localStorage.setItem('user_info', JSON.stringify(user.value))
        }
        loadFavorites()
        loadOrders()
        fetchUnreadMessageCount() // 登录成功获取未读消息
        const cartStore = useCartStore()
        await cartStore.initCart()
        return { success: true, data: response.data }
      }
      return { success: false, message: response.msg }
    } catch (error: any) {
      return { success: false, message: error.message || '登录失败' }
    }
  }

  const register = async (params: {
    username: string
    password: string
    email: string
    confirmPassword: string
    code?: string
  }) => {
    try {
      const response = await authApi.loginWithCode({
        email: params.email,
        code: params.code || ''
      })
      if (response.success) {
        return { success: true, data: response.data }
      }
      return { success: false, message: response.msg }
    } catch (error: any) {
      return { success: false, message: error.message || '注册失败' }
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        // Show global loading for logout
        showLoading('正在退出...')
        await authApi.logout()
      }
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      // Ensure loading is hidden
      setTimeout(() => {
        hideLoading()
      }, 500)

      token.value = null
      user.value = null
      if (process.client) {
        localStorage.removeItem('user_info')
        localStorage.removeItem('wechat_openid') // 清除微信 OpenID 缓存
      }
      favorites.value = []
      orders.value = [...defaultOrders]
      unreadMessageCount.value = 0

      // 清空购物车状态
      const cartStore = useCartStore()
      cartStore.items = []
      cartStore.miniCartVisible = false
    }
  }

  const changePassword = async (params: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    try {
      // 1. Validate confirm password
      if (params.newPassword !== params.confirmPassword) {
        return { success: false, message: '两次密码输入不一致' }
      }

      // 2. Call API (Supabase directly updates password for logged in user)
      // Note: Ideally we verify oldPassword first, but Supabase standard flow for logged-in users 
      // often just requires the new password if the session is valid. 
      // If stricter security is needed, we would need a custom RPC or re-auth flow.
      const response = await authApi.updatePassword(params.newPassword)

      if (response.success) {
        return { success: true, message: '密码修改成功' }
      }
      return { success: false, message: response.msg }
    } catch (error: any) {
      return { success: false, message: error.message || '修改密码失败' }
    }
  }

  const updateProfile = async (updates: { nickname?: string; avatar?: string }) => {
    try {
      const response = await authApi.updateProfile(updates)
      if (response.success) {
        // Update local state immediately for better UX
        if (user.value) {
          if (updates.nickname) user.value.nickName = updates.nickname
          if (updates.avatar) user.value.avatar = updates.avatar
        }
        return { success: true }
      }
      return { success: false, message: response.msg }
    } catch (error: any) {
      return { success: false, message: error.message || '更新失败' }
    }
  }

  const sendEmailCode = async (email: string) => {
    try {
      const response = await authApi.getEmailCode(email)
      return { success: response.success, message: response.msg }
    } catch (error: any) {
      return { success: false, message: error.message || '发送验证码失败' }
    }
  }

  const resetPassword = async (params: {
    email: string
    code: string
    newPassword: string
    confirmPassword: string
  }) => {
    try {
      console.warn('重置密码功能暂未实现，使用模拟返回')
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message || '重置密码失败' }
    }
  }

  const init = async () => {
    // 尝试从本地存储恢复用户信息 (优化首屏体验，防止闪烁)
    if (process.client && !user.value) {
      try {
        const storedUser = localStorage.getItem('user_info')
        if (storedUser) {
          user.value = JSON.parse(storedUser)
        }
      } catch (e) {
        console.error('Failed to restore user from localStorage', e)
      }
    }

    loadFavorites()
    loadOrders()
    const cartStore = useCartStore()
    await cartStore.initCart()

    if (token.value) {
      // 即使本地有数据，也尝试从 API 拉取最新数据以更新
      try {
        await fetchUserInfo()
      } catch (error) {
        console.warn('获取用户信息失败，可能需要重新登录:', error)
        if (process.dev && token.value?.includes('mock_token_')) {
          console.log('检测到mock token，保持开发登录状态')
          return
        }
        // 如果 API 失败且 token 无效，才清除状态
        // token.value = null 
        // user.value = null
        // 暂不强制清除，允许离线/缓存查看
      }
    }
  }

  const setUser = (userInfo: any, tokenValue?: string) => {
    user.value = userInfo
    if (tokenValue) {
      token.value = tokenValue
    }
    // 持久化用户信息
    if (process.client) {
      localStorage.setItem('user_info', JSON.stringify(userInfo))
    }
    loadFavorites()
    loadOrders()
    // 获取未读消息
    fetchUnreadMessageCount()
    const cartStore = useCartStore()
    cartStore.initCart()
  }

  const mockLogin = () => {
    const mockUser = {
      id: '145e6b60-03db-47f0-a812-41a257e04468',
      uid: '88888888',
      username: 'dev_user',
      nickname: '开发用户',
      email: 'admin@fantula.com',
      status: 1,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      balance: 5888.5
    }
    const mockToken = 'mock_token_' + Date.now()
    user.value = mockUser
    token.value = mockToken
    if (process.client) {
      localStorage.setItem('user_info', JSON.stringify(mockUser))
    }
    loadFavorites()
    loadOrders()
    unreadMessageCount.value = 5 // 模拟未读消息
    const cartStore = useCartStore()
    cartStore.initCart()
    console.log('🚀 模拟登录成功！用户信息:', mockUser)
    return { success: true, data: { user: mockUser, token: mockToken } }
  }

  return {
    // 状态
    user: readonly(user),
    isLoggedIn,
    loading: readonly(loading),
    favorites: readonly(favorites),
    orders: readonly(orders),
    unreadMessageCount: readonly(unreadMessageCount), // 导出未读消息数

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
    fetchUnreadMessageCount, // 导出获取方法

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
  }
}) 