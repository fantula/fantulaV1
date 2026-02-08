# 共享逻辑参考文档

> **版本**: V1.0 | **更新时间**: 2026-02-08
> **适用范围**: PC 客户端 + 移动端
> **目的**: 记录所有 PC/Mobile 共享的逻辑模块，便于复用和扩展

---

## 🎯 核心原则

```
┌─────────────────────────────────────────────────────────────┐
│                      共享层架构                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   PC 端     │    │   共享层     │    │  移动端     │     │
│  │  pages/pc/  │    │             │    │ pages/mobile/│     │
│  └──────┬──────┘    │ ┌─────────┐ │    └──────┬──────┘     │
│         │           │ │   API   │ │           │            │
│         └───────────┤ │  Store  │ ├───────────┘            │
│                     │ │Composable│                          │
│                     │ └─────────┘ │                          │
│                     │             │                          │
│                     └─────────────┘                          │
│                                                             │
│  ⚠️ 规则: 移动端只能 import 共享层，不能复制或重写！        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 一、目录结构

```
nuxt-frontend/
│
├── api/client/                 # 🔵 共享 API (18个文件)
│   ├── auth.ts                 # 认证相关
│   ├── cart.ts                 # 购物车
│   ├── common.ts               # 通用 (Banner, 分类等)
│   ├── community.ts            # 社区
│   ├── coupon.ts               # 优惠券
│   ├── goods.ts                # 商品列表
│   ├── help-center.ts          # 帮助中心
│   ├── message.ts              # 消息
│   ├── order.ts                # 订单
│   ├── payment.ts              # 支付
│   ├── product.ts              # 商品详情
│   ├── supabase.ts             # Supabase 封装
│   ├── ticket.ts               # 工单
│   ├── user.ts                 # 用户
│   ├── wechat-login.ts         # 微信登录
│   └── wechat-payment.ts       # 微信支付
│
├── composables/client/         # 🟢 共享 Composables (12个文件)
│   ├── useCartAnimation.ts     # 购物车动画
│   ├── useCheckout.ts          # 结算流程
│   ├── useFaqTicker.ts         # FAQ 滚动
│   ├── useFavorite.ts          # 收藏
│   ├── useFlyingAnimation.ts   # 飞行动画
│   ├── useGoodsDetail.ts       # 商品详情
│   ├── useInfiniteScroll.ts    # ⭐ 无限滚动
│   ├── useOrderDetail.ts       # 订单详情
│   ├── useOrderDetailLogic.ts  # 订单详情逻辑
│   ├── useOrderList.ts         # 订单列表
│   ├── useProductDetail.ts     # 商品详情完整版
│   └── useSystemConfig.ts      # 系统配置
│
├── composables/shared/         # 🟡 通用工具 (2个文件)
│   ├── useHttp.ts              # HTTP 封装
│   └── useSimpleCache.ts       # 简单缓存
│
├── stores/client/              # 🟣 共享 Store (3个文件)
│   ├── cart.ts                 # 购物车状态
│   ├── modal.ts                # 弹窗状态
│   └── user.ts                 # ⭐ 用户状态 (21KB)
│
└── utils/                      # 🔴 工具函数
    ├── supabase.ts             # Supabase 客户端
    ├── buttonThemeRegistry.ts  # 按钮主题
    ├── modalThemeRegistry.ts   # 弹窗主题
    └── modalAssetPreloader.ts  # 弹窗资源预加载
```

---

## 📋 二、API 模块详解

### 2.1 认证相关 (`auth.ts`)

| 方法 | 说明 |
|------|------|
| `login()` | 邮箱密码登录 |
| `register()` | 邮箱注册 |
| `sendOtp()` | 发送验证码 |
| `verifyOtp()` | 验证验证码 |
| `resetPassword()` | 重置密码 |
| `changePassword()` | 修改密码 |
| `changeEmail()` | 修改邮箱 |
| `deleteAccount()` | 注销账号 |

### 2.2 商品相关 (`goods.ts` + `product.ts`)

| 方法 | 说明 |
|------|------|
| `getCategories()` | 获取分类列表 |
| `getGoodsList()` | 获取商品列表 (分页) |
| `getProductDetail()` | 获取商品详情 |
| `getProductSkus()` | 获取 SKU 列表 |

### 2.3 订单相关 (`order.ts`)

| 方法 | 说明 |
|------|------|
| `getOrders()` | 获取订单列表 |
| `getOrderDetail()` | 获取订单详情 |
| `cancelOrder()` | 取消订单 |
| `requestRefund()` | 申请退款 |

### 2.4 优惠券相关 (`coupon.ts`)

| 方法 | 说明 |
|------|------|
| `getUserCoupons()` | 获取用户优惠券 |
| `redeemCoupon()` | 兑换优惠券码 |
| `useBalanceCoupon()` | 使用余额券 |
| `deleteUserCoupon()` | 删除优惠券 |
| `calculateDiscount()` | 计算优惠金额 |

### 2.5 用户相关 (`user.ts`)

| 方法 | 说明 |
|------|------|
| `getUserInfo()` | 获取用户信息 |
| `updateProfile()` | 更新个人资料 |
| `getFavorites()` | 获取收藏列表 |
| `getWalletTransactions()` | 获取钱包流水 |

---

## 🔧 三、Composables 详解

### 3.1 核心 Composables

#### `useInfiniteScroll` ⭐

**文件**: `composables/client/useInfiniteScroll.ts`
**用途**: 无限滚动/分页加载

```typescript
// 服务端分页模式
const { displayList, loading, finished, loadMore, reset } = useInfiniteScroll({
  fetchData: async (page, size) => {
    const res = await api.getList({ page, limit: size })
    return { list: res.data?.list || [], hasMore: res.data?.hasMore }
  },
  pageSize: 10
})

