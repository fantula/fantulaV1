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

*最后更新: 2026-01-17*
