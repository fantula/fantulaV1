# 变更管理与发布流程 (Change Management & Deployment)

**版本状态**: 🟢 **Golden Version (稳定版)**
**最后锁定时间**: 2026-02-15
**当前策略**: 严禁直接修改服务器代码。所有变更必须经过"本地开发 -> 本地测试 -> 标准发布"流程。

---

## 1. 核心原则 (Core Principles)
1.  **单一数据源 (Single Source of Truth)**: 本地代码 (`/Users/dalin/fantula`) 是唯一真理。服务器只是本地代码的镜像。
2.  **零回滚策略 (Hotfix Forward)**: 既然已锁定为稳定版，遇到小Bug应向前修复 (Fix Forward)，而不是盲目回滚旧版本。
3.  **同构一致性**: 每次发布前，必须确保本地 `npm run build` 和 `test_system_health.sh` 通过。

---

## 2. 日常 Bug 修复流程 (Daily Bug Fix Workflow)

当您需要修复一个小 Bug 或进行微调时，**绝对不要**直接 SSH 到服务器去改文件。请严格遵守以下步骤：

### 第一步：本地开发 (Local Dev)
1.  **拉取最新状态** (如果多人协作): `git pull`
2.  **复现问题**: 在本地复现 Bug。
3.  **修改代码**: 进行修复。
4.  **本地验证**:
    *   如果是前端：浏览器检查 `/pages/...` 是否正常。
    *   如果是后端：使用 `Postman` 或 `curl` 测试 API。
    *   **运行全量检查**: `sh scripts/test_system_health.sh` (确保没把系统搞崩)。

### 第二步：提交变更 (Commit)
```bash
git add .
git commit -m "fix: 修复了用户登录时的xxx报错"
# git push (可选，建议推送到远程仓库备份)
```

### 第三步：标准发布 (Standard Deploy)
使用我们要统一的发布脚本 (避免手动 scp 漏文件)。

**A. 如果只改了前端 (Frontend Only)**:
```bash
npm run generate  # 或 npm run build
sh scripts/deploy_frontend.sh  # (需确保此脚本存在，用于同步 .output/public)
```

**B. 如果改了后端/API (Backend/Edge Functions)**:
```bash
sh scripts/deploy_system_health.sh  # (如果是改监控)
# 或者通用的部署脚本 (如有)
```

**C. 全量发布 (推荐)**:
如果您不确定影响范围，请执行全量发布（虽然慢一点，但最稳）。

---

## 3. 紧急故障处理 (Emergency Response)

如果服务器突然挂了 (HTTP 500 / 白屏)：

1.  **冷静诊断**:
    *   访问 `/admin/backend-settings` 查看探针数据。
    *   运行 `sh scripts/test_system_health.sh` 查看底层连通性。
    *   查看数据库 `error_logs` 表 (Select * from error_logs order by created_at desc limit 10)。

2.  **快速修复**:
    *   **不要回滚** (除非是极其严重的配置错误)。
    *   定位到问题后，在本地通过"日常 Bug 修复流程"快速出补丁，然后发布。

---

## 4. 关键脚本索引
| 脚本路径 | 用途 | 什么时候用？ |
| :--- | :--- | :--- |
| `scripts/test_system_health.sh` | **系统体检** | 每天开始工作前；发布之后；用户报障时。 |
| `scripts/deploy_system_health.sh`| **部署后端监控** | 修改了 `supabase/functions` 后。 |
| `scripts/verify_and_deploy.sh` | **全量检查+部署** | (建议创建) 用于一键发布。 |

---
**记住：慢就是快。本地测好再发，永远比在服务器上救火要快。**
