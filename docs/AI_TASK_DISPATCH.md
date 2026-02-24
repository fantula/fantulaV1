# AI 助理中心调度手册

> **版本**: V4.2 | **更新时间**: 2026-02-21
> **你是谁**: 你是被项目经理（PM）派遣来执行特定任务的 AI 执行助手。你不是项目经理，你是执行者。
> **⚡ 新入口**: 收到任务后，请优先阅读 **`docs/SKILLS_HUB.md`**，它会根据任务类型路由到对应的技能脚本（bug-fix / new-feature / deployment）。技能脚本内嵌了逐步检查清单，比本文档更适合直接执行。
> **本文档的作用**: 作为**规则库**被技能脚本按需引用（模块对照表、已知模式、SCAN/OPTIMIZE流程）。不再作为主要入口。
> **核心原则**: 只做被要求的事，不做没被要求的事。宁可少改一行，不可多改一行。

---

## ⚠️ 铁律（违反任何一条即视为任务失败）

```
┌─────────────────────────────────────────────────────────────────┐
│  1. 每次任务必须从本文档开始，按流程执行                          │
│  2. 未经用户确认，禁止修改任何代码                                │
│  3. 所有修改必须符合文档链中规范文档的要求                        │
│  4. 任务完成后，必须检查并更新受影响的文档                        │
│  5. 修改一个文件时，不能破坏其他文件的功能                        │
│  6. 严禁直接修改服务器代码（GEMINI.md 铁律）                     │
│  7. console 语句用 if (import.meta.dev) 守卫，禁止直接删除       │
│  8. 修改共享布局/父组件时，必须审计所有依赖的子页面              │
│  9. import + 声明 ≠ 功能生效，必须验证模板中实际渲染了组件       │
│ 10. composable 状态复用时，init 函数开头必须显式清空旧状态       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 统一执行流程（所有任务都走这个流程）

```
用户说一句话
      │
      ▼
┌─ Step 1: 判断领域（A/B/C）和操作类型（FIX/SCAN/OPTIMIZE）
│
├─ Step 2: 阅读文档链（按该领域的文档链顺序，逐个阅读）
│
├─ Step 3: 定位问题文件（根据模块对照表找到代码位置）
│
├─ Step 4: 诊断 / 扫描 / 分析（根据操作类型执行对应流程）
│
├─ Step 5: 输出报告（等待用户确认）
│          ⛔ 在此之前禁止修改任何代码
│
├─ Step 6: 用户确认后执行修改
│
├─ Step 7: 验证（npm run build / typecheck）
│
└─ Step 8: 更新文档（必须！检查哪些文档受影响并更新）
```

---

## Step 1: 判断领域和操作类型

### 领域判断

| 关键词 | 领域 |
|---|---|
| 后台、管理、admin、订单管理、商品管理、CDK、优惠券、用户管理、工单、充值、设置、帮助中心、媒体、消息、文章、Tab切换 | **领域 A：后台管理端** |
| 前台、商城、PC、首页、商品详情、购物车、结算、个人中心、移动端、手机、H5 | **领域 B：客户端** |
| 服务器、部署、数据库、Edge Function、报错日志、系统挂了、500错误、维护 | **领域 C：后端与运维** |

### 操作类型判断

| 用户说的话 | 操作类型 |
|---|---|
| 修复、修、不能点、报错、无法、没反应、坏了、失败、卡住 | **FIX** |
| 上次没修好、还是不行、问题依旧、仍然无法、重新修 | **RETRY** |
| 扫描、检查、审计、看看有没有问题 | **SCAN** |
| 优化、清理、重构、整理 | **OPTIMIZE** |
| 验证、测试、确认 | **VERIFY** |

---

## Step 2: 阅读文档链

### 领域 A：后台管理端

```
必读（每次任务都读）：
  ① docs/AI_SOP.md                              → 你的操作规范
  ② docs/admin/ADMIN_ENGINEERING_STANDARD.md     → 目录结构、编码标准
  ③ config/admin-routes.ts                       → 路由常量（路径唯一真理源）

按需读（根据问题类型）：
  ④ docs/admin/ADMIN_COMPONENT_ROADMAP.md        → 组件标准（涉及组件问题时）
  ⑤ docs/admin/ADMIN_DEVELOPMENT_GUIDE.md        → 开发模式（涉及 Tab/弹窗/表单时）
  ⑥ docs/admin/ADMIN_AUTH_PERMISSION.md          → 认证权限（涉及登录/权限时）
  ⑦ docs/admin/ADMIN_TEST_OPTIMIZATION_GUIDE.md  → 优化红线（OPTIMIZE 任务时）
  ⑧ docs/guides/MODAL_DEVELOPMENT_STANDARD.md    → 弹窗标准（涉及弹窗时）
