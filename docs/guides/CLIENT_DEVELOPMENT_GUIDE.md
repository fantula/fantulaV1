# 客户端开发规范 (Client Development Guide)

> 本文档规定了 Fantula 客户端（PC端）的开发规范。所有新功能开发必须遵循此文档。
> 
> **注意**: 本规范仅针对 **PC 端**。移动端将独立开发为另一套代码，通过首次访问设备识别进行路由分发。

---

## 一、目录结构

```
nuxt-frontend/
├── pages/                    # 页面 (仅 PC 端)
│   ├── index.vue             # 首页
│   ├── [id].vue              # 商品详情
│   ├── cart.vue              # 购物车
│   ├── checkout/             # 结算流程
│   ├── profile/              # 个人中心
│   │   ├── orders.vue        # 我的订单
│   │   ├── order/[id].vue    # 订单详情
│   │   ├── wallet.vue        # 钱包
│   │   └── favorites.vue     # 收藏
│   └── _mgmt_9Xfa3/          # 后台管理 (独立规范)
│
├── api/                      # API 层
│   ├── client/               # 【核心】客户端 API (对标 api/admin/)
│   │   ├── product.ts        # 商品 API
│   │   ├── order.ts          # 订单 API
│   │   ├── cart.ts           # 购物车 API
│   │   ├── user.ts           # 用户 API
│   │   └── index.ts          # 统一导出
│   ├── admin/                # 后台管理 API
│   └── common.ts             # 通用 API (Banner, 文章等)
│
├── components/               # 组件
│   ├── base/                 # 基础组件 (按钮、输入框等)
│   ├── layout/               # 【新】布局组件
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   ├── home/                 # 【新】首页专用组件
│   │   ├── BannerSection.vue
│   │   ├── CategoryNav.vue
│   │   └── GoodsSection.vue
│   ├── modal/                # 【新】弹窗组件 (分类管理)
│   │   ├── confirm/          # 确认类弹窗
│   │   ├── form/             # 表单类弹窗
│   │   ├── result/           # 结果类弹窗
│   │   └── business/         # 业务类弹窗
│   ├── order/                # 订单相关组件
│   └── profile/              # 个人中心组件
│
├── composables/              # 业务逻辑封装
│   ├── common/               # 全局工具
│   │   ├── useBizFormat.ts   # 格式化器
│   │   └── useBizConfig.ts   # 业务配置
│   └── client/               # 【新】客户端业务逻辑
│       ├── useOrderList.ts
│       ├── useCart.ts
│       └── useUserProfile.ts
│
├── stores/                   # Pinia 状态管理
│   ├── user.ts               # 用户状态
│   ├── modal.ts              # 弹窗状态
│   └── cart.ts               # 购物车状态
│
└── types/                    # 类型定义
    ├── api.ts                # API 类型
    └── order.ts              # 订单类型
```

---

## 二、弹窗组件规范 (Modal Classification)

弹窗是客户端最常用的交互形式，必须按类型分类，确保全局风格统一。

### 2.1 弹窗分类

| 类型 | 用途 | 目录 | 示例组件 |
|------|------|------|---------|
| **确认类 (Confirm)** | 用户确认操作 | `modal/confirm/` | `LogoutModal`, `DeleteConfirmModal` |
| **表单类 (Form)** | 用户输入信息 | `modal/form/` | `LoginRegisterModal`, `ChangeNicknameModal` |
| **结果类 (Result)** | 展示操作结果 | `modal/result/` | `PaySuccessModal`, `BalanceNotEnoughModal` |
| **业务类 (Business)** | 复杂业务交互 | `modal/business/` | `OrderPayModal`, `CouponSelectorModal`, `ServiceModal` |

### 2.2 弹窗基础样式规范

所有弹窗必须遵循以下基础样式：

