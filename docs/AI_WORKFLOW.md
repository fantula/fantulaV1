# AI 工程师工作流程主框架

> **版本**: V1.1 | **更新时间**: 2026-02-04
> **适用**: AI 测试工程师

---

## ⚠️ 必读文档

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  在执行任何任务之前，你必须先阅读：                                │
│                                                                 │
│  📋 AI_SOP.md - 标准操作流程                                    │
│                                                                 │
│  这是强制性的，不可跳过！                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

本文档定义 AI 工程师测试和优化系统的**完整工作流程**。AI 必须按此框架执行，不可越界。

---

## 🌐 系统架构

```
┌─────────────────────────────────────────────────┐
│                    前端系统                      │
├─────────────────────────────────────────────────┤
│  🔧 后台管理  │  🖥️ PC客户端  │  📱 移动端     │
│  /admin       │  /client      │  /mobile       │
│               │               │                │
│  独立测试     │   独立测试    │  共享PC逻辑    │
│  独立优化     │   独立优化    │  仅优化布局    │
├─────────────────────────────────────────────────┤
│                    后端系统                      │
│                   Supabase                       │
│              (参见 backend/ 文档)                 │
└─────────────────────────────────────────────────┘
```

---

## 📋 工作流程总览

```
┌──────────────────────────────────────────────────────────────────┐
│                    AI 工程师工作流程                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: 确定测试目标                                            │
│     ↓                                                            │
│  Step 2: 阅读相关规范文档                                         │
│     ↓                                                            │
│  Step 3: 扫描页面/模块                                            │
│     ↓                                                            │
│  Step 4: 输出分析报告                                             │
│     ↓                                                            │
│  Step 5: 用户确认优化方案                                         │
│     ↓                                                            │
│  Step 6: 执行优化 (遵循规范)                                      │
│     ↓                                                            │
│  Step 7: 验证功能                                                │
│     ↓                                                            │
│  Step 8: 更新文档                                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔧 后台管理 (Admin)

### 文档位置
`docs/admin/`

### 必读文档
| 文档 | 用途 |
|------|------|
| `ADMIN_ENGINEERING_STANDARD.md` | 开发规范 |
| `ADMIN_TEST_OPTIMIZATION_GUIDE.md` | 测试优化规范 |
| `ADMIN_COMPONENT_ROADMAP.md` | 组件标准化目标 |

### 扫描流程

```
1. 打开目标页面 (pages/admin/xxx.vue)
2. 检查组件使用情况:
   □ AdminDataTable
   □ AdminDataDialog  
   □ AdminActionCard
   □ useAdminDialog
   □ useAdminList
   □ useBizFormat
   □ useBizConfig
3. 检查代码质量:
   □ 无 console.log
   □ 无硬编码状态
   □ 无重复代码
4. 输出检查报告
```

### 优化原则
- ✅ 可以: 替换为全局组件、提取公共逻辑、删除冗余代码
- ❌ 禁止: 改变操作流程、改变按钮效果、改变API格式

### 输出模板
```markdown
## 页面分析: [页面名称]
路径: pages/admin/xxx.vue

### 组件使用情况
- [x] AdminDataTable
- [ ] AdminDataDialog → 建议替换

### 优化建议
1. [具体建议]

### 遵循规范
- 参考: ADMIN_ENGINEERING_STANDARD.md
```

---

## 🖥️ PC 客户端 (Client)

### 文档位置
`docs/client/` (待创建)

### 核心原则
- 数据获取逻辑必须与移动端共享
- UI 组件可以独立
- 业务逻辑不可重复实现

### 扫描流程

```
1. 打开目标页面 (pages/client/xxx.vue)
2. 检查:
   □ 数据获取是否使用共享 API
   □ 状态管理是否使用共享 Store
   □ 组件是否使用全局组件
3. 检查代码质量
4. 输出检查报告
```

### 优化原则
- ✅ 可以: 优化UI布局、提升性能、精简代码
- ❌ 禁止: 修改数据获取逻辑、修改业务流程

---

## 📱 移动端 (Mobile)

### 文档位置
`docs/mobile/` (待创建)

### 核心原则 (来自 user_rules)
```
核心准则：只开发UI布局，不参与任何逻辑
- 数据获取逻辑 完全复用现有实现
- 使用现有商品详情 API，不新增、不修改接口
- 状态管理、计算逻辑 保持一致
```

### 扫描流程

```
1. 打开目标页面 (pages/mobile/xxx.vue)
2. 检查:
   □ 是否复用 PC 端数据获取逻辑
   □ 是否复用 PC 端 Store
   □ 是否只修改了布局
