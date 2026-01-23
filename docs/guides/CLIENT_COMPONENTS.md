# 客户端组件规范

> 本文档定义 Fantula 客户端可复用组件的使用方式

---

## 一、弹窗组件 (Modal)

### 1.1 四大基础模板

| 模板 | 路径 | 用途 | 尺寸 |
|------|------|------|------|
| **确认框** | `modal/base/BaseConfirmModal.vue` | 删除、退出确认 | 400px |
| **表单框** | `modal/base/BaseFormModal.vue` | 修改资料、绑定 | 500px |
| **结果框** | `modal/base/BaseResultModal.vue` | 成功/失败提示 | 400px |
| **业务框** | `modal/base/BaseBusinessModal.vue` | 支付、优惠券 | 600px |

---

### 1.2 BaseConfirmModal 使用

```vue
<template>
  <BaseConfirmModal
    :visible="showModal"
    title="确认删除"
    message="删除后数据无法恢复，确定吗？"
    type="danger"
    :loading="deleting"
    @close="showModal = false"
    @confirm="handleDelete"
  />
</template>

<script setup>
import BaseConfirmModal from '@/components/modal/base/BaseConfirmModal.vue'

const showModal = ref(false)
const deleting = ref(false)

const handleDelete = async () => {
  deleting.value = true
  await deleteApi()
  deleting.value = false
  showModal.value = false
}
</script>
```

**Props:**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | boolean | - | 显示状态 |
| `title` | string | '确认' | 标题 |
| `message` | string | - | 提示内容 |
| `type` | 'default' \| 'warning' \| 'danger' | 'default' | 类型 |
| `loading` | boolean | false | 加载状态 |
| `confirmText` | string | '确定' | 确认按钮文字 |
| `cancelText` | string | '取消' | 取消按钮文字 |

---

### 1.3 BaseFormModal 使用

```vue
<template>
  <BaseFormModal
    :visible="showModal"
    title="修改昵称"
    subtitle="昵称将展示在个人主页"
    :loading="submitting"
    @close="showModal = false"
    @submit="handleSubmit"
  >
    <el-input v-model="nickname" placeholder="请输入新昵称" />
  </BaseFormModal>
</template>
```

**Props:**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | boolean | - | 显示状态 |
| `title` | string | '表单' | 标题 |
| `subtitle` | string | - | 副标题 |
| `loading` | boolean | false | 加载状态 |
| `submitDisabled` | boolean | false | 禁用提交 |
| `showFooter` | boolean | true | 显示底部按钮 |

---

### 1.4 BaseResultModal 使用

```vue
<template>
  <BaseResultModal
    :visible="showModal"
    type="success"
    title="支付成功"
    message="订单已支付，可在订单列表查看"
    primaryText="查看订单"
    :showSecondary="true"
    secondaryText="继续购物"
    @close="showModal = false"
    @primary="goOrders"
    @secondary="goHome"
  />
</template>
```

**Props:**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | 'success' \| 'error' \| 'warning' \| 'info' | 'success' | 类型 |
| `title` | string | '操作成功' | 标题 |
| `message` | string | - | 描述文字 |
| `primaryText` | string | '确定' | 主按钮文字 |
| `showSecondary` | boolean | false | 显示次要按钮 |

---

### 1.5 BaseBusinessModal 使用

```vue
<template>
  <BaseBusinessModal
    :visible="showModal"
    title="选择优惠券"
    width="700px"
    :loading="applying"
    @close="showModal = false"
    @confirm="applyCoupon"
  >
    <!-- 复杂业务内容 -->
    <CouponList :coupons="coupons" @select="onSelect" />
    
    <!-- 底部左侧自定义 -->
    <template #footer-left>
      <span class="selected-info">已选择: {{ selectedName }}</span>
    </template>
  </BaseBusinessModal>
</template>
```

**Props:**
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | string | '600px' | 宽度 |
| `showHeader` | boolean | true | 显示头部 |
| `showFooter` | boolean | true | 显示底部 |
| `showCancel` | boolean | true | 显示取消按钮 |
| `showConfirm` | boolean | true | 显示确认按钮 |

**Slots:**
- `default` - 主内容区
- `footer-left` - 底部左侧区域
- `footer-right` - 底部右侧区域

---

## 二、布局组件

### 2.1 页面布局

| 布局 | 用途 | 示例 |
|------|------|------|
| `default` | 全屏页面 | 首页、商品详情 |
| `profile` | 带侧边栏 | 个人中心、订单 |

---

## 三、公共状态组件

### 3.1 骨架屏 (Skeleton)

使用 Element Plus 内置组件:

```vue
<el-skeleton :loading="loading" animated>
  <template #template>
    <el-skeleton-item variant="image" style="width: 100%; height: 200px" />
    <el-skeleton-item variant="h3" style="width: 60%" />
  </template>
  <template #default>
    <!-- 实际内容 -->
  </template>
</el-skeleton>
```

### 3.2 空状态 (Empty)

```vue
<el-empty description="暂无数据">
  <el-button @click="goShopping">去选购</el-button>
</el-empty>
```

---


---

## 四、优惠券组件 (Exchange)

位于 `components/exchange/coupon/` 目录下，用于兑换中心展示。

### 4.1 基础票据 BaseCouponTicket

核心视觉组件，提供左侧数值/右侧信息的票据样式。

```vue
<BaseCouponTicket
  color="gold"            <!-- purple | gold | cyan -->
  value="100"
  unit="点"
  title="优惠券标题"
  desc="描述信息"
  status="unused"         <!-- unused | used | expired -->
  @action="handleUse"
/>
```

### 4.2 业务封装组件

| 组件 | 用途 | 颜色 |
|------|------|------|
| `CouponFlat.vue` | 立减券 | Purple |
| `CouponBalance.vue` | 额度券 | Gold |
| `CouponProduct.vue` | 商品券 | Cyan |

**使用示例**:
```vue
<template>
  <component 
    :is="getComponent(item.type)" 
    :coupon-data="item" 
    @use="handleUse" 
  />
</template>
```

---

*最后更新: 2026-01-23*

---

## 五、弹窗主题系统 (Modal Theme)

### 5.1 系统概述

弹窗主题系统提供统一的视觉风格管理，支持多套 mascot 动效。

| 文件 | 作用 |
|------|------|
| `utils/modalThemeRegistry.ts` | 主题配置（图片/位置/动画） |
| `components/base/BaseModal.vue` | 主题渲染（CSS 滤镜/动画） |
| `utils/modalAssetPreloader.ts` | 素材预加载（消除闪烁） |

### 5.2 内置套装

| ID | 名称 | 特点 |
|----|------|------|
| `suit-001` | Classic Phantom | 若隐若现的幽灵效果 |
| `suit-002` | Soft Light | 明亮柔和，暖色调 |
| `suit-003` | Cyberpunk | 霓虹发光，高对比 |

### 5.3 添加新套装

**步骤1**: 在 `modalThemeRegistry.ts` 添加配置

```typescript
'suit-004': {
    id: 'suit-004',
    name: 'Your Theme',
    mascotImg: '/images/your-mascot.png',
    mascotPosition: 'bottom',
    variantClass: 'variant-your-theme',
    animation: 'your-animation',
    opacity: 0.8,
    duration: '0.6s'
}
```

**步骤2**: 在 `BaseModal.vue` 底部添加 CSS（有明确的 `[SUIT-XXX]` 注释标识）

**步骤3**: 使用 `<BaseModal themeId="suit-004" />`

### 5.4 素材预加载

首页加载时自动预加载所有主题图片（调用 `preloadModalAssets()`），新增图片会自动被包含。

