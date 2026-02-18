# 网站性能优化方案

> **版本**: V1.0 | **更新时间**: 2026-02-08
> **适用范围**: PC 客户端 + 移动端
> **目的**: 提升首屏加载速度、列表渲染性能、整体用户体验

---

## 🎯 核心目标

| 指标 | 目标值 | 当前状态 |
|------|--------|----------|
| 首屏加载 (FCP) | < 1.5s | 待测试 |
| 最大内容渲染 (LCP) | < 2.5s | 待测试 |
| 首次输入延迟 (FID) | < 100ms | 待测试 |
| 累积布局偏移 (CLS) | < 0.1 | 待测试 |

---

## 📋 一、现有优化实现

### 1.1 已实现的功能

| 功能 | 位置 | 状态 |
|------|------|------|
| 无限滚动 Composable | `composables/client/useInfiniteScroll.ts` | ✅ 已实现 |
| 移动端无限列表组件 | `components/mobile/list/MobileInfiniteList.vue` | ✅ 已实现 |
| 首页分页加载 | `pages/pc/index.vue` | ✅ 已实现 (PAGE_SIZE=10) |
| 骨架屏 | GoodsSection 组件 | ✅ 部分实现 |
| 弹窗资源预加载 | `utils/modalAssetPreloader.ts` | ✅ 已实现 |
| 简单缓存 | `useSimpleCache` | ✅ 已实现 |
| PC 首屏入场动画 | `components/shared/GlobalLoader.vue` | ✅ 已优化 (1.8s) |

### 1.2 使用 InfiniteScroll 的页面

| 页面 | PC | Mobile |
|------|-----|--------|
| 我的订单 | ✅ | ✅ |
| 钱包流水 | ✅ | ✅ |
| 我的收藏 | ✅ | ✅ |
| 消息列表 | ✅ | ✅ |
| 工单列表 | ✅ | ✅ |
| 兑换中心 | ✅ | ✅ |

---

## 🔧 二、分页加载标准

### 2.1 统一分页配置

```typescript
// 位置: composables/client/useInfiniteScroll.ts

// 默认分页大小
export const DEFAULT_PAGE_SIZE = 10

// 不同场景推荐值
export const PAGE_SIZE_CONFIG = {
  productList: 12,      // 商品列表 (3x4 网格)
  orderList: 10,        // 订单列表
  messageList: 20,      // 消息列表 (文字为主)
  transactionList: 15,  // 流水记录
  favoriteList: 12,     // 收藏列表
}
```

### 2.2 使用方法 (服务端分页)

```typescript
// 推荐用法：服务端分页
const { displayList, loading, finished, loadMore, reset } = useInfiniteScroll({
  fetchData: async (page, size) => {
    const res = await api.getList({ page, limit: size })
    return {
      list: res.data?.list || [],
      hasMore: res.data?.hasMore ?? true
    }
  },
  pageSize: 10
})
```

### 2.3 使用方法 (客户端分页)

```typescript
// 客户端分页：适用于数据量小的场景
const allData = ref([])

const { displayList, loading, finished, loadMore } = useInfiniteScroll({
  data: allData,  // 传入完整数据
  pageSize: 10    // 每次显示10条
})
```

---

## 🖼 三、骨架屏标准

### 3.1 需要骨架屏的场景

| 场景 | 必须 | 说明 |
|------|------|------|
| 首页商品列表 | ✅ | 首屏关键内容 |
| 商品详情页 | ✅ | 用户等待购买 |
| 订单列表 | ✅ | 高频访问 |
| 个人中心 | ⚠️ | 可选 |
| 工单聊天 | ❌ | 消息实时性 |

### 3.2 深色主题骨架屏规范 ⭐

**问题**: Element Plus 骨架屏默认浅灰色，深色背景下切换会"闪白"晃眼

**解决方案**: 全局样式已覆盖，位于 `theme-dark-orange.css`

```css
/* 骨架屏深色主题 - 已全局配置 */
.el-skeleton {
    --el-skeleton-color: rgba(255, 255, 255, 0.03);
    --el-skeleton-to-color: rgba(255, 255, 255, 0.08);
}

.el-skeleton__item {
    background: rgba(255, 255, 255, 0.05);
}

/* 微光动画 */
.el-skeleton.is-animated .el-skeleton__item {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 25%,
        rgba(255, 255, 255, 0.08) 37%,
        rgba(255, 255, 255, 0.03) 63%
    );
}
```

### 3.3 骨架屏颜色规范