```

### 领域 B：客户端

```
必读：
  ① docs/AI_SOP.md
  ② docs/client/README.md（PC）或 docs/mobile/README.md（移动端）
  ③ docs/SHARED_LOGIC_REFERENCE.md               → 共享逻辑（PC/Mobile 复用）

按需读：
  ④ config/client-routes.ts                → 🆕 客户端路由常量（唯一真理源，禁止硬编码路由字符串）
  ⑤ docs/client/GLOBAL_COMPONENT_GUIDE.md         → 全局组件
  ⑥ docs/client/STYLE_MAPPING.md / docs/mobile/STYLE_MAPPING.md
  ⑦ docs/PERFORMANCE_OPTIMIZATION.md              → 性能/加载状态问题时（含骨架屏规范、Loading 标准）
  ⑧ docs/guides/UI_THEME_STANDARD.md              → 样式问题时
  ⑨ docs/business_rules/ORDER_DELETE_RULES.md     → 订单删除/隐藏问题时
```

### 领域 C：后端与运维

```
必读：
  ① GEMINI.md                                     → 金科玉律（场景 A/B 流程）
  ② docs/MAINTENANCE.md                           → 运维手册
  ③ docs/CHANGE_MANAGEMENT.md                     → 变更管理

按需读：
  ④ docs/SERVER_DEPLOYMENT.md                     → 部署问题时
  ⑤ docs/backend/DATABASE_SCHEMA.md               → 数据库问题时
  ⑥ docs/backend/RLS_POLICIES.md                  → 权限策略问题时
  ⑦ docs/backend/EDGE_FUNCTIONS.md                → Edge Function 问题时
```

---

## Step 3: 定位问题文件

### 后台模块对照表

| 模块关键词 | 页面目录 | 相关组件 | 相关 Composable |
|---|---|---|---|
| 订单 | `pages/manager_portal/orders/` | `components/admin/order/` | `composables/admin/useAdminOrderList.ts` |
| 商品 | `pages/manager_portal/products/` | `components/admin/product/` | `composables/admin/useAdminProductForm.ts` |
| CDK | `pages/manager_portal/cdk/` | `components/admin/cdk/` | — |
| 优惠券 | `pages/manager_portal/coupons/` | — | — |
| 用户 | `pages/manager_portal/users/` | — | — |
| 工单 | `pages/manager_portal/tickets/` | `tickets/components/` | — |
| 充值 | `pages/manager_portal/recharge/` | — | — |
| 媒体 | `pages/manager_portal/media/` | — | — |
| 消息 | `pages/manager_portal/messages/` | — | — |
| 设置 | `pages/manager_portal/backend-settings/` | — | — |
| 帮助中心 | `pages/manager_portal/help-center/` | — | — |
| 文章 | `pages/manager_portal/article/` | — | — |
| Tab/布局 | — | `components/admin/base/AdminModuleLayout.vue` | — |
| 弹窗 | — | `components/admin/base/AdminDataDialog.vue` | `composables/admin/useAdminDialog.ts` |
| 列表/分页 | — | `components/admin/base/AdminDataTable.vue` | `composables/admin/useAdminList.ts` |
| 全局菜单 | — | — | `config/admin-menu.ts` |
| 路由路径 | — | — | `config/admin-routes.ts` |
| 认证/登录 | `pages/manager_portal/login.vue` | — | `middleware/mgmt-auth.ts`、`stores/admin/admin.ts` |

### 客户端模块对照表

| 模块关键词 | PC 页面 | 移动端页面 | 共享逻辑 |
|---|---|---|---|
| 路由路径 | — | — | `config/client-routes.ts` (🆕 唯一真理源) |
| 首页 | `pages/pc/index.vue` | `pages/mobile/index.vue` | `composables/client/useHomeData.ts` |
| 商品详情 | `pages/pc/product/[id].vue` | `components/mobile/goods/ProductDetailSheet.vue` | `composables/client/useProductDetail.ts` |
| 购物车 | — | `pages/mobile/cart.vue` | `stores/client/cart.ts` |
| 结算/支付 | `pages/pc/checkout/[id].vue` | `pages/mobile/checkout/[id].vue` | `composables/client/useCheckout.ts` |
| 订单列表 | `pages/pc/profile/order/index.vue` | `pages/mobile/profile/order/index.vue` | `composables/client/useOrderList.ts` |
| 订单详情 | `pages/pc/profile/order/[id].vue` | `pages/mobile/profile/order/[id].vue` | `composables/client/useOrderDetail.ts` |
| 个人中心首页 | `pages/pc/profile/index.vue` | `pages/mobile/profile/index.vue` | `stores/client/user.ts` |
| 账号设置 | `pages/pc/profile/index.vue` (ProfilePersonalInfo) | `pages/mobile/profile/account/index.vue` | — |
| 钱包/额度 | `pages/pc/profile/wallet.vue` | `pages/mobile/profile/wallet.vue` | `components/pc/modal/business/WalletRechargeModal.vue`、`components/mobile/profile/modals/RechargeModal.vue` |
| 工单 | `pages/pc/profile/tickets/index.vue` | `pages/mobile/profile/tickets/index.vue` | — |
| 消息 | `pages/pc/profile/messages/index.vue` | `pages/mobile/profile/messages/index.vue` | — |
| 收藏 | `pages/pc/profile/favorites.vue` | `pages/mobile/profile/favorites.vue` | — |
| 兑换中心 | `pages/pc/profile/redemption/index.vue` | `pages/mobile/profile/redemption/index.vue` | — |
| 商品频道 | `pages/pc/channel.vue` | `pages/mobile/channel.vue` | — |
| 帮助/FAQ | `pages/pc/faq.vue` | `pages/mobile/help.vue` | — |
| 微信登录 | — | `components/mobile/auth/MobileLoginSheet.vue` | `pages/mobile/wechat-callback.vue` |
| 全局动画 | `pages/pc/index.vue` (showLoader) | — | `components/shared/GlobalLoader.vue` |

---

## 🔧 已知模式与修复规范（铁律补充，必须遵守）

> 以下模式来自真实 Bug 修复经验，AI 执行助手必须在 SCAN / FIX / OPTIMIZE 时检查这些模式。

### 模式 1: 移动端滚动容器

**背景**: `layouts/mobile.vue` 的 `.mobile-content` 使用 `overflow: hidden`，因此每个移动端页面必须自带滚动容器。

**规范**:
```css
.mobile-xxx-page {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    /* 禁止使用 min-height: 100vh 代替，会导致无法滚动 */
}
```

**检查点**: 任何移动端页面如果只有 `min-height: 100vh` 而没有 `overflow-y: auto`，即为 Bug。

### 模式 2: Console 守卫

**背景**: 生产环境不应暴露 console 输出，但开发环境需要保留调试能力。

**规范**:
```typescript
// ✅ 正确 — 生产环境被 tree-shaking 移除
if (import.meta.dev) console.log('调试信息', data)

