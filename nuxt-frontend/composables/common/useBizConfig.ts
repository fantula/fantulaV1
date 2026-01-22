
/**
 * 全局业务配置 (Single Source of Truth)
 * 用于统一商品类型、订单状态等的显示名称和样式
 */

// 1. 商品类型定义
export const PRODUCT_TYPES = {
    virtual: {
        label: '虚拟充值',
        color: 'primary',
        icon: 'Lightning'
    },
    shared_account: {
        label: '账号合租',
        color: 'success',
        icon: 'UserFilled'
    },
    one_time_cdk: {
        label: '兑换码',
        color: 'warning',
        icon: 'Key'
    }
} as const

export type ProductTypeKey = keyof typeof PRODUCT_TYPES

// 2. 辅助 Hook
export function useBizConfig() {

    /**
     * 获取商品类型显示标签
     */
    const getProductTypeLabel = (type: string) => {
        const config = PRODUCT_TYPES[type as ProductTypeKey]
        return config ? config.label : (type || '未知类型')
    }

    /**
     * 获取商品类型对应颜色 (Element Plus Tag Type)
     */
    const getProductTypeTag = (type: string) => {
        const config = PRODUCT_TYPES[type as ProductTypeKey]
        return config ? config.color : 'info'
    }



    /**
     * 获取所有类型选项 (用于 Select)
     */
    const productTypeOptions = Object.entries(PRODUCT_TYPES).map(([value, config]) => ({
        label: config.label,
        value: value
    }))

    // ==========================================
    // 3. 订单状态定义
    // ==========================================
    const ORDER_STATUS = {
        'pending': { label: '待支付', type: 'danger' }, // Changed to danger/orange
        'pending_delivery': { label: '待发货', type: 'warning' },
        'active': { label: '使用中', type: 'success' }, // Changed from 服务中
        'expired': { label: '已过期', type: 'info' },
        'completed': { label: '已完成', type: '' },
        'converted': { label: '已转换', type: 'info' },
        'cancelled': { label: '已取消', type: 'info' },
        'refunding': { label: '退款中', type: 'warning' },
        'refunded': { label: '已退款', type: 'info' } // Refunded is usually neutral/gray or red. User didn't specify color, but "已退款" implies done. Info/Gray is safe.
    } as const

    const getOrderStatusLabel = (status: string) => {
        const config = ORDER_STATUS[status as keyof typeof ORDER_STATUS]
        return config ? config.label : status
    }

    const getOrderStatusType = (status: string) => {
        const config = ORDER_STATUS[status as keyof typeof ORDER_STATUS]
        return config ? config.type : 'info'
    }

    const orderStatusOptions = Object.entries(ORDER_STATUS).map(([value, config]) => ({
        label: config.label,
        value: value
    }))

    // ==========================================
    // 4. CDK 状态定义
    // ==========================================
    const CDK_STATUS = {
        'idle': { label: '空闲', type: 'success' },
        'using': { label: '使用中', type: 'warning' },
        'used': { label: '已使用', type: 'info' },
        'disabled': { label: '已下架', type: 'danger' }
    } as const

    const getCdkStatusLabel = (status: string) => {
        const config = CDK_STATUS[status as keyof typeof CDK_STATUS]
        return config ? config.label : status
    }

    const getCdkStatusType = (status: string) => {
        const config = CDK_STATUS[status as keyof typeof CDK_STATUS]
        return config ? config.type : 'info'
    }

    const cdkStatusOptions = Object.entries(CDK_STATUS).map(([value, config]) => ({
        label: config.label,
        value: value
    }))

    // ==========================================
    // 5. 优惠券类型定义
    // ==========================================
    const COUPON_TYPES = {
        'balance': { label: '额度券', color: 'success' },
        'flat': { label: '立减券', color: 'danger' },
        'product': { label: '指定商品券', color: 'warning' }
    } as const

    const getCouponTypeLabel = (type: string) => {
        const config = COUPON_TYPES[type as keyof typeof COUPON_TYPES]
        return config ? config.label : type
    }

    const getCouponTypeTag = (type: string) => {
        const config = COUPON_TYPES[type as keyof typeof COUPON_TYPES]
        return config ? config.color : 'info'
    }

    const couponTypeOptions = Object.entries(COUPON_TYPES).map(([value, config]) => ({
        label: config.label,
        value: value
    }))

    // ==========================================
    // 6. 优惠券状态定义
    // ==========================================
    const COUPON_STATUS = {
        'unused': { label: '未使用', type: 'success' },
        'used': { label: '已使用', type: 'info' },
        'expired': { label: '已过期', type: 'danger' }
    } as const

    const getCouponStatusLabel = (status: string) => {
        const config = COUPON_STATUS[status as keyof typeof COUPON_STATUS]
        return config ? config.label : status
    }

    const getCouponStatusType = (status: string) => {
        const config = COUPON_STATUS[status as keyof typeof COUPON_STATUS]
        return config ? config.type : 'info'
    }

    const couponStatusOptions = Object.entries(COUPON_STATUS).map(([value, config]) => ({
        label: config.label,
        value: value
    }))

    return {
        PRODUCT_TYPES,
        getProductTypeLabel,
        getProductTypeTag,
        productTypeOptions,

        ORDER_STATUS,
        getOrderStatusLabel,
        getOrderStatusType,
        orderStatusOptions,

        CDK_STATUS,
        getCdkStatusLabel,
        getCdkStatusType,
        cdkStatusOptions,

        COUPON_TYPES,
        getCouponTypeLabel,
        getCouponTypeTag,
        couponTypeOptions,

        COUPON_STATUS,
        getCouponStatusLabel,
        getCouponStatusType,
        couponStatusOptions,

        // ==========================================
        // 7. 工单优先级定义
        // ==========================================
        TICKET_PRIORITY: {
            'low': { label: '一般', type: 'info' },
            'medium': { label: '重要', type: 'warning' },
            'high': { label: '紧急', type: 'danger' }
        } as const,

        getTicketPriorityLabel: (p: string) => {
            const map: Record<string, string> = { 'low': '一般', 'medium': '重要', 'high': '紧急' }
            return map[p] || p
        },
        getTicketPriorityType: (p: string) => {
            const map: Record<string, string> = { 'low': 'info', 'medium': 'warning', 'high': 'danger' }
            return map[p] || 'info'
        },

        // ==========================================
        // 8. 工单状态定义
        // ==========================================
        TICKET_STATUS: {
            'processing': { label: '处理中', type: 'primary' },
            'resolved': { label: '已解决', type: 'success' }
        } as const,

        getTicketStatusLabel: (s: string) => {
            return s === 'processing' ? '处理中' : '已解决'
        },
        getTicketStatusType: (s: string) => {
            return s === 'processing' ? 'primary' : 'success'
        }
    }
}