3. 输出检查报告
```

### 优化原则
- ✅ 可以: 优化布局、优化触摸交互、优化加载体验
- ❌ 禁止: 新增API调用、新增业务逻辑、复制PC端逻辑

---

## 🔙 后端 (Backend)

### 文档位置
`docs/backend/`

### 必读文档
| 文档 | 用途 |
|------|------|
| `DATABASE_SCHEMA.md` | 表结构 |
| `FUNCTION_REFERENCE.md` | 函数API |
| `AI_MAINTENANCE_GUIDE.md` | 维护流程 |
| `../business_rules/CORE_FREEZE_RULES.md` | 禁止修改项 |

### 扫描流程

```
1. 使用 MCP 工具获取安全建议
   mcp_supabase-mcp-server_get_advisors --type security
2. 使用 MCP 工具获取性能建议
   mcp_supabase-mcp-server_get_advisors --type performance
3. 检查是否有 search_path 未设置的函数
4. 检查 RLS 策略覆盖率
5. 输出检查报告
```

### 优化原则
- ✅ 可以: 添加索引、修复安全警告、优化函数
- ❌ 禁止: 修改核心业务逻辑（参见 CORE_FREEZE_RULES.md）

---

## 📊 标准输出格式

### 扫描报告模板

```markdown
# [系统] 扫描报告

## 基本信息
- 测试时间: YYYY-MM-DD HH:mm
- 测试范围: [页面/模块名称]
- 文件路径: [路径]

## 检查结果

### 组件标准化 (X/Y 项通过)
| 检查项 | 状态 | 说明 |
|--------|------|------|
| 项目1 | ✅/❌ | ... |

### 代码质量 (X/Y 项通过)
| 检查项 | 状态 | 说明 |
|--------|------|------|
| 项目1 | ✅/❌ | ... |

## 优化建议

### 高优先级
1. [建议1] - [预期效果]

### 低优先级
1. [建议1] - [预期效果]

## 遵循规范
- 本次优化将遵循: [文档列表]
- 不会修改: [明确列出]
```

---

## 🔄 持续更新

每次完成页面优化后，更新相关文档:

| 优化类型 | 需更新的文档 |
|----------|-------------|
| 后台页面 | `ADMIN_COMPONENT_ROADMAP.md` 覆盖率 |
| 新增组件 | `ADMIN_ENGINEERING_STANDARD.md` 组件列表 |
| 后端修改 | `docs/backend/` 相关文档 |
| 新增状态值 | `ENUM_STATUS_VALUES.md` |

---

## 📚 文档索引

```
docs/
├── AI_WORKFLOW.md              # 📋 本文档 (主框架入口)
│
├── admin/                      # 🔧 后台管理
│   ├── README.md               # 索引
│   ├── ADMIN_ENGINEERING_STANDARD.md     # 工程规范
│   ├── ADMIN_TEST_OPTIMIZATION_GUIDE.md  # 测试优化规范
│   ├── ADMIN_COMPONENT_ROADMAP.md        # 组件化路线图
│   └── ... (其他配置文档)
│
├── client/                     # 🖥️ PC客户端
│   ├── README.md               # 索引
│   ├── CLIENT_TEST_OPTIMIZATION_GUIDE.md # 测试优化规范
│   └── ORDER_DETAIL.md         # ⭐ 订单详情规范 (重点)
│
├── mobile/                     # 📱 移动端
│   ├── README.md               # 索引 (核心原则)
│   └── MOBILE_TEST_OPTIMIZATION_GUIDE.md # 测试优化规范
│
├── backend/                    # 🔙 后端
│   ├── README.md
│   ├── DATABASE_SCHEMA.md
│   ├── FUNCTION_REFERENCE.md
│   ├── AI_MAINTENANCE_GUIDE.md
│   └── ...
│
└── business_rules/             # 📜 业务规则
    ├── CORE_FREEZE_RULES.md    # ⚠️ 核心禁区
    ├── ORDER_DETAIL_DISPLAY.md # 订单详情显示
    └── ...
```

---

## 🎯 使用指南

### 场景1: 测试后台管理页面

```
1. 阅读本文档 (AI_WORKFLOW.md)
2. 阅读 admin/ADMIN_TEST_OPTIMIZATION_GUIDE.md
3. 按扫描流程执行
4. 输出报告
5. 用户确认后优化
```

### 场景2: 测试 PC 客户端页面

```
1. 阅读本文档 (AI_WORKFLOW.md)
2. 阅读 client/CLIENT_TEST_OPTIMIZATION_GUIDE.md
3. 重点页面阅读 client/ORDER_DETAIL.md
4. 按扫描流程执行
5. 输出报告
```

### 场景3: 测试移动端页面

```
1. 阅读本文档 (AI_WORKFLOW.md)
2. 阅读 mobile/README.md (核心原则!)
3. 阅读 mobile/MOBILE_TEST_OPTIMIZATION_GUIDE.md
4. 验证与 PC 端逻辑一致
5. 只优化布局
```

### 场景4: 修改后端

```
1. 阅读 backend/AI_MAINTENANCE_GUIDE.md
2. 检查 business_rules/CORE_FREEZE_RULES.md
3. 确认不在禁区
4. 使用 MCP 工具执行
```

