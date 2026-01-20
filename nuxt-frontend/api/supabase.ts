/**
 * Supabase API 服务层
 * 严格对接已实现的后端 Edge Functions
 * 不修改后端规则，仅做前端适配
 */

import { getSupabaseClient, callEdgeFunction } from '@/utils/supabase'

// ========================================
// 类型定义
// ========================================

export interface SupabaseUser {
    id: string
    uid: string
    email: string
    status: 'active' | 'disabled'
    created_at: string
}

export interface SupabaseProduct {
    id: string
    product_name: string
    product_type: 'virtual' | 'shared_account' | 'one_time_cdk'
    status: 'on' | 'off'
    category_id: string | null
    created_at: string
    stock?: number
    category?: ProductCategory
}

export interface ProductCategory {
    id: string
    name: string
    sort_order: number
    status: 'on' | 'off'
    created_at: string
}

export interface SupabaseCDK {
    cdk_id: string
    cdk_code: string
    cdk_type: 'virtual' | 'shared' | 'one_time'
    stock: number
    account_data: Record<string, any> | null
}

export interface SupabaseOrder {
    id: string
    order_no: string
    user_id: string
    order_type: 'virtual' | 'shared_account' | 'one_time_cdk' // Updated from string to specific Union
    total_amount: number
    status: 'pending_delivery' | 'active' | 'refunding' | 'refunded' | 'expired'
    created_at: string
    expires_at?: string
    quantity: number
    cdk_snapshot?: any // JSONB
    slot_occupancy_ids?: string[] // [Updated] 车位ID数组
    product_snapshot?: ProductSnapshot
    sku_snapshot?: SkuSnapshot
    coupon_snapshot?: any // Updated
}

// ========================================
// 用户认证 API (10.1)
// ========================================
export const supabaseAuthApi = {
    /**
     * POST /auth/login
     * 邮箱验证码登录，不存在则自动注册
     */
    async sendLoginOtp(email: string): Promise<{ success: boolean; message: string }> {
        const { data, error } = await callEdgeFunction('auth-login', {
            method: 'POST',
            body: { email },
            requireAuth: false,
        })

        if (error) {
            return { success: false, message: error }
        }

        return { success: true, message: data?.message || '验证码已发送' }
    },

    /**
     * 使用 Supabase Auth 验证 OTP
     */
    async verifyOtp(email: string, token: string): Promise<{
        success: boolean
        message: string
        user?: SupabaseUser
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.auth.verifyOtp({
            email,
            token,
            type: 'email',
        })

        if (error) {
            return { success: false, message: error.message }
        }

        // 获取用户 profile
        if (data.user) {
            const { data: profile } = await client
                .from('profiles')
                .select('uid, email, status, created_at')
                .eq('id', data.user.id)
                .single()

            if (profile) {
                return {
                    success: true,
                    message: '登录成功',
                    user: {
                        id: data.user.id,
                        uid: profile.uid,
                        email: profile.email,
                        status: profile.status,
                        created_at: profile.created_at,
                    },
                }
            }
        }

        return { success: true, message: '登录成功' }
    },

    /**
     * POST /auth/logout
     */
    async logout(): Promise<{ success: boolean }> {
        const client = getSupabaseClient()
        await client.auth.signOut()
        return { success: true }
    },

    /**
     * 获取当前用户信息
     */
    async getCurrentUser(): Promise<SupabaseUser | null> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()

        if (!user) return null

        const { data: profile } = await client
            .from('profiles')
            .select('uid, email, status, created_at')
            .eq('id', user.id)
            .single()

        if (!profile) return null

        return {
            id: user.id,
            uid: profile.uid,
            email: profile.email,
            status: profile.status,
            created_at: profile.created_at,
        }
    },
}