// ✅ 正确 — 多条语句用 block
if (import.meta.dev) {
    console.log('请求参数:', params)
    console.error('错误详情:', err)
}

// ❌ 错误 — 直接删除（丢失调试信息）
// ❌ 错误 — 保留裸 console.log（泄露到生产环境）
```

### 模式 3: 组件渲染验证

**背景**: Import 组件 + 声明响应式状态 + 绑定按钮事件 ≠ 功能生效。组件必须在 `<template>` 中实际渲染。

**检查流程**:
```
发现 import XxxModal from '...'
    → 检查 script 中是否有 visible/show 状态声明
    → 检查 template 中是否有 <XxxModal :visible="..." />
    → 三者缺一则为 Bug
```

**真实案例**: `wallet.vue` 中 `RechargeModal` 有 import 和 state，但模板中未渲染，导致按钮点击无反应。

### 模式 4: Composable 状态重置

**背景**: 当同一个 composable 被复用于不同数据（如切换商品），旧状态不会自动清除。

**规范**:
```typescript
// ✅ 正确 — init 开头显式清空
const _initConfig = async () => {
    selectedSpecs.value = {}          // 清空上次选择
    selectedSkuImage.value = ''       // 清空上次图片
    // ... 然后设置新值
}

// ❌ 错误 — 条件赋值（旧值不会被覆盖）
if (!selectedSpecs.value[key]) selectedSpecs.value[key] = newValue
```

### 模式 5: 布局变更影响审计

**背景**: 修改 `layouts/mobile.vue` 的 overflow 属性，导致 11 个子页面丧失滚动能力。

**规则**: 修改以下文件时，必须列出所有受影响页面并逐一验证：
- `layouts/mobile.vue` → 所有 `pages/mobile/**/*.vue`
- `layouts/pc.vue` → 所有 `pages/pc/**/*.vue`
- `layouts/mgmt.vue` → 所有 `pages/manager_portal/**/*.vue`
- `components/shared/BaseModal.vue` → 所有使用 BaseModal 的弹窗
- `components/admin/base/AdminModuleLayout.vue` → 所有后台页面

### 模式 7: Nuxt 生产构建缓存污染

**背景**: `nuxt dev` 在 `.nuxt/` 目录写入 dev 存根文件。跳过清理直接 `npm run build` 可导致生产产物包含 dev 内容。

**症状**:
- 部署后 HTTP 500: `rendererContext._entrypoints is not iterable`
- 或 HTML JS 路径为绝对路径（`/_nuxt/Users/dalin/...`）而非哈希路径（`/_nuxt/abc123.js`）

**铁律**（领域 C 任何构建任务前必须执行）：
```bash
cd nuxt-frontend
rm -rf .nuxt .output
npm run build
```

**验证**:
```bash
wc -c .output/server/chunks/build/client.precomputed.mjs
# 正常 ~521KB，异常 23 bytes (dev stub)
```

**检查点**: 接到"登录页打不开"/"服务器 500"的报告时，优先检查此问题（比 PM2 日志更快定位）。

### 模式 8: Nuxt pages:extend 浅拷贝路由冲突

**背景**: `nuxt.config.ts` 中的 `pages:extend` 钩子常用于复制特定目录下的路由（例如将 `/pc/*` 复制为根目录 `/*` 用于动态适配）。如果复制时只对顶级页面对象使用了浅拷贝 `{ ...p }`，会导致其嵌套子页面 (`children` 数组) 内部元素保留原有的引用和原有的 `name` 属性。

**症状**: 
- 嵌套的子路由页面（例如 `/pc/profile/...` 下的二级 Tab）在导航时突然变 404，控制台提示 `No match found for location...`。
- 这是因为 Vue Router 的底层机制：当重复注册具有相同 `name` 的路由时，后注册的克隆路由会直接覆盖（或静默剔除）先注册的同名原版路由，导致真实路径对应的记录丢失。

**规范 (修复方案)**:
在 `pages:extend` 中生成克隆路由时，必须执行**深度递归克隆**（Deep Clone），确保彻底隔离名称和子级引用：
```typescript
const cloneRoute = (route: any): any => {
  const cloned = { ...route }
  if (cloned.name) cloned.name = 'root-' + cloned.name
  if (cloned.children) {
    cloned.children = cloned.children.map(cloneRoute)
  }
  return cloned
}
```

**检查点**: 当遇到一片区域内的动态路由或子嵌套页面全部 404 瘫痪时，必须检查 `nuxt.config.ts` 及运行时是否有不安全的浅拷贝引发了 `name` 冲突被踢出路由表。

### 模式 6: CSS 残留清理

**背景**: 设计迭代中产生的空 div、占位 CSS 留存在代码中。

**SCAN 检查点**:
- 空 `<div class="xxx"></div>`（无子内容、无功能）
- CSS 规则中 `width: Xpx` 的空白占位块
- 注释掉的旧样式代码块

---

## Step 4: 执行操作

### FIX 流程（修复问题）

```
1. 【定位代码】
   根据 Step 3 对照表找到文件，打开并阅读相关代码

2. 【追踪调用链】
   找到用户描述的按钮/功能 → 找到 @click 绑定 → 追踪函数逻辑
   → API 调用 → 路由跳转 → 完整理解整个流程

3. 【对比规范】
   将代码与文档链中的规范逐条对比，找出偏离规范的地方：
   - 路由是否用了 adminRoute()？（对照 config/admin-routes.ts）
   - 组件是否用了 AdminDataTable/AdminDataDialog？
   - 弹窗是否用了 useAdminDialog？
   - 子页面是否用了 <NuxtPage /> 而非 <router-view />？
   - Tab 布局是否正确使用 AdminModuleLayout？

4. 【诊断根因】
   按优先级排查：
   a. 事件绑定问题（@click 缺失/绑错函数）
   b. 路由问题（路径拼错/没用 adminRoute 或 mobileRoutes/路由不存在）
   c. 组件通信问题（props/emit 断裂）
   d. 状态管理问题（loading 卡住/visible 没切换）
   e. API 问题（调用失败/错误被吞）
   f. 布局问题（Tab 匹配逻辑/NuxtPage vs router-view）
   g. UX 反馈缺失（按钮无 disabled/spinner/文字切换 → 参见 PERFORMANCE_OPTIMIZATION.md §3）

5. 【输出诊断报告】格式：
   ## 诊断报告: [问题描述]
   - 问题文件: [路径 + 行号]
   - 根因: [对照哪条规范，违反了什么]
   - 修复方案: [具体代码改动]
   - 影响范围: [修改是否影响其他模块]
   - 需更新的文档: [列出受影响的文档]

   ⛔ 等用户确认
```

### SCAN 流程（扫描检查）

#### 后台管理端 SCAN 清单
```
1. 打开目标模块的所有 .vue 和 .ts 文件
2. 逐文件检查以下清单：
   - [ ] 使用 AdminDataTable（列表页）
   - [ ] 使用 AdminDataDialog / useAdminDialog（弹窗页）
   - [ ] 使用 PageTipHeader（所有页面）
   - [ ] 使用 adminRoute()（所有路由跳转，禁止硬编码字符串路径）
   - [ ] 使用 useBizFormat（格式化）
   - [ ] 使用 useBizConfig（状态标签）
   - [ ] 使用 <NuxtPage /> 而非 <router-view />（父布局页）
   - [ ] 无 console.log
   - [ ] 无注释死代码
   - [ ] 所有异步操作有 loading 状态
   - [ ] 所有 API 调用有 try/catch + ElMessage 错误提示
   - [ ] 空状态有展示
   - [ ] console 语句已用 if (import.meta.dev) 守卫 → 参见 §模式2
   - [ ] 已 import 的组件在 <template> 中实际渲染 → 参见 §模式3
   - [ ] 无空 div 占位残留 → 参见 §模式6
```

#### 客户端（PC/移动端）SCAN 清单
```
逐文件检查：
   - [ ] 使用 mobileRoutes.xxx() 或 pcRoutes.xxx()（禁止硬编码路由字符串）
   - [ ] 价格展示调用 Number(price).toFixed(2)（不可直接渲染原始数字）
   - [ ] 关键操作按钮：异步期间设置 loading ref + disabled + 文字/spinner 反馈
         标准：loading ? '处理中...' : '立即购买'
         参考：PERFORMANCE_OPTIMIZATION.md §3
   - [ ] 无 setTimeout 伪造 API 延迟（应替换为真实调用）
   - [ ] 无 console.log / console.error（开发调试代码已清除）
   - [ ] 所有 API 调用包裹 try/finally，loading 在 finally 中重置
   - [ ] 页面数据加载有骨架屏或 spinner（参考 PERFORMANCE_OPTIMIZATION.md §3）
   - [ ] 微信登录/支付按钮：点击后立即 disabled + 显示 spinner
   - [ ] 路由跳转使用 config/client-routes.ts 中的 mobileRoutes/pcRoutes（单一真理源）
   - [ ] 页面切换使用 page-slide 过渡（nuxt.config.ts 已配置，不重复配置）
   - [ ] 移动端页面有自己的滚动容器（height:100% + overflow-y:auto，不可只有 min-height:100vh）→ 参见 §模式1
   - [ ] 已 import 的组件在 <template> 中实际渲染（特别是 Modal/Sheet 类组件）→ 参见 §模式3
   - [ ] console 语句已用 if (import.meta.dev) 守卫（不是直接删除）→ 参见 §模式2
   - [ ] composable init 函数开头是否清空上次状态（切换数据场景）→ 参见 §模式4
   - [ ] 无空 div 占位残留（设计迭代遗留的空白块）→ 参见 §模式6
   - [ ] 弹窗/Sheet 的宽度与内容匹配（无多余空白区域）
```

```
3. 输出扫描报告，问题按严重度标注：
   🔴 必须修复（用户可见 Bug）
   🟡 建议修复（潜在风险）
   🟢 可选优化（代码质量）
4. 标注：需更新的文档（如发现文档描述与实际代码不符）

   ⛔ 等用户确认后才能修改
```

### 跨端功能 SCAN 流程（排查某个完整功能）

> **触发词**：用户说"排查XX功能" / "检查整个XX功能" / "功能全链路排查"
> **适用场景**：一个功能横跨后台（增/删/改）+ PC端（展示）+ 移动端（展示）

```
Step 0: 读取功能范围（必须先做）

  收到命令后，先向用户确认（或自行判断）该功能涉及哪些端：
  - 后台管理端：[对应页面路径，查 §Step3 模块对照表]
  - PC 客户端：[对应页面路径]
  - 移动端：[对应页面路径]
  输出端列表，等用户确认范围正确后再扫描

Step 1: 后台端扫描

  按"后台管理端 SCAN 清单"逐项检查：
  - AdminDataTable / AdminDataDialog / useAdminDialog
  - adminRoute() 路由规范
  - console.log 守卫
  - API try/catch + ElMessage
  - import 的组件是否在 template 中实际渲染

Step 2: PC 客户端扫描

  按"客户端（PC/移动端）SCAN 清单"逐项检查：
  - pcRoutes.xxx() 路由规范
  - 价格格式化
  - loading/disabled 状态
  - API try/finally

Step 3: 移动端扫描

  按"客户端（PC/移动端）SCAN 清单"逐项检查：
  - mobileRoutes.xxx() 路由规范
  - 移动端滚动容器（height:100% + overflow-y:auto）→ §模式1
  - 骨架屏/spinner

Step 4: 合并输出跨端功能扫描报告

  ## 跨端功能扫描报告：[功能名称]

  ### 后台端
  | 问题 | 严重度 | 文件 + 行号 |
  |------|--------|------------|
  | ...  | 🔴/🟡/🟢 | ... |

  ### PC 端
  | 问题 | 严重度 | 文件 + 行号 |
  | ...  | 🔴/🟡/🟢 | ... |

  ### 移动端
  | 问题 | 严重度 | 文件 + 行号 |
  | ...  | 🔴/🟡/🟢 | ... |

  ### 总结
  - 🔴 必须修复：X 个
  - 🟡 建议修复：X 个
  - 🟢 可选优化：X 个
  - 跨端一致性：[后台数据与前端展示是否有逻辑断层]

  ⛔ 等用户确认后，按 bug-fix.md 流程逐一修复
```

### OPTIMIZE 流程（优化/清理）

```
1. 额外阅读 docs/admin/ADMIN_TEST_OPTIMIZATION_GUIDE.md 了解红线
2. 阅读上方 §已知模式与修复规范，了解已确认的修复模式
3. 识别优化点：
   a. 可用全局组件替代的重复代码
   b. 可提取为 Composable 的重复逻辑
   c. 无用代码（裸 console.log、注释死代码、未使用变量）
   d. 硬编码的颜色/路径/状态文案
   e. 空 div 占位块、CSS 残留样式（§模式6）
   f. 移动端缺失滚动容器的页面（§模式1）
   g. import 了但未在 template 渲染的组件（§模式3）
4. 输出优化方案（在此等待用户确认）
   ⛔ 红线（违反任何一条视为任务失败）：
   - 不改变按钮业务效果
   - 不改变 API 调用格式
   - 不删除功能
   - 不改变现有页面的滚动行为（除非是修复缺失的滚动容器）
   - 不删除 import.meta.dev 守卫下的 console 语句
   - 不修改共享布局文件（layouts/*.vue）的 overflow/height/position
   ⛔ 等用户确认

5. 用户确认后，执行优化修改
   - 严格按方案执行，不顺手修改其他内容
   - 每改一个文件，记录：文件名 + 改了什么

6. 验证（必须！优化完成后执行）
   - 编译验证：cd nuxt-frontend && npm run build
     失败 → 回退该文件的修改，重新诊断
     成功 → 继续
   - 类型检查（如修改了 TypeScript）：npx nuxi typecheck
   - 功能验证：逐条确认优化前后功能行为一致

7. 输出优化完成报告
   ## 优化完成报告
   - 扫描发现问题: [X 个，按 🔴/🟡/🟢 分别列出]
   - 本次执行优化: [X 个问题]
   - 修改文件清单: [文件路径列表]
   - 验证结果: [编译通过 ✅ / 类型检查通过 ✅]
   - 未处理问题: [未执行的 🟡/🟢 问题，说明原因]
   - 追加记录到: docs/SCAN_AUDIT_LOG.md ✅
```

---

### 后端 SCAN 流程（Edge Functions / Supabase）

> **适用范围**: `supabase/functions/` 目录下所有 TypeScript 文件

```
1. 列出所有 Function 目录：ls supabase/functions/
2. 逐函数检查以下清单：
   - [ ] 入口文件（index.ts）是否有 try/catch 包裹整个 Deno.serve 处理逻辑
   - [ ] 是否调用了 Logger.error() 或等效错误记录机制
   - [ ] CORS 响应头（corsHeaders）是否在多个函数中重复定义
         → 应统一提取到 _shared/ 目录
   - [ ] AWS SigV4 amzDate regex 是否正确（参见 §Edge Functions 踩坑）
         正确: /[:-]|\\.\\d{3}/g   错误: /[:-]|\\.\\\\d{3}/g
   - [ ] 环境变量是否使用 Deno.env.get('KEY') 而非硬编码字符串
   - [ ] 函数是否仍被前端代码调用（grep 函数名验证）
         → 无任何调用 = 废弃候选，需标注
   - [ ] _shared/ 中的工具函数是否被任何 Function 引用
         → 无引用 = 死代码
   - [ ] 多个函数中是否有复制粘贴的业务逻辑
         → 重复超过2处 应提取到 _shared/

3. 输出扫描报告，问题按严重度标注：
   🔴 必须修复（安全隐患 / 逻辑错误）
   🟡 建议修复（废弃函数 / 重复代码）
   🟢 可选优化（提取共享逻辑）

   ⛔ 等用户确认后才能修改
```

### 后端 OPTIMIZE 流程（Edge Functions 清理）

```
2. 用户确认后，按类型执行清理：

   清理类型 A - 删除废弃函数：
   - 确认该 Function 没有任何前端调用（grep 验证）
   - 确认没有定时任务或 Webhook 引用
   - 删除函数目录，并从部署文档中移除记录

   清理类型 B - 提取重复代码到 _shared/：
   - 新建 _shared/[name].ts
   - 用 import 引用替换各函数中的重复代码
   - 在 Deno 环境中用相对路径导入（"../_shared/[name].ts"）

   清理类型 C - 删除死代码：
   - 注释掉的代码块 → 直接删除
   - 未使用的变量/函数 → 直接删除
   - 废弃的环境变量读取 → 删除 + 同步通知用户从 docker-compose.yml 移除

   ⛔ 红线（违反任何一条视为任务失败）：
   - 不删除仍在被调用的 Function
   - 不修改 _shared/ 中被多个 Function 依赖的函数签名（只可新增，不可破坏性修改）
   - 不改变已正常工作的 AWS SigV4 签名逻辑
   - 删除函数前必须 grep 验证无引用

3. 验证（必须！清理完成后执行）
   - 编译验证：cd nuxt-frontend && npm run build
     失败 → 回退该文件的修改（前端 import 了已删除的函数名会引起编译错误）
   - 功能验证：确认前端调用 R2 上传/删除等功能仍正常返回（测试一遍）
   - 运行系统体检：sh scripts/test_system_health.sh

4. 输出后端优化完成报告
   ## 后端优化完成报告
   - 清理问题数: [X 个]
   - 删除废弃函数: [函数名列表 / 无]
   - 提取到 _shared/: [文件名 / 无]
   - 删除死代码: [文件名 + 行号 / 无]
   - 验证结果: [编译通过 ✅ / 体检通过 ✅]
   - 追加记录到: docs/SCAN_AUDIT_LOG.md ✅
```

---

## Step 5-6: 报告 → 确认 → 修改

按 Step 4 产出报告后，等待用户确认。确认后严格按报告中的方案修改。

---

## 修复失败处理（RETRY 流程）

> 当用户说「上次没修好」「还是不行」「问题依旧」时，进入此流程。

```
1. 【回顾上次修改】
   - 查看上次对话中修改了哪些文件、改了什么
   - 确认上次的修改是否仍然存在（有没有被回退）

2. 【验证上次诊断是否正确】
   - 上次的根因判断对吗？还是只治了表面？
   - 用户描述的症状跟上次一样吗？还是出现了新症状？

3. 【扩大排查范围】
   上次只看了一个文件？这次要扩大：
   a. 检查父组件（如 AdminModuleLayout.vue 的 Tab 匹配逻辑）
   b. 检查路由配置（config/admin-routes.ts 中是否缺少该路径）
   c. 检查中间件（middleware/mgmt-auth.ts 是否拦截了跳转）
   d. 检查浏览器控制台是否有 JS 错误
   e. 检查网络请求是否有 API 失败

4. 【深层诊断】
   如果上次改了路由但没用：
   → 问题可能不在路由，而在事件绑定或组件通信
   如果上次改了按钮但没用：
   → 问题可能在父组件拦截了事件，或 loading 状态卡住
   如果上次改了 API 但没用：
   → 问题可能在返回数据格式不对，或 try/catch 吞了错误

5. 【输出二次诊断报告】
   格式：
   ## 二次诊断报告: [问题描述]
   - 上次修改: [上次改了什么]
   - 上次修改是否生效: [是/否，为什么]
   - 本次新发现: [扩大排查后发现的真正根因]
   - 修复方案: [这次的修改方案]
   - 与上次区别: [为什么这次能修好]

   ⛔ 等用户确认后执行
```

> **给用户的提示**: 你只需要说：
> 「上次修复未生效，请重新阅读 `docs/AI_TASK_DISPATCH.md`，重新诊断 [问题描述]」

---

## Step 7: 验证

```
修改完成后，必须执行以下验证：

1. 编译验证：
   npm run build
   如失败 → 回退修改，重新诊断

2. 类型检查（如有 TypeScript 修改）：
   npx nuxi typecheck

3. 功能验证（描述修改后的功能预期行为）
```

---

## Step 8: 更新文档（🔴 必须执行，不可跳过）

> **铁律**: 修改了代码，就必须检查文档是否需要同步更新。跳过此步骤视为任务未完成。

### 更新检查清单

```
每次修改完成后，逐条检查：

1. 【路由变更】修改了路由路径？
   → 更新 config/admin-routes.ts (后台) 或 config/client-routes.ts (客户端)
   → 更新 docs/admin/ADMIN_AUTH_PERMISSION.md（如涉及权限路径）

2. 【组件变更】修改了全局组件（AdminModuleLayout / AdminDataTable 等）？
   → 更新 docs/admin/ADMIN_ENGINEERING_STANDARD.md
   → 更新 docs/admin/ADMIN_DEVELOPMENT_GUIDE.md
   → 更新 docs/admin/ADMIN_COMPONENT_ROADMAP.md

3. 【菜单变更】修改了 admin-menu.ts？
   → 更新 docs/admin/ADMIN_SYSTEM_CONFIG.md

4. 【认证变更】修改了登录/权限逻辑？
   → 更新 docs/admin/ADMIN_AUTH_PERMISSION.md

5. 【API 变更】修改了 API 接口？
   → 更新 docs/backend/FUNCTION_REFERENCE.md
   → 更新 docs/SHARED_LOGIC_REFERENCE.md（如涉及共享 API）

6. 【数据库变更】修改了表结构/RLS？
   → 更新 docs/backend/DATABASE_SCHEMA.md
   → 更新 docs/backend/RLS_POLICIES.md

7. 【部署变更】修改了部署配置？
   → 更新 docs/SERVER_DEPLOYMENT.md
   → 更新 docs/CHANGE_MANAGEMENT.md

8. 【新增规则】发现了应该加入规范的新模式？
   → 更新对应的规范文档
   → 在 docs/admin/README.md 更新日志中记录

9. 【模式发现】修复过程中发现了可复用的模式？
   → 更新 AI_TASK_DISPATCH.md §已知模式与修复规范
   → 在 SCAN_AUDIT_LOG.md 追加记录
```

### 文档更新格式

```
更新文档时：
1. 修改文档顶部的 「最后更新」 日期
2. 在 README.md 的更新日志中添加版本记录
3. 确保文档内容与实际代码一致
```

---

## 📋 用户快速派遣指南

用户只需说一句话，AI 自动执行全部流程：

| 用户说 | AI 执行路径 |
|---|---|
| 请阅读本文档，修复 CDK 编辑按钮无法点击 | 领域A → FIX → cdk/ → 诊断 → 报告 → 确认 → 修 → 验证 → 更新文档 |
| 上次没修好，请重新阅读本文档，重新诊断 CDK 问题 | 领域A → **RETRY** → 回顾上次 → 扩大排查 → 深层诊断 → 二次报告 |
| 请阅读本文档，扫描订单模块 | 领域A → SCAN → orders/ → 后台SCAN清单 → 报告 |
| 请阅读本文档，优化帮助中心代码 | 领域A → OPTIMIZE → help-center/ → 优化方案 |
| 请阅读本文档，修复移动端首页加载慢 | 领域B → FIX → mobile/ → PERFORMANCE_OPTIMIZATION.md → 性能诊断 |
| 请阅读本文档，排查系统 500 错误 | 领域C → FIX → GEMINI.md 场景A |
| 请阅读本文档，检查优惠券模块样式一致性 | 领域A → SCAN → coupons/ → 样式检查 |
| 请阅读本文档，检查移动端支付按钮有没有 loading | 领域B → SCAN → checkout/ → 客户端SCAN清单 → 报告 |
| 请阅读本文档，修复移动端跳转到无效页面 | 领域B → FIX → config/client-routes.ts → 路由诊断 |
| 请阅读本文档，扫描 PC 端和移动端全量检查 | 领域B → SCAN → 客户端SCAN清单 → 全页面扫描 → 报告 |
| 请阅读本文档，扫描管理后台全量检查 | 领域A → SCAN → 后台SCAN清单 → 全页面扫描 → 报告 |
| 请阅读本文档，扫描移动端所有页面的滚动容器 | 领域B → SCAN → pages/mobile/ → §模式1检查 → 报告 |
| 请阅读本文档，扫描客户端所有 console 语句 | 领域B → SCAN → 全量 grep console → §模式2检查 → 报告 |
| 请阅读本文档，检查所有弹窗组件是否在模板中渲染 | 领域B → SCAN → grep import.*Modal → §模式3检查 → 报告 |
| 请阅读本文档，扫描并优化后台管理界面 | 领域A → SCAN+OPTIMIZE → 后台SCAN清单+已知模式 → 报告 → 确认后优化 |

---

## 📝 扫描记录

> 所有历史扫描记录已迁移至独立文档 → **[SCAN_AUDIT_LOG.md](SCAN_AUDIT_LOG.md)**
>
> - 执行 SCAN 任务后，请将结果追加到该文档
> - 后续扫描前，先阅读该文档了解已检查范围，避免重复扫描
> - 当前最新记录: **V4.1 新增模式7：Nuxt构建缓存污染 (2026-02-21)**
