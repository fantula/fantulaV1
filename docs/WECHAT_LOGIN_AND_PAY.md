# 微信登录 + 微信支付 完整技术文档

> ⚠️ **维护文档** — 修改微信相关功能前必读  
> 最后更新: 2026-02-11

---

## 一、核心架构原则

### 1.1 身份模型：邮箱为最大识别

```
邮箱 (email) ← ── auth.users.id ── → profiles.id
                        │
                   可选绑定 (1:1)
                        │
                   wechat_openid (UNIQUE)
```

- **邮箱** 是用户的 **唯一识别符**（不可重复）
- **微信** 是可选的 **辅助登录方式**，依附于邮箱账号
- 每个微信号只能绑定一个邮箱（`profiles.wechat_openid` UNIQUE 约束）
- 无论通过哪种方式登录，最终都落到同一个 `auth.users` 记录

### 1.2 数据库约束

| 表 | 约束 | 说明 |
|----|------|------|
| `auth.users` | `email` UNIQUE | 邮箱全局唯一 |
| `profiles` | `id` FK → `auth.users.id` ON DELETE CASCADE | 删 auth.users 自动删 profiles |
| `profiles` | `wechat_openid` UNIQUE | 一微信一账号 |
| `profiles` | `uid` UNIQUE | 8位数字用户ID |
| 14张子表 | FK → `profiles.id` ON DELETE CASCADE | 注销账号自动清除所有数据 |

### 1.3 关键列

```sql
profiles:
  id             uuid    -- = auth.users.id
  uid            char(8) -- 用户展示ID
  email          varchar -- 邮箱
  nickname       text    -- 昵称
  balance        numeric -- 余额
  wechat_openid  text    -- 微信OpenID（支付必需）
  wechat_unionid text    -- 微信UnionID
  updated_at     timestamptz -- 更新时间
```

---

## 二、文件结构

```
nuxt-frontend/
├── server/api/
│   ├── wechat/
│   │   ├── oauth-login.post.ts    # 微信OAuth登录入口(code→openid→检查绑定)
│   │   ├── get-openid.post.ts     # 单独获取OpenID（已登录用户,支付用）
│   │   ├── jsapi-pay.post.ts      # 微信JSAPI支付下单（公众号内）
│   │   ├── notify.post.ts         # 微信支付回调（余额+bonus更新）
│   │   └── callback.post.ts       # 微信公众号消息/事件推送处理
│   └── auth/
│       └── bind-wechat.post.ts    # 绑定微信到邮箱（新用户注册/已有用户绑定）
│
├── server/utils/
│   ├── supabase.ts                # Supabase 客户端工具
│   │   ├── getSupabaseClient()        # 用户级客户端(带RLS)
│   │   └── getSupabaseServiceClient() # Service Role客户端(绕过RLS)
│   ├── wechat-login.ts            # 微信登录工具(bindToken生成/验证)
│   └── wechat-pay.ts              # 微信支付工具(签名/解密/API请求)
│
├── api/client/
│   ├── wechat-login.ts            # 前端微信登录API封装
│   └── wechat-payment.ts          # 前端微信支付API封装
│
├── pages/mobile/
│   └── wechat-callback.vue        # 微信授权回调处理页(核心路由)
│
├── components/mobile/profile/modals/
│   └── RechargeModal.vue          # 充值弹窗(JSAPI支付发起)
│
└── stores/client/
    └── user.ts                    # 用户状态管理(openId/session)
```

---

## 三、完整登录流程

### 3.1 微信登录（新用户）

```
用户进入微信公众号菜单
  → 跳转 fantula.com/mobile
  → 未登录 → 跳转微信 OAuth（snsapi_userinfo）
  → 微信授权 → 回调 /mobile/wechat-callback?code=xxx

wechat-callback.vue (onMounted):
  → POST /api/wechat/oauth-login { code }
  
oauth-login.post.ts:
  → code 换 access_token + openid（微信API）
  → 查 profiles.wechat_openid = openid
  → 没找到 → 返回 { status: 'need_bind', bindToken }

wechat-callback.vue:
  → 显示邮箱绑定表单
  → 用户输入邮箱 + 验证码
  → POST /api/auth/bind-wechat { bindToken, email, code }

bind-wechat.post.ts:
  → 验证 bindToken → 获取 openid
  → 验证邮箱验证码（verifyOtp）→ 创建/找到 auth.users
  → 创建/更新 profiles（写入 wechat_openid）
  → 返回 { user, session }

wechat-callback.vue (onBind成功):
  → ⚠️ supabase.auth.setSession() ← 建立客户端Session（关键！）
  → userStore.setUser() + fetchUserInfo()
  → 跳转首页
```