```css
/* 弹窗遮罩层 */
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 弹窗容器 (Glassmorphism 风格) */
.modal-container {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* 弹窗头部 (渐变背景) */
.modal-header {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  padding: 24px;
  color: #fff;
}

/* 关闭按钮 */
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

### 2.3 弹窗命名规范

- 文件名: `XxxModal.vue` (大驼峰 + Modal 后缀)
- Props: 必须包含 `visible` 或通过 `v-if` 控制
- Events: 必须包含 `@close` 事件

### 2.4 全局弹窗状态管理

对于需要全局调用的弹窗（如登录弹窗），使用 `stores/modal.ts`：

```typescript
// stores/modal.ts
export const useModalStore = defineStore('modal', () => {
  const showLogin = ref(false)
  const showService = ref(false)
  
  const openLogin = () => { showLogin.value = true }
  const closeLogin = () => { showLogin.value = false }
  
  return { showLogin, showService, openLogin, closeLogin }
})
```

**调用方式**：
```vue
<template>
  <LoginRegisterModal :visible="modal.showLogin" @close="modal.closeLogin()" />
</template>

<script setup>
const modal = useModalStore()
</script>
```

---

## 三、API 开发规范

### 3.1 文件结构 (对标后台管理)

```typescript
// api/client/order.ts

import { getSupabaseClient, callEdgeFunction } from '@/utils/supabase'

// 1. 类型定义 (或从 types/ 导入)
export interface ClientOrder { 
  id: string
  order_no: string
  status: 'pending' | 'pending_delivery' | 'active' | 'expired' | 'refunding' | 'refunded'
  // ...
}

