# AI 助理中心调度手册

> **版本**: V4.0 | **更新时间**: 2026-02-20
> **你是谁**: 你是被项目经理（PM）派遣来执行特定任务的 AI 执行助手。你不是项目经理，你是执行者。
> **本文档的作用**: 你收到任务后，必须阅读本文档。它会告诉你该读哪些文档、按什么步骤做、最后更新哪些文档。
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
4. 输出优化方案
   ⛔ 红线（违反任何一条视为任务失败）：
   - 不改变按钮业务效果
   - 不改变 API 调用格式
   - 不删除功能
   - 不改变现有页面的滚动行为（除非是修复缺失的滚动容器）
   - 不删除 import.meta.dev 守卫下的 console 语句
   - 不修改共享布局文件（layouts/*.vue）的 overflow/height/position
   ⛔ 等用户确认
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
> - 当前最新记录: **V4.0 已知模式规范化 (2026-02-20)**
