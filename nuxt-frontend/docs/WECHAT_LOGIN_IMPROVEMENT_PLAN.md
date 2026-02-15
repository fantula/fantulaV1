# 微信登录持久化改进方案

**日期**: 2026-02-15
**目标**: 解决微信内登录状态频繁丢失问题

## 1. 核心改进策略

### (1) 延长 Token Cookie 生命周期
*   **当前**: Session Cookie (浏览器关闭即失效)。
*   **改进**: 设置 `maxAge` (例如 30 天)，使其与 Supabase Refresh Token 有效期匹配。
*   **影响**: 即使关闭微信再打开，Cookie 依然存在，插件直接判定为已登录。

### (2) 增加 Session 恢复机制 (Fail-safe)
*   **当前**: 无 Cookie = 强制 Logout。
*   **改进**: 在 `auth.client.ts` 插件中增加逻辑：
    *   若 Cookie 缺失，先检查 Supabase SDK 是否有有效 Session (LocalStorage)。
    *   若有有效 Session，**自动恢复 Cookie** 并同步 `userStore`。
    *   仅当两者均无效时，才执行 Logout。

### (3) 静默 Token 刷新 (Silent Refresh)
*   **当前**: 依赖 `fetchUserInfo` 失败后的手动处理。
*   **改进**: 启动时检查 Token 是否即将过期，利用 Supabase `refreshSession()` 主动刷新 Token，确保持久化登录有效性。

## 2. 实施步骤

1.  **修改 `stores/client/user.ts`**:
    *   在设置 Cookie 时增加 `maxAge: 60 * 60 * 24 * 30` (30天)。
    *   增加 `restoreSessionFromSupabase()` 方法。

2.  **修改 `plugins/auth.client.ts`**:
    *   重构初始化逻辑：
        ```typescript
        if (!token.value) {
            // 尝试从 Supabase 恢复
            const recovered = await userStore.restoreSessionFromSupabase()
            if (!recovered) userStore.logout()
        }
        ```

3.  **验证 `wechat-callback.vue`**:
    *   确保 Magic Link 回调正确等待 Session 建立。

## 3. 风险与规避

*   **SSR 兼容性**: 修改仅涉及客户端逻辑 (`process.client`)，不影响服务端渲染。
*   **安全性**: LocalStorage 中的 Token 虽不如 HttpOnly Cookie 安全，但在移动端 WebView 环境风险可控，且 Supabase 机制本身即基于此。
*   **多端同步**: 若用户在 PC 改密/注销，移动端 Token 刷新时会失效，符合预期。

## 4. 预期效果

*   **场景 A**: 当天再次打开公众号 -> Cookie 有效 -> **直接登录**。
*   **场景 B**: 隔天打开 (Cookie 意外失效) -> LocalStorage 有效 -> **自动恢复登录**。
*   **场景 C**: 30天后打开 -> 全部失效 -> **提示重新登录**。
