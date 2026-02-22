---
description: 数据库操作安全规范 — 铁律 + 迁移前强制检查清单
---

# 🛑 数据库迁移技能脚本（子程序）

> **调用方式**: 被 `bug-fix.md` 或 `new-feature.md` 在检测到数据库变更时调用。
> **执行方式**: 从 Step 0 开始，逐步执行清单，完成后返回调用者的下一步。

---

## ⚠️ 绝对铁律（任何情况下都必须遵守）

```
❌ 绝对禁止执行：supabase db reset
❌ 绝对禁止执行：npx supabase db reset
✅ 允许：supabase db push
✅ 允许：supabase migration up
✅ 允许：手动 SQL（通过 psql 或 Supabase Dashboard）
```

**为什么禁止 reset**：会清空所有用户数据、订单记录、手动补丁，**不可恢复**。

---

## Step 0: 阅读所有现有迁移（⚠️ 必须，不可跳过）

```bash
ls -la /Users/dalin/fantula/supabase/migrations/
```

- [ ] **列出所有迁移文件**，记录文件名和大致内容
- [ ] **特别关注含以下关键词的迁移文件**（这类迁移会影响 RLS 策略）：
  - `*security*`
  - `*optimize*`
  - `*policy*`
  - `*rls*`

- [ ] **阅读上述特殊迁移文件的内容**，理解它做了什么
  - 真实案例：`20260125000001_optimize_security.sql` 曾**删除所有 RLS 策略**，后续新增策略的迁移必须知道这一点

---

## Step 1: 理解现有状态

对于要修改的表，查询当前状态：

```sql
-- 查看目标表的列结构
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = '[目标表名]'
ORDER BY ordinal_position;

-- 查看目标表的 RLS 策略（必须知道现有策略数量）
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE tablename = '[目标表名]';
```

- [ ] **记录现有列数量和策略数量**（用于 Step 4 验证）

---

## Step 2: 设计迁移内容

- [ ] **确定迁移类型**：
  - 新建表 → 包含：CREATE TABLE + RLS ENABLE + 必要策略
  - 新增列 → `ALTER TABLE ... ADD COLUMN IF NOT EXISTS ...`
  - 新增/修改策略 → 先检查同名策略是否存在
  - 新建/修改 RPC 函数 → 使用 `CREATE OR REPLACE FUNCTION`

- [ ] **策略冲突检查**（新增 RLS 策略时必须）：
  - 是否已有同名策略？→ 如有，先 DROP 再创建，或用 `IF NOT EXISTS` 保护
  - 新策略与现有策略是否冲突（范围重叠/互斥）？

- [ ] **新建迁移文件**：
  ```bash
  # 文件命名规范：YYYYMMDDNNNNNN_描述.sql
  # 例：20260221000000_add_xxx_column.sql
  ```

- [ ] **编写迁移 SQL**，确保：
  - 使用 `IF NOT EXISTS` 或 `IF EXISTS` 保护（避免重复执行报错）
  - 每个操作有明确注释
  - 包含 RLS 策略时，明确写明 USING 和 WITH CHECK 条件

---

## Step 3: 迁移文件示例（按场景选择）

### 场景 A：新增列
```sql
-- Migration: Add [column_name] to [table_name]
ALTER TABLE public.[table_name]
  ADD COLUMN IF NOT EXISTS [column_name] [type] [DEFAULT value];
```

### 场景 B：新增 Admin RLS 策略（标准模式）
```sql
-- Migration: Add admin access policy for [table_name]
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = '[table_name]' AND policyname = '[policy_name]'
  ) THEN
    CREATE POLICY "[policy_name]" ON public.[table_name]
      FOR ALL TO authenticated
      USING (
        auth.uid() IN (
          SELECT auth_user_id FROM public.admin_users WHERE status = 'enabled'
        )
      )
      WITH CHECK (
        auth.uid() IN (
          SELECT auth_user_id FROM public.admin_users WHERE status = 'enabled'
        )
      );
  END IF;
END $$;
```

### 场景 C：新增 RPC 函数
```sql
CREATE OR REPLACE FUNCTION public.[function_name](...)
  RETURNS [return_type]
  LANGUAGE plpgsql
  SECURITY DEFINER  -- 如需绕过 RLS
AS $function$
BEGIN
  -- 函数体
END;
$function$;
```

---

## Step 4: 执行迁移

⛔ **执行前必须告知用户将要执行的 SQL，等待确认**

```bash
# 方法 A：通过 Supabase CLI（本地开发环境）
supabase db push

# 方法 B：直接 SSH 到服务器执行 SQL（生产环境推荐）
ssh root@180.163.87.70 "psql \$DATABASE_URL < /tmp/migration.sql"
```

---

## Step 5: 验证迁移结果

- [ ] **验证表结构**（对照 Step 1 记录的状态，确认变化符合预期）：
  ```sql
  -- 新增列后验证
  SELECT column_name FROM information_schema.columns
  WHERE table_name = '[目标表名]';
  -- 应比 Step 1 记录的多出新列
  ```

- [ ] **验证 RLS 策略**（对照 Step 1 记录的策略数量）：
  ```sql
  SELECT policyname FROM pg_policies WHERE tablename = '[目标表名]';
  -- 应比 Step 1 记录的多出新策略，且无意外删除原策略
  ```

- [ ] **验证 RPC 函数**（如有新建/修改）：
  ```sql
  SELECT routine_name FROM information_schema.routines
  WHERE routine_name = '[function_name]';
  ```

---

## Step 6: 返回调用者

迁移完成后，返回调用此子程序的技能脚本：
- 从 `bug-fix.md` 调用 → 返回 `bug-fix.md` Step 4（诊断报告）
- 从 `new-feature.md` 调用 → 返回 `new-feature.md` Step 3（实施计划）

---

## 📋 迁移记录（填写后更新文档）

完成迁移后，更新以下文档：
- [ ] `docs/backend/DATABASE_SCHEMA.md` → 新增表/列说明
- [ ] `docs/backend/RLS_POLICIES.md` → 新增策略说明
- [ ] `docs/backend/FUNCTION_REFERENCE.md` → 新增 RPC 函数说明（如有）
