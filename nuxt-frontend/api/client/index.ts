/**
 * 客户端 API 统一导出
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 * 
 * 使用方式:
 * import { clientProductApi, clientOrderApi } from '@/api/client'
 */

// 商品 API
export { clientProductApi } from './product'
export type { ClientProduct, ClientCategory, ClientSku } from './product'

// 订单 API
export { clientOrderApi } from './order'
export type { ClientOrder, ClientPreOrder } from './order'

// 购物车 API
export { clientCartApi } from './cart'
export type { ClientCartItem } from './cart'

// 用户 API
export { clientUserApi } from './user'
export type { ClientUser, ClientFavorite } from './user'