### 3.2 微信登录（老用户/返回用户）

```
wechat-callback.vue → POST /api/wechat/oauth-login { code }

oauth-login.post.ts:
  → 查 profiles.wechat_openid = openid → 找到
  → admin.generateLink({ type: 'magiclink', email }) 
  → 返回 { status: 'logged_in', actionLink }

wechat-callback.vue:
  → window.location.href = actionLink（跳转Magic Link）
  → GoTrue 验证 → 重定向回 wechat-callback#access_token=xxx
  → Supabase 客户端自动从 hash 恢复 session ✅
  → onAuthStateChange → SIGNED_IN
  → userStore.setUser() → 跳转首页
```

### 3.3 邮箱直接登录

```
用户输入邮箱 + 验证码
  → authApi.loginWithCode() → supabase.auth.verifyOtp()
  → session 建立 → userStore.setUser()
  
或 邮箱 + 密码
  → authApi.login() → supabase.auth.signInWithPassword()
```

---

## 四、完整支付流程

### 4.1 充值支付（微信JSAPI）

```
RechargeModal.vue → handleRecharge():
  1. getOpenId():
     - userOpenId 缓存 → ✅ 直接用
     - userStore.user.openId → ✅ 直接用
     - 已登录但无openId → fetchUserInfo() 刷新 → profiles.wechat_openid
     - localStorage 缓存 → ✅ 用
     - 都没有 → redirectToWechatAuth(state=recharge)

  2. 获取到 openId 后:
     → POST /api/wechat/jsapi-pay { amount, openid, description, bonus }
     → 生成微信预付单 → 返回 prepay_id + 签名参数
     → WeixinJSBridge.invoke('getBrandWCPayRequest', ...)
     → 用户完成支付

  3. 支付回调:
     微信 → POST /api/wechat/notify
     → 验签 → 解密 → 获取 out_trade_no
     → 查询 recharge_orders → 读取 bonus
     → 更新 profiles.balance = currentBalance + amount + bonus
     → 记录 wallet_transactions
     → 更新 recharge_orders.status = 'paid'
```

### 4.2 充值场景的 OpenID 获取（state=recharge）

```
如果 getOpenId() 各级缓存都没找到，需要走 OAuth:

redirectToWechatAuth():
  → 微信 OAuth（snsapi_base 静默授权）
  → 回调 /mobile/wechat-callback?code=xxx&state=recharge

wechat-callback.vue:
  → 检测 state === 'recharge'
  → 不走登录/绑定逻辑！
  → POST /api/wechat/get-openid { code }
  → 存 localStorage('wechat_openid')
  → 跳回 return_to（充值页）
```

---

## 五、Session 管理要点

### 5.1 Supabase Session ≠ Cookie Token

```
❌ 错误理解: cookie 有 token 就是登录了
✅ 正确理解: Supabase JS Client 必须有 session 才能调 auth.getUser()
```

**两种建立 session 的方式：**

| 方式 | 场景 | 实现 |
|------|------|------|
| **自动** | Magic Link 回调 | hash 中的 access_token 被 Supabase Client 自动处理 |
| **手动** | bind-wechat 返回 | 必须调用 `supabase.auth.setSession({ access_token, refresh_token })` |

### 5.2 Session 生命周期

```
创建:
  - Magic Link → 自动
  - verifyOtp → 自动（邮箱登录）
  - bind-wechat → 手动 setSession()  ← 容易遗漏！

刷新:
  - Supabase Client 自动用 refresh_token 刷新

销毁:
  - logout() → supabase.auth.signOut()
  - 注销账号 → delete_own_account() → signOut()
```

