import { defineStore } from 'pinia'
import type { User, LoginParams } from '@/types/api'
import { authApi } from '@/api/client/auth'
import { favoriteApi } from '@/api/client/common'
import { messageApi } from '@/api/client/message'
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

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = useCookie('token', { maxAge: 60 * 60 * 24 * 30 }) // 30 days persistence
  const loading = ref(false) // 加载状态，用于骨架屏显示
  const isLoggedIn = computed(() => !!token.value && !!user.value)

  // 消息相关状态
  const unreadMessageCount = ref(0)

  // 收藏相关状态
  const favorites = ref<FavoriteItem[]>([])
  const favoritesKey = 'user_favorites'

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


  const saveFavorites = () => {
    if (process.client) {
      try {
        localStorage.setItem(favoritesKey, JSON.stringify(favorites.value))
      } catch (error) {
        console.error('保存收藏数据失败:', error)
      }
    }
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
        await authApi.logout()
      }
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      token.value = null
      user.value = null
      if (process.client) {
        localStorage.removeItem('user_info')
        localStorage.removeItem('wechat_openid') // 清除微信 OpenID 缓存
      }
      favorites.value = []
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
      // Implement password reset logic via API
      // const response = await authApi.resetPassword(params)
      // return response
      console.warn('重置密码功能暂未实现 (API binding pending)')
      return { success: false, message: '功能暂未开放' }
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
    const cartStore = useCartStore()
    await cartStore.initCart()

    if (token.value) {
      // 即使本地有数据，也尝试从 API 拉取最新数据以更新
      try {
        await fetchUserInfo()
      } catch (error) {
        console.warn('获取用户信息失败，可能需要重新登录:', error)
        // 暂不强制清除
      }
    }
  }

  /**
   * 尝试从 Supabase LocalStorage 恢复会话
   * 用于解决微信/浏览器关闭会导致 Session Cookie 丢失的问题
   */
  const restoreSessionFromSupabase = async (): Promise<boolean> => {
    if (!process.client) return false

    try {
      const { getSupabaseClient } = await import('~/utils/supabase')
      const client = getSupabaseClient()

      // 1. Check for active session in Supabase SDK (LocalStorage)
      const { data: { session } } = await client.auth.getSession()

      if (session?.access_token && session?.user) {
        console.log('[UserStore] Restoring session from Supabase persistence...')

        // 2. Refresh token cookie (Critical stepping stone)
        token.value = session.access_token

        // 3. Restore user state
        user.value = {
          id: session.user.id,
          email: session.user.email,
          // Try to recover other fields from localStorage if available, or wait for fetchUserInfo
          ...((user.value || {}) as any)
        } as any

        // 4. Verification & Full Profile Fetch
        await fetchUserInfo()

        return true
      }
    } catch (e) {
      console.error('[UserStore] Session restoration failed:', e)
    }
    return false
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
    // 获取未读消息
    fetchUnreadMessageCount()
    const cartStore = useCartStore()
    cartStore.initCart()
  }

  // mockLogin removed for production safety

  return {
    // 状态
    user: readonly(user),
    isLoggedIn,
    loading: readonly(loading),
    favorites: readonly(favorites),
    unreadMessageCount: readonly(unreadMessageCount),

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
    restoreSessionFromSupabase, // Export new action
    setUser,
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
  }
}) 