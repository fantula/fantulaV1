import { defineStore } from 'pinia'
import type { User, LoginParams } from '@/types/api'
import { authApi } from '@/api/client/auth'
import { orderApi } from '@/api/client/order-legacy'
import { favoriteApi } from '@/api/client/common'
import { messageApi } from '@/api/client/message'

// ... (keep interface definitions) ...

// 定义收藏商品类型
interface FavoriteItem {
  id: number
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
    const userId = user.value?.id
    if (!userId) return
    try {
      const res = await favoriteApi.getFavorites(userId)
      if (res.code === 0 && res.data && Array.isArray(res.data.list)) {
        favorites.value = res.data.list.map((item: any) => ({
          id: item.goodsId,
          name: item.name || '',
          image: item.image || '',
          desc: item.desc || '',
          region: item.region || '',
          quality: item.quality || '',
          devices: item.devices || '',
          download: item.download || '',
          prices: item.prices || [],
          hot: item.hot,
          addTime: item.addTime || ''
        }))
      }
    } catch (e) {
      console.error('加载收藏失败', e)
    }
  }

  // ... (keep addToFavorites, removeFromFavorites, checkIsFavorite) ...
  const addToFavorites = async (item: Omit<FavoriteItem, 'addTime'>) => {
    // ... code ...
    const userId = user.value?.id
    if (!userId) return { success: false, message: '未登录' }
    try {
      const res = await favoriteApi.addToFavorites(userId, item.id)
      if (res.code === 0) {
        await loadFavorites()
        return { success: true, message: '添加收藏成功' }
      }
      return { success: false, message: res.msg || '添加收藏失败' }
    } catch (e) {
      return { success: false, message: '添加收藏失败' }
    }
  }

  const removeFromFavorites = async (itemId: number) => {
    // ... code ...
    const userId = user.value?.id
    if (!userId) return { success: false, message: '未登录' }
    try {
      const res = await favoriteApi.removeFromFavorites(userId, itemId)
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

      const response = await orderApi.getOrderList({ page: 1, limit: 50 })
      if (response.success && response.data && response.data.list) {
        // 转换API订单格式为前端格式
        const apiOrders = response.data.list.map((order: any) => ({
          id: order.orderNo,
          title: order.goodsName || '未知商品',
          amount: `¥${order.totalAmount?.toFixed(2) || '0.00'}`,
          time: order.createTime,
          status: getOrderStatus(order.status),
          statusText: getOrderStatusText(order.status),
          statusClass: getOrderStatusClass(order.status),
          payType: '未知',
          productImage: order.goodsImage
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
  const getOrderStatus = (status: number): OrderItem['status'] => {
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

  const getOrderStatusText = (status: number): string => {
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

  const getOrderStatusClass = (status: number): string => {
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
        await authApi.logout()
      }
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      token.value = null
      user.value = null
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
      console.warn('修改密码功能暂未实现，使用模拟返回')
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message || '修改密码失败' }
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

    // 订单相关方法
    addOrder,
    getOrders,
    getOrdersByStatus,
    clearOrders,
    loadOrders
  }
}) 