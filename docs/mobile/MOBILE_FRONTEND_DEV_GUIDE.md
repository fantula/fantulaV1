# 移动端前端开发指南

> 给前端工程师的 UI 开发规范  
> 最后更新: 2026-02-11

---

## 一、核心准则（必读）

### 1.1 开发原则

```
✅ 只做 UI 布局和交互
✅ 复用现有 API 和数据获取逻辑
✅ 共享同一数据源

❌ 不复制一套业务逻辑
❌ 不为移动端单独实现数据请求
❌ 不引入新的业务状态
❌ 不使用 Element Plus（移动端应轻量化）
❌ 不使用 PC 端大屏布局组件
```

### 1.2 文件结构

```
nuxt-frontend/
├── pages/mobile/           # 移动端页面
├── components/mobile/      # 移动端专属组件
├── layouts/mobile.vue      # 移动端布局
├── assets/styles/mobile.css # 移动端样式
├── api/client/             # 共用 API（PC/Mobile 共享）
└── stores/client/          # 共用状态管理
```

---

## 二、用户认证体系

### 2.1 身份模型

```
邮箱 (email) = 用户最大识别符
  │
  ├── 登录方式1: 邮箱 + 验证码
  ├── 登录方式2: 邮箱 + 密码
  └── 登录方式3: 微信登录 → 必须绑定邮箱
  
微信 = 辅助登录方式（可选）
  └── profiles.wechat_openid（UNIQUE，支付必需）
```

**前端开发注意：**
- 任何涉及"登录"的 UI 都必须以邮箱为中心
- 微信登录流程最终也要到邮箱绑定页面
- 不要创建"仅微信登录"的入口

### 2.2 Session 管理

| 方式 | 说明 | 何时使用 |
|------|------|---------|
| `userStore.user` | 用户信息对象 | 显示昵称、余额等 |
| `userStore.isLoggedIn` | 是否登录 | 控制登录态 UI |
| `userStore.user.openId` | 微信 OpenID | 发起微信支付 |
| `supabase.auth.getUser()` | 服务端验证身份 | API 鉴权 |

**⚠️ 关键概念：**
- `userStore` 是**前端缓存**，优先从这里读数据
- 但 API 调用依赖的是 **Supabase Session**（自动管理）
- 两者不同步时调用 `userStore.fetchUserInfo()` 刷新

### 2.3 Token Cookie

```
cookie 名: token
值: Supabase access_token
```

- 由 `setUser(user, token)` 设置
- 用 `useCookie('token')` 读取
- `logout()` 时清除

---

## 三、微信登录 UI 开发

### 3.1 流程状态机

```
           ┌─────────────────────────────────────┐
           │        wechat-callback.vue          │
           │                                     │
   code ──→│  ┌─────────┐                       │
           │  │ loading  │ (调用 oauth-login)     │
           │  └────┬─────┘                       │
           │       │                             │
           │  ┌────▼─────┐    ┌──────────────┐  │
           │  │need_bind │───→│  绑定邮箱表单  │  │
           │  └──────────┘    │  (输入邮箱+码) │  │
           │                  └──────┬────────┘  │
           │  ┌──────────┐         │            │
           │  │logged_in │         │            │
           │  └────┬─────┘    ┌────▼────┐       │
           │       │          │ success │       │
           │  (Magic Link)    └────┬────┘       │
           │       │               │            │
           └───────┼───────────────┼────────────┘
                   │               │
                   ▼               ▼
              跳转首页         跳转首页
```

### 3.2 绑定邮箱表单 UI 要素

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 邮箱 | email input | ✅ | 主账号标识 |
| 验证码 | 6位数字 | ✅ | OTP 验证 |
| 密码 | password | ❌ | 可选，设置后可用密码登录 |
| 昵称 | text | ❌ | 默认用微信昵称 |
| 头像 | display | ❌ | 默认用微信头像 |
| 协议勾选 | checkbox | ✅ | 必须同意 |

### 3.3 涉及的 API

```typescript
import { wechatLoginApi } from '@/api/client/wechat-login'

// 微信 OAuth 登录检查
wechatLoginApi.oauthLogin(code, redirectTo?)
// 返回: { status: 'logged_in' | 'need_bind', ... }

// 绑定微信到邮箱
wechatLoginApi.bindWechatToEmail({ bindToken, email, code, password?, nickname?, avatar? })
// 返回: { user, session }

// 发送邮箱验证码
authApi.getEmailCode(email)
```

---

## 四、微信支付 UI 开发

### 4.1 充值弹窗 (RechargeModal)

**设计要素：**
- 预设充值档位（如 10/30/50/100/300）
- 每个档位显示赠送金额（bonus）
- 自定义金额输入
- 微信支付按钮

**数据流：**
```
用户选择/输入金额
  → handleRecharge()
  → getOpenId()          # 获取微信OpenID
  → jsapiPayRecharge()   # 下发支付参数
  → WeixinJSBridge       # 调起微信支付
  → 支付成功/失败          # 更新UI
```