---

## 六、踩坑记录 ⚠️

### 6.1 profiles 表缺少 updated_at 列

**问题**：多个端点更新 profiles 时包含 `updated_at` 字段，但该列不存在。PostgREST 收到不存在的列会拒绝整个 update 请求，但 Supabase JS Client 如果不检查 error 返回值就会静默失败。

**影响**：
- `notify.post.ts` 更新余额失败 → 支付成功但余额不变
- `get-openid.post.ts` 保存 openid 失败

**修复**：
- 添加了 `profiles.updated_at` 列
- 所有 update 操作加了 error 检查

**教训**：
```typescript
// ❌ 不检查错误
await supabase.from('profiles').update({ balance: 100 }).eq('id', userId)

// ✅ 必须检查错误
const { error } = await supabase.from('profiles').update({ balance: 100 }).eq('id', userId)
if (error) console.error('Update failed:', error)
```

### 6.2 Nuxt runtimeConfig 运行时覆盖需要 NUXT_ 前缀

**问题**：本地构建写入了本地的 `WECHAT_APP_SECRET`，服务器上的 `.env` 用 `WECHAT_APP_SECRET` 无法覆盖。

**原因**：Nuxt 3 运行时只识别 **`NUXT_`** 前缀的环境变量来覆盖 runtimeConfig。

**修复**：服务器 `.env` 中使用 `NUXT_WECHAT_APP_SECRET=xxx`

### 6.3 绑定成功后未建立 Supabase Session

**问题**：`onBind()` 成功后只调了 `userStore.setUser()`，没有在 Supabase JS Client 上建立 session。后续需要 auth 的 API 全部 401。

**修复**：绑定成功后必须调用：
```typescript
await supabase.auth.setSession({
  access_token: session.access_token,
  refresh_token: session.refresh_token,
})
```

### 6.4 wechat-callback 不区分登录/绑定/支付场景

**问题**：充值获取 OpenID 的 OAuth 回调也走到了"绑定微信"逻辑，导致循环。

**修复**：通过 `state` 参数区分场景：
- `state=recharge` → 只获取 openid，不走绑定
- 无 state + 已登录 → 绑定微信到现有账号
- 无 state + 未登录 → 新用户登录/注册

### 6.5 充值 bonus 未传递

**问题**：前端选择了赠送档位（如 10元+赠10），但 bonus 在整条链路中未传递：RechargeModal → wechat-payment API → jsapi-pay.post.ts → recharge_orders → notify.post.ts。

**修复**：在所有环节添加 bonus 参数传递。

### 6.6 注销后 localStorage 残留

**问题**：注销账号后 `localStorage.wechat_openid` 残留，重新注册后可能使用旧的（已删除账号的）openid。

**修复**：`logout()` 中清除 `localStorage.removeItem('wechat_openid')`。

### 6.7 外键 NO ACTION 导致注销失败

**问题**：14张子表中有7张使用 `NO ACTION` 删除规则，用户注销时 `DELETE FROM auth.users` 被外键约束阻止。

**修复**：所有子表改为 `ON DELETE CASCADE`（orders 保留 `SET NULL`）。

### 6.8 mobile/index.vue 双重消费 OAuth Code

**问题**：`pages/mobile/index.vue` 在 `onMounted` 中检测到 `?code=` 时，先调用 `oauthLogin(code)` 消费了微信 code。如果返回 `need_bind`，又把已消费的 code 转发给 `wechat-callback?code=${code}`。微信 OAuth code 是一次性的，第二次使用必定返回 `invalid code` 错误。

**影响**：所有新用户通过微信登录 → 绑定邮箱的流程 100% 失败。

**修复**：`mobile/index.vue` 不再调用 `oauthLogin`，直接将 code 转发给 `wechat-callback.vue` 统一处理。

**教训**：
```
❌ 在多个页面中使用同一个 OAuth code
✅ OAuth code 只能在一个地方消费，建立统一入口
```

### 6.9 Magic Link 回调竞态条件

