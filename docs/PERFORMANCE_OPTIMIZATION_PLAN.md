# 商品详情页性能优化方案 (Product Detail Optimization Plan)

> **版本**: V1.0 | **日期**: 2026-02-08
> **目标**: 提升 PC 和移动端商品详情页的加载速度与用户体验，消除首屏空白，实现丝滑交互。

---

## 📊 一、现状分析 (Status Analysis)

经过对 `pages/pc/goods/[id].vue` (PC) 和 `components/mobile/goods/ProductDetailSheet.vue` (Mobile) 的代码扫描，发现以下关键问题：

### 1. High Severity (严重) 🔴
*   **[PC] 阻塞式数据获取**: `useProductDetail` 在 `script setup` 中使用了顶层 `await`，导致整个页面渲染被阻塞，直到接口返回。用户会看到长时间的白屏，而不是骨架屏或加载状态。
*   **[PC & Mobile] 缺失骨架屏 (Skeleton)**: 数据加载过程中（PC 是白屏，Mobile 是空弹窗），没有视觉反馈，用户体验较差。

### 2. Medium Severity (中等) 🟡
*   **[Mobile] 串行加载**: 移动端弹窗打开后才开始请求数据，且部分数据（如 FAQ）依赖商品详情返回后再请求，增加了等待时间。
*   **[Code] 硬编码与冗余**: 部分样式和文案硬编码，未充分利用通用组件。

---

## 🛠 二、优化方案 (Optimization Proposal)

### 2.1 核心优化项 (P0)

#### 1. PC端：引入骨架屏 & 非阻塞加载
*   **动作**: 创建 `components/pc/base/ProductCardSkeleton.vue` (商品详情专用骨架屏)。
*   **动作**: 重构 `pages/pc/goods/[id].vue`，移除顶层 `await`，利用 `pending` 状态展示骨架屏，实现"即时渲染"。

#### 2. Mobile端：弹窗内骨架屏
*   **动作**: 在 `ProductDetailSheet.vue` 中添加加载状态下的骨架屏（Header, Price, SKU 区域占位）。
*   **动作**: 优化 `fetchData` 逻辑，并行请求商品详情和 FAQ（如果可能）。

### 2.2 体验优化项 (P1)

*   **图片优化**: 确保所有大图（Banner、详情图）开启 `loading="lazy"` 和 `decoding="async"`。
*   **交互优化**: 只有在用户点击"购买"或"收藏"时才检查登录状态，而不是页面加载时强制检查（目前逻辑已符合，继续保持）。

---

## 📋 三、执行步骤 (Execution Steps)

### Step 1: 创建组件
- [ ] Implement `components/pc/base/ProductCardSkeleton.vue`
- [ ] Implement Mobile Skeleton Logic inside `ProductDetailSheet.vue` (Inline or Component)

### Step 2: PC 页面重构
- [ ] Modify `composables/client/useProductDetail.ts`: 去除 async/await 导出，改为返回 `pending` 状态。
- [ ] Modify `pages/pc/goods/[id].vue`: 集成骨架屏，根据 `pending` 切换显示。

### Step 3: Mobile 页面优化
- [ ] Modify `components/mobile/goods/ProductDetailSheet.vue`: 添加 `v-if="loading"` 的骨架结构。

---

## ⏭ 四、后续工作推荐 (Next Steps)

完成商品详情页优化后，建议按照相同标准（骨架屏 + 无限滚动/分页）继续优化以下模块：

1.  **兑换中心 (Redemption Center)**
    *   *现状*: 列表可能卡顿。
    *   *计划*: 应用 `useInfiniteScroll` 和列表骨架屏。
2.  **我的收藏 (My Favorites)**
    *   *计划*: 统一列表组件。
3.  **我的工单 (My Tickets)**
    *   *计划*: 优化工单列表加载体验。
4.  **我的消息 (My Messages)**
    *   *计划*: 优化消息列表的长列表性能。

---

请审核以上方案，确认无误后我将开始执行 Step 1。