// 2. API 对象 (命名: client + 模块 + Api)
export const clientOrderApi = {
  /**
   * 获取用户订单列表
   */
  async getOrderList(params?: { 
    limit?: number
    status?: string 
  }): Promise<{ 
    success: boolean
    data?: ClientOrder[]
    error?: string 
  }> {
    const client = getSupabaseClient()
    // RLS 自动过滤当前用户
    const { data, error } = await client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  /**
   * 获取订单详情
   */
  async getOrderDetail(orderId: string): Promise<{...}> { ... },
}
```

### 3.2 返回格式统一

```typescript
// 成功
{ success: true, data: [...] }

// 失败
{ success: false, error: '错误信息' }
```

### 3.3 统一导出

```typescript
// api/client/index.ts
export { clientOrderApi } from './order'
export { clientProductApi } from './product'
export { clientCartApi } from './cart'
export { clientUserApi } from './user'
```

### 3.4 禁止事项

- ❌ 页面中直接调用 `getSupabaseClient().from('xxx')`
- ❌ 使用旧的 `http.get/post()` 调用 Java 后端
- ❌ 在 API 层抛出异常 (必须返回 `{ success: false, error }`)

---

## 四、Composable 开发规范

### 4.1 命名规则

| 场景 | 命名 | 示例 |
|------|------|------|
| 列表页 | `useXxxList` | `useOrderList` |
| 详情页 | `useXxxDetail` | `useOrderDetail` |
| 表单 | `useXxxForm` | `useProfileForm` |
| 通用业务 | `useXxx` | `useCart`, `useFavorite` |

### 4.2 标准结构

```typescript
// composables/client/useOrderList.ts

import { clientOrderApi } from '@/api/client'
import { useBizFormat, useBizConfig } from '@/composables/common'

export function useOrderList() {
  // 状态
  const loading = ref(false)
  const list = ref<ClientOrder[]>([])
  const currentTab = ref('all')
  
  // 全局工具
  const { formatPrice, formatDate } = useBizFormat()
  const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()
  
  // 方法
  async function loadList() {
    loading.value = true
    const res = await clientOrderApi.getOrderList()
    if (res.success) list.value = res.data || []
    loading.value = false
  }
  
  // 计算属性
  const filteredList = computed(() => {
    if (currentTab.value === 'all') return list.value
    return list.value.filter(o => o.status === currentTab.value)
  })
  
  return {
    loading, list, currentTab, filteredList,
    loadList,
    formatPrice, formatDate,
    getOrderStatusLabel, getOrderStatusType
  }
}
```

### 4.3 页面使用

```vue
<script setup lang="ts">
import { useOrderList } from '@/composables/client/useOrderList'

const {
  loading, filteredList, currentTab,
  loadList,
  formatPrice, formatDate,
  getOrderStatusLabel, getOrderStatusType
} = useOrderList()

onMounted(() => loadList())
</script>
```

---

## 五、全局工具

### 5.1 useBizFormat - 格式化器

```typescript
const { formatPrice, formatDate } = useBizFormat()

formatPrice(99.5)                 // → "¥99.50"
formatDate('2026-01-17T00:00:00') // → "2026-01-17 00:00"
```

### 5.2 useBizConfig - 业务配置

```typescript
const {
  getOrderStatusLabel,   // 订单状态中文
  getOrderStatusType,    // 订单状态 Tag 类型
  getProductTypeLabel,   // 商品类型中文
  getCouponTypeLabel,    // 优惠券类型中文
} = useBizConfig()
```

**重要**: 新增状态/类型时，必须在 `composables/common/useBizConfig.ts` 中添加配置。

---

## 六、页面开发规范

### 6.1 列表页模板

```vue
<template>
  <div class="page-container">
    <!-- 骨架屏 -->
    <template v-if="loading">
      <OrderSkeleton v-for="i in 5" :key="i" />
    </template>
    
    <!-- 空状态 -->
    <EmptyState v-else-if="filteredList.length === 0" />
    
    <!-- 列表 -->
    <div v-else class="list-container">
      <OrderCard 
        v-for="item in filteredList" 
        :key="item.id"
        :order="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderList } from '@/composables/client/useOrderList'

const { loading, filteredList, loadList } = useOrderList()
onMounted(() => loadList())
</script>
```

### 6.2 页面必须包含

- ✅ 加载状态 (骨架屏优先于 Loading 文字)
- ✅ 空状态 (友好的空白提示 + 引导操作)
- ✅ 错误处理 (使用 `ElMessage.error`)
- ✅ SEO Meta (首页、商品详情等公开页面)

---

## 七、设计规范

### 7.1 主题色

```css
:root {
  --primary-blue: #3B82F6;
  --primary-dark: #1E293B;
  --accent-green: #22C55E;
  --accent-orange: #F97316;
  --danger-red: #EF4444;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --bg-glass: rgba(30, 41, 59, 0.6);
  --border-glass: rgba(255, 255, 255, 0.1);
}
```

### 7.2 卡片风格 (Glassmorphism)

```css
.glass-card {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  transition: all 0.2s ease;
}

.glass-card:hover {
  background: rgba(30, 41, 59, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

### 7.3 仅限 PC 端

- 最小宽度: 1200px
- 内容区最大宽度: 1400px
- 不需要考虑响应式（移动端独立开发）

---

## 八、PC/移动端路由分发策略

### 8.1 架构设计

```
用户访问 fantula.com
        ↓
   [设备检测中间件]
        ↓
   ┌────────┴────────┐
   ↓                 ↓
PC 端代码        移动端代码
(当前项目)       (独立项目)
```

### 8.2 实现方式 (预留)

```typescript
// middleware/device-detect.global.ts (未来实现)
export default defineNuxtRouteMiddleware((to) => {
  // 仅在首次访问时检测
  if (process.server) {
    const userAgent = useRequestHeaders()['user-agent']
    const isMobile = /iPhone|iPad|Android|Mobile/i.test(userAgent || '')
    
    if (isMobile) {
      // 重定向到移动端域名或路由
      return navigateTo('https://m.fantula.com' + to.path)
    }
  }
})
```

---

## 九、暂停开发模块

以下模块暂不开发，日后开放：

| 模块 | 路由 | 状态 | 备注 |
|------|------|------|------|
| 工单系统 | `/profile/tickets` | 🔒 暂停 | 保留页面，功能不完善 |
| 社区 | `/community` | 🔒 暂停 | 待产品规划 |

---

## 十、新功能开发检查清单

开发新的客户端功能时，按以下顺序完成：

- [ ] **API 层**: 创建 `api/client/xxx.ts`
- [ ] **类型定义**: 在 API 文件中定义接口或引入 `types/`
- [ ] **统一导出**: 在 `api/client/index.ts` 添加导出
- [ ] **Composable**: 创建 `composables/client/useXxx.ts`
- [ ] **全局配置**: 如有新状态/类型，更新 `useBizConfig.ts`
- [ ] **组件归类**: 弹窗放入对应的 `modal/` 子目录
- [ ] **页面开发**: 使用 Composable，遵循模板
- [ ] **验证**: `npm run build` 无错误

---

*最后更新: 2026-01-17*