**问题**：`wechat-callback.vue` 在处理 Magic Link hash 回调时，同时使用 `onAuthStateChange` 监听和 `getSession()` 直接获取来恢复 session，可能导致 `setUser` 和跳转逻辑被执行两次。且缺少超时保护，如果 session 建立失败，页面会永远停留在 loading 状态。

**修复**：
- 使用 `handled` 标志防止双重执行
- 添加 15 秒超时保护

### 6.10 部署环境 Service Key 失效 (Invalid Credentials)

**问题**：部署后绑定微信时报错 `Invalid authentication credentials`，导致 Profile 创建失败。本地开发一切正常。

**根本原因**：
1. Nuxt 3 `npm run build` 会将本地开发机 `.env` 中的值（如 `SUPABASE_SERVICE_KEY=sb_secret_...`）打包进 `.output`。
2. 服务器虽然在 `.env` 中配置了正确的 JWT Key，但变量名仅为 `SUPABASE_SERVICE_KEY`。
3. **Nuxt 3 运行时只允许 `NUXT_` 前缀的环境变量覆盖构建时的默认值**。
4. 结果：服务器运行的代码依然使用打包进去的错误的本地 Key。

**临时修复**：在服务器 `.env` 中手动添加 `NUXT_SUPABASE_SERVICE_KEY=...`

**根治方案**：见 6.11。

### 6.11 本地构建烘焙错误配置导致微信支付"未登录" (系统性修复) 🔴

**问题**：微信支付（充值）在 PC 和移动端都提示"未登录"(401)。

**根本原因**：
`deploy.sh` 在本地执行 `npm run build`，本地 `.env` 的 `SUPABASE_URL=http://127.0.0.1:54321` 和本地 anon key 被烘焙进构建产物。服务器 `.env` 中虽然有正确的 `SUPABASE_URL=https://www.fantula.com`，但普通环境变量名无法覆盖 Nuxt runtimeConfig —— 必须用 `NUXT_` 前缀。

结果：`getCurrentUser()` 创建的 Supabase 客户端连接的是错误的实例（`127.0.0.1:54321`），无法验证浏览器端发来的 JWT → 401 未登录。

> 微信登录不受影响，因为它使用 `getSupabaseServiceClient()`（service role），不依赖用户 JWT 验证。

**修复（三处，缺一不可）**：

**1. `server/utils/supabase.ts` — 服务端配置优先级**

让 `getSupabaseClient()` / `getSupabaseServiceClient()` 优先从 `process.env` 读取，不仅仅依赖可能被烘焙了错误值的 runtimeConfig：

```typescript
// 优先级: process.env.NUXT_PUBLIC_API_BASE > process.env.SUPABASE_URL > runtimeConfig > fallback
function resolveSupabaseUrl(): string {
    const config = useRuntimeConfig()
    return process.env.NUXT_PUBLIC_API_BASE
        || process.env.SUPABASE_URL
        || config.public.apiBase
        || 'http://127.0.0.1:54321'
}
```

Key 的解析同理（`NUXT_SUPABASE_KEY` > `SUPABASE_KEY` > runtimeConfig）。

**2. `ecosystem.config.js` — PM2 自动映射 NUXT_ 前缀**

在 `env` 对象中自动从 `.env` 的原始变量名映射到 `NUXT_` 前缀，不再需要手动维护双份变量：

```javascript
env: {
    ...envConfig,
    // 自动映射到 NUXT_ 前缀
    NUXT_PUBLIC_API_BASE: envConfig.SUPABASE_URL || '',
    NUXT_SUPABASE_KEY: envConfig.SUPABASE_KEY || '',
    NUXT_SUPABASE_SERVICE_KEY: envConfig.SUPABASE_SERVICE_KEY || '',
    NUXT_WECHAT_PAY_MCHID: envConfig.WECHAT_PAY_MCHID || '',
    // ... 所有微信配置同理
}
```

**3. `utils/supabase.ts` — 客户端 token 刷新**

`getAuthToken()` 增加 token 过期检测，即将过期时主动调用 `refreshSession()`，避免发送过期 JWT 到服务端。

