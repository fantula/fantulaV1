export interface OrderDetail {
    id: string
    order_no: string
    orderType: 'virtual' | 'shared' | 'one_time' | string
    status: string
    quantity: number
    totalAmount: number
    createdAt: string
    expiresAt?: string
    slotIndex?: number
    productImage: string
    productName: string
    skuSpec: string
}

export interface CdkItem {
    id: string
    code: string
    parsed: any
    accountData?: any
}

export interface VirtualField {
    label: string
    value?: string
}

// 订单履约记录
export interface OrderFulfillment {
    id: string
    order_id: string
    status: 'submitted' | 'approved' | 'rejected'
    payload: Record<string, string>
    reject_reason?: string
    submitted_at: string
    reviewed_at?: string
}

// 回执表单字段（从 CDK.code 解析）
export interface FulfillmentField {
    key: string    // 字段键名
    label: string  // 显示标签
    value: string  // 用户填写值
}
