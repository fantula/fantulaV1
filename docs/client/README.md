# PC 客户端文档索引

> **Fantula PC Client**
> **版本**: V1.2 | **更新时间**: 2026-02-08

---

## 🎯 快速入口

**AI 助手执行任务前必读**:
1. [`../AI_SOP.md`](../AI_SOP.md) - 标准操作流程 (强制)
2. [`../AI_WORKFLOW.md`](../AI_WORKFLOW.md) - 工作流程主框架

---

## 📚 文档列表

### 核心规范

| 文档 | 说明 | 优先级 |
|------|------|--------|
| [CLIENT_TEST_OPTIMIZATION_GUIDE.md](./CLIENT_TEST_OPTIMIZATION_GUIDE.md) | 测试与优化规范 | 必读 |
| [CLIENT_COMPONENT_ROADMAP.md](./CLIENT_COMPONENT_ROADMAP.md) | 组件标准化路线图 | 必读 |
| [STYLE_MAPPING.md](./STYLE_MAPPING.md) | 🆕 **全局样式映射** | 必读 |
| [../../config/client-routes.ts](../../config/client-routes.ts) | 🆕 **客户端路由常量** | 必读 |

### 重点页面文档 (⭐ 关键)

| 文档 | 说明 | 重要性 |
|------|------|--------|
| [ORDER_DETAIL.md](./ORDER_DETAIL.md) | ⭐ 订单详情页完整规范 | 极高 |

### 示例文档

| 文档 | 说明 |
|------|------|
| [EXAMPLE_TEST_HOMEPAGE.md](./EXAMPLE_TEST_HOMEPAGE.md) | 示例：测试首页完整流程 |

### 相关业务规则

| 文档 | 说明 |
|------|------|
| [../business_rules/ORDER_DETAIL_DISPLAY.md](../business_rules/ORDER_DETAIL_DISPLAY.md) | 订单详情显示规范 |
| [../business_rules/ORDER_RENEWAL_LOGIC.md](../business_rules/ORDER_RENEWAL_LOGIC.md) | 订单续费逻辑 |

---

## 🏗 目录结构

```
pages/
├── index.vue                   # 首页
├── products/                   # 商品相关
│   ├── index.vue              # 商品列表
│   └── [id].vue               # 商品详情
├── profile/                    # 用户中心
│   ├── index.vue              # 个人中心
│   ├── orders.vue             # 订单列表
│   └── order/
│       └── [id].vue           # ⭐ 订单详情 (最复杂)
└── ...

components/
├── order/                      # 订单相关组件
│   ├── FulfillmentShared.vue  # 账号合租
│   ├── FulfillmentCdk.vue     # 一次性CDK
│   └── FulfillmentSubmitForm.vue # 虚拟充值
├── pc/                         # PC专属组件
│   └── order/
│       └── OrderActions.vue   # 订单操作按钮
└── common/                     # PC/Mobile 共享组件
```

---

## 🔗 与移动端的关系

```
┌─────────────────────────────────────────────────────────┐
│                      共享层                              │
├─────────────────────────────────────────────────────────┤
│  API 接口        │  stores/          │  composables/    │
│  api/client/     │  客户端状态       │  业务逻辑         │
│                  │                   │                  │
│  ⚠️ PC 和 Mobile 必须使用相同的数据获取逻辑            │
└─────────────────────────────────────────────────────────┘
          │                     │
          ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│    PC 端        │   │    移动端        │
├─────────────────┤   ├─────────────────┤
│  独立 UI 组件    │   │  独立 UI 组件    │
│  独立布局       │   │  独立布局        │
│  components/pc/ │   │  components/    │
│                 │   │  mobile/        │
└─────────────────┘   └─────────────────┘
```

---

## ❌ 禁止事项

1. **禁止复制业务逻辑** - 移动端必须复用 PC 端逻辑
2. **禁止新增 API** - 使用现有 API，不新增接口
3. **禁止改变操作流程** - 优化只改性能和代码，不改功能

---

## 📝 更新日志

### V1.0 (2026-02-04)
- 初始化 PC 客户端文档结构
