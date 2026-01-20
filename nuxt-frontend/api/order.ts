import { callEdgeFunction } from '@/utils/supabase'
import type { Order, PageParams, ApiResponse } from '@/types/api'

/**
 * 订单相关API (Legacy - 仅保留正在使用的方法)
 * 
 * 注意：新代码请使用 api/client/order.ts 中的 clientOrderApi
 */
export const orderApi = {
  /**
   * 创建订单 (Supabase Edge Function版)
   * @param params 订单参数: sku_id (必需), price (必需)
   */
  async createOrder(params: {
    productId?: string  // 兼容旧接口
    sku_id: string      // SKU ID (必需)
    price: number       // 支付金额 (必需)
    [key: string]: any
  }): Promise<ApiResponse<Order>> {
    const { data, error } = await callEdgeFunction<any>('order-create', {
      method: 'POST',
      body: {
        sku_id: params.sku_id,
        price: params.price
      }
    })

    if (error) {
      return { code: 500, msg: error, success: false } as any
    }

    return {
      code: 0,
      msg: 'success',
      data: data.order || data,
      success: true
    } as any
  },

  /**
   * 获取订单列表 (Supabase Edge Function版)
   * @param params 查询参数
   */
  async getOrderList(params: PageParams & {
    status?: number
    startTime?: string
    endTime?: string
  }): Promise<ApiResponse<any>> {
    const limit = params.limit || 20
    const page = params.page || 1
    const offset = (page - 1) * limit

    const { data, error } = await callEdgeFunction<any>('order-list', {
      method: 'GET',
      params: {
        limit: String(limit),
        offset: String(offset)
      }
    })

    if (error) {
      return {
        code: 500,
        msg: error,
        data: { paid_orders: [], pending_orders: [], total: { paid: 0, pending: 0 } },
        success: false
      }
    }

    return {
      code: 0,
      msg: 'success',
      data: {
        paid_orders: data?.paid_orders || [],
        pending_orders: data?.pending_orders || [],
        total: data?.total || { paid: 0, pending: 0 }
      },
      success: true
    }
  }
}