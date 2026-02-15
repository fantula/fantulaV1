# 首页数据稳定性规范 (Homepage Data Stability Specification)

**版本**: v1.0
**生效日期**: 2026-02-15
**适用范围**: PC端首页 (`/`, `/pc`)、移动端首页 (`/mobile`)

---

## 1. 核心铁律 (Core Principles)

### 1.1 单一数据源 (Single Source of Truth)
*   **原则**: 首页所有核心业务数据（Banner、分类、首屏商品）必须且不仅限于通过 `useHomeData` 获取。
*   **禁止**: 禁止在页面组件 (`index.vue`) 或子组件中分别调用 API。
*   **目的**: 确保 SSR 渲染的数据与客户端 Hydration 时完全一致，避免重复请求。

### 1.2 零 Hydration Mismatch (Zero Hydration Mismatch Target)
*   **原则**: 服务端渲染的 HTML 结构必须与客户端首次挂载的 DOM 结构完全一致。
*   **禁止**: 禁止在 `setup` 或根模板中使用 `v-if="userStore.isLoggedIn"` 直接控制 DOM 结构。
*   **方案**:
    1.  使用 `<ClientOnly>` 包裹与登录态这种强客户端状态相关的 UI。
    2.  或者使用 `v-if="isMounted && userStore.isLoggedIn"` 将渲染推迟到 `onMounted` 之后（仅限非首屏关键元素）。
    3.  服务端默认渲染 "未登录/游客" 状态作为标准占位。

### 1.3 请求节流 (Request Throttling)
*   **标准**: 首屏加载时，商品列表 API (`goodsApi.getGoodsList`) 调用次数 **严格限制为 0 次** (客户端)。
*   **机制**: 数据应由 SSR 获取并注入 `window.__NUXT__` payload，客户端直接复用，不应发起网络请求。

---

## 2. 编码规范 (Coding Standards)

### 2.1 useHomeData 设计
必须使用 `useAsyncData` 且遵循以下配置：
```typescript
const { data } = await useAsyncData(key, fetcher, {
  server: true,    // 必须开启 SSR
  lazy: false,     // 必须阻塞导航 (保证 SEO)
  immediate: true, // 立即执行
  watch: []        // 禁止自动侦听响应式数据导致重复请求
})
```

### 2.2 键值隔离 (Key Isolation)
*   PC 端 Key: `'home-data-pc'`
*   Mobile 端 Key: `'home-data-mobile'`
*   **原因**: 避免不同端的数据缓存互相污染 (特别是当两端数据结构或数量不一致时)。

### 2.3 异常熔断 (Error Resilience)
使用 `Promise.allSettled` 处理并发请求：
```typescript
const [banners, goods] = await Promise.allSettled([fetchBanners(), fetchGoods()])
// 即使 Banner 挂了，商品也必须能显示；反之亦然。绝对禁止整个页面白屏。
```

### 2.4 组件 Hydration 防护
对于包含 `Teleport`、`Transition` 或强依赖 `window`/`localStorage` 的组件 (如 `GlobalLoader`, `LoginModal`)，必须：
*   仅在客户端挂载 (`<ClientOnly>`)
*   或在模板中增加 `v-if="isMounted"` 守卫

---

## 3. 防回滚机制 (Anti-Regression Mechanism)

### 3.1 提交前自测 (Pre-commit Check)
每次修改首页代码 (`pages/pc/index.vue`, `pages/mobile/index.vue`, `useHomeData.ts`) 前，必须执行以下检查：

1.  **SSR 内容检查**:
    ```bash
    curl -s http://localhost:3000/ | grep "商品标题"
    ```
    *   **Pass**: 能看到具体商品标题。
    *   **Fail**: 只有骨架屏或 Loading 文字。

2.  **Console 纯净度检查**:
    打开浏览器控制台，刷新页面。
    *   **Pass**: 无 `Hydration mismatch` 警告。
    *   **Fail**: 出现红色警告 (必须修复，否则禁止上线)。

3.  **网络请求检查**:
    Network 面板 -> Fetch/XHR。
    *   **Pass**: 首页 Loading 过程中无 `goods` API 请求。
    *   **Fail**: 出现 `goods` 请求 (说明 SSR 数据未复用)。

### 3.2 维护禁区 (Maintenance Prohibitions)
*   ❌ **禁止** 在 `onMounted` 中调用 `refresh()` 或 `initData()` (除非是用户显式交互)。
*   ❌ **禁止** 在 `layouts/default.vue` 中添加依赖用户状态的全局弹窗 (使用 `<ClientOnly>` 包裹)。
*   ❌ **禁止** 随意修改 `nuxt.config.ts` 中的 `routeRules` 缓存策略，除非经过完整 SSR 测试。

---

## 4. 故障排查 (Troubleshooting)

| 现象 | 可能原因 | 解决方案 |
| :--- | :--- | :--- |
| **页面闪烁 (FOUC)** | 客户端重复请求了数据 | 检查 `useAsyncData` 的 `key` 是否唯一；检查 `onMounted` 是否有自动 Fetch。 |
| **Hydration Mismatch** | 登录态导致 DOM 不一致 | 检查 Header/User 组件，确保 Server 端渲染结果与 Client 初始结果一致 (通常是"未登录")。 |
| **Payload 404** | Nuxt 构建配置问题 | 确保 `experimental.payloadExtraction` 配置正确，或检查 `nuxt.config.ts` 的 `swr/ssr` 规则。 |

---

## 4. 骨架屏规范 (Skeleton Standards)

**原则**: 骨架屏仅在客户端异步获取数据且无缓存数据时出现，**严禁**在 SSR 首屏出现。

### 4.1 触发条件 (Strict Trigger)
必须且只能使用以下组合逻辑：
```html
<div v-if="(pending || goodsLoading) && currentGoods.length === 0">
  <Skeleton />
</div>
```
*   `pending`: SSR/Refresh 状态
*   `goodsLoading`: 客户端切换分类状态
*   `currentGoods.length === 0`: **关键**，只有当无数据时才显示骨架。如有旧数据，应显示旧数据+顶部的 Loading 指示器，而不是全屏骨架。

### 4.2 禁止行为 (Prohibitions)
*   ❌ **禁止** 使用 `const loading = ref(true)` 手动控制。必须接入 `useAsyncData` 的 `pending`。
*   ❌ **禁止** 在 `onMounted` 中重置 loading 状态。
*   ❌ **禁止** 使用 `<ClientOnly>` 包裹骨架（会导致 Hydration Mismatch）。骨架应由数据状态自然驱动。
*   ❌ **禁止** 骨架高度与真实卡片高度不一致（会导致 CLS 布局偏移）。

### 4.3 动画要求 (Animation)
*   必须使用 CSS `transition` 或 Vue `<Transition>` 控制骨架消失。
*   **推荐**: `mode="out-in"` 避免布局跳动。
*   **禁止**: 使用 JS 操作 DOM 移除骨架。

---
