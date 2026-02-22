# 📱 移动端整体用户体验 (UX) 优化建议

> **基于 V4.21 体验审计扫描结果**
> **报告时间**: 2026-02-22

在完成了针对 `pages/mobile/` 及 `components/mobile/` 的全面扫描后，虽然核心逻辑和规范执行得很好，但在微观体验和长期维护性层面，我们提出以下高价值的体验与工程优化建议，供后续排期参考：

## 1. 交互与动效增强 (Interaction & Micro-animations)

*   **现状**: 页面间切换依靠 `nuxt.config.ts` 里面配置的全局 `page-slide` 动画。多数按钮具备了防抖和 `Spinner`。
*   **优化空间**: 
    - **触控反馈不足**: 移动端大量按钮（尤其是非表单提交类的纯导航按钮、卡片）缺少按下瞬间的视觉反馈（如 `:active` 伪类的背景变暗或缩放）。建议全局引入类似 `v-ripple` 的波纹指令，或在基础 CSS 中增强 `.btn:active`, `.card:active` 的 `transform: scale(0.98)` 效果，极大提升物理点击感。
    - **骨架屏过渡生硬**: 虽然列表和详情页都有用到 `<div class="skeleton-shimmer">` 等骨架屏，但当真实数据加载完毕替换骨架屏时，常常是“瞬间切变 (Hard Cut)”。可以考虑引入 `Vue` 的 `<Transition mode="out-in">` 让骨架屏淡出、真实内容淡入，缓解视觉突兀。

## 2. 局部加载与防拉扯 (Layout Shift Prevention)

*   **现状**: 存在部分页面级 Loading 导致整个屏幕出现短暂的白屏或布局跳动 (Cumulative Layout Shift, CLS)。
*   **优化空间**:
    - **图片固定比例占位**: 比如 `ProductDetailSheet` 或频道页的商品图，需确保其容器预先设定好了宽高比（如 `aspect-ratio: 1 / 1`），避免在图片实际下载完成前，容器高度为 0，下载后突然撑开页面导致内容整体下移。
    - **首屏关键数据 SSR 强化**: 对于非须实时拉取验证（如已缓存的商品基础信息）尝试利用 Nitro 的服务端渲染输出，减少客户端初次拿到 HTML 再发起异步强求带来的重绘。

## 3. 金额与数据展示的一致性护栏 (Consistency in Data Formatting)

*   **现状**: 我们通过扫描发现并修复了 `MobileMiniCart` 中对于 `cartItem.price` 的显示精度问题。
*   **优化空间**:
    - **建立全局指令或 Composable 强规约**: 既然扫描发现还有开发者写出裸露的 `{{ price }}`，说明靠自觉容易出错。建议将使用极高频的价格显示封装为一个基础组件（例如 `<PriceDisplay :amount="item.price" currency="¥" />`），该组件内部强制锁死 `.toFixed(2)` 和千分位逗号逻辑，不仅一劳永逸，还能让人民币/外币切换更加好做。

## 4. 异常流的体验降维 (Graceful Degradation for Errors)

*   **现状**: 所有高危 API 虽然都有 `try...catch` 包裹，并且会在 `catch` 中抛出 `ElMessage` 或 Toast 并复位 loading。
*   **优化空间**:
    - **断网或弱网下的占位页**: 许多组件目前只处理了接口抛出的后端错误，但如果接口处于 Timeout 边缘（例如地铁里网络极慢），仅仅弹出一个 Toast 体验是不够的。可以考虑引入全局的 `<NetworkErrorState />` 或者“点击重试”占位的组件。
    - **弹窗被意外关闭的状态恢复**: 比如微信支付半路跳出去，回来后状态不明确。可以加强 Page Visible API 的监听，在回到特定页面（如 `checkout/[id]` 时）自动默默发起一次状态轮询确认。

## 5. 组件解耦与性能 (Component Decoupling & Performance)

*   **现状**: 弹窗和 Sheet 组件如 `ProductDetailSheet` 代码量非常庞大。
*   **优化空间**:
    - **异步组件加载 (Async Components)**: 移动端其实对首屏 JS 体积非常敏感。可以将 `components/mobile/profile/modals/` 目录下的那些平时根本不打开的弹窗（如改密、改邮箱、注销账户）全部通过 `defineAsyncComponent` 进行懒加载，有效减少首屏无用代码解析时间。

---

如果希望**立即执行**上述任何一条优化（例如全局改造成异步组件、抽出金额格式化组件、或者加全局点击波纹动效），请指示！