// ========================================
// 商品 API (10.2)
// ========================================
export const supabaseProductApi = {
    /**
     * GET /products
     * 获取商品列表
     */
    async getProducts(): Promise<{ success: boolean; products: SupabaseProduct[] }> {
        const { data, error } = await callEdgeFunction('products', {
            method: 'GET',
            requireAuth: false,
        })

        if (error) {
            return { success: false, products: [] }
        }

        return { success: true, products: data?.products || [] }
    },

    /**
     * GET /products/:id
     * 获取单个商品详情
     */
    async getProduct(id: string): Promise<{ success: boolean; product: SupabaseProduct | null }> {
        const { data, error } = await callEdgeFunction('products', {
            method: 'GET',
            params: { id },
            requireAuth: false,
        })

        if (error) {
            return { success: false, product: null }
        }

        return { success: true, product: data }
    },

    /**
     * 检查 SKU 是否可购买（调用数据库函数 get_sku_stock）
     * @param skuId SKU ID
     * @returns available: 是否可购买, availableCount: 可用数量
     */
    async checkSkuAvailability(skuId: string): Promise<{
        available: boolean
        availableCount: number
    }> {
        const client = getSupabaseClient()

        try {
            const { data, error } = await client
                .rpc('get_sku_stock', { p_sku_id: skuId })
                .single()

            if (error || !data) {
                console.error('检查 SKU 可购买性失败:', error)
                return { available: false, availableCount: 0 }
            }

            return {
                available: data.in_stock,
                availableCount: data.stock_count
            }
        } catch (err: any) {
            console.error('检查 SKU 可购买性异常:', err)
            return { available: false, availableCount: 0 }
        }
    },
}

// ========================================
// 商品分类 API (客户端)
// ========================================
export const supabaseCategoryApi = {
    /**
     * 获取启用的分类列表（客户端展示用）
     * 直接查询数据库，只返回 status='on' 的分类
     */
    async getCategories(): Promise<{ success: boolean; categories: ProductCategory[] }> {
        const client = getSupabaseClient()

        const { data, error } = await client
            .from('product_categories')
            .select('*')
            .eq('status', 'on')
            .order('sort_order', { ascending: true })

        if (error) {
            console.error('获取分类失败:', error)
            return { success: false, categories: [] }
        }

        return { success: true, categories: data || [] }
    },

    /**
     * 获取指定分类下的商品
     */
    async getProductsByCategory(categoryId: string): Promise<{ success: boolean; products: SupabaseProduct[] }> {
        const client = getSupabaseClient()

        const { data, error } = await client
            .from('products')
            .select('*')
            .eq('category_id', categoryId)
            .eq('status', 'on')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('获取分类商品失败:', error)
            return { success: false, products: [] }
        }

        return { success: true, products: data || [] }
    },
}

// ========================================
// CDK API (10.3)
// ========================================
export const supabaseCdkApi = {
    /**
     * POST /cdk/allocate
     * CDK 分配（由 order-create 内部调用，一般不直接使用）
     */
    async allocate(productId: string): Promise<{ success: boolean; cdk: SupabaseCDK | null; error?: string }> {
        const { data, error } = await callEdgeFunction('cdk-allocate', {
            method: 'POST',
            body: { product_id: productId },
            requireAuth: true,
        })

        if (error) {
            return { success: false, cdk: null, error }
        }

        return { success: true, cdk: data?.cdk || null }
    },

    /**
     * POST /cdk/release
     * CDK 释放（仅账号合租型和虚拟充值型）
     */
    async release(cdkId: string): Promise<{ success: boolean; message: string }> {
        const { data, error } = await callEdgeFunction('cdk-release', {
            method: 'POST',
            body: { cdk_id: cdkId },
            requireAuth: true,
        })

        if (error) {
            return { success: false, message: error }
        }

        return { success: true, message: data?.message || 'CDK 已释放' }
    },
}

// ========================================
// 订单 API (10.4)
// ========================================
export const supabaseOrderApi = {
    /**
     * POST /order/create
     * 创建订单
     * 核心原则：每一次支付 = 一笔订单
     */
    async createOrder(productId: string, durationDays?: number): Promise<{
        success: boolean
        order?: {
            order_id: string
            cdk_id: string
            cdk_code: string
            account_data: Record<string, any> | null
            start_time: string
            end_time: string
        }
        error?: string
    }> {
        const { data, error } = await callEdgeFunction('order-create', {
            method: 'POST',
            body: {
                product_id: productId,
                duration_days: durationDays,
            },
            requireAuth: true,
        })

        if (error) {
            return { success: false, error }
        }

        return { success: true, order: data?.order }
    },

    /**
     * POST /order/renew
     * 续费订单
     * 严格遵循文档 4.3：
     * - 必须生成新订单 B（order_type = renew）
     * - 原订单 A 的 end_time 叠加新时长
     */
    async renewOrder(orderId: string, durationDays: number): Promise<{
        success: boolean
        message?: string
        renew_order_id?: string
        original_order_id?: string
        original_new_end_time?: string
        renew_period?: {
            start: string
            end: string
        }
        error?: string
    }> {
        const { data, error } = await callEdgeFunction('order-renew', {
            method: 'POST',
            body: {
                order_id: orderId,
                duration_days: durationDays,
            },
            requireAuth: true,
        })

        if (error) {
            return { success: false, error }
        }

        return {
            success: true,
            message: data?.message,
            renew_order_id: data?.renew_order_id,
            original_order_id: data?.original_order_id,
            original_new_end_time: data?.original_new_end_time,
            renew_period: data?.renew_period,
        }
    },

    /**
     * GET /order/list
     * 获取用户订单列表
     */
    async getOrderList(params?: { limit?: number; offset?: number }): Promise<{
        success: boolean
        orders: SupabaseOrder[]
        total: number
    }> {
        const queryParams: Record<string, string> = {}
        if (params?.limit) queryParams.limit = String(params.limit)
        if (params?.offset) queryParams.offset = String(params.offset)

        const { data, error } = await callEdgeFunction('order-list', {
            method: 'GET',
            params: queryParams,
            requireAuth: true,
        })

        if (error) {
            return { success: false, orders: [], total: 0 }
        }

        return {
            success: true,
            orders: data?.orders || [],
            total: data?.total || 0,
        }
    },
}

