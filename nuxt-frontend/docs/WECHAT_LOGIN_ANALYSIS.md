# 微信登录场景分析报告

**日期**: 2026-02-15
**分析对象**: 微信环境登录持久化问题

## 1. 登录路径梳理

### 场景一：首次/未登录用户
1.  **入口**: 用户访问 `/mobile` (或其他需授权页面)。
2.  **触发 OAuth**: `pages/mobile/index.vue` 检测到 `?code=...` (或手动点击登录唤起授权 URL)。
3.  **API 请求**: 前端调用 `wechatLoginApi.oauthLogin(code)`。
4.  **后端处理**:
    *   交换 OpenID。
    *   查找用户 Profile。
    *   **生成 Magic Link**: 后端生成 Supabase Magic Link，重定向地址为 `/mobile/wechat-callback`。
    *   返回 `actionLink` 给前端。
5.  **前端跳转**: `window.location.href = actionLink`。
6.  **Supabase 验证**:
    *   用户访问 Magic Link (Supabase Auth Server)。
    *   验证通过，重定向至 `/mobile/wechat-callback#access_token=...&refresh_token=...`。
7.  **回调处理**:
    *   `wechat-callback.vue` 监听 `onAuthStateChange`。
    *   提取 `access_token`。
    *   调用 `userStore.setUser(user, token)`。
    *   **写入状态**:
        *   `token` Cookie (默认 Session Cookie)。
        *   `user_info` LocalStorage。
        *   Supabase SDK 写入内部 LocalStorage Session。

### 场景二：二次访问 (问题场景)
1.  **入口**: 用户关闭微信，一段时间后再次打开公众号访问网站。
2.  **状态检查**: Nuxt 插件 `plugins/auth.client.ts` 初始化。
3.  **Cookie 检查**: `useCookie('token')`。
    *   **现状**: 由于是 Session Cookie，微信进程关闭后 **Cookie 已失效/被清除**。
4.  **逻辑分支**:
    *   `if (!token.value)` -> 判定为未登录。
    *   **执行 `userStore.logout()`**。
    *   结果：即使 Supabase SDK 在 LocalStorage 中仍有有效 Session，也被业务逻辑强制清除。
5.  **用户感知**: 页面显示未登录，需要重新走 OAuth。

---

## 2. 当前状态管理方式

| 存储类型 | 键名/机制 | 持久化策略 | 现状 |
| :--- | :--- | :--- | :--- |
| **业务 Token** | Cookie: `token` | **Session (默认)** | ⚠️ **浏览器关闭即失效** |
| **用户信息** | LocalStorage: `user_info` | 永久 | 持久化，但依赖 Token 有效性 |
| **Supabase Session** | LocalStorage: `sb-...-auth-token` | 永久 (直至过期) | ✅ **持久化 (但被忽略)** |
| **Vuex/Pinia** | Memory | 刷新即失 | 正常 |

## 3. 问题根因分析

**核心矛盾**:
业务逻辑 (`auth.client.ts`) 强依赖 **Cookie** 作为登录凭证，但该 Cookie 未设置持久化期限 (MaxAge)，导致其生命周期短于 Supabase 的 LocalStorage Session。

**导致结果**:
微信关闭 -> Cookie 消失 -> 再次打开 -> 插件检测无 Cookie -> 强制 Logout -> 忽略了本可以恢复的 Supabase Session。

## 4. 结论
这不是 iOS 或微信的 bug，而是 **Cookie 策略与 Supabase 持久化策略不匹配** 导致的逻辑断层。

改进的核心在于：**在 Cookie 丢失但 LocalStorage 有效时，自动恢复 Cookie。**
