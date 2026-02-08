# 移动端全局样式映射

> **版本**: V1.0 | **更新时间**: 2026-02-08
> **目的**: AI 修改移动端样式时的完整参考

---

## 🎯 核心概念

```
                    移动端样式体系
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ 全局CSS  │  │ 基础组件  │  │ 页面内联  │
    │ mobile.css│  │ base/    │  │ <style>  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
    CSS 变量      可复用组件     ⚠️ 需标准化
```

---

## 🌐 一、全局样式系统

### 1.1 样式文件

| 文件 | 说明 | 行数 |
|------|------|------|
| `assets/styles/mobile.css` | **移动端全局样式** | 329行 |

### 1.2 CSS 变量 (Design Tokens)

```css
/* 位置: assets/styles/mobile.css */

:root {
  /* 背景色 */
  --bg-deep: #020617;              /* 页面深色背景 */
  --bg-darker: #020617;
  
  /* 品牌色 */
  --primary: #178fc6;              /* 主色 (蓝) */
  --primary-glow: rgba(23, 143, 198, 0.4);
  --accent: #F97316;               /* 强调色 (橙) */
  --accent-glow: rgba(249, 115, 22, 0.4);
  --cyan: #06B6D4;                 /* 科技色 (青) */
  
  /* 文字色 */
  --text-primary: #F1F5F9;         /* 主文字 */
  --text-secondary: #94A3B8;       /* 次要文字 */
  --text-muted: #64748B;           /* 弱化文字 */
  --text-accent: #38BDF8;          /* 高亮文字 */
  
  /* 玻璃效果 */
  --glass-bg: rgba(15, 23, 42, 0.6);
  --glass-border: rgba(56, 189, 248, 0.1);
  --glass-blur: blur(12px);
  
  /* 赛博主题 (购物车等) */
  --cyber-bg-glass: rgba(10, 10, 25, 0.85);
  --cyber-primary: #38BDF8;
  --cyber-accent: #F97316;
  --cyber-border: rgba(56, 189, 248, 0.3);
}
```

### 1.3 如何全局修改配色

**场景: 把主色从蓝色改成绿色**

**文件**: `assets/styles/mobile.css`
**位置**: `:root` 变量定义 (第4-75行)

```css
/* 修改前 */
--primary: #178fc6;

/* 修改后 */
--primary: #10B981;
--primary-glow: rgba(16, 185, 129, 0.4);
```

---

## 🔘 二、按钮样式系统

### 2.1 按钮类型列表

| 类名 | 用途 | 颜色 | 位置 |
|------|------|------|------|
| `.btn-v3` | 基础按钮样式 | - | mobile.css:157 |
| `.btn-primary` | 主要操作 | 蓝色渐变 | mobile.css:177 |
| `.btn-accent` | 强调操作 | 橙色渐变 | mobile.css:184 |
| `.btn-ghost` | 透明按钮 | 边框样式 | mobile.css:191 |
| `.btn-mobile-base` | 移动端基础 | - | mobile.css:235 |
| `.btn-mobile-primary` | 移动端主按钮 | 蓝色渐变 | mobile.css:255 |
| `.btn-mobile-accent` | 移动端强调 | 橙色渐变 | mobile.css:262 |
| `.btn-mobile-ghost` | 移动端透明 | 边框样式 | mobile.css:269 |
| `.btn-cyber-primary` | 赛博主按钮 | 橙色渐变 | 组件内 |
| `.btn-cyber-ghost` | 赛博透明 | 边框样式 | 组件内 |

### 2.2 如何修改按钮颜色

**场景: 修改主按钮颜色**

**文件**: `assets/styles/mobile.css`
**位置**: 第177-181行

```css
/* 修改前 */
.btn-primary {
  background: linear-gradient(135deg, #178fc6 0%, #0c6a96 100%);
  box-shadow: 0 4px 15px var(--primary-glow);
}

/* 修改后 (例如改成绿色) */
.btn-primary {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}
```

---

## 🪟 三、弹窗/抽屉系统

### 3.1 基础组件列表

| 组件 | 说明 | 位置 |
|------|------|------|
| `MobileConfirmModal.vue` | 确认弹窗 | `components/mobile/base/` |
| `MobileToast.vue` | Toast 提示 | `components/mobile/base/` |

### 3.2 弹窗使用情况 (⚠️ 需标准化)