// 客户端分页模式
const { displayList, loading, finished, loadMore } = useInfiniteScroll({
  data: allDataRef,  // 传入完整数据的 Ref
  pageSize: 10
})
```

#### `useOrderDetail` ⭐

**文件**: `composables/client/useOrderDetail.ts`
**用途**: 订单详情页通用逻辑

```typescript
const { 
  order, 
  loading, 
  canCancel, 
  canRefund,
  handleCancel,
  handleRefund 
} = useOrderDetail(orderId)
```

#### `useProductDetail` ⭐

**文件**: `composables/client/useProductDetail.ts`
**用途**: 商品详情页通用逻辑

```typescript
const {
  product,
  skus,
  selectedSku,
  quantity,
  totalPrice,
  handleBuy
} = useProductDetail(productId)
```

### 3.2 辅助 Composables

| Composable | 说明 |
|------------|------|
| `useCheckout` | 结算流程 |
| `useFavorite` | 收藏操作 |
| `useCartAnimation` | 购物车动画效果 |
| `useSimpleCache` | 简单内存缓存 |

---

## 🗄 四、Store 详解

### 4.1 用户 Store (`stores/client/user.ts`)

**大小**: 21KB (最核心的 Store)

```typescript
const userStore = useUserStore()

// 读取
userStore.user          // 用户信息
userStore.isLoggedIn    // 是否登录
userStore.balance       // 余额

// 操作
userStore.fetchUserInfo()   // 刷新用户信息
userStore.logout()          // 退出登录
```

### 4.2 购物车 Store (`stores/client/cart.ts`)

```typescript
const cartStore = useCartStore()

// 读取
cartStore.items         // 购物车项
cartStore.totalCount    // 商品数量
cartStore.totalPrice    // 总价

// 操作
cartStore.addItem()     // 添加商品
cartStore.updateQuantity()  // 修改数量
cartStore.clearCart()   // 清空购物车
```

### 4.3 弹窗 Store (`stores/client/modal.ts`)

```typescript
const modalStore = useModalStore()

// 操作
modalStore.showLogin    // 显示登录弹窗
modalStore.closeLogin() // 关闭登录弹窗
```

---

## ➕ 五、如何添加新的共享逻辑

### 场景: 添加频道识别共享逻辑

#### Step 1: 创建 API 模块

```typescript
// api/client/channel.ts
import { getSupabaseClient } from '@/utils/supabase'

export const channelApi = {
  /**
   * 根据 URL 参数识别渠道
   */
  async getChannelByCode(code: string) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('channels')
      .select('*')
      .eq('code', code)
      .single()
    
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  /**
   * 记录渠道访问
   */
  async trackChannelVisit(channelId: string, userId?: string) {
    const client = getSupabaseClient()
    await client.from('channel_visits').insert({
      channel_id: channelId,
      user_id: userId,
      visited_at: new Date().toISOString()
    })
  }
}
```

#### Step 2: 创建 Composable (如果需要)

```typescript
// composables/client/useChannel.ts
import { ref, onMounted } from 'vue'
import { channelApi } from '@/api/client/channel'

export function useChannel() {
  const channel = ref(null)
  const loading = ref(false)

  const detectChannel = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('channel') || urlParams.get('c')
    
    if (!code) return
    
    loading.value = true
    const res = await channelApi.getChannelByCode(code)
    if (res.success) {
      channel.value = res.data
      // 存储到 localStorage
      localStorage.setItem('channel', JSON.stringify(res.data))
    }
    loading.value = false
  }

  onMounted(() => {
    detectChannel()
  })

  return { channel, loading, detectChannel }
}
```

#### Step 3: 在 PC 和 Mobile 中使用

```typescript
// pages/pc/index.vue 或 pages/mobile/index.vue
import { useChannel } from '@/composables/client/useChannel'

const { channel } = useChannel()
```

---

## 📝 六、Bug 修复记录

### 2026-02-08: 优惠券删除失效

**问题**: 用户删除已使用的优惠券时，数据库没有真正删除

**原因**: `user_coupons` 表缺少 DELETE 的 RLS 策略

**修复**: 添加了以下 RLS 策略
```sql
CREATE POLICY "Users can delete their own coupons"
ON public.user_coupons
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```

**状态**: ✅ 已修复

---

## 📚 七、相关文档

| 文档 | 说明 |
|------|------|
| [USAGE_GUIDE.md](./USAGE_GUIDE.md) | 使用教程 |
| [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md) | 性能优化 |
| [client/ORDER_DETAIL.md](./client/ORDER_DETAIL.md) | 订单详情规范 |
| [backend/FUNCTION_REFERENCE.md](./backend/FUNCTION_REFERENCE.md) | 数据库函数参考 |
