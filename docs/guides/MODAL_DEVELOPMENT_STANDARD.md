# 弹窗开发与标准化指南 (Modal Development Standard)

> **核心原则**：所有客户端弹窗必须严格继承四大基础模板。禁止编写“裸奔”的自定义弹窗 css 样式。

---

## 📅 一、 目录结构标准 (Directory Standard)

所有弹窗组件必须位于 `components/client/modal/` 下，并严格按照职责分类。

```bash
components/client/modal/
├── base/                   # [禁止修改] 四大基类 (UI 核心层)
│   ├── BaseModal.vue       #   -> 通用顶级容器 (Premium Glass)
│   ├── BaseFormModal.vue   #   -> 表单类 (输入/提交)
│   ├── BaseConfirmModal.vue#   -> 确认类 (警示/操作)
│   ├── BaseResultModal.vue #   -> 结果类 (成功/失败)
│   └── BaseBusinessModal.vue # -> 业务类 (大尺寸/复杂)
│
├── account/                # [账户类] 个人资料、安全设置
│   ├── ChangePasswordModal.vue
│   ├── BindEmailModal.vue
│   ├── ChangeAvatarModal.vue
│   └── LoginRegisterModal.vue
│
├── system/                 # [系统类] 强交互、状态变更
│   ├── LogoutModal.vue
│   └── DeleteAccountModal.vue
│
├── business/               # [业务类] 交易、资产、订单
│   ├── OrderPayModal.vue
│   ├── WalletRechargeModal.vue
│   └── CouponSelectorModal.vue
│
└── info/                   # [信息类] 静态展示
    ├── ContactModal.vue
    ├── ServiceModal.vue
    └── JoinUsModal.vue
```

---

## 🧱 二、 四大基类使用规范 (Base Component Specs)

### 1. 表单类 (BaseFormModal)
> 用于任何需要用户输入数据的场景（修改密码、填写资料）。

-   **强制属性**: `visible`, `title`, `@submit`
-   **内置功能**: Loading 状态管理, 表单布局, 底部按钮自动生成
-   **代码模板**:
```vue
<template>
  <BaseFormModal
    :visible="visible"
    title="修改昵称"
    :loading="loading"
    @close="emit('close')"
    @submit="handleSubmit"
  >
    <!-- 内容区自动获得标准间距 -->
    <div class="form-group">
      <label class="form-label">新昵称</label>
      <input class="form-input" v-model="val" />
    </div>
  </BaseFormModal>
</template>
```

### 2. 确认类 (BaseConfirmModal)
> 用于危险操作或需要二次确认的场景（退出登录、删除）。

-   **强制属性**: `type` ('default' | 'warning' | 'danger')
-   **视觉特点**: 自动适配按钮颜色，只包含 Title + Message
-   **代码模板**:
```vue
<template>
  <BaseConfirmModal
    :visible="visible"
    type="danger"
    title="注销账号"
    message="此操作不可恢复，确认继续？"
    @confirm="handleDelete"
  />
</template>
```

### 3. 结果类 (BaseResultModal)
> 用于操作完成后的反馈（支付成功、充值失败）。

-   **强制属性**: `status` ('success' | 'fail' | 'warning')
-   **视觉特点**: 包含大图标动画，强调主要下一步操作
-   **代码模板**:
```vue
<template>
  <BaseResultModal
    :visible="visible"
    status="success"
    title="支付成功"
    btn-text="查看订单"
    @confirm="router.push('/order')"
  />
</template>
```

### 4. 业务类 (BaseBusinessModal)
> 用于复杂的大型业务流程（选择优惠券、收银台）。

-   **强制属性**: `width` (默认 600px，可自定义)
-   **视觉特点**: 包含 Header/Body/Footer 插槽，允许最大程度自定义布局
-   **代码模板**:
```vue
<template>
  <BaseBusinessModal
    :visible="visible"
    title="选择优惠券"
    width="720px"
  >
    <!-- 业务组件插槽 -->
    <CouponList :data="list" />
    
    <!-- 自定义底部 -->
    <template #footer-left>
      <span>已选: {{ selected }}</span>
    </template>
  </BaseBusinessModal>
</template>
```

---

## ⚖️ 三、 严格分离原则 (Strict Separation Rules)

1.  **禁止在基类 (Base/) 中写业务逻辑**
    *   ❌ 错误：在 `BaseModal.vue` 里调用 `useUserStore()`
    *   ✅ 正确：基类只负责 UI 渲染和事件抛出 (`emit('confirm')`)

2.  **禁止在业务组件中写通用样式**
    *   ❌ 错误：在 `ChangePassword.vue` 里写 `.overlay { background: rgba(...) }`
    *   ✅ 正确：直接使用 `<BaseFormModal>`，样式自动继承

3.  **禁止跨层级引用**
    *   业务组件不能直接引用其他业务组件及其私有子组件。
    *   公共逻辑应提取到 `composables/client/`。

---

## 🎨 四、 样式变量 (Design Tokens)

所有弹窗自动继承以下全局变量（位于 `BaseModal.vue`）：

| 变量 | 值 | 说明 |
| :--- | :--- | :--- |
| **Glass Background** | `rgba(30, 41, 59, 0.95)` | 深色磨砂玻璃背景 |
| **Border** | `1px solid rgba(255, 255, 255, 0.08)` | 3D 边框 |
| **Input Focus** | `#3B82F6` (Neon Blue) | 输入框聚焦发光 |
| **Primary Gradient** | `linear-gradient(#3B82F6, #2563EB)` | 主按钮渐变 |

---

*文档版本: v1.0 (2026-01-25)*
