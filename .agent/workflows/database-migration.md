---
description: 数据库操作安全规范 - 绝对禁止重置
---

# 🛑 核心铁律：绝对禁止重置数据库 (NO RESET)

**在任何情况、任何理由下，都严禁执行 `supabase db reset` 命令。**

## 1. 为什么禁止？
- **数据不可逆丢失**：重置会清空所有用户数据、订单记录、配置信息。
- **结构不一致**：本地迁移文件可能滞后于数据库实际状态，重置会导致手动修复的补丁丢失。

## 2. 替代方案 (如何更新结构)

当需要修改数据库结构时，**必须**遵循以下路径之一：

### 路径 A：手动 SQL (推荐用于调试)
1. 在 Supabase Dashboard 的 SQL Editor 中编写并执行 SQL。
2. 确认无误后，**不需要**立即生成迁移文件（除非到了定期归档时间）。

### 路径 B：特定变更迁移 (仅在确认需要固化时)
1. 创建新的迁移文件：`supabase migration new <name>`
2. 仅在文件中写入必要的 `ALTER TABLE` 或 `CREATE TABLE` 语句。
3. 执行：`supabase db push` (注意是 **PUSH**，不是 RESET)。

## 3. 紧急防护检查
每次涉及数据库命令时，必须先自我检查：
- ❌ `supabase db reset` -> **拒绝执行**
- ❌ `npx supabase db reset` -> **拒绝执行**
- ✅ `supabase db push` -> 允许
- ✅ `supabase migration up` -> 允许

## 4. 如果遇到 Schema 不一致报错
- **不要重置**来解决冲突。
- 使用 `supabase db pull` 拉取当前结构，或者手动编写 SQL 修正差异。
