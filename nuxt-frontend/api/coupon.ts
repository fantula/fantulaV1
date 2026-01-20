import { getSupabaseClient } from '@/utils/supabase'
import type { ApiResponse } from '@/types/api'

export interface UserCoupon {
    id: string
    user_id: string
    coupon_id: string
    status: 'unused' | 'used' | 'expired'
    redeemed_at: string
    used_at: string | null
    coupon: {
        id: string
        name: string
        type: 'flat' | 'balance' | 'product'
        value: number
        min_usage: number
        end_date: string | null
    }
}

/**
 * 客户端优惠券 API
 */
export const couponApi = {
    /**
     * 获取用户持有的优惠券
     */
    async getUserCoupons(): Promise<ApiResponse<UserCoupon[]>> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()
        if (!user) return { code: 401, msg: '未登录', success: false }

        const { data, error } = await client
            .from('user_coupons')
            .select(`
                *,
                coupon:coupons(id, name, type, value, min_usage, end_date, sku_ids)
            `)
            .eq('user_id', user.id)
            .order('redeemed_at', { ascending: false })

        if (error) return { code: 500, msg: error.message, success: false }
        return { code: 0, msg: 'success', data: data as any[], success: true }
    },

    /**
     * 兑换优惠券码 (使用原子性 RPC 调用)
     */
    async redeemCoupon(code: string): Promise<ApiResponse<any>> {
        const client = getSupabaseClient()

        // 调用数据库原子性函数，防止并发刷券
        const { data, error } = await client.rpc('redeem_coupon', {
            p_code: code
        })

        if (error) {
            return { code: 500, msg: error.message, success: false }
        }

        // RPC 返回 jsonb 对象
        if (data && data.success) {
            return {
                code: 0,
                msg: data.msg || '兑换成功',
                data: data.coupon,
                success: true
            }
        } else {
            return {
                code: 400,
                msg: data?.error || '兑换失败',
                success: false
            }
        }
    },

    /**
     * 使用余额券 (将券内余额转入用户钱包)
     */
    async useBalanceCoupon(userCouponId: string): Promise<ApiResponse<any>> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()
        if (!user) return { code: 401, msg: '未登录', success: false }

        // 1. 获取用户持有的记录并校验类型
        const { data: userCoupon, error: fetchUserCouponError } = await client
            .from('user_coupons')
            .select(`
                *,
                coupon:coupons(*)
            `)
            .eq('id', userCouponId)
            .eq('user_id', user.id)
            .single()

        if (fetchUserCouponError || !userCoupon) {
            return { code: 400, msg: '优惠券不存在', success: false }
        }

        if (userCoupon.status !== 'unused') {
            return { code: 400, msg: '优惠券已使用或已过期', success: false }
        }

        if (userCoupon.coupon.type !== 'balance') {
            return { code: 400, msg: '该优惠券不是余额券', success: false }
        }

        // 2. 更新逻辑 (生产环境必须使用数据库函数/事务)
        // 这里需要:
        // a. 更新 user_coupons.status = 'used'
        // b. 更新 profiles.balance += coupon.value
        // c. 插入 wallet_transactions 记录

        // 我们通过 RPC 调用预定义的数据库函数 handle_balance_coupon (假设已存在或稍后创建)
        // 如果没有 RPC，我们需要在客户端按顺序执行，但这不安全。
        // 根据用户要求 "不涉及功能的不要改动"，我倾向于使用 Edge Function 或简单的多步操作。
        // 但为了安全和一致性，由于我可以通过 apply_migration 创建数据库函数，这是最佳实践。

        const { data, error } = await client.rpc('use_balance_coupon', {
            p_user_coupon_id: userCouponId,
            p_user_id: user.id
        })

        if (error) {
            return { code: 500, msg: error.message, success: false }
        }

        // RPC 返回 jsonb 对象，需要检查 data.success 字段
        if (data && data.success) {
            return {
                code: 0,
                msg: '使用成功，余额已转入您的钱包',
                success: true,
                data: {
                    new_balance: data.new_balance,
                    added_amount: data.added_amount
                }
            }
        } else {
            return {
                code: 400,
                msg: data?.error || '使用失败',
                success: false
            }
        }
    },

    /**
     * 删除用户优惠券 (仅限于逻辑删除或隐藏，这里执行真实删除)
     */
    async deleteUserCoupon(userCouponId: string): Promise<ApiResponse<any>> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()
        if (!user) return { code: 401, msg: '未登录', success: false }

        // 仅允许删除属于该用户的记录
        const { error } = await client
            .from('user_coupons')
            .delete()
            .eq('id', userCouponId)
            .eq('user_id', user.id)

        if (error) {
            return { code: 500, msg: error.message, success: false }
        }
        return { code: 0, msg: '删除成功', success: true }
    },

    /**
     * 计算优惠券折扣 (结算页调用)
     */
    async calculateDiscount(couponId: string, amount: number, skuIds: string[]): Promise<{
        success: boolean
        valid: boolean
        discount_amount: number
        final_amount: number
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()
        if (!user) return { success: false, valid: false, discount_amount: 0, final_amount: amount, error: '未登录' }

        const { data, error } = await client.rpc('calculate_coupon_discount', {
            p_user_id: user.id,
            p_coupon_id: couponId,
            p_order_amount: amount,
            p_sku_ids: skuIds
        })

        if (error) return { success: false, valid: false, discount_amount: 0, final_amount: amount, error: error.message }

        return {
            success: true,
            valid: data.valid,
            discount_amount: data.discount_amount,
            final_amount: data.final_amount,
            error: data.error
        }
    }
}
