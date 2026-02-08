# 骨架屏标准化任务

> **任务类型**: 全局扫描 + 批量修改
> **创建时间**: 2026-02-08
> **预计耗时**: 30分钟
> **优先级**: P1

---

## 🎯 任务目标

1. 扫描全站所有骨架屏实现
2. 统一颜色为深色主题标准
3. 移除冗余的内联样式
4. 确保与全局样式一致

---

## 📊 扫描报告

### 骨架屏使用统计

| 平台 | 文件数 | 状态 |
|------|--------|------|
| **PC 客户端** | 5 | ⚠️ 部分需优化 |
| **移动端** | 3 | ⚠️ 部分需优化 |
| **后台管理** | 4 | ✅ 后台无需深色 |

### 骨架屏类型统计

| 类型 | 说明 | 全局样式状态 |
|------|------|--------------|
| `el-skeleton` | Element Plus 组件 | ✅ 已全局覆盖 |
| 自定义 CSS skeleton | 手写 div + CSS | ⚠️ 需逐个检查 |
| shimmer 动画 | 纯 CSS 实现 | ⚠️ 需统一颜色 |

---

## 📋 待处理文件清单

### ✅ 已符合标准 (无需修改)

| 文件 | 方式 | 说明 |
|------|------|------|
| `pages/pc/profile/favorites.vue` | 自定义 CSS | Line 418: `rgba(255,255,255,0.02)` ✅ |
| `pages/pc/profile/tickets.vue` | 自定义 CSS | Line 512: `rgba(255,255,255,0.02)` ✅ |
| `components/pc/order/OrderSkeleton.vue` | 自定义 CSS | Line 54: `rgba(255,255,255,0.05)` ✅ |
| `components/pc/profile/SideNavigation.vue` | 自定义 CSS | Line 343-346: `rgba(255,255,255,0.05)` ✅ |
| `components/pc/base/ProductCardSkeleton.vue` | Element Plus | Line 24: `rgba(255,255,255,0.02)` ✅ |

### ⚠️ 需要检查 (可能仍是白色)

| 文件 | 位置 | 当前状态 | 需要操作 |
|------|------|----------|----------|
| `pages/pc/profile/exchange.vue` | Line 38-55 | 使用 el-skeleton | 检查是否被全局样式覆盖 |
| `pages/mobile/profile/redemption/index.vue` | Line 51-73 | 使用 el-skeleton | 检查是否被全局样式覆盖 |
| `components/mobile/goods/ProductDetailSheet.vue` | 多处 | 使用 el-skeleton-item | 检查是否被全局样式覆盖 |
| `components/mobile/list/MobileInfiniteList.vue` | 待确认 | 待确认 | 需扫描 |

### ❌ 后台管理 (无需深色主题)

| 文件 | 说明 |
|------|------|
| `pages/admin/recharge/orders.vue` | 后台用浅色主题 |
| `pages/admin/users/index.vue` | 后台用浅色主题 |
| `pages/admin/cdk/edit/[id].vue` | 后台用浅色主题 |
| `components/admin/base/AdminPageSkeleton.vue` | 后台用浅色主题 |

---

## 🔧 标准颜色规范

### 深色主题骨架屏颜色 (PC + Mobile)

```css
/* 容器背景 */
background: rgba(255, 255, 255, 0.02);

/* 骨架项目 */
background: rgba(255, 255, 255, 0.05);

/* 动画高亮 */
background: rgba(255, 255, 255, 0.08);

/* shimmer 渐变动画 */
background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 37%,
    rgba(255, 255, 255, 0.03) 63%
);
```

### 全局样式位置

```
assets/styles/theme-dark-orange.css
↓
第 984-1090 行: 骨架屏深色主题样式
```

---

## 📝 执行步骤

### Step 1: 验证全局样式生效

```bash
# 检查 theme-dark-orange.css 是否被正确引入
grep -r "theme-dark-orange" nuxt-frontend/
```

验证点：
- [ ] `layouts/pc.vue` 引入了主题 CSS
- [ ] `layouts/mobile.vue` 引入了主题 CSS
- [ ] 全局样式优先级足够高 (使用了 !important)

### Step 2: 检查 Element Plus 骨架屏

打开以下页面，确认骨架屏颜色是深色：

| 页面 | URL | 预期效果 |
|------|-----|----------|
| PC 兑换中心 | /profile/exchange | 骨架屏深色 |
| Mobile 兑换中心 | /mobile/profile/redemption | 骨架屏深色 |
| PC 收藏 | /profile/favorites | 骨架屏深色 |

### Step 3: 检查自定义骨架屏

确认以下文件的自定义 CSS 颜色正确：

- [ ] `components/pc/order/OrderSkeleton.vue` - Line 54
- [ ] `components/pc/profile/SideNavigation.vue` - Line 343-346
- [ ] `components/pc/base/ProductCardSkeleton.vue` - Line 24

### Step 4: 如有白色骨架屏，添加以下样式

```css
/* 添加到组件的 <style scoped> 中 */
:deep(.el-skeleton__item) {
    background: rgba(255, 255, 255, 0.05) !important;
}

:deep(.el-skeleton.is-animated .el-skeleton__item) {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.03) 25%,
        rgba(255, 255, 255, 0.08) 37%,
        rgba(255, 255, 255, 0.03) 63%
    ) !important;
    background-size: 400% 100% !important;
}
```

---

## ✅ 完成检查清单

### PC 客户端
- [ ] 首页商品骨架屏
- [ ] 收藏页骨架屏
- [ ] 订单列表骨架屏
- [ ] 工单列表骨架屏
- [ ] 兑换中心骨架屏

### 移动端
- [ ] 首页商品骨架屏
- [ ] 商品详情骨架屏
- [ ] 个人中心骨架屏
- [ ] 订单列表骨架屏
- [ ] 兑换中心骨架屏

---

## 📚 相关文档

| 文档 | 说明 |
|------|------|
| [PERFORMANCE_OPTIMIZATION.md](../PERFORMANCE_OPTIMIZATION.md) | 骨架屏标准 (3.2节) |
| [client/STYLE_MAPPING.md](../client/STYLE_MAPPING.md) | PC 样式映射 |
| [mobile/STYLE_MAPPING.md](../mobile/STYLE_MAPPING.md) | Mobile 样式映射 |

---

## 🤖 AI 执行命令

如果需要 AI 自动执行此任务，使用以下命令：

```
"请根据 docs/tasks/SKELETON_STANDARDIZATION.md 执行骨架屏标准化任务"
```

AI 会：
1. 读取此任务文档
2. 逐个检查待处理文件
3. 按规范修改颜色
4. 更新完成状态