### 4.2 OpenID 获取策略（getOpenId）

```
优先级逐级递降:
1. 本地变量 userOpenId    → 直接用
2. userStore.user.openId  → 直接用（从 profiles.wechat_openid）
3. fetchUserInfo() 刷新   → 异步获取最新数据
4. localStorage 缓存      → 直接用
5. URL code 参数          → 调 API 换取
6. 都没有                 → 走微信 OAuth 授权（snsapi_base 静默授权）
```

**⚠️ 对前端的意义：**
- 大多数情况 OpenID 在步骤 2-3 就能拿到（用户已微信登录）
- 只有极少情况（session 过期/缓存清除）才需要走 OAuth
- **UI 需要处理的状态：加载中 → 成功/失败**

### 4.3 涉及的 API

```typescript
import wechatPayApi from '@/api/client/wechat-payment'

// 获取 OpenID
wechatPayApi.getOpenId(code)

// JSAPI 支付下单
wechatPayApi.jsapiPayRecharge(amount, openid, description, bonus)
// 返回: { appId, timeStamp, nonceStr, package, signType, paySign }
```

### 4.4 支付 UI 状态

```
idle → loading → paying → success/fail
             ↑
        getOpenId 获取中
```

---

## 五、账号注销 UI 开发

### 5.1 注销流程

```
用户点击"注销账号"
  → 弹窗风险提示（不可恢复）
  → 勾选"已了解风险" + 输入确认文字
  → 调用 authApi.deleteAccount()  ← RPC: delete_own_account()
  → 级联删除: auth.users → profiles → 14张子表
  → supabase.auth.signOut()
  → userStore.logout() (清除 user/token/wechat_openid)
  → 跳转到登录页
```

### 5.2 注销 API

```typescript
import { authApi } from '@/api/client/auth'

// 注销当前账号
const res = await authApi.deleteAccount()
// 返回: { success: boolean, msg: string }
// 成功后自动 signOut()
```

### 5.3 注销清除的数据

以下数据会通过数据库 CASCADE 自动删除：

| 表 | 删除方式 |
|----|---------|
| cart_items | CASCADE |
| coupon_codes | CASCADE |
| messages | CASCADE |
| pre_orders | CASCADE |
| recharge_orders | CASCADE |
| refund_requests | CASCADE (user_id) / SET NULL (admin_id) |
| slot_occupancies | CASCADE |
| ticket_messages | CASCADE |
| tickets | CASCADE |
| user_coupons | CASCADE |
| user_favorites | CASCADE |
| wallet_transactions | CASCADE |
| orders | SET NULL（订单保留，user_id 置空） |

---

## 六、API 使用规范

### 6.1 共用 API 层

```
api/client/
├── auth.ts              # 认证（登录/注册/修改密码/注销）
├── wechat-login.ts      # 微信登录
├── wechat-payment.ts    # 微信支付
├── order.ts             # 订单
├── product.ts           # 商品
├── common.ts            # 通用（收藏等）
└── message.ts           # 消息
```

**PC 和 Mobile 共用同一套 API，不要为移动端创建新的 API 文件。**

### 6.2 状态管理

```
stores/client/
├── user.ts              # 用户状态（登录/余额/收藏/订单）
├── cart.ts              # 购物车
└── ...
```

**使用方式：**
```typescript
const userStore = useUserStore()

// 获取用户信息
userStore.user?.nickName
userStore.user?.balance
userStore.user?.openId

// 检查登录
userStore.isLoggedIn

// 刷新数据
await userStore.fetchUserInfo()
await userStore.fetchWalletData()
```

### 6.3 Auth Headers

所有需要鉴权的 API 调用都通过 `getAuthHeaders()` 自动添加 token：

```typescript
// api/client/wechat-payment.ts 中的示例
const headers = await getAuthHeaders()
const data = await $fetch('/api/xxx', { headers })
```

前端 UI 层面**不需要手动管理 token**。

---

## 七、UI 开发检查清单

### 7.1 新页面开发

- [ ] 放在 `/pages/mobile/` 目录
- [ ] 使用 `layout: 'mobile'`
- [ ] 不引入 Element Plus 组件
- [ ] 数据获取复用现有 API（不新建）
- [ ] 状态管理复用现有 Store
- [ ] 检查登录态：`userStore.isLoggedIn`
- [ ] 适配微信浏览器环境

### 7.2 充值/支付页面

- [ ] 检查微信浏览器：`navigator.userAgent.includes('micromessenger')`
- [ ] 获取 OpenID：使用 `getOpenId()` 多级策略
- [ ] 处理支付状态：loading / paying / success / fail
- [ ] 支付成功后刷新余额：`userStore.fetchUserInfo()`

### 7.3 账号相关页面

- [ ] 登录后显示邮箱（可脱敏：`j****@gmail.com`）
- [ ] 显示微信绑定状态
- [ ] 注销功能必须有二次确认 + 风险提示
- [ ] 注销后清除所有本地缓存