| 弹窗 | 是否使用基础组件 | 状态 |
|------|------------------|------|
| `DeleteAccountModal.vue` | ❌ 自定义样式 | 需标准化 |
| `ChangeEmailModal.vue` | ❌ 自定义样式 | 需标准化 |
| `ChangePasswordModal.vue` | ❌ 自定义样式 | 需标准化 |
| `EditNicknameModal.vue` | ❌ 自定义样式 | 需标准化 |
| `SelectAvatarModal.vue` | ❌ 自定义样式 | 需标准化 |
| `RechargeModal.vue` | ❌ 自定义样式 | 需标准化 |
| `LogoutModal.vue` | ❌ 自定义样式 | 需标准化 |
| `WechatBindModal.vue` | ❌ 自定义样式 | 需标准化 |

### 3.3 抽屉 (Sheet) 使用情况

| 抽屉 | 是否使用基础组件 | 状态 |
|------|------------------|------|
| `MobileCartSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileLoginSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileCouponSelectorSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileSettingsSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileWalletSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileRefundSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileRenewalSheet.vue` | ❌ 自定义样式 | 需标准化 |
| `MobileTicketSheet.vue` | ❌ 自定义样式 | 需标准化 |

---

## 🎨 四、样式工具类

### 4.1 玻璃卡片

```css
/* 使用方法 */
<div class="bg-glass-card">内容</div>
```

**位置**: `mobile.css:104-116`

### 4.2 文字工具类

| 类名 | 说明 |
|------|------|
| `.text-xs` | 12px |
| `.text-sm` | 13px |
| `.text-base` | 14px |
| `.text-lg` | 16px + 600 |
| `.text-xl` | 18px + 700 |
| `.text-price` | 价格样式 (DIN字体+橙色) |
| `.text-muted` | 弱化文字 |
| `.text-theme` | 主题色文字 |

### 4.3 布局工具类

| 类名 | 说明 |
|------|------|
| `.p-global` | 标准内边距 16px |
| `.gap-2` | 间距 8px |
| `.gap-3` | 间距 12px |
| `.flex-center` | 居中对齐 |
| `.flex-between` | 两端对齐 |
| `.no-scrollbar` | 隐藏滚动条 |

---

## 📋 五、组件与样式对照表

### 5.1 当前问题汇总

| 问题类型 | 数量 | 说明 |
|----------|------|------|
| 弹窗样式内联 | 8个 | 未使用 MobileConfirmModal |
| 抽屉样式内联 | 8个 | 需创建 MobileBaseSheet |
| 按钮样式分散 | 多处 | 需统一使用全局类 |

### 5.2 样式来源追踪

| 组件 | 样式来源 | 是否标准化 |
|------|----------|-----------|
| 所有页面背景 | mobile.css body | ✅ 已标准化 |
| 玻璃卡片 | mobile.css .bg-glass-card | ✅ 已标准化 |
| 导航栏颜色 | 组件内 <style> | ⚠️ 需检查 |
| 弹窗背景 | 组件内 <style> | ❌ 需标准化 |
| 按钮样式 | 混合 (全局+内联) | ⚠️ 需统一 |

---

## 🔧 六、快速修改指南

### 修改全局背景色

```
文件: assets/styles/mobile.css
位置: :root { --bg-deep } (第6行)
```

### 修改主按钮颜色

```
文件: assets/styles/mobile.css
位置: .btn-primary / .btn-mobile-primary (第177/255行)
```

### 修改玻璃卡片效果

```
文件: assets/styles/mobile.css
位置: .bg-glass-card (第104行)
```

### 修改弹窗背景 (需统一)

```
当前: 每个弹窗组件内的 <style>
目标: 创建 MobileBaseModal 统一管理
```

---

## 📚 七、文件索引

| 文件 | 说明 | 类型 |
|------|------|------|
| `assets/styles/mobile.css` | 移动端全局样式 | 样式 |
| `components/mobile/base/MobileConfirmModal.vue` | 确认弹窗基础组件 | 组件 |
| `components/mobile/base/MobileToast.vue` | Toast 基础组件 | 组件 |
| `components/mobile/profile/modals/` | 个人中心弹窗集合 | 目录 |
| `components/mobile/cart/` | 购物车相关组件 | 目录 |

---

## ⚠️ 八、标准化待办

> 以下问题需要通过标准化工作流程解决

### 优先级 P0 (紧急)

1. **创建 `MobileBaseModal.vue`** - 统一所有弹窗样式
2. **创建 `MobileBaseSheet.vue`** - 统一所有抽屉样式

### 优先级 P1 (重要)

3. **迁移个人中心弹窗** - 8个弹窗全部改用 MobileBaseModal
4. **迁移抽屉组件** - 8个抽屉全部改用 MobileBaseSheet

### 优先级 P2 (一般)

5. **统一按钮类名** - 移除组件内自定义按钮样式
6. **增加 CSS 变量** - 更多样式通过变量控制
