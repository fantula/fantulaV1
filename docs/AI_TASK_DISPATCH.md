# AI 助理任务自动执行手册

> **版本**: V2.0 | **更新时间**: 2026-02-17
> **你是谁**: 你是被派遣来执行任务的 AI 助理。
> **本文档的作用**: 当用户给你一个任务时，你必须阅读本文档，根据任务类型自动找到对应的文档链，按流程执行。

---

## ⚠️ 核心规则

```
┌─────────────────────────────────────────────────────────────────┐
│  1. 你收到任务后，第一步是判断任务属于哪个领域（A/B/C）           │
│  2. 找到该领域的「文档链」，按顺序阅读每一个文档                  │
│  3. 按照对应的「执行流程」一步一步操作                            │
│  4. 未经用户确认，禁止修改任何代码                                │
│  5. 所有修改必须符合文档链中规范文档的要求                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: 判断任务类型

根据用户的描述，判断任务属于哪个领域：

| 关键词 | 领域 | 跳转 |
|---|---|---|
| 后台、管理、admin、订单管理、商品管理、CDK、优惠券、用户管理、工单、充值、设置、帮助中心、媒体、消息、文章 | **领域 A：后台管理端** | → 看「领域 A」 |
| 前台、商城、PC、首页、商品详情、购物车、结算、个人中心、移动端、手机、H5 | **领域 B：客户端** | → 看「领域 B」 |
| 服务器、部署、数据库、Edge Function、报错日志、系统挂了、500错误、维护 | **领域 C：后端与运维** | → 看「领域 C」 |

然后根据用户要你做什么，判断操作类型：

| 用户说的话 | 操作类型 | 含义 |
|---|---|---|
| 修复、修、不能点、报错、无法、没反应、坏了、失败 | **FIX（修复）** | 找到 Bug 并修复 |
| 扫描、检查、审计、看看有没有问题 | **SCAN（扫描）** | 只读不改，输出报告 |
| 优化、清理、重构、整理 | **OPTIMIZE（优化）** | 改善代码质量 |
| 验证、测试、确认 | **VERIFY（验证）** | 确认功能正常 |

---

## 领域 A：后台管理端

### 📖 文档链（每次任务必须按顺序阅读）

```
第 1 步：阅读 docs/AI_SOP.md
         → 了解你的操作流程（扫描→报告→等确认→修改→验证）

第 2 步：阅读 docs/admin/ADMIN_ENGINEERING_STANDARD.md
         → 了解目录结构、组件标准、编码规范

第 3 步：阅读 docs/admin/ADMIN_COMPONENT_ROADMAP.md
         → 了解必须使用的组件（AdminDataTable、AdminDataDialog 等）

第 4 步：阅读 config/admin-routes.ts
         → 了解路由常量 API（所有路径必须使用 adminRoute()）

第 5 步（如果是修复问题）：阅读 docs/admin/ADMIN_DEVELOPMENT_GUIDE.md
         → 了解页面开发模式、Tab 切换、弹窗交互的标准实现方式

第 6 步（如果涉及权限/登录）：阅读 docs/admin/ADMIN_AUTH_PERMISSION.md
         → 了解认证和权限流程
```

### � FIX 流程（用户说"修复XXX"时）

```
1. 【定位问题文件】
   - 根据用户描述的模块名，在 pages/manager_portal/ 下找到对应目录
   - 模块对照表：
     订单 → orders/       商品 → products/      CDK → cdk/
     优惠券 → coupons/    用户 → users/          工单 → tickets/
     充值 → recharge/     媒体 → media/          消息 → messages/
     设置 → backend-settings/  帮助中心 → help-center/  文章 → article/

2. 【读懂现有代码】
   - 打开对应页面的 .vue 文件
   - 找到用户描述的按钮/功能在代码中的位置
   - 阅读该按钮的 @click 处理函数
   - 追踪整个调用链：按钮 → 函数 → API/路由跳转

3. 【对比规范文档】
   - 将现有代码与 ADMIN_ENGINEERING_STANDARD.md 中的标准对比
   - 检查路由是否使用了 adminRoute()（对照 config/admin-routes.ts）
   - 检查弹窗是否使用了 useAdminDialog（对照 ADMIN_COMPONENT_ROADMAP.md）
   - 检查列表是否使用了 useAdminList

4. 【诊断根因】
   常见问题，按优先级排查：
   a. @click 没有绑定或绑定了错误的函数
   b. 路由路径拼错了（没用 adminRoute，或路径不存在）
   c. navigateTo / router.push 语法错误
   d. 函数内部有 try/catch 吞掉了错误
   e. 弹窗 visible 状态没有正确切换
   f. API 调用失败但没有错误提示
   g. loading 状态卡住没有重置

5. 【输出诊断报告】（等用户确认后再修改）
   格式：
   ## 诊断报告: [问题描述]
   - 问题文件: [文件路径]
   - 问题位置: [行号]
   - 根因: [具体原因]
   - 修复方案: [代码修改建议]
   - 涉及规范: [引用了哪个文档的哪条规则]

6. 【用户确认后执行修改】
   - 严格按诊断报告修改
   - 修改后运行 npm run build 验证
