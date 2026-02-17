# AI 助理中心调度手册

> **版本**: V3.1 | **更新时间**: 2026-02-17
> **你是谁**: 你是被派遣来执行任务的 AI 助理。
> **本文档的作用**: 你收到任务后，必须阅读本文档。它会告诉你该读哪些文档、按什么步骤做、最后更新哪些文档。

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
  ④ docs/client/GLOBAL_COMPONENT_GUIDE.md         → 全局组件
  ⑤ docs/client/STYLE_MAPPING.md / docs/mobile/STYLE_MAPPING.md
  ⑥ docs/PERFORMANCE_OPTIMIZATION.md              → 性能问题时
  ⑦ docs/guides/UI_THEME_STANDARD.md              → 样式问题时
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
| 首页 | `pages/pc/index.vue` | `pages/mobile/index.vue` | — |
| 商品详情 | `pages/pc/product/` | `pages/mobile/product/` | `composables/client/useProductDetail.ts` |
| 订单 | `pages/pc/orders/` | `pages/mobile/orders/` | `composables/client/useOrderDetail.ts` |
| 购物车 | — | — | `stores/client/cart.ts` |
| 个人中心 | `pages/pc/profile/` | `pages/mobile/profile/` | `stores/client/user.ts` |

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
   b. 路由问题（路径拼错/没用 adminRoute/路由不存在）
   c. 组件通信问题（props/emit 断裂）
   d. 状态管理问题（loading 卡住/visible 没切换）
   e. API 问题（调用失败/错误被吞）
   f. 布局问题（Tab 匹配逻辑/NuxtPage vs router-view）

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

```
1. 打开目标模块的所有 .vue 和 .ts 文件
2. 逐文件检查以下清单：
   - [ ] 使用 AdminDataTable（列表页）
   - [ ] 使用 AdminDataDialog / useAdminDialog（弹窗页）
   - [ ] 使用 PageTipHeader（所有页面）
   - [ ] 使用 adminRoute()（所有路由跳转）
   - [ ] 使用 useBizFormat（格式化）
   - [ ] 使用 useBizConfig（状态标签）
   - [ ] 使用 <NuxtPage /> 而非 <router-view />（父布局页）
   - [ ] 无 console.log
   - [ ] 无注释死代码
   - [ ] 所有异步操作有 loading 状态
   - [ ] 所有 API 调用有 try/catch + ElMessage 错误提示
   - [ ] 空状态有展示
3. 输出扫描报告，问题按严重度标注：
   🔴 必须修复  🟡 建议修复  🟢 可选优化
4. 标注：需更新的文档（如发现文档描述与实际代码不符）

   ⛔ 等用户确认后才能修改
```

### OPTIMIZE 流程（优化/清理）

```
1. 额外阅读 docs/admin/ADMIN_TEST_OPTIMIZATION_GUIDE.md 了解红线
2. 识别优化点：
   a. 可用全局组件替代的重复代码
   b. 可提取为 Composable 的重复逻辑
   c. 无用代码（console.log、注释代码、未使用变量）
   d. 硬编码的颜色/路径/状态文案
3. 输出优化方案
   ⛔ 红线：不改变按钮业务效果、不改变 API 格式、不删除功能
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
   → 更新 config/admin-routes.ts
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
| 请阅读本文档，扫描订单模块 | 领域A → SCAN → orders/ → 全量检查 → 报告 |
| 请阅读本文档，优化帮助中心代码 | 领域A → OPTIMIZE → help-center/ → 优化方案 |
| 请阅读本文档，修复移动端首页加载慢 | 领域B → FIX → mobile/ → 性能诊断 |
| 请阅读本文档，排查系统 500 错误 | 领域C → FIX → GEMINI.md 场景A |
| 请阅读本文档，检查优惠券模块样式一致性 | 领域A → SCAN → coupons/ → 样式检查 |