// ========================================
// 后台消息 API (10.5)
// ========================================
export const supabaseAdminApi = {
    /**
     * POST /admin/message/send
     * 发送系统消息
     * 规则：用户不存在则禁止发送
     */
    async sendMessage(userUid: string, title: string, content: string): Promise<{
        success: boolean
        message_id?: string
        error?: string
    }> {
        const { data, error } = await callEdgeFunction('admin-message-send', {
            method: 'POST',
            body: {
                user_uid: userUid,
                title,
                content,
            },
            requireAuth: true,
        })

        if (error) {
            return { success: false, error }
        }

        return { success: true, message_id: data?.message_id }
    },
}

// ========================================
// 预订单 API（购物车/立即购买优化）
// ========================================

export interface ProductSnapshot {
    product_id: string
    product_name: string
    image: string
}

export interface SkuSnapshot {
    sku_id: string
    spec_combination: Record<string, string>
    duration: number
    price: number
}

export interface PreOrder {
    id: string
    order_no: string
    status: 'pending' | 'confirmed' | 'converted' | 'expired' | 'cancelled'
    quantity: number
    unit_price: number
    total_amount: number
    product_snapshot: ProductSnapshot
    sku_snapshot: SkuSnapshot
    source: 'buy_now' | 'cart'
    expires_at: string
    created_at: string
}

