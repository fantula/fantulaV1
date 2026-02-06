# PC 客户端全局组件指南

> **版本**: V1.0 | **更新时间**: 2026-02-05
> **目标**: 统一开发规范，提供组件样式查询手册

---

## 📚 目录

1.  [全局组件清单](#1-全局组件清单)
2.  [按钮组件 (BaseButton)](#2-按钮组件-basebutton)
    *   [现有主题一览](#现有按钮主题)
    *   [如何新增主题](#如何新增按钮主题)
3.  [弹窗组件 (BaseModal)](#3-弹窗组件-basemodal)
    *   [现有弹窗套装](#现有弹窗套装)
    *   [如何新增套装](#如何新增弹窗套装)
4.  [其他组件](#4-其他基础组件)

---

## 1. 全局组件清单

所有核心基础组件位于 `components/shared/` 和 `components/pc/modal/base/` 目录。

| 组件名 | 路径 | 描述 | 使用场景 |
| :--- | :--- | :--- | :--- |
| **BeseButton** | `components/shared/BaseButton.vue` | 基础按钮 | 所有按钮场景，支持多种主题 |
| **SendCodeButton** | `components/shared/SendCodeButton.vue` | 发送验证码 | 登录、注册、修改密码等需要倒计时的场景 |
| **BaseModal** | `components/shared/BaseModal.vue` | 基础弹窗（底座） | 需要完全自定义内容的弹窗 |
| **BaseFormModal** | `components/pc/modal/base/BaseFormModal.vue` | 表单弹窗 | 带有"取消/提交"标准化页脚的弹窗 |
| **BaseConfirmModal** | `components/pc/modal/base/BaseConfirmModal.vue` | 确认/警告弹窗 | 删除确认、操作警告 |
| **BaseInfiniteList** | `components/shared/BaseInfiniteList.vue` | 无限滚动列表 | 订单列表、流水列表等 |

---

## 2. 按钮组件 (BaseButton)

### 基础用法

```vue
<BaseButton 
  themeId="primary" 
  size="default" 
  :loading="isLoading" 
  @click="handleClick"
>
  按钮文本
</BaseButton>
```

### 现有按钮主题

定义文件: `utils/buttonThemeRegistry.ts`
样式文件: `components/shared/BaseButton.vue` (style scoped)

| Theme ID | 样式描述 | 适用场景 |
| :--- | :--- | :--- |
| **primary** | 🌊 蓝色渐变 | 默认主操作，常规提交 |
| **primary-orange** | 🍊 橙色渐变 | 充值、开通VIP等金钱相关操作 |
| **secondary** | 🌫️ 幽灵/描边 | 取消、返回、次要操作 |
| **destructive** | 🔴 红色警告 | 删除、注销、退出登录 |
| **suit-001-primary** | 🔮 霓虹蓝光 | 个人中心高科技感主操作 |
| **marketing-buy** | 🛒 亮蓝/购物车 | 商品卡片购买按钮 |
| **coupon-purple** | 🟣 紫色 | 紫色系优惠券 |
| **coupon-gold** | 🟡 金色 | 金色系优惠券 |
| **coupon-cyan** | 🔵 青色 | 青色系优惠券 |

### 如何新增按钮主题

**步骤 1: 注册主题 ID**
打开 `utils/buttonThemeRegistry.ts`，在 `BUTTON_THEMES` 对象中添加配置：

```typescript
'new-theme-name': {
    id: 'new-theme-name',
    variantClass: 'btn-new-theme' // 对应的 CSS 类名
},
```

**步骤 2: 实现 CSS 样式**
打开 `components/shared/BaseButton.vue`，在 `<style scoped>` 底部添加：

```css
/* [New Theme Name] */
.btn-new-theme {
  background: #123456;
  color: #fff;
  border: 1px solid #abcdef;
}
.btn-new-theme:not(.is-disabled):hover {
  background: #234567;
  /* Hover 效果 */
}
```

---

## 3. 弹窗组件 (BaseModal)

### 基础用法 (BaseModal)

```vue
<BaseModal
  v-model:visible="showModal"
  title="自定义标题"
  themeId="suit-001"
  width="500px"
>
  <div>弹窗内容...</div>
  
  <!-- 自定义页脚 (可选) -->
  <template #footer>
    <BaseButton @click="showModal = false">关闭</BaseButton>
  </template>
</BaseModal>
```

### 表单弹窗用法 (BaseFormModal)

```vue
<BaseFormModal
  v-model:visible="showForm"
  title="修改昵称"
  submitText="保存"
  :loading="isSubmitting"
  @submit="handleSubmit"
>
  <input v-model="nickname" />
</BaseFormModal>
```

### 现有弹窗套装 (Themes)

弹窗主题控制整体色调、模糊度以及**吉祥物 (Mascot)** 动画。
定义文件: `utils/modalThemeRegistry.ts`

| Theme ID | 名称 | 特点 | 吉祥物 |
| :--- | :--- | :--- | :--- |
| **suit-001** | 标准幽灵 (Phantom) | 模糊+灰度+柔光，科技感 | 底部升起 (Cat) |
| **suit-002** | 柔光 (Soft) | 明亮柔和，暖色调 | 左侧浮现 |
| **suit-003** | 赛博 (Cyber) | 高对比度，霓虹边缘 | 右侧弹出 |

### 如何新增弹窗套装

**步骤 1: 注册套装 ID**
打开 `utils/modalThemeRegistry.ts`，添加配置：

```typescript
'suit-004': {
    id: 'suit-004',
    name: '暗夜风格',
    mascotImg: '/images/mascot-dark.png', // 可选吉祥物图片
    mascotPosition: 'right', // 'bottom', 'left', 'right'
    variantClass: 'variant-dark', // CSS 类名
    animation: 'fade-in'
}
```

**步骤 2: 实现视觉特效 (无需改动结构，只改 CSS)**
打开 `components/shared/BaseModal.vue`，在 `<style>` (非scoped, 或底部 global style) 添加：

```css
/* [SUIT-004] 暗夜风格 */
.variant-dark {
    filter: brightness(0.8) contrast(1.2);
    mix-blend-mode: multiply; /* 混合模式决定了"玻璃"的质感 */
}
```

---

## 4. 其他基础组件

### BaseConfirmModal (确认框)
用于二次确认，支持 `type="danger"` (删除) 或 `type="warning"` (提示)。

```vue
<BaseConfirmModal
  v-model:visible="showDelete"
  title="删除确认"
  message="确定要删除吗？此操作不可逆。"
  type="danger" 
  @confirm="doDelete"
/>
```

### SendCodeButton (验证码按钮)
封装了倒计时逻辑的特殊按钮，常用于输入框右侧。

```vue
<div class="relative-input-group">
  <input class="form-input" />
  <SendCodeButton :loading="loading" @click="sendOtp" />
</div>
```
*注意：父容器需要有 `relative` 定位。*