| 元素 | 背景色 | 说明 |
|------|--------|------|
| 容器卡片 | `rgba(255,255,255,0.02)` | 极淡，与背景融合 |
| 骨架项目 | `rgba(255,255,255,0.05)` | 微微可见 |
| 动画高亮 | `rgba(255,255,255,0.08)` | 微光效果 |

### 3.4 骨架屏实现模板

```vue
<!-- 商品卡片骨架屏示例 -->
<template>
  <div v-if="loading" class="skeleton-wrapper">
    <div v-for="i in 8" :key="i" class="skeleton-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
    </div>
  </div>
  <div v-else>
    <!-- 真实内容 -->
  </div>
</template>

<style scoped>
.skeleton-card {
  background: rgba(255,255,255,0.02); /* 深色容器 */
  border-radius: 12px;
  overflow: hidden;
}

.skeleton-image {
  width: 100%;
  height: 160px;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0.03) 25%, /* 深色基底 */
    rgba(255,255,255,0.08) 50%, /* 微光 */
    rgba(255,255,255,0.03) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
```

### 3.5 使用 Element Plus 骨架屏

由于全局样式已覆盖，直接使用 `el-skeleton` 即可：

```vue
<!-- 无需额外样式，全局已配置深色主题 -->
<el-skeleton animated :rows="3" />

<el-skeleton animated>
  <template #template>
    <el-skeleton-item variant="image" style="height: 160px" />
    <el-skeleton-item variant="h3" style="width: 80%" />
    <el-skeleton-item variant="text" style="width: 60%" />
  </template>
</el-skeleton>
```

### 3.6 PC 端骨架屏组件

已存在: 
- `components/admin/base/AdminPageSkeleton.vue`
- `components/pc/base/ProductCardSkeleton.vue`

---

## 🚀 四、首屏优化清单

### 4.1 关键渲染路径优化

| 优化项 | 方法 | 优先级 |
|--------|------|--------|
| 首屏数据并行获取 | `Promise.all()` | P0 |
| 非首屏组件懒加载 | `defineAsyncComponent` | P0 |
| 图片懒加载 | `loading="lazy"` | P0 |
| CSS 内联关键样式 | Nuxt CSS 提取 | P1 |
| 字体预加载 | `<link rel="preload">` | P1 |

### 4.2 首屏数据加载策略

```typescript
// ✅ 正确：并行获取，优先显示
const initData = async () => {
  // 第一批：并行获取 (有缓存则立即显示)
  const [_, firstCategoryId] = await Promise.all([
    fetchBanners(),
    fetchCategories()
  ])
  
  // 第二批：根据第一批结果加载
  if (firstCategoryId) {
    await fetchGoods(firstCategoryId)
  }
}

// ❌ 错误：串行获取
const initData = async () => {
  await fetchBanners()      // 等待
  await fetchCategories()   // 等待
  await fetchGoods()        // 等待
}
```

### 4.3 组件懒加载

```typescript
// 弹窗懒加载
const LoginRegisterModal = defineAsyncComponent(() => 
  import('@/components/pc/modal/LoginRegisterModal.vue')
)

// 非首屏区块懒加载
const AboutSection = defineAsyncComponent(() => 
  import('@/components/pc/AboutSection.vue')
)
```

---

## 📱 五、列表渲染优化

### 5.1 长列表问题

| 问题 | 影响 | 解决方案 |
|------|------|----------|
| 大量 DOM 节点 | 内存占用高 | 虚拟滚动 |
| 图片过多 | 带宽浪费 | 懒加载 |
| 频繁重渲染 | 卡顿 | v-memo / shallowRef |

### 5.2 虚拟滚动 (超大列表)

**适用场景**: 列表项 > 1000 条

```vue
<!-- 推荐使用 vue-virtual-scroller -->
<template>
  <RecycleScroller
    class="virtual-list"
    :items="items"
    :item-size="80"
    key-field="id"
    v-slot="{ item }"
  >
    <OrderCard :order="item" />
  </RecycleScroller>
</template>
```

### 5.3 图片懒加载

```vue
<!-- 商品图片 -->
<img 
  :src="product.image" 
  loading="lazy" 
  decoding="async"
  alt=""
/>

<!-- 或使用 Nuxt Image -->
<NuxtImg
  :src="product.image"
  loading="lazy"
  width="200"
  height="200"
  format="webp"
/>
```

---

## 💾 六、缓存策略

### 6.1 前端缓存层级

