# PC 客户端全局样式映射

> **版本**: V1.0 | **更新时间**: 2026-02-08
> **目的**: AI 和开发者修改样式时的完整参考

---

## 🎯 核心概念

```
                    样式修改入口
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ 按钮样式  │  │ 弹窗样式  │  │ 全局样式  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
         ▼             ▼             ▼
    Registry      Registry      CSS 变量
         │             │             │
         ▼             ▼             ▼
    BaseButton    BaseModal     :root {}
```

---

## 🔘 一、按钮样式系统

### 1.1 文件结构

| 文件 | 职责 | 修改场景 |
|------|------|----------|
| `utils/buttonThemeRegistry.ts` | 注册 themeId | 添加新按钮类型 |
| `components/shared/BaseButton.vue` | 按钮组件 + CSS | 修改样式 |

### 1.2 按钮类型列表

| themeId | 用途 | 颜色 | 使用场景 |
|---------|------|------|----------|
| `primary` | 主要操作 | 蓝色渐变 | 确认、提交、登录 |
| `primary-orange` | 强调操作 | 橙色渐变 | 充值、VIP |
| `secondary` | 次要操作 | 透明边框 | 取消、返回 |
| `destructive` | 危险操作 | 红色 | 删除、注销 |
| `marketing-buy` | 商品购买 | 品牌蓝 | 商品卡"购买" |
| `social-google` | 社交登录 | 透明 | Google 登录 |
| `tab` | 标签切换 | 透明 | 登录/注册切换 |
| `suit-001-primary` | 套装主按钮 | 霓虹蓝 | 弹窗内确认 |
| `suit-001-secondary` | 套装次按钮 | 透明 | 弹窗内取消 |
| `coupon-purple` | 优惠券 | 紫色 | 紫色优惠券 |
| `coupon-gold` | 优惠券 | 金色 | 金色优惠券 |
| `coupon-cyan` | 优惠券 | 青色 | 青色优惠券 |

### 1.3 如何修改按钮颜色

#### 场景: 修改主按钮(primary)颜色

**文件**: `components/shared/BaseButton.vue`
**位置**: 第 140-149 行

```css
/* 修改前 */
.btn-primary {
  background: linear-gradient(135deg, #3B82F6, #2563eb);  /* 蓝色 */
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

/* 修改后 (例如改成绿色) */
.btn-primary {
  background: linear-gradient(135deg, #10B981, #059669);  /* 绿色 */
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}
```

#### 场景: 添加新按钮类型

**步骤 1**: 在 `utils/buttonThemeRegistry.ts` 添加注册

```typescript
// 添加到 BUTTON_THEMES 对象
'my-custom': {
    id: 'my-custom',
    variantClass: 'btn-my-custom'
}
```

**步骤 2**: 在 `components/shared/BaseButton.vue` 添加 CSS

```css
.btn-my-custom {
  background: linear-gradient(135deg, #颜色1, #颜色2);
  color: #fff;
  box-shadow: 0 4px 15px rgba(颜色, 0.4);
}
.btn-my-custom:not(.is-disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(颜色, 0.5);
}
```

### 1.4 按钮使用统计

运行以下命令查看哪些页面使用了 BaseButton:

```bash
grep -r "BaseButton" --include="*.vue" nuxt-frontend/pages
grep -r "themeId=" --include="*.vue" nuxt-frontend
```

---

## 🪟 二、弹窗样式系统

### 2.1 文件结构

| 文件 | 职责 | 修改场景 |
|------|------|----------|
| `utils/modalThemeRegistry.ts` | 注册弹窗套装 | 添加新套装 |
| `components/shared/BaseModal.vue` | 弹窗组件 + CSS | 修改样式 |

### 2.2 弹窗套装列表

| themeId | 名称 | 吉祥物 | 位置 | 效果 |
|---------|------|--------|------|------|
| `suit-001` | Classic Phantom | mascot_01.png | 底部中央 | 幽灵渐显 |
| `suit-002` | Soft Light | mascot_02.png | 底部左侧 | 柔光效果 |
| `suit-003` | Cyberpunk | mascot_01.png | 底部右侧 | 霓虹发光 |

### 2.3 如何修改弹窗样式

#### 场景: 修改弹窗背景颜色

**文件**: `components/shared/BaseModal.vue`
**位置**: 第 144-156 行

```css
.base-modal-container {
  /* 修改这里 */
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
}
```

