/**
 * Supabase 用户状态管理
 * 严格对接已实现的后端 API，不修改后端规则
 */

import { defineStore } from 'pinia'
import { getSupabaseClient } from '@/utils/supabase'
import {
    supabaseAuthApi,
    supabaseOrderApi,
    type SupabaseUser,
    type SupabaseOrder,
} from '@/api/client/supabase'

export const useSupabaseUserStore = defineStore('supabase-user', () => {
    // ========================================
    // 状态
    // ========================================
    const user = ref<SupabaseUser | null>(null)
    const orders = ref<SupabaseOrder[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // 计算属性
    const isLoggedIn = computed(() => !!user.value)
    const userUid = computed(() => user.value?.uid || null)

    // ========================================
    // 认证方法
    // ========================================

    /**
     * 发送邮箱验证码
     * 对应 POST /auth/login
     */
    const sendLoginOtp = async (email: string) => {
        isLoading.value = true
        error.value = null

        try {
            const result = await supabaseAuthApi.sendLoginOtp(email)
            if (!result.success) {
                error.value = result.message
            }
            return result
        } catch (e: any) {
            error.value = e.message
            return { success: false, message: e.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 验证 OTP 并登录
     */
    const verifyOtpAndLogin = async (email: string, token: string) => {
        isLoading.value = true
        error.value = null

        try {
            const result = await supabaseAuthApi.verifyOtp(email, token)
            if (result.success && result.user) {
                user.value = result.user
                // 登录成功后加载订单
                await loadOrders()
            } else {
                error.value = result.message
            }
            return result
        } catch (e: any) {
            error.value = e.message
            return { success: false, message: e.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 登出
     * 对应 POST /auth/logout
     */
    const logout = async () => {
        try {
            await supabaseAuthApi.logout()
        } finally {
            user.value = null
            orders.value = []
            error.value = null
        }
    }

    /**
     * 初始化：尝试恢复会话
     */
    const init = async () => {
        isLoading.value = true

        try {
            const currentUser = await supabaseAuthApi.getCurrentUser()
            if (currentUser) {
                user.value = currentUser
                await loadOrders()
            }
        } catch (e: any) {
            console.error('初始化用户失败:', e)
        } finally {
            isLoading.value = false
        }
    }

    // ========================================
    // 订单方法
    // ========================================

    /**
     * 加载订单列表
     * 对应 GET /order/list
     */
    const loadOrders = async () => {
        if (!user.value) return

        try {
            const result = await supabaseOrderApi.getOrderList({ limit: 50 })
            if (result.success) {
                orders.value = result.orders
            }
        } catch (e: any) {
            console.error('加载订单失败:', e)
        }
    }

    /**
     * 创建订单
     * 对应 POST /order/create
     * 核心原则：每一次支付 = 一笔订单
     */
    const createOrder = async (productId: string, durationDays?: number) => {
        if (!user.value) {
            return { success: false, error: '请先登录' }
        }

        isLoading.value = true
        error.value = null

        try {
            const result = await supabaseOrderApi.createOrder(productId, durationDays)
            if (result.success) {
                // 刷新订单列表
                await loadOrders()
            } else {
                error.value = result.error || '创建订单失败'
            }
            return result
        } catch (e: any) {
            error.value = e.message
            return { success: false, error: e.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 续费订单
     * 对应 POST /order/renew
     * 严格遵循文档 4.3：
     * - 必须生成新订单 B（order_type = renew）
     * - 原订单 A 的 end_time 叠加新时长
     */
    const renewOrder = async (orderId: string, durationDays: number) => {
        if (!user.value) {
            return { success: false, error: '请先登录' }
        }

        isLoading.value = true
        error.value = null

        try {
            const result = await supabaseOrderApi.renewOrder(orderId, durationDays)
            if (result.success) {
                // 刷新订单列表
                await loadOrders()
            } else {
                error.value = result.error || '续费失败'
            }
            return result
        } catch (e: any) {
            error.value = e.message
            return { success: false, error: e.message }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * 根据状态筛选订单
     */
    const getOrdersByStatus = (status?: 'active' | 'expired' | 'all') => {
        if (!status || status === 'all') {
            return orders.value
        }
        return orders.value.filter(order => order.status === status)
    }

    /**
     * 获取单个订单
     */
    const getOrderById = (orderId: string) => {
        return orders.value.find(order => order.id === orderId)
    }

    return {
        // 状态
        user: readonly(user),
        orders: readonly(orders),
        isLoading: readonly(isLoading),
        error: readonly(error),
        isLoggedIn,
        userUid,

        // 认证方法
        sendLoginOtp,
        verifyOtpAndLogin,
        logout,
        init,

        // 订单方法
        loadOrders,
        createOrder,
        renewOrder,
        getOrdersByStatus,
        getOrderById,
    }
})