```
┌─────────────────────────────────────────┐
│           用户浏览器                     │
├─────────────────────────────────────────┤
│  L1: 内存缓存 (useSimpleCache)          │
│      - 分类列表                         │
│      - Banner 列表                      │
│      - 有效期: 页面生命周期              │
├─────────────────────────────────────────┤
│  L2: SessionStorage                     │
│      - 用户状态                         │
│      - 购物车                           │
│      - 有效期: 会话                      │
├─────────────────────────────────────────┤
│  L3: LocalStorage                       │
│      - 用户偏好设置                      │
│      - 主题配置                         │
│      - 有效期: 永久                      │
└─────────────────────────────────────────┘
```

### 6.2 数据缓存策略

| 数据类型 | 缓存位置 | 有效期 | 刷新策略 |
|----------|----------|--------|----------|
| 分类列表 | 内存 | 页面周期 | 后台静默刷新 |
| Banner | 内存 | 页面周期 | 后台静默刷新 |
| 商品列表 | 不缓存 | - | 实时获取 |
| 订单列表 | 不缓存 | - | 实时获取 |
| 用户信息 | Store | 登录周期 | 登录时刷新 |

---

## 🔍 七、性能监控

### 7.1 关键指标采集

```typescript
// 手动采集 Web Vitals
import { onLCP, onFID, onCLS } from 'web-vitals'

onLCP(console.log)  // 最大内容渲染
onFID(console.log)  // 首次输入延迟
onCLS(console.log)  // 累积布局偏移
```

### 7.2 Nuxt DevTools

```bash
# 开发时启用
npx nuxi devtools enable
```

---

## 📝 八、优化待办清单

### 优先级 P0 (紧急)

- [x] PC 首屏入场动画优化 (GlobalLoader 1.8s, 移除额外延迟, 回访者零闪烁)
- [ ] 创建 `ProductCardSkeleton.vue` 商品骨架屏组件
- [ ] 确保所有列表页使用 `useInfiniteScroll`
- [ ] 首页 AboutSection 改为懒加载

### 优先级 P1 (重要)

- [ ] 商品图片添加 `loading="lazy"`
- [ ] 弹窗组件改为 `defineAsyncComponent`
- [ ] 字体文件预加载

### 优先级 P2 (一般)

- [ ] 添加 Web Vitals 监控
- [ ] 考虑引入虚拟滚动 (如果列表项 > 500)
- [ ] 图片转 WebP 格式

---

## 🔄 九、AI 标准化优化工作流程

### ⭐ 核心流程：先扫描 → 再分析 → 后优化

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI 标准化优化流程                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   Step 1        │    │   Step 2        │    │   Step 3        │         │
│  │   扫描页面      │ → │   输出报告      │ → │   执行优化      │         │
│  │   (发现问题)    │    │   (用户确认)    │    │   (逐项处理)    │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
│                                                                             │
│  ❌ 禁止跳过 Step 1 直接修改代码！                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 📋 Step 1: 扫描检查清单

```markdown
## [页面名] 扫描报告

### 1. 性能检查
- [ ] 是否使用分页/无限滚动？
- [ ] 首屏数据是否并行获取？
- [ ] 是否有不必要的串行请求？
- [ ] 列表是否有骨架屏？
- [ ] 图片是否懒加载？
- [ ] 大组件是否异步加载？

### 2. 代码质量检查
- [ ] 是否有 console.log？
- [ ] 是否有未使用的变量/函数？
- [ ] 是否有注释掉的代码块？
- [ ] 是否有硬编码的魔法数字？
- [ ] 是否有重复的样式定义？

### 3. 陈旧代码检查 ⭐
- [ ] 是否有废弃的 API 调用？
- [ ] 是否有不再使用的组件导入？
- [ ] 是否有注释标记为 TODO/FIXME 但已过时？
- [ ] 是否有死代码（永远不会执行的分支）？
- [ ] 是否有兼容旧版本的 polyfill 但不再需要？

### 4. 组件标准化检查
- [ ] 是否使用全局组件？ (BaseButton, BaseModal 等)
- [ ] 弹窗是否使用标准化组件？
- [ ] 样式是否使用 CSS 变量？
```

---

### 📊 Step 2: 输出优化方案报告

```markdown
## [页面名] 标准化优化方案

### 📍 扫描范围
- PC: pages/pc/[页面].vue
- Mobile: pages/mobile/[页面].vue (如果有)

### 🔴 发现的问题

#### P0 (必须修复)
| # | 问题 | 位置 | 影响 |
|---|------|------|------|
| 1 | [描述] | [文件:行号] | [性能/质量/安全] |

#### P1 (建议修复)
| # | 问题 | 位置 | 影响 |
|---|------|------|------|
| 1 | [描述] | [文件:行号] | [性能/质量] |

#### P2 (可选优化)
| # | 问题 | 位置 | 影响 |
|---|------|------|------|
| 1 | [描述] | [文件:行号] | [代码整洁] |

### 🧹 陈旧代码清理

| # | 类型 | 代码片段 | 位置 | 建议操作 |
|---|------|----------|------|----------|
| 1 | 未使用导入 | `import xxx from 'xxx'` | Line XX | 删除 |
| 2 | 注释代码 | `// const old = ...` | Line XX-YY | 删除 |
| 3 | console.log | `console.log(...)` | Line XX | 删除 |