#### 场景: 修改弹窗边框样式

**文件**: `components/shared/BaseModal.vue`
**位置**: 第 151-156 行

```css
.base-modal-container {
  border: 1px solid rgba(255, 255, 255, 0.08);  /* 修改边框 */
  border-radius: 28px;  /* 修改圆角 */
}
```

#### 场景: 添加新弹窗套装

**步骤 1**: 在 `utils/modalThemeRegistry.ts` 添加注册

```typescript
'suit-004': {
    id: 'suit-004',
    name: 'My New Theme',
    mascotImg: '/images/modal/pc/new_mascot.png',
    mascotPosition: 'bottom',
    variantClass: 'variant-my-theme',
    animation: 'my-animation',
    opacity: 0.8,
    duration: '0.8s'
}
```

**步骤 2**: 在 `components/shared/BaseModal.vue` 底部添加 CSS

```css
/* [SUIT-004] My New Theme */
.variant-my-theme {
    filter: blur(1px);
    mix-blend-mode: soft-light;
}

@keyframes my-animation {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: var(--mascot-final-opacity); transform: scale(1); }
}
```

### 2.4 弹窗使用情况

| 弹窗组件 | 使用的套装 | 位置 |
|----------|-----------|------|
| `LoginRegisterModal` | suit-001 | 登录注册 |
| `BindEmailModal` | suit-001 | 绑定邮箱 |
| `DeleteAccountModal` | suit-001 | 注销账号 |
| `PaySuccessModal` | suit-001 | 支付成功 |
| `WalletRechargeModal` | suit-001 | 充值 |
| `OrderPayModal` | suit-001 | 订单支付 |
| `RenewalModal` | suit-001 | 续费 |

---

## 🌐 三、全局主题系统

### 3.1 主题文件列表

| 文件 | 说明 | 主色调 |
|------|------|--------|
| `theme-dark-orange.css` | **主题** (981行) | 深蓝 + 蓝橙 |
| `theme-blue-orange.css` | 蓝橙配色 | 蓝 + 橙 |
| `theme-cyber.css` | 赛博朋克 | 霓虹 |
| `theme-dark.css` | 暗黑 | 深色 |
| `theme-glass.css` | 玻璃质感 | 透明 |
| `theme-titanium.css` | 钛金 | 金属灰 |

### 3.2 主题文件位置

```
nuxt-frontend/assets/styles/
├── pc.css                    # PC端入口 (空)
├── mobile.css                # 移动端样式
├── mgmt.css                  # 后台管理样式
├── goods-detail.css          # 商品详情专属
│
└── 主题文件
    ├── theme-dark-orange.css # ⭐ 当前使用的主题
    ├── theme-blue-orange.css
    ├── theme-cyber.css
    ├── theme-dark.css
    ├── theme-glass.css
    └── theme-titanium.css
```

### 3.3 全局配色 (theme-dark-orange.css)

```css
/* 主色 */
主题蓝: #0EA5E9 / #38BDF8    /* 导航、链接 */
主题橙: #F97316 / #FB923C    /* 价格、CTA按钮 */

/* 背景 */
深蓝背景: #0F172A            /* 页面背景 */
卡片背景: rgba(30, 41, 59, 0.65)  /* 玻璃卡片 */

/* 文字 */
标题白: #F1F5F9 / #F8FAFC
正文灰: #E2E8F0
辅助灰: #94A3B8
弱灰:   #64748B

/* 边框 */
边框线: rgba(255, 255, 255, 0.08)
```

### 3.4 如何全局修改配色

#### 场景: 把全站橙色改成绿色

**文件**: `assets/styles/theme-dark-orange.css`

**需要修改的位置**:
1. 分类激活态 (第175行): `#F97316 → #10B981`
2. 价格颜色 (第300-315行): `#FB923C → #34D399`
3. 购买按钮 (第324行): `#F97316 → #10B981`
4. 悬浮光晕 (多处): `rgba(249, 115, 22, ...)` → `rgba(16, 185, 129, ...)`

**建议方法**: 使用全局替换
```
查找: #F97316
替换: #10B981

查找: #FB923C
替换: #34D399

查找: rgba(249, 115, 22,
替换: rgba(16, 185, 129,
```

---

## 🎨 四、组件与样式对照表

### 4.1 按钮使用情况