export const supabasePreOrderApi = {
    /**
     * 创建预订单（锁定资源）
     * 新版本：直接传 sku_id 和 quantity
     */
    async createPreOrder(
        skuId: string,
        quantity: number = 1,
        source: 'buy_now' | 'cart' = 'buy_now'
    ): Promise<{ success: boolean; pre_order_id?: string; order_no?: string; total_amount?: number; expires_at?: string; code?: string; error?: string }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('create_pre_order', {
            p_sku_id: skuId,
            p_quantity: quantity,
            p_source: source
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data.success) {
            return {
                success: false,
                code: data.code,
                error: data.error
            }
        }

        return {
            success: true,
            pre_order_id: data.pre_order_id,
            order_no: data.order_no,
            total_amount: data.total_amount,
            expires_at: data.expires_at
        }
    },

    /**
     * 查询预订单详情
     */
    async getPreOrder(preOrderId: string): Promise<{ success: boolean; pre_order?: PreOrder; error?: string }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('get_pre_order', {
            p_pre_order_id: preOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data.success) {
            return { success: false, error: data.error }
        }
        return { success: true, pre_order: data.pre_order }
    },

    /**
     * 应用优惠券到预订单
     * 并持久化更新预订单金额
     */
    async applyCouponToPreOrder(preOrderId: string, couponId: string | null): Promise<{
        success: boolean;
        total_amount?: number;
        discount_amount?: number;
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('apply_coupon_to_pre_order', {
            p_pre_order_id: preOrderId,
            p_coupon_id: couponId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        const result = data as any
        if (result.success) {
            return {
                success: true,
                total_amount: result.total_amount,
                discount_amount: result.discount_amount
            }
        } else {
            return { success: false, error: result.error || '应用优惠券失败' }
        }
    },

    /**
     * 确认预订单并支付
     */
    async confirmPreOrder(preOrderId: string, payMethod: 'balance' | 'wechat', couponId?: string): Promise<{ success: boolean; order_no?: string; order_id?: string; total_amount?: number; error?: string }> {
        const client = getSupabaseClient()
        // 使用 confirm_pre_order 函数
        const payload: any = {
            p_pre_order_id: preOrderId,
            p_pay_method: payMethod
        }

        if (couponId) {
            payload.p_coupon_id = couponId
        }

        const { data, error } = await client.rpc('confirm_pre_order', payload)

        if (error) return { success: false, error: error.message }

        // rpc返回的jsonb需要手动解析，如果已经是对象则直接使用
        const result = data as any
        if (result.success) {
            return {
                success: true,
                order_no: result.order_no,
                order_id: result.order_id,
                total_amount: result.total_amount
            }
        } else {
            return { success: false, error: result.error || '支付失败' }
        }
    },

    /**
     * 取消预订单（释放资源）
     */
    async cancelPreOrder(preOrderId: string): Promise<{ success: boolean; error?: string }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('cancel_pre_order', {
            p_pre_order_id: preOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data.success) {
            return { success: false, error: data.error }
        }

        return { success: true }
    },

    /**
     * 删除预订单（仅限已过期或已完成/取消）
     */
    async deletePreOrder(preOrderId: string): Promise<{ success: boolean; error?: string }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('delete_pre_order', {
            p_pre_order_id: preOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data.success) {
            return { success: false, error: data.error }
        }

        return { success: true }
    },

    /**
     * 过期预订单（释放资源 + 真实删除）
     * 用于倒计时归零时调用
     */
    async expirePreOrder(preOrderId: string): Promise<{ success: boolean; error?: string }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('expire_pre_order', {
            p_pre_order_id: preOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data.success) {
            return { success: false, error: data.error }
        }

        return { success: true }
    },

    /**
     * 获取用户所有预订单（包括待支付、已过期等）
     */
    async getPreOrders(status?: string): Promise<{ success: boolean; data?: PreOrder[]; error?: string }> {
        const client = getSupabaseClient()

        let query = client
            .from('pre_orders')
            .select('*')
            .order('created_at', { ascending: false })

        if (status) {
            query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data: data as PreOrder[] }
    },

    /**
     * 获取用户待支付预订单
     */
    async getPendingPreOrders(): Promise<{ success: boolean; data?: PreOrder[]; error?: string }> {
        const client = getSupabaseClient()

        // 获取未过期且状态为 pending 的订单
        const { data, error } = await client
            .from('pre_orders')
            .select('*')
            .eq('status', 'pending')
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data: data as PreOrder[] }
    }
}

// ========================================
// FAQ 帮助中心 API (10.6)
// ========================================
export const supabaseFaqApi = {
    /**
     * 获取常见问题分类列表
     */
    async getCategories(): Promise<{ success: boolean; categories: { id: string; name: string }[] }> {
        const client = getSupabaseClient()
        const { data, error } = await client
            .from('faq_categories')
            .select('id, name')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, categories: [] }
        }
        return { success: true, categories: data || [] }
    },

    /**
     * 获取常见问题列表
     * @param categoryId 可选分类ID
     */
    async getFaqs(categoryId?: string): Promise<{ success: boolean; faqs: any[] }> {
        const client = getSupabaseClient()
        let query = client
            .from('faqs')
            .select('*')
            .eq('is_active', true)

        if (categoryId) {
            query = query.eq('category_id', categoryId)
        }

        query = query.order('sort_order', { ascending: true })

        const { data, error } = await query

        if (error) {
            return { success: false, faqs: [] }
        }
        return { success: true, faqs: data || [] }
    },

    /**
     * 获取指定商品绑定的 FAQ
     */
    async getFaqsByProduct(productId: string): Promise<{ success: boolean; faqs: any[] }> {
        const client = getSupabaseClient()
        const { data, error } = await client
            .from('faqs')
            .select('*')
            .eq('is_active', true)
            .eq('product_id', productId)
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, faqs: [] }
        }
        return { success: true, faqs: data || [] }
    },

    /**
     * 搜索 FAQ
     */
    async searchFaqs(keyword: string): Promise<{ success: boolean; faqs: any[] }> {
        const client = getSupabaseClient()
        const { data, error } = await client
            .from('faqs')
            .select(`
                *,
                category:faq_categories(name)
            `)
            .eq('is_active', true)
            .ilike('question', `%${keyword}%`)
            .order('sort_order', { ascending: true })
            .limit(10)

        if (error) {
            return { success: false, faqs: [] }
        }
        return { success: true, faqs: data || [] }
    }
}

// 导出所有 API
export const supabaseApi = {
    auth: supabaseAuthApi,
    product: supabaseProductApi,
    category: supabaseCategoryApi,
    cdk: supabaseCdkApi,
    order: supabaseOrderApi,
    admin: supabaseAdminApi,
    preOrder: supabasePreOrderApi,
    faq: supabaseFaqApi
}

export default supabaseApi