### ✅ 优化方案

#### 方案 1: [优化项名称]
- 当前状态: [描述]
- 目标状态: [描述]
- 修改文件: [列表]
- 预计效果: [描述]

#### 方案 2: ...

### ⚠️ 风险说明
- [可能的影响]
- [需要测试的功能]

---
请确认是否执行以上优化？可以选择：
- 全部执行
- 只执行 P0
- 跳过某些项
```

---

### 🛠 Step 3: 执行优化

按用户确认的范围逐项执行：

```markdown
## 执行记录

### ✅ 已完成
| # | 优化项 | 修改文件 | 状态 |
|---|--------|----------|------|
| 1 | 移除 console.log | xxx.vue | ✅ 完成 |
| 2 | 添加图片懒加载 | xxx.vue | ✅ 完成 |

### ⏳ 待执行
| # | 优化项 | 修改文件 | 状态 |
|---|--------|----------|------|
| 3 | 添加骨架屏 | xxx.vue | 待处理 |

### 📝 测试建议
1. 刷新页面，检查 [功能1]
2. 点击 [按钮]，检查 [功能2]
```

---

### 🧹 陈旧代码检测规则

| 类型 | 检测方法 | 示例 |
|------|----------|------|
| **未使用导入** | 导入但代码中未引用 | `import { ref } from 'vue'` 但没用到 ref |
| **注释代码块** | 超过3行的注释代码 | `// const oldFunc = () => {...}` |
| **console 语句** | 任何 console.* 调用 | `console.log()`, `console.warn()` |
| **TODO/FIXME** | 超过30天的待办注释 | `// TODO: fix this later` |
| **死代码** | 永远不执行的分支 | `if (false) {...}` |
| **废弃 API** | 已弃用的方法调用 | `this.$set()` (Vue 3 不需要) |
| **重复样式** | 相同的样式定义 | 多处定义相同的 `color: #fff` |

---

### 🎯 标准化优化命令示例

```
用户输入:
"请根据文档对首页进行标准化优化方案"

AI 执行步骤:
1. 读取 PERFORMANCE_OPTIMIZATION.md
2. 扫描 pages/pc/index.vue
3. 扫描 pages/mobile/index.vue
4. 生成扫描报告
5. 输出优化方案
6. 等待用户确认
7. 执行用户批准的优化项
8. 输出执行记录和测试建议
```

---

## 📚 十、相关文件索引

| 文件 | 说明 |
|------|------|
| `composables/client/useInfiniteScroll.ts` | 无限滚动 Composable |
| `components/mobile/list/MobileInfiniteList.vue` | 移动端无限列表 |
| `utils/modalAssetPreloader.ts` | 弹窗资源预加载 |
| `composables/useSimpleCache.ts` | 简单缓存工具 |

---

## 🎓 十一、最佳实践示例

### 11.1 首页最佳实践 (已实现)

```typescript
// pages/pc/index.vue

// 1. 分页配置
const PAGE_SIZE = 10

// 2. 并行获取首屏数据
const initData = async () => {
  const [_, firstCategoryId] = await Promise.all([
    fetchBanners(),
    fetchCategories()
  ])
  // ...
}

// 3. 分页加载商品
const fetchGoods = async (categoryId, isLoadMore = false) => {
  if (isLoadMore) {
    // 追加数据
    currentGoods.value = [...currentGoods.value, ...newList]
  } else {
    // 重置列表 + 显示骨架屏
    goodsLoading.value = true
    currentGoods.value = []
  }
}

// 4. 预加载弹窗资源
onMounted(() => {
  preloadModalAssets()
})
```

### 11.2 订单列表最佳实践

```typescript
// pages/pc/profile/order/index.vue

const { displayList, loading, finished, loadMore } = useInfiniteScroll({
  fetchData: async (page, size) => {
    const res = await orderApi.getOrders({ 
      page, 
      limit: size,
      status: activeStatus.value
    })
    return { 
      list: res.data?.list || [], 
      hasMore: res.data?.list?.length >= size 
    }
  },
  pageSize: 10
})

// 切换状态时重置
watch(activeStatus, () => {
  reset()
})
```
