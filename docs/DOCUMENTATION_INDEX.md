# 项目文档总览 (Project Documentation Index)

> **"给我一套系统，而不是一堆散乱的文件。"**
> 这个索引文档旨在帮助项目经理、开发人员和运维人员快速找到所需的指南。

---

## 🧭 角色导航 (Role-Based Navigation)

### 👨‍💼 我是项目经理 (Project Manager)
*   **我想了解项目全貌**: 
    *   [项目架构概览](architecture/OVERVIEW.md) (待创建/补充)
    *   [核心业务规则](business_rules/README.md)
*   **我想了解服务器状态**:
    *   [服务器部署文档](SERVER_DEPLOYMENT.md)
    *   [维护与健康检查](MAINTENANCE.md) (New! 含本日修复内容)
*   **我想了解外部对接**:
    *   [微信登录与支付](WECHAT_LOGIN_AND_PAY.md)

### 👨‍💻 我是开发人员 (Developer)
*   **Scenario A: 开发新功能 (New Feature)**
    *   **开发后台功能**: [后端开发指南](backend/README.md) (含 Supabase, Edge Functions)
    *   **开发前台页面**: [前端开发指南](client/README.md) (Nuxt 3)
    *   **开发移动端**: [移动端开发指南](mobile/README.md)
*   **Scenario B: 修复 Bug (Bug Fix)**
    *   **查错第一步**: [故障排查指南](MAINTENANCE.md#troubleshooting)
    *   **数据库变更规范**: [数据库迁移指南](backend/DATABASE_MIGRATION.md) (绝对禁止 `db reset`)
    *   **公用逻辑查询**: [共享逻辑参考](SHARED_LOGIC_REFERENCE.md) (避免重复造轮子)

### 🔧 我是运维/DevOps
*   **部署与更新**:
    *   [及准化部署流程](SERVER_DEPLOYMENT.md#standard-deployment)
    *   [环境变量参考](SERVER_DEPLOYMENT.md#environment-variables)
*   **灾难恢复**:
    *   [备份与恢复](MAINTENANCE.md#backup-and-recovery)
    *   [紧急回滚指南](MAINTENANCE.md#emergency-rollback)

---

## 📂 文档目录结构 (Directory Structure)

```
docs/
├── AI_SOP.md                  # AI 协作标准作业程序
├── AI_WORKFLOW.md             # AI 工程师工作流程主框架
├── AI_TASK_DISPATCH.md        # 🆕 AI 下级助理任务派遣体系
├── SERVER_DEPLOYMENT.md       # 服务器部署核心文档
├── MAINTENANCE.md             # 运维与故障排查手册
├── CHANGE_MANAGEMENT.md       # 变更管理规范
├── USAGE_GUIDE.md             # 系统功能使用说明
├── SHARED_LOGIC_REFERENCE.md  # PC/Mobile 共享逻辑参考
├── PERFORMANCE_OPTIMIZATION.md # 性能优化
├── WECHAT_*.md                # 微信生态相关文档
├── admin/                     # 后台管理系统文档
├── architecture/              # 架构图与设计文档
├── backend/                   # 后端 (Supabase/PostgreSQL/Edge Functions)
├── business_rules/            # 业务逻辑规则 (订单、支付、会员等)
├── client/                    # PC 端前端 (Nuxt)
├── guides/                    # 开发指南 (部署、弹窗、主题等)
├── mobile/                    # 移动端前端 (H5)
├── security/                  # 安全相关
└── sql/                       # SQL 脚本
```

---

## 📝 每日维护原则 (Daily Maintenance Principles)

1.  **单一数据源 (Single Source of Truth)**: 所有的配置变更（如 Nginx, Docker 环境变量）**必须**同步更新到 `SERVER_DEPLOYMENT.md`。
2.  **代码化运维 (Infrastructure as Code)**: 不要手动 SSH 改配置，使用 `scripts/` 下的脚本，并记录在文档中。
3.  **文档即代码**: 在提交代码变更（尤其是涉及架构调整）时，**必须**同步更新对应的文档。
