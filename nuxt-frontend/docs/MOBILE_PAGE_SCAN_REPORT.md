# Mobile Page SSR & Skeleton Scan Report
**Date**: 2026-02-15
**Status**: Phase 1 Diagnosis Complete

## 1. 扫描结果 (Scan Results)

### ① 首页 (`/mobile`)
*   **页面类型**: 核心落地页
*   **是否 SSR**: ✅ 是
*   **是否 useAsyncData**: ✅ 是 (`home-data-mobile`)
*   **是否 mounted 拉数据**: ❌ 否 (行为符合预期)
*   **骨架触发逻辑**: 仅在客户端切换分类或刷新时出现
*   **是否存在白闪**: ❌ 否 (首屏稳定)
*   **是否存在 hydration 风险**: ❌ 否 (无 mismatched)
*   **结论**: **🟢 A 类 (标准 SSR)**

### ② 商品详情页 (`/mobile/goods/[id]`)
*   **页面类型**: 核心内容页
*   **是否 SSR**: ✅ 是 (View Source 包含商品信息)
*   **是否 useAsyncData**: ✅ 是 (`goods-detail-[id]`)
*   **是否 mounted 拉数据**: ⚠️ **是 (存在重复请求)**
    *   *问题*: SSR 完成后，客户端再次请求了商品详情接口。
*   **骨架触发逻辑**: 实际上首屏 SSR 有内容，但因重复请求可能导致数据刷新闪烁。
*   **结论**: **🟡 B 类 (半 SSR / 需优化)** -> **需要修复重复 Fetch 问题**

### ③ 频道/发现页 (`/mobile/channel`)
*   **页面类型**: 功能工具页
*   **是否 SSR**: ✅ 是
*   **是否 useAsyncData**: ✅ 是
*   **骨架触发逻辑**: 无 (SSR 直出)
*   **结论**: **🟢 A 类 (标准 SSR)**

### ④ 个人中心/订单 (`/mobile/profile`, `/mobile/orders`)
*   **页面类型**: 需登录页面
*   **表现**: 未登录时重定向至首页并弹出登录框。
*   **是否 SSR**: ❌ 否 (仅返回 Shell，逻辑由客户端控制)
*   **结论**: **🔴 C 类 (客户端主导)** -> **允许使用骨架或 Loading，无需 SSR 强求**

### ⑤ 搜索页 (`/mobile/search`)
*   **现状**: ❌ **未发现独立路由**
*   **备注**: 首页无搜索入口。频道页仅有"频道标识搜索"。
*   **结论**: **⚪️ N/A (不存在)**

---

## 2. 分类诊断与处理建议 (Classification & Actions)

### 🟢 A 类：SSR 页面 (首页, Channel)
*   **策略**: **严格禁止首屏骨架**。
*   **现状**: 首页已达标。Channel 页已达标。
*   **行动**: 保持现状，监控 Regression。

### 🟡 B 类：半 SSR 页面 (商品详情)
*   **策略**: **首屏应无网络请求**，骨架仅用于 ID 变化时的客户端导航。
*   **问题**: 当前存在 Client-side Duplicate Fetch。
*   **行动**:
    1.  检查 `useProductDetail` 或对应组件。
    2.  确保 `useAsyncData` 的 `key` 在服务端和客户端完全一致。
    3.  确保 `watch` 逻辑不包含初始化时的立即执行。

### 🔴 C 类：纯客户端页面 (Profile, Orders)
*   **策略**: **允许骨架 / Loading**。
*   **现状**: 目前使用重定向策略。
*   **行动**: 如果未来开发独立 Profile 页，需确保 `ClientOnly` 包裹，避免 Hydration Mismatch。

---

## 3. 下一步计划 (Next Steps)
1.  **修复 B 类页面**: 解决 `/mobile/goods/[id]` 的重复请求问题。
2.  **标准化骨架**: 确认是否将首页的 "Strict Trigger" 规范应用到详情页（在修复重复请求后）。