| 页面/组件 | 按钮位置 | 使用的 themeId | 修改文件 |
|-----------|----------|----------------|----------|
| 商品卡片 | 购买按钮 | `marketing-buy` | BaseButton.vue |
| 弹窗确认 | 确认按钮 | `primary` | BaseButton.vue |
| 弹窗取消 | 取消按钮 | `secondary` | BaseButton.vue |
| 登录按钮 | 头部登录 | theme-dark-orange.css 中 `.login-btn` | theme-dark-orange.css |
| 充值按钮 | 钱包充值 | `primary-orange` | BaseButton.vue |
| 注销按钮 | 危险操作 | `destructive` | BaseButton.vue |

### 4.2 弹窗使用情况

| 弹窗 | 套装 | 吉祥物 | 修改文件 |
|------|------|--------|----------|
| 登录注册 | suit-001 | mascot_01.png | modalThemeRegistry.ts |
| 绑定邮箱 | suit-001 | mascot_01.png | modalThemeRegistry.ts |
| 支付弹窗 | suit-001 | mascot_01.png | modalThemeRegistry.ts |
| 充值弹窗 | suit-001 | mascot_01.png | modalThemeRegistry.ts |

### 4.3 卡片样式

| 卡片类型 | 样式来源 | 修改文件 |
|----------|----------|----------|
| 商品卡片 | `.goods-card` | theme-dark-orange.css |
| 关于卡片 | `.about-card` | theme-dark-orange.css |
| 分类按钮 | `.category-item` | theme-dark-orange.css |

---

## 📋 五、快速修改指南

### 修改所有主按钮颜色

```
文件: components/shared/BaseButton.vue
位置: .btn-primary (第140行)
```

### 修改所有弹窗背景

```
文件: components/shared/BaseModal.vue
位置: .base-modal-container (第144行)
```

### 修改弹窗吉祥物图片

```
文件: utils/modalThemeRegistry.ts
字段: mascotImg
```

### 修改全站主题色(橙色)

```
文件: assets/styles/theme-dark-orange.css
全局替换: #F97316 → 新颜色
```

### 修改商品卡片悬浮效果

```
文件: assets/styles/theme-dark-orange.css
位置: .goods-card:hover (第207行)
```

### 添加新按钮类型

```
1. utils/buttonThemeRegistry.ts - 添加注册
2. components/shared/BaseButton.vue - 添加CSS
```

### 添加新弹窗套装

```
1. utils/modalThemeRegistry.ts - 添加注册
2. components/shared/BaseModal.vue - 添加CSS
```

---

## 🔧 六、AI 修改样式流程

### 用户请求: "把所有主按钮改成绿色"

```markdown
1. 打开 components/shared/BaseButton.vue
2. 找到 .btn-primary 类 (第140行)
3. 修改 background 渐变色
4. 修改 box-shadow 颜色
5. 验证所有使用 themeId="primary" 的按钮
```

### 用户请求: "把全站橙色改成青色"

```markdown
1. 打开 assets/styles/theme-dark-orange.css
2. 全局替换 #F97316 → #06B6D4
3. 全局替换 #FB923C → #22D3EE  
4. 全局替换 rgba(249, 115, 22, → rgba(6, 182, 212,
5. 打开 components/shared/BaseButton.vue
6. 修改 .btn-primary-orange 类
7. 验证首页、商品页、购物车等页面
```

### 用户请求: "添加一种新的紫色按钮"

```markdown
1. 在 utils/buttonThemeRegistry.ts 添加:
   'purple': { id: 'purple', variantClass: 'btn-purple' }

2. 在 components/shared/BaseButton.vue 添加:
   .btn-purple { background: linear-gradient(...); }

3. 使用: <BaseButton themeId="purple">按钮</BaseButton>
```

---

## 📚 七、文件索引

| 文件 | 说明 | 类型 |
|------|------|------|
| `components/shared/BaseButton.vue` | 全局按钮组件 | 组件 |
| `components/shared/BaseModal.vue` | 全局弹窗组件 | 组件 |
| `utils/buttonThemeRegistry.ts` | 按钮主题注册表 | 注册表 |
| `utils/modalThemeRegistry.ts` | 弹窗主题注册表 | 注册表 |
| `assets/styles/theme-dark-orange.css` | 主题样式 (主要) | 样式 |
| `assets/styles/goods-detail.css` | 商品详情样式 | 样式 |
| `assets/styles/mobile.css` | 移动端样式 | 样式 |