```

### 🔍 SCAN 流程（用户说"扫描XXX"时）

```
1. 阅读文档链中的所有规范文档
2. 打开目标模块下的所有 .vue 和 .ts 文件
3. 对每个文件逐项检查：
   - [ ] 是否使用 AdminDataTable（列表页必须）
   - [ ] 是否使用 AdminDataDialog（有弹窗的页面必须）
   - [ ] 是否使用 PageTipHeader（所有页面必须）
   - [ ] 是否使用 adminRoute()（所有路由跳转必须）
   - [ ] 是否使用 useBizFormat（格式化必须）
   - [ ] 是否使用 useBizConfig（状态标签必须）
   - [ ] 是否有 console.log（禁止）
   - [ ] 是否有注释掉的代码块（应删除）
   - [ ] 所有异步操作是否有 loading 状态
   - [ ] 所有 API 调用是否有 try/catch + 错误提示
   - [ ] 空状态是否有展示
4. 输出扫描报告，按文件分组，每个问题标注：
   - 严重度：🔴 必须修复 / 🟡 建议修复 / 🟢 可选优化
   - 涉及规范：引用具体文档
5. 等待用户确认后才能修改代码
```

### 🧹 OPTIMIZE 流程（用户说"优化/清理XXX"时）

```
1. 阅读 docs/admin/ADMIN_TEST_OPTIMIZATION_GUIDE.md → 了解优化红线
2. 阅读 docs/admin/ADMIN_COMPONENT_ROADMAP.md → 了解目标架构
3. 扫描目标模块，识别：
   a. 可以用全局组件替代的重复代码
   b. 可以用 Composable 提取的重复逻辑
   c. 无用代码（console.log、注释代码、未使用的变量/函数）
   d. 硬编码的颜色/路径/状态文案
4. 输出优化方案，等待确认后执行
⛔ 红线：不改变任何按钮的业务效果、不改变 API 格式、不删除现有功能
```

---

## 领域 B：客户端（PC + 移动端）

### 📖 文档链

```
第 1 步：docs/AI_SOP.md
第 2 步：docs/client/README.md（PC 端）或 docs/mobile/README.md（移动端）
第 3 步：docs/SHARED_LOGIC_REFERENCE.md → 共享逻辑（PC/Mobile 必须复用）
第 4 步：docs/client/GLOBAL_COMPONENT_GUIDE.md → 全局组件
第 5 步（性能问题）：docs/PERFORMANCE_OPTIMIZATION.md
第 6 步（样式问题）：docs/client/STYLE_MAPPING.md 或 docs/mobile/STYLE_MAPPING.md
```

### 执行流程

同领域 A 的 FIX / SCAN / OPTIMIZE 流程，但额外注意：
- 移动端 **严禁使用 Element Plus**
- 移动端必须复用 `api/client/` 和 `composables/client/` 中的共享逻辑，不能重写
- 检查 `docs/SHARED_LOGIC_REFERENCE.md` 确认是否已有可复用的 Composable

---

## 领域 C：后端与运维

### 📖 文档链

```
第 1 步：GEMINI.md → 金科玉律（场景 A 故障排查 / 场景 B Bug 修复）
第 2 步：docs/MAINTENANCE.md → 运维手册
第 3 步：docs/CHANGE_MANAGEMENT.md → 变更管理规范
第 4 步（部署问题）：docs/SERVER_DEPLOYMENT.md
第 5 步（数据库问题）：docs/backend/DATABASE_SCHEMA.md + docs/backend/RLS_POLICIES.md
第 6 步（Edge Function）：docs/backend/EDGE_FUNCTIONS.md
```

### FIX 流程

```
严格按 GEMINI.md 场景 A/B 流程执行：

场景 A（系统故障）：
1. 访问 /admin/backend-settings → 检查状态灯
2. 查询: SELECT * FROM error_logs ORDER BY created_at DESC LIMIT 10;
3. 运行: sh scripts/test_system_health.sh
4. 根据结果定位问题

场景 B（代码 Bug）：
1. 本地复现
2. 代码修复
3. 本地验证: sh scripts/test_system_health.sh
4. 提交: git commit -m "fix: ..."

⛔ 铁律：严禁直接修改服务器代码。一切以本地代码为准。
```

---

## 📋 快速派遣示例

用户只需要说这样一句话，AI 助理就能自动执行：

| 用户说 | AI 应该做什么 |
|---|---|
| 「请根据本文档修复 CDK 编辑按钮无法点击」 | 领域A → FIX流程 → 定位 cdk/ → 找按钮 → 排查 → 报告 |
| 「请根据本文档扫描订单模块」 | 领域A → SCAN流程 → orders/ 全量检查 → 输出报告 |
| 「请根据本文档优化帮助中心代码」 | 领域A → OPTIMIZE流程 → help-center/ → 识别优化点 |
| 「请根据本文档修复移动端首页加载慢」 | 领域B → FIX流程 → mobile/ → 性能排查 |
| 「请根据本文档排查系统 500 错误」 | 领域C → FIX流程 → GEMINI.md 场景A |