**验证方式**：
```bash
# 部署后检查启动日志，确认 URL 正确
pm2 logs fantula --lines 20 --nostream | grep '\[Supabase\]'
# 应看到:
# [Supabase] Resolved URL: https://www.fantula.com
# [Supabase] URL source: NUXT_PUBLIC_API_BASE
```

**教训**：
```
⚠️ "本地构建 + 远程运行"模式下，所有敏感配置都可能被烘焙成错误值。
⚠️ 服务端代码不能只依赖 runtimeConfig，必须 fallback 到 process.env 直接读取。
⚠️ ecosystem.config.js 是连接服务器 .env 和 Nuxt runtimeConfig 的桥梁。
```

---

## 七、排错指南

### 7.1 常见错误及排查

| 错误信息 | 原因 | 排查方法 |
|---------|------|---------|
| `invalid appsecret` | AppSecret 不匹配 | 检查 `NUXT_WECHAT_APP_SECRET` 环境变量 |
| `未登录` (401) | Supabase session 未建立，或服务端连接了错误的 Supabase 实例 | 1. 检查 setSession() 是否调用；2. 查日志 `[Supabase] Resolved URL:` 确认非 127.0.0.1 |
| `缺少绑定凭证` | 充值 code 被当作绑定处理 | 检查 state 参数是否为 recharge |
| `此微信已绑定其他账号` | openid 已被其它 profile 占用 | 查 `profiles.wechat_openid` |
| 支付成功但余额不变 | update profiles 静默失败 | 查日志中的 `[Notify] Failed to update balance` |
| 赠送额度未到账 | bonus 未传递 | 查 `recharge_orders.bonus` 和 `attach` JSON |

### 7.2 查看日志

```bash
# 实时日志
ssh root@180.163.87.70 "pm2 logs fantula --lines 50"

# 只看错误
ssh root@180.163.87.70 "pm2 logs fantula --err --lines 30"

# 搜索特定关键字
ssh root@180.163.87.70 "pm2 logs fantula --nostream --lines 200 2>&1 | grep 'Notify'"
```

### 7.3 检查数据库

```bash
# 查看用户 profile
docker exec supabase-db psql -U supabase_admin -d postgres -c "
  SELECT id, email, balance, wechat_openid FROM profiles WHERE email = 'xxx@xxx.com';
"

# 查看充值订单
docker exec supabase-db psql -U supabase_admin -d postgres -c "
  SELECT out_trade_no, amount, bonus, status, paid_at FROM recharge_orders 
  WHERE user_id = 'xxx' ORDER BY created_at DESC LIMIT 5;
"

# 查看钱包流水
docker exec supabase-db psql -U supabase_admin -d postgres -c "
  SELECT type, amount, balance_after, description FROM wallet_transactions 
  WHERE user_id = 'xxx' ORDER BY created_at DESC LIMIT 5;
"
```

---

## 八、环境变量清单

### Nuxt runtimeConfig（nuxt.config.ts）

| 变量名 | 运行时覆盖 | 说明 |
|--------|-----------|------|
| `wechatAppSecret` | `NUXT_WECHAT_APP_SECRET` | 微信公众号 AppSecret |
| `supabaseServiceKey` | `NUXT_SUPABASE_SERVICE_KEY` | Supabase Service Role Key |
| `wechatPayMchId` | `NUXT_WECHAT_PAY_MCH_ID` | 微信支付商户号 |
| `wechatPayApiV3Key` | `NUXT_WECHAT_PAY_API_V3_KEY` | 微信支付 API V3 密钥 |
| `wechatPayPrivateKey` | `NUXT_WECHAT_PAY_PRIVATE_KEY` | 商户私钥（单行） |
| `wechatPaySerialNo` | `NUXT_WECHAT_PAY_SERIAL_NO` | 证书序列号 |
| `public.supabaseUrl` | `NUXT_PUBLIC_SUPABASE_URL` | Supabase API URL |
| `public.supabaseAnonKey` | `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key |

> ⚠️ **重要**：构建时 `npm run build` 会将 runtimeConfig 默认值写入 `.output`。  
> 运行时只有 `NUXT_` 前缀的环境变量才能覆盖这些默认值。
