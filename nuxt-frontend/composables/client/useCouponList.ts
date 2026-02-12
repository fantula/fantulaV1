import { ref, computed } from 'vue'
import { couponApi, type UserCoupon } from '@/api/client/coupon'

interface UseCouponListOptions {
    autoLoad?: boolean
}

export const useCouponList = (
    orderAmount: Ref<number>,
    skuIds: Ref<string[]> = ref([]),
    productIds: Ref<string[]> = ref([]), // Support product-level restrictions if needed
    options: UseCouponListOptions = { autoLoad: false }
) => {
    const loading = ref(false)
    const coupons = ref<UserCoupon[]>([])
    const error = ref('')

    // --- Helpers ---

    // Check if a coupon is applicable to current order context
    const isApplicable = (coupon: UserCoupon) => {
        const c = coupon.coupon
        // 1. Min usage check
        if (orderAmount.value < c.min_usage) return false

        // 2. Type specific checks
        if (c.type === 'product') {
            const cAny = c as any // Extra fields not effectively typed in interface yet
            // Check SKU restrictions
            if (cAny.sku_ids && cAny.sku_ids.length > 0) {
                const hasCommonSku = skuIds.value.some(sid => cAny.sku_ids.includes(sid))
                if (!hasCommonSku) return false
            }
            // Check Product restrictions
            else if (cAny.product_ids && cAny.product_ids.length > 0) {
                const hasCommonProduct = productIds.value.some(pid => cAny.product_ids?.includes(pid))
                if (!hasCommonProduct) return false
            }
        }

        return true
    }

    // Get reason why not applicable
    const getInapplicableReason = (coupon: UserCoupon) => {
        const c = coupon.coupon
        if (orderAmount.value < c.min_usage) {
            return `还差 ¥${(c.min_usage - orderAmount.value).toFixed(2)}`
        }
        if (c.type === 'product' && !isApplicable(coupon)) {
            return '该商品不可用'
        }
        return '不可用'
    }

    // --- Actions ---

    const loadCoupons = async () => {
        loading.value = true
        error.value = ''
        try {
            const res = await couponApi.getUserCoupons()
            if (res.success && res.data) {
                const now = new Date()
                // Filter: unused, not balance (handled separately mostly?), not expired
                // Note: Balance coupons are usually for recharging wallet, not deduction in checkout?
                // Aligning with original logic: c.coupon.type !== 'balance'
                coupons.value = res.data.filter(c =>
                    c.status === 'unused' &&
                    c.coupon.type !== 'balance' &&
                    (!c.coupon.end_date || new Date(c.coupon.end_date) >= now)
                )
            } else {
                coupons.value = []
            }
        } catch (e: any) {
            error.value = e.message || '加载优惠券失败'
            coupons.value = []
        } finally {
            loading.value = false
        }
    }

    // --- Computed ---

    const sortedCoupons = computed(() => {
        return [...coupons.value].sort((a, b) => {
            const aValid = isApplicable(a)
            const bValid = isApplicable(b)
            // Valid first
            if (aValid && !bValid) return -1
            if (!aValid && bValid) return 1
            // Then by value desc
            return b.coupon.value - a.coupon.value
        })
    })

    // Auto Load
    if (options.autoLoad) {
        loadCoupons()
    }

    return {
        // State
        loading,
        coupons,
        error,

        // Computed
        sortedCoupons,

        // Actions
        loadCoupons,
        isApplicable,
        getInapplicableReason
    }
}
